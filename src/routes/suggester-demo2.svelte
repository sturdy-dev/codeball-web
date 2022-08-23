<script lang="ts">
	import { Editable } from '$lib/demo2';

	const text = `package main

import (
    "fmt"
)

func main() {
    fmt.Println("Hello, World!")
}`;
</script>

<Editable {text} />
