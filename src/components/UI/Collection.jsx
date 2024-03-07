import CollDeleteModal from "./CollDeleteModal";
import CollEditModal from "./CollEditModal";

export default function Collection({ collection }) {
  return (
    <div className="collection">
      <img
        className="collection-image"
        src={collection.imageUrl}
        alt="collection-image"
      />
      <h3 className="name">Name: {collection.name}</h3>
      <i className="topic">Topic: {collection.topic}</i>
      <p className="description">Description: {collection.description}</p>

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
    </div>
  );
}
