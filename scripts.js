/**
 * SAM TOP TECH — الملف البرمجي الرئيسي
 * يحتوي على: السلة، التقييمات، التنقل، الفلاتر، وإدارة العرض
 */

// ═══════════════════════════════════════
// 1. سلة المشتريات (LocalStorage)
// ═══════════════════════════════════════
let cart = JSON.parse(localStorage.getItem('samtop_cart')) || [];

function saveCart() {
    localStorage.setItem('samtop_cart', JSON.stringify(cart));
    updateCartUI();
}

function addToCart(productCode, productName, productPrice, productIcon) {
    const existing = cart.find(item => item.code === productCode);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ code: productCode, name: productName, price: productPrice, icon: productIcon, qty: 1 });
    }
    saveCart();
    toast(`🛒 تمت إضافة ${productName} إلى السلة`);
    // تأثير بصري صغير على أيقونة السلة
    const fab = document.getElementById('cart-fab');
    fab.style.transform = 'scale(1.25)';
    setTimeout(() => { fab.style.transform = ''; }, 200);
}

function removeFromCart(code) {
    cart = cart.filter(item => item.code !== code);
    saveCart();
}

function updateQty(code, delta) {
    const item = cart.find(item => item.code === code);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) {
            removeFromCart(code);
        } else {
            saveCart();
        }
    }
}

function clearCart() {
    if (cart.length === 0) return;
    if (confirm('هل أنت متأكد من تفريغ السلة بالكامل؟')) {
        cart = [];
        saveCart();
        toast('🗑️ تم تفريغ السلة');
    }
}

function updateCartUI() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    document.getElementById('cart-count').textContent = count;
    document.getElementById('cart-total').textContent = '$' + total.toFixed(0);
    
    const cartItems = document.getElementById('cart-items');
    const cartEmpty = document.getElementById('cart-empty');
    const cartFooter = document.getElementById('cart-footer');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '';
        cartEmpty.style.display = 'block';
        cartFooter.style.display = 'none';
    } else {
        cartEmpty.style.display = 'none';
        cartFooter.style.display = 'flex';
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-code">${item.code}</span>
                </div>
                <div class="cart-item-qty">
                    <button onclick="updateQty('${item.code}', -1)">−</button>
                    <span>${item.qty}</span>
                    <button onclick="updateQty('${item.code}', 1)">+</button>
                </div>
                <span class="cart-item-price">$${item.price * item.qty}</span>
                <button class="cart-item-remove" onclick="removeFromCart('${item.code}')"><i class="fa-solid fa-trash"></i></button>
            </div>
        `).join('');
    }
}

function toggleCart() {
    document.getElementById('cart-modal').classList.toggle('show');
}

function checkoutWhatsApp() {
    if (cart.length === 0) {
        toast('⚠️ السلة فارغة — أضف منتجات أولاً');
        return;
    }
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    let message = '🛒 *طلب جديد من Sam Top Tech*%0A%0A';
    message += '📋 *المنتجات المطلوبة:*%0A';
    cart.forEach((item, i) => {
        message += `${i + 1}. ${item.name} (${item.code})%0A   الكمية: ${item.qty} × $${item.price} = $${item.price * item.qty}%0A`;
    });
    message += '%0A💰 *الإجمالي: $' + total.toFixed(0) + '*%0A%0A';
    message += '📍 *الاسم:* %0A📍 *المحافظة/المدينة:* %0A📍 *رقم الهاتف:* %0A%0A';
    message += '— مرسل من متجر Sam Top Tech الإلكتروني';
    
    window.open(`https://wa.me/967770554042?text=${message}`, '_blank');
}

// إغلاق السلة عند النقر خارجها
document.addEventListener('click', function(e) {
    const modal = document.getElementById('cart-modal');
    if (modal.classList.contains('show') && !e.target.closest('.cart-modal-inner') && !e.target.closest('.cart-fab')) {
        modal.classList.remove('show');
    }
});

// ═══════════════════════════════════════
// 2. نظام التقييمات (LocalStorage)
// ═══════════════════════════════════════
let reviews = JSON.parse(localStorage.getItem('samtop_reviews')) || [];
let currentRating = 0;

// إعداد نجوم التقييم
document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('#star-rating span');
    stars.forEach(star => {
        star.addEventListener('click', function() {
            currentRating = parseInt(this.dataset.star);
            updateStarDisplay();
        });
        star.addEventListener('mouseenter', function() {
            const val = parseInt(this.dataset.star);
            stars.forEach((s, i) => {
                if (i < val) {
                    s.querySelector('i').className = 'fa-solid fa-star';
                    s.classList.add('active');
                } else {
                    s.querySelector('i').className = 'fa-regular fa-star';
                    s.classList.remove('active');
                }
            });
        });
    });
    document.getElementById('star-rating').addEventListener('mouseleave', updateStarDisplay);
    renderReviews();
});

function updateStarDisplay() {
    const stars = document.querySelectorAll('#star-rating span');
    stars.forEach((s, i) => {
        if (i < currentRating) {
            s.querySelector('i').className = 'fa-solid fa-star';
            s.classList.add('active');
        } else {
            s.querySelector('i').className = 'fa-regular fa-star';
            s.classList.remove('active');
        }
    });
}

function submitReview() {
    const name = document.getElementById('rev-name').value.trim();
    const product = document.getElementById('rev-product').value.trim();
    const text = document.getElementById('rev-text').value.trim();
    
    if (!name) { toast('⚠️ الرجاء إدخال الاسم'); return; }
    if (!product) { toast('⚠️ الرجاء إدخال المنتج أو الخدمة'); return; }
    if (currentRating === 0) { toast('⚠️ الرجاء اختيار تقييم'); return; }
    if (!text) { toast('⚠️ الرجاء كتابة تعليق'); return; }
    
    reviews.unshift({
        name: name,
        product: product,
        rating: currentRating,
        text: text,
        date: new Date().toLocaleDateString('ar-YE', { year: 'numeric', month: 'short', day: 'numeric' })
    });
    
    // حفظ آخر 50 تقييم فقط
    if (reviews.length > 50) reviews = reviews.slice(0, 50);
    localStorage.setItem('samtop_reviews', JSON.stringify(reviews));
    
    // إعادة تعيين النموذج
    document.getElementById('rev-name').value = '';
    document.getElementById('rev-product').value = '';
    document.getElementById('rev-text').value = '';
    currentRating = 0;
    updateStarDisplay();
    
    renderReviews();
    toast('✅ تم نشر تقييمك بنجاح — شكراً لك!');
}

function renderReviews() {
    const list = document.getElementById('reviews-list');
    if (reviews.length === 0) {
        list.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--ink4);"><i class="fa-solid fa-star" style="font-size:2rem;opacity:0.3;"></i><p style="margin-top:.5rem;">لا توجد تقييمات بعد — كن أول من يقيّم!</p></div>';
        return;
    }
    list.innerHTML = reviews.map(r => `
        <div class="rev-card">
            <div class="rev-header">
                <span class="rev-name">${r.name}</span>
                <span class="rev-product-tag">${r.product}</span>
            </div>
            <div class="rev-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
            <div class="rev-text">${r.text}</div>
            <div class="rev-date">${r.date}</div>
        </div>
    `).join('');
}

// ═══════════════════════════════════════
// 3. عرض المنتجات والفلاتر
// ═══════════════════════════════════════
function renderGrid(sectionId, list) {
    const grid = document.getElementById(sectionId + '-grid');
    if (!grid) return;
    
    grid.innerHTML = list.map(p => `
        <div class="pc" data-brand="${p.br}">
            ${p.b ? `<span class="pc-badge ${BADGE_CLASS[p.b]}">${BADGE_TEXT[p.b]}</span>` : ''}
            <div class="pc-img">
                <i class="${p.icon || 'fa-solid fa-box'} pc-img-icon"></i>
            </div>
            <div class="pc-body">
                <div class="pc-brand">${p.br}</div>
                <div class="pc-model">${p.code}</div>
                <div class="pc-name">${p.n}</div>
                <div class="pc-specs">${p.sp.map(s => `<span class="ps">${s}</span>`).join('')}</div>
                <div class="pc-foot">
                    <div>
                        ${p.o ? `<span class="pc-old">$${p.o}</span>` : '<span class="pc-old" style="opacity:0">—</span>'}
                        <span class="pc-price"><span class="pc-cur">$</span>${p.p}</span>
                    </div>
                    <button class="pc-btn" onclick="addToCart('${p.code}', '${p.n}', ${p.p}, '${p.icon || ''}')"><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>
        </div>
    `).join('');
}

