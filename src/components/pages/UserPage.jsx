import { useContext, useEffect, useState } from "react";
import CollectionsList from "../UI/CollectionsList";
import CollCreateModal from "../UI/CollCreateModal";
import apiService from "../../services/APIService";
import { useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import { UserPageContext } from "../../context/UserPageContext";

export function loader({ params }) {
  const usersPageId = params.userId;
  return { usersPageId };
}

export default function UserPage() {
  const [collections, setCollections] = useState([]);
  const { setUsersPageId } = useContext(UserPageContext);
  const user = useSelector((store) => store.user);
  const trigger = useSelector((store) => store.refetch.trigger);
  const { usersPageId } = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    setUsersPageId(Number(usersPageId));
    (async function () {
      const result = await apiService.getCollections(usersPageId);
      if (result.status === 404) {
        return navigate("/main");
      }
      setCollections(result.collections);
    })();
  }, [trigger]);

  return (
    <div className="user-page">
      <CollectionsList collections={collections}></CollectionsList>
      {Number(usersPageId) === user.id ? (
        <>
          <button
            className="add-new-collection"
            data-bs-toggle="modal"
            data-bs-target="#CollCreateModal"
          >
            ADD NEW COLLECTION
          </button>
          <CollCreateModal />
        </>
      ) : null}
    </div>
  );
}
