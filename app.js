let genBtn = document.querySelector("#gen");
let quoteDis = document.querySelector("#quote");
let authorDis = document.querySelector("#author");
let copyBtn = document.querySelector("#copy");

genBtn.addEventListener("click", async () => {
  let { quote, author } = await getQuote();
  quoteDis.innerText = `"${quote}"`;
  authorDis.innerText = `- ${author}`;
});

copyBtn.addEventListener("click", async () => {
  copyText();
});

async function getQuote() {
  const res = await fetch("https://api.quotable.io/quotes/random");
  const data = await res.json();
  return {
    quote: data[0].content,
    author: data[0].author,
  };
}
function copyText() {
  const textToCopy = quoteDis.innerText + " " + authorDis.innerText;
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      showPopup();
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
}

function showPopup() {
  let popup = document.getElementById("popup");
  popup.style.display = "block";
  setTimeout(() => (popup.style.display = "none"), 2000);
}
