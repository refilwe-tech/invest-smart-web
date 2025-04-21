export const isChecksumValid = (idNumber: string): boolean => {
  const parity = idNumber.length % 2;
  let sum = 0;

  for (let i = idNumber.length - 1; i >= 0; i--) {
    let d = Number.parseInt(idNumber.charAt(i));
    if (i % 2 === parity) d *= 2;
    if (d > 9) d -= 9;
    sum += d;
  }
  return sum % 10 === 0;
};

export const isIdNumberValid = (idNumber: string): boolean => {
  const regDigits = /^\d+$/;
  const month = Number.parseInt(idNumber.slice(2, 4));
  const day = Number.parseInt(idNumber.slice(4, 6));
  const citizenStatus = Number.parseInt(idNumber.slice(10, 11));

  if (idNumber.length !== 13) return false;
  if (!regDigits.test(idNumber)) return false;
  if (month > 12 || month <= 0) return false;
  if (day > 31 || day <= 0) return false;
  if (citizenStatus !== 0 && citizenStatus !== 1) return false;
  if (!isChecksumValid(idNumber)) return false;

  return true;
};
