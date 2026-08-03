# Kargo — Landing Page

Landing page de marketing do Kargo (sistema de gestão de frota e obras), feita com **React 19 + TypeScript + Vite + Tailwind CSS 4**.

## O que é o Kargo

O Kargo é um sistema de gestão de frota e obras: combustível, documentação veicular, manutenção e almoxarifado em um único painel, acessível de qualquer computador ou celular. A proposta é substituir a planilha, o papel e o controle manual — hoje o dono/gestor de uma empresa que tem veículo próprio e obra em andamento ao mesmo tempo lida com isso espalhado em planilhas soltas e ligações de um setor para o outro; o Kargo junta tudo num painel só, com histórico completo e alertas automáticos (documento perto de vencer, estoque baixo, manutenção atrasada).

Módulos: veículos e equipamentos, documentação veicular (IPVA, licenciamento, CNH, multas), combustível, manutenção, almoxarifado por obra, relatórios e painéis, alertas/notificações, e segurança de acesso por perfil. Tem integração de mão dupla com o **Sienge** (o estoque de cada obra fica sincronizado nos dois sistemas, sem lançar a mesma movimentação duas vezes).

## Páginas e seções

- **Home (`/`)** — Intro (hero com o painel do Kargo), "O dia a dia sem o Kargo" (as perguntas que a planilha não responde rápido), "Como funciona" (3 passos + vídeo de demonstração), "Módulos" (carrossel), "Integração Sienge", "Perfis de acesso" (Operadores vs. Cliente), "Por que isso importa" (benefícios) e "Contato" (formulário + WhatsApp/e-mail).
- **Sobre (`/about`)** — a história de como o Kargo nasceu (de uma ferramenta simples de controle de combustível até o sistema completo de hoje) e uma seção sobre o desenvolvedor, Nicolas Rock.

## Como rodar

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`.

### Variável de ambiente

O formulário de contato (seção "Contato" e modal de e-mail) envia via [Web3Forms](https://web3forms.com). Copie `.env.example` para `.env` e preencha:

```bash
VITE_WEB3FORMS_ACCESS_KEY=sua-chave-aqui
```

Sem a chave, o formulário continua renderizando normalmente, mas o envio falha.

## Build de produção

```bash
npm run build
npm run preview
```

## Lint

```bash
npm run lint
```

## Direção de design

- **Paleta:** `asphalt` (grafite/asfalto, neutro escuro), `concrete` (cinza claro, neutro) e `signal` (laranja de sinalização, cor de destaque) — definidas em `src/index.css`.
- **Tipografia:** `Oswald` (títulos — condensada, remete a sinalização rodoviária), `Inter` (texto corrido), `IBM Plex Mono` (rótulos, dados e o mock do painel).
- **Tema claro/escuro:** classe `.dark` na `<html>`, alternada pelo botão no header (`src/hooks/useTheme.ts`), com preferência salva em `localStorage` (`kargo-theme`). Padrão é escuro; o script inline em `index.html` aplica o tema antes do primeiro paint pra não piscar.
- O mock interativo do painel (`src/components/DashboardPreview.tsx`) sempre renderiza no tema escuro do produto real, independente do tema do site — é uma "janela" pro app, não uma seção de marketing.

## Estrutura

- `src/data/content.ts` — todos os textos de módulos, dores, perfis, benefícios, links de navegação e dados de contato. Edite aqui pra mudar conteúdo sem mexer nos componentes.
- `src/pages/` — `HomePage.tsx` (landing) e `SobrePage.tsx` (`/about`, história do produto + sobre o desenvolvedor). Roteamento em `src/pages/router.tsx` (React Router).
- `src/components/` — cada seção da home (Intro, PainPoints, HowItWorks, Features, SiengeSpotlight, AccessProfiles, Benefits, CTASection) mais Header/Footer, o carrossel de módulos (`ModulesCarousel.tsx`), o mock do painel (`DashboardPreview.tsx`) e o modal de contato por e-mail (`EmailModal.tsx`).
- `src/components/ui/` — primitivos compartilhados: `Container`, `SectionHeading`, `Reveal` (fade-in ao entrar na viewport, via `IntersectionObserver`).
- `src/components/Logo.tsx` — logo oficial (`public/Kargo.png` / `public/Kargo-light.png`).

## Antes de publicar

- [ ] Preencher `VITE_WEB3FORMS_ACCESS_KEY` no ambiente de produção.
- [ ] Trocar a foto placeholder de Nicolas Rock em `public/` (referenciada em `SobrePage.tsx`) se for atualizar a imagem.
- [ ] Preencher os links de redes sociais em `socialLinks` (`src/data/content.ts`) — hoje vazios, então não aparecem no rodapé.
- [ ] Conferir `og:title` / `og:description` em `index.html` antes de compartilhar o link em redes sociais.

## Deploy

Projeto estático — funciona em Vercel, Netlify ou qualquer hospedagem de site estático. Build: `npm run build`, output: `dist/`. Lembre de configurar `VITE_WEB3FORMS_ACCESS_KEY` nas variáveis de ambiente da hospedagem.
