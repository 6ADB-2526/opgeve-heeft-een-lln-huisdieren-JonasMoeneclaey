const users = [
  { id: 1, naam: "Kleintjes", voornaam: "Karel" },
  { id: 2, naam: "Dotjes", voornaam: "Els" },
  { id: 3, naam: "Kleintjes", voornaam: "Steven" },
];

// DOM-elementen selecteren
const mySelect = document.querySelector("#mySelect");
const pageTitle = document.querySelector("#title");
const heeftHuisdierenCheckbox = document.querySelector("#heeftHuisdieren");
const naamHuisdierWrap = document.querySelector("#naamHuisdierWrap");
const myForm = document.querySelector("#myForm");

const originalTitle = pageTitle.textContent;

/**
 * Vult de selectbox met gebruikers uit de users array.
 */
function populateUserSelect() {
  // Verwijder de hardgecodeerde opties, behalve de eerste.
  mySelect.innerHTML = '<option value="" selected>-- Kies --</option>';

  users.forEach((user) => {
    const option = document.createElement("option");
    option.value = user.id;
    option.textContent = `${user.voornaam} ${user.naam}`;
    mySelect.appendChild(option);
  });
}

/**
 * Toont of verbergt het invulveld voor de naam van het huisdier.
 */
function toggleHuisdierInput() {
  naamHuisdierWrap.classList.toggle(
    "visually-hidden",
    !heeftHuisdierenCheckbox.checked
  );
}

/**
 * Voegt een nieuw inputveld voor een huisdiernaam toe.
 */
function addPetInputField() {
  const newPetInputDiv = document.createElement("div");
  newPetInputDiv.classList.add("mb-3");

  const newPetInput = document.createElement("input");
  newPetInput.type = "text";
  newPetInput.classList.add("form-control", "pet-name-input");
  newPetInput.placeholder = "Vul de naam van het volgende huisdier in";

  // Voeg event listener toe aan het *nieuwe* veld
  newPetInput.addEventListener("input", handlePetInput, { once: true });

  newPetInputDiv.appendChild(newPetInput);
  naamHuisdierWrap.appendChild(newPetInputDiv);
}

/**
 * Event handler die een nieuw veld toevoegt zodra er in een huisdier-veld getypt wordt.
 */
function handlePetInput() {
  addPetInputField();
}

// Event Listeners

// 1. Vul de selectbox bij het laden van de pagina
document.addEventListener("DOMContentLoaded", populateUserSelect);

// 2. Update de titel wanneer een gebruiker wordt geselecteerd
mySelect.addEventListener("change", () => {
  const selectedUserId = mySelect.value;
  if (selectedUserId) {
    const selectedUser = users.find((user) => user.id == selectedUserId);
    if (selectedUser) {
      pageTitle.textContent = `Welkom ${selectedUser.voornaam} ${selectedUser.naam}`;
    }
  } else {
    pageTitle.textContent = originalTitle;
  }
});

// 3. Toon/verberg huisdierensectie bij het (de)selecteren van de checkbox
heeftHuisdierenCheckbox.addEventListener("change", toggleHuisdierInput);

// 4. Voeg een nieuw invulveld toe zodra er in het eerste veld wordt getypt
const eersteHuisdierInput = document.querySelector("#naamHuisdier");
eersteHuisdierInput.addEventListener("input", handlePetInput, { once: true });

// 5. Handel de formulierinzending af
myForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Voorkom dat de pagina herlaadt

  const petNameInputs = document.querySelectorAll(".pet-name-input");
  const petNames = Array.from(petNameInputs)
    .map((input) => input.value.trim())
    .filter((name) => name !== ""); // Filter lege namen uit

  console.log("Namen van de huisdieren:", petNames);
});
