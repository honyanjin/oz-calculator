/* 입력 처리 관련 함수들을 모아놓은 모듈 */

// 유효한 숫자와 연산자를 정의
const VALID_NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const VALID_OPERATORS = ["+", "-", "*", "/", "^", "%"];
// 여기도 ^가 이미 있어서 주석을 추가했다.

// 디스플레이를 초기화하고 빈 문자열을 반환
const resetDisplay = () => {
  return "";
};

// 디스플레이에 텍스트를 표시
const setDisplay = (text) => {
  const display = document.getElementById("display");
  if (!display) throw new Error("디스플레이 요소를 찾을 수 없습니다.");
  display.textContent = text;
  return text;
};

// 현재 입력값에서 마지막 문자를 제거(백스페이스)
const subDisplay = (currentInput) => {
  if (currentInput.length > 0) {
    return currentInput.slice(0, -1);
  }
  return "";
};

// 현재 입력값에 숫자를 추가

const appendNumber = (number, currentInput) => {
  if (!VALID_NUMBERS.includes(number)) throw new Error("유효한 숫자를 입력하세요.");
  // 소수점이 이미 있는 경우, 또 다른 소수점 추가를 방지
  if (number === "." && currentInput.includes(".")) return currentInput;
  return setDisplay(currentInput + number);
};

// 연산자 설정
const setOperator = (op, currentInput) => {
  if (!VALID_OPERATORS.includes(op)) throw new Error("유효한 연산자를 선택하세요.");
  if (!currentInput) throw new Error("숫자를 먼저 입력하세요.");
  return op;
};

// 함수 및 상수들을 내보내기
export { resetDisplay, setDisplay, subDisplay, appendNumber, setOperator, VALID_NUMBERS, VALID_OPERATORS };
