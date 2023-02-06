import http from "../http-common";

class GameService {
  getUserGames(id) {
    return http.get("/Games/user/" + id, {
      headers: {
        token: localStorage.getItem('loginToken')
      }
    });
  }
}
export default new GameService();