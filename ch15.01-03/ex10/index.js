const front = document.getElementById("editor-front");
const back = document.getElementById("editor-back");

front.style.backgroundColor = "white";

// div をクリック → input を focus
front.addEventListener("click", () => {
  back.focus();
});

// input が focus → div を silver に、blur → white に戻す
back.addEventListener("focus", () => {
  front.style.backgroundColor = "silver";
});

back.addEventListener("blur", () => {
  front.style.backgroundColor = "white";
});

// input の入力内容を div にリアルタイム表示
back.addEventListener("input", () => {
  front.textContent = back.value;
});
