<template>
	<div class="summaryStatistic">
		{{ getTrashData }}
		{{ getConsistencyData }}
		<div class="miniNav">
			<v-btn
				x-small
				rounded
				color="#064635"
				dark
				:text="!selectContributors"
				@click="selectContributors = true"
				>Consistent Contributors</v-btn
			>
			<v-btn
				x-small
				rounded
				color="#064635"
				dark
				:text="selectContributors"
				@click="selectContributors = false"
				>Trash Statistic</v-btn
			>
		</div>

		<div class="contributors" v-if="selectContributors">
			<div class="fetched" v-if="data.length != 0">
				<div class="headerTitle">
					<div class="name">
						<v-btn text small color="#064635">Name</v-btn>
					</div>

					<div class="consistency">
						<v-btn text small color="#064635"
							><span style="font-size: 9px" class="level">
								Consistency Level</span
							></v-btn
						>
					</div>
				</div>
				<div class="list">
					<div class="contributor" v-for="n in consistencies" :key="n.id">
						<v-btn
							class="hoverable"
							large
							:to="'/admin/teachers/profile/' + n.id"
						>
							<div class="name">
								<v-icon small>mdi-account-circle</v-icon
								><span style="font-size: 12px"
									>{{ n.first_name }} {{ n.last_name }}</span
								>
							</div>

							<div class="consistency">
								<v-progress-linear
									color="#064635"
									height="15"
									rounded
									:value="n.consistency"
									style="width: 80%"
								>
									<span style="color: white; font-size: 10px"
										>{{ n.consistency }} %</span
									></v-progress-linear
								>
							</div>
						</v-btn>
					</div>
				</div>
			</div>

			<div class="empty" v-if="data.length == 0">
				<img src="../../../assets/no teachers.png" alt="" />
				<h3>No Teachers Yet</h3>
			</div>
		</div>
		<div class="statistic" v-if="!selectContributors">
			<div class="miniNav">
				<v-btn
					x-small
					rounded
					color="#064635"
					dark
					:text="!selectType"
					@click="select('type')"
					>Per Type</v-btn
				>
				<v-btn
					x-small
					rounded
					color="#064635"
					dark
					:text="selectType"
					@click="select('status')"
					>Per Status</v-btn
				>
			</div>
			<div class="statLoad" v-if="nloading">
				<br />
				<v-progress-circular
					:width="3"
					color="green"
					indeterminate
				></v-progress-circular>
			</div>
			<div class="perType" v-if="selectType && !nloading">
				<Pie
					:width="250"
					:height="250"
					:data="dataPerType"
					v-if="activities.length != 0"
				/>

				<div class="empty" v-if="activities.length == 0">
					<br />
					<img src="../../../assets/no statistics.png" alt="" />
					<h3>Statistics not available</h3>
				</div>
			</div>
			<div class="perStatus" v-if="!selectType && !nloading">
				<Pie
					:width="250"
					:height="250"
					:data="dataPerStatus"
					v-if="activities.length != 0"
				/>

				<div class="empty" v-if="activities.length == 0">
					<br />
					<img src="../../../assets/no statistics.png" alt="" />
					<h3>Statistics not available</h3>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Pie from "../MainComponents/Pie.vue";
	export default {
		props: {
			data: Array,
			buzzer_count: Number,
		},
		components: {
			Pie,
		},
		data: () => ({
			selectContributors: true,
			selectType: true,
			progress: 80,
			nloading: false,
			activities: [],
			consistencies: [],
		}),

		methods: {
			select(params) {
				this.nloading = true;
				if (params == "type") {
					setTimeout(() => {
						this.selectType = true;
						this.nloading = false;
					}, 500);
				} else {
					setTimeout(() => {
						this.selectType = false;
						this.nloading = false;
					}, 500);
				}
			},

			getConsistency(length) {
				return ((length / this.buzzer_count) * 100).toFixed(2);
			},
		},

		computed: {
			getTrashData: function () {
				this.data.forEach((d) => {
					d.activities.forEach((activity) => {
						activity.teacher = d.first_name + " " + d.last_name;
						this.activities.push(activity);
					});
				});
			},

			getConsistencyData: function () {
				this.data.forEach((d) => {
					d.consistency = this.getConsistency(d.activities.length);
					this.consistencies.push(d);
				});

				this.consistencies.sort((a, b) => {
					return b.consistency - a.consistency;
				});
			},

			dataPerType: function () {
				let paper = 0;
				let plastic_bottles = 0;
				let cellophanes = 0;
				let others = 0;

				this.activities.forEach((activity) => {
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

				this.activities.forEach((activity) => {
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
	.summaryStatistic {
		background-color: white;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 20px;
		padding: 20px;
	}

	.miniNav {
		text-align: left;
	}

	.contributors,
	.statistic {
		padding: 20px 0px;
		height: 370px;
	}

	.list {
		height: 320px;
		overflow-y: auto;
	}

	.headerTitle,
	.contributor {
		display: flex;
	}

	.headerTitle .v-btn {
		width: 100%;
		display: flex;
		justify-content: flex-start;
	}

	.contributor .v-btn {
		width: 100%;
		display: flex;
		justify-content: flex-start;
	}

	.hoverable {
		color: #5aa67a;
		margin: 1px 0px;
	}

	.name {
		width: 65%;
		text-align: left;
	}

	.consistency {
		width: 35%;
	}

	.consistency .v-progress-linear {
		margin-left: auto;
	}

	span {
		padding-left: 20px;
	}

	.level {
		padding: 0px;
	}

	.name span :hover.hoverable {
		background-color: #5aa67a;
		transition: 0.3s ease;
		color: white;
	}

	/*  */

	.perStatus,
	.perType {
		padding: 10px;
	}

	.empty {
		margin: 20px 0px;
	}

	.empty h3 {
		color: #007d48;
		padding: 20px;
	}

	.empty img {
		width: 200px;
	}
</style>
