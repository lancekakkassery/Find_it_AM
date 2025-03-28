from flask import Flask, render_template, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson.json_util import dumps
import os

app = Flask(__name__)
cors = CORS(app, origins='*')

# MongoDB Configuration
app.config["MONGO_URI"] = "mongodb+srv://eshaandbalsara:LancePM122524@finditam.m9syb.mongodb.net/FindItAM?retryWrites=true&w=majority&appName=FindItAM"
mongo = PyMongo(app)

@app.route("/api/locations", methods=['GET'])
def locations():
    # Get data from MongoDB
    items = list(mongo.db.items.find())
    # Convert MongoDB cursor to JSON response
    return dumps(items)

# Debug route to see all available tags
@app.route("/api/tags", methods=['GET'])
def get_tags():
    tags = mongo.db.items.distinct("tag")
    return jsonify({"available_tags": tags})

# Route to get a item by tag
@app.route('/<string:tag>', methods=['GET'])
def get_item(tag):
    try: 
        items = list(mongo.db.items.find({"tag": tag}))
        if not items:
            return jsonify({'message': 'item not found'}), 404
        return dumps(items)
    except Exception as e:
        return jsonify({'message': str(e)}), 500

if __name__ == "__main__":
    app.run(port=8080, debug=True)


