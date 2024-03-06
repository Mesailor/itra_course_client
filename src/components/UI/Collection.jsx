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
    </div>
  );
}
