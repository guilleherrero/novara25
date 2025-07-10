const handleAIOptimization = async () => {
  if (!myProduct.title || !myProduct.description || !myProduct.keyword || 
      !competitor1.title || !competitor1.description ||
      !competitor2.title || !competitor2.description) {
    alert('Por favor completa todos los campos antes de optimizar');
    return;
  }

  if (!config.openaiApiKey) {
    alert('Falta tu clave de OpenAI. Ve a Configuración de APIs.');
    return;
  }

  setIsOptimizing(true);
  setAiResult(null);

  try {
    const prompt = `
Quiero que actúes como experto en optimización de publicaciones para MercadoLibre y Google Shopping.

Producto propio:
- Keyword: ${myProduct.keyword}
- Título: ${myProduct.title}
- Descripción: ${myProduct.description}

Competidor 1:
- Título: ${competitor1.title}
- Descripción: ${competitor1.description}

Competidor 2:
- Título: ${competitor2.title}
- Descripción: ${competitor2.description}

Devuélveme un JSON con la siguiente estructura (no pongas comentarios ni explicaciones):
{
  "optimizedTitle": "...",
  "optimizedDescription": "...",
  "powerfulKeywords": ["...", "..."],
  "seoPhases": ["...", "..."],
  "improvements": ["...", "..."],
  "competitorAnalysis": "...",
  "googleShoppingTips": ["...", "..."]
}
    `;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${config.openaiApiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "Eres un experto en e-commerce, SEO y optimización de publicaciones en MercadoLibre y Google Shopping." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("La respuesta de OpenAI vino vacía o mal estructurada.");
    }

    try {
      const parsed: AIOptimizationResult = JSON.parse(content);
      setAiResult(parsed);
    } catch (parseError) {
      console.error("Error al parsear JSON de OpenAI:", parseError);
      alert("La respuesta de OpenAI no tiene el formato esperado. Revisa el prompt o vuelve a intentar.");
    }

  } catch (error) {
    console.error("Error en la llamada a OpenAI:", error);
    alert("Error al generar optimización. Verifica tu API Key o intenta más tarde.");
  } finally {
    setIsOptimizing(false);
  }
};
