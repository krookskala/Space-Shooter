import unittest
from flask_testing import TestCase
from pymongo import MongoClient
from app import create_app

class TestConfig:
    TESTING = True
    MONGO_URI = "mongodb://localhost:27017/test_database"

class TestFlaskApp(TestCase):
    def create_app(self):
        """Initialize the Flask app with test configurations"""
        return create_app({
            'TESTING': True,
            'MONGO_URI': TestConfig.MONGO_URI
        })

    def setUp(self):
        """Setup a client to interact with the test database"""
        self.mongo_client = MongoClient(TestConfig.MONGO_URI)
        self.db = self.mongo_client.get_default_database()
        self.db.scores.insert_many([
            {"player_name": "Alice", "score": 100},
            {"player_name": "Bob", "score": 150}
        ])

    def tearDown(self):
        """Clean up the database after each test case"""
        self.mongo_client.drop_database(self.db)
        self.mongo_client.close()

    def test_index_route(self):
        """Test the index route for correct HTTP response and template"""
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed('menu.html')

    def test_game_route(self):
        """Test the game route for correct HTTP response and template"""
        response = self.client.get('/game')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed('index.html')

    def test_leaderboard_route(self):
        """Test the leaderboard route for correct HTTP response and template"""
        response = self.client.get('/leaderboard')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed('leaderboard.html')

    def test_api_leaderboard(self):
        """Test API leaderboard for correct data retrieval"""
        response = self.client.get('/api/leaderboard')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(isinstance(response.json, list))
        self.assertEqual(len(response.json), 2)
        expected_scores = [{"name": "Bob", "score": 150}, {"name": "Alice", "score": 100}]
        self.assertEqual(response.json, expected_scores)

    def test_save_score_valid(self):
        """Test posting a valid score"""
        json_data = {'playerName': 'Charlie', 'score': 200}
        response = self.client.post('/save_score', json=json_data)
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(response.json, {'message': 'Score updated successfully'})

        """Verify the score was correctly saved"""
        saved_score = self.db.scores.find_one({"player_name": "Charlie"})
        self.assertIsNotNone(saved_score)
        self.assertEqual(saved_score['score'], 200)

    def test_save_score_invalid(self):
        """Test posting an invalid score (missing playerName)"""
        json_data = {'score': 200}
        response = self.client.post('/save_score', json=json_data)
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.json)

    def test_save_score_non_numeric_score(self):
        """Ensure that non-numeric scores are rejected."""
        response = self.client.post('/save_score', json={'playerName': 'Charlie', 'score': 'not_a_number'})
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.json)

    def test_save_score_extreme_scores(self):
        """Test boundary conditions for scores."""
        high_score = {'playerName': 'Ismail', 'score': 1e6}
        low_score = {'playerName': 'Alena', 'score': -1e6}
        responses = [
            self.client.post('/save_score', json=high_score),
            self.client.post('/save_score', json=low_score)
        ]
        for response in responses:
            self.assertEqual(response.status_code, 200)

    def test_empty_payload(self):
        """Test how the app handles an empty payload."""
        response = self.client.post('/save_score', json={})
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.json)

    def test_very_large_payload(self):
        """Test the app's ability to handle large payloads."""
        large_name = 'x' * (1024 * 1024 * 2)
        response = self.client.post('/save_score', json={'playerName': large_name, 'score': 100})
        self.assertEqual(response.status_code, 413)

    def test_full_game_flow(self):
        """Test a full game flow from starting a game to saving a score."""
        self.client.get('/game')
        self.client.post('/save_score', json={'playerName': 'FlowTest', 'score': 50})
        leaderboard_response = self.client.get('/api/leaderboard')
        self.assertIn('FlowTest', str(leaderboard_response.json))

if __name__ == '__main__':
    unittest.main()