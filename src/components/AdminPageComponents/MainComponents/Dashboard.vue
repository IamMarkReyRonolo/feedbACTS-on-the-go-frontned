<template>
	<div class="dashboard">
		<div class="fetched" v-if="fetched">
			<div class="desktopView">
				<DashboardDesktop />
			</div>

			<div class="mobileView">
				<DashboardMobile />
			</div>
		</div>
		<div class="loading" v-if="loading"></div>
		<div class="error" v-if="error"></div>
	</div>
</template>

<script>
	import DashboardDesktop from "../ScreenView/DashboardDesktop.vue";
	import DashboardMobile from "../ScreenView/DashboardMobile.vue";
	export default {
		components: { DashboardDesktop, DashboardMobile },
		data: () => ({
			fetched: true,
			loading: false,
			error: false,
		}),
		methods: {},
	};
</script>

<style scoped>
	.mobileView {
		display: none;
	}

	@media only screen and (max-width: 700px) {
		.desktopView {
			display: none;
		}

		.mobileView {
			padding: 20px 0px;
			display: block;
		}
	}
</style>
