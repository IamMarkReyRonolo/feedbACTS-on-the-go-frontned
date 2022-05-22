<template>
	<div class="dashboard">
		<div class="fetched" v-if="fetched">
			<div class="desktopView">
				<DashboardDesktop
					:data="data"
					:buzzer_count="admin_data.buzzer_count"
				/>
			</div>

			<div class="mobileView">
				<DashboardMobile :data="data" />
			</div>
		</div>
		<div class="loading" v-if="loading">
			<h2>Loading</h2>
			<v-progress-circular
				:width="3"
				color="green"
				indeterminate
			></v-progress-circular>
		</div>
		<div class="showError" v-if="error">
			<img src="../../../assets/undraw_bug_fixing_oc-7-a 1.png" alt="" />
			<h3>Error Occured. Please refresh the page</h3>
		</div>
	</div>
</template>

<script>
	import DashboardDesktop from "../ScreenView/DashboardDesktop.vue";
	import DashboardMobile from "../ScreenView/DashboardMobile.vue";
	import teacherAPI from "../../../apis/teacherAPI";
	import adminAPI from "../../../apis/adminAPI";
	export default {
		components: { DashboardDesktop, DashboardMobile },
		data: () => ({
			fetched: true,
			loading: false,
			error: false,
			data: [],
			admin_data: {},
		}),
		methods: {},
		async created() {
			this.loading = true;
			this.fetched = false;

			try {
				const [teachers, admin] = await Promise.all([
					teacherAPI.prototype.getAllTeachers(),
					adminAPI.prototype.getAdminDetails(),
				]);
				this.data = teachers.data;
				this.admin_data = admin.data;
				this.fetched = true;
			} catch (error) {
				this.error = true;
			}

			this.loading = false;
		},
	};
</script>

<style scoped>
	.mobileView {
		display: none;
	}

	.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 40px;
		color: #007d48;
		height: 70vh;
	}

	.loading h2 {
		padding: 10px 20px;
		font-size: 20px;
	}

	.showError {
		margin: 100px 0px;
		color: #007d48;
	}

	.showError h3 {
		padding: 20px;
	}

	.showError img {
		width: 250px;
	}

	@media only screen and (max-width: 765px) {
		.desktopView {
			display: none;
		}

		.mobileView {
			padding: 10px 0px;
			display: block;
		}
	}
</style>
