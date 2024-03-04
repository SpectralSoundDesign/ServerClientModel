from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_csv():
    if 'file' not in request.files:
        return jsonify({'error': 'No file exists'}), 400
    
    f = request.files['file']
    
    if f.filename == '':
        return jsonify({'error': 'File not selected'}), 400
    
    if f and f.filename.split('.')[-1] == 'csv':
        f.save(f'uploads/{f.filename}')
        return jsonify({'success': 'File successfully uploaded'}), 200
    else:
        return jsonify({'error': 'Invalid file type. You can only upload csv files.'}), 400

if __name__ == '__main__':
    app.run(port=5000)
