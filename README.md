# Kargo — Landing Page

Landing page de marketing do Kargo (sistema de gestão de frota e obras), feita com **React 19 + TypeScript + Vite + Tailwind CSS 4**.

## Como rodar

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`.

## Build de produção

```bash
npm run build
npm run preview
```

## Direção de design

- **Paleta:** `asphalt` (grafite/asfalto, neutro escuro), `concrete` (cinza claro, neutro) e `signal` (laranja de sinalização, cor de destaque) — definidas em `src/index.css`.
- **Tipografia:** `Oswald` (títulos — condensada, remete a sinalização rodoviária), `Inter` (texto corrido), `IBM Plex Mono` (rótulos, dados e o painel de instrumentos do hero).
- O visual de destaque do hero (`InstrumentCluster.tsx`) é inspirado num painel de instrumentos de veículo — os anéis "enchem" ao carregar a página.

## Estrutura

- `src/data/content.ts` — todos os textos de módulos, dores, perfis e benefícios. Edite aqui pra mudar o conteúdo sem mexer nos componentes.
- `src/components/` — cada seção da página (Hero, Features, Sienge, Perfis, etc).
- `src/components/Logo.tsx` — logo placeholder (ícone + "KARGO"). Troque pela logo real quando quiser.

## Antes de publicar

- [ ] Trocar a logo placeholder pela logo oficial (ex.: `<img src="/kargo-light.png" className="h-8 w-auto" alt="Kargo" />` no lugar do conteúdo de `Logo.tsx`).
- [ ] Trocar o número de WhatsApp e o e-mail de contato em `src/components/CTASection.tsx` e `src/components/Footer.tsx` (estão marcados com `TODO`).
- [ ] O formulário de contato usa `mailto:` (sem backend). Pra envio direto, dá pra plugar no Resend, já usado no backend do Kargo.
- [ ] Ajustar `og:title` / `og:description` em `index.html` se for compartilhar o link em redes sociais.

## Deploy

Projeto estático — funciona em Vercel, Netlify ou qualquer hospedagem de site estático. Build: `npm run build`, output: `dist/`.
