export type NewUser = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const registerDto = ({email,password,firstName,lastName}:NewUser) => ({
  first_name: firstName,
  last_name: lastName,  
  email,
  password,
  user_role: "user",
}
)