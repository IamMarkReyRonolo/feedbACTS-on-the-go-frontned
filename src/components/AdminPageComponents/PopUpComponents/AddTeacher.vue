<template>
	<v-dialog v-model="addTeacher" max-width="400" persistent>
		<v-card v-if="addTeacher">
			<v-btn
				fab
				x-small
				color="green darken-1"
				outlined
				@click="close"
				class="closeBtn"
			>
				<v-icon>mdi-close</v-icon>
			</v-btn>
			<v-card-title class="dialogTitle"> Add Teacher </v-card-title>

			<div class="main">
				<div class="detail">
					<v-text-field
						label="First name"
						outlined
						color="#5aa67a"
						dense
						v-model="teacher.first_name"
						:rules="[rules.required]"
					></v-text-field>
				</div>
				<div class="detail">
					<v-text-field
						label="Last name"
						outlined
						color="#5aa67a"
						dense
						v-model="teacher.last_name"
						:rules="[rules.required]"
					></v-text-field>
				</div>

				<div class="detail">
					<v-select
						label="Gender"
						outlined
						color="#5aa67a"
						dense
						v-model="teacher.gender"
						:items="gender"
						:rules="[rules.required]"
					></v-select>
				</div>

				<div class="detail">
					<v-text-field
						label="Username"
						outlined
						color="#5aa67a"
						dense
						v-model="teacher.username"
						:rules="[rules.required]"
					></v-text-field>
				</div>
				<div class="detail">
					<v-text-field
						label="Password"
						outlined
						color="#5aa67a"
						dense
						v-model="teacher.password"
						:append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
						:type="show ? 'text' : 'password'"
						@click:append="show = !show"
						:rules="[rules.required]"
					></v-text-field>
				</div>
			</div>
			<div class="btn">
				<v-btn
					large
					:dark="!isdisabled"
					color="#5aa67a"
					:loading="loading"
					:disabled="isdisabled"
					@click="addNewTeacher"
					>Add Teacher</v-btn
				>
			</div>

			<br />
		</v-card>
	</v-dialog>
</template>

<script>
	import teacherAPI from "../../../apis/teacherAPI.js";
	export default {
		props: {
			addTeacher: Boolean,
		},
		data() {
			return {
				loading: false,
				teacher: {
					first_name: "",
					last_name: "",
					gender: "",
					username: "",
					password: "",
				},
				gender: ["Male", "Female"],
				show: false,

				rules: {
					required: (value) => !!value || "Required.",
				},
			};
		},

		methods: {
			async addNewTeacher() {
				this.loading = true;
				try {
					this.teacher.code = this.generateCode();
					const teacher = await teacherAPI.prototype.createTeacher(
						this.teacher
					);
					this.loading = false;
					this.clearFields();
					this.$emit("closeDialog", teacher.data.user);
				} catch (error) {
					this.loading = false;
					this.clearFields();
					if (error.message == "Network Error") {
						this.$emit("closeDialog", "Network Error");
					} else {
						this.$emit("closeDialog", "Failed. Username already exists");
					}
				}
			},

			generateCode() {
				let result = "";
				let characters =
					"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
				let charactersLength = characters.length;
				for (var i = 0; i < 7; i++) {
					result += characters.charAt(
						Math.floor(Math.random() * charactersLength)
					);
				}
				return result;
			},

			close() {
				this.clearFields();
				this.$emit("closeDialog");
			},

			clearFields() {
				this.teacher.first_name = "";
				this.teacher.last_name = "";
				this.teacher.gender = "";
				this.teacher.username = "";
				this.teacher.password = "";
			},
		},

		computed: {
			isdisabled: function () {
				if (
					this.teacher.first_name &&
					this.teacher.last_name &&
					this.teacher.gender &&
					this.teacher.username &&
					this.teacher.password
				) {
					return false;
				} else {
					return true;
				}
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
		text-align: left;
	}
	.btn {
		padding: 5px 40px;
	}
	.btn .v-btn {
		width: 100%;
	}

	.closeBtn {
		position: absolute;
		top: 10px;
		right: 10px;
	}

	.main {
		padding: 20px;
	}

	.upperDetails {
		display: flex;
	}

	.detail {
		margin: 0px 10px;
	}
</style>
