document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const tab = tabs[0];
  
      // to count YouTube links and gather their information
      chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: findYouTubeLinks
      }, (results) => {
        if (results && results[0]) {
          const links = results[0].result;
          document.getElementById('linkCount').innerText = links.length;
  
          const linkListDiv = document.getElementById('linkList');
          links.forEach((link, index) => {
            const linkDiv = document.createElement('div');
            linkDiv.className = 'link-item';
            linkDiv.innerHTML = `<a href="${link.url}" target="_blank">${link.url}</a><span>Found in: ${link.context}</span>`;
            linkListDiv.appendChild(linkDiv);
          });
        }
      });
    });
  });
  
  // Function to be executed in the context of the webpage
  function findYouTubeLinks() {
    const links = document.getElementsByTagName('a');
    const youtubeLinks = [];
  
    for (let link of links) {
      if (link.href.includes('youtube.com') || link.href.includes('youtu.be')) {
        const context = link.innerText || 'No text content';
        youtubeLinks.push({ url: link.href, context: context });
      }
    }
  
    return youtubeLinks;
  }
  