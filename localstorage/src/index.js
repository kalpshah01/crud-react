export const getlocal=()=>{
    return JSON.parse(localStorage.getItem(user))||[];
}