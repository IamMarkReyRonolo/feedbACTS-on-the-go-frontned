<template>
	<div class="mobileView">
		<div class="activityTable">
			<div class="header">
				<v-btn class="dateColumn" small text color="#064635">Date</v-btn>
				<v-btn class="teacherColumn" small text color="#064635">Details</v-btn>
				<v-btn class="categoryColumn" small text color="#064635">Trash</v-btn>
			</div>
			<div class="activities">
				<v-btn
					class="activity"
					v-for="n in 20"
					:key="n"
					style="width: 100%; font-size: 10px"
					unselectable="on"
					onselectstart="return false;"
					onmousedown="return false;"
					large
					outlined
					@click="moreDetails = true"
				>
					<div class="dateColumn">03/25/22</div>
					<div class="teacherColumn">Deposit Plastuc</div>
					<div class="categoryColumn">Plastic</div>
				</v-btn>
			</div>
			<div class="addBtn">
				<v-btn color="success" fab large dark @click="recordActivity">
					<v-icon>mdi-qrcode</v-icon>
				</v-btn>
			</div>
		</div>

		<MoreDetails :moreDetails="moreDetails" @closeDetails="closeDetails()" />
	</div>
</template>

<script>
	import MoreDetails from "../PopUpComponents/MoreDetails.vue";
	export default {
		components: { MoreDetails },
		data: () => ({ moreDetails: false }),
		methods: {
			recordActivity() {
				this.$router.push("/teacher-details");
			},
			closeDetails() {
				this.moreDetails = false;
			},
		},
	};
</script>

<style scoped>
	@media only screen and (max-width: 700px) {
		.activityTable .header,
		.activity {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.header {
			font-weight: bold;
			color: #064635;
		}

		.activityTable .header,
		.activities {
			padding: 10px 0px;
			/* border: 1px solid black; */
		}

		.header .dateColumn,
		.header .teacherColumn,
		.header .categoryColumn {
			font-weight: bolder;
		}

		.activities {
			height: 455px;
			overflow-y: auto;
		}

		.activityTable .header {
			padding: 0px 20px;
		}

		.activity {
			padding: 10px;
			border-radius: 10px;
			background-color: white;
			margin: 5px 0px;
			color: #65c18c;

			cursor: pointer;
			box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.11);
		}

		.activity .teacherColumn {
			font-weight: bolder;
		}

		.addBtn {
			position: fixed;
			right: 25px;
			bottom: 30px;
		}
	}
</style>
