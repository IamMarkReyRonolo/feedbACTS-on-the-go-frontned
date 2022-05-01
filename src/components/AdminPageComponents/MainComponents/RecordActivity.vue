<template>
	<div class="recordActivtyCon">
		<br />
		<br />
		<p class="error">{{ error }}</p>
		<h2>Scan QR Code</h2>
		<br />
		<br />
		<div class="camera">
			<qrcode-stream @decode="onDecode" @init="onInit" :track="paintOutline" />
		</div>
		<br />
		<br />
		<h2>Or</h2>
		<br />
		<v-btn x-large color="#5aa67a" dark>Manual Type Details</v-btn>
		<br />
		{{ this.result }}
	</div>
</template>

<script>
	import { QrcodeStream } from "vue-qrcode-reader";

	export default {
		components: { QrcodeStream },

		data() {
			return {
				result: "",
				error: "",
			};
		},

		methods: {
			onDecode(result) {
				this.result = result;
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
	};
</script>

<style scoped>
	.error {
		font-weight: bold;
	}

	.camera {
		width: 280px;
		height: 280px;
		margin: auto;
		border: 4px dashed #5aa67a;
		border-radius: 10px;
		padding: 10px;
	}

	.recordActivtyCon {
		height: 100vh;
	}

	h2 {
		color: #5aa67a;
	}
</style>