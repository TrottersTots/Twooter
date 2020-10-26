from flask import Flask, request, jsonify, session
from flask_restful import Resource
from models import User
from werkzeug.security import generate_password_hash, check_password_hash
from db import db
from helpers import query_to_dict
from re import match
"""
user_backend.py-
manages the User base backend integration.
"""


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
        return 'login-success', 200
        
class DeleteUser(Resource):
    """
    Deletes a user from the Twooter database and drops all their identifying information
    as well as dropping the follow status from their followers database's (both to and fro)
    """
    pass

class Main(Resource):
    def get(self):

        if session['user_id'] is not None:  return 'user has a session', 200
        else: return 'user hasnt logged in before',500