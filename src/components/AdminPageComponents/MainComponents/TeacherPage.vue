<template>
	<div class="teacherPageCon">
		<div class="desktopView">
			<TeacherDesktop />
		</div>
		<div class="mobileView"><DashboardMobile /></div>
	</div>
</template>

<script>
	import DashboardMobile from "../ScreenView/DashboardMobile.vue";
	import TeacherDesktop from "../ScreenView/TeacherDesktop.vue";

	export default {
		components: { TeacherDesktop, DashboardMobile },
		data: () => ({}),
	};
</script>

<style scoped>
	.teacherPageCon {
		text-align: left;
		padding: 20px 40px;
	}
	.mobileView {
		display: none;
	}

	@media only screen and (max-width: 1100px) {
		.teacherPageCon {
			text-align: left;
			padding: 20px;
		}
	}

	@media only screen and (max-width: 700px) {
		.desktopView {
			display: none;
		}

		.mobileView {
			display: block;
		}
	}
</style>
