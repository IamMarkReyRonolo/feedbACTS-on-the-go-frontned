<template>
	<div class="logInPage">
		<v-row no-gutters>
			<v-col cols="12" md="5"
				><div class="logInContainer" v-if="!load">
					<div class="header">
						<div class="logoCon">
							<img src="../assets/recycling.png" alt="" srcset="" />
						</div>
						<h1>LOG IN</h1>
						<h3 v-if="!this.loginAsTeacher">For Admin</h3>
						<h3 v-if="this.loginAsTeacher">For Teacher</h3>
					</div>

					<v-form ref="form" v-model="valid" lazy-validation>
						<div class="inputCon">
							<v-text-field
								label="Username"
								color="#5aa67a"
								v-model="username"
								:rules="[rules.required]"
								required
							></v-text-field>
						</div>
						<div class="inputCon">
							<v-text-field
								label="Password"
								color="#5aa67a"
								v-model="password"
								:append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
								:rules="[rules.required]"
								:type="show ? 'text' : 'password'"
								@click:append="show = !show"
								required
							></v-text-field>
						</div>
						<br />
						<div class="btnsCon">
							<v-btn text large color="#064635" @click="login">
								<span v-if="!logInLoading"> LOG IN</span>
								<v-progress-circular
									indeterminate
									color="green"
									v-if="logInLoading"
								></v-progress-circular
							></v-btn>
							<p>OR</p>

							<v-btn
								color="#064635"
								dark
								v-if="!this.loginAsTeacher"
								@click="switchUser('teacher')"
								>Teacher Log in</v-btn
							>
							<v-btn
								color="#064635"
								dark
								v-if="this.loginAsTeacher"
								@click="switchUser('admin')"
								>Admin Log in</v-btn
							>
						</div>
					</v-form>
				</div>
				<div class="loading" v-if="load">
					<v-progress-circular
						:size="50"
						color="#5aa67a"
						indeterminate
					></v-progress-circular>
				</div>
			</v-col>
			<v-col cols="12" md="7"
				><div class="detailsCon">
					<v-row no-gutters class="rowCon">
						<v-col cols="12" md="6">
							<div class="details">
								<h1 class="titleHeader">FeedbACTS on the GO</h1>
								<div class="subTitle">
									Feedbacks and Concurrent Tracking System on Garbage
									Orderliness.
								</div>
								<div class="sub">
									An initiative of Sacub National High School
								</div>
							</div></v-col
						>
						<v-col cols="12" md="4"
							><div class="imgCon">
								<img src="../assets/Ellipse2.png" alt="" srcset="" /></div
						></v-col>
					</v-row></div
			></v-col>
		</v-row>

		<v-snackbar v-model="snackbar" :timeout="timeout">
			{{ errorMessage }}

			<template v-slot:action="{ attrs }">
				<v-btn color="#5aa67a" text v-bind="attrs" @click="snackbar = false">
					Close
				</v-btn>
			</template>
		</v-snackbar>
	</div>
</template>

<script>
	import adminAPI from "../apis/adminAPI";
	import teacherAPI from "../apis/teacherAPI";
	export default {
		data: () => ({
			valid: true,
			username: "",
			password: "",
			loginAsTeacher: false,
			show: false,
			load: false,
			snackbar: false,
			timeout: 2000,
			errorMessage: "",
			logInLoading: false,
			rules: {
				required: (value) => !!value || "Required.",
			},
		}),

		methods: {
			switchUser(userToSwitch) {
				this.load = true;
				this.username = "";
				this.password = "";
				setTimeout(() => {
					if (userToSwitch == "teacher") {
						this.loginAsTeacher = true;
					} else {
						this.loginAsTeacher = false;
					}
					this.load = false;
				}, 500);
			},

			async login() {
				if (this.$refs.form.validate()) {
					this.logInLoading = true;
					const credentials = {
						username: this.username,
						password: this.password,
					};
					if (this.loginAsTeacher) {
						await this.teacherLogin(credentials);
					} else {
						await this.adminLogin(credentials);
					}
					this.logInLoading = false;
				}
			},

			async adminLogin(credentials) {
				try {
					const result = await adminAPI.prototype.signInAdmin(credentials);
					localStorage.setItem("token", result.data.admin.token);
					localStorage.setItem("user", "admin");
					this.$router.push("/admin");
				} catch (error) {
					if (error.message == "Network Error") {
						this.errorMessage = "Network Error";
					} else {
						this.errorMessage = "Incorrect credentials";
					}
					this.snackbar = true;
				}
			},

			async teacherLogin(credentials) {
				try {
					const result = await teacherAPI.prototype.signInTeacher(credentials);
					localStorage.setItem("token", result.data.user.token);
					localStorage.setItem("user", "teacher");
					this.$router.push("/teacher");
				} catch (error) {
					if (error.message == "Network Error") {
						this.errorMessage = "Network Error";
					} else {
						this.errorMessage = "Incorrect credentials";
					}
					this.snackbar = true;
				}
			},
		},

		created() {
			if (localStorage.getItem("token")) {
				if (localStorage.getItem("user") == "admin") {
					this.$router.push("/admin");
				}

				if (localStorage.getItem("user") == "teacher") {
					this.$router.push("/teacher");
				}
			}
		},
	};
</script>

<style scoped>
	.logInPage {
		display: flex;
		height: 100%;
	}

	.logInContainer {
		background-color: rgb(255, 255, 255);
		padding: 40px 0px;
		padding-top: 0px;
	}

	.detailsCon {
		background-color: #5aa67a;
	}

	.logInContainer,
	.detailsCon,
	.loading {
		min-height: 100vh;
	}

	.logoCon img {
		width: 100px;
		margin-top: -20px;
		margin-bottom: 20px;
	}

	.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.inputCon {
		width: 300px;
		margin: auto;
		margin: 10px auto;
	}

	.logInContainer h1 {
		color: #064635;
	}

	.logInContainer h3,
	.logInContainer p {
		color: #5aa67a;
	}

	.header {
		padding: 50px;
		padding-top: 80px;
	}

	.v-text-field >>> input {
		font-size: 18px;
		font-weight: 100;
		padding: 20px 0px;
	}

	/* ---------------- */

	.detailsCon {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		padding: 5%;
	}

	.details {
		display: flex;
		text-align: left;
		flex-direction: column;
	}

	/* .imgCon {
		border: 2px solid black;
	} */

	img {
		width: 200px;
	}

	.titleHeader,
	.subTitle,
	.sub {
		color: white;
	}

	.titleHeader {
		font-size: 2em;
		margin: 20px 0px;
	}

	.subTitle {
		font-size: 1.3em;
		margin: 5px 0px;
	}

	.rowCon {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	@media only screen and (max-width: 500px) {
		/* For mobile phones: */
		.logInContainer {
			border-bottom: 10px solid #5aa67a;
		}

		.details {
			display: flex;
			text-align: center;
			flex-direction: column;
		}
	}
</style>
