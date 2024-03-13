import { useDispatch } from "react-redux";
import { triggerRefetch } from "../../store/refetchSlice";
import apiService from "../../services/APIService";

export default function ItemDeleteModal({ itemId }) {
  const dispatch = useDispatch();

  async function deleteItem() {
    await apiService.reqDeleteItem(itemId);
    dispatch(triggerRefetch());
  }
  return (
    <div
      className="modal fade"
      id={`ItemDeleteModal${itemId}`}
      tabIndex="-1"
      aria-labelledby="ItemDeleteLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="ItemDeleteLabel">
              Modal title
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            Are you shure you want to delete this item?
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              onClick={deleteItem}
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
