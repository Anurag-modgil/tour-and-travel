from pymongo import MongoClient
from pymongo.errors import PyMongoError, ConfigurationError
from dotenv import load_dotenv
from datetime import datetime  # Added datetime import
import os

# Load environment variables from a .env file
load_dotenv()

# Retrieve the MongoDB URI and database name from environment variables
mongo_uri = os.getenv("MONGO_URI")
database_name = os.getenv("DATABASE_NAME")

if not mongo_uri:
    raise ValueError("The MONGO_URI environment variable is not set.")
if not database_name:
    raise ValueError("The DATABASE_NAME environment variable is not set.")

# Sample data for users and packages
sample_users = [
    {"username": "user1", "email": "user1@example.com", "password": "password1", "createdAt": datetime.now()},
    {"username": "user2", "email": "user2@example.com", "password": "password2", "createdAt": datetime.now()},
    # Add more users as needed
]

sample_packages = [
    {"name": "Package 1", "description": "Description of Package 1", "createdAt": datetime.now()},
    {"name": "Package 2", "description": "Description of Package 2", "createdAt": datetime.now()},
    # Add more packages as needed
]

class Connection:
    def __init__(self):
        try:
            # Initialize MongoDB client
            self.client = MongoClient(mongo_uri)
            # Get the specified database
            self.db = self.client[database_name]
            print("Connected to MongoDB successfully.")
            # Insert sample users into the 'users' collection
            self.insert_sample_users()
            # Insert sample packages into the 'packages' collection
            self.insert_sample_packages()
        except (PyMongoError, ConfigurationError) as e:
            print(f"Failed to connect to MongoDB: {e}")
            self.client = None
            self.db = None

    def insert_sample_users(self):
        try:
            # Insert sample users into the 'users' collection
            users_collection = self.db['users']
            result = users_collection.insert_many(sample_users)
            print(f"Inserted {len(result.inserted_ids)} users.")
        except PyMongoError as e:
            print(f"Failed to insert sample users: {e}")

    def insert_sample_packages(self):
        try:
            # Insert sample packages into the 'packages' collection
            packages_collection = self.db['packages']
            result = packages_collection.insert_many(sample_packages)
            print(f"Inserted {len(result.inserted_ids)} packages.")
        except PyMongoError as e:
            print(f"Failed to insert sample packages: {e}")

# Create a Connection instance to initiate the process
connection = Connection()
