<template>
	<div class="activityHistory">
		{{ getTrashData }}
		<div class="headerTitle">
			<h2>Activity History</h2>
			<v-spacer></v-spacer>
		</div>

		<div class="table">
			<div class="tableHasData" v-if="teacher.activities.length != 0">
				<div class="tableHeader">
					<div class="btn dateTime">
						<v-btn text color="#064635" small>
							<v-icon small>mdi-calendar</v-icon> Date</v-btn
						>
						<v-btn text color="#064635" small>
							<v-icon small>mdi-clock</v-icon>Time</v-btn
						>
					</div>

					<div class="btn">
						<v-btn text color="#064635" small>
							<v-icon small>mdi-trash-can</v-icon>Category</v-btn
						>
					</div>
					<div class="btn">
						<v-btn text color="#064635" small>
							<v-icon small>mdi-list-status</v-icon>Segregated</v-btn
						>
					</div>
				</div>
				<div class="tableContent">
					<div
						class="data"
						v-for="(activity, index) in teacher.activities"
						:key="index"
					>
						<v-btn
							large
							class="hoverableData"
							@click="selectActivity(activity)"
						>
							<div class="details dateTime">
								<div>{{ activity.date_created }}</div>
								<div>{{ getTime(activity.time_created) }}</div>
							</div>

							<div class="details wraped">
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
							<div class="details">
								<v-chip
									x-small
									color="#FDC00B"
									dark
									v-if="activity.status == 'Partly Segregated'"
									>Partly</v-chip
								>
								<v-chip
									x-small
									color="#007D48"
									dark
									v-if="activity.status == 'Segregated'"
									>Yes</v-chip
								>
								<v-chip
									x-small
									color="#064635"
									dark
									v-if="activity.status == 'Not Segregated'"
									>No</v-chip
								>
							</div>
						</v-btn>
					</div>
				</div>
			</div>
			<div class="empty" v-if="teacher.activities.length == 0">
				<img src="../../../assets/emptyTrash.png" alt="" />
				<h3>No records yet</h3>
			</div>
		</div>

		<v-snackbar v-model="snackbar" :timeout="timeout">
			{{ message }}

			<template v-slot:action="{ attrs }">
				<v-btn color="#5aa67a" text v-bind="attrs" @click="snackbar = false">
					Close
				</v-btn>
			</template>
		</v-snackbar>

		<MoreDetails
			:moreDetails="moreDetails"
			@updateDetails="updateDetails($event)"
			@deleteDetails="deleteDetails($event)"
			@closeDetails="closeDetails()"
			:activity="selected_activity"
		/>
	</div>
</template>

<script>
	import MoreDetails from "../PopUpComponents/MoreDetails.vue";

	export default {
		components: { MoreDetails },
		props: {
			teacher: Object,
		},
		data: () => ({
			moreDetails: false,
			selected_activity: {},
			activities: [],
			dashboardData: [],
			snackbar: false,
			timeout: 2000,
			message: "",
		}),

		methods: {
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

						for (let i = 0; i < this.teacher.activities.length; i++) {
							if (this.teacher.activities[i].id == data.id) {
								this.teacher.activities[i] = data;
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

						for (let i = 0; i < this.teacher.activities.length; i++) {
							if (this.teacher.activities[i].id == data) {
								this.teacher.activities.splice(i, 1);
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

			getTime(time) {
				if (time) {
					let hh = time.split(":")[0];
					let mm = time.split(":")[1];
					let session = "AM";
					if (hh === 0) {
						hh = 12;
					}
					if (hh == 12) {
						session = "PM";
					} else if (hh > 12) {
						hh = hh - 12;
						session = "PM";
					}

					return hh + ":" + mm + " " + session;
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
		},

		computed: {
			getTrashData: function () {
				this.teacher.activities.sort((a, b) =>
					a.id > b.id ? -1 : b.id > a.id ? 1 : 0
				);
			},
		},
	};
</script>

<style scoped>
	.activityHistory {
		height: 700px;
		background-color: white;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 20px;
		padding: 20px;
	}

	.headerTitle {
		display: flex;
		align-items: center;
	}

	.headerTitle h2 {
		color: #064635;
	}

	.table {
		margin: 20px 0px;
	}

	.tableHeader {
		display: flex;
		justify-content: space-between;
	}

	.btn {
		width: 100%;
	}

	.btn .v-btn {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.dateTime {
		display: flex;
	}

	.dateTime .v-btn {
		width: 50%;
	}

	.tableContent {
		height: 500px;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.data .v-btn {
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 0px;
		color: #007d48;
	}

	.details {
		width: 33%;
		font-size: 12px;
		text-align: left;
		padding-left: 10px;
	}

	.dateTime div {
		width: 50%;

		padding: 0px 10px;
	}

	.wraped {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		overflow-y: auto;
		height: 40px;
		align-items: center;
	}

	.v-chip {
		margin: 2px;
	}

	:hover.hoverableData {
		background-color: #5aa67a;
		transition: 0.3s ease;
		color: white;
	}

	.empty {
		margin: 100px 0px;
	}

	.empty h3 {
		color: #007d48;
		padding: 10px;
	}

	.empty img {
		width: 300px;
	}
	@media only screen and (max-width: 1100px) {
		.dateTime {
			font-size: 10px;
		}
		.wraped {
			height: 40px;
			overflow-y: auto;
		}
		.v-chip {
			font-size: 8px;
		}
	}
</style>
