import axios from "axios";
const url = "http://localhost:3000/api/activity";
axios.defaults.headers.common["auth-token"] =
	"Bearer " + localStorage.getItem("token");

export default class API {
	async createActivity(teacher_id, details) {
		const activity = await axios.post(url + "/create/" + teacher_id, details);
		return activity;
	}

	async getAllActivities() {
		axios.defaults.headers.common["auth-token"] =
			"Bearer " + localStorage.getItem("token");
		const activities = await axios.get(url + "/admin/all");
		return activities;
	}

	async updateActivity(activity_id, updated_details) {
		const activity = await axios.patch(
			url + "/" + activity_id,
			updated_details
		);
		return activity;
	}

	async getSpecificActivity(activity_id) {
		axios.defaults.headers.common["auth-token"] =
			"Bearer " + localStorage.getItem("token");
		const activity = await axios.get(url + "/" + activity_id);
		return activity;
	}

	async deleteSpecificActivity(activity_id) {
		const activity = await axios.delete(url + "/" + activity_id);
		return activity;
	}
}
