import {
  isValidURL,
  isExpired,
  isValidTimeString,
} from "src/api/validations/helpers";

describe("Test validations/validationHelper", () => {
  test("should return true if input value is a valid url", () => {
    expect(isValidURL("randomstring")).toBeFalsy();
    expect(isValidURL("1https://www.google.com.tw")).toBeFalsy();
    expect(isValidURL("https://www.google.com.tw")).toBeTruthy();
  });

  test("should return true input time has expired compared with now", () => {
    expect(isExpired("5000-5-5 3:3:3")).toBeFalsy();
    expect(isExpired("1970-5-5 3:3:3")).toBeTruthy();
  });

  test("should return true input value is a valid time string", () => {
    expect(isValidTimeString("helloworld")).toBeFalsy();
    expect(isValidTimeString("2022-04-01 21:00:00Zz")).toBeFalsy();
    expect(isValidTimeString("2022-04-01 21:00:00")).toBeTruthy();
    expect(isValidTimeString("2022-04-01 21:00:00Z")).toBeTruthy();
  });
});
