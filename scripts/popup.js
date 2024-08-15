const button = document.getElementById('select')
button.addEventListener('click', (e) => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "select"}, function(response) {
      console.log(response);
    });
  });
})
