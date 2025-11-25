// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animação de contador para os números de estatísticas
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const isDecimal = target.toString().includes('.');
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (isDecimal) {
            element.textContent = current.toFixed(1);
        } else {
            element.textContent = Math.floor(current).toLocaleString('pt-BR');
        }
    }, 16);
}

// Intersection Observer para animar elementos quando entram na viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animar contadores de estatísticas
            if (entry.target.classList.contains('stat-number')) {
                const text = entry.target.textContent;
                const number = parseFloat(text.replace(/[^\d.]/g, ''));
                
                if (!isNaN(number)) {
                    entry.target.textContent = '0';
                    animateCounter(entry.target, number);
                    
                    // Adicionar de volta símbolos extras (+ ou /)
                    setTimeout(() => {
                        if (text.includes('+')) {
                            entry.target.textContent = entry.target.textContent + '+';
                        }
                        if (text.includes('/')) {
                            entry.target.textContent = entry.target.textContent.replace('.', '/');
                        }
                    }, 2000);
                }
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar estilo inicial aos elementos animados
    const animatedElements = document.querySelectorAll('.benefit-card, .problem-card, .step, .testimonial-card, .business-card, .stat-card, .faq-item, .pricing-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Observar números de estatísticas
    document.querySelectorAll('.stat-number').forEach(el => {
        observer.observe(el);
    });
});

// Formulário de contato
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obter dados do formulário
        const formData = {
            name: document.getElementById('name').value,
            business: document.getElementById('business').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            businessType: document.getElementById('business-type').value,
            message: document.getElementById('message').value
        };
        
        // Desabilitar botão durante envio
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        
        // Enviar para o backend Flask
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                contactForm.reset();
                
                // Tracking de conversão
                trackEvent('form_submission', {
                    business_type: formData.businessType
                });
            } else {
                alert(data.message || '❌ Erro ao enviar mensagem. Tente novamente.');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('❌ Erro ao enviar mensagem. Tente novamente.');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        });
    });
}

// Máscara de telefone
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length <= 11) {
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        }
        
        e.target.value = value;
    });
}

// Contador regressivo de vagas (simulado)
function updateVagasRestantes() {
    const countdownElements = document.querySelectorAll('.countdown');
    const vagas = Math.floor(Math.random() * 3) + 5; // Entre 5 e 7 vagas
    
    countdownElements.forEach(el => {
        el.textContent = `Restam apenas ${vagas} vagas!`;
    });
}

// Atualizar vagas a cada 30 segundos para criar senso de urgência
updateVagasRestantes();
setInterval(updateVagasRestantes, 30000);

// Adicionar efeito parallax suave no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < 800) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 800);
    }
});

// Destacar link de navegação ativo baseado na seção visível
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Adicionar classe de scroll ao header
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Log para tracking (substitua com seu sistema de analytics)
function trackEvent(eventName, eventData) {
    console.log('Event:', eventName, eventData);
    
    // Integração com Google Analytics, por exemplo:
    /*
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    */
}

// Tracking de cliques em CTAs
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const buttonText = this.textContent.trim();
        const buttonHref = this.getAttribute('href');
        
        trackEvent('cta_click', {
            button_text: buttonText,
            button_href: buttonHref,
            section: this.closest('section')?.className || 'unknown'
        });
    });
});

// Lazy loading de imagens (se houver)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Prevenir submit múltiplo do formulário
let formSubmitting = false;
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        if (formSubmitting) {
            e.preventDefault();
            return false;
        }
        formSubmitting = true;
        
        setTimeout(() => {
            formSubmitting = false;
        }, 3000);
    });
}

console.log('🚀 Menuly Agendamento - Landing Page carregada com sucesso!');