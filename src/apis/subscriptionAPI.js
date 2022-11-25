import axios from "axios";
const url = "https://feedbacts.onrender.com/api/subscriptions";
axios.defaults.headers.common["auth-token"] =
	"Bearer " + localStorage.getItem("token");

export default class API {
	async add(subscription) {
		const report = await axios.post(url + "/", subscription);
		return report;
	}

	async update(subscription) {
		const report = await axios.patch(url + "/", subscription);
		return report;
	}
}
