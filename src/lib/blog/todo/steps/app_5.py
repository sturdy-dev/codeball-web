from flask import Flask, jsonify, request
import sqlite3

app = Flask(__name__)

@app.before_first_request
def create_tables():
    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    c.execute("""CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT,
        done BOOLEAN
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
    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    c.execute("INSERT INTO tasks (description, done) VALUES (?, ?)", (request.form["description"], 0))
    conn.commit()
    conn.close()
    return "OK"

@app.route("/update", methods=["POST"])
def update():
    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    c.execute("UPDATE tasks SET description = ?, done = ? WHERE id = ?", (request.form["description"], request.form["done"], request.form["id"]))
    conn.commit()
    conn.close()
    return "OK"

if __name__ == "__main__":
    app.run()
