async function postData(url = "", data = {}) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    alert("Gamed");
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

const userName = document.getElementById("uname");
const PasswordName = document.getElementById("psw");
const baseUrl = "https://todos-service.onrender.com";

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userNameValue = userName.value;
  const PasswordNameValue = PasswordName.value;
  if (userNameValue === "") {
    alert("Please enter a username");
  } else if (PasswordNameValue === "") {
    alert("Please enter a password");
  } else {
    const response = await postData(baseUrl + "/auth/signIn", {
      username: userNameValue,
      password: PasswordNameValue,
    });
    console.log(response);
    localStorage.setItem("user", JSON.stringify(response));
    location.href = "/home.html";
  }
});
