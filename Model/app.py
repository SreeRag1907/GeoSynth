from flask import Flask, jsonify
from ml.store_predictor import predict_store_locations_dbscan
import logging
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.DEBUG)

@app.route('/api/predict_stores', methods=['GET'])
def predict_stores():
    customer_data_file = os.path.join(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
        'Frontend',
        'src',
        'pages',
        'data.json'
    )
    logging.info(f"Using customer data file: {customer_data_file}")
    try:
        predicted_locations = predict_store_locations_dbscan(customer_data_file)
        logging.debug(f"Raw predicted_locations from function: {predicted_locations}")

        if predicted_locations:
            logging.info(f"Predicted locations (to JSON): {predicted_locations}")
            return jsonify(predicted_stores=predicted_locations)
        else:
            logging.warning("No store locations predicted (empty list returned).")
            return jsonify(predicted_stores=[])
    except Exception as e:
        logging.error(f"Error during prediction: {e}")
        return jsonify(error="Error during prediction"), 500

if __name__ == '__main__':
    app.run(debug=True)










# from flask import Flask, jsonify
# import subprocess
# import json
# import os
# from flask_cors import CORS  # Import Flask-CORS

# app = Flask(__name__)
# CORS(app) # Enable CORS for the entire app

# @app.route('/api/predict_stores', methods=['GET'])
# def predict_stores():
#     try:
#         # Construct the path to your store_predictor.py script inside the ml folder
#         script_path = os.path.join(os.path.dirname(__file__), 'ml', 'store_predictor.py')

#         # Run the Python script and capture output
#         process = subprocess.Popen(['python', script_path], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
#         stdout, stderr = process.communicate()

#         if stderr:
#             print(f"Error running script: {stderr}") # Log error to server console
#             return jsonify({"error": "Error during prediction"}), 500

#         try:
#             # Parse the output as JSON (assuming your Python script prints JSON)
#             predicted_locations = json.loads(stdout)
#             return jsonify(predicted_locations)
#         except json.JSONDecodeError:
#             print(f"Error decoding JSON output: {stdout}") # Log JSON decoding error
#             return jsonify({"error": "Invalid JSON output from script"}), 500

#     except Exception as e:
#         print(f"Exception in /api/predict_stores: {e}") # Log general exception
#         return jsonify({"error": "Internal server error"}), 500

# if __name__ == '__main__':
#     app.run(debug=True, port=5000) # Run Flask app on port 5000 in debug mode