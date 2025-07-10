import React, { useState } from 'react';
import { BarChart3, TrendingUp, Eye, MousePointer, ShoppingCart, Target } from 'lucide-react';

export const PerformanceMetrics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('views');

  const mockData = {
    views: {
      current: 12450,
      previous: 10200,
      change: 22.1,
      data: [8500, 9200, 8900, 10500, 11200, 12000, 12450]
    },
    clicks: {
      current: 892,
      previous: 745,
      change: 19.7,
      data: [650, 720, 680, 780, 850, 920, 892]
    },
    conversions: {
      current: 45,
      previous: 38,
      change: 18.4,
      data: [32, 35, 33, 40, 42, 44, 45]
    },
    ranking: {
      current: 3.2,
      previous: 4.1,
      change: -22.0,
      data: [4.5, 4.2, 4.0, 3.8, 3.5, 3.3, 3.2]
    }
  };

  const products = [
    {
      id: 1,
      name: 'Auriculares Bluetooth Premium',
      ranking: 2,
      views: 3200,
      clicks: 245,
      conversions: 12,
      revenue: 1080,
      change: 15.2
    },
    {
      id: 2,
      name: 'Smartphone Samsung Galaxy',
      ranking: 5,
      views: 2800,
      clicks: 198,
      conversions: 8,
      revenue: 4800,
      change: -8.1
    },
    {
      id: 3,
      name: 'Laptop Gaming HP',
      ranking: 3,
      views: 1950,
      clicks: 156,
      conversions: 4,
      revenue: 3600,
      change: 12.5
    },
    {
      id: 4,
      name: 'Reloj Inteligente Apple',
      ranking: 1,
      views: 4500,
      clicks: 293,
      conversions: 21,
      revenue: 5250,
      change: 28.7
    }
  ];

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'views': return <Eye className="w-5 h-5" />;
      case 'clicks': return <MousePointer className="w-5 h-5" />;
      case 'conversions': return <ShoppingCart className="w-5 h-5" />;
      case 'ranking': return <Target className="w-5 h-5" />;
      default: return <BarChart3 className="w-5 h-5" />;
    }
  };

  const getMetricColor = (metric: string) => {
    switch (metric) {
      case 'views': return 'text-blue-500';
      case 'clicks': return 'text-green-500';
      case 'conversions': return 'text-purple-500';
      case 'ranking': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(amount);
  };

  const currentData = mockData[selectedMetric as keyof typeof mockData];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Métricas de Rendimiento
          </h2>
          <div className="flex space-x-2">
            {['7d', '30d', '90d'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedPeriod === period
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        {Object.entries(mockData).map(([key, data]) => (
          <div
            key={key}
            className={`bg-gray-800 rounded-lg p-6 cursor-pointer transition-all ${
              selectedMetric === key ? 'ring-2 ring-blue-500' : 'hover:bg-gray-700'
            }`}
            onClick={() => setSelectedMetric(key)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`${getMetricColor(key)}`}>
                {getMetricIcon(key)}
              </div>
              <span className={`text-sm font-medium ${
                data.change > 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {data.change > 0 ? '+' : ''}{data.change.toFixed(1)}%
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold">{formatNumber(data.current)}</p>
              <p className="text-sm text-gray-400 capitalize">{key}</p>
            </div>
            <div className="mt-3 h-8 flex items-end space-x-1">
              {data.data.map((value, index) => (
                <div
                  key={index}
                  className={`flex-1 ${getMetricColor(key).replace('text-', 'bg-')} rounded-t opacity-70`}
                  style={{ height: `${(value / Math.max(...data.data)) * 100}%` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Chart Visualization */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center">
          {getMetricIcon(selectedMetric)}
          <span className="ml-2 capitalize">{selectedMetric} - Últimos {selectedPeriod}</span>
        </h3>
        
        <div className="h-64 flex items-end space-x-2">
          {currentData.data.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className={`w-full ${getMetricColor(selectedMetric).replace('text-', 'bg-')} rounded-t transition-all hover:opacity-80`}
                style={{ height: `${(value / Math.max(...currentData.data)) * 100}%` }}
              />
              <span className="text-xs text-gray-400 mt-2">
                {index + 1}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 flex justify-between text-sm text-gray-400">
          <span>Hace {selectedPeriod}</span>
          <span>Hoy</span>
        </div>
      </div>

      {/* Product Performance Table */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">Rendimiento por Producto</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-700">
                <th className="pb-3">Producto</th>
                <th className="pb-3">Ranking</th>
                <th className="pb-3">Vistas</th>
                <th className="pb-3">Clicks</th>
                <th className="pb-3">Conversiones</th>
                <th className="pb-3">Ingresos</th>
                <th className="pb-3">Cambio</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="py-3 font-medium">{product.name}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded text-sm ${
                      product.ranking <= 3 ? 'bg-green-600' : 
                      product.ranking <= 7 ? 'bg-yellow-600' : 'bg-red-600'
                    }`}>
                      #{product.ranking}
                    </span>
                  </td>
                  <td className="py-3">{formatNumber(product.views)}</td>
                  <td className="py-3">{product.clicks}</td>
                  <td className="py-3">{product.conversions}</td>
                  <td className="py-3 font-medium">{formatCurrency(product.revenue)}</td>
                  <td className="py-3">
                    <span className={`flex items-center ${
                      product.change > 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {product.change > 0 ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingUp className="w-4 h-4 mr-1 rotate-180" />
                      )}
                      {Math.abs(product.change).toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};