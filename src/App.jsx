import { useState } from "react";

const TC = {
  g:{l:"📐 Gann·Fib·Jensen", bg:"rgba(255,200,50,.08)",  b:"#ffc832", d:"#ffe080"},
  n:{l:"🌕 Lua",             bg:"rgba(200,180,120,.08)", b:"#c8b478", d:"#f0d080"},
  w:{l:"🌒 Waxing Window",   bg:"rgba(80,200,160,.08)",  b:"#50c8a0", d:"#70e0b8"},
  m:{l:"☿ Mercúrio",        bg:"rgba(100,200,220,.08)", b:"#64c8dc", d:"#90e0f0"},
  v:{l:"♀ Vénus",           bg:"rgba(255,180,220,.08)", b:"#ffb0d0", d:"#ffcce0"},
  e:{l:"🌑 Eclipse",        bg:"rgba(220,80,80,.08)",   b:"#dc5050", d:"#ff7070"},
  r:{l:"℞ Retrógrado",      bg:"rgba(180,80,220,.08)",  b:"#b450dc", d:"#d070ff"},
  b:{l:"♂ Marte Helio",     bg:"rgba(220,100,60,.08)",  b:"#dc6440", d:"#ff8060"},
  p:{l:"📅 Pesavento",      bg:"rgba(80,200,80,.08)",   b:"#50c850", d:"#70e870"},
};

