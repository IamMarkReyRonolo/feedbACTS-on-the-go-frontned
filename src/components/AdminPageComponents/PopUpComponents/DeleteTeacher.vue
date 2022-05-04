<template>
	<v-dialog v-model="deleteTeacher" max-width="320" persistent>
		<v-card>
			<v-card-title class="dialogTitle"> Delete Teacher? </v-card-title>

			<v-card-text class="dialogContent">
				This action cannot be undone. Do you want to delete this teacher named
				<b>{{ this.teacher.first_name }} {{ this.teacher.last_name }}</b> , from
				the system?
			</v-card-text>

			<v-card-actions>
				<v-spacer></v-spacer>

				<v-btn color="green darken-1" text @click="$emit('closeDeleteDialog')">
					Cancel
				</v-btn>

				<v-btn color="error" @click="deleteT" dark :loading="loading">
					Delete
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
	export default {
		props: {
			deleteTeacher: Boolean,
			teacher: Object,
		},
		data() {
			return {
				loading: false,
			};
		},

		methods: {
			deleteT() {
				this.loading = true;
				setTimeout(() => {
					this.loading = false;
					this.$emit("closeDeleteDialog");
				}, 1000);
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
		text-align: justify;
	}
</style>
