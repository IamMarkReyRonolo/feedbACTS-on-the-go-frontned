<template>
	<v-dialog v-model="clickBuzzer" max-width="500" persistent>
		<v-card>
			<div class="notifCon">
				<v-btn
					fab
					x-small
					color="green darken-1"
					dark
					@click="$emit('closeNotification', false)"
					class="closeBtn"
				>
					<v-icon>mdi-close</v-icon>
				</v-btn>
				<v-card-title class="dialogTitle"> Notifications </v-card-title>
				<div class="notifs" v-if="notifications.length != 0">
					<div
						class="notif"
						v-for="(notif, index) in notifications"
						:key="index"
					>
						<v-btn
							x-large
							:outlined="notif.status != 'new'"
							color="#65c18c"
							v-if="notif.notification_type != 'buzzer'"
							:dark="notif.status == 'new'"
							@click="viewAndUpdate(notif)"
						>
							<v-icon size="40px">mdi-check-circle-outline</v-icon>
							<div class="notifDetails">
								<span style="font-size: 10px"
									>Your Trash Has Been Recorded</span
								>
								<h6>Congratulations</h6>
								<div class="dateDetails">{{ notif.date_created }}</div>
							</div>
						</v-btn>

						<v-btn
							x-large
							:outlined="notif.status != 'new'"
							color="#65c18c"
							:dark="notif.status == 'new'"
							v-if="notif.notification_type == 'buzzer'"
							@click="viewAndUpdate(notif)"
						>
							<v-icon size="40px">mdi-gesture-double-tap</v-icon>
							<div class="notifDetails">
								<span style="font-size: 10px">Buzzer Sounded</span>
								<h6>Participate</h6>
								<div class="dateDetails">{{ notif.date_created }}</div>
							</div>
						</v-btn>
					</div>
				</div>
				<div class="empty" v-if="notifications.length == 0">Empty</div>
			</div>
		</v-card>

		<NotificationSelect
			:data="data"
			:showNotif="showNotif"
			@closeNotif="closeNotif($event)"
		></NotificationSelect>
	</v-dialog>
</template>

<script>
	import NotificationSelect from "./NotificationSelect.vue";
	import notificationAPI from "../../../apis/notificationAPI";
	export default {
		props: {
			clickBuzzer: Boolean,
			notifications: Array,
		},
		components: { NotificationSelect },
		data() {
			return {
				loading: false,
				showNotif: false,
				data: {},
			};
		},

		methods: {
			viewAndUpdate(data) {
				this.data = data;
				this.showNotif = true;
			},

			async closeNotif(params) {
				try {
					this.showNotif = false;

					if (params != "old") {
						const result = await notificationAPI.prototype.updateNotif(
							this.data.id
						);

						this.data.status = "old";
					}
				} catch (error) {}
			},
		},
	};
</script>

<style scoped>
	.dialogTitle {
		color: #5aa67a;
		font-weight: bold;
	}

	.dialogContent {
		text-align: left;
	}

	.closeBtn {
		position: absolute;
		top: 10px;
		right: 10px;
	}

	.notifCon {
		height: 600px;
		background-color: white;
		padding-bottom: 10px;
	}

	.notifs {
		overflow-y: auto;
		margin: 10px 5px;
		height: 500px;
		padding: 0px 10px;
	}
	.notif .v-btn {
		width: 100%;
		display: flex;
		justify-content: left;
		align-items: center;
		margin: 3px 0px;
	}

	.notif .v-btn span {
		font-size: 12px;

		text-transform: capitalize;
	}

	.notif .v-btn h6 {
		font-size: 8px;
	}

	.notifDetails {
		padding: 0px 10px;
		text-align: left;
		width: 100%;
		margin-top: 5px;
	}

	.notifDetails span {
		font-size: 8px;
	}

	.notifDetails h6 {
		font-size: 8px;
		color: #fdc00b;
	}

	.dateDetails {
		font-size: 10px;
		text-align: right;
		padding-bottom: 5px;
		display: block;
		margin-top: -10px;
	}

	.left {
		display: flex;
		justify-content: left;
		align-items: center;
	}

	.empty {
		color: #5aa67a;
		font-size: 20px;
		font-weight: bold;
		padding: 20px;
	}

	/* @media only screen and (max-width: 500px) {
		.notif .v-btn {
			display: block;
		}
	} */
</style>
