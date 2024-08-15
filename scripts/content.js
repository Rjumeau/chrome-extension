
const observeImgMutation = (targetDiv) => {
  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        node.
      });
    });
  });

  mutationObserver.observe(targetDiv, {
    childList: true,
    subtree: true
  });
}





const getFavoriteInfos = (favorite) => {
  const title = favorite.querySelector('[data-qa-id="aditem_title"]').innerText
  const price = favorite.querySelector('[data-qa-id="aditem_price"]').innerText.match(/\d+/)[0]
  const lazyFavoriteDiv = favorite.querySelector('.LazyLoad')
  const img = observeImgMutation(lazyFavoriteDiv)
  console.log(img)
}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action == 'select') {
      const allFavorites = document.querySelectorAll('[data-test-id="adcard-outlined"')
      allFavorites.forEach((favorite) => {
        getFavoriteInfos(favorite)
      })
    }
  }
)
