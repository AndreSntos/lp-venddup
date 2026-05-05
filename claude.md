## Performance como prioridade máxima

A landing do Venddup deve ser construída com obsessão por performance.

Meta:
- carregamento percebido em até 2 segundos;
- primeira dobra visível o mais rápido possível;
- mobile-first;
- sem assets pesados bloqueando renderização;
- sem dependências desnecessárias;
- sem animações caras;
- sem vídeo na primeira dobra;
- sem carrossel pesado;
- sem imagens gigantes não otimizadas.

A landing precisa parecer premium, mas ser leve.

### Regras de performance

1. Priorizar Server Components sempre que possível.
2. Evitar `"use client"` na landing inteira.
3. Usar Client Components apenas onde for realmente necessário.
4. Não importar bibliotecas pesadas para animação, slider ou gráficos.
5. Não usar vídeo na hero.
6. Não usar imagem remota pesada na primeira dobra.
7. Não usar mockups gigantes em PNG sem otimização.
8. Usar SVG/CSS/HTML para elementos visuais sempre que possível.
9. Usar `next/image` quando houver imagem raster.
10. Definir width/height em imagens para evitar layout shift.
11. Evitar fontes extras além das já usadas no projeto.
12. Evitar JavaScript desnecessário na primeira dobra.
13. Evitar hydration pesada.
14. CSS crítico deve vir do design system existente.
15. Não criar background animado caro.
16. Não usar blur excessivo em grandes áreas no mobile.
17. Não usar múltiplas sombras pesadas em elementos repetidos.
18. Não bloquear renderização com scripts externos.
19. Não carregar analytics/pixels antes do essencial, se existirem.
20. Otimizar para Lighthouse/PageSpeed.

### Métricas-alvo

Buscar:
- LCP abaixo de 2.0s em mobile razoável;
- CLS próximo de 0;
- INP bom;
- HTML e CSS leves;
- JS mínimo na landing;
- nenhuma imagem acima do necessário;
- primeira dobra renderizada sem depender de chamada ao banco.

A landing não deve depender de Supabase, Stripe, Blob ou APIs para renderizar a primeira dobra.

## Primeira dobra impecável

A primeira dobra da landing é a parte mais importante.

Objetivo:
Em até 5 segundos, o dono da adega precisa entender:

1. O que é o Venddup.
2. Para quem é.
3. Qual dor resolve.
4. O que ele ganha.
5. Qual o próximo passo.

### Estrutura obrigatória da primeira dobra

A primeira dobra deve conter:

1. Logo Venddup funcionando.
2. Badge de posicionamento.
3. Headline forte.
4. Subheadline clara.
5. CTA principal.
6. CTA secundário.
7. Prova/benefício rápido.
8. Visual premium leve do produto.

### Copy da primeira dobra

Headline principal:
“Sua adega vendendo pelo WhatsApp com vitrine própria e pedidos organizados.”

Subheadline:
“Crie uma vitrine online para sua adega, cadastre produtos e kits, receba pedidos completos e feche tudo pelo WhatsApp da loja.”

Badge:
“Venddup Starter · R$97/mês”

Ou:
“Para adegas que vendem pelo WhatsApp”

CTA principal:
“Começar teste grátis”

CTA secundário:
“Ver exemplo de vitrine”

Microcopy abaixo dos CTAs:
“Sem marketplace. Sem checkout complicado. Seu cliente pede, sua adega confirma no WhatsApp.”

### Primeira dobra visual

A hero precisa ser muito bonita, mas leve.

Recomendações:
- usar composição visual feita com HTML/CSS, não imagem gigante;
- simular produto com cards leves:
  - vitrine;
  - pedido recebido;
  - WhatsApp;
  - kit com margem;
- usar glass cards e gradientes do design system;
- evitar imagens pesadas de bebida;
- evitar mockup 3D pesado;
- evitar vídeo;
- evitar carrossel;
- evitar animação complexa.

Visual sugerido:
Um painel premium com 3 camadas:
1. card de vitrine com produtos/kits;
2. card de pedido organizado;
3. balão/linha de WhatsApp com status.

Mensagem visual:
“Do caos do WhatsApp para um pedido organizado.”

### Hierarquia da primeira dobra

A headline deve ser dominante.
O CTA principal deve ser imediatamente visível.
O preço deve aparecer sem parecer agressivo.
A seção deve ter respiro, contraste e acabamento premium.

No mobile:
- headline curta e legível;
- CTA ocupa largura total;
- visual simplificado;
- nada deve gerar scroll horizontal;
- primeira dobra não pode depender de imagem grande;
- evitar que o mockup empurre o CTA para muito baixo.

## Performance de copy

A copy deve ser direta, comercial e focada em conversão.

Princípios:
- frases curtas;
- benefício antes de feature;
- linguagem de dono de adega;
- explicar sem jargão;
- reduzir fricção;
- repetir a promessa principal de formas diferentes;
- deixar claro que o Venddup não substitui o WhatsApp, organiza o pedido.

Cada seção deve responder:
“Por que uma adega pagaria R$97/mês por isso?”

### Regras de copy

Evitar:
- “transformação digital”
- “ecossistema”
- “omnichannel”
- “solução robusta”
- “inteligência operacional”
- “plataforma completa”
- “aumente exponencialmente”
- “revolucione sua adega”

Preferir:
- “pedido completo”
- “vitrine própria”
- “link para divulgar”
- “kits com margem”
- “cliente escolhe, você confirma”
- “menos bagunça no WhatsApp”
- “mais profissional sem complicar”

### Copy de conversão

Usar blocos como:

- “Seu WhatsApp continua sendo o fechamento. O Venddup organiza o pedido antes.”
- “Em vez de áudio, print e mensagem perdida, você recebe um pedido completo.”
- “Cadastre produtos, monte kits e compartilhe um link bonito da sua adega.”
- “O cliente escolhe tudo na vitrine e envia pronto para seu WhatsApp.”
- “Você confirma disponibilidade, entrega e pagamento manualmente.”

## Beleza visual sem peso

A landing deve parecer premium, mas sem sacrificar performance.

Usar:
- CSS gradients;
- SVGs leves;
- cards com bordas;
- glass controlado;
- sombras sutis;
- grid background do design system;
- ícones SVG leves;
- composição de UI fake em HTML/CSS.

Evitar:
- imagens muito grandes;
- PNGs com background pesado;
- vídeos;
- Lottie;
- carrosséis;
- bibliotecas de animação;
- efeitos de blur em excesso;
- partículas;
- canvas/WebGL;
- assets externos desnecessários.

## Critérios adicionais de aceite

Além dos critérios já existentes, a landing precisa cumprir:

- primeira dobra premium e impecável;
- hero carrega rápido;
- CTA principal aparece sem demora;
- logo aparece corretamente;
- nenhuma imagem quebrada;
- nenhuma dependência desnecessária;
- sem scroll horizontal;
- sem layout shift perceptível;
- sem chamadas ao banco para renderizar a landing;
- sem vídeo/carrossel na primeira dobra;
- mobile abre rápido e legível;
- `npm run check` passa.