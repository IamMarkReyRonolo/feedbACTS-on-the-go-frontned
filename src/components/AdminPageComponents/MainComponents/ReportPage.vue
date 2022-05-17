<template>
	<div class="report">
		<div class="desktopView">
			<div class="reportCon">
				<h2>Report</h2>

				<div class="sec">
					<h3>Title: Monthly Report</h3>
					<br />
					<div class="subtitle" style="color: #064635">
						<b>Date</b>: March 20, 2022 - April 1, 2022
					</div>
					<br />
					<div class="subtitle" style="color: #064635">
						<b>Description</b>: Lorem ipsum dolor sit amet consectetur
						adipisicing elit. Architecto blanditiis inventore, unde ut id
						provident culpa maxime commodi voluptas labore.
					</div>
				</div>
				<div class="sec">
					<h3>Teachers' Contribution Consistency</h3>
					<div class="stats">
						<LineChart :width="300" :height="300" />
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
										<div class="count">5</div>
										<span>Activities</span>
									</div>
								</div>
								<div class="data">
									<div class="categoryTitle">Cellophanes</div>
									<div class="activityCount">
										<div class="count">10</div>
										<span>Activities</span>
									</div>
								</div>
							</div>

							<div class="con1">
								<div class="data">
									<div class="categoryTitle">Plastic Bottles</div>
									<div class="activityCount">
										<div class="count">2</div>
										<span>Activities</span>
									</div>
								</div>
								<div class="data">
									<div class="categoryTitle">Others</div>
									<div class="activityCount">
										<div class="count">17</div>
										<span>Activities</span>
									</div>
								</div>
							</div>
						</div>
						<div class="totalTrashCon">
							<Pie :width="300" :height="300" :data="dataPerType" />
						</div>
					</div>
				</div>

				<div class="sec">
					<div class="contentCon">
						<div class="totalTrashCon">
							<Pie :width="300" :height="300" :data="dataPerStatus" />
						</div>
						<div class="dataCon">
							<div class="con1">
								<div class="data">
									<div class="categoryTitle">Segregated</div>
									<div class="activityCount">
										<div class="count">5</div>
										<span>Activities</span>
									</div>
								</div>
								<div class="data">
									<div class="categoryTitle">Not Segregated</div>
									<div class="activityCount">
										<div class="count">10</div>
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
										<div class="count">2</div>
										<span>Activities</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="sec">
					<h3>Contribution Table</h3>
					<ContributionTable />
				</div>
			</div>
			<v-btn @click="generateReport" color="#5aa67a" dark :loading="loading">
				Print Report</v-btn
			>

			<br />
			<br />
			<br />

			<VueHtml2pdf
				:show-layout="false"
				:float-layout="true"
				:enable-download="true"
				filename="Report"
				:pdf-quality="2"
				:manual-pagination="false"
				pdf-format="legal"
				pdf-orientation="landscape"
				ref="html2Pdf"
				pdf-content-width="80%"
				:paginate-elements-by-height="500"
				@progress="loading = true"
				@beforeDownload="loading = false"
			>
				<section slot="pdf-content">
					<div class="reportCon">
						<h2>Report</h2>

						<div class="sec">
							<h3>Title: Monthly Report</h3>
							<br />
							<div class="subtitle" style="color: #064635">
								<b>Date</b>: March 20, 2022 - April 1, 2022
							</div>
							<br />
							<div class="subtitle" style="color: #064635">
								<b>Description</b>: Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Architecto blanditiis inventore, unde ut id
								provident culpa maxime commodi voluptas labore.
							</div>
						</div>
						<div class="sec">
							<h3>Teachers' Contribution Consistency</h3>
							<div class="stats">
								<LineChart :width="300" :height="300" />
							</div>
						</div>
						<br /><br /><br /><br />
						<br /><br /><br /><br />
						<div class="sec">
							<h3>Total Trash Collected</h3>
							<div class="contentCon">
								<div class="dataCon">
									<div class="con1">
										<div class="data">
											<div class="categoryTitle">Paper</div>
											<div class="activityCount">
												<div class="count">5</div>
												<span>Activities</span>
											</div>
										</div>
										<div class="data">
											<div class="categoryTitle">Cellophanes</div>
											<div class="activityCount">
												<div class="count">10</div>
												<span>Activities</span>
											</div>
										</div>
									</div>

									<div class="con1">
										<div class="data">
											<div class="categoryTitle">Plastic Bottles</div>
											<div class="activityCount">
												<div class="count">2</div>
												<span>Activities</span>
											</div>
										</div>
										<div class="data">
											<div class="categoryTitle">Others</div>
											<div class="activityCount">
												<div class="count">17</div>
												<span>Activities</span>
											</div>
										</div>
									</div>
								</div>
								<div class="totalTrashCon">
									<Pie :width="300" :height="300" :data="dataPerType" />
								</div>
							</div>
						</div>

						<div class="sec" style="margin-top: -20px">
							<div class="contentCon">
								<div class="totalTrashCon">
									<Pie :width="300" :height="300" :data="dataPerStatus" />
								</div>
								<div class="dataCon">
									<div class="con1">
										<div class="data">
											<div class="categoryTitle">Segregated</div>
											<div class="activityCount">
												<div class="count">5</div>
												<span>Activities</span>
											</div>
										</div>
										<div class="data">
											<div class="categoryTitle">Not Segregated</div>
											<div class="activityCount">
												<div class="count">10</div>
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
												<div class="count">2</div>
												<span>Activities</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<br /><br /><br />
						<div class="sec">
							<h3>Contribution Table</h3>
							<ContributionTable />
						</div>
					</div>
				</section>
			</VueHtml2pdf>
		</div>

		<div class="mobileView"><DashboardMobile /></div>
	</div>
</template>

<script>
	import VueHtml2pdf from "vue-html2pdf";
	import LineChart from "./Line.vue";
	import Pie from "./Pie.vue";
	import DashboardMobile from "../ScreenView/DashboardMobile.vue";

	import ContributionTable from "../ReportPageComponents/ContributionTable.vue";
	export default {
		components: {
			VueHtml2pdf,
			LineChart,
			Pie,
			DashboardMobile,
			ContributionTable,
		},
		data: () => ({
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
			value: [
				423, 446, 675, 510, 590, 610, 760, 423, 446, 675, 510, 590, 610, 760,
			],
			label: [1, 2, 3, 4, 5],
			dataPerType: {
				paper: 20,
				plastic_bottles: 40,
				cellophanes: 30,
				others: 10,
				bg_color: ["#007D48", "#407355", "#7AA51F", "#FDC00B"],
			},
			dataPerStatus: {
				segregated: 20,
				partially_segregated: 40,
				not_segregated: 40,
				bg_color: ["#41B883", "#d6ab33", "#94e0be"],
			},
			loading: false,
		}),
		methods: {
			generateReport() {
				this.$refs.html2Pdf.generatePdf();
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
