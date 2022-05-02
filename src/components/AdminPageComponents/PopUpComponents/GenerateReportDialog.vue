<template>
	<v-dialog v-model="clickGenerateReport" max-width="320" persistent>
		<v-card>
			<v-card-title class="dialogTitle"> Generate Report </v-card-title>

			<div class="date">
				<div class="label">From</div>
				<input type="date" name="" id="" class="start" v-model="dates[0]" />
			</div>
			<div class="date">
				<div class="label">To</div>
				<input type="date" name="" id="" class="end" v-model="dates[1]" />
			</div>

			<v-card-actions>
				<v-spacer></v-spacer>

				<v-btn color="green darken-1" text @click="cancel"> Cancel </v-btn>

				<v-btn
					color="green darken-1"
					@click="generateReport"
					:dark="dates.length == 2"
					:disabled="dates.length != 2"
					:loading="loading"
				>
					Generate Report
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
	export default {
		props: {
			clickGenerateReport: Boolean,
		},
		data() {
			return {
				loading: false,
				dates: [],
			};
		},

		methods: {
			generateReport() {
				this.loading = true;
				setTimeout(() => {
					console.log(this.dates);
					this.dates = [];
					this.loading = false;
				}, 1000);
			},
			cancel() {
				this.dates = [];
				this.$emit("cancelReport");
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

	.date {
		text-align: left;
		margin: 10px 20px;
	}

	.date .label {
		color: #5aa67a;
		font-weight: bold;
		font-size: 14px;
	}

	.date .start,
	.date .end {
		border: 1px solid #5aa67a;
		padding: 10px 20px;
		width: 100%;
		font-size: 18px;
		border-radius: 10px;
	}
</style>
