import CollDeleteModal from "./CollDeleteModal";

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
        data-bs-target="#staticBackdrop"
      >
        Delete
      </button>
      <CollDeleteModal collectionId={collection.id} />
    </div>
  );
}
