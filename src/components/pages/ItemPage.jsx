import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import apiService from "../../services/APIService";

export function loader({ params }) {
  const itemPageId = params.itemId;
  return { itemPageId };
}

export default function ItemPage() {
  const { itemPageId } = useLoaderData();
  const [item, setItem] = useState({});
  const [collection, setCollection] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        const resultItem = await apiService.getItem(itemPageId);
        if (!resultItem.success) {
          return console.log("Problem with fetching item from server");
        }
        setItem(resultItem.item);

        const resultCollection = await apiService.getCollection(
          resultItem.item.collection_id
        );
        if (!resultCollection.success) {
          return console.log("Problem with fetching collection from server");
        }
        setCollection(resultCollection.collection);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        alert(e);
        console.log(e);
      }
    })();
  }, []);
  return (
    <div className="item-page">
      <h3 className="display-3 text-center mb-4">Item</h3>
      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <h3>
            {item.id}. {item.name}
          </h3>
          <p className="mb-4">
            <i>Tags: {item.tags}</i>
          </p>
          <ul className="list-group list-group-flush"></ul>
          {collection.id
            ? Object.entries(JSON.parse(collection.itemsSchema)).map(
                ([key, name]) => {
                  if (!name) return;
                  return (
                    <li className="list-group-item" key={key}>
                      {name} - {item[`custom_${key.split("_")[1]}_value`]}
                    </li>
                  );
                }
              )
            : null}
          <button>LIKE</button>
          <div className="comments">
            <h5>Comments</h5>
          </div>
        </>
      )}
    </div>
  );
}
