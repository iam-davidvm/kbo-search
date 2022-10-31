chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.task === 'kbosearch') {
    let siteName = document
      .querySelector("meta[property='og:site_name']")
      .getAttribute('content');
    let URL = window.location.href;
    const ArrayURL = URL.split('//')[1].split('.');
    URL = ArrayURL.length >= 3 ? ArrayURL[1] : ArrayURL[0];
    siteName = siteName && siteName.length < 20 ? siteName : URL;
    response = {
      info: siteName,
      content: JSON.stringify(document.body.innerText),
    };
    sendResponse(response);
  }
});
