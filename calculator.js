const operators = ["+", "-", "*", "/", "^", "%"]; // const 사용
let history = []; // 계산 기록을 저장하는 배열
let currentInput = ""; // 현재 입력값
let firstNumber = null; // 첫 번째 숫자
let operator = null; // 선택된 연산자

// 숫자 버튼 클릭 시 디스플레이에 숫자 추가
const appendNumber = (number) => {
  try {
    if (number === ".") {
      if (currentInput.includes(".")) {
        return; // 이미 소수점이 있으면 추가하지 않음
      }
    } else if (!/^[0-9]$/.test(number)) {
      throw new Error("유효한 숫자를 입력하세요.");
    }

    // currentInput에 숫자 추가
    currentInput += number;

    // 디스플레이 업데이트
    const display = document.getElementById("display");
    if (!display) throw new Error("디스플레이 요소를 찾을 수 없습니다.");
    display.textContent = currentInput;
  } catch (error) {
    showError(error.message);
  }
};

// 연산자 버튼 클릭 시 연산자 설정
const setOperator = (op) => {
  try {
    if (!operators.includes(op)) throw new Error("유효한 연산자를 선택하세요.");

    // 처리할 숫자가 있는 경우
    if (currentInput !== "") {
      // 보류 중인 연산이 있으면 먼저 계산
      if (firstNumber !== null) {
        calculate(false); // 중간 결과는 표시하지 않음
      }
      // 새 연산을 위해 firstNumber 설정
      firstNumber = Number(currentInput);
      if (isNaN(firstNumber)) throw new Error("유효한 숫자를 입력하세요.");
      currentInput = "";
    }
    
    // 연산자 설정 (새 연산 또는 기존 연산자 변경)
    operator = op;

  } catch (error) {
    showError(error.message);
  }
};

// 초기화 버튼 클릭 시 모든 값 초기화
const clearDisplay = () => {
  currentInput = "";
  firstNumber = null;
  operator = null;
  document.getElementById("display").textContent = "0";
  document.getElementById("result").classList.add("d-none");
};

// 계산 실행
const calculate = (displayResult = true) => {
  const resultElement = document.getElementById("result");
  try {
    // TODO: 학생들이 작성해야 할 로직
    // 4. firstNumber, operator, currentInput(두 번째 숫자)이 모두 존재하는지 확인
    // 예: if (firstNumber === null || operator === null || !currentInput) throw new Error("계산에 필요한 값이 부족합니다.");
    if (firstNumber === null || operator === null || !currentInput) {
      throw new Error("계산에 필요한 값이 부족합니다.");
    }

    const secondNumber = Number(currentInput);

    // TODO: 학생들이 작성해야 할 로직
    // 5. secondNumber가 유효한 숫자인지 확인
    // 예: if (isNaN(secondNumber)) throw new Error("유효한 숫자를 입력하세요.");
    if (isNaN(secondNumber)) throw new Error("유효한 숫자를 입력하세요.");

    // 6. 나눗셈에서 secondNumber가 0인지 확인
    // 예: if (operator === "/" && secondNumber === 0) throw new Error("0으로 나눌 수 없습니다.");
    if (operator === "/" && secondNumber === 0) throw new Error("0으로 나눌 수 없습니다.");

    let result; // let도 사용
    // TODO: 학생들이 작성해야 할 로직
    // 7. operator에 따라 사칙연산 수행 (switch 문 사용 권장)
    // 예: switch (operator) { case "+": result = firstNumber + secondNumber; break; ... }
    switch (operator) {
      case "+":
        result = firstNumber + secondNumber;
        break;
      case "-":
        result = firstNumber - secondNumber;
        break;
      case "*":
        result = firstNumber * secondNumber;
        break;
      case "/":
        result = firstNumber / secondNumber;
        break;
      case "^":
        result = Math.pow(firstNumber, secondNumber);
        break;
      case "%":
        result = firstNumber % secondNumber;
        break;
      default:
        throw new Error("알 수 없는 연산자입니다.");
    }

    // 계산 후 초기화 (결과를 다음 계산의 첫 번째 숫자로 사용)
    currentInput = result.toString();
    firstNumber = result; // 다음 연산을 위해 결과 저장
    operator = null;

    if (displayResult) {
      document.getElementById("display").textContent = currentInput;
      // 결과 출력
      resultElement.classList.remove("d-none", "alert-danger");
      resultElement.classList.add("alert-info");
      resultElement.textContent = `결과: ${result}`;
    } else {
      // 중간 계산일 경우 화면에 표시하지 않고 firstNumber만 업데이트
      firstNumber = result;
    }
  } catch (error) {
    showError(error.message);
  }

  // 계산 기록 화면에 출력
  const historyElement = document.getElementById("history");
  if (historyElement) {
    historyElement.innerHTML = ""; // 기존 기록 초기화
    for (let i = history.length - 1; i >= 0; i--) {
      const item = history[i];
      const entry = document.createElement("div");
      entry.textContent = `${item.firstNumber} ${item.operator} ${item.secondNumber} = ${item.result}`;
      historyElement.appendChild(entry);
    }
  }
};

// 내역 지우기
const historyClear = () => {
  history = []; // 기록 배열 초기화

  const historyElement = document.getElementById("history");
  if (historyElement) {
    historyElement.innerHTML = ""; // 화면에서 기록 제거
  }
};

// 에러 메시지 출력
const showError = (message) => {
  const resultElement = document.getElementById("result");
  resultElement.classList.remove("d-none", "alert-info");
  resultElement.classList.add("alert-danger");
  resultElement.textContent = `에러: ${message}`;
};

// 백스페이스 기능
const backspace = () => {
  if (currentInput.length > 0) {
    currentInput = currentInput.slice(0, -1);
    document.getElementById("display").textContent = currentInput || "0";
  }
};

// 고양이 버튼 기능
const catAction = () => {
  alert("고양이는 귀엽다!");
};
