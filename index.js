const charactersUrl = 'https://gateway.marvel.com/v1/public/characters';
const limit = 100; // Nombre maximum de résultats par page
const charactersSelect = document.getElementById("characters");

fetch(`${charactersUrl}?limit=${limit}&ts=1&apikey=15328c79dbac5e06a3f67c7fc8380289&hash=1cb4e898f70ee7f5eda4717d22721077`)
  .then(response => response.json())
  .then(data => {
    const characters = data.data.results;
    // Remplir la liste déroulante avec les noms des personnages
    characters.forEach(character => {
      const option = document.createElement("option");
      option.value = character.id;
      option.textContent = character.name;
      // Vérifier si le personnage a une description et une image
      if (!character.description || !character.thumbnail || character.thumbnail.path.includes('image_not_available')) {
        option.classList.add('disparait'); // Ajouter la classe 'disparait' à l'option
      } 
      charactersSelect.appendChild(option);
    });
  })
  .catch(error => console.error(error));

charactersSelect.addEventListener("change", event => {
  const characterId = event.target.value;
  const characterDetailsUrl = `${charactersUrl}/${characterId}`;
  fetch(`${characterDetailsUrl}?ts=1&apikey=15328c79dbac5e06a3f67c7fc8380289&hash=1cb4e898f70ee7f5eda4717d22721077`)
    .then(response => response.json())
    .then(data => {
      const character = data.data.results[0];
      // Afficher les informations du personnage
      const characterInfo = document.getElementById("character-info");
      const secureUrl = replaceHttpWithHttps(`${character.thumbnail.path}.${character.thumbnail.extension}`);
      characterInfo.innerHTML = `
        <h2>${character.name}</h2>
        <img src="${secureUrl}" alt="${character.name}">
        <p>${character.description}</p>
      `;
    })
    .catch(error => console.error(error));
});

function replaceHttpWithHttps(url) {
  return url.replace("http://", "https://");
}
