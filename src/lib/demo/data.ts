export const files = [
	{
		name: 'db.go',
		language: 'Go',
		content: `package db

import (
\t"time"

\t"github.com/jmoiron/sqlx"

\t_ "github.com/lib/pq"
)

type Path string

func NewPsql(dbSourceURL string) *sqlx.DB {
\tdb, err := sqlx.Open("postgres", dbSourceURL)
\tif err != nil {
            panic(err)
\t}

\tdb.SetMaxOpenConns(25)
\tdb.SetMaxIdleConns(25)
\tdb.SetConnMaxLifetime(5 * time.Minute)

\treturn db
}
`
	},
	{
		name: 'server.js',
		language: 'JavaScript',
		content: `const http = require('http');

http.createServer((request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/plain'
    });

    response.write('Hello, World!\\n');

    response.end();
}).listen(1337);`
	},

	{
		name: 'TechNumber.java',
		language: 'Java',
		content: `public class Main {
  public static void main(String args[]) {
    int n, num, firstHalf, secondHalf, digits = 0, squareOfSum = 0;
    n = 2025;
    num = n;

    while (num > 0) {
      digits++;
      num = num / 10;
    }

    if (digits % 2 == 0) {
      num = n;
      firstHalf = num % (int) Math.pow(10, digits / 2);
      secondHalf = num / (int) Math.pow(10, digits / 2);
      squareOfSum = (firstHalf + secondHalf) * (firstHalf + secondHalf);

      if (n == squareOfSum) {
        System.out.println(n + " is a tech number.");
      } else {
        System.out.println(n + " is not a tech number.");
      }
    } else {
      System.out.println(n + " is not a tech number.");
    }
  }
}`
	}
];

export const prompts = [
	{
		id: 1,
		file: 'server.js',
		line: 5,
		text: 'Remember to add CORS headers',
		diffs: [
			{
				line: 5,
				diff: `<div class="bg-red-200 text-red-600">        'Content-Type': 'text/plain'</div><div class="bg-green-200 text-green-600">        'Content-Type': 'text/plain'<span class="inline-block bg-green-400 text-green-800">,</span></div><div class="bg-green-400 text-green-800">        'Access-Control-Allow-Origin': '*'</div>`
			}
		]
	},

	{
		id: 2,
		file: 'server.js',
		line: 8,
		text: "Let's make this more fun, add some emojis",
		diffs: [
			{
				line: 8,
				diff: `<div class="bg-red-200 text-red-600">    response.write('Hello, World!\\n');</div><div class="bg-green-200 text-green-600">    response.write('Hello, World!<span class="inline-block bg-green-400 text-green-800"> 🌍</span>\\n');</div>`
			}
		]
	},

	{
		id: 3,
		file: 'db.go',
		line: 22,
		text: 'Test the db connection before returning',
		diffs: [
			{
				line: 22,
				diff: `<div class="bg-green-200 text-green-600">\tif err := db.Ping(); err != nil {</div><div class="bg-green-200 text-green-600">\t\treturn nil, fmt.Errorf("error pinging db: %w", err)</div><div class="bg-green-200 text-green-600">\t}</div><div class="bg-green-200 text-green-600">\t</div>`
			}
		]
	},

	{
		id: 4,
		file: 'db.go',
		line: 16,
		text: 'Add error return with fmt.Errorf instead of panics',

		diffs: [
			{
				line: 4,
				diff: `<div class="bg-green-200 text-green-600">\t"fmt"</div>`
			},
			{
				line: 13,
				diff: `<div class="bg-red-200 text-red-600">func NewPsql(dbSourceURL string) *sqlx.DB {</div><div class="bg-green-200 text-green-600">func NewPsql(dbSourceURL string) (*sqlx.DB, error) {</div>`
			},
			{
				line: 16,
				diff: `<div class="bg-red-200 text-red-600">            panic(err)</div><div class="bg-green-200 text-green-600">            return nil, fmt.Errorf("failed to open database: %v", err)</div>`
			}
		]
	},

	{
		id: 5,
		file: 'TechNumber.java',
		line: 4,
		text: 'Ask the user to enter a number, and add imports',
		diffs: [
			{
				line: 4,
				diff: `<div class="bg-green-200 text-green-600">    Scanner sc = new Scanner(System.in);</div><div class="bg-green-200 text-green-600">    System.out.println("Enter a number: ");</div><div class="bg-red-200 text-red-600">    n = 2025;</div><div class="bg-green-200 text-green-600">    n = sc.nextInt();</div>`
			},
			{
				line: 1,
				diff: `<div class="bg-green-200 text-green-600">import java.util.Scanner;</div>`
			}
		]
	},

	{
		id: 6,
		file: 'TechNumber.java',
		line: 19,
		text: 'Use String.format',
		diffs: [
			{
				line: 19,
				diff: `<div class="bg-red-200 text-red-600">        System.out.println(<span class="inline-block bg-red-400 text-red-800">n + " is a tech number."</span>);</div><div class="bg-green-200 text-green-600">        System.out.println(<span class="inline-block bg-green-400 text-green-800">String.format("%d is a tech number.", n)</span>);</div>`
			},
			{
				line: 21,
				diff: `<div class="bg-red-200 text-red-600">        System.out.println(<span class="inline-block bg-red-400 text-red-800">n + " is not a tech number."</span>);</div><div class="bg-green-200 text-green-600">        System.out.println(<span class="inline-block bg-green-400 text-green-800">String.format("%d is not a tech number.", n)</span>);</div>`
			},
			{
				line: 24,
				diff: `<div class="bg-red-200 text-red-600">      System.out.println(<span class="inline-block bg-red-400 text-red-800">n + " is not a tech number."</span>);</div><div class="bg-green-200 text-green-600">      System.out.println(<span class="inline-block bg-green-400 text-green-800">String.format("%d is not a tech number.", n)</span>);</div>`
			}
		]
	}
];
