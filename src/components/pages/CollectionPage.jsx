import { useEffect, useState } from "react";
import ItemRow from "../UI/ItemRow";
import apiService from "../../services/APIService";
import MDEditor from "@uiw/react-md-editor";
import { useLoaderData } from "react-router-dom";

export function loader({ params }) {
  const collectionPageId = params.collectionId;
  return { collectionPageId };
}

export default function CollectionPage() {
  const [collection, setCollection] = useState({});
  const [items, setItems] = useState([]);
  const [itemsSchema, setItemsSchema] = useState({});
  const { collectionPageId } = useLoaderData();

  useEffect(() => {
    (async () => {
      try {
        const resultCollection = await apiService.getCollection(
          collectionPageId
        );
        if (!resultCollection.success) {
          return console.log(resultCollection.message);
        }
        setCollection(resultCollection.collection);

        const resultItems = await apiService.getItems(collectionPageId);
        if (!resultItems.success) {
          return console.log(resultItems.message);
        }
        setItems(resultItems.items);

        setItemsSchema(JSON.parse(resultCollection.collection.itemsSchema));
      } catch (e) {
        console.log("Sorry, something went wrong...", e);
      }
    })();
  }, []);
  return (
    <div className="collection-page">
      <div className="title">
        <img src={collection.imageUrl} alt="collection-image" />
        <h3>Name: {collection.name}</h3>
        <i>{collection.topic}</i>
        <div className="description" data-color-mode="light">
          <h6>Description: </h6>
          <MDEditor.Markdown source={collection.description} />
        </div>
      </div>
      <div className="table" style={{ overflow: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Tags</th>
              <th
                style={{
                  display: itemsSchema.custom_str1_name ? "table-cell" : "none",
                }}
              >
                {itemsSchema.custom_str1_name}
              </th>
              <th
                style={{
                  display: itemsSchema.custom_str2_name ? "table-cell" : "none",
                }}
              >
                {itemsSchema.custom_str2_name}
              </th>
              <th
                style={{
                  display: itemsSchema.custom_str3_name ? "table-cell" : "none",
                }}
              >
                {itemsSchema.custom_str3_name}
              </th>
              <th
                style={{
                  display: itemsSchema.custom_int1_name ? "table-cell" : "none",
                }}
              >
                {itemsSchema.custom_int1_name}
              </th>
              <th
                style={{
                  display: itemsSchema.custom_int2_name ? "table-cell" : "none",
                }}
              >
                {itemsSchema.custom_int2_name}
              </th>
              <th
                style={{
                  display: itemsSchema.custom_int3_name ? "table-cell" : "none",
                }}
              >
                {itemsSchema.custom_int3_name}
              </th>
              <th
                style={{
                  display: itemsSchema.custom_date1_name
                    ? "table-cell"
                    : "none",
                }}
              >
                {itemsSchema.custom_date1_name}
              </th>
              <th
                style={{
                  display: itemsSchema.custom_date2_name
                    ? "table-cell"
                    : "none",
                }}
              >
                {itemsSchema.custom_date2_name}
              </th>
              <th
                style={{
                  display: itemsSchema.custom_date3_name
                    ? "table-cell"
                    : "none",
                }}
              >
                {itemsSchema.custom_date3_name}
              </th>
              <th
                style={{
                  display: itemsSchema.custom_bool1_name
                    ? "table-cell"
                    : "none",
                }}
              >
                {itemsSchema.custom_bool1_name}
              </th>
              <th
                style={{
                  display: itemsSchema.custom_bool2_name
                    ? "table-cell"
                    : "none",
                }}
              >
                {itemsSchema.custom_bool2_name}
              </th>
              <th
                style={{
                  display: itemsSchema.custom_bool3_name
                    ? "table-cell"
                    : "none",
                }}
              >
                {itemsSchema.custom_bool3_name}
              </th>
              <th
                style={{
                  display: itemsSchema.custom_multext1_name
                    ? "table-cell"
                    : "none",
                }}
              >
                {itemsSchema.custom_multext1_name}
              </th>
              <th
                style={{
                  display: itemsSchema.custom_multext2_name
                    ? "table-cell"
                    : "none",
                }}
              >
                {itemsSchema.custom_multext2_name}
              </th>
              <th
                style={{
                  display: itemsSchema.custom_multext3_name
                    ? "table-cell"
                    : "none",
                }}
              >
                {itemsSchema.custom_multext3_name}
              </th>
            </tr>
          </thead>
          <tbody>
            {items.length
              ? items.map((item) => (
                  <ItemRow
                    key={item.id}
                    item={item}
                    itemsSchema={itemsSchema}
                  />
                ))
              : null}
            <tr>
              <td>
                <button>CREATE</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
