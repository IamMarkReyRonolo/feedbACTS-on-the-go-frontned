<template>
	<v-dialog v-model="showQR" max-width="350" persistent>
		<v-card>
			<div class="container">
				<v-card-title class="dialogTitle"> QR Code </v-card-title>
				<br />
				<h3>Scan Me</h3>
				<div class="qrcode">
					<QrcodeVue :value="value" :size="size" level="H" />
				</div>

				<br />
				<v-card-text class="dialogContent">
					This QR Code can be used on identifying the teacher when they
					participate in trash collection.
				</v-card-text>

				<v-card-actions>
					<v-spacer></v-spacer>

					<v-btn color="green darken-1" text @click="$emit('closeQR', false)">
						Close
					</v-btn>
				</v-card-actions>
			</div>
		</v-card>
	</v-dialog>
</template>

<script>
	import QrcodeVue from "qrcode.vue";
	export default {
		components: { QrcodeVue },
		props: {
			showQR: Boolean,
			value: String,
		},
		data() {
			return {
				loading: false,
				size: 200,
			};
		},

		methods: {
			soundBuzzer() {
				this.loading = true;
				setTimeout(() => {
					this.loading = false;
					this.$emit("closeBuzzer", true);
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
		text-align: justify;
	}

	.container {
		padding: 20px;
	}

	h3 {
		color: #5aa67a;
		padding-bottom: 10px;
	}
</style>
