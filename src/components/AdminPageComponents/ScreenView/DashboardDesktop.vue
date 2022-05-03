<template>
	<div class="desktopView">
		<div class="upperView">
			<div class="titleCon">
				<h2>Dashboard</h2>
			</div>
			<v-btn color="#064635" dark @click="clickBuzzer = true"
				><v-icon dark> mdi-gesture-double-tap </v-icon>Buzzer</v-btn
			>
		</div>
		<div class="mainView">
			<v-row no-gutters>
				<v-col cols="12" lg="8">
					<div class="leftCon">
						<div class="tableCon">
							<div class="tableHeader">
								<h2>Recent Activities</h2>
								<v-btn class="addTrashBtn" color="#064635" dark
									>Record New Activity</v-btn
								>
							</div>

							<div class="tableData">
								<div class="dataHeader">
									<div class="leftC">
										<v-btn text color="#064635" small
											><v-icon>mdi-calendar</v-icon> Date</v-btn
										>
										<v-btn text color="#064635" small
											><v-icon>mdi-clock</v-icon>Time</v-btn
										><v-btn text color="#064635" small
											><v-icon>mdi-account</v-icon>Teacher</v-btn
										>
									</div>
									<div class="rightC">
										<v-btn text color="#064635" small
											><v-icon>mdi-trash-can</v-icon>Category</v-btn
										>
									</div>
								</div>
								<div class="allDataCon">
									<v-btn
										class="actualData"
										v-for="n in 20"
										:key="n"
										color="#5AA67A"
										text
										@click="moreDetails = true"
									>
										<div class="leftCD">
											<div text color="#064635" small>03/25/2022</div>
											<div text color="#064635" small>10:30 AM</div>
											<div text color="#064635" small>Juan Dela Cruz</div>
										</div>
										<div class="rightCD">
											<v-chip text color="#5AA67A" small dark>
												<v-icon size="16px">mdi-recycle</v-icon>Plastic</v-chip
											>
										</div>
									</v-btn>
								</div>
							</div>
						</div>
					</div>
				</v-col>
				<v-col cols="12" lg="4">
					<div class="rightCon">
						<v-row no-gutters>
							<v-col cols="12" sm="8" lg="12">
								<div class="dataCon">
									<div class="contributorsTable">
										<div class="topNavBtns">
											<v-btn
												rounded
												small
												color="#064635"
												margin="padding: 0px 5px"
												:dark="displayContributor"
												:text="!displayContributor"
												@click="displayContributor = true"
												>Top Contributors</v-btn
											>
											<v-btn
												rounded
												small
												color="#064635"
												:dark="!displayContributor"
												:text="displayContributor"
												@click="displayContributor = false"
												margin="padding: 0px 5px"
												>Total Trash</v-btn
											>
										</div>
										<div class="contributorSection" v-if="displayContributor">
											<h2>Top Contributors</h2>
											<div class="contributors">
												<v-btn
													color="#5AA67A"
													outlined
													class="contributor"
													v-for="n in 5"
													:key="n"
													large
													to="/admin/teachers/profile"
												>
													<div class="innerCon">
														<v-icon style="padding: 0px 10px"
															>mdi-account-circle</v-icon
														>
														Juan Dela Cruz
													</div>

													<div class="noOfAct">5 activities</div>
												</v-btn>
											</div>
										</div>
										<div class="trashStatusSection" v-if="!displayContributor">
											<h2>Total Trash</h2>
											<div class="contributors">
												<v-btn
													color="#5AA67A"
													outlined
													class="contributor"
													v-for="(trash, index) in totalTrashAccumulated"
													:key="index"
													x-large
												>
													<div class="innerCon">
														<v-icon style="padding: 0px 10px">{{
															trash.icon
														}}</v-icon>
														{{ trash.trashCategory }}
													</div>

													<div class="noOfAct">
														{{ trash.activity }} activities
													</div>
												</v-btn>
											</div>
										</div>
									</div>
								</div>
							</v-col>
							<v-col cols="12" sm="4" lg="12">
								<div class="reportCon">
									<v-btn
										x-large
										color="#5AA67A"
										dark
										class="disposeBtn"
										outlined
										@click="clickGenerateReport = true"
									>
										Generate report</v-btn
									>
									<p>
										<v-icon small style="padding: 0px 5px"
											>mdi-alert-circle-outline</v-icon
										>Generate report will show the summary report of the
										activities between the dates provided.
									</p>
								</div>
							</v-col>
						</v-row>
					</div>
				</v-col>
			</v-row>
		</div>

		<BuzzerConfirmation
			:clickBuzzer="clickBuzzer"
			@closeBuzzer="closeBuzzer($event)"
		/>

		<GenerateReportDialog
			:clickGenerateReport="clickGenerateReport"
			@cancelReport="cancelReport()"
		/>

		<MoreDetails :moreDetails="moreDetails" @closeDetails="closeDetails()" />
	</div>
