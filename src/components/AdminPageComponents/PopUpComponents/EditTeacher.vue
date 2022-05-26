<template>
	<v-dialog v-model="editTeacher" max-width="400" persistent>
		<v-card v-if="editTeacher">
			{{ getTeacher }}
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
			<v-card-title class="dialogTitle"> Edit Teacher </v-card-title>

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
						label="Grade Level"
						outlined
						color="#5aa67a"
						dense
						v-model="teacher.grade_level"
						:rules="[rules.required]"
					></v-text-field>
				</div>

				<div class="detail">
					<v-text-field
						label="Section"
						outlined
						color="#5aa67a"
						dense
						v-model="teacher.section"
						:rules="[rules.required]"
					></v-text-field>
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
					@click="saveDetails"
					>Save Details</v-btn
				>
			</div>

			<br />
		</v-card>
	</v-dialog>
</template>

<script>
	import teacherAPI from "../../../apis/teacherAPI";
	export default {
		props: {
			editTeacher: Boolean,
			data: Object,
		},
		data() {
			return {
				loading: false,
				gender: ["Male", "Female"],
				show: false,
				teacher: {},
				rules: {
					required: (value) => !!value || "Required.",
				},
			};
		},

		methods: {
			async saveDetails() {
				try {
					this.loading = true;
					const payload = Object.assign({}, this.teacher);

					const updated = await teacherAPI.prototype.updateTeacherDetails(
						payload.id,
						payload
					);
					this.loading = false;
					this.$emit("updateDialog", payload);
				} catch (error) {
					this.loading = false;
					this.$emit("updateDialog", error.message);
				}
			},

			close() {
				this.teacher = Object.assign({}, this.data);
				this.$emit("closeDialog");
			},

			clearFields() {
				this.teacher.first_name = "";
				this.teacher.last_name = "";
				this.teacher.gender = "";
				this.teacher.grade_level = "";
				this.teacher.section = "";
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
					this.teacher.grade_level &&
					this.teacher.section &&
					this.teacher.username &&
					this.teacher.password
				) {
					return false;
				} else {
					return true;
				}
			},

			getTeacher: function () {
				this.teacher = Object.assign({}, this.data);
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
