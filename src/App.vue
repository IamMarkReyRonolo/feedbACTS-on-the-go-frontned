<template>
	<v-app>
		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
	export default {
		name: "App",

		data: () => ({
			//
		}),
	};
</script>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");
	@import url("https://fonts.googleapis.com/css2?family=Comfortaa:wght@300&display=swap");

	* {
		box-sizing: border-box;
		padding: 0px;
		margin: 0px;
	}
	#app {
		font-family: "Poppins", sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
	}

	a {
		text-decoration: none;
	}
</style>
