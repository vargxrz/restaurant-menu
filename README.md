# Restaurant Menu

Cardápio digital para restaurante com sistema de pedidos via WhatsApp.

## Funcionalidades

- **Cardápio categorizado** — Hambúrgueres, Bebidas e Sobremesas organizados por seção
- **Carrinho de compras** — Adicione, ajuste quantidades e veja o total em tempo real
- **Pedido via WhatsApp** — Checkout envia o pedido formatado direto para o WhatsApp do restaurante
- **Status do restaurante** — Indica se está aberto ou fechado com base no horário (Qua–Seg, 18h–23h)
- **Scrollspy** — Navegação por categoria destaca a seção visível automaticamente
- **Animações de reveal** — Cards aparecem com fade-in ao entrar na viewport
- **Notificações toast** — Feedback visual ao adicionar itens ao carrinho
- **Responsivo** — Layout adaptado para mobile e desktop

## Como rodar

Pré-requisito: Node.js 18+

```bash
git clone https://github.com/seu-usuario/restaurant-menu.git
cd restaurant-menu
npm install
npm run dev   # compila Tailwind em modo watch
npm run db    # sobe json-server na porta 3030 (opcional)
```

Abra `index.html` direto no navegador ou use uma extensão Live Server.

## Estrutura

```
restaurant-menu/
├── index.html          # markup principal — header, hero, nav, seções, footer
├── script.js           # toda a lógica client-side
├── styles/
│   ├── style.css       # tokens do tema escuro, header, animações
│   └── output.css      # Tailwind compilado (não editar)
├── assets/             # imagens dos produtos
├── db.json             # mock de produtos (json-server)
├── tailwind.config.js  # paleta e tipografia customizadas
└── package.json
```

## Stack

| Tecnologia | Uso |
|---|---|
| Vanilla JS (ES6+) | Lógica, estado do carrinho, renderização do menu |
| Tailwind CSS 3 | Estilização utilitária |
| CSS customizado | Tema escuro, tokens de cor, animações |
| Font Awesome 6 | Ícones |
| Google Fonts | Cormorant Garamond + Outfit |
| Toastify.js | Notificações toast |
| JSON Server | Mock de API local |

## Seções do cardápio

| Seção | Itens | Faixa de preço |
|---|---|---|
| Hambúrgueres | 5 | R$ 18,90 – R$ 35,90 |
| Bebidas | 3 | R$ 4,00 – R$ 6,00 |
| Sobremesas | 4 | R$ 12,00 – R$ 22,00 |

## Fluxo de pedido

1. Cliente navega pelo cardápio e adiciona itens ao carrinho
2. Abre o painel do carrinho e informa o endereço de entrega
3. Clica em **Fazer pedido** — abre WhatsApp com mensagem formatada pronta para enviar

## Horário de funcionamento

Quarta a Segunda, das 18h às 23h. Terça: fechado.
O status é calculado no cliente com base no horário local do usuário.
