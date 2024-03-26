import { useState, useEffect } from "react";
import apiService from "../../services/APIService";
import CollectionSm from "../UI/CollectionSm";
import Collection from "../UI/Collection";
import { useSelector } from "react-redux";

export default function MainPage() {
  const [recentCollections, setRecentCollections] = useState([]);
  const [largestColls, setLargestColls] = useState([]);
  const recentCollectionIds = useSelector((store) => store.recentCollIds);
  const trigger = useSelector((store) => store.refetch.trigger);
  const [isLoadingRecent, setIsLoadingRecent] = useState(true);
  const [isLoadingLargest, setIsLoadingLargest] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const resultRecentColls = await apiService.getManyCollections(
          recentCollectionIds
        );
        if (resultRecentColls.success) {
          const collections = recentCollectionIds.map((id) => {
            for (let collection of resultRecentColls.collections) {
              if (collection.id == id) return collection;
            }
          });
          setRecentCollections(collections.filter((collection) => collection));
          setIsLoadingRecent(false);
        }

        const resultLargestColls = await apiService.getFiveLargestColls();
        if (resultLargestColls.success) {
          setLargestColls(resultLargestColls.collections);
          setIsLoadingLargest(false);
        }
      } catch (e) {
        setIsLoadingLargest(false);
        setIsLoadingRecent(false);
        alert(e);
        console.error(e);
      }
    })();
  }, [trigger]);

  return (
    <div className="main-page">
      <main className="container-xxl">
        <div className="recently-seen">
          <h5 className="display-5 mb-3">Recently seen</h5>
          <div className="collections-list d-flex gap-3 overflow-auto">
            {isLoadingRecent ? (
              <div className="spinner-border mx-auto" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : recentCollections.length ? (
              recentCollections.map((collection) => {
                return (
                  <div key={collection.id}>
                    <CollectionSm collection={collection} />
                  </div>
                );
              })
            ) : (
              <h5 className="mb-4">Keep exploring!</h5>
            )}
          </div>
        </div>
        <div className="top-largest">
          <h5 className="display-5 mb-3">Top Largest</h5>
          <div className="largest-collections d-flex flex-column">
            {isLoadingLargest ? (
              <div className="spinner-border mx-auto" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : largestColls.length ? (
              largestColls.map((collection) => (
                <Collection
                  className="mb-4"
                  key={collection.id}
                  collection={collection}
                />
              ))
            ) : (
              <p>No collections exist yet</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
