<template>
	<Bar
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
	import { Bar } from "vue-chartjs/legacy";
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		BarElement,
		CategoryScale,
		LinearScale,
	} from "chart.js";

	ChartJS.register(
		Title,
		Tooltip,
		Legend,
		BarElement,
		CategoryScale,
		LinearScale
	);

	export default {
		name: "BarChart",
		components: { Bar },
		props: {
			chartId: {
				type: String,
				default: "bar-chart",
			},
			datasetIdKey: {
				type: String,
				default: "label",
			},
			data: Object,
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
				type: Object,
				default: () => {},
			},
		},
		data() {
			return {
				chartData: {
					labels: this.data.labels,
					datasets: [
						{
							label: "Total Trash Contributions",
							backgroundColor: "#5aa67a",
							data: this.data.data,
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
