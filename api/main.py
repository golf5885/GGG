from fastapi import FastAPI, HTTPException
from typing import List
from .database import *
from .dining import *
from fastapi.middleware.cors import CORSMiddleware
import logging

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins, you might want to limit this in production
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message" : "Gourmet Gurus for Gauchos"}

@app.get("/api/De-La-Guerra/menu") 
def printMenu():
    return {"message:" : getMenu("De-La-Guerra")}

@app.get("/api/Ortega/menu") 
def printMenu():
    return {"message:" : getMenu("Ortega")}

@app.get("/api/Portola/menu") 
def printMenu():
    return {"message:" : getMenu("Portola")}

@app.get("/api/Carrillo/menu") 
def printMenu():
    return {"message:" : getMenu("Carrillo")}


# Route to create an item
@app.post("/api/reviews/post", response_model=Item)
def create_item(item: Item):
    cursor = conn.cursor()
    cursor.execute("SELECT MAX(id) FROM reviews")
    max_id = cursor.fetchone()[0]
    new_id = max_id + 1
    
    query = """
        INSERT INTO reviews (id, item_name, rating, comment, reviewer) 
        VALUES (%s, %s, %s, %s, %s)
    """
    cursor.execute(query, (new_id, item.item_name, item.rating, item.comment, item.reviewer))
    conn.commit()
    item.id = cursor.lastrowid
    cursor.close()
    return item

# return url

@app.get("/api/pictures/{item_name}", response_model=Picture)
def read_pictures(name:str): 
    cursor = conn.cursor()
    query = "SELECT id, item_name, image_url FROM pictures WHERE item_name=%s"
    cursor.execute(query, (name,))
    picture_data = cursor.fetchone()
    cursor.close()
    if picture_data:
        return Picture(id=picture_data[0], item_name=picture_data[1], image_url=picture_data[2])
    else:
        raise HTTPException(status_code=404, detail="Picture not found")


# Route to read a specific item -> List
@app.get("/api/reviews/{item_name}", response_model=List[Item])
def read_item(name: str):
    cursor = conn.cursor(buffered=True)
    query = "SELECT id, item_name, rating, comment, reviewer FROM reviews WHERE item_name=%s"
    cursor.execute(query, (name,))
    items = cursor.fetchall()
    cursor.close()
    if not items:
        raise HTTPException(status_code=404, detail="Item not found")
    return [{"id": item[0], "item_name": item[1], "rating": item[2], "comment": item[3], "reviewer": item[4]}for item in items]


# Route to update an item
@app.put("/api/reviews/{review_id}", response_model=Item)
def update_item(review_id: int, item: Item):
    cursor = conn.cursor()
    query = "UPDATE reviews SET item_name=%s, rating=%s, comment=%s, reviewer=%s WHERE id=%s"
    cursor.execute(query, (item.item_name, item.rating, item.comment, item.reviewer, review_id))
    conn.commit()
    cursor.close()
    item.id = review_id
    return item

# Route to delete an item
@app.delete("/api/reviews/{review_id}", response_model=Item)
def delete_item(review_id: int):
    cursor = conn.cursor()
    query = "DELETE FROM reviews WHERE id=%s"
    cursor.execute(query, (review_id,))
    conn.commit()
    cursor.close()
    return {"Deleted"}

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="localhost", port=8000)