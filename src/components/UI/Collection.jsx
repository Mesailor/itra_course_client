export default function Collection({ collection }) {
  return (
    <div className="collection">
      <img
        className="thumbnail"
        src={collection.imageUrl}
        alt="image-thumbnail"
      />
      <h3 className="name">Name: {collection.name}</h3>
      <i className="topic">Topic: {collection.topic}</i>
      <p className="describtion">Describtion: {collection.description}</p>
    </div>
  );
}
