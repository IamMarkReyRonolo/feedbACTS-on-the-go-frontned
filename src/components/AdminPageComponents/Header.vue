<template>
	<div class="headerCon">
		<div class="desktopView">
			<div class="upmostCon">
				<p>Administrator</p>
				{{ currentTime }}
				<div class="upperDateTime">
					<div class="time">{{ time }}</div>
					<div class="date">{{ currentDate }}</div>
				</div>
				<v-btn text dark @click="clickSettings = true"
					><span>Settings</span>
				</v-btn>
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
							<div class="nav">
								<v-btn
									:text="!clickedDashboard"
									:dark="!clickedDashboard"
									@click="navigate('dashboard')"
									>Dashboard</v-btn
								>
							</div>
							<div class="nav">
								<v-btn
									:text="!clickedTeachers"
									:dark="!clickedTeachers"
									@click="navigate('teachers')"
									>Teachers</v-btn
								>
							</div>
							<div class="nav">
								<v-btn
									:text="!clickedHistory"
									:dark="!clickedHistory"
									@click="navigate('history')"
									>Report History</v-btn
								>
							</div>
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
		<div class="mobileView">
			<div class="upmostPart">
				<div class="upperLeft">
					<div class="mLogoCon">
						<img src="../../assets/recycling.png" alt="" />
					</div>
					<p>FeedbACTS on the GO</p>
				</div>
				<div class="upperRight">
					<v-btn text small dark fab @click="clickSettings = true">
						<v-icon> mdi-cog </v-icon>
					</v-btn>
				</div>
			</div>

			<div class="middlePart">
				<div class="left">
					<h2>ADMINISTRATOR</h2>
					<p>Sacub National High School</p>
				</div>

				<div class="right">
					<v-btn fab dark color="#064635" @click="clickBuzzer = true">
						<v-icon dark size="40px"> mdi-gesture-double-tap </v-icon>
					</v-btn>
					<span>Buzzer</span>
				</div>
			</div>

			<div class="lowerPart">
				<h2>Activity History</h2>
			</div>
		</div>

		<SettingsDialog
			:clickSettings="clickSettings"
			@closeSettings="closeSettings()"
			@changePassword="changePassword()"
		/>

		<ChangePasswordDialog
			:changePass="changePass"
			@closeDialog="closeDialog()"
		/>

		<BuzzerConfirmation
			:clickBuzzer="clickBuzzer"
			@closeBuzzer="closeBuzzer($event)"
		/>

		<v-snackbar v-model="snackbar" :timeout="timeout">
			{{ message }}

			<template v-slot:action="{ attrs }">
				<v-btn color="#5aa67a" text v-bind="attrs" @click="snackbar = false">
					Close
				</v-btn>
			</template>
		</v-snackbar>
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
			clickedAll: true,
			clickedSegregated: false,
			clickedPartlySeg: false,
			clickedCellophanes: false,
			clickedNotSeg: false,
			timerIsOn: false,
			time: "",
			snackbar: false,
			message: "",
			timeout: 3000,
		}),

		methods: {
			closeBuzzer(result) {
				if (result == "success") {
					this.snackbar = true;
					this.message = "Successfully sounded buzzer";
				}

				if (result == "failed") {
					this.snackbar = true;
					this.message = "Failed to sound buzzer";
				}
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
				if (routeName == "dashboard" && this.$route.name != "admin") {
					this.clickedDashboard = true;
					this.clickedTeachers = false;
					this.clickedHistory = false;
					this.$router.push("/admin/");
				} else if (routeName == "teachers" && this.$route.name != "teachers") {
					this.clickedDashboard = false;
					this.clickedTeachers = true;
					this.clickedHistory = false;
					this.$router.push("/admin/teachers");
				} else if (routeName == "history" && this.$route.name != "report") {
					this.clickedDashboard = false;
					this.clickedTeachers = false;
					this.clickedHistory = true;
					this.$router.push("/admin/history");
				}
			},
			selectCategory(category) {
				if (category == "all") {
					this.clickedAll = true;
					this.clickedSegregated = false;
					this.clickedPartlySeg = false;
					this.clickedCellophanes = false;
					this.clickedNotSeg = false;
				} else if (category == "segregated") {
					this.clickedAll = false;
					this.clickedSegregated = true;
					this.clickedPartlySeg = false;
					this.clickedCellophanes = false;
					this.clickedNotSeg = false;
				} else if (category == "partly") {
					this.clickedAll = false;
					this.clickedSegregated = false;
					this.clickedPartlySeg = true;
					this.clickedCellophanes = false;
					this.clickedNotSeg = false;
				} else if (category == "cellophanes") {
					this.clickedAll = false;
					this.clickedSegregated = false;
					this.clickedPartlySeg = false;
					this.clickedCellophanes = true;
					this.clickedNotSeg = false;
				} else {
					this.clickedAll = false;
					this.clickedSegregated = false;
					this.clickedPartlySeg = false;
					this.clickedCellophanes = false;
					this.clickedNotSeg = true;
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
						if (hh == 12) {
							session = "PM";
						} else if (hh > 12) {
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
			min-height: 220px;
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
