<template>
	<v-dialog v-model="deleteTeacher" max-width="320" persistent>
		<v-card>
			<v-card-title class="dialogTitle"> Delete Teacher? </v-card-title>

			<v-card-text class="dialogContent">
				This action cannot be undone. Do you want to delete this teacher name
				<b>{{ this.teacher.first_name }} {{ this.teacher.last_name }}</b> , from
				the system? All Activities associated with this teacher will be deleted
				also.
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
	import teacherAPI from "../../../apis/teacherAPI";
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
			async deleteT() {
				try {
					this.loading = true;
					const deleted = await teacherAPI.prototype.deleteTeacher(
						this.teacher.id
					);
					this.loading = false;
					this.$router.push("/");
				} catch (error) {
					this.$emit("closeDeleteDialog", error.message);
					this.loading = false;
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
		text-align: justify;
	}
</style>
