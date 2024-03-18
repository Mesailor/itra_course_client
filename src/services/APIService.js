import { APIServiceConfig } from "../../config/config";

class APIService {
  host = APIServiceConfig.host;

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

  async getAllCollections(user_id) {
    return await fetch(`${this.host}/collections/${user_id}`).then((response) =>
      response.json()
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

  async getItems(collectionId) {
    return await fetch(`${this.host}/items/${collectionId}`).then((response) =>
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
      body: JSON.stringify({ payload: newItem }),
    }).then((response) => response.json());
  }

  async reqDeleteItem(itemId) {
    return await fetch(`${this.host}/items/delete`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload: itemId }),
    });
  }

  async reqEditItem(newItem, itemId) {
    return await fetch(`${this.host}/items/update`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload: { newItem, itemId } }),
    }).then((response) => response.json());
  }
}

export default new APIService();
