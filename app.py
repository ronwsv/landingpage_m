from flask import Flask, render_template, request, jsonify, redirect, url_for
from datetime import datetime
import json
import os

app = Flask(__name__)

# Configuration from environment variables
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'menuly-agendamento-secret-key-2025')
app.config['ENV'] = os.getenv('FLASK_ENV', 'development')

# Diretório para salvar os leads
LEADS_DIR = 'leads'
if not os.path.exists(LEADS_DIR):
    os.makedirs(LEADS_DIR)

LEADS_FILE = os.path.join(LEADS_DIR, 'contacts.json')

def load_leads():
    """Carrega os leads salvos"""
    if os.path.exists(LEADS_FILE):
        try:
            with open(LEADS_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except:
            return []
    return []

def save_lead(lead_data):
    """Salva um novo lead"""
    leads = load_leads()
    lead_data['timestamp'] = datetime.now().isoformat()
    lead_data['id'] = len(leads) + 1
    leads.append(lead_data)
    
    with open(LEADS_FILE, 'w', encoding='utf-8') as f:
        json.dump(leads, f, ensure_ascii=False, indent=2)
    
    return True

@app.route('/')
def index():
    """Página principal"""
    return render_template('index.html')

@app.route('/api/contact', methods=['POST'])
def contact():
    """Endpoint para receber contatos do formulário"""
    try:
        data = request.get_json()
        
        # Validação básica
        required_fields = ['name', 'business', 'email', 'phone', 'businessType']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({
                    'success': False,
                    'message': f'Campo {field} é obrigatório'
                }), 400
        
        # Salvar lead
        lead_data = {
            'name': data.get('name'),
            'business': data.get('business'),
            'email': data.get('email'),
            'phone': data.get('phone'),
            'business_type': data.get('businessType'),
            'message': data.get('message', ''),
            'ip': request.remote_addr,
            'user_agent': request.headers.get('User-Agent')
        }
        
        save_lead(lead_data)
        
        return jsonify({
            'success': True,
            'message': '🎉 Mensagem enviada com sucesso! Em breve entraremos em contato.'
        }), 200
        
    except Exception as e:
        print(f"Erro ao processar contato: {str(e)}")
        return jsonify({
            'success': False,
            'message': '❌ Erro ao enviar mensagem. Tente novamente.'
        }), 500

@app.route('/admin/leads')
def admin_leads():
    """Página administrativa para visualizar leads (básica)"""
    leads = load_leads()
    return render_template('admin_leads.html', leads=leads, total=len(leads))

@app.route('/api/leads')
def api_leads():
    """API para obter todos os leads (JSON)"""
    leads = load_leads()
    return jsonify({
        'success': True,
        'total': len(leads),
        'leads': leads
    })

@app.route('/api/stats')
def api_stats():
    """API para obter estatísticas"""
    leads = load_leads()
    
    # Contar por tipo de negócio
    business_types = {}
    for lead in leads:
        btype = lead.get('business_type', 'outro')
        business_types[btype] = business_types.get(btype, 0) + 1
    
    # Leads por dia
    leads_by_date = {}
    for lead in leads:
        date = lead.get('timestamp', '')[:10]
        leads_by_date[date] = leads_by_date.get(date, 0) + 1
    
    return jsonify({
        'success': True,
        'total_leads': len(leads),
        'by_business_type': business_types,
        'by_date': leads_by_date
    })

@app.route('/health')
def health():
    """Endpoint de health check"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'version': '1.0.0'
    })

@app.errorhandler(404)
def not_found(e):
    """Página de erro 404"""
    return render_template('404.html'), 404

@app.errorhandler(500)
def server_error(e):
    """Página de erro 500"""
    return render_template('500.html'), 500

# Filtros personalizados para templates
@app.template_filter('datetime')
def format_datetime(value):
    """Formata data/hora"""
    if not value:
        return ''
    try:
        dt = datetime.fromisoformat(value)
        return dt.strftime('%d/%m/%Y às %H:%M')
    except:
        return value

@app.template_filter('business_type_label')
def business_type_label(value):
    """Retorna label amigável para tipo de negócio"""
    labels = {
        'salao': 'Salão de Beleza',
        'barbearia': 'Barbearia',
        'clinica': 'Clínica/Consultório',
        'estetica': 'Estúdio de Estética',
        'pet': 'Pet Shop',
        'personal': 'Personal Trainer',
        'yoga': 'Yoga/Pilates',
        'outro': 'Outro'
    }
    return labels.get(value, value)

if __name__ == '__main__':
    # Get port from environment variable or default to 5000
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_DEBUG', 'True') == 'True'
    
    print("🚀 Menuly Agendamento - Landing Page")
    print(f"📍 Acesse: http://localhost:{port}")
    print(f"👨‍💼 Admin: http://localhost:{port}/admin/leads")
    print(f"🔧 Debug Mode: {debug}")
    print("\n✨ Servidor rodando...\n")
    
    app.run(debug=debug, host='0.0.0.0', port=port)
