<template>
	<div class="dashboard">
		<div class="fetched" v-if="fetched">
			<div class="desktopView">
				<div class="upperView">
					<div class="titleCon">
						<h2>Dashboard</h2>
					</div>
					<v-btn color="#064635" dark
						><v-icon dark> mdi-gesture-double-tap </v-icon>Buzzer</v-btn
					>
				</div>
				<div class="mainView">
					<v-row no-gutters>
						<v-col cols="12" lg="8">
							<div class="leftCon">
								<div class="tableCon"></div>
							</div>
						</v-col>
						<v-col cols="12" lg="4">
							<div class="rightCon">
								<v-row no-gutters>
									<v-col cols="12" sm="8" lg="12">
										<div class="dataCon"></div>
									</v-col>
									<v-col cols="12" sm="4" lg="12">
										<div class="reportCon"></div>
									</v-col>
								</v-row>
							</div>
						</v-col>
					</v-row>
				</div>
			</div>

			<div class="mobileView">
				<div class="activityTable">
					<div class="header">
						<v-btn class="dateColumn" small text color="#064635">Date</v-btn>
						<v-btn class="teacherColumn" small text color="#064635"
							>Teacher</v-btn
						>
						<v-btn class="categoryColumn" small text color="#064635"
							>Trash</v-btn
						>
					</div>
					<div class="activities">
						<v-btn
							class="activity"
							v-for="n in 20"
							:key="n"
							style="width: 100%; font-size: 10px"
							unselectable="on"
							onselectstart="return false;"
							onmousedown="return false;"
							large
							outlined
						>
							<div class="dateColumn">03/25/22</div>
							<div class="teacherColumn">Juan Dela Cruz</div>
							<div class="categoryColumn">Plastic</div>
						</v-btn>
					</div>
				</div>
			</div>
		</div>
		<div class="loading" v-if="loading"></div>
		<div class="error" v-if="error"></div>
	</div>
</template>

<script>
	export default {
		components: {},
		data: () => ({
			fetched: true,
			loading: false,
			error: false,
		}),
	};
</script>

<style scoped>
	.mobileView {
		display: none;
	}

	.desktopView {
		padding: 20px 40px;
	}

	.upperView {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.mainView {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 500px;
		margin: 20px 0px;
	}

	.leftCon {
		padding-right: 10px;
	}
	.rightCon {
		padding-left: 10px;
		min-height: 500px;
	}

	.tableCon {
		height: 500px;
		background-color: white;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 20px;
	}

	.dataCon {
		background-color: white;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 20px;
		height: 320px;
	}

	.reportCon {
		background-color: white;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 20px;
		height: 160px;
		margin-top: 20px;
	}

	@media only screen and (max-width: 1260px) {
		/* For medium: */
		.desktopView {
			padding: 20px 0px;
		}

		.leftCon {
			padding-right: 0px;
		}
		.rightCon {
			padding-left: 0px;
			padding: 20px 0px;
			min-height: 320px;
		}

		.dataCon {
			margin-right: 10px;
		}

		.reportCon {
			margin-top: 0px;
			margin-left: 10px;
		}
	}

	@media only screen and (max-width: 700px) {
		.desktopView {
			display: none;
		}

		.mobileView {
			padding: 20px 0px;
			display: block;
		}

		.activityTable .header,
		.activity {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.header {
			font-weight: bold;
			color: #064635;
		}

		.activityTable .header,
		.activities {
			padding: 10px 0px;
			/* border: 1px solid black; */
		}

		.header .dateColumn,
		.header .teacherColumn,
		.header .categoryColumn {
			font-weight: bolder;
		}

		.activities {
			height: 455px;
			overflow-y: auto;
		}

		.activityTable .header {
			padding: 0px 20px;
		}

		.activity {
			padding: 10px;
			border-radius: 10px;
			background-color: white;
			margin: 5px 0px;
			color: #65c18c;

			cursor: pointer;
			box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.11);
		}

		.activity .teacherColumn {
			font-weight: bolder;
		}
	}
</style>
