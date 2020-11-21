from flask import Flask, request, jsonify, session
from flask_restful import Resource
from models import User
from werkzeug.security import generate_password_hash, check_password_hash
from db import db
from helpers import query_to_dict, hash_id
from re import match
from os import path
import base64
"""
user_backend.py-
manages the User base backend integration.
"""

current_dir = path.dirname(__file__)

class CreateUser(Resource):
    """
    Creates a new Twooter user model and adds them to the database.
    """
    #decorate this function with some login_required() validation function
    def post(self):
        def formCompletion (formList):
            for field in formList:
                if field is '' or None:
                    return False
            return True

        def validateEmail (email):
            """
            checs if email is legit
            """
            return True if match(".{1,}@[^.]{1,}", email) is not None else False

        def checkUsername (username):
            """
            checks if username is available
            """
            q = db.execute("SELECT * FROM users WHERE username=:username", username=username)
            q = query_to_dict(q)
            return True if len(q) < 1 else False
        
        def validatePasswordMatch (password, confirmation):
            """
            checks if password and confirmation match
            """
            return True if password == confirmation else False

        user_info_json = request.get_json()
        print(user_info_json)
        #constructs a new user model with username and password supplied from front-end in JSON format
        new_user = User(user_info_json['username'], user_info_json['password'], user_info_json['email'])

        #input validation
        if not formCompletion([user_info_json['username'], user_info_json['password'], user_info_json['passwordConfirm'], user_info_json['email']]):
            return 'form incomplete',459
        if not validateEmail(new_user.email):
            return 'invalid email', 460
        if not validatePasswordMatch(new_user.password, user_info_json['passwordConfirm']):
            return 'passwords do not match', 461
        if not checkUsername(new_user.username):
            return 'username is taken', 462
        # - - - 

        #create a new user
        db.execute("INSERT INTO users (username, displayname, password, email) VALUES (:username, :displayname, :password, :email)",
                    username=new_user.username, 
                    displayname=new_user.displayname,
                    password=generate_password_hash(new_user.password),
                    email=new_user.email)
        q = db.execute("SELECT * FROM users WHERE username=:username", username=new_user.username)

        if q is None:
            return 'user-creation-failed', 500
        
        return 'user-created', 200 #return 201 if valid POST request.

class LoginUser(Resource):
    """
    Attempts to log-in a user given the credentials submitted from the login modal.
    """
    def post(self):
        def formCompletion (formList):
            for field in formList:
                if field is '' or None:
                    return False
            return True
        try:
            session.pop('user_id')#clears the user id
            session.pop('hashed_id')
        except KeyError:
            pass
        user_info_json = request.get_json()

        user_info = User(user_info_json['username'], user_info_json['password'])
        if not formCompletion([user_info.username, user_info.password]):
            return 'form incomplete', 459
        #print(f"{user_info_json['username']}, {user_info_json['password']}")

        q = db.execute("SELECT password FROM users WHERE (username=:username OR email=:username)",
                    username=user_info.username)

        q = query_to_dict(q)

        if len(q) < 1:
            return 'user-not-found', 404
        
        loginValid = check_password_hash(q[0].get('password'), user_info_json['password'])
        
        if not loginValid:
            return 'incorrect-user-or-password', 403

        session['user_id'] = query_to_dict(db.execute('SELECT * FROM users WHERE username=:username', username=user_info.username))[0]['user_id']
        #we need a hashed id so we can send it to the front end without worries (for avatar path)
        session['hashed_id'] = hash(session['user_id']) #<== very intricate hash function :)

        return 'login-success', 200
        
class DeleteUser(Resource):
    """
    Deletes a user from the Twooter database and drops all their identifying information
    as well as dropping the follow status from their followers database's (both to and fro)
    """
    pass

class FollowUser(Resource):
    def post(self):
        to_follow = request.get_json() #to_follow['username']
        print(f'to follow: {to_follow}')
        follow_id = db.execute('SELECT user_id FROM users WHERE username=:username',
                                username = to_follow['username'])
        follow_id = query_to_dict(follow_id)
        if(not len(follow_id)):
            return 'no such user', 459 #maybe 404
        follow_id = follow_id[0]['user_id']
        
        q = db.execute('SELECT * FROM users JOIN follows ON \
            follows.other_id=:id    \
            WHERE users.user_id=:id AND follows.self_id=:user_id',
            id=follow_id, user_id=session['user_id'])
        q = query_to_dict(q)
        print(f'USER_ID: ', session['user_id'])
        print(f'FOLLOW_ID: ', follow_id)

        print(f'QUERY: {q}')
        if(not len(q)):# the user does not follw 'to_follow' so set them to follow
            db.execute('INSERT INTO follows (self_id, other_id) VALUES \
                            (:user_id, :id)',
                            user_id=session['user_id'], id=follow_id)
            return 'follow-success', 200
        else:
            db.execute('DELETE FROM follows WHERE self_id=:user_id AND other_id=:id',
                            user_id=session['user_id'], id=follow_id)
            return 'unfollow-success', 201
        return 'unknown-erorr', 404
        
