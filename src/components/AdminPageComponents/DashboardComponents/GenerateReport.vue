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
		<GenerateReportDialog
			:clickGenerateReport="clickGenerateReport"
			@cancelReport="cancelReport()"
		/>
	</div>
</template>

<script>
	import GenerateReportDialog from "../PopUpComponents/GenerateReportDialog.vue";
	export default {
		components: { GenerateReportDialog },
		data: () => ({
			clickGenerateReport: false,
		}),
		methods: {
			cancelReport() {
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
