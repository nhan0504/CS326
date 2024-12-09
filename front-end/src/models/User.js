let id = null;
let username = null;

export const setId = (newId) => {
  id = newId;
  document.dispatchEvent(new Event("UpdateUserID"));
};

export const setUsername = (newUsername) => {
  username = newUsername;
};

export const getId = () => id;
export const getUsername = () => username;
