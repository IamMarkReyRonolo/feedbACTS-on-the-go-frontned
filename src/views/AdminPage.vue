<template>
	<div class="adminPage">
		<div class="page" v-if="fetched">
			<Header />
			<MainContent />
		</div>
		<div class="loading" v-if="loading"></div>
		<div class="error" v-if="error"></div>
	</div>
</template>

<script>
	import Header from "../components/AdminPageComponents/Header.vue";
	import MainContent from "../components/AdminPageComponents/Main.vue";
	export default {
		components: {
			Header,
			MainContent,
		},
		data: () => ({
			fetched: true,
			loading: false,
			error: false,
		}),
	};
</script>

<style scoped></style>
