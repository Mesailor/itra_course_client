import MDEditor from "@uiw/react-md-editor";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CollDeleteModal from "./CollDeleteModal";
import CollEditModal from "./CollEditModal";

export default function Collection({ collection }) {
  const user = useSelector((store) => store.user);
  return (
    <div className="bg-light card mb-3">
      <div className="row">
        <div className="col-md-3 pe-0">
          <img
            src={collection.imageUrl}
            className=" img-fluid rounded-start"
            alt="collection image"
          />
        </div>
        <div className="border-start col-md-9">
          <div className="card-body">
            <div className="row">
              <div className="mt-2 col-md-3 col-12">
                <h3 className="card-title ">{collection.name}</h3>
                <p className="card-text">
                  <small className="text-muted">{collection.topic}</small>
                </p>
                {collection.user_id === user.id ? (
                  <>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="CollectionManaging"
                    >
                      <Link
                        className="btn btn-success"
                        to={`/user/${collection.user_id}/collection/${collection.id}`}
                      >
                        Open
                      </Link>
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target={`#CollEditModal${collection.id}`}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-bs-toggle="modal"
                        data-bs-target={`#CollDeleteModal${collection.id}`}
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </div>
                  </>
                ) : (
                  <Link
                    className="btn btn-success"
                    to={`/user/${collection.user_id}/collection/${collection.id}`}
                  >
                    Open
                  </Link>
                )}
              </div>
              <div className="mt-2 col-lg-9 col-12">
                <div
                  className="description border border-1 p-1"
                  data-color-mode="light"
                >
                  <h6 className="text-secondary">Description: </h6>
                  <MDEditor.Markdown source={collection.description} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {collection.user_id === user.id ? (
        <div>
          <CollDeleteModal
            collectionId={collection.id}
            imageUrl={collection.imageUrl}
          />
          <CollEditModal collection={collection} />
        </div>
      ) : null}
    </div>
  );
}
