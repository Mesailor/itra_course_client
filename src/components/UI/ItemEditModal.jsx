import { useState } from "react";
import apiService from "../../services/APIService";
import { useDispatch } from "react-redux";
import { triggerRefetch } from "../../store/refetchSlice";
import ItemValuesEditor from "./ItemValuesEditor";
import { validateItemData } from "../../services/ValidationService";

export default function ItemEditModal({ itemsSchema, item }) {
  const [name, setName] = useState(item.name);
  const [tags, setTags] = useState(JSON.parse(item.tags).join(" "));
  const initialFildsValues = {
    custom_str1_value: item.custom_str1_value,
    custom_str2_value: item.custom_str2_value,
    custom_str3_value: item.custom_str3_value,
    custom_int1_value: item.custom_int1_value,
    custom_int2_value: item.custom_int2_value,
    custom_int3_value: item.custom_int3_value,
    custom_date1_value: item.custom_date1_value,
    custom_date2_value: item.custom_date2_value,
    custom_date3_value: item.custom_date3_value,
    custom_bool1_value: item.custom_bool1_value,
    custom_bool2_value: item.custom_bool2_value,
    custom_bool3_value: item.custom_bool3_value,
    custom_multext1_value: item.custom_multext1_value,
    custom_multext2_value: item.custom_multext2_value,
    custom_multext3_value: item.custom_multext3_value,
  };
  const [itemFieldsValues, setItemFieldsValues] = useState(initialFildsValues);
  const [isLoading, setIsLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState({});

  const dispatch = useDispatch();

  async function editItem() {
    if (isLoading) return;
    setIsLoading(true);

    let checkedItemFieldsValues = { ...itemFieldsValues };
    let trimmedName = name.trim();
    let trimmedTags = tags.trim();
    for (let i = 1; i <= 3; i++) {
      checkedItemFieldsValues[`custom_str${i}_value`] =
        itemFieldsValues[`custom_str${i}_value`].trim();

      checkedItemFieldsValues[`custom_multext${i}_value`] =
        itemFieldsValues[`custom_multext${i}_value`].trim();

      if (itemFieldsValues[`custom_int${i}_value`] === "") {
        checkedItemFieldsValues[`custom_int${i}_value`] = 0;
      }

      if (itemFieldsValues[`custom_date${i}_value`] === "") {
        checkedItemFieldsValues[`custom_date${i}_value`] = null;
      }

      if (itemFieldsValues[`custom_bool${i}_value`] === "") {
        checkedItemFieldsValues[`custom_bool${i}_value`] = false;
      }
    }

    const newItem = {
      name: trimmedName,
      tags: JSON.stringify(trimmedTags.split(" ")),
      ...checkedItemFieldsValues,
    };

    const validationError = validateItemData(newItem);
    if (validationError) {
      setIsLoading(false);
      return setResultMessage({ color: "red", message: validationError });
    }

    const result = await apiService.reqEditItem(newItem, item.id);
    if (result.success) {
      setIsLoading(false);
      setResultMessage({ color: "green", message: result.message });
    } else {
      setIsLoading(false);
      setResultMessage({ color: "red", message: result.message });
    }
    dispatch(triggerRefetch());
  }

  return (
    <div
      className="modal fade"
      id={`ItemEditModal${item.id}`}
      tabIndex="-1"
      aria-labelledby="ItemEditModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="ItemEditModalLabel">
              Edit item
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setResultMessage("");
              }}
            ></button>
          </div>
          <div className="modal-body">
            <ul className="list-group text-center">
              <li className="list-group-item">
                <label className="form-label fw-bold" htmlFor="name">
                  Name
                </label>
                <input
                  className="form-control"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  name="name"
                  type="text"
                  value={name}
                />
              </li>
              <li className="list-group-item">
                <label className="form-label fw-bold" htmlFor="tags">
                  Tags
                </label>
                <input
                  className="form-control"
                  onChange={(e) => {
                    setTags(e.target.value);
                  }}
                  name="tags"
                  type="text"
                  value={tags}
                />
              </li>

              <ItemValuesEditor
                itemsSchema={itemsSchema}
                itemFieldsValues={itemFieldsValues}
                setItemFieldsValues={setItemFieldsValues}
              />
            </ul>
          </div>
          <div className="modal-footer">
            <div className="result-message m-auto">
              {isLoading ? (
                <div className="spinner-border" role="status"></div>
              ) : (
                <h5 className="m-auto" style={{ color: resultMessage.color }}>
                  {resultMessage.message}
                </h5>
              )}
            </div>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => {
                setResultMessage("");
              }}
            >
              Close
            </button>
            <button
              onClick={editItem}
              type="button"
              className="btn btn-primary"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
