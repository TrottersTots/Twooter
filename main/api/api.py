from flask import Flask, request, jsonify, session
from flask_session import Session
from flask_restful import Resource, Api

from user_backend import  CreateUser, LoginUser, DeleteUser,\
FollowUser, Main, UserData, UpdateUserData, SearchUsers, GetConnections, DeleteAccount

from twoot_backend import PostTwoot, DeleteTwoot, LikeTwoot,\
Retwoot, GetTwoot, CommentTwoot, GetSelfTwoot, GetSelfMediaTwoot, GetLikedTwoot,\
GetTrendingTwoots, GetCuratedTwoots, SearchQuery,  GetComments, GetNews

from tempfile import mkdtemp

#secret.py contains app secret key and api key(s)
from secret import app_secret

"""
api.py-
backend to handle the RESTful api routing.
"""

app = Flask(__name__)
app.secret_key = app_secret
app.config["SESSION_TYPE"]='filesystem'
api = Api(app)
isProd = False #is this a production build?

Session(app)


path = '/api' #local api path

#database init.



#ROUTING:
#- User
api.add_resource(Main, path + '/')
api.add_resource(UserData, path + '/get_userdata/')
api.add_resource(CreateUser, path +  '/create_user/') #methods:['POST']
api.add_resource(LoginUser, path + '/login_user/') #methods:['POST']
api.add_resource(DeleteUser, path +  '/delete_user/') #methods:['POST']
api.add_resource(FollowUser, path +  '/follow_user/') #methods:['POST']
api.add_resource(SearchUsers, path + '/search_users/') #methods:['POST']
api.add_resource(DeleteAccount, path + '/delete_account/') #methods:['GET']

#- Twoot
api.add_resource(PostTwoot, path +    '/post_twoot/'    ) #methods:['POST']
api.add_resource(DeleteTwoot, path +  '/delete_twoot/'  ) #methods:['POST']
api.add_resource(LikeTwoot, path +    '/like_twoot/'    ) #methods:['POST']
api.add_resource(Retwoot, path +      '/retwoot/'       ) #methods:['POST']
api.add_resource(GetTwoot, path +     '/get_twoot/'     ) #methods:['GET']
api.add_resource(CommentTwoot, path + '/comment_twoot/' ) #methods:['POST']
api.add_resource(GetComments, path + '/get_comments/') #methods:['POST']
api.add_resource(GetNews, path + '/get_news/' ) #methods: ['GET'] 

api.add_resource(SearchQuery, path + '/search_query') #methods: ['POST']
api.add_resource(GetTrendingTwoots, path + '/get_trending/' ) #methods:['GET']
api.add_resource(GetCuratedTwoots, path + '/get_curated/' ) #methods:['GET']
api.add_resource(GetConnections, path + '/get_connections/' ) #methods:['GET']
    #profile-related
api.add_resource(GetSelfTwoot, path + '/get_selftwoot/' ) #methods:['GET']
api.add_resource(GetSelfMediaTwoot, path + '/get_selftwoot_media/' ) #methods:['GET']
api.add_resource(GetLikedTwoot, path + '/get_likedtwoot/')
api.add_resource(UpdateUserData, path + '/submit_userData/')
#api.add_resource(ShareTwoot), path + '/share_twoot/') #methods: ['GET']

if __name__ == "__main__":
    app.run(debug=not isProd) #run app and start debug status

"""
--example resource
class HelloWorld(Resource):
    def get(self):
        return jsonify({"test": "hello, world!"})

    def post(self):
        some_json = request.get_json()
        return {'test-post': some_json}, 201

--example route
api.add_resource(HelloWorld, '/api/hello')#get and set route
"""