<template>
	<div class="mobileView">
		<br />
		<div class="activityTable" v-if="teacher.activities.length != 0">
			<div class="tableHeader">
				<div class="headerCon left">
					<v-btn text x-small color="#064635" class="leftCon" width="40%"
						>Date</v-btn
					>
					<v-btn text x-small color="#064635" class="leftCon" width="60%"
						>Status</v-btn
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
					v-for="(activity, index) in teacher.activities"
					:key="index"
					@click="selectActivity(activity)"
				>
					<div class="left">
						<div class="details date">{{ activity.date_created }}</div>
						<div class="details name">{{ activity.status }}</div>
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

						<div class="feedBackBtn">
							<v-btn
								x-small
								rounded
								color="#FFFFFF"
								@click="showFeedback(activity.feedback)"
								>View Feedback</v-btn
							>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="empty" v-if="teacher.activities.length == 0">
			<img src="../../../assets/emptyTrash.png" alt="" />
			<h5>
				No records yet <br />
				Participate in the next trash collection .
			</h5>
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
			teacherData: {},
			showfeedback: false,
			feedback: [],
		}),

		created() {
			this.teacherData = Object.assign({}, this.teacher);
			this.teacherData.activities.sort((a, b) =>
				a.id > b.id ? -1 : b.id > a.id ? 1 : 0
			);
		},

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

			closeFeedback() {
				this.showfeedback = false;
			},

			closeDetails() {
				this.moreDetails = false;
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

		computed: {},
	};
</script>

<style scoped>
	@media only screen and (max-width: 765px) {
		.tableHeader,
		.tableContents {
			padding: 0px 0px;
		}

		.tableHeader {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.left .v-btn,
		.right .v-btn {
			display: flex;
			justify-content: flex-start;
		}

		.left {
			width: 45%;
			display: flex;
			align-items: center;
		}

		.right {
			width: 55%;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.tableContents {
			height: 65vh;
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
			font-size: 9px;
		}

		.name {
			width: 60%;
			font-size: 10px;
			text-align: left;
			font-weight: bold;
			text-transform: capitalize;
		}

		.trash {
			width: 55%;
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
			margin: 80px 0px;
		}

		.empty h5 {
			color: #007d48;
			padding: 25px 30px;
			font-size: 14px;
			font-weight: lighter;
		}

		.empty img {
			width: 250px;
		}

		.feedBackBtn {
			right: 10px;
		}

		.feedBackBtn .v-btn {
			color: #4f7e63;
			border: 1px solid #4f7e63;
			font-size: 6px;
			padding: 5px;
			font-weight: bolder;
		}
	}
</style>
