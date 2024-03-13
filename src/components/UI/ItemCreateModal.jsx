import { useState } from "react";
import apiService from "../../services/APIService";
import { useDispatch } from "react-redux";
import { triggerRefetch } from "../../store/refetchSlice";

export default function ItemCreateModal({ collectionId, itemsSchema }) {
  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const initialFildsValues = {
    custom_str1_value: "",
    custom_str2_value: "",
    custom_str3_value: "",
    custom_int1_value: "",
    custom_int2_value: "",
    custom_int3_value: "",
    custom_date1_value: "",
    custom_date2_value: "",
    custom_date3_value: "",
    custom_bool1_value: false,
    custom_bool2_value: false,
    custom_bool3_value: false,
    custom_multext1_value: "",
    custom_multext2_value: "",
    custom_multext3_value: "",
  };
  const [itemFieldsValues, setItemFieldsValues] = useState(initialFildsValues);
  const [resultMessage, setResultMessage] = useState("");

  const dispatch = useDispatch();

  function updateFields(fieldName, value) {
    const newValues = { ...itemFieldsValues };
    newValues[`custom_${fieldName}_value`] = value;
    setItemFieldsValues(newValues);
  }

  async function createItem() {
    let clearedItemFieldsValues = {};
    for (let itemKey in itemFieldsValues) {
      if (itemFieldsValues[itemKey]) {
        clearedItemFieldsValues[itemKey] = itemFieldsValues[itemKey];
      }
    }

    const newItem = {
      collection_id: collectionId,
      name,
      tags: JSON.stringify(tags.split(" ")),
      ...clearedItemFieldsValues,
    };
    const result = await apiService.reqCreateItem(newItem);
    if (result.success) {
      setResultMessage({ color: "green", message: result.message });
      setName("");
      setTags("");
      setItemFieldsValues(initialFildsValues);
    } else {
      setResultMessage({ color: "red", message: result.message });
    }
    dispatch(triggerRefetch());
  }

  return (
    <div
      className="modal fade"
      id="ItemCreateModal"
      tabIndex="-1"
      aria-labelledby="ItemCreateModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="ItemCreateModalLabel">
              Create new item
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
            <div className="field-input">
              <label htmlFor="name">Name</label>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                name="name"
                type="text"
                value={name}
              />
            </div>
            <div className="field-input">
              <label htmlFor="tags">Tags</label>
              <input
                onChange={(e) => {
                  setTags(e.target.value);
                }}
                name="tags"
                type="text"
                value={tags}
              />
            </div>

            <div
              className="field-input"
              style={{
                display: !itemsSchema.custom_str1_name && "none",
              }}
            >
              <label>{itemsSchema.custom_str1_name}</label>
              <input
                onChange={(e) => {
                  updateFields("str1", e.target.value);
                }}
                type="text"
                value={itemFieldsValues.custom_str1_value}
              />
            </div>

            <div
              className="field-input"
              style={{
                display: !itemsSchema.custom_str2_name && "none",
              }}
            >
              <label>{itemsSchema.custom_str2_name}</label>
              <input
                onChange={(e) => {
                  updateFields("str2", e.target.value);
                }}
                type="text"
                value={itemFieldsValues.custom_str2_value}
              />
            </div>

            <div
              className="field-input"
              style={{
                display: !itemsSchema.custom_str3_name && "none",
              }}
            >
              <label>{itemsSchema.custom_str3_name}</label>
              <input
                onChange={(e) => {
                  updateFields("str3", e.target.value);
                }}
                type="text"
                value={itemFieldsValues.custom_str3_value}
              />
            </div>

            <div
              className="field-input"
              style={{
                display: !itemsSchema.custom_int1_name && "none",
              }}
            >
              <label>{itemsSchema.custom_int1_name}</label>
              <input
                onChange={(e) => {
                  updateFields("int1", e.target.value);
                }}
                type="number"
                value={itemFieldsValues.custom_int1_value}
              />
            </div>

            <div
              className="field-input"
              style={{
                display: !itemsSchema.custom_int2_name && "none",
              }}
            >
              <label>{itemsSchema.custom_int2_name}</label>
              <input
                onChange={(e) => {
                  updateFields("int2", e.target.value);
                }}
                type="number"
                value={itemFieldsValues.custom_int2_value}
              />
            </div>

            <div
              className="field-input"
              style={{
                display: !itemsSchema.custom_int3_name && "none",
              }}
            >
              <label>{itemsSchema.custom_int3_name}</label>
              <input
                onChange={(e) => {
                  updateFields("int3", e.target.value);
                }}
                type="number"
                value={itemFieldsValues.custom_int3_value}
              />
            </div>

            <div
              className="field-input"
              style={{
                display: !itemsSchema.custom_bool1_name && "none",
              }}
            >
              <label>{itemsSchema.custom_bool1_name}</label>
              <input
                onChange={(e) => {
                  updateFields("bool1", e.target.checked);
                }}
                type="checkbox"
                checked={itemFieldsValues.custom_bool1_value}
              />
            </div>

            <div
              className="field-input"
              style={{
                display: !itemsSchema.custom_bool2_name && "none",
              }}
            >
              <label>{itemsSchema.custom_bool2_name}</label>
              <input
                onChange={(e) => {
                  updateFields("bool2", e.target.checked);
                }}
                type="checkbox"
                checked={itemFieldsValues.custom_bool2_value}
              />
            </div>

            <div
              className="field-input"
              style={{
                display: !itemsSchema.custom_bool3_name && "none",
              }}
            >
              <label>{itemsSchema.custom_bool3_name}</label>
              <input
                onChange={(e) => {
                  updateFields("bool3", e.target.checked);
                }}
                type="checkbox"
                checked={itemFieldsValues.custom_bool3_value}
              />
            </div>

            <div
              className="field-input"
              style={{
                display: !itemsSchema.custom_date1_name && "none",
              }}
            >
              <label>{itemsSchema.custom_date1_name}</label>
              <input
                onChange={(e) => {
                  updateFields("date1", e.target.value);
                }}
                type="date"
                value={itemFieldsValues.custom_date1_value}
              />
            </div>

            <div
              className="field-input"
              style={{
                display: !itemsSchema.custom_date2_name && "none",
              }}
            >
              <label>{itemsSchema.custom_date2_name}</label>
              <input
                onChange={(e) => {
                  updateFields("date2", e.target.value);
                }}
                type="date"
                value={itemFieldsValues.custom_date2_value}
              />
            </div>

            <div
              className="field-input"
              style={{
                display: !itemsSchema.custom_date3_name && "none",
              }}
            >
              <label>{itemsSchema.custom_date3_name}</label>
              <input
                onChange={(e) => {
                  updateFields("date3", e.target.value);
                }}
                type="date"
                value={itemFieldsValues.custom_date3_value}
              />
            </div>

            <div
              className="field-input"
              style={{
                display: !itemsSchema.custom_multext1_name && "none",
              }}
            >
              <label>{itemsSchema.custom_multext1_name}</label>
              <textarea
                onChange={(e) => {
                  updateFields("multext1", e.target.value);
                }}
                rows="3"
                value={itemFieldsValues.custom_multext1_value}
              ></textarea>
            </div>

            <div
              className="field-input"
              style={{
                display: !itemsSchema.custom_multext2_name && "none",
              }}
            >
              <label>{itemsSchema.custom_multext2_name}</label>
              <textarea
                onChange={(e) => {
                  updateFields("multext2", e.target.value);
                }}
                rows="3"
                value={itemFieldsValues.custom_multext2_value}
              ></textarea>
            </div>

            <div
              className="field-input"
              style={{
                display: !itemsSchema.custom_multext3_name && "none",
              }}
            >
              <label>{itemsSchema.custom_multext3_name}</label>
              <textarea
                onChange={(e) => {
                  updateFields("multext3", e.target.value);
                }}
                rows="3"
                value={itemFieldsValues.custom_multext3_value}
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <div className="result-message text-center">
              {resultMessage ? (
                <h5 style={{ color: resultMessage.color }}>
                  {resultMessage.message}
                </h5>
              ) : null}
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
              onClick={createItem}
              type="button"
              className="btn btn-primary"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
