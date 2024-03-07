import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiService from "../../services/APIService";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ItemsSchemaEditor from "./ItemsSchemaEditor";
import { triggerRefetch } from "../../store/refetchSlice";

export default function CollCreateModal() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const initialItemsSchema = {
    custom_str1_name: "",
    custom_str1_state: false,
    custom_str2_name: "",
    custom_str2_state: false,
    custom_str3_name: "",
    custom_str3_state: false,
    custom_int1_name: "",
    custom_int1_state: false,
    custom_int2_name: "",
    custom_int2_state: false,
    custom_int3_name: "",
    custom_int3_state: false,
    custom_bool1_name: "",
    custom_bool1_state: false,
    custom_bool2_name: "",
    custom_bool2_state: false,
    custom_bool3_name: "",
    custom_bool3_state: false,
    custom_date1_name: "",
    custom_date1_state: false,
    custom_date2_name: "",
    custom_date2_state: false,
    custom_date3_name: "",
    custom_date3_state: false,
    custom_multext1_name: "",
    custom_multext1_state: false,
    custom_multext2_name: "",
    custom_multext2_state: false,
    custom_multext3_name: "",
    custom_multext3_state: false,
  };
  const [itemsSchema, setItemsSchema] = useState(initialItemsSchema);

  const [image, setImage] = useState(null);
  const [imagePath, setImagePath] = useState("");
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("books");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState({});

  async function updateImage(e) {
    setImagePath(e.target.value);
    setImage(e.target.files[0]);
  }

  async function createCollection() {
    if (isLoading) return;
    setIsLoading(true);

    const newCollection = {
      user_id: user.id,
      name,
      topic,
      description,
      itemsSchema: JSON.stringify(itemsSchema),
    };
    try {
      const result = await apiService.reqCreateColl(newCollection);
      if (result.success) {
        let imageUrl;
        if (image) {
          const imageRef = ref(
            storage,
            `coll_images/${user.id + result.newCollection.id}`
          );
          await uploadBytes(imageRef, image);
          imageUrl = await getDownloadURL(imageRef);
          await apiService.updateImageUrl(imageUrl, result.newCollection.id);
        }

        setImage({});
        setImagePath("");
        setName("");
        setTopic("books");
        setDescription("");
        resetItemsShema();
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

  function resetItemsShema() {
    setItemsSchema(initialItemsSchema);
  }

  return (
    <div
      className="modal fade"
      id="CollCreateModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Create a new collection
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form className="d-flex flex-column">
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
              </select>
              <label htmlFor="description">Description: </label>
              <textarea
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                className="form-control"
                name="description"
                value={description}
                id="description"
                rows="4"
              ></textarea>
            </form>
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
              onClick={() => {
                setResultMessage({});
              }}
            >
              Close
            </button>
            <button
              onClick={createCollection}
              type="button"
              className="btn btn-primary"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
