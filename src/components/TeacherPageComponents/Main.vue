<template>
	<div class="mainCon">
		<router-view />
	</div>
</template>

<script>
	export default {
		components: {},
		data: () => ({}),
	};
</script>

<style scoped>
	.mainCon {
		background-color: #f4f4f4;
		padding: 0px 40px;
	}

	@media only screen and (max-width: 1100px) {
		/* For mobile phones: */
		.mainCon {
			padding: 0px 20px;
		}
	}

	@media only screen and (max-width: 765px) {
		.mainCon {
			padding: 0px;
		}
	}
</style>
