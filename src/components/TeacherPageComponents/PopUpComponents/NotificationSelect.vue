<template>
	<v-dialog v-model="showNotif" max-width="500" persistent>
		<v-card>
			<div class="notifCon">
				<v-btn
					fab
					x-small
					color="green darken-1"
					dark
					@click="$emit('closeNotif', data.status)"
					class="closeBtn"
				>
					<v-icon>mdi-close</v-icon>
				</v-btn>

				<v-card-title
					class="dialogTitle"
					v-if="data.notification_type == 'feedback'"
				>
					Admin Feedback
				</v-card-title>

				<v-card-title
					class="dialogTitle"
					v-if="data.notification_type != 'feedback'"
				>
					Buzzer Sounded
				</v-card-title>

				<div class="content">
					<v-text-field
						label="Date"
						outlined
						dense
						readonly
						v-model="data.date_created"
						color="#5AA67A"
					></v-text-field>

					<v-textarea
						label="Date"
						outlined
						dense
						readonly
						height="200px"
						color="#5AA67A"
						v-model="data.message"
					></v-textarea>
				</div>
			</div>
		</v-card>
	</v-dialog>
</template>

<script>
	export default {
		props: {
			data: Object,
			showNotif: Boolean,
		},
		data() {
			return {
				loading: false,
			};
		},

		methods: {},
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

	.closeBtn {
		position: absolute;
		top: 10px;
		right: 10px;
	}

	.notifCon {
		height: 400px;
		background-color: white;
		overflow-y: auto;
		padding-bottom: 10px;
	}

	.content {
		padding: 20px;
		padding-top: 5px;
	}

	.subtitle {
		color: #5aa67a;

		padding-bottom: 20px;
	}
</style>
