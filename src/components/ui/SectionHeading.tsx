interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  dark?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  dark = false,
}: SectionHeadingProps) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <span
          className={`font-mono text-xs font-medium uppercase tracking-widest ${
            dark ? 'text-signal-400' : 'text-signal-600 dark:text-signal-400'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl ${
          dark ? 'text-white' : 'text-asphalt-950 dark:text-white'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            dark ? 'text-asphalt-300' : 'text-asphalt-600 dark:text-asphalt-300'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  )
}
