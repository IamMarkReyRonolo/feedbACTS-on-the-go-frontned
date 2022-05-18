<template>
	<div class="teacherPageCon">
		<div class="mainCon">
			<div class="leftCon">
				<div class="teacherDetails">
					<div class="profileAvatar">
						<v-avatar size="120px" color="#007D48">
							<v-icon dark size="100px">mdi-account</v-icon></v-avatar
						>
						<div class="functionBtns">
							<v-btn color="#407355" dark x-small @click="editTeacher = true"
								>Edit</v-btn
							>
							<v-btn color="#7AA51F" dark x-small @click="deleteTeacher = true"
								>Delete</v-btn
							>
						</div>
					</div>

					<div class="name">
						<div class="details">
							<div class="label">First Name</div>
							<div class="content">Juan</div>
						</div>
						<div class="details">
							<div class="label">Last Name</div>
							<div class="content">Dela Cruz</div>
						</div>
					</div>

					<div class="details">
						<div class="label">Gender</div>
						<div class="content">Male</div>
					</div>
					<div class="details">
						<div class="label">Username</div>
						<div class="content">akosijuan123</div>
					</div>
					<div class="details">
						<div class="label">Password</div>
						<div class="content">123123</div>
					</div>
					<div class="details">
						<div class="label">Code</div>
						<div class="content">123123</div>
					</div>
					<div class="detailsFunctionCon">
						<div class="btn">
							<v-btn small color="#064635" dark @click="showQR = true"
								>View QR Code</v-btn
							>
						</div>

						<div class="btn">
							<v-btn small @click="printCard = true">Print FeedaCTS Card</v-btn>
						</div>
					</div>
				</div>
			</div>
			<div class="rightCon">
				<HistoryTable />
			</div>
		</div>

		<div class="mobileView"><DashboardMobile /></div>

		<MoreDetails :moreDetails="moreDetails" @closeDetails="closeDetails()" />
		<ViewQRCode :showQR="showQR" @closeQR="closeQR()" :value="getQRValue" />
		<EditTeacher
			:editTeacher="editTeacher"
			@closeDialog="closeDialog()"
			:teacher="teacher"
		/>

		<DeleteTeacher
			:deleteTeacher="deleteTeacher"
			@closeDeleteDialog="closeDeleteDialog()"
			:teacher="teacher"
		/>

		<PrintCard
			:printCard="printCard"
			:teacherDetails="teacher"
			@closePrintCard="closePrintCard"
		/>
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
				teacher: {
					first_name: "Juan",
					last_name: "Dela Cruz",
					gender: "Male",
					code: "codecode",
					username: "iamjuan123",
					password: "123123",
				},
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
			};
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
			closeDeleteDialog() {
				this.deleteTeacher = false;
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
