<template>
	<div class="dashboard">
		<div class="fetched" v-if="fetched">
			<div class="desktopView">
				<div class="upperView">
					<div class="titleCon">
						<h2>Dashboard</h2>
					</div>
					<v-btn color="#064635" dark
						><v-icon dark> mdi-gesture-double-tap </v-icon>Buzzer</v-btn
					>
				</div>
				<div class="mainView">
					<v-row no-gutters>
						<v-col cols="12" lg="8">
							<div class="leftCon">
								<div class="tableCon">
									<div class="tableHeader">
										<h2>Recent Activity</h2>
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
													><v-icon>mdi-recycle</v-icon>Category</v-btn
												>
											</div>
										</div>
										<div class="allDataCon">
											<v-btn
												class="actualData"
												v-for="n in 20"
												:key="n"
												outlined
												color="#5AA67A"
											>
												<div class="leftCD">
													<div text color="#064635" small>03/25/2022</div>
													<div text color="#064635" small>10:30 AM</div>
													<div text color="#064635" small>Juan Dela Cruz</div>
												</div>
												<div class="rightCD">
													<div text color="#064635" small>Plastic</div>
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
														>Trash Status</v-btn
													>
												</div>
												<div
													class="contributorSection"
													v-if="displayContributor"
												>
													<h2>Top Contributors</h2>
													<div class="contributors">
														<v-btn
															color="#5AA67A"
															outlined
															class="contributor"
															v-for="n in 5"
															:key="n"
															large
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
												<div
													class="trashStatusSection"
													v-if="!displayContributor"
												>
													<h2>Trash Status</h2>
													<div class="contributors">
														<v-btn
															color="#5AA67A"
															outlined
															class="contributor"
															v-for="(trash, index) in trashCategory"
															:key="index"
															large
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
											>
												Generate report</v-btn
											>
											<p>
												<v-icon small style="padding: 0px 5px"
													>mdi-alert-circle-outline</v-icon
												>Generate report starting after the most recent report.
											</p>
										</div>
									</v-col>
								</v-row>
							</div>
						</v-col>
					</v-row>
				</div>
			</div>

			<div class="mobileView">
				<div class="activityTable">
					<div class="header">
						<v-btn class="dateColumn" small text color="#064635">Date</v-btn>
						<v-btn class="teacherColumn" small text color="#064635"
							>Teacher</v-btn
						>
						<v-btn class="categoryColumn" small text color="#064635"
							>Trash</v-btn
						>
					</div>
					<div class="activities">
						<v-btn
							class="activity"
							v-for="n in 20"
							:key="n"
							style="width: 100%; font-size: 10px"
							unselectable="on"
							onselectstart="return false;"
							onmousedown="return false;"
							large
							outlined
						>
							<div class="dateColumn">03/25/22</div>
							<div class="teacherColumn">Juan Dela Cruz</div>
							<div class="categoryColumn">Plastic</div>
						</v-btn>
					</div>
					<div class="addBtn">
						<v-btn color="success" fab large dark>
							<v-icon>mdi-pencil</v-icon>
						</v-btn>
					</div>
				</div>
			</div>
		</div>
		<div class="loading" v-if="loading"></div>
		<div class="error" v-if="error"></div>
	</div>
</template>

<script>
	export default {
		components: {},
		data: () => ({
			fetched: true,
			loading: false,
			error: false,
			displayContributor: true,
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
					icon: "mdi-recycle-variant",
					trashCategory: "Cellophane",
					activity: 5,
				},
				{
					icon: "mdi-more",
					trashCategory: "Others",
					activity: 5,
				},
			],
		}),
	};
</script>

<style scoped>
	.mobileView {
		display: none;
	}

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
		height: 500px;
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
		margin: 1px 0px;
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

	@media only screen and (max-width: 700px) {
		.desktopView {
			display: none;
		}

		.mobileView {
			padding: 20px 0px;
			display: block;
		}

		.activityTable .header,
		.activity {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.header {
			font-weight: bold;
			color: #064635;
		}

		.activityTable .header,
		.activities {
			padding: 10px 0px;
			/* border: 1px solid black; */
		}

		.header .dateColumn,
		.header .teacherColumn,
		.header .categoryColumn {
			font-weight: bolder;
		}

		.activities {
			height: 455px;
			overflow-y: auto;
		}

		.activityTable .header {
			padding: 0px 20px;
		}

		.activity {
			padding: 10px;
			border-radius: 10px;
			background-color: white;
			margin: 5px 0px;
			color: #65c18c;

			cursor: pointer;
			box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.11);
		}

		.activity .teacherColumn {
			font-weight: bolder;
		}

		.addBtn {
			position: fixed;
			right: 25px;
			bottom: 30px;
		}
	}
</style>
