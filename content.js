// Create SVG elements for theater mode toggle button
const openSvgUrl = chrome.runtime.getURL("images/theater.svg");
const openImg = document.createElement("img");
openImg.src = openSvgUrl;
openImg.alt = "Open theater mode";

const closeSvgUrl = chrome.runtime.getURL("images/exittheater.svg");
const closeImg = document.createElement("img");
closeImg.src = closeSvgUrl;
closeImg.alt = "Close theater mode";

const tooltipSpan = document.createElement("span");

(function () {
  // Poll for video player controls to initialize theater mode button
  const checkInterval = setInterval(() => {
    const controlsContainer = document.querySelector(
      ".playkit-bottom-bar .playkit-right-controls"
    );
    if (controlsContainer) {
      const videoContainer = document.getElementById("player");
      if (!videoContainer) {
        return;
      }

      const wrapContainer = document.querySelector("#wrap.container");
      const mediaContainer = document.querySelector("#mediaContainer");
      const wrapperVideo = document.querySelector("#wrapper.video");

      // Avoid duplicate buttons
      if (controlsContainer.querySelector(".theater-mode-button")) {
        clearInterval(checkInterval);
        return;
      }

      // Create theater mode button container and elements
      const theaterControlContainer = document.createElement("div");
      theaterControlContainer.className =
        "playkit-control-button-container theater-mode-container";

      const theaterButton = document.createElement("button");
      theaterButton.className = "playkit-control-button theater-mode-button";
      theaterButton.setAttribute("type", "button");
      theaterButton.setAttribute("aria-label", "Theater Mode");
      theaterButton.innerHTML = openImg.outerHTML;

      const tooltipController = document.createElement("div");
      tooltipController.className = "playkit-tooltip";

      tooltipSpan.className =
        "playkit-tooltip-label playkit-tooltip-top playkit-hide";
      tooltipSpan.style = "max-width: 240px;";
      tooltipSpan.innerHTML = "Enter theater mode";

      tooltipController.appendChild(theaterButton);
      tooltipController.appendChild(tooltipSpan);
      theaterControlContainer.appendChild(tooltipController);

      // Insert before fullscreen button
      const fullscreenBtn = controlsContainer.children[2];
      controlsContainer.insertBefore(theaterControlContainer, fullscreenBtn);

      let theaterActive = false;
      theaterButton.addEventListener("click", function () {
        theaterActive = !theaterActive;
        if (theaterActive) {
          // Apply theater mode classes and update button state
          wrapContainer.classList.add("theater");
          mediaContainer.classList.add("theater");
          wrapperVideo.classList.add("theater");
          videoContainer.classList.add("theater-mode");
          theaterButton.setAttribute("aria-label", "Exit Theater Mode");
          theaterButton.innerHTML = closeImg.outerHTML;
          tooltipSpan.innerHTML = "Exit theater mode";
        } else {
          // Remove theater mode classes and reset button state
          wrapContainer.classList.remove("theater");
          mediaContainer.classList.remove("theater");
          wrapperVideo.classList.remove("theater");
          videoContainer.classList.remove("theater-mode");
          theaterButton.setAttribute("aria-label", "Theater Mode");
          theaterButton.innerHTML = openImg.outerHTML;
          tooltipSpan.innerHTML = "Enter theater mode";
        }
        tooltipSpan.classList.remove("playkit-show");
        tooltipSpan.classList.add("playkit-hide");
        clearTimeout(tm);
      });

      let tm;
      // Handle tooltip visibility on hover
      theaterButton.addEventListener("mouseover", function () {
        clearTimeout(tm);
        tm = setTimeout(() => {
          tooltipSpan.classList.remove("playkit-hide");
          tooltipSpan.classList.add("playkit-show");
        }, 750);
      });

      theaterButton.addEventListener("mouseleave", function () {
        tooltipSpan.classList.remove("playkit-show");
        tooltipSpan.classList.add("playkit-hide");
        clearTimeout(tm);
      });

      // Hide theater mode button when in fullscreen
      addEventListener("fullscreenchange", (event) => {
        if (
          document.querySelector(".playkit-player").classList.contains("playkit-fullscreen")
        ) {
          theaterControlContainer.style.display = "none";
        } else {
          theaterControlContainer.style.display = "";
        }
      });
    }
  }, 100);
})();