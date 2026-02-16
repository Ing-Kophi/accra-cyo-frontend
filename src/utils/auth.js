export const saveToken = (token) => {
  localStorage.setItem("cyo_admin_token", token);
};

export const getToken = () => {
  return localStorage.getItem("cyo_admin_token");
};

export const logout = () => {
  localStorage.removeItem("cyo_admin_token");
};
