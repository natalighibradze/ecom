import jwtDecode from "jwt-decode";
export type TokenObj = {
  exp: number;
  isAdmin: boolean;
  userId: string;
};
export type AuthenticationResult ={
  admin?:boolean,
  user?:boolean,
  key?:string
};
export const isUserAuthenticated = ():AuthenticationResult => {
  const key = localStorage.getItem("token");
  if (!key) return { admin: false, user: false };
  const user: TokenObj = jwtDecode(key);
  const tokenExpireDate = user.exp;
  console.log(user);
  if (Date.now() / 1000 < tokenExpireDate && user.isAdmin) {
    return { admin: true, key: key };
  } else if (Date.now() / 1000 < tokenExpireDate && !user.isAdmin) {
    console.log(user);
    return { user: true, key: key };
  }
  return { admin: false, user: false };
};