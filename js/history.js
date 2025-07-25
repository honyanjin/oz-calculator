/* 계산 기록 관리 모듈 */

// 충돌 테스트 용
let history = []; // History for exponent operations

// 계산 기록 저장 + 화면에 업데이트
export default function saveHistory(firstNumber, operator, secondNumber, result, history) {
  const record = { firstNumber, operator, secondNumber, result };
  const newHistory = [...history, record];
  console.log("계산 기록:", JSON.stringify(newHistory, null, 2));
  updateHistory(newHistory);
  return newHistory;
}

// 계산 기록을 화면에 표시
function updateHistory(history) {
  const historyElement = document.getElementById("history");
  if (historyElement) {
    historyElement.innerHTML = "";
    for (let i = history.length - 1; i >= 0; i--) {
      const item = history[i];
      const entry = document.createElement("div");
      entry.textContent = `${item.firstNumber} ${item.operator} ${item.secondNumber} = ${item.result}`;
      historyElement.appendChild(entry);
    }
  }
}

// 기록 표시 함수 추가
export function displayHistory(history) {
  let result = "계산 기록:\n";
  for (const record of history) {
    result += `${record.firstNumber} ${record.operator} ${record.secondNumber} = ${record.result}\n`;
  }
  return result || "기록이 없습니다.";
}
