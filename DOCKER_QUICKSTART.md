# 🚀 Quick Start - Docker

## Rodar com Docker Compose (Mais Fácil)

```powershell
# 1. Build e Start
docker-compose up --build

# 2. Acessar
# Site: http://localhost:5000
# Admin: http://localhost:5000/admin/leads

# 3. Parar (Ctrl+C e depois)
docker-compose down
```

## Rodar em Background

```powershell
# Start
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar
docker-compose down
```

## Comandos Úteis

```powershell
# Ver containers rodando
docker ps

# Ver logs
docker-compose logs web

# Reiniciar
docker-compose restart

# Rebuild completo
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## Estrutura

```
Container expõe:
- Porta 5000 → Aplicação Flask
- Volume ./leads → Persistência de dados

Health check:
- Verifica a cada 30s se está healthy
```

## Pronto! 🎉

Sua aplicação está containerizada e pronta para deploy!
