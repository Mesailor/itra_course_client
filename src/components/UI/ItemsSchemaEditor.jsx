export default function ItemsSchemaEditor({ itemsSchema, setItemsSchema }) {
  function updateField(field, name) {
    let state = true;
    if (!name) {
      state = false;
    }
    const newItemsSchema = { ...itemsSchema };
    newItemsSchema[`custom_${field}_name`] = name;
    newItemsSchema[`custom_${field}_state`] = state;
    setItemsSchema(newItemsSchema);
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
                value={itemsSchema.custom_int1_name}
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
                value={itemsSchema.custom_int2_name}
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
                value={itemsSchema.custom_int3_name}
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
                value={itemsSchema.custom_str1_name}
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
                value={itemsSchema.custom_str2_name}
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
                value={itemsSchema.custom_str3_name}
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
                value={itemsSchema.custom_date1_name}
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
                value={itemsSchema.custom_date2_name}
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
                value={itemsSchema.custom_date3_name}
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
                value={itemsSchema.custom_bool1_name}
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
                value={itemsSchema.custom_bool2_name}
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
                value={itemsSchema.custom_bool3_name}
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
                value={itemsSchema.custom_multext1_name}
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
                value={itemsSchema.custom_multext2_name}
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
                value={itemsSchema.custom_multext3_name}
              />
            </span>
          </li>
        </ul>
      </form>
    </div>
  );
}
