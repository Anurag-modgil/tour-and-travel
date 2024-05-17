from flask import Flask
from dotenv import load_dotenv
from flask_cors import CORS
from config import Connection

# Load environment variables
load_dotenv()

# Initialize the Flask application
app = Flask(__name__)

# Setup MongoDB connection
mongo = Connection()

# Enable CORS for all routes
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)


# Import routes (ensure this import is at the bottom to avoid circular imports)
from app import routes

if __name__ == "__main__":
    app.run(debug=True)
