<template>
	<div>
		<br />
		{{ getContribution }}
		<div class="contributionTable">
			<h4 style="color: #064635">Trash Per Type</h4>
			<div class="contributionCon">
				<div class="tableHeader">
					<div class="heading" style="width: 30%">
						<div class="details">
							<v-btn x-small text color="#064635" dark>Teacher</v-btn>
						</div>
					</div>
					<div class="heading" style="width: 70%">
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
				</div>

				<div class="tableContents">
					<v-btn
						large
						style="width: 100%; padding: 0px"
						v-for="(n, index) in contribData"
						:key="index"
						class="hoverableData"
					>
						<div class="heading" style="width: 30%">
							<div class="contentdetails">
								<v-icon small style="padding-right: 5px" color="#007D48"
									>mdi-account-circle</v-icon
								>{{ n.teacher }}
							</div>
						</div>
						<div class="heading" style="width: 70%">
							<div class="contentdetails category">
								<v-chip color="#007D48" dark small>{{ n.paper }}</v-chip>
							</div>
							<div class="contentdetails category">
								<v-chip color="#007D48" dark small>{{ n.cellophanes }}</v-chip>
							</div>
							<div class="contentdetails category">
								<v-chip color="#007D48" dark small>{{
									n.plastic_bottles
								}}</v-chip>
							</div>
							<div class="contentdetails category">
								<v-chip color="#007D48" dark small>{{ n.others }}</v-chip>
							</div>
						</div>
					</v-btn>
				</div>
			</div>
		</div>
		<br /><br />
		<div class="contributionTable">
			<h4 style="color: #064635">Trash Per Status</h4>
			<div class="contributionCon">
				<div class="tableHeader">
					<div class="heading" style="width: 30%">
						<div class="details">
							<v-btn x-small text color="#064635" dark>Teacher</v-btn>
						</div>
					</div>
					<div class="heading" style="width: 70%">
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
						v-for="(n, index) in contribData"
						:key="index"
						class="hoverableData"
					>
						<div class="heading" style="width: 30%">
							<div class="contentdetails">
								<v-icon small style="padding-right: 5px" color="#007D48"
									>mdi-account-circle</v-icon
								>{{ n.teacher }}
							</div>
						</div>
						<div class="heading" style="width: 70%">
							<div class="contentdetails status">
								<v-chip color="#7AA51F" dark small>{{ n.segregated }}</v-chip>
							</div>
							<div class="contentdetails status">
								<v-chip color="#7AA51F" dark small>{{ n.partly_seg }}</v-chip>
							</div>
							<div class="contentdetails status">
								<v-chip color="#7AA51F" dark small>{{ n.not_seg }}</v-chip>
							</div>
						</div>
					</v-btn>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		components: {},
		props: {
			data: Object,
		},
		data: () => ({
			list: [],
			contribData: [],
		}),
		created() {
			const copyData = Object.assign({}, this.data);

			let teachers = [];
			let obj = {
				teacher: "",
				activities: [],
			};

			for (let i = 0; i < copyData.activities.length; i++) {
				let teacher =
					copyData.activities[i].teacher.first_name +
					" " +
					copyData.activities[i].teacher.last_name;
				if (!teachers.includes(teacher)) {
					teachers.push(teacher);
					obj.teacher = teacher.slice();
					obj.activities.push({
						categories: copyData.activities[i].categories,
						status: copyData.activities[i].status,
					});

					this.list.push(obj);
					obj = {
						teacher: "",
						activities: [],
					};
					teacher = "";
				} else {
					let d = {
						categories: copyData.activities[i].categories,
						status: copyData.activities[i].status,
					};

					this.list.forEach((data) => {
						if (data.teacher == teacher) {
							data.activities.push(d);
						}
					});
				}
			}
		},

		computed: {
			getContribution: function () {
				this.list.forEach((d) => {
					let teacher = {};
					teacher.teacher = d.teacher;
					teacher.id = d.id;
					teacher.paper = 0;
					teacher.cellophanes = 0;
					teacher.plastic_bottles = 0;
					teacher.others = 0;
					teacher.segregated = 0;
					teacher.partly_seg = 0;
					teacher.not_seg = 0;
					teacher.total_activities = 0;
					d.activities.forEach((activity) => {
						if (activity.categories.includes("Paper")) {
							teacher.paper += 1;
						}

						if (activity.categories.includes("Cellophanes")) {
							teacher.cellophanes += 1;
						}
						if (activity.categories.includes("Plastic Bottles")) {
							teacher.plastic_bottles += 1;
						}
						if (activity.categories.includes("Others")) {
							teacher.others += 1;
						}

						if (activity.status == "Segregated") {
							teacher.segregated += 1;
						}

						if (activity.status == "Partly Segregated") {
							teacher.partly_seg += 1;
						}

						if (activity.status == "Not Segregated") {
							teacher.not_seg += 1;
						}

						teacher.total_activities += 1;
					});

					this.contribData.push(teacher);
				});
			},
		},
	};
</script>

<style scoped>
	.contributionTable {
		background-color: white;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 20px;
		padding: 20px;
		overflow-x: auto;
		margin: 10px 0px;
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
</style>
