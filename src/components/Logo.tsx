interface LogoProps {
  className?: string
  dark?: boolean
}

export function Logo({ className = '', dark = false }: LogoProps) {
  if (dark) {
    return <img src="/Kargo.png" alt="Kargo" className={`h-9 w-auto sm:h-10 ${className}`} />
  }

  return (
    <>
      <img src="/Kargo-light.png" alt="Kargo" className={`h-9 w-auto dark:hidden sm:h-10 ${className}`} />
      <img src="/Kargo.png" alt="Kargo" className={`hidden h-9 w-auto dark:block sm:h-10 ${className}`} />
    </>
  )
}
