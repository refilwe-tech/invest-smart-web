import { User } from "../models/models";

export const profileDto = (user:User)=>({
  last_name:user?.lastName,
  first_name: user?.firstName,
  phone_number: user?.phoneNumber,
  email:user?.email
})