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
							@click.exact="selectActivity(activity)"
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

							<div class="feedBackBtn">
								<v-btn
									small
									rounded
									color="#FFFFFF"
									@click="showFeedback(activity.feedback)"
									>View Feedback</v-btn
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

		<MoreDetails
			:moreDetails="moreDetails"
			@closeDetails="closeDetails()"
			:activity="selected_activity"
		/>

		<FeedbackPopUp
			:viewFeedback="showfeedback"
			:feedback="feedback"
			@closeFeedback="closeFeedback"
		/>
	</div>
</template>

<script>
	import MoreDetails from "../PopUpComponents/MoreDetails.vue";
	import FeedbackPopUp from "../PopUpComponents/FeedbackPopUp.vue";

	export default {
		components: { MoreDetails, FeedbackPopUp },
		props: {
			teacher: Object,
		},
		data: () => ({
			moreDetails: false,
			selected_activity: {},
			activities: [],
			dashboardData: [],
			showfeedback: false,
			feedback: [],
		}),

		methods: {
			showFeedback(feedback) {
				this.showfeedback = true;
				this.feedback = feedback;
			},
			selectActivity(activity) {
				if (!this.showfeedback) {
					activity.teacher =
						this.teacher.first_name + " " + this.teacher.last_name;
					this.selected_activity = activity;
					this.moreDetails = true;
				}
			},
			closeDetails() {
				this.moreDetails = false;
			},
			closeFeedback() {
				this.showfeedback = false;
			},

			getTime(time) {
				if (time) {
					let hh = time.split(":")[0];
					let mm = time.split(":")[1];
					let session = "AM";
					if (hh == 0) {
						hh = 12;
					} else {
						if (hh == 12) {
							session = "PM";
						} else if (hh > 12) {
							hh = hh - 12;
							session = "PM";
						}
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
		height: 640px;
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

	.feedBackBtn {
		position: absolute;
		right: 10px;
	}

	.feedBackBtn .v-btn {
		color: #4f7e63;
		border: 1px solid #4f7e63;
		font-size: 8px;
		padding: 10px;
		font-weight: bolder;
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
