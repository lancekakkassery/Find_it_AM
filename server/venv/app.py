from flask import Flask, render_template, jsonify
import json
import os
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://eshaandbalsara:LancePM122524@finditam.m9syb.mongodb.net/?retryWrites=true&w=majority&appName=FindItAM"

client = MongoClient(uri, server_api=ServerApi('1'))
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)


app = Flask(__name__)
cors = CORS(app, origins='*')
DATA_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data.json')


def load_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as file:
            return json.load(file)
    # with open(DATA_FILE, 'r') as file:
    #     return json.load(file)
    return {"items": []}

@app.route("/api/locations", methods=['GET'])
def locations():
    data = load_data()
    # Assuming the JSON file contains a list of data points (each with an 'id' and 'location')
    return jsonify(data)


# Route to get a item by tag
@app.route('/<string:tag>', methods=['GET'])
def get_item(tag):
    data = load_data()
    try: 
        items = data[tag]
    except:
        return jsonify({'message': 'item not found'}), 404
    # print(items)
    return jsonify(items)
    

if __name__ == "__main__":
    app.run(port=8080, debug=True)


