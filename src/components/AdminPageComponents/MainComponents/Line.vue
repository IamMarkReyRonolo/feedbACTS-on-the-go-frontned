<template>
	<LineChartGenerator
		:chart-options="chartOptions"
		:chart-data="chartData"
		:chart-id="chartId"
		:dataset-id-key="datasetIdKey"
		:plugins="plugins"
		:css-classes="cssClasses"
		:styles="styles"
		:width="width"
		:height="height"
	/>
</template>

<script>
	import { Line as LineChartGenerator } from "vue-chartjs/legacy";

	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		CategoryScale,
		PointElement,
	} from "chart.js";

	ChartJS.register(
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		CategoryScale,
		PointElement
	);

	export default {
		name: "LineChart",
		components: {
			LineChartGenerator,
		},
		props: {
			chartId: {
				type: String,
				default: "line-chart",
			},
			datasetIdKey: {
				type: String,
				default: "label",
			},
			width: {
				type: Number,
			},
			height: {
				type: Number,
			},
			cssClasses: {
				default: "",
				type: String,
			},
			styles: {
				type: Object,
				default: () => {},
			},
			plugins: {
				type: Array,
				default: () => [],
			},
		},
		data() {
			return {
				chartData: {
					labels: [
						"January",
						"February",
						"March",
						"April",
						"May",
						"June",
						"July",
						"January",
						"February",
						"March",
						"April",
						"May",
					],
					datasets: [
						{
							label: "Teachers' Contribution Consistency",
							backgroundColor: "#5aa67a",
							data: [40, 39, 10, 100, 39, 80, 40, 40, 39, 10, 40, 39],
						},
					],
				},
				chartOptions: {
					responsive: true,
					maintainAspectRatio: false,
				},
			};
		},
	};
</script>

<style scoped></style>
