import mysql.connector
from pydantic import BaseModel

# Database configuration
db_config = {
    'host': 'localhost',
    'user': 'root',
    'passwd': '',
    'db': 'food',
}

# Create a connection to the database
conn = mysql.connector.connect(**db_config)

# Pydantic model to define the schema of the data
class Item(BaseModel):
    id: int
    item_name: str
    rating: int
    comment: str = None
    reviewer: str
    
class Picture(BaseModel):
    id: int
    item_name: str
    image_url: str