# public/brand — Assets Oficiais da Marca Venddup

## Assets disponíveis (versão operacional V1)

| Arquivo                         | Uso                                          |
|----------------------------------|----------------------------------------------|
| `venddup-logo-dark.svg`          | Logo horizontal — fundo escuro (sidebar, auth) |
| `venddup-logo-light.svg`         | Logo horizontal — fundo claro                |
| `venddup-logo-vertical-dark.svg` | Logo vertical — apresentações, capas         |
| `venddup-logo-vertical-light.svg`| Logo vertical fundo claro                    |
| `venddup-symbol.svg`             | Símbolo isolado — avatar, og, referência     |
| `venddup-symbol-white.svg`       | Símbolo branco — para overlays escuros       |
| `venddup-logo-icon.svg`          | Ícone compacto — uso interno                 |

## Estado atual

Os SVGs desta pasta são a **versão operacional V1** da marca.
O símbolo e o lockup horizontal estão corretos.

> **TODO**: Substituir o wordmark pela versão vetorial final com
> o corte cyan no "u" quando o arquivo for disponibilizado pelo designer.

## Onde cada asset é usado no app

- `venddup-logo-dark.svg` → `VenddupLogoFull variant="dark"` (sidebar, auth, onboarding)
- `venddup-logo-light.svg` → `VenddupLogoFull variant="light"`
- `venddup-symbol.svg` → referência / og image
- `src/app/icon.svg` → favicon (paths extraídos do símbolo, viewBox recortado)

## Regras para novos assets

### ✓ Correto
- SVG com fundo transparente ou fundo intencional do brandbook
- PNG exportado com canal alpha real (fundo transparente)
- Dimensões proporcionais ao lockup oficial

### ✗ Proibido
- PNG com checkerboard embutido (indica fundo falso transparente)
- PNG com fundo branco opaco não intencional
- Wordmark recriado com fontes web / CSS
- Logo distorcida ou com proporções alteradas
- Glow excessivo em tamanhos pequenos

## Como substituir pelo asset definitivo

Quando o designer entregar o SVG final com o corte cyan no "u":

1. Substitua `venddup-logo-dark.svg` e `venddup-logo-light.svg`
2. Nenhuma mudança de código necessária — o componente `VenddupLogoFull`
   usa esses arquivos diretamente via `<img src="/brand/...">`
