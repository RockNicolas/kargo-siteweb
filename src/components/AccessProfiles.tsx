import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { profiles } from '../data/content'

const stripeColor: Record<string, string> = {
  Operadores: 'bg-signal-500',
  Cliente: 'bg-asphalt-200',
}

export function AccessProfiles() {
  return (
    <section id="profiles" className="bg-white py-20 dark:bg-black sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Perfis de acesso"
            title="Cada pessoa vê apenas o que precisa ver."
            description="Como um crachá de acesso: o nível de cada perfil define exatamente o que a pessoa enxerga no painel."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {profiles.map((profile, i) => (
            <Reveal key={profile.title} delay={i * 90}>
              <div className="overflow-hidden rounded-2xl border border-asphalt-200 dark:border-asphalt-800">
                <div className={`h-1.5 ${stripeColor[profile.title]}`} />
                <div className="p-7">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-asphalt-400">
                    Acesso · {profile.level}
                  </span>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-concrete-100 text-asphalt-950 dark:bg-asphalt-800 dark:text-white">
                      <profile.icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-lg font-semibold text-asphalt-950 dark:text-white">
                      {profile.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-asphalt-600 dark:text-asphalt-300">
                    {profile.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
