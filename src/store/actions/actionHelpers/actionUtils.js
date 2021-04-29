
export const deleteCookies = ()=> {
  let cookies = document.cookie.split("; ");

  cookies.forEach(c => c.trim().split('=')[0] + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC;' );

}
