<template>
	<div class="report">
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
					<b>Description</b>: Lorem ipsum dolor sit amet consectetur adipisicing
					elit. Architecto blanditiis inventore, unde ut id provident culpa
					maxime commodi voluptas labore.
				</div>
			</div>
			<div class="sec">
				<h3>Trash Activity</h3>
				<div class="stats">
					<LineChart />
				</div>
			</div>

			<div class="sec">
				<h3>Total Trash Collected</h3>
				<div class="contentCon">
					<div class="dataCon">
						<div class="con1">
							<div class="data"></div>
							<div class="data"></div>
						</div>

						<div class="con1">
							<div class="data"></div>
							<div class="data"></div>
						</div>
					</div>
					<div class="totalTrashCon">
						<Pie />
					</div>
				</div>
			</div>

			<div class="sec">
				<h3>Contribution Table</h3>
				<div class="contributionCon">
					<div class="contributionTable">
						<div class="contributionHeader">
							<div class="teacherCon">
								<v-btn text color="#064635" small>
									<v-icon>mdi-account</v-icon>Teacher name</v-btn
								>
							</div>

							<div class="categories">
								<v-btn text color="#064635" small>
									<v-icon>mdi-recycle</v-icon> <span>Plastic</span></v-btn
								>
								<v-btn text color="#064635" small>
									<v-icon>mdi-paper-roll</v-icon> <span>Paper</span></v-btn
								>

								<v-btn text color="#064635" small>
									<v-icon>mdi-more</v-icon><span>Others</span></v-btn
								>
							</div>
							<div class="totalCon">
								<v-btn text color="#064635" small>
									<v-icon>mdi-trash-can</v-icon><span>Total Trash</span>
								</v-btn>
							</div>
						</div>

						<div class="contributionList">
							<v-btn
								class="data"
								text
								color="#5AA67A"
								v-for="(data, index) in contribData"
								:key="index"
								x-large
								to="teachers/profile"
							>
								<div class="teacherCon">
									<div>
										<v-icon>mdi-account-circle</v-icon>{{ data.teacher }}
									</div>
								</div>

								<div class="categories">
									<div>{{ data.plastic }}</div>
									<div>{{ data.paper }}</div>

									<div>{{ data.other }}</div>
								</div>
								<div class="totalCon">
									<div>{{ data.total }}</div>
								</div>
							</v-btn>
						</div>
					</div>
				</div>
			</div>
		</div>

		<v-btn @click="generateReport" color="#5aa67a" dark> Print Report</v-btn>
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
			pdf-orientation="portrait"
			ref="html2Pdf"
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
						<h3>Trash Activity</h3>
						<div class="stats">
							<LineChart />
						</div>
					</div>

					<div class="sec">
						<h3>Total Trash Collected</h3>
						<div class="contentCon">
							<div class="dataCon">
								<div class="con1">
									<div
										class="data printableData"
										style="width: 100px; height: 100px; margin: 10px"
									></div>
									<div
										class="data printableData"
										style="width: 100px; height: 100px; margin: 10px"
									></div>
								</div>

								<div class="con1">
									<div
										class="data printableData"
										style="width: 100px; height: 100px; margin: 10px"
									></div>
									<div
										class="data printableData"
										style="width: 100px; height: 100px; margin: 10px"
									></div>
								</div>
							</div>
							<div class="totalTrashCon printablePie">
								<Pie />
							</div>
						</div>
					</div>
					<br /><br />
					<div class="sec printable">
						<h3>Contribution Table</h3>
						<br />
						<div class="contributionCon">
							<div class="contributionTable">
								<div class="contributionHeader">
									<div class="teacherCon">
										<v-btn text color="#064635" small>
											<v-icon>mdi-account</v-icon>Teacher name</v-btn
										>
									</div>

									<div class="categories">
										<v-btn text color="#064635" small>
											<v-icon>mdi-recycle</v-icon> <span>Plastic</span></v-btn
										>
										<v-btn text color="#064635" small>
											<v-icon>mdi-paper-roll</v-icon> <span>Paper</span></v-btn
										>

										<v-btn text color="#064635" small>
											<v-icon>mdi-more</v-icon><span>Others</span></v-btn
										>
									</div>
									<div class="totalCon">
										<v-btn text color="#064635" small>
											<v-icon>mdi-trash-can</v-icon><span>Total Trash </span>
										</v-btn>
									</div>
								</div>

								<div class="contributionList">
									<v-btn
										class="data"
										text
										color="#5AA67A"
										v-for="(data, index) in contribData"
										:key="index"
										x-large
										to="teachers/profile"
									>
										<div class="teacherCon">
											<div>
												<v-icon>mdi-account-circle</v-icon>{{ data.teacher }}
											</div>
										</div>

										<div class="categories">
											<div>{{ data.plastic }}</div>
											<div>{{ data.paper }}</div>

											<div>{{ data.other }}</div>
										</div>
										<div class="totalCon">
											<div>{{ data.total }}</div>
										</div>
									</v-btn>
								</div>
							</div>
						</div>
					</div>

					<br />
					<br />
				</div>
			</section>
		</VueHtml2pdf>
	</div>
</template>

<script>
	import VueHtml2pdf from "vue-html2pdf";
	import LineChart from "./Line.vue";
	import Pie from "./Pie.vue";
	export default {
		components: { VueHtml2pdf, LineChart, Pie },
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
		}),
		methods: {
			generateReport() {
				this.$refs.html2Pdf.generatePdf();
			},
		},
	};
</script>

<style scoped>
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
		padding: 20px 0px;
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

	/* .totalTrashCon .data {
		width: 200px;
		height: 150px;
		margin: 20px;
		border-radius: 20px;
		background-color: white;
		border: 1px solid #5aa67a;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	} */
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
</style>
