<template>
	<div class="mobileView">
		<div class="navs">
			<div class="categories">
				<div class="cat">
					<v-btn
						rounded
						:text="!clickedAll"
						:dark="!clickedAll"
						@click="selectCategory('all')"
						small
					>
						Activities
					</v-btn>
				</div>
				<div class="cat">
					<v-btn
						rounded
						:text="!clickedPlastic"
						:dark="!clickedPlastic"
						@click="selectCategory('plastic')"
						small
					>
						Statistics
					</v-btn>
				</div>
				<div class="cat">
					<v-btn
						rounded
						:text="!clickedPaper"
						:dark="!clickedPaper"
						@click="selectCategory('paper')"
						small
					>
						Profile
					</v-btn>
				</div>

				<!-- <div class="cat">
						<v-btn
							rounded
							:text="!clickedOthers"
							:dark="!clickedOthers"
							@click="selectCategory('others')"
						>
							Others
						</v-btn>
					</div> -->
			</div>
		</div>

		<div class="view">
			<Profile v-if="clickedPaper" />
			<Statistics v-if="clickedPlastic" />
			<ActivityHistory v-if="clickedAll" />
		</div>
	</div>
</template>

<script>
	import ActivityHistory from "./ActivityHistory.vue";
	import Statistics from "./Statistics.vue";
	import Profile from "./Profile.vue";
	export default {
		components: { ActivityHistory, Statistics, Profile },
		data: () => ({
			moreDetails: false,
			clickedAll: true,
			clickedPlastic: false,
			clickedPaper: false,
		}),
		methods: {
			selectCategory(category) {
				if (category == "all") {
					this.clickedAll = true;
					this.clickedPlastic = false;
					this.clickedPaper = false;
					this.clickedCellophanes = false;
					this.clickedOthers = false;
				} else if (category == "plastic") {
					this.clickedAll = false;
					this.clickedPlastic = true;
					this.clickedPaper = false;
					this.clickedCellophanes = false;
					this.clickedOthers = false;
				} else if (category == "paper") {
					this.clickedAll = false;
					this.clickedPlastic = false;
					this.clickedPaper = true;
					this.clickedCellophanes = false;
					this.clickedOthers = false;
				} else if (category == "cellophanes") {
					this.clickedAll = false;
					this.clickedPlastic = false;
					this.clickedPaper = false;
					this.clickedCellophanes = true;
					this.clickedOthers = false;
				} else {
					this.clickedAll = false;
					this.clickedPlastic = false;
					this.clickedPaper = false;
					this.clickedCellophanes = false;
					this.clickedOthers = true;
				}
			},
		},
	};
</script>

<style scoped>
	@media only screen and (max-width: 765px) {
		.navs {
			background-color: #5aa67a;
			margin-top: -30px;
			padding: 0px 20px;
			padding-bottom: 10px;
		}
		.categories {
			display: flex;
			overflow-x: auto;
			justify-content: flex-start;
			padding: 10px 0px;
		}

		.cat {
			margin-right: 2px;
		}

		.view {
			padding: 0px 10px;
		}
	}
</style>
