import os
import requests
from typing import List, Dict, Any, Optional
from dotenv import load_dotenv
import json

load_dotenv()

class SearchService:
    def __init__(self):
        self.google_api_key = os.getenv('GOOGLE_SEARCH_KEY')
        self.google_cse_id = os.getenv('GOOGLE_CSE_ID')
        self.serper_api_key = os.getenv('SERPER_API_KEY')
        self.jina_api_key = os.getenv('JINA_API_KEY')
    
    def search_with_google(self, query: str, num_results: int = 10) -> List[Dict[str, Any]]:
        """Busca usando Google Custom Search API"""
        try:
            if not self.google_api_key or not self.google_cse_id:
                return []
            
            url = "https://www.googleapis.com/customsearch/v1"
            params = {
                'key': self.google_api_key,
                'cx': self.google_cse_id,
                'q': query,
                'num': min(num_results, 10),
                'gl': 'br',
                'hl': 'pt'
            }
            
            response = requests.get(url, params=params)
            response.raise_for_status()
            
            data = response.json()
            results = []
            
            if 'items' in data:
                for item in data['items']:
                    results.append({
                        'title': item.get('title', ''),
                        'link': item.get('link', ''),
                        'snippet': item.get('snippet', ''),
                        'source': 'google'
                    })
            
            return results
            
        except Exception as e:
            print(f"Erro na busca Google: {e}")
            return []
    
    def search_with_serper(self, query: str, num_results: int = 10) -> List[Dict[str, Any]]:
        """Busca usando Serper API"""
        try:
            if not self.serper_api_key:
                return []
            
            url = "https://google.serper.dev/search"
            headers = {
                'X-API-KEY': self.serper_api_key,
                'Content-Type': 'application/json'
            }
            
            data = {
                'q': query,
                'num': num_results,
                'gl': 'br',
                'hl': 'pt'
            }
            
            response = requests.post(url, json=data, headers=headers)
            response.raise_for_status()
            
            result = response.json()
            results = []
            
            if 'organic' in result:
                for item in result['organic']:
                    results.append({
                        'title': item.get('title', ''),
                        'link': item.get('link', ''),
                        'snippet': item.get('snippet', ''),
                        'source': 'serper'
                    })
            
            return results
            
        except Exception as e:
            print(f"Erro na busca Serper: {e}")
            return []
    
    def extract_content_with_jina(self, url: str) -> Optional[str]:
        """Extrai conteúdo de URL usando Jina Reader"""
        try:
            if not self.jina_api_key:
                return None
            
            jina_url = f"https://r.jina.ai/{url}"
            headers = {
                'Authorization': f'Bearer {self.jina_api_key}',
                'Accept': 'application/json'
            }
            
            response = requests.get(jina_url, headers=headers, timeout=30)
            response.raise_for_status()
            
            data = response.json()
            return data.get('data', {}).get('content', '')
            
        except Exception as e:
            print(f"Erro ao extrair conteúdo com Jina: {e}")
            return None
    
    def comprehensive_search(self, queries: List[str], max_results_per_query: int = 5) -> str:
        """Realiza busca abrangente e retorna contexto formatado"""
        all_results = []
        
        for query in queries:
            print(f"🔍 Buscando: {query}")
            
            # Tentar Serper primeiro
            results = self.search_with_serper(query, max_results_per_query)
            
            # Se Serper falhar, tentar Google
            if not results:
                results = self.search_with_google(query, max_results_per_query)
            
            all_results.extend(results)
        
        # Formatar contexto
        context_parts = []
        
        for i, result in enumerate(all_results[:20]):  # Limitar a 20 resultados
            context_parts.append(f"--- FONTE {i+1}: {result['title']} ---")
            context_parts.append(f"URL: {result['link']}")
            context_parts.append(f"Conteúdo: {result['snippet']}")
            context_parts.append("")
        
        return "\n".join(context_parts)
    
    def search_for_market_analysis(self, data: Dict[str, Any]) -> str:
        """Busca específica para análise de mercado"""
        
        # Construir queries baseadas nos dados fornecidos
        queries = []
        
        segmento = data.get("segmento", "")
        produto = data.get("produto", "")
        publico = data.get("publico", "")
        concorrentes = data.get("concorrentes", "")
        
        if segmento:
            queries.append(f"mercado {segmento} Brasil 2024")
            queries.append(f"tendências {segmento} 2024")
        
        if produto:
            queries.append(f"{produto} análise mercado")
            queries.append(f"{produto} concorrentes Brasil")
        
        if publico:
            queries.append(f"perfil consumidor {publico}")
            queries.append(f"comportamento {publico} Brasil")
        
        if concorrentes:
            for concorrente in concorrentes.split(",")[:3]:  # Máximo 3 concorrentes
                concorrente = concorrente.strip()
                if concorrente:
                    queries.append(f"{concorrente} estratégia marketing")
        
        # Queries gerais importantes
        queries.extend([
            "marketing digital tendências 2024",
            "comportamento consumidor online Brasil",
            "estratégias marketing digital eficazes"
        ])
        
        return self.comprehensive_search(queries[:10])  # Máximo 10 queries