<template>
	<div class="mobileView">
		{{ getTrashData }}

		<div class="navs">
			<div class="categories">
				<div class="cat">
					<v-btn
						rounded
						small
						:text="!clickedAll"
						:dark="!clickedAll"
						@click="selectCategory('all')"
					>
						All
					</v-btn>
				</div>
				<div class="cat">
					<v-btn
						rounded
						small
						:text="!clickedSegregated"
						:dark="!clickedSegregated"
						@click="selectCategory('segregated')"
					>
						Segregated
					</v-btn>
				</div>
				<div class="cat">
					<v-btn
						rounded
						small
						:text="!clickedPartlySeg"
						:dark="!clickedPartlySeg"
						@click="selectCategory('partly')"
					>
						Partly Segregated
					</v-btn>
				</div>

				<div class="cat">
					<v-btn
						rounded
						small
						:text="!clickedNotSeg"
						:dark="!clickedNotSeg"
						@click="selectCategory('notSegregated')"
					>
						Not Segregated
					</v-btn>
				</div>
			</div>
		</div>
		<br />
		<div class="activityTable" v-if="filteredData.length != 0">
			<div class="tableHeader">
				<div class="headerCon left">
					<v-btn text x-small color="#064635" class="leftCon" width="40%"
						>Date</v-btn
					>
					<v-btn text x-small color="#064635" class="leftCon" width="60%"
						>Teacher</v-btn
					>
				</div>
				<div class="headerCon right">
					<v-btn text x-small color="#064635" class="rightCon" width="100%"
						>Trash</v-btn
					>
				</div>
			</div>
			<div class="tableContents">
				<div
					class="content"
					v-for="(activity, index) in filteredData"
					:key="index"
					@click="selectActivity(activity)"
				>
					<div class="left">
						<div class="details date">{{ activity.date_created }}</div>
						<div class="details name">{{ activity.teacher }}</div>
					</div>
					<div class="right">
						<div class="details trash">
							<div class="chip">
								<v-chip
									x-small
									color="#007D48"
									dark
									v-if="
										activity.categories.includes('Paper') &&
										!checkAll(activity.categories)
									"
									>Paper</v-chip
								>
							</div>
							<div class="chip">
								<v-chip
									x-small
									color="#7AA51F"
									dark
									v-if="
										activity.categories.includes('Cellophanes') &&
										!checkAll(activity.categories)
									"
									>Cellophanes</v-chip
								>
							</div>
							<div class="chip">
								<v-chip
									x-small
									color="#407355"
									dark
									v-if="
										activity.categories.includes('Plastic Bottles') &&
										!checkAll(activity.categories)
									"
									>Plastic Bottles</v-chip
								>
							</div>

							<div class="chip">
								<v-chip
									x-small
									color="#FDC00B"
									dark
									v-if="
										activity.categories.includes('Others') &&
										!checkAll(activity.categories)
									"
									>Other Trash</v-chip
								>
							</div>
							<div class="chip">
								<v-chip
									x-small
									color="#407355"
									dark
									v-if="checkAll(activity.categories)"
									>All</v-chip
								>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="addBtn">
				<v-btn color="success" fab large dark @click="recordActivity">
					<v-icon>mdi-pencil</v-icon>
				</v-btn>
			</div>
		</div>

		<div class="empty" v-if="filteredData.length == 0">
			<img src="../../../assets/emptyTrash.png" alt="" />
			<h3>No records yet</h3>
			<v-btn color="success" dark @click="recordActivity">
				<v-icon>mdi-pencil</v-icon> Add Activity</v-btn
			>
		</div>

		<MoreDetails
			:moreDetails="moreDetails"
			@updateDetails="updateDetails($event)"
			@deleteDetails="deleteDetails($event)"
			@closeDetails="closeDetails()"
			:activity="selected_activity"
		/>

		<v-snackbar v-model="snackbar" :timeout="timeout">
			{{ message }}

			<template v-slot:action="{ attrs }">
				<v-btn color="#5aa67a" text v-bind="attrs" @click="snackbar = false">
					Close
				</v-btn>
			</template>
		</v-snackbar>
	</div>
</template>

