export type NewUser = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userRole?: string;
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
  userRole = "user",
}: NewUser) => ({
  first_name: firstName,
  last_name: lastName,
  email,
  password,
  user_role: userRole,
});