function setupFilters(sectionId, brands) {
    const filterBar = document.getElementById(sectionId + '-filter');
    if (!filterBar) return;
    
    const list = PRODUCTS[sectionId] || [];
    filterBar.innerHTML = `
        <button class="fb on" onclick="filterProd('${sectionId}','all',this)">الكل <span style="opacity:.6;font-size:.65em">(${list.length})</span></button>
        ${brands.map(b => `<button class="fb" onclick="filterProd('${sectionId}','${b}',this)">${b}</button>`).join('')}
    `;
}

function filterProd(sectionId, value, el) {
    const grid = document.getElementById(sectionId + '-grid');
    if (!grid) return;
    
    grid.querySelectorAll('.pc').forEach(card => {
        card.style.display = (value === 'all' || card.dataset.brand === value) ? '' : 'none';
    });
    
    if (el) {
        const bar = el.closest('.filter-bar');
        if (bar) bar.querySelectorAll('.fb').forEach(b => b.classList.remove('on'));
        el.classList.add('on');
    }
}

// بناء الشريط الجانبي الديناميكي للمنتجات
function buildSidebarProducts() {
    const container = document.getElementById('sidebar-nav-products');
    if (!container) return;
    
    let html = '';
    for (const [key, name] of Object.entries(SECTION_NAMES)) {
        const count = PRODUCTS[key] ? PRODUCTS[key].length : 0;
        const icon = SECTION_ICONS[key] || 'fa-solid fa-box';
        html += `<a class="sbn" onclick="showSec('${key}',this)"><div class="sbn-ico"><i class="${icon}"></i></div><span class="sbn-txt">${name}</span><span class="sbn-cnt">${count}</span></a>`;
    }
    container.innerHTML = html;
}

// ═══════════════════════════════════════
// 4. التنقل بين الأقسام
// ═══════════════════════════════════════
function showSec(id, el) {
    document.querySelectorAll('.prod-section').forEach(s => s.classList.remove('active'));
    const target = document.getElementById('sec-' + id);
    if (target) target.classList.add('active');
    
    document.querySelectorAll('.sbn').forEach(a => a.classList.remove('on'));
    if (el) el.classList.add('on');
    else {
        document.querySelectorAll('.sbn').forEach(a => {
            if (a.getAttribute('onclick') && a.getAttribute('onclick').includes("'" + id + "'")) {
                a.classList.add('on');
            }
        });
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.innerWidth <= 1000) toggleSidebar(true);
    
    // إعادة تفعيل الأنيميشن
    setTimeout(() => {
        document.querySelectorAll('#sec-' + id + ' .rv').forEach(el => {
            el.classList.remove('vis');
            void el.offsetHeight;
            el.classList.add('vis');
        });
    }, 60);
}

function toggleSidebar(close = false) {
    const sb = document.getElementById('sidebar');
    const ov = document.getElementById('overlay');
    if (close || sb.classList.contains('open')) {
        sb.classList.remove('open');
        ov.classList.remove('show');
    } else {
        sb.classList.add('open');
        ov.classList.add('show');
    }
}

// ═══════════════════════════════════════
// 5. التوست (الإشعارات)
// ═══════════════════════════════════════
let toastTimer;
function toast(m) {
    clearTimeout(toastTimer);
    const t = document.getElementById('toast');
    t.textContent = m;
    t.classList.add('show');
    toastTimer = setTimeout(() => t.classList.remove('show'), 3500);
}

