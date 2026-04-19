/* ─── TABS ─── */
function switchTab(tab) {
  const isLogin = tab === 'login';
  document.getElementById('tabLogin').classList.toggle('active', isLogin);
  document.getElementById('tabRegister').classList.toggle('active', !isLogin);
  document.getElementById('loginPanel').style.display    = isLogin ? 'block' : 'none';
  document.getElementById('registerPanel').style.display = isLogin ? 'none'  : 'block';
  const ss = document.getElementById('successState');
  ss.style.display = 'none';
  ss.classList.remove('show');
  document.querySelector('.right').scrollTop = 0;
}

/* ─── PASSWORD TOGGLE ─── */
function makeToggle(inputId, btnId) {
  document.getElementById(btnId).addEventListener('click', function () {
    const inp = document.getElementById(inputId);
    inp.type = inp.type === 'password' ? 'text' : 'password';
    this.textContent = inp.type === 'text' ? '🙈' : '👁';
  });
}
makeToggle('loginPass',   'toggleLoginPass');
makeToggle('regPass',     'toggleRegPass');
makeToggle('regPassConf', 'toggleRegPassConf');

/* ─── STRENGTH BAR ─── */
document.getElementById('regPass').addEventListener('input', function () {
  const v = this.value;
  let score = 0;
  if (v.length >= 6) score++;
  if (v.length >= 10) score++;
  if (/[A-Z]/.test(v) && /[0-9]/.test(v)) score++;
  if (/[^A-Za-z0-9]/.test(v)) score++;
  const cls = ['','weak','ok','good','strong'];
  const lbl = ['','Fraca','Média','Forte','Muito forte'];
  ['s1','s2','s3','s4'].forEach((id, i) => {
    const el = document.getElementById(id);
    el.className = 'strength-seg';
    if (i < score) el.classList.add(cls[score]);
  });
  document.getElementById('strengthLabel').textContent = v.length ? lbl[score] : '';
});

/* ─── VALIDATION HELPERS ─── */
function setErr(inputId, errId, show) {
  document.getElementById(inputId).classList.toggle('error', show);
  document.getElementById(errId).classList.toggle('show', show);
  return show;
}
function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
function shake(el) {
  el.style.animation = 'none';
  el.offsetHeight;
  el.style.animation = 'shake .4s ease';
  setTimeout(() => el.style.animation = '', 400);
}
function simLoading(btnId, ms, cb) {
  const btn = document.getElementById(btnId);
  btn.classList.add('loading'); btn.disabled = true;
  setTimeout(() => { btn.classList.remove('loading'); btn.disabled = false; cb(); }, ms);
}

/* ─── LOGIN SUBMIT ─── */
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const pass  = document.getElementById('loginPass').value;
  let err = false;
  if (setErr('loginEmail','loginEmailErr', !validEmail(email))) err = true;
  if (setErr('loginPass', 'loginPassErr',  pass.length < 6))   err = true;
  if (err) { shake(this); return; }
  simLoading('loginBtn', 1600, () => showSuccess('Entrando na sua conta... 🌸<br>Redirecionando para a loja.'));
});

/* ─── REGISTER SUBMIT ─── */
document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name  = document.getElementById('regName').value.trim();
  const last  = document.getElementById('regLast').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const pass  = document.getElementById('regPass').value;
  const conf  = document.getElementById('regPassConf').value;
  let err = false;
  if (setErr('regName',    'regNameErr',    !name))              err = true;
  if (setErr('regLast',    'regLastErr',    !last))              err = true;
  if (setErr('regEmail',   'regEmailErr',   !validEmail(email))) err = true;
  if (setErr('regPass',    'regPassErr',    pass.length < 6))   err = true;
  if (setErr('regPassConf','regPassConfErr', pass !== conf))     err = true;
  if (err) { shake(this); return; }
  simLoading('registerBtn', 1800, () => showSuccess(`Bem-vinda, ${name}! ✿<br>Conta criada com sucesso.`));
});

/* ─── SUCCESS ─── */
function showSuccess(msg) {
  document.getElementById('loginPanel').style.display    = 'none';
  document.getElementById('registerPanel').style.display = 'none';
  const ss = document.getElementById('successState');
  document.getElementById('successMsg').innerHTML = msg;
  ss.style.display = 'block';
  requestAnimationFrame(() => requestAnimationFrame(() => ss.classList.add('show')));
  document.querySelector('.right').scrollTop = 0;
}

/* ─── SOCIAL LOGIN ─── */
function socialLogin(p) {
  showSuccess(`Conectando via ${p}... 🌸<br>Redirecionando para a loja.`);
}

/* ─── FORGOT PASSWORD ─── */
document.getElementById('forgotLink').addEventListener('click', function (e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  if (!validEmail(email)) {
    document.getElementById('loginEmail').focus();
    setErr('loginEmail','loginEmailErr', true);
    return;
  }
  this.textContent = '✓ Link enviado!';
  this.style.color = 'var(--sage)';
  this.style.pointerEvents = 'none';
});

/* ─── CLEAR ERRORS ON INPUT ─── */
document.querySelectorAll('.field__input').forEach(inp => {
  inp.addEventListener('input', function () {
    this.classList.remove('error');
    const err = document.getElementById(this.id + 'Err');
    if (err) err.classList.remove('show');
  });
});