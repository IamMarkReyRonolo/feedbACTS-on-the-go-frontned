<template>
	<v-dialog v-model="printCard" max-width="500" persistent>
		<div class="container">
			<div class="close">
				<v-btn
					fab
					x-small
					color="green darken-1"
					outlined
					@click="$emit('closePrintCard')"
					class="closeBtn"
				>
					<v-icon>mdi-close</v-icon>
				</v-btn>
			</div>

			<div class="card">
				<div class="mainContent">
					<div class="titleHeader">
						<div class="headerImg">
							<img src="../../../assets/Ellipse2.png" alt="" />
						</div>
						<div class="titleContent">
							<div class="cardTitle">FeedaCTS CARD</div>
							<div class="cardSub">
								Feedbacking and Concurrent Tracking System <br />Solid Waste
								Disposal
							</div>
						</div>
					</div>

					<div class="content">
						<div class="upper">
							<div class="imgCon">
								<img
									src="../../../assets/Profile_avatar_placeholder_large.png"
									alt=""
									srcset=""
								/>
							</div>
							<div class="detailsCon">
								<div class="detail">
									<div class="label">Name</div>
									<div class="data">Mark Rey Ronolo</div>
								</div>
								<div class="detail">
									<div class="label">Gender</div>
									<div class="data">Male</div>
								</div>

								<div class="detail">
									<div class="label">School</div>
									<div class="data">Sacub National High School</div>
								</div>
							</div>
						</div>
						<div class="lower">
							<h4>Scan Me</h4>
							<div class="qrcode">
								<QrcodeVue :value="value" :size="size" level="H" />
							</div>
						</div>
					</div>
				</div>
			</div>

			<v-btn @click="generateReport" color="#5aa67a" dark> Print Card</v-btn>
			<br />
			<br />
			<VueHtml2pdf
				:show-layout="false"
				:float-layout="true"
				:enable-download="true"
				:paginate-elements-by-height="1400"
				filename="FeedCTS-Card"
				:pdf-quality="2"
				:manual-pagination="false"
				pdf-format="a4"
				pdf-orientation="landscape"
				pdf-content-width="800px"
				ref="html2Pdf"
			>
				<section slot="pdf-content">
					<div class="card">
						<div class="mainContent">
							<div class="titleHeader">
								<div class="headerImg">
									<img src="../../../assets/Ellipse2.png" alt="" />
								</div>
								<div class="titleContent">
									<div class="cardTitle">FeedaCTS CARD</div>
									<div class="cardSub">
										Feedbacking and Concurrent Tracking System <br />Solid Waste
										Disposal
									</div>
								</div>
							</div>

							<div class="content">
								<div class="upper">
									<div class="imgCon">
										<img
											src="../../../assets/Profile_avatar_placeholder_large.png"
											alt=""
											srcset=""
										/>
									</div>
									<div class="detailsCon">
										<div class="detail">
											<div class="label">Name</div>
											<div class="data">Mark Rey Ronolo</div>
										</div>
										<div class="detail">
											<div class="label">Gender</div>
											<div class="data">Male</div>
										</div>

										<div class="detail">
											<div class="label">School</div>
											<div class="data">Sacub National High School</div>
										</div>
									</div>
								</div>
								<div class="lower">
									<h4>Scan Me</h4>
									<div class="qrcode">
										<QrcodeVue :value="value" :size="size" level="H" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</VueHtml2pdf>
		</div>
	</v-dialog>
</template>

<script>
	import VueHtml2pdf from "vue-html2pdf";
	import QrcodeVue from "qrcode.vue";

	export default {
		components: {
			VueHtml2pdf,
			QrcodeVue,
		},
		props: {
			printCard: Boolean,
		},
		data() {
			return {
				value: "",
				size: 150,
			};
		},
		methods: {
			generateReport() {
				this.$refs.html2Pdf.generatePdf();
			},
		},
	};
</script>

<style scoped>
	.container {
		background-color: white;
	}

	.close {
		text-align: right;
	}

	.card {
		width: 300px;
		height: 400px;
		margin: 50px auto;
		border: 1px solid #5aa67a;
		border-radius: 10px;
		padding: 10px 20px;
		display: flex;
		justify-content: center;
		align-content: center;
		flex-direction: column;
		background-color: white;
	}

	.titleHeader {
		display: flex;
	}

	.headerImg {
		width: 50px;
		height: 50px;
		margin-right: 10px;
	}

	.headerImg img {
		width: 50px;
		height: 50px;
	}

	.cardTitle {
		text-align: left;
		color: #5aa67a;
		font-size: 14px;
		font-weight: bold;
	}

	.cardSub {
		font-size: 8px;
		color: #5aa67a;
		text-align: left;
	}

	.content {
		margin: 5px auto;
		height: 320px;
		width: 250px;
	}

	.upper {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 10px 0px;
	}

	.imgCon {
		width: 100px;
		height: 100px;
		border: 1px solid #5aa67a;
		text-align: center;
	}

	img {
		width: 96px;
		height: 96px;
	}

	.detailsCon {
		width: 150px;
		height: 100px;
	}
	.detail {
		text-align: left;
		margin: 5px 5px;
	}

	.label {
		color: #5aa67a;
		font-size: 8px;
	}

	.data {
		font-size: 10px;
	}

	.lower {
		text-align: center;
	}

	.lower h4 {
		color: #5aa67a;
	}

	.qrcode {
		margin: 10px;
	}
</style>
