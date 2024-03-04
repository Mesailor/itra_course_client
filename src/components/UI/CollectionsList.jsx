import Collection from "./Collection";

export default function CollectionsList({ collections }) {
  return (
    <div className="collections-list">
      {collections.map((collection) => (
        <Collection key={collection.id} collection={collection} />
      ))}
      <button className="add-new-collection">ADD NEW COLLECTION</button>
    </div>
  );
}
