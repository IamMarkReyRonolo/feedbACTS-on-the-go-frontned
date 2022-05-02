<template>
	<v-dialog v-model="changePass" max-width="350" persistent>
		<v-card>
			<v-btn
				fab
				x-small
				color="green darken-1"
				outlined
				@click="closeDialog"
				class="closeBtn"
			>
				<v-icon>mdi-close</v-icon>
			</v-btn>
			<v-card-title class="dialogTitle"> Change Password </v-card-title>

			<div class="inputPass">
				<v-text-field
					label="Current password"
					color="#5aa67a"
					:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
					:type="show1 ? 'text' : 'password'"
					@click:append="show1 = !show1"
					:rules="shouldNotEvaluated0 ? '' : [rules.required]"
					v-model="currentPassword"
					@click="shouldNotEvaluated0 = false"
				></v-text-field>
			</div>
			<div class="inputPass">
				<v-text-field
					label="New password"
					color="#5aa67a"
					:append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
					:type="show2 ? 'text' : 'password'"
					@click:append="show2 = !show2"
					:rules="shouldNotEvaluated1 ? '' : [rules.required, rules.min]"
					v-model="newPassword"
					@click="shouldNotEvaluated1 = false"
				></v-text-field>
			</div>
			<div class="inputPass">
				<v-text-field
					label="Repeat password"
					color="#5aa67a"
					:append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
					:type="show3 ? 'text' : 'password'"
					@click:append="show3 = !show3"
					:rules="shouldNotEvaluated2 ? '' : [rules.required, rules.match]"
					v-model="repeatPassword"
					@click="shouldNotEvaluated2 = false"
				></v-text-field>
			</div>
			<br />

			<div class="btn">
				<v-btn
					outlined
					large
					color="#5aa67a"
					@click="changePassword"
					:disabled="!isValid"
					:loading="loading"
					>Change Password</v-btn
				>
			</div>
			<br />
		</v-card>
	</v-dialog>
</template>

<script>
	export default {
		props: {
			changePass: Boolean,
		},
		data() {
			return {
				show1: false,
				show2: false,
				show3: false,
				dates: [],
				currentPassword: "",
				newPassword: "",
				repeatPassword: "",
				loading: false,
				shouldNotEvaluated0: true,
				shouldNotEvaluated1: true,
				shouldNotEvaluated2: true,
				rules: {
					required: (value) => !!value || "Required.",
					min: (v) => v.length >= 8 || "Min 8 characters",
					match: (v) =>
						v == this.newPassword || `The password you entered don't match`,
				},
			};
		},

		methods: {
			changePassword() {
				this.loading = true;
				setTimeout(() => {
					this.currentPassword = "";
					this.newPassword = "";
					this.repeatPassword = "";
					this.loading = false;
					this.$emit("closeDialog");
				}, 1000);
			},

			closeDialog() {
				this.currentPassword = "";
				this.newPassword = "";
				this.repeatPassword = "";
				this.shouldNotEvaluated0 = true;
				this.shouldNotEvaluated1 = true;
				this.shouldNotEvaluated2 = true;
				this.$emit("closeDialog");
			},
		},

		computed: {
			isValid: function () {
				if (
					this.currentPassword != "" &&
					this.newPassword != "" &&
					this.newPassword.length >= 8
				) {
					if (this.newPassword == this.repeatPassword) {
						this.shouldNotEvaluated0 = true;
						this.shouldNotEvaluated1 = true;
						this.shouldNotEvaluated2 = true;
						return true;
					}
				} else {
					return false;
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

	.inputPass {
		text-align: left;
		margin: 0px 30px;
	}

	.inputPass .label {
		color: #5aa67a;
		font-weight: bold;
		font-size: 14px;
	}
</style>
