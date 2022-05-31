<script lang="ts">
	let showTheBoringParts = false;
	function toggleShowTheBoringParts() {
		showTheBoringParts = !showTheBoringParts;
	}
</script>

<article class="font-mono">
	<h1 class="text-6xl font-black tracking-tight sm:text-8xl lg:text-9xl">
		HOW<span>?</span><span class="text-gray-400">?</span><span class="text-gray-300">?</span><span
			class="text-gray-200">?</span
		><span class="text-gray-100">?</span>
	</h1>

	<div class="my-8 flex flex-col gap-16 lg:flex-row">
		<div class="flex flex-col gap-8">
			<div class="grid grid-cols-12 gap-2">
				<div class="col-span-7 border-2 border-black p-4 lg:col-span-4">
					<p class="font-bold">Millions of Pull Requests</p>
					<p class="text-gray-500">
						Codeball uses a deep learning model that has been trained on over 1M public and private
						contributions from different organizations.
					</p>
				</div>

				<div
					class="col-span-2 inline-flex items-center justify-around p-4 text-4xl transition-all duration-1000 lg:text-8xl "
				>
					👉
				</div>
				<div
					class="col-span-3 row-span-2 inline-flex items-center justify-around bg-black p-4 p-2 text-center
                    text-2xl font-bold text-white lg:col-span-5
                    "
				>
					<span class="hidden lg:block">Codeball AI</span>
					<span class="block lg:hidden">AI</span>
				</div>

				<div class="col-span-7 border-2 border-black p-4 lg:col-span-4">
					<p class="font-bold">Your Pull Requests</p>

					<ul class="ml-4 list-disc text-gray-500">
						<li>Change diffs</li>
						<li>Recent repository activity</li>
						<li>Recent coder activity</li>
						<li>Coder reputation</li>
						<li>Size and shape of the contribution</li>
						<li>Coder knowledge of changed files</li>
						<li>&hellip; over 100 other features</li>
					</ul>
				</div>

				<div
					class="col-span-2 inline-flex items-center justify-around p-4 text-4xl transition-all duration-1000 lg:text-8xl "
				>
					👉
				</div>

				<div
					class="col-span-2 col-start-10 inline-flex rotate-[20deg] items-center justify-around  p-4 text-8xl transition-all duration-1000 lg:col-span-5 lg:col-start-7 lg:rotate-0"
				>
					👇
				</div>

				<div
					class="col-span-12 col-start-1 inline-flex items-center justify-around border-2 border-black p-4 text-2xl font-bold lg:col-span-5 lg:col-start-7
                "
				>
					Prediction 🧠
				</div>

				<div
					class="col-start-0 col-span-6 inline-flex items-center justify-around p-4 text-8xl lg:col-span-2 lg:col-start-7 "
				>
					👇
				</div>
				<div
					class="col-span-6 col-start-7 inline-flex items-center justify-around p-4 text-8xl lg:col-span-3 lg:col-start-9 "
				>
					👇
				</div>

				<div
					class="col-start-0 col-span-6 inline-flex items-center  justify-around border-2 border-green-800 border-black p-4 text-2xl font-bold text-green-800 lg:col-span-2 lg:col-start-7
                "
				>
					Approved
				</div>

				<div
					class="col-span-6 col-start-7 inline-flex items-center  justify-around border-2 border-red-800 border-black p-4 text-2xl font-bold text-red-800 lg:col-span-3 lg:col-start-9
                "
				>
					Not approved
				</div>
			</div>

			<div class="mb-6">
				<div class="mb-8 text-2xl text-gray-500">
					[<span
						class="cursor-pointer"
						on:click|preventDefault|stopPropagation={toggleShowTheBoringParts}
						>{(showTheBoringParts ? 'hide' : 'show') + ' the boring parts'}</span
					>]
				</div>

				{#if showTheBoringParts}
					<div class="space-y-4 text-gray-500">
						<h1 class="text-4xl font-black tracking-tight text-gray-800">THE BORING PARTS</h1>
						<h3 class="text-lg font-bold text-gray-800">Data set</h3>
						<p>
							Codeball is trained on metadata from over <span class="font-bold">one million</span> Pull
							Requests and thousands of different repositories. Using our custom derivation method, Codeball
							performs feature extraction for each PR, building up the broader context in which the PR
							was submitted.
						</p>
						<p>
							For example, how frequently affected files have changed and by whom, the semantic of
							the diffs and, of course, if the Pull Request was approved and merged without
							objections or further feedback.
						</p>
						<h3 class="text-lg font-bold text-gray-800">Model</h3>
						<p>
							Codeball uses a <a
								class="text-black"
								href="https://en.wikipedia.org/wiki/Multilayer_perceptron"
								>Multi-layer Perceptron classifier</a
							> neural network as prediction model. The model takes hundreds of inputs in it's input
							layer, has two hidden layers and a single output scoring the likelihood a Pull Request
							would be approved.
						</p>
						<h3 class="text-lg font-bold text-gray-800">Indicators</h3>
						<p>
							There are hundreds of indicators for each Pull Request (the input layer). Broadly
							speaking, they fall in three different categories — Basic, Derived and Categorical.
						</p>
						<ul class="list-inside list-disc">
							<li>
								<span class="font-bold">Basic</span> — Metadata directly associated with the Pull Request.
								For example, number of lines added, removed etc.
							</li>
							<li>
								<span class="font-bold">Derived</span> — Data that is indirectly associated with the
								Pull request. Examples include number of days since last change to file, file ownership
								ratios, file volatility score, author-file score etc.
							</li>
							<li>
								<span class="font-bold">Categorical variables</span> — Derived categories for the
								Pull Request, for instance the file type categories. A more advanced example
								category is the
								<a class="text-black" href="https://en.wikipedia.org/wiki/Perceptual_hashing"
									>perceptual hash</a
								> of file diffs.
							</li>
						</ul>

						<h3 class="text-lg font-bold text-gray-800">Classification performance</h3>
						<p>
							Codeball's model performance is always evaluated using code contributions it has never
							been trained on. The primary criteria optimized for is <a
								class="text-black"
								href="https://en.wikipedia.org/wiki/Precision_and_recall">precision</a
							> — true_positives / (true_positives + false_positives). Codeball achieves precision greater
							than 0.99.
						</p>
					</div>
				{/if}
			</div>

			<ul class="flex gap-2">
				<li>[<a href="/">index</a>]</li>
				<li>[<a href="/faq">faq</a>]</li>
				<li>[<a href="https://github.com/sturdy-dev/codeball-action">github action</a>]</li>
			</ul>
		</div>
	</div>
</article>
