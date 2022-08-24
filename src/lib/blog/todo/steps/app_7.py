from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

@app.before_first_request
def create_tables():
    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    c.execute("""CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description text,
        done bool
    )""")
    conn.commit()
    conn.close()

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/tasks")
def tasks():
    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    c.execute("SELECT * FROM tasks")
    tasks = c.fetchall()
    tasks_as_objects = []
    for task in tasks:
        tasks_as_objects.append({
            "id": task[0],
            "description": task[1],
            "done": task[2]
        })
    return jsonify(tasks_as_objects)

@app.route("/add", methods=["POST"])
def add():
    description = request.form["description"]
    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    c.execute("INSERT INTO tasks (description, done) VALUES (?, ?)", (description, False))
    conn.commit()
    conn.close()
    return jsonify({"id": c.lastrowid})

@app.route("/update", methods=["POST"])
def update():
    id = request.form["id"]
    description = request.form["description"]
    done = request.form["done"]
    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    c.execute("UPDATE tasks SET description = ?, done = ? WHERE id = ?", (description, done, id))
    conn.commit()
    conn.close()
    return "Task updated successfully"

if __name__ == "__main__":
    app.run()
