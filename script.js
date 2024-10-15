const flowingText = "Thetford Mines - Virtuel partout au Québec";
const flowingImageHref =
  "https://box11.domaineinternet.ca/~cliniqueautrem/wp-content/uploads/2024/09/blob-sourire.svg";
const flowingTextId = "text-flowing";
// const flowingPathId = "path-flowing";
const animationSpeed = 1;
const repeatedCount = 10;
const hiddenSpanSize = 50;
const animationInterval = 10;

document.addEventListener("DOMContentLoaded", startMarquee);

function startMarquee() {
  const flowingTextEl = document.getElementById(flowingTextId);
  flowingTextEl.innerHTML = duplicateTextContent(flowingText, repeatedCount);
  createImages();

  const pathLength = getTSpanWidth();
  let offset = 0;

  setInterval(() => {
    offset += animationSpeed;
    if (offset > pathLength) {
      offset = 0;
    }
    flowingTextEl.setAttribute("startOffset", `${offset}px`);
    animateImages();
  }, animationInterval);
}

function duplicateTextContent(textContent, count) {
  let duplicatedText = "";
  for (let i = 0; i < count; i++) {
    duplicatedText += `<tspan id="tspan-${i}">${textContent}<tspan id="tspan-space-${i}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</tspan></tspan>`;
  }
  return duplicatedText;
}

function createImages() {
  const imagesContainer = document.getElementById("images-container");
  for (let i = 0; i < repeatedCount; i++) {
    const tSpanEl = document.getElementById(`tspan-${i}`);
    const spanRect = tSpanEl.getBoundingClientRect();
    const tSpanSpaceEl = document.getElementById(`tspan-space-${i}`);
    const spaceRect = tSpanSpaceEl.getBoundingClientRect();

    if (
      spanRect.width > hiddenSpanSize &&
      spanRect.right - 32 < window.innerWidth
    ) {
      const imgEl = document.createElement("img");
      imgEl.id = `img-${i}`;
      imgEl.src = flowingImageHref;
      imgEl.style.position = "absolute";
      imgEl.style.left = spaceRect.left + spaceRect.width / 2 - 9 - 9 + "px";
      imgEl.style.top = spaceRect.top + spaceRect.height / 2 - 9 - 6 + "px";
      imgEl.classList.add("responsive-img");
      imgEl.width = 18;
      imgEl.height = 18;
      imgEl.alt = "alt";

      imagesContainer.appendChild(imgEl);
    }
  }
}

function getTSpanWidth() {
  let maxWidth = 0;
  for (let i = 0; i < repeatedCount; i++) {
    const tSpanSpaceEl = document.getElementById(`tspan-${i}`);
    const rect = tSpanSpaceEl.getBoundingClientRect();
    if (rect.width > maxWidth) {
      maxWidth = rect.width;
    }
  }
  return maxWidth;
}

function animateImages() {
  const imagesContainer = document.getElementById("images-container");
  imagesContainer.innerHTML = "";
  createImages();
}
