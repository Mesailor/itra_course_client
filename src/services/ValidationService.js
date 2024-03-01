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
