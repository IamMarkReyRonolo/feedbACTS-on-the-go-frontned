<template>
	<div class="mobileView">
		{{ getTeacherData }}
		<div class="headerPage">
			<div class="upmostPart">
				<div class="upperLeft">
					<div class="mLogoCon">
						<img src="../../../assets/recycling.png" alt="" />
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
					<h2>{{ teacherData.first_name }} {{ teacherData.last_name }}</h2>
					<p>Sacub National High School</p>
				</div>

				<div class="right">
					<v-btn fab dark color="#064635" @click="clickBuzzer = true">
						<v-icon dark size="40px" @click="clickNotifications = true">
							mdi-bell
						</v-icon>
					</v-btn>
					<span>Notifications</span>
				</div>
			</div>

			<div class="navs">
				<div class="categories">
					<div class="cat">
						<v-btn
							rounded
							:text="!clickedAll"
							:dark="!clickedAll"
							@click="selectCategory('all')"
							small
						>
							Activities
						</v-btn>
					</div>
					<div class="cat">
						<v-btn
							rounded
							:text="!clickedPlastic"
							:dark="!clickedPlastic"
							@click="selectCategory('plastic')"
							small
						>
							Statistics
						</v-btn>
					</div>
					<div class="cat">
						<v-btn
							rounded
							:text="!clickedPaper"
							:dark="!clickedPaper"
							@click="selectCategory('paper')"
							small
						>
							Profile
						</v-btn>
					</div>

					<!-- <div class="cat">
						<v-btn
							rounded
							:text="!clickedOthers"
							:dark="!clickedOthers"
							@click="selectCategory('others')"
						>
							Others
						</v-btn>
					</div> -->
				</div>
			</div>
		</div>

		<div class="view">
			<Profile v-if="clickedPaper" :teacher="teacherData" />
			<Statistics v-if="clickedPlastic" :teacher="teacherData" />
			<ActivityHistory v-if="clickedAll" :teacher="teacherData" />
		</div>

		<Notification
			:clickBuzzer="clickNotifications"
			@closeNotification="closeNotification"
		/>

		<SettingsDialog
			:clickSettings="clickSettings"
			@closeSettings="closeSettings"
			@changePassword="changePassword()"
		/>

		<ChangePasswordDialog
			:changePass="changePass"
			@closeDialog="closeDialog()"
		/>
	</div>
</template>

<script>
	import ActivityHistory from "./ActivityHistory.vue";
	import Statistics from "./Statistics.vue";
	import Profile from "./Profile.vue";
	import Notification from "../PopUpComponents/BuzzerConfirmation.vue";
	import ChangePasswordDialog from "../PopUpComponents/ChangePasswordDialog.vue";
	import SettingsDialog from "../PopUpComponents/SettingsDialog.vue";
	export default {
		components: {
			ActivityHistory,
			Statistics,
			Profile,
			Notification,
			SettingsDialog,
			ChangePasswordDialog,
		},
		props: {
			teacher: Object,
		},
		data: () => ({
			moreDetails: false,
			clickedAll: true,
			clickedPlastic: false,
			clickedPaper: false,
			teacherData: {},
			clickNotifications: false,
			clickSettings: false,
			changePass: false,
		}),
		methods: {
			changePassword() {
				this.clickSettings = false;
				this.changePass = true;
			},
			closeDialog() {
				this.changePass = false;
			},
			closeSettings() {
				this.clickSettings = false;
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
			closeNotification() {
				this.clickNotifications = false;
			},
		},
		computed: {
			getTeacherData: function () {
				this.teacherData = Object.assign({}, this.teacher);
			},
		},
	};
</script>

<style scoped>
	@media only screen and (max-width: 765px) {
		.headerPage {
			background-color: #5aa67a;
			margin-top: -30px;
			padding: 0px 20px;

			color: white;
		}
		.navs {
			background-color: #5aa67a;

			padding: 0px 10px;
			padding-bottom: 10px;
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

		.view {
			padding: 0px 10px;
		}
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
		text-align: left;
		padding: 0px 10px;
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
</style>
