<template>
	<div>
		<br />
		<div class="charts">
			<div class="statistic">
				<v-btn small>Per Type</v-btn>
				<div class="perType">
					<Pie :width="150" :height="150" :data="dataPerType" />
				</div>
			</div>
		</div>
		<br />
		<div class="charts">
			<div class="statistic">
				<v-btn small>Per Status</v-btn>
				<div class="perStatus">
					<Pie :width="150" :height="150" :data="dataPerStatus" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Pie from "../MainComponents/Pie.vue";
	export default {
		components: { Pie },
		data: () => ({
			dataPerType: {
				paper: 20,
				plastic_bottles: 40,
				cellophanes: 30,
				others: 10,
				bg_color: ["#007D48", "#407355", "#7AA51F", "#FDC00B"],
			},
			dataPerStatus: {
				segregated: 20,
				partially_segregated: 40,
				not_segregated: 40,
				bg_color: ["#41B883", "#d6ab33", "#94e0be"],
			},
			nloading: false,
			selectType: true,
		}),
	};
</script>

<style scoped>
	.charts {
		text-align: left;
		background-color: white;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 20px;
		padding: 20px 30px;
		text-align: center;
	}

	.miniNav {
		text-align: left;
	}

	.charts {
		min-height: 300px;
	}
</style>
