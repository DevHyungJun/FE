export const ERROR_REQUIRED_FIELDS = "모든 항목을 입력해주세요";
export const ERROR_CATEGORY_NAME_REQUIRED = "카테고리 이름을 입력해주세요";
export const WARNING_FILE_SIZE_EXCEEDED = (maxSize: number, files: string[]) =>
  `다음 파일은 ${maxSize}MB를 초과하여 업로드할 수 없습니다:<br/><strong>${files.join(
    "<br/>"
  )}</strong>`;
