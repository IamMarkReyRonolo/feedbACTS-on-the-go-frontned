import Vue from "vue";
import VueRouter from "vue-router";

import LogInPage from "../views/LogInPage.vue";
import AdminPage from "../views/AdminPage.vue";
import TeacherUserPage from "../views/TeacherPage.vue";

import Dashboard from "../components/AdminPageComponents/MainComponents/Dashboard.vue";
import RecordActivity from "../components/AdminPageComponents/MainComponents/RecordActivity.vue";
import TeacherPage from "../components/AdminPageComponents/MainComponents/TeacherPage.vue";
import HistoryPage from "../components/AdminPageComponents/MainComponents/HistoryPage.vue";
import TeacherProfile from "../components/AdminPageComponents/MainComponents/TeacherProfile.vue";
import ReportPage from "../components/AdminPageComponents/MainComponents/ReportPage.vue";

import PrintCard from "../components/AdminPageComponents/PopUpComponents/PrintCard.vue";
import TeacherDashboard from "../components/TeacherPageComponents/MainComponents/TeacherDashboard.vue";
import TeacherUserProfile from "../components/TeacherPageComponents/MainComponents/TeacherProfile.vue";
import TeacherQR from "../components/TeacherPageComponents/MainComponents/TeacherQR.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "home",
		component: LogInPage,
	},
	{
		path: "/admin",
		component: AdminPage,
		children: [
			{
				name: "dashboard",
				path: "/",
				component: Dashboard,
			},
			{
				name: "teachers",
				path: "teachers",
				component: TeacherPage,
			},
			{
				name: "teachersProfile",
				path: "teachers/profile",
				component: TeacherProfile,
			},
			{
				name: "history",
				path: "history",
				component: HistoryPage,
			},

			{
				path: "report/reportid",
				component: ReportPage,
			},
		],
	},

	{
		path: "/recordActivity",
		component: RecordActivity,
	},

	{
		path: "/printCard",
		component: PrintCard,
	},

	{
		path: "/teacher",
		component: TeacherUserPage,
		children: [
			{
				path: "/",
				component: TeacherDashboard,
			},
			{
				path: "profile",
				component: TeacherUserProfile,
			},
		],
	},

	{
		path: "/teacher-details",
		component: TeacherQR,
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
