class APIService {
  host = "http://localhost:3004";

  async sendAuthReq(userCredentials) {
    return await fetch(`${this.host}/auth`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    }).then((response) => response.json());
  }

  async sendSignupReq(newUser) {
    return await fetch(`${this.host}/signup`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).then((response) => response.json());
  }
}

export default new APIService();
