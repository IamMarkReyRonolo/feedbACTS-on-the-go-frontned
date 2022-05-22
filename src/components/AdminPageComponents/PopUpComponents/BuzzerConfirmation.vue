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
					const result = await adminAPI.prototype.clickBuzzer();

					this.$emit("closeBuzzer", "success");
				} catch (error) {
					this.$emit("closeBuzzer", "error");
				}
				this.loading = false;
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
