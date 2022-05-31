import axios from "axios";
const url = "https://test-app-feedbacts.herokuapp.com/api/admin";
axios.defaults.headers.common["auth-token"] =
	"Bearer " + localStorage.getItem("token");

export default class API {
	async getAdminDetails() {
		axios.defaults.headers.common["auth-token"] =
			"Bearer " + localStorage.getItem("token");
		const admin = await axios.get(url + "/");
		return admin;
	}

	async signInAdmin(credentials) {
		const admin = await axios.post(url + "/signIn", credentials);
		return admin;
	}

	async updateAdminPassword(updatedDetails) {
		const result = await axios.patch(url + "/update", updatedDetails);

		return result;
	}

	async clickBuzzer(notif) {
		console.log(notif);
		const result = await axios.patch(url + "/buzzer/", notif);
		return result;
	}
}
