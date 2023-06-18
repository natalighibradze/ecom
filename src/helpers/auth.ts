import jwtDecode from "jwt-decode";

export type TokenObj = {
  exp: number;
  isAdmin: boolean;
  userId: string;
};

export const isUserAuthenticated = () => {
  const key = localStorage.getItem("token");
  if (!key) return false;

  const user: TokenObj = jwtDecode(key);
  const tokenExpireDate = user.exp;

  if (Date.now() / 1000 < tokenExpireDate && user.isAdmin) {
    return { admin: true, key: key };
  } else if (Date.now() / 1000 < tokenExpireDate && !user.isAdmin) {
    return { user: true, key: key };
  } else {
    return false;
  }
};
