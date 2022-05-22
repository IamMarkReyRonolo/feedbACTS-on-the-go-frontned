<template>
	<v-dialog v-model="deleteReport" max-width="320" persistent>
		<v-card>
			<v-card-title class="dialogTitle"> Delete Report? </v-card-title>

			<v-card-text class="dialogContent">
				This action cannot be undone. Do you want to delete this report?
			</v-card-text>

			<v-card-actions>
				<v-spacer></v-spacer>

				<v-btn color="green darken-1" text @click="$emit('closeDeleteDialog')">
					Cancel
				</v-btn>

				<v-btn color="error" @click="deleteT" dark :loading="loading">
					Delete
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
	import reportAPI from "../../../apis/reportAPI";
	export default {
		props: {
			deleteReport: Boolean,
			id: Number,
		},
		data() {
			return {
				loading: false,
			};
		},

		methods: {
			async deleteT() {
				try {
					this.loading = true;
					const deleted = await reportAPI.prototype.deleteSpecificReport(
						this.id
					);
					this.$emit("closeDeleteDialog", this.id);
					this.loading = false;
				} catch (error) {
					if (error.message == "Network Error") {
						this.$emit("closeDeleteDialog", error.message);
					} else {
						this.$emit("closeDeleteDialog", "Failed to delete report.");
					}

					this.loading = false;
				}
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
		text-align: justify;
	}
</style>
