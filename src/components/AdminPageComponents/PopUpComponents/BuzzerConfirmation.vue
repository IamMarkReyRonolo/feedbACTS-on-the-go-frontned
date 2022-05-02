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

				<v-btn color="green darken-1" text @click="$emit('cancelBuzzer')">
					Cancel
				</v-btn>

				<v-btn color="green darken-1" @click="$emit('confirmBuzzer')" dark>
					Agree
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
	export default {
		props: {
			clickBuzzer: Boolean,
		},
		data() {
			return {};
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
