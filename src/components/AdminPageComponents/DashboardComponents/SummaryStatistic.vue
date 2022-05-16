<template>
	<div class="summaryStatistic">
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
				<div class="contributor" v-for="n in 7" :key="n">
					<v-btn class="hoverable" large to="/admin/teachers/profile">
						<div class="name">
							<v-icon small>mdi-account-circle</v-icon
							><span style="font-size: 12px">Mark Rey Ronolo</span>
						</div>

						<div class="consistency">
							<v-progress-linear
								v-model="progress"
								color="#064635"
								height="15"
								rounded
								style="width: 80%"
							>
								<span style="color: white; font-size: 10px"
									>{{ progress }} %</span
								></v-progress-linear
							>
						</div>
					</v-btn>
				</div>
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
				<Pie :width="250" :height="250" :data="dataPerType" />
			</div>
			<div class="perStatus" v-if="!selectType && !nloading">
				<Pie :width="250" :height="250" :data="dataPerStatus" />
			</div>
		</div>
	</div>
</template>

<script>
	import Pie from "../MainComponents/Pie.vue";
	export default {
		components: {
			Pie,
		},
		data: () => ({
			selectContributors: true,
			selectType: true,
			progress: 80,
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
</style>
