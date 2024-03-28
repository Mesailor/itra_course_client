import { useDispatch, useSelector } from "react-redux";
import apiService from "../../services/APIService";
import { triggerRefetch } from "../../store/refetchSlice";
import { storage } from "../../firebase";
import { deleteObject, ref } from "firebase/storage";
import { fireStoreConfig } from "../../../config/config";

export default function CollDeleteModal({ collectionId, imageUrl }) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  async function deleteCollection() {
    try {
      const result = await apiService.reqDeleteColl(collectionId);
      if (
        result.success &&
        imageUrl !==
          "https://firebasestorage.googleapis.com/v0/b/itra-collections.appspot.com/o/default%2Fdefault_collection_image.jpg?alt=media&token=7389f98e-03bc-4a79-8880-10009d41d818https://firebasestorage.googleapis.com/v0/b/itra-collections.appspot.com/o/default%2Fdefault_collection_image.jpg?alt=media&token=baa0b64d-28d3-45e0-900a-a482cfddac18"
      ) {
        await deleteObject(
          ref(storage, `${fireStoreConfig.directory}/${user.id + collectionId}`)
        );
      }
      dispatch(triggerRefetch());
    } catch (e) {
      console.log(e);
      alert("Problem occurred while deleting");
    }
  }
  return (
    <div
      className="modal fade"
      id={`CollDeleteModal${collectionId}`}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Delete collection
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            Are you shure you want to delete this collection?
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              onClick={deleteCollection}
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
