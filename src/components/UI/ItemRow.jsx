export default function ItemRow({ item, itemsSchema }) {
  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{JSON.parse(item.tags).map((item) => `${item} `)}</td>
      <td
        style={{
          display: itemsSchema.custom_str1_name ? "table-cell" : "none",
        }}
      >
        {item.custom_str1_value}
      </td>
      <td
        style={{
          display: itemsSchema.custom_str2_name ? "table-cell" : "none",
        }}
      >
        {item.custom_str2_value}
      </td>
      <td
        style={{
          display: itemsSchema.custom_str3_name ? "table-cell" : "none",
        }}
      >
        {item.custom_str3_value}
      </td>
      <td
        style={{
          display: itemsSchema.custom_int1_name ? "table-cell" : "none",
        }}
      >
        {item.custom_int1_value}
      </td>
      <td
        style={{
          display: itemsSchema.custom_int2_name ? "table-cell" : "none",
        }}
      >
        {item.custom_int2_value}
      </td>
      <td
        style={{
          display: itemsSchema.custom_int3_name ? "table-cell" : "none",
        }}
      >
        {item.custom_int3_value}
      </td>
      <td
        style={{
          display: itemsSchema.custom_bool1_name ? "table-cell" : "none",
        }}
      >
        {`${item.custom_bool1_value}`}
      </td>
      <td
        style={{
          display: itemsSchema.custom_bool2_name ? "table-cell" : "none",
        }}
      >
        {`${item.custom_bool2_value}`}
      </td>
      <td
        style={{
          display: itemsSchema.custom_bool3_name ? "table-cell" : "none",
        }}
      >
        {`${item.custom_bool3_value}`}
      </td>
      <td
        style={{
          display: itemsSchema.custom_date1_name ? "table-cell" : "none",
        }}
      >
        {item.custom_date1_value}
      </td>
      <td
        style={{
          display: itemsSchema.custom_date2_name ? "table-cell" : "none",
        }}
      >
        {item.custom_date2_value}
      </td>
      <td
        style={{
          display: itemsSchema.custom_date3_name ? "table-cell" : "none",
        }}
      >
        {item.custom_date3_value}
      </td>
      <td
        style={{
          display: itemsSchema.custom_multext1_name ? "table-cell" : "none",
        }}
      >
        {item.custom_multext1_value}
      </td>
      <td
        style={{
          display: itemsSchema.custom_multext2_name ? "table-cell" : "none",
        }}
      >
        {item.custom_multext2_value}
      </td>
      <td
        style={{
          display: itemsSchema.custom_multext3_name ? "table-cell" : "none",
        }}
      >
        {item.custom_multext3_value}
      </td>
      <td>
        <button>EDIT</button> <button>DELETE</button>
      </td>
    </tr>
  );
}
