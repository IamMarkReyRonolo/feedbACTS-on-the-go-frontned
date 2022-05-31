import axios from "axios";
const url = "https://test-app-feedbacts.herokuapp.com/api/notifications";
axios.defaults.headers.common["auth-token"] =
	"Bearer " + localStorage.getItem("token");

export default class API {
	async createNotification(details) {
		const report = await axios.post(url + "/create", details);
		return report;
	}

	async getNotifications() {
		axios.defaults.headers.common["auth-token"] =
			"Bearer " + localStorage.getItem("token");
		const notifications = await axios.get(url + "/");
		return notifications;
	}

	async updateNotif(notif_id) {
		const notifications = await axios.patch(url + "/update/" + notif_id);
		return notifications;
	}
}
