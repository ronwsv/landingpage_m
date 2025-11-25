# 🗓️ Menuly Agendamento - Landing Page

[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![Flask](https://img.shields.io/badge/Flask-3.0.0-000000?logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Python](https://img.shields.io/badge/Python-3.11-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> Landing page profissional para o sistema de agendamento online Menuly, com integração completa ao checkout da Kiwify.

🌐 **Demo**: [agendamento.menuly.digital](https://agendamento.menuly.digital)

---

## 📋 Índice

- [Sobre](#-sobre)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Instalação](#-instalação)
- [Uso](#-uso)
- [Docker](#-docker)
- [Integração Kiwify](#-integração-kiwify)
- [Deploy](#-deploy)
- [Estrutura](#-estrutura)
- [Licença](#-licença)

---

## 🎯 Sobre

Sistema completo de landing page para vendas do **Menuly Agendamento** - plataforma de agendamento online para salões, barbearias, clínicas e profissionais autônomos.

### Destaques:
- ✅ Landing page otimizada para conversão
- ✅ Integração com checkout Kiwify
- ✅ Sistema de captura de leads
- ✅ Painel administrativo
- ✅ API REST completa
- ✅ Containerizado com Docker
- ✅ Pronto para produção

---

## ⚡ Funcionalidades

### 🎨 Landing Page
- Hero section com CTA destacado
- Seção de problemas e soluções
- 8 benefícios principais
- Como funciona (3 passos)
- 8 tipos de negócios atendidos
- 6 depoimentos de clientes
- Comparação de planos (Essencial vs Premium)
- FAQ completo
- Formulário de contato

### 🤖 Backend Flask
- Sistema de captura de leads
- Salvamento em JSON (expansível para DB)
- Painel administrativo
- API REST
- Validação de dados
- Páginas de erro personalizadas

### 💰 Integração Kiwify
- **Plano Essencial**: R$ 44,90/mês
- **Plano Premium**: R$ 119,90/mês + Chatbot incluso
- Links diretos para checkout
- Ancoragem de preços estratégica

### 📊 Painel Admin
- Visualização de todos os leads
- Filtros por tipo de negócio
- Exportação em JSON
- Estatísticas básicas

---

## 🛠️ Tecnologias

### Backend
- **Flask 3.0.0** - Framework web
- **Gunicorn** - WSGI server (produção)
- **Python 3.11** - Linguagem

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilos e animações
- **JavaScript** - Interatividade
- **Google Fonts** - Tipografia (Poppins)

### DevOps
- **Docker** - Containerização
- **Docker Compose** - Orquestração
- **Git** - Controle de versão

---

## 📦 Instalação

### Pré-requisitos
- Python 3.11+
- pip
- Git
- Docker (opcional)

### Método 1: Local

```bash
# Clone o repositório
git clone https://github.com/ronwsv/landingpage_m.git
cd landingpage_m

# Instale dependências
pip install -r requirements.txt

# Execute
python app.py
```

### Método 2: Docker (Recomendado)

```bash
# Clone o repositório
git clone https://github.com/ronwsv/landingpage_m.git
cd landingpage_m

# Inicie com Docker Compose
docker-compose up -d
```

---

## 🚀 Uso

### Desenvolvimento Local

```bash
python app.py
```

Acesse:
- **Site**: http://localhost:5000
- **Admin**: http://localhost:5000/admin/leads
- **API**: http://localhost:5000/api/leads

### Produção com Docker

```bash
# Build e start
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar
docker-compose down
```

---

## 🐳 Docker

### Quick Start

```bash
# Build e rodar
docker-compose up --build -d

# Ver status
docker ps

# Logs em tempo real
docker-compose logs -f web
```

### Configuração

Edite `docker-compose.yml` para personalizar:
- Porta (padrão: 5000)
- Variáveis de ambiente
- Volume de dados

**Documentação completa**: [DOCKER_README.md](DOCKER_README.md)

---

## 💳 Integração Kiwify

### Links Configurados

| Plano | URL | Preço |
|-------|-----|-------|
| **Sales Page** | https://kiwify.app/VrSI68m | - |
| **Essencial** | https://pay.kiwify.com.br/Tg765yg | R$ 44,90 |
| **Premium** | https://pay.kiwify.com.br/SVu4E97 | R$ 119,90 |

### Estratégia de Preços

**Plano Essencial** (Âncora)
- ~~R$ 89,90~~ → **R$ 44,90/mês**
- 50% OFF
- Até 3 profissionais
- Recursos básicos

**Plano Premium** (Recomendado)
- ~~R$ 239,90~~ → **R$ 119,90/mês**
- 50% OFF
- **Bônus**: Chatbot (R$ 59,90) incluso
- Profissionais ilimitados
- Todos os recursos

**Documentação completa**: [KIWIFY_INTEGRATION.md](KIWIFY_INTEGRATION.md)

---

## 🌐 Deploy

### Opções de Deploy

#### Heroku
```bash
heroku create menuly-agendamento
heroku container:push web
heroku container:release web
```

#### AWS ECS/Fargate
```bash
# Push para ECR
aws ecr get-login-password | docker login --username AWS --password-stdin
docker tag menuly-agendamento:latest ECR_URI/menuly:latest
docker push ECR_URI/menuly:latest
```

#### Google Cloud Run
```bash
gcloud builds submit --tag gcr.io/PROJECT/menuly
gcloud run deploy menuly --image gcr.io/PROJECT/menuly --platform managed
```

#### DigitalOcean
```bash
# Deploy via Docker Hub
docker tag menuly-agendamento username/menuly:latest
docker push username/menuly:latest
```

**Documentação completa**: [DOCKER_README.md](DOCKER_README.md)

---

## 📂 Estrutura

```
landingpage_m/
├── app.py                      # Aplicação Flask
├── requirements.txt            # Dependências Python
├── Dockerfile                  # Imagem Docker
├── docker-compose.yml          # Orquestração
├── .env.example               # Variáveis de ambiente
├── start.sh                   # Script de produção
│
├── templates/                 # Templates HTML
│   ├── index.html            # Landing page principal
│   ├── admin_leads.html      # Painel admin
│   ├── 404.html              # Erro 404
│   └── 500.html              # Erro 500
│
├── static/                    # Arquivos estáticos
│   ├── style.css             # Estilos
│   ├── script.js             # JavaScript
│   └── images/               # Imagens
│
├── leads/                     # Dados de leads (não versionado)
│   └── contacts.json         # Leads capturados
│
└── docs/                      # Documentação
    ├── README.md             # Este arquivo
    ├── FLASK_README.md       # Docs Flask
    ├── DOCKER_README.md      # Docs Docker
    └── KIWIFY_INTEGRATION.md # Docs Kiwify
```

---

## 📡 API Endpoints

### POST /api/contact
Recebe dados do formulário

**Request:**
```json
{
  "name": "João Silva",
  "business": "Salão João",
  "email": "joao@email.com",
  "phone": "(11) 98765-4321",
  "businessType": "salao",
  "message": "Quero saber mais"
}
```

### GET /api/leads
Retorna todos os leads

### GET /api/stats
Estatísticas dos leads

### GET /health
Health check

**Documentação completa**: [FLASK_README.md](FLASK_README.md)

---

## 🎨 Personalização

### Cores
Edite as variáveis CSS em `static/style.css`:

```css
:root {
    --primary-color: #6C5CE7;
    --secondary-color: #00D2D3;
    --accent-color: #FD79A8;
    /* ... */
}
```

### Textos
Edite diretamente em `templates/index.html`

### Imagens
Substitua em `static/images/`

---

## 🔒 Segurança

### Produção
- [ ] Alterar SECRET_KEY
- [ ] Configurar HTTPS
- [ ] Adicionar autenticação no admin
- [ ] Implementar rate limiting
- [ ] Usar banco de dados real
- [ ] Configurar backups

### Exemplo .env
```env
SECRET_KEY=sua-chave-super-secreta-aqui
FLASK_ENV=production
FLASK_DEBUG=0
```

---

## 📈 Métricas

### Otimizações Aplicadas
- ✅ Ancoragem de preços
- ✅ Prova social (+1.500 clientes)
- ✅ Depoimentos reais
- ✅ CTAs estratégicos
- ✅ Mobile-first
- ✅ Performance otimizada

### Conversão Esperada
- Landing → Checkout: 2-5%
- Checkout → Venda: 20-40%
- 70-80% vendas no Premium

---

## 🤝 Contribuindo

Contribuições são bem-vindas!

1. Fork o projeto
2. Crie sua branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Menuly Team**

- Website: [menuly.digital](https://menuly.digital)
- Email: contato@menuly.digital
- GitHub: [@ronwsv](https://github.com/ronwsv)

---

## 🙏 Agradecimentos

- [Flask](https://flask.palletsprojects.com/)
- [Kiwify](https://kiwify.com.br/)
- [Docker](https://www.docker.com/)
- [Google Fonts](https://fonts.google.com/)

---

## 📚 Documentação Adicional

- [Flask Setup](FLASK_README.md)
- [Docker Guide](DOCKER_README.md)
- [Kiwify Integration](KIWIFY_INTEGRATION.md)
- [Quick Start](DOCKER_QUICKSTART.md)

---

<div align="center">

**Feito com ❤️ para transformar negócios**

⭐ Se este projeto foi útil, deixe uma estrela!

[🚀 Ver Demo](https://agendamento.menuly.digital) • [📖 Documentação](docs/) • [🐛 Reportar Bug](https://github.com/ronwsv/landingpage_m/issues)

</div>


Landing page de vendas completa para o serviço **agendamento.menuly.digital**, uma plataforma profissional de agendamento online.

## 🎯 Características

### Técnicas de Neuromarketing Aplicadas

✅ **Ancoragem de Preços**: Valor original R$ 199,90 → Oferta R$ 44,90
✅ **Escassez e Urgência**: "Apenas 7 vagas restantes"
✅ **Prova Social**: +1.500 empresas, depoimentos reais
✅ **Bônus Irresistível**: Chatbot Premium (R$ 59,90) GRÁTIS
✅ **Garantia**: 7 dias de devolução incondicional
✅ **CTA Estratégicos**: Múltiplos botões de ação ao longo da página

### Estrutura da Página

1. **Hero Section**: Chamada principal com benefícios claros
2. **Problemas**: Identificação das dores do público-alvo
3. **Benefícios**: 8 benefícios principais com resultados
4. **Como Funciona**: 3 passos simples
5. **Segmentos**: 8 tipos de negócios que podem usar
6. **Depoimentos**: 6 avaliações 5 estrelas
7. **Planos e Preços**: 3 opções com destaque para o Premium
8. **Prova Social**: Números e estatísticas
9. **FAQ**: 8 perguntas frequentes
10. **CTA Final**: Última chance com urgência
11. **Formulário de Contato**: Captura de leads

## 💰 Estratégia de Preços

### Plano Essencial (Âncora)
- **De**: R$ 199,90
- **Por**: R$ 44,90/mês
- Recursos básicos
- Até 3 profissionais

### Plano Premium (RECOMENDADO) ⭐
- **De**: R$ 199,90
- **Por**: R$ 44,90/mês
- **BÔNUS**: Chatbot (R$ 59,90) GRÁTIS
- **Economia**: R$ 155,00/mês
- Profissionais ilimitados
- Todos os recursos

### Plano Empresarial
- Preço customizado
- Para redes e franquias
- White label e API

## 🚀 Recursos da Plataforma

- ✅ Agendamento online 24/7
- ✅ Gestão de múltiplos profissionais
- ✅ Galeria de fotos profissional
- ✅ **Chatbot inteligente integrado**
- ✅ Agendamentos recorrentes
- ✅ WhatsApp e SMS automáticos
- ✅ Relatórios e dashboard
- ✅ Interface responsiva
- ✅ Lembretes automáticos
- ✅ Redução de no-show em 80%

## 🎨 Design e UX

- Design moderno e profissional
- Cores vibrantes com gradientes
- Animações suaves ao scroll
- 100% responsivo (mobile-first)
- Tipografia clara (Poppins)
- CTAs destacados e pulsantes
- Cards com hover effects
- Ícones emoji para facilitar leitura

## 📱 Compatibilidade

- ✅ Desktop
- ✅ Tablet
- ✅ Smartphone
- ✅ Todos os navegadores modernos

## 🛠️ Tecnologias

- HTML5 semântico
- CSS3 com animações e gradientes
- JavaScript vanilla (sem dependências)
- Formulário com validação
- Smooth scroll
- Intersection Observer para animações
- Lazy loading de imagens

## 📊 Métricas e Conversão

### Elementos de Conversão
- 10+ CTAs estrategicamente posicionados
- 6 badges de urgência e escassez
- 3 garantias de segurança
- Números impressionantes (1.500+ empresas, 50.000+ agendamentos)
- Avaliação 4.9/5.0

### Gatilhos Mentais Usados
1. **Escassez**: Vagas limitadas
2. **Urgência**: Oferta válida hoje
3. **Autoridade**: +1.500 clientes
4. **Prova Social**: Depoimentos reais
5. **Reciprocidade**: Bônus grátis
6. **Ancoragem**: Preço original vs oferta
7. **Garantia**: 7 dias sem riscos

## 🎯 Público-Alvo

- 💇‍♀️ Salões de beleza
- ✂️ Barbearias
- 🏥 Clínicas e consultórios
- 💅 Estúdios de estética
- 🐾 Pet shops
- 💪 Personal trainers
- 🧘‍♀️ Estúdios de yoga/pilates
- ⚖️ Profissionais liberais

## 📝 Personalização

Para customizar a landing page:

1. **Cores**: Edite as variáveis CSS em `:root` no `style.css`
2. **Textos**: Edite diretamente no `index.html`
3. **Imagens**: Adicione na pasta `images/` e atualize os caminhos
4. **Formulário**: Configure o endpoint de envio no `script.js`
5. **Analytics**: Adicione seu código do Google Analytics

## 🔗 Integração

### Formulário de Contato
Atualmente simulado. Para integrar com backend:

```javascript
// Em script.js, substitua o código do formulário:
fetch('/api/contact', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
})
```

### Analytics
Adicione antes do `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🚀 Como Usar

1. Clone ou baixe os arquivos
2. Abra `index.html` no navegador
3. Ou hospede em qualquer servidor web

### Hospedagem Gratuita Sugerida
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

## 📈 Otimizações SEO

- Meta tags configuradas
- Estrutura semântica HTML5
- Performance otimizada
- Mobile-friendly
- Schema markup recomendado

## ✅ Checklist de Lançamento

- [ ] Adicionar logo da empresa
- [ ] Adicionar imagens reais do produto
- [ ] Configurar formulário de contato
- [ ] Adicionar Google Analytics
- [ ] Configurar Facebook Pixel
- [ ] Testar em todos os dispositivos
- [ ] Validar HTML/CSS
- [ ] Otimizar imagens
- [ ] Configurar domínio personalizado
- [ ] Testar velocidade de carregamento

## 💡 Dicas de Conversão

1. **A/B Testing**: Teste diferentes headlines
2. **Heatmaps**: Use ferramentas como Hotjar
3. **Chat ao vivo**: Adicione Tawk.to ou similar
4. **Exit-Intent Popup**: Oferta especial antes de sair
5. **Remarketing**: Configure pixels de mídia paga
6. **Video**: Adicione demonstração em vídeo

## 📞 Suporte

Para dúvidas sobre customização ou implementação:
- 📧 suporte@menuly.digital
- 💬 WhatsApp: (Adicione seu número)

---

**Desenvolvido com ❤️ para aumentar suas vendas!**

🚀 **Converta visitantes em clientes!**