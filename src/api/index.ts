import { user_code, user_name, user_type } from "../action";
import { config } from "../config";

interface LoginType {
  code: number;
  password: string;
  login_type: number;
}

export async function login(obj: LoginType) {
  return postData("/login", obj).then((data) => {
    if (data) {
      localStorage.setItem("token", data.token);
      user_name.value = data.name;
      user_code.value = obj.code;
      user_type.value = obj.login_type;
    }
    console.log(data)
    return data;
  });
}

export async function postData(url = "", data = {}) {
  let post_url = config.url + url;

  let token = localStorage.getItem("token");
  // Default options are marked with *
  const response = await fetch(post_url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // redirect: "follow", // manual, *follow, error
    // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data),
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
