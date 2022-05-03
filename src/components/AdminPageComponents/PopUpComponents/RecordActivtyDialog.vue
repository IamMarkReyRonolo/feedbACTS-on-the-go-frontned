<template>
	<v-dialog v-model="recordActivity" max-width="400" persistent>
		<div class="recordActivtyCon" v-if="recordActivity">
			<div class="closeBtn">
				<v-btn fab x-small color="green darken-1" outlined @click="closeDialog">
					<v-icon>mdi-close</v-icon>
				</v-btn>
			</div>
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

				<div class="detail">
					<v-text-field
						label="Teacher Code"
						outlined
						color="#5aa67a"
						dense
						v-model="activity.code"
						:items="teachers"
						:disabled="isdisabled"
						:rules="[rules.required]"
					></v-text-field>
				</div>

				<div class="detail">
					<v-select
						label="Category"
						outlined
						color="#5aa67a"
						dense
						v-model="activity.category"
						:items="categories"
						:rules="[rules.required]"
					></v-select>
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

					<div class="btn">
						<v-btn large dark color="#5aa67a" outlined @click="goBack"
							>Back</v-btn
						>
						<v-btn
							large
							:dark="allowed"
							color="#5aa67a"
							:loading="loading"
							@click="addActivity"
							:disabled="!allowed"
							>Add Activity</v-btn
						>
					</div>
					<br />
				</div>
			</div>
		</div>
	</v-dialog>
</template>

<script>
	import { QrcodeStream } from "vue-qrcode-reader";

	export default {
		props: {
			recordActivity: Boolean,
		},
		components: { QrcodeStream },

		data() {
			return {
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
					category: "",
					feedback: "",
				},
				categories: ["Plastic", "Paper", "Others"],
				teachers: [
					"Juan Dela Cruz",
					"Juan Dela Craz",
					"Juan Dela Cruqz",
					"Juan Dela Crufz",
					"Juan Dela Crusz",
					"Mark Rey Ronolo",
				],
				rules: {
					required: (value) => !!value || "Required.",
					min: (v) => v.length >= 8 || "Min 8 characters",
					match: (v) =>
						v == this.newPassword || `The password you entered don't match`,
				},
			};
		},

		methods: {
			closeDialog() {
				this.clear();
				this.$emit("closeDialog");
			},

			clear() {
				this.error = "";
				this.activity.teacher = "";
				this.activity.code = "";
				this.activity.category = "";
				this.activity.feedback = "";
				this.isdisabled = false;
				this.proceed = false;
			},

			goBack() {
				this.clear();
			},

			addActivity() {
				this.loading = true;
				setTimeout(() => {
					this.loading = false;
					this.clear();
					this.$emit("closeDialog");
				}, 1000);
			},

			onDecode(result) {
				try {
					this.result = JSON.parse(result);
					console.log(this.result);
					if ("teacher" in this.result && "code" in this.result) {
						if (this.teachers.includes(this.result.teacher)) {
							this.activity.teacher = this.result.teacher;
							this.activity.code = this.result.code;
							this.proceed = true;
							this.isdisabled = true;
						} else {
							this.error = "Couldn't Identify QR Code";
						}
					} else {
						console.log("invalid");
						this.error = "QR Code invalid";
					}
				} catch (error) {
					console.log(error);
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
		},

		computed: {
			allowed: function () {
				if (
					this.activity.teacher &&
					this.activity.code &&
					this.activity.category
				) {
					return true;
				}

				return false;
			},
		},
	};
</script>

<style scoped>
	.recordActivtyCon {
		background-color: white;
		padding: 40px 10px;
		height: 580px;
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
</style>
