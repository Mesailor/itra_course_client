import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiService from "../../services/APIService";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ItemsSchemaEditor from "./ItemsSchemaEditor";
import { triggerRefetch } from "../../store/refetchSlice";
import MDEditor from "@uiw/react-md-editor";

export default function CollEditModal({ collection }) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const [image, setImage] = useState(null);
  const [imagePath, setImagePath] = useState("");
  const [name, setName] = useState(collection.name);
  const [topic, setTopic] = useState(collection.topic);
  const [description, setDescription] = useState(collection.description);
  const [isLoading, setIsLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState({});
  const [itemsSchema, setItemsSchema] = useState(
    JSON.parse(collection.itemsSchema)
  );

  async function updateImage(e) {
    setImagePath(e.target.value);
    setImage(e.target.files[0]);
  }

  async function updateCollection() {
    if (isLoading) return;
    setIsLoading(true);

    let imageUrl = collection.imageUrl;
    if (image) {
      const imageRef = ref(storage, `coll_images/${user.id + collection.id}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }

    for (let name in itemsSchema) {
      itemsSchema[name] = itemsSchema[name].trim();
    }

    const newCollection = {
      name,
      topic,
      description,
      imageUrl,
      itemsSchema: JSON.stringify(itemsSchema),
    };
    try {
      const result = await apiService.reqUpdateColl(
        newCollection,
        collection.id
      );
      if (result.success) {
        setIsLoading(false);
        setResultMessage({ color: "green", message: result.message });
      } else {
        setIsLoading(false);
        setResultMessage({ color: "red", message: result.message });
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      setResultMessage({
        color: "red",
        message: "Sorry, unable to connect...",
      });
    }
    dispatch(triggerRefetch());
  }

  function resetResultMessage() {
    setResultMessage({});
  }

  return (
    <div
      className="modal fade"
      id={`CollEditModal${collection.id}`}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      onClick={resetResultMessage}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit collection
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={resetResultMessage}
            ></button>
          </div>
          <div className="modal-body">
            <div className="d-flex flex-column">
              <label htmlFor="image">Image: </label>
              <input
                onChange={updateImage}
                name="image"
                type="file"
                accept="image/png, image/jpeg"
                value={imagePath}
              />
              <label className="form-label" htmlFor="name">
                Name:
              </label>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="form-control"
                name="name"
                value={name}
                required
              />
              <label htmlFor="topic">Topic: </label>
              <select
                onChange={(e) => {
                  setTopic(e.target.value);
                }}
                name="topic"
                id="topic"
                value={topic}
              >
                <option value="books">Books</option>
                <option value="signs">Signs</option>
                <option value="silverware">Silverware</option>
                <option value="other">Other</option>
              </select>
              <div className="markdown-description">
                <label htmlFor="description">Description: </label>
                <div className="markdown" data-color-mode="light">
                  <MDEditor value={description} onChange={setDescription} />
                </div>
              </div>
            </div>
            <h5>Items in my collection will have fields:</h5>
            <ItemsSchemaEditor
              itemsSchema={itemsSchema}
              setItemsSchema={setItemsSchema}
            />
          </div>

          <div className="modal-footer">
            {isLoading ? (
              <div className="spinner-border m-auto" role="status"></div>
            ) : (
              <h5 className="m-auto" style={{ color: resultMessage.color }}>
                {resultMessage.message}
              </h5>
            )}
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={resetResultMessage}
            >
              Close
            </button>
            <button
              onClick={updateCollection}
              type="button"
              className="btn btn-primary"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
