from flask import Flask, jsonify

"""
models.py-
Describes the attributes that certain objects possess.
"""

class User():
    def __init__(self, _username, _displayname, _password):
        self.username = _username
        self.password = _password #how do we store this
        self.displayname = _displayname
        self.email    = ''
        self.avatar   = '' #store as image type then conv to BLOB? idk whats best tbh
        self.posts    = [] #array of post models
        self.replies  = [] #array of comments replied to 
        self.likes    = [] #array of posts/comments liked
        self.retweets = [] #array of posts retweeted

class Twoot():
    """
    Essentially a message from a User with an image.
    Can be 'liked' from other users as well as retweet'd.
    Comments can also be made on this Twoot in a thread-like manner (think reddit comments)
    """
    def __init__(self, _owner: User, _message: str, _image ):
        self.owner   = _owner   #owned by some User
        self.message = _message #message text content
        self.image   = _image   #not sure how we want to store the image. (perhaps just link to file in backend)
        self.likes   = 0        #twoot starts with 0 likes
        self.retweets= 0        #twoot starts with 0 retweets
        self.comments = []       #array of comments