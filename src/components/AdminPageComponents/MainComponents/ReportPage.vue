<template>
	<div>
		<div class="report" v-if="fetched">
			{{ dataPerType }}
			{{ dataPerStatus }}
			{{ getChartData }}
			<div class="desktopView">
				<br />

				<VueHtml2pdf
					:show-layout="true"
					:float-layout="false"
					:enable-download="true"
					filename="Report"
					:pdf-quality="2"
					:manual-pagination="false"
					pdf-format="legal"
					pdf-orientation="landscape"
					ref="html2Pdf"
					pdf-content-width="100%"
					:paginate-elements-by-height="500"
					@startPagination="printLoading = true"
					@hasDownloaded="printLoading = false"
				>
					<section slot="pdf-content">
						<div class="reportCon">
							<h2>Report</h2>

							<div class="sec">
								<h3>Title: {{ reportData.report_title }}</h3>
								<br />
								<div class="subtitle" style="color: #064635">
									<b>Date</b>: {{ reportData.date_started }} -
									{{ reportData.date_ended }}
								</div>
								<br />
								<div class="subtitle" style="color: #064635">
									<b>Description</b>: {{ reportData.report_details }}
								</div>
							</div>
							<div class="sec">
								<h3>Teachers' Contribution Consistency</h3>
								<!-- <div class="stats">
									<LineChart :width="300" :height="300" />
								</div> -->

								<div class="stats">
									<BarChart :width="50" :height="300" :data="chartData" />
								</div>
							</div>

							<div class="sec">
								<h3>Total Trash Collected</h3>
								<div class="contentCon">
									<div class="dataCon">
										<div class="con1">
											<div class="data">
												<div class="categoryTitle">Paper</div>
												<div class="activityCount">
													<div class="count">{{ values.paper }}</div>
													<span>Activities</span>
												</div>
											</div>
											<div class="data">
												<div class="categoryTitle">Cellophanes</div>
												<div class="activityCount">
													<div class="count">{{ values.cellophanes }}</div>
													<span>Activities</span>
												</div>
											</div>
										</div>

										<div class="con1">
											<div class="data">
												<div class="categoryTitle">Plastic Bottles</div>
												<div class="activityCount">
													<div class="count">{{ values.plastic_bottles }}</div>
													<span>Activities</span>
												</div>
											</div>
											<div class="data">
												<div class="categoryTitle">Others</div>
												<div class="activityCount">
													<div class="count">{{ values.others }}</div>
													<span>Activities</span>
												</div>
											</div>
										</div>
									</div>
									<div class="totalTrashCon">
										<Pie :width="300" :height="300" :data="perType" />
									</div>
								</div>
							</div>

							<div class="sec">
								<div class="contentCon">
									<div class="totalTrashCon">
										<Pie :width="300" :height="300" :data="perStatus" />
									</div>
									<div class="dataCon">
										<div class="con1">
											<div class="data">
												<div class="categoryTitle">Segregated</div>
												<div class="activityCount">
													<div class="count">{{ values.segregated }}</div>
													<span>Activities</span>
												</div>
											</div>
											<div class="data">
												<div class="categoryTitle" style="font-size: 14px">
													Not Segregated
												</div>
												<div class="activityCount">
													<div class="count">{{ values.not_segregated }}</div>
													<span>Activities</span>
												</div>
											</div>
										</div>

										<div class="con1">
											<div class="data">
												<div class="categoryTitle" style="font-size: 14px">
													Partly Segregated
												</div>
												<div class="activityCount">
													<div class="count">
														{{ values.partly_segregated }}
													</div>
													<span>Activities</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div class="sec">
								<h3>Contribution Table</h3>
								<ContributionTable :data="reportData" />
							</div>
						</div>
					</section>
				</VueHtml2pdf>

				<v-btn
					@click="generateReport"
					color="#5aa67a"
					dark
					:loading="printLoading"
				>
					Print Report</v-btn
				>
				<br />
				<br />
				<br />
				<br />
			</div>

			<div class="mobileView">
				<br />
				<br />
				<v-btn to="/" color="green" dark>Refresh</v-btn>
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
	import VueHtml2pdf from "vue-html2pdf";
	import Pie from "./Pie.vue";
	import BarChart from "./BarChart.vue";
	import reportAPI from "../../../apis/reportAPI";
	import ContributionTable from "../ReportPageComponents/ContributionTable.vue";
	import teacherAPI from "../../../apis/teacherAPI";
	export default {
		components: {
			VueHtml2pdf,
			Pie,
			BarChart,
			ContributionTable,
		},
		data: () => ({
			fetched: true,
			loading: false,
			error: false,
			reportData: {},
			contribData: [
				{
					teacher: "Juan Dela Cruz",
					plastic: 5,
					paper: 5,
					cellophanes: 5,
					other: 5,
					total: 5,
				},
				{
					teacher: "Juan Dela Cruz",
					plastic: 5,
					paper: 5,
					cellophanes: 5,
					other: 5,
					total: 5,
				},
				{
					teacher: "Juan Dela Cruz",
					plastic: 5,
					paper: 5,
					cellophanes: 5,
					other: 5,
					total: 5,
				},
				{
					teacher: "Juan Dela Cruz",
					plastic: 5,
					paper: 5,
					cellophanes: 5,
					other: 5,
					total: 5,
				},
				{
					teacher: "Juan Dela Cruz",
					plastic: 5,
					paper: 5,
					cellophanes: 5,
					other: 5,
					total: 5,
				},
				{
					teacher: "Juan Dela Cruz",
					plastic: 5,
					paper: 5,
					cellophanes: 5,
					other: 5,
					total: 5,
				},
				{
					teacher: "Juan Dela Cruz",
					plastic: 5,
					paper: 5,
					cellophanes: 5,
					other: 5,
					total: 5,
				},
				{
					teacher: "Juan Dela Cruz",
					plastic: 5,
					paper: 5,
					cellophanes: 5,
					other: 5,
					total: 5,
				},
				{
					teacher: "Juan Dela Cruz",
					plastic: 5,
					paper: 5,
					cellophanes: 5,
					other: 5,
					total: 5,
				},
				{
					teacher: "Juan Dela Cruz",
					plastic: 5,
					paper: 5,
					cellophanes: 5,
					other: 5,
					total: 5,
				},
				{
					teacher: "Juan Dela Cruz",
					plastic: 5,
					paper: 5,
					cellophanes: 5,
					other: 5,
					total: 5,
				},
				{
					teacher: "Juan Dela Cruz",
					plastic: 5,
					paper: 5,
					cellophanes: 5,
					other: 5,
					total: 5,
				},
				{
					teacher: "Juan Dela Cruz",
					plastic: 5,
					paper: 5,
					cellophanes: 5,
					other: 5,
					total: 5,
				},
			],
			perType: [],
			perStatus: [],
			values: {
				paper: 0,
				plastic_bottles: 0,
				cellophanes: 0,
				others: 0,
				segregated: 0,
				not_segregated: 0,
				partly_segregated: 0,
			},
			value: [
				423, 446, 675, 510, 590, 610, 760, 423, 446, 675, 510, 590, 610, 760,
			],
			printLoading: false,
			chartData: {
				labels: [],
				data: [],
			},

			teacherChartData: [],
		}),
		async created() {
			try {
				this.fetched = false;
				this.loading = true;
				const result = await reportAPI.prototype.getSpecificReport(
					this.$route.params.reportid
				);

				this.reportData = result.data;
				const payload = {
					date_started: result.data.date_started,
					date_ended: result.data.date_ended,
				};

				const teachers = await teacherAPI.prototype.getAllWithinRange(payload);

				this.teacherChartData = teachers.data;
				this.loading = false;
				this.fetched = true;
			} catch (error) {
				this.loading = false;
				this.error = true;
			}
		},

		methods: {
			generateReport() {
				this.$refs.html2Pdf.generatePdf();
			},
		},

		computed: {
			getChartData: function () {
				this.teacherChartData.forEach((data) => {
					let name = data.first_name + " " + data.last_name;
					this.chartData.labels.push(name);
					this.chartData.data.push(data.activities.length);
				});
			},

			dataPerType: function () {
				let paper = 0;
				let plastic_bottles = 0;
				let cellophanes = 0;
				let others = 0;

				this.reportData.activities.forEach((activity) => {
					if (activity.categories.includes("Paper")) {
						paper += 1;
					}
					if (activity.categories.includes("Plastic Bottles")) {
						plastic_bottles += 1;
					}
					if (activity.categories.includes("Cellophanes")) {
						cellophanes += 1;
					}
					if (activity.categories.includes("Others")) {
						others += 1;
					}
				});

				let total = paper + plastic_bottles + cellophanes + others;
				this.values.paper = paper;
				this.values.plastic_bottles = plastic_bottles;
				this.values.cellophanes = cellophanes;
				this.values.others = others;
				let data = {
					paper: ((paper / total) * 100).toFixed(2),
					plastic_bottles: ((plastic_bottles / total) * 100).toFixed(2),
					cellophanes: ((cellophanes / total) * 100).toFixed(2),
					others: ((others / total) * 100).toFixed(2),
					bg_color: ["#007D48", "#407355", "#7AA51F", "#FDC00B"],
				};

				this.perType = data;
			},

			dataPerStatus: function () {
				let segregated = 0;
				let partly_segregated = 0;
				let not_segregated = 0;

				this.reportData.activities.forEach((activity) => {
					if (activity.status == "Segregated") {
						segregated += 1;
					}
					if (activity.status == "Partly Segregated") {
						partly_segregated += 1;
					}
					if (activity.status == "Not Segregated") {
						not_segregated += 1;
					}
				});

				let total = segregated + not_segregated + partly_segregated;
				this.values.segregated = segregated;
				this.values.not_segregated = not_segregated;
				this.values.partly_segregated = partly_segregated;

				let data = {
					segregated: ((segregated / total) * 100).toFixed(2),
					partially_segregated: ((partly_segregated / total) * 100).toFixed(2),
					not_segregated: ((not_segregated / total) * 100).toFixed(2),
					bg_color: ["#41B883", "#d6ab33", "#94e0be"],
				};

				this.perStatus = data;
			},
		},
	};