class UserData(Resource):
    def get(self):
        q = db.execute("SELECT * FROM users WHERE user_id=:user_id", user_id=session['user_id'])
        q = query_to_dict(q)
        
        #query for follower/following counts and then append them to our main query
        q[0].update(query_to_dict(db.execute("SELECT COUNT(other_id) as following FROM follows WHERE self_id=:user_id", user_id=session['user_id']))[0])
        q[0].update(query_to_dict(db.execute("SELECT COUNT(self_id) as followers FROM follows WHERE other_id=:user_id", user_id=session['user_id']))[0])
        
        #append an avatar element to the dictionary if the user has an avatar in the directory
        
        return jsonify(q[0])
    def post(self):
        """
        used when getting someone else's userData (for their profile page)
        """
        other_id = request.get_json()
        #print(f"AAAAAAAAA: {other_id}")
        other = query_to_dict(db.execute("SELECT user_id FROM users WHERE username=:username",username=other_id))[0]['user_id']
        #print(f"BBBBBBBBB: {other}")
        q = db.execute("SELECT * FROM users WHERE user_id=:user_id", user_id=other)
        q = query_to_dict(q)
        
        #query for follower/following counts and then append them to our main query
        q[0].update(query_to_dict(db.execute("SELECT COUNT(other_id) AS following FROM follows WHERE self_id=:user_id", user_id=other))[0])
        q[0].update(query_to_dict(db.execute("SELECT COUNT(self_id) AS followers FROM follows WHERE other_id=:user_id", user_id=other))[0])
        
        q[0].update(query_to_dict(db.execute("SELECT COUNT(other_id) AS self_following \
                                               FROM follows WHERE self_id=:user_id AND other_id=:other",
                                               other=other,user_id=session['user_id']))[0])
        #print(f"me: {session['user_id']} \nother:{other}")
        return jsonify(q[0])
class UpdateUserData(Resource):
    def post(self):

        newUD = request.get_json()

        avatar_path = path.join(current_dir, f"../twooter-app/public/avatars/{session['hashed_id']}.jpg")
        if(  len(newUD['avatar_input'])  > 3):
            with open(avatar_path, "wb") as fh:
                fh.write(base64.decodebytes(newUD['avatar_input'].encode('ascii')))

        try:
            db.execute("UPDATE users \
                        SET displayname=:displayname, email=:email, dob=:dob, bio=:bio, avatar=:avatar\
                        WHERE user_id=:user_id", 
                        user_id=session['user_id'],
                        displayname=newUD['name_input'],
                        email=newUD['email_input'],
                        dob=newUD['dob_input'],
                        bio=newUD['bio_input'],
                        avatar=session['hashed_id'])
        except Exception as e:
            print(e)
            return 'userData update failed', 500
        else:
            return 'userData updated in DB', 200

        return 'something went wrong :(',501

class SearchUsers(Resource):
    def post(self):
        #displayName, username, bio, verified, avatar
        #try:
        searchTerm = "'%"+request.get_json()+"%'"
        #ALERT. ALERT. WEEEEEE WOOOOO. WEEEEE WOOOOOO. SQL INJECTION ATTACK IMMINENT.
        q = db.execute(f"SELECT displayName, username, bio, verified, avatar \
                        FROM users \
                        WHERE username LIKE {searchTerm} \
                        OR displayName LIKE {searchTerm}")
                        #idk why but i cant figure out how to use string substitution in sql such that it achieves the same result as this f-string
                        #anyway. "DROP TABLE users" it is for now i guess. Sadge
        q = query_to_dict(q)
        print(q);
        return jsonify(q)
        #except Exception as e:
            #return 'Error when searching for a term', 500 
        

class GetConnections(Resource):
    """
    returns mutual friends ("connect" tab of explore)
    """
    def get(self):
        #select friends of friends user information
        q = db.execute("SELECT username,displayname,bio,verified,avatar FROM users \
                        WHERE user_id IN ( \
                            SELECT other_id FROM follows \
	                        WHERE self_id IN ( \
		                        SELECT other_id FROM follows \
		                        WHERE self_id=:user_id \
	                            ) \
	                        AND other_id!=:user_id \
                        )", user_id=session['user_id'])

        q = query_to_dict(q)
        return jsonify(q)

class Main(Resource):
    def get(self):
        if session['user_id'] is not None:  return 'user has a session', 200
        else: return 'user hasnt logged in before', 500

    def post(self):
        try:
            session.pop('user_id')
            session.pop('hashed_id')
        except KeyError:
            return 'logout-failed', 500
        else:
            return 'logout-success', 200