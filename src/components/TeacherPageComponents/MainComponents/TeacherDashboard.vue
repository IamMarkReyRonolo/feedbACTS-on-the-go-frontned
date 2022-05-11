<template>
	<div class="recentActivities">
		<div class="desktopView">
			<div class="upper">
				<h2>Recent Activity</h2>
				<div class="categories">
					<div class="cat">
						<v-btn
							rounded
							small
							:text="!clickedAll"
							:dark="clickedAll"
							color="#5AA67A"
							@click="selectCategory('all')"
						>
							All
						</v-btn>
					</div>
					<div class="cat">
						<v-btn
							rounded
							small
							:text="!clickedPlastic"
							:dark="clickedPlastic"
							color="#5AA67A"
							@click="selectCategory('plastic')"
						>
							Plastic
						</v-btn>
					</div>
					<div class="cat">
						<v-btn
							rounded
							small
							:text="!clickedPaper"
							:dark="clickedPaper"
							color="#5AA67A"
							@click="selectCategory('paper')"
						>
							Paper
						</v-btn>
					</div>
					<!-- <div class="cat">
						<v-btn
							rounded
							small
							:text="!clickedCellophanes"
							:dark="!clickedCellophanes"
							@click="selectCategory('cellophanes')"
						>
							Cellophanes
						</v-btn>
					</div> -->
					<div class="cat">
						<v-btn
							rounded
							small
							:text="!clickedOthers"
							:dark="clickedOthers"
							color="#5AA67A"
							@click="selectCategory('others')"
						>
							Others
						</v-btn>
					</div>
				</div>
			</div>
			<div class="historyTable">
				<div class="table">
					<div class="tableHeader">
						<div class="con">
							<v-btn text color="#5aa67a"
								><v-icon>mdi-calendar</v-icon><span>Date</span></v-btn
							>
						</div>
						<div class="con">
							<v-btn text color="#5aa67a"
								><v-icon>mdi-calendar-clock</v-icon><span>Time</span></v-btn
							>
						</div>
						<div class="con">
							<v-btn text color="#5aa67a"
								><v-icon>mdi-card-text</v-icon><span>Details</span></v-btn
							>
						</div>
						<div class="con">
							<v-btn text color="#5aa67a"
								><v-icon>mdi-trash-can</v-icon><span>Category</span></v-btn
							>
						</div>
					</div>
					<div class="tableList">
						<div class="activity" v-for="n in 20" :key="n">
							<v-btn text color="#5aa67a" @click="moreDetails = true">
								<div class="con">
									<span>03/20/2022</span>
								</div>
								<div class="con">
									<span>10:30 AM</span>
								</div>
								<div class="con">
									<span>Disposed Plastic</span>
								</div>
								<div class="con">
									<v-chip color="#5aa67a" dark small>
										<v-icon small>mdi-recycle</v-icon>Plastic</v-chip
									>
								</div>
							</v-btn>
						</div>
					</div>
				</div>
			</div>

			<MoreDetails :moreDetails="moreDetails" @closeDetails="closeDetails()" />
		</div>

		<div class="mobileView">
			<DashboardMobile />
		</div>
	</div>
</template>

<script>
	import MoreDetails from "../PopUpComponents/MoreDetails.vue";
	import DashboardMobile from "../ScreenView/DashboardMobile.vue";
	export default {
		components: {
			MoreDetails,
			DashboardMobile,
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
	.upper {
		text-align: left;
		color: #064635;
	}

	.categories {
		margin: 10px 0px;
		display: flex;
	}

	.categories .v-btn {
		margin-right: 10px;
	}
	.table {
		padding: 20px;
		border-radius: 20px;
		background-color: white;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	}

	.historyTable {
		height: 650px;
		margin: 20px 0px;
	}

	.historyTable h2 {
		color: #5aa67a;
		padding: 10px 0px;
	}

	.tableHeader {
		display: flex;
		justify-content: space-around;
	}

	.tableList {
		overflow-y: auto;
		height: 500px;
	}

	.con {
		width: 100%;
		text-align: left;
	}

	.activity .v-btn {
		width: 100%;
		padding: 0px;
	}

	.activity .v-btn .con {
		padding-left: 15px;
	}

	/* .con .v-btn {
		width: 100%;
	} */

	.mobileView {
		display: none;
	}

	@media only screen and (max-width: 700px) {
		.desktopView {
			display: none;
		}

		.mobileView {
			padding: 10px 0px;
			display: block;
		}
	}
</style>
