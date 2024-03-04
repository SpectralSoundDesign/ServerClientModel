from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api', methods=['GET'])
def get_message():
    return jsonify({'message': 'Hello from server!'})

if __name__ == '__main__':
    app.run(port=5000)
