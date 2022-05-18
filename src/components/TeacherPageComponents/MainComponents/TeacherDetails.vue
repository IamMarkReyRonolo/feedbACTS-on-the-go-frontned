<template>
	<div class="teacherPageCon">
		<div class="mainCon">
			<div class="leftCon">
				<div class="teacherDetails">
					<div class="profileAvatar">
						<v-avatar size="120px" color="#007D48">
							<v-icon dark size="100px">mdi-account</v-icon></v-avatar
						>
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
				<div class="charts">
					<div class="statistic">
						<div class="miniNav">
							<v-btn
								x-small
								rounded
								color="#064635"
								dark
								:text="!selectType"
								@click="select('type')"
								>Per Type</v-btn
							>
							<v-btn
								x-small
								rounded
								color="#064635"
								dark
								:text="selectType"
								@click="select('status')"
								>Per Status</v-btn
							>
						</div>
						<div class="statLoad" v-if="nloading">
							<br />
							<v-progress-circular
								:width="3"
								color="green"
								indeterminate
							></v-progress-circular>
						</div>
						<div class="perType" v-if="selectType && !nloading">
							<Pie :width="150" :height="150" :data="dataPerType" />
						</div>
						<div class="perStatus" v-if="!selectType && !nloading">
							<Pie :width="150" :height="150" :data="dataPerStatus" />
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="mobileView"><DashboardMobile /></div>

		<MoreDetails :moreDetails="moreDetails" @closeDetails="closeDetails()" />
		<ViewQRCode :showQR="showQR" @closeQR="closeQR()" :value="getQRValue" />
		<PrintCard
			:printCard="printCard"
			@closePrintCard="closePrintCard"
			:teacherDetails="teacher"
		/>
	</div>
</template>

<script>
	import DashboardMobile from "../ScreenView/DashboardMobile.vue";
	import MoreDetails from "../PopUpComponents/MoreDetails.vue";
	import ViewQRCode from "../PopUpComponents/ViewQRCode.vue";
	import PrintCard from "../PopUpComponents/PrintCard.vue";
	import Pie from "./Pie.vue";
	export default {
		components: {
			DashboardMobile,
			MoreDetails,
			ViewQRCode,
			Pie,
			PrintCard,
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
				moreDetails: false,
				showQR: false,
				printCard: false,
				nloading: false,
				selectType: true,
			};
		},

		methods: {
			closeDetails() {
				this.moreDetails = false;
			},
			closeQR() {
				this.showQR = false;
			},
			closePrintCard() {
				this.printCard = false;
			},
			select(params) {
				this.nloading = true;
				if (params == "type") {
					setTimeout(() => {
						this.selectType = true;
						this.nloading = false;
					}, 500);
				} else {
					setTimeout(() => {
						this.selectType = false;
						this.nloading = false;
					}, 500);
				}
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

	.leftCon {
		width: 65%;
	}
	.rightCon {
		width: 33%;
	}
	.teacherPageCon {
		padding: 20px 0px;
	}

	.mainCon {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
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

	.charts {
		text-align: left;
		background-color: white;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 20px;
		padding: 20px 30px;
		text-align: center;
	}

	.miniNav {
		text-align: left;
	}

	.charts,
	.teacherDetails {
		min-height: 300px;
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
	}

	/* @media only screen and (max-width: 765px) {
		.mainCon {
			display: none;
		}

		.mobileView {
			display: block;
		}
	} */

	@media only screen and (max-width: 765px) {
		.teacherDetails,
		.name {
			display: block;
			text-align: center;
		}

		.details .label {
			font-size: 12px;
		}

		.details .content {
			font-size: 16px;
		}
	}
</style>
