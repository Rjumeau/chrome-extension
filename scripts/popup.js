const button = document.querySelector('#click')
button.addEventListener('click', (e) => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "select-modal"}, function(response) {
      console.log(response);
    });
  });
})
