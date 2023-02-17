import http from "../http-common";
class ProxmoxService {
  getAllKvmTemplates() {
    return http.get("/kvm/templates");
  }
  getKvmParams() {
    return http.get("/kvm/params");
  }
  createKvm(data) {
    return http.post("/kvm", data, {
      headers: {
        token: localStorage.getItem('loginToken')
      }
    });
  }
}
export default new ProxmoxService();