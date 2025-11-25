# Menuly Agendamento - Aplicação Flask

## 🚀 Como Rodar

### 1. Instalar Dependências

```powershell
pip install -r requirements.txt
```

### 2. Rodar o Servidor

```powershell
python app.py
```

### 3. Acessar

- **Site**: http://localhost:5000
- **Admin**: http://localhost:5000/admin/leads
- **API**: http://localhost:5000/api/leads

## 📂 Estrutura

```
agendamento_landingpage/
├── app.py                 # Aplicação Flask principal
├── requirements.txt       # Dependências Python
├── templates/            # Templates HTML
│   ├── index.html        # Landing page principal
│   ├── admin_leads.html  # Página admin de leads
│   ├── 404.html          # Página de erro 404
│   └── 500.html          # Página de erro 500
├── static/               # Arquivos estáticos
│   ├── style.css         # Estilos CSS
│   └── script.js         # JavaScript
└── leads/                # Dados salvos
    └── contacts.json     # Leads capturados
```

## 🔌 API Endpoints

### POST /api/contact
Recebe dados do formulário de contato

**Request:**
```json
{
  "name": "João Silva",
  "business": "Salão João",
  "email": "joao@email.com",
  "phone": "(11) 98765-4321",
  "businessType": "salao",
  "message": "Mensagem opcional"
}
```

**Response:**
```json
{
  "success": true,
  "message": "🎉 Mensagem enviada com sucesso!"
}
```

### GET /api/leads
Retorna todos os leads em JSON

**Response:**
```json
{
  "success": true,
  "total": 10,
  "leads": [...]
}
```

### GET /api/stats
Retorna estatísticas dos leads

**Response:**
```json
{
  "success": true,
  "total_leads": 10,
  "by_business_type": {
    "salao": 5,
    "barbearia": 3,
    "clinica": 2
  },
  "by_date": {
    "2025-11-25": 10
  }
}
```

### GET /health
Health check do servidor

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-11-25T10:30:00",
  "version": "1.0.0"
}
```

## 👨‍💼 Painel Admin

Acesse `/admin/leads` para visualizar:
- Total de leads capturados
- Lista completa com todos os dados
- Filtros por tipo de negócio
- Exportação em JSON

## 📊 Dados Salvos

Os leads são salvos automaticamente em `leads/contacts.json` com:
- ID único
- Todos os dados do formulário
- Timestamp da submissão
- IP e User Agent

## 🔒 Segurança

**Para produção, adicione:**

1. **Autenticação no Admin**
```python
from flask_httpauth import HTTPBasicAuth

auth = HTTPBasicAuth()

@auth.verify_password
def verify_password(username, password):
    if username == 'admin' and password == 'sua-senha-segura':
        return username
    return None

@app.route('/admin/leads')
@auth.login_required
def admin_leads():
    # ...
```

2. **CORS** (se necessário)
```python
from flask_cors import CORS
CORS(app)
```

3. **Rate Limiting**
```python
from flask_limiter import Limiter

limiter = Limiter(app, key_func=lambda: request.remote_addr)

@app.route('/api/contact', methods=['POST'])
@limiter.limit("5 per minute")
def contact():
    # ...
```

4. **HTTPS** - Use um certificado SSL

5. **Variáveis de Ambiente**
```python
import os
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default-dev-key')
```

## 📧 Integração Email

Para enviar emails quando receber leads:

```python
from flask_mail import Mail, Message

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'seu@email.com'
app.config['MAIL_PASSWORD'] = 'sua-senha'

mail = Mail(app)

# No endpoint /api/contact, adicione:
msg = Message('Novo Lead!',
              sender='seu@email.com',
              recipients=['vendas@menuly.com'])
msg.body = f"""
Novo lead capturado!

Nome: {lead_data['name']}
Negócio: {lead_data['business']}
Email: {lead_data['email']}
Telefone: {lead_data['phone']}
"""
mail.send(msg)
```

## 🗄️ Banco de Dados

Para usar PostgreSQL/MySQL em vez de JSON:

```python
from flask_sqlalchemy import SQLAlchemy

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://user:pass@localhost/menuly'
db = SQLAlchemy(app)

class Lead(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    business = db.Column(db.String(100))
    email = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    business_type = db.Column(db.String(50))
    message = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
```

## 🌐 Deploy

### Heroku
```bash
heroku create menuly-agendamento
git push heroku main
```

### Vercel
```bash
pip install vercel
vercel
```

### PythonAnywhere
1. Upload dos arquivos
2. Configure o WSGI
3. Configure o virtualenv

### Docker
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
```

## 🔧 Configuração Adicional

### Modificar Porta
```python
app.run(debug=True, host='0.0.0.0', port=8080)
```

### Modo Produção
```python
if __name__ == '__main__':
    app.run(debug=False)  # Desabilitar debug
```

### Logs
```python
import logging
logging.basicConfig(filename='app.log', level=logging.INFO)
```

## 📱 Recursos Adicionais

- ✅ Formulário funcional com validação
- ✅ Salvamento automático de leads
- ✅ Painel administrativo
- ✅ API REST completa
- ✅ Páginas de erro personalizadas
- ✅ Responsivo mobile
- ✅ Animações e UX otimizada

## 🆘 Suporte

Problemas? Verifique:
1. Python 3.7+ instalado
2. Dependências instaladas (`pip install -r requirements.txt`)
3. Porta 5000 disponível
4. Permissões de escrita na pasta `leads/`

---

**Desenvolvido com ❤️ para converter visitantes em clientes!**
