<template>
	<v-dialog v-model="clickBuzzer" max-width="320" persistent>
		<v-card>
			<v-card-title class="dialogTitle"> Sound the buzzer? </v-card-title>

			<v-card-text class="dialogContent">
				Sounding the buzzer means notifying all teachers that trash collection
				is on the way. Do you want to proceed?
			</v-card-text>

			<v-card-actions>
				<v-spacer></v-spacer>

				<v-btn color="green darken-1" text @click="$emit('closeBuzzer', false)">
					Cancel
				</v-btn>

				<v-btn
					color="green darken-1"
					@click="soundBuzzer"
					dark
					:loading="loading"
				>
					Agree
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
	import adminAPI from "../../../apis/adminAPI";
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
			async soundBuzzer() {
				this.loading = true;
				try {
					let sw = await navigator.serviceWorker.ready;
					let push = await sw.pushManager.subscribe({
						userVisibleOnly: true,
						applicationServerKey:
							"BNZlVfipnCvx2AZD-_Nxht5xnqfzh2DUsP0Vic6hjF88i-S-CwBXWN8F9IoVEWyFHJuwOvDm0TIB4kXKzSg1RAk",
					});

					const payload = {
						push_subscription: push,
						notif: {
							notification_type: "buzzer",
							message:
								"Calling all teachers for trash collection. If you have any trash to deposit please proceed to the designated area along with your FeedbACTS Card.",
							date_created: this.getDate(),
							teacher_id: "all",
						},
					};

					const result = await adminAPI.prototype.clickBuzzer(payload);

					this.$emit("closeBuzzer", "success");
				} catch (error) {
					this.$emit("closeBuzzer", "error");
				}
				this.loading = false;
			},

			getDate() {
				let today = new Date();
				const dd = String(today.getDate()).padStart(2, "0");
				const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
				const yyyy = today.getFullYear();

				today = mm + "/" + dd + "/" + yyyy;
				return today;
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
</style>
