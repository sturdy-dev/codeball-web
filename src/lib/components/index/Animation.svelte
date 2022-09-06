<script lang="ts">
	import { onMount } from 'svelte';
	import Scrambler from './scrambler';

	type findable = {
		show: boolean;
		run: boolean;
		done: boolean;
	};

	const iLoveSvelte = () => {
		title = title;
		username = username;
		branch = branch;
		fileName = fileName;
	};

	const find = (a: findable, delay: number) => {
		setTimeout(() => {
			a.show = true;
			a.run = true;
			iLoveSvelte();

			setTimeout(() => {
				a.run = false;
				iLoveSvelte();
			}, 700);

			setTimeout(() => {
				a.run = true;
				iLoveSvelte();
			}, 700 * 2);

			setTimeout(() => {
				a.show = false;
				a.done = true;
				iLoveSvelte();
			}, 700 * 3);
		}, delay);
	};

	let username: findable = {
		show: false,
		run: false,
		done: false
	};

	let title: findable = {
		show: false,
		run: false,
		done: false
	};

	let branch: findable = {
		show: false,
		run: false,
		done: false
	};

	let fileName: findable = {
		show: false,
		run: false,
		done: false
	};

	let animateWindow = false;

	let approved = false;
	let approvedFade = false;

	let outputUsername = '';
	let outputSimplicityRanking = '';
	let outputType = '';
	let outputReputation = 0;
	let outputKingOfTheHill = 0;
	let outputUsernameCreditScore = 0;

	const scramble = () => {
		new Scrambler().scramble('Happy Coder', (text) => {
			outputUsername = text;
		});

		new Scrambler().scramble('FEATURE', (text) => {
			outputType = text;
		});

		const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

		new Scrambler().scramble(
			'2492',
			(text) => {
				outputReputation = text;
			},
			{ characters: digits }
		);

		new Scrambler().scramble(
			'73',
			(text) => {
				outputKingOfTheHill = text;
			},
			{ characters: digits }
		);

		new Scrambler().scramble(
			'902.2',
			(text) => {
				outputSimplicityRanking = text;
			},
			{ characters: digits }
		);

		new Scrambler().scramble(
			'82.7',
			(text) => {
				outputUsernameCreditScore = text;
			},
			{ characters: digits }
		);
	};

	const run = () => {
		setTimeout(() => {
			animateWindow = true;
		}, 100);

		find(title, 500);
		find(fileName, 500);
		find(username, 550);
		find(branch, 1300);

		setTimeout(scramble, 500);

		setTimeout(() => (approved = true), 4200);
		setTimeout(() => (approvedFade = true), 4300);
	};

	onMount(run);
</script>