const D = {
VISAO:{l:"Visão Geral 2026",e:[
  {w:"ESTRUTURA ANUAL",t:"g",e:"📊 7 Frameworks Integrados — Leitura do ano completo",
   c:"ATH: 6 Out 2025. Sources: Gann (ângulos/9 semanas/144d/8 datas solares), Jensen (88d×5, J-S trine/quintiles/Node), Pesavento (sazonais 108a, Venus conjunções 99/101 ciclos, Moon vs Sign 730 ciclos), Bayer (dinner table), Mercury declinação OOB/JPL, Fibonacci 89/144/233/377, eclipses NASA/JPL. Nota: cada evento = mudança de probabilidade, não certeza. Inversão possível em 10-15% (20 Years Gann)."},
  {w:"BACKDROP PERMANENTE",t:"g",e:"⚠️ Nodo Norte em QUADRATURA 270° a 9°Gémeos (Jensen) — TODO O ANO",
   c:"Jensen p.79: '7°-9°Gémeos = ponto crítico único. Quadraturas do Nodo = mínimos majorais.' Nodo em Peixes 19°→1° durante 2026. Orb mais exacto: Julho (0.6°). Histórico: crashes de 1961, 1970, 1979 coincidiram com este padrão. Backdrop de pressão de fundo persistente que reforça a Fall Crash Zone do Q4."},
  {w:"Jan – Mar 28",t:"p",e:"FASE 1 — Ides of March: BEARISH (Pesavento 108 anos)",
   c:"Pesavento: janela bearish Feb 2–Mar 28. Aquário/Peixes. Waxing square ao natal EUA. Acção típica: retestes de suporte, consolidação. Dentro desta janela: Mercury Retro Feb 26–Mar 20, Gann/Fib/Jensen 144d cluster Feb 27, Solar Eclipse Feb 17, Lunar Eclipse Mar 3, Mars Helio 90° do ATH Mar 10. Estratégia: comprar na fraqueza no final da fase para o April Rally que se segue."},
  {w:"Mar 28 – Abr 16",t:"p",e:"FASE 2 — April Earnings Rally: BULLISH (Pesavento)",
   c:"Pesavento: Áries/Touro. Waning square natal EUA. Q1 earnings. SOBREPOSIÇÃO DO CLUSTER MAIS BULLISH DO ANO: Jupiter SEXTILE Uranus (Mar 28–Abr 6) — Jensen: 100% win rate em 28 casos históricos. + Jensen 2×88d Mar 31 + Full Moon Abr 1 + Gann 180° Abr 6 + Mars Helio 90° Mar 26. Cinco sistemas independentes em 9 dias."},
  {w:"Abr 16 – Jun 26",t:"p",e:"FASE 3 — Sell in May: BEARISH (Pesavento)",
   c:"Pesavento: Touro/Gémeos/Cancro. 2+ meses de declínio. Contracorrente bullish: Venus/Jupiter May 7 (99 ciclos Pesavento) — cuidado com falsos breakouts a partir desta data. Mars Helio 135° May 21 = pressão adicional. Mercury Retro começa Jun 29 no final da fase. Gestão: shortear rebounds, evitar longs agressivos excepto em datas de alta confluência."},
  {w:"Jun 15",t:"g",e:"⭐⭐⭐⭐⭐ PIVÔ DE FUNDO MÁXIMO DO ANO — New Moon in GEMINI",
   c:"Pesavento: Moon in Gemini = BOTTOM ABSOLUTO (730 ciclos S&P 1950-presente). + New Moon + Mercury Greatest Elongation 24.5°E (clareza narrativa) + Gann 4×9 semanas (2+5+2=9) + Moon Perigee Jun 14 (357km). Cinco sistemas independentes apontam para o fundo mais significativo do calendário. Bottom médio Pesavento: NM -1 dia. Alta probabilidade de reversão bullish nesta janela."},
  {w:"Jun 26 – Set 4",t:"p",e:"FASE 4 — Summer Rally: BULLISH (Pesavento)",
   c:"Pesavento: Cancro/Leão/Virgem. Conjunção ao Sol natal EUA. Rally fiável de ~2 meses. Abre coincidindo com Jensen 3×88d Jun 27 + Full Moon Jun 29. Mercury Direct Jul 23 clarifica narrativa. Venus Greatest Elongation Ago 15 (45.9°E) = pico de sentimento de risco = potencial zona de distribuição dentro do rally. Mars Helio 180° Ago 6 = pressão pontual dentro do rally — cuidado com falso pico."},
  {w:"Set 4 – Out 27",t:"p",e:"🔴 FASE 5 — FALL CRASH ZONE: RISCO EXTREMO (Pesavento 108 anos)",
   c:"Pesavento: Virgem/Libra/Escorpião. A janela de máximo risco do calendário. Crashes históricos: 1907, 1929, 1937, 1957, 1987, 2001, 2002, 2008. Em 2026 sobrecarregada ao máximo: Venus Retro Out 3, Venus/Saturn bearish Out 11 (101 ciclos), Mercury Retro Out 24, Venus IC Out 24, Gann 360° Out 6, Mars 225° Nov 2. ÚNICO contrapeso: Jupiter-Saturn TRINE 120° Set 24 (Jensen bullish) — possível rebound técnico forte dentro da queda."},
  {w:"Set 23–24",t:"g",e:"⭐ CONTRADIÇÃO INTERNA: Jensen Trine BULLISH vs Pesavento CRASH ZONE",
   c:"Set 23: Jensen 4×88d = Gann Equinócio (EXACTO). Set 24: Jupiter-Saturn Trine 120° EXACTO (Jensen: 'bullish, serene, expansion urge'). Dentro da Fall Crash Zone. Leitura: rebound técnico forte e rápido dentro de queda maior. Não confundir com inversão estrutural da tendência. Histórico Jensen: Trine + Node crítico = massive low + recuperação 15-18 meses subsequente."},
  {w:"Out 27 – Dez 8",t:"p",e:"FASE 6 — Santa Claus Rally: BULLISH (Pesavento)",
   c:"Pesavento: Escorpião/Sagitário. Gains fiáveis mas modestos. Recuperação pós-crash. Em 2026 reforçado por: Mercury Direct Nov 13 + Venus Direct Nov 14 = dois planetas a retomar movimento directo na mesma semana → momentum de recuperação potencialmente acima da média. Jupiter Sinódico 399d + New Moon Nov 9 = primeiro sinal bullish pós-crash."},
  {w:"Dez 20 – Jan 7",t:"p",e:"FASE 7 — January Effect: BULLISH (Pesavento)",
   c:"Pesavento: Capricórnio. Oposição ao Sol natal EUA. Sharp, strong rally. Cluster de fecho: Venus/Jupiter bullish Dez 29 (99 ciclos) + Jensen 5×88d Dez 20 + Gann 7×9 semanas = Solstício Dez 21 (EXACTO) + Mercury OOB Sul Dez 30 (−24.85°, extremo do ano). Recuperação para rematar o ciclo anual."},
  {w:"MARTE 2026",t:"b",e:"♂ Mars Heliocêntrico — 4 ângulos críticos do ATH calculados JPL",
   c:"Mars helio posição no ATH (Oct 6 2025): 236.0°. Ângulos 2026 calculados via ephem/JPL: 90° (quadratura) Mar 10 = bearish; 135° (sesquiquadrado) May 21 = bearish; 180° (oposição) Ago 6 = bearish; 225° (waning sesquiquadrado) Nov 2 = bearish. Sign changes: Capricórnio Jan 1, Aquário Jan 29, Peixes Mar 19, Áries Mai 7, Touro Jun 25, Gémeos Ago 13, Cancro Out 15, Leão Dez 17. Gann: 'Dois dos três sistemas de preço são IMPOSSÍVEIS sem os planetas.'"},
  {w:"BAYER — Dinner Table",t:"b",e:"🍽️ Posição no ciclo de Bayer (Egg of Columbus, 1942)",
   c:"Bayer: ATH Out 2025 = fim do pescoço do pássaro (neck/champagne) ou início de cheese & crackers. Em 2026 = fase de eliminação bear (p. e s. repetidos). Sinal de compra: quando a tongue (língua para baixo) estiver completa — pequenos movimentos sem direcção clara (olives, onions, radishes). O fish bull (primeiro impulso real) começa depois do soup period. Nunca comprar no topo do pássaro — esperar pela tongue formation. Ciclo completo tongue→tongue = 1 a 3 anos."},
  {w:"REGRAS OPERACIONAIS",t:"g",e:"📐 Playbook integrado — 7 frameworks",
   c:"1. NEVER add to a losing position (Pesavento rule #1). 2. TIME > PRICE > VOLUME (Gann Master Time Factor). 3. Usar sempre stop (Jensen, Pesavento). 4. Risco máximo 10% da conta por trade (Gann). 5. Cada ⭐⭐⭐+ = zoom in para timing exacto com lunar cycle. 6. Bear market inverts NM/FM signals — verificar contexto macro (Pesavento). 7. A inversão é sempre possível (10-15%): a confluência define a ZONA, o price action define a DIRECÇÃO. 8. BTC = instrumento específico — adaptar todos os frameworks à sua vibração individual (20 Years Gann: 1 em 30 instrumentos é o certo para cada trader)."},
]},

JAN:{l:"Janeiro",e:[
  {w:"ANO TODO",t:"g",e:"⚠️ BACKDROP: Nodo Norte em QUADRATURA 270° a 9°Gémeos (Jensen) — todo o ano",c:"Jensen: quadraturas do Nodo ao ponto crítico = mínimos majorais históricos. Orb exacto: Julho (0.6°). Ver tab VISÃO GERAL para análise completa."},
  {w:"Jan 2", t:"g",e:"Jensen 1×88d Mercury Orbital",c:"1×88d do ATH. 1d antes de Full Moon Supermoon."},
  {w:"Jan 3", t:"g",e:"⭐ Fib 89d = Full Moon Supermoon (Wolf Moon)",c:"Fib 89 dias do ATH coincide exactamente com a Wolf Moon Supermoon. Zero dias de diferença."},
  {w:"Jan 5", t:"g",e:"📐 Gann 90° (91.3d)",c:"1.º ângulo cardinal. 9+0=9."},
  {w:"Jan 6", t:"v",e:"♀ Venus Superior Conjunction + ☿ Mercury Aphelion",c:"Vénus inicia aparição vespertina. Mercúrio mais lento do ano."},
  {w:"Jan 7", t:"m",e:"☿ Mercury Declinação PICO SUL −24.38° ⚡ OOB",c:"Out of Bounds Sul. Comportamento imprevisível de narrativa/sentiment."},
  {w:"Jan 10",t:"g",e:"♃ Jupiter Opposition — PRIMARY BULL SIGNAL (Jensen)",c:"Jensen: Jupiter+Uranus favorável = ganhos em 28/28 casos desde 1896. Jupiter-Saturn ~108° → pré-trígono bullish crescente."},
  {w:"Jan 18",t:"n",e:"New Moon + Mercury-Mars Conjunction",c:"Compressão → break impulsivo."},
  {w:"Jan 22",t:"v",e:"♀ Venus Aphelion",c:"Vénus mais afastada do Sol."},
  {w:"Jan 29",t:"n",e:"Moon Perigee (365.878 km)",c:"Amplificação de volatilidade."},
  {w:"Feb 2", t:"p",e:"📅 INÍCIO Ides of March — BEARISH (Pesavento)",c:"Janela bearish Feb 2–Mar 28. Aquário/Peixes. 108+ anos de dados."},
]},

FEB:{l:"Fevereiro",e:[
  {w:"Feb 1", t:"n",e:"Full Moon (Snow Moon)",c:"Pico emocional + teste de liquidez."},
  {w:"Feb 3", t:"g",e:"📐 Gann Annual — 15° Aquário",c:"1.ª das 8 datas solares anuais de Gann."},
  {w:"Feb 9", t:"g",e:"📐 Gann 2×9 semanas (126d)",c:"2.º segmento de 9 semanas."},
  {w:"Feb 17",t:"e",e:"☀ Solar Eclipse New Moon (Anular) — Break de Regime",c:"Amplificação máxima de ciclo lunar. Impulso pós-eclipse potencialmente violento."},
  {w:"Feb 19",t:"g",e:"⭐⭐⭐ Gann 135° × Mercury Perihelion × Greatest Elongation (18.1°E)",c:"3 sistemas independentes no mesmo dia. 1+3+5=9."},
  {w:"Feb 24",t:"v",e:"♀ Venus CONJUNCT Saturn — BEARISH ⭐ [101 ciclos Pesavento]",c:"Pesavento: Venus/Saturn = mercado desce para a conjunção. 101 ciclos verificados. Diferença angular 0.8° (JPL). Dentro de Ides of March bearish."},
  {w:"Feb 24",t:"n",e:"Moon Perigee (370.132 km)",c:"Amplificação leve."},
  {w:"Feb 26",t:"r",e:"☿ Mercury Station Retrograde (22°33' Peixes)",c:"Início de ruído narrativo, retestes, falsos breakouts."},
  {w:"Feb 27",t:"g",e:"⭐⭐⭐ Gann 144d = Fib 144d = Jensen Biquintile 144°",c:"Tripla exacta: Gann temporal + Fibonacci + Jensen ('THE triggering aspect', p.135). Zona de gatilho de reversão. 1d após Mercury Retro."},
]},

MAR:{l:"Março",e:[
  {w:"Mar 1", t:"m",e:"☿ Mercury Declinação PLATEAU −0.16° (equador, retrogrado)",c:"Não é um pico — plateau quasi-plano durante o retrógrado. Delta 0.21°."},
  {w:"Mar 3", t:"e",e:"🌑 Lunar Eclipse Full Moon (Total — Blood Moon)",c:"Pivô emocional/exaustão. 14d após Solar Eclipse = cluster eclipse duplo."},
  {w:"Mar 7", t:"m",e:"☿ Mercury Cazimi (16°52' Peixes)",c:"Clareza intensa no meio do retrógrado."},
  {w:"Mar 10",t:"b",e:"♂ Mars Helio 90° do ATH — QUADRATURA BEARISH [JPL]",c:"Gann: squaring price with planets — dois sistemas são IMPOSSÍVEIS sem planetas. Mars a 90° helio do ponto ATH. Coincide com Mercury Retro + Ides of March bearish + Nodo quadratura Jensen. Pressão múltipla."},
  {w:"Mar 19",t:"n",e:"New Moon ✏️ (era Mar 18)",c:"Setup de compressão."},
  {w:"Mar 20",t:"g",e:"📐 Gann Annual 0° Áries + ☿ Mercury Station Direct",c:"Equinócio Vernal + Mercury Direct. Ponto de viragem narrativo."},
  {w:"Mar 22",t:"n",e:"Moon Perigee (366.858 km) ✏️ (era Mar 12)",c:"Reações amplificadas."},
  {w:"Mar 27",t:"m",e:"☿ Mercury Declinação PICO SUL −8.11°",c:"7d após Mercury Direct. Narrativa defensiva."},
  {w:"Mar 28",t:"p",e:"📅 FIM Ides of March + INÍCIO April Earnings Rally — BULLISH (Pesavento)",c:"Janela bullish Mar 28–Abr 16. Áries/Touro. Q1 earnings."},
  {w:"Mar 28–Abr 6",t:"g",e:"⭐⭐⭐⭐⭐ Jupiter SEXTILE Uranus — Jensen: 28/28 BULLISH (100%)",c:"Jensen: desde 1896 Jupiter-Uranus aspecto favorável = ganhos em TODOS os 28 casos. + Jensen 2×88d (Mar 31) + Full Moon (Abr 1) + Gann 180° (Abr 6) + Mars Helio (Mar 26). 5 sistemas em 9 dias."},
  {w:"Mar 31",t:"g",e:"Jensen 2×88d Mercury Orbital",c:"2×88=176d do ATH. 1d antes de Full Moon Pink Moon."},
]},

APR:{l:"Abril",e:[
  {w:"Apr 1", t:"n",e:"Full Moon (Pink Moon)",c:"Confirmação emocional."},
  {w:"Apr 3", t:"m",e:"☿ Mercury Greatest Elongation (27.8°W) + Aphelion",c:"Mercúrio estrela da manhã + Aphelion."},
  {w:"Apr 6", t:"g",e:"📐 Gann 180° — PONTO MÉDIO ⚡",c:"182.6d do ATH. 1+8+0=9. MEIO ANO. Maior pressão angular do ciclo."},
  {w:"Apr 13",t:"g",e:"📐 Gann 3×9 semanas (189d)",c:"7d após Gann 180° — cluster de inflexão."},
  {w:"Apr 16",t:"p",e:"📅 FIM April Earnings Rally + INÍCIO 'Sell in May' — BEARISH (Pesavento)",c:"'Sell in May' Abr 16–Jun 26. Touro/Gémeos/Cancro. 2+ meses de declínio."},
  {w:"Apr 17",t:"n",e:"New Moon",c:"Compressão."},
  {w:"Apr 19",t:"n",e:"Moon Perigee (361.631 km)",c:"Amplificação."},
  {w:"Apr 20",t:"m",e:"☿ Mercury Cruzamento Equador S→N",c:"Mudança de regime narrativo."},
]},

MAY:{l:"Maio",e:[
  {w:"May 1", t:"n",e:"Full Moon (Flower Moon — Microlua/Apogee)",c:"Pico de liquidez. Volatilidade amortecida."},
  {w:"May 5", t:"g",e:"📐 Gann Annual — 15° Touro",c:"2.ª data solar anual."},
  {w:"May 7", t:"v",e:"♀ Venus CONJUNCT Jupiter — BULLISH ⭐ [99 ciclos Pesavento]",c:"Pesavento: Venus/Jupiter = mercado sobe. 99 ciclos verificados. Diferença 1.0° (JPL). ATENÇÃO: dentro de 'Sell in May' bearish — contracorrente. Resultado depende do contexto técnico."},
  {w:"May 14",t:"m",e:"☿ Mercury Superior Conjunction ✏️ (era 'Cazimi' — ERRADO)",c:"Mercúrio oculto — narrativa bloqueada. Não é Cazimi."},
  {w:"May 15",t:"v",e:"♀ Venus Perihelion",c:"Vénus mais próxima do Sol — intensidade máxima."},
  {w:"May 16",t:"n",e:"New Moon + Super New Moon (Perigee 358.074 km)",c:"Compressão. Perigee real de Maio."},
  {w:"May 21",t:"b",e:"♂ Mars Helio 135° do ATH — Sesquiquadrado BEARISH [JPL]",c:"Mars 135° helio do ponto ATH. 1+3+5=9. Pressão bearish adicional dentro de 'Sell in May'."},
  {w:"May 22",t:"g",e:"📐 Gann 225° (228.3d)",c:"2+2+5=9. 5.º ângulo de 45°."},
  {w:"May 27",t:"g",e:"🌀 Fibonacci 233 dias",c:"Fib 233d."},
  {w:"May 31",t:"n",e:"Full Moon Blue Moon (Apogee) ✏️ (era 'Perigee' — ERRADO)",c:"2.ª lua cheia de Maio. É APOGEE — volatilidade amortecida."},
]},

JUN:{l:"Junho",e:[
  {w:"Jun 2", t:"m",e:"☿ Mercury Declinação PICO NORTE +25.60° ⚡ OOB",c:"O pico mais extremo Norte do ano. Out of Bounds."},
  {w:"Jun 14",t:"n",e:"Moon Perigee (357.196 km) ✏️ (era Jun 12)",c:"Impulso de volatilidade pré-New Moon."},
  {w:"Jun 15",t:"g",e:"⭐⭐⭐⭐⭐ New Moon + Mercury Elongation + Gann 4×9w 🌑 Moon in GEMINI = BOTTOM ABSOLUTO",c:"PESAVENTO: Moon in Gemini = BOTTOM ABSOLUTO (730 ciclos S&P 1950-presente). + New Moon + Mercury Greatest Elongation 24.5°E + Gann 36 semanas (2+5+2=9) + Perigee Jun 14. O sinal de fundo mais poderoso do ano — 5 frameworks independentes."},
  {w:"Jun 17",t:"v",e:"♀ Venus 0.3°S of Moon (OCULTAÇÃO)",c:"Evento raro. Disrupção de sentimento."},
  {w:"Jun 21",t:"g",e:"📐 Gann Annual — 0° Cancro (Solstício Verão)",c:"3.ª data solar anual. Cardinal point."},
  {w:"Jun 26",t:"p",e:"📅 FIM 'Sell in May' + INÍCIO Summer Rally — BULLISH (Pesavento)",c:"Summer Rally Jun 26–Set 4. Cancro/Leão/Virgem. Rally fiável ~2 meses. Coincide com Jensen 3×88d Jun 27 + Full Moon/Mercury Retro Jun 29."},
  {w:"Jun 27",t:"g",e:"Jensen 3×88d Mercury Orbital",c:"3×88=264d do ATH. 2d antes de Full Moon + Mercury Station Retro."},
  {w:"Jun 29",t:"r",e:"Full Moon Strawberry + ☿ Mercury Station Retrograde",c:"Pico emocional + início de ruído."},
]},

JUL:{l:"Julho",e:[
  {w:"Jul (Mês)",t:"g",e:"⭐ Nodo Norte em QUADRATURA EXACTA 0.6° a 9°Gémeos — pico do ano",c:"Jensen: quadratura do Nodo = mínimos majorais. Orb mais exacto do ano em Julho. Contexto: Mercury Direct Jul 23 + Full Moon Jul 29."},
  {w:"Jul 1", t:"m",e:"☿ Mercury Aphelion",c:"Mercúrio mais lento do ano (2.ª vez)."},
  {w:"Jul 6", t:"g",e:"📐 Gann 270° (273.9d)",c:"2+7+0=9. 6.º ângulo."},
  {w:"Jul 12",t:"m",e:"☿ Mercury Cazimi in Cancer + Declinação PLATEAU +17.05° (delta 0.05°)",c:"2.º Cazimi. Clareza intensa. Plateau quasi-plano, não pico abrupto."},
  {w:"Jul 14",t:"n",e:"New Moon",c:"Compressão."},
  {w:"Jul 21",t:"g",e:"📐 Gann 2×144 dias (288d)",c:"2+8+8=18→9."},
  {w:"Jul 23",t:"m",e:"☿ Mercury Station Direct (16°19' Cancro)",c:"Clareza de narrativa regressa."},
  {w:"Jul 29",t:"n",e:"Full Moon (Buck Moon)",c:"Teste emocional."},
]},

AUG:{l:"Agosto",e:[
  {w:"Aug 2", t:"m",e:"☿ Mercury Greatest Elongation (19.5°W)",c:"Estrela da manhã."},
  {w:"Aug 6", t:"b",e:"♂ Mars Helio 180° do ATH — OPOSIÇÃO BEARISH ⚠️ [JPL]",c:"Mars a 180° helio do ponto ATH. Pressão bearish dentro do Summer Rally. Coincide com Gann Annual Ago 7 (1 dia) — cluster de pressão dentro do rally. Zona de topo potencial ou retest."},
  {w:"Aug 7", t:"g",e:"📐 Gann Annual — 15° Leão + ☿ Mercury Declinação PICO NORTE +20.32°",c:"4.ª data solar de Gann coincide com pico Norte de declinação."},
  {w:"Aug 12",t:"e",e:"☀ Solar Eclipse New Moon (Total) — visível Europa/N.África",c:"Eclipse Total. Mais potente que o de Fevereiro. Cluster de regime change."},
  {w:"Aug 14",t:"m",e:"☿ Mercury Perihelion (3.º do ano)",c:"Velocidade narrativa máxima."},
  {w:"Aug 15",t:"v",e:"⭐ ♀ Venus Greatest Elongation (45.9°E) ← PICO DE SENTIMENTO DO ANO",c:"Visibilidade máxima. Dias 3–5 após Eclipse Solar: impulso inicial amplificado + Venus no pico = confluência rara. Zona de distribuição potencial."},
  {w:"Aug 17",t:"g",e:"📐 Gann 5×9 semanas (315d)",c:"3+1+5=9. Cluster com Venus Greatest Elongation."},
  {w:"Aug 21",t:"g",e:"📐 Gann 315° (319.6d)",c:"7.º ângulo de 45°."},
  {w:"Aug 28",t:"e",e:"🌑 Lunar Eclipse Partial (96%)",c:"Pivô emocional."},
  {w:"Aug 31",t:"v",e:"♀ Venus Pre-Retrograde Shadow (22°52' Libra)",c:"Sentimento começa a questionar-se."},
]},

SEP:{l:"Setembro",e:[
  {w:"Set 4", t:"p",e:"📅 FIM Summer Rally + INÍCIO ⚠️ FALL CRASH ZONE (Pesavento) — RISCO EXTREMO",c:"Pesavento: Set 4–Out 27. A janela de máximo risco do calendário. Crashes históricos: 1907, 1929, 1937, 1957, 1987, 2001, 2002, 2008. Em 2026 sobrecarregada: Venus Retro, Venus/Saturn bearish, Mercury Retro, Venus IC, Gann 360°."},
  {w:"Sep 6", t:"n",e:"Moon Perigee (368.255 km)",c:"Subida de volatilidade."},
  {w:"Sep 11",t:"n",e:"New Moon",c:"Compressão."},
  {w:"Sep 12",t:"m",e:"☿ Mercury Cruzamento Equador N→S",c:"Mudança de regime narrativo."},
  {w:"Sep 14",t:"v",e:"♀ Venus 0.5°S of Moon (OCULTAÇÃO)",c:"2.ª ocultação de Vénus."},
  {w:"Sep 23",t:"g",e:"⭐ EXACTO: Jensen 4×88d = Gann Annual Equinócio Outono",c:"4×88=352d do ATH = 23 Set = Equinócio. ZERO dias de diferença. Jensen + Gann + Astronómico."},
  {w:"Sep 24",t:"g",e:"⭐ Jupiter-Saturn TRINE 120° EXACTO — BULLISH Jensen ⚠️ dentro Fall Crash Zone",c:"Jensen: trine = bullish, expansion urge. Calculado JPL. Dentro Fall Crash Zone. Leitura: rebound técnico forte dentro de queda maior — não inversão estrutural."},
  {w:"Sep 27",t:"n",e:"Full Moon",c:"Pico emocional dentro da Fall Crash Zone."},
]},

OCT:{l:"Outubro",e:[
  {w:"Oct 1", t:"n",e:"Moon Perigee (369.338 km)",c:"Amplificação."},
  {w:"Oct 3", t:"r",e:"♀ Venus Station Retrograde (8°29' Escorpião) ➕",c:"VÉNUS RETRÓGRADO 41 dias. Ausente do ficheiro original. Sentimento de valor em reset."},
  {w:"Oct 6", t:"g",e:"📐 Gann 360° — FECHO DO CICLO ANUAL ⚡ O MAIS CRÍTICO DO ANO",c:"365.25d do ATH. 3+6+0=9. CICLO COMPLETO. Gann Master Time Factor: 'When the time cycle is up, neither Democrat, Republican nor President can stem the tide. Action = reaction in opposite direction.' Dentro Fall Crash Zone. Confluência máxima bearish."},
  {w:"Oct 10",t:"n",e:"New Moon 🌑 Moon in LIBRA — TOP SIGNAL (Pesavento)",c:"Pesavento: Moon in Libra = TOP ABSOLUTO (730 ciclos). QE-era: top passou para Virgem. Dentro da Fall Crash Zone = sinal de topo dentro de zona bearish — potencial de queda acelerada."},
  {w:"Oct 11",t:"v",e:"♀ Venus CONJUNCT Saturn — BEARISH ⭐ [101 ciclos] ⚠️ Fall Crash Zone",c:"Pesavento: Venus/Saturn = mercado desce. 2.ª conjunção bearish. Diferença 1.8° (JPL). Dentro Fall Crash Zone + Venus Retrograde. Tripla pressão bearish."},
  {w:"Oct 12",t:"m",e:"☿ Mercury Greatest Elongation (25.2°E)",c:"Mercury estrela da tarde."},
  {w:"Oct 18",t:"g",e:"🌀 Fibonacci 377 dias",c:"Fib 377d. 1d antes de Gann 54w."},
  {w:"Oct 19",t:"g",e:"📐 Gann 6×9 semanas (378d)",c:"3+7+8=18→9. Cluster com Fib 377."},
  {w:"Oct 23",t:"m",e:"☿ Mercury Declinação PICO SUL −20.96°",c:"Alta amplitude. 1d antes de Mercury Retro + Venus IC."},
  {w:"Oct 24",t:"r",e:"⭐ ☿ Mercury Retro + ♀ Venus IC — DUPLO RETROGRADE ⚠️ Fall Crash Zone",c:"BAYER: Venus IC = 291 dias após Venus SC (Jan 6) = meio ciclo sinódico de Venus (584d). + Mercury Station Retro simultâneo. Ruído máximo + valor em reset. Gann 360° (Out 6) + Duplo Retro + Bayer."},
  {w:"Oct 26",t:"n",e:"Full Moon Hunter's Moon ✏️ (era Oct 25)",c:"Pivô emocional dentro da Fall Crash Zone."},
  {w:"Oct 27",t:"p",e:"📅 FIM ⚠️ Fall Crash Zone + INÍCIO Santa Claus Rally (Pesavento)",c:"Fall Crash Zone termina. Início de Santa Claus Rally. Em 2026 coincide com aproximação de Venus Direct (Nov 14) + Mercury Direct (Nov 13)."},
  {w:"Oct 28",t:"n",e:"Moon Perigee (364.411 km)",c:"Impulso de volatilidade."},
]},

NOV:{l:"Novembro",e:[
  {w:"Nov 2", t:"b",e:"♂ Mars Helio 225° do ATH — Sesquiquadrado waning BEARISH [JPL]",c:"Mars 225° helio do ponto ATH. Waning sesquiquadrado. Entrada na fase descendente do ciclo heliocêntrico de Marte. Possível resistência ao bounce do Santa Claus Rally."},
  {w:"Nov 4", t:"m",e:"☿ Mercury Cazimi 3.º (12°10' Escorpião) ➕",c:"3.ª conjunção inferior. Clareza intensa. Ausente do ficheiro original."},
  {w:"Nov 7", t:"g",e:"♀ Venus Occultation + 📐 Gann Annual 15° Escorpião",c:"3.ª ocultação de Vénus + 6.ª data solar de Gann."},
  {w:"Nov 9", t:"g",e:"⭐ New Moon + ♃ Jupiter Sinódico 399d",c:"1 ciclo sinódico completo de Júpiter desde ATH. Coincide com New Moon. Jensen: Júpiter = planeta financeiro primário."},
  {w:"Nov 13",t:"m",e:"Moon Apogee + ☿ Mercury Station Direct (5°02' Escorpião)",c:"Volatilidade amortecida + clareza narrativa."},
  {w:"Nov 14",t:"v",e:"♀ Venus Station Direct (22°51' Libra) ➕",c:"Vénus retrógrado termina. Ausente do ficheiro original."},
  {w:"Nov 15",t:"m",e:"☿ Mercury Declinação PLATEAU −11.17° (delta 0.02° — raso extremo)",c:"O plateau mais raso do ano. Essencialmente estacionário em declinação."},
  {w:"Nov 20",t:"m",e:"☿ Mercury Greatest Elongation (19.6°W)",c:"Estrela da manhã — clareza plena."},
  {w:"Nov 24",t:"e",e:"Full Moon Beaver + Perigee (Supermoon)",c:"Pico emocional + volatilidade."},
]},

DEC:{l:"Dezembro",e:[
  {w:"Dec 8", t:"p",e:"📅 FIM Santa Claus Rally (Pesavento)",c:"Santa Claus Rally termina ~Dez 8."},
  {w:"Dec 9", t:"n",e:"New Moon ✏️ (era Dec 8)",c:"Compressão."},
  {w:"Dec 12",t:"g",e:"📐 Gann 3×144 dias (432d)",c:"4+3+2=9. Triplo de 144."},
  {w:"Dec 15",t:"v",e:"♀ Venus sai do Post-Retrograde Shadow",c:"Vénus totalmente normalizado."},
  {w:"Dec 20",t:"g",e:"Jensen 5×88d Mercury Orbital",c:"5×88=440d do ATH."},
  {w:"Dec 20",t:"p",e:"📅 INÍCIO January Effect — BULLISH (Pesavento)",c:"Pesavento: Jan Effect Dez 20–Jan 7. Capricórnio. 'Sharp, strong rally.' Cluster: Jensen 5×88d + Gann 7×9w + Solstício Dez 21."},
  {w:"Dec 21",t:"g",e:"⭐ EXACTO: Gann 7×9 semanas (441d) = Solstício Inverno",c:"441d do ATH. 4+4+1=9. Exactamente coincide com o Solstício."},
  {w:"Dec 24",t:"e",e:"Full Moon Cold Moon + Perigee + ☿ Mercury Aphelion (Supermoon maior do ano)",c:"Cluster forte. 356.650 km."},
  {w:"Dec 25",t:"v",e:"♀ Venus Perihelion",c:"Vénus mais próxima do Sol."},
  {w:"Dec 29",t:"v",e:"♀ Venus CONJUNCT Jupiter — BULLISH ⭐ [99 ciclos Pesavento]",c:"Pesavento: 2.ª conjunção Venus/Jupiter. 99 ciclos verificados. Diferença 1.6° (JPL). Dentro January Effect + cluster Jensen/Gann."},
  {w:"Dec 30",t:"m",e:"☿ Mercury Declinação PICO SUL −24.85° ⚡ OOB — EXTREMO DO ANO",c:"O pico de declinação mais extremo de 2026. Out of Bounds Sul."},
]},

CONF:{l:"Confluências ⭐",e:[
  {w:"INVERSÃO",t:"g",e:"⚠️ REGRA: 10-15% dos eventos INVERTEM a direcção esperada",c:"20 Years Gann + Gann Master Time Factor: a confluência define a ZONA, o price action define a DIRECÇÃO. Verificar sempre antes de assumir direcção."},
  {w:"Jan 3",    t:"g",e:"⭐⭐ Fib 89d = Full Moon Supermoon",c:"2 sistemas: Fibonacci + Pico Lunar. Zero dias de diferença."},
  {w:"Feb 19",   t:"m",e:"⭐⭐⭐ Gann 135° × Mercury Perihelion × Mercury Elongation",c:"3 sistemas independentes no mesmo dia."},
  {w:"Feb 24",   t:"v",e:"⭐⭐⭐ Venus/Saturn BEARISH × Ides of March × pré-Gann 144d",c:"Venus/Saturn (101 ciclos) + bearish sazonal + 3 dias antes de tripla de timing."},
  {w:"Feb 27",   t:"g",e:"⭐⭐⭐ Gann 144d = Fib 144d = Jensen Biquintile 144°",c:"Tripla exacta. Jensen: 'THE triggering aspect' (p.135)."},
  {w:"Mar 10",   t:"b",e:"⭐⭐⭐ Mars Helio 90° × Mercury Retro × Ides of March",c:"3 sistemas de pressão bearish simultâneos."},
  {w:"Mar 28–Abr 6",t:"g",e:"⭐⭐⭐⭐⭐ Jupiter SEXTILE Uranus × Jensen 2×88d × Full Moon × Gann 180°",c:"O cluster mais bullish do ano. Jensen: 100% win rate em 28 casos históricos. 5 sistemas em 9 dias."},
  {w:"May 21",   t:"b",e:"⭐⭐ Mars Helio 135° × 'Sell in May' bearish",c:"Pressão bearish adicional dentro da janela sazonal bearish."},
  {w:"Jun 15",   t:"g",e:"⭐⭐⭐⭐⭐ New Moon × Mercury Elongation × Gann × Moon in GEMINI = BOTTOM ABSOLUTO",c:"5 sistemas: o sinal de fundo mais poderoso do ano. Pesavento 730 ciclos."},
  {w:"Jun 29",   t:"r",e:"⭐⭐⭐ Full Moon × Mercury Retro × Jensen 3×88d",c:"Cluster de pico e reversão. Full Moon + Retro + ciclo orbital."},
  {w:"Ago 6",    t:"b",e:"⭐⭐ Mars Helio 180° × Gann Annual Ago 7",c:"Mars oposição helio dentro do Summer Rally — zona de topo/retest."},
  {w:"Ago 12",   t:"e",e:"⭐⭐ Solar Eclipse Total × Venus Greatest Elongation (Ago 15)",c:"Eclipse + pico de sentimento = potencial de regime change violento."},
  {w:"Set 4–Out 27",t:"p",e:"⚠️⚠️⚠️ FALL CRASH ZONE — RISCO EXTREMO (Pesavento 108 anos)",c:"Em 2026 sobrecarregada: Venus Retro, Venus/Saturn bearish, Mercury Retro, Venus IC duplo, Gann 360°, Mars 225°. A janela mais perigosa do ano."},
  {w:"Set 23",   t:"g",e:"⭐⭐⭐ Jensen 4×88d × Gann Equinócio — EXACTO (zero dias)",c:"2 frameworks independentes convergem com precisão absoluta."},
  {w:"Set 24",   t:"g",e:"⭐⭐⭐ Jupiter-Saturn Trine 120° × Gann Equinócio × Fall Crash Zone",c:"Jensen bullish DENTRO da Pesavento crash zone = rebound técnico dentro da queda."},
  {w:"Out 6",    t:"g",e:"⭐⭐⭐⭐ Gann 360° × Fall Crash Zone × Nodo quadratura Jensen",c:"Fecho do ciclo anual de Gann na janela mais perigosa do ano."},
  {w:"Out 11",   t:"v",e:"⭐⭐⭐ Venus/Saturn BEARISH × Fall Crash Zone × Venus Retrograde",c:"Tripla pressão bearish. Calculado JPL."},
  {w:"Out 24",   t:"r",e:"⭐⭐ Mercury Retro × Venus IC — DUPLO RETROGRADE",c:"Bayer Venus IC = meio ciclo sinódico. Ruído máximo."},
  {w:"Nov 9",    t:"g",e:"⭐⭐⭐ New Moon × Jupiter Sinódico 399d",c:"1 ciclo sinódico completo de Júpiter. Jensen: planeta financeiro primário."},
  {w:"Dez 20–21",t:"g",e:"⭐⭐⭐⭐ Jensen 5×88d × Gann 7×9w = Solstício Inverno — EXACTO",c:"4 sistemas: fecho do ano com exactidão absoluta no Solstício."},
  {w:"Dez 29",   t:"v",e:"⭐⭐⭐ Venus/Jupiter BULLISH × January Effect × Jensen 5×88d",c:"3 sistemas de expansão de fim de ano."},
  {w:"ANO TODO", t:"g",e:"⭐⭐⭐⭐ BACKDROP: Nodo Norte em QUADRATURA 270° a 9°Gémeos (Jensen) — MAJOR LOWS",c:"Jensen: quadraturas históricas do Nodo = crashes de 1961, 1970, 1979. Orb exacto: Julho (0.6°). Reforça Fall Crash Zone + Gann 360°."},
]},
};

