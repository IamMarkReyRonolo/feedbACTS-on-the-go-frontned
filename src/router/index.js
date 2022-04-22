import Vue from "vue";
import VueRouter from "vue-router";
import LogInPage from "../views/LogInPage.vue";
import AdminPage from "../views/AdminPage.vue";

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
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
