<template>
	<div class="recentActivities">
		<div class="desktopView">
			<TeacherDetails />
			<HistoryTable />
		</div>

		<div class="mobileView">
			<DashboardMobile />
		</div>

		<MoreDetails :moreDetails="moreDetails" @closeDetails="closeDetails()" />
	</div>
</template>

<script>
	import MoreDetails from "../PopUpComponents/MoreDetails.vue";
	import DashboardMobile from "../ScreenView/DashboardMobile.vue";
	import HistoryTable from "./HistoryTable.vue";
	import TeacherDetails from "./TeacherDetails.vue";
	export default {
		components: {
			MoreDetails,
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
			};
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
