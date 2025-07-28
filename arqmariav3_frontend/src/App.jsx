import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  Target, 
  Users, 
  TrendingUp, 
  Brain, 
  Search,
  CheckCircle,
  AlertCircle,
  Loader2,
  DollarSign,
  Calendar,
  Eye
} from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api';

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
  });

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiStatus, setApiStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const testAPIs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/test-apis`);
      const data = await response.json();
      setApiStatus(data);
    } catch (err) {
      setError('Erro ao testar APIs: ' + err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setAnalysis(null);

    try {
      const response = await fetch(`${API_BASE_URL}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setAnalysis(data.analysis);
      } else {
        setError(data.error || 'Erro desconhecido');
      }
    } catch (err) {
      setError('Erro ao conectar com o backend: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderAnalysisSection = (title, data, icon) => {
    if (!data) return null;

    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {icon}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-lg overflow-auto max-h-96">
            {typeof data === 'object' ? JSON.stringify(data, null, 2) : data}
          </pre>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            ARQV30 Enhanced
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Análise de Mercado Ultra-Detalhada com IA
          </p>
          <div className="flex justify-center gap-4">
            <Badge variant="outline" className="text-sm">
              <Brain className="w-4 h-4 mr-1" />
              IA Avançada
            </Badge>
            <Badge variant="outline" className="text-sm">
              <Search className="w-4 h-4 mr-1" />
              Pesquisa Real
            </Badge>
            <Badge variant="outline" className="text-sm">
              <BarChart3 className="w-4 h-4 mr-1" />
              Análise Profunda
            </Badge>
          </div>
        </div>

        {/* API Status */}
        <div className="mb-6">
          <Button onClick={testAPIs} variant="outline" className="mb-4">
            <CheckCircle className="w-4 h-4 mr-2" />
            Testar APIs
          </Button>
          
          {apiStatus && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Status das APIs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(apiStatus.apis_configured || {}).map(([api, status]) => (
                    <div key={api} className="flex items-center gap-2">
                      {status ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span className="capitalize">{api.replace('_', ' ')}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Badge variant={apiStatus.total_configured > 3 ? "default" : "destructive"}>
                    {apiStatus.total_configured}/6 APIs Configuradas
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Tabs defaultValue="form" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="form">Formulário de Análise</TabsTrigger>
            <TabsTrigger value="results">Resultados</TabsTrigger>
          </TabsList>

          <TabsContent value="form">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Dados do Projeto
                </CardTitle>
                <CardDescription>
                  Preencha as informações do seu projeto para gerar uma análise completa
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
                        placeholder="Ex: Educação Online, E-commerce, SaaS"
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
                        placeholder="Ex: Plataforma de Cursos Online"
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
                        placeholder="Ex: Profissionais 25-45 anos, classe média"
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
                      <Label htmlFor="objetivo_receita">Objetivo de Receita Mensal (R$)</Label>
                      <Input
                        id="objetivo_receita"
                        name="objetivo_receita"
                        type="number"
                        value={formData.objetivo_receita}
                        onChange={handleInputChange}
                        placeholder="50000"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="orcamento_marketing">Orçamento Marketing (R$)</Label>
                      <Input
                        id="orcamento_marketing"
                        name="orcamento_marketing"
                        type="number"
                        value={formData.orcamento_marketing}
                        onChange={handleInputChange}
                        placeholder="10000"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="prazo_lancamento">Prazo para Lançamento</Label>
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
                        placeholder="Coursera, Udemy, Hotmart"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dados_adicionais">Informações Adicionais</Label>
                    <Textarea
                      id="dados_adicionais"
                      name="dados_adicionais"
                      value={formData.dados_adicionais}
                      onChange={handleInputChange}
                      placeholder="Qualquer informação adicional relevante sobre o projeto..."
                      rows={4}
                    />
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={loading}
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Gerando Análise...
                      </>
                    ) : (
                      <>
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Gerar Análise Completa
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results">
            {loading && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto" />
                    <h3 className="text-lg font-semibold">Gerando Análise...</h3>
                    <p className="text-gray-600">
                      Realizando pesquisa de mercado e análise com IA. Isso pode levar alguns minutos.
                    </p>
                    <Progress value={33} className="w-full" />
                  </div>
                </CardContent>
              </Card>
            )}

            {analysis && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      Análise Concluída
                    </CardTitle>
                    <CardDescription>
                      Análise gerada em {new Date().toLocaleString('pt-BR')}
                    </CardDescription>
                  </CardHeader>
                </Card>

                {/* Avatar Ultra Detalhado */}
                {renderAnalysisSection(
                  "Avatar Ultra Detalhado",
                  analysis.avatar_ultra_detalhado,
                  <Users className="w-5 h-5" />
                )}

                {/* Posicionamento */}
                {renderAnalysisSection(
                  "Escopo de Posicionamento",
                  analysis.escopo_posicionamento,
                  <Target className="w-5 h-5" />
                )}

                {/* Análise de Concorrência */}
                {renderAnalysisSection(
                  "Análise de Concorrência",
                  analysis.analise_concorrencia_profunda,
                  <TrendingUp className="w-5 h-5" />
                )}

                {/* Estratégia de Palavras-chave */}
                {renderAnalysisSection(
                  "Estratégia de Palavras-chave",
                  analysis.estrategia_palavras_chave,
                  <Search className="w-5 h-5" />
                )}

                {/* Métricas de Performance */}
                {renderAnalysisSection(
                  "Métricas de Performance",
                  analysis.metricas_performance_detalhadas,
                  <BarChart3 className="w-5 h-5" />
                )}

                {/* Plano de Ação */}
                {renderAnalysisSection(
                  "Plano de Ação Detalhado",
                  analysis.plano_acao_detalhado,
                  <Calendar className="w-5 h-5" />
                )}

                {/* Insights Exclusivos */}
                {renderAnalysisSection(
                  "Insights Exclusivos",
                  analysis.insights_exclusivos_ultra,
                  <Brain className="w-5 h-5" />
                )}

                {/* Inteligência de Mercado */}
                {renderAnalysisSection(
                  "Inteligência de Mercado",
                  analysis.inteligencia_mercado,
                  <Eye className="w-5 h-5" />
                )}

                {/* Drivers Mentais */}
                {renderAnalysisSection(
                  "Drivers Mentais",
                  analysis.drivers_mentais,
                  <Brain className="w-5 h-5" />
                )}

                {/* Provas Visuais */}
                {renderAnalysisSection(
                  "Provas Visuais Instantâneas",
                  analysis.provas_visuais_instantaneas,
                  <Eye className="w-5 h-5" />
                )}

                {/* Análise Raw (se disponível) */}
                {analysis.raw_analysis && renderAnalysisSection(
                  "Análise Completa (Texto)",
                  analysis.raw_analysis,
                  <BarChart3 className="w-5 h-5" />
                )}
              </div>
            )}

            {!analysis && !loading && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <BarChart3 className="w-12 h-12 text-gray-400 mx-auto" />
                    <h3 className="text-lg font-semibold text-gray-600">
                      Nenhuma análise disponível
                    </h3>
                    <p className="text-gray-500">
                      Preencha o formulário e gere uma análise para ver os resultados aqui.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default App;