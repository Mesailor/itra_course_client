export default function ItemValuesEditor({
  itemsSchema,
  itemFieldsValues,
  setItemFieldsValues,
}) {
  function updateFields(fieldName, value) {
    const newValues = { ...itemFieldsValues };
    newValues[`custom_${fieldName}_value`] = value;
    setItemFieldsValues(newValues);
  }

  return (
    <>
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
    </>
  );
}
