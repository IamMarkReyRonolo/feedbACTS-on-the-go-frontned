<template>
	<v-dialog v-model="clickSettings" max-width="300" persistent>
		<v-card>
			<v-btn
				fab
				x-small
				color="green darken-1"
				outlined
				@click="$emit('closeSettings')"
				class="closeBtn"
			>
				<v-icon>mdi-close</v-icon>
			</v-btn>
			<v-card-title class="dialogTitle"> Settings </v-card-title>

			<div class="btn">
				<v-btn outlined large color="#5aa67a" @click="$emit('changePassword')"
					>Change Password</v-btn
				>
			</div>

			<div class="btn">
				<v-btn dark large color="#5aa67a" @click="logOut">Log Out</v-btn>
			</div>
			<br />
		</v-card>
	</v-dialog>
</template>

<script>
	export default {
		props: {
			clickSettings: Boolean,
		},
		data() {
			return {
				dates: [],
			};
		},
		methods: {
			logOut() {
				localStorage.removeItem("user");
				localStorage.removeItem("token");
				this.$router.push("/");
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
</style>
