// ========================================
// MOBILE HAMBURGER MENU
// ========================================
function toggleMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileMenuOverlay');
    
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // Prevent body scroll
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

// Event Listeners Mobile Menu
document.getElementById('hamburger').addEventListener('click', toggleMobileMenu);
document.getElementById('mobileMenuOverlay').addEventListener('click', toggleMobileMenu);
document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', toggleMobileMenu);
});

// ========================================
// CHAT BOT
// ========================================
function toggleChat() {
    const widget = document.getElementById('chatWidget');
    const toggle = document.getElementById('chatToggle');
    const icon = toggle.querySelector('i');
    
    widget.classList.toggle('active');
    
    if (widget.classList.contains('active')) {
        icon.className = 'fas fa-minus';
        document.getElementById('chatInput').focus();
    } else {
        icon.className = 'fas fa-robot';
    }
}

// Auto-resize textarea
document.getElementById('chatInput').addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 100) + 'px';
});

// Chat AI Responses
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');

const responses = {
    'harga|berapa|paket': `💰 <strong>📊 PAKET LENGKAP 2024</strong><br>
        🔥 <strong>Epic→Legend:</strong> Rp75.000<br>
        ⭐ <strong>Legend→Mythic:</strong> Rp150.000<br>
        🏆 <strong>Mythic Star5:</strong> Rp250.000<br>
        👑 <strong>Mythic Glory:</strong> Rp400.000<br><br>
        🎁 <em>Diskon 15% untuk pembelian hari ini!</em>`,

    'waktu|lama|berapa hari': `⏱️ <strong>⚡ ESTIMASI WAKTU</strong><br>
        📱 Epic→Legend: <strong>2-3 hari</strong><br>
        ⭐ Legend→Mythic: <strong>3-5 hari</strong><br>
        🏆 Mythic Star5: <strong>5-7 hari</strong><br>
        👑 Mythic Glory: <strong>7-10 hari</strong><br><br>
        <em>💨 Tergantung sesi main harian</em>`,

    'pesan|order|cara|buy': `✅ <strong>🚀 CARA PESAN CEPAT</strong><br>
        📱 <strong>WhatsApp:</strong> <a href="https://wa.me/628155135065?text=Saya%20mau%20pesan%20joki%20ML" style="color:#25D366;font-weight:700" target="_blank">0812-3456-7890</a><br>
        💬 <strong>Discord:</strong> jokimlpro#1234<br><br>
        📋 <strong>Siapkan:</strong><br>
        - ID Akun ML<br>
        - Password<br>
        - Server<br>
        - Target Rank<br><br>
        ⚡ <em>Response dalam 5 MENIT!</em>`,

    'promo|diskon|offer': `🎉 <strong>🔥 PROMO TERBATAS</strong><br>
        🛒 Beli 2 Paket <strong>GET 1 GRATIS</strong><br>
        👑 Mythic Glory <strong>OFF 20%</strong><br>
        💎 Bundle Epic→Glory <strong>Rp650K</strong> (hemat Rp225K!)<br><br>
        <em>🆔 Kode Promo: <strong>MLPRO2024</strong></em>`,

    'garansi|jaminan|safe|aman': `🛡️ <strong>🔒 GARANSI PREMIUM</strong><br>
        ✅ <strong>100% Aman</strong> - Anti Ban<br>
        💰 <strong>Refund 50%</strong> jika gagal<br>
        🔄 <strong>Gratis ulang</strong> jika drop rank<br>
        📈 <strong>MMR permanen</strong><br><br>
        <em>✅ 15K+ akun sukses • 0 komplain</em>`,

    'default': `🤖 <strong>PILIH PERINTAH:</strong><br>
        <code>harga</code> - Lihat semua paket<br>
        <code>waktu</code> - Estimasi waktu<br>
        <code>promo</code> - Diskon spesial<br>
        <code>pesan</code> - Cara order WA<br>
        <code>garansi</code> - Jaminan layanan<br><br>
        📲 Atau klik tombol WA biru!`
};

function sendMessage() {
    const input = chatInput.value.trim();
    if (!input) return;

    addMessage(input, 'user');
    chatInput.value = '';

    const typingMsg = addTypingIndicator();

    setTimeout(() => {
        chatMessages.removeChild(typingMsg);
        
        let responseKey = 'default';
        const inputLower = input.toLowerCase();
        
        for (let key in responses) {
            if (key.split('|').some(k => inputLower.includes(k))) {
                responseKey = key;
                break;
            }
        }
        
        addMessage(responses[responseKey], 'bot');
    }, 1200);
}

function addMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = message;
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return messageDiv;
}

function addTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot';
    typingDiv.innerHTML = `
        <div class="message-content">
            <div style="display:flex;align-items:center;gap:0.5rem;">
                <div style="width:8px;height:8px;background:#00ff88;border-radius:50%;animation:bounce 1.4s infinite ease-in-out;"></div>
                <div style="width:8px;height:8px;background:#00ff88;border-radius:50%;animation:bounce 1.4s infinite ease-in-out 0.2s;"></div>
                <div style="width:8px;height:8px;background:#00ff88;border-radius:50%;animation:bounce 1.4s infinite ease-in-out 0.4s;"></div>
                <span style="font-size:0.85rem;color:#aaa;">Jokibot AI sedang mengetik...</span>
            </div>
        </div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return typingDiv;
}

// Chat Event Listeners
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Close chat on outside click
document.addEventListener('click', (e) => {
    const widget = document.getElementById('chatWidget');
    const toggle = document.getElementById('chatToggle');
    
    if (!widget.contains(e.target) && !toggle.contains(e.target) && widget.classList.contains('active')) {
        toggleChat();
    }
});

// ========================================
// PARTICLE SYSTEM & COUNTER
// ========================================
function createParticles() {
    const particles = document.getElementById('particles');
    for (let i = 0; i < 80; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: linear-gradient(45deg, #00f5ff, #ff0080);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 15 + 10}s linear infinite;
            opacity: ${Math.random() * 0.4 + 0.2};
        `;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particles.appendChild(particle);
    }
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Initialize
window.addEventListener('load', () => {
    createParticles();
    setTimeout(animateCounters, 1500);
});