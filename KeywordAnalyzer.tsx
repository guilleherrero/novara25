import React, { useState } from 'react';
import { Search, TrendingUp, Target, Globe, ShoppingCart, Zap, Lightbulb, ArrowRight, Plus } from 'lucide-react';
import { KeywordData } from '../types';

export const KeywordAnalyzer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [keywords, setKeywords] = useState<KeywordData[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState<KeywordData | null>(null);

  // Generate realistic keyword data based on user input
  const generateKeywordData = (baseKeyword: string): KeywordData[] => {
    const variations = [
      baseKeyword,
      `${baseKeyword} barato`,
      `${baseKeyword} precio`,
      `${baseKeyword} oferta`,
      `${baseKeyword} original`,
      `${baseKeyword} mercadolibre`,
      `${baseKeyword} argentina`,
      `${baseKeyword} envío gratis`
    ];

    return variations.map((keyword, index) => {
      const baseVolume = 15000 - (index * 1500);
      const searchVolume = Math.floor(baseVolume * (0.5 + Math.random() * 0.8));
      const difficulty = Math.floor(30 + (index * 8) + (Math.random() * 20));
      const cpc = parseFloat((1.5 + (index * 0.3) + (Math.random() * 1.5)).toFixed(2));
      
      let competition: 'low' | 'medium' | 'high';
      if (difficulty < 40) competition = 'low';
      else if (difficulty < 70) competition = 'medium';
      else competition = 'high';

      return {
        keyword,
        searchVolume,
        difficulty,
        cpc,
        competition,
        trend: Array.from({length: 7}, () => 60 + Math.floor(Math.random() * 60)),
        relatedKeywords: [
          `${baseKeyword} profesional`,
          `${baseKeyword} calidad`,
          `${baseKeyword} premium`,
          `${baseKeyword} nuevo`
        ],
        googleShoppingResults: Math.floor(searchVolume * (1.5 + Math.random() * 2)),
        mercadolibreResults: Math.floor(searchVolume * (0.8 + Math.random() * 1.2))
      };
    });
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setSelectedKeyword(null);
    
    // Simulate API call delay
    setTimeout(() => {
      const generatedKeywords = generateKeywordData(searchQuery.toLowerCase().trim());
      setKeywords(generatedKeywords);
      setLoading(false);
    }, 1500);
  };

  const handleClearAll = () => {
    setKeywords([]);
    setSelectedKeyword(null);
    setSearchQuery('');
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 30) return 'text-green-500';
    if (difficulty < 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty < 30) return 'Fácil';
    if (difficulty < 70) return 'Moderado';
    return 'Difícil';
  };

  const getCompetitionColor = (competition: string) => {
    switch (competition) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getOpportunityScore = (keyword: KeywordData) => {
    const volumeScore = Math.min(100, (keyword.searchVolume / 1000) * 10);
    const difficultyPenalty = keyword.difficulty;
    return Math.max(0, Math.floor(volumeScore - difficultyPenalty + 50));
  };

  const getOpportunityColor = (score: number) => {
    if (score >= 70) return 'text-green-500';
    if (score >= 40) return 'text-yellow-500';
    return 'text-red-500';
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Search className="w-5 h-5 mr-2" />
          Análisis de Keywords Personalizado
        </h2>
        <p className="text-gray-400 mb-4">
          Ingresa tu keyword específica para generar análisis detallado y variaciones relevantes
        </p>
        
        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Ingresa tu keyword específica (ej: auriculares bluetooth sony)"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button
            onClick={handleClearAll}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-medium transition-colors"
          >
            Limpiar
          </button>
          <button
            onClick={handleSearch}
            disabled={loading || !searchQuery.trim()}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Analizando...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Analizar Keyword</span>
              </>
            )}
          </button>
        </div>

        <div className="bg-blue-900 bg-opacity-30 rounded-lg p-4 border border-blue-500">
          <div className="flex items-center space-x-2 mb-2">
            <Lightbulb className="w-5 h-5 text-blue-400" />
            <span className="text-blue-300 font-medium">Cómo usar esta herramienta:</span>
          </div>
          <ul className="text-blue-200 text-sm space-y-1">
            <li>• Ingresa la keyword exacta de tu producto</li>
            <li>• El sistema generará variaciones y análisis de competencia</li>
            <li>• Usa los datos para optimizar tus títulos y descripciones</li>
            <li>• Combina con la herramienta de comparación para mejores resultados</li>
          </ul>
        </div>
      </div>

      {/* Search Results Info */}
      {keywords.length > 0 && (
        <div className="bg-green-900 bg-opacity-30 rounded-lg p-4 border border-green-500">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-green-400" />
            <span className="text-green-300 font-medium">
              Análisis completado para "{searchQuery}" - {keywords.length} variaciones generadas
            </span>
          </div>
          <p className="text-green-200 text-sm mt-1">
            Datos optimizados para el mercado argentino y MercadoLibre
          </p>
        </div>
      )}

      {/* Keywords Results */}
      {keywords.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">Análisis de Keywords para tu Producto</h3>
          <div className="grid gap-4">
            {keywords.map((keyword, index) => {
              const opportunityScore = getOpportunityScore(keyword);
              return (
                <div
                  key={index}
                  className={`bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors cursor-pointer ${
                    index === 0 ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedKeyword(keyword)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-lg">{keyword.keyword}</h4>
                        {index === 0 && (
                          <span className="px-2 py-1 bg-blue-600 text-xs rounded font-medium">
                            KEYWORD PRINCIPAL
                          </span>
                        )}
                        {opportunityScore >= 70 && (
                          <span className="px-2 py-1 bg-green-600 text-xs rounded font-medium">
                            ALTA OPORTUNIDAD
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                        <span className="flex items-center">
                          <Globe className="w-4 h-4 mr-1" />
                          {formatNumber(keyword.searchVolume)} búsquedas/mes
                        </span>
                        <span className={`flex items-center ${getDifficultyColor(keyword.difficulty)}`}>
                          <Target className="w-4 h-4 mr-1" />
                          {getDifficultyLabel(keyword.difficulty)} ({keyword.difficulty}%)
                        </span>
                        <span className="flex items-center">
                          <Zap className="w-4 h-4 mr-1" />
                          CPC: ${keyword.cpc}
                        </span>
                        <span className="flex items-center">
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          ML: {formatNumber(keyword.mercadolibreResults || 0)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="text-center">
                        <div className={`text-lg font-bold ${getOpportunityColor(opportunityScore)}`}>
                          {opportunityScore}%
                        </div>
                        <div className="text-xs text-gray-400">Oportunidad</div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getCompetitionColor(keyword.competition)}`}>
                        {keyword.competition.toUpperCase()}
                      </span>
                      <div className="flex items-center text-green-500">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        <span className="text-sm">Activa</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Keyword Details */}
      {selectedKeyword && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">Análisis Detallado: {selectedKeyword.keyword}</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Métricas de Rendimiento</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Volumen de Búsqueda:</span>
                  <span className="font-bold">{formatNumber(selectedKeyword.searchVolume)}/mes</span>
                </div>
                <div className="flex justify-between">
                  <span>Dificultad SEO:</span>
                  <span className={`font-bold ${getDifficultyColor(selectedKeyword.difficulty)}`}>
                    {getDifficultyLabel(selectedKeyword.difficulty)} ({selectedKeyword.difficulty}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>CPC Promedio:</span>
                  <span className="font-bold">${selectedKeyword.cpc}</span>
                </div>
                <div className="flex justify-between">
                  <span>Competencia:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getCompetitionColor(selectedKeyword.competition)}`}>
                    {selectedKeyword.competition.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Google Shopping:</span>
                  <span className="font-bold">{formatNumber(selectedKeyword.googleShoppingResults || 0)} resultados</span>
                </div>
                <div className="flex justify-between">
                  <span>MercadoLibre:</span>
                  <span className="font-bold">{formatNumber(selectedKeyword.mercadolibreResults || 0)} resultados</span>
                </div>
                <div className="flex justify-between">
                  <span>Puntuación Oportunidad:</span>
                  <span className={`font-bold ${getOpportunityColor(getOpportunityScore(selectedKeyword))}`}>
                    {getOpportunityScore(selectedKeyword)}%
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Keywords Relacionadas</h4>
              <div className="space-y-2 mb-4">
                {selectedKeyword.relatedKeywords.map((related, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 rounded px-3 py-2 text-sm flex items-center justify-between"
                  >
                    <span>{related}</span>
                    <button
                      onClick={() => {
                        setSearchQuery(related);
                        handleSearch();
                      }}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <h4 className="font-medium mb-3">Recomendaciones SEO</h4>
              <div className="space-y-2 text-sm">
                {getOpportunityScore(selectedKeyword) >= 70 && (
                  <div className="p-3 bg-green-900 bg-opacity-30 rounded border border-green-500">
                    <p className="text-green-300 font-medium">🎯 Excelente Oportunidad</p>
                    <p className="text-green-200">Esta keyword tiene alto potencial. Úsala en tu título principal.</p>
                  </div>
                )}
                
                {selectedKeyword.difficulty < 50 && (
                  <div className="p-3 bg-blue-900 bg-opacity-30 rounded border border-blue-500">
                    <p className="text-blue-300 font-medium">⚡ Fácil de Rankear</p>
                    <p className="text-blue-200">Baja competencia. Ideal para posicionamiento rápido.</p>
                  </div>
                )}
                
                {selectedKeyword.searchVolume > 5000 && (
                  <div className="p-3 bg-purple-900 bg-opacity-30 rounded border border-purple-500">
                    <p className="text-purple-300 font-medium">📈 Alto Volumen</p>
                    <p className="text-purple-200">Mucho tráfico potencial. Incluye en descripción detallada.</p>
                  </div>
                )}

                <div className="p-3 bg-yellow-900 bg-opacity-30 rounded border border-yellow-500">
                  <p className="text-yellow-300 font-medium">💡 Próximo Paso</p>
                  <p className="text-yellow-200">Usa esta keyword en la herramienta de "Comparación IA" para generar contenido optimizado.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};