import { useDispatch } from "react-redux";
import { setField } from "../../store/itemsSchemaSlice";

export default function ItemsSchemaEditor() {
  const dispatch = useDispatch();

  function updateField(field, name) {
    let state = true;
    if (!name) {
      state = false;
    }
    dispatch(setField({ field, name, state }));
  }

  return (
    <div className="items-schema-editor">
      <form>
        <ul>
          <li>name</li>
          <li>tag</li>
          <li>
            <span>
              <input
                onChange={(e) => {
                  updateField("int1", e.target.value);
                }}
                type="text"
                placeholder="custom integer field"
              />
            </span>
          </li>
          <li>
            <span>
              <input
                onChange={(e) => {
                  updateField("int2", e.target.value);
                }}
                type="text"
                placeholder="custom integer field"
              />
            </span>
          </li>
          <li>
            <span>
              <input
                onChange={(e) => {
                  updateField("int3", e.target.value);
                }}
                type="text"
                placeholder="custom integer field"
              />
            </span>
          </li>
          <li>
            <span>
              <input
                onChange={(e) => {
                  updateField("str1", e.target.value);
                }}
                type="text"
                placeholder="custom string field"
              />
            </span>
          </li>
          <li>
            <span>
              <input
                onChange={(e) => {
                  updateField("str2", e.target.value);
                }}
                type="text"
                placeholder="custom string field"
              />
            </span>
          </li>
          <li>
            <span>
              <input
                onChange={(e) => {
                  updateField("str3", e.target.value);
                }}
                type="text"
                placeholder="custom string field"
              />
            </span>
          </li>
          <li>
            <span>
              <input
                onChange={(e) => {
                  updateField("date1", e.target.value);
                }}
                type="text"
                placeholder="custom date field"
              />
            </span>
          </li>
          <li>
            <span>
              <input
                onChange={(e) => {
                  updateField("date2", e.target.value);
                }}
                type="text"
                placeholder="custom date field"
              />
            </span>
          </li>
          <li>
            <span>
              <input
                onChange={(e) => {
                  updateField("date3", e.target.value);
                }}
                type="text"
                placeholder="custom date field"
              />
            </span>
          </li>
          <li>
            <span>
              <input
                onChange={(e) => {
                  updateField("bool1", e.target.value);
                }}
                type="text"
                placeholder="custom boolean field"
              />
            </span>
          </li>
          <li>
            <span>
              <input
                onChange={(e) => {
                  updateField("bool2", e.target.value);
                }}
                type="text"
                placeholder="custom boolean field"
              />
            </span>
          </li>
          <li>
            <span>
              <input
                onChange={(e) => {
                  updateField("bool3", e.target.value);
                }}
                type="text"
                placeholder="custom boolean field"
              />
            </span>
          </li>
          <li>
            <span>
              <input
                onChange={(e) => {
                  updateField("multext1", e.target.value);
                }}
                type="text"
                placeholder="custom multiline text field"
              />
            </span>
          </li>
          <li>
            <span>
              <input
                onChange={(e) => {
                  updateField("multext2", e.target.value);
                }}
                type="text"
                placeholder="custom multiline text field"
              />
            </span>
          </li>
          <li>
            <span>
              <input
                onChange={(e) => {
                  updateField("multext3", e.target.value);
                }}
                type="text"
                placeholder="custom multiline text field"
              />
            </span>
          </li>
        </ul>
      </form>
    </div>
  );
}
