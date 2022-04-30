<template>
	<div class="teacherPageCon">
		<div class="desktopView">
			<div class="pageHeader">
				<h2>Teachers</h2>
				<div class="headerBtns">
					<v-btn rounded small color="#064635" :dark="true"
						>Contribution table</v-btn
					>
					<v-btn rounded small text>All Teachers</v-btn>
				</div>
			</div>
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
								<v-icon>mdi-recycle-variant</v-icon>
								<span>Cellophanes</span></v-btn
							>
							<v-btn text color="#064635" small>
								<v-icon>mdi-more</v-icon><span>Others</span></v-btn
							>
						</div>
						<div class="totalCon">
							<v-btn text color="#064635" small>
								<v-icon>mdi-folder</v-icon><span>Total Trash Activity</span>
							</v-btn>
						</div>
					</div>

					<div class="contributionList">
						<v-btn
							class="data"
							outlined
							color="#5AA67A"
							v-for="(data, index) in contribData"
							:key="index"
						>
							<div class="teacherCon">
								<div>{{ data.teacher }}</div>
							</div>

							<div class="categories">
								<div>{{ data.plastic }}</div>
								<div>{{ data.paper }}</div>
								<div>{{ data.cellophanes }}</div>
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

		<div class="mobileView"></div>
	</div>
</template>

<script>
	export default {
		components: {},
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
		}),
	};
</script>

<style scoped>
	.teacherPageCon {
		text-align: left;
		padding: 20px 40px;
	}

	.pageHeader {
		margin-bottom: 20px;
	}

	.pageHeader h2 {
		color: #064635;
		padding-bottom: 10px;
	}

	.headerBtns .v-btn {
		margin-right: 10px;
	}

	.contributionCon {
		padding: 0px 0px;
	}

	.contributionTable {
		height: 600px;
		background-color: white;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 20px;
		padding: 20px;
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
		max-height: 510px;

		overflow-y: auto;
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

	@media only screen and (max-width: 1100px) {
		.teacherPageCon {
			text-align: left;
			padding: 20px;
		}

		.contributionCon {
			padding: 0px 0px;
		}

		.categories .v-btn span,
		.totalCon .v-btn span {
			display: none;
		}
	}

	@media only screen and (max-width: 700px) {
		.desktopView {
			display: none;
		}

		.mobileView {
			display: block;
		}
	}
</style>
