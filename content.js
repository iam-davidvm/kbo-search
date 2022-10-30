const pageContent = document.body;

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.task === 'kbosearch') {
    console.log(req, sender);
    console.log(pageContent);
  }
  sendResponse('Done');
});
