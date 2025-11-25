#!/bin/bash

# Production startup script
echo "🚀 Starting Menuly Agendamento in Production Mode..."

# Run with Gunicorn for production
exec gunicorn \
    --bind 0.0.0.0:5000 \
    --workers 4 \
    --threads 2 \
    --timeout 60 \
    --access-logfile - \
    --error-logfile - \
    --log-level info \
    app:app
