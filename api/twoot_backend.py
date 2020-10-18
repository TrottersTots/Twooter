from flask import Flask, jsonify, request
from flask_restful import Resource
from models import Twoot

"""
twoot_backend.py-
manages the backend of twoot creation, deletion, and editing
"""

#testing
twoots = []
#end testing

class PostTwoot(Resource):
    """
    Posts a twoot from a user and handles the database relations.
    """
    def post(self):
        twoot_info_json = request.get_json()
        new_twoot = Twoot(twoot_info_json['owner'],
                          twoot_info_json['message'],
                          twoot_info_json['image'])
        #insert twoot to db's
        #...db stuff...
        twoots.append(new_twoot)
        return 'twoot-created', 201

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
    Currently returns the most recent twoot (for testing)
    """
    def get(self):
        most_recent_twoot = twoots[-1]
        return jsonify({'message': most_recent_twoot.message,
                        'likes': most_recent_twoot.likes})


