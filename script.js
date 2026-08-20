'use strict';

// ============================================================
// MENU DATA
// ============================================================
const MENU = {
  burgers: [
    {
      id: 1,
      name: 'Smash Burger Clássico',
      desc: 'Pão artesanal, burger smash 160g, queijo americano, maionese especial da casa',
      price: 18.90,
      img: 'assets/hamburguer-smash.png'
    },
    {
      id: 2,
      name: 'Double Smash',
      desc: 'Pão artesanal, 2x burger smash 160g, queijo duplo, alface, molho especial',
      price: 32.90,
      img: 'assets/hamburguer-duplo.png'
    },
    {
      id: 3,
      name: 'Verde & Fresco',
      desc: 'Burger 160g, queijo, alface crocante, tomate fresco, cebola roxa, mostarda dijon',
      price: 35.90,
      img: 'assets/hamburguer-salada.png'
    },
    {
      id: 4,
      name: 'Bacon Crispy',
      desc: 'Burger 160g, bacon artesanal crocante, cheddar, cebola crocante, molho defumado',
      price: 28.90,
      img: 'assets/hamburguer-bacon.png'
    },
    {
      id: 5,
      name: 'Da Casa',
      desc: 'Receita exclusiva da casa, burger 160g, bacon, cebola caramelizada, queijo especial',
      price: 30.00,
      img: 'assets/hamburguer-da-casa.png'
    }
  ],
  bebidas: [
    {
      id: 6,
      name: 'Coca-Cola Lata',
      desc: 'Lata 350ml, bem gelada',
      price: 6.00,
      img: 'assets/coca-cola.png'
    },
    {
      id: 7,
      name: 'Guaraná Antarctica',
      desc: 'Lata 350ml, bem gelada',
      price: 6.00,
      img: 'assets/guarana.png'
    },
    {
      id: 8,
      name: 'Água Mineral',
      desc: 'Garrafa 500ml, sem gás',
      price: 4.00,
      img: 'assets/agua.jpeg'
    },
  ],
  sobremesas: [
    {
      id: 15,
      name: 'Brownie com Sorvete',
      desc: 'Brownie de chocolate belga quente, bola de sorvete de creme, calda de chocolate',
      price: 18.00,
      img: 'assets/brownie.jpeg'
    },
    {
      id: 16,
      name: 'Pudim de Leite',
      desc: 'Pudim caseiro de leite condensado com calda de caramelo artesanal',
      price: 12.00,
      img: 'assets/pudim.jpg'
    },
    {
      id: 17,
      name: 'Petit Gateau',
      desc: 'Bolo de chocolate com coração quente derretido, sorvete de creme',
      price: 22.00,
      img: 'assets/petit-gateau.webp'
    },
    {
      id: 18,
      name: 'Açaí 500ml',
      desc: 'Açaí cremoso da Amazônia, banana, granola artesanal, leite condensado',
      price: 16.00,
      img: 'assets/acai.webp'
    }
  ]
};

// ============================================================
// CART STATE
// ============================================================
let cart = [];

function brl(n) {
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function findItem(id) {
  return Object.values(MENU).flat().find(i => i.id === id) || null;
}

// ============================================================
// RENDER MENU
// ============================================================
function renderMenus() {
  Object.entries(MENU).forEach(([cat, items]) => {
    const grid = document.getElementById(`grid-${cat}`);
    if (!grid) return;
    items.forEach((item, i) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.style.transitionDelay = `${i * 0.055}s`;
      card.innerHTML = `
        <div class="card-img">
          <img src="${item.img}" alt="${item.name}" loading="lazy">
        </div>
        <div class="card-body">
          <h3 class="card-name">${item.name}</h3>
          <p class="card-desc">${item.desc}</p>
          <div class="card-foot">
            <p class="card-price"><sup>R$</sup>${item.price.toFixed(2).replace('.', ',')}</p>
            <button class="btn-add" data-id="${item.id}" aria-label="Adicionar ${item.name}">
              <i class="fa-solid fa-plus" aria-hidden="true"></i> Adicionar
            </button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  });
}

// ============================================================
// CART LOGIC
// ============================================================
function addToCart(id) {
  const item = findItem(id);
  if (!item) return;
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  syncCart();
  showToast(`${item.name} adicionado!`, 'success');
  bumpCartBtn();
}

function changeQty(id, delta) {
  const idx = cart.findIndex(i => i.id === id);
  if (idx === -1) return;
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  syncCart();
}

function syncCart() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const badge = document.getElementById('cart-count');
  badge.textContent = count;
  badge.dataset.empty = count === 0 ? 'true' : 'false';

  document.getElementById('cp-total').textContent = brl(total);

  const empty = document.getElementById('cp-empty');
  const list  = document.getElementById('cp-items');

  if (cart.length === 0) {
    empty.style.display = 'flex';
    list.innerHTML = '';
  } else {
    empty.style.display = 'none';
    list.innerHTML = cart.map(item => `
      <div class="cp-item">
        <img src="${item.img}" alt="${item.name}" class="cp-item-img">
        <div class="cp-item-info">
          <p class="cp-item-name">${item.name}</p>
          <p class="cp-item-price">${brl(item.price * item.qty)}</p>
        </div>
        <div class="cp-item-qty">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)" aria-label="Remover um">-</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)" aria-label="Adicionar um">+</button>
        </div>
      </div>
    `).join('');
  }
}

function bumpCartBtn() {
  const btn = document.getElementById('btn-open-cart');
  btn.style.transform = 'scale(1.07) translateY(-2px)';
  setTimeout(() => { btn.style.transform = ''; }, 200);
}

// ============================================================
// CART PANEL
// ============================================================
function openCart() {
  document.getElementById('cart-panel').classList.add('open');
  document.getElementById('cart-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cart-panel').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ============================================================
// CHECKOUT (WhatsApp)
// ============================================================
function checkout() {
  if (cart.length === 0) {
    showToast('Adicione itens ao pedido', 'warn');
    return;
  }

  const addr = document.getElementById('address-input').value.trim();
  if (!addr) {
    showToast('Informe o endereço de entrega', 'warn');
    document.getElementById('address-input').focus();
    return;
  }

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  let msg = '*Moveio Burguer - Novo Pedido*\n\n';
  cart.forEach(i => {
    msg += `- ${i.qty}x ${i.name} / ${brl(i.price * i.qty)}\n`;
  });
  msg += `\n*Total: ${brl(total)}*`;
  msg += `\n\n*Endereço de entrega:*\n${addr}`;

  window.open(`https://wa.me/5547988095244?text=${encodeURIComponent(msg)}`, '_blank');
}

// ============================================================
// RESTAURANT STATUS
// ============================================================
function updateStatus() {
  const dot   = document.getElementById('status-dot');
  const label = document.getElementById('status-label');
  const now   = new Date();
  const day   = now.getDay();
  const mins  = now.getHours() * 60 + now.getMinutes();
  const open  = 18 * 60;
  const close = 23 * 60;

  const isOpen = day !== 2 && mins >= open && mins < close;

  if (isOpen) {
    dot.classList.remove('closed');
    label.textContent = 'Aberto';
  } else {
    dot.classList.add('closed');
    label.textContent = day === 2 ? 'Fechado' : 'Fechado';
  }
}

// ============================================================
// TOAST
// ============================================================
function showToast(msg, type) {
  const stack = document.getElementById('toast-stack');
  const el = document.createElement('div');
  el.className = `toast ${type || 'success'}`;
  const icon = type === 'warn'
    ? 'fa-triangle-exclamation'
    : 'fa-circle-check';
  el.innerHTML = `<i class="fa-solid ${icon}" aria-hidden="true"></i> ${msg}`;
  stack.appendChild(el);
  setTimeout(() => {
    el.classList.add('exiting');
    el.addEventListener('animationend', () => el.remove(), { once: true });
  }, 2700);
}

// ============================================================
// CATEGORY NAV SCROLLSPY
// ============================================================
function initCatNav() {
  const OFFSET = 64 + 52 + 20;
  const btns = document.querySelectorAll('.cat-btn');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const el = document.getElementById(btn.dataset.target);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sec = entry.target.dataset.section;
        btns.forEach(b =>
          b.classList.toggle('active', b.dataset.target === `section-${sec}`)
        );
      }
    });
  }, { rootMargin: `-${64 + 52}px 0px -45% 0px` });

  document.querySelectorAll('.menu-section[data-section]').forEach(s =>
    observer.observe(s)
  );
}

// ============================================================
// CARD REVEAL ANIMATIONS
// ============================================================
function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07 });

  document.querySelectorAll('.card').forEach(c => observer.observe(c));
}

// ============================================================
// ADD TO CART — event delegation on main
// ============================================================
function initAddButtons() {
  document.getElementById('cardapio').addEventListener('click', e => {
    const btn = e.target.closest('.btn-add');
    if (!btn) return;
    e.stopPropagation();
    addToCart(parseInt(btn.dataset.id, 10));
  });
}

// ============================================================
// INIT
// ============================================================
function initHeader() {
  const header = document.getElementById('site-header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

document.addEventListener('DOMContentLoaded', () => {
  renderMenus();
  syncCart();
  updateStatus();
  initCatNav();
  initReveal();
  initAddButtons();
  initHeader();

  document.getElementById('btn-open-cart').addEventListener('click', openCart);
  document.getElementById('cp-close').addEventListener('click', closeCart);
  document.getElementById('cart-overlay').addEventListener('click', closeCart);
  document.getElementById('btn-checkout').addEventListener('click', checkout);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeCart();
  });
});
