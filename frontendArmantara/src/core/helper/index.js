import { API } from "../../backend";
import { useNavigate } from "react-router-dom";

export const signup = user =>{
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const signin = user =>{
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const authenticate = (data, next) =>{
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt", JSON.stringify(data))
        next();
    }
}

export const signout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    return fetch(`${API}/signout`, {
      method: "GET",
    })
      .then((response) => {
        console.log("signout success");
        window.location.reload(); // Reload the page after signout
      })
      .catch((err) => console.log(err));
  }
};
  

  export const isAuthenticated = () => {
    if (typeof window !== "undefined") {
      return true;
    }
    if (localStorage.getItem("jwt")) {
      return JSON.parse(localStorage.getItem("jwt"));
    } else {
      return false;
    }
  };
  