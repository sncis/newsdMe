export const emailValidator = (email) => {
  return !email ? false :
  !!email.match("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")
}


export const passwordValidator = (password) => {
  return !password ? false :
  !!password.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,25}$")
}

export const usernameValidator = username => {
  // const regex = "^([a-zA-Z0-9])(^%$#*){1,2e0}$"
  const regex = /[^@<>()%$:/|*^]/
  return !username ? false : !!username.match(regex)
}
export const cleanUrlValidator = cleanUrl => {
  const regex = "^([A-Za-z0-9]{1,20}\.)([a-z]{2,4})$"
  return !cleanUrl ? false : !!cleanUrl.match(regex)
}

export const urlValidator = url => {
  const parsedURl =  new URL(url)
  return !url ? false: ['http', 'https'].includes(parsedURl.protocol)
}



