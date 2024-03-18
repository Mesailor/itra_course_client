import MDEditor from "@uiw/react-md-editor";
import CollDeleteModal from "./CollDeleteModal";
import CollEditModal from "./CollEditModal";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Collection({ collection }) {
  const user = useSelector((store) => store.user);
  return (
    <div className="collection">
      <img
        className="collection-image"
        src={collection.imageUrl}
        alt="collection-image"
      />
      <h3 className="name">Name: {collection.name}</h3>
      <i className="topic">Topic: {collection.topic}</i>
      <div className="description" data-color-mode="light">
        <h6>Description: </h6>
        <MDEditor.Markdown source={collection.description} />
      </div>
      <Link to={`/user/${collection.user_id}/collection/${collection.id}`}>
        View collection
      </Link>

      {collection.user_id === user.id ? (
        <>
          <button
            type="button"
            className="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target={`#CollDeleteModal${collection.id}`}
          >
            Delete
          </button>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target={`#CollEditModal${collection.id}`}
          >
            Edit
          </button>
          <CollDeleteModal collectionId={collection.id} />
          <CollEditModal collection={collection} />
        </>
      ) : null}
    </div>
  );
}
