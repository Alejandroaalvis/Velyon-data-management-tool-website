window.addEventListener("load", () => {
  // ── File Upload Preview ───────────────────────────────────────
  const input = document.getElementById("upload");
  const filewrapper = document.getElementById("filewrapper");

  if (!input || !filewrapper) {
    console.warn("File upload elements not found");
    return;
  }

  input.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileName = file.name;
    const filetype = fileName.split(".").pop().toLowerCase(); // safer than input.value

    fileshow(fileName, filetype);
  });

  const fileshow = (fileName, filetype) => {
    const showfileboxElem = document.createElement("div");
    showfileboxElem.classList.add("showfilebox");

    // Left side (icon + name)
    const leftElem = document.createElement("div");
    leftElem.classList.add("left");

    const fileTypeElem = document.createElement("span");
    fileTypeElem.classList.add("filetype"); // fixed: classList.addd → add
    fileTypeElem.textContent = filetype.toUpperCase(); // nicer display
    leftElem.appendChild(fileTypeElem);

    const filetitleElem = document.createElement("h3");
    filetitleElem.textContent = fileName;
    leftElem.appendChild(filetitleElem);

    showfileboxElem.appendChild(leftElem);

    // Right side (remove button)
    const rightElem = document.createElement("div");
    rightElem.classList.add("right");

    const crossElem = document.createElement("span");
    crossElem.innerHTML = "×"; // better character than &#215;
    crossElem.style.cursor = "pointer";
    crossElem.title = "Remove file";

    // Optional: actually remove the preview when clicked
    crossElem.addEventListener("click", () => {
      showfileboxElem.remove();
      input.value = ""; // clear the input too
    });

    rightElem.appendChild(crossElem);
    showfileboxElem.appendChild(rightElem);

    filewrapper.appendChild(showfileboxElem);
  };
});
