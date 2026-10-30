---
title: "CISA KEV: el catálogo de vulnerabilidades explotadas"
categoria: Vulnerability Management
nivel: Fundamentos
fecha: 2026-10-28
resumen: "Lista pública de CISA con vulnerabilidades que tienen evidencia de explotación activa. Si un hallazgo está en KEV, deja de ser teórico."
tags: [CISA, KEV, threat-intel, SLA]
referencias:
  - titulo: "CISA — Known Exploited Vulnerabilities Catalog"
    url: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog"
  - titulo: "CISA — BOD 22-01: Reducing the Significant Risk of Known Exploited Vulnerabilities"
    url: "https://www.cisa.gov/news-events/directives/bod-22-01-reducing-significant-risk-known-exploited-vulnerabilities"
---

## Concepto

El **Known Exploited Vulnerabilities (KEV) Catalog** es mantenido por CISA (Cybersecurity and Infrastructure Security Agency, EE. UU.). Para que una vulnerabilidad entre al catálogo debe cumplir tres criterios:

1. Tener un identificador **CVE** asignado.
2. Existir **evidencia confiable de explotación activa** en el mundo real.
3. Contar con una **acción de remediación clara** (parche, mitigación o guía del fabricante).

Nació con la directiva **BOD 22-01**, que obliga a las agencias federales de EE. UU. a remediar las entradas del catálogo dentro de plazos definidos. Para cualquier otra organización es una referencia de priorización gratuita y de alta señal.

## Por qué importa

Mientras CVSS y EPSS son estimaciones, KEV es **evidencia**: alguien ya está usando esa vulnerabilidad para atacar. Por eso en mi matriz de SLA un hallazgo presente en KEV sube automáticamente a la categoría *Critical*, independiente de su puntaje CVSS.

## Ejemplo práctico

CISA publica el catálogo como JSON, lo que permite cruzarlo con la salida de un escáner:

```python
import requests, pandas as pd

KEV_URL = "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json"
kev = {v["cveID"]: v for v in requests.get(KEV_URL, timeout=30).json()["vulnerabilities"]}

df = pd.read_csv("scan_export.csv")          # columna 'CVE'
df["en_KEV"] = df["CVE"].isin(kev)
df.loc[df["en_KEV"], "Prioridad"] = "Critical"
```

## Lo que me llevo

- KEV + EPSS + criticidad del activo forman una priorización mucho más defendible frente a la gerencia que "CVSS mayor a 7".
- Que una vulnerabilidad **no** esté en KEV no significa que sea segura: el catálogo es una muestra confirmada, no un inventario completo de explotación.
