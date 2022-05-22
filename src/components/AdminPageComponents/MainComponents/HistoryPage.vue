<template>
	<div>
		<div class="fetched" v-if="fetched">
			{{ getSorted }}
			<div class="historyPage">
				<div class="desktopView">
					<h2>Report History</h2>
					<br />
					<div v-if="this.reports.length != 0">
						<div class="searchBarCon">
							<v-text-field
								label="Search Report"
								rounded
								solo
								dense
								prepend-inner-icon="mdi-archive-search"
								color="success"
							></v-text-field>
						</div>
						<div class="reportHistoryTable">
							<div class="header">
								<v-btn text color="#007D48" small
									><v-icon>mdi-calendar</v-icon><span>Date Created</span></v-btn
								>
								<v-btn text color="#007D48" small
									><v-icon>mdi-android-messages</v-icon
									><span>Report Title</span></v-btn
								>
							</div>

							<div class="report" v-for="report in reports" :key="report.id">
								<div class="left">
									<div class="dateCreated">
										{{ report.createdAt.substring(0, 10).replaceAll("-", "/") }}
									</div>
									<div class="reportTitle">{{ report.report_title }}</div>
								</div>

								<div class="right">
									<v-btn
										rounded
										small
										color="error"
										text
										@click="selectToDelete(report.id)"
										>Delete</v-btn
									>
									<v-btn
										rounded
										small
										color="#007D48"
										dark
										@click="$router.push('report/' + report.id)"
										>View Report</v-btn
									>
								</div>
							</div>
						</div>
					</div>

					<div class="empty" v-if="this.reports.length == 0">
						<img src="../../../assets/emptyTrash.png" alt="" />
						<h4>No history yet. Go to dashboard and generate report.</h4>
					</div>
				</div>
				<div class="mobileView">
					<br />
					<br />
					<v-btn to="/" color="green" dark>Refresh</v-btn>
				</div>

				<DeleteReport
					:deleteReport="deleteReport"
					:id="deleteReportId"
					@closeDeleteDialog="closeDeleteDialog($event)"
				/>

				<v-snackbar v-model="snackbar" :timeout="timeout">
					{{ message }}

					<template v-slot:action="{ attrs }">
						<v-btn
							color="#5aa67a"
							text
							v-bind="attrs"
							@click="snackbar = false"
						>
							Close
						</v-btn>
					</template>
				</v-snackbar>
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
	import reportAPI from "../../../apis/reportAPI";
	import DeleteReport from "../PopUpComponents/DeleteReport.vue";
	export default {
		components: { DeleteReport },
		data() {
			return {
				fetched: true,
				loading: false,
				error: false,
				reports: [],
				deleteReport: false,
				deleteReportId: 0,
				message: "",
				snackbar: false,
				timeout: 3000,
			};
		},

		methods: {
			selectToDelete(id) {
				this.deleteReport = true;
				this.deleteReportId = id;
			},
			closeDeleteDialog(data) {
				let typeData = typeof data;

				if (data) {
					if (typeData == "number") {
						for (let i = 0; i < this.reports.length; i++) {
							if (this.reports[i].id == data) {
								this.reports.splice(i, 1);
								break;
							}
						}
						this.message = "Successfully deleted report.";
						this.snackbar = true;
					} else {
						this.message = data;
						this.snackbar = true;
					}
				}
				this.deleteReport = false;
			},
		},

		async created() {
			try {
				this.fetched = false;
				this.loading = true;
				const result = await reportAPI.prototype.getAllReport();

				this.reports = result.data;
				this.fetched = true;
				this.loading = false;
			} catch (error) {
				this.error = true;
				this.loading = false;
			}
		},

		computed: {
			getSorted() {
				this.reports.reverse();
			},
		},
	};
</script>

<style scoped>
	.historyPage {
		text-align: left;
		padding: 20px 40px;
	}
	.mobileView {
		display: none;
	}

	h2 {
		color: #064635;
	}

	.reportHistoryTable {
		margin: 20px 0px;
		padding: 10px 0px;
	}

	/* .header,
	.report {
		border: 1px solid black;
	} */

	.header,
	.report {
		display: flex;
		align-items: center;
	}

	.report {
		justify-content: space-between;
		align-items: center;
	}

	.report {
		margin: 4px 0px;
		padding: 0px 20px;
		background-color: white;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 10px;
	}

	:hover.report {
		background-color: #aee6c650;
		transition: 0.2s ease;
	}

	.left {
		display: flex;
	}

	.left div {
		width: 200px;
		color: #007d48;
		font-weight: 500;
		padding: 20px 0px;
	}

	.report .v-btn {
		margin: 0px 5px;
	}

	.header .v-btn {
		width: 200px;
		justify-content: flex-start;
		display: flex;
		align-items: center;
	}

	.searchBarCon {
		width: 400px;
		margin: auto;
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
		color: #007d48;
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

	.empty {
		text-align: center;

		margin: 100px auto;
	}

	.empty h4 {
		color: #007d48;
		font-weight: lighter;
		padding: 20px;
	}

	.empty img {
		width: 300px;
	}

	@media only screen and (max-width: 1100px) {
		.historyPage {
			text-align: left;
			padding: 20px;
		}

		.reportHistoryTable {
			margin: 10px 0px;
			padding: 10px 10px;
		}
	}

	@media only screen and (max-width: 765px) {
		.desktopView {
			display: none;
		}

		.mobileView {
			display: block;
		}
	}
</style>
