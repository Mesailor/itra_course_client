import { useEffect, useState } from "react";
import CollectionsList from "../UI/CollectionsList";
import CollCreateModal from "../UI/CollCreateModal";
import apiService from "../../services/APIService";
import { useSelector } from "react-redux";

export default function UserPage() {
  const [collections, setCollections] = useState([]);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    apiService.getOwnCollections(user.id).then((collections) => {
      setCollections(collections);
    });
  }, []);

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
