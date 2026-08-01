import type { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
}

export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 2xl:max-w-[1440px] 3xl:max-w-[1720px] 4xl:max-w-[2200px] ${className}`}
    >
      {children}
    </div>
  )
}
