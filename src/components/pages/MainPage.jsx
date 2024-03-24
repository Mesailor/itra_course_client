import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiService from "../../services/APIService";
import CollectionSm from "../UI/CollectionSm";
import Collection from "../UI/Collection";
import { useSelector } from "react-redux";

export default function MainPage() {
  const [recentCollections, setRecentCollections] = useState([]);
  const [largestColls, setLargestColls] = useState([]);
  const recentCollectionIds = useSelector((store) => store.recentCollIds);
  const trigger = useSelector((store) => store.refetch.trigger);

  useEffect(() => {
    (async () => {
      const resultRecentColls = await apiService.getManyCollections(
        recentCollectionIds
      );
      if (resultRecentColls.success) {
        const collections = recentCollectionIds.map((id) => {
          for (let collection of resultRecentColls.collections) {
            if (collection.id == id) return collection;
          }
        });
        setRecentCollections(collections);
      }

      const resultLargestColls = await apiService.getFiveLargestColls();
      if (resultLargestColls.success) {
        setLargestColls(resultLargestColls.collections);
      }
    })();
  }, [trigger]);

  return (
    <div className="main-page">
      <main className="container-xxl">
        <div className="recently-seen">
          <h3>Recently seen</h3>
          <div className="collections-list">
            <ul>
              {recentCollections.length ? (
                recentCollections.map((collection) => {
                  return (
                    <li key={collection.id}>
                      <Link
                        to={`/user/${collection.user_id}/collection/${collection.id}`}
                      >
                        <CollectionSm collection={collection} />
                      </Link>
                    </li>
                  );
                })
              ) : (
                <p>Keep exploring!</p>
              )}
            </ul>
          </div>
        </div>
        <div className="top--largest">
          <h3>Top Largest</h3>
          <ul>
            {largestColls.length ? (
              largestColls.map((collection) => (
                <li key={collection.id}>
                  <Collection collection={collection} />
                </li>
              ))
            ) : (
              <p>No collections exist yet</p>
            )}
          </ul>
        </div>
        <p>
          <Link to="/user/1">1</Link>
        </p>
        <p>
          <Link to="/user/2">2</Link>
        </p>
      </main>
    </div>
  );
}
