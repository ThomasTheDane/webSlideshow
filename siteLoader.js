const URL_PREFIX = "https://business.google.com/website/";
const SLEEP_TIME_MS = 60000; // 1 minute.

loadSiteNames = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
        url: "/allPrestoSites",
        cache: false,
        method: "GET",
        success: (data) => {
          siteNames = data.split("\n");
          resolve(siteNames);
        },
        error: (xhr) => {
          console.log("failed to get data")
          reject();
        },
      });
  });
};

getUrlsFromNames = (siteNames) => {
  return siteNames.map((name) => {
    return URL_PREFIX + name;
  });
};

showSiteLoop = (urls) => {
  const leftFrame = document.getElementById("iframe1");
  const rightFrame = document.getElementById("iframe2");
  const leftFrameLabel = document.getElementById("frameLabel1");
  const rightFrameLabel = document.getElementById("frameLabel2");
  let currentIndex = 0;

  showSites = () => {
    const leftUrl = urls[currentIndex];
    currentIndex++;
    const rightUrl = urls[currentIndex];
    currentIndex++;

    leftFrame.src = leftUrl;
    rightFrame.src = rightUrl;

    leftFrameLabel.textContent = leftUrl;
    rightFrameLabel.textContent = rightUrl;

    if (currentIndex == urls.length-1) {
      currentIndex = 0;
    }
  }

  // Loop to show sites continuously.
  setInterval(() => {
    showSites()
  }, SLEEP_TIME_MS);

  // Show two sites immediately.
  showSites();
}

$(document).ready(() => {
  loadSiteNames().then((siteNames) => {
    const siteUrls = getUrlsFromNames(siteNames);
    showSiteLoop(siteUrls);
  });
});
