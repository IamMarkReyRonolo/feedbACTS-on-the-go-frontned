<template>
	<div>
		<div class="fetched" v-if="fetched">
			<div class="recentActivities">
				<div class="desktopView">
					<TeacherDetails :teacherData="teacher" />
					<HistoryTable :teacher="teacher" />
				</div>

				<div class="mobileView">
					<DashboardMobile :teacher="teacher" />
				</div>
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
	import HistoryTable from "./HistoryTable.vue";
	import TeacherDetails from "./TeacherDetails.vue";
	import teacherAPI from "../../../apis/teacherAPI";
	export default {
		components: {
			DashboardMobile,
			HistoryTable,
			TeacherDetails,
		},
		data() {
			return {
				contribData: [
					{
						date: "03/23/2022",
						time: "10:30 AM",
						plastic: 5,
						paper: 5,
						cellophanes: 5,
						other: 5,
						total: 5,
					},
				],
				moreDetails: false,
				clickedAll: true,
				clickedPlastic: false,
				clickedPaper: false,
				clickedCellophanes: false,
				clickedOthers: false,
				teacher: {},
				fetched: true,
				loading: false,
				error: false,
			};
		},

		async created() {
			try {
				this.loading = true;
				this.fetched = false;
				const result = await teacherAPI.prototype.getSpecificTeacher();
				this.teacher = result.data;
				this.fetched = true;
				this.loading = false;
			} catch (error) {
				this.error = true;
				this.loading = false;
			}

			this.loading = false;
		},

		methods: {
			closeDetails() {
				this.moreDetails = false;
			},

			selectCategory(category) {
				if (category == "all") {
					this.clickedAll = true;
					this.clickedPlastic = false;
					this.clickedPaper = false;
					this.clickedCellophanes = false;
					this.clickedOthers = false;
				} else if (category == "plastic") {
					this.clickedAll = false;
					this.clickedPlastic = true;
					this.clickedPaper = false;
					this.clickedCellophanes = false;
					this.clickedOthers = false;
				} else if (category == "paper") {
					this.clickedAll = false;
					this.clickedPlastic = false;
					this.clickedPaper = true;
					this.clickedCellophanes = false;
					this.clickedOthers = false;
				} else if (category == "cellophanes") {
					this.clickedAll = false;
					this.clickedPlastic = false;
					this.clickedPaper = false;
					this.clickedCellophanes = true;
					this.clickedOthers = false;
				} else {
					this.clickedAll = false;
					this.clickedPlastic = false;
					this.clickedPaper = false;
					this.clickedCellophanes = false;
					this.clickedOthers = true;
				}
			},
		},
	};
</script>

<style scoped>
	.desktopView {
		margin: 20px 40px;
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
		.desktopView {
			margin: 20px 0px;
		}
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
