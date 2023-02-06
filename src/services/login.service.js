import http from "../http-common";
class LoginService {
  login(data) {
    return http.put("/Login/", data);
  }
  register(data) {
    return http.post("/Login", data);
  }
  getToken() {
    return http.get("/Login/", {
      headers: {
        token: localStorage.getItem('loginToken')
      }
    });
  }
}
export default new LoginService();