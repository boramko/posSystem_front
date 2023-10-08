// validationUtils.ts

/**
 * 이메일 형식이 올바른지 검사합니다.
 * @param email 검사할 이메일 문자열
 * @returns 이메일 형식이 올바르면 true, 그렇지 않으면 false
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  return emailRegex.test(email)
}

/**
 * 패스워드의 길이가 올바른지 검사합니다.
 * @param password 검사할 패스워드 문자열
 * @param minLength 최소 길이 (기본값: 8)
 * @returns 길이가 올바르면 true, 그렇지 않으면 false
 */
export const isValidPasswordLength = (
  password: string,
  minLength: number = 8
): boolean => {
  return password.length >= minLength
}

/**
 * 두 패스워드 문자열이 동일한지 검사합니다.
 * @param password 첫 번째 패스워드 문자열
 * @param confirmPassword 두 번째 패스워드 문자열
 * @returns 두 문자열이 동일하면 true, 그렇지 않으면 false
 */
export const isPasswordMatch = (
  password: string,
  confirmPassword: string
): boolean => {
  return password === confirmPassword
}

/**
 * 문자열에 공백이 포함되어 있는지 검사합니다.
 * @param str 검사할 문자열
 * @returns 공백이 포함되어 있으면 true, 그렇지 않으면 false
 */
export const containsWhitespace = (str: string): boolean => {
  return /\s/.test(str)
}