<script>
	import MoreDetails from "../PopUpComponents/MoreDetails.vue";
	export default {
		props: {
			data: Array,
		},
		components: { MoreDetails },
		data: () => ({
			moreDetails: false,
			selected_activity: {},
			dashboardData: [],
			activities: [],
			message: "",
			snackbar: false,
			timeout: 3000,
			clickedAll: true,
			clickedSegregated: false,
			clickedPartlySeg: false,
			clickedNotSeg: false,
		}),
		created() {
			this.dashboardData = this.data;
		},
		methods: {
			recordActivity() {
				this.$router.push("/recordActivity");
			},
			selectActivity(activity) {
				this.selected_activity = activity;
				this.moreDetails = true;
			},
			closeDetails() {
				this.moreDetails = false;
			},
			updateDetails(data) {
				if (data) {
					if (data == "Network Error") {
						const result = "failed";
						const message = "Network Error";
						this.showSnackbar(result, message);
					} else if (data == "Request failed with status code 404") {
						const result = "failed";
						const message = "Update Failed";
						this.showSnackbar(result, message);
					} else {
						const result = "success";
						const message = "Successfully updated activity";

						for (let i = 0; i < this.activities.length; i++) {
							if (this.activities[i].id == data.id) {
								this.activities[i] = data;
								break;
							}
						}

						this.showSnackbar(result, message);
					}
				}

				this.moreDetails = false;
			},
			deleteDetails(data) {
				if (data) {
					if (data == "Network Error") {
						const result = "failed";
						const message = "Network Error";
						this.showSnackbar(result, message);
					} else if (data == "Request failed with status code 404") {
						const result = "failed";
						const message = "Delete Failed";
						this.showSnackbar(result, message);
					} else {
						const result = "success";
						const message = "Successfully deleted activity";

						for (let i = 0; i < this.activities.length; i++) {
							if (this.activities[i].id == data) {
								this.activities.splice(i, 1);
								break;
							}
						}

						this.showSnackbar(result, message);
					}
				}

				this.moreDetails = false;
			},

			showSnackbar(result, message) {
				if (result == "success") {
					this.snackbar = true;
					this.message = message;
				}

				if (result == "failed") {
					this.snackbar = true;
					this.message = message;
				}
			},

			checkAll(categories) {
				return (
					categories.includes("Others") &&
					categories.includes("Plastic Bottles") &&
					categories.includes("Cellophanes") &&
					categories.includes("Paper")
				);
			},

			selectCategory(category) {
				if (category == "all") {
					this.clickedAll = true;
					this.clickedSegregated = false;
					this.clickedPartlySeg = false;
					this.clickedNotSeg = false;
				} else if (category == "segregated") {
					this.clickedAll = false;
					this.clickedSegregated = true;
					this.clickedPartlySeg = false;
					this.clickedNotSeg = false;
				} else if (category == "partly") {
					this.clickedAll = false;
					this.clickedSegregated = false;
					this.clickedPartlySeg = true;
					this.clickedNotSeg = false;
				} else {
					this.clickedAll = false;
					this.clickedSegregated = false;
					this.clickedPartlySeg = false;
					this.clickedCellophanes = false;
					this.clickedNotSeg = true;
				}
			},
		},
		computed: {
			getTrashData: function () {
				this.data.forEach((d) => {
					d.activities.forEach((activity) => {
						activity.teacher = d.first_name + " " + d.last_name;
						this.activities.push(activity);
					});
				});

				const sortedActivity = [...this.activities];
				sortedActivity.sort((a, b) => (a.id > b.id ? -1 : b.id > a.id ? 1 : 0));

				this.activities = [...sortedActivity];
			},

			filteredData: function () {
				if (this.clickedAll) {
					return this.activities;
				} else {
					let status = "";
					if (this.clickedSegregated) {
						status = "Segregated";
					} else if (this.clickedPartlySeg) {
						status = "Partly Segregated";
					} else if (this.clickedNotSeg) {
						status = "Not Segregated";
					}

					const filtered = this.activities.filter((activity) => {
						return activity.status == status;
					});

					return filtered;
				}
			},
		},
	};
</script>

<style scoped>
	@media only screen and (max-width: 765px) {
		.tableHeader,
		.tableContents {
			padding: 0px 10px;
		}

		.tableHeader {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.left .v-btn {
			display: flex;
			justify-content: flex-start;
		}

		.left {
			width: 60%;
			display: flex;
			align-items: center;
		}

		.right {
			width: 40%;
		}

		.rightCon {
			display: flex;
			justify-content: flex-start;
		}

		.tableContents {
			height: 60vh;
			overflow-y: auto;
		}

		.tableContents .content {
			padding: 0px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.11);
			color: #5aa67a;
			padding: 5px 5px;
			border-radius: 10px;
			background-color: white;
			height: 60px;
			overflow-y: auto;
			margin: 4px 0px;
		}

		.content {
			cursor: pointer;
		}

		.content:active {
			background-color: rgba(190, 248, 199, 0.89);
			transition: 0.3s ease;
		}

		.details {
			font-size: 12px;
			padding: 5px 5px;
			overflow: auto;
		}

		.date {
			width: 40%;
			text-align: left;
			font-size: 10px;
		}

		.name {
			width: 60%;
			font-size: 10px;
			text-align: left;
			font-weight: bold;
			text-transform: capitalize;
		}

		.trash {
			width: 100%;
			display: flex;
		}

		.trash .v-chip {
			margin: 2px;
		}

		.addBtn {
			position: fixed;
			right: 25px;
			bottom: 40px;
		}

		.empty {
			margin: 50px 0px;
			text-align: center;
		}

		.empty h3 {
			color: #007d48;
			padding: 20px;
		}

		.empty img {
			width: 250px;
		}
		.navs {
			background-color: #5aa67a;
			margin-top: -40px;
			padding: 0px 20px;
			padding-bottom: 0px;
		}

		.categories {
			display: flex;
			overflow-x: auto;
			justify-content: flex-start;
			padding: 10px 0px;
		}

		.cat {
			margin-right: 2px;
		}

		.activityTable {
			padding: 0px 10px;
		}
	}
</style>
