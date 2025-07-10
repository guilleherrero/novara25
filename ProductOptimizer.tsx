import React, { useState } from 'react';
import { Zap, Target, CheckCircle, AlertCircle, TrendingUp, Edit3, Sparkles } from 'lucide-react';
import { ProductListing, OptimizationSuggestion } from '../types';

export const ProductOptimizer: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductListing | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedContent, setOptimizedContent] = useState<any>(null);

  // Mock product data
  const mockProducts: ProductListing[] = [
    {
      id: '1',
      title: 'Auriculares Bluetooth',
      description: 'Auriculares inalámbricos de buena calidad.',
      price: 89.99,
      keywords: ['auriculares', 'bluetooth'],
      category: 'Electrónicos',
      images: ['image1.jpg'],
      status: 'active',
      ranking: 15,
      views: 1250,
      clicks: 89,
      conversions: 4,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Smartphone Samsung Galaxy',
      description: 'Teléfono inteligente con buenas características.',
      price: 599.99,
      keywords: ['smartphone', 'samsung'],
      category: 'Celulares',
      images: ['image2.jpg'],
      status: 'active',
      ranking: 8,
      views: 2100,
      clicks: 156,
      conversions: 12,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-10'
    }
  ];

  const mockSuggestions: OptimizationSuggestion[] = [
    {
      type: 'title',
      priority: 'high',
      suggestion: 'Incluir palabras clave específicas como "cancelación ruido" y "batería larga duración"',
      impact: 85,
      effort: 20
    },
    {
      type: 'description',
      priority: 'high',
      suggestion: 'Expandir la descripción con beneficios específicos, características técnicas y casos de uso',
      impact: 90,
      effort: 40
    },
    {
      type: 'keywords',
      priority: 'medium',
      suggestion: 'Agregar keywords long-tail como "auriculares bluetooth deportivos" y "headphones gaming"',
      impact: 70,
      effort: 15
    },
    {
      type: 'price',
      priority: 'low',
      suggestion: 'Considerar precio competitivo basado en análisis de competidores',
      impact: 60,
      effort: 10
    }
  ];

  const handleOptimize = async (product: ProductListing) => {
    setIsOptimizing(true);
    
    // Simulate AI optimization
    setTimeout(() => {
      setOptimizedContent({
        title: 'Auriculares Bluetooth Premium Sony WH-1000XM4 - Cancelación Ruido Activa - 30h Batería - Micrófono HD',
        description: `🎵 AURICULARES BLUETOOTH PREMIUM SONY WH-1000XM4 🎵

✨ CARACTERÍSTICAS DESTACADAS:
• Cancelación de ruido líder en la industria
• 30 horas de batería con carga rápida
• Sonido de alta resolución con tecnología LDAC
• Micrófono HD para llamadas cristalinas
• Controles táctiles intuitivos
• Resistentes y cómodos para uso prolongado

🎯 PERFECTO PARA:
• Profesionales que trabajan desde casa
• Estudiantes que necesitan concentración
• Viajeros frecuentes
• Amantes de la música y audiófilos
• Gamers que buscan inmersión total

📦 INCLUYE:
• Auriculares Sony WH-1000XM4
• Cable de carga USB-C
• Cable de audio 3.5mm
• Estuche de transporte premium
• Manual de usuario en español

🚀 VENTAJAS COMPETITIVAS:
• Tecnología de cancelación de ruido más avanzada
• Batería de larga duración (30h)
• Compatibilidad universal (iOS, Android, PC)
• Garantía oficial Sony de 12 meses
• Soporte técnico especializado

💡 ESPECIFICACIONES TÉCNICAS:
• Drivers de 40mm
• Respuesta de frecuencia: 4Hz-40kHz
• Bluetooth 5.0 + NFC
• Carga rápida: 10min = 5h reproducción
• Peso: 254g

🏆 RECONOCIMIENTOS:
• Mejor auricular del año 2023
• Más de 50,000 reseñas positivas
• Recomendado por expertos en audio`,
        keywords: [
          'auriculares bluetooth premium',
          'sony wh-1000xm4',
          'cancelación ruido activa',
          'auriculares inalámbricos',
          'headphones bluetooth',
          'auriculares profesionales',
          'sony auriculares',
          'bluetooth 5.0',
          'batería larga duración',
          'micrófono hd'
        ],
        improvements: [
          'Título optimizado con keywords de alto volumen',
          'Descripción estructurada con emojis y beneficios claros',
          'Incluye casos de uso específicos',
          'Destaca ventajas competitivas',
          'Agrega especificaciones técnicas',
          'Incorpora prueba social y garantías'
        ]
      });
      setIsOptimizing(false);
    }, 3000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getImpactColor = (impact: number) => {
    if (impact >= 80) return 'text-green-500';
    if (impact >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Product Selection */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Zap className="w-5 h-5 mr-2" />
          Optimizador de Productos
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          {mockProducts.map((product) => (
            <div
              key={product.id}
              className={`bg-gray-700 rounded-lg p-4 cursor-pointer transition-all ${
                selectedProduct?.id === product.id ? 'ring-2 ring-blue-500' : 'hover:bg-gray-600'
              }`}
              onClick={() => setSelectedProduct(product)}
            >
              <h3 className="font-medium mb-2">{product.title}</h3>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>Ranking: #{product.ranking}</span>
                <span>{product.views} vistas</span>
              </div>
              <div className="mt-2 flex items-center space-x-2">
                <span className={`px-2 py-1 rounded text-xs ${
                  product.status === 'active' ? 'bg-green-600' : 'bg-gray-600'
                }`}>
                  {product.status}
                </span>
                <span className="text-xs text-gray-400">
                  {product.conversions} conversiones
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Analysis */}
      {selectedProduct && (
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Análisis: {selectedProduct.title}</h3>
            <button
              onClick={() => handleOptimize(selectedProduct)}
              disabled={isOptimizing}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              {isOptimizing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Optimizando con IA...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Optimizar con IA</span>
                </>
              )}
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Contenido Actual</h4>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400 text-sm">Título:</span>
                  <p className="bg-gray-700 p-3 rounded mt-1">{selectedProduct.title}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Descripción:</span>
                  <p className="bg-gray-700 p-3 rounded mt-1">{selectedProduct.description}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Keywords:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedProduct.keywords.map((keyword, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-600 text-xs rounded">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Sugerencias de Mejora</h4>
              <div className="space-y-3">
                {mockSuggestions.map((suggestion, index) => (
                  <div key={index} className="bg-gray-700 p-3 rounded">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${getPriorityColor(suggestion.priority)}`} />
                        <span className="text-sm font-medium capitalize">{suggestion.type}</span>
                      </div>
                      <span className={`text-sm font-bold ${getImpactColor(suggestion.impact)}`}>
                        {suggestion.impact}% impacto
                      </span>
                    </div>
                    <p className="text-sm text-gray-300">{suggestion.suggestion}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Optimized Content */}
      {optimizedContent && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
            Contenido Optimizado por IA
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Nuevo Título</h4>
              <div className="bg-green-900 bg-opacity-30 p-4 rounded border border-green-500">
                <p className="text-green-100">{optimizedContent.title}</p>
              </div>
              
              <h4 className="font-medium mb-3 mt-6">Nuevas Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {optimizedContent.keywords.map((keyword: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-green-600 text-sm rounded">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Nueva Descripción</h4>
              <div className="bg-green-900 bg-opacity-30 p-4 rounded border border-green-500 max-h-96 overflow-y-auto">
                <pre className="text-green-100 text-sm whitespace-pre-wrap">{optimizedContent.description}</pre>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-900 bg-opacity-30 rounded-lg">
            <h4 className="font-medium mb-2 text-blue-300">Mejoras Aplicadas</h4>
            <ul className="space-y-1 text-sm text-blue-200">
              {optimizedContent.improvements.map((improvement: string, index: number) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500" />
                  {improvement}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-6 flex space-x-4">
            <button className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors">
              Aplicar Cambios
            </button>
            <button className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-medium transition-colors">
              Previsualizar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};