import { B, C, Callout, H2, H3, L, Menu, P, Rotas, Step, Steps, Table } from '../ui'

export function SiengeComoConectar() {
  return (
    <>
      <H2>Antes de começar</H2>
      <P>Você vai precisar de:</P>
      <Steps>
        <Step titulo="API do Sienge contratada">
          Qualquer plano serve, inclusive o gratuito (Free). A diferença entre os planos é quantas consultas por dia
          o Sienge permite.
        </Step>
        <Step titulo="Um usuário de integração no Sienge">
          Peça ao responsável pelo Sienge na sua empresa para criar um usuário de API e liberar para ele as rotas
          listadas em{' '}
          <L to="/docs/manual/sienge-como-conectar#liberacoes-do-usuario-de-api">Liberações do usuário de API</L>.
        </Step>
        <Step titulo="Permissão de acesso ao Sienge no Kargo">
          Administrador, ou operador com a opção Sienge liberada — veja{' '}
          <L to="/docs/manual/perfis-de-acesso">Perfis de acesso</L>.
        </Step>
      </Steps>

      <H2>Liberações do usuário de API</H2>
      <P>
        O usuário de integração só consegue fazer no Sienge o que foi liberado para ele. Quem libera é um
        administrador do Sienge, rota por rota:
      </P>
      <Steps>
        <Step titulo="Abra as Integrações do Sienge">
          Entre no Sienge com um usuário administrador e clique em <B>Integrações</B>, no canto superior direito.
        </Step>
        <Step titulo="Edite o usuário do Kargo">
          No menu da esquerda, vá em <Menu itens={['APIs', 'Usuários de APIs']} /> e clique no lápis do usuário de
          integração.
        </Step>
        <Step titulo="Marque as rotas">
          Em <B>Autorizações por recurso</B>, pesquise cada recurso e marque as rotas abaixo.
        </Step>
      </Steps>
      <Callout tipo="dica" titulo="Vai usar só o Almoxarifado agora?">
        <p>
          Libere Webhooks, Almoxarifado (leitura) e Almoxarifado (envio). Ativos e Contas a Pagar podem ficar para
          quando essas áreas forem ligadas.
        </p>
      </Callout>

      <H3>Webhooks — obrigatório para ligar o automático do Almoxarifado</H3>
      <Rotas
        itens={[
          { metodo: 'GET', caminho: '/hooks', descricao: 'Ver os webhooks já cadastrados na conta.' },
          { metodo: 'POST', caminho: '/hooks', descricao: 'Registrar o webhook do Kargo.' },
          { metodo: 'GET', caminho: '/hooks/{hookId}', descricao: 'Consultar um webhook.' },
          { metodo: 'DELETE', caminho: '/hooks/{hookId}', descricao: 'Trocar ou remover o webhook do Kargo.' },
        ]}
      />
      <Callout tipo="info" titulo="Eventos do webhook">
        <p>
          O Kargo se inscreve em <C>INVENTORY_MOVEMENT_CREATED</C>, <C>INVENTORY_MOVEMENT_UPDATED</C> e{' '}
          <C>INVENTORY_MOVEMENT_DELETED</C> num único registro — não é preciso liberar evento por evento.
        </p>
        <p>
          Webhooks de outros sistemas na mesma conta do Sienge (um CRM, por exemplo) continuam como estão: o Kargo
          só mexe nos que ele mesmo criou.
        </p>
      </Callout>

      <H3>Almoxarifado — leitura</H3>
      <Rotas
        itens={[
          {
            metodo: 'GET',
            caminho: '/stock-inventories/{costCenterId}/items',
            descricao: 'Saldo de cada obra. É o que o Kargo consulta quando o webhook avisa de uma mudança.',
          },
          {
            metodo: 'GET',
            caminho: '/inventory-movements',
            descricao:
              'Tipos de movimento usados no Sienge. É também o recurso ligado aos eventos de estoque do webhook.',
          },
          { metodo: 'GET', caminho: '/cost-centers', descricao: 'Obras (centros de custo), para vincular ou importar.' },
          { metodo: 'GET', caminho: '/document-identifications/{id}', descricao: 'Tipo de documento dos movimentos.' },
          { metodo: 'GET', caminho: '/resource-groups', descricao: 'Grupos de insumo.' },
          {
            metodo: 'GET',
            caminho: '/building-cost-estimations/{buildingId}/sheets',
            descricao: 'Opcional — só para obras com apropriação por orçamento.',
          },
          {
            metodo: 'GET',
            caminho: '/building-cost-estimations/{buildingId}/sheets/{id}/items',
            descricao: 'Opcional — só para obras com apropriação por orçamento.',
          },
        ]}
      />

      <H3>Almoxarifado — envio do Kargo para o Sienge</H3>
      <Rotas
        itens={[
          { metodo: 'POST', caminho: '/stock-movements', descricao: 'Entradas e saídas.' },
          { metodo: 'POST', caminho: '/stock-movements/transfer', descricao: 'Transferências entre obras.' },
        ]}
      />

      <H3>Movimentação de Ativos</H3>
      <Rotas
        itens={[
          { metodo: 'GET', caminho: '/patrimony/movable', descricao: 'Bens móveis e a obra onde cada um está.' },
        ]}
      />

      <H3>Contas a Pagar</H3>
      <Rotas
        itens={[
          { metodo: 'GET', caminho: '/bills/{billId}', descricao: 'Dados do título informado na manutenção.' },
          { metodo: 'GET', caminho: '/bills/{billId}/installments', descricao: 'Parcelas do título.' },
          { metodo: 'GET', caminho: '/bills/{billId}/attachments', descricao: 'Anexos do título (normalmente a nota fiscal).' },
          { metodo: 'GET', caminho: '/bills/{billId}/attachments/{attachmentId}', descricao: 'Arquivo do anexo.' },
          { metodo: 'GET', caminho: '/creditors/{creditorId}', descricao: 'Nome do fornecedor ou oficina.' },
          {
            metodo: 'GET',
            caminho: '/bulk-data/v1/outcome/by-bills',
            descricao:
              'Conferência das baixas. É uma consulta em massa: usa a cota de consultas em massa do plano, separada da cota normal.',
          },
        ]}
      />
      <Callout tipo="aviso" titulo="Apareceu erro de permissão?">
        <p>
          Se o teste de conexão, o registro do webhook ou uma sincronização disser que falta permissão no Sienge,
          alguma das rotas acima ainda não foi marcada para o usuário de integração.
        </p>
      </Callout>

      <H2>1. Cadastrar a credencial</H2>
      <P>
        Em <Menu itens={['Integração Sienge']} />, abra a credencial e preencha:
      </P>
      <Table
        colunas={['Campo', 'O que colocar']}
        linhas={[
          [<B>Endereço do Sienge</B>, <>No formato <C>{'https://api.sienge.com.br/<subdominio>/public/api/v1'}</C>, com o subdomínio da sua empresa no Sienge.</>],
          [<B>Autenticação</B>, 'Usuário e senha do usuário de integração, ou chave de acesso (Client ID e Client Secret), conforme o que o Sienge liberou.'],
          [<B>Plano contratado</B>, 'O plano de API que a sua empresa tem com o Sienge (veja a tabela abaixo).'],
        ]}
      />
      <P>
        Salve e use o teste de conexão. A senha e a chave ficam guardadas criptografadas.
      </P>

      <H2>2. Escolher o plano certo</H2>
      <Table
        colunas={['Plano', 'Consultas por dia']}
        linhas={[
          ['Free', '100'],
          ['Start', '1.000'],
          ['Special', '2.500'],
          ['Essencial', '5.000'],
          ['Enterprise', '10.000'],
          ['Ultimate', '75.000'],
        ]}
      />
      <Callout tipo="aviso" titulo="Escolha o plano que você realmente tem">
        <p>
          O Sienge não informa qual é o plano da empresa, então o Kargo usa o que você escolher para dividir a cota
          do dia. Se escolher um plano maior que o contratado, o Sienge começa a recusar consultas antes da hora —
          e o Kargo mostra um aviso sugerindo conferir o plano.
        </p>
      </Callout>

      <H2>3. Vincular as obras</H2>
      <P>
        Cada obra do Kargo precisa saber qual é o centro de custo dela no Sienge. Na área de obras da integração
        dá para trazer uma obra direto do Sienge (com o estoque dela) ou ligar uma obra que já existe no Kargo ao
        centro de custo correspondente. Obra sem vínculo simplesmente não sincroniza.
      </P>

      <H2>4. Vincular os tipos de movimento</H2>
      <P>
        Para o Kargo enviar entradas e saídas, cada tipo de movimento (compra, consumo, transferência…) precisa
        estar associado ao tipo de movimento e ao documento correspondentes no Sienge. A tela lista os tipos do
        Sienge para você escolher. Tipo sem vínculo não é enviado.
      </P>

      <H2>5. Registrar o webhook</H2>
      <P>
        O webhook é o canal pelo qual o Sienge avisa o Kargo quando algo muda no estoque. É um clique: o Kargo
        monta o endereço da sua empresa e faz o registro no Sienge. Depois disso, a tela mostra quando chegou o
        último aviso — um bom sinal de que está tudo funcionando.
      </P>

      <H2>6. Ligar o automático</H2>
      <P>Cada área tem a própria chave <B>Automático</B>:</P>
      <Table
        colunas={['Área', 'O que a chave liga']}
        linhas={[
          [<B>Almoxarifado</B>, 'O envio das entradas, saídas e transferências ao Sienge. Só liga com o webhook registrado. A leitura do estoque funciona mesmo com a chave desligada.'],
          [<B>Movimentação de Ativos</B>, 'A atualização da obra de cada ativo a cada 15 minutos. Antes, vincule os ativos aos bens do Sienge (pela placa ou criando a partir do cadastro de lá).'],
          [<B>Contas a Pagar</B>, 'A conferência, em horário comercial, das baixas de título das manutenções.'],
        ]}
      />
      <Callout tipo="dica" titulo="Comece pequeno">
        <p>
          Vincule uma obra só, faça uma entrada de teste pequena e confira no Sienge. Com isso funcionando, vincule
          o resto.
        </p>
      </Callout>
    </>
  )
}
