import calculate, { appendNumber, setOperator, resetDisplay, subDisplay, VALID_NUMBERS, VALID_OPERATORS, history } from "./index.js";

// HTML에서 직접 호출할 수 있도록 함수들을 전역 스코프에 할당
window.appendNumber = appendNumber;
window.setOperator = setOperator;
window.clearDisplay = resetDisplay; // clearDisplay는 resetDisplay를 사용
window.backspace = subDisplay;
window.calculate = calculate;
window.catAction = () => alert("고양이는 귀엽다!");
window.historyClear = () => {
  history.length = 0;
  document.getElementById("history").innerHTML = "";
};

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (VALID_NUMBERS.includes(key)) appendNumber(key);
  if (VALID_OPERATORS.includes(key)) setOperator(key);
  if (key === "Enter" || key === "=") calculate();
  if (key === "Escape") resetDisplay();
  if (key === "Backspace") subDisplay();
});
