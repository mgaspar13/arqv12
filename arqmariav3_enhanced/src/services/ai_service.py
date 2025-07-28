import os
import openai
import requests
from typing import Dict, Any, Optional
from dotenv import load_dotenv

load_dotenv()

class AIService:
    def __init__(self):
        self.openai_api_key = os.getenv('OPENAI_API_KEY')
        self.gemini_api_key = os.getenv('GEMINI_API_KEY')
        self.huggingface_api_key = os.getenv('HUGGINGFACE_API_KEY')
        
        if self.openai_api_key:
            openai.api_key = self.openai_api_key
    
    def generate_analysis_with_openai(self, prompt: str, max_tokens: int = 4000) -> Optional[str]:
        """Gera análise usando OpenAI GPT"""
        try:
            if not self.openai_api_key:
                raise ValueError("OpenAI API key não configurada")
            
            client = openai.OpenAI(api_key=self.openai_api_key)
            
            response = client.chat.completions.create(
                model="gpt-4-turbo-preview",
                messages=[
                    {"role": "system", "content": "Você é um especialista em análise de mercado e marketing digital. Gere análises detalhadas e estruturadas em formato JSON."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=max_tokens,
                temperature=0.7
            )
            
            return response.choices[0].message.content
            
        except Exception as e:
            print(f"Erro ao usar OpenAI: {e}")
            return None
    
    def generate_analysis_with_gemini(self, prompt: str) -> Optional[str]:
        """Gera análise usando Google Gemini"""
        try:
            if not self.gemini_api_key:
                raise ValueError("Gemini API key não configurada")
            
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={self.gemini_api_key}"
            
            headers = {
                'Content-Type': 'application/json',
            }
            
            data = {
                "contents": [{
                    "parts": [{
                        "text": prompt
                    }]
                }],
                "generationConfig": {
                    "temperature": 0.7,
                    "topK": 1,
                    "topP": 1,
                    "maxOutputTokens": 4000,
                }
            }
            
            response = requests.post(url, json=data, headers=headers)
            response.raise_for_status()
            
            result = response.json()
            if 'candidates' in result and len(result['candidates']) > 0:
                return result['candidates'][0]['content']['parts'][0]['text']
            
            return None
            
        except Exception as e:
            print(f"Erro ao usar Gemini: {e}")
            return None
    
    def generate_analysis_with_huggingface(self, prompt: str) -> Optional[str]:
        """Gera análise usando HuggingFace"""
        try:
            if not self.huggingface_api_key:
                raise ValueError("HuggingFace API key não configurada")
            
            model_name = os.getenv('HUGGINGFACE_MODEL_NAME', 'microsoft/DialoGPT-medium')
            url = f"https://api-inference.huggingface.co/models/{model_name}"
            
            headers = {
                'Authorization': f'Bearer {self.huggingface_api_key}',
                'Content-Type': 'application/json',
            }
            
            data = {
                "inputs": prompt,
                "parameters": {
                    "max_length": 2000,
                    "temperature": 0.7,
                    "do_sample": True
                }
            }
            
            response = requests.post(url, json=data, headers=headers)
            response.raise_for_status()
            
            result = response.json()
            if isinstance(result, list) and len(result) > 0:
                return result[0].get('generated_text', '')
            
            return None
            
        except Exception as e:
            print(f"Erro ao usar HuggingFace: {e}")
            return None
    
    def generate_market_analysis(self, data: Dict[str, Any], search_context: str = "") -> Optional[str]:
        """Gera análise de mercado usando a melhor API disponível"""
        
        prompt = self._build_analysis_prompt(data, search_context)
        
        # Tentar OpenAI primeiro
        result = self.generate_analysis_with_openai(prompt)
        if result:
            return result
        
        # Tentar Gemini como fallback
        result = self.generate_analysis_with_gemini(prompt)
        if result:
            return result
        
        # Tentar HuggingFace como último recurso
        result = self.generate_analysis_with_huggingface(prompt)
        if result:
            return result
        
        raise Exception("Nenhuma API de IA disponível funcionou")
    
    def _build_analysis_prompt(self, data: Dict[str, Any], search_context: str) -> str:
        """Constrói o prompt para análise de mercado"""
        
        return f"""
# ANÁLISE ULTRA-DETALHADA DE MERCADO - ARQV30 ENHANCED

Você é um DIRETOR SUPREMO DE ANÁLISE DE MERCADO com 30+ anos de experiência.

## DADOS DO PROJETO:
- **Segmento**: {data.get("segmento", "Não informado")}
- **Produto/Serviço**: {data.get("produto", "Não informado")}
- **Público-Alvo**: {data.get("publico", "Não informado")}
- **Preço**: R$ {data.get("preco", "Não informado")}
- **Objetivo de Receita**: R$ {data.get("objetivo_receita", "Não informado")}
- **Orçamento Marketing**: R$ {data.get("orcamento_marketing", "Não informado")}
- **Prazo**: {data.get("prazo_lancamento", "Não informado")}
- **Concorrentes**: {data.get("concorrentes", "Não informado")}
- **Dados Adicionais**: {data.get("dados_adicionais", "Não informado")}

## CONTEXTO DE PESQUISA:
{search_context[:8000] if search_context else "Nenhuma pesquisa adicional fornecida"}

## INSTRUÇÕES:

Gere uma análise ULTRA-COMPLETA em formato JSON estruturado com as seguintes seções:

1. **avatar_ultra_detalhado**: Perfil demográfico, psicográfico, dores, desejos, objeções e jornada emocional
2. **escopo_posicionamento**: Posicionamento de mercado, proposta de valor única, diferenciais
3. **analise_concorrencia_profunda**: SWOT, estratégias e vulnerabilidades dos principais concorrentes
4. **estrategia_palavras_chave**: Palavras primárias, secundárias, cauda longa e intenção de busca
5. **metricas_performance_detalhadas**: KPIs, projeções financeiras, ROI esperado
6. **plano_acao_detalhado**: Fases de preparação, lançamento e crescimento
7. **insights_exclusivos_ultra**: 25+ insights únicos e valiosos
8. **inteligencia_mercado**: Tendências, oportunidades, ameaças e gaps
9. **drivers_mentais**: Gatilhos psicológicos e roteiros de ativação
10. **provas_visuais_instantaneas**: Demonstrações e experimentos de impacto

CRÍTICO: 
- Use APENAS dados REAIS e baseados em pesquisa
- Seja específico e detalhado em cada seção
- Forneça números, estatísticas e exemplos concretos
- Mantenha o foco no mercado brasileiro
- Estruture tudo em JSON válido e bem formatado

Responda APENAS com o JSON, sem explicações adicionais.
"""