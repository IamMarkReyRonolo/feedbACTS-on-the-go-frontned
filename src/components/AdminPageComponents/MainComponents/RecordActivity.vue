<template>
	<div>
		<div class="fetched">
			<div class="recordActivtyCon">
				<div class="closeBtn">
					<v-btn
						fab
						x-small
						color="green darken-1"
						outlined
						@click="closeDialog"
					>
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</div>
				<div v-if="!showResult">
					<div class="SelectOptionsDiv" v-if="!proceed">
						<p class="error">{{ error }}</p>
						<h2>Scan QR Code</h2>
						<br />
						<div class="camera">
							<qrcode-stream
								@decode="onDecode"
								@init="onInit"
								:track="paintOutline"
							/>
						</div>
						<br />
						<h2>Or</h2>
						<br />
						<v-btn large color="#5aa67a" dark @click="proceed = true"
							>Manual Type Details</v-btn
						>
					</div>

					<div class="actualRecording" v-if="proceed">
						<h2>Record Activity</h2>
						<br />
						<div class="detail">
							<v-select
								label="Teacher"
								outlined
								color="#5aa67a"
								dense
								v-model="activity.teacher"
								:items="teachers"
								:disabled="isdisabled"
								:rules="[rules.required]"
							></v-select>
						</div>

						{{ getTeachers }}
						<div class="detail">
							<v-text-field
								label="Teacher Code"
								outlined
								color="#5aa67a"
								dense
								v-model="activity.code"
								:disabled="isdisabled"
								:rules="[rules.required]"
							></v-text-field>
						</div>

						<div class="detail">
							<v-combobox
								label="Category"
								outlined
								color="#5aa67a"
								v-model="activity.categories"
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
								v-model="activity.status"
								:items="segregated"
								small-chips
								:rules="[rules.required, rules.segregatedMapped]"
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

							<div class="btn">
								<v-btn large dark color="#5aa67a" outlined @click="goBack"
									>Back</v-btn
								>
								<v-btn
									large
									color="#5aa67a"
									:loading="loading"
									@click="addActivity"
									:dark="allowed"
									:disabled="!allowed"
									>Add Activity</v-btn
								>
							</div>
							<br />
						</div>
					</div>
				</div>

				<div class="resultPage" v-if="showResult">
					<div class="successResult" v-if="success">
						<div>
							<v-avatar size="140" dark color="success">
								<v-icon dark size="120">mdi-check</v-icon>
							</v-avatar>
						</div>

						<br />
						<h3 style="color: green">Successfully Recorded</h3>
						<br />
						<v-btn color="success" dark x-large @click="recordAgain"
							>Record Another</v-btn
						>
					</div>
					<div class="failedResult" v-if="!success">
						<div>
							<v-avatar size="140" dark color="error">
								<v-icon dark size="120">mdi-close</v-icon>
							</v-avatar>
						</div>

						<br />
						<h3 style="color: red">Failed to record activity</h3>
						<br />
						<v-btn color="warning" dark x-large @click="recordAgain"
							>Record Another</v-btn
						>
					</div>
				</div>
			</div>

			<v-snackbar v-model="snackbar" :timeout="timeout">
				{{ message }}

				<template v-slot:action="{ attrs }">
					<v-btn color="#5aa67a" text v-bind="attrs" @click="snackbar = false">
						Close
					</v-btn>
				</template>
			</v-snackbar>
		</div>
		<div class="error"></div>
		<div class="loading"></div>
	</div>
</template>

<script>
	import { QrcodeStream } from "vue-qrcode-reader";
	import activityAPI from "../../../apis/activityAPI";
	import teacherAPI from "../../../apis/teacherAPI";
	export default {
		components: { QrcodeStream },

		data() {
			return {
				showResult: false,
				success: false,
				snackbar: false,
				message: "",
				timeout: 3000,
				data: [],
				fetched: false,
				loading: false,
				error: false,
				result: {},
				error: "",
				proceed: false,
				loading: false,
				isdisabled: false,
				cantProceed: true,
				activity: {
					date: "",
					time: "",
					teacher: "",
					code: "",
					categories: [],
					status: "",
					feedback: [],
				},
				categories: ["Paper", "Cellophanes", "Plastic Bottles", "Others"],
				segregated: ["Yes", "Partly", "No"],
				teachers: [],
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

		async created() {
			this.loading = true;
			this.fetched = false;
			try {
				const teachers = await teacherAPI.prototype.getAllTeachers();
				this.data = teachers.data;
				this.fetched = true;
			} catch (error) {
				this.error = true;
			}

			this.loading = false;
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
			closeDialog() {
				this.clear();
				this.$router.push("/admin");
			},

			clear() {
				this.error = "";
				this.activity.teacher = "";
				this.activity.code = "";
				this.activity.categories = [];
				this.activity.status = "";
				this.activity.feedback = [];
				this.isdisabled = false;
				this.proceed = false;
			},

			goBack() {
				this.clear();
			},

			async addActivity() {
				this.loading = true;

				try {
					const payload = Object.assign({}, this.activity);

					if (this.activity.status == "Yes") {
						payload.status = "Segregated";
					}

					if (this.activity.status == "No") {
						payload.status = "Not Segregated";
					}

					if (this.activity.status == "Partly") {
						payload.status = "Partly Segregated";
					}

					payload.date_created = this.getDate();
					payload.time_created = this.getTime();
					const teacherID = this.getTeacherId(payload.teacher);
					const result = await activityAPI.prototype.createActivity(
						teacherID,
						payload
					);
					result.data.teacher = payload.teacher;
					this.showResult = true;
					this.success = true;

					this.clear();
					this.proceed = false;
					this.loading = true;
				} catch (error) {
					this.showResult = true;
					this.success = false;

					this.loading = false;
					this.clear();
					this.proceed = false;
				}
			},
			getDate() {
				let today = new Date();
				const dd = String(today.getDate()).padStart(2, "0");
				const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
				const yyyy = today.getFullYear();

				today = mm + "/" + dd + "/" + yyyy;
				return today;
			},

			getTime() {
				const today = new Date();
				var time = today.getHours() + ":" + today.getMinutes();
				return time;
			},
			getTeacherId(name) {
				let id;
				this.data.forEach((d) => {
					let full_name = d.first_name + " " + d.last_name;
					if (full_name == name) {
						id = d.id;
					}
				});

				return id;
			},

			onDecode(result) {
				try {
					this.result = JSON.parse(result);

					if ("teacher" in this.result && "code" in this.result) {
						this.activity.teacher = this.result.teacher;
						this.activity.code = this.result.code;
						this.proceed = true;
						this.isdisabled = true;
					} else {
						this.error = "QR Code invalid";
					}
				} catch (error) {
					this.error = "QR Code invalid";
				}
			},

			paintOutline(detectedCodes, ctx) {
				for (const detectedCode of detectedCodes) {
					const [firstPoint, ...otherPoints] = detectedCode.cornerPoints;

					ctx.strokeStyle = "red";

					ctx.beginPath();
					ctx.moveTo(firstPoint.x, firstPoint.y);
					for (const { x, y } of otherPoints) {
						ctx.lineTo(x, y);
					}
					ctx.lineTo(firstPoint.x, firstPoint.y);
					ctx.closePath();
					ctx.stroke();
				}
			},

			async onInit(promise) {
				try {
					await promise;
				} catch (error) {
					if (error.name === "NotAllowedError") {
						this.error = "ERROR: you need to grant camera access permission";
					} else if (error.name === "NotFoundError") {
						this.error = "ERROR: no camera on this device";
					} else if (error.name === "NotSupportedError") {
						this.error = "ERROR: secure context required (HTTPS, localhost)";
					} else if (error.name === "NotReadableError") {
						this.error = "ERROR: is the camera already in use?";
					} else if (error.name === "OverconstrainedError") {
						this.error = "ERROR: installed cameras are not suitable";
					} else if (error.name === "StreamApiNotSupportedError") {
						this.error = "ERROR: Stream API is not supported in this browser";
					} else if (error.name === "InsecureContextError") {
						this.error =
							"ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.";
					} else {
						this.error = `ERROR: Camera error (${error.name})`;
					}
				}
			},

			recordAgain() {
				this.showResult = false;
				this.success = false;
				this.proceed = false;
			},
		},

		computed: {
			allowed: function () {
				if (
					this.activity.teacher &&
					this.activity.code &&
					this.activity.categories.length != 0 &&
					this.activity.status &&
					this.activity.feedback.length != 0 &&
					this.segregated.includes(this.activity.status) &&
					this.checkCategoryValue(this.activity.categories)
				) {
					return true;
				}

				return false;
			},

			getTeachers: function () {
				this.data.forEach((d) => {
					let teacher = d.first_name + " " + d.last_name;

					this.teachers.push(teacher);
				});
			},
		},
	};
</script>

<style scoped>
	.recordActivtyCon {
		background-color: white;
		padding: 40px 10px;
		height: 650px;
		overflow-y: auto;
	}
	.error {
		font-weight: bold;
	}

	.camera {
		width: 250px;
		height: 250px;
		margin: auto;
		border: 4px dashed #5aa67a;
		border-radius: 10px;
		padding: 10px;
	}

	h2 {
		color: #5aa67a;
	}

	.closeBtn {
		text-align: right;
		margin-top: -20px;
		padding-right: 10px;
	}

	.detail {
		margin: 0px 10px;
	}

	.btn {
		padding: 5px 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.v-chip {
		color: green;
	}

	.resultPage {
		height: 80vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
