<template>
	<div class="historyPage">
		<div class="desktopView">
			<h2>Report History</h2>
			<div class="reportHistoryTable">
				<div class="header">
					<v-btn text color="#5AA67A" small
						><v-icon>mdi-calendar</v-icon><span>Date Created</span></v-btn
					>
					<v-btn text color="#5AA67A" small
						><v-icon>mdi-android-messages</v-icon
						><span>Report Title</span></v-btn
					>
				</div>

				<div class="report" v-for="n in 10" :key="n">
					<div class="left">
						<div class="dateCreated">03/25/2022</div>
						<div class="reportTitle">Montly Report</div>
					</div>

					<div class="right">
						<v-btn rounded small color="#5AA67A" text>View</v-btn>
						<v-btn rounded small color="#5AA67A" dark>Download</v-btn>
					</div>
				</div>
			</div>
		</div>
		<div class="mobileView"><DashboardMobile /></div>
	</div>
</template>

<script>
	import DashboardMobile from "../ScreenView/DashboardMobile.vue";
	export default {
		components: { DashboardMobile },
		data() {
			return {};
		},
	};
</script>

<style scoped>
	.historyPage {
		text-align: left;
		padding: 20px 40px;
	}
	.mobileView {
		display: none;
	}

	h2 {
		color: #064635;
	}

	.reportHistoryTable {
		margin: 20px 0px;
		padding: 10px 50px;
	}

	/* .header,
	.report {
		border: 1px solid black;
	} */

	.header,
	.report {
		display: flex;
		align-items: center;
	}

	.report {
		justify-content: space-between;
		align-items: center;
	}

	.report {
		margin: 4px 0px;
		padding: 0px 20px;
		background-color: white;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 10px;
	}

	:hover.report {
		background-color: #aee6c650;
		transition: 0.2s ease;
	}

	.left {
		display: flex;
	}

	.left div {
		width: 200px;
		color: #5aa67a;
		font-weight: 500;
		padding: 20px 0px;
	}

	.report .v-btn {
		margin: 0px 5px;
	}

	.header .v-btn {
		width: 200px;
		justify-content: flex-start;
		display: flex;
		align-items: center;
	}

	@media only screen and (max-width: 1100px) {
		.historyPage {
			text-align: left;
			padding: 20px;
		}

		.reportHistoryTable {
			margin: 10px 0px;
			padding: 10px 10px;
		}
	}

	@media only screen and (max-width: 700px) {
		.desktopView {
			display: none;
		}

		.mobileView {
			display: block;
		}
	}
</style>
