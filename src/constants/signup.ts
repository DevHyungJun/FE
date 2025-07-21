// 회원가입 관련 상수 및 정적 데이터

export const GENERATIONS = [
  { key: 10, label: "10대" },
  { key: 20, label: "20대" },
  { key: 30, label: "30대" },
  { key: 40, label: "40대" },
  { key: 50, label: "50대" },
  { key: 60, label: "60대" },
  { key: 70, label: "70대" },
  { key: 80, label: "80대" },
  { key: 90, label: "90대" },
];

export const EMAIL_AUTH_TIME_SEC = 300;

export const ERROR_MESSAGES = {
  requiredAll: "모든 항목을 입력해주세요.",
  signupFail: "회원가입 실패",
  expiredAuth: "인증시간이 만료되었습니다. 다시 인증해주세요.",
};
