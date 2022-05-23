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
				<div class="notifs">
					<div class="notif">
						<v-btn x-large outlined color="#65c18c">
							<v-icon size="40px">mdi-check-circle-outline</v-icon>
							<div class="notifDetails">
								<span style="font-size: 10px"
									>Your Trash Has Been Recorded</span
								>
								<h6>Congratulations</h6>
								<div class="dateDetails">03/21/22</div>
							</div>
						</v-btn>
					</div>

					<div class="notif">
						<v-btn x-large outlined color="#65c18c">
							<v-icon size="40px">mdi-gesture-double-tap</v-icon>
							<div class="notifDetails">
								<span style="font-size: 10px">Buzzer Sounded</span>
								<h6>Participate</h6>
								<div class="dateDetails">03/21/22</div>
							</div>
						</v-btn>
					</div>
				</div>
			</div>
		</v-card>
	</v-dialog>
</template>

<script>
	export default {
		props: {
			clickBuzzer: Boolean,
		},
		data() {
			return {
				loading: false,
			};
		},

		methods: {
			soundBuzzer() {
				this.loading = true;
				setTimeout(() => {
					this.loading = false;
					this.$emit("closeBuzzer", true);
				}, 1000);
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
		overflow-y: auto;
		padding-bottom: 10px;
	}

	.notif {
		margin: 5px 20px;
	}
	.notif .v-btn {
		width: 100%;
		display: flex;
		justify-content: left;
		align-items: center;
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
		color: #5aa67a;
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

	/* @media only screen and (max-width: 500px) {
		.notif .v-btn {
			display: block;
		}
	} */
</style>
