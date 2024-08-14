const createCheckbox = () => {
  let newCheckBox = document.createElement('input')
  newCheckBox.type = 'checkbox'
  newCheckBox.classList.add('favorite-input')
  return newCheckBox
}

const createFavoriteDiv = () => {
  let favoriteDiv = document.createElement('div')
  favoriteDiv.classList.add('favorite')
  return favoriteDiv
}


let count = 0

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action == 'select-modal') {
      // count++
      // if (count === 1) {
      //   const allFavorites = document.querySelectorAll('[data-qa-id="aditem_container"')
      //   allFavorites.forEach((favorite) => {
      //     const favoriteDiv = createFavoriteDiv()
      //     favorite.parentNode.insertBefore(favoriteDiv, favorite)
      //     favoriteDiv.appendChild(favorite)
      //     const newCheckbox = createCheckbox()
      //     favoriteDiv.appendChild(newCheckbox)
      //   })
      // }
    }
  }
)
