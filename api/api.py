from flask import Flask, request, jsonify
from flask_restful import Resource, Api

from user_backend import  CreateUser, DeleteUser
from twoot_backend import PostTwoot, DeleteTwoot, LikeTwoot, Retwoot, GetTwoot


"""
api.py-
backend to handle the RESTful api routing.
"""

app = Flask(__name__)
api = Api(app)
isProd = False #is this a production build?

path = '/api' #local api path

#database init.



#ROUTING:
#- User
api.add_resource(CreateUser, path +  '/create_user/') #methods:['POST']
api.add_resource(DeleteUser, path +  '/delete_user/') #methods:['POST']
#- Twoot
api.add_resource(PostTwoot, path +   '/post_twoot/'  ) #methods:['POST']
api.add_resource(DeleteTwoot, path +   '/delete_twoot/') #methods:['POST']
api.add_resource(LikeTwoot, path +   '/like_twoot/'  ) #methods:['POST']
api.add_resource(Retwoot, path +     '/retwoot/'     ) #methods:['POST']
api.add_resource(GetTwoot, path +     '/get_twoot/'  ) #methods:['Get']



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