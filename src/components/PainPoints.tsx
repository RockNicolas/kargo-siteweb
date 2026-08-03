import { AlertCircle } from 'lucide-react'
import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { painPoints } from '../data/content'

export function PainPoints() {
  return (
    <section className="bg-concrete-100 py-20 dark:bg-black sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="O dia a dia sem o Kargo"
            title="Se essas perguntas demoram para ser respondidas, o problema não é sua equipe — é a planilha."
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {painPoints.map((p, i) => (
            <Reveal key={p} delay={i * 70}>
              <div className="flex items-start gap-3 rounded-xl bg-white p-5 shadow-sm ring-1 ring-asphalt-200/70 dark:bg-asphalt-900 dark:ring-asphalt-800/70">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-signal-500" />
                <p className="text-asphalt-700 dark:text-white">{p}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <p className="mt-10 max-w-2xl text-lg text-asphalt-600 dark:text-asphalt-300">
            O Kargo responde a tudo isso imediatamente, com histórico completo — sem depender de
            alguém lembrar de atualizar uma planilha.
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
