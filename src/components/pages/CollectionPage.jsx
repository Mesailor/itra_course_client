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
  const [isAuthed, setIsAuthed] = useState(false);
  const [filters, setFilters] = useState({
    global: {
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [resultMessage, setResultMessage] = useState("");

  useEffect(() => {
    dispatch(insertRecentId(collectionPageId));
    (async () => {
      try {
        if (!collection.name) {
          const resultCollection = await apiService.getCollection(
            collectionPageId
          );
          if (!resultCollection.success) {
            return console.log(resultCollection.message);
          }
          setCollection(resultCollection.collection);
          setItemsSchema(JSON.parse(resultCollection.collection.itemsSchema));
          setIsAuthed(resultCollection.collection.user_id === user.id);
        }

        const resultItems = await apiService.getItems(collectionPageId);
        if (!resultItems.success) {
          return console.log(resultItems.message);
        }
        setItems(resultItems.items);

        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        console.error(e);
        setResultMessage(
          "The error occured while fetching data. For more details please check the console or contact the administrator."
        );
      }
    })();
  }, [trigger]);

  function controls(item) {
    return (
      <>
        {isAuthed ? (
          <div>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target={`#ItemEditModal${item.id}`}
            >
              <i className="bi bi-pencil-square"></i>
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-bs-toggle="modal"
              data-bs-target={`#ItemDeleteModal${item.id}`}
            >
              <i className="bi bi-trash-fill"></i>
            </button>
          </div>
        ) : null}
      </>
    );
  }
  return (
    <div className="collection-page">
      <h3 className="display-3 text-center">Collection</h3>
      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border text-center" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : resultMessage ? (
        <div className="text-danger text-center my-4">
          <h3>{resultMessage}</h3>
        </div>
      ) : (
        <>
          <div className="title mb-4">
            <div className="mb-3">
              <div className="text-center mb-4">
                <img
                  style={{
                    maxHeight: "20rem",
                    maxWidth: "70%",
                  }}
                  src={collection.imageUrl}
                  alt="collection-image"
                />
              </div>

              <h3>{collection.name}</h3>
              <i>{collection.topic}</i>
            </div>
            <div className="description" data-color-mode="light">
              <h6>Description: </h6>
              <MDEditor.Markdown source={collection.description} />
            </div>
          </div>
          <div className="overflow-auto">
            <InputText
              style={{ width: "18rem" }}
              className="form-control"
              onChange={(e) => {
                setFilters({
                  global: {
                    value: e.target.value,
                    matchMode: FilterMatchMode.CONTAINS,
                  },
                });
              }}
              placeholder="Filter items"
            />
            <DataTable
              className="table"
              value={items}
              stripedRows
              filters={filters}
            >
              <Column
                field="id"
                header="id"
                body={({ id }) => {
                  return (
                    <>
                      <Link
                        className="btn btn-outline-success"
                        to={`item/${id}`}
                      >
                        {id}
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
              <Column field="id" header="" body={controls}></Column>
            </DataTable>
          </div>
          <div className="text-center">
            {isAuthed ? (
              <button
                type="button"
                className="btn btn-primary fw-bold mb-5"
                data-bs-toggle="modal"
                data-bs-target="#ItemCreateModal"
              >
                ADD NEW ITEM
              </button>
            ) : null}
          </div>
        </>
      )}

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
