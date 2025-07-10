import React, { useState, useEffect } from 'react';
import { Users, Star, TrendingUp, ExternalLink, Search, Filter } from 'lucide-react';
import { CompetitorData } from '../types';

export const CompetitorAnalysis: React.FC = () => {
  const [competitors, setCompetitors] = useState<CompetitorData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompetitor, setSelectedCompetitor] = useState<CompetitorData | null>(null);

  // Mock competitor data
  const mockCompetitors: CompetitorData[] = [
    {
      title: 'Auriculares Bluetooth Premium Sony WH-1000XM4 Cancelación Ruido',
      price: 299.99,
      description: 'Auriculares inalámbricos con cancelación de ruido líder en la industria. Calidad de sonido excepcional y 30 horas de batería.',
      keywords: ['auriculares', 'bluetooth', 'sony', 'cancelación ruido', 'inalámbricos'],
      ranking: 1,
      url: 'https://mercadolibre.com/example1',
      seller: 'TechStore Pro',
      reviews: 1250,
      rating: 4.8
    },
    {
      title: 'Headphones Bluetooth JBL Tune 510BT Sonido Potente Batería 40h',
      price: 89.99,
      description: 'Audífonos inalámbricos JBL con sonido JBL Pure Bass y hasta 40 horas de reproducción. Diseño plegable y cómodo.',
      keywords: ['headphones', 'jbl', 'bluetooth', 'batería', 'sonido'],
      ranking: 2,
      url: 'https://mercadolibre.com/example2',
      seller: 'AudioMax',
      reviews: 856,
      rating: 4.6
    },
    {
      title: 'Auriculares Gamer Bluetooth Razer Opus X Gaming Micrófono',
      price: 199.99,
      description: 'Auriculares gaming bluetooth con micrófono retráctil y tecnología THX. Perfecto para juegos y llamadas.',
      keywords: ['auriculares', 'gamer', 'razer', 'bluetooth', 'micrófono'],
      ranking: 3,
      url: 'https://mercadolibre.com/example3',
      seller: 'GamerZone',
      reviews: 642,
      rating: 4.7
    },
    {
      title: 'Airpods Pro Apple Originales Cancelación Ruido Estuche Carga',
      price: 249.99,
      description: 'AirPods Pro originales de Apple con cancelación activa de ruido y audio espacial. Incluye estuche de carga inalámbrica.',
      keywords: ['airpods', 'apple', 'pro', 'cancelación', 'originales'],
      ranking: 4,
      url: 'https://mercadolibre.com/example4',
      seller: 'Apple Store Oficial',
      reviews: 2150,
      rating: 4.9
    },
    {
      title: 'Auriculares Bluetooth Deportivos Bose SoundSport Resistentes',
      price: 129.99,
      description: 'Auriculares bluetooth deportivos resistentes al agua con tecnología Bose. Ideal para entrenamientos y actividades.',
      keywords: ['auriculares', 'deportivos', 'bose', 'resistentes', 'bluetooth'],
      ranking: 5,
      url: 'https://mercadolibre.com/example5',
      seller: 'SportTech',
      reviews: 445,
      rating: 4.5
    }
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCompetitors(mockCompetitors);
      setLoading(false);
    }, 1500);
  };

  const getRankingColor = (ranking: number) => {
    if (ranking <= 3) return 'text-green-500';
    if (ranking <= 7) return 'text-yellow-500';
    return 'text-red-500';
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Análisis de Competidores
        </h2>
        <div className="flex space-x-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Ingresa el producto para analizar competidores..."
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
            <span>Analizar</span>
          </button>
        </div>
      </div>

      {/* Competitors Results */}
      {competitors.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Top Competidores</h3>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filtrar</span>
            </button>
          </div>
          
          <div className="grid gap-4">
            {competitors.map((competitor, index) => (
              <div
                key={index}
                className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors cursor-pointer"
                onClick={() => setSelectedCompetitor(competitor)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`font-bold text-lg ${getRankingColor(competitor.ranking)}`}>
                        #{competitor.ranking}
                      </span>
                      <h4 className="font-medium text-lg line-clamp-2">{competitor.title}</h4>
                    </div>
                    
                    <div className="flex items-center space-x-4 mb-3 text-sm text-gray-400">
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        {competitor.rating} ({competitor.reviews} reviews)
                      </span>
                      <span>Por: {competitor.seller}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {competitor.keywords.slice(0, 3).map((keyword, kIndex) => (
                        <span key={kIndex} className="px-2 py-1 bg-blue-600 text-xs rounded">
                          {keyword}
                        </span>
                      ))}
                      {competitor.keywords.length > 3 && (
                        <span className="px-2 py-1 bg-gray-600 text-xs rounded">
                          +{competitor.keywords.length - 3} más
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-300 line-clamp-2">
                      {competitor.description}
                    </p>
                  </div>
                  
                  <div className="ml-4 text-right">
                    <div className="text-2xl font-bold text-green-500 mb-2">
                      {formatPrice(competitor.price)}
                    </div>
                    <button className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-sm">
                      <ExternalLink className="w-4 h-4" />
                      <span>Ver publicación</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Competitor Details */}
      {selectedCompetitor && (
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Análisis Detallado</h3>
            <button
              onClick={() => setSelectedCompetitor(null)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Información del Producto</h4>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400">Título:</span>
                  <p className="font-medium">{selectedCompetitor.title}</p>
                </div>
                <div>
                  <span className="text-gray-400">Precio:</span>
                  <p className="font-bold text-green-500 text-xl">{formatPrice(selectedCompetitor.price)}</p>
                </div>
                <div>
                  <span className="text-gray-400">Ranking:</span>
                  <p className={`font-bold ${getRankingColor(selectedCompetitor.ranking)}`}>
                    #{selectedCompetitor.ranking}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400">Vendedor:</span>
                  <p className="font-medium">{selectedCompetitor.seller}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">Calificación:</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="font-medium">{selectedCompetitor.rating}</span>
                    <span className="text-gray-400 ml-1">({selectedCompetitor.reviews} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Keywords Utilizadas</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCompetitor.keywords.map((keyword, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-600 text-sm rounded">
                    {keyword}
                  </span>
                ))}
              </div>
              
              <h4 className="font-medium mb-3">Descripción</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                {selectedCompetitor.description}
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-900 bg-opacity-30 rounded-lg">
            <h4 className="font-medium mb-2 text-blue-300">Análisis de Oportunidades</h4>
            <ul className="space-y-1 text-sm text-blue-200">
              <li>• Precio competitivo en el mercado</li>
              <li>• Fuerte presencia de keywords principales</li>
              <li>• Descripción detallada con beneficios claros</li>
              <li>• Vendedor establecido con buena reputación</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};