import { ReactNode } from 'react'
import Button from '@mui/material/Button'

interface ButtonProps {
  label: string
  onClick: () => void
  variant?: string
  size?: string
  fontcolor?: string
  disabled?: boolean
  children?: ReactNode
}
const CommonButton: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant,
  size,
  fontcolor,
  disabled,
  children
}) => {
  const buttonStyle = {
    cursor: disabled ? 'not-allowed' : 'pointer',
    backgroundColor: variant || 'primary',
    fontSize: size || '14px',
    color: fontcolor || '#ffffff'
  }

  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={buttonStyle}
    >
      {label || 'Button'}
      {children}
    </Button>
  )
}

export default CommonButton
