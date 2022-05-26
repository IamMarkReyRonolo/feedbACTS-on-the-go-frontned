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
	import Header from "../components/TeacherPageComponents/Header.vue";
	import MainContent from "../components/TeacherPageComponents/Main.vue";
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

		created() {
			if (localStorage.getItem("token")) {
				if (localStorage.getItem("user") == "admin") {
					this.$router.push("/admin");
				}

				if (localStorage.getItem("user") == "teacher") {
					this.$router.push("/teacher");
				}
			} else {
				this.$router.push("/");
			}
		},
	};
</script>

<style scoped>
	.adminPage {
		overflow-y: hidden;
	}
</style>
