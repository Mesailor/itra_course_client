import * as React from "react";
import { Link } from "react-router-dom";
import apiService from "../../services/APIService";
import CollectionSm from "../UI/CollectionSm";
import { useSelector } from "react-redux";

export default function MainPage() {
  const [recentCollections, setRecentCollections] = React.useState([]);
  const recentCollectionIds = useSelector((store) => store.recentCollIds);

  React.useEffect(() => {
    (async () => {
      const result = await apiService.getManyCollections(recentCollectionIds);
      const collections = recentCollectionIds.map((id) => {
        for (let collection of result.collections) {
          if (collection.id == id) return collection;
        }
      });
      setRecentCollections(collections);
    })();
  }, []);

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
