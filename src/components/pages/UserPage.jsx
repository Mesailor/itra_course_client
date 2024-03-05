import { useState } from "react";
import CollectionsList from "../UI/CollectionsList";
import CollCreateModal from "../UI/CollCreateModal";

export default function UserPage() {
  const [collections, setCollections] = useState([
    {
      id: 1,
      name: "Coins Collection",
      description: "My collection of coins from different countries",
      topic: "coins",
      imageUrl: "",
    },
    {
      id: 2,
      name: "Coins Collection",
      description: "My collection of coins from different countries",
      topic: "coins",
      imageUrl: "",
    },
  ]);

  return (
    <div className="user-page">
      <CollectionsList collections={collections}></CollectionsList>
      <button
        className="add-new-collection"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        ADD NEW COLLECTION
      </button>
      <CollCreateModal />
    </div>
  );
}
