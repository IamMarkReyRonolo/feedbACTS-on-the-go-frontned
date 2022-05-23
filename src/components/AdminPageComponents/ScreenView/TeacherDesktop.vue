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
			{{ getContribution }}
			<ContributionTable :contribData="contribData" />
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

			<div class="allTeachers" v-if="renderTeachers.length != 0">
				{{ getAllTeachers }}
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
						<div class="teacherName">{{ teacher.teacher }}</div>
						<div class="gender">{{ teacher.gender }}</div>
						<div class="btnCon">
							<v-btn
								rounded
								outlined
								color="#007D48"
								small
								:to="'teachers/profile/' + teacher.id"
								>View Teacher</v-btn
							>
						</div>
					</div>
				</div>
			</div>
			<div class="empty" v-if="renderTeachers.length == 0">
				<img src="../../../assets/emptyTrash.png" alt="" />
				<h4>Nothing to show. I suggest you might add some teachers</h4>
			</div>
		</div>
		<br />

		<v-snackbar v-model="snackbar" :timeout="timeout">
			{{ message }}

			<template v-slot:action="{ attrs }">
				<v-btn color="#5aa67a" text v-bind="attrs" @click="snackbar = false">
					Close
				</v-btn>
			</template>
		</v-snackbar>

		<AddTeacher
			:addTeacher="addTeacher"
			@closeDialog="closeDialog($event)"
			v-if="addTeacher"
		/>
	</div>
</template>

<script>
	import AddTeacher from "../PopUpComponents/AddTeacher.vue";
	import ContributionTable from "../TeachersPageComponents/ContributionTable.vue";
	export default {
		props: {
			data: Array,
		},
		components: { AddTeacher, ContributionTable },
		data: () => ({
			addTeacher: false,
			selectContributionTable: true,
			teachers: [],
			teachersData: [],
			contribData: [],
			searchTeacher: "",
			snackbar: false,
			message: "",
			timeout: 3000,
		}),
		created() {
			this.teachersData = this.data.slice();
		},

		methods: {
			closeDialog(data) {
				if (data) {
					if (data == "Network Error") {
						this.message = data;
						this.snackbar = true;
					} else if (data == "Failed. Username already exists") {
						this.message = data;
						this.snackbar = true;
					} else {
						this.message = "Added Teacher Successfully";
						this.snackbar = true;
						location.reload();
					}
				}
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

			getAllTeachers: function () {
				this.teachersData.forEach((d) => {
					let teacher = {};
					teacher.teacher = d.first_name + " " + d.last_name;
					teacher.gender = d.gender;
					teacher.id = d.id;
					this.teachers.push(teacher);
				});
			},

			getContribution: function () {
				this.teachersData.forEach((d) => {
					let teacher = {};
					teacher.teacher = d.first_name + " " + d.last_name;
					teacher.id = d.id;
					teacher.paper = 0;
					teacher.cellophanes = 0;
					teacher.plastic_bottles = 0;
					teacher.others = 0;
					teacher.segregated = 0;
					teacher.partly_seg = 0;
					teacher.not_seg = 0;
					teacher.total_activities = 0;
					d.activities.forEach((activity) => {
						if (activity.categories.includes("Paper")) {
							teacher.paper += 1;
						}

						if (activity.categories.includes("Cellophanes")) {
							teacher.cellophanes += 1;
						}
						if (activity.categories.includes("Plastic Bottles")) {
							teacher.plastic_bottles += 1;
						}
						if (activity.categories.includes("Others")) {
							teacher.others += 1;
						}

						if (activity.status == "Segregated") {
							teacher.segregated += 1;
						}

						if (activity.status == "Partly Segregated") {
							teacher.partly_seg += 1;
						}

						if (activity.status == "Not Segregated") {
							teacher.not_seg += 1;
						}

						teacher.total_activities += 1;
					});

					this.contribData.push(teacher);
				});
			},

			// transferProp: function () {
			// 	this.teachersData = this.data.slice();
			// },
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
