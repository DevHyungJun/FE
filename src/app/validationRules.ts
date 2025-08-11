export const usernameV = {
  required: "사용자명을 입력하세요",
  minLength: {
    value: 3,
    message: "사용자명은 3글자 이상이어야 합니다.",
  },
  maxLength: {
    value: 8,
    message: "사용자명은 8글자 이하여야 합니다.",
  },
};

export const emailV = {
  required: "이메일을 입력하세요",
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "이메일 형식이 아닙니다.",
  },
};

export const emailConfirmV = {
  required: "이메일 인증번호를 입력하세요",
};

export const passwordV = {
  required: "비밀번호를 입력하세요",
  minLength: {
    value: 6,
    message: "비밀번호는 6글자 이상이어야 합니다.",
  },
  maxLength: {
    value: 12,
    message: "비밀번호는 12글자 이하여야 합니다.",
  },
};

export const passwordConfirmV = {
  required: "비밀번호를 다시 입력하세요",
  validate: (value: string, values: { password: string }) => {
    return value === values.password || "비밀번호가 일치하지 않습니다.";
  },
};
