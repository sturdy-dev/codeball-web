from flask import Flask, jsonify
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
    return jsonify(tasks)

if __name__ == "__main__":
    app.run()
