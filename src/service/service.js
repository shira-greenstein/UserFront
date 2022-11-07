const url = "http://localhost:3001";

//Authorization
export async function checkToken() {
  const token = JSON.parse(localStorage.getItem("TOKEN"));
  if (!token) {
    return;
  }

  const response = await fetch(`${url}/check-token`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    return;
  }
  const data = await response.json();
  return data.user;
}
export async function login(user) {
  const response = await fetch(`${url}/auth`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify(user),
  });
  const data = await response.json();
  localStorage.setItem("TOKEN", JSON.stringify(data.accessToken));
  const dataJwt = parseJwt(data.accessToken);
  console.log("dataJwt ", dataJwt);
  return data;
}

const parseJwt = (token) => {
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

//Customers
export function getCustomers() {
  return new Promise((resolve, reject) => {
    fetch(`${url}/customers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("TOKEN"))}`,
      },
    })
      .then((response) => resolve(response.json(response)))
      .catch((error) => reject(error));
  });
}

export async function editCustomer(customer) {
  const token = JSON.parse(localStorage.getItem("TOKEN"));
  await fetch(`${url}/customers/edit`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(customer),
  });
  return;
}
