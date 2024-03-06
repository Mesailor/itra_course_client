import { APIServiceConfig } from "../../config/config";

class APIService {
  host = APIServiceConfig.host;

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

  async getOwnCollections(user_id) {
    return await fetch(`${this.host}/collections/${user_id}`).then((response) =>
      response.json()
    );
  }

  async reqCreateColl(newCollection) {
    return await fetch(`${this.host}/collections/create`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload: newCollection }),
    }).then((response) => response.json());
  }

  async reqDeleteColl(collectionId) {
    return await fetch(`${this.host}/collections/delete`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload: collectionId }),
    });
  }
}

export default new APIService();
