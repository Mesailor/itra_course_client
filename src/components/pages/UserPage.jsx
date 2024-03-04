import { useState } from "react";
import CollectionsList from "../UI/CollectionsList";

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
    </div>
  );
}
