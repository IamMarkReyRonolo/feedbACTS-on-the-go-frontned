<template>
	<div class="desktopView">
		<div class="upperView">
			<div class="titleCon">
				<h2>Dashboard</h2>
			</div>
			<v-btn color="#064635" dark @click="clickBuzzer = true"
				><v-icon dark> mdi-gesture-double-tap </v-icon>Buzzer</v-btn
			>
		</div>
		<div class="mainView">
			<v-row no-gutters>
				<v-col cols="12" lg="8">
					<div class="leftCon">
						<TableData :data="data" />
					</div>
				</v-col>
				<v-col cols="12" lg="4">
					<div class="rightCon">
						<SummaryStatistic :data="data" :buzzer_count="buzzer_count" />
						<GenerateReport />
					</div>
				</v-col>
			</v-row>
		</div>

		<BuzzerConfirmation
			:clickBuzzer="clickBuzzer"
			@closeBuzzer="closeBuzzer($event)"
		/>

		<v-snackbar v-model="snackbar" :timeout="timeout">
			{{ message }}

			<template v-slot:action="{ attrs }">
				<v-btn color="#5aa67a" text v-bind="attrs" @click="snackbar = false">
					Close
				</v-btn>
			</template>
		</v-snackbar>
	</div>
</template>

<script>
	import BuzzerConfirmation from "../PopUpComponents/BuzzerConfirmation.vue";
	import TableData from "../DashboardComponents/TableData.vue";
	import SummaryStatistic from "../DashboardComponents/SummaryStatistic.vue";
	import GenerateReport from "../DashboardComponents/GenerateReport.vue";

	export default {
		props: {
			data: Array,
			buzzer_count: Number,
		},
		components: {
			BuzzerConfirmation,
			TableData,
			SummaryStatistic,
			GenerateReport,
		},
		data: () => ({
			clickBuzzer: false,
			snackbar: false,
			message: "",
			timeout: 2000,
		}),
		methods: {
			closeBuzzer(result) {
				if (result == "success") {
					this.snackbar = true;
					this.message = "Successfully sounded buzzer";
				}

				if (result == "failed") {
					this.snackbar = true;
					this.message = "Failed to sound buzzer";
				}
				this.clickBuzzer = false;
			},
			confirmBuzzer() {
				this.clickBuzzer = false;
			},
		},
	};
</script>

<style scoped>
	.desktopView {
		padding: 20px 0px;
	}

	.upperView {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.titleCon {
		color: #064635;
	}

	.mainView {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 500px;
		margin: 20px 0px;
	}

	.leftCon {
		padding-right: 10px;
	}
	.rightCon {
		padding-left: 10px;
		min-height: 500px;
	}

	@media only screen and (max-width: 1260px) {
		.desktopView {
			padding: 20px 0px;
		}

		.leftCon {
			padding-right: 0px;
		}
		.rightCon {
			padding-left: 0px;
			padding: 20px 0px;
			min-height: 320px;
		}
	}
</style>
