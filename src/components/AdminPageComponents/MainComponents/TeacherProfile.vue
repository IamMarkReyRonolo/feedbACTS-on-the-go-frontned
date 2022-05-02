<template>
	<div class="teacherPageCon">
		<div class="mainCon">
			<div class="leftCon">
				<div class="teacherDetails">
					<div class="profileAvatar">
						<v-avatar size="120px" color="#5AA67A">
							<v-icon dark size="100px">mdi-account</v-icon></v-avatar
						>
						<div class="functionBtns">
							<v-btn class="warning" x-small>Edit</v-btn>
							<v-btn class="error" x-small>Delete</v-btn>
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
							<v-btn small color="#5AA67A" dark>View QR Code</v-btn>
						</div>

						<div class="btn">
							<v-btn small>Print QR Code</v-btn>
						</div>
					</div>
				</div>
			</div>
			<div class="rightCon">
				<div class="historyTable">
					<h2>Activity History</h2>
					<div class="table">
						<div class="tableHeader">
							<div class="con">
								<v-btn text color="#5aa67a"
									><v-icon>mdi-calendar</v-icon><span>Date</span></v-btn
								>
							</div>
							<div class="con">
								<v-btn text color="#5aa67a"
									><v-icon>mdi-calendar-clock</v-icon><span>Time</span></v-btn
								>
							</div>
							<div class="con">
								<v-btn text color="#5aa67a"
									><v-icon>mdi-card-text</v-icon><span>Details</span></v-btn
								>
							</div>
							<div class="con">
								<v-btn text color="#5aa67a"
									><v-icon>mdi-trash-can</v-icon><span>Category</span></v-btn
								>
							</div>
						</div>
						<div class="tableList">
							<div class="activity" v-for="n in 20" :key="n">
								<v-btn text color="#5aa67a">
									<div class="con">
										<span>03/20/2022</span>
									</div>
									<div class="con">
										<span>10:30 AM</span>
									</div>
									<div class="con">
										<span>Disposed Plastic</span>
									</div>
									<div class="con">
										<v-chip color="#5aa67a" dark small>
											<v-icon small>mdi-recycle</v-icon>Plastic</v-chip
										>
									</div>
								</v-btn>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="mobileView"><DashboardMobile /></div>
	</div>
</template>

<script>
	import DashboardMobile from "../ScreenView/DashboardMobile.vue";
	export default {
		components: { DashboardMobile },
		data() {
			return {
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
			};
		},
	};
</script>

<style scoped>
	.mobileView {
		display: none;
	}
	.teacherPageCon {
		padding: 20px;
	}

	.mainCon {
		padding: 0px 30px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.leftCon {
		min-width: 300px;
	}

	.teacherDetails,
	.historyTable {
		text-align: left;
		background-color: white;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 20px;
		margin: 20px 0px;
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
		color: #5aa67a;
	}

	.btn {
		padding: 5px 0px;
	}

	.rightCon {
		width: 1000px;
	}

	.historyTable {
		height: 650px;
		margin: 20px;
		padding: 20px 40px;
	}

	.historyTable h2 {
		color: #5aa67a;
		padding: 10px 0px;
	}

	.tableHeader {
		display: flex;
		justify-content: space-around;
	}

	.tableList {
		overflow-y: auto;
		height: 500px;
	}

	.con {
		width: 100%;
		text-align: left;
	}

	.activity .v-btn {
		width: 100%;
		padding: 0px;
	}

	.activity .v-btn .con {
		padding-left: 15px;
	}

	/* .con .v-btn {
		width: 100%;
	} */

	@media only screen and (max-width: 1100px) {
		.mainCon {
			padding: 0px 0px;
		}

		.leftCon {
			min-width: 225px;
		}
	}

	@media only screen and (max-width: 700px) {
		.mainCon {
			display: none;
		}

		.mobileView {
			display: block;
		}
	}
</style>
