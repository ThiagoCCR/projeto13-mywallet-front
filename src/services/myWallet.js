import axios from "axios";

function signInAPI(body) {
  const promise = axios.post("http://localhost:5000/sign-in", body);
  return promise;
}

function signUpAPI(body) {
  const promise = axios.post("http://localhost:5000/sign-up", body);
  return promise;
}

function getLogsFromAPI(config) {
  const promise = axios.get("http://localhost:5000/logs", config);
  return promise;
}

function createLogInAPI(body,config) {
  const promise = axios.post("http://localhost:5000/logs", body, config);
  return promise;
}

export { signInAPI, signUpAPI, getLogsFromAPI, createLogInAPI };
