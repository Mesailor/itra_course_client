export function validateSignupForm(name, password) {
  if (name.length < 1) {
    return "Name cannot be empty";
  }
  if (name.length > 64) {
    return "Name cannot be longer than 64 characters";
  }
  if (!name.match(/^[\w+]{0,64}$/)) {
    return "Name should have only digits and letters";
  }

  if (password.length < 8) {
    return "Password should have at least 8 characters";
  }
  if (password.length > 64) {
    return "Password should be shorter 64 characters";
  }
  if (!password.match(new RegExp(/^[!-z]{8,64}$/))) {
    return "Password should have only letters, digits and special symbols";
  }
}

export function validateCollectionData(collection) {
  if (collection.name.length < 1) {
    return "Collection name should not be shorter than 1 character";
  }
  if (collection.name.length > 255) {
    return "Collection name should be shorter than 255 characters";
  }
}

export function validateItemData(item) {
  if (item.name.length > 255) {
    return "Item name shouldn't be longer than 255 characters";
  }
  if (
    item.custom_str1_value.length > 255 ||
    item.custom_str2_value.length > 255 ||
    item.custom_str3_value.length > 255
  ) {
    return "Values of your custom string fields shouldn't be longer than 255 characters";
  }
}
