/* 에러메시지 표시 및 제거 담당 모듈 */

// 화면에 에러 메시지를 표시
const showError = (message) => {
  const resultElement = document.getElementById("result");
  resultElement.classList.remove("d-none", "alert-info");
  resultElement.classList.add("alert-danger");
  resultElement.textContent = `에러: ${message}`;
};

//화면에서 에러 메시지를 제거
const removeError = () => {
  const resultElement = document.getElementById("result");
  resultElement.classList.add("d-none");
  resultElement.classList.remove("alert-danger");
};

// 함수들을 내보내기
export { showError, removeError };