</template>

<script>
	import BuzzerConfirmation from "../PopUpComponents/BuzzerConfirmation.vue";
	import GenerateReportDialog from "../PopUpComponents/GenerateReportDialog.vue";
	import MoreDetails from "../PopUpComponents/MoreDetails.vue";
	export default {
		components: { BuzzerConfirmation, GenerateReportDialog, MoreDetails },
		data: () => ({
			displayContributor: true,
			clickBuzzer: false,
			clickGenerateReport: false,
			moreDetails: false,
			trashCategory: [
				{
					icon: "mdi-recycle",
					trashCategory: "Plastic",
					activity: 10,
				},
				{
					icon: "mdi-paper-roll",
					trashCategory: "Paper",
					activity: 8,
				},
				{
					icon: "mdi-more",
					trashCategory: "Others",
					activity: 5,
				},
			],
		}),
		methods: {
			closeBuzzer(showSnackbar) {
				this.clickBuzzer = false;
			},
			confirmBuzzer() {
				this.clickBuzzer = false;
			},
			cancelReport() {
				this.clickGenerateReport = false;
			},
			closeDetails() {
				this.moreDetails = false;
			},
		},
		computed: {
			totalTrashAccumulated: function () {
				let total = 0;
				this.trashCategory.forEach((trash) => {
					total += trash.activity;
				});

				this.trashCategory.push({
					icon: "mdi-trash-can",
					trashCategory: "Total",
					activity: total,
				});

				return this.trashCategory;
			},
		},
	};
</script>

<style scoped>
	.desktopView {
		padding: 20px 40px;
	}

	.upperView {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.titleCon {
		color: #064635;
	}

	.mainView {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 500px;
		margin: 20px 0px;
	}

	.leftCon {
		padding-right: 10px;
	}
	.rightCon {
		padding-left: 10px;
		min-height: 500px;
	}

	.tableCon {
		height: 600px;
		background-color: white;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 20px;
		padding: 20px;
	}

	.tableHeader {
		display: flex;
		justify-content: space-between;
		align-items: center;
		text-align: right;
	}

	.tableHeader h2 {
		color: #064635;
	}

	.tableData {
		height: 95%;
		padding: 10px;
	}

	.dataHeader,
	.actualData {
		text-align: left;
		display: flex;
		width: 100%;
		padding: 10px 0px;
	}

	.allDataCon {
		overflow-y: auto;
		height: 90%;
	}

	.actualData {
		margin: 2px 0px;
		background-color: white;
	}

	/* .leftC,
	.rightC {
		border: 1px solid black;
	} */

	.leftC {
		width: 90%;
	}

	.leftC .v-btn {
		padding: 0px 40px;
	}

	.rightC {
		width: 20%;
		text-align: center;
	}

	.leftCD {
		width: 90%;
		display: flex;
	}

	.leftCD div {
		padding: 0px 20px;
	}

	.rightCD {
		padding: 0px 5px;
		text-align: center;
	}

	.dataCon {
		background-color: white;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 20px;
		height: 340px;
	}

	.reportCon {
		background-color: white;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 20px;
		height: 140px;
		margin-top: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.reportCon p {
		padding: 10px;
		margin: 0px;
		font-size: 12px;
	}

	.topNavBtns {
		display: flex;
	}

	.contributorsTable {
		padding: 20px;
		text-align: left;
	}

	.contributorsTable h2,
	.trashStatusSection h2 {
		margin: 10px 5px;
		font-size: 20px;
		color: #65c18c;
	}

	.contributor {
		text-align: left;
		width: 100%;
		padding: 10px;
		margin: 1px;
	}

	.contributors .v-btn {
		display: flex;
		justify-content: space-between;
	}

	.innerCon {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.noOfAct {
		font-size: 12px;
		color: #fdc00b;
		font-weight: bold;
	}

	@media only screen and (max-width: 1260px) {
		/* For medium: */
		.desktopView {
			padding: 20px 0px;
		}

		.leftCon {
			padding-right: 0px;
		}
		.rightCon {
			padding-left: 0px;
			padding: 20px 0px;
			min-height: 320px;
		}

		.dataCon {
			margin-right: 10px;
		}

		.reportCon {
			margin-top: 0px;
			margin-left: 10px;
		}
	}
</style>
