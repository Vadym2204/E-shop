import { FC } from "react"

interface IBackDropProps {
    onClick: () => void
}

const BackDrop:FC<IBackDropProps> = ({onClick}) => {
  return (
    <div onClick={onClick} className='z-20 bg-slate-200 opacity-50 w-screen h-screen fixed top-0 left-0'>

    </div>
  )
}

export default BackDrop