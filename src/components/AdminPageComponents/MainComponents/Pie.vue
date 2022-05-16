<template>
	<div>
		<Pie
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

		<div class="trueLabels">
			<v-btn
				class="v-btn"
				dark
				x-small
				:color="colors[data]"
				v-for="(a, index, data) in getData"
				:key="index"
				style="margin: 5px"
			>
				{{ index }} - {{ a }}%
			</v-btn>
		</div>
	</div>
</template>

<script>
	import { Pie } from "vue-chartjs/legacy";

	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		ArcElement,
		CategoryScale,
	} from "chart.js";

	ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

	export default {
		name: "PieChart",
		components: {
			Pie,
		},
		props: {
			chartId: {
				type: String,
				default: "pie-chart",
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
			data: {
				type: Object,
			},
		},
		data() {
			return {
				chartData: {
					// labels: Object.keys(this.data).filter((key) => key != "bg_color"),
					datasets: [
						{
							backgroundColor: this.data.bg_color,
							data: Object.values(this.data).filter((key) => key != "bg_color"),
						},
					],
				},
				chartOptions: {
					responsive: true,
					maintainAspectRatio: false,
				},
				colors: this.data.bg_color,
			};
		},

		created() {
			console.log("yep");
		},

		computed: {
			getData: function () {
				const labels = Object.keys(this.data).filter(
					(key) => key != "bg_color"
				);
				const values = Object.values(this.data).filter(
					(key) => key != "bg_color"
				);

				let newData = {};
				labels.forEach((key, i) => (newData[key] = values[i]));
				return newData;
			},
		},
	};
</script>
