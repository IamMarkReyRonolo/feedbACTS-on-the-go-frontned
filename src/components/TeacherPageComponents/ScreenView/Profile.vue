<template>
	<div class="teacherPageCon">
		<div class="mainCon">
			<div class="leftCon">
				<div class="teacherDetails">
					<div class="profileAvatar">
						<v-avatar size="120px" color="#007D48">
							<v-icon dark size="100px">mdi-account</v-icon></v-avatar
						>
					</div>

					<div class="name">
						<div class="details">
							<div class="label">First Name</div>
							<div class="content">{{ this.teacher.first_name }}</div>
						</div>
						<div class="details">
							<div class="label">Last Name</div>
							<div class="content">{{ this.teacher.last_name }}</div>
						</div>
					</div>

					<div class="details">
						<div class="label">Gender</div>
						<div class="content">{{ this.teacher.gender }}</div>
					</div>
					<div class="details">
						<div class="label">Username</div>
						<div class="content">{{ this.teacher.username }}</div>
					</div>
					<div class="details">
						<div class="label">Code</div>
						<div class="content">{{ this.teacher.code }}</div>
					</div>
					<div class="detailsFunctionCon">
						<div class="btn">
							<v-btn small color="#064635" dark @click="showQR = true"
								>View QR Code</v-btn
							>
						</div>
					</div>
				</div>
			</div>
		</div>

		<ViewQRCode :showQR="showQR" @closeQR="closeQR()" :value="getQRValue" />
	</div>
</template>

<script>
	import ViewQRCode from "../PopUpComponents/ViewQRCode.vue";

	export default {
		components: {
			ViewQRCode,
		},

		props: {
			teacher: Object,
		},
		data() {
			return {
				showQR: false,
			};
		},

		methods: {
			closeQR() {
				this.showQR = false;
			},
		},

		computed: {
			getQRValue: function () {
				const qrValue = {
					teacher: this.teacher.first_name + " " + this.teacher.last_name,
					code: this.teacher.code,
				};
				return JSON.stringify(qrValue);
			},
		},
	};
</script>

<style scoped>
	.mobileView {
		display: none;
	}

	.leftCon {
		width: 65%;
	}
	.rightCon {
		width: 33%;
	}
	.teacherPageCon {
		padding: 20px 0px;
	}

	.mainCon {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}

	.teacherDetails {
		text-align: left;
		background-color: white;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 20px;
	}

	.teacherDetails {
		padding: 20px 40px;
	}

	.detailsFunctionCon {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.profileAvatar {
		text-align: center;
		padding: 20px 0px;
	}

	.functionBtns .v-btn {
		margin: 10px 5px;
	}

	.details {
		padding: 5px 20px;
	}

	.label {
		font-size: 12px;
	}

	.content {
		font-size: 18px;
		font-weight: bold;
		color: #007d48;
	}

	.btn {
		padding: 5px 0px;
	}

	.teacherDetails,
	.name {
		text-align: left;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.teacherDetails {
		flex-wrap: wrap;
	}
	.details .label {
		font-size: 10px;
	}

	.details .content {
		font-size: 14px;
	}

	.charts {
		text-align: left;
		background-color: white;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 20px;
		padding: 20px 30px;
		text-align: center;
	}

	.miniNav {
		text-align: left;
	}

	.charts,
	.teacherDetails {
		min-height: 300px;
	}

	@media only screen and (max-width: 1100px) {
		.mainCon {
			padding: 0px 0px;
			display: block;
		}
		.leftCon,
		.rightCon {
			width: 100%;
			margin: 10px 0px;
		}
	}

	/* @media only screen and (max-width: 765px) {
		.mainCon {
			display: none;
		}

		.mobileView {
			display: block;
		}
	} */

	@media only screen and (max-width: 765px) {
		.teacherDetails,
		.name {
			display: block;
			text-align: center;
		}

		.details .label {
			font-size: 12px;
		}

		.details .content {
			font-size: 16px;
		}

		.mobile {
			display: none;
		}

		.detailsFunctionCon {
			padding: 20px;
		}
	}
</style>
