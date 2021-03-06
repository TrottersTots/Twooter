from random import randint
from flask import Flask, jsonify, request, session
from flask_restful import Resource
from models import Twoot
from db import db
from helpers import query_to_dict
from os import path
import base64
from newsapi import NewsApiClient
from secret import news_api_key
"""
twoot_backend.py-
manages the backend of twoot creation, deletion, and editing
"""
current_dir = path.dirname(__file__)
newsapi = NewsApiClient(api_key=news_api_key)

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
        if post_id == 5:
            print(f'post: {post_id}\nliked by {session["user_id"]}? ={likedbyself}')
            
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
        
        #finds what the next posts (this one)'s id will be
        nextPostID= query_to_dict(db.execute("SELECT seq AS n FROM sqlite_sequence WHERE name='posts'"))[0].get('n')+1

        image_path = path.join(current_dir, f"../twooter-app/public/user_images/{nextPostID}.jpg")
        if(  len(twoot_info_json['image'])  > 3):
            with open(image_path, "wb") as fh:
                fh.write(base64.decodebytes(twoot_info_json['image'].encode('ascii')))
        
        db.execute("INSERT INTO posts (user_id, message, image) VALUES (:user_id, :message, :image)",
                    user_id=new_twoot.owner,
                    message=new_twoot.message,
                    image=nextPostID) #image is now technically useless since its a duplicate of post id

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

class GetComments(Resource):
    def post(self):
        # displayName, username, bio, verified, avatar

        post_id = request.get_json()
        q = db.execute("SELECT u.displayName, u.username, u.bio, u.verified, u.avatar, c.message \
                        FROM users AS u \
                        JOIN comments AS c \
                        ON c.user_id = u.user_id \
                        WHERE post_id=:post_id", post_id=post_id)
        q = query_to_dict(q)
        
        return jsonify(q)

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

            post = query_to_dict(db.execute("SELECT message, image FROM posts WHERE post_id=:post_id",post_id=info['post_id']))[0]
            #duplicate the post
            db.execute('INSERT INTO posts (user_id, message, image) VALUES (:user_id, :message, :image)',
                        user_id=session['user_id'], message=post.get('message'), image=post.get('image'))

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
    def post(self):
        other_id = request.get_json();
        other_id = query_to_dict(db.execute("SELECT user_id FROM users WHERE username=:username",username=other_id))[0]['user_id']
        q = db.execute("SELECT post_id, message, image, username, displayname, verified, avatar \
                        FROM posts JOIN users on posts.user_id=users.user_id \
                        WHERE posts.user_id=:user_id", user_id=other_id)
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
    def post(self):
        other_id = request.get_json();
        other_id = query_to_dict(db.execute("SELECT user_id FROM users WHERE username=:username",username=other_id))[0]['user_id']
        q = db.execute("SELECT post_id, message, image, username, displayname, verified, avatar \
                        FROM posts JOIN users on posts.user_id=users.user_id \
                        WHERE posts.user_id=:user_id AND image!=''", user_id=other_id)
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
    def post(self):
        other_id = request.get_json();
        other_id = query_to_dict(db.execute("SELECT user_id FROM users WHERE username=:username",username=other_id))[0]['user_id']
        q = db.execute("SELECT post_id, message, image, username, displayname, verified, avatar \
                        FROM posts JOIN users on posts.user_id=users.user_id \
                        WHERE post_id IN (SELECT post_id FROM likes WHERE user_id=:user_id)", user_id=other_id)
        q = query_to_dict(q)
        q = append_twoot_stats(q)
        print(q)
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
                                                FROM posts JOIN users ON posts.user_id=users.user_id \
                                                WHERE post_id=:post",post=post))[0])

        #q = query_to_dict(q)
        q = append_twoot_stats(q)

        twoots = {}
        for d in q:
            twoots[d['post_id']] = d
        return jsonify(twoots)

class GetCuratedTwoots(Resource):
    """
    returns twoots of mutual friends ("for you" tab of explore)
    """
    def get(self):
        
        #change this query to select twoots with hashtags that the user has also used (complex logic?)
        q = db.execute("SELECT post_id, message, image, username, displayname, verified, avatar \
                        FROM posts JOIN users ON posts.user_id=users.user_id \
                        WHERE users.user_id IN ( \
                            SELECT user_id FROM users \
                            WHERE user_id IN ( \
                                SELECT other_id FROM follows \
	                            WHERE self_id IN ( \
		                            SELECT other_id FROM follows \
		                            WHERE self_id=:user_id \
	                                ) \
	                            AND other_id!=:user_id \
                                ) \
                            )", user_id=session['user_id'])
        q = query_to_dict(q)
        q = append_twoot_stats(q)
        twoots = {}
        for d in q:
            twoots[d['post_id']] = d
        return jsonify(twoots)

class GetNews(Resource):
    def get(self):
        articleData = {}

        #gets top headlines from bbc news
        srcs = 'bbc-news'
        news = newsapi.get_top_headlines(sources=srcs)
        
        articleSelect = randint(0,news.get('totalResults'))
        
        articleData['author'] = news.get('articles')[articleSelect].get("author")
        articleData['title'] = news.get('articles')[articleSelect].get("title")
        articleData['articleURL'] = news.get('articles')[articleSelect].get("url")
        articleData['imgURL'] = news.get('articles')[articleSelect].get("urlToImage")
        
        return jsonify(articleData)