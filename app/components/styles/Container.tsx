import { FC } from "react"

interface IContainer {
    children: React.ReactNode;
}

const Container:FC<IContainer> = ({children}) => {
  return (
    <div className="w-full max-w-[1920px] mx-auto px-12 py-4">
        {children}
    </div>
  )
}

export default Container