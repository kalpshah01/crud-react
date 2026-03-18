
export const getUsers = () => {
  return  JSON.parse(localStorage.getItem("users"))||[];
  
};