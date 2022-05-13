<template>
	<div class="profileCon">
		<div class="profileSection">
			<div class="content">
				<div class="avatar">
					<v-avatar color="#5AA67A" size="140">
						<v-icon size="120" dark>mdi-account</v-icon>
					</v-avatar>
				</div>
				<div class="profileDetails">
					<div class="profileData">
						<div class="label">First Name</div>
						<div class="details">Decemie</div>
					</div>
					<div class="profileData">
						<div class="label">Last Name</div>
						<div class="details">Ronolo</div>
					</div>
					<div class="profileData">
						<div class="label">Gender</div>
						<div class="details">Female</div>
					</div>
					<div class="profileData">
						<div class="label">Code</div>
						<div class="details">123123123</div>
					</div>
				</div>
			</div>

			<div class="btns">
				<div class="btn">
					<v-btn small @click="showQR = true">View QR Code</v-btn>
				</div>
				<br />
				<div class="btn">
					<v-btn color="#5aa67a" dark small @click="printCard = true"
						>Print Card</v-btn
					>
				</div>
			</div>
		</div>

		<div class="dataSection">
			<div class="container">
				<div class="data">
					<div class="dataLabel">Plastic</div>
					<div class="dataCount">
						<div class="count">5</div>
						<span>Activities</span>
					</div>
				</div>
				<div class="data">
					<div class="dataLabel">Paper</div>
					<div class="dataCount">
						<div class="count">7</div>
						<span>Activities</span>
					</div>
				</div>
			</div>
			<div class="container">
				<div class="data">
					<div class="dataLabel">Others</div>
					<div class="dataCount">
						<div class="count">4</div>
						<span>Activities</span>
					</div>
				</div>
				<div class="data">
					<div class="dataLabel">All</div>
					<div class="dataCount">
						<div class="count">16</div>
						<span>Activities</span>
					</div>
				</div>
			</div>
		</div>

		<ShowQR :showQR="showQR" :value="value" @closeQR="closeQR" />
		<PrintCard :printCard="printCard" @closePrintCard="closePrintCard" />
	</div>
</template>

<script>
	import ShowQR from "../PopUpComponents/ViewQRCode.vue";
	import PrintCard from "../PopUpComponents/PrintCard.vue";

	export default {
		components: { ShowQR, PrintCard },
		data: () => ({
			showQR: false,
			printCard: false,
			value: "",
		}),
		methods: {
			closeQR() {
				this.showQR = false;
			},
			closePrintCard() {
				this.printCard = false;
			},
		},
	};
</script>

<style scoped>
	.profileCon {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 20px;
	}
	.profileSection,
	.data,
	.qrSection {
		padding: 20px;
		border-radius: 20px;
		background-color: white;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	}

	.profileSection {
		height: 270px;
		width: 80%;
	}

	.container {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
	}

	.data {
		width: 150px;
		height: 120px;
		padding: 10px;
		border-radius: 20px;
		background-color: white;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		margin: 0px 10px;
		text-align: center;
	}

	.dataLabel {
		color: #5aa67a;
		font-size: 12px;
		font-weight: bold;
	}

	.dataCount .count {
		font-size: 40px;
		font-weight: bold;
		color: #fdc00b;
	}

	.dataCount span {
		color: #5aa67a;
		font-size: 12px;
	}

	/* Profile Section */

	.profileSection {
		padding: 40px;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.profileSection .content {
		display: flex;
		align-items: center;
	}

	.profileSection .content .profileDetails {
		display: flex;
		text-align: left;
		padding: 20px;
	}

	.profileDetails {
		justify-content: center;
		align-items: center;
	}

	.profileData {
		padding: 5px;
		margin: 10px;
	}

	.label {
		color: #5aa67a;
		padding: 5px 0px;
		font-size: 12px;
	}

	.details {
		font-size: 18px;
		font-weight: 500;
		color: #064635;
	}

	@media only screen and (max-width: 1100px) {
		.profileCon {
			display: block;
		}

		.profileSection {
			height: 270px;
			width: 100%;
			padding: 10px;
		}

		.dataSection {
			display: flex;
			justify-content: center;

			text-align: left;
		}

		.container {
			display: flex;

			width: 300px;
			padding: 0px;
			margin: 0px;
		}

		.data {
			margin: 20px 10px;
		}
	}

	@media only screen and (max-width: 700px) {
	}
</style>
