const createTitle = (favoriteClone, favorite) => {
  const title = favoriteClone.querySelector('p')
  title.textContent = favorite.title;
}

const createImg = (favoriteClone, favorite) => {
  const img = favoriteClone.querySelector('img')
  img.src = favorite.imageSrc || '../images/lewagon.png';
  img.alt = favorite.title;
  img.width = 100;
}

const createCheckbox = (favoriteClone, favorite) => {
  const checkbox = favoriteClone.querySelector('input[type="checkbox"]')
  checkbox.value = favorite.title;
}

const displayFavorites = (favorites) => {
  const results = document.getElementById('results')
  const favoriteTemplate = document.getElementById('favoriteTemplate')
  results.innerHTML = ''

  favorites.forEach(favorite => {
    const favoriteClone = favoriteTemplate.content.cloneNode(true)
    createImg(favoriteClone, favorite)
    createTitle(favoriteClone, favorite)
    createCheckbox(favoriteClone, favorite)

    results.appendChild(favoriteClone);
  });
}

const getSelectedFavorites = (favoritesList, completedCheckboxes) => {
  const titles = Array.from(completedCheckboxes).map((checkbox) => checkbox.value)
  return favoritesList.filter((favorite) => titles.includes(favorite.title))
}


// Todo : signin form
const signIn = (form) => {
  const email = form.querySelector("input[name='email'").value
  const password = form.querySelector("input[name='password'").value
  fetch('http://localhost:3000/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  .then(response => response.json())
  .then(data => {
    chrome.storage.local.set({
      token: data.token,
      user: data.user
    })
    document.querySelector('.form-wrapper').classList.add('d-none')
    document.querySelector('.welcome-wrapper').classList.remove('d-none')
  })
}

const signInWrapper = document.querySelector('.form-wrapper')
const welcomeWrapper = document.querySelector('.welcome-wrapper')
const signInForm = document.getElementById("signIn")
const button = document.getElementById('select')

document.addEventListener('DOMContentLoaded', (event) => {
  chrome.storage.local.get(['token'], function(result) {
    console.log(result)
    if (result.token) {
      signInWrapper.classList.add('d-none')
      welcomeWrapper.classList.remove('d-none')
    }
  })
})

// Listener ici
signInForm.addEventListener('submit', (event) => {
  event.preventDefault()
  signIn(signInForm)
})

const insertFavorites = (favorites, submitBtn) => {
  displayFavorites(favorites)
  document.querySelector(".welcome-wrapper").classList.add('d-none')
  submitBtn.classList.remove('d-none')
}

const postFavorites = (favorites, submitBtn) => {
  const completedCheckboxes = document.querySelectorAll("input[name='selected-favorite']:checked")
  const filteredList = getSelectedFavorites(favorites, completedCheckboxes)
  chrome.runtime.sendMessage({action: 'postFavorites', data: filteredList}, function(response) {
    console.log(`Réponse du background script : ${response}`)
    if (response === 'created') {
      document.querySelector("#results").classList.add('d-none')
      document.querySelector(".success-title").classList.remove('d-none')
      submitBtn.classList.add('d-none')
    }
  })
}


const submitBtn = document.querySelector("#submitBtn")

button.addEventListener('click', (e) => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs[0].url === "https://www.leboncoin.fr/favorites") {
      chrome.tabs.sendMessage(tabs[0].id, {action: `selectLeBonCoinFavorites`}, function(response) {
        if (chrome.runtime.lastError) {
          console.error('Erreur:', chrome.runtime.lastError.message);
        } else {
          console.log('Réponse du content script:', response);
          insertFavorites(response, submitBtn)
          submitBtn.addEventListener('click', (event) => {
            postFavorites(response, submitBtn)
          })
        }
      })
    } else if (tabs[0].url === "https://www.vinted.fr/member/items/favourite_list") {
      chrome.tabs.sendMessage(tabs[0].id, {action: `selectVintedFavorites`}, function(response) {
        if (chrome.runtime.lastError) {
          console.error('Erreur:', chrome.runtime.lastError.message);
        } else {
          console.log('Réponse du content script:', response);
          insertFavorites(response, submitBtn)
          submitBtn.addEventListener('click', (event) => {
            postFavorites(response, submitBtn)
          })
        }
      })
    }
  });
})
