# Fertur — prévia de página

Página única de demonstração para a **Fertur Transporte e Turismo** (Itacaré, BA), construída a
partir do DNA visual do site atual do cliente — verde profundo, amarelo e fotos de praia — com
conteúdo, serviços e contatos reais.

> **Não é o site oficial da Fertur.** É uma proposta/demonstração. Serviços, telefone, e-mails e
> endereço foram retirados do site público do cliente; fotos são de banco de imagens (Unsplash) e
> os formulários não enviam dados.

## Rodar localmente

```bash
python -m http.server 4392 --bind 127.0.0.1
# abra http://127.0.0.1:4392/
```

Também funciona abrindo `index.html` direto — não há build, dependência ou framework.

## Estrutura

```
index.html      página completa (hero, serviços, passeios, prova social, contato)
styles.css      tokens de cor/tipografia no :root; responsivo em 1080/760/420
main.js         menu, reveal, contadores, filtro de passeios, formulário de demonstração
assets/img/     5 fotos locais (Unsplash)
assets/favicon.svg
NOTES.md        o que veio do cliente, o que é placeholder e o que mudar antes de publicar
```

## Estado funcional

- Filtro de passeios, slider/contadores e menu mobile funcionando.
- Formulários **não** têm backend: exibem um aviso de demonstração.
- Sem motor de reserva, pagamento ou calendário — a reserva segue por telefone/WhatsApp.

## Antes de publicar para o cliente

1. Trocar as fotos de `assets/img/` pelas fotos reais da Fertur (mesmos nomes de arquivo).
2. Substituir o wordmark recriado pela logo oficial.
3. Definir preços (hoje todos "sob consulta", como no site atual).
4. Autorização por escrito para uso da marca em URL pública.

Fotos: [Unsplash](https://unsplash.com). Referência de design: template Traveel.
