export const getlocal=()=>{
    return JSON.parse(localStorage.getItem(user))||[];
}
export const setlocal=(key,value)=>{
    localStorage.setItem('key',JSON.stringify(value));
}