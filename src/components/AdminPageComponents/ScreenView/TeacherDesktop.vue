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

				<v-btn color="#064635" dark @click="addTeacher = true"
					>Add New Teacher</v-btn
				>
			</div>
		</div>
		<div class="contributionCon" v-if="selectContributionTable">
			<ContributionTable />
		</div>
		<div class="allTeachersCon" v-if="!selectContributionTable">
			<div class="searchBarCon">
				<v-text-field
					label="Search Teacher"
					rounded
					solo
					prepend-inner-icon="mdi-account-search"
					color="success"
					v-model="searchTeacher"
				></v-text-field>
			</div>
			<div class="allTeachers">
				<div
					class="teacher"
					v-for="(teacher, index) in renderTeachers"
					:key="index"
				>
					<div class="avatarCon">
						<v-avatar size="70px" color="#007D48"
							><v-icon dark size="60px"> mdi-account </v-icon></v-avatar
						>
					</div>
					<div class="detailsCon">
						<div class="teacherName">Juan Dela Cruz</div>
						<div class="gender">Male</div>
						<div class="btnCon">
							<v-btn
								rounded
								outlined
								color="#007D48"
								small
								to="teachers/profile"
								>View Teacher</v-btn
							>
						</div>
					</div>
				</div>
			</div>
		</div>
		<br />

		<AddTeacher :addTeacher="addTeacher" @closeDialog="closeDialog()" />
	</div>
</template>

<script>
	import AddTeacher from "../PopUpComponents/AddTeacher.vue";
	import ContributionTable from "../TeachersPageComponents/ContributionTable.vue";
	export default {
		components: { AddTeacher, ContributionTable },
		data: () => ({
			addTeacher: false,
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
			searchTeacher: "",
		}),

		methods: {
			closeDialog() {
				this.addTeacher = false;
			},
		},

		computed: {
			renderTeachers: function () {
				const showTeachers = this.teachers.filter((teacher) => {
					return teacher.teacher.includes(this.searchTeacher);
				});

				return showTeachers;
			},
		},
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
		.contributionList .data .teacherCon div {
			padding-left: 10px;
		}

		.contributionList .data .categories div {
			padding-left: 20px;
		}
	}
</style>