</script>

<style scoped>
	.mobileView {
		display: none;
	}
	.reportCon h2,
	.reportCon h3 {
		color: #064635;
	}

	.reportCon {
		text-align: left;
		padding: 20px 60px;
	}

	.sec {
		padding: 20px 0px;
	}

	.stats {
		background-color: white;
		padding: 20px;
		margin: 10px 0px;
		border-radius: 20px;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		width: 80%;
	}

	.colored {
		background-color: #5aa67a;
	}

	.contentCon {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.dataCon {
		display: flex;
		margin: 0px 10px;
		align-items: center;
		justify-content: center;
		width: 30%;
	}

	.dataCon .data {
		width: 150px;
		height: 150px;
		background-color: white;
		border: 1px solid #5aa67a;
		border-radius: 20px;
		margin: 20px;
	}

	.totalTrashCon {
		width: 65%;
		text-align: center;
		background-color: white;
		margin: 10px 0px;
		padding: 10px 0px;
		border-radius: 20px;
		border: 1px solid #5aa67a;
	}

	.con1 .data {
		display: block;
		text-align: center;
	}

	.categoryTitle {
		padding: 10px;
		font-weight: bold;
		color: #5aa67a;
	}

	.count {
		font-weight: bold;
		font-size: 40px;
		color: #fdc00b;
	}

	.activityCount span {
		color: #5aa67a;
		font-size: 14px;
	}
	.contributionTable {
		background-color: white;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 20px;
		padding: 20px;
		margin: 20px 0px;
	}

	.contributionHeader,
	.data {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.teacherCon {
		width: 30%;

		text-align: left;
	}

	.categories {
		width: 50%;
		display: flex;
		justify-content: space-evenly;
	}

	.totalCon {
		width: 20%;
		text-align: center;
	}

	.v-icon {
		padding: 10px;
	}

	.contributionList {
		margin: 10px 0px;
	}

	.contributionList .data {
		padding: 10px 0px;
		font-weight: bold;
		padding: 20px 0px;
		margin: 2px 0px;
	}

	.contributionList .data .teacherCon div {
		padding-left: 30px;
		text-align: left;
	}

	.contributionList .data .categories div {
		width: 25%;
		text-align: center;
	}

	.printable {
		margin-top: 150px;
	}

	.printable .contributionCon .contributionTable {
		background-color: white;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 20px;
		padding: 0px;
		margin: 0px 0px;
	}

	.printable
		.contributionCon
		.contributionTable
		.contributionList
		.data
		.teacherCon
		div {
		padding-left: 0px;
		text-align: left;
	}

	.printableData {
		width: 100px;
		height: 100px;
	}

	.printableData .categoryTitle {
		padding: 5px;
		font-weight: bold;
		color: #5aa67a;
		font-weight: 12px;
	}

	.printableData .activityCount .count {
		font-weight: bold;
		font-size: 28px;
		color: #fdc00b;
	}

	.printableData .activityCount span {
		color: #5aa67a;
		font-size: 10px;
	}

	.printablePie {
		widows: 50%;
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

	@media only screen and (max-width: 1100px) {
		.dataCon {
			display: flex;
			margin: 0px 10px;
			align-items: center;
			justify-content: center;
			width: 30%;
			flex-wrap: wrap;
		}

		.dataCon .data {
			width: 150px;
			height: 150px;
			background-color: white;
			border: 1px solid #5aa67a;
			border-radius: 20px;
			margin: 20px;
		}
		.reportCon {
			text-align: left;
			padding: 40px 20px;
		}
		.contributionCon {
			padding: 0px 0px;
		}

		.categories .v-btn span,
		.totalCon .v-btn span {
			display: none;
		}
		.contributionList .data .teacherCon div {
			padding-left: 10px;
		}

		.contributionList .data .categories div {
			padding-left: 20px;
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