const MONTHS = ["VISAO","JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC","CONF"];
const ML = {VISAO:"🗺 Visão Geral",JAN:"Jan",FEB:"Fev",MAR:"Mar",APR:"Abr",MAY:"Mai",JUN:"Jun",JUL:"Jul",AUG:"Ago",SEP:"Set",OCT:"Out",NOV:"Nov",DEC:"Dez",CONF:"⭐ Confluências"};

export default function App() {
  const [active, setActive] = useState("VISAO");
  const [filter, setFilter] = useState("all");
  const month = D[active];
  const isSpecial = active === "VISAO" || active === "CONF";
  const events = filter === "all" ? month.e : month.e.filter(e => e.t === filter);
  const isConfl = e => e.e.includes("⭐");
  const isFix = e => e.c.includes("✏️") || e.c.includes("➕");

  return (
    <div style={{minHeight:"100vh",background:"#060710",fontFamily:"Georgia,serif",color:"#e0d8cc",display:"flex",flexDirection:"column"}}>
      <div style={{position:"fixed",inset:0,zIndex:0,background:"radial-gradient(ellipse at 15% 20%,rgba(40,18,80,.65),transparent 50%),radial-gradient(ellipse at 85% 80%,rgba(8,28,58,.65),transparent 50%)",pointerEvents:"none"}}/>

      <header style={{position:"relative",zIndex:1,textAlign:"center",padding:"22px 16px 8px"}}>
        <p style={{fontSize:11,letterSpacing:2,color:"#a89050",margin:"0 0 5px",textTransform:"uppercase"}}>NASA · JPL · Gann · Jensen · Pesavento · Bayer · Fibonacci · ATH 6 Out 2025</p>
        <h1 style={{fontSize:"clamp(22px,5vw,38px)",fontWeight:"normal",letterSpacing:2,margin:0,background:"linear-gradient(120deg,#ffe080,#c8b060,#ffcce0,#90e0f0)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>BTC Astro-Timing 2026</h1>
        <div style={{width:40,height:1,background:"linear-gradient(90deg,transparent,#c8b060,transparent)",margin:"6px auto"}}/>
        <p style={{fontSize:11,color:"#ffe08066",margin:0}}>⭐ confluência · ✏️ corrigido · ➕ adicionado · ⚡ extremo · ⚠️ risco</p>
      </header>

      <nav style={{position:"relative",zIndex:1,display:"flex",flexWrap:"wrap",justifyContent:"center",gap:3,padding:"6px 8px 2px"}}>
        {MONTHS.map(m=>{
          const isA = active===m, isV=m==="VISAO", isC=m==="CONF";
          const hC = !isV&&!isC&&D[m].e.some(e=>isConfl(e));
          const bg = isA?(isV?"rgba(100,200,220,.18)":isC?"rgba(255,180,50,.18)":"rgba(255,200,50,.14)"):"rgba(255,255,255,.03)";
          const bd = isA?(isV?"#64c8dc":isC?"#ffb432":"#ffc832"):hC?"rgba(255,200,50,.3)":"rgba(255,255,255,.06)";
          const cl = isA?(isV?"#90e0f0":isC?"#ffb432":"#ffe080"):isV?"#64c8dc88":isC?"#ffb43255":"#555";
          return <button key={m} onClick={()=>{setActive(m);setFilter("all");}}
            style={{padding:"5px 12px",background:bg,border:`1px solid ${bd}`,borderRadius:4,color:cl,fontSize:12,letterSpacing:1,cursor:"pointer",fontFamily:"inherit"}}>
            {ML[m]}{hC&&<span style={{color:"#ffe080",fontSize:9,marginLeft:2}}>★</span>}
          </button>;
        })}
      </nav>

      {!isSpecial && (
        <div style={{position:"relative",zIndex:1,display:"flex",flexWrap:"wrap",justifyContent:"center",gap:3,padding:"3px 8px 6px"}}>
          <button onClick={()=>setFilter("all")} style={ps(filter==="all","#c8b060")}>Todos</button>
          {Object.entries(TC).map(([k,v])=><button key={k} onClick={()=>setFilter(k)} style={ps(filter===k,v.d)}>{v.l}</button>)}
        </div>
      )}

      <div style={{position:"relative",zIndex:1,textAlign:"center",marginBottom:8}}>
        <span style={{fontSize:active==="VISAO"?22:28,letterSpacing:3,color:active==="CONF"?"#ffb432":active==="VISAO"?"#90e0f0":"#c8b060",fontWeight:"normal"}}>{month.l}</span>
        {!isSpecial&&<span style={{fontSize:13,color:"#444",marginLeft:10}}>{events.length} eventos</span>}
      </div>

      <div style={{position:"relative",zIndex:1,maxWidth:700,width:"100%",margin:"0 auto",padding:"0 10px 56px",display:"flex",flexDirection:"column",gap:6}}>
        {events.length===0&&<p style={{textAlign:"center",color:"#333",padding:32}}>Sem eventos deste tipo.</p>}
        {events.map((ev,i)=>{
          const cfg=TC[ev.t]||TC.n;
          const confl=isConfl(ev), fix=isFix(ev);
          const warn=ev.e.includes("⚠️")&&!confl&&ev.t==="p";
          const bc=confl?"#ffe080":fix?"#ffa032":warn?"#ff5030":cfg.b;
          const dc=confl?"#ffe080":fix?"#ffa032":warn?"#ff7050":cfg.d;
          return (
            <div key={i} style={{background:confl?"rgba(255,220,80,.06)":warn?"rgba(255,60,20,.04)":cfg.bg,border:`1px solid ${bc}22`,borderLeft:`3px solid ${bc}`,borderRadius:5,padding:"9px 13px",display:"flex",gap:10,alignItems:"flex-start"}}>
              <div style={{minWidth:6,height:6,borderRadius:"50%",background:dc,marginTop:5,boxShadow:`0 0 5px ${dc}`,flexShrink:0}}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:2,marginBottom:2}}>
                  <span style={{fontSize:12,color:dc,letterSpacing:1.2,textTransform:"uppercase"}}>{ev.w}</span>
                  <div style={{display:"flex",gap:4}}>
                    {confl&&<span style={{fontSize:10,color:"#ffe080",border:"1px solid #ffe08044",borderRadius:2,padding:"1px 5px"}}>⭐ CONFLUÊNCIA</span>}
                    {fix&&<span style={{fontSize:10,color:"#ffa032",border:"1px solid #ffa03233",borderRadius:2,padding:"1px 5px"}}>CORRIGIDO/ADD</span>}
                    <span style={{fontSize:10,color:cfg.b,opacity:.5}}>{cfg.l}</span>
                  </div>
                </div>
                <p style={{fontSize:15,color:confl?"#ffe0b0":ev.t==="g"?"#ffe080cc":"#ddd8c8",margin:"0 0 5px",lineHeight:1.45}}>{ev.e}</p>
                <p style={{fontSize:12,color:"#5a5850",margin:0,lineHeight:1.6}}>{ev.c}</p>
              </div>
            </div>
          );
        })}
      </div>

      <footer style={{position:"relative",zIndex:1,borderTop:"1px solid rgba(255,255,255,.04)",padding:"8px",display:"flex",flexWrap:"wrap",justifyContent:"center",gap:8}}>
        {Object.entries(TC).map(([k,v])=><div key={k} style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:7,height:7,borderRadius:"50%",background:v.d}}/><span style={{fontSize:11,color:"#4a4840"}}>{v.l}</span></div>)}
      </footer>
    </div>
  );
}
function ps(a,c){return{padding:"3px 10px",background:a?`${c}18`:"transparent",border:a?`1px solid ${c}44`:"1px solid rgba(255,255,255,.04)",borderRadius:20,color:a?c:"#4a4840",fontSize:11,cursor:"pointer",fontFamily:"inherit"};}
