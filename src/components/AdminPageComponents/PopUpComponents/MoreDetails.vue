<template>
	<div v-if="moreDetails">
		{{ getActivity }}
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
				{{ getActivity }}
				<div class="main">
					<div class="upperDetails">
						<div class="detail">
							<v-text-field
								label="Date"
								outlined
								color="#5aa67a"
								dense
								v-model="selected_activity.date_created"
								disabled
							></v-text-field>
						</div>

						<div class="detail">
							<v-text-field
								label="Time"
								outlined
								color="#5aa67a"
								dense
								v-model="getTime"
								disabled
								type="time"
							></v-text-field>
						</div>
					</div>

					<div class="detail">
						<v-text-field
							label="Teacher"
							outlined
							color="#5aa67a"
							dense
							v-model="selected_activity.teacher"
							:rules="[rules.required]"
							disabled
						></v-text-field>
					</div>

					<div class="detail">
						<!-- <v-select
						label="Category"
						outlined
						color="#5aa67a"
						dense
						v-model="activity.category"
						:items="categories"
						:rules="[rules.required]"
					></v-select> -->

						<v-combobox
							label="Category"
							outlined
							color="#5aa67a"
							v-model="selected_activity.categories"
							:items="categories"
							multiple
							small-chips
							:rules="[rules.required, rules.categoryMapped]"
						>
						</v-combobox>
					</div>

					<div class="detail">
						<v-combobox
							label="Segregated"
							outlined
							color="#5aa67a"
							v-model="selected_activity.status"
							:items="segregated"
							small-chips
							:rules="[rules.required, rules.segregatedMapped]"
						>
						</v-combobox>
					</div>

					<div class="feedback">
						<div class="detail">
							<v-combobox
								v-model="selected_activity.feedback"
								:items="feedbacks"
								:search-input.sync="search"
								hide-selected
								outlined
								color="#5aa67a"
								label="Feedback"
								persistent-hint
								small-chips
								multiple
								:rules="[rules.required]"
								height="100px"
							>
								<template v-slot:no-data>
									<v-list-item>
										<v-list-item-content>
											<v-list-item-title>
												No results matching "<strong>{{ search }}</strong
												>". Press <kbd>enter</kbd> to create a new one
											</v-list-item-title>
										</v-list-item-content>
									</v-list-item>
								</template>
							</v-combobox>
						</div>
					</div>
				</div>

				<div class="btn">
					<v-btn
						large
						color="#5aa67a"
						@click="updateDetails"
						:loading="updateLoading"
						:dark="allowed"
						:disabled="!allowed"
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
	</div>
</template>

<script>
	import activityAPI from "../../../apis/activityAPI";
	export default {
		props: {
			moreDetails: Boolean,
			activity: Object,
		},
		data() {
			return {
				updateLoading: false,
				deleteLoading: false,
				dates: [],
				selected_activity: {},
				categories: ["Paper", "Cellophanes", "Plastic Bottles", "Others"],
				segregated: ["Segregated", "Partly Segregated", "Not Segregated"],
				rules: {
					required: (value) => this.validateRequired(value) || "Required.",
					min: (v) => v.length >= 8 || "Min 8 characters",
					match: (v) =>
						v == this.newPassword || `The password you entered don't match`,
					categoryMapped: (v) => this.checkCategoryValue(v) || "Invalid input",
					segregatedMapped: (v) =>
						this.segregated.includes(v) || "Invalid input",
				},
				feedbacks: [
					"Great job, properly segregated.",
					"Please segregate your trash next time.",
					"Some of your trash aren't segregated properly",
				],
				model: "",
				search: null,
			};
		},

		methods: {
			checkCategoryValue(categories) {
				let isvalid = true;
				categories.forEach((category) => {
					if (!this.categories.includes(category)) {
						isvalid = false;
					}
				});
				return isvalid;
			},
			validateRequired(value) {
				if (value) {
					const type = typeof value;
					if (type == "string") {
						return !!value;
					} else {
						return value.length != 0;
					}
				} else {
					return !!value;
				}
			},
			async updateDetails() {
				this.updateLoading = true;
				const updatedDetails = {
					categories: this.selected_activity.categories,
					status: this.selected_activity.status,
					feedback: this.selected_activity.feedback,
					teacherId: this.selected_activity.teacherId,
				};

				try {
					const updated = await activityAPI.prototype.updateActivity(
						this.selected_activity.id,
						updatedDetails
					);
					this.updateLoading = false;
					this.$emit("updateDetails", this.selected_activity);
				} catch (error) {
					this.updateLoading = false;
					this.$emit("updateDetails", error.message);
				}
			},
			async deleteDetails() {
				this.deleteLoading = true;

				try {
					const deleted = await activityAPI.prototype.deleteSpecificActivity(
						this.selected_activity.id
					);
					this.deleteLoading = false;
					this.$emit("deleteDetails", this.selected_activity.id);
				} catch (error) {
					this.deleteLoading = false;
					this.$emit("deleteDetails", error.message);
				}
			},
		},

		computed: {
			allowed: function () {
				if (
					this.selected_activity.teacher &&
					this.selected_activity.categories.length != 0 &&
					this.selected_activity.status &&
					this.selected_activity.feedback.length != 0 &&
					this.segregated.includes(this.selected_activity.status) &&
					this.checkCategoryValue(this.selected_activity.categories)
				) {
					return true;
				}
				return false;
			},

			getActivity() {
				this.selected_activity = Object.assign({}, this.activity);
			},

			getTime() {
				let time = this.selected_activity.time_created;

				if (time.split(":")[0] < 10) {
					time = 0 + "" + this.selected_activity.time_created;
				}

				return time;
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
