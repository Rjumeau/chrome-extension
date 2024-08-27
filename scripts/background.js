
// Call Post method
const postFavorites = (favorites) => {
  chrome.storage.local.get(['token', 'user'], function(result) {
    const token = result.token;
    const email = result.user.email;
    console.log([token, email])
    if (token && email) {
      fetch('http://localhost:3000/api/v1/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Email': email,
          'X-User-Token': token
        },
        body: JSON.stringify({ favorites: favorites })
      })
      .then(response => response.json())
      .then(data => console.log(data))
    }
  });
}


// Appel du post ici
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === 'postFavorites') {
      postFavorites(request.data)
      sendResponse('created')
    }
  }
)
