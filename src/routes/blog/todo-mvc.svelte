<script context="module" lang="ts">
	export const load = () => ({
		stuff: {
			title: 'Codeball TODO MVC'
		}
	});
</script>

<script lang="ts">
	import Button from '$lib/Button.svelte';
	import Step from '$lib/blog/todo/Step.svelte';

	const steps = [
		{
			prompt: 'Create a hello world flask webserver',
			code: `from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

if __name__ == "__main__":
    app.run()
`,
			comment: `Let's get started! Codex is able to setup a flask server right away! In fact, this server is now up and running [<a href="https://codeball-mvc.fly.dev/" class="text-gray-800">here</a>]`,
			addedLines: []
		},
		{
			prompt: 'Add a /tasks endpoint listing all tasks in a sqlite database',
			code: `from flask import Flask, jsonify
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
`,
			addedLines: [2, 10, 11, 12, 13, 14, 15, 16],
			comment: `Codex adds the endpoint correctly, the file or prompt has no previous mention of sqlite or any tables (table names etc).<br><br>So Codex makes something up for us, so far so good!`
		},

		{
			prompt:
				'before_first_request : Make sure that the tasks table exists (id auto incremental id, description text, done bool)',
			comment: `The tasks.db database does not exist yet, and has no tables.<br><br>Let's create a table structure, and ask Codex to set it up if it does not exist. This took some tweaking to get right: prompts like <code>setup ... before the app starts</code> creates code that does not work well with Flask. But adding the keyword <code>before_first_request</code> fixes it and Codex does the right thing!`,
			code: `from flask import Flask, jsonify
import sqlite3

app = Flask(__name__)

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
    return jsonify(tasks)

if __name__ == "__main__":
    app.run()
`,
			addedLines: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
		},
		{
			prompt: 'Update the tasks() method to return tasks with object keys',
			code: `from flask import Flask, jsonify
import sqlite3

app = Flask(__name__)

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
    tasks_list = []
    for task in tasks:
        tasks_list.append({
            "id": task[0],
            "description": task[1],
            "done": task[2]
        })
    return jsonify(tasks_list)

if __name__ == "__main__":
    app.run()
`,
			addedLines: [28, 29, 30, 31, 32, 33, 34, 35],
			comment: `Let's make the /tasks endpoint easier to consume (it's currently returning a list of lists), return as a list of objects.<br><br>I don't know why I called it "with object keys", it's the first thing that came to mind, and it worked!`
		},
		{
			prompt: 'Add a /add endpoint that inserts new entries to the tasks table.',
			comment: `There is no CRUD without the C!<br><br>Looks good, but beware, for some reason (some variation of this prompt and/or input found during testing) caused Codex to generate code prone to SQL injection.`,
			code: `from flask import Flask, jsonify, request
import sqlite3

app = Flask(__name__)

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
    tasks_list = []
    for task in tasks:
        tasks_list.append({
            "id": task[0],
            "description": task[1],
            "done": task[2]
        })
    return jsonify(tasks_list)

@app.route("/add", methods=["POST"])
def add():
    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    description = request.form["description"]
    c.execute("INSERT INTO tasks (description, done) VALUES (?, ?)", (description, 0))
    conn.commit()
    conn.close()
    return "Success"

if __name__ == "__main__":
    app.run()
`,
			addedLines: [37, 38, 39, 40, 41, 42, 43, 44, 45]
		},
		{
			prompt: 'Add a /update endpoint that updates task descriptions and done status',
			comment: `Codex is on a streak, this works nicely!<br><br>I think that we have everything we need to run our app now, let's deploy it!`,
			code: `from flask import Flask, jsonify, request
import sqlite3

app = Flask(__name__)

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
    tasks_list = []
    for task in tasks:
        tasks_list.append({
            "id": task[0],
            "description": task[1],
            "done": task[2]
        })
    return jsonify(tasks_list)

@app.route("/add", methods=["POST"])
def add():
    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    description = request.form["description"]
    c.execute("INSERT INTO tasks (description, done) VALUES (?, ?)", (description, 0))
    conn.commit()
    conn.close()
    return "Success"

@app.route("/update", methods=["POST"])
def update():
    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    id = request.form["id"]
    description = request.form["description"]
    done = request.form["done"]
    c.execute("UPDATE tasks SET description = ?, done = ? WHERE id = ?", (description, done, id))
    conn.commit()
    conn.close()
    return "Success"

if __name__ == "__main__":
    app.run()
`,
			addedLines: [47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57]
		},
		{
			prompt: 'Add CORS headers to allow connections from any host',
			comment: `Uuuuh! Our friend CORS is here to stop us from having too much fun and deploying. We need to add a CORS handler.<br><br>After this, the app was up and running with no problems!`,
			code: `from flask import Flask, jsonify, request
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
    tasks_list = []
    for task in tasks:
        tasks_list.append({
            "id": task[0],
            "description": task[1],
            "done": task[2]
        })
    return jsonify(tasks_list)

@app.route("/add", methods=["POST"])
def add():
    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    description = request.form["description"]
    c.execute("INSERT INTO tasks (description, done) VALUES (?, ?)", (description, 0))
    conn.commit()
    conn.close()
    return "Success"

@app.route("/update", methods=["POST"])
def update():
    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    id = request.form["id"]
    description = request.form["description"]
    done = request.form["done"]
    c.execute("UPDATE tasks SET description = ?, done = ? WHERE id = ?", (description, done, id))
    conn.commit()
    conn.close()
    return "Success"

if __name__ == "__main__":
    app.run()
`,
			addedLines: [2, 6]
		},
		{
			prompt: 'Update the add() method to return the id of the task created',
			comment: `The response from /add was a bit boring, and to improve the frontend (that I developer manually at this stage), it was nice to have the ID of the task in the response.`,
			code: `from flask import Flask, jsonify, request
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
    tasks_list = []
    for task in tasks:
        tasks_list.append({
            "id": task[0],
            "description": task[1],
            "done": task[2]
        })
    return jsonify(tasks_list)

@app.route("/add", methods=["POST"])
def add():
    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    description = request.form["description"]
    c.execute("INSERT INTO tasks (description, done) VALUES (?, ?)", (description, 0))
    conn.commit()
    conn.close()
    return str(c.lastrowid)

@app.route("/update", methods=["POST"])
def update():
    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    id = request.form["id"]
    description = request.form["description"]
    done = request.form["done"]
    c.execute("UPDATE tasks SET description = ?, done = ? WHERE id = ?", (description, done, id))
    conn.commit()
    conn.close()
    return "Success"

if __name__ == "__main__":
    app.run()
`,
			addedLines: [47]
		},
		{
			prompt: 'Format',
			comment: `This step is just for fun, and with a simple "Format" prompt, the code was formatted to be compliant with PEP 8!<br><br>Brb while I run: <code>pip uninstall black && pip install codex-formatter</code>`,
			code: `from flask import Flask, jsonify, request
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

    tasks_list = []
    for task in tasks:
        tasks_list.append({
            "id": task[0],
            "description": task[1],
            "done": task[2]
        })

    return jsonify(tasks_list)


@app.route("/add", methods=["POST"])
def add():
    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    description = request.form["description"]
    c.execute("INSERT INTO tasks (description, done) VALUES (:description, :done)",
              {"description": description, "done": 0})

    conn.commit()
    conn.close()
    return str(c.lastrowid)


@app.route("/update", methods=["POST"])
def update():
    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    id = request.form["id"]
    description = request.form["description"]
    done = request.form["done"]
    c.execute("UPDATE tasks SET description = :description, done = :done WHERE id = :id",
              {"description": description, "done": done, "id": id})

    conn.commit()
    conn.close()
    return "Success"


if __name__ == "__main__":
    app.run()
`,
			addedLines: [8, 23, 28, 35, 43, 46, 59, 74]
		},
		{
			prompt:
				'before_first_request : If the tasks table is empty, add three rows to the tasks table.',
			comment: `To make [<a href="https://todo.codeball.ai/" class="text-gray-800">the demo</a>] nicer to look at, let's add some example data!<br><br>I can sense that Codex is getting annoyed with me, and asks me to learn Python by myself! <span class="text-2xl">😬</span>`,
			code: `from flask import Flask, jsonify, request
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

    c.execute("SELECT * FROM tasks")
    tasks = c.fetchall()

    if len(tasks) == 0:
        c.execute("INSERT INTO tasks (description, done) VALUES (:description, :done)",
                  {"description": "Learn Python", "done": 0})
        c.execute("INSERT INTO tasks (description, done) VALUES (:description, :done)",
                  {"description": "Learn Flask", "done": 0})
        c.execute("INSERT INTO tasks (description, done) VALUES (:description, :done)",
                  {"description": "Learn SQLite", "done": 0})

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

    tasks_list = []
    for task in tasks:
        tasks_list.append({
            "id": task[0],
            "description": task[1],
            "done": task[2]
        })

    return jsonify(tasks_list)


@app.route("/add", methods=["POST"])
def add():
    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    description = request.form["description"]
    c.execute("INSERT INTO tasks (description, done) VALUES (:description, :done)",
              {"description": description, "done": 0})

    conn.commit()
    conn.close()
    return str(c.lastrowid)


@app.route("/update", methods=["POST"])
def update():
    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    id = request.form["id"]
    description = request.form["description"]
    done = request.form["done"]
    c.execute("UPDATE tasks SET description = :description, done = :done WHERE id = :id",
              {"description": description, "done": done, "id": id})

    conn.commit()
    conn.close()
    return "Success"


if __name__ == "__main__":
    app.run()
`,
			addedLines: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
		}
	];
</script>

<div class="prose mb-4">
	<h1>TODO MVC</h1>

	<p>
		In the last few weeks, I and the rest of our team have been playing around a lot with OpenAI's
		Codex Model, as we've incorporated it into our latest feature (the suggester), and we've been
		generally impressed by it's performance.
	</p>

	<p>
		I had the idea of a challenge for myself: Create something useful, from scratch, using only
		Codex.
	</p>
</div>

<div class="relative space-y-32 p-4">
	{#each steps as step}
		<Step prompt={step.prompt} code={step.code} added={step.addedLines} comment={step.comment} />
	{/each}
</div>

<Button href="/">HIRE A BOT</Button>

<div class="prose mt-4">
	<p class="text-blue-600">
		With 🧠 from the Codeballers (Kiril, Nikita, and Gustav),<br />
		August 2022
	</p>

	<hr />

	<h2>Read more</h2>
	<ul>
		<li>
			<a href="/blog/waiting-for-code-review"
				>You are waiting for code review more than you should</a
			>
		</li>
		<li><a href="/blog/supabase-deepdive">Codeball x Supabase Deepdive</a></li>
	</ul>
</div>
