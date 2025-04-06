import { useQuery } from "@tanstack/react-query"
import { userService } from "../../../services"


export const ProfilePage = () => {
  const {data} = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => userService.getCurrentUser(),
  })
  console.log(data)
  return (
    <div>ProfilePage</div>
  )
}
