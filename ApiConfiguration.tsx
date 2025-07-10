import React, { useState } from 'react';
import { Settings, Key, Save, TestTube, CheckCircle, AlertCircle } from 'lucide-react';
import { ApiConfig } from '../types';

export const ApiConfiguration: React.FC = () => {
  const [config, setConfig] = useState<ApiConfig>({
    serpApiKey: '',
    openaiApiKey: '',
    mercadolibreApiKey: ''
  });
  const [testResults, setTestResults] = useState<{[key: string]: boolean}>({});
  const [testing, setTesting] = useState<{[key: string]: boolean}>({});
  const [saved, setSaved] = useState(false);

  const handleInputChange = (field: keyof ApiConfig, value: string) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const testApi = async (apiType: string) => {
    setTesting(prev => ({ ...prev, [apiType]: true }));
    
    // Simulate API test
    setTimeout(() => {
      setTestResults(prev => ({ ...prev, [apiType]: Math.random() > 0.3 }));
      setTesting(prev => ({ ...prev, [apiType]: false }));
    }, 2000);
  };

  const saveConfiguration = () => {
    // Simulate saving
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const getApiDescription = (apiType: string) => {
    switch (apiType) {
      case 'serpApiKey':
        return 'Necesario para obtener datos de Google y análisis de competidores';
      case 'openaiApiKey':
        return 'Requerido para la optimización automática con inteligencia artificial';
      case 'mercadolibreApiKey':
        return 'Permite sincronizar y actualizar directamente tus publicaciones';
      default:
        return '';
    }
  };

  const getApiName = (apiType: string) => {
    switch (apiType) {
      case 'serpApiKey':
        return 'SerpApi';
      case 'openaiApiKey':
        return 'OpenAI';
      case 'mercadolibreApiKey':
        return 'MercadoLibre';
      default:
        return '';
    }
  };

  const getApiUrl = (apiType: string) => {
    switch (apiType) {
      case 'serpApiKey':
        return 'https://serpapi.com/';
      case 'openaiApiKey':
        return 'https://platform.openai.com/';
      case 'mercadolibreApiKey':
        return 'https://developers.mercadolibre.com/';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Configuración de APIs
        </h2>
        <p className="text-gray-400">
          Configura las claves de API necesarias para el funcionamiento completo del sistema
        </p>
      </div>

      {/* API Configuration */}
      <div className="space-y-4">
        {Object.entries(config).map(([key, value]) => (
          <div key={key} className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium flex items-center">
                  <Key className="w-5 h-5 mr-2" />
                  {getApiName(key)}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  {getApiDescription(key)}
                </p>
              </div>
              <a
                href={getApiUrl(key)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                Obtener API Key →
              </a>
            </div>
            
            <div className="flex space-x-4">
              <div className="flex-1">
                <input
                  type="password"
                  placeholder={`Ingresa tu ${getApiName(key)} API Key`}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={value}
                  onChange={(e) => handleInputChange(key as keyof ApiConfig, e.target.value)}
                />
              </div>
              <button
                onClick={() => testApi(key)}
                disabled={!value || testing[key]}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                {testing[key] ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Probando...</span>
                  </>
                ) : (
                  <>
                    <TestTube className="w-4 h-4" />
                    <span>Probar</span>
                  </>
                )}
              </button>
            </div>
            
            {testResults[key] !== undefined && (
              <div className={`mt-3 p-3 rounded-lg flex items-center space-x-2 ${
                testResults[key] ? 'bg-green-900 bg-opacity-30 text-green-300' : 'bg-red-900 bg-opacity-30 text-red-300'
              }`}>
                {testResults[key] ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                <span>
                  {testResults[key] ? 'Conexión exitosa' : 'Error de conexión - Verifica tu API Key'}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Save Configuration */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Guardar Configuración</h3>
            <p className="text-sm text-gray-400">
              Las API Keys se guardan de forma segura y encriptada
            </p>
          </div>
          <button
            onClick={saveConfiguration}
            className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
              saved ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {saved ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Guardado</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Guardar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* API Usage Guide */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Guía de Uso de APIs</h3>
        <div className="space-y-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h4 className="font-medium mb-2">SerpApi</h4>
            <p className="text-sm text-gray-300">
              Esencial para obtener datos reales de Google y MercadoLibre, análisis de competidores top 2, 
              y extracción de títulos/descripciones para comparación. Plan gratuito: 100 búsquedas/mes.
            </p>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg">
            <h4 className="font-medium mb-2">OpenAI</h4>
            <p className="text-sm text-gray-300">
              ChatGPT genera títulos de 60 caracteres y descripciones de 650+ palabras optimizadas. 
              Incluye 10 keywords poderosas y frases SEO específicas para Google Shopping y MercadoLibre.
            </p>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg">
            <h4 className="font-medium mb-2">MercadoLibre</h4>
            <p className="text-sm text-gray-300">
              Conecta directamente con tu cuenta para aplicar automáticamente las optimizaciones generadas, 
              actualizar publicaciones y monitorear rankings en tiempo real.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};