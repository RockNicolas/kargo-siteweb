import { useEffect, useId, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { X, ArrowRight, Loader2, CheckCircle2, AlertCircle, Mail } from 'lucide-react'
import { contact } from '../data/content'

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

type EmailModalProps = {
  open: boolean
  onClose: () => void
}

export function EmailModal({ open, onClose }: EmailModalProps) {
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)
  const [form, setForm] = useState({ nome: '', email: '', mensagem: '' })
  const [status, setStatus] = useState<SubmitStatus>('idle')

  useEffect(() => {
    if (!open) return

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open) {
      setStatus('idle')
      setForm({ nome: '', email: '', mensagem: '' })
    }
  }, [open])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Contato por e-mail — ${form.nome || 'site Kargo'}`,
          from_name: form.nome || 'Site Kargo',
          replyto: form.email,
          Nome: form.nome,
          Email: form.email,
          Mensagem: form.mensagem,
        }),
      })
      const data = await res.json()

      if (data.success) {
        setStatus('success')
        setForm({ nome: '', email: '', mensagem: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Fechar"
        className="absolute inset-0 bg-asphalt-950/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 w-full max-w-md animate-fade-up rounded-2xl border border-asphalt-200 bg-white p-6 shadow-2xl shadow-asphalt-950/20 sm:p-7 dark:border-asphalt-800 dark:bg-asphalt-950"
      >
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-signal-500/10 text-signal-600 dark:text-signal-400">
            <Mail className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 id={titleId} className="font-display text-xl font-semibold text-asphalt-950 dark:text-white">
              Fale por e-mail
            </h2>
            <p className="mt-0.5 text-sm text-asphalt-500 dark:text-asphalt-400">
              Envie sua mensagem para {contact.email}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-asphalt-400 transition hover:bg-asphalt-100 hover:text-asphalt-700 dark:hover:bg-asphalt-800 dark:hover:text-white"
            aria-label="Fechar modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {status === 'success' ? (
          <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-5 text-center">
            <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            <p className="mt-3 font-medium text-asphalt-950 dark:text-white">Mensagem enviada!</p>
            <p className="mt-1 text-sm text-asphalt-500 dark:text-asphalt-400">
              A gente te retorna em breve no e-mail informado.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-asphalt-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-signal-500 dark:bg-signal-500 dark:text-asphalt-950 dark:hover:bg-signal-400"
            >
              Fechar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-asphalt-700 dark:text-asphalt-300">
                Nome
              </label>
              <input
                required
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                className="w-full rounded-lg border border-asphalt-200 px-3.5 py-2.5 text-base text-asphalt-950 outline-none transition focus:border-signal-500 focus:ring-2 focus:ring-signal-500/20 dark:border-asphalt-700 dark:bg-asphalt-900 dark:text-white dark:placeholder:text-asphalt-500"
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-asphalt-700 dark:text-asphalt-300">
                Seu e-mail
              </label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border border-asphalt-200 px-3.5 py-2.5 text-base text-asphalt-950 outline-none transition focus:border-signal-500 focus:ring-2 focus:ring-signal-500/20 dark:border-asphalt-700 dark:bg-asphalt-900 dark:text-white dark:placeholder:text-asphalt-500"
                placeholder="voce@empresa.com"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-asphalt-700 dark:text-asphalt-300">
                Mensagem
              </label>
              <textarea
                required
                rows={4}
                value={form.mensagem}
                onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                className="w-full resize-none rounded-lg border border-asphalt-200 px-3.5 py-2.5 text-base text-asphalt-950 outline-none transition focus:border-signal-500 focus:ring-2 focus:ring-signal-500/20 dark:border-asphalt-700 dark:bg-asphalt-900 dark:text-white dark:placeholder:text-asphalt-500"
                placeholder="Escreva o que deseja falar com a gente"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-asphalt-950 px-6 py-3 font-medium text-white transition hover:bg-signal-500 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-signal-500 dark:text-asphalt-950 dark:hover:bg-signal-400"
            >
              {status === 'submitting' ? (
                <>
                  Enviando...
                  <Loader2 className="h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  Enviar e-mail
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            {status === 'error' && (
              <p className="flex items-center gap-2 text-sm font-medium text-signal-600 dark:text-signal-400">
                <AlertCircle className="h-4 w-4 shrink-0" />
                Não deu pra enviar agora. Tente de novo ou chame no WhatsApp.
              </p>
            )}
          </form>
        )}
      </div>
    </div>,
    document.body,
  )
}