<div class="overflow-hidden">
	<div
		class="scanner mt-16 flex-1 border-black lg:mt-0 lg:border-2 lg:shadow-lg"
		class:run={animateWindow}
	>
		<div class="flex hidden space-x-2 border-b-2 border-black p-4 lg:block">
			<div class="space-y-2">
				<div class="flex space-x-2">
					<div class="h-3 w-3 rounded-full bg-red-600" />
					<div class="h-3 w-3 rounded-full bg-yellow-600" />
					<div class="h-3 w-3 rounded-full bg-green-600" />
				</div>
				<div class="flex items-center space-x-2">
					<div class="text-2xl">&larr;</div>
					<div class="text-2xl">&rarr;</div>
					<div class="text-2xl">🏠</div>
					<div class="px-2">https://codehub.com/FancyStartup/EpicProject/pulls/1337</div>
				</div>
			</div>
		</div>

		<div class="flex flex-col gap-4 lg:p-4">
			<div class="flex items-end ">
				<div class="flex flex-1 flex-col gap-2">
					<div class="flex space-x-2 text-4xl">
						<span
							class="transition-bg rounded-md px-2 py-0.5 duration-200"
							class:run={title.run}
							class:found={title.show}
							class:bg-red-800={title.done}
							class:text-white={title.done}
						>
							Adding code
						</span>
						<span class="text-gray-800">#1337</span>
					</div>
					<div class="flex items-center space-x-2">
						<div class="test-green-700 rounded-xl bg-green-200 px-4 py-2">Open</div>
						<div>
							<span
								class="transition-bg rounded-md px-2 py-0.5 duration-200"
								class:found={username.show}
								class:run={username.run}
								class:bg-green-800={username.done}
								class:text-white={username.done}>HappyCoder</span
							>
							wants to merge <code class="text-blue-800">more-stuff</code>
							into
							<span
								class:found={branch.show}
								class:run={branch.run}
								class:bg-sky-800={branch.done}
								class:text-white={branch.done}
								class:text-blue-800={!branch.done}
								class="transition-bg rounded-md px-2 py-0.5 duration-200">main</span
							>
						</div>
					</div>
				</div>
			</div>

			<div class="overflow-hidden rounded-lg border-2 border-gray-300">
				<div class="border-b-2 border-gray-400 bg-gray-200 py-2  px-4 font-mono">
					<span
						class:found={fileName.show}
						class:run={fileName.run}
						class:bg-orange-800={fileName.done}
						class:text-white={fileName.done}
						class="transition-bg rounded-md px-2 py-0.5 duration-200">transformer.py</span
					>
				</div>
			</div>

			<div class="overflow-hidden rounded-lg border-2 border-gray-300">
				<div class="border-b-2 border-gray-400 bg-gray-200 py-2  px-4 font-mono">
					<span
						class:found={fileName.show}
						class:run={fileName.run}
						class:bg-orange-800={fileName.done}
						class:text-white={fileName.done}
						class="transition-bg rounded-md px-2 py-0.5 duration-200">feature.py</span
					>
				</div>
			</div>

			{#if approved}
				<div
					class="duration-2000 flex items-center gap-2 text-black text-green-800 transition-all"
					class:opacity-100={approvedFade}
					class:opacity-0={!approvedFade}
				>
					<div class="text-2xl">✅</div>
					<div>Codeball <span class="text-green-900">[bot]</span> approved these changes</div>
					<div class="flex-1" />
					<div>just now</div>
				</div>
			{/if}
		</div>
	</div>

	<div class="mt-8 flex w-full items-start">
		<pre
			class="block flex-1 rounded-md bg-black p-4 leading-7 text-white drop-shadow-lg"
			style="text-shadow: 0 0 10px bisque">
&#123;
    "author": <span
				class:bg-green-800={username.done}
				class="transition-bg rounded-sm px-2 py-0.5 duration-200">"{outputUsername}"</span
			>,
    "authorScore": <span
				class:bg-green-800={username.done}
				class="transition-bg rounded-sm px-2 py-0.5 duration-200">{outputUsernameCreditScore}</span
			>,
    "type": <span
				class:bg-red-800={title.done}
				class="transition-bg rounded-sm px-2 py-0.5 duration-200">"{outputType}"</span
			>,
    "kingOfTheHillScore": <span
				class:bg-sky-800={branch.done}
				class="transition-bg rounded-sm px-2 py-0.5 duration-200">{outputKingOfTheHill}</span
			>,
    "simplicityRanking": <span
				class:bg-sky-800={branch.done}
				class="transition-bg rounded-sm px-2 py-0.5 duration-200">{outputSimplicityRanking}</span
			>,
    "fileReputation": <span
				class:bg-orange-800={fileName.done}
				class="transition-bg rounded-sm px-2 py-0.5 duration-200">{outputReputation}</span
			>,<span class="hidden md:inline">
    "patterns": <span
					class:bg-orange-800={fileName.done}
					class="transition-bg rounded-sm px-2 py-0.5 duration-200"
					>{fileName.done ? '[19333, 52185, 85664, 35212, 80203]' : '[]'}</span
				>,</span
			>
    ...
&#125;
</pre>
	</div>
</div>

<style>
	@property --scanner-pos {
		syntax: '<percentage>';
		inherits: false;
		initial-value: -6%;
	}

	.scanner {
		/*  needed for firefox to have a valid output */
		--scanner-pos: -6%;
		/**/
		transition: --scanner-pos 2s;
		transition-timing-function: ease-in-out;
		background: linear-gradient(
			90deg,
			transparent calc(var(--scanner-pos)),
			var(--color-blue-800) calc(var(--scanner-pos) + 3%),
			transparent calc(var(--scanner-pos) + 4%),
			transparent calc(100%)
		);
	}

	.scanner.run,
	.scanner:hover {
		/*--a:360deg;*/
		--scanner-pos: 100%;
		/*--c:green;*/
	}

	.found {
		--scanner-pos: 5%;
		transition: --scanner-pos 0.7s;
		transition-timing-function: ease-in-out;
		background: linear-gradient(
			90deg,
			transparent calc(var(--scanner-pos) - 5%),
			var(--color-blue-800) calc(var(--scanner-pos)),
			transparent calc(var(--scanner-pos) + 5%),
			transparent calc(100%)
		);
	}

	.found.run,
	.found:hover {
		/*--a:360deg;*/
		--scanner-pos: 95%;
		/*--c:green;*/
	}
</style>
