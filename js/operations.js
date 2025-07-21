// 두 숫자와 연산자를 받아 계산 결과를 반환
export default function calculateOperation(firstNumber, secondNumber, operator) {
  if (firstNumber === null || operator === null || secondNumber === null) {
    throw new Error("계산에 필요한 값이 부족합니다.");
  }

  if (isNaN(secondNumber)) {
    throw new Error("유효한 숫자를 입력하세요.");
  }

  if (operator === "/" && secondNumber === 0) {
    throw new Error("0으로 나눌 수 없습니다.");
  }

  let result; // 계산 결과를 저장할 변수

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
  return result;
}
