<div class="flex w-full flex-col items-center ">
	<div
		class="flex w-full  max-w-7xl flex-col items-center justify-between md:flex-row md:items-start md:py-16"
	>
		<div class=" flex w-full flex-col  gap-8 px-4">
			<slot name="left" />
		</div>

		<div class=" flex flex-col items-center px-4 md:max-w-[30rem]">
			<slot name="right" />
		</div>
	</div>
</div>
