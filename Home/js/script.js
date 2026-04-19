/* ─── NAV ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', scrollY > 60));

/* ─── HAMBURGER ─── */
const ham = document.getElementById('hamburger');
const mob = document.getElementById('mobileMenu');
ham.addEventListener('click', () => { ham.classList.toggle('open'); mob.classList.toggle('open'); });
mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  ham.classList.remove('open'); mob.classList.remove('open');
}));

/* ─── PRODUCTS DATA ─── */
const products = [
  { id:1, name:'Vestido Midi Floral Vintage', brand:'Vintage 90s', price:189.90, old:320, tag:'favorito', sizes:['P','M'], bg:'radial-gradient(135deg,rgba(232,196,184,.7) 0%,rgba(196,120,106,.4) 100%)', icon:'👗' },
  { id:2, name:'Blazer Oversized Caramelo', brand:'Zara', price:159.90, old:299, tag:'novo', sizes:['M','G'], bg:'radial-gradient(135deg,rgba(155,123,115,.5) 0%,rgba(122,92,88,.5) 100%)', icon:'🧥' },
  { id:3, name:'Blusa de Seda Rosa Pó', brand:'Farm', price:89.90, old:180, tag:'', sizes:['P','M','G'], bg:'radial-gradient(135deg,rgba(232,196,184,.9) 0%,rgba(250,247,242,.4) 100%)', icon:'👚' },
  { id:4, name:'Calça Pantalona Creme', brand:'Renner', price:119.90, old:199, tag:'novo', sizes:['M','G'], bg:'radial-gradient(135deg,rgba(242,237,228,.9) 0%,rgba(196,120,106,.2) 100%)', icon:'👖' },
  { id:5, name:'Bolsa Estruturada Vinho', brand:'H&M', price:149.90, old:280, tag:'favorito', sizes:['Único'], bg:'radial-gradient(135deg,rgba(122,92,88,.6) 0%,rgba(42,31,30,.4) 100%)', icon:'👜' },
  { id:6, name:'Saia Midi Xadrez Outono', brand:'Vintage', price:99.90, old:210, tag:'', sizes:['P','M'], bg:'radial-gradient(135deg,rgba(138,158,140,.5) 0%,rgba(42,31,30,.3) 100%)', icon:'🩱' },
  { id:7, name:'Cardigan Tricot Off-White', brand:'C&A', price:109.90, old:189, tag:'novo', sizes:['M','G'], bg:'radial-gradient(135deg,rgba(250,247,242,.9) 0%,rgba(232,196,184,.5) 100%)', icon:'🧶' },
  { id:8, name:'Macacão Jeans Largo', brand:'Denim Co.', price:139.90, old:249, tag:'favorito', sizes:['M'], bg:'radial-gradient(135deg,rgba(42,31,30,.4) 0%,rgba(155,123,115,.4) 100%)', icon:'👔' },
];

/* ─── CART ─── */
let cart = [];
function addToCart(p) {
  const ex = cart.find(i => i.id === p.id);
  if (ex) ex.qty++;
  else cart.push({ ...p, qty: 1 });
  updateCart();
  showToast(`"${p.name}" adicionado!`);
}
function updateCart() {
  const total = cart.reduce((s,i) => s + i.price * i.qty, 0);
  document.getElementById('cartTotal').textContent = 'R$ ' + total.toFixed(2).replace('.',',');
  document.getElementById('cartBadge').textContent = cart.reduce((s,i) => s + i.qty, 0);
  renderCart();
}
function renderCart() {
  const body = document.getElementById('cartBody');
  const empty = document.getElementById('cartEmpty');
  if (!cart.length) { body.innerHTML = ''; body.appendChild(empty); return; }
  body.innerHTML = '';
  cart.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div class="cart-item__img" style="background:${item.bg};display:flex;align-items:center;justify-content:center;font-size:32px;">${item.icon}</div>
      <div class="cart-item__info">
        <div class="cart-item__name">${item.name}</div>
        <div class="cart-item__size">Tamanho: ${item.sizes[0]}</div>
        <div class="cart-item__qty-row">
          <button class="qty-btn" data-i="${idx}" data-a="dec">−</button>
          <span class="qty-val">${item.qty}</span>
        </div>
        <button class="cart-item__rm" data-i="${idx}">Remover</button>
      </div>
      <div class="cart-item__price">R$ ${(item.price * item.qty).toFixed(2).replace('.',',')}</div>
    `;
    body.appendChild(div);
  });
  body.querySelectorAll('.qty-btn').forEach(b => b.addEventListener('click', () => {
    const i = +b.dataset.i;
    if (b.dataset.a === 'inc') cart[i].qty++;
    else { cart[i].qty--; if (cart[i].qty <= 0) cart.splice(i,1); }
    updateCart();
  }));
  body.querySelectorAll('.cart-item__rm').forEach(b => b.addEventListener('click', () => {
    cart.splice(+b.dataset.i,1); updateCart();
  }));
}

/* ─── CART UI ─── */
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
document.getElementById('cartBtn').addEventListener('click', () => { cartDrawer.classList.add('open'); cartOverlay.classList.add('open'); });
document.getElementById('cartClose').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
function closeCart() { cartDrawer.classList.remove('open'); cartOverlay.classList.remove('open'); }

/* ─── TOAST ─── */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = ''; 
  const check = document.createElement('span');
  check.textContent = ' ' + msg;
  t.innerHTML = '✓ ' + msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2600);
}

/* ─── RENDER PRODUCTS ─── */
const grid = document.getElementById('productsGrid');
const tagLabels = { novo:'Novo Drop', favorito:'Favorita' };
products.forEach(p => {
  const off = Math.round((1 - p.price/p.old)*100);
  const card = document.createElement('div');
  card.className = 'product-card reveal';
  card.innerHTML = `
    <div class="product-card__media">
      <div class="product-card__bg" style="background:${p.bg};height:100%;display:flex;align-items:center;justify-content:center;font-size:80px;opacity:.55;">${p.icon}</div>
      ${p.tag ? `<div class="product-card__tag ${p.tag === 'favorito' ? 'fav' : ''}">${tagLabels[p.tag]||p.tag}</div>` : ''}
      <button class="product-card__wish" data-id="${p.id}">♡</button>
      <div class="product-card__overlay">
        <button class="btn-add" data-id="${p.id}">+ Adicionar</button>
        <button class="btn-size">${p.sizes.join(' / ')}</button>
      </div>
    </div>
    <div class="product-card__info">
      <div class="product-card__brand">${p.brand}</div>
      <div class="product-card__name">${p.name}</div>
      <div class="product-card__pricing">
        <span class="price-current">R$ ${p.price.toFixed(2).replace('.',',')}</span>
        <span class="price-old">R$ ${p.old.toFixed(2).replace('.',',')}</span>
        <span class="price-off">-${off}%</span>
      </div>
      <div class="product-card__sizes">
        ${p.sizes.map((s,i)=>`<div class="size-chip${i===0?' active':''}">${s}</div>`).join('')}
      </div>
    </div>
  `;
  card.querySelector('.btn-add').addEventListener('click', () => addToCart(p));
  card.querySelector('.product-card__wish').addEventListener('click', function() {
    this.classList.toggle('active');
    this.textContent = this.classList.contains('active') ? '♥' : '♡';
  });
  card.querySelectorAll('.size-chip').forEach(chip => chip.addEventListener('click', () => {
    card.querySelectorAll('.size-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
  }));
  grid.appendChild(card);
});

/* ─── NEWSLETTER ─── */
document.getElementById('newsletterBtn').addEventListener('click', () => {
  showToast('Obrigada! Você vai adorar os drops. 💛');
});

/* ─── SCROLL REVEAL ─── */
const revEls = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: .12 });
revEls.forEach(r => obs.observe(r));

/* ─── COUNTDOWN ─── */
const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 5); // muda aqui (ex: +5 dias)

function updateCountdown(){
  const now = new Date();
  const diff = targetDate - now;

  if(diff <= 0) return;

  const d = Math.floor(diff / (1000*60*60*24));
  const h = Math.floor((diff / (1000*60*60)) % 24);
  const m = Math.floor((diff / (1000*60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  document.getElementById('cd-days').textContent = String(d).padStart(2,'0');
  document.getElementById('cd-hours').textContent = String(h).padStart(2,'0');
  document.getElementById('cd-mins').textContent = String(m).padStart(2,'0');
  document.getElementById('cd-secs').textContent = String(s).padStart(2,'0');
}

setInterval(updateCountdown, 1000);
updateCountdown();