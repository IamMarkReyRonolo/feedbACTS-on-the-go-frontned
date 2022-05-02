<template>
	<v-dialog v-model="moreDetails" max-width="400" persistent>
		<v-card>
			<v-btn
				fab
				x-small
				color="green darken-1"
				outlined
				@click="$emit('closeDetails')"
				class="closeBtn"
			>
				<v-icon>mdi-close</v-icon>
			</v-btn>
			<v-card-title class="dialogTitle"> Activity Details </v-card-title>

			<div class="main">
				<div class="upperDetails">
					<div class="detail">
						<v-text-field
							label="Date"
							outlined
							color="#5aa67a"
							dense
							v-model="activity.date"
							disabled
						></v-text-field>
					</div>
					<div class="detail">
						<v-text-field
							label="Time"
							outlined
							color="#5aa67a"
							dense
							v-model="activity.time"
							disabled
						></v-text-field>
					</div>
				</div>

				<div class="midDetails">
					<div class="detail">
						<v-select
							label="Category"
							outlined
							color="#5aa67a"
							dense
							v-model="activity.category"
							:items="categories"
						></v-select>
					</div>

					<div class="detail">
						<v-select
							label="Teacher"
							outlined
							color="#5aa67a"
							dense
							v-model="activity.teacher"
							:items="teachers"
						></v-select>
					</div>
				</div>

				<div class="feedback">
					<div class="detail">
						<v-textarea
							label="Feedback"
							outlined
							color="#5aa67a"
							dense
							no-resize
							v-model="activity.feedback"
						></v-textarea>
					</div>
				</div>
			</div>

			<div class="btn">
				<v-btn
					large
					dark
					color="#5aa67a"
					@click="updateDetails"
					:loading="updateLoading"
					>Update Details</v-btn
				>
			</div>

			<div class="btn">
				<v-btn
					large
					dark
					color="error"
					@click="deleteDetails"
					:loading="deleteLoading"
					>Delete Activity</v-btn
				>
			</div>
			<br />
		</v-card>
	</v-dialog>
</template>

<script>
	export default {
		props: {
			moreDetails: Boolean,
		},
		data() {
			return {
				updateLoading: false,
				deleteLoading: false,
				dates: [],
				activity: {
					date: "03/24/2022",
					time: "10:30 AM",
					category: "Plastic",
					teacher: "Juan Dela Cruz",
					feedback:
						"Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, impedit veritatis. Ullam est ex possimus, molestiae incidunt sapiente dolor saepe.",
				},
				categories: ["Plastic", "Paper", "Others"],
				teachers: [
					"Juan Dela Cruz",
					"Juan Dela Craz",
					"Juan Dela Cruqz",
					"Juan Dela Crufz",
					"Juan Dela Crusz",
				],
			};
		},

		methods: {
			updateDetails() {
				this.updateLoading = true;
				setTimeout(() => {
					this.updateLoading = false;
					this.$emit("closeDetails");
				}, 1000);
			},
			deleteDetails() {
				this.deleteLoading = true;
				setTimeout(() => {
					this.deleteLoading = false;
					this.$emit("closeDetails");
				}, 1000);
			},
		},
	};
</script>

<style scoped>
	.dialogTitle {
		color: #5aa67a;
		font-weight: bold;
	}

	.dialogContent {
		text-align: left;
	}
	.btn {
		padding: 5px 40px;
	}
	.btn .v-btn {
		width: 100%;
	}

	.closeBtn {
		position: absolute;
		top: 10px;
		right: 10px;
	}

	.main {
		padding: 20px;
	}

	.upperDetails {
		display: flex;
	}

	.detail {
		margin: 0px 10px;
	}
</style>
