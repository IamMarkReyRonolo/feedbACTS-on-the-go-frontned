<template>
	<div class="recordActivtyCon">
		<div class="closeBtn">
			<v-btn fab x-small color="green darken-1" outlined @click="closeDialog">
				<v-icon>mdi-close</v-icon>
			</v-btn>
			<div class="mainContent">
				<h2>Teacher Details</h2>

				<div class="avatarCon">
					<v-avatar size="120" color="green"
						><v-icon size="110" dark>mdi-account</v-icon></v-avatar
					>
				</div>
				<div class="teacherDetails">
					<div class="label">First Name</div>
					<div class="details">Juan</div>
				</div>
				<div class="teacherDetails">
					<div class="label">Last Name</div>
					<div class="details">Dela Cruz</div>
				</div>
				<div class="teacherDetails">
					<div class="label">Gender</div>
					<div class="details">Male</div>
				</div>
				<div class="teacherDetails">
					<div class="label">Code</div>
					<div class="details">123123123</div>
				</div>
				<div class="teacherDetails">
					<div class="label">Username</div>
					<div class="details">akosijaun123</div>
				</div>

				<div class="btn">
					<v-btn color="#5aa67a" dark @click="showQR = true"
						>View QR Code</v-btn
					>
				</div>
			</div>
		</div>

		<ViewQRCode :showQR="showQR" :value="value" @closeQR="closeQR" />
	</div>
</template>

<script>
	import ViewQRCode from "../PopUpComponents/ViewQRCode.vue";
	export default {
		components: { ViewQRCode },

		data() {
			return {
				showQR: false,
				teacherDetails: {
					name: "Juan Dela Cruz",
					code: "123123123",
				},
				value: "asdasd",
			};
		},

		methods: {
			closeDialog() {
				this.$router.push("/teacher");
			},

			closeQR() {
				this.showQR = false;
			},
		},

		computed: {},
	};
</script>

<style scoped>
	.recordActivtyCon {
		background-color: white;
		padding: 40px 10px;
		height: 100vh;
	}

	h2 {
		color: #5aa67a;
	}

	.closeBtn {
		text-align: right;
		margin-top: -20px;
		padding-right: 10px;
	}

	.mainContent {
		text-align: center;
		padding: 10px 20px;
	}

	.avatarCon {
		margin: 20px;
	}

	.teacherDetails {
		text-align: left;
		padding: 10px 40px;
		width: 400px;
		margin: auto;
	}

	.label {
		color: #5aa67a;
	}

	.details {
		font-size: 22px;
	}

	.btn {
		padding: 40px 0px;
	}
</style>
