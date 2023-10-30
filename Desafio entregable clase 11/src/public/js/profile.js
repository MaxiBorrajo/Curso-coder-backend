let data = JSON.parse(localStorage.getItem("user"));

const profile = document.getElementById("profile");
const logoutButton = document.getElementById("logoutButton");

logoutButton.onclick = async (e) => {
  e.preventDefault();
  await logout();
};

function compileProfile() {
  const profileTemplate = `<li>
      <p>ID: ${data._id}</p> 
      <p>Email: ${data.email}</p> 
      <form id="profileForm">
      <input type='text' id="first_name" value="${data.first_name}"/> 
      <input type='text' id="last_name" value="${
        data.last_name ? data.last_name : ""
      }"/> 
      <input type='number' id="age" value="${
        data.age ? data.age : 0
      }" min='0' max='99'/> 
      <input type='submit' value="update">
      </form>
      
    </li>`;
  profile.innerHTML = profileTemplate;
}

compileProfile();

async function logout() {
  try {
    const result = await fetch(`http://localhost:8080/api/sessions`, {
      method: "DELETE",
    });

    if (result) {
      localStorage.clear();
      location.reload();
    }
  } catch (err) {
    alert(`ERROR: ${err}`);
  }
}

const profileForm = document.getElementById("profileForm");

profileForm.onsubmit = async (e) => {
  e.preventDefault();
  let newData = {
    first_name: document.getElementById("first_name").value,
    last_name: document.getElementById("last_name").value,
    age: document.getElementById("age").value,
  };

  await updateUser(newData);
};

async function updateUser(newData) {
  try {
    validateUserForm(newData);

    const result = await fetch("http://localhost:8080/api/users/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    const resultJson = await result.json();

    if (result) {
      alert("User updated succesfully")
    }
  } catch (err) {
    alert(`ERROR: ${err}`);
  }
}

function validateUserForm(newUser) {
  if (
    !newUser.first_name ||
    !newUser.last_name ||
    newUser.age === 0 ||
    !newUser.age
  ) {
    throw new Error("Form incomplete");
  }
}
