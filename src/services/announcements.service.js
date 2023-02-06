import http from "../http-common";
class AnnouncementService {
  getAll(search, page, rowsPerPage) {
    return http.get("/Announcements/",{
      params: {
        search: search,
        page: page,
        rowsPerPage: rowsPerPage
      }
    });
  }
  getNewest() {
    return http.get("/Announcements/newest");
  }
  addAnnounce(data) {
    return http.post("/Announcements", data, {
      headers: {
        token: localStorage.getItem('loginToken')
      }
    });
  }
  updateAnnounce(data) {
    return http.put("/Announcements", data, {
      headers: {
        token: localStorage.getItem('loginToken')
      }
    })
  }
  deleteAnnounceById(id) {
    return http.delete("/Announcements/" + id, {
      headers: {
        token: localStorage.getItem('loginToken')
      }
    });
  }
}
export default new AnnouncementService();