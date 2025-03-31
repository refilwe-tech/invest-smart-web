import { ButtonHTMLAttributes, FC, ReactNode } from "react"

export type ButtonProps = ButtonHTMLAttributes<HTMLBaseElement> & {
  children: ReactNode
}
export const Button:FC<ButtonProps> = ({children})=>( <button
  onClick={()=>void 0}
  className="hover:text-[#1E3A8A] flex bg-[#1E3A8A] hover:bg-[#0D9488] text-white items-center gap-2 hover:border hover:border-primary rounded-lg py-2 px-3 font-medium"
>
 {children}
</button>)