<template>
	<div class="activityHistory">
		<div class="headerTitle">
			<h2>Activity History</h2>
			<v-spacer></v-spacer>
			<v-btn color="#064635" dark @click="recordActivity = true"
				>Record New Activity</v-btn
			>
		</div>

		<div class="table">
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
						<v-icon small>mdi-account</v-icon>Teacher</v-btn
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
				<div class="data" v-for="n in 20" :key="n">
					<v-btn large class="hoverableData" @click="moreDetails = true">
						<div class="details dateTime">
							<div>02/30/22</div>
							<div>10:30 AM</div>
						</div>
						<div class="details">Juan Dela Cruz</div>
						<div class="details wraped">
							<div class="chip">
								<v-chip x-small color="#007D48" dark>Paper</v-chip>
							</div>
							<div class="chip">
								<v-chip x-small color="#7AA51F" dark>Cellophanes</v-chip>
							</div>
							<div class="chip">
								<v-chip x-small color="#407355" dark>Plastic Bottles</v-chip>
							</div>

							<div class="chip">
								<v-chip x-small color="#FDC00B" dark>Other Trash</v-chip>
							</div>
						</div>
						<div class="details">
							<!-- <v-chip x-small color="#FDC00B" dark>Partly</v-chip> -->
							<v-chip x-small color="#007D48" dark>Yes</v-chip>
							<!-- <v-chip x-small color="#064635" dark>No</v-chip> -->
						</div>
					</v-btn>
				</div>
			</div>
		</div>

		<MoreDetails :moreDetails="moreDetails" @closeDetails="closeDetails()" />

		<RecordActivityDialog
			:recordActivity="recordActivity"
			@closeDialog="closeDialog()"
		/>
	</div>
</template>

<script>
	import MoreDetails from "../PopUpComponents/MoreDetails.vue";
	import RecordActivityDialog from "../PopUpComponents/RecordActivtyDialog.vue";
	export default {
		components: { MoreDetails, RecordActivityDialog },
		data: () => ({
			moreDetails: false,
			recordActivity: false,
		}),

		methods: {
			closeDetails() {
				this.moreDetails = false;
			},
			closeDialog() {
				this.recordActivity = false;
			},
		},
	};
</script>

<style scoped>
	.activityHistory {
		height: 600px;
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
		height: 475px;
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
		width: 25%;
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
