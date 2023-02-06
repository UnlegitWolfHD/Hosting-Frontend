import http from "../http-common";

class UserService {
  updateUser(ignore, user) {
    return http.put("/User/" + ignore, user, {
      headers: {
        token: localStorage.getItem('loginToken')
      }
    })
  }

  activateUser(user) {
    return http.put("/User/activate", user, {
      headers: {
        token: localStorage.getItem('loginToken')
      }
    })
  }

  lockUser(user, status) {
    return http.put("/User/lock/" + status, user, {
      headers: {
        token: localStorage.getItem('loginToken')
      }
    })
  }

  getAllUser(search, page, rowsPerPage) {
    return http.get("/User/", {
      headers: {
        token: localStorage.getItem('loginToken')
      },
      params: {
        search: search,
        page: page,
        rowsPerPage: rowsPerPage
      }
    });
  }
  getUserById(id) {
    return http.get("/User/" + id, {
      headers: {
        token: localStorage.getItem('loginToken')
      }
    });
  }
  deleteUserById(id) {
    return http.delete("/User/" + id, {
      headers: {
        token: localStorage.getItem('loginToken')
      }
    });
  }
}
export default new UserService();