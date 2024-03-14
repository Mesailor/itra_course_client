import { useEffect, useState } from "react";
import ItemRow from "../UI/ItemRow";
import apiService from "../../services/APIService";
import MDEditor from "@uiw/react-md-editor";
import { useLoaderData } from "react-router-dom";
import ItemCreateModal from "../UI/ItemCreateModal";
import { useSelector } from "react-redux";
import ItemDeleteModal from "../UI/ItemDeleteModal";
import ItemEditModal from "../UI/ItemEditModal";

export function loader({ params }) {
  const collectionPageId = params.collectionId;
  const userPageId = Number(params.userId);
  return { collectionPageId, userPageId };
}

export default function CollectionPage() {
  const [collection, setCollection] = useState({});
  const [items, setItems] = useState([]);
  const [itemsSchema, setItemsSchema] = useState({});
  const { collectionPageId, userPageId } = useLoaderData();
  const trigger = useSelector((state) => state.refetch.trigger);
  const user = useSelector((state) => state.user);
  const isAuthed = user.id === userPageId;

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
  }, [trigger]);
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
              {Object.values(itemsSchema).map((fieldName) => {
                if (!fieldName) return null;
                return <th key={fieldName}>{fieldName}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {items.length
              ? items.map((item) => (
                  <ItemRow
                    key={item.id}
                    item={item}
                    itemsSchema={itemsSchema}
                    isAuthed={isAuthed}
                  />
                ))
              : null}
            <tr>
              {isAuthed ? (
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#ItemCreateModal"
                  >
                    +
                  </button>
                </td>
              ) : null}
            </tr>
          </tbody>
        </table>
      </div>
      {isAuthed ? (
        <>
          <ItemCreateModal
            collectionId={collection.id}
            itemsSchema={itemsSchema}
          />
          {items.length
            ? items.map((item) => (
                <div key={item.id}>
                  <ItemDeleteModal itemId={item.id} />
                  <ItemEditModal itemsSchema={itemsSchema} item={item} />
                </div>
              ))
            : null}
        </>
      ) : null}
    </div>
  );
}
