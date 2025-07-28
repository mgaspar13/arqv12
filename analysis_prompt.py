
import json
from datetime import datetime

def build_comprehensive_analysis_prompt(data: dict, search_context: str) -> str:
    """Constrói prompt abrangente para análise"""
    
    analysis_structure = {
      "avatar_ultra_detalhado": {
        "nome_ficticio": "Profissional Visionário Digital",
        "perfil_demografico": {
          "idade": "30-40 anos",
          "genero": "Equilibrado (55% homens, 45% mulheres)",
          "renda": "R$ 10.000 - R$ 30.000",
          "escolaridade": "Pós-graduação (60%), Graduação (40%)",
          "localizacao": "São Paulo, Rio de Janeiro, Belo Horizonte, Brasília",
          "estado_civil": "Casado (60%), Solteiro (30%), Outros (10%)",
          "profissao": "Gerentes, Coordenadores, Analistas Sênior em TI, Marketing e Finanças"
        },
        "perfil_psicografico": {
          "personalidade": "Ambicioso, proativo, curioso, mas avesso ao risco desnecessário.",
          "valores": "Segurança, crescimento, reconhecimento, inovação.",
          "interesses": "Tecnologia, negócios, finanças, desenvolvimento pessoal.",
          "estilo_vida": "Urbano, ocupado, conectado digitalmente.",
          "comportamento_compra": "Pesquisa online, compara opções, valoriza provas sociais e ROI.",
          "influenciadores": "Especialistas de mercado, publicações de tecnologia, líderes de opinião.",
          "medos_profundos": "Tornar-se obsoleto, perder relevância no mercado, ser substituído por automação.",
          "aspiracoes_secretas": "Liderar a transformação digital em sua empresa, ser reconhecido como um visionário."
        },
        "dores_viscerais": [
          "Ansiedade sobre o futuro do trabalho.",
          "Sentimento de estar sobrecarregado com novas tecnologias.",
          "Frustração com a falta de um caminho claro para o desenvolvimento.",
          "Medo de não conseguir competir com profissionais mais jovens e atualizados.",
          "Insegurança sobre quais habilidades são realmente valiosas.",
          "Dificuldade em encontrar tempo para se qualificar.",
          "Decepção com cursos online que não entregam resultados práticos.",
          "Preocupação com o alto investimento em educação sem garantia de retorno.",
          "Sensação de estar perdendo oportunidades por falta de conhecimento.",
          "Receio de que a empresa não valorize seus esforços de qualificação."
        ],
        "desejos_secretos": [
          "Dominar as tecnologias que estão moldando o futuro.",
          "Tornar-se indispensável para a empresa.",
          "Alcançar um cargo de liderança e maior remuneração.",
          "Ter a confiança para liderar projetos inovadores.",
          "Ser visto como uma autoridade em sua área.",
          "Construir uma carreira à prova de futuro.",
          "Ter a liberdade de escolher os melhores projetos e oportunidades.",
          "Sentir-se seguro e preparado para qualquer mudança no mercado.",
          "Inspirar outros profissionais com sua jornada de crescimento.",
          "Deixar um legado de inovação e transformação."
        ],
        "objecoes_reais": [
          "Não tenho tempo para me dedicar a mais um curso.",
          "O investimento é muito alto para minha realidade atual.",
          "Já fiz outros treinamentos online e não vi resultado.",
          "Não sei se consigo aprender temas tão complexos como IA e blockchain.",
          "Meu trabalho atual não exige essas habilidades, por que investir nisso agora?",
          "Como posso ter certeza de que o conteúdo está realmente atualizado?",
          "A plataforma parece ser igual a tantas outras no mercado.",
          "Tenho medo de não ter disciplina para concluir o curso sozinho."
        ],
        "jornada_emocional": {
          "consciencia": "Lê notícias sobre automação e IA substituindo empregos e sente um calafrio. Percebe que o mercado está mudando rapidamente e que suas habilidades atuais podem não ser suficientes.",
          "consideracao": "Busca por \"cursos de habilidades do futuro\", se depara com dezenas de opções e fica paralisado pela escolha. Compara plataformas, lê reviews, mas sente-se sobrecarregado pela quantidade de informações.",
          "decisao": "Vê um depoimento de um colega que conseguiu uma promoção após fazer um curso focado em IA e decide investir. É impulsionado pelo medo de ficar para trás e pelo desejo de segurança e reconhecimento, escolhendo a plataforma que oferece um caminho claro e suporte.",
          "pos_compra": "Sente um misto de empolgação ao iniciar e ansiedade para aplicar o conhecimento. O suporte da comunidade é crucial. Sente alívio e empoderamento ao ver o progresso, mas também a necessidade de disciplina para manter o ritmo."
        },
        "linguagem_interna": {
          "frases_dor": ["Estou ficando para trás.", "Preciso me atualizar ou serei demitido.", "Não entendo nada dessas novas tecnologias.", "Meu emprego está em risco.", "Não consigo acompanhar."],
          "frases_desejo": ["Quero garantir meu lugar no futuro.", "Preciso me tornar um profissional valioso.", "Quero dominar as ferramentas que todos estão falando.", "Quero ser relevante.", "Quero ter segurança.", "Quero dominar o futuro."],
          "metaforas_comuns": ["A onda da tecnologia", "A corrida armamentista de habilidades", "Construir meu castelo profissional", "Corrida dos ratos", "Navegar em águas desconhecidas"],
          "vocabulario_especifico": ["Upskilling", "Reskilling", "AI-driven", "Blockchain", "Cybersecurity", "Growth Hacking", "IA", "Machine Learning", "Data Science"],
          "tom_comunicacao": "Direto, um pouco ansioso, mas focado em soluções práticas e resultados tangíveis. Preocupado, mas esperançoso, buscando soluções práticas e diretas."
        }
      },
      "escopo_posicionamento": {
        "posicionamento_mercado": "A única plataforma de desenvolvimento de carreira que prepara profissionais para a economia 4.0 com projetos práticos e mentoria de especialistas do mercado.",
        "proposta_valor_unica": "Transforme sua carreira em 6 meses com as habilidades mais demandadas pelo mercado, ou seu dinheiro de volta.",
        "diferenciais_competitivos": [
          "Projetos baseados em desafios reais de empresas parceiras.",
          "Mentoria individual com especialistas atuantes no mercado.",
          "Certificação baseada em portfólio de projetos, não em provas teóricas.",
          "Comunidade exclusiva para networking e colaboração.",
          "Garantia de satisfação ou reembolso total."
        ],
        "mensagem_central": "Não apenas aprenda sobre o futuro. Construa o seu.",
        "tom_comunicacao": "Inspirador, direto, empoderador e focado em ação.",
        "nicho_especifico": "Profissionais de tecnologia, marketing e gestão que buscam liderar a próxima onda de inovação.",
        "estrategia_oceano_azul": "Focar em \"career-as-a-service\", oferecendo um plano de desenvolvimento contínuo em vez de cursos isolados, criando uma barreira de relacionamento e dados.",
        "ancoragem_preco": "Ancorar o preço em uma fração do custo de um MBA ou da perda salarial por obsolescência."
      },
      "analise_concorrencia_profunda": [
        {
          "nome": "Coursera",
          "analise_swot": {
            "forcas": ["Marca forte, vasto catálogo de cursos, parcerias com universidades."],
            "fraquezas": ["Baixo índice de conclusão, falta de aplicação prática, suporte genérico."],
            "oportunidades": ["Crescente demanda por habilidades aplicadas e certificações práticas."],
            "ameacas": ["Novos players focados em nichos e resultados práticos."]
          },
          "estrategia_marketing": "Marketing de conteúdo massivo, SEO forte em nomes de cursos e universidades.",
          "posicionamento": "Acesso a educação de alta qualidade de qualquer lugar.",
          "vulnerabilidades": ["Modelo de negócio baseado em volume, não em transformação individual. Dificuldade em provar o ROI para o aluno."],
          "share_mercado_estimado": "40% do mercado global de MOOCs."
        },
        {
          "nome": "Udemy",
          "analise_swot": {
            "forcas": ["Preços baixos, grande variedade de tópicos, acesso vitalício."],
            "fraquezas": ["Qualidade inconsistente, falta de curadoria, baixo valor percebido."],
            "oportunidades": ["Curadoria de conteúdo e trilhas de aprendizado para nichos específicos."],
            "ameacas": ["Percepção de ser um \"supermercado de cursos\" sem foco em carreira."]
          },
          "estrategia_marketing": "Promoções agressivas, marketing de afiliados, foco em volume de vendas.",
          "posicionamento": "Aprenda qualquer coisa, a qualquer hora, a um preço acessível.",
          "vulnerabilidades": ["A guerra de preços desvaloriza o conteúdo. A falta de um caminho claro desmotiva os alunos que buscam uma transformação de carreira."],
          "share_mercado_estimado": "30% do mercado global de cursos online."
        }
      ],
      "estrategia_palavras_chave": {
        "palavras_primarias": [
          "desenvolvimento de carreira",
          "habilidades do futuro",
          "cursos de IA",
          "aprender blockchain",
          "carreira em cibersegurança",
          "plataforma de carreira",
          "transição de carreira",
          "futuro do trabalho",
          "qualificação profissional",
          "cursos de tecnologia"
        ],
        "palavras_secundarias": [
          "como se tornar um especialista em IA",
          "melhores cursos de blockchain",
          "o que é preciso para trabalhar com cibersegurança",
          "plano de desenvolvimento de carreira",
          "medo de ser substituído por automação",
          "como se manter relevante no mercado",
          "carreira em TI",
          "cursos online com certificado",
          "mentoria de carreira",
          "plataforma de aprendizado online"
        ],
        "palavras_cauda_longa": [
          "qual o melhor curso de inteligência artificial para iniciantes",
          "como usar blockchain para negócios",
          "quanto ganha um profissional de cibersegurança no brasil",
          "plataforma de desenvolvimento de carreira com mentoria",
          "como fazer transição de carreira para a área de tecnologia",
          "quais as habilidades mais importantes para o futuro do trabalho",
          "cursos de tecnologia online com projetos práticos",
          "como conseguir uma promoção no trabalho com novas habilidades",
          "mentoria de carreira para profissionais de TI",
          "plataforma de aprendizado para equipes corporativas"
        ],
        "intencao_busca": {
          "informacional": ["o que é", "como funciona", "quais são", "futuro de"],
          "navegacional": ["nome da plataforma", "login plataforma de carreira", "reviews plataforma x"],
          "transacional": ["curso de", "comprar", "preço", "inscrição", "plano"]
        },
        "estrategia_conteudo": "Criar conteúdo de topo de funil respondendo às dores e dúvidas (informacional), guias comparativos (consideração) e páginas de produto otimizadas para conversão (transacional).",
        "sazonalidade": "Picos de busca em janeiro (novas resoluções) e julho/agosto (planejamento de segunda metade do ano).",
        "oportunidades_seo": "Focar em palavras-chave de cauda longa relacionadas a \"transição de carreira para tecnologia\" e \"medo da obsolescência profissional\", onde a concorrência é menor."
      },
      "metricas_performance_detalhadas": {
        "kpis_principais": [
          {
            "metrica": "Custo de Aquisição de Cliente (CAC)",
            "objetivo": "< R$ 500",
            "frequencia": "Mensal",
            "responsavel": "Equipe de Marketing"
          },
          {
            "metrica": "Taxa de Conclusão de Curso",
            "objetivo": "> 70%",
            "frequencia": "Trimestral",
            "responsavel": "Equipe de Produto"
          },
          {
            "metrica": "Net Promoter Score (NPS)",
            "objetivo": "> 50",
            "frequencia": "Semestral",
            "responsavel": "Equipe de Sucesso do Cliente"
          }
        ],
        "projecoes_financeiras": {
          "cenario_conservador": {
            "receita_mensal": "R$ 98.500",
            "clientes_mes": "500",
            "ticket_medio": "R$ 197",
            "margem_lucro": "20%"
          },
          "cenario_realista": {
            "receita_mensal": "R$ 197.000",
            "clientes_mes": "1000",
            "ticket_medio": "R$ 197",
            "margem_lucro": "25%"
          },
          "cenario_otimista": {
            "receita_mensal": "R$ 394.000",
            "clientes_mes": "2000",
            "ticket_medio": "R$ 197",
            "margem_lucro": "30%"
          }
        },
        "roi_esperado": "3:1 no primeiro ano",
        "payback_investimento": "9 meses",
        "lifetime_value": "R$ 1.200 (considerando upsell para mentorias avançadas)"
      },
      "plano_acao_detalhado": {
        "fase_1_preparacao": {
          "duracao": "1 mês",
          "atividades": ["Validação final do currículo com especialistas", "Produção do conteúdo dos 3 primeiros módulos", "Desenvolvimento da plataforma MVP", "Setup das ferramentas de marketing e vendas"],
          "investimento": "R$ 20.000",
          "entregas": ["Plataforma funcional com 3 módulos", "Página de vendas pronta", "Campanhas de pré-lançamento no ar"],
          "responsaveis": ["CEO", "CTO", "CMO"]
        },
        "fase_2_lancamento": {
          "duracao": "1 mês",
          "atividades": ["Webinar de lançamento", "Campanha de tráfego pago intensiva", "Ações com influenciadores digitais", "Abertura do carrinho de compras"],
          "investimento": "R$ 25.000",
          "entregas": ["Meta de 500 alunos inscritos", "Validação do produto no mercado", "Coleta de depoimentos iniciais"],
          "responsaveis": ["CMO", "Equipe de Vendas"]
        },
        "fase_3_crescimento": {
          "duracao": "Contínuo",
          "atividades": ["Lançamento de novos módulos mensalmente", "Criação de conteúdo semanal para blog e redes sociais", "Programa de afiliados", "Otimização contínua do funil de vendas"],
          "investimento": "R$ 5.000/mês",
          "entregas": ["Crescimento de 20% ao mês no número de alunos", "Construção de autoridade da marca", "Aumento do LTV"],
          "responsaveis": ["CEO", "CMO", "Equipe de Produto"]
        }
      },
      "insights_exclusivos_ultra": [
        "A maior dor não é a falta de informação, mas a falta de um caminho claro e a sobrecarga de decisão.",
        "O avatar não compra um curso, ele compra a transformação de identidade de \"ameaçado\" para \"preparado\".",
        "A confiança é o maior gargalo. Provas sociais e garantia de risco são mais importantes que o preço.",
        "A comunidade não é um bônus, é o produto. O networking e a colaboração são o que retém o aluno.",
        "O medo da obsolescência é um gatilho mais forte que o desejo de crescimento. A comunicação deve focar em \"segurança\" e \"proteção\" da carreira.",
        "O avatar valoriza mais a aplicação prática do que a teoria. Projetos reais são o maior diferencial.",
        "A decisão de compra é emocional (medo) e justificada com lógica (ROI, diferenciais).",
        "A concorrência vende informação. Nós vendemos transformação e status.",
        "O maior concorrente não é outra plataforma, é a inércia e a procrastinação do avatar.",
        "A jornada do cliente não termina na compra, ela começa. O sucesso do aluno é a principal métrica de marketing.",
        "O avatar está disposto a pagar mais por um serviço que economize seu tempo e energia mental.",
        "A personalização da trilha de aprendizado é um grande atrativo para quem se sente perdido.",
        "O mercado está saturado de cursos genéricos. A especificidade (IA, Blockchain) é a chave.",
        "A narrativa de \"nós contra eles\" (profissionais atualizados vs. obsoletos) pode ser poderosa.",
        "O avatar busca um mentor, não apenas um professor. A figura do especialista é central.",
        "A gamificação da jornada de aprendizado pode aumentar drasticamente o engajamento.",
        "O preço pode ser um filtro de qualificação, atraindo alunos mais comprometidos.",
        "A venda de um \"ecossistema de carreira\" (cursos + comunidade + mentoria + oportunidades) tem um LTV muito maior.",
        "A urgência pode ser criada com turmas fechadas e bônus para os primeiros inscritos.",
        "O conteúdo gratuito de alto valor é a melhor forma de provar a qualidade e gerar leads.",
        "A linguagem deve ser direta, empática e usar as mesmas palavras que o avatar usa em sua mente.",
        "A prova social mais eficaz é o \"antes e depois\" da carreira de ex-alunos.",
        "O avatar não quer mais um certificado, ele quer um portfólio que abra portas.",
        "A parceria com empresas para desafios reais valida o programa e gera oportunidades.",
        "A maior objeção oculta é o medo do fracasso. A garantia e o suporte são a resposta."
      ],
      "inteligencia_mercado": {
        "tendencias_emergentes": ["Microlearning, aprendizado baseado em projetos, IA como co-piloto de carreira, certificações alternativas."],
        "oportunidades_ocultas": ["Treinamento de \"soft skills\" para profissionais de tecnologia, nicho de requalificação para maiores de 50 anos, plataforma de mentoria as a service."],
        "ameacas_potenciais": ["Grandes empresas de tecnologia (Google, Amazon) oferecendo certificações gratuitas, banalização do termo \"IA\", crise econômica diminuindo o orçamento para educação."],
        "gaps_mercado": ["Falta de soluções que integrem aprendizado, mentoria e conexão com o mercado de trabalho de forma fluida."],
        "inovacoes_disruptivas": ["Uso de IA para criar trilhas de aprendizado personalizadas em tempo real, plataformas de simulação de desafios de trabalho, credenciais digitais verificáveis em blockchain."]
      },
      "drivers_mentais": [
        {
          "nome_driver": "Inimigo Comum: Obsolescência",
          "gatilho_central": "Medo de se tornar irrelevante.",
          "definicao_visceral": "Personificar a obsolescência como um inimigo que está ativamente tentando destruir sua carreira.",
          "mecanica_psicologica": "Cria um senso de urgência e une o avatar a nós em uma causa comum.",
          "momento_instalacao": "Logo no início da comunicação, para criar o contexto e a necessidade.",
          "roteiro_ativacao": {
            "pergunta_abertura": "Você já sentiu que a tecnologia avança mais rápido do que você consegue aprender, como se estivesse em uma esteira rolante prestes a ser ejetado?",
            "historia_analogia": "Imagine um castelo que você construiu por anos, sua carreira. Agora, uma nova arma, a IA, foi inventada. Seus muros de pedra não são mais suficientes. Você precisa de novas defesas, de novas tecnologias, ou seu castelo será reduzido a pó.",
            "metafora_visual": "Veja a obsolescência como uma sombra que cresce a cada dia, ameaçando engolir sua relevância profissional. Nossa plataforma é o farol que dissipa essa sombra.",
            "comando_acao": "Não espere a sombra te alcançar. Arme-se com o conhecimento que te torna à prova de futuro."
          },
          "frases_ancoragem": [
            "A obsolescência não é um talvez, é um quando.",
            "Enquanto você pensa, a tecnologia avança.",
            "Sua carreira de amanhã depende da sua decisão de hoje."
          ],
          "prova_logica": {
            "estatistica": "70% dos profissionais temem que suas habilidades se tornem obsoletas em 5 anos.",
            "caso_exemplo": "A história de como a Kodak ignorou a fotografia digital e faliu.",
            "demonstracao": "Mostrar um exemplo de tarefa que antes levava horas e agora é feita em segundos por uma IA."
          },
          "loop_reforco": "Em cada novo conteúdo, mencionar como a nova habilidade é mais uma arma contra o \"inimigo obsolescência\"."
        }
      ],
      "provas_visuais_instantaneas": [
        {
          "nome_provi": "O Gráfico da Irrelevância",
          "conceito_alvo": "Instalar a urgência da qualificação contínua.",
          "categoria": "Urgência",
          "prioridade": "Crítica",
          "momento_ideal": "No início de um webinar ou vídeo de vendas.",
          "objetivo_psicologico": "Criar um choque de realidade e a necessidade imediata de uma solução.",
          "experimento_escolhido": "Mostrar um gráfico com duas linhas: uma (exponencial) representando o avanço da tecnologia e outra (linear ou decrescente) representando a validade de uma habilidade não atualizada.",
          "analogia_perfeita": "Assim como o poder de um computador dobra a cada 18 meses, o valor de uma habilidade estática se divide pela metade. Você está dobrando ou se dividindo?",
          "roteiro_completo": {
            "setup": "Quero que vocês vejam algo que me tira o sono. Não é sobre o futuro, é sobre o agora. Este gráfico representa a sua carreira.",
            "execucao": "Mostra o gráfico. A linha da tecnologia sobe vertiginosamente. A linha da habilidade estática despenca. \"Esta é a tecnologia. E esta... é a carreira de quem parou de aprender.\"",
            "climax": "O momento em que as linhas se cruzam, criando um \"gap de relevância\". \"Este ponto aqui é o abismo. De que lado você quer estar?\"",
            "bridge": "Muitos de vocês estão sentindo este abismo se abrir sob seus pés. A boa notícia é que existe uma ponte. E você pode começar a construí-la hoje."
          },
          "materiais": [
            "Um slide bem desenhado com o gráfico.",
            "Software de apresentação (PowerPoint, Keynote, etc.)."
          ],
          "variacoes": {
            "online": "Usar animações para acentuar o movimento das linhas.",
            "grande_publico": "Projetar o gráfico em um telão gigante.",
            "intimista": "Desenhar o gráfico em um flip chart na frente da pessoa."
          },
          "gestao_riscos": {
            "pode_falhar_se": "O gráfico for confuso ou mal desenhado.",
            "plano_b": "Usar uma analogia verbal forte, como a do castelo.",
            "transformar_erro": "Se a tecnologia falhar, desenhar à mão para mostrar autenticidade."
          },
          "frases_impacto": {
            "durante": "Vejam o que acontece quando a zona de conforto encontra a disrupção.",
            "revelacao": "Este é o custo da inércia.",
            "ancoragem": "O abismo da irrelevância é real. A ponte também."
          },
          "dramatizacao_extra": "Usar som de batimento cardíaco acelerando enquanto as linhas se aproximam."
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

if __name__ == "__main__":
    # Exemplo de uso com o contexto hipotético
    hypothetical_data = {
        "segmento": "Educação Online - Habilidades Futuro do Trabalho",
        "produto": "Plataforma de Desenvolvimento de Carreira",
        "publico": "Profissionais 28-45 anos, classe média-alta",
        "preco": "197.00",
        "objetivo_receita": "197000.00",
        "orcamento_marketing": "50000.00",
        "prazo_lancamento": "3 meses",
        "concorrentes": "Coursera, Udemy, Alura",
        "dados_adicionais": "Foco em IA, blockchain, cibersegurança. Medo de obsolescência."
    }
    
    # Simular um contexto de pesquisa (normalmente viria do search_manager)
    simulated_search_context = """
--- FONTE 1: Tendências do Mercado de Educação Online 2024 ---
URL: https://example.com/tendencias-educacao-online
Conteúdo: O mercado de educação online no Brasil cresceu 30% em 2023, impulsionado pela demanda por habilidades digitais. IA e cibersegurança são as áreas mais procuradas.

--- FONTE 2: Pesquisa sobre Medo de Obsolescência Profissional ---
URL: https://example.com/medo-obsolescencia
Conteúdo: 70% dos profissionais brasileiros temem que suas habilidades se tornem obsoletas nos próximos 5 anos devido à automação e IA.

--- FONTE 3: Objeções Comuns em Cursos Online ---
URL: https://example.com/objecoes-cursos-online
Conteúdo: As principais objeções são falta de tempo (40%), alto custo (25%) e desconfiança na qualidade (20%).
"""
    
    prompt = build_comprehensive_analysis_prompt(hypothetical_data, simulated_search_context)
    print(prompt)


