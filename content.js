chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.task === 'kbosearch') {
    sendResponse(JSON.stringify(document.body.innerText));
  }
});
