<template>
	<div>
		<br />
		<div v-if="teacher.activities.length != 0">
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

		<div class="empty" v-if="teacher.activities.length == 0">
			<br />
			<img src="../../../assets/no statistics.png" alt="" />
			<h5>No data to show. Participate in trash collection</h5>
		</div>
	</div>
</template>

<script>
	import Pie from "../MainComponents/Pie.vue";
	export default {
		components: { Pie },
		props: {
			teacher: Object,
		},
		data: () => ({}),

		computed: {
			dataPerType: function () {
				let paper = 0;
				let plastic_bottles = 0;
				let cellophanes = 0;
				let others = 0;

				this.teacher.activities.forEach((activity) => {
					if (activity.categories.includes("Paper")) {
						paper += 1;
					}
					if (activity.categories.includes("Plastic Bottles")) {
						plastic_bottles += 1;
					}
					if (activity.categories.includes("Cellophanes")) {
						cellophanes += 1;
					}
					if (activity.categories.includes("Others")) {
						others += 1;
					}
				});

				let total = paper + plastic_bottles + cellophanes + others;

				let data = {
					paper: ((paper / total) * 100).toFixed(2),
					plastic_bottles: ((plastic_bottles / total) * 100).toFixed(2),
					cellophanes: ((cellophanes / total) * 100).toFixed(2),
					others: ((others / total) * 100).toFixed(2),
					bg_color: ["#007D48", "#407355", "#7AA51F", "#FDC00B"],
				};

				return data;
			},

			dataPerStatus: function () {
				let segregated = 0;
				let partly_segregated = 0;
				let not_segregated = 0;

				this.teacher.activities.forEach((activity) => {
					if (activity.status == "Segregated") {
						segregated += 1;
					}
					if (activity.status == "Partly Segregated") {
						partly_segregated += 1;
					}
					if (activity.status == "Not Segregated") {
						not_segregated += 1;
					}
				});

				let total = segregated + not_segregated + partly_segregated;

				let data = {
					segregated: ((segregated / total) * 100).toFixed(2),
					partially_segregated: ((partly_segregated / total) * 100).toFixed(2),
					not_segregated: ((not_segregated / total) * 100).toFixed(2),
					bg_color: ["#41B883", "#d6ab33", "#94e0be"],
				};

				return data;
			},
		},
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

	.empty {
		margin: 20px 0px;
	}

	.empty h5 {
		color: #007d48;
		padding: 20px;
		font-size: 16px;
		font-weight: lighter;
	}

	.empty img {
		width: 200px;
	}
</style>
