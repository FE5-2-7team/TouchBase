import { SignUpValue } from "../../types/userTypes";

export default function inputValidation(
  e: React.ChangeEvent<HTMLInputElement>,
  type: string,
  value: SignUpValue
) {
  let isValid: boolean = false;

  switch (type) {
    case "nickName":
      isValid = /^[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ]+$/.test(e.target.value);
      break;
    case "email":
      isValid = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
        e.target.value
      );
      break;
    case "password":
      isValid = /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,16}$/.test(e.target.value);
      break;
    case "checkPassword":
      isValid = e.target.value === value.password;
      break;
  }

  return isValid;
}
