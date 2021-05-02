export const emailValidator = (email) => {
  if(email!= null || ''){
    return  !!email.match("^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")

  }else{return false}
  // return !email ? false :
  // !!email.match("^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")
};

export const passwordValidator = (password) => {
  const regex = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,25}$"
  return !password ? false :password.match(regex)
};

export const usernameValidator = username => {
  const regex = "[^@<>()%$:/|*^]";
  return !username ? false : !!username.match(regex)
};
export const cleanUrlValidator = cleanUrl => {
  const regex = "^([A-Za-z0-9&_\\-#!?%,\\-_]{1,40})\\.([a-zA-Z]{2,4})$";
  return !!cleanUrl.match(regex)
};

export const linkValidator = url => {
  const parsedURl =  new URL(url);
  const isValid =  ['http:', 'https:'].includes(parsedURl.protocol)
  return isValid

};


export const validateConfirmationToken= token => {
  const regex ="^[a-z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}$"
  return !!token.match(regex)
}


