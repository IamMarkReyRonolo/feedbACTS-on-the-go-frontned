<template>
	<v-dialog v-model="clickGenerateReport" max-width="350" persistent>
		<v-card v-if="clickGenerateReport">
			<v-card-title class="dialogTitle"> Generate Report </v-card-title>
			<div class="detail">
				<v-text-field
					label="Report Title"
					outlined
					color="#5aa67a"
					dense
					v-model="title"
					:rules="[rules.required]"
				></v-text-field>
			</div>
			<div class="detail">
				<v-textarea
					label="Report Details"
					outlined
					color="#5aa67a"
					dense
					no-resize
					v-model="details"
				></v-textarea>
			</div>

			<div class="date">
				<div class="label">From</div>
				<input type="date" name="" id="" class="start" v-model="dates[0]" />
			</div>
			<div class="date">
				<div class="label">To</div>
				<input type="date" name="" id="" class="end" v-model="dates[1]" />
			</div>
			<br />
			<v-card-actions>
				<v-spacer></v-spacer>

				<v-btn color="green darken-1" text @click="cancel"> Cancel </v-btn>

				<v-btn
					color="green darken-1"
					@click="generateReport"
					:dark="validate"
					:disabled="!validate"
					:loading="loading"
				>
					Generate Report
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
	export default {
		props: {
			clickGenerateReport: Boolean,
		},
		data() {
			return {
				loading: false,
				title: "",
				details: "",
				dates: [],
				rules: {
					required: (value) => !!value || "Required.",
				},
			};
		},

		methods: {
			generateReport() {
				this.loading = true;
				setTimeout(() => {
					console.log(this.dates);
					this.dates = [];
					this.loading = false;
				}, 1000);
			},
			cancel() {
				this.dates = [];
				this.details = "";
				this.title = "";
				this.$emit("cancelReport");
			},
		},

		computed: {
			validate: function () {
				if (this.dates.length == 2 && this.title.trim()) {
					return true;
				}

				return false;
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

	.date {
		text-align: left;
		margin: 10px 20px;
	}

	.date .label {
		color: #5aa67a;
		font-weight: bold;
		font-size: 14px;
	}

	.date .start,
	.date .end {
		border: 1px solid #5aa67a;
		padding: 10px 20px;
		width: 100%;
		font-size: 18px;
		border-radius: 10px;
	}

	.detail {
		margin: 0px 20px;
	}
</style>
