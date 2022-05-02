import Vue from "vue";
import VueRouter from "vue-router";

import LogInPage from "../views/LogInPage.vue";
import AdminPage from "../views/AdminPage.vue";

import Dashboard from "../components/AdminPageComponents/MainComponents/Dashboard.vue";
import RecordActivity from "../components/AdminPageComponents/MainComponents/RecordActivity.vue";
import TeacherPage from "../components/AdminPageComponents/MainComponents/TeacherPage.vue";
import HistoryPage from "../components/AdminPageComponents/MainComponents/HistoryPage.vue";
import TeacherProfile from "../components/AdminPageComponents/MainComponents/TeacherProfile.vue";
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
		],
	},

	{
		path: "/recordActivity",
		component: RecordActivity,
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
