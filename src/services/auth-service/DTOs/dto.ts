export type NewUser = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userRole?: string;
  confirmPassword: string;
  idNumber: string;
};

export type LoginUser = {
  email: string;
  password: string;
};

export const newUserDto = ({
  email,
  password,
  firstName,
  lastName,
  idNumber,
}: NewUser) => ({
  first_name: firstName,
  last_name: lastName,
  email,
  password,
  id_number: idNumber,
});
