---
title: "EPSS vs CVSS: severidad no es probabilidad"
categoria: Vulnerability Management
nivel: Fundamentos
fecha: 2026-10-29
resumen: "CVSS mide qué tan grave sería explotar una vulnerabilidad; EPSS estima qué tan probable es que se explote en los próximos 30 días. Priorizar bien requiere ambos."
tags: [EPSS, CVSS, priorizacion, FIRST]
referencias:
  - titulo: "FIRST — Exploit Prediction Scoring System (EPSS)"
    url: "https://www.first.org/epss/"
  - titulo: "FIRST — EPSS API"
    url: "https://www.first.org/epss/api"
  - titulo: "FIRST — CVSS v3.1 Specification"
    url: "https://www.first.org/cvss/v3-1/specification-document"
---

## Concepto

- **CVSS** (Common Vulnerability Scoring System) entrega un puntaje de 0 a 10 que describe la **severidad técnica** de una vulnerabilidad: vector de ataque, complejidad, privilegios requeridos e impacto en confidencialidad, integridad y disponibilidad.
- **EPSS** (Exploit Prediction Scoring System), mantenido por FIRST, entrega una **probabilidad entre 0 y 1** de que la vulnerabilidad sea explotada en el mundo real durante los próximos 30 días, junto con un **percentil** respecto al resto de CVEs.

> CVSS responde *"¿qué tan malo sería?"*. EPSS responde *"¿qué tan probable es que pase pronto?"*.

## Por qué importa

Un escaneo corporativo puede arrojar miles de hallazgos con CVSS ≥ 7. Si todo es "alto", nada lo es. La gran mayoría de los CVEs publicados nunca se explota activamente, por lo que priorizar solo por CVSS consume capacidad de los equipos resolutores en vulnerabilidades que probablemente nunca se usarán contra la organización.

## Ejemplo práctico

Una matriz simple de priorización combinando ambos ejes:

| CVSS | EPSS | Prioridad |
|---|---|---|
| Alto (≥ 7) | Alto (percentil ≥ 90) | **Inmediata** — remediar dentro del SLA crítico |
| Alto (≥ 7) | Bajo | Planificada — ciclo normal de parches |
| Medio/Bajo | Alto | Revisar contexto — exposición a Internet, activo crítico |
| Medio/Bajo | Bajo | Backlog / aceptación de riesgo documentada |

Consulta del puntaje vía API:

```python
import requests

def epss(cve: str) -> dict:
    r = requests.get("https://api.first.org/data/v1/epss", params={"cve": cve}, timeout=10)
    r.raise_for_status()
    d = r.json()["data"][0]
    return {"cve": d["cve"], "epss": float(d["epss"]), "percentil": float(d["percentile"])}
```

## Lo que me llevo

- EPSS **no reemplaza** a CVSS: se complementan. Además, el contexto propio (activo expuesto, criticidad del negocio, controles compensatorios) siempre ajusta la decisión final.
- EPSS se recalcula a diario, así que la prioridad de un hallazgo puede cambiar sin que cambie el hallazgo.
