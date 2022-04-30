<template>
	<div class="desktopView">
		<div class="pageHeader">
			<h2>Teachers</h2>
			<div class="headerBtns">
				<div class="navBtns">
					<v-btn
						rounded
						small
						color="#064635"
						:dark="selectContributionTable"
						:text="!selectContributionTable"
						@click="selectContributionTable = true"
						>Contribution table</v-btn
					>
					<v-btn
						rounded
						small
						color="#064635"
						:dark="!selectContributionTable"
						:text="selectContributionTable"
						@click="selectContributionTable = false"
						>All Teachers</v-btn
					>
				</div>

				<v-btn color="#064635" dark>Add New Teacher</v-btn>
			</div>
		</div>
		<div class="contributionCon" v-if="selectContributionTable">
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
							<v-icon>mdi-trash-can</v-icon><span>Total Trash Activity</span>
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
		<div class="allTeachersCon" v-if="!selectContributionTable">
			<div class="searchBarCon">
				<v-text-field
					label="Search Teacher"
					rounded
					solo
					prepend-inner-icon="mdi-account-search"
					color="success"
				></v-text-field>
			</div>
			<div class="allTeachers">
				<div class="teacher" v-for="(teacher, index) in teachers" :key="index">
					<div class="avatarCon">
						<v-avatar size="70px" color="success"
							><v-icon dark size="60px"> mdi-account </v-icon></v-avatar
						>
					</div>
					<div class="detailsCon">
						<div class="teacherName">Juan Dela Cruz</div>
						<div class="gender">Male</div>
						<div class="btnCon">
							<v-btn rounded outlined color="#5AA67A" small>View Teacher</v-btn>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		components: {},
		data: () => ({
			selectContributionTable: true,
			teachers: [
				{
					teacher: "Juan Dela Cruz",
					gender: "Male",
				},
				{
					teacher: "Juan Dela Cruz",
					gender: "Male",
				},
				{
					teacher: "Juan Dela Cruz",
					gender: "Male",
				},
				{
					teacher: "Juan Dela Cruz",
					gender: "Male",
				},
				{
					teacher: "Juan Dela Cruz",
					gender: "Male",
				},
				{
					teacher: "Juan Dela Cruz",
					gender: "Male",
				},
				{
					teacher: "Juan Dela Cruz",
					gender: "Male",
				},
				{
					teacher: "Juan Dela Cruz",
					gender: "Male",
				},
				{
					teacher: "Juan Dela Cruz",
					gender: "Male",
				},
				{
					teacher: "Juan Dela Cruz",
					gender: "Male",
				},
				{
					teacher: "Juan Dela Cruz",
					gender: "Male",
				},
				{
					teacher: "Juan Dela Cruz",
					gender: "Male",
				},
				{
					teacher: "Juan Dela Cruz",
					gender: "Male",
				},
				{
					teacher: "Juan Dela Cruz",
					gender: "Male",
				},
				{
					teacher: "Juan Dela Cruz",
					gender: "Male",
				},
				{
					teacher: "Juan Dela Cruz",
					gender: "Male",
				},
				{
					teacher: "Juan Dela Cruz",
					gender: "Male",
				},
				{
					teacher: "Juan Dela Cruz",
					gender: "Male",
				},
				{
					teacher: "Juan Dela Cruz",
					gender: "Male",
				},
				{
					teacher: "Juan Dela Cruz",
					gender: "Male",
				},
				{
					teacher: "Juan Dela Cruz",
					gender: "Male",
				},
			],
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
	.pageHeader {
		margin-bottom: 20px;
	}

	.pageHeader h2 {
		color: #064635;
		padding-bottom: 10px;
	}
	.headerBtns {
		display: flex;
		justify-content: space-between;
		align-items: center;
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

	.allTeachers {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
	}

	.teacher {
		background-color: white;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 20px;
		padding: 20px;
		width: 300px;
		height: 200px;
		min-height: 180px;
		min-width: 300px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #064635;
		margin: 10px;
	}

	.avatarCon {
		width: 40%;
		text-align: center;
	}

	.detailsCon {
		padding-top: 20px;
		width: 60%;
	}

	.teacherName {
		font-size: 18px;
		font-weight: bold;
	}

	.gender {
		font-size: 14px;
	}

	.btnCon {
		text-align: right;
	}
	.btnCon .v-btn {
		margin-bottom: -40px;
	}

	.searchBarCon {
		width: 400px;
		margin: auto;
	}

	@media only screen and (max-width: 1100px) {
		.contributionCon {
			padding: 0px 0px;
		}

		.categories .v-btn span,
		.totalCon .v-btn span {
			display: none;
		}
	}
</style>
