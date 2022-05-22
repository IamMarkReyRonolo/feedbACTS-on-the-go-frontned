<template>
	<div class="generateReport">
		<div class="reportCon">
			<v-btn
				x-large
				color="#5AA67A"
				dark
				class="disposeBtn"
				outlined
				@click="clickGenerateReport = true"
			>
				Generate report</v-btn
			>
			<p>
				<v-icon small style="padding: 0px 5px">mdi-alert-circle-outline</v-icon
				>Generate report will show the summary report of the activities between
				the dates provided.
			</p>
		</div>

		<v-snackbar v-model="snackbar" :timeout="timeout">
			{{ message }}

			<template v-slot:action="{ attrs }">
				<v-btn color="#5aa67a" text v-bind="attrs" @click="snackbar = false">
					Close
				</v-btn>
			</template>
		</v-snackbar>
		<GenerateReportDialog
			:clickGenerateReport="clickGenerateReport"
			@closeReport="closeReport($event)"
		/>
	</div>
</template>

<script>
	import GenerateReportDialog from "../PopUpComponents/GenerateReportDialog.vue";
	export default {
		components: { GenerateReportDialog },
		data: () => ({
			clickGenerateReport: false,
			snackbar: false,
			message: "",
			timeout: 2000,
		}),
		methods: {
			closeReport(data) {
				if (data) {
					if (data == "Network Error") {
						this.message = data;
					} else {
						this.message = "Failed to generate report";
					}

					this.snackbar = true;
				}
				this.clickGenerateReport = false;
			},
		},
	};
</script>

<style scoped>
	.reportCon {
		background-color: white;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 20px;
		height: 140px;
		margin-top: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.reportCon p {
		padding: 10px;
		margin: 0px;
		font-size: 12px;
	}
</style>
