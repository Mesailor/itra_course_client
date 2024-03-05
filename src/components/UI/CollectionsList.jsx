import Collection from "./Collection";

export default function CollectionsList({ collections }) {
  return (
    <div className="collections-list">
      {collections.map((collection) => (
        <Collection key={collection.id} collection={collection} />
      ))}
    </div>
  );
}
