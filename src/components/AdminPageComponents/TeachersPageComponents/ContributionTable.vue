<template>
	<div class="contributionTable">
		{{ sortedContributions() }}
		<div class="contributionCon" v-if="contributions.length != 0">
			<div class="tableHeader">
				<div class="heading" style="width: 20%">
					<div class="details">
						<v-btn x-small text color="#064635" dark>Teacher</v-btn>
					</div>
				</div>
				<div class="heading" style="width: 40%">
					<div class="details">
						<v-btn x-small text color="#064635" dark>Paper</v-btn>
					</div>
					<div class="details">
						<v-btn x-small text color="#064635" dark>Cellophanes</v-btn>
					</div>
					<div class="details">
						<v-btn x-small text color="#064635" dark>Plastic Bottles</v-btn>
					</div>
					<div class="details">
						<v-btn x-small text color="#064635" dark>Others</v-btn>
					</div>
				</div>
				<div class="heading" style="width: 40%">
					<div class="details">
						<v-btn x-small text color="#064635" dark>Segregated</v-btn>
					</div>
					<div class="details">
						<v-btn x-small text color="#064635" dark>Partly Segregated</v-btn>
					</div>
					<div class="details">
						<v-btn x-small text color="#064635" dark>Not Segregated</v-btn>
					</div>
				</div>
			</div>

			<div class="tableContents">
				<v-btn
					large
					style="width: 100%; padding: 0px"
					v-for="data in contributions"
					:key="data.id"
					:to="'/admin/teachers/profile/' + data.id"
					class="hoverableData"
				>
					<div class="heading" style="width: 20%">
						<div class="contentdetails">
							<v-icon small style="padding-right: 5px" color="#007D48"
								>mdi-account-circle</v-icon
							>{{ data.teacher }}
						</div>
					</div>
					<div class="heading" style="width: 40%">
						<div class="contentdetails category">
							<v-chip color="#007D48" dark small>{{ data.paper }}</v-chip>
						</div>
						<div class="contentdetails category">
							<v-chip color="#007D48" dark small>{{ data.cellophanes }}</v-chip>
						</div>
						<div class="contentdetails category">
							<v-chip color="#007D48" dark small>{{
								data.plastic_bottles
							}}</v-chip>
						</div>
						<div class="contentdetails category">
							<v-chip color="#007D48" dark small>{{ data.others }}</v-chip>
						</div>
					</div>
					<div class="heading" style="width: 40%">
						<div class="contentdetails status">
							<v-chip color="#7AA51F" dark small>{{ data.segregated }}</v-chip>
						</div>
						<div class="contentdetails status">
							<v-chip color="#7AA51F" dark small>{{ data.partly_seg }}</v-chip>
						</div>
						<div class="contentdetails status">
							<v-chip color="#7AA51F" dark small>{{ data.not_seg }}</v-chip>
						</div>
					</div>
				</v-btn>
			</div>
		</div>

		<div class="empty" v-if="contributions.length == 0">
			<img src="../../../assets/emptyTrash.png" alt="" />
			<h4>No data yet. Start by creating teachers.</h4>
		</div>
	</div>
</template>

<script>
	export default {
		components: {},
		props: {
			contribData: Array,
		},
		data: () => ({
			contributions: [],
		}),

		methods: {
			sortedContributions() {
				const data = [...this.contribData];
				data.sort((a, b) =>
					a.total_activities > b.total_activities
						? -1
						: b.total_activities > a.total_activities
						? 1
						: 0
				);

				this.contributions = [...data];
			},
		},
	};
</script>

<style scoped>
	.contributionTable {
		height: 600px;
		background-color: white;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 20px;
		padding: 20px;
		overflow-x: auto;
	}

	.contributionCon {
		min-width: 850px;
	}

	.tableHeader {
		display: flex;
		padding: 10px 0px;
	}

	.heading {
		display: flex;
	}

	.details {
		display: flex;
		width: 100%;
	}

	.details .v-btn {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.tableContents {
		height: 500px;
		overflow-y: auto;
	}

	.tableContents .v-btn {
		margin: 2px 0px;
		color: #064635;
	}

	.contentdetails {
		display: flex;
		width: 100%;
		font-size: 12px;
		padding: 10px;
	}

	.category,
	.status {
		font-size: 18px;
		padding-left: 20px;
	}

	:hover.hoverableData {
		background-color: #5aa67a;
		transition: 0.3s ease;
		color: white;
	}

	.empty {
		text-align: center;

		margin: 100px auto;
	}

	.empty h4 {
		color: #007d48;
		font-weight: lighter;
		padding: 20px;
	}

	.empty img {
		width: 300px;
	}
</style>
