import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, Target, Zap, BarChart3, Users, ShoppingCart, Star } from 'lucide-react';
import { KeywordAnalyzer } from './KeywordAnalyzer';
import { CompetitorComparison } from './CompetitorComparison';
import { ProductOptimizer } from './ProductOptimizer';
import { PerformanceMetrics } from './PerformanceMetrics';
import { ApiConfiguration } from './ApiConfiguration';

interface DashboardTab {
  id: string;
  name: string;
  icon: React.ReactNode;
  component: React.ComponentType;
}

const tabs: DashboardTab[] = [
  { id: 'keywords', name: 'Análisis de Keywords', icon: <Search className="w-5 h-5" />, component: KeywordAnalyzer },
  { id: 'competitors', name: 'Comparación IA', icon: <Users className="w-5 h-5" />, component: CompetitorComparison },
  { id: 'optimizer', name: 'Optimizar Productos', icon: <Zap className="w-5 h-5" />, component: ProductOptimizer },
  { id: 'metrics', name: 'Métricas', icon: <BarChart3 className="w-5 h-5" />, component: PerformanceMetrics },
  { id: 'config', name: 'Configuración', icon: <Target className="w-5 h-5" />, component: ApiConfiguration },
];

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('keywords');
  const [stats, setStats] = useState({
    totalProducts: 24,
    avgRanking: 3.2,
    totalViews: 45600,
    conversionRate: 4.2,
    competitorAnalyzed: 156,
    keywordsTracked: 89
  });

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || KeywordAnalyzer;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-blue-500" />
              <h1 className="ml-3 text-xl font-bold">SEO MercadoLibre Pro</h1>
            </div>
            <div className="text-sm text-gray-400">
              Optimización Inteligente para Ventas
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center">
              <ShoppingCart className="w-8 h-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Productos</p>
                <p className="text-2xl font-bold">{stats.totalProducts}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center">
              <Star className="w-8 h-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Ranking Promedio</p>
                <p className="text-2xl font-bold">{stats.avgRanking}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center">
              <BarChart3 className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Vistas Totales</p>
                <p className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center">
              <Target className="w-8 h-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Conversión</p>
                <p className="text-2xl font-bold">{stats.conversionRate}%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Competidores</p>
                <p className="text-2xl font-bold">{stats.competitorAnalyzed}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center">
              <Search className="w-8 h-8 text-teal-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Keywords</p>
                <p className="text-2xl font-bold">{stats.keywordsTracked}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-500'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Active Component */}
        <ActiveComponent />
      </div>
    </div>
  );
};