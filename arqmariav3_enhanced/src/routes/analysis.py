from flask import Blueprint, request, jsonify
import json
import os
from datetime import datetime
from src.services.ai_service import AIService
from src.services.search_service import SearchService

analysis_bp = Blueprint('analysis', __name__)

@analysis_bp.route('/analyze', methods=['POST'])
def analyze_market():
    try:
        data = request.get_json()
        
        # Validar dados obrigatórios
        required_fields = ['segmento', 'produto', 'publico', 'preco']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'Campo obrigatório: {field}'}), 400
        
        print("🚀 Iniciando análise de mercado...")
        print(f"📊 Dados recebidos: {data}")
        
        # Inicializar serviços
        search_service = SearchService()
        ai_service = AIService()
        
        # Realizar pesquisa de mercado
        print("🔍 Realizando pesquisa de mercado...")
        search_context = search_service.search_for_market_analysis(data)
        print(f"📝 Contexto de pesquisa obtido: {len(search_context)} caracteres")
        
        # Gerar análise com IA
        print("🤖 Gerando análise com IA...")
        analysis_text = ai_service.generate_market_analysis(data, search_context)
        
        if not analysis_text:
            return jsonify({'error': 'Falha ao gerar análise com IA'}), 500
        
        # Tentar parsear como JSON
        try:
            analysis_json = json.loads(analysis_text)
        except json.JSONDecodeError:
            # Se não for JSON válido, criar estrutura básica
            analysis_json = {
                "status": "success",
                "raw_analysis": analysis_text,
                "metadata": {
                    "timestamp": datetime.now().isoformat(),
                    "input_data": data,
                    "search_context_length": len(search_context)
                }
            }
        
        # Adicionar metadados
        analysis_json['dados_pesquisa'] = {
            'timestamp_analise': datetime.now().isoformat(),
            'entrada_usuario': data,
            'contexto_pesquisa_chars': len(search_context),
            'status': 'success'
        }
        
        print("✅ Análise concluída com sucesso!")
        
        return jsonify({
            'success': True,
            'analysis': analysis_json
        })
        
    except Exception as e:
        print(f"❌ Erro na análise: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@analysis_bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy', 
        'service': 'analysis',
        'timestamp': datetime.now().isoformat()
    })

@analysis_bp.route('/test-apis', methods=['GET'])
def test_apis():
    """Endpoint para testar as APIs configuradas"""
    try:
        ai_service = AIService()
        search_service = SearchService()
        
        results = {
            'openai': bool(ai_service.openai_api_key),
            'gemini': bool(ai_service.gemini_api_key),
            'huggingface': bool(ai_service.huggingface_api_key),
            'google_search': bool(search_service.google_api_key and search_service.google_cse_id),
            'serper': bool(search_service.serper_api_key),
            'jina': bool(search_service.jina_api_key)
        }
        
        return jsonify({
            'status': 'success',
            'apis_configured': results,
            'total_configured': sum(results.values())
        })
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'error': str(e)
        }), 500