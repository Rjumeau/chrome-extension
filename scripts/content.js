const getLeBonCoinFavoriteInfos = (favorite, favoritesList) => {
  const title = favorite.querySelector('[data-qa-id="aditem_title"]').innerText
  const price = favorite.querySelector('[data-qa-id="aditem_price"]').innerText.match(/\d+/)[0]
  const image = favorite.querySelector('.LazyLoad').querySelector('img')

  const imageSrc = image?.src || null

  const favoriteObject = {
    title: title,
    price: parseInt(price),
    imageSrc: imageSrc,
    source: 'LeBonCoin'
  }
  favoritesList.push(favoriteObject)
}


const getVintedFavoriteInfos = (favorite, favoritesList) => {
  const title = favorite.querySelector(".new-item-box__description p").innerText
  const price = favorite.querySelector(".title-content").innerText.match(/\d+/)[0]
  const imageSrc = favorite.querySelector(".new-item-box__image .web_ui__Image__content").src

  const favoriteObject = {
    title, title,
    price: parseInt(price),
    imageSrc: imageSrc,
    source: 'Vinted'
  }
  favoritesList.push(favoriteObject)
}



chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action == 'selectLeBonCoinFavorites') {
      const favoritesList = []
      const allFavorites = document.querySelectorAll('[data-test-id="adcard-outlined"')
      allFavorites.forEach((favorite) => {
        getLeBonCoinFavoriteInfos(favorite, favoritesList)
      })
      sendResponse(favoritesList)
    } else if (request.action == 'selectVintedFavorites') {
      const favoritesList = []
      const allFavorites = document.querySelectorAll('[data-testid="grid-item"')
      allFavorites.forEach((favorite) => {
        getVintedFavoriteInfos(favorite, favoritesList)
      })
      sendResponse(favoritesList)
    }
  }
)
