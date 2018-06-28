export function isvalidName (name) {
  if (name.length === 0) {
    return 'name cannot be empty'
  } else if (name.length < 4) {
    return 'name is too short'
  } else {
    return 'seccess'
  }
}

export function isvalidPassword (password) {
  if (password.length === 0) {
    return 'password cannot be empty'
  } else if (password.length < 4) {
    return 'password is too short'
  } else {
    return 'seccess'
  }
}

export function isvalidPrice (price) {
  if (price < 0) {
    return 'price cannot be negative'
  } else {
    return 'seccess'
  }
}

export function isvalidPhone (Phone) {
  if (Phone.length !== 11) {
    return 'invalid phone number'
  } else {
    return 'seccess'
  }
}

export function IsValidEmail (Email) {
  var Regex = /^(?:\w+\.?)*\w+@(?:\w+\.)*\w+$/
  if (Regex.test(Email)) {
    return 'seccess'
  } else {
    return 'invalid email address'
  }
}