// ═══════════════════════════════════════
// 6. التهيئة الأولية
// ═══════════════════════════════════════
document.addEventListener('DOMContentLoaded', function() {
    // بناء الشريط الجانبي
    buildSidebarProducts();
    
    // عرض المنتجات
    renderGrid('router', PRODUCTS.router);
    renderGrid('ap', PRODUCTS.ap);
    renderGrid('switch', PRODUCTS.switch);
    renderGrid('acc', PRODUCTS.acc);
    
    // إعداد الفلاتر
    setupFilters('router', ROUTER_BRANDS);
    setupFilters('ap', AP_BRANDS);
    setupFilters('switch', SWITCH_BRANDS);
    setupFilters('acc', ACC_CATEGORIES);
    
    // تحديث العدادات
    document.getElementById('router-count').textContent = `${PRODUCTS.router.length} جهاز من 5 ماركات — من الاقتصادي حتى الاحترافي`;
    document.getElementById('ap-count').textContent = `${PRODUCTS.ap.length} جهاز من 5 ماركات — Indoor · Outdoor · CPE · Sector`;
    document.getElementById('switch-count').textContent = `${PRODUCTS.switch.length} سويتش من 5 ماركات — من 5 منافذ حتى 48 PoE`;
    document.getElementById('acc-count').textContent = `${PRODUCTS.acc.length} منتج — كابلات · أنتينات · PoE · فايبر · أدوات · خوادم · UPS`;
    
    // الشريط المتحرك
    const tt = document.getElementById('tickTrk');
    if (tt) {
        [...TICKER_ITEMS, ...TICKER_ITEMS].forEach(s => {
            const d = document.createElement('div');
            d.className = 'tick-item';
            d.innerHTML = `<span class="ti-s">◆</span><span class="ti-b">${s}</span>`;
            tt.appendChild(d);
        });
    }
    
    // الأسئلة الشائعة
    const fl = document.getElementById('faqList');
    if (fl) {
        FAQS.forEach(f => {
            const d = document.createElement('div');
            d.className = 'faq-item';
            d.innerHTML = `<div class="faq-q" onclick="this.parentElement.classList.toggle('open')"><span class="faq-ico">◆</span><span class="faq-q-t">${f.q}</span><span class="faq-arr">►</span></div><div class="faq-a">${f.a}</div>`;
            fl.appendChild(d);
        });
    }
    
    // تحديث واجهة السلة
    updateCartUI();
    
    // تفعيل مراقب التقاطع للأنيميشن
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('vis');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });
    
    document.querySelectorAll('.rv').forEach(el => observer.observe(el));
    
    // عداد الأرقام
    let counted = false;
    const nbEls = document.querySelectorAll('.nb-v[data-t]');
    function animateCount(el) {
        const target = +el.dataset.t;
        let current = 0;
        const step = target / 60;
        const interval = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = target >= 100 ? Math.floor(current).toLocaleString() : Math.floor(current) + (target === 99 ? '' : '+');
            if (current >= target) {
                clearInterval(interval);
                el.textContent = target >= 100 ? target.toLocaleString() : target + (target === 99 ? '' : '+');
            }
        }, 16);
    }
    
    const countObserver = new IntersectionObserver(entries => {
        if (entries.some(e => e.isIntersecting) && !counted) {
            counted = true;
            nbEls.forEach(animateCount);
        }
    }, { threshold: 0.3 });
    
    nbEls.forEach(el => countObserver.observe(el));
    
    // زر العودة للأعلى
    const backBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backBtn.classList.add('visible');
        } else {
            backBtn.classList.remove('visible');
        }
    });
    backBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // نموذج التواصل - منع الإرسال الافتراضي إذا لم يكن Formspree معداً
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // إذا كنت تستخدم Formspree، اترك الإرسال يعمل بشكل طبيعي
            // إذا لم تكن قد أعددت Formspree بعد، استخدم الكود التالي:
            const action = contactForm.getAttribute('action');
            if (action.includes('your-form-id')) {
                e.preventDefault();
                toast('📧 سيتم تفعيل نموذج التواصل قريباً — تواصل معنا عبر واتساب حالياً');
                window.open('https://wa.me/967770554042', '_blank');
            }
            // مع Formspree، سيتم الإرسال تلقائياً
        });
    }
    
    console.log('✅ Sam Top Tech — جاهز للعمل');
    console.log('📦 المنتجات:', Object.values(PRODUCTS).reduce((sum, arr) => sum + arr.length, 0));
    console.log('🛒 السلة:', cart.length, 'منتجات');
    console.log('⭐ التقييمات:', reviews.length, 'تقييم');
});