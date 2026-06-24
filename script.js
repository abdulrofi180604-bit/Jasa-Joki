// ── MOBILE MENU ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const overlay    = document.getElementById('mobileMenuOverlay');

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}
hamburger.addEventListener('click', toggleMobileMenu);
overlay.addEventListener('click', toggleMobileMenu);
document.querySelectorAll('.mobile-nav-links a').forEach(l => l.addEventListener('click', toggleMobileMenu));

// ── HEADER SCROLL EFFECT ──
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 30px rgba(0,0,0,.5)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// ── FAQ ACCORDION ──
document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
    });
});

// ── CHAT ──
function toggleChat() {
    const widget = document.getElementById('chatWidget');
    const toggle = document.getElementById('chatToggle');
    const icon = toggle.querySelector('i');
    widget.classList.toggle('active');
    icon.className = widget.classList.contains('active') ? 'fas fa-minus' : 'fas fa-robot';
    if (widget.classList.contains('active')) {
        document.getElementById('chatInput').focus();
    }
}

function quickSend(text) {
    document.getElementById('chatInput').value = text;
    sendMessage();
}

const chatMessages = document.getElementById('chatMessages');
const chatInput    = document.getElementById('chatInput');

const responses = {
    'harga|berapa|paket|price': `💰 <strong>PAKET JOKI TERBARU:</strong><br><br>
👑 Epic → Legend: <strong>Rp 175.000</strong><br>
⭐ Legend → Mythic: <strong>Rp 200.000</strong><br>
🏆 Mythic → Honor: <strong>Rp 300.000</strong><br>
🥇 Honor → Glory: <strong>Rp 425.000</strong><br><br>
Semua sudah termasuk <strong>garansi drop rank</strong>!<br>
<a href="https://wa.me/628155135065?text=Halo%2C%20saya%20mau%20tanya%20paket" target="_blank" style="color:#25d366;font-weight:700">📱 Pesan via WhatsApp →</a>`,

    'waktu|lama|estimasi|berapa hari': `⏱️ <strong>ESTIMASI WAKTU:</strong><br><br>
📱 Epic → Legend: <strong>2–3 hari</strong><br>
⭐ Legend → Mythic: <strong>3–5 hari</strong><br>
🏆 Mythic → Honor: <strong>5–7 hari</strong><br>
🥇 Honor → Glory: <strong>7–10 hari</strong><br><br>
Kamu dapat <strong>laporan harian</strong> via WA setiap hari!`,

    'pesan|order|cara|beli|bayar': `✅ <strong>CARA ORDER (3 LANGKAH):</strong><br><br>
<strong>1.</strong> Hubungi kami via WhatsApp<br>
<strong>2.</strong> Konfirmasi paket & transfer<br>
<strong>3.</strong> Tim kami langsung mulai joki!<br><br>
💳 <strong>Metode bayar:</strong> BCA, Mandiri, GoPay, OVO, DANA, ShopeePay<br><br>
<a href="https://wa.me/628155135065?text=Halo%20rStore%2C%20saya%20mau%20order%20joki!" target="_blank" style="color:#25d366;font-weight:700;display:inline-block;margin-top:.3rem">📱 Chat & Order Sekarang →</a>`,

    'promo|diskon|voucher|kode': `🎉 <strong>PROMO SPESIAL:</strong><br><br>
🛒 Beli 2 paket → <strong>gratis 1</strong><br>
👑 Glory Package <strong>diskon 10%</strong><br>
💎 Bundling Epic→Glory hanya <strong>Rp 850K</strong> (hemat Rp250K!)<br><br>
📲 Hubungi kami untuk klaim promo!<br>
<a href="https://wa.me/628155135065?text=Halo%2C%20saya%20mau%20tanya%20promo!" target="_blank" style="color:#25d366;font-weight:700">💬 Tanya Promo →</a>`,

    'garansi|aman|safe|ban|jamin': `🛡️ <strong>JAMINAN rSTORE:</strong><br><br>
✅ <strong>Anti Ban 100%</strong> — main manusiawi<br>
🔄 <strong>Garansi Drop Rank</strong> — gratis ulang<br>
🔒 <strong>Data Aman</strong> — privasi terjaga<br>
💰 <strong>Refund</strong> jika tidak sesuai perjanjian<br><br>
Sudah <strong>15.000+ akun</strong> sukses tanpa komplain!`,

    'bayar|transfer|rekening|ewallet': `💳 <strong>METODE PEMBAYARAN:</strong><br><br>
🏦 Transfer Bank: <strong>BCA, Mandiri, BRI, BNI</strong><br>
📱 E-Wallet: <strong>GoPay, OVO, DANA, ShopeePay</strong><br><br>
Pembayaran dilakukan di awal dan kami berikan <strong>bukti transfer & kwitansi</strong>.<br><br>
<a href="https://wa.me/628155135065" target="_blank" style="color:#25d366;font-weight:700">📱 Hubungi untuk info rekening →</a>`,

    'default': `🤖 <strong>Halo! Ada yang bisa saya bantu?</strong><br><br>
Ketik atau pilih topik:<br>
💰 <code>harga</code> — lihat semua paket<br>
⏱ <code>waktu</code> — estimasi durasi<br>
🎉 <code>promo</code> — diskon spesial<br>
🛒 <code>pesan</code> — cara order<br>
🛡️ <code>garansi</code> — jaminan keamanan<br>
💳 <code>bayar</code> — metode pembayaran<br><br>
<a href="https://wa.me/628155135065" target="_blank" style="color:#25d366;font-weight:700">📱 Atau langsung chat via WhatsApp →</a>`
};

function sendMessage() {
    const input = chatInput.value.trim();
    if (!input) return;

    addMessage(input, 'user');
    chatInput.value = '';
    chatInput.style.height = 'auto';

    const typing = addTyping();
    setTimeout(() => {
        chatMessages.removeChild(typing);
        let key = 'default';
        const low = input.toLowerCase();
        for (const k in responses) {
            if (k !== 'default' && k.split('|').some(w => low.includes(w))) {
                key = k; break;
            }
        }
        addMessage(responses[key], 'bot');
    }, 900 + Math.random() * 400);
}

function addMessage(html, sender) {
    const div = document.createElement('div');
    div.className = `message ${sender}`;
    const content = document.createElement('div');
    content.className = 'message-content';
    content.innerHTML = html;
    div.appendChild(content);
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return div;
}

function addTyping() {
    const div = document.createElement('div');
    div.className = 'message bot';
    div.innerHTML = `<div class="message-content">
        <div style="display:flex;align-items:center;gap:5px;">
            ${[0,.18,.36].map(d=>`<div style="width:7px;height:7px;background:var(--green);border-radius:50%;animation:typingBounce 1.2s ${d}s infinite ease-in-out;"></div>`).join('')}
            <span style="font-size:.8rem;opacity:.6;margin-left:.3rem">mengetik...</span>
        </div>
    </div>`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return div;
}

chatInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 90) + 'px';
});
chatInput.addEventListener('keypress', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
});

// Close chat when clicking outside
document.addEventListener('click', e => {
    const widget = document.getElementById('chatWidget');
    const toggle = document.getElementById('chatToggle');
    if (widget.classList.contains('active') && !widget.contains(e.target) && !toggle.contains(e.target)) {
        toggleChat();
    }
});

// ── PARTICLES ──
function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 60; i++) {
        const p = document.createElement('div');
        const size = Math.random() * 2.5 + .8;
        const colors = ['#00f5ff','#ff0080','#00ff88','#ffd700'];
        p.style.cssText = `
            position:absolute;
            width:${size}px; height:${size}px;
            background:${colors[Math.floor(Math.random()*colors.length)]};
            border-radius:50%;
            left:${Math.random()*100}%;
            top:${Math.random()*100}%;
            animation:particleFloat ${12+Math.random()*12}s linear infinite;
            animation-delay:${Math.random()*12}s;
            opacity:${Math.random()*.35+.1};
        `;
        container.appendChild(p);
    }
}

// ── COUNTER ANIMATION ──
function animateCounter(el, target, suffix = '') {
    const duration = 2200;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            el.textContent = target >= 1000 ? (target/1000).toFixed(0)+'K' : target;
            clearInterval(timer);
        } else {
            const val = Math.floor(current);
            el.textContent = val >= 1000 ? (val/1000).toFixed(0)+'K' : val;
        }
    }, 16);
}

function initCounters() {
    const observers = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                animateCounter(el, target);
                observers.unobserve(el);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('[data-target]').forEach(el => observers.observe(el));
}

// ── SCROLL REVEAL ──
function initReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-card, .step-card, .tp, .big-stat, .faq-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(28px)';
        el.style.transition = 'opacity .5s ease, transform .5s ease';
        observer.observe(el);
    });
}

window.addEventListener('load', () => {
    createParticles();
    initCounters();
    setTimeout(initReveal, 100);
});
