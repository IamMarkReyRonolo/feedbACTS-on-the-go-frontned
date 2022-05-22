<template>
	<div>
		<div class="fetched" v-if="fetched">
			<div class="teacherPageCon">
				<div class="desktopView">
					<TeacherDesktop :data="data" />
				</div>
				<div class="mobileView"><DashboardMobile :data="data" /></div>
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
	import DashboardMobile from "../ScreenView/DashboardMobile.vue";
	import TeacherDesktop from "../ScreenView/TeacherDesktop.vue";
	import teacherAPI from "../../../apis/teacherAPI";

	export default {
		components: { TeacherDesktop, DashboardMobile },
		data: () => ({ fetched: true, loading: false, error: false, data: [] }),

		async created() {
			this.loading = true;
			this.fetched = false;

			try {
				const teachers = await teacherAPI.prototype.getAllTeachers();
				this.data = teachers.data;
				this.fetched = true;
			} catch (error) {
				this.error = true;
			}

			this.loading = false;
		},
	};
</script>

<style scoped>
	.teacherPageCon {
		text-align: left;
		padding: 20px 0px;
	}
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

	@media only screen and (max-width: 1100px) {
		.teacherPageCon {
			text-align: left;
			padding: 20px;
		}
	}

	@media only screen and (max-width: 765px) {
		.teacherPageCon {
			text-align: left;
			padding: 0px;
		}
		.desktopView {
			display: none;
		}

		.mobileView {
			display: block;
		}
	}
</style>
