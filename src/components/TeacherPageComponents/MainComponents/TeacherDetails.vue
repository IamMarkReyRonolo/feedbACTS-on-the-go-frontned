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
						<div class="label">Grade - Section</div>
						<div class="content">
							{{ teacher.grade_level }} - {{ teacher.section }}
						</div>
					</div>
					<div class="details">
						<div class="label">Username</div>
						<div class="content">{{ teacher.username }}</div>
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
							<Pie
								:width="150"
								:height="150"
								:data="dataPerType"
								v-if="teacher.activities.length != 0"
							/>
							<div class="empty" v-if="teacher.activities.length == 0">
								<br />
								<img src="../../../assets/no statistics.png" alt="" />
								<h3>Statistics not available</h3>
							</div>
						</div>
						<div class="perStatus" v-if="!selectType && !nloading">
							<Pie
								:width="150"
								:height="150"
								:data="dataPerStatus"
								v-if="teacher.activities.length != 0"
							/>
							<div class="empty" v-if="teacher.activities.length == 0">
								<br />
								<img src="../../../assets/no statistics.png" alt="" />
								<h3>Statistics not available</h3>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<ViewQRCode :showQR="showQR" @closeQR="closeQR()" :value="getQRValue" />
		<PrintCard
			:printCard="printCard"
			@closePrintCard="closePrintCard"
			:teacherDetails="teacher"
		/>
	</div>
</template>

<script>
	import ViewQRCode from "../PopUpComponents/ViewQRCode.vue";
	import PrintCard from "../PopUpComponents/PrintCard.vue";
	import Pie from "./Pie.vue";
	export default {
		components: {
			ViewQRCode,
			Pie,
			PrintCard,
		},
		props: {
			teacherData: Object,
		},
		data() {
			return {
				teacher: {},
				moreDetails: false,
				showQR: false,
				printCard: false,
				nloading: false,
				selectType: true,
			};
		},

		created() {
			this.teacher = Object.assign({}, this.teacherData);
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

			dataPerType: function () {
				let paper = 0;
				let plastic_bottles = 0;
				let cellophanes = 0;
				let others = 0;

				this.teacher.activities.forEach((activity) => {
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

				let data = {
					paper: ((paper / total) * 100).toFixed(2),
					plastic_bottles: ((plastic_bottles / total) * 100).toFixed(2),
					cellophanes: ((cellophanes / total) * 100).toFixed(2),
					others: ((others / total) * 100).toFixed(2),
					bg_color: ["#007D48", "#407355", "#7AA51F", "#FDC00B"],
				};

				return data;
			},

			dataPerStatus: function () {
				let segregated = 0;
				let partly_segregated = 0;
				let not_segregated = 0;

				this.teacher.activities.forEach((activity) => {
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

				let data = {
					segregated: ((segregated / total) * 100).toFixed(2),
					partially_segregated: ((partly_segregated / total) * 100).toFixed(2),
					not_segregated: ((not_segregated / total) * 100).toFixed(2),
					bg_color: ["#41B883", "#d6ab33", "#94e0be"],
				};

				return data;
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
	.empty {
		margin: 20px 0px;
	}

	.empty h3 {
		color: #007d48;
		padding: 20px;
	}

	.empty img {
		width: 200px;
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
