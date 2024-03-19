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

  useEffect(() => {
    (async function () {
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
    })();
  }, []);
  return (
    <div className="item-page">
      <h3>
        {item.id}. {item.name}
      </h3>
      <i>Tags: {item.tags}</i>
      {collection.id
        ? Object.entries(JSON.parse(collection.itemsSchema)).map(
            ([key, name]) => {
              if (!name) return;
              return (
                <p key={key}>
                  {name} - {item[`custom_${key.split("_")[1]}_value`]}
                </p>
              );
            }
          )
        : null}
      <button>LIKE</button>
      <div className="comments">
        <h5>Comments</h5>
      </div>
    </div>
  );
}
