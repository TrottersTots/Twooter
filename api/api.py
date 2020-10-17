from flask import Flask, request
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

class HelloWorld(Resource):
    def get(self):
        return {'test-get': 'Hello, World!'}

    def post(self):
        some_json = request.get_json()
        return {'test-post': some_json}, 201


api.add_resource(HelloWorld, '/api/hello')#get and set route

if __name__ == "__main__":
    app.run(debug=True)
