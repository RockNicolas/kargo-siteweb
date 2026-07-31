import { useState } from 'react'
import type { FormEvent } from 'react'
import { MessageCircle, Mail, ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'

// TODO: troque pelos dados reais de contato antes de publicar
const WHATSAPP_NUMBER = '+5585997665652'
const CONTACT_EMAIL = 'supportkargo@gmail.com'
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, '').slice(0, 11)
  if (digits.length === 0) return ''
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export function CTASection() {
  const [form, setForm] = useState({ nome: '', empresa: '', telefone: '', mensagem: '' })
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Solicitação de demonstração — ${form.empresa || form.nome || 'site Kargo'}`,
          from_name: form.nome || 'Site Kargo',
          Nome: form.nome,
          Empresa: form.empresa,
          Telefone: form.telefone,
          Mensagem: form.mensagem,
        }),
      })
      const data = await res.json()

      if (data.success) {
        setStatus('success')
        setForm({ nome: '', empresa: '', telefone: '', mensagem: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contato" className="bg-concrete-100 py-20 dark:bg-asphalt-900 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Contato"
          title="Pronto para tirar sua operação da planilha?"
          description="Fale com a gente e veja o Kargo funcionando com a realidade da sua frota e das suas obras."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <div className="flex flex-col gap-4 lg:col-span-2">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Quero saber mais sobre o Kargo.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-asphalt-200 bg-white p-6 transition hover:border-signal-500 hover:shadow-lg hover:shadow-asphalt-950/5 dark:border-asphalt-800 dark:bg-asphalt-950"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-signal-500/10 text-signal-600 dark:text-signal-400">
                <MessageCircle className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-display font-semibold text-asphalt-950 dark:text-white">
                  Fale pelo WhatsApp
                </span>
                <span className="block text-sm text-asphalt-500 dark:text-asphalt-400">
                  Resposta rápida, direto com o time
                </span>
              </span>
              <ArrowRight className="ml-auto h-5 w-5 text-asphalt-300 transition group-hover:translate-x-1 group-hover:text-signal-500 dark:text-asphalt-600" />
            </a>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="group flex items-center gap-4 rounded-2xl border border-asphalt-200 bg-white p-6 transition hover:border-signal-500 hover:shadow-lg hover:shadow-asphalt-950/5 dark:border-asphalt-800 dark:bg-asphalt-950"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-signal-500/10 text-signal-600 dark:text-signal-400">
                <Mail className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-display font-semibold text-asphalt-950 dark:text-white">
                  Fale por e-mail
                </span>
                <span className="block break-all text-sm text-asphalt-500 dark:text-asphalt-400">
                  {CONTACT_EMAIL}
                </span>
              </span>
              <ArrowRight className="ml-auto h-5 w-5 text-asphalt-300 transition group-hover:translate-x-1 group-hover:text-signal-500 dark:text-asphalt-600" />
            </a>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-asphalt-200 bg-white p-6 sm:p-8 dark:border-asphalt-800 dark:bg-asphalt-950 lg:col-span-3"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-asphalt-700 dark:text-asphalt-300">
                  Nome
                </label>
                <input
                  required
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  className="w-full rounded-lg border border-asphalt-200 px-3.5 py-2.5 text-asphalt-950 outline-none transition focus:border-signal-500 focus:ring-2 focus:ring-signal-500/20 dark:border-asphalt-700 dark:bg-asphalt-900 dark:text-white dark:placeholder:text-asphalt-500"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-asphalt-700 dark:text-asphalt-300">
                  Empresa
                </label>
                <input
                  value={form.empresa}
                  onChange={(e) => setForm({ ...form, empresa: e.target.value })}
                  className="w-full rounded-lg border border-asphalt-200 px-3.5 py-2.5 text-asphalt-950 outline-none transition focus:border-signal-500 focus:ring-2 focus:ring-signal-500/20 dark:border-asphalt-700 dark:bg-asphalt-900 dark:text-white dark:placeholder:text-asphalt-500"
                  placeholder="Nome da empresa"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-asphalt-700 dark:text-asphalt-300">
                  Telefone
                </label>
                <input
                  type="tel"
                  inputMode="tel"
                  value={form.telefone}
                  onChange={(e) => setForm({ ...form, telefone: formatPhone(e.target.value) })}
                  className="w-full rounded-lg border border-asphalt-200 px-3.5 py-2.5 text-asphalt-950 outline-none transition focus:border-signal-500 focus:ring-2 focus:ring-signal-500/20 dark:border-asphalt-700 dark:bg-asphalt-900 dark:text-white dark:placeholder:text-asphalt-500"
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-asphalt-700 dark:text-asphalt-300">
                  Mensagem
                </label>
                <textarea
                  rows={3}
                  value={form.mensagem}
                  onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                  className="w-full resize-none rounded-lg border border-asphalt-200 px-3.5 py-2.5 text-asphalt-950 outline-none transition focus:border-signal-500 focus:ring-2 focus:ring-signal-500/20 dark:border-asphalt-700 dark:bg-asphalt-900 dark:text-white dark:placeholder:text-asphalt-500"
                  placeholder="Conte um pouco sobre sua frota ou suas obras"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-asphalt-950 px-6 py-3 font-medium text-white transition hover:bg-signal-500 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-signal-500 dark:text-asphalt-950 dark:hover:bg-signal-400 sm:w-auto"
            >
              {status === 'submitting' ? (
                <>
                  Enviando...
                  <Loader2 className="h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  Solicitar demonstração
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            {status === 'success' && (
              <p className="mt-3 flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                Mensagem enviada! A gente te retorna em breve.
              </p>
            )}
            {status === 'error' && (
              <p className="mt-3 flex items-center gap-2 text-sm font-medium text-signal-600 dark:text-signal-400">
                <AlertCircle className="h-4 w-4 shrink-0" />
                Não deu pra enviar agora. Tente de novo ou chama no WhatsApp acima.
              </p>
            )}
          </form>
        </div>
      </Container>
    </section>
  )
}
