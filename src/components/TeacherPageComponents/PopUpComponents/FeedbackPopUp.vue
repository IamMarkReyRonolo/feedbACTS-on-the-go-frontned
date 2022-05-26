<template>
	<v-dialog v-model="viewFeedback" max-width="400" persistent>
		<v-card>
			<v-btn
				fab
				x-small
				color="green darken-1"
				outlined
				@click="$emit('closeFeedback')"
				class="closeBtn"
			>
				<v-icon>mdi-close</v-icon>
			</v-btn>
			<v-card-title class="dialogTitle"> Feedback </v-card-title>

			<div class="con">
				<v-textarea
					v-model="feedback"
					readonly
					hide-selected
					outlined
					color="#5aa67a"
					label="Feedback"
					persistent-hint
					multiple
				>
				</v-textarea>
			</div>

			<br />
		</v-card>
	</v-dialog>
</template>

<script>
	export default {
		props: {
			feedback: Array,
			viewFeedback: Boolean,
		},
		data() {
			return {};
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

	.con {
		padding: 20px;
	}
</style>
