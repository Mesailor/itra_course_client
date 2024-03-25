import { useContext, useEffect, useState } from "react";
import CollCreateModal from "../UI/CollCreateModal";
import apiService from "../../services/APIService";
import { useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import { UserPageContext } from "../../context/UserPageContext";
import Collection from "../UI/Collection";

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
  const [resultMessage, setResultMessage] = useState("");

  useEffect(() => {
    setResultMessage("");
    setUsersPageId(Number(usersPageId));
    (async function () {
      try {
        const result = await apiService.getAllCollections(usersPageId);
        if (result.status !== 200) {
          return setResultMessage(result.message);
        }
        setCollections(result.collections);
      } catch (e) {
        console.error(e);
        setResultMessage(e.message);
      }
    })();
  }, [trigger, usersPageId]);

  return (
    <div className="user-page">
      <h3 className="display-3 text-center my-3">Personal Collections</h3>
      <div className="collections-list">
        {collections.length ? (
          <div>
            {collections.map((collection) => (
              <Collection key={collection.id} collection={collection} />
            ))}
            {Number(usersPageId) === user.id ? (
              <div className="text-center">
                <button
                  className="btn btn-primary my-2 mb-4"
                  data-bs-toggle="modal"
                  data-bs-target="#CollCreateModal"
                >
                  <strong>ADD NEW COLLECTION</strong>
                </button>
                <CollCreateModal />
              </div>
            ) : null}
          </div>
        ) : resultMessage ? (
          <div className="text-danger text-center my-4">
            <h1>{resultMessage}</h1>
          </div>
        ) : (
          <div style={{ width: "50px" }} className="mx-auto my-4">
            <div className="spinner-border" role="status"></div>
          </div>
        )}
      </div>
    </div>
  );
}
