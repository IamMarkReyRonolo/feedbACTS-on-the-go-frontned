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
	import subscriptionAPI from "../apis/subscriptionAPI";
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

		async created() {
			if (localStorage.getItem("token")) {
				if (localStorage.getItem("user") == "admin") {
					this.$router.push("/admin");
				} else {
					try {
						const reg = await navigator.serviceWorker.ready;

						const registration =
							await navigator.serviceWorker.getRegistration();
						const subscription = await registration.pushManager.subscribe({
							userVisibleOnly: true,
							applicationServerKey:
								"BNZlVfipnCvx2AZD-_Nxht5xnqfzh2DUsP0Vic6hjF88i-S-CwBXWN8F9IoVEWyFHJuwOvDm0TIB4kXKzSg1RAk",
						});

						const result = await subscriptionAPI.prototype.add({
							subscription: subscription,
						});
					} catch (error) {
						console.log(error);
					}
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
