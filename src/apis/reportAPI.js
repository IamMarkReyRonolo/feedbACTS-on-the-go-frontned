import axios from "axios";
const url = "https://feedbacts.onrender.com/api/report";
axios.defaults.headers.common["auth-token"] =
	"Bearer " + localStorage.getItem("token");

export default class API {
	async createReport(details) {
		const report = await axios.post(url + "/create", details);
		return report;
	}

	async getAllReport() {
		axios.defaults.headers.common["auth-token"] =
			"Bearer " + localStorage.getItem("token");
		const reports = await axios.get(url + "/all");
		return reports;
	}

	async getSpecificReport(report_id) {
		axios.defaults.headers.common["auth-token"] =
			"Bearer " + localStorage.getItem("token");
		const report = await axios.get(url + "/" + report_id);
		return report;
	}

	async deleteSpecificReport(report_id) {
		const report = await axios.delete(url + "/delete/" + report_id);
		return report;
	}
}
