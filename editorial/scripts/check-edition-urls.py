#!/usr/bin/env python3
import json
import ssl
import urllib.request

URLS = [
    "https://noticias.stf.jus.br/events/mes/",
    "https://www.bbc.com/portuguese/articles/cm0re47gwy21o",
    "https://noticias.uol.com.br/ao-vivo/2026/09/15/stf-julgamento-sobre-alexandre-de-moraes.htm",
    "https://g1.globo.com/politica/noticia/2026/09/15/na-retomada-de-julgamento-fachin-vota-para-rejeitar-pedido-para-adiar-julgamento-de-moraes-e-de-analisar-caso-com-o-de-mendonca.ghtml",
    "https://www1.folha.uol.com.br/poder/2026/09/fachin-suspende-sessao-no-stf-com-ministros-rachados-e-sem-decidir-sobre-analise-de-casos-moraes-e-mendonca.shtml",
    "https://www.gov.br/pf/pt-br/assuntos/noticias/pf-e-cgu-apuram-desvio-de-recursos-publicos-federais-no-para",
    "https://g1.globo.com/pa/para/noticia/2026/09/15/pf-apreende-mais-de-r-1-milhao-em-dinheiro-e-afasta-12-servidores-em-operacao-contra-desvios-em-empresa-publica-de-belem.ghtml",
    "https://www.uscis.gov/newsroom/alerts/court-order-on-diversity-immigrant-visa-program-hold-policy",
    "https://understandingwar.org/research/russia-ukraine/russian-offensive-campaign-assessment-september-15-2026/",
    "https://www.usnews.com/news/world/articles/2026-09-15/ukraine-launches-offensive-push-in-north-of-donetsk-region-senior-commander-says",
    "https://apnews.com/article/russia-ukraine-war-poland-nato-drones-dbba56f09562f337aa731f7d4bbd1235",
    "https://www.whitehouse.gov/briefings-statements/",
    "https://rollcall.com/factbase/trump/calendar/2026/september/",
]

UA = {"User-Agent": "ToToGlobalDesk/1.0 (edition-001 source check)"}
ctx = ssl.create_default_context()


def hit(url: str, method: str) -> tuple[int, str]:
    req = urllib.request.Request(url, method=method, headers=UA)
    with urllib.request.urlopen(req, timeout=25, context=ctx) as r:
        return r.status, r.geturl()


rows = []
for url in URLS:
    try:
        status, final = hit(url, "HEAD")
        rows.append({"url": url, "status": status, "final": final, "via": "HEAD"})
    except Exception:
        try:
            status, final = hit(url, "GET")
            rows.append({"url": url, "status": status, "final": final, "via": "GET"})
        except Exception as err:
            rows.append({"url": url, "status": None, "error": str(err)[:300]})

print(json.dumps(rows, indent=2))
bad = [r for r in rows if r.get("status") not in {200, 204, 301, 302, 303, 307, 308}]
raise SystemExit(1 if bad else 0)
