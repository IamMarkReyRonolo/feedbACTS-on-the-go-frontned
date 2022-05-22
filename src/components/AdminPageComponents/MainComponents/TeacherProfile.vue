<template>
	<div>
		<div class="fetched" v-if="fetched">
			<div class="teacherPageCon">
				<div class="mainCon">
					<div class="leftCon">
						<div class="teacherDetails">
							<div class="profileAvatar">
								<v-avatar size="120px" color="#007D48">
									<v-icon dark size="100px">mdi-account</v-icon></v-avatar
								>
								<div class="functionBtns">
									<v-btn
										color="#407355"
										dark
										x-small
										@click="editTeacher = true"
										>Edit</v-btn
									>
									<v-btn
										color="#7AA51F"
										dark
										x-small
										@click="deleteTeacher = true"
										>Delete</v-btn
									>
								</div>
							</div>

							<div class="name">
								<div class="details">
									<div class="label">First Name</div>
									<div class="content">{{ teacher.first_name }}</div>
								</div>
								<div class="details">
									<div class="label">Last Name</div>
									<div class="content">{{ teacher.last_name }}</div>
								</div>
							</div>

							<div class="details">
								<div class="label">Gender</div>
								<div class="content">{{ teacher.gender }}</div>
							</div>
							<div class="details">
								<div class="label">Username</div>
								<div class="content">{{ teacher.username }}</div>
							</div>
							<div class="details">
								<div class="label">Password</div>
								<div class="content">{{ teacher.password }}</div>
							</div>
							<div class="details">
								<div class="label">Code</div>
								<div class="content">{{ teacher.code }}</div>
							</div>
							<div class="detailsFunctionCon">
								<div class="btn">
									<v-btn small color="#064635" dark @click="showQR = true"
										>View QR Code</v-btn
									>
								</div>

								<div class="btn">
									<v-btn small @click="printCard = true"
										>Print FeedaCTS Card</v-btn
									>
								</div>
							</div>
						</div>
					</div>
					<div class="rightCon">
						<HistoryTable :teacher="teacher" />
					</div>
				</div>

				<div class="mobileView"><DashboardMobile :data="data" /></div>

				<MoreDetails
					:moreDetails="moreDetails"
					@updateDetails="updateDetails($event)"
					@deleteDetails="deleteDetails($event)"
					@closeDetails="closeDetails()"
					:activity="selected_activity"
				/>

				<ViewQRCode :showQR="showQR" @closeQR="closeQR()" :value="getQRValue" />
				<EditTeacher
					:editTeacher="editTeacher"
					@closeDialog="closeDialog()"
					@updateDialog="updateDialog($event)"
					:data="teacher"
				/>

				<DeleteTeacher
					:deleteTeacher="deleteTeacher"
					@closeDeleteDialog="closeDeleteDialog($event)"
					:teacher="teacher"
				/>

				<PrintCard
					:printCard="printCard"
					:teacherDetails="teacher"
					@closePrintCard="closePrintCard"
				/>
			</div>

			<v-snackbar v-model="snackbar" :timeout="timeout">
				{{ message }}

				<template v-slot:action="{ attrs }">
					<v-btn color="#5aa67a" text v-bind="attrs" @click="snackbar = false">
						Close
					</v-btn>
				</template>
			</v-snackbar>
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
	import DashboardMobile from "../ScreenView/DashboardMobile.vue";
	import MoreDetails from "../PopUpComponents/MoreDetails.vue";
	import ViewQRCode from "../PopUpComponents/ViewQRCode.vue";
	import EditTeacher from "../PopUpComponents/EditTeacher.vue";
	import DeleteTeacher from "../PopUpComponents/DeleteTeacher.vue";
	import PrintCard from "../PopUpComponents/PrintCard.vue";
	import HistoryTable from "../TeachersPageComponents/HistoryTable.vue";
	import teacherAPI from "../../../apis/teacherAPI";
	export default {
		components: {
			DashboardMobile,
			MoreDetails,
			ViewQRCode,
			EditTeacher,
			DeleteTeacher,
			PrintCard,
			HistoryTable,
		},
		data() {
			return {
				teacher: {},
				contribData: [
					{
						date: "03/23/2022",
						time: "10:30 AM",
						plastic: 5,
						paper: 5,
						cellophanes: 5,
						other: 5,
						total: 5,
					},
				],
				moreDetails: false,
				showQR: false,
				editTeacher: false,
				deleteTeacher: false,
				printCard: false,
				loading: false,
				fetched: false,
				error: false,
				data: [],
				selected_activity: {},
				snackbar: false,
				timeout: 2000,
				message: "",
			};
		},

		async created() {
			this.loading = true;
			this.fetched = false;

			try {
				const teachers = await teacherAPI.prototype.getAllTeachers();
				this.data = teachers.data;

				this.data.forEach((d) => {
					if (d.id == this.$route.params.teacher_id) {
						this.teacher = d;
					}
				});
				this.fetched = true;
			} catch (error) {
				this.error = true;
			}

			this.loading = false;
		},

		methods: {
			closeDetails() {
				this.moreDetails = false;
			},
			closeQR() {
				this.showQR = false;
			},
			closeDialog() {
				this.editTeacher = false;
			},
			updateDialog(data) {
				if (data) {
					if (data == "Network Error") {
						const result = "failed";
						const message = "Network Error";
						this.showSnackbar(result, message);
					} else if (data == "Request failed with status code 404") {
						const result = "failed";
						const message = "Update Failed";
						this.showSnackbar(result, message);
					} else {
						const result = "success";
						const message = "Successfully updated teacher";
						this.teacher = data;
						this.showSnackbar(result, message);
					}
				}

				this.editTeacher = false;
			},

			showSnackbar(result, message) {
				if (result == "success") {
					this.snackbar = true;
					this.message = message;
				}

				if (result == "failed") {
					this.snackbar = true;
					this.message = message;
				}
			},
			closeDeleteDialog(data) {
				this.deleteTeacher = false;
				if (data) {
					if (data == "Network Error") {
						this.showSnackbar("failed", "Network Error");
					} else {
						this.showSnackbar("failed", "Delete Failed. An Error Occured.");
					}
				}
			},
			closePrintCard() {
				this.printCard = false;
			},
		},

		computed: {
			getQRValue: function () {
				const qrValue = {
					teacher: this.teacher.first_name + " " + this.teacher.last_name,
					code: this.teacher.code,
				};
				return JSON.stringify(qrValue);
			},
		},
	};
</script>

<style scoped>
	.mobileView {
		display: none;
	}
	.teacherPageCon {
		padding: 20px 0px;
	}

	.mainCon {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}

	.leftCon {
		min-width: 24%;
	}

	.rightCon {
		width: 74%;
	}

	.teacherDetails {
		text-align: left;
		background-color: white;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 20px;
	}

	.teacherDetails {
		padding: 20px 40px;
	}

	.detailsFunctionCon {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.profileAvatar {
		text-align: center;
		padding: 20px 0px;
	}

	.functionBtns .v-btn {
		margin: 10px 5px;
	}

	.details {
		padding: 5px 20px;
	}

	.label {
		font-size: 12px;
	}

	.content {
		font-size: 18px;
		font-weight: bold;
		color: #007d48;
	}

	.btn {
		padding: 5px 0px;
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
		.mainCon {
			padding: 0px 0px;
			display: block;
		}

		.leftCon,
		.rightCon {
			width: 100%;
			margin: 10px 0px;
		}

		.teacherDetails,
		.name {
			text-align: left;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.teacherDetails {
			flex-wrap: wrap;
		}
		.details .label {
			font-size: 10px;
		}

		.details .content {
			font-size: 14px;
		}
	}

	@media only screen and (max-width: 765px) {
		.mainCon {
			display: none;
		}

		.mobileView {
			display: block;
		}
	}
</style>
