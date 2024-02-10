let userId = document.getElementById("userId");
userId = +userId.innerText.replace("User: ", "");
let foundUser;
const profilePhoto = document.getElementById("profilePhoto");
const deleteAccountDialogButton = document.getElementById(
  "deleteAccountDialogButton"
);
const profileDialog = document.getElementById("profileDialog");
const cancelDeleteButton = document.getElementById("cancelDeleteButton");
const deleteButton = document.getElementById("deleteButton");
const userFirstName = document.getElementById("userFirstName");
const userLastName = document.getElementById("userLastName");
const userEmail = document.getElementById("userEmail");
const roleSelect = document.getElementById("roleSelect");

deleteAccountDialogButton.onclick = (e) => {
  e.preventDefault();
  profileDialog.showModal();
};

cancelDeleteButton.onclick = (e) => {
  e.preventDefault();
  profileDialog.close();
};

deleteButton.onclick = async (e) => {
  e.preventDefault();
  await deleteUser();
};

roleSelect.onchange = (e) => {
  e.preventDefault();
  changeRole();
};

async function getUser() {
  try {
    const result = await axios.get(`http://localhost:8080/api/users/` + userId);

    foundUser = result.data.message;

    profilePhoto.src = foundUser.profilePhoto;
    userFirstName.innerText = "First name: " + foundUser.firstName;
    userLastName.innerText = "Last name: " + foundUser.lastName;
    userEmail.innerText = "Email: " + foundUser.email;
    roleSelect.value = foundUser.role;
  } catch (err) {
    if (err.response) {
      alert(`${err.response.data.Error}`);
    } else {
      alert(err);
    }
  }
}

async function changeRole() {
  try {
    let result;
    if (Cookies.get("token")) {
      result = await axios.put(
        "http://localhost:8080/api/users/admin/" + userId,
        {},
        {
          headers: {
            Authorization: Cookies.get("token"),
          },
        }
      );
    } else {
      result = await axios.put(
        "http://localhost:8080/api/users/admin/" + userId,
        {}
      );
    }

    alert(result.data.message);
  } catch (err) {
    if (err.response) {
      alert(`${err.response.data.Error}`);
    } else {
      alert(err);
    }
  }
}
async function deleteUser() {
  try {
    if (Cookies.get("token")) {
      await axios.delete("http://localhost:8080/api/users/" + userId, {
        headers: {
          Authorization: Cookies.get("token"),
        },
      });
    } else {
      await axios.delete("http://localhost:8080/api/users/" + userId);
    }

    location.href = "http://localhost:8080/";
  } catch (err) {
    if (err.response) {
      alert(`${err.response.data.Error}`);
    } else {
      alert(err);
    }
  }
}

getUser();
