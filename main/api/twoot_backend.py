from flask import Flask, jsonify, request, session
from flask_restful import Resource
from models import Twoot
from db import db
from helpers import query_to_dict
"""
twoot_backend.py-
manages the backend of twoot creation, deletion, and editing
"""

def append_twoot_stats(q):
    for post in q:
        post_id = post.get('post_id')

        likes = query_to_dict(db.execute("SELECT COUNT(user_id) as likes \
        FROM likes \
        WHERE post_id=:post_id",post_id=post_id))[0].get('likes')

        comments = query_to_dict(db.execute("SELECT COUNT(user_id) as comments \
        FROM comments \
        WHERE post_id=:post_id",post_id=post_id))[0].get('comments')

        retwoots = query_to_dict(db.execute("SELECT COUNT(user_id) as retwoots \
        FROM retwoots \
        WHERE post_id=:post_id",post_id=post_id))[0].get('retwoots')

        likedbyself = query_to_dict(db.execute("SELECT COUNT(posts.user_id) as likedbyself \
        FROM posts \
        JOIN likes ON likes.post_id=posts.post_id \
        WHERE posts.post_id=:post_id AND likes.user_id=:user_id", post_id=post_id, user_id=session['user_id']))[0].get('likedbyself')

        retwootedbyself = query_to_dict(db.execute("SELECT COUNT(posts.user_id) as retwootedbyself \
        FROM posts \
        JOIN retwoots ON retwoots.post_id=posts.post_id \
        WHERE posts.post_id=:post_id AND retwoots.user_id=:user_id", 
        post_id=post_id, user_id=session['user_id']))[0].get('retwootedbyself')

        commentedbyself = query_to_dict(db.execute("SELECT COUNT(posts.user_id) as commentedbyself \
        FROM posts \
        JOIN comments ON comments.post_id=posts.post_id \
        WHERE posts.post_id=:post_id AND comments.user_id=:user_id", 
        post_id=post_id, user_id=session['user_id']))[0].get('commentedbyself')

        post.update({'likes': likes, 'retwoots': retwoots, 'comments': comments, 
        'likedbyself': likedbyself, 'retwootedbyself':retwootedbyself, 'commentedbyself':commentedbyself})
    return q

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

class CommentTwoot(Resource):
    def post(self):
        info = request.get_json() # info['post_id'] , info['message'], session['user_id']
        db.execute('INSERT INTO comments (post_id, user_id, message) VALUES (:post_id, :user_id, :message)',
                    post_id=info['post_id'], user_id=session['user_id'], message=info['message'])
        return 'comment-succesful', 200

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
        q = db.execute("SELECT post_id, message, image, username, displayname, verified, avatar \
                        FROM posts JOIN users on posts.user_id=users.user_id \
                        WHERE posts.user_id=:user_id \
                        OR posts.user_id IN (SELECT other_id FROM follows WHERE self_id=:user_id)", 
                        user_id=session['user_id'])
        q = query_to_dict(q)
        q = append_twoot_stats(q)

        twoots = {}
        for d in q:
            twoots[d['post_id']] = d
        return jsonify(twoots)

#routes for displaying twoot sets on profile
class GetSelfTwoot(Resource):
    def get(self):
        q = db.execute("SELECT post_id, message, image, username, displayname, verified, avatar \
                        FROM posts JOIN users on posts.user_id=users.user_id \
                        WHERE posts.user_id=:user_id", user_id=session['user_id'])
        q = query_to_dict(q)
        q = append_twoot_stats(q)
        twoots = {}
        for d in q:
            twoots[d['post_id']] = d

        return jsonify(twoots)

class GetSelfMediaTwoot(Resource):
    def get(self):
        q = db.execute("SELECT post_id, message, image, username, displayname, verified, avatar \
                        FROM posts JOIN users on posts.user_id=users.user_id \
                        WHERE posts.user_id=:user_id AND image!=''", user_id=session['user_id'])
        q = query_to_dict(q)
        q = append_twoot_stats(q)
        twoots = {}
        for d in q:
            twoots[d['post_id']] = d
        return jsonify(twoots)

class GetLikedTwoot(Resource):
    def get(self):
        q = db.execute("SELECT post_id, message, image, username, displayname, verified, avatar \
                        FROM posts JOIN users on posts.user_id=users.user_id \
                        WHERE post_id IN (SELECT post_id FROM likes WHERE user_id=:user_id)", user_id=session['user_id'])
        q = query_to_dict(q)
        q = append_twoot_stats(q)
        twoots = {}
        for d in q:
            twoots[d['post_id']] = d
        return jsonify(twoots)           
# = jsonify(message = dictionary['message'])

class SearchQuery(Resource):
    def get(self):
        pass
    def post(self):
        #appending % means anything that can come before or after the search term. 
        #this isnt optimal as it will return posts containing 'paint' given the term 'pain' ..except the 2 solutions i tried to resolve this didnt work:
        #1. using sqlite's REGEXP instead of LIKE - doesnt work bc sqlalchemy doesnt support REGEXP
        #2. using the wildcards [^a-z]. - doesnt work bc sqlite only supports the % and _ wildcards.
        try:
            searchTerm = "'%"+request.get_json()+"%'"
            
            #ALERT. ALERT. WEEEEEE WOOOOO. WEEEEE WOOOOOO. SQL INJECTION ATTACK IMMINENT.
            q = db.execute(f"SELECT post_id, message, image, username, displayname, verified, avatar \
                            FROM posts JOIN users on posts.user_id=users.user_id \
                            WHERE message LIKE {searchTerm}")
                            #idk why but i cant figure out how to use string substitution in sql such that it achieves the same result as this f-string
                            #anyway. "DROP TABLE users" it is for now i guess. Sadge
            q = query_to_dict(q)
            q = append_twoot_stats(q)

            return jsonify(q)
        except Exception as e:
            return 'Error when searching for a term', 500 
          
class GetTrendingTwoots(Resource):
    """
    returns top 'x' amount of trending twoots
    """
    def get(self):
        #change this query to select twoots sorted by most liked, nothing else matters
        most_liked = db.execute("SELECT post_id\
                        FROM likes\
                        GROUP BY post_id\
                        ORDER BY COUNT(*) DESC")
        most_liked=[list(row)[0] for row in most_liked.fetchall()]
        
        q = []
        for post in most_liked:
            q.append(query_to_dict(db.execute("SELECT post_id, message, image, username, displayname, verified, avatar\
                                                FROM posts JOIN users on posts.user_id=users.user_id \
                                                WHERE post_id=:post",post=post))[0])

        #q = query_to_dict(q)
        q = append_twoot_stats(q)

        twoots = {}
        for d in q:
            twoots[d['post_id']] = d
        return jsonify(twoots)

class GetCuratedTwoots(Resource):
    """
    returns twoots that use the same hashtags that the user also uses ("for you" tab of explore)
    """
    def get(self):
        #change this query to select twoots with hashtags that the user has also used (complex logic?)
        q = db.execute("SELECT post_id, message, image, username, displayname, verified, avatar \
                        FROM posts JOIN users on posts.user_id=users.user_id \
                        WHERE posts.user_id=:user_id \
                        OR posts.user_id IN (SELECT other_id FROM follows WHERE self_id=:user_id)", 
                        user_id=session['user_id'])
        q = query_to_dict(q)
        q = append_twoot_stats(q)
        twoots = {}
        for d in q:
            twoots[d['post_id']] = d
        return jsonify(twoots)

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