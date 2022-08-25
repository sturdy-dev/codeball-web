import { lineMode } from './diff';
import { fileFromString, type File, type Comment } from './file';

export type Example = {
	file: File;
	examples: Comment[][];
};

export const codeball = { name: 'Codeball', avatarUrl: '/avatar-codeball.png' };

const reviewer = { name: 'FriendlyReviewer' };

export const examples: Example[] = [
	{
		file: {
			...fileFromString(`package db

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
}`),
			name: 'db.go'
		},
		examples: [
			[
				{
					isOutdated: false,
					line: 21,
					text: Promise.resolve(Promise.resolve('Test the db connection before returning')),
					author: reviewer,
					replies: [
						{
							isOutdated: false,
							line: 21,
							text: Promise.resolve(
								Promise.resolve(
									lineMode(
										'',
										`\tif err := db.Ping(); err != nil {\n\t\treturn nil, fmt.Errorf("error pinging db: %w", err)\n\t}\n\n`
									)
								)
							),
							author: codeball,
							replies: []
						}
					]
				}
			],
			[
				{
					isOutdated: false,
					text: Promise.resolve('Add error return with fmt.Errorf instead of panics'),
					line: 15,
					author: reviewer,
					replies: [
						{
							isOutdated: false,
							line: 15,
							author: codeball,
							text: Promise.resolve(
								lineMode(
									'\t\tpanic(err)',
									'\t\treturn nil, fmt.Errorf("failed to open database: %v", err)'
								)
							),
							replies: []
						}
					]
				},
				{
					isOutdated: false,
					line: 3,
					author: codeball,
					text: Promise.resolve(lineMode('', '\t"fmt"')),
					replies: []
				},
				{
					isOutdated: false,
					line: 12,
					author: codeball,
					text: Promise.resolve(
						lineMode(
							'func NewPsql(dbSourceURL string) *sqlx.DB {',
							'func NewPsql(dbSourceURL string) (*sqlx.DB, error) {'
						)
					),

					replies: []
				}
			]
		]
	},
	{
		file: {
			...fileFromString(`const http = require('http');

	http.createServer((request, response) => {
	response.writeHead(200, {
	'Content-Type': 'text/plain'
	});

	response.write('Hello, World!\\n');

	response.end();
	}).listen(1337);`),
			name: 'server.js'
		},
		examples: [
			[
				{
					isOutdated: false,
					line: 4,
					author: reviewer,
					text: Promise.resolve('Remember to add CORS headers'),
					replies: [
						{
							isOutdated: false,
							line: 4,
							author: codeball,
							text: Promise.resolve(
								lineMode(
									`\t\t'Content-Type': 'text/plain'`,
									`\t\t'Content-Type': 'text/plain',\n\t\t'Access-Control-Allow-Origin': '*'`
								)
							),
							replies: []
						}
					]
				}
			],
			[
				{
					isOutdated: false,
					line: 7,
					author: reviewer,
					text: Promise.resolve(`Let's make this more fun, add some emojis`),
					replies: [
						{
							isOutdated: false,
							line: 7,
							author: codeball,
							text: Promise.resolve(
								lineMode(
									`\tresponse.write('Hello, World!\\n');`,
									`\tresponse.write('Hello, World! 🌍\\n');`
								)
							),
							replies: []
						}
					]
				}
			]
		]
	},
	{
		file: {
			...fileFromString(`public class Main {
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
}`),
			name: 'TechNumber.java'
		},
		examples: [
			[
				{
					isOutdated: false,
					line: 0,
					author: codeball,
					text: Promise.resolve(
						lineMode('public class Main {', 'import java.util.Scanner;\n\npublic class Main {')
					),
					replies: []
				},
				{
					isOutdated: false,
					line: 3,
					author: reviewer,
					text: Promise.resolve('Ask the user to tneter a numer, and add imports'),
					replies: [
						{
							isOutdated: false,
							line: 4,
							author: codeball,
							text: Promise.resolve(
								lineMode(
									'\t\tn = 2025;',
									'\t\tScanner sc = new Scanner(System.in);\n\t\tSystem.out.println("Enter a number: ");\n\t\tn = sc.nextInt();'
								)
							),
							replies: []
						}
					]
				}
			],
			[
				{
					isOutdated: false,
					line: 18,
					author: reviewer,
					text: Promise.resolve('Use String.format'),
					replies: [
						{
							isOutdated: false,
							line: 18,
							author: codeball,
							text: Promise.resolve(
								lineMode(
									'\t\tSystem.out.println(n + " is a tech number.");',
									'\t\tSystem.out.println(String.format("%d is a tech number.", n));'
								)
							),
							replies: []
						}
					]
				},
				{
					isOutdated: false,
					line: 20,
					author: codeball,
					text: Promise.resolve(
						lineMode(
							'\t\tSystem.out.println(n + " is not a tech number.");',
							'\t\tSystem.out.println(String.format("%d is not a tech number.", n));'
						)
					),
					replies: []
				},
				{
					isOutdated: false,
					line: 23,
					author: codeball,
					text: Promise.resolve(
						lineMode(
							'\t\tSystem.out.println(n + " is not a tech number.");',
							'\t\tSystem.out.println(String.format("%d is not a tech number.", n));'
						)
					),
					replies: []
				}
			]
		]
	}
];
