<template>
	<div class="mobileView">
		<div class="activityTable">
			<div class="tableHeader">
				<div class="headerCon left">
					<v-btn text x-small color="#064635" class="leftCon" width="40%"
						>Date</v-btn
					>
					<v-btn text x-small color="#064635" class="leftCon" width="60%"
						>Teacher</v-btn
					>
				</div>
				<div class="headerCon right">
					<v-btn text x-small color="#064635" class="rightCon" width="100%"
						>Trash</v-btn
					>
				</div>
			</div>
			<div class="tableContents">
				<div
					class="content"
					v-for="n in 20"
					:key="n"
					@click="moreDetails = true"
				>
					<div class="left">
						<div class="details date">03/22/22</div>
						<div class="details name">Mark Rey Ronolo</div>
					</div>
					<div class="right">
						<div class="details trash">
							<div class="chip">
								<v-chip x-small color="#007D48" dark>Paper</v-chip>
							</div>
							<div class="chip">
								<v-chip x-small color="#7AA51F" dark>Cellophanes</v-chip>
							</div>
							<div class="chip">
								<v-chip x-small color="#407355" dark>Plastic Bottles</v-chip>
							</div>

							<div class="chip">
								<v-chip x-small color="#FDC00B" dark>Other Trash</v-chip>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="addBtn">
				<v-btn color="success" fab large dark @click="recordActivity">
					<v-icon>mdi-pencil</v-icon>
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
				this.$router.push("/recordActivity");
			},
			closeDetails() {
				this.moreDetails = false;
			},
		},
	};
</script>

<style scoped>
	@media only screen and (max-width: 765px) {
		.tableHeader,
		.tableContents {
			padding: 0px 10px;
		}

		.tableHeader {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.left .v-btn {
			display: flex;
			justify-content: flex-start;
		}

		.left {
			width: 60%;
			display: flex;
			align-items: center;
		}

		.right {
			width: 40%;
		}

		.tableContents {
			height: 60vh;
			overflow-y: auto;
		}

		.tableContents .content {
			padding: 0px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.11);
			color: #5aa67a;
			padding: 5px 5px;
			border-radius: 10px;
			background-color: white;
			height: 60px;
			overflow-y: auto;
			margin: 4px 0px;
		}

		.content {
			cursor: pointer;
		}

		.content:active {
			background-color: rgba(190, 248, 199, 0.89);
			transition: 0.3s ease;
		}

		.details {
			font-size: 12px;
			padding: 5px 5px;
			overflow: auto;
		}

		.date {
			width: 40%;
			text-align: left;
			font-size: 10px;
		}

		.name {
			width: 60%;
			font-size: 10px;
			text-align: left;
			font-weight: bold;
			text-transform: capitalize;
		}

		.trash {
			width: 100%;
			display: flex;
		}

		.trash .v-chip {
			margin: 2px;
		}

		.addBtn {
			position: fixed;
			right: 25px;
			bottom: 40px;
		}
	}
</style>
