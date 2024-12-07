import { SignInResDto } from "@/service/sign-in-up";
import { storageKey } from "@/constants/common";

export function removeSpaces(str: string) {
  return (str || "").replace(/\s+/g, "");
}

export function removeSpacesFromObject(obj: Record<string, any>) {
  const newObj: Record<string, any> = {};
  Object.keys(obj).forEach((key) => {
    newObj[key] = removeSpaces(obj[key]);
  });
  return newObj;
}

export function signInSuccessAction(userInfo: SignInResDto) {
  try {
    localStorage.setItem(
      storageKey["userInfo"],
      JSON.stringify(userInfo || {})
    );
    const searchIns = new URLSearchParams(location.search);
    const redirectUrl = searchIns.get("redirectUrl");
    window.location.href = redirectUrl || "/charts";
  } catch (err) {
    console.error(err);
  }
}

export function getUserInfo(): SignInResDto {
  try {
    const userInfo = JSON.parse(
      localStorage.getItem(storageKey["userInfo"]) || "{}"
    );
    return userInfo as unknown as SignInResDto;
  } catch {
    return {} as unknown as SignInResDto;
  }
}

export function findKeyByValueFromMapping<T>(mapping: Record<any, Array<T>>) {
  return function (value: T) {
    for (const key in mapping) {
      if (mapping[key].includes(value)) {
        return key;
      }
    }
  };
}
