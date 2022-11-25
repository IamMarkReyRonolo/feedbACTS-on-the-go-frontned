import axios from "axios";
const url = "https://feedbacts.onrender.com/api/user";
axios.defaults.headers.common["auth-token"] =
	"Bearer " + localStorage.getItem("token");

export default class API {
	async createTeacher(credentials) {
		const teacher = await axios.post(url + "/signUp", credentials);
		return teacher;
	}

	async getAllTeachers() {
		axios.defaults.headers.common["auth-token"] =
			"Bearer " + localStorage.getItem("token");
		const teachers = await axios.get(url + "/all");
		return teachers;
	}

	async getAllWithinRange(payload) {
		axios.defaults.headers.common["auth-token"] =
			"Bearer " + localStorage.getItem("token");
		const teachers = await axios.post(url + "/getAllWithinRange", payload);
		return teachers;
	}

	async getSpecificTeacher() {
		axios.defaults.headers.common["auth-token"] =
			"Bearer " + localStorage.getItem("token");
		const teacher = await axios.get(url + "/getSpecific");
		return teacher;
	}

	async signInTeacher(credentials) {
		const teacher = await axios.post(url + "/signIn", credentials);
		return teacher;
	}

	async updateTeacherDetails(teacher_id, updated_details) {
		const teacher = await axios.patch(url + "/" + teacher_id, updated_details);
		return teacher;
	}

	async updateUserPassword(updatedDetails) {
		const result = await axios.patch(url + "/update/password", updatedDetails);

		return result;
	}

	async deleteTeacher(teacher_id) {
		const teacher = await axios.delete(url + "/" + teacher_id);
		return teacher;
	}
}
