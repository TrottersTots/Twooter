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
    Will toggle the 'like'd status from a specific user on a specific twoot/comment
    """
    def post(self):
        like_info_json = request.get_json()
        liked_status   = None #do some db querty to check if this user has already liked this post
        #if liked_status == True then we want to 'unlike' the twoot/comment
        #if liked_status == False then we want to 'like' the twoot/comment
        #...db stuff...
        return 'updated-like-status', 201

class Retwoot(Resource):
    """
    Will toggle the 'retweet'd status from a specific user on a specific twoot
    """
    def post(self):
        retwoot_info_json = request.get_json()
        retwoot_status = None #do some db querty to check if this user has already retwoot'd this post
        #...db stuff...
        return 'updated-retwoot-status', 201

class GetTwoot(Resource):
    """
    Currently returns list of all twoots that the user posted themselves
    """
    def get(self):
        q = db.execute("SELECT * FROM posts JOIN follows ON follows.other_id=posts.user_id OR user_id=:user_id", user_id=session['user_id'])
        q = query_to_dict(q)

        twoots = {}
        for d in q:
            twoots[d['post_id']] = d
        return jsonify(twoots)


# = jsonify(message = dictionary['message'])

