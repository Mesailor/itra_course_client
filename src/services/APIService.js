import { APIServiceConfig } from "../../config/config";

class APIService {
  host = APIServiceConfig.host;

  #getSessionJwt() {
    return JSON.parse(window.sessionStorage.getItem("user")).jwt;
  }

  async sendAuthReq(userCredentials) {
    return await fetch(`${this.host}/account`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    }).then((response) => response.json());
  }

  async sendSignupReq(newUser) {
    return await fetch(`${this.host}/account/signup`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).then((response) => response.json());
  }

  async getUsers() {
    return await fetch(`${this.host}/users`).then((response) =>
      response.json()
    );
  }

  async getAllCollections(user_id) {
    return await fetch(`${this.host}/collections/user-${user_id}`).then(
      (response) => response.json()
    );
  }

  async getCollection(collectionId) {
    return await fetch(`${this.host}/collections/one/${collectionId}`).then(
      (response) => response.json()
    );
  }

  async getManyCollections(collectionIds) {
    return await fetch(`${this.host}/collections/many`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload: collectionIds }),
    }).then((response) => response.json());
  }

  async getFiveLargestColls() {
    return await fetch(`${this.host}/collections/largest`).then((response) =>
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
      body: JSON.stringify({
        token: this.#getSessionJwt(),
        payload: newCollection,
      }),
    }).then((response) => response.json());
  }

  async updateImageUrl(imageUrl, collectionId) {
    return await fetch(`${this.host}/collections/updateImageUrl`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: this.#getSessionJwt(),
        payload: { imageUrl, collectionId },
      }),
    }).then((response) => response.json());
  }

  async reqDeleteColl(collectionId) {
    return await fetch(`${this.host}/collections/delete`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: this.#getSessionJwt(),
        payload: { collectionId },
      }),
    }).then((response) => response.json());
  }

  async reqUpdateColl(newCollection, collectionId) {
    return await fetch(`${this.host}/collections/update`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: this.#getSessionJwt(),
        payload: { newCollection, collectionId },
      }),
    }).then((response) => response.json());
  }

  async getItems(collectionId) {
    return await fetch(`${this.host}/items/${collectionId}`).then((response) =>
      response.json()
    );
  }

  async getItem(itemId) {
    return await fetch(`${this.host}/items/one/${itemId}`).then((response) =>
      response.json()
    );
  }

  async reqCreateItem(newItem) {
    return await fetch(`${this.host}/items/create`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: this.#getSessionJwt(), payload: newItem }),
    }).then((response) => response.json());
  }

  async reqDeleteItem(itemId) {
    return await fetch(`${this.host}/items/delete`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: this.#getSessionJwt(),
        payload: { itemId },
      }),
    });
  }

  async reqEditItem(newItem, itemId) {
    return await fetch(`${this.host}/items/update`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: this.#getSessionJwt(),
        payload: { newItem, itemId },
      }),
    }).then((response) => response.json());
  }
}

export default new APIService();
