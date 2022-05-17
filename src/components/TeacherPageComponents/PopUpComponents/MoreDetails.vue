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

				<div class="detail">
					<v-select
						label="Teacher"
						outlined
						color="#5aa67a"
						dense
						v-model="activity.teacher"
						:items="teachers"
						:rules="[rules.required]"
						readonly
					></v-select>
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
						v-model="activity.category"
						:items="categories"
						multiple
						small-chips
						:rules="[rules.required, rules.categoryMapped]"
						readonly
					>
					</v-combobox>
				</div>

				<div class="detail">
					<v-combobox
						label="Segregated"
						outlined
						color="#5aa67a"
						v-model="activity.segregated"
						:items="segregated"
						small-chips
						:rules="[rules.required, rules.segregatedMapped]"
						readonly
					>
					</v-combobox>
				</div>

				<div class="feedback">
					<div class="detail">
						<v-combobox
							v-model="activity.feedback"
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
							readonly
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
					teacher: "Juan Dela Cruz",
					category: ["Plastic Bottles", "Cellophanes"],
					segregated: "Yes",
					feedback: ["Great job, properly segregated."],
				},
				categories: ["Paper", "Cellophanes", "Plastic Bottles", "Others"],
				segregated: ["Yes", "Partly", "No"],
				teachers: [
					"Juan Dela Cruz",
					"Juan Dela Craz",
					"Juan Dela Cruqz",
					"Juan Dela Crufz",
					"Juan Dela Crusz",
				],
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

		computed: {
			allowed: function () {
				if (
					this.activity.teacher &&
					this.activity.category.length != 0 &&
					this.activity.segregated &&
					this.activity.feedback.length != 0 &&
					this.segregated.includes(this.activity.segregated) &&
					this.checkCategoryValue(this.activity.category)
				) {
					return true;
				}
				return false;
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
