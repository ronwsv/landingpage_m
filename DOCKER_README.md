# 🐳 Docker - Menuly Agendamento

## 📦 Arquivos Docker

```
agendamento_landingpage/
├── Dockerfile              # Imagem Docker da aplicação
├── docker-compose.yml      # Orquestração com Docker Compose
├── .dockerignore          # Arquivos ignorados no build
├── .env.example           # Exemplo de variáveis de ambiente
└── start.sh               # Script de produção com Gunicorn
```

## 🚀 Como Usar

### Opção 1: Docker Compose (Recomendado)

#### 1. Build e Start
```powershell
docker-compose up --build
```

#### 2. Rodar em Background
```powershell
docker-compose up -d
```

#### 3. Ver Logs
```powershell
docker-compose logs -f
```

#### 4. Parar
```powershell
docker-compose down
```

#### 5. Rebuild Completo
```powershell
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Opção 2: Docker Manual

#### 1. Build da Imagem
```powershell
docker build -t menuly-agendamento:latest .
```

#### 2. Rodar Container
```powershell
docker run -d `
  --name menuly-agendamento `
  -p 5000:5000 `
  -v ${PWD}/leads:/app/leads `
  -e SECRET_KEY=sua-chave-secreta `
  menuly-agendamento:latest
```

#### 3. Ver Logs
```powershell
docker logs -f menuly-agendamento
```

#### 4. Parar Container
```powershell
docker stop menuly-agendamento
docker rm menuly-agendamento
```

## 🌐 Acessar Aplicação

Após iniciar o container:

- **Site**: http://localhost:5000
- **Admin**: http://localhost:5000/admin/leads
- **API**: http://localhost:5000/api/leads
- **Health**: http://localhost:5000/health

## 🔧 Configurações

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
SECRET_KEY=sua-chave-secreta-super-segura
FLASK_ENV=production
FLASK_DEBUG=0
PORT=5000
```

### Porta Personalizada

Para usar outra porta (ex: 8080):

```powershell
# Docker Compose
# Edite docker-compose.yml e altere "5000:5000" para "8080:5000"

# Docker Manual
docker run -d -p 8080:5000 menuly-agendamento:latest
```

## 📊 Recursos do Container

### Especificações
- **Imagem Base**: Python 3.11-slim
- **Servidor**: Gunicorn (produção) ou Flask dev server
- **Workers**: 4 workers + 2 threads cada
- **Timeout**: 60 segundos
- **Health Check**: A cada 30 segundos

### Volumes
```yaml
volumes:
  - ./leads:/app/leads  # Persistência dos leads
```

Os leads ficam salvos na pasta `leads/` do host, mesmo se o container for removido.

## 🔍 Health Check

O container possui health check automático:

```powershell
# Verificar status
docker ps

# Ver detalhes do health
docker inspect menuly-agendamento | grep -A 10 Health
```

Status possíveis:
- `starting` - Container iniciando
- `healthy` - Funcionando normalmente
- `unhealthy` - Problema detectado

## 🐛 Debug e Troubleshooting

### Ver Logs em Tempo Real
```powershell
docker-compose logs -f web
```

### Entrar no Container
```powershell
docker exec -it menuly-agendamento bash
```

### Ver Processos
```powershell
docker top menuly-agendamento
```

### Ver Estatísticas
```powershell
docker stats menuly-agendamento
```

### Reiniciar Container
```powershell
docker-compose restart
```

## 🏗️ Build Otimizado

### Multi-stage Build (Futuro)

Para reduzir tamanho da imagem:

```dockerfile
# Build stage
FROM python:3.11-slim as builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Runtime stage
FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH
CMD ["python", "app.py"]
```

### Tamanho da Imagem
```powershell
docker images menuly-agendamento
```

Tamanho esperado: ~150-200 MB

## 🚀 Deploy em Produção

### Docker Hub

#### 1. Login
```powershell
docker login
```

#### 2. Tag da Imagem
```powershell
docker tag menuly-agendamento:latest seu-usuario/menuly-agendamento:latest
docker tag menuly-agendamento:latest seu-usuario/menuly-agendamento:v1.0.0
```

#### 3. Push
```powershell
docker push seu-usuario/menuly-agendamento:latest
docker push seu-usuario/menuly-agendamento:v1.0.0
```

#### 4. Pull em Produção
```powershell
docker pull seu-usuario/menuly-agendamento:latest
docker run -d -p 80:5000 seu-usuario/menuly-agendamento:latest
```

### AWS ECS

```bash
# Build para ARM64 (Graviton)
docker buildx build --platform linux/arm64 -t menuly-agendamento:latest .

