interface KeywordVariation {
  base: string;
  variations: string[];
  searchVolume: number;
  difficulty: number;
  cpc: number;
  competition: 'low' | 'medium' | 'high';
}

export class KeywordGenerator {
  private static getProductCategory(query: string): string {
    const categories = {
      'auriculares|headphones|audífonos|cascos': 'audio',
      'smartphone|celular|teléfono|móvil': 'mobile',
      'laptop|notebook|computadora': 'computing',
      'zapatillas|zapatos|tenis|calzado': 'footwear',
      'reloj|smartwatch|watch': 'watches',
      'tablet|ipad': 'tablets',
      'televisor|tv|smart tv': 'tv',
      'cámara|camera|fotografía': 'camera',
      'auto|carro|vehículo|automóvil': 'automotive',
      'ropa|vestido|camisa|pantalón': 'clothing'
    };

    for (const [pattern, category] of Object.entries(categories)) {
      if (new RegExp(pattern, 'i').test(query)) {
        return category;
      }
    }
    return 'general';
  }

  private static getVariationsByCategory(baseKeyword: string, category: string): string[] {
    const commonVariations = [
      `${baseKeyword} barato`,
      `${baseKeyword} precio`,
      `${baseKeyword} oferta`,
      `${baseKeyword} original`,
      `${baseKeyword} nuevo`,
      `${baseKeyword} mercadolibre`,
      `${baseKeyword} argentina`,
      `${baseKeyword} envío gratis`
    ];

    const categorySpecific = {
      audio: [
        `${baseKeyword} inalámbricos`,
        `${baseKeyword} bluetooth`,
        `${baseKeyword} cancelación ruido`,
        `${baseKeyword} gaming`,
        `${baseKeyword} deportivos`,
        `${baseKeyword} profesionales`,
        `${baseKeyword} alta calidad`,
        `${baseKeyword} batería larga`
      ],
      mobile: [
        `${baseKeyword} libre`,
        `${baseKeyword} 5g`,
        `${baseKeyword} dual sim`,
        `${baseKeyword} cámara`,
        `${baseKeyword} 128gb`,
        `${baseKeyword} pantalla`,
        `${baseKeyword} android`,
        `${baseKeyword} desbloqueado`
      ],
      computing: [
        `${baseKeyword} gamer`,
        `${baseKeyword} ssd`,
        `${baseKeyword} 16gb ram`,
        `${baseKeyword} intel`,
        `${baseKeyword} amd`,
        `${baseKeyword} nvidia`,
        `${baseKeyword} ultrabook`,
        `${baseKeyword} trabajo`
      ],
      footwear: [
        `${baseKeyword} running`,
        `${baseKeyword} deportivas`,
        `${baseKeyword} hombre`,
        `${baseKeyword} mujer`,
        `${baseKeyword} originales`,
        `${baseKeyword} air`,
        `${baseKeyword} boost`,
        `${baseKeyword} casual`
      ],
      watches: [
        `${baseKeyword} deportivo`,
        `${baseKeyword} fitness`,
        `${baseKeyword} gps`,
        `${baseKeyword} sumergible`,
        `${baseKeyword} android`,
        `${baseKeyword} ios`,
        `${baseKeyword} salud`,
        `${baseKeyword} pantalla`
      ]
    };

    return [
      ...commonVariations,
      ...(categorySpecific[category as keyof typeof categorySpecific] || [])
    ];
  }

  private static calculateMetrics(keyword: string, baseVolume: number): {
    searchVolume: number;
    difficulty: number;
    cpc: number;
    competition: 'low' | 'medium' | 'high';
    googleShoppingResults: number;
    mercadolibreResults: number;
  } {
    const keywordLength = keyword.length;
    const wordCount = keyword.split(' ').length;
    
    // Más palabras = menos volumen pero menos competencia
    const volumeMultiplier = Math.max(0.1, 1 - (wordCount - 1) * 0.3);
    const searchVolume = Math.floor(baseVolume * volumeMultiplier * (0.5 + Math.random() * 0.5));
    
    // Dificultad basada en longitud y palabras
    const baseDifficulty = Math.min(90, 30 + (keywordLength * 2) + (wordCount * 10));
    const difficulty = Math.floor(baseDifficulty * (0.7 + Math.random() * 0.6));
    
    // CPC basado en competencia
    const baseCpc = 1.5 + (difficulty / 100) * 3;
    const cpc = parseFloat((baseCpc * (0.8 + Math.random() * 0.4)).toFixed(2));
    
    // Competencia basada en dificultad
    let competition: 'low' | 'medium' | 'high';
    if (difficulty < 40) competition = 'low';
    else if (difficulty < 70) competition = 'medium';
    else competition = 'high';
    
    // Resultados en plataformas
    const googleShoppingResults = Math.floor(searchVolume * (2 + Math.random() * 3));
    const mercadolibreResults = Math.floor(googleShoppingResults * (0.3 + Math.random() * 0.4));
    
    return {
      searchVolume,
      difficulty,
      cpc,
      competition,
      googleShoppingResults,
      mercadolibreResults
    };
  }

  private static getRelatedKeywords(baseKeyword: string, category: string): string[] {
    const related = {
      audio: ['sonido', 'música', 'audio', 'micrófono', 'bass', 'hi-fi'],
      mobile: ['celular', 'smartphone', 'android', 'ios', 'móvil', 'teléfono'],
      computing: ['laptop', 'notebook', 'pc', 'computadora', 'gaming', 'trabajo'],
      footwear: ['zapatos', 'calzado', 'deportivas', 'running', 'casual', 'urbano'],
      watches: ['reloj', 'smartwatch', 'fitness', 'deportivo', 'salud', 'gps']
    };

    const categoryRelated = related[category as keyof typeof related] || ['producto', 'calidad', 'precio'];
    
    return categoryRelated.map(term => `${baseKeyword} ${term}`).slice(0, 4);
  }

  static generateKeywords(searchQuery: string): any[] {
    if (!searchQuery.trim()) return [];

    const cleanQuery = searchQuery.toLowerCase().trim();
    const category = this.getProductCategory(cleanQuery);
    const baseVolume = 5000 + Math.floor(Math.random() * 15000);
    
    // Generar variaciones
    const variations = this.getVariationsByCategory(cleanQuery, category);
    
    // Crear keywords con la query original primero
    const keywords = [];
    
    // Keyword principal (la que buscaste)
    const mainMetrics = this.calculateMetrics(cleanQuery, baseVolume);
    keywords.push({
      keyword: cleanQuery,
      ...mainMetrics,
      trend: Array.from({length: 7}, () => 80 + Math.floor(Math.random() * 40)),
      relatedKeywords: this.getRelatedKeywords(cleanQuery, category)
    });

    // Generar 7 variaciones adicionales
    const selectedVariations = variations
      .sort(() => Math.random() - 0.5)
      .slice(0, 7);

    selectedVariations.forEach(variation => {
      const metrics = this.calculateMetrics(variation, baseVolume);
      keywords.push({
        keyword: variation,
        ...metrics,
        trend: Array.from({length: 7}, () => 60 + Math.floor(Math.random() * 60)),
        relatedKeywords: this.getRelatedKeywords(variation, category)
      });
    });

    return keywords;
  }

  static getPopularSuggestions(): string[] {
    return [
      'auriculares bluetooth',
      'smartphone samsung',
      'laptop gamer',
      'zapatillas nike',
      'reloj inteligente',
      'tablet android',
      'smart tv 55',
      'cámara digital'
    ];
  }
}