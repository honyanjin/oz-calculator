/* 계산기 애플리케이션의 모든 모듈을 통합하고 상태를 관리하는 메인 로직 파일 */

// 필요한 모듈 가져와라~~
import calculateOperation from "./operations.js";
import {
  resetDisplay as rd,
  setDisplay as sd,
  subDisplay as subd,
  appendNumber as an,
  setOperator as so,
  VALID_NUMBERS,
  VALID_OPERATORS,
} from "./input.js";
import { showError, removeError } from "./error.js";
import saveHistory from "./history.js";

// 애플리케이션의 상태를 관리하는 변수들
let history = []; // 계산 기록 배열
let currentInput = ""; // 현재 사용자가 입력 중인 값
let firstNumber = null; // 첫 번째 피연산자
let operator = null; // 선택된 연산자
let isError = false; // 에러 발생 여부 상태

// 계산기 상태를 초기화
function resetState() {
  currentInput = "";
  firstNumber = null;
  operator = null;
  isError = false;
}

// 디스플레이와 계산기 상태 모두 초기화
const resetDisplay = () => {
  currentInput = rd(); // input 모듈의 resetDisplay 호출
  resetState(); // 내부 상태 초기화
  sd("0"); // 화면에 "0" 표시
  removeError(); // 에러 메시지 제거
};

// 화면에 값을 표시
const setDisplay = (text) => {
  currentInput = sd(text);
};

// 현재 입력값에서 마지막 문자를 지우기
const subDisplay = () => {
  currentInput = subd(currentInput);
  sd(currentInput || "0"); // 입력값이 없으면 "0"을 표시
};

// 숫자를 입력받아 현재 입력값에 추가
const appendNumber = (number) => {
  if (isError) {
    resetDisplay();
  }
  currentInput = an(number, currentInput);
};

// 연산자를 설정
const setOperator = (op) => {
  try {
    operator = so(op, currentInput); // input 모듈의 setOperator 호출
    firstNumber = Number(currentInput); // 현재 입력값을 첫 번째 숫자로 설정
    currentInput = ""; // 다음 입력을 위해 현재 입력값 초기화
  } catch (error) {
    showError(error.message);
    isError = true;
  }
};

// 다른 모듈에서 사용할 수 있도록 함수와 상태 변수들을 내보내기
export {
  calculateOperation,
  resetDisplay,
  setDisplay,
  subDisplay,
  appendNumber,
  setOperator,
  showError,
  removeError,
  saveHistory,
  VALID_NUMBERS,
  VALID_OPERATORS,
  history,
  currentInput,
  firstNumber,
  operator,
  isError,
};

// 최종 계산을 수행하고 결과를 표시
export default function calculate() {
  try {
    if (firstNumber === null || operator === null || !currentInput) {
      isError = true;
      throw new Error("계산에 필요한 값이 부족합니다.");
    }
    const secondNumber = Number(currentInput);
    if (isNaN(secondNumber)) {
      isError = true;
      throw new Error("유효한 숫자를 입력하세요.");
    }
    // 실제 계산 수행
    const result = calculateOperation(firstNumber, secondNumber, operator);
    // 계산 기록 저장
    history = saveHistory(firstNumber, operator, secondNumber, result, history);

    // 결과 표시
    const resultElement = document.getElementById("result");
    resultElement.classList.remove("d-none", "alert-danger");
    resultElement.classList.add("alert-info");
    resultElement.textContent = `결과: ${result}`;

    // 다음 계산을 위해 상태 업데이트
    currentInput = result.toString();
    firstNumber = result;
    operator = null;
  } catch (error) {
    showError(error.message);
    isError = true;
  }
}
