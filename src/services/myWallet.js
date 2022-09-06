import axios from "axios";


function signInAPI (body){
    const promise = axios.post(
        "URL",
        body
      );
      return promise;
}

function signUpAPI (body){
    const promise = axios.post(
        "URL",
        body
      );
      return promise;
}

export {signInAPI, signUpAPI};
