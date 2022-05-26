<template>
	<div class="headerCon">
		<div class="desktopView">
			<div class="upmostCon">
				<div class="nameCon">
					<v-icon dark size="30px">mdi-account-circle</v-icon>
				</div>

				{{ currentTime }}
				<div class="upperDateTime">
					<div class="time">{{ time }}</div>
					<div class="date">{{ currentDate }}</div>
				</div>
				<div class="btns">
					<v-btn fab dark color="#064635" @click="clickBuzzer = true" x-small>
						<v-icon dark size="20px"> mdi-bell </v-icon>
					</v-btn>
					<v-btn text dark @click="clickSettings = true"
						><span>Settings</span>
					</v-btn>
				</div>
			</div>
			<div class="navCon">
				<div class="leftCon">
					<div class="logoCon1">
						<img src="../../assets/recycling.png" alt="" />
					</div>
					<div class="mainNavs">
						<div class="appTitle">
							<h1>FeedbACTS on the GO</h1>
							<div class="subtitle">
								Feedbacks and Concurrent Tracking System on Garbage Orderliness.
							</div>
						</div>
						{{ getName }}
						<div class="navs">
							<!-- <div class="nav">
								<v-btn
									:text="!clickedTeachers"
									:dark="!clickedTeachers"
									@click="navigate('profile')"
									>Profile</v-btn
								>
							</div> -->
							<div class="nav">
								<v-btn
									:text="!clickedDashboard"
									:dark="!clickedDashboard"
									@click="navigate('recent')"
									>Dashboard</v-btn
								>
							</div>
							<!-- <div class="nav">
								<v-btn
									:text="!clickedHistory"
									:dark="!clickedHistory"
									@click="navigate('notifications')"
									>Notifications</v-btn
								>
							</div> -->
						</div>
					</div>
				</div>
				<div class="dateTimeCon">
					<div class="logoCon2">
						<img src="../../assets/schedule.png" alt="" />
					</div>
					<div class="actualDateTime">
						<div class="timeCon">
							<h1>{{ time }}</h1>
						</div>
						<div class="dateCon">{{ currentDate }}</div>
					</div>
				</div>
			</div>
		</div>

		<BuzzerConfirmation
			:clickBuzzer="clickBuzzer"
			@closeNotification="closeBuzzer($event)"
			@confirmBuzzer="confirmBuzzer()"
		/>

		<SettingsDialog
			:clickSettings="clickSettings"
			@closeSettings="closeSettings()"
			@changePassword="changePassword()"
		/>

		<ChangePasswordDialog
			:changePass="changePass"
			@closeDialog="closeDialog()"
		/>
	</div>
</template>

<script>
	import BuzzerConfirmation from "./PopUpComponents/BuzzerConfirmation.vue";
	import SettingsDialog from "./PopUpComponents/SettingsDialog.vue";
	import ChangePasswordDialog from "./PopUpComponents/ChangePasswordDialog.vue";
	export default {
		components: { BuzzerConfirmation, SettingsDialog, ChangePasswordDialog },
		data: () => ({
			clickSettings: false,
			changePass: false,
			clickBuzzer: false,
			clickedDashboard: true,
			clickedTeachers: false,
			clickedHistory: false,
			timerIsOn: false,
			time: "",
		}),

		methods: {
			closeBuzzer(event) {
				this.clickBuzzer = false;
			},
			confirmBuzzer() {
				this.clickBuzzer = false;
			},

			closeSettings() {
				this.clickSettings = false;
			},
			changePassword() {
				this.clickSettings = false;
				this.changePass = true;
			},

			closeDialog() {
				this.changePass = false;
			},

			navigate(routeName) {
				if (routeName == "recent") {
					this.clickedDashboard = true;
					this.clickedTeachers = false;
					this.clickedHistory = false;
					this.$router.push("/teacher/");
				} else if (routeName == "profile") {
					this.clickedDashboard = false;
					this.clickedTeachers = true;
					this.clickedHistory = false;
					this.$router.push("/teacher/profile");
				} else {
					this.clickedDashboard = false;
					this.clickedTeachers = false;
					this.clickedHistory = true;
					this.$router.push("/teacher/notifications");
				}
			},
		},

		created() {
			this.timerIsOn = true;
		},
		computed: {
			getName: function () {
				const routeN = this.$router.currentRoute.name;
				if (routeN == "dashboard") {
					this.clickedDashboard = true;
					this.clickedTeachers = false;
					this.clickedHistory = false;
				} else if (routeN == "teachers") {
					this.clickedDashboard = false;
					this.clickedTeachers = true;
					this.clickedHistory = false;
				} else if (routeN == "history") {
					this.clickedDashboard = false;
					this.clickedTeachers = false;
					this.clickedHistory = true;
				}
			},

			currentTime: function () {
				this.timerIsOn = true;
				if (this.timerIsOn) {
					setTimeout(() => {
						let date = new Date();
						let hh = date.getHours();
						let mm = date.getMinutes();
						let ss = date.getSeconds();
						let session = "AM";

						if (hh === 0) {
							hh = 12;
						}
						if (hh > 12) {
							hh = hh - 12;
							session = "PM";
						}

						hh = hh < 10 ? "0" + hh : hh;
						mm = mm < 10 ? "0" + mm : mm;
						ss = ss < 10 ? "0" + ss : ss;

						let time = hh + ":" + mm + ":" + ss + " " + session;

						this.time = time;
						this.timerIsOn = false;
					}, 1000);
				}
			},

			currentDate: function () {
				let today = new Date();
				today = today.toString().split(" ").splice(0, 4);
				return today[0] + " " + today[1] + " " + today[2] + " " + today[3];
			},
		},
	};
</script>

<style scoped>
	* {
		text-align: left;
	}

	/* desktop view */

	/* hide the mobile components - start  */
	.mobileView {
		display: none;
	}

	.upperDateTime {
		display: none;
	}
	/* hide mobile components - end */

	.headerCon {
		background-color: #5aa67a;
		color: white;
		min-height: 200px;
		padding: 10px 80px;
	}

	.upmostCon {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 0px;
	}

	.upmostCon p {
		margin: 0px;
		padding: 0px;
		font-weight: 500;
	}

	.nameCon {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.nameCon .v-icon {
		padding: 0px 10px;
	}

	/* navCon */

	.navCon {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.logoCon1 img {
		width: 100px;
	}
	.logoCon2 img {
		width: 80px;
	}

	.leftCon {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.mainNavs {
		align-items: left;
		padding: 0px 50px;
	}

	.appTitle {
		text-align: left;
		padding: 10px 0px;
		font-size: 12px;
	}

	.navs {
		display: flex;
		align-items: center;
	}

	.nav {
		margin-right: 5px;
	}

	.dateTimeCon {
		display: flex;
		justify-content: center;
	}

	.timeCon {
		width: 230px;
	}

	.actualDateTime {
		padding: 0px 20px;
	}

	@media only screen and (max-width: 1100px) {
		/* For mobile phones: */
		.headerCon {
			padding: 10px 20px;
		}

		.navCon {
			display: block;
		}

		.logoCon2 img {
			display: none;
		}

		.dateTimeCon {
			display: none;
		}

		.upperDateTime {
			display: flex;
			align-items: center;
		}

		.time {
			padding: 0px 10px;
		}
	}

	@media only screen and (max-width: 765px) {
		/* For mobile phones: */
		.headerCon {
			min-height: 0px;
		}
		.desktopView {
			display: none;
		}

		.mobileView {
			display: block;
		}

		.upmostPart {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.mLogoCon img {
			width: 50px;
		}

		.upmostPart p {
			margin: 0px;
			padding: 0px 10px;
			font-weight: 500;
		}

		.upperLeft {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.middlePart {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px 10px;
		}

		.middlePart h2 {
			font-size: 21px;
		}

		.middlePart p {
			margin: 0px;
			font-size: 15px;
		}

		.right {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
		}

		.right span {
			padding-top: 4px;
			font-size: 12px;
		}

		.lowerPart h2 {
			text-align: center;
		}

		.categories {
			display: flex;
			overflow-x: auto;
			justify-content: flex-start;
			padding: 10px 0px;
		}

		.cat {
			margin-right: 2px;
		}

		/* .middlePart h2,
		.middlePart p {
			font-size: 1rem;
		} */
	}
</style>
