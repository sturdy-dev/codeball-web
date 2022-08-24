from flask import Flask, jsonify
import sqlite3

app = Flask(__name__)

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
