<template>
	<div class="headerCon">
		<div class="desktopView">
			<div class="upmostCon">
				<p>Administrator</p>
				<div class="upperDateTime">
					<div class="time">10:00 AM</div>
					<div class="date">Friday, March 30, 2022</div>
				</div>
				<v-btn text dark><span>Settings</span> </v-btn>
			</div>
			<div class="navCon">
				<div class="leftCon">
					<div class="logoCon1">
						<img src="../../assets/recycling.png" alt="" />
					</div>
					<div class="mainNavs">
						<div class="appTitle">
							<h1>E-Buzzer Trash Collection</h1>
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
						<div class="timeCon"><h1>10:00 AM</h1></div>
						<div class="dateCon">Friday, March 30, 2022</div>
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
					<p>E-Buzzer Trash Collection</p>
				</div>
				<div class="upperRight">
					<v-btn text small dark fab>
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
					<v-btn fab dark color="#064635">
						<v-icon dark size="40px"> mdi-gesture-double-tap </v-icon>
					</v-btn>
					<span>Buzzer</span>
				</div>
			</div>

			<div class="lowerPart">
				<h2>RECENT ACTIVITY</h2>
				<div class="categories">
					<div class="cat">
						<v-btn
							rounded
							small
							:text="!clickedAll"
							:dark="!clickedAll"
							@click="selectCategory('all')"
						>
							All
						</v-btn>
					</div>
					<div class="cat">
						<v-btn
							rounded
							small
							:text="!clickedPlastic"
							:dark="!clickedPlastic"
							@click="selectCategory('plastic')"
						>
							Plastic
						</v-btn>
					</div>
					<div class="cat">
						<v-btn
							rounded
							small
							:text="!clickedPaper"
							:dark="!clickedPaper"
							@click="selectCategory('paper')"
						>
							Paper
						</v-btn>
					</div>
					<div class="cat">
						<v-btn
							rounded
							small
							:text="!clickedCellophanes"
							:dark="!clickedCellophanes"
							@click="selectCategory('cellophanes')"
						>
							Cellophanes
						</v-btn>
					</div>
					<div class="cat">
						<v-btn
							rounded
							small
							:text="!clickedOthers"
							:dark="!clickedOthers"
							@click="selectCategory('others')"
						>
							Others
						</v-btn>
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
			clickedDashboard: true,
			clickedTeachers: false,
			clickedHistory: false,
			clickedAll: true,
			clickedPlastic: false,
			clickedPaper: false,
			clickedCellophanes: false,
			clickedOthers: false,
		}),
		methods: {
			navigate(routeName) {
				if (routeName == "dashboard") {
					this.clickedDashboard = true;
					this.clickedTeachers = false;
					this.clickedHistory = false;
					this.$router.push("/admin/");
				} else if (routeName == "teachers") {
					this.clickedDashboard = false;
					this.clickedTeachers = true;
					this.clickedHistory = false;
					this.$router.push("/admin/teachers");
				} else {
					this.clickedDashboard = false;
					this.clickedTeachers = false;
					this.clickedHistory = true;
					this.$router.push("/admin/history");
				}
			},
			selectCategory(category) {
				if (category == "all") {
					this.clickedAll = true;
					this.clickedPlastic = false;
					this.clickedPaper = false;
					this.clickedCellophanes = false;
					this.clickedOthers = false;
				} else if (category == "plastic") {
					this.clickedAll = false;
					this.clickedPlastic = true;
					this.clickedPaper = false;
					this.clickedCellophanes = false;
					this.clickedOthers = false;
				} else if (category == "paper") {
					this.clickedAll = false;
					this.clickedPlastic = false;
					this.clickedPaper = true;
					this.clickedCellophanes = false;
					this.clickedOthers = false;
				} else if (category == "cellophanes") {
					this.clickedAll = false;
					this.clickedPlastic = false;
					this.clickedPaper = false;
					this.clickedCellophanes = true;
					this.clickedOthers = false;
				} else {
					this.clickedAll = false;
					this.clickedPlastic = false;
					this.clickedPaper = false;
					this.clickedCellophanes = false;
					this.clickedOthers = true;
				}
			},
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

	@media only screen and (max-width: 700px) {
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
