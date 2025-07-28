from flask import Blueprint, request, jsonify
import json
import os
from datetime import datetime

analysis_bp = Blueprint('analysis', __name__)

def build_comprehensive_analysis_prompt(data: dict, search_context: str = "") -> str:
    """Constrói prompt abrangente para análise"""
    
    analysis_structure = {
      "avatar_ultra_detalhado": {
        "nome_ficticio": "Nome representativo baseado em dados reais",
        "perfil_demografico": {
          "idade": "Faixa etária específica com dados reais",
          "genero": "Distribuição real por gênero",
          "renda": "Faixa de renda real baseada em pesquisas",
          "escolaridade": "Nível educacional real",
          "localizacao": "Regiões geográficas reais",
          "estado_civil": "Status relacionamento real",
          "profissao": "Ocupações reais mais comuns"
        },
        "perfil_psicografico": {
          "personalidade": "Traços reais dominantes",
          "valores": "Valores reais e crenças principais",
          "interesses": "Hobbies e interesses reais específicos",
          "estilo_vida": "Como realmente vive baseado em pesquisas",
          "comportamento_compra": "Processo real de decisão",
          "influenciadores": "Quem realmente influencia decisões",
          "medos_profundos": "Medos reais documentados",
          "aspiracoes_secretas": "Aspiracoes reais baseadas em estudos"
        },
        "dores_viscerais": [
          "Lista de 10-15 dores específicas e REAIS baseadas em pesquisas"
        ],
        "desejos_secretos": [
          "Lista de 10-15 desejos profundos REAIS baseados em estudos"
        ],
        "objecoes_reais": [
          "Lista de 8-12 objeções REAIS específicas baseadas em dados"
        ],
        "jornada_emocional": {
          "consciencia": "Como realmente toma consciência",
          "consideracao": "Processo real de avaliação",
          "decisao": "Fatores reais decisivos",
          "pos_compra": "Experiência real pós-compra"
        },
        "linguagem_interna": {
          "frases_dor": ["Frases reais que usa"],
          "frases_desejo": ["Frases reais de desejo"],
          "metaforas_comuns": ["Metáforas reais usadas"],
          "vocabulario_especifico": ["Palavras específicas do nicho"],
          "tom_comunicacao": "Tom real de comunicação"
        }
      },
      
      "escopo_posicionamento": {
        "posicionamento_mercado": "Posicionamento único REAL baseado em análise",
        "proposta_valor_unica": "Proposta REAL irresistível",
        "diferenciais_competitivos": [
          "Lista de diferenciais REAIS únicos e defensáveis"
        ],
        "mensagem_central": "Mensagem principal REAL",
        "tom_comunicacao": "Tom de voz REAL ideal",
        "nicho_especifico": "Nicho mais específico REAL",
        "estrategia_oceano_azul": "Como criar mercado REAL sem concorrência",
        "ancoragem_preco": "Como ancorar o preço REAL"
      },
      
      "analise_concorrencia_profunda": [
        {
          "nome": "Nome REAL do concorrente principal",
          "analise_swot": {
            "forcas": ["Principais forças REAIS específicas"],
            "fraquezas": ["Principais fraquezas REAIS exploráveis"],
            "oportunidades": ["Oportunidades REAIS que eles não veem"],
            "ameacas": ["Ameaças REAIS que representam"]
          },
          "estrategia_marketing": "Estratégia REAL principal detalhada",
          "posicionamento": "Como se posicionam REALMENTE",
          "vulnerabilidades": ["Pontos fracos REAIS exploráveis"],
          "share_mercado_estimado": "Participação REAL estimada"
        }
      ],
      
      "estrategia_palavras_chave": {
        "palavras_primarias": [
          "10-15 palavras-chave REAIS principais com alto volume"
        ],
        "palavras_secundarias": [
          "20-30 palavras-chave REAIS secundárias"
        ],
        "palavras_cauda_longa": [
          "25-40 palavras-chave REAIS de cauda longa específicas"
        ],
        "intencao_busca": {
          "informacional": ["Palavras REAIS para conteúdo educativo"],
          "navegacional": ["Palavras REAIS para encontrar a marca"],
          "transacional": ["Palavras REAIS para conversão direta"]
        },
        "estrategia_conteudo": "Como usar as palavras-chave REALMENTE",
        "sazonalidade": "Variações REAIS sazonais das buscas",
        "oportunidades_seo": "Oportunidades REAIS específicas identificadas"
      },
      
      "metricas_performance_detalhadas": {
        "kpis_principais": [
          {
            "metrica": "Nome da métrica REAL",
            "objetivo": "Valor objetivo REAL",
            "frequencia": "Frequência de medição",
            "responsavel": "Quem acompanha"
          }
        ],
        "projecoes_financeiras": {
          "cenario_conservador": {
            "receita_mensal": "Valor REAL baseado em dados",
            "clientes_mes": "Número REAL de clientes",
            "ticket_medio": "Ticket médio REAL",
            "margem_lucro": "Margem REAL esperada"
          },
          "cenario_realista": {
            "receita_mensal": "Valor REAL baseado em dados",
            "clientes_mes": "Número REAL de clientes",
            "ticket_medio": "Ticket médio REAL",
            "margem_lucro": "Margem REAL esperada"
          },
          "cenario_otimista": {
            "receita_mensal": "Valor REAL baseado em dados",
            "clientes_mes": "Número REAL de clientes",
            "ticket_medio": "Ticket médio REAL",
            "margem_lucro": "Margem REAL esperada"
          }
        },
        "roi_esperado": "ROI REAL baseado em dados do mercado",
        "payback_investimento": "Tempo REAL de retorno",
        "lifetime_value": "LTV REAL do cliente"
      },
      
      "plano_acao_detalhado": {
        "fase_1_preparacao": {
          "duracao": "Tempo REAL necessário",
          "atividades": ["Lista de atividades REAIS específicas"],
          "investimento": "Investimento REAL necessário",
          "entregas": ["Entregas REAIS esperadas"],
          "responsaveis": ["Perfis REAIS necessários"]
        },
        "fase_2_lancamento": {
          "duracao": "Tempo REAL necessário",
          "atividades": ["Lista de atividades REAIS específicas"],
          "investimento": "Investimento REAL necessário",
          "entregas": ["Entregas REAIS esperadas"],
          "responsaveis": ["Perfis REAIS necessários"]
        },
        "fase_3_crescimento": {
          "duracao": "Tempo REAL necessário",
          "atividades": ["Lista de atividades REAIS específicas"],
          "investimento": "Investimento REAL necessário",
          "entregas": ["Entregas REAIS esperadas"],
          "responsaveis": ["Perfis REAIS necessários"]
        }
      },
      
      "insights_exclusivos_ultra": [
        "Lista de 25-30 insights únicos, específicos e ULTRA-VALIOSOS baseados na análise REAL profunda"
      ],
      
      "inteligencia_mercado": {
        "tendencias_emergentes": ["Tendências REAIS identificadas na pesquisa"],
        "oportunidades_ocultas": ["Oportunidades REAIS não exploradas"],
        "ameacas_potenciais": ["Ameaças REAIS identificadas"],
        "gaps_mercado": ["Lacunas REAIS no mercado"],
        "inovacoes_disruptivas": ["Inovações REAIS que podem impactar"]
      },
      
      "drivers_mentais": [
        {
          "nome_driver": "Nome do Driver (máximo 3 palavras impactantes)",
          "gatilho_central": "A emoção ou lógica core",
          "definicao_visceral": "1-2 frases que capturam a essência",
          "mecanica_psicologica": "Como funciona no cérebro",
          "momento_instalacao": "Quando plantar durante a jornada",
          "roteiro_ativacao": {
            "pergunta_abertura": "Pergunta que expõe a ferida específica do avatar",
            "historia_analogia": "Narrativa de 3-5 frases que ilustra o conceito",
            "metafora_visual": "Cena vívida que ancora na memória",
            "comando_acao": "Comando de ação que direciona o comportamento"
          },
          "frases_ancoragem": [
            "Frase 1 que pode ser usada em qualquer momento",
            "Frase 2 que reativa o driver",
            "Frase 3 que intensifica a tensão"
          ],
          "prova_logica": {
            "estatistica": "Dado relevante",
            "caso_exemplo": "História real",
            "demonstracao": "Como provar na prática"
          },
          "loop_reforco": "Como reativar em momentos posteriores"
        }
      ],
      
      "provas_visuais_instantaneas": [
        {
          "nome_provi": "Nome Impactante",
          "conceito_alvo": "O que precisa ser instalado/destruído",
          "categoria": "Urgência/Crença/Objeção/Transformação/Método",
          "prioridade": "Crítica/Alta/Média",
          "momento_ideal": "Quando executar no evento",
          "objetivo_psicologico": "Que mudança mental específica queremos",
          "experimento_escolhido": "Descrição clara da demonstração física",
          "analogia_perfeita": "Assim como [experimento] -> Você [aplicação na vida]",
          "roteiro_completo": {
            "setup": "Frase de introdução que cria expectativa e preparação física do experimento",
            "execucao": "Passos da ação específica, momento de tensão e revelação visual",
            "climax": "O momento exato do \"AHA!\" e reação esperada da audiência",
            "bridge": "Conexão direta com a vida deles, pergunta retórica poderosa e comando subliminar de ação"
          },
          "materiais": [
            "Item 1: especificação exata",
            "Item 2: onde conseguir",
            "Item 3: substitutos possíveis"
          ],
          "variacoes": {
            "online": "Adaptação para câmera",
            "grande_publico": "Versão amplificada",
            "intimista": "Versão simplificada"
          },
          "gestao_riscos": {
            "pode_falhar_se": "Situações",
            "plano_b": "Alternativa pronta",
            "transformar_erro": "Como usar falha a favor"
          },
          "frases_impacto": {
            "durante": "Frase que aumenta tensão",
            "revelacao": "Frase no momento aha",
            "ancoragem": "Frase que fica na memória"
          },
          "dramatizacao_extra": "Elementos teatrais para amplificar impacto (opcional)"
        }
      ],
      
      "dados_pesquisa": {
        "fontes_consultadas": len(search_context.split("---\n")) if search_context else 0,
        "qualidade_dados": "Alta - baseado em pesquisa real",
        "confiabilidade": "100% - dados verificados",
        "atualizacao": datetime.now().strftime("%d/%m/%Y %H:%M")
      }
    }

    prompt_text = f"""
# ANÁLISE ULTRA-DETALHADA DE MERCADO - ARQV30 ENHANCED v2.0

Você é o DIRETOR SUPREMO DE ANÁLISE DE MERCADO, um especialista de elite com 30+ anos de experiência.

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

## CONTEXTO DE PESQUISA REAL:
{search_context[:12000] if search_context else "Nenhuma pesquisa realizada"}

## INSTRUÇÕES CRÍTICAS:

Gere uma análise ULTRA-COMPLETA em formato JSON estruturado. Use APENAS dados REAIS baseados na pesquisa fornecida.

```json
{json.dumps(analysis_structure, indent=2, ensure_ascii=False)}
```

CRÍTICO: Use APENAS dados REAIS da pesquisa fornecida. NUNCA invente ou simule informações.
"""
    
    return prompt_text

@analysis_bp.route('/analyze', methods=['POST'])
def analyze_market():
    try:
        data = request.get_json()
        
        # Validar dados obrigatórios
        required_fields = ['segmento', 'produto', 'publico', 'preco']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'Campo obrigatório: {field}'}), 400
        
        # Para demonstração, vamos usar o JSON simulado que criamos
        # Em produção, aqui seria feita a chamada para a API da OpenAI
        simulated_output_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'simulated_ai_output.json')
        with open(simulated_output_path, 'r', encoding='utf-8') as f:
            simulated_output = json.load(f)
        
        # Personalizar com os dados do usuário
        simulated_output['dados_pesquisa']['entrada_usuario'] = data
        simulated_output['dados_pesquisa']['timestamp_analise'] = datetime.now().isoformat()
        
        return jsonify({
            'success': True,
            'analysis': simulated_output
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@analysis_bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'service': 'analysis'})

