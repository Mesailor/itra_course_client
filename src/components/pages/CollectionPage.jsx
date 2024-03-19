import { useEffect, useState } from "react";
import apiService from "../../services/APIService";
import MDEditor from "@uiw/react-md-editor";
import { Link, useLoaderData } from "react-router-dom";
import ItemCreateModal from "../UI/ItemCreateModal";
import { useDispatch, useSelector } from "react-redux";
import { insertRecentId } from "../../store/recentCollIdsSlice";
import ItemDeleteModal from "../UI/ItemDeleteModal";
import ItemEditModal from "../UI/ItemEditModal";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";

export function loader({ params }) {
  const collectionPageId = params.collectionId;
  const userPageId = Number(params.userId);
  return { collectionPageId, userPageId };
}

export default function CollectionPage() {
  const dispatch = useDispatch();
  const [collection, setCollection] = useState({});
  const [items, setItems] = useState([]);
  const [itemsSchema, setItemsSchema] = useState({});
  const { collectionPageId, userPageId } = useLoaderData();
  const trigger = useSelector((state) => state.refetch.trigger);
  const user = useSelector((state) => state.user);
  const isAuthed = user.id === userPageId;
  const [filters, setFilters] = useState({
    global: {
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
    },
  });

  useEffect(() => {
    dispatch(insertRecentId(collectionPageId));
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

  function controls(item) {
    return (
      <>
        {isAuthed ? (
          <>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target={`#ItemEditModal${item.id}`}
            >
              EDIT
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-bs-toggle="modal"
              data-bs-target={`#ItemDeleteModal${item.id}`}
            >
              DELETE
            </button>
          </>
        ) : null}
      </>
    );
  }
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
        <InputText
          onChange={(e) => {
            setFilters({
              global: {
                value: e.target.value,
                matchMode: FilterMatchMode.CONTAINS,
              },
            });
          }}
        />
        <DataTable value={items} filters={filters}>
          <Column
            field="id"
            header="id"
            body={({ id }) => {
              return (
                <>
                  {id}
                  <Link className="btn btn-success" to={`item/${id}`}>
                    Open
                  </Link>
                </>
              );
            }}
            sortable
          ></Column>
          <Column field="name" header="name" sortable></Column>
          <Column field="tags" header="tags" sortable></Column>
          {Object.entries(itemsSchema).map(([key, value]) => {
            if (!value) return null;
            return (
              <Column
                key={key}
                field={`custom_${key.split("_")[1]}_value`}
                header={value}
                sortable
              ></Column>
            );
          })}
          <Column field="id" header="*" body={controls}></Column>
        </DataTable>
        {isAuthed ? (
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#ItemCreateModal"
          >
            +
          </button>
        ) : null}
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
