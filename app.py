from flask import Flask, render_template, jsonify, request
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os

load_dotenv()

def create_app(test_config=None):
    app = Flask(__name__)
    app.config['MAX_CONTENT_LENGTH'] = 1024 * 1024

    app.config['MONGO_URI'] = os.getenv("MONGO_URI") if not test_config else test_config['MONGO_URI']

    mongo = PyMongo(app)

    @app.route('/')
    def index():
        return render_template('menu.html')

    @app.route('/game')
    def game():
        return render_template('index.html')

    @app.route('/leaderboard')
    def leaderboard():
        return render_template('leaderboard.html')

    @app.route('/api/leaderboard', methods=['GET'])
    def get_leaderboard():
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 5))
        skip = (page - 1) * limit
        leaderboard_data = mongo.db.scores.find().sort("score", -1).skip(skip).limit(limit)
        return jsonify([{'name': x['player_name'], 'score': x['score']} for x in leaderboard_data])

    @app.route('/save_score', methods=['POST'])
    def save_score():
        json_data = request.get_json()
        player_name = json_data.get('playerName')
        score = json_data.get('score')
        if not player_name or not isinstance(score, (int, float)):
            return jsonify({'error': 'Invalid input'}), 400
        mongo.db.scores.update_one(
            {"player_name": player_name},
            {"$set": {"score": score}},
            upsert=True
        )
        return jsonify(message="Score updated successfully")

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)