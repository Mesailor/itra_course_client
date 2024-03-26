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
  const [resultMessage, setResultMessage] = useState("");

  useEffect(() => {
    (async function () {
      try {
        const resultItem = await apiService.getItem(itemPageId);
        if (!resultItem.success) {
          throw new Error("Problem with fetching item from server");
        }
        setItem(resultItem.item);

        const resultCollection = await apiService.getCollection(
          resultItem.item.collection_id
        );
        if (!resultCollection.success) {
          throw new Error("Problem with fetching collection from server");
        }
        setCollection(resultCollection.collection);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        console.error(e);
        setResultMessage(
          "The error occured while fetching data. For more details please check the console or contact the administrator."
        );
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
      ) : resultMessage ? (
        <div className="text-danger text-center my-4">
          <h3>{resultMessage}</h3>
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
