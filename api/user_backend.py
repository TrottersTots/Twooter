from flask import Flask, request, jsonify
from flask_restful import Resource
from models import User

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
        user_info_json = request.get_json()
        #constructs a new user model with username and password supplied from front-end in JSON format
        new_user = User(user_info_json['username'], user_info_json['password'])
        #insert new user into db here
        #...db stuff...
        return 'user-created', 201 #return 201 if valid POST request.

class DeleteUser(Resource):
    """
    Deletes a user from the Twooter database and drops all their identifying information
    as well as dropping the follow status from their followers database's (both to and fro)
    """
    pass