import Vue from "vue";
import VueRouter from "vue-router";

import LogInPage from "../views/LogInPage.vue";
import AdminPage from "../views/AdminPage.vue";

import Dashboard from "../components/AdminPageComponents/MainComponents/Dashboard.vue";
import RecordActivity from "../components/AdminPageComponents/MainComponents/RecordActivity.vue";
Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "home",
		component: LogInPage,
	},
	{
		path: "/admin",
		name: "admin",
		component: AdminPage,
		children: [
			{
				path: "/",
				component: Dashboard,
			},
			{
				path: "teachers",
				// component: UserPosts,
			},
			{
				path: "history",
				// component: UserPosts,
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
