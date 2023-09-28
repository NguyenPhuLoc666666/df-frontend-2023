import { FC } from 'react'

interface Props {
  darkMode: boolean
}
const Footer: FC<Props> = ({ darkMode }) => {
  return (
    <div className={`footer ${darkMode === true ? 'dark-mode' : ''}`}>
      Copyright © Nguyen Phu Loc - 2023
    </div>
  )
}
export default Footer
