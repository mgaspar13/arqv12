import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Loader2, BarChart3, Target, Users, TrendingUp } from 'lucide-react'
import './App.css'

// Import infographic images
import avatarInfographic from './assets/avatar_infographic.png'
import competitionAnalysis from './assets/competition_analysis.png'
import financialProjections from './assets/financial_projections.png'
import keywordsStrategy from './assets/keywords_strategy.png'
import actionPlan from './assets/action_plan.png'
import mentalDrivers from './assets/mental_drivers.png'
import marketIntelligence from './assets/market_intelligence.png'

function App() {
  const [formData, setFormData] = useState({
    segmento: '',
    produto: '',
    publico: '',
    preco: '',
    objetivo_receita: '',
    orcamento_marketing: '',
    prazo_lancamento: '',
    concorrentes: '',
    dados_adicionais: ''
  })
  
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      const data = await response.json()
      
      if (data.success) {
        setAnalysis(data.analysis)
      } else {
        setError(data.error || 'Erro na análise')
      }
    } catch (err) {
      setError('Erro de conexão: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  if (analysis) {
    return <AnalysisResults analysis={analysis} onBack={() => setAnalysis(null)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ARQV30 Enhanced
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Análise de Mercado Ultra-Detalhada
          </p>
          <p className="text-gray-500">
            Cada item será pesquisado, analisado e inserido no relatório final
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6" />
              Dados do Projeto
            </CardTitle>
            <CardDescription>
              Preencha os dados do seu produto/serviço para uma análise completa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="segmento">Segmento de Mercado *</Label>
                  <Input
                    id="segmento"
                    name="segmento"
                    value={formData.segmento}
                    onChange={handleInputChange}
                    placeholder="Ex: Educação Online - Habilidades Futuro do Trabalho"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="produto">Produto/Serviço *</Label>
                  <Input
                    id="produto"
                    name="produto"
                    value={formData.produto}
                    onChange={handleInputChange}
                    placeholder="Ex: Plataforma de Desenvolvimento de Carreira"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="publico">Público-Alvo *</Label>
                  <Input
                    id="publico"
                    name="publico"
                    value={formData.publico}
                    onChange={handleInputChange}
                    placeholder="Ex: Profissionais 28-45 anos, classe média-alta"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="preco">Preço (R$) *</Label>
                  <Input
                    id="preco"
                    name="preco"
                    type="number"
                    step="0.01"
                    value={formData.preco}
                    onChange={handleInputChange}
                    placeholder="197.00"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="objetivo_receita">Objetivo de Receita (R$)</Label>
                  <Input
                    id="objetivo_receita"
                    name="objetivo_receita"
                    type="number"
                    step="0.01"
                    value={formData.objetivo_receita}
                    onChange={handleInputChange}
                    placeholder="197000.00"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="orcamento_marketing">Orçamento Marketing (R$)</Label>
                  <Input
                    id="orcamento_marketing"
                    name="orcamento_marketing"
                    type="number"
                    step="0.01"
                    value={formData.orcamento_marketing}
                    onChange={handleInputChange}
                    placeholder="50000.00"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="prazo_lancamento">Prazo de Lançamento</Label>
                  <Input
                    id="prazo_lancamento"
                    name="prazo_lancamento"
                    value={formData.prazo_lancamento}
                    onChange={handleInputChange}
                    placeholder="3 meses"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="concorrentes">Principais Concorrentes</Label>
                  <Input
                    id="concorrentes"
                    name="concorrentes"
                    value={formData.concorrentes}
                    onChange={handleInputChange}
                    placeholder="Coursera, Udemy, Alura"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dados_adicionais">Dados Adicionais</Label>
                <Textarea
                  id="dados_adicionais"
                  name="dados_adicionais"
                  value={formData.dados_adicionais}
                  onChange={handleInputChange}
                  placeholder="Foco em IA, blockchain, cibersegurança. Medo de obsolescência."
                  rows={3}
                />
              </div>
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analisando...
                  </>
                ) : (
                  <>
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Gerar Análise Ultra-Detalhada
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function AnalysisResults({ analysis, onBack }) {
  const [activeSection, setActiveSection] = useState('avatar')

  const sections = [
    { id: 'avatar', title: 'Avatar Ultra-Detalhado', icon: Users },
    { id: 'posicionamento', title: 'Escopo Posicionamento', icon: Target },
    { id: 'concorrencia', title: 'Análise Concorrência', icon: TrendingUp },
    { id: 'palavras_chave', title: 'Estratégia Palavras-Chave', icon: BarChart3 },
    { id: 'metricas', title: 'Métricas Performance', icon: BarChart3 },
    { id: 'plano_acao', title: 'Plano de Ação', icon: Target },
    { id: 'insights', title: 'Insights Exclusivos', icon: TrendingUp },
    { id: 'inteligencia', title: 'Inteligência Mercado', icon: BarChart3 },
    { id: 'drivers', title: 'Drivers Mentais', icon: Users },
    { id: 'provas', title: 'Provas Visuais', icon: Target }
  ]

  const renderSection = () => {
    switch (activeSection) {
      case 'avatar':
        return <AvatarSection data={analysis.avatar_ultra_detalhado} />
      case 'posicionamento':
        return <PositionSection data={analysis.escopo_posicionamento} />
      case 'concorrencia':
        return <CompetitionSection data={analysis.analise_concorrencia_profunda} />
      case 'palavras_chave':
        return <KeywordsSection data={analysis.estrategia_palavras_chave} />
      case 'metricas':
        return <MetricsSection data={analysis.metricas_performance_detalhadas} />
      case 'plano_acao':
        return <ActionPlanSection data={analysis.plano_acao_detalhado} />
      case 'insights':
        return <InsightsSection data={analysis.insights_exclusivos_ultra} />
      case 'inteligencia':
        return <IntelligenceSection data={analysis.inteligencia_mercado} />
      case 'drivers':
        return <DriversSection data={analysis.drivers_mentais} />
      case 'provas':
        return <ProofsSection data={analysis.provas_visuais_instantaneas} />
      default:
        return <div>Seção não encontrada</div>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Button onClick={onBack} variant="outline">
            ← Voltar
          </Button>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Relatório de Análise Ultra-Detalhada
          </h1>
          <p className="text-gray-600">
            Dashboard completo com todos os itens analisados
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Seções</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {sections.map((section) => {
                    const Icon = section.icon
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                          activeSection === section.id ? 'bg-blue-50 border-r-2 border-blue-500 text-blue-700' : ''
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{section.title}</span>
                      </button>
                    )
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  )
}

function AvatarSection({ data }) {
  return (
    <div className="space-y-6">
      {/* Infographic */}
      <Card>
        <CardHeader>
          <CardTitle>Visualização do Avatar</CardTitle>
        </CardHeader>
        <CardContent>
          <img 
            src={avatarInfographic} 
            alt="Avatar Infographic" 
            className="w-full max-w-md mx-auto rounded-lg shadow-lg"
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Avatar Ultra-Detalhado: {data.nome_ficticio}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Perfil Demográfico</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Idade:</strong> {data.perfil_demografico.idade}</p>
                <p><strong>Gênero:</strong> {data.perfil_demografico.genero}</p>
                <p><strong>Renda:</strong> {data.perfil_demografico.renda}</p>
                <p><strong>Escolaridade:</strong> {data.perfil_demografico.escolaridade}</p>
                <p><strong>Localização:</strong> {data.perfil_demografico.localizacao}</p>
                <p><strong>Estado Civil:</strong> {data.perfil_demografico.estado_civil}</p>
                <p><strong>Profissão:</strong> {data.perfil_demografico.profissao}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Perfil Psicográfico</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Personalidade:</strong> {data.perfil_psicografico.personalidade}</p>
                <p><strong>Valores:</strong> {data.perfil_psicografico.valores}</p>
                <p><strong>Interesses:</strong> {data.perfil_psicografico.interesses}</p>
                <p><strong>Estilo de Vida:</strong> {data.perfil_psicografico.estilo_vida}</p>
                <p><strong>Comportamento de Compra:</strong> {data.perfil_psicografico.comportamento_compra}</p>
                <p><strong>Influenciadores:</strong> {data.perfil_psicografico.influenciadores}</p>
                <p><strong>Medos Profundos:</strong> {data.perfil_psicografico.medos_profundos}</p>
                <p><strong>Aspirações Secretas:</strong> {data.perfil_psicografico.aspiracoes_secretas}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Dores Viscerais</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {data.dores_viscerais.map((dor, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  {dor}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Desejos Secretos</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {data.desejos_secretos.map((desejo, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  {desejo}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Objeções Reais</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {data.objecoes_reais.map((objecao, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                {objecao}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Jornada Emocional</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-blue-600">Consciência</h4>
              <p className="text-sm mt-1">{data.jornada_emocional.consciencia}</p>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-600">Consideração</h4>
              <p className="text-sm mt-1">{data.jornada_emocional.consideracao}</p>
            </div>
            <div>
              <h4 className="font-semibold text-green-600">Decisão</h4>
              <p className="text-sm mt-1">{data.jornada_emocional.decisao}</p>
            </div>
            <div>
              <h4 className="font-semibold text-purple-600">Pós-Compra</h4>
              <p className="text-sm mt-1">{data.jornada_emocional.pos_compra}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Linguagem Interna</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Frases de Dor</h4>
              <ul className="space-y-1 text-sm">
                {data.linguagem_interna.frases_dor.map((frase, index) => (
                  <li key={index} className="text-red-600">"{frase}"</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Frases de Desejo</h4>
              <ul className="space-y-1 text-sm">
                {data.linguagem_interna.frases_desejo.map((frase, index) => (
                  <li key={index} className="text-green-600">"{frase}"</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Metáforas Comuns</h4>
              <ul className="space-y-1 text-sm">
                {data.linguagem_interna.metaforas_comuns.map((metafora, index) => (
                  <li key={index} className="text-blue-600">"{metafora}"</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Vocabulário Específico</h4>
              <ul className="space-y-1 text-sm">
                {data.linguagem_interna.vocabulario_especifico.map((palavra, index) => (
                  <li key={index} className="text-purple-600">{palavra}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Tom de Comunicação</h4>
            <p className="text-sm">{data.linguagem_interna.tom_comunicacao}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function PositionSection({ data }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Escopo de Posicionamento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-blue-600 mb-2">Posicionamento de Mercado</h3>
              <p className="text-sm">{data.posicionamento_mercado}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-green-600 mb-2">Proposta de Valor Única</h3>
              <p className="text-sm font-medium bg-green-50 p-3 rounded">{data.proposta_valor_unica}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-purple-600 mb-2">Mensagem Central</h3>
              <p className="text-lg font-medium text-center bg-purple-50 p-4 rounded italic">"{data.mensagem_central}"</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Tom de Comunicação</h3>
                <p className="text-sm">{data.tom_comunicacao}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Nicho Específico</h3>
                <p className="text-sm">{data.nicho_especifico}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-orange-600 mb-2">Estratégia Oceano Azul</h3>
              <p className="text-sm">{data.estrategia_oceano_azul}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-red-600 mb-2">Ancoragem de Preço</h3>
              <p className="text-sm">{data.ancoragem_preco}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Diferenciais Competitivos</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {data.diferenciais_competitivos.map((diferencial, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mt-0.5">
                  {index + 1}
                </span>
                <span className="text-sm">{diferencial}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

function CompetitionSection({ data }) {
  return (
    <div className="space-y-6">
      {/* Infographic */}
      <Card>
        <CardHeader>
          <CardTitle>Análise Visual da Concorrência</CardTitle>
        </CardHeader>
        <CardContent>
          <img 
            src={competitionAnalysis} 
            alt="Competition Analysis Infographic" 
            className="w-full rounded-lg shadow-lg"
          />
        </CardContent>
      </Card>
      
      {data.map((competitor, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{competitor.nome}</CardTitle>
            <CardDescription>
              Share de Mercado: {competitor.share_mercado_estimado}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Posicionamento</h3>
                <p className="text-sm">{competitor.posicionamento}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Estratégia de Marketing</h3>
                <p className="text-sm">{competitor.estrategia_marketing}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-green-600 mb-2">Forças</h4>
                  <ul className="space-y-1 text-sm">
                    {competitor.analise_swot.forcas.map((forca, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">+</span>
                        {forca}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-red-600 mb-2">Fraquezas</h4>
                  <ul className="space-y-1 text-sm">
                    {competitor.analise_swot.fraquezas.map((fraqueza, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">-</span>
                        {fraqueza}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-blue-600 mb-2">Oportunidades</h4>
                  <ul className="space-y-1 text-sm">
                    {competitor.analise_swot.oportunidades.map((oportunidade, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">○</span>
                        {oportunidade}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-orange-600 mb-2">Ameaças</h4>
                  <ul className="space-y-1 text-sm">
                    {competitor.analise_swot.ameacas.map((ameaca, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">⚠</span>
                        {ameaca}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-purple-600 mb-2">Vulnerabilidades</h4>
                <ul className="space-y-1 text-sm">
                  {competitor.vulnerabilidades.map((vulnerabilidade, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">●</span>
                      {vulnerabilidade}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function KeywordsSection({ data }) {
  return (
    <div className="space-y-6">
      {/* Infographic */}
      <Card>
        <CardHeader>
          <CardTitle>Visualização da Estratégia de Palavras-Chave</CardTitle>
        </CardHeader>
        <CardContent>
          <img 
            src={keywordsStrategy} 
            alt="Keywords Strategy Infographic" 
            className="w-full max-w-lg mx-auto rounded-lg shadow-lg"
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Estratégia de Palavras-Chave</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-blue-600 mb-3">Palavras Primárias</h3>
              <div className="flex flex-wrap gap-2">
                {data.palavras_primarias.map((palavra, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {palavra}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-green-600 mb-3">Palavras Secundárias</h3>
              <div className="flex flex-wrap gap-2">
                {data.palavras_secundarias.map((palavra, index) => (
                  <span key={index} className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                    {palavra}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-purple-600 mb-3">Palavras de Cauda Longa</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {data.palavras_cauda_longa.map((palavra, index) => (
                  <div key={index} className="bg-purple-50 text-purple-800 text-sm px-3 py-2 rounded border">
                    {palavra}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold text-orange-600 mb-2">Intenção Informacional</h4>
                <ul className="space-y-1 text-sm">
                  {data.intencao_busca.informacional.map((palavra, idx) => (
                    <li key={idx} className="text-orange-700">{palavra}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-red-600 mb-2">Intenção Navegacional</h4>
                <ul className="space-y-1 text-sm">
                  {data.intencao_busca.navegacional.map((palavra, idx) => (
                    <li key={idx} className="text-red-700">{palavra}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-green-600 mb-2">Intenção Transacional</h4>
                <ul className="space-y-1 text-sm">
                  {data.intencao_busca.transacional.map((palavra, idx) => (
                    <li key={idx} className="text-green-700">{palavra}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Estratégia de Conteúdo</h3>
              <p className="text-sm bg-gray-50 p-3 rounded">{data.estrategia_conteudo}</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Sazonalidade</h3>
              <p className="text-sm bg-yellow-50 p-3 rounded">{data.sazonalidade}</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Oportunidades SEO</h3>
              <p className="text-sm bg-green-50 p-3 rounded">{data.oportunidades_seo}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function MetricsSection({ data }) {
  return (
    <div className="space-y-6">
      {/* Infographic */}
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Financeiro</CardTitle>
        </CardHeader>
        <CardContent>
          <img 
            src={financialProjections} 
            alt="Financial Projections Dashboard" 
            className="w-full rounded-lg shadow-lg"
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>KPIs Principais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.kpis_principais.map((kpi, index) => (
              <div key={index} className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">{kpi.metrica}</h3>
                <p className="text-2xl font-bold text-blue-600 mb-1">{kpi.objetivo}</p>
                <p className="text-sm text-blue-700">Frequência: {kpi.frequencia}</p>
                <p className="text-sm text-blue-700">Responsável: {kpi.responsavel}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Projeções Financeiras</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-3">Cenário Conservador</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Receita Mensal:</strong> {data.projecoes_financeiras.cenario_conservador.receita_mensal}</p>
                <p><strong>Clientes/Mês:</strong> {data.projecoes_financeiras.cenario_conservador.clientes_mes}</p>
                <p><strong>Ticket Médio:</strong> {data.projecoes_financeiras.cenario_conservador.ticket_medio}</p>
                <p><strong>Margem Lucro:</strong> {data.projecoes_financeiras.cenario_conservador.margem_lucro}</p>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-3">Cenário Realista</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Receita Mensal:</strong> {data.projecoes_financeiras.cenario_realista.receita_mensal}</p>
                <p><strong>Clientes/Mês:</strong> {data.projecoes_financeiras.cenario_realista.clientes_mes}</p>
                <p><strong>Ticket Médio:</strong> {data.projecoes_financeiras.cenario_realista.ticket_medio}</p>
                <p><strong>Margem Lucro:</strong> {data.projecoes_financeiras.cenario_realista.margem_lucro}</p>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-3">Cenário Otimista</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Receita Mensal:</strong> {data.projecoes_financeiras.cenario_otimista.receita_mensal}</p>
                <p><strong>Clientes/Mês:</strong> {data.projecoes_financeiras.cenario_otimista.clientes_mes}</p>
                <p><strong>Ticket Médio:</strong> {data.projecoes_financeiras.cenario_otimista.ticket_medio}</p>
                <p><strong>Margem Lucro:</strong> {data.projecoes_financeiras.cenario_otimista.margem_lucro}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <h3 className="font-semibold text-purple-800 mb-2">ROI Esperado</h3>
              <p className="text-2xl font-bold text-purple-600">{data.roi_esperado}</p>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg text-center">
              <h3 className="font-semibold text-indigo-800 mb-2">Payback</h3>
              <p className="text-2xl font-bold text-indigo-600">{data.payback_investimento}</p>
            </div>
            
            <div className="bg-teal-50 p-4 rounded-lg text-center">
              <h3 className="font-semibold text-teal-800 mb-2">LTV</h3>
              <p className="text-2xl font-bold text-teal-600">{data.lifetime_value}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ActionPlanSection({ data }) {
  const phases = [
    { key: 'fase_1_preparacao', title: 'Fase 1: Preparação', color: 'blue' },
    { key: 'fase_2_lancamento', title: 'Fase 2: Lançamento', color: 'green' },
    { key: 'fase_3_crescimento', title: 'Fase 3: Crescimento', color: 'purple' }
  ]

  return (
    <div className="space-y-6">
      {/* Infographic */}
      <Card>
        <CardHeader>
          <CardTitle>Roadmap do Plano de Ação</CardTitle>
        </CardHeader>
        <CardContent>
          <img 
            src={actionPlan} 
            alt="Action Plan Roadmap" 
            className="w-full rounded-lg shadow-lg"
          />
        </CardContent>
      </Card>
      
      {phases.map((phase, index) => {
        const phaseData = data[phase.key]
        return (
          <Card key={index}>
            <CardHeader>
              <CardTitle className={`text-${phase.color}-600`}>{phase.title}</CardTitle>
              <CardDescription>
                Duração: {phaseData.duracao} | Investimento: {phaseData.investimento}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Atividades</h3>
                  <ul className="space-y-2 text-sm">
                    {phaseData.atividades.map((atividade, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className={`text-${phase.color}-500 mt-1`}>•</span>
                        {atividade}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Entregas</h3>
                  <ul className="space-y-2 text-sm">
                    {phaseData.entregas.map((entrega, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className={`text-${phase.color}-500 mt-1`}>✓</span>
                        {entrega}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Responsáveis</h3>
                <div className="flex flex-wrap gap-2">
                  {phaseData.responsaveis.map((responsavel, idx) => (
                    <span key={idx} className={`bg-${phase.color}-100 text-${phase.color}-800 text-sm font-medium px-3 py-1 rounded-full`}>
                      {responsavel}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

function InsightsSection({ data }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Insights Exclusivos Ultra-Valiosos</CardTitle>
          <CardDescription>
            {data.length} insights únicos baseados na análise profunda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            {data.map((insight, index) => (
              <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-start gap-3">
                  <span className="bg-blue-500 text-white text-sm font-bold px-2 py-1 rounded-full min-w-[2rem] text-center">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-relaxed">{insight}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function IntelligenceSection({ data }) {
  return (
    <div className="space-y-6">
      {/* Infographic */}
      <Card>
        <CardHeader>
          <CardTitle>Dashboard de Inteligência de Mercado</CardTitle>
        </CardHeader>
        <CardContent>
          <img 
            src={marketIntelligence} 
            alt="Market Intelligence Dashboard" 
            className="w-full max-w-lg mx-auto rounded-lg shadow-lg"
          />
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">Tendências Emergentes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {data.tendencias_emergentes.map((tendencia, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">↗</span>
                  {tendencia}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600">Oportunidades Ocultas</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {data.oportunidades_ocultas.map((oportunidade, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">💡</span>
                  {oportunidade}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Ameaças Potenciais</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {data.ameacas_potenciais.map((ameaca, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">⚠</span>
                  {ameaca}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-purple-600">Gaps de Mercado</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {data.gaps_mercado.map((gap, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">🔍</span>
                  {gap}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-orange-600">Inovações Disruptivas</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {data.inovacoes_disruptivas.map((inovacao, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full mt-0.5">
                  {index + 1}
                </span>
                <span className="text-sm">{inovacao}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

function DriversSection({ data }) {
  return (
    <div className="space-y-6">
      {/* Infographic */}
      <Card>
        <CardHeader>
          <CardTitle>Visualização dos Drivers Mentais</CardTitle>
        </CardHeader>
        <CardContent>
          <img 
            src={mentalDrivers} 
            alt="Mental Drivers Visualization" 
            className="w-full max-w-md mx-auto rounded-lg shadow-lg"
          />
        </CardContent>
      </Card>
      
      {data.map((driver, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-purple-600">{driver.nome_driver}</CardTitle>
            <CardDescription>{driver.definicao_visceral}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Gatilho Central</h3>
                  <p className="text-sm bg-purple-50 p-3 rounded">{driver.gatilho_central}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Mecânica Psicológica</h3>
                  <p className="text-sm bg-blue-50 p-3 rounded">{driver.mecanica_psicologica}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Momento de Instalação</h3>
                <p className="text-sm bg-yellow-50 p-3 rounded">{driver.momento_instalacao}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Roteiro de Ativação</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-red-600">Pergunta de Abertura</h4>
                    <p className="text-sm italic">"{driver.roteiro_ativacao.pergunta_abertura}"</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-600">História/Analogia</h4>
                    <p className="text-sm">{driver.roteiro_ativacao.historia_analogia}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-green-600">Metáfora Visual</h4>
                    <p className="text-sm">{driver.roteiro_ativacao.metafora_visual}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-600">Comando de Ação</h4>
                    <p className="text-sm font-medium">"{driver.roteiro_ativacao.comando_acao}"</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Frases de Ancoragem</h3>
                <div className="space-y-1">
                  {driver.frases_ancoragem.map((frase, idx) => (
                    <p key={idx} className="text-sm bg-gray-50 p-2 rounded italic">"{frase}"</p>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Prova Lógica</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <h4 className="font-medium text-sm">Estatística</h4>
                    <p className="text-sm">{driver.prova_logica.estatistica}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Caso Exemplo</h4>
                    <p className="text-sm">{driver.prova_logica.caso_exemplo}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Demonstração</h4>
                    <p className="text-sm">{driver.prova_logica.demonstracao}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Loop de Reforço</h3>
                <p className="text-sm bg-green-50 p-3 rounded">{driver.loop_reforco}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function ProofsSection({ data }) {
  return (
    <div className="space-y-6">
      {data.map((prova, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-orange-600">{prova.nome_provi}</CardTitle>
            <CardDescription>
              {prova.categoria} | Prioridade: {prova.prioridade}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Conceito Alvo</h3>
                  <p className="text-sm bg-orange-50 p-3 rounded">{prova.conceito_alvo}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Objetivo Psicológico</h3>
                  <p className="text-sm bg-blue-50 p-3 rounded">{prova.objetivo_psicologico}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Momento Ideal</h3>
                <p className="text-sm bg-yellow-50 p-3 rounded">{prova.momento_ideal}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Experimento Escolhido</h3>
                <p className="text-sm">{prova.experimento_escolhido}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Analogia Perfeita</h3>
                <p className="text-sm italic bg-purple-50 p-3 rounded">"{prova.analogia_perfeita}"</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Roteiro Completo</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-blue-600">Setup</h4>
                    <p className="text-sm">{prova.roteiro_completo.setup}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-green-600">Execução</h4>
                    <p className="text-sm">{prova.roteiro_completo.execucao}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-red-600">Clímax</h4>
                    <p className="text-sm">{prova.roteiro_completo.climax}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-600">Bridge</h4>
                    <p className="text-sm">{prova.roteiro_completo.bridge}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Materiais</h3>
                <ul className="space-y-1 text-sm">
                  {prova.materiais.map((material, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      {material}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Variações</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <h4 className="font-medium text-sm">Online</h4>
                    <p className="text-sm">{prova.variacoes.online}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Grande Público</h4>
                    <p className="text-sm">{prova.variacoes.grande_publico}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Intimista</h4>
                    <p className="text-sm">{prova.variacoes.intimista}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Gestão de Riscos</h3>
                <div className="space-y-2">
                  <div>
                    <h4 className="font-medium text-red-600 text-sm">Pode Falhar Se</h4>
                    <p className="text-sm">{prova.gestao_riscos.pode_falhar_se}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-600 text-sm">Plano B</h4>
                    <p className="text-sm">{prova.gestao_riscos.plano_b}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-green-600 text-sm">Transformar Erro</h4>
                    <p className="text-sm">{prova.gestao_riscos.transformar_erro}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Frases de Impacto</h3>
                <div className="space-y-1">
                  <p className="text-sm bg-gray-50 p-2 rounded"><strong>Durante:</strong> "{prova.frases_impacto.durante}"</p>
                  <p className="text-sm bg-gray-50 p-2 rounded"><strong>Revelação:</strong> "{prova.frases_impacto.revelacao}"</p>
                  <p className="text-sm bg-gray-50 p-2 rounded"><strong>Ancoragem:</strong> "{prova.frases_impacto.ancoragem}"</p>
                </div>
              </div>
              
              {prova.dramatizacao_extra && (
                <div>
                  <h3 className="font-semibold mb-2">Dramatização Extra</h3>
                  <p className="text-sm bg-purple-50 p-3 rounded">{prova.dramatizacao_extra}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default App

