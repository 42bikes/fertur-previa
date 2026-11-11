# Fertur — proposta de página

Página construída sobre o clone-kit para apresentar à **Fertur Transporte e Turismo** (Itacaré, BA)
uma versão própria da landing page. Marca, serviços e contatos vêm do site atual do cliente.

Servir com:

```bash
python -m http.server 4392 --bind 127.0.0.1
```

## O que veio do cliente (`fertur.com.br/br`)

- Nome: Fertur Transporte e Turismo — Itacaré, Bahia
- Telefone/WhatsApp de reservas: (73) 99987-4058
- E-mails: comercial@fertur.com.br · contato@fertur.com.br · financeiro@fertur.com.br
- Endereço: Av. Castro Alves, 11 — Centro/Orla, Itacaré/BA
- Serviços: traslados, excursões, passeios, serviços exclusivos, vans com motorista
- Frota declarada: G. Siena até 2 pax (ida/volta) e Sprinter até 15 lugares
- Passeios: Jeribucaçu (citada no New York Times), 4 Praias com Cachoeira de Tijuípe
  (van + caminhada de ~20 min), Passeio das Ilhas na Baía de Camamu
- Redes: facebook.com/FerturTransporte · instagram.com/ferturtransporte
- Paleta capturada: verde `#0a4727`, verde profundo `#052715`, amarelo `#fcac18`

## O que é placeholder (trocar antes de publicar)

- **Fotos**: Unsplash, não são de Itacaré. Substituir pelas fotos reais do cliente em
  `assets/img/` mantendo os nomes dos arquivos.
- **Preços**: todos como "Sob consulta" — a página atual não publica valores.
- **Não há depoimentos nem notas inventadas**: a seção de prova social aponta para as avaliações
  reais no Facebook. Se o cliente autorizar depoimentos, é só reintroduzir o bloco.
- **Logo**: wordmark recriado em texto ("Fer" + "tur"), não é o arquivo oficial.
- Formulários apenas emitem aviso na tela; não há backend.

## Ajustes de design feitos sobre o clone-kit

- Amarelo da marca virou cor de **preenchimento** (botões, badges), com texto verde-escuro:
  amarelo sobre branco não passa contraste para texto.
- Criada a variável `--accent-ink` (verde `#0b7a3e`) para eyebrows, títulos manuscritos e labels.
- Sombras, linhas e rodapé recoloriados do navy/laranja original para verde, sem deixar resíduo.
- Seção de depoimentos substituída por "Por que a Fertur" (4 cards) + link para avaliações reais.
- Faixa de números usa apenas dados verificáveis: 15 lugares, 2 modelos, 3 passeios, base na Orla.

## Verificação

`verify.py` em 1440/768/390: 0 erros de console, 0 requisições falhas, 0 imagens quebradas,
0 px de overflow, 1 `<h1>`. Altura: 4.640 px no desktop, 8.040 px no mobile.
