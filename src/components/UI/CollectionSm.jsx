export default function CollectionSm({ collection }) {
  return (
    <div className="collection-small">
      <img src={collection.imageUrl} alt="collection image" />
      <h5>Name: {collection.name}</h5>
      <i>{collection.topic}</i>
    </div>
  );
}