# Push para ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin SEU_ECR_URI
docker tag menuly-agendamento:latest SEU_ECR_URI/menuly-agendamento:latest
docker push SEU_ECR_URI/menuly-agendamento:latest
```

### Google Cloud Run

```bash
# Build e push
gcloud builds submit --tag gcr.io/SEU_PROJECT/menuly-agendamento

# Deploy
gcloud run deploy menuly-agendamento \
  --image gcr.io/SEU_PROJECT/menuly-agendamento \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 5000
```

### Azure Container Instances

```bash
# Login
az login

# Criar grupo de recursos
az group create --name menuly-rg --location eastus

# Criar container
az container create \
  --resource-group menuly-rg \
  --name menuly-agendamento \
  --image seu-usuario/menuly-agendamento:latest \
  --dns-name-label menuly-agendamento \
  --ports 5000
```

### Heroku

```bash
# Login
heroku login
heroku container:login

# Push
heroku container:push web -a seu-app
heroku container:release web -a seu-app
```

## 🔒 Segurança

### 1. Não Exponha Portas Desnecessárias
```yaml
# Apenas 5000 é necessário
ports:
  - "5000:5000"
```

### 2. Use Secrets para Senhas
```powershell
# Criar secret
docker secret create db_password ./db_password.txt

# Usar no compose
services:
  web:
    secrets:
      - db_password
```

### 3. Scan de Vulnerabilidades
```powershell
# Scan com Docker Scout
docker scout cves menuly-agendamento:latest

# Scan com Trivy
trivy image menuly-agendamento:latest
```

### 4. User Não-Root
```dockerfile
# Adicionar ao Dockerfile
RUN useradd -m -u 1000 appuser
USER appuser
```

## 📈 Monitoramento

### Docker Stats
```powershell
docker stats menuly-agendamento
```

### Logs para Arquivo
```powershell
docker-compose logs > logs.txt
```

### Integração com Prometheus
```yaml
# docker-compose.yml
services:
  web:
    labels:
      - "prometheus.scrape=true"
      - "prometheus.port=5000"
```

## 🔄 CI/CD

### GitHub Actions

```yaml
name: Docker Build and Push

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Build Docker image
      run: docker build -t menuly-agendamento .
    
    - name: Login to Docker Hub
      run: echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
    
    - name: Push to Docker Hub
      run: |
        docker tag menuly-agendamento:latest ${{ secrets.DOCKER_USERNAME }}/menuly-agendamento:latest
        docker push ${{ secrets.DOCKER_USERNAME }}/menuly-agendamento:latest
```

## 🧪 Testes

### Test Build Local
```powershell
# Build sem cache
docker build --no-cache -t menuly-agendamento:test .

# Rodar teste
docker run --rm menuly-agendamento:test python -m pytest
```

### Test Container Startup
```powershell
# Rodar e testar
docker run -d --name test-container -p 5001:5000 menuly-agendamento:latest
curl http://localhost:5001/health
docker stop test-container
docker rm test-container
```

## 📝 Comandos Úteis

```powershell
# Listar containers
docker ps
docker ps -a

# Listar imagens
docker images

# Remover containers parados
docker container prune

# Remover imagens não usadas
docker image prune

# Limpar tudo
docker system prune -a

# Ver uso de espaço
docker system df

# Inspecionar container
docker inspect menuly-agendamento

# Ver network
docker network ls
docker network inspect menuly-network
```

## ✅ Checklist de Deploy

- [ ] Criar arquivo `.env` com variáveis de produção
- [ ] Build da imagem: `docker-compose build`
- [ ] Testar localmente: `docker-compose up`
- [ ] Verificar health check
- [ ] Testar todas as rotas
- [ ] Verificar persistência de dados (leads/)
- [ ] Configurar SSL/HTTPS (nginx ou traefik)
- [ ] Configurar backup automático
- [ ] Monitoramento (logs, métricas)
- [ ] Documentar processo para equipe

## 🎯 Performance

### Otimizações Aplicadas
- ✅ Multi-worker com Gunicorn
- ✅ Python slim image (menor tamanho)
- ✅ Layer caching (requirements primeiro)
- ✅ .dockerignore (build mais rápido)
- ✅ Health check automático
- ✅ Restart automático

### Recursos Esperados
- **CPU**: 1 core
- **RAM**: 512 MB - 1 GB
- **Disco**: 200 MB (imagem) + dados
- **Conexões simultâneas**: ~100-200

---

**Container pronto para produção!** 🐳🚀
