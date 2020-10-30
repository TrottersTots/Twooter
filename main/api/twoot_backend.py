from flask import Flask, jsonify, request, session
from flask_restful import Resource
from models import Twoot
from db import db
from helpers import query_to_dict

"""
twoot_backend.py-
manages the backend of twoot creation, deletion, and editing
"""

class PostTwoot(Resource):
    """
    Posts a twoot from a user and handles the database relations.
    """
    def post(self):
        twoot_info_json = request.get_json()
        new_twoot = Twoot(session['user_id'],
                          twoot_info_json['message'],
                          twoot_info_json['image'])
        #insert twoot to db's
        #...db stuff...
        
        # REGEX TO DETECT A URL
        #if twoot_info_json['image'] :
        #    return 'invalid-image', 462

        #STORE IMAGE FROM URL IN FILE DIR

        db.execute("INSERT INTO posts (user_id, message, image) VALUES (:user_id, :message, :image)",
                    user_id=new_twoot.owner,
                    message=new_twoot.message,
                    image=new_twoot.image)

        return 'twoot-created', 200

class DeleteTwoot(Resource):
    """
    Deletes a twoot from the database and drops all comments/likes from participating users
    """
    pass

class LikeTwoot(Resource):
    """
    Will toggle the 'like'd status from a specific user on a specific twoot
    """
    def post(self):
        info = request.get_json() #info['post_id']
        #if liked_status == True then we want to 'unlike' the twoot/comment
        #if liked_status == False then we want to 'like' the twoot/comment
        #...db stuff...
        q = db.execute('SELECT 1 FROM posts JOIN likes ON likes.post_id=posts.post_id WHERE \
            likes.user_id=:user_id AND posts.post_id=:post_id',
            post_id= info['post_id'], user_id = session['user_id'])      
        q = query_to_dict(q)
        if(not len(q)): # if the user has not yet liked the post, add them to db as a like to the post
            db.execute('INSERT INTO likes (user_id, post_id) VALUES (:user_id, :post_id)', 
                             user_id = session['user_id'], post_id = info['post_id'])
        else: # the user has already liked the post so remove them from the likes on that post
            db.execute('DELETE FROM likes WHERE user_id=:user_id AND post_id=:post_id',
                            user_id = session['user_id'], post_id = info['post_id'])
        return 'updated-like-status', 201

class Retwoot(Resource):
    """
    Will toggle the 'retweet'd status from a specific user on a specific twoot
    """
    def post(self):
        info = request.get_json()  # info['post_id']
        # if liked_status == True then we want to 'unlike' the twoot/comment
        # if liked_status == False then we want to 'like' the twoot/comment
        # ...db stuff...
        q = db.execute('SELECT 1 FROM posts JOIN retwoots ON retwoots.post_id=posts.post_id WHERE \
            retwoots.user_id=:user_id AND posts.post_id=:post_id',
            post_id = info['post_id'], user_id=session['user_id'])      
        q = query_to_dict(q)
        if(not len(q)): # if the user has not yet liked the post, add them to db as a like to the post
            db.execute('INSERT INTO retwoots (user_id, post_id) VALUES (:user_id, :post_id)', 
                             user_id = session['user_id'], post_id = info['post_id'])
        else: # the user has already liked the post so remove them from the likes on that post
            db.execute('DELETE FROM retwoots WHERE user_id=:user_id AND post_id=:post_id',
                            user_id=session['user_id'], post_id=info['post_id'])
        return 'updated-retwoot-status', 201


class GetTwoot(Resource):
    """
    returns list of all twoots that either the user posted or the users that this user is following posted
    """
    def get(self):
        q = db.execute("SELECT post_id, message, image, username, displayname, avatar, verified \
                        FROM posts JOIN users on posts.user_id=users.user_id \
                        WHERE posts.user_id=:user_id \
                        OR posts.user_id=(SELECT other_id FROM follows WHERE self_id=:user_id)", 
                        user_id=session['user_id'])
        q = query_to_dict(q)
        twoots = {}
        for d in q:
            twoots[d['post_id']] = d
        return jsonify(twoots)

class CommentTwoot(Resource):
    def post(self):
        info = request.get_json() # info['post_id'] , info['message'], session['user_id']
        db.execute('INSERT INTO comments (post_id, user_id, message) VALUES (:post_id, :user_id, :message)',
                    post_id=info['post_id'], user_id=session['user_id'], message=info['message'])
        return 'comment-succesful', 200

#routes for displaying twoot sets on profile
class GetSelfTwoot(Resource):
    def get(self):
        q = db.execute("SELECT post_id, message, image, username, displayname, avatar, verified \
                        FROM posts JOIN users on posts.user_id=users.user_id \
                        WHERE posts.user_id=:user_id", user_id=session['user_id'])
        q = query_to_dict(q)
        twoots = {}
        for d in q:
            twoots[d['post_id']] = d
        return jsonify(twoots)

class GetSelfMediaTwoot(Resource):
    def get(self):
        q = db.execute("SELECT post_id, message, image, username, displayname, avatar, verified \
                        FROM posts JOIN users on posts.user_id=users.user_id \
                        WHERE posts.user_id=:user_id AND image!=NULL", user_id=session['user_id'])
        q = query_to_dict(q)
        twoots = {}
        for d in q:
            twoots[d['post_id']] = d
        return jsonify(twoots)

class GetLikedTwoot(Resource):
    def get(self):
        q = db.execute("SELECT post_id, message, image, username, displayname, avatar, verified \
                        FROM posts JOIN users on posts.user_id=users.user_id \
                        WHERE post_id IN (SELECT post_id FROM likes WHERE user_id=:user_id)", user_id=session['user_id'])
        q = query_to_dict(q)
        twoots = {}
        for d in q:
            twoots[d['post_id']] = d
        return jsonify(twoots)           
# = jsonify(message = dictionary['message'])
