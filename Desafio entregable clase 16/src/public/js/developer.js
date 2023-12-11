let developerID = document.getElementById("developerId");
developerID = +developerID.innerText.replace("ID developer: ", "");
const developerHero = document.getElementById("developerHero");
const developerProducts = document.getElementById("developerProducts");
const developerConfiguration = document.getElementById("developerConfiguration");
const authUser = Cookies.get("token") || Cookies.get("user");
const userInformation = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
const developerImg = document.getElementById("developerImg");
const updateDeveloperPhoto = document.getElementById("updateDeveloperPhoto");
const updateDeveloperForm = document.getElementById("updateDeveloperForm");
const updateDeveloperName = document.getElementById("updateDeveloperName");


if (authUser && userInformation && userInformation.role === "ADMIN") {
    developerConfiguration.style = "display:contents;";
} else {
    developerConfiguration.style = "display:none;";
}

async function getDeveloper() {
  try {
    let response;

    if (Cookies.get("token")) {
      response = await axios.get(
        `http://localhost:8080/api/developers/${developerID}`,
        {
          headers: {
            Authorization: Cookies.get("token"),
          },
        }
      );
    } else {
      response = await axios.get(
        `http://localhost:8080/api/developers/${developerID}`
      );
    }

    await compileDeveloper(response.data.message);
  } catch (err) {
    if (err.response) {
      alert(`${err.response.data.Error}`);
    } else {
      alert(err);
    }
  }
}

updateDeveloperPhoto.onchange = (e) => {
  e.preventDefault();
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = async (e) => {
      const newUserInfo = new FormData();

      newUserInfo.append("image", file);

      productImg.src = e.target.result;

      await updateDeveloper(newUserInfo);
    };
    reader.readAsDataURL(file);
  }
};

async function updateDeveloper(newData) {
  try {
    if (Cookies.get("token")) {
      await axios.put(
        `http://localhost:8080/api/developers/${developerID}`,
        newData,
        {
          headers: {
            Authorization: Cookies.get("token"),
          },
        }
      );
    } else {
      await axios.put(
        `http://localhost:8080/api/developers/${developerID}`,
        newData
      );
    }

    window.location.reload();
  } catch (err) {
    if (err.response) {
      alert(`${err.response.data.Error}`);
    } else {
      alert(err);
    }
  }
}

async function compileDeveloper(developer) {
    console.log(developer);
  updateDeveloperName.value = developer.developer_name;

  
  developerImg.src = developer.url_logo_developer;
  const developerHeroTemplate = `
  <img src="${developer.url_logo_developer}"/>
  <p class="text-5xl primary-font leading-normal">${developer.developer_name}</p>
  `

  developerHero.innerHTML = developerHeroTemplate;
}

getDeveloper();
// getCartOfUser();
// function validateProduct(product) {
//   if (
//     !product.title ||
//     !product.description ||
//     !product.price ||
//     !product.release_date ||
//     !product.developerId ||
//     !product.CPU ||
//     !product.RAM ||
//     !product.memory ||
//     !product.GPU
//   ) {
//     throw new Error("Form incomplete");
//   }
// }

// updateProductForm.onsubmit = async (e) => {
//   try {
//     e.preventDefault();
//     const product = {
//       title: document.getElementById("updateProductTitle").value,
//       description: document.getElementById("updateProductDescription").value,
//       price: document.getElementById("updateProductPrice").value,
//       discount: document.getElementById("updateProductDiscount").value,
//       release_date: document.getElementById("updateProductReleaseDate").value,
//       trailer_video: document.getElementById("updateProductVideo").value,
//       developerId: document.getElementById("updateProductIdDeveloper").value,
//       CPU: document.getElementById("updateProductCPU").value,
//       RAM: document.getElementById("updateProductRAM").value,
//       memory: document.getElementById("updateProductMemory").value,
//       GPU: document.getElementById("updateProductGPU").value,
//     };

//     validateProduct(product);

//     await updateProduct(product);
//   } catch (error) {
//     alert(error);
//   }
// };
