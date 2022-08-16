<script context="module" lang="ts">
	export const load = () => ({
		stuff: {
			title: 'Codeball Epic Demo'
		}
	});
</script>

<script lang="ts">
	import Comments from '../lib/demo/Comments.svelte';
	import Languages from '$lib/demo/Languages.svelte';
	import Prompts from '$lib/demo/Prompts.svelte';

	const files = [
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
		}
	];

	const prompts = [
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
			line: 23,
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
		}
	];

	const comments = (fileName: string, promptID: number, line: number) => {
		const p = prompts.find((prompt) => prompt.id === promptID && prompt.file === fileName);
		if (!p) {
			return [];
		}

		let res = [];

		if (p.line === line) {
			res.push({
				username: 'Coder1',
				text: p.text,
				isCodeball: false
			});
		}

		for (const d of p.diffs) {
			if (d.line === line) {
				res.push({
					username: 'Codeball',
					html: d.diff,
					isCodeball: true
				});
			}
		}

		return res;
	};

	let selectedPrompt = 0;
	let selectedFile = '';

	$: pickedPrompt = prompts.find((p) => p.id === selectedPrompt && selectedFile === p.file);
	$: pickedFile = files.find((f) => f.name === selectedFile);

	$: availablePrompts = prompts.filter((p) => p.file === pickedFile?.name);

	$: lines = pickedFile?.content.split('\n').map((u, i) => ({
		num: i + 1,
		text: u,
		comments: comments(selectedFile, selectedPrompt, i + 1)
	}));
</script>

<div class="flex flex-col-reverse lg:flex-row lg:space-x-4">
	<div class="mt-16 flex-1 lg:mt-0">
		<div class="text-4xl">
			<span class="text-black">Adding code</span>
			<span class="text-gray-800">#1337</span>
		</div>
		<div class="flex items-center space-x-2">
			<div class="test-green-700 rounded-xl bg-green-200 px-4 py-1">Open</div>
			<div>Coder1 wants to merge <code>more-stuff</code> into <code>main</code></div>
		</div>

		{#if selectedFile}
			<div class="mt-8 overflow-hidden rounded-lg border-2 border-gray-300">
				<div class="border-b-2 border-gray-400 bg-gray-200 py-2  px-4 font-mono">
					{pickedFile.name}
				</div>
				<div>
					{#each lines as line}
						<div class="flex font-mono">
							<div
								class="w-16 flex-shrink-0 select-none bg-green-300 px-2 text-right text-gray-800"
							>
								{line.num}
							</div>
							<div class="flex-1 whitespace-pre bg-green-200 px-2">{line.text}</div>
						</div>
						{#if line.comments.length > 0}
							<Comments comments={line.comments} />
						{/if}
					{/each}
				</div>
			</div>
		{:else}
			<Languages {selectedFile} on:pickedLanguage={(e) => (selectedFile = e.detail.selectedFile)} />
		{/if}
	</div>

	{#if selectedFile}
		<div class="space-y-4 lg:mt-32 lg:w-80">
			<Languages {selectedFile} on:pickedLanguage={(e) => (selectedFile = e.detail.selectedFile)} />

			{#if availablePrompts.length > 0}
				<Prompts
					prompts={availablePrompts}
					{selectedPrompt}
					on:pickedPrompt={(e) => (selectedPrompt = e.detail.id)}
				/>
			{/if}
		</div>
	{/if}
</div>
