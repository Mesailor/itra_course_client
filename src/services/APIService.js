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

  async updateImageUrl(imageUrl, collectionId) {
    return await fetch(`${this.host}/collections/updateImageUrl`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload: { imageUrl, collectionId } }),
    }).then((response) => response.json());
  }

  async reqDeleteColl(collectionId) {
    return await fetch(`${this.host}/collections/delete`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload: collectionId }),
    });
  }

  async reqUpdateColl(newCollection, collectionId) {
    return await fetch(`${this.host}/collections/update`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload: { newCollection, collectionId } }),
    }).then((response) => response.json());
  }
}

export default new APIService();
