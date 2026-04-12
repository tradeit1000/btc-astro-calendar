import { useState, useEffect } from "react";

const TC = {
  g:{l:"📐 Gann·Fib·Jensen",bg:"rgba(255,200,50,.08)",b:"#ffc832",d:"#ffe080"},
  n:{l:"🌕 Moon",bg:"rgba(200,180,120,.08)",b:"#c8b478",d:"#f0d080"},
  w:{l:"🌒 Waxing Window",bg:"rgba(80,200,160,.08)",b:"#50c8a0",d:"#70e0b8"},
  m:{l:"☿ Mercury",bg:"rgba(100,200,220,.08)",b:"#64c8dc",d:"#90e0f0"},
  v:{l:"♀ Venus",bg:"rgba(255,180,220,.08)",b:"#ffb0d0",d:"#ffcce0"},
  e:{l:"🌑 Eclipse",bg:"rgba(220,80,80,.08)",b:"#dc5050",d:"#ff7070"},
  r:{l:"℞ Retrograde",bg:"rgba(180,80,220,.08)",b:"#b450dc",d:"#d070ff"},
  b:{l:"♂ Mars Helio",bg:"rgba(220,100,60,.08)",b:"#dc6440",d:"#ff8060"},
  p:{l:"📅 Seasonal",bg:"rgba(80,200,80,.08)",b:"#50c850",d:"#70e870"},
};

const BIAS = {
  bull:{label:"BULLISH",color:"#50e870",bg:"rgba(80,200,80,.15)",icon:"▲"},
  bear:{label:"BEARISH",color:"#ff5050",bg:"rgba(220,50,50,.15)",icon:"▼"},
  turn:{label:"TURNING POINT",color:"#ffe080",bg:"rgba(255,200,50,.15)",icon:"◆"},
  warn:{label:"EXTREME RISK",color:"#ff6030",bg:"rgba(255,80,30,.15)",icon:"⚠"},
  neut:{label:"NEUTRAL",color:"#90c0e0",bg:"rgba(80,140,200,.15)",icon:"■"},
};

const D = {

MAPA:{l:"📊 Referência Rápida",e:[]},
VISAO:{l:"Annual Overview",e:[
  {w:"ANNUAL BACKDROP",t:"g",bias:"warn",src:"Jensen — Astro-Cycles and Speculative Markets (1978) p.79",
   e:"⚠️ North Node 270° Square to 9° Gemini (Jensen) — Entire Year",
   c:"Jensen's critical national hinge. Node squares historically = major market lows. Peak orb July (0.6°).",
   why:"Jensen (pp.79,92): 7°–9° Gemini is a unique critical point for American markets. Node squares this degree = historical crashes/major lows: 1961, 1970, 1979. Node in Pisces all 2026. Persistent bearish backdrop, most intense Q3–Q4."},
  {w:"Jan→Mar 28",t:"p",bias:"bear",src:"Pesavento & Smoleny — A Trader's Guide to Financial Astrology (2015)",
   e:"PHASE 1 — Ides of March: BEARISH Seasonal",
   c:"108+ years confirm bearish window Feb 2–Mar 28. Sun in Aquarius/Pisces.",
   why:"Pesavento: Sun transit through Aquarius/Pisces = waxing square to US natal Sun in Cancer. Structural bearish pressure. Period ends with a low AFTER the Aries point (Mar 20). Key events: Mercury Retro Feb 26–Mar 20, Solar Eclipse Feb 17, Lunar Eclipse Mar 3, Mars Helio 90° Mar 10."},
  {w:"Mar 28→Apr 16",t:"p",bias:"bull",src:"Pesavento (2015) + Jensen (1978) + Gann Master Time Factor",
   e:"PHASE 2 — April Earnings Rally: BULLISH Seasonal",
   c:"Bullish seasonal Mar 28–Apr 16 overlapping the most concentrated multi-framework bullish cluster of 2026.",
   why:"Pesavento: Aries/Taurus + Q1 earnings. CLUSTER: Jupiter SEXTILE Uranus (Mar 28–Apr 6) — Jensen documented 28/28 gains (100% win rate since 1896). Simultaneously: Jensen 2×88d (Mar 31), Full Moon (Apr 1), Gann 180° (Apr 6), Mars Helio 90° (Mar 26). Five independent systems in 9 days."},
  {w:"Apr 16→Jun 26",t:"p",bias:"bear",src:"Pesavento & Smoleny (2015)",
   e:"PHASE 3 — Sell in May: BEARISH Seasonal",
   c:"Classic 2+ month bearish window. Confirmed 108+ years.",
   why:"Pesavento: Sun through Taurus/Gemini/Cancer = extended bearish window. Counterforce: Venus CONJ Jupiter Jun 10 (correct geocentric date, 99 bullish cycles) creates a countertrend bounce — use as sell-the-rally opportunity. Mars Helio 135° May 21 adds pressure."},
  {w:"Jun 15",t:"g",bias:"turn",src:"Pesavento (730 cycles) + Jensen + Gann + NASA/JPL",
   e:"⭐⭐⭐⭐⭐ STRONGEST BOTTOM SIGNAL OF THE YEAR — New Moon in Gemini",
   c:"Moon in Gemini = ABSOLUTE LOW per Pesavento (730 S&P cycles, 1950–present). Four additional frameworks confirm.",
   why:"Pesavento 730-cycle Moon vs Sign study: Gemini Moon = strongest absolute lows. Five frameworks: (1) Moon in Gemini=absolute low, (2) New Moon=bottom signal, (3) Mercury Greatest Elongation=clarity, (4) Gann 4×9 weeks, (5) Moon Perigee Jun 14 for amplification. Average bottom: New Moon −1 day."},
  {w:"Jun 26→Sep 4",t:"p",bias:"bull",src:"Pesavento & Smoleny (2015) + Jensen (1978)",
   e:"PHASE 4 — Summer Rally: BULLISH Seasonal",
   c:"Reliable 2-month bullish window. Sun conjunct US natal Sun (Cancer). Jensen 3×88d aligns at opening.",
   why:"Pesavento: Cancer/Leo/Virgo transit conjuncts US natal Sun. Jensen 3×88d (Jun 27) aligns within 1 day of opening. Mercury Direct Jul 23 clears narrative fog. WARNING: Venus Greatest Elongation Aug 15 (45.9°E) = peak sentiment zone — Mercury CONJ Jupiter same day (bullish reinforcement, double bull) but 1 week later Venus OPP Saturn Aug 22 (bearish) — watch for internal correction."},
  {w:"Sep 4→Oct 27",t:"p",bias:"warn",src:"Pesavento & Smoleny (2015) — 108 years",
   e:"🔴 PHASE 5 — FALL CRASH ZONE: EXTREME RISK",
   c:"Most dangerous seasonal window. All major historical crashes occurred Sep 4–Oct 27. In 2026 maximally loaded.",
   why:"Pesavento: crashes of 1907, 1929, 1937, 1957, 1987, 2001, 2002, 2008 all here. 2026 loading: Venus Retro Oct 3, Venus SQUARE Mars Oct 11 (near-exact 0.085°), Mercury Retro Oct 24, Venus IC Oct 24, Gann 360° Oct 6, Mars Helio 225° Nov 2. SINGLE COUNTERFORCE: Jupiter-Saturn Trine 120° Sep 24 (Jensen bullish) — likely a strong bounce within the larger decline."},
  {w:"Oct 27→Dec 8",t:"p",bias:"bull",src:"Pesavento & Smoleny (2015)",
   e:"PHASE 6 — Santa Claus Rally: BULLISH Seasonal",
   c:"Reliable gains. Scorpio/Sagittarius. Post-crash recovery.",
   why:"Pesavento: consistent gains. 2026: Mercury Direct Nov 13 + Venus Direct Nov 14 = both inner planets resuming direct in the same week — historically amplifies momentum. Jupiter synodic 399d + New Moon Nov 9 = first clean bullish signal post-crash."},
  {w:"Dec 20→Jan 7",t:"p",bias:"bull",src:"Pesavento (2015) + Jensen (1978) + Gann",
   e:"PHASE 7 — January Effect: BULLISH Seasonal",
   c:"Sharp, strong year-end rally. Capricorn. Four frameworks confirm.",
   why:"Pesavento: Capricorn transit opposing US natal Sun = one of the sharpest short-term rallies. 2026: Jensen 5×88d Dec 20, Gann 7×9w = Winter Solstice Dec 21 (exact), Mercury SQUARE Saturn Dec 31 (0.012°, most exact Mercury-Saturn of year — stark reality check into year-end), Mercury SQUARE Jupiter Dec 4 (warn sign at start of window)."},
  {w:"J-S ANGLE 2026",t:"g",bias:"bull",src:"Jensen (1978) p.69 + JPL geocentric",
   e:"♃ Jupiter-Saturn Angle 2026: 115°→128° — NO BEARISH ANGLES ALL YEAR (structural bullish backdrop)",
   c:"Jupiter-Saturn angle moves from 115° in January to 128° in October (passing through the exact 120° trine Sep 1). The angle NEVER reaches any of Jensen's bearish thresholds (18°, 72°, 90°, 150°, 180°) in 2026.",
   why:"Jensen (p.69, Ch.13): Bullish J-S angles: 27°, 60°, 120°, 162°. Bearish J-S angles: 18°, 72°, 90°, 150°, 180°. In 2026, the J-S angle moves from 115° through 120° (Sep 1 exact trine) to 128° and stays within the bullish trine territory all year. This is an important structural backdrop: unlike some bearish years where J-S forms hard angles (90° = crash in 1929, 180° = crash in 2008), in 2026 the structural J-S relationship is BULLISH (trine). The bearish forces in 2026 (Jensen Node, Pesavento Fall Crash Zone, Gann 360°) are working against a structurally bullish J-S backdrop — suggesting that any crashes may be followed by swift structural recoveries."},
  {w:"MARS HELIO",t:"b",bias:"bear",src:"Gann methodology + JPL ephem (heliocentric — correct for Mars squaring)",
   e:"♂ Mars Heliocentric — 4 Critical Angles from ATH (all bearish)",
   c:"ATH Mars position: 236.0° helio. Four geometric bearish milestones: 90° Mar 10, 135° May 21, 180° Aug 6, 225° Nov 2.",
   why:"NOTE: Mars helio angles are correctly calculated heliocentric (squaring price with planets per Gann methodology). All other planet aspects in this calendar use geocentric coordinates (standard financial astrology). The distinction: Mars helio = Gann price-squaring framework; Mercury/Venus aspects = Jensen/Pesavento geocentric framework."},
  {w:"HURST CYCLES — 10 Conceitos Core + Phasing Analysis",t:"g",bias:"neut",src:"JM Hurst — Cyclitec Cycles Course (1970s) + David Hickson — 10 Core Concepts of Hurst Cycles (Sentient Trader)",
   e:"🌀 HURST: Ciclos influenciam preço (não determinam). Troughs sincronizados, não peaks. Time Translation = conceito crítico.",
   c:"BTC ciclo de 4 anos ≈ ciclo Hurst 4.5 anos. 2026 = underlying trend NEGATIVO → peaks surgem CEDO, troughs surgem TARDE. Nominal model: 18a→9a→4.5a→2.25a→1a→6m→3m→40d→20d→10d→5d. Hurst 90% sucesso = Phasing Analysis (Cycles Course 1500págs), NÃO o Profit Magic.",
   why:"CONCEITO 10 (TIME TRANSLATION — o mais crítico): 'Peaks and troughs in PRICE are time translated — displaced in time from peaks and troughs in the actual cycle.' REGRA FUNDAMENTAL: 'When underlying trend is POSITIVE (bullish) → PEAKS occur LATE, TROUGHS occur EARLY.' 'When underlying trend is NEGATIVE (bearish) → PEAKS occur EARLY, TROUGHS occur LATE.' APLICAÇÃO BTC 2026: underlying trend é NEGATIVO (bearish) para os ciclos de curto/médio prazo. Portanto: (1) PEAKS nos rallies surgem CEDO — não aguardar pelo peak máximo de um rally; é provável que já tenha passado. (2) TROUGHS surgem TARDE — o bottom real do ciclo pode vir depois do que parece. O mínimo de Jun 15 pode ser mais tardio do que aparenta. CONCEITO 7 (TROUGHS SINCRONIZADOS): Ciclos têm troughs sincronizados, NÃO peaks. Vários ciclos convergem para criar mínimos majores — é isto que cria as oportunidades de compra. Jun 15 2026 = sincronização de múltiplos troughs de diferentes ciclos (40d, 20d, possivelmente 3m). CONCEITO 9 (UNDERLYING TREND): A underlying trend de um ciclo = soma do efeito de todos os ciclos MAIS LONGOS. Para o ciclo de 40 dias em Junho 2026: o ciclo de 4.5 anos está em fase bearish (declining from Oct 2025 ATH), o ciclo de 1 ano está bearish → underlying trend = fortemente negativo → ciclos de curto prazo esticados para BAIXO. PHASING ANALYSIS: 'Determining how long it has been since the last trough of each cycle, to estimate when the next trough will occur.' — Esta é a essência do que fazemos com as datas chave do calendário. CYCLES NEVER DISAPPEAR: 'Cycles do NOT disappear. Period. Sometimes the influence of a particular cycle is overwhelmed by another cycle.' — Relevante quando o BTC sobe mas cycles maiores continuam bearish."},
  {w:"CONTRARY THINKING — Neill + Convergência Wyckoff + Bayer",t:"g",bias:"neut",src:"Humphrey B. Neill — The Art of Contrary Thinking (1954) + convergência com Wyckoff e Bayer",
   e:"🔄 NEIL: 'When everyone thinks alike, everyone is likely to be wrong.' Sentiment máximo bearish = comprar. Máximo bullish = vender.",
   c:"Contrary Opinion = thinking tool, não sistema de previsão. Wishful thinking é o maior inimigo — leva a interpretar charts em função das emoções. TEN WAYS TO LOSE: gossip, tips, guessing, following the public, impatience, greedily waiting for top, thin margins, holding opinions wrong/right, never staying out, accepting small profits and large losses.",
   why:"Neill (1954): 'When everyone thinks alike, everyone is likely to be wrong — at least in TIMING of events.' TRAÇOS HUMANOS que tornam a teoria funcional: Hábito, Emoção, Ganância, Imitação, Contágio, Medo, Esperança, Wishful Thinking, Orgulho de opinião. LEIS PSICOLÓGICAS: 'A crowd yields to instincts which an individual acting alone represses.' 'A crowd never reasons — it accepts without proof what is suggested or asserted.' APLICAÇÃO AO BTC 2026: (1) Quando o sentiment de BTC é MÁXIMAMENTE BEARISH (capitulação final, todos a vender, fear & greed index em extremo) = momento de acumular na tongue de Bayer = Wyckoff Selling Climax. (2) Quando o sentiment é MÁXIMAMENTE BULLISH (euforia, FOMO, todos a comprar) = distribuição no champagne/nut de Bayer = Wyckoff Buying Climax. CONVERGÊNCIA: Neill = Wyckoff Composite Man pela perspectiva do investidor individual: o smart money distribui no topo (quando a crowd quer comprar) e acumula no fundo (quando a crowd quer vender). WISHFUL THINKING: 'Chart reading can be interpreted almost any way. If one is bullish at heart, his chart reading will be interpreted optimistically.' → Razão para ter o calendário OBJECTIVO com datas calculadas ANTES de ter posições abertas. Neill (1930): '10 ways to lose in Wall Street: Follow the public; Hold to your opinion right or wrong; Accept small profits and large losses.' — Eco perfeito de Wyckoff: NUNCA average down, cortar perdas curtas, deixar lucros correr."},
  {w:"BENNER'S PROPHECIES — Ciclos Económicos (1884)",t:"g",bias:"neut",src:"Samuel Benner — Benner's Prophecies of Future Ups and Downs in Prices (1884)",
   e:"📊 BENNER: Cast Iron Rule — ciclos de 8-9-10 anos em ferro-gusa + ciclos de 5-6 anos em hogs. Pânicos previstos: 1876-77 ✓ e 1891 ✓.",
   c:"Benner (agricultor do Ohio, 1884): 20 anos de observação empírica. Ciclos ~11 anos para ferro-gusa (coincide com manchas solares). Ciclos de 8 anos para fenómenos meteorológicos (cheias/secas). Ciclo Benner modernizado aponta para mínimo 2026-2027.",
   why:"Benner (1884): 'The advance and decline in the average price of pig-iron, hogs, corn, and provisions have been as alternately certain as the diurnal revolutions of the earth upon its axis.' CAST IRON RULE: 'Future ups and downs of the markets can be calculated for some years to come with as much certainty, and upon the same principle that an astronomer calculates an eclipse of the sun.' CICLOS DOCUMENTADOS: Pig-iron (ferro-gusa): ciclos de 9-10-9-8 anos em sucessão observada desde 1845. Hogs/corn: ciclos mais curtos de 5-6 anos ('while iron takes much longer'). PÂNICOS PREVISTOS E CONFIRMADOS: 1876-77 (Pânico de 1873-1877) ✓ e 1891 (Pânico de 1893) ✓. CICLO METEOROLÓGICO 8 ANOS: Cheias = 1851, 1859, 1867, 1875, 1883, 1891 (exactamente 8 anos). Secas = 1855-56, 1863-64, 1871-72, 1879, 1887-88 (8 anos). → Benner via a mesma lei nos preços e nos fenómenos naturais. O 'Benner Cycle' modernizado (popular em crypto traders): períodos de 16-18-20 entre pânicos macro. Aplicado ao BTC com início no crash 2018 (~Dec), ciclo de 8 anos aponta para 2026-27. Confirma o framework multi-ciclo do nosso calendário."},
  {w:"SENTIENT APPROACH — Know the Game + Know Yourself + Act",t:"p",bias:"neut",src:"David Hickson — Sentient Approach (3 docs) + Sentient Manifesto + ReadMeFirst",
   e:"🎯 SENTIENT: 'The secret is NOT in the software. Markets are a GAME.' 9 Action Steps. Warren Buffett: 20%/ano em 50 anos.",
   c:"3 fases: Know the Game (mercados = jogo entre players), Know Yourself (timeframe, capital, risco, recompensa, tempo disponível), Act on your Knowledge (9 passos). 'Learning to trade is like learning to play a musical instrument — requires time, practice, focused attention.'",
   why:"SENTIENT MANIFESTO VALORES CORE: (1) 'Financial markets are best understood as a GAME — not purely mathematical nor purely economic.' (2) 'A Hurst cycles analysis is NOT a crystal ball — it provides an EDGE, not because it predicts the future, but because it provides context within a framework of regularly repeating events.' (3) 'An analysis is UPDATED with each new piece of data. Referring to an analysis made in the past is of NO CONSEQUENCE.' (4) 'THE SECRET IS NOT IN THE SOFTWARE. Success is a result of knowledge, skill, and experience.' (5) 'Trading successfully is more a result of your ability to APPLY the approach, and mastering your own TRADING PSYCHOLOGY.' KNOW YOURSELF: Warren Buffett = 20%/ano em 50 anos (o melhor investidor do mundo). Trader activo com mais tempo dedicado pode superar isto — mas ter noção realista. KNOW THE GAME: 'What REALLY moves prices are those players (traders) doing everything they can to get the prices they want. Buyers want to bring prices DOWN. Sellers want to drive prices UP.' 'The media treats markets as places where nerds with mathematics degrees calculate true value — The truth is a little different.' RESULTADOS DOCUMENTADOS: Participante nos workshops originais de Hurst (anos 70) → $2 mil milhões. Ex-floor trader CME, 40 anos a trading the cycles → quase $1 mil milhão. 9 ACTION STEPS: Análise → Compreender análise → Timeframe → Oportunidades → Position sizing → Entrar → Monitorizar → Fechar → Manter score. 'You have not made any profit while your trade is open. Profits (and losses) are made when the trade is CLOSED.'"},
  {w:"BAYER — PI (π) = Segredo Central + Dimensões das Elipses",t:"g",bias:"neut",src:"George Bayer — The Egg of Columbus (1942) p.3-4 e p.13 — original scan completo",
   e:"🥧 PI (π = 3.14159) é o segredo matemático de Bayer. As elipses têm tamanhos específicos para cada fase.",
   c:"Foreword p.3: 'The entire problem can be solved with one single letter: Π (pi, 3.1415953).' Elipses: Tongue = metade de uma elipse. Fish = 6 inch. Bird+neck = 9 inch. Disposal bear move = 6, 9, 12 ou 18 inch. Tamanho da tongue PREVÊ o tamanho do próximo ciclo bull.",
   why:"BAYER (foreword p.3, original scan): Estava a trabalhar em timing intraday preciso ao oitavo exacto de preço. O Pi é o elemento matemático subjacente a TODOS os seus ciclos — as elipses são matematicamente definidas por Pi. O ciclo de Venus de 584 dias × Pi dá proporções específicas. DIMENSÕES DAS ELIPSES (p.13): 'The tongue takes half an ellipse; the fish takes a 6 inch, the bird (gap) can take a 9 inch, whereas the bird alone might be satisfied with a 6 inch size ellipse. The disposal bear move takes a 6, 9, even 12 or 18 inch ellipse, depending upon the size of the dinner, whereby the first p. can be a 6 inch ellipse with a comeback of half an ellipse when the hill of s. is made, following by another p. and a s. and a p. and a s., etc., until all intake is thoroughly disposed which can be seen ONLY when the tongue sticks out downwards.' TAMANHO DA TONGUE (p.13): 'The size of the move (always applicable to any commodity or active stock) depends upon the size of the tongue that sticks out.' → Para BTC 2026: Se tongue for profunda ($40-50K) = próximo bull MAIOR. Se rasa ($60K) = próximo bull mais limitado. CICLO REAL DO TRIGO 1940-41 (p.13-18): Tongue May 27–Aug 16 1940. Soup Aug 16–26. Fish Aug 26–Nov 18. White wine Nov 18–Feb 17 1941. Bird Feb 18–Sep 12 1941. Champagne Sep 1–12. Nut gap Oct 2-3. Tongue Oct 26–Nov 26. REGRA CRÍTICA (p.17): 'We cannot use counts of days: this part takes 10 days, therefore next cycle also takes 10 days. WE WOULD BE ALL WRONG.' As proporções mantêm-se, as durações absolutas variam. FORMA não PONTOS (p.19): 'We never work with points (cents profit) but with forms of the picture. Bear this constantly in your mind!'"},
  {w:"BAYER — Regras Completas Mesa de Jantar",t:"g",bias:"bear",src:"George Bayer — The Egg of Columbus (1942) p.15-18",
   e:"🍽️ BAYER COMPLETO: Regras Operacionais Exactas — TONGUE (comprar) → FISH → BIRD → NECK → CHAMPAGNE (vender) → NUT (short)",
   c:"Ciclo completo = 1-3 anos. Comprar na TONGUE (fraqueza/mínimo). Vender após CHAMPAGNE+NUT. Short após ALMONDS (discharge). BTC 2026: entre nut (ATH) e próxima tongue (Out 2026-Abr 2027). Rallies bear = fish/birds pequenos que terminam com champagne+almond.",
   why:"BAYER CICLO COMPLETO — TRIGO 1940-1941 (exemplo real): TONGUE=27Mai-16Ago1940(81dias, olives/pickles/gaps); SOUP=16-26Ago1940(10 dias, sweating for longs); FISH=26Ago-18Nov1940(83 dias, começa pelo RABO não pela cabeça, 3 bocas de mouth no final=GASPING=reacção vem); WHITE WINE=18Nov1940-17Fev1941(91 dias de declínio, 3 GULPS obrigatórios); BIRD=18Fev-27Jun1941(129 dias: FEET→BODY→WING1→RED WINE→WING2; body fica ABAIXO do fim das pernas!); HEART=18-19Jun1941(halfway exacto!); NECK=27Jun-31Ago1941; CHAMPAGNE=1-12Set1941(pop); CHEESE=20Set-2Out1941; NUT=2-3Out1941(gap down); DISPOSAL/P&S=a partir de 17Out1941. REGRAS ELLIPSES: Tongue=meia elipse; Fish=6 polegadas; Bird+neck=9 polegadas; Disposal bear=5,9,12 ou 18 polegadas (proporcional ao bull precedente). STUNTED BIRD: se após as pernas o corpo não sobe = bird deformado, EVITAR (ex: cocoa e pepper 1941). PROPORÇÕES: fish grande→bird grande→neck longo. WHITE WINE TEM 3 GULPS: nunca comprar no 1° ou 2° gulp. FRACTAL: os ciclos maiores têm exactamente a mesma forma que os menores. PI = SEGREDO DE BAYER: 3.14159 é usado nos cálculos de Venus (584 dias) e outros ciclos para determinar turning points. STOCK MARKET NATAL: NYSE=17 Mai 1792. NYSE do CRYPTO=BTC Genesis Block 3 Jan 2009. REGRA SUPREMA: 'NEVER work with points but with FORMS of the picture.' BAYER (p.16-18 exactos): (1) 'Best period for BUYING = during the time the TONGUE is made.' (2) 'Best time for SELLING = AFTER CHAMPAGNE has been served and a nut or two swallowed [swallow = gap downwards].' (3) 'Use WEAKNESS to BUY and STRENGTH to SELL while direction is still the same.' (4) 'Use weakness in tongue formation — NOT when fish is already in the making.' (5) 'During resting period between fish and bird, you can buy again for the bird. When bird completed, buy for neck.' (6) 'When ALMONDS appear on top, short quickly until FULL DISCHARGE has occurred — know there are SEVERAL DISCHARGES IN SUCCESSION and hanging tongue to come thereafter.' (7) 'Complete cycle tongue-to-tongue = ONE to THREE YEARS.' (8) 'These patterns repeat all the time. Sometimes fish are longer/shorter; birds bigger/fatter/deformed.' (9) 'If you dare not buy at bottom but only get pep together and buy on TOP — it is your own fault.' APLICAÇÃO BTC 2026: A fase actual é DISPOSAL = múltiplos discharges (rallies que falham) antes da tongue final. Cada rally de bear market (ex: Mar-Apr 2026) = fish/bird pequeno → quando atinge champagne/almond (extensão máxima = exaustão de compradores) = short opportunity. Wyckoff + Bayer em conjunto: Wyckoff detecta o selling climax VOLUME na tongue → Bayer confirma a posição no padrão."},
  {w:"BAYER CYCLE",t:"b",bias:"bear",src:"George Bayer — The Egg of Columbus (1942)",
   e:"🍽️ Bayer Dinner Table: Bear Disposal Phase",
   c:"ATH Oct 2025 = end of neck/champagne phase. 2026 = bear disposal. Complete cycle: 1-3 years.",
   why:"Bayer: ATH marks end of the bird's neck phase. 2026 = repeated p. and s. movements until tongue hangs down. BUY signal: downward tongue formation complete (small choppy moves = olives/onions/radishes). Never buy at the bird top — wait for tongue formation."},
  {w:"ATH PRICE CORRECTION",t:"g",bias:"warn",src:"TradingView verified + W.D. Gann methodology",
   e:"⚠️ BTC ATH = $126,272 (Oct 6, 2025) — Zodiacal position: 2° Capricorn",
   c:"O verdadeiro ATH do BTC é $126,272 em 6 Out 2025 (confirmado TradingView). $108,000 era o ATH de Dezembro 2024. Todos os cálculos de TEMPO permanecem válidos. Os cálculos de PREÇO usam $126,272.",
   why:"$126,272 mod 360 = 272° = 2° Capricorn (signo de Saturno). O ATH ocorreu no grau zodiacal do signo de Saturno — o planeta da contracção. Os 4 graus de 'squaring' do ATH são: 2°Cap (conjunção), 2°Aries (quadratura), 2°Cancer (oposição), 2°Libra (quadratura minguante). Saturn transitou exactamente 2°Aries em 3 de Março de 2026 (orb 0.03°) = Saturno a fazer squaring do grau do ATH no dia do Total Lunar Eclipse Blood Moon."},
  {w:"SQUARING PRICE COM PLANETAS",t:"g",bias:"neut",src:"W.D. Gann (Tunnel Thru Air + 20 Years Studying Gann) + JPL",
   e:"📐 METODOLOGIA: Como Fazer Square do Preço BTC com os Planetas",
   c:"Passo 1: ATH $126,272 mod 360 = 272° = 2°Capricórnio. Passo 2: Os 4 graus de squaring: Conj 272°(2°Cap), Square 2°(2°Ari), Oposição 92°(2°Can), Waning Square 182°(2°Lib). Passo 3: Planetas BEARISH (Saturno, Marte) nesses graus = sinal VENDA. Planetas BULLISH (Júpiter, Vénus) nesses graus = sinal COMPRA.",
   why:"APLICAÇÃO 2026: (1) SATURNO a 2°Aries = 3 Mar 2026 (EXACTO, orb 0.03°) = Saturno a fazer square do grau de preço do ATH no mesmo dia do Eclipse Lunar Total — tripla confluência: Eclipse + Lua em Virgem (QE peak invertido = mínimo) + Saturno squarando ATH em preço. (2) JÚPITER em Cancer em 2026 (Verão): Júpiter aproxima-se de 2°Cancer = oposição ao grau do ATH = pressão bullish máxima de Júpiter contra o nível ATH durante o Summer Rally (sinal de recuperação). (3) Tripla conjunção Apr 20 (Mercury+Mars+Saturn a 7-8°Aries): os três planetas dentro da 'sombra' do square do ATH (5-6° do grau exacto 2°Aries). (4) VENUS a 2°Libra durante Venus Retrograde (Oct-Nov 2026, Fall Crash Zone) = Venus squarando grau do ATH enquanto retrógrado. 20 Years Studying Gann: 'Dois dos três sistemas de preço do Gann no Tunnel são IMPOSSÍVEIS sem os planetas. É preciso saber fazer square do preço com os planetas.'"},
  {w:"SQUARE OF NINE — BTC NÍVEIS CHAVE",t:"g",bias:"neut",src:"W.D. Gann Square of Nine + TradingView ATH $126,272",
   e:"📐 Square of Nine: Níveis de Preço do ATH $126,272 (√355.35)",
   c:"Cada 45° = 0.5 no √preço. Rotação completa (360°) = 4 steps. Níveis críticos: $99,444 (10×), $80,286 (18×), $73,630 (21×), $69,352 (23×=ACTUAL), $67,261 (24×), $55,389 (30×), $54,000 (0°Aries exact).",
   why:"SITUAÇÃO ACTUAL (6 Abr 2026): O preço BTC ~$69,000 está exactamente entre os níveis S9 −184 steps ($69,352, 23 rotações) e −192 steps ($67,261, 24 rotações). HOJE = Gann 180° midpoint temporal. Preço = no suporte do Square of Nine. TEMPO e PREÇO estão a fazer squaring simultaneamente — o 'time=price squaring event' de Gann. NÍVEIS DE REFERÊNCIA COMPLETOS: Resistência: $72,000 (0°Aries × 200, EXACT), $80,286 (S9 18×), $99,444 (S9 10×), $126,272 (ATH). Suporte: $67,261 (S9 24×), $64,800 (0°Aries × 180 EXACT), $63,136 (ATH × 50% exact Gann 50%), $61,200 (0°Aries × 170 EXACT), $55,389 (S9 30×), $54,000 (0°Aries × 150 EXACT — zona de mínimo de ciclo). PORQUÊ $54K, $72K, $108K SÃO ESPECIAIS: São todos múltiplos exactos de 360 (0° Aries) — os graus geometricamente mais poderosos no sistema de Gann. Representam os pontos onde o Ponto de Aries 'dispara' no preço."},
  {w:"KEY DAYS — Jensen",t:"g",bias:"neut",src:"Jensen (1978) Astro-Cycles and Speculative Markets p.37",
   e:"📅 JENSEN KEY DAYS: Moon SQUARE Mercury/Mars/Venus — Curto Prazo",
   c:"Jensen (p.37): 'Key days = dias quando a Lua faz quadratura com Mercúrio, Marte ou Vénus. Se um mercado faz um máximo ou mínimo num key day, manterá a nova tendência até ao PRÓXIMO key day.' 28 key days em 2026.",
   why:"Jensen (p.37): 'In commodity markets, those days termed key days are when the Moon is in square aspect to either Mercury, Mars or Venus. If a commodity makes a high (or a low) on one key day it will maintain its new trend until the next key day. Occasionally key days develop simultaneously and thereby mark extremely critical points.' COMO USAR: (1) Marcar todos os key days no calendário mensal. (2) Quando o preço faz um turning point num key day, esperar o próximo key day antes de antecipar uma reversão da nova tendência. (3) Key days simultâneos (múltiplos no mesmo dia) = pontos EXTREMAMENTE CRÍTICOS. 2026 KEY DAYS CRÍTICOS: Mar 10-13 TRIPLA (Lua sq Marte + Mercúrio + Vénus em 4 dias — dentro do Ides of March bearish = extremely critical point); Nov 15-16 DUPLA (sq Vénus + Mercúrio — confirma o turn do Nov 9 Triple Bottom); Dec 8 (Lua sq Marte, orb 0.1° = near-exact — Jensen 5×88d cluster). Jensen: '11-day market surges (9 market days) relate to the 88-day cycle of Mercury.' Cada key day marca o início de um surge de 11 dias potencial. Jensen: 'Mercury changing signs is a powerful market factor.'"},
  {w:"GRAUS CRÍTICOS — Jensen",t:"g",bias:"neut",src:"Jensen (1978) p.58-59 — Tabela de Graus Críticos",
   e:"📐 JENSEN CRITICAL DEGREES: Planetas nestes graus têm efeitos intensificados",
   c:"Cardinais 1°,13°,26° | Fixos 9°,21° | Mutáveis 4°,17°. Planetas (ou cúspides) nestes graus têm efeitos intensificados. 2026 eventos críticos: Feb 26 Saturno 1°Áries; Jun 11 Saturno 13°Áries + Júpiter 26°Cancer + Mercúrio 13°Cancer (TRIPLA!); Aug 13 Marte 1°Cancer; Oct 15 Júpiter 21°Leo + Marte 9°Leo.",
   why:"Jensen (p.58): 'Planets or house cusps in these degrees have intensified effects.' GRAUS POR MODALIDADE: Cardinais (Áries,Cancer,Libra,Cap): 1°, 13°, 26°. Fixos (Touro,Leão,Escorpião,Aquário): 9°, 21°. Mutáveis (Gémeos,Virgem,Sag,Peixes): 4°, 17°. 2026 EVENTOS NOTÁVEIS: (1) FEB 26: Saturno a 1°Áries (Cardinal critical) — o planeta do squaring do ATH num grau crítico, 5 dias antes do square exacto com o ATH em Mar 3. Sinal antecipador do turning point. (2) JUN 11: TRÊS planetas em graus críticos simultaneamente — Saturno 13°Áries (Cardinal), Júpiter 26°Cancer (Cardinal), Mercúrio 13°Cancer (Cardinal) — 4 dias antes do maior bottom signal do ano (Jun 15, 6 frameworks). Jensen: 'Occasionally key days develop simultaneously and thereby mark extremely critical points.' (3) AUG 13: Marte a 1°Cancer (Cardinal critical) — dentro do cluster Aug 15 double bullish. Marte (planet of action) no grau cardinal crítico confirma a acção de mercado prevista. (4) OCT 15: Júpiter 21°Leo + Marte 9°Leo (ambos Fixed critical degrees) — dentro da Fall Crash Zone. Dois planetas em graus críticos fixos = volatilidade extrema esperada."},
  {w:"MOON vs SIGN — QE Era (Pesavento)",t:"n",bias:"neut",src:"Pesavento Cap.11, 61 ciclos pós-2009 vs 730 ciclos 1950-present",
   e:"🌕 MOON vs SIGN QE: Lua em Virgem = PEAK | Lua em Escorpião = LOW ABSOLUTO — ciclo de 2 semanas",
   c:"QE era (2009-present, 61 ciclos): Absolute LOW = Lua em Escorpião. Absolute PEAK = Lua em Virgem. Long-term (1950-present, 730 ciclos): LOW = Lua em Gémeos/Cap; PEAK = Lua em Libra. O QE deslocou os extremos 1 signo para a esquerda.",
   why:"Pesavento Cap.11 Fig.11.5: '1950-present peak = Libra. Since 2009 QE era: the absolute peak from the 1950-present cycle occurred in the sign of Libra. Now since 2009 the market tends to peak a couple of days EARLIER in the sign of Virgo — peak shifted left by one sign.' E: 'The absolute low has now shifted to the end of the sign of Scorpio.' IMPLICAÇÕES 2026: (1) 1 Abr = Lua Cheia em Virgem = PEAK QE era → confirma declínio que se seguiu. (2) 7-8 Nov = Moon entra Escorpião = LOW QE era → confirma Nov 9 NM Escorpião = triple bottom. (3) Oct 7 = Moon em Virgem = PEAK QE (Fall Crash Zone → top local antes da queda para Oct 12). (4) Oct 12 = Moon em Escorpião = LOW QE (dentro da Fall Crash Zone → convergência máxima bearish). DATAS MOON-SIGN QE 2026: Jan 7 Virgo PEAK, Jan 11 Scorpio LOW; Mar 3 Virgo PEAK, Mar 7 Scorpio LOW; Apr 1 Virgo PEAK (Lua Cheia!), Apr 4 Scorpio LOW; Jun 20 Virgo PEAK, Jun 24 Scorpio LOW; Aug 13 Virgo PEAK, Aug 18 Scorpio LOW; Sep 10 Virgo PEAK, Sep 14 Scorpio LOW; Oct 7 Virgo PEAK, Oct 12 Scorpio LOW; Nov 3 Virgo PEAK, Nov 8 Scorpio LOW; Dec 1 Virgo PEAK, Dec 5 Scorpio LOW. Nota: Moon vs Sign adiciona uma camada de ~2 semanas de timing dentro dos ciclos mensais maiores."},
  {w:"MOON vs SIGN — QE Era (Pesavento)",t:"n",bias:"neut",src:"Pesavento Cap.11 Fig.11.5 — 61 ciclos QE vs 730 ciclos 1950-present",
   e:"🌕 MOON vs SIGN QE: Lua em VIRGEM = PEAK | Lua em ESCORPIÃO = LOW ABSOLUTO (ciclo a cada ~2 semanas)",
   c:"QE era (2009, 61 ciclos): Absolute LOW = Lua em Escorpião. Absolute PEAK = Lua em Virgem. Long-term (1950, 730 ciclos): LOW = Gémeos/Cap; PEAK = Libra. O QE deslocou os extremos 1 signo para a esquerda. Datas 2026: Virgem PEAK = Jan7,Feb3,Mar3,Apr1(Lua Cheia!),Apr26,May23,Jun20,Jul17,Aug13,Sep10,Oct7,Nov3,Dec1,Dec28. Escorpião LOW = Jan11,Feb8,Mar7,Apr4,May1,May28,Jun24,Jul22,Aug18,Sep14,Oct12,Nov8,Dec5.",
   why:"BEAR MARKET INVERSION (CRÍTICO — Pesavento p.20, 1,583 ciclos): Em bear markets a polaridade INVERTE: 'In bear markets, the polarity inverts: the New Moon marks a TOP and the Full Moon marks a BOTTOM. Confirmed during the 1970-1980 bear market and the 2005-2013 period (which included the 2008-2009 bear market).' IMPLICAÇÃO 2026 (bear market): NM = TOPO LOCAL do rally, não bottom. FM = FUNDO LOCAL. NM Nov 9 em contexto bearish = topo local do rally Oct 27 – Nov 9; bottom absoluto pode vir DEPOIS (durante FM ~23 Nov). JANELA ÓPTIMA NM: Comprar 3 dias ANTES da NM, vender 14 dias APÓS (1,583 ciclos, win rate 56%). Average bottom day = 1 dia ANTES da NM (SD = 1.7 dias). Em bull market: buy NM, sell FM. Em bear market: sell NM, cover FM. Pesavento (p.150-151, Cap.11): 'Since 2009 the market tends to peak a couple of days earlier in the sign of Virgo — the peak shifted to the left by one sign. The absolute low has now shifted to the end of the sign of Scorpio.' CONFIRMAÇÕES 2026: (1) Apr 1 = Lua Cheia em VIRGEM = PEAK QE era → confirmado: queda desde Apr 3. (2) Nov 8-9 = Moon em ESCORPIÃO + NM = LOW QE ABSOLUTO → confirma triple bottom Nov 9. (3) Oct 7 = Moon entra VIRGEM = PEAK local (Fall Crash Zone) → top local antes de queda para Oct 12. (4) Oct 12 = Moon em ESCORPIÃO = LOW QE (Fall Crash + Gann 360° cluster → máxima convergência bearish da zona crash). MECANISMO: O Moon vs Sign QE adiciona uma camada de timing de ~2 semanas dentro dos ciclos mensais maiores. Usar para afinação de entradas e saídas dentro de cada seasonal."},
  {w:"MOON por SIGNO — QE Era (Pesavento)",t:"p",bias:"neut",src:"Pesavento Cap.11 — Moon vs Sign QE cycle (61 ciclos desde 2009)",
   e:"🌕 MOON POR SIGNO — Era QE: Lua em ESCORPIÃO = absolute low (comprar). Lua em VIRGEM = absolute peak (vender). Diferente do ciclo de longo prazo (1950+).",
   c:"QE era (61 ciclos): Absolute LOW = Lua em Escorpião. Absolute PEAK = Lua em Virgem. Relativo alto: Touro/Gémeos, Peixes, Sagitário. Relativo baixo: Câncer, Capricórnio. Long-term (730 ciclos 1950+): peak=Libra, low=Gémeos. O QE deslocou os picos/vales um signo para a esquerda.",
   why:"Pesavento Cap.11, Fig.11.5 (61 ciclos QE 2009-2015): 'Since quantitative easing, the absolute peak from the 1950-present cycle occurred in Libra. Now since 2009 the market tends to peak a couple of days earlier in the sign of VIRGO (shifted left by one sign). The absolute low has now shifted to the end of the sign of SCORPIO.' APLICAÇÃO PRÁTICA 2026: (1) Verificar o signo da Lua em cada turning point astrológico. (2) Se Lua em Escorpião = amplificação da baixa → oportunidade de compra na zona. (3) Se Lua em Virgem = amplificação da alta → oportunidade de venda. (4) Relative highs: quando Lua em Touro/Gémeos, Peixes ou Sagitário. (5) Relative lows: quando Lua em Câncer ou Capricórnio. NOTA: Evento de 1 Abr 2026 — Lua Cheia em VIRGEM → absolute peak QE → confirma declínio de 7 dias de 1-10 Abr (Pesavento Moon vs Sun pattern). CROSSCHECK com Jensen Key Days: overlapping Lua em Escorpião + Jensen Key Day = zona de compra dupla. Overlapping Lua em Virgem + Jensen Key Day = zona de venda dupla."},
  {w:"BEAR MARKET INVERSION — LN/LC em Bear Markets",t:"n",bias:"warn",src:"Pesavento Master Summary (Feb 2026) p.20 + A Trader's Guide Financial Astrology Cap.11",
   e:"⚠️ INVERSÃO CRÍTICA: Em bear markets a Lua Nova marca um TOP e a Lua Cheia marca um BOTTOM",
   c:"Em bear markets (1970-1980, 2005-2013, incluindo 2008-2009), a polaridade inverte. LN = top potencial. LC = bottom potencial. 2026 é bear market — usar com inversão. Signo da Lua é mais fiável: Virgem = peak, Escorpião = low (robusto em qualquer contexto).",
   why:"Pesavento Master Summary (p.20): 'In bear markets, the polarity inverts: the New Moon marks a TOP and the Full Moon marks a BOTTOM. This was confirmed during the 1970-1980 bear market and the 2005-2013 period (which included the 2008-2009 bear market).' IMPLICAÇÃO 2026: BTC está em bear market desde ATH Out 2025. A LN/LC ainda marca turning points — mas a direcção pode estar invertida. Estratégia correcta: (1) Priorizar o signo da Lua sobre a fase lunar (Virgem = peak, Escorpião = low — mais robusto em qualquer contexto de mercado). (2) Usar LN/LC como confirmadores de timing dos turning points, não como indicadores de direcção. (3) Sempre confirmar com seasonal + aspectos exteriores (Jupiter/Saturn backdrop). FRAMEWORK DOS 4 PASSOS (Pesavento, p.38-39): Step 1: Seasonal solar anual. Step 2: Aspectos de planetas exteriores (Jupiter expansão, Saturn contracção). Step 3: Fase lunar. Step 4: Signo da Lua. 'When all four align in the same direction = HIGH-CONFIDENCE SIGNAL.' Aplicado a Nov 8-9 2026: (1) Santa Claus rally, (2) J-S trine bullish, (3) NM = turning point, (4) Escorpião = low QE → TODOS APONTAM PARA BOTTOM!"},
  {w:"MOON vs SUN — Ciclo QE (Pesavento)",t:"p",bias:"neut",src:"Pesavento & Smoleny — A Trader's Guide to Financial Astrology (2015) Cap.11 — 43 ciclos desde 2009",
   e:"📐 Padrão Moon vs Sun era QE: Peak +2 dias após Lua Cheia, Bottom −5 dias antes da próxima Lua Nova",
   c:"Pesavento (43 ciclos QE): Peak do ciclo ocorre 2 dias DEPOIS da Lua Cheia. Bottom ocorre 5 dias ANTES da próxima Lua Nova. Declínio de 7 dias entre peak e bottom. Aplicar este padrão a cada ciclo lunar de 2026 para timing de curto prazo.",
   why:"Pesavento Cap.11, 43 ciclos pós-2009 (QE era): Sequência completa do ciclo de 29.5 dias: (1) Peak 1 dia ANTES da Lua Nova; (2) Declínio 5 dias APÓS LN; (3) Rally 3 dias; (4) Peak 7 dias ANTES da Lua Cheia; (5) Drop 2 dias ANTES da LC; (6) Rally 4 dias → PEAK 2 dias APÓS LC; (7) DECLÍNIO 7 DIAS; (8) BOTTOM 5 dias ANTES da próxima LN; (9) Rally até 1 dia antes da LN. CONTRASTE com ciclo long-term (1885-present, 730+ ciclos): peak 3 dias APÓS LC. IMPLICAÇÃO 2026: Em mercado bearish, usar este padrão para timing de shorts (entrar perto do peak de +2 dias após LC) e longs de curto prazo (bottom de −5 dias antes da LN). Sempre no contexto do seasonal bearish/bullish. LN de Áries (~17 Abr): bottom esperado ~12 Abr → rally curto até ~16 Abr → Apr 16 = início do Sell in May bearish."},
  {w:"WYCKOFF — Sistema Completo (25 Secções)",t:"g",bias:"neut",src:"Richard D. Wyckoff — The Wyckoff Method of Trading and Investing in Stocks (1931-1937) — 25 Secções",
   e:"📊 WYCKOFF COMPLETO: Lei do Supply/Demand + 4 Fases + 9 Testes + Volume + Stops + Filosofia",
   c:"Lei fundamental: Supply vs Demand determina todos os preços. 4 fases: I.Accumulation, II.Marking Up, III.Distribution, IV.Marking Down. BTC em Fase IV. Composite Man/Operator = smart money que opera por trás das cenas. NUNCA perguntar ao broker a sua opinião. NUNCA media para baixo. Stop em TODAS as posições.",
   why:"PRINCÍPIOS OPERACIONAIS WYCKOFF (extractos directos): 'The Basic Law of Supply and Demand governed all price changes.' 'Discard: tips, rumors, news items, reports, dividend rates, politics, fundamental statistics.' 'Study charts from the viewpoint of the behavior of the stock; the motives of those dominant in it.' COMPOSITE MAN: 'The market should be studied as if result of ONE MAN's operations. He manipulates stocks to your disadvantage if you do not understand the game, and to your great profit if you do.' VOLUME PRINCÍPIOS: (1) 'Abnormal volume appearing AFTER a price movement = end or approaching end of that movement.' (2) 'Abnormal volume when BREAKING THROUGH a trading range = continuation in direction of break.' (3) 'Volume NOT increasing on rallies = bullish trend NOT convincing.' HALF-WAY REACTION: 'After a 10-point rise, normal reaction = 5 points. Less than half = strength. More than half = weakness.' DEAD CENTER/HINGE: apex of wedge, volume minimal = 'preparing for immediate sharp move.' SPRINGBOARD: 'When operator completed accumulation and ready to let stock advance — the BEST time to take a long position.' STOPS: (1) 'The first rule in successful trading: CUT LOSSES SHORT.' (2) 'NEVER abandon the use of stop orders.' (3) 'Thirty million people thought they were safe in 1929. Very few used stops. Several lost $100,000,000.' (4) Place at ODD FRACTIONS not round numbers. 3:1 RULE: 'Estimated probable profit must outbalance risk by at least THREE TO ONE before ANY commitment.' PYRAMIDING: Only on 'almost positive evidence of important move.' Stop on every additional lot. NEVER AVERAGE DOWN: 'Never increase your line when a trade goes against you.' POSIÇÃO NEUTRA: 'When in doubt, get out! Nothing clarifies the mind more than to be neutral — out of the market. A trader is biased by his open trades. If he is long, he thinks stocks should rise BECAUSE he is long.' PACIÊNCIA: 'Livermore said he became a big and successful trader only when he learned to hold his position through rallies or reactions until he had SOUND REASONS for closing.' GOAL: '20% to 45% or more per annum is not an unreasonable goal.'"},
  {w:"WYCKOFF — Sistema Completo (26 Secções)",t:"g",bias:"neut",src:"Richard D. Wyckoff — The Wyckoff Method of Trading and Investing in Stocks (1931-1937) — Curso Completo",
   e:"📊 WYCKOFF: 4 Fases + 9 Testes de Compra/Venda + Stop Orders + Filosofia — BTC em Fase IV (Marking Down)",
   c:"9 BUYING TESTS: (1)Objective down, (2)Volume bullish, (3)Prelim Support, (4)Stronger than market, (5)Stride broken, (6)Higher supports, (7)Higher tops, (8)Base forming, (9)Profit≥3×Risk. BTC em Fase IV. Springboard em $54K-$63K se confirmado por volume. STOP ORDERS: NUNCA abandonar. Colocar imediatamente. Min 3:1 R/R antes de entrar.",
   why:"WYCKOFF CURSO COMPLETO (26 secções, 1931-1937). 4 FASES: I.Accumulation → II.Marking Up → III.Distribution → IV.Marking Down. BTC actual: Fase IV desde ATH Oct 2025. 9 BUYING TESTS (Sect.20M): (1)Objective accomplished on down side — figure chart, (2)Activity BULLISH — volume crescente em rallies, decrescente em reacções, (3)Preliminary Support — volume+figure chart, (4)Stronger than market — responde a rallies, resiste a reacções, (5)Downward Stride BROKEN — supply lines penetradas, (6)Higher Supports, (7)Higher Tops, (8)Base Forming — figure chart, (9)Estimated probable profit exceeds risk by min. 3:1. 9 SELLING TESTS (invertidos): Activity BEARISH, Weaker than market, Upward Stride BROKEN, Lower Tops, Lower Supports, Crown Forming. STOP ORDERS (Sect.23M): 'The first rule: CUT LOSSES SHORT.' (E.H.Harriman). 'NEVER abandon the use of stop orders. Thirty million people thought they could not lose in 1929. Very few used stop orders.' Colocar IMEDIATAMENTE. Nunca alterar para aumentar risco. Não usar números redondos (63 5/8, não 64). VOLUME RULES: Volume anormal após movimento prolongado = FIM do movimento. Volume anormal ao quebrar trading range = CONTINUAÇÃO. Pequeno volume em bottom = bullish (falta de pressão). TERMINAL SHAKE-OUT (Sect.21M): movimento brusco para baixo perto do FIM da acumulação — propósito: assustar holders, apanhar stops, encorajar short selling. Após o shake-out: smart money fecha a bag e o preço recupera rapidamente. DEAD CENTER/HINGE: preço converge para apex com volume mínimo → preparação para movimento forte ('stock stepping on springboard'). FILOSOFIA (Sect.25M): 'A stock market operator must be as hard boiled as a five-minute egg; cold blooded as a fish; deaf to all gossip; blind to news; and dumb as a door knob when it comes to discussing the market with others.' 'When in doubt, get out!' 'Do not aim to make a killing — 20% to 45% per annum is not unreasonable.' 'DO NOT MIX YOUR METHODS.' BTC APPLICATION: Wyckoff confirma turning points astrológicos via volume. Astrologia diz QUANDO é provável — Wyckoff diz COMO confirmar que está a acontecer. Springboard BTC esperado: $54K-$63K (Gann 50% + S9 + 0°Aries) SE acompanhado de climax de venda (volume extremo) + rally subsequente com volume crescente."},
  {w:"JENSEN — Biquintile + 11-day Surges + BTC Combo",t:"g",bias:"neut",src:"Jensen (1978) p.64 — Biquintile group + p.127 — 11-day surges",
   e:"📐 JENSEN: Biquintile (144°) = action trigger | 11-day surge | BTC = Uranus+Jupiter+Pluto",
   c:"Biquintile (144°) = grupo de acção segundo apenas às conjunções às cúspides angulares. 11-day market surges (9 market days) relacionam-se com o ciclo de 88 dias de Mercúrio. Bitcoin = Uranus (tecnologia) + Jupiter (fiat money) + Pluto (transformação de poder).",
   why:"Jensen (p.64): 'The generally ignored biquintile group are the action triggering group, second only to conjunctions to the 1st, 4th, 7th and 10th house cusps.' → Jun 15 2026 tem JUPITER QUINTILE URANUS (0.04°!) — Jensen identificou especificamente estes aspectos como 'action triggering'. Quintile = 72°, Biquintile = 144°, Sub-quintile = 36°. Jensen (p.127): 'Markets stage price surges of 11 CALENDAR DAYS (9 MARKET DAYS) which relates to the 88 day cycle of Mercury interlaced with the 365° and 28° and 91° factors.' → Após Jun 15 bottom signal: contar 11 dias = Jun 26 = início do Summer Rally (Pesavento). Confirma! Jensen (p.83): 'Each commodity has its own combination of one or two of Jupiter/Saturn/Uranus PLUS either Mercury, Venus, or Mars.' → Para BTC/crypto: Uranus (regente Aquário = tecnologia, surpresa, wild swings, internet) + Jupiter (fiat money, impressão de dinheiro, expansão) + Pluto (transformação, poder, structured change). Saturn = contracção do BTC. Mercury changing signs = 'powerful market factor' para cada mudança."},
  {w:"KEY DAYS — Jensen",t:"g",bias:"neut",src:"Jensen (1978) Astro-Cycles p.37",
   e:"📅 JENSEN KEY DAYS: Moon SQUARE Mercury/Mars/Venus — Turning Points de Curto Prazo",
   c:"Jensen p.37: 'Key days = Moon square Mercury, Mars ou Venus. Se mercado faz high ou low num key day, mantém nova tendência até ao próximo key day.' 28 key days em 2026. Key days simultâneos = extremely critical points.",
   why:"COMO USAR: (1) Marcar todos os key days mensais. (2) Turning point num key day = nova tendência dura até ao próximo key day. (3) MÚLTIPLOS key days em simultâneo = extremely critical points (Jensen). 2026 CLUSTERS CRÍTICOS: Mar 10-13 TRIPLA (Moon sq Marte+Mercúrio+Vénus em 4 dias — Ides of March + Venus CONJ Saturn bearish); Nov 15-16 DUPLA (sq Vénus+Mercúrio — confirma Nov 9 Triple Bottom); Dec 8 (Lua sq Marte orb 0.1° = near-exact — Jensen 5×88d cluster). COMPLEMENTO: '11-day market surges (9 market days) relate to the 88-day Mercury cycle.' — Jensen p.127. Key days marcam início de surges de 11 dias. 'Mercury changing signs is a powerful market factor.' — Jensen p.37."},
  {w:"JENSEN TRABALHOU PARA GANN (1930-1955)",t:"g",bias:"neut",src:"20 Years Studying Gann (2016) — descoberta histórica confirmada",
   e:"🔗 JENSEN ERA COLABORADOR DE GANN: Os sistemas de Jensen = aplicação prática directa do Master Time Factor de Gann. NÃO são sistemas independentes.",
   c:"Luther Jensen trabalhou para W.D. Gann de 1930 até à morte de Gann em 1955 (25 anos). Gann fazia previsões anuais; Jensen fazia previsões trimestrais; Bayer fazia previsões mensais. Todos baseados nos mesmos ciclos.",
   why:"'Luther Jensen worked for Gann from about 1930 to Gann's death in 1955, at which time he took a break for a couple of years, then worked for a Wall Street firm in the 1960s. Jensen died at his typewriter (1980).' — 20 Years Studying Gann (2016). IMPLICAÇÃO FUNDAMENTAL: O livro de Jensen 'Astro-Cycles and Speculative Markets' (1978) NÃO é um sistema independente — é uma extensão e aplicação directa dos métodos de Gann, refinada durante 25 anos de trabalho conjunto. Os Key Days de Jensen (Moon square Mercury/Mars/Venus) são uma aplicação prática do Master Time Factor de Gann. Os Critical Degrees de Jensen (1°,13°,26° cardinais; 9°,21° fixos; 4°,17° mutáveis) são os graus sensíveis identificados pelo sistema de Gann. '20 Years': 'Two of Gann's three price systems are IMPOSSIBLE to operate without the planets. One needs to know how to square out price with the planets.' Confirma que o squaring de preço com planetas (ATH BTC = 2°Cap, Saturn square em Mar 3 2026) é o coração do sistema de Gann aplicado ao BTC. '20 Years': 'Some attempt to skip the planetary systems but I can honestly say I do not know of anyone who is a success and has skipped them.'"},
  {w:"GRAUS CRÍTICOS — Jensen",t:"g",bias:"neut",src:"Jensen (1978) p.58-59",
   e:"📐 JENSEN CRITICAL DEGREES: Planetas nestes graus têm efeitos intensificados",
   c:"Cardinais: 1°,13°,26° | Fixos: 9°,21° | Mutáveis: 4°,17°. 2026: Feb 26 Sat 1°Áries; Jun 11 Sat 13°Áries + Jup 26°Cancer + Mer 13°Cancer (TRIPLA!); Aug 13 Mar 1°Cancer; Oct 15 Jup 21°Leo + Mar 9°Leo.",
   why:"Jensen (p.58): 'Planets or house cusps in these degrees have intensified effects.' EVENTOS 2026: (1) Feb 26: Saturno 1°Áries (Cardinal critical) = 5 dias antes do square exacto com o ATH + Blood Moon Eclipse (Mar 3). É o sinal antecipador intensificado. (2) Jun 11: TRIPLA — Saturno 13°Áries + Júpiter 26°Cancer + Mercúrio 13°Cancer = todos em Cardinal critical degrees, 4 dias antes do Jun 15 bottom signal de 6 frameworks. Os graus críticos intensificam o turning point que se aproxima. (3) Aug 13: Marte 1°Cancer (Cardinal critical) — dentro do cluster double bullish de Aug 15. (4) Oct 15: Júpiter 21°Leo + Marte 9°Leo (ambos Fixed critical) = dois planetas em graus fixos críticos dentro da Fall Crash Zone → volatilidade extrema esperada por volta de Out 15. Jensen: 'Planets in critical degrees have intensified effects.'"},
  {w:"NATAL BTC + Pesavento US Chart",t:"p",bias:"neut",src:"Pesavento Cap.10 (US Chart cardinal sensitivity) + BTC Genesis Block Jan 3 2009",
   e:"📐 BTC Natal Chart: Genesis Block 3 Jan 2009, 18:15 UTC. ATH = Plutão Natal BTC. US Chart cardinal sensitivity.",
   c:"BTC Genesis Block: 3 Jan 2009, 18:15:05 UTC. Plutão natal BTC = 1° Capricórnio (Jensen Cardinal Critical Degree). ATH BTC ($126,272) = 2° Capricórnio. ATH ocorreu exactamente no grau do Plutão natal do BTC! US Chart (4 Jul 1776): Cancer sign — sensível aos pontos cardinais.",
   why:"NATAL BTC: Pesavento: 'A birth chart of a company is determined by the first trade that the company makes on the stock exchange.' BTC Genesis Block = 3 Jan 2009, 18:15:05 UTC. Planetas natal BTC: Sol 13°Capricórnio (Jensen Cardinal Critical!), Plutão 1°Capricórnio (Jensen Cardinal Critical 1°!), Júpiter 28°Cap. O ATH de $126,272 = 2° Capricórnio (zodiacal). O ATH ocorreu no grau SEGUINTE ao Plutão natal do BTC (1°Cap). Saturno a fazer square ao ATH (Mar 3 2026) = Saturno a fazer square ao Plutão natal do BTC. Saturn square Pluto = a mais poderosa transformação de estruturas de poder na astrologia — confirma a magnitude da reversão. US CHART CARDINAL SENSITIVITY: Pesavento (p.136): 'The U.S. chart is sensitive to cardinal points. Markets tend to show lows at each of the four cardinal signs.' Para 2026: Sun entra Áries (~Mar 20, Spring Equinox) = waning square ao US Sun = LOW; Sun entra Cancer (~Jun 21) = conjunction ao US Sun = LOW antes do Summer Rally; Sun entra Libra (~Sep 22) = waxing square = CRASH SIGNAL (all major crashes occurred here); Sun entra Cap (~Dec 21) = opposition = LOW antes do January Effect. Confirma todos os Gann solar milestones do calendário via mecanismo natal diferente."},
  {w:"INSTRUMENTO ESPECÍFICO + VIBRATIONAL RANGE",t:"g",bias:"neut",src:"20 Years Studying Gann — Author's 20 years of research + Gann/Bayer stated rules",
   e:"🎯 REGRA CRÍTICA: Cada trader tem 1 instrumento 'lucky' em 30. Vibrational trading range = máximo 2-3% por trade.",
   c:"'There is a relationship between the stock/commodity you are trading and YOURSELF.' 1 em 30 instrumentos será o 'lucky' para cada trader. Gann: 'Mex Pete was like I was making the marks myself.' Máximo 10% do capital por trade. Começar com 2-3% e aumentar lentamente.",
   why:"20 Years Studying Gann: 'Their success was only applicable to ONE instrument — instrument specific!!! The minute they deviated and traded something else, losses quickly followed.' Gann states he has NEVER made money in certain stocks. VIBRATIONAL RANGE: 'An individual has a vibrational trading range and breaking that range leads to losses.' Exemplo: trader fazia lucros com $3K/trade, perdia com $6K — estava fora do frequency range. Gann's rule: 'Never trade more than 10% of your account.' PERSONAL CYCLES: 'Five months I did not trade. Transiting Saturn was making an inharmonious aspect to its natal position. When that occurs, forget all about trading.' Gann traded in 'campaigns' — períodos de tempo que sabia seriam recompensadores. 'Man has a seasonal trend — more profitable during certain months. Varies by individual. Can be timed using the natal.' MICRO-TRADING START: 'Put only 2-3% in a trade and slowly increase. You don't want to be at 10% until a couple hundred trades have been taken.' BITCOIN específico: Confirmar que BTC é o teu instrumento com 3 small trades antes de aumentar size."},
  {w:"4 STEPS FRAMEWORK — Alta Confiança (Pesavento)",t:"p",bias:"neut",src:"Pesavento Master Summary (Feb 2026) p.38-39 — 'The Complete Framework in Four Steps'",
   e:"📋 4 STEPS para alta confiança: Seasonal → Planetas Exteriores → Fase Lunar → Signo da Lua",
   c:"Quando os 4 passos apontam na mesma direcção = HIGH-CONFIDENCE SIGNAL. Nov 8-9 2026: Santa Claus + J-S trine + NM turning point + Escorpião low QE → todos apontam para bottom. Abr 1 2026: Sell in May + bearish backdrop + Lua Cheia + Virgem peak → todos apontam para peak.",
   why:"Pesavento Master Summary (p.38-39): 'THE COMPLETE FRAMEWORK IN FOUR STEPS: (1) Check the annual solar seasonal — what period of the year are we in? (2) Check major outer planet aspects — what is the backdrop? Jupiter expansion or Saturn contraction? (3) Check the current lunar phase — New Moon bottom, Full Moon peak? (4) Check the Moon's sign — Gemini/Capricorn = low, Libra/Taurus = high [long-term]; Scorpio = low, Virgo = high [QE era]. When all four align in the same direction, that is a high-confidence signal.' APLICAÇÕES 2026: ─ Nov 8-9: (1)Santa Claus bullish, (2)J-S trine exacto Sep 1 ainda activo, (3)NM turning point, (4)Moon em Escorpião = low QE → BULLISH DE ALTA CONFIANÇA → bottom do ciclo. ─ Apr 1: (1)April earnings rally mas QE-era bearish shift, (2)Triple conjunction Apr 20 bearish backdrop, (3)Lua Cheia → peak (invertida em bear = bottom?), (4)Moon em Virgem = peak QE → PEAK DE ALTA CONFIANÇA → top local confirmado. ─ Oct 7-12: (1)Fall Crash bearish, (2)Gann 360° máximo bearish, (3)Moon entra Virgem Oct 7 = peak QE, (4)Moon entra Escorpião Oct 12 = low QE dentro da crash zone → turning point de máxima concentração bearish."},
  {w:"PESAVENTO — 4-Step Framework",t:"p",bias:"neut",src:"Pesavento & Smoleny — Financial Astrology Trading Guide Master Summary (2026) p.38-39",
   e:"📐 PESAVENTO 4 PASSOS: o processo completo de decisão — quando TODOS alinham = HIGH-CONFIDENCE SIGNAL",
   c:"Step 1: Seasonal solar anual. Step 2: Planetas exteriores (Jupiter vs Saturn). Step 3: Fase lunar (NM/FM). Step 4: Signo da Lua. Quando TODOS apontam na mesma direcção = sinal de alta confiança.",
   why:"Pesavento Master Summary (p.38-39): 'THE COMPLETE FRAMEWORK IN FOUR STEPS: (1) Check the ANNUAL SOLAR SEASONAL — what period of the year? (2) Check MAJOR OUTER PLANET ASPECTS — what is the backdrop? Jupiter expansion or Saturn contraction? (3) Check the current LUNAR PHASE — New Moon bottom, Full Moon peak? (4) Check the MOON's SIGN — Gemini/Capricorn = low; Libra/Taurus = high [or QE era: Scorpio = low, Virgo = peak]. When all four align in the same direction, that is a HIGH-CONFIDENCE SIGNAL.' NET FORCE PRINCIPLE: '(1) Identify all major active transits. (2) Classify each as + or -. (3) Weight by planet size: outer planets heavier. (4) Calculate net sum: more positives = bullish bias. (5) Watch for inner planet triggers (Moon, Mercury, Venus, Mars) to fire off the dominant energy.' OUTER vs INNER: 'Outer planets fill the barn with hay; inner planets are the spark that ignites it.' APLICAÇÃO BTC HOJE (7 Abr 2026): Step 1=Ides of March (BEARISH até Mar 28, depois April Rally Mar28-Apr16, agora em Sell in May bearish), Step 2=Saturn domina em Áries (BEARISH), Step 3=Lua Minguante (declínio em curso após FM 1 Abr), Step 4=Lua em Escorpião ~Apr 4 (LOW QE era). BEAR MARKET INVERSION: Em bear markets 'New Moon marks a TOP and Full Moon marks a BOTTOM.' Confirmado 1970-1980 e 2008-2009. Logo em 2026 (bear): NM 17 Abr = possível topo local. FM = fundo local. SATURNO/URANO: 'Saturn/Uranus at 45°, 90°, or 180° = VERY NEGATIVE market reactions.' 2008 = Saturn opposite Uranus → pior crise desde 1929. SUPERCONJUNÇÃO: Longitude + Declinação alinhados = máxima potência. Eclipse Lunar Blood Moon Mar 3 = superconjunção máxima."},
  {w:"OPERATIONAL RULES",t:"g",bias:"neut",src:"Gann + Pesavento + Jensen + 20 Years Studying Gann",
   e:"📐 Integrated Playbook — 7 Frameworks",
   c:"Core trading rules from all seven frameworks.",
   why:"1. NEVER add to a losing position (Pesavento). 2. TIME > PRICE > VOLUME (Gann). 3. Always use a stop. 4. Max 10% per trade (Gann). 5. ⭐⭐⭐+ = zoom in for lunar timing. 6. Bear markets INVERT New/Full Moon signals. 7. Inversion always possible (10-15%) — confluence = WHEN, price action = DIRECTION. 8. Find your personal instrument — 1 in 30 will work for you (20 Years Studying Gann). NOTE METHODOLOGY: All Mercury/Venus aspects in this calendar use GEOCENTRIC coordinates (standard financial astrology). Mars Helio uses heliocentric (Gann squaring framework). These are different and intentionally so."},
]},

JAN:{l:"January",e:[
  {w:"All Year",t:"g",bias:"warn",src:"Jensen (1978) p.79",
   e:"⚠️ BACKDROP: North Node 270° Square to 9° Gemini — Entire Year",
   c:"Jensen's critical hinge. Squares historically = major lows. Peak orb July (0.6°).",
   why:"See Annual Overview for full analysis."},
  {w:"Jan 02",t:"m",bias:"neut",src:"JPL ephem — geocentric",
   e:"☿ Mercury SQUARE Neptune (0.665°) — Narrative Fog",
   c:"Mercury squares Neptune. Market narrative becomes confused, unclear, or driven by illusion. Sentiment based on unrealistic expectations.",
   why:"Mercury (narrative) square Neptune (illusion/dissolution) = foggy, confused communication. Market participants may be misled by incomplete or false information. Not strongly directional — acts as a noise amplifier for whatever trend is underway."},
  {w:"Jan 03",t:"g",bias:"turn",src:"Fibonacci + NASA/JPL",
   e:"⭐⭐ Fibonacci 89 Days = Full Moon Supermoon (Wolf Moon)",
   c:"Fib 89-day interval from ATH coincides exactly with Wolf Moon Supermoon. Two systems, zero offset.",
   why:"Fibonacci 89 (a Fib number) as time ratio from ATH. Simultaneous Full Moon Supermoon (Pesavento: emotional peak, 1,346-cycle study). Full Moon = market PEAK signal. Fib confirms the WHEN."},
  {w:"Jan 05",t:"g",bias:"turn",src:"Gann Master Time Factor",
   e:"📐 Gann 90° Angle (91.3d from ATH) — 1st Cardinal Milestone",
   c:"First major angular milestone. 9+0=9. Market either reverses or accelerates.",
   why:"Gann's 90° = quarter-circle from the ATH. First major geometric resistance/support point. Digit sum 9+0=9 confirms numerological framework."},
  {w:"Jan 06",t:"v",bias:"neut",src:"NASA/JPL verified",
   e:"♀ Venus Superior Conjunction + ☿ Mercury Aphelion",
   c:"Venus begins 584-day synodic cycle (SC→IC→SC). Mercury at maximum distance = slowest speed.",
   why:"Bayer's Venus SC/IC framework: the 584-day cycle from this SC to the IC (Oct 24, 2026) = exact half-cycle = Bayer turning point. Mercury Aphelion = slowest orbital velocity = slow-moving narrative events."},
  {w:"Jan 07",t:"m",bias:"warn",src:"JPL DE405 ephem calculated",
   e:"☿ Mercury Declination South Peak −24.38° ⚡ OUT OF BOUNDS",
   c:"Mercury exceeds Sun's max declination (±23°26'). OOB = unpredictable extreme market narrative.",
   why:"OOB Mercury: communication and sentiment become extreme and erratic. Three OOB events in 2026: Jan 7 (−24.38°), Jun 2 (+25.60°), Dec 30 (−24.85° — year's extreme)."},
  {w:"Jan 08",t:"v",bias:"bear",src:"Pesavento (2015) + JPL geocentric",
   e:"♀ Venus CONJUNCT Mars (0.055°) — NEAR-EXACT BEARISH",
   c:"Venus meets Mars at near-perfect 0.055° orb — essentially exact. The most precise Venus-Mars aspect of the year. Forced selling, aggressive financial conflict.",
   why:"Venus (money/possessions) + Mars (aggression/conflict) at 0.055° = financial aggression. Pesavento: hard Venus-Mars aspects = forced selling, aggressive institutional distribution. The most exact Venus-Mars of 2026. First bearish planetary signal of the year."},
  {w:"Jan 10",t:"v",bias:"warn",src:"Jensen (1978) + JPL geocentric",
   e:"♀ Venus OPPOSITION Jupiter (0.384°) — Overextension Warning",
   c:"Venus opposes Jupiter at 0.384° orb. Opposition = stress between money (Venus) and expansion (Jupiter). Inflated sentiment.",
   why:"Jensen: Jupiter at opposition = overextension and stress, not bullish. Venus-Jupiter opposition = financial sentiment stretched too far bullish — sets up for rapid sentiment reversal. Watch for an inflated optimism peak followed by sharp correction."},
  {w:"Jan 10",t:"g",bias:"bull",src:"Jensen (1978) p.36",
   e:"♃ Jupiter Opposition — Jensen PRIMARY BULL SIGNAL",
   c:"Jupiter at opposition. Jensen documented 28/28 favorable Jupiter-Uranus aspects producing gains since 1896 — 100% win rate.",
   why:"Jensen's landmark finding: every favorable Jupiter-Uranus aspect from 1896 produced market gains — zero exceptions. Jupiter Opposition = maximum brightness/potency. Jupiter-Saturn at ~108° moving toward the bullish trine (120°, exact Sep 24), supporting a growing bullish backdrop through the year."},
  {w:"Jan 14",t:"m",bias:"warn",src:"Jensen (1978) + JPL geocentric",
   e:"☿ Mercury OPPOSITION Jupiter (0.592°) — Narrative Overextension",
   c:"Mercury opposes Jupiter. Communication/narrative becomes overoptimistic — sets up for disappointment.",
   why:"Mercury (communication) OPP Jupiter (expansion/optimism) = narratives become exaggerated. Analysts overpromise. The opposition creates stress — narrative stretched too far and must correct."},
  {w:"Jan 18",t:"n",bias:"turn",src:"Pesavento (2015) — 1,583 cycles + Moon vs Sign",
   e:"New Moon 🌑 Moon in CAPRICORN — Secondary Absolute Low Signal (Pesavento)",
   c:"New Moon = bottom signal (1,583 cycles). Moon in Capricorn = secondary absolute low (consistent across QE era, 61 cycles). Double bottom signal at the start of the Ides of March bearish window.",
   why:"Pesavento's Moon vs Sign (730 cycles long-term + 61 QE-era): Capricorn = secondary absolute low, consistent across both periods. Combined with New Moon = bottom signal: double confirmation of a low. Within the Ides of March bearish seasonal — this low may be temporary (the seasonal continues to press lower) but provides a brief bounce opportunity."},
  {w:"Jan 18",t:"m",bias:"bear",src:"Jensen (1978) + JPL geocentric",
   e:"☿ Mercury CONJUNCT Mars (0.278°) — Aggressive Narrative Impulse",
   c:"Mercury meets Mars at 0.278° orb. Aggressive, impulsive market communication on the same day as New Moon.",
   why:"Mercury (communication) + Mars (aggression) = aggressive narrative events. Sharp impulsive moves driven by news shocks. Falls on New Moon day — aggressive narrative at the bottom creates a volatile turning point rather than a clean reversal."},
  {w:"Jan 20",t:"g",bias:"bull",src:"JPL geocentric — Saturn-Uranus structural aspect",
   e:"⭐⭐⭐ TRIPLE SOFT ASPECT: Saturn SEXTILE Uranus (0.016°) + Mars SEXTILE Saturn + Mars TRINE Uranus",
   c:"Saturn sextiles Uranus at near-perfect 0.016° orb — essentially exact. Mars simultaneously forms soft aspects to both (sextile Saturn 0.171° + trine Uranus 0.187°). A rare three-way soft-aspect cluster.",
   why:"Saturn SEXTILE Uranus (0.016°) is a significant slow-moving structural aspect that occurs roughly every 13 years. The sextile (60°) = constructive, cooperative energy between Saturn (structure/discipline) and Uranus (innovation/disruption). For markets: structural reform or constructive innovation — a period of orderly, productive change. Mars amplifies both simultaneously (sextile Saturn 0.171°, trine Uranus 0.187°) — aggressive energy channeled constructively through both structure and innovation. All three are in soft aspects to each other simultaneously. The net bias: BULLISH/constructive. Falls within the Ides of March bearish seasonal (Feb 2–Mar 28) — this triple soft cluster creates a countercurrent of constructive structural energy within the broader bearish seasonal context. A day of productive market development despite the bearish backdrop."},
  {w:"Jan 29",t:"n",bias:"turn",src:"NASA/JPL verified",
   e:"Moon Perigee (365,878 km) — Volatility Amplifier",
   c:"Moon at closest approach. Amplifies volatility and emotional reactions in both directions.",
   why:"Perigee Moon = stronger gravitational pull + heightened psychological response. Pesavento: perigee New/Full Moons produce the most significant turns."},
]},

FEB:{l:"February",e:[
  {w:"Feb 01",t:"n",bias:"turn",src:"Pesavento (2015) — 1,346 cycle study",
   e:"Full Moon (Snow Moon) — Emotional Peak Signal",
   c:"Full Moon = market PEAK signal. Average: 1–3 days AFTER Full Moon in bull markets. Polarity inverts in bear markets.",
   why:"Pesavento's Full Moon analysis (1,346 cycles): consistently marks the emotional high of the lunar cycle. In bull = sell zone. In bear = buy zone (polarity inverts). Always check dominant trend first."},
  {w:"Feb 03",t:"g",bias:"turn",src:"Gann Master Time Factor",
   e:"📐 Gann Annual Solar Date — 15° Aquarius (1st of 8)",
   c:"First of Gann's 8 annual solar timing dates.",
   why:"Gann: 8 key solar dates per year at critical zodiacal degrees. 15° Aquarius = midpoint between Winter Solstice and Spring Equinox — historically associated with shifts in market psychology."},
  {w:"Feb 06",t:"m",bias:"turn",src:"JPL geocentric",
   e:"☿ Mercury SQUARE Uranus (0.873°) — Sudden Narrative Disruption",
   c:"Mercury squares Uranus. Unexpected narrative disruption — sudden news or communication shock.",
   why:"Mercury-Uranus hard aspects produce sudden unexpected communication events. Squares create disruptive tension. In markets: surprise announcements or unexpected news breaking the prevailing narrative. Within the Ides of March bearish window — an internal shock that confirms or accelerates the bearish trend."},
  {w:"Feb 08",t:"v",bias:"turn",src:"JPL geocentric",
   e:"♀ Venus SQUARE Uranus (0.504°) — Sudden Value Disruption",
   c:"Venus squares Uranus. Unexpected shift in financial values or asset prices.",
   why:"Venus (money/value) square Uranus (sudden change) = unexpected financial development. Currency moves, unexpected asset revaluations, or disruptive events affecting perceived value. Within the Ides of March bearish window."},
  {w:"Feb 09",t:"g",bias:"turn",src:"Gann Master Time Factor",
   e:"📐 Gann 2×9 Weeks (126d from ATH)",
   c:"Second 9-week segment from ATH. 1+2+6=9.",
   why:"Gann's 9-week cycle: each multiple of 63 days from a major turn marks a potential inflection. 2×9=18 weeks."},
  {w:"Feb 17",t:"e",bias:"turn",src:"NASA — confirmed Annular Solar Eclipse + Pesavento Moon vs Sign",
   e:"☀ Annular Solar Eclipse + New Moon 🌑 Moon in AQUARIUS — Secondary Absolute Low ⭐",
   c:"Solar Eclipse New Moon = most violent impulse move of any lunar cycle (Pesavento). Moon in Aquarius = secondary absolute low (Pesavento, 730 cycles). Bottom signal amplified by secondary-low sign.",
   why:"Jensen: 'Eclipses are most intense where visible.' Eclipse New Moons produce the most violent impulse moves. Moon in Aquarius = secondary absolute low (Pesavento 730-cycle study). Combined: the eclipse bottom signal (violent directional move) occurs in a sign that historically marks secondary absolute lows. Both signals point to a significant LOW forming around Feb 17 — the violent move is most likely DOWNWARD initially (eclipse disruption) then reversal to the upside FROM the low. This is the most amplified single-day bottom signal of the Ides of March bearish period."},
  {w:"Feb 19",t:"g",bias:"turn",src:"Gann + NASA/JPL",
   e:"⭐⭐⭐ Gann 135° × Mercury Perihelion × Mercury Greatest Elongation (18.1°E)",
   c:"Three independent systems on the same date. Gann angular milestone (1+3+5=9) + Mercury at max orbital speed + Mercury peak evening visibility.",
   why:"Gann 135° = sesquiquadrate, 1+3+5=9. Mercury Perihelion = closest to Sun = maximum orbital speed = maximum narrative velocity. Greatest Elongation = maximum angular distance from Sun = best visibility as Evening Star. Three independent Mercury measurements on one date."},
  {w:"Feb 26",t:"r",bias:"bear",src:"NASA/JPL verified",
   e:"☿ Mercury Station Retrograde (22°33' Pisces) — 24 Days of Noise",
   c:"Mercury retrograde begins. Period of narrative confusion, retests, and false breakouts. Mercury in Pisces = detriment sign.",
   why:"Mercury retrograde: planet appears to move backward. Gann Course L2: retrograde periods create 'a squiggle or disturbance in an otherwise clean sine wave.' Pisces = Mercury's detriment — amplifies confusion. Duration: Feb 26–Mar 20."},
  {w:"Feb 27",t:"g",bias:"turn",src:"Gann (1935) + Fibonacci + Jensen (1978) p.135",
   e:"⭐⭐⭐ Gann 144d = Fibonacci 144d = Jensen Biquintile 144° — Triple Exact",
   c:"Three independent timing systems on the same date. Jensen calls the biquintile 'THE triggering aspect' — his single strongest reversal signal.",
   why:"(1) Gann 144d from ATH — 1+4+4=9. (2) Fibonacci 144 = Fib number as time ratio. (3) Jensen (p.135): biquintile (144°, 2×72°) = 'THE triggering aspect' — his most powerful reversal signal. All three target this date. 1 day after Mercury Station Retrograde. Highest-confidence turning point of Q1."},
]},

MAR:{l:"March",e:[
  {w:"Mar 03",t:"e",bias:"turn",src:"NASA — Total Lunar Eclipse + Pesavento (730+61 cycles)",
   e:"🌑 Total Lunar Eclipse Blood Moon 🌕 Moon in VIRGO — QE-era ABSOLUTE PEAK within Bear Context",
   c:"Total Lunar Eclipse (maximum magnitude) + Full Moon. Moon in Virgo = QE-era ABSOLUTE PEAK (61 cycles). In Ides of March bearish context, Full Moon polarity INVERTS = absolute LOW at the eclipse. Extraordinary convergence.",
   why:"Pesavento Moon vs Sign (QE-era, 61 cycles): Virgo = absolute peak. Full Moon = peak signal in bull markets. In the Ides of March BEARISH seasonal context, Full Moon polarity INVERTS = marks a LOW instead of a peak. The Moon in Virgo at a Full Moon in a bearish context becomes: the absolute peak of the bearish pressure = the LOW point. Combined with Total Lunar Eclipse (maximum emotional intensity) this inversion at maximum amplitude = a potentially very significant bottom. Jensen: double eclipse windows mark major trend direction. Este é o Gann 'time=price squaring event' mais completo do calendário: Saturno a 2°Aries (square do ATH $126,272=2°Cap) + Eclipse Total + Lua em Virgem invertida = MÍNIMO absoluto do trimestre com squaring de preço simultâneo."},
  {w:"Mar 07",t:"m",bias:"bull",src:"Traditional astrology (Cazimi)",
   e:"☿ Mercury Cazimi (16°52' Pisces) — Eye of the Storm",
   c:"Mercury at exact Sun conjunction (within 17'). Maximum clarity WITHIN the retrograde.",
   why:"Cazimi: within 17 arcminutes of Sun's center = maximum power. During Mercury retrograde the Cazimi is a brief window of extreme clarity and decisive directional commitment. Often marks the retrograde's internal turning point."},
  {w:"Mar 07",t:"v",bias:"neut",src:"JPL geocentric",
   e:"♀ Venus CONJUNCT Neptune (0.576°) — Value Illusion on Cazimi Day",
   c:"Venus meets Neptune at 0.576° orb on the same day as Mercury Cazimi. Financial values become based on fantasy or illusion.",
   why:"Venus (money) + Neptune (illusion/dissolution) = financial values become unclear. Assets appear more or less valuable than they are. Neutral-to-bearish: the illusion eventually corrects. The Cazimi clarity (Mercury) coincides with Venus illusion (Neptune) — narrative clarity meets value confusion on the same day."},
  {w:"Mar 09",t:"v",bias:"bear",src:"Pesavento (2015) — 101 verified cycles + JPL geocentric",
   e:"♀ Venus CONJUNCT Saturn (0.483°) — BEARISH [101 Verified Cycles] ✏️ Corrected from Feb 24",
   c:"Venus-Saturn conjunction = market FALLS into the conjunction. 101 historical cycles verified by Pesavento. Geocentric date: March 9 (0.483°). Original calendar listed Feb 24 — that was heliocentric coordinates (error).",
   why:"Pesavento: Venus (money) + Saturn (contraction/restriction) = suppression of financial expansion. 101 cycles confirm market falls leading into conjunction. Geocentric calculation via JPL confirms March 9 (0.483° orb), not February 24. The heliocentric vs geocentric distinction: financial astrology always uses geocentric coordinates (as seen from Earth). This falls within Mercury Retrograde (Feb 26–Mar 20) amplifying the bearish narrative restriction."},
  {w:"Mar 10",t:"b",bias:"bear",src:"Gann methodology + JPL heliocentric",
   e:"♂ Mars Heliocentric 90° from ATH — Square BEARISH",
   c:"Mars helio at 90° from ATH position (236.0°). First Mars geometric milestone of 2026.",
   why:"Gann: squaring price with planets. Mars helio 90° from ATH = first major geometric resistance of the Mars cycle. Coincides with Mercury Retrograde + Ides of March bearish seasonal + Venus CONJ Saturn (Mar 9). Triple bearish loading. Mars helio correctly uses heliocentric coordinates per Gann methodology."},
  {w:"Mar 15",t:"m",bias:"bear",src:"Jensen (1978) + JPL geocentric",
   e:"☿ Mercury CONJUNCT Mars (0.465°) — Aggressive Narrative",
   c:"Mercury meets Mars at 0.465° orb within Mercury Retrograde. Aggressive, impulsive market communication.",
   why:"Mercury-Mars conjunction = aggressive, impulsive market narrative. Within Mercury Retrograde: the aggression may be based on false information or reversed signals. A sharp volatile move that may quickly reverse after Mercury turns Direct (Mar 20)."},
  {w:"Mar 19",t:"v",bias:"warn",src:"Jensen (1978) + JPL geocentric",
   e:"♀ Venus SQUARE Jupiter (0.404°) — Overextension of Value",
   c:"Venus squares Jupiter at 0.404° orb. Tension between value and expansion. Overextension of bullish sentiment.",
   why:"Venus (value) square Jupiter (expansion) = financial overextension. Venus-Jupiter squares mark peaks of speculative excess before correction. Falls 1 day before Spring Equinox (Mar 20) and Mercury Station Direct (Mar 20) — the overextension meets the key turning point."},
  {w:"Mar 20",t:"g",bias:"bull",src:"Gann Master Time Factor + NASA/JPL",
   e:"📐 Gann Annual — 0° Aries (Spring Equinox) + ☿ Mercury Station Direct",
   c:"Gann's primary annual solar point (Aries = start of all cycles). Mercury resumes direct motion the same day.",
   why:"0° Aries = the Aries point, absolute start of the astrological year. Combined with Mercury turning Direct (removing retrograde fog), this marks the beginning of the April Earnings Rally bullish phase. The clearest trend signal since Mercury went retrograde Feb 26."},
  {w:"Mar 28",t:"p",bias:"bull",src:"Pesavento (2015)",
   e:"📅 END Ides of March + START April Earnings Rally — BULLISH",
   c:"Bullish seasonal window opens. Immediately overlaps with the most concentrated bullish cluster of the year.",
   why:"Pesavento: Aries/Taurus solar transit + Q1 earnings. Seasonal shift aligns with Jupiter-Uranus sextile cluster beginning the same day. Highest-confidence bullish entry zone of 2026."},
  {w:"Mar 28–Apr 6",t:"g",bias:"bull",src:"Jensen (1978) p.36 + Gann + Fibonacci + Pesavento + NASA/JPL",
   e:"⭐⭐⭐⭐⭐ Jupiter SEXTILE Uranus — Jensen: 28/28 BULLISH (100% since 1896)",
   c:"Jensen's most powerful bullish signal. 28/28 favorable Jupiter-Uranus aspects produced gains. Plus: Jensen 2×88d + Full Moon + Gann 180° + Mars Helio 90°. Five systems in 9 days.",
   why:"Jensen p.36: every favorable Jupiter-Uranus aspect from 1896 — zero exceptions, 100% gains. Sextile (60°) = favorable. Simultaneously: Jensen 2×88d (Mar 31), Full Moon Pink Moon (Apr 1, Pesavento peak), Gann 180° midpoint (Apr 6, 1+8+0=9), Pesavento April Earnings Rally seasonal. Five independent analytical traditions targeting the same 9-day window. Highest-confidence bullish cluster of 2026."},
  {w:"Mar 31",t:"g",bias:"turn",src:"Jensen (1978)",
   e:"Jensen 2×88d Mercury Orbital Cycle (176d from ATH)",
   c:"Second 88-day Mercury orbital cycle from ATH. Falls 1 day before Full Moon Pink Moon.",
   why:"Jensen's 88-day Mercury cycle: each multiple from a major turn marks a potential reversal zone. This second cycle (176 days) aligns within 1 day of the Full Moon within the most bullish cluster of the year."},
]},

APR:{l:"April",e:[
  {w:"Apr 01",t:"n",bias:"turn",src:"Pesavento (2015) — 730 cycles + 61 QE-era cycles + NASA/JPL",
   e:"Full Moon Pink Moon 🌕 Moon in VIRGO — QE-era ABSOLUTE PEAK ⭐⭐⭐ — Clearest Distribution Zone of April Rally",
   c:"Full Moon = peak signal (1,346 cycles). Moon in Virgo = QE-era ABSOLUTE PEAK (61 cycles, 2009-present). Double peak signal: the most precise distribution zone of the April Earnings Rally.",
   why:"Pesavento's Moon vs Sign (QE-era, 61 cycles): Virgo = absolute peak, replacing the pre-QE Libra peak. Combined with Full Moon peak signal (1,346 cycles): DOUBLE PEAK SIGNAL on April 1. This is the most statistically certain distribution point of the entire April Earnings Rally cluster. Falls at the heart of the Jupiter-Uranus sextile bullish cluster — the bullish move likely peaks HERE, on this specific Full Moon in Virgo. Sell here; watch for a brief consolidation then potential resumption. Average Full Moon peak: 1-3 days AFTER Full Moon."},
  {w:"Apr 06",t:"g",bias:"turn",src:"Gann Master Time Factor + Square of Nine",
   e:"📐 Gann 180° MIDPOINT ⚡ + TIME=PRICE SQUARING — BTC $69,000 ≈ S9 Level 23×",
   c:"182.6 dias desde ATH = 180° midpoint angular. BTC ~$69,000 ≈ $69,352 (S9 −184 steps, 23 rotações abaixo ATH). TEMPO e PREÇO a fazer squaring simultâneo.",
   why:"GANN: '180° = máxima pressão — inversão ou aceleração.' TRIPLO SQUARING HOJE: (1) TEMPO=180° midpoint Gann; (2) PREÇO=$69,000≈162° angular decline do ATH ($69,450=162° exact); (3) S9=$69,352 (23 rotações). DESCOBERTA CRÍTICA: 162° é o ângulo BULLISH de Jensen para Júpiter-Saturno! O BTC desceu em PREÇO exactamente até ao ângulo bullish de Jensen no mesmo dia que o TEMPO atinge 180°. O quadro completo: TIME=180° (Gann máxima pressão) + PRICE=162° (Jensen bull angle) + S9=23 rotações. Com o cluster Jupiter-Uranus sextile (Mar28-Apr6) como contexto, a resolução UPWARD confirma o April Earnings Rally (alvo: $73,630-$78,920). A resolução DOWNWARD (quebra de $67,261) abre caminho para $63,136 (Gann 50% retracement = ATH×50% exact). Gann: 'Each stock moves according to its individual time limit... because the vibration and wave length varies.' BTC tem a sua frequência vibracional própria — o Master Time Factor identifica QUANDO essa vibração atinge os seus extremos."},
  {w:"Apr 13",t:"g",bias:"turn",src:"Gann Master Time Factor",
   e:"📐 Gann 3×9 Weeks (189d from ATH) — 1+8+9=18→9",
   c:"Third 9-week segment. 7 days after Gann 180° — cluster of inflection.",
   why:"Gann's 9-week cycle: 3rd multiple = 189 days. Digit sum 1+8+9=18→1+8=9. Within 1 week of Gann 180° — the two angular milestones cluster."},
  {w:"Apr 16",t:"p",bias:"bear",src:"Pesavento (2015)",
   e:"📅 END April Rally + START 'Sell in May' — BEARISH Seasonal",
   c:"The reliable 2-month bearish window begins. Taurus/Gemini/Cancer. 108+ years confirmed.",
   why:"Pesavento: April Earnings Rally ends mid-month. 'Sell in May' is one of the most documented seasonal anomalies. 108+ years confirm. Venus CONJ Jupiter Jun 10 (correct geocentric date) creates a countertrend bounce — use as sell-the-rally opportunity."},
  {w:"Apr 17",t:"m",bias:"neut",src:"JPL geocentric",
   e:"☿ Mercury CONJUNCT Neptune (0.121°) — Near-Exact Narrative Fog",
   c:"Mercury meets Neptune at near-exact 0.121° orb. Communication becomes confused, unclear, or deceptive.",
   why:"0.121° = very precise. Mercury (narrative) + Neptune (illusion) = maximum narrative confusion. Market participants misled by incomplete or misleading information. Falls 1 day before Gann 180° transition — a fog descends just before the critical midpoint. Non-directional: amplifies whatever underlying trend is in place."},
  {w:"Apr 17",t:"n",bias:"turn",src:"Pesavento (2015)",
   e:"New Moon — In Bear Context: Polarity INVERTS, Marks TOP",
   c:"In 'Sell in May' bearish context, New Moon polarity inverts per Pesavento. Marks a temporary bounce peak — a sell opportunity.",
   why:"Pesavento's inversion rule: New Moon = bottom in bull markets, TOP in bear markets. 'Sell in May' is a confirmed bearish seasonal. This New Moon likely produces a short-term bounce that should be SOLD INTO — not a trend reversal."},
  {w:"Apr 20–21",t:"m",bias:"warn",src:"Jensen (1978) + JPL geocentric + AstrologyKing + Book of Han (111 CE)",
   e:"⭐⭐⭐ TRIPLE CONJUNCTION: Mercury + Mars + Saturn — All within 0.8° ⚠️ RAREST BEARISH EVENT OF 2026",
   c:"Mercury, Mars and Saturn all within 0.8° of each other over two consecutive days. Mars CONJ Saturn (0.035°, near-exact, Apr 20) + Mercury CONJ Saturn (0.681°, Apr 20) + Mercury CONJ Mars (0.076°, near-exact, Apr 21). The most concentrated bearish planetary cluster of the year.",
   why:"TRIPLE CONJUNCTION breakdown: (1) Mars CONJ Saturn Apr 20 — 0.035° orb, essentially exact. Mars (aggression/force) + Saturn (contraction/restriction) = THE most classically bearish combination in financial astrology. Historically associated with market crashes, military defeats, forced liquidations. This is the most exact Mars-Saturn conjunction of 2026. (2) Mercury CONJ Saturn Apr 20 — 0.681° orb. Book of Han (111 CE): 'Mercury conjunct Saturn results in stagnation and depression. It signifies the defeat of an army. War should not be undertaken.' (3) Mercury CONJ Mars Apr 21 — 0.076° orb, near-exact. Aggressive narrative collapses. The sequence Apr 20-21: all three planets (Mercury, Mars, Saturn) within 0.8° simultaneously = a rare triple conjunction delivering maximum bearish force. Falls within 'Sell in May' bearish seasonal (Apr 16–Jun 26), reinforcing the directional bias. Jensen: Saturn aspects to Mercury = 'structural restraint applied to narrative.' Mars CONJ Saturn = forced contraction through aggressive means — classic crash catalyst energy."},
  {w:"Apr 24",t:"v",bias:"turn",src:"JPL geocentric",
   e:"♀ Venus CONJUNCT Uranus (0.095°) — Near-Exact Sudden Value Disruption",
   c:"Venus meets Uranus at near-exact 0.095° orb. Sudden unexpected shift in financial values.",
   why:"0.095° = essentially exact. Venus (money/value) + Uranus (sudden change) = unexpected financial development. Currency moves, sudden asset revaluations, or disruptive events. Within 'Sell in May' — this unexpected value disruption likely serves the bearish trend."},
  {w:"Apr 27",t:"m",bias:"warn",src:"Jensen (1978) + JPL geocentric",
   e:"☿ Mercury SQUARE Jupiter (0.370°) — Narrative Overextension",
   c:"Mercury squares Jupiter. Communication becomes overoptimistic, setting up for disappointment.",
   why:"Mercury (narrative) square Jupiter (expansion/optimism) = overextended bullish narrative. Analysts overpromise, guidance too bullish. The square creates stress — stretched narrative must correct. Within 'Sell in May' context: any brief relief-rally narrative is a trap."},
]},

MAY:{l:"May",e:[
  {w:"Apr 29",t:"g",bias:"bull",src:"Jensen (1978) Ch.5 — 84-year Uranus cycle + JPL ephem",
   e:"♅ ÚRANO ENTRA EM GÉMEOS ⭐⭐⭐ — Ciclo de 84 Anos (Permanente, 2026-2033)",
   c:"Úrano deixa Touro (2018-2026, 8 anos) e entra em Gémeos permanentemente. Evento de 7+ anos. Gémeos = tecnologia, comunicação, redes digitais, crypto. Úrano = disrupção, inovação repentina.",
   why:"Jensen (Ch.5): 'The revolution of Uranus is 84 years. When at critical degrees of the zodiac, its effects are sudden and radical changes, chaos, and action engendered by underlying progressiveness... Its general effects generate humanitarian and altruistic endeavors on the positive side.' Jensen identificou Úrano ao cruzar 8°-9° de Gémeos como o 'unique national hinge point' americano — cada vez que Úrano passou por estes graus (1523, 1607, 1691, 1775, 1859, 1943) coincidiu com uma transformação épica. Úrano entra em Gémeos 29 Abr 2026 — atingirá 8°-9° Gémeos ~2028-2029. Para o BTC: Úrano (planeta de Aquário + tecnologia) em Gémeos (informação + redes + Mercury = comunicação) = era de ouro para activos digitais. Fim de Úrano em Touro (2018-2026) = fim do ciclo de BTC como 'ouro digital' alternativo. Início de Úrano em Gémeos = BTC como infra-estrutura de comunicação/valor global. Curto prazo (Abr 2026): ingresso em novo signo = volatilidade de transição. Estrutural (2026-2033): bullish secular para BTC/crypto. Nota: Úrano entrou brevemente em Gémeos em Jul-Nov 2025 (retrogradu de volta), mas a entrada PERMANENTE é 29 Abr 2026."},
  {w:"May 01",t:"n",bias:"turn",src:"Pesavento (2015) — 730 cycles + 61 QE-era cycles",
   e:"Full Moon Flower Moon 🌕 Moon in SCORPIO — QE-era ABSOLUTE LOW ⭐⭐⭐ — CONTRADICTORY SIGNAL",
   c:"Full Moon = peak signal (standard). Moon in Scorpio = QE-era ABSOLUTE LOW (61 cycles). Contradiction: peak-signal phase meets low-sign. In 'Sell in May' bearish context, Full Moon polarity INVERTS = bottom. Combined with Scorpio = low: DOUBLE BOTTOM signal.",
   why:"Pesavento critical contradiction: Full Moon normally = peak. But (1) in bear markets/bearish seasonal, Full Moon polarity INVERTS = marks a LOW instead of a peak. (2) Moon in Scorpio = QE-era absolute low sign. Both signals point DOWN (bottom) on a Full Moon phase. In 'Sell in May' bearish seasonal context, this may mark a significant COUNTERTREND LOW within the ongoing decline — a sharp bounce opportunity before the decline resumes. Also: this is an Apogee Moon (reduced amplification). Overall: a moderate countertrend low signal within the bearish seasonal."},
  {w:"May 05",t:"g",bias:"turn",src:"Gann Master Time Factor",
   e:"📐 Gann Annual Solar Date — 15° Taurus",
   c:"Second of Gann's 8 annual solar timing dates.",
   why:"Gann: 15° Taurus = midpoint of Taurus, an earth sign associated with money and material values. Second annual solar date marks the mid-spring timing point."},
  {w:"May 16",t:"n",bias:"turn",src:"NASA/JPL verified",
   e:"New Moon + Super New Moon (Perigee 358,074 km) — In Bear Context: Marks TOP",
   c:"Super New Moon at closest approach. Maximum amplification. In 'Sell in May' bearish context: polarity inverts, marks a temporary bounce peak.",
   why:"Pesavento inversion rule in bear markets: New Moon marks TOP not bottom. Super New Moon (perigee = maximum gravitational + psychological amplification) creates a more intense signal — but still inverted in the bearish context. The most amplified false-hope rally peak of the 'Sell in May' period."},
  {w:"May 18",t:"m",bias:"turn",src:"JPL geocentric",
   e:"☿ Mercury CONJUNCT Uranus (0.015°) — MOST EXACT MERCURY-URANUS OF 2026",
   c:"Mercury meets Uranus at near-perfect 0.015° orb — essentially exact. Maximum unexpected narrative shock of the year.",
   why:"0.015° = the most precise Mercury-Uranus conjunction of 2026. Mercury-Uranus = sudden, unexpected narrative shock at maximum intensity. In 'Sell in May': this shock likely serves the bearish trend — a sudden unexpected negative development. The most precisely-timed Mercury shock event of the entire year."},
  {w:"May 21",t:"b",bias:"bear",src:"Gann methodology + JPL heliocentric",
   e:"♂ Mars Heliocentric 135° from ATH — Sesquiquadrate BEARISH",
   c:"Mars helio at 135° from ATH position. Second Mars geometric milestone. 1+3+5=9.",
   why:"135° = sesquiquadrate = 90° + 45°. Hard aspect in Gann's square family. 1+3+5=9. Within 'Sell in May' bearish seasonal — the Mars geometric pressure reinforces the directional bias."},
  {w:"May 22",t:"g",bias:"bear",src:"Pesavento Solar Cycle Figure 10.3 (since 1885) + Gann Master Time Factor",
   e:"📐 Gann 225° (228.3d) + PESAVENTO SUB-TURN May 22 — Sub-turning point dentro do 'Sell in May'",
   c:"Pesavento (Fig.10.3): May 22 é um sub-turning point dentro do seasonal 'Sell in May and Go Away' (Apr 16 – Jun 26). É um ponto de viragem menor que pode marcar uma pausa ou aceleração do declínio bearish. Coincide com Gann 225° angular.",
   why:"Pesavento (p.136, Figure 10.3): A análise do ciclo solar desde 1885 revela sub-turning points internos dentro de cada seasonal. May 22 é identificado como um desses turning points dentro do período bearish 'Sell in May'. Pode marcar um rebote temporário (rally técnico dentro da tendência de baixa) ou uma aceleração do decline. Gann's angular method continues: 225° = fifth step around the annual cycle wheel."},
  {w:"May 22",t:"v",bias:"neut",src:"JPL geocentric",
   e:"♀ Venus SQUARE Neptune (0.317°) — Value Illusion",
   c:"Venus squares Neptune. Financial values become unclear, based on fantasy or unrealistic expectations.",
   why:"Venus (money) square Neptune (illusion) = financial values unclear. Assets may appear more or less valuable than they are. Neutral amplifier — enhances confusion in whatever direction the trend is moving."},
  {w:"May 27",t:"g",bias:"turn",src:"Fibonacci time analysis",
   e:"🌀 Fibonacci 233 Days from ATH",
   c:"Fibonacci 233-day interval from ATH. Potential inflection zone.",
   why:"Fibonacci time ratios: 89, 144, 233, 377... marks statistically significant inflection zones. 233 is a Fibonacci number. Fibonacci time zones identify WHEN — price action confirms DIRECTION."},
  {w:"May 29",t:"v",bias:"bear",src:"Pesavento (2015) + JPL geocentric",
   e:"♀ Venus SQUARE Saturn (0.138°) — BEARISH, Very Tight",
   c:"Venus squares Saturn at very tight 0.138° orb. Financial values meet structural restriction within 'Sell in May'.",
   why:"Pesavento: hard Venus-Saturn aspects carry bearish weight. 0.138° = very precise. Venus (money) square Saturn (contraction) = financial contraction within the ongoing 'Sell in May' decline. Note: this is the SQUARE form of the Venus-Saturn relationship — more acute pressure than the conjunction (which occurred Mar 9)."},
]},

JUN:{l:"June",e:[
  {w:"Jun 02",t:"m",bias:"warn",src:"JPL DE405 ephem calculated",
   e:"☿ Mercury Declination North Peak +25.60° ⚡ OUT OF BOUNDS",
   c:"Mercury's most extreme North declination of 2026. OOB = maximum unpredictability in market narrative.",
   why:"Mercury OOB North at +25.60° (Sun maximum ±23°26'). Most extreme North OOB of 2026. Communication and market narrative become extreme, erratic, unpredictable. Three OOB events in 2026: Jan 7, Jun 2, Dec 30."},
  {w:"Jun 04",t:"m",bias:"neut",src:"JPL geocentric",
   e:"☿ Mercury SQUARE Neptune (0.017°) — Near-Exact Narrative Fog",
   c:"Mercury squares Neptune at near-exact 0.017° orb. Second most precise Mercury-Neptune aspect of the year. Maximum narrative confusion.",
   why:"0.017° = essentially exact. Mercury-Neptune square at near-zero orb = maximum narrative fog. Falls 11 days before the year's strongest bottom signal (Jun 15 New Moon in Gemini). The fog precedes the bottom — maximum confusion before clarity."},
  {w:"Jun 10",t:"v",bias:"bull",src:"Pesavento (2015) — 99 verified cycles + JPL geocentric",
   e:"♀ Venus CONJUNCT Jupiter (0.162°) — BULLISH [99 Verified Cycles] ✏️ Corrected from May 7",
   c:"Venus-Jupiter conjunction = market RISES. 99 historical cycles verified by Pesavento. Geocentric date: June 10 (0.162°). Original calendar listed May 7 — that was heliocentric coordinates (error).",
   why:"Pesavento: Venus (money) + Jupiter (large-scale expansion) = doubly positive. 99 cycles confirm market rises into conjunction. Geocentric calculation via JPL confirms June 10 (0.162° orb), not May 7. The heliocentric vs geocentric distinction: financial astrology always uses geocentric. Falls within 'Sell in May' bearish window (which ends Jun 26) — this creates a countertrend bullish pulse within a declining market. A sell-the-rally opportunity or a signal that the seasonal low is forming ahead of the Jun 26 Summer Rally opening."},
  {w:"Jun 10",t:"m",bias:"bear",src:"Jensen (1978) + JPL geocentric",
   e:"☿ Mercury SQUARE Saturn (0.279°) — Bearish Narrative on Venus-Jupiter Day",
   c:"Mercury squares Saturn at 0.279° orb on the SAME DAY as Venus CONJUNCT Jupiter. Conflicting signals: bullish value (Venus-Jupiter) meets bearish narrative (Mercury-Saturn).",
   why:"Venus CONJ Jupiter (bullish, 99 cycles) on the same day as Mercury SQUARE Saturn (bearish, Book of Han: 'stagnation and depression'). Two opposing signals on Jun 10: financial sentiment expands (Venus-Jupiter) while the narrative of that expansion is immediately restricted (Mercury-Saturn). Result: the bullish sentiment event may be short-lived — the Saturn restriction caps the Jupiter optimism quickly."},
  {w:"Jun 15",t:"g",bias:"turn",src:"Pesavento (730 cycles) + Jensen (1978) + Gann + NASA/JPL + JPL geocentric",
   e:"⭐⭐⭐⭐⭐⭐ New Moon + Moon in GEMINI (Absolute Low) + Mercury Elongation + Gann + Jupiter QUINTILE Uranus (0.04°) — SIX FRAMEWORKS",
   c:"Six independent frameworks on one date. Moon in Gemini = ABSOLUTE LOW (730 cycles). Jensen: 'Trend reversals are TIMED BY THE FIFTHS' — Jupiter Quintile Uranus at 0.04° is near-exact. The highest-confidence bottom signal of 2026.",
   why:"(1) Pesavento 730-cycle Moon vs Sign: Gemini = strongest absolute lows. (2) New Moon = bottom signal (avg NM −1 day). (3) Mercury Greatest Elongation 24.5°E = max clarity. (4) Gann 4×9w (2+5+2=9). (5) Moon Perigee Jun 14 (357km) for amplification. (6) Jupiter QUINTILE Uranus at 54° (orb 0.04°, essentially exact) — Jensen (p.81): 'The fifths or quintiles are very significant in mundane work. Trend reversals usually are TIMED BY THE FIFTHS.' The quintile group is Jensen's 'action triggering group, second only to conjunctions to angle cusps.' A near-exact Jupiter-Uranus quintile fires on the day of the strongest bottom signal of the year. Six fully independent frameworks from six different analytical traditions targeting the same date. The absolute highest-confidence timing point of all of 2026."},
  {w:"Jun 21",t:"g",bias:"turn",src:"Gann Master Time Factor + NASA/JPL",
   e:"📐 Gann Annual Solar Date — 0° Cancer (Summer Solstice)",
   c:"Third of Gann's 8 annual solar timing dates. Cardinal point.",
   why:"Gann: 0° Cancer = Summer Solstice. Cardinal point marking the start of a new seasonal phase. Falls within the transition from 'Sell in May' to Summer Rally (Jun 26)."},
  {w:"Jun 26",t:"p",bias:"bull",src:"Pesavento (2015) + Jensen (1978)",
   e:"📅 END 'Sell in May' + START Summer Rally — BULLISH Seasonal",
   c:"Summer Rally opens Jun 26. Cancer/Leo/Virgo. Reliable ~2 months. Jensen 3×88d aligns within 1 day.",
   why:"Pesavento: Cancer solar transit conjuncts US natal Sun = consistent summer gains. Jensen 3×88d (Jun 27) aligns within 1 day of opening. Mercury Station Retrograde Jun 29 begins immediately — creates initial noise but not enough to derail the seasonal tailwind."},
  {w:"Jun 27",t:"g",bias:"turn",src:"Jensen (1978)",
   e:"Jensen 3×88d Mercury Orbital Cycle (264d from ATH)",
   c:"Third 88-day Mercury orbital cycle from ATH. Falls 2 days before Full Moon + Mercury Station Retrograde.",
   why:"Jensen's 88-day Mercury cycle: third multiple (264 days) aligns with the Summer Rally opening + Full Moon + Mercury Retrograde (Jun 29). Cluster of turning point signals at the rally's inception."},
  {w:"Jun 29",t:"r",bias:"turn",src:"NASA/JPL verified",
   e:"Full Moon Strawberry + ☿ Mercury Station Retrograde (26°27' Cancer)",
   c:"Emotional peak (Full Moon) coincides with start of Mercury Retrograde. Peak sentiment meets beginning of narrative confusion.",
   why:"Full Moon (Pesavento peak signal) + Mercury Station Retrograde = complex turning point. Within Summer Rally: likely a temporary consolidation or pullback, not a trend reversal. Seasonal tailwind continues despite retrograde noise."},
]},

JUL:{l:"July",e:[
  {w:"July",t:"g",bias:"warn",src:"Jensen (1978) p.79 — exact calculation",
   e:"⭐ North Node EXACT SQUARE to 9° Gemini — Peak of Year, 0.6° Orb",
   c:"Jensen's critical hinge square reaches minimum orb in July (0.6°). Maximum major-low pressure this month.",
   why:"Node at ~9.6° Pisces = 270° from Jensen's 9° Gemini critical point, orb 0.6°. Jensen: 'Squares approximate major market lows.' July = month of maximum downward structural pressure in 2026."},
  {w:"Jul 06",t:"g",bias:"turn",src:"Gann Master Time Factor",
   e:"📐 Gann 270° (273.9d from ATH) — 2+7+0=9",
   c:"Three-quarter turn of the annual cycle. Final phase begins.",
   why:"270° = three-quarters of the annual circle. 2+7+0=9. Beginning of the final quarter of the cycle before the 360° close. Given the bearish backdrop (Jensen Node, Fall Crash Zone approaching), this angle likely acts as resistance."},
  {w:"Jul 12",t:"m",bias:"bull",src:"NASA/JPL verified + Jensen (1978) p.81 + JPL geocentric",
   e:"☿ Mercury Cazimi + ⭐ Jupiter QUINTILE Saturn (108°, orb 0.01°) — NEAR-PERFECT QUINTILE TRIGGER",
   c:"Mercury Cazimi (maximum clarity within retrograde) coincides with Jupiter QUINTILE Saturn at 108° (orb 0.01° — essentially exact). Jensen: quintiles are the 'action triggering group' that time market reversals.",
   why:"Mercury Cazimi: within 17 arcminutes of Sun's center = maximum clarity during retrograde (see Mar 7 for full explanation). Simultaneously: Jupiter QUINTILE Saturn at 108° (orb 0.01°) — the most exact outer-planet quintile aspect of July. Jensen (p.81): 'Trend reversals usually are LOST in the trines and squares but are TIMED BY THE FIFTHS.' And (p.134): 'The generally ignored biquintile group are the action triggering group, second only to conjunctions to the 1st, 4th, 7th and 10th house cusps.' The July 12 combination of Mercury clarity (Cazimi) + outer-planet quintile trigger (Jupiter-Saturn 108°) = a high-confidence turning point within the Mercury Retrograde period, confirmed by Jensen's mechanism."},
  {w:"Jul 14",t:"v",bias:"turn",src:"JPL geocentric",
   e:"♀ Venus SQUARE Uranus (0.423°) — Sudden Value Disruption in Summer Rally",
   c:"Venus squares Uranus at 0.423° orb. Unexpected shift in financial values within the Summer Rally.",
   why:"Venus (money/value) square Uranus (sudden change) = unexpected financial development. Within Summer Rally — creates a volatile session or short-term disruption within the seasonal uptrend. Not a trend reversal."},
  {w:"Jul 21",t:"g",bias:"turn",src:"Gann Master Time Factor",
   e:"📐 Gann 2×144 Days (288d from ATH) — 2+8+8=18→9",
   c:"Double 144-day cycle from ATH. Compound pressure point.",
   why:"288 = 2×144, combining two primary Gann time cycles. Digit sum 2+8+8=18→9. Within Mercury Retrograde (Jun 29–Jul 23), falls 2 days before Mercury Direct — adding station energy to the Gann timing."},
  {w:"Jul 23",t:"m",bias:"bull",src:"NASA/JPL verified",
   e:"☿ Mercury Station Direct (16°19' Cancer) — Narrative Clarity Returns",
   c:"Mercury resumes direct motion. 24 days of retrograde fog lifts. Trend direction becomes decisive.",
   why:"Mercury Direct ends retrograde distortion (Jun 29–Jul 23). The directional move following Mercury Direct is often the clearest signal of the month. Within Summer Rally context + July Jensen Node pressure = critical inflection for trend assessment."},
  {w:"Jul 29",t:"n",bias:"turn",src:"Pesavento (2015)",
   e:"Full Moon (Buck Moon) — Monthly Emotional Peak",
   c:"Full Moon peak signal within the Summer Rally. Likely a short-term distribution zone.",
   why:"Pesavento: Full Moon = emotional climax of the lunar cycle. Within Summer Rally: short-term high. Expect consolidation or pullback followed by continuation of the seasonal trend."},
  {w:"Jul 29",t:"v",bias:"bear",src:"Pesavento (2015) + JPL geocentric",
   e:"♀ Venus SQUARE Mars (0.111°) — BEARISH, Near-Exact",
   c:"Venus squares Mars at near-exact 0.111° orb on Full Moon day. Financial values under aggressive attack at the lunar peak.",
   why:"0.111° = very precise. Venus (money) square Mars (aggression) = forced selling, aggressive institutional distribution. Falls on the Full Moon Buck Moon day — the emotional peak of the cycle meets an aggressive bearish planetary signal. Combined: a sharp, aggressive top at the Full Moon within the Summer Rally. High-probability distribution zone."},
]},

AUG:{l:"August",e:[
  {w:"Aug 02",t:"m",bias:"bull",src:"NASA/JPL verified",
   e:"☿ Mercury Greatest Elongation (19.5°W) — Morning Star",
   c:"Mercury at maximum angular distance from Sun as morning star. Maximum narrative clarity.",
   why:"Mercury Greatest Elongation = peak visibility = maximum communication clarity. As morning star, Mercury appears before sunrise — historically associated with clarity at the start of new trends."},
  {w:"Aug 06",t:"b",bias:"bear",src:"Gann methodology + JPL heliocentric",
   e:"♂ Mars Heliocentric 180° from ATH — Opposition BEARISH ⚠️",
   c:"Mars helio at 180° from ATH position (236.0°). Third Mars geometric milestone. Maximum geometric pressure within Summer Rally.",
   why:"180° = maximum geometric distance from starting point — the halfway mark of the Mars helio cycle from ATH. Creates peak resistance within the Summer Rally. Coincides with Gann Annual Aug 7 (1 day difference) — cluster of pressure within the uptrend. Likely marks a temporary top or retest within the ongoing summer uptrend."},
  {w:"Aug 07",t:"g",bias:"turn",src:"Gann Master Time Factor + JPL ephem",
   e:"📐 Gann Annual Solar Date — 15° Leo + ☿ Mercury Declination North Peak +20.32°",
   c:"4th of Gann's 8 annual solar timing dates. Mercury declination reaches a local North peak the same day.",
   why:"Gann's 15° Leo = midpoint of Leo, the sign ruling speculation. Fourth annual solar date marks the midpoint of summer. Mercury North peak (+20.32°) marks a shift in narrative direction from expansive toward more defensive."},
  {w:"Aug 11",t:"v",bias:"neut",src:"JPL geocentric",
   e:"♀ Venus OPPOSITION Neptune (0.090°) — Near-Exact Value Illusion Peak",
   c:"Venus opposes Neptune at near-exact 0.090° orb. Financial values reach maximum disconnection from reality.",
   why:"0.090° = near-exact. Venus (money) OPP Neptune (illusion) = financial values are most disconnected from fundamental reality. Assets priced on fantasy rather than substance. Neutral-to-bearish: the illusion peaks and then corrects. 1 day before the Total Solar Eclipse (Aug 12) — maximum illusory optimism just before the regime-change event."},
  {w:"Aug 12",t:"e",bias:"turn",src:"NASA — Total Solar Eclipse confirmed",
   e:"☀ Total Solar Eclipse + New Moon (Visible Europe/N.Africa) — Most Powerful Eclipse of 2026",
   c:"Total Solar Eclipse — maximum magnitude. More potent than February's annular eclipse. Primary regime-change catalyst of the second half.",
   why:"Jensen: Total Solar Eclipses are most intense where visible. Visible across Europe and North Africa = major financial markets directly in the eclipse path. This eclipse near the end of the Summer Rally (ending Sep 4) likely marks the beginning of the transition toward the Fall Crash Zone. Eclipse effects persist for weeks to months."},
  {w:"Aug 15",t:"v",bias:"bull",src:"NASA/JPL verified + Pesavento (2015)",
   e:"⭐ ♀ Venus Greatest Elongation (45.9°E) ← PEAK SENTIMENT OF THE YEAR",
   c:"Venus at maximum visibility (45.9° from Sun). Peak bullish sentiment. D3–5 after Total Solar Eclipse. NOTE: Mercury CONJ Jupiter same day (double bullish reinforcement).",
   why:"Venus Greatest Elongation = maximum brightness as Evening Star = peak market optimism. Pesavento: Venus is the 'most reliable positive correlator.' At 45.9°E = year's maximum Venus visibility. IMPORTANT CORRECTION from previous version: the original calendar listed 'Venus SQUARE Saturn (bearish contradiction)' on Aug 15 — this was an error based on heliocentric coordinates. Geocentric calculation shows NO Venus-Saturn aspect on Aug 15. Instead, Mercury CONJ Jupiter (bullish) occurs the same day. Aug 15 is therefore a DOUBLE BULLISH signal: Venus Greatest Elongation + Mercury CONJ Jupiter. The bearish internal correction comes 1 week later: Venus OPP Saturn Aug 22."},
  {w:"Aug 15",t:"m",bias:"bull",src:"Jensen (1978) + JPL geocentric",
   e:"☿ Mercury CONJUNCT Jupiter (0.793°) — BULLISH Narrative Expansion on Peak Sentiment Day",
   c:"Mercury conjuncts Jupiter at 0.793° orb on the SAME DAY as Venus Greatest Elongation. Double bullish: peak sentiment + expansive narrative.",
   why:"Mercury (narrative) CONJ Jupiter (expansion/optimism) = most bullish Mercury aspect possible. Falls on the SAME DAY as Venus Greatest Elongation — the year's peak sentiment day. Double bullish: (1) Venus at maximum visibility = peak financial optimism, (2) Mercury CONJ Jupiter = most expansive narrative signal. Together: the single most bullish planetary confluence of the Summer Rally. Note: Venus OPP Saturn Aug 22 (bearish) follows 1 week later — the bullish peak is followed by the first internal correction."},
  {w:"Aug 17",t:"g",bias:"turn",src:"Gann Master Time Factor",
   e:"📐 Gann 5×9 Weeks (315d from ATH) — 3+1+5=9",
   c:"Fifth 9-week segment from ATH. 3+1+5=9. Cluster with Venus Greatest Elongation + Mercury CONJ Jupiter.",
   why:"Gann's 9-week cycle: 5th multiple = 315 days. Digit sum 3+1+5=9. Within 2 days of the double-bullish Venus/Mercury cluster (Aug 15) — adds Gann timing to the sentiment peak."},
  {w:"Aug 21",t:"g",bias:"turn",src:"Gann Master Time Factor",
   e:"📐 Gann 315° (319.6d from ATH) — 7th Angular Milestone",
   c:"Seventh 45° angular milestone from ATH.",
   why:"Gann's geometric method: 315° = seven-eighths around the annual cycle wheel. 3+1+5=9. Approaching the final 360° close."},
  {w:"Aug 18",t:"v",bias:"bull",src:"Pesavento (2015) + Jensen (1978) + JPL geocentric",
   e:"⭐⭐ Venus SEXTILE Jupiter (0.231°) + Mercury TRINE Saturn (0.724°) — DOUBLE BULLISH Post-Peak",
   c:"Venus sextiles Jupiter at 0.231° orb + Mercury trines Saturn simultaneously. Double soft-aspect bullish cluster 3 days after the summer peak (Aug 15). Constructive continuation signal.",
   why:"Venus SEXTILE Jupiter (0.231°) = constructive bullish: money (Venus) in cooperative sextile with expansion (Jupiter). Jensen: sextile = favorable. Pesavento: Venus-Jupiter aspects = bullish correlator (the 99 cycles counted only conjunctions, but soft aspects carry the same positive energy). Mercury TRINE Saturn (0.724°) = constructive: narrative (Mercury) in harmonious trine with structure (Saturn) — the market story is grounded and realistic. Two soft-aspect bullish signals on the same day, 3 days after the double-bullish peak of Aug 15 (Venus Greatest Elongation + Mercury CONJ Jupiter). This cluster suggests the Aug 15 peak is followed by a constructive, orderly consolidation rather than a sharp reversal. The actual bearish correction comes Venus OPP Saturn Aug 22 (4 days later)."},
  {w:"Aug 18",t:"v",bias:"bull",src:"Pesavento (2015) + Jensen (1978) + JPL geocentric",
   e:"⭐⭐ Venus SEXTILE Jupiter (0.231°) + Mercury TRINE Saturn (0.724°) — DOUBLE BULLISH",
   c:"Two soft-aspect bullish signals simultaneously, 3 days after the summer peak (Aug 15). Constructive continuation signal within Summer Rally.",
   why:"Venus SEXTILE Jupiter (0.231°) = constructive bullish: money (Venus) in cooperative sextile with expansion (Jupiter). Jensen: sextile = favorable. Mercury TRINE Saturn (0.724°) = constructive: narrative (Mercury) in harmonious trine with structure (Saturn) — the market story is grounded and realistic. Two soft-aspect bullish signals on the same day, 3 days after the double-bullish peak of Aug 15 (Venus Greatest Elongation + Mercury CONJ Jupiter). This cluster suggests the Aug 15 peak is followed by a constructive orderly consolidation rather than a sharp reversal. The actual bearish correction: Venus OPP Saturn Aug 22."},
  {w:"Aug 22",t:"v",bias:"bear",src:"Pesavento (2015) + JPL geocentric",
   e:"♀ Venus OPPOSITION Saturn (0.454°) — BEARISH, 1 Week After Summer Peak",
   c:"Venus opposes Saturn at 0.454° orb — 7 days after the double-bullish Aug 15 peak. Financial values meet structural restriction. First internal bearish correction of the Summer Rally.",
   why:"Pesavento: hard Venus-Saturn aspects carry bearish weight. Venus (money) OPP Saturn (contraction) = financial values confronted by structural reality. Falls 7 days after the Summer Rally's peak sentiment day (Aug 15 Venus Greatest Elongation + Mercury CONJ Jupiter). Classic distribution pattern: sentiment peaks, then Saturn's reality arrives. This is the first significant internal correction within the Summer Rally — not a trend reversal, but a notable pullback."},
  {w:"Aug 28",t:"m",bias:"turn",src:"JPL geocentric",
   e:"☿ Mercury SQUARE Uranus (0.594°) — Sudden Narrative Break",
   c:"Mercury squares Uranus at 0.594° orb. Unexpected narrative disruption or communication shock.",
   why:"Mercury-Uranus square = sudden unexpected communication events. Falls within the transition from Summer Rally to Fall Crash Zone (Sep 4). An unexpected news event that may begin shifting sentiment from the summer optimism toward the fall bearish phase."},
  {w:"Aug 28",t:"e",bias:"turn",src:"NASA — Partial Lunar Eclipse (96%) confirmed",
   e:"🌑 Partial Lunar Eclipse (96%) — Full Moon — Double Eclipse Window Closes",
   c:"Near-total Lunar Eclipse. 16 days after Total Solar Eclipse. The double-eclipse window that began Aug 12 closes.",
   why:"The double eclipse window (Total Solar Aug 12 + 96% Lunar Aug 28) brackets a 16-day period of maximum market sensitivity. Lunar Eclipse amplifies the Full Moon peak signal — 96% magnitude = near-total emotional intensity. This eclipse closes the regime-change window initiated by the Total Solar Eclipse."},
]},

SEP:{l:"September",e:[
  {w:"Sep 04",t:"p",bias:"warn",src:"Pesavento (2015) — 108-year crash study",
   e:"📅 END Summer Rally + START ⚠️ FALL CRASH ZONE — EXTREME RISK",
   c:"The most dangerous seasonal window opens. Sep 4–Oct 27. All major historical crashes occurred here.",
   why:"Pesavento: crashes of 1907, 1929, 1937, 1957, 1987, 2001, 2002, 2008 all here. 2026 loading: Venus Retro Oct 3, Venus SQUARE Mars Oct 11 (near-exact 0.085°), Mercury Retro Oct 24, Venus IC Oct 24, Gann 360° Oct 6, Mars 225° Nov 2."},
  {w:"Sep 11",t:"n",bias:"bear",src:"Pesavento (2015) — polarity inversion rule",
   e:"New Moon — Polarity INVERTED in Fall Crash Zone: Marks TOP",
   c:"In the Fall Crash Zone bearish context, New Moon polarity inverts. This New Moon marks a bounce peak — a sell opportunity.",
   why:"Pesavento: New Moon = bottom in bull markets, TOP in bear markets. Fall Crash Zone = most bearish seasonal window. Any bounce into this New Moon is a short-selling opportunity. 2008 crash confirmed: New Moons within the Crash Zone marked peaks of brief relief rallies before continuation of decline."},
  {w:"Sep (month)",t:"g",bias:"bear",src:"Jensen (1978) + JPL geocentric",
   e:"♃ Jupiter SESQUIQUADRATE Neptune (135°, orb ~1.7°) — Irrational Exuberance Under Stress",
   c:"Jupiter-Neptune hard angle (135° sesquiquadrate) within Fall Crash Zone. Jensen/Pesavento: Jupiter + Neptune hard aspect = the irrational exuberance/fantasy bubble theme under crisis pressure.",
   why:"Pesavento (Part 12): Jupiter CONJUNCT Neptune = irrational exuberance/fantasy markets — bubbles. A SESQUIQUADRATE (135° = hard angle) of Jupiter and Neptune creates the same theme under stress and crisis adjustment. In September (within Fall Crash Zone, orb 1.7° from 135°): the fantastical optimism of the summer rally (Jupiter energy) meets Neptune confusion under the hard angle of crisis adjustment (sesquiquadrate). Markets may be driven by delusional optimism that suddenly collides with reality. A narrative of 'things are fine' that abruptly reverses. This layer adds an additional bearish dimension to the September-October crash zone period."},
  {w:"Sep 13",t:"m",bias:"neut",src:"JPL geocentric",
   e:"☿ Mercury OPPOSITION Neptune (0.526°) — Narrative Fog in Crash Zone",
   c:"Mercury opposes Neptune. Market narrative becomes confused and illusory within the Fall Crash Zone.",
   why:"Mercury (narrative) OPP Neptune (illusion) = maximum narrative confusion. Falls 2 weeks into the Fall Crash Zone. The market story becomes unclear — participants unsure of direction. Neutral directionally but amplifies the disorientation that characterizes crash-zone psychology."},
  {w:"Sep 18",t:"m",bias:"bear",src:"Jensen (1978) + JPL geocentric",
   e:"☿ Mercury OPPOSITION Saturn (0.668°) — Reality Check in Crash Zone",
   c:"Mercury opposes Saturn at 0.668° orb within the Fall Crash Zone. Sobering structural reality confronts summer optimism.",
   why:"Mercury (narrative) OPP Saturn (structural reality) = summer optimism confronted by hard structural facts. Falls 2 weeks into the Fall Crash Zone. Classic crash-zone pattern: the narrative of the crash zone is confirmed and reinforced by a harsh factual event."},
  {w:"Sep 23",t:"g",bias:"turn",src:"Jensen (1978) + Gann + NASA/JPL — Zero days offset",
   e:"⭐ EXACT: Jensen 4×88d = Gann Annual Equinox — Zero Days",
   c:"Jensen's 4th Mercury orbital cycle (352 days) coincides exactly with the Autumn Equinox. Two independent systems, zero offset.",
   why:"Jensen 4×88d (352 days from ATH) landing exactly on the Autumn Equinox (0° Libra, Gann's 3rd annual cardinal solar date). Completely independent methodologies targeting the same date. High-confidence turning point zone within the Fall Crash Zone."},
  {w:"Sep 24",t:"g",bias:"bull",src:"Jensen (1978) p.69 + JPL geocentric",
   e:"⭐ Jupiter-Saturn TRINE 120° EXACT — Jensen BULLISH ⚠️ Within Fall Crash Zone",
   c:"Jensen's most favorable outer planet configuration. Within Pesavento's crash zone. Most likely: strong technical bounce within a larger decline — potentially the MAJOR LOW of 2026.",
   why:"Jensen (p.69): 'Trine group: bullish, favorable, serene, constructive and the expansion urge.' Jupiter-Saturn 120° = most favorable configuration of the two most economically significant planets. Exact per JPL. CONTEXT CONFLICT: Jensen bullish WITHIN Pesavento crash zone. Jensen's own 1974 case study: trine during bearish Node configuration produced 'the framework of a classic low + recovery of 15-18 months.' Sep-Oct 2026 may produce the MAJOR LOW of the year at this trine."},
]},

OCT:{l:"October",e:[
  {w:"Oct 02",t:"m",bias:"bear",src:"Jensen (1978) + JPL geocentric",
   e:"☿ Mercury SQUARE Mars (0.274°) — Aggressive Narrative Before Gann 360°",
   c:"Mercury squares Mars at 0.274° orb. Aggressive narrative conflict 4 days before Gann 360° (Oct 6).",
   why:"Mercury (narrative) square Mars (aggression) = aggressive confrontational communication. Falls 4 days before Gann 360° (Oct 6) — the most critical Gann date of the year. The narrative becomes maximally aggressive just before the annual cycle closes. Within Fall Crash Zone — confirms and accelerates the bearish pressure into Gann 360°."},
  {w:"Oct 03",t:"r",bias:"bear",src:"NASA/JPL verified",
   e:"♀ Venus Station Retrograde (8°29' Scorpio) — 41-Day Retrograde Begins",
   c:"Venus retrograde begins. Financial sentiment and value perception enter 41 days of reassessment.",
   why:"Venus retrograde: markets reassess what appeared valuable. Pesavento: Venus rules 'money, possessions, earned income, security.' Venus retrograde = value confusion. In Fall Crash Zone: amplifies bearish pressure by removing the Venus bullish correlator. Pre-shadow began Aug 31. Post-shadow clears Dec 15."},
  {w:"Oct 06",t:"g",bias:"warn",src:"Gann Master Time Factor (Wall Street Stock Selector, 1930)",
   e:"📐 Gann 360° — COMPLETE ANNUAL CYCLE ⚡ MOST CRITICAL DATE OF THE YEAR — 3+6+0=9",
   c:"Exactly 365.25 days from ATH (Oct 6, 2025). 3+6+0=9. Annual cycle closes. Gann: action = reaction in opposite direction when time cycle expires.",
   why:"Gann (1930): 'When the time cycle is up, neither Democrat, Republican nor our good President can stem the tide. It is a natural law. ACTION EQUALS REACTION IN THE OPPOSITE DIRECTION.' The 360° annual close is Gann's single most critical time factor. If Sep 24 trine produced a bounce, Oct 6 is the most likely date for the resumption of the decline."},
  {w:"Oct 10",t:"n",bias:"bear",src:"Pesavento (2015) — 730 cycle study",
   e:"New Moon 🌑 Moon in LIBRA — In Crash Zone: Polarity Inverted, Marks TOP",
   c:"Moon in Libra = ABSOLUTE PEAK per Pesavento (730 cycles). Within Fall Crash Zone: New Moon polarity inverts. A false-hope peak before continued decline.",
   why:"Pesavento 730-cycle Moon vs Sign: Libra = strongest absolute market peaks. QE-era update: peak shifted to Virgo. New Moon in Libra within Fall Crash Zone + post-Gann 360° context = false-hope rally peak leading into the sharpest decline of the crash window."},
  {w:"Oct 11",t:"v",bias:"bear",src:"Pesavento (2015) + JPL geocentric",
   e:"♀ Venus SQUARE Mars (0.085°) — NEAR-EXACT BEARISH ✏️ NOT Venus CONJ Saturn",
   c:"Venus squares Mars at near-exact 0.085° orb within Fall Crash Zone. Original calendar incorrectly listed this as Venus CONJ Saturn — that was a heliocentric error. The correct geocentric aspect is Venus SQUARE Mars.",
   why:"CORRECTION: the original calendar had Venus CONJ Saturn on Oct 11 (0.2°) — this was calculated using heliocentric coordinates (incorrect for financial astrology). The correct geocentric calculation shows Venus SQUARE Mars (0.085°) on Oct 11, not Venus CONJ Saturn. Venus (money) square Mars (aggression) = financial values under aggressive attack. 0.085° = near-exact. Within Fall Crash Zone + Venus retrograde already active = triple bearish loading: aggressive Mars attack + value confusion (retrograde) + seasonal crash zone."},
  {w:"Oct 12",t:"m",bias:"bull",src:"NASA/JPL verified",
   e:"☿ Mercury Greatest Elongation (25.2°E)",
   c:"Mercury at maximum angular distance from Sun as evening star.",
   why:"Mercury Greatest Elongation = peak visibility as Evening Star. Within Fall Crash Zone — the narrative clarity that comes with elongation may provide a brief moment of bullish clarity within the bearish trend."},
  {w:"Oct 18",t:"g",bias:"turn",src:"Fibonacci time analysis",
   e:"🌀 Fibonacci 377 Days from ATH",
   c:"Fibonacci 377-day interval from ATH. 1 day before Gann 6×9 weeks.",
   why:"Fibonacci 377 is a Fibonacci number. 1 day before Gann 6×9 weeks (Oct 19) — creates a two-framework cluster. Fibonacci time zones identify WHEN — direction confirmed by price action."},
  {w:"Oct 19",t:"g",bias:"turn",src:"Gann Master Time Factor",
   e:"📐 Gann 6×9 Weeks (378d from ATH) — 3+7+8=18→9",
   c:"Sixth 9-week segment. 3+7+8=18→9. 1 day after Fib 377 — cluster.",
   why:"Gann's 9-week cycle: 6th multiple = 378 days. Digit sum 3+7+8=18→9. Within the Fall Crash Zone — a geometric pressure point confirming the seasonal bearish backdrop."},
  {w:"Oct 23",t:"m",bias:"bear",src:"JPL ephem calculated",
   e:"☿ Mercury Declination South Peak −20.96° — 1 Day Before Mercury Retrograde",
   c:"Mercury reaches South declination peak 1 day before Station Retrograde. Narrative hits a defensive extreme.",
   why:"Mercury South declination peak = maximum defensive/contracting narrative direction. Falls 1 day before Mercury Station Retrograde (Oct 24) — the peak of defensive narrative immediately precedes the retrograde's narrative confusion. Sequential: peak defensiveness → retrograde fog."},
  {w:"Oct 24",t:"r",bias:"bear",src:"Bayer (1942) + NASA/JPL",
   e:"⭐ ☿ Mercury Retrograde + ♀ Venus Inferior Conjunction (Bayer) — DOUBLE RETROGRADE",
   c:"Mercury Station Retrograde + Venus IC simultaneously. Bayer: Venus IC = 291 days after Venus SC (Jan 6) = exact half of the 584-day synodic cycle. Primary Bayer turning point.",
   why:"Bayer's Venus IC (291 days after SC Jan 6) = precise mathematical midpoint of the 584-day Venus synodic cycle — his primary turning point signal. Simultaneously: Mercury Station Retrograde. Both inner planets governing communication (Mercury) and money (Venus) enter their confused states on the same day. Within Fall Crash Zone, post-Gann 360° = maximum confusion overlaid on maximum seasonal risk."},
  {w:"Oct 26",t:"n",bias:"turn",src:"Pesavento (2015) ✏️ was Oct 25",
   e:"Full Moon Hunter's Moon — Polarity Inverted in Bear Context",
   c:"Full Moon within Fall Crash Zone. In bear markets, Full Moon polarity inverts — may mark a LOW instead of a high.",
   why:"Pesavento: Full Moon polarity can invert in bear markets. In Fall Crash Zone context: watch whether this Full Moon produces a top (standard bull behavior) or a low (bear inversion). Given Jensen trine Sep 24 + bounce potential, this Full Moon may mark the peak of a post-crash bounce — then decline resumes."},
  {w:"Oct 27",t:"p",bias:"bull",src:"Pesavento (2015)",
   e:"📅 END Fall Crash Zone + START Santa Claus Rally — BULLISH Seasonal",
   c:"Most dangerous seasonal window closes. Recovery phase begins. 2026: amplified by double direct (Mercury Nov 13 + Venus Nov 14).",
   why:"Pesavento: Fall Crash Zone end = consistent Scorpio/Sagittarius gains. 2026: Mercury Direct Nov 13 + Venus Direct Nov 14 = both inner planets resume direct in 24 hours. Rare double clearing = historically accelerates post-crash recovery."},
]},

NOV:{l:"November",e:[
  {w:"Nov 02",t:"b",bias:"bear",src:"Gann methodology + JPL heliocentric",
   e:"♂ Mars Heliocentric 225° from ATH — Waning Sesquiquadrate BEARISH",
   c:"Fourth and final Mars geometric milestone of 2026. Entering the bearish descending arc of the Mars cycle.",
   why:"225° = 180° + 45°. Waning sesquiquadrate = descending phase of energy. Falls just after Fall Crash Zone closes — potential headwind for the Santa Claus Rally bounce in early November."},
  {w:"Nov 04",t:"m",bias:"bull",src:"Traditional astrology (Cazimi)",
   e:"☿ Mercury Cazimi 3rd (12°10' Scorpio) ➕",
   c:"Third and final Cazimi of 2026. Brief window of maximum clarity within Mercury Retrograde.",
   why:"Mercury's third inferior conjunction Cazimi completes the set for 2026 (Mar 7 in Pisces, Jul 12 in Cancer, Nov 4 in Scorpio). The Cazimi provides a brief clarity window during the retrograde, often marking a pivot in direction. Mercury Retrograde period: Oct 24–Nov 13."},
  {w:"Nov 07",t:"g",bias:"turn",src:"Gann Master Time Factor + NASA/JPL",
   e:"♀ Venus Occultation + 📐 Gann Annual 15° Scorpio",
   c:"Third Venus occultation + 6th of Gann's 8 annual solar timing dates.",
   why:"Venus occultation = Moon covers Venus — brief disruption in sentiment. Gann 15° Scorpio = sixth annual solar timing date."},
  {w:"Nov 09",t:"g",bias:"bull",src:"Jensen (1978) + Pesavento (2015) — 730 cycles + 61 QE-era cycles",
   e:"⭐⭐⭐ TRIPLE BOTTOM SIGNAL: New Moon 🌑 Moon in SCORPIO (QE-era Absolute Low) + Jupiter Synodic 399d",
   c:"Three independent bottom signals on the same date: (1) New Moon = bottom signal (1,583 cycles), (2) Moon in Scorpio = QE-era ABSOLUTE LOW (61 cycles, 2009-present), (3) Jupiter synodic cycle 399d from ATH complete. The strongest post-crash bottom signal of the year.",
   why:"Pesavento's Moon vs Sign analysis (QE-era, 61 cycles 2009-present): Scorpio = absolute low, replacing the pre-QE era signal. Combined with the New Moon bottom signal (1,583 cycles, 1885-2013) AND the Jupiter synodic 399-day cycle close from the ATH = three fully independent frameworks identifying November 9 as the most significant low of the post-crash recovery. Jensen: Jupiter synodic cycle closes mark major structural shifts. The triple convergence here is the highest-confidence bullish bottom signal of Q4 2026."},
  {w:"Nov 13",t:"m",bias:"bull",src:"NASA/JPL verified",
   e:"☿ Mercury Station Direct (5°02' Scorpio) — Venus Direct Follows Tomorrow",
   c:"Mercury resumes direct motion. Venus follows Direct tomorrow (Nov 14). Unprecedented double clearing.",
   why:"Mercury Direct ends retrograde (Oct 24–Nov 13). Venus Direct follows Nov 14 — both inner planets resume direct within 24 hours. Double clearing: communication (Mercury) and money/value (Venus) both normalize simultaneously. Historically amplifies momentum. Within Santa Claus Rally = strongest bullish momentum signal of Q4."},
  {w:"Nov 14",t:"v",bias:"bull",src:"NASA/JPL verified ➕",
   e:"♀ Venus Station Direct (22°51' Libra) — Value & Sentiment Normalize",
   c:"Venus retrograde ends (41 days since Oct 3). Financial sentiment normalizes. 1 day after Mercury Direct = double direct.",
   why:"Venus Direct = Venus bullish correlator reactivated. The 24-hour sequence Mercury Direct (Nov 13) → Venus Direct (Nov 14) is exceptionally rare. Pesavento: Venus Direct = 'money and possessions' resume their positive role. Combined with Santa Claus Rally seasonal tailwind = most decisive bullish momentum of Q4."},
  {w:"Nov 20",t:"m",bias:"bull",src:"Jensen (1978) + JPL geocentric",
   e:"☿ Mercury CONJUNCT Jupiter (— Nov 20 per estimation) — BULLISH ✓",
   c:"Mercury conjuncts Jupiter. Most bullish Mercury narrative aspect of 2026. Expansive, optimistic communication.",
   why:"Mercury (narrative) CONJ Jupiter (expansion/optimism) = peak bullish narrative event. Analyst upgrades, positive macro narrative, bullish guidance. Falls within Santa Claus Rally + Mercury Direct + Venus Direct momentum. The most bullish Mercury aspect of the year reinforcing the strongest bullish seasonal momentum."},
  {w:"Nov 24",t:"e",bias:"turn",src:"NASA/JPL verified",
   e:"Full Moon Beaver + Perigee (Supermoon) — Maximum Emotional Amplification",
   c:"Supermoon Full Moon. Maximum emotional charge + gravitational effect. Amplified peak signal.",
   why:"Supermoon Full Moon: maximum gravitational + maximum emotional charge. Pesavento: perigee Full Moons produce above-average volatility at the peak. Within Santa Claus Rally: likely a temporary high followed by consolidation before the January Effect rally (Dec 20)."},
]},

DEC:{l:"December",e:[
  {w:"Dec 04",t:"m",bias:"warn",src:"Jensen (1978) + JPL geocentric",
   e:"☿ Mercury SQUARE Jupiter (0.422°) — Narrative Overextension Warning",
   c:"Mercury squares Jupiter at 0.422° orb. Overoptimistic narrative — sets up for disappointment at the start of the January Effect window.",
   why:"Mercury (narrative) square Jupiter (expansion) = narrative overextension. Falls as the January Effect window approaches (Dec 20). An overoptimistic communication event at the start of December — watch for a brief narrative correction before the year-end rally begins."},
  {w:"Dec 08",t:"m",bias:"turn",src:"JPL geocentric",
   e:"☿ Mercury OPPOSITION Uranus (0.671°) — Sudden Narrative Disruption at Santa Claus Rally End",
   c:"Mercury opposes Uranus at 0.671° orb. PESAVENTO (Table 10.1): Dec 8 = FIM EXACTO do Santa Claus Rally (Oct 27 – Dec 8). A partir de Dec 8 até Dec 20 há um período neutral (nem Santa Claus nem January Effect). O January Effect começa em Dec 20. Esta é a data correcta do fim do Santa Claus — não Dez 20 como frequentemente citado.",
   why:"Mercury-Uranus opposition = sudden unexpected narrative reversal. Falls on Dec 8 — the last day of the Santa Claus Rally (Pesavento). An unexpected news event that closes the rally and begins the brief pause before the January Effect opens Dec 20."},
  {w:"Dec 08",t:"p",bias:"neut",src:"Pesavento (2015)",
   e:"📅 END Santa Claus Rally",
   c:"Santa Claus Rally closes ~Dec 8. Brief pause before January Effect (Dec 20).",
   why:"Pesavento: Santa Claus Rally (Oct 27–Dec 8) ends. A 12-day quiet period follows before the sharp January Effect rally opens Dec 20."},
  {w:"Dec 09",t:"n",bias:"turn",src:"NASA/JPL verified ✏️ was Dec 8",
   e:"New Moon — Bottom Signal Before January Effect",
   c:"New Moon bottom signal. Bridges Santa Claus Rally end (Dec 8) and January Effect start (Dec 20).",
   why:"Pesavento: New Moon marks bottoms in bull market contexts. This New Moon between the two year-end bullish windows sets up the strength of the January Effect rally that opens Dec 20."},
  {w:"Dec 10",t:"m",bias:"bear",src:"Jensen (1978) + JPL geocentric",
   e:"☿ Mercury SQUARE Mars (0.530°) — Aggressive Narrative Disruption",
   c:"Mercury squares Mars at 0.530° orb. Sharp aggressive narrative event in the pause between year-end rallies.",
   why:"Mercury-Mars square = aggressive confrontational narrative. Falls in the Dec 8–20 pause between Santa Claus Rally and January Effect. This aggressive aspect may create a sharp volatile session — a buying opportunity before the January Effect rally opens."},
  {w:"Dec 12",t:"g",bias:"turn",src:"Gann Master Time Factor",
   e:"📐 Gann 3×144 Days (432d from ATH) — 4+3+2=9",
   c:"Triple 144-day cycle from ATH. Compound pressure point. 4+3+2=9.",
   why:"432 = 3×144, combining three primary Gann time cycles. Digit sum 4+3+2=9. Compound Gann pressure point at year's end."},
  {w:"Dec 20",t:"g",bias:"turn",src:"Jensen (1978)",
   e:"Jensen 5×88d Mercury Orbital Cycle — Final Cycle of 2026 (440d from ATH)",
   c:"Fifth and final 88-day Mercury orbital cycle from ATH. 1 day before Gann 7×9w = Winter Solstice.",
   why:"Jensen's 5th Mercury cycle from ATH: the final major cycle timing event of 2026. Falls 1 day before the exact Gann 7×9 weeks = Solstice confluence — remarkable alignment between Jensen's orbital counting and Gann's geometric time cycles from completely independent methodologies."},
  {w:"Dec 20",t:"p",bias:"bull",src:"Pesavento (2015)",
   e:"📅 START January Effect — BULLISH Seasonal (Dec 20–Jan 7)",
   c:"Final bullish seasonal window. Sharp, strong rally. Capricorn. Four frameworks confirm.",
   why:"Pesavento: Jan Effect = one of the most reliable short-term bullish windows. Sun in Capricorn opposes US natal Sun. Supported by: Jensen 5×88d Dec 20, Gann 7×9w = Solstice Dec 21 (exact). NOTE: Mercury SQUARE Saturn Dec 31 (0.012°, year's most exact Saturn aspect) creates a stark reality check into year-end — the January Effect rally unfolds under Saturnian constraint at the very end. Watch for a sobering close to the year despite the seasonal bullish window."},
  {w:"Dec 21",t:"g",bias:"turn",src:"Gann Master Time Factor + NASA/JPL",
   e:"⭐ EXACT: Gann 7×9 Weeks (441d) = Winter Solstice — Zero Offset",
   c:"441 days from ATH = exactly the Winter Solstice. 4+4+1=9. Two independent systems coincide with zero offset.",
   why:"Gann's geometric 9-week count (441 days, 4+4+1=9) and the astronomical Winter Solstice are completely independent calculations landing on the same date. Three derivations (Gann, Jensen 5×88d, Solstice) converging = the most precisely confirmed timing confluence of the year."},
  {w:"Dec 21",t:"v",bias:"bear",src:"Pesavento (2015) + JPL geocentric",
   e:"♀ Venus CONJUNCT Mars (0.05°) — BEARISH CONTRADICTION ⚠️ Same Day as Gann/Solstice/Jensen Cluster",
   c:"Venus conjuncts Mars at near-perfect 0.05° orb ON THE SAME DAY as Gann 7×9w = Winter Solstice = Jensen 5×88d (Dec 21).",
   why:"CONTRADICTION: Dec 21 has both the year's most confirmed bullish timing cluster (Gann/Solstice/Jensen) AND Venus CONJ Mars at 0.05° (essentially exact, bearish Pesavento signal). Resolution: the timing cluster identifies WHEN — Venus-Mars conjunction determines HOW. Possible: January Effect rally begins with an initial aggressive shakeout (Venus-Mars 0.05°) before the seasonal trend asserts itself upward. Watch price action: if Gann/Seasonal holds, Venus-Mars aggression is absorbed into a bullish impulse."},
  {w:"Dec 24",t:"e",bias:"turn",src:"NASA/JPL verified",
   e:"Full Moon Cold Moon + Perigee + ☿ Mercury Aphelion (Supermoon — largest of year)",
   c:"Supermoon Full Moon. 356,650 km. Year's closest perigee. Maximum emotional amplification.",
   why:"Year's closest Perigee Full Moon = maximum emotional amplification. Within the January Effect bullish window — the emotional climax of the year. Mercury Aphelion simultaneously = narrative at its slowest. The year's largest emotional peak with the year's slowest narrative."},
  {w:"Dec 27",t:"m",bias:"neut",src:"JPL geocentric",
   e:"☿ Mercury SQUARE Neptune (0.281°) — Year-End Narrative Fog",
   c:"Mercury squares Neptune at 0.281° orb. Narrative confusion in the final days of 2026.",
   why:"Mercury-Neptune square = narrative fog. Falls in the final week of 2026 within the January Effect bullish window. Market communication becomes unclear — participants unsure of year-end direction. A non-directional noise event within the seasonal tailwind."},
  {w:"Dec 31",t:"m",bias:"bear",src:"Jensen (1978) + JPL geocentric + Book of Han (111 CE)",
   e:"☿ Mercury SQUARE Saturn (0.012°) — MOST EXACT SATURN ASPECT OF 2026 — Year's Final Day",
   c:"Mercury squares Saturn at near-perfect 0.012° orb — the most exact Mercury-Saturn aspect of the entire year. On the very last day of 2026.",
   why:"0.012° = the most precise Mercury-Saturn aspect of all 2026. Mercury (narrative) square Saturn (structural reality) = the year closes with the harshest possible reality check on the market narrative. From Book of Han (111 CE): 'Mercury conjunct Saturn results in stagnation and depression.' The square form carries the same energy in a more acute, pressured way. The January Effect bullish window is still technically active (Dec 20–Jan 7) — but the year's hardest Saturn aspect on Dec 31 suggests the year closes under maximum structural constraint. Watch for a sobering final session."},
]},

CONF:{l:"Confluences ⭐",e:[
  {w:"CORE RULE",t:"g",bias:"neut",src:"20 Years Studying Gann + Gann Master Time Factor",
   e:"⚠️ INVERSION RULE: 10-15% of events invert the expected direction",
   c:"Confluences define WHEN. Price action defines DIRECTION. Every signal has a 10-15% inversion rate.",
   why:"From 20 Years Studying Gann: 'A true time cycle must maintain H-L-H-L sequence with ~10% inversions.' Gann: 'ACTION EQUALS REACTION IN THE OPPOSITE DIRECTION.' Always confirm with price action before entry."},
  {w:"Apr 20–21",t:"m",bias:"warn",src:"Jensen + JPL geocentric + Book of Han (111 CE)",
   e:"⭐⭐⭐ TRIPLE CONJUNCTION Mercury+Mars+Saturn — Most Bearish Cluster of 2026",
   c:"Mars CONJ Saturn (0.035°, near-exact) + Mercury CONJ Saturn (0.681°) + Mercury CONJ Mars (0.076°, near-exact). All within 0.8° over two consecutive days within 'Sell in May'.",
   why:"Mars CONJ Saturn (0.035°) is the most classically bearish planetary combination possible — aggression (Mars) meets contraction (Saturn) in near-perfect conjunction. Combined with Mercury in both conjunctions simultaneously, the triple conjunction creates a rare convergence of maximum bearish force. Book of Han (111 CE): 'signifies the defeat of an army.' Missed in earlier versions of this calendar — only Mercury and Venus aspects were calculated initially. Mars-Saturn conjunction discovered via user observation. The most concentrated bearish planetary event of 2026."},
  {w:"METHODOLOGY",t:"g",bias:"neut",src:"Jensen (1978) + Gann methodology",
   e:"📐 COORDINATE SYSTEM NOTE: Geocentric vs Heliocentric",
   c:"All Mercury/Venus aspects use GEOCENTRIC coordinates (standard financial astrology). Mars Helio uses heliocentric (Gann squaring framework). Intentionally different systems.",
   why:"Financial astrology (Jensen, Pesavento, Bayer) uses geocentric coordinates — planetary positions as seen from Earth. Gann's squaring uses heliocentric positions. Mixing these produces wrong dates — the primary error corrected in this calendar version. Geocentric aspects confirmed via JPL and AstrologyKing."},
  {w:"NET FORCE PRINCIPLE",t:"g",bias:"neut",src:"Pesavento (2015) Part 12",
   e:"📊 Pesavento's Net Force Principle — How to Read Conflicting Signals",
   c:"On any given day, multiple transits are active simultaneously. The market shows the NET RESULT of all of them added together. A single powerful outer-planet transit can dominate everything else.",
   why:"Pesavento (Part 12): 'Think of it as Newton's Second Law applied to planets. What the market observer sees is the net result of all transits added up.' Practical application: (1) Identify all major active transits. (2) Classify each as positive (+) or negative (−). (3) Weight by planet size (outer planets = heavier weight). (4) Calculate net sum: more positives = bullish bias; more negatives = bearish. (5) Watch for inner planet triggers to fire the dominant energy. Example: Jun 10 has Venus CONJ Jupiter (bull, +) and Mercury SQUARE Saturn (bear, −). Jupiter is heavier weight than Mercury → net bias = slightly bullish. But Saturn's restriction caps the Jupiter expansion quickly."},
  {w:"APPLYING ASPECTS",t:"g",bias:"neut",src:"Pesavento (2015) Part 5",
   e:"📐 Applying vs. Separating Aspects — When to Enter",
   c:"The energy of a transit builds as planets APPROACH a key angle (applying = waxing). Effects are felt most strongly BEFORE the exact date, not after. Enter on the approach, not the event.",
   why:"Pesavento (Part 5): 'The effects are felt most strongly during the applying phase. This means the market reaction often occurs BEFORE the exact aspect date, not after.' This is critical for timing entries: (1) Bearish aspects: the market falls BEFORE the exact date — the exact day may be a low, not a continuation. (2) Bullish aspects: the market rises BEFORE the exact date — the exact day may be a top. (3) RETROGRADE AMPLIFICATION: When a planet is retrograde while making an aspect, it prolongs the peak energy — can last up to a month near a retrograde station. Example: Venus CONJ Saturn (Mar 9, 0.483° orb) — the bearish pressure was building from ~Mar 3-4 onward, peaking around Mar 9, not starting on Mar 9."},
  {w:"MOON VS SIGN — FULL TABLE",t:"n",bias:"neut",src:"Pesavento (2015) — 730 cycles (1950-present) + 61 QE-era cycles (2009-present)",
   e:"🌕 Complete Pesavento Moon vs Sign Table — All Signals",
   c:"Long-term (730 cycles 1950-present): Gemini=ABSOLUTE LOW ⭐⭐⭐ | Libra=ABSOLUTE PEAK ⭐⭐⭐ | Cap/Aquarius=secondary low | Taurus/Leo/Scorpio/Pisces=relative high | Virgo/Aquarius=relative low. QE-era (61 cycles 2009-present): Virgo=ABSOLUTE PEAK ⭐⭐⭐ | Scorpio=ABSOLUTE LOW ⭐⭐⭐ | Capricorn=secondary low.",
   why:"Always combine BOTH tables: (1) Check long-term signal (730 cycles). (2) Check QE-era shift (61 cycles). (3) Apply to current lunar phase (New Moon = bottom in bull, top in bear; Full Moon = peak in bull, bottom in bear). 2026 key signals: Mar 3 FM in Virgo = QE peak inverted (bear) = LOW. Apr 1 FM in Virgo = QE peak (bull cluster) = TOP. May 1 FM in Scorpio = QE low inverted (bear) = DOUBLE LOW. Jun 15 NM in Gemini = absolute low = BOTTOM ⭐⭐⭐⭐⭐. Sep 11 NM in Virgo = QE peak inverted (bear) = DOUBLE TOP. Oct 10 NM in Libra = absolute peak inverted (bear) = LOW-that-looks-like-top. Nov 9 NM in Scorpio = QE absolute low (bull) = TRIPLE BOTTOM. Note: in QE era (2009-present), always prioritize the 61-cycle QE pattern over the 730-cycle long-term pattern."},
  {w:"PESAVENTO 8 RULES",t:"g",bias:"neut",src:"Pesavento (2015) Part 13 — Larry Pesavento's Trading Rules",
   e:"📐 Larry Pesavento's 8 Trading Rules — Complete",
   c:"The complete set of Pesavento's trading psychology rules. Rule 1 is the most cited, but all 8 are equally essential.",
   why:"Rule 1: Never add to a losing position. Rule 2: When in doubt, get out and stay out — not having a position IS a position; cash is a position. Rule 3: Plan your trade and stick to it — trading without a plan is gambling; controlling risk lets profits take care of themselves. Rule 4: Take equity out of account for rainy days and to enjoy life — protect accumulated gains; help others. Rule 5: Never close a trade without a valid reason — ask: Has profit potential been realized? Do I have a valid exit reason? Rule 6: Always use stop protection — stops acknowledge that no one knows the future; not using stops is the highest form of trading arrogance. Rule 7: The only true facts in trading are fear and greed — be willing to buy when others scream to sell; fear is stronger than greed; markets fall faster than they rise. Rule 8: Distribute risk equally over many markets — diversification is mandatory risk management."},
  {w:"BAYER — PI PRINCIPLE",t:"b",bias:"neut",src:"George Bayer — The Egg of Columbus (1942) p.4",
   e:"🍽️ Bayer's Core Secret: π (pi = 3.14159) is the foundation of ALL market cycles",
   c:"Bayer states explicitly: 'The entire problem about market movements can be solved with one single letter: π (pi, 3.14159).' All cycles, all patterns, all movements are based on pi.",
   why:"Bayer (p.4): 'The feeling of security, the scare of the unknown... can be solved with one single word, even with one single letter: π (Greek pi, 3.1415953).' This statement — that ALL market cycles are fundamentally based on pi — is the deepest layer of Bayer's work. It means: market cycles are not arbitrary; they are geometrically based on the circle's constant. Practical implication for the dinner table: the ellipses Bayer uses to time each phase (tongue=half ellipse, fish=6 inch, bird=9 inch) are all pi-based constructions. The interweaving of cycles (new cycle beginning within the end of the old ellipse) is a geometric property of pi-based circles overlapping. 'All we can accomplish is to locate the cycle, find where our present time moves in it, and act accordingly.' Bayer's Buying Rules: (1) Use WEAKNESS in the tongue formation to buy — not during the fish. (2) Buy again during the resting period between fish and bird. (3) Buy for the neck when the bird is completed. (4) Selling: sell after the champagne has been served and a nut or two swallowed. (5) Complete cycle tongue-to-tongue: 1-3 years. Proportionality rule: big long fish = long bird; body length proportional to neck length."},
  {w:"Feb 27",t:"g",bias:"turn",src:"Gann + Fibonacci + Jensen (1978) p.135",
   e:"⭐⭐⭐ Gann 144d = Fib 144d = Jensen Biquintile 144° — Triple Exact",
   c:"Jensen's 'THE triggering aspect' + Gann + Fibonacci on the same date. Highest-confidence Q1 turning point.",
   why:"Three independent systems: Gann 144d (1+4+4=9), Fibonacci 144 (time ratio), Jensen biquintile 144° (p.135: his single most powerful reversal signal). All three target this date independently."},
  {w:"Mar 28–Apr 6",t:"g",bias:"bull",src:"Jensen + Gann + Pesavento + Fibonacci + NASA/JPL",
   e:"⭐⭐⭐⭐⭐ Jupiter SEXTILE Uranus × Jensen 2×88d × Full Moon × Gann 180° — 5 Systems / 9 Days",
   c:"Most concentrated multi-framework bullish cluster of the year. Jensen: 100% win rate (28/28 cases). Highest-confidence bullish setup of 2026.",
   why:"Five frameworks from five different analytical traditions targeting the same 9-day window. Jensen 28/28 win rate, Jensen 2×88d orbital cycle, Pesavento Full Moon peak, Gann 180° midpoint, Pesavento April Earnings Rally seasonal. If there is one cluster in 2026 to act on with maximum conviction, this is it."},
  {w:"Jun 10",t:"v",bias:"bull",src:"Pesavento (2015) — 99 verified cycles + JPL geocentric",
   e:"⭐⭐ Venus CONJ Jupiter (CORRECTED to Jun 10) + Mercury SQUARE Saturn SAME DAY",
   c:"Venus-Jupiter bullish (99 cycles, 0.162°) and Mercury-Saturn bearish (0.279°) on the SAME DAY. Mixed signal: financial expansion capped by narrative restriction.",
   why:"The Venus-Jupiter bullish conjunction (99 confirmed cycles) and Mercury-Saturn reality-check (Book of Han: 'stagnation and depression') occur simultaneously on Jun 10. The bullish financial sentiment may be short-lived — the Saturnian narrative restriction caps the Jupiter optimism quickly. Most important: both dates are GEOCENTRIC (corrected from heliocentric errors in previous calendar versions)."},
  {w:"Jun 15",t:"g",bias:"turn",src:"Pesavento (730 cycles) + Jensen + Gann + NASA/JPL",
   e:"⭐⭐⭐⭐⭐ New Moon × Mercury Elongation × Gann × Moon in GEMINI = ABSOLUTE LOW",
   c:"The single strongest bottom signal of 2026. Five frameworks confirm an absolute low.",
   why:"Pesavento 730-cycle Moon vs Sign: Gemini = absolute lows. Four additional frameworks: New Moon, Mercury Greatest Elongation, Gann 4×9w, Moon Perigee. The highest-confidence bottom signal of the calendar."},
  {w:"Aug 15",t:"v",bias:"bull",src:"Pesavento + Jensen + NASA/JPL geocentric",
   e:"⭐⭐ Venus Greatest Elongation + Mercury CONJ Jupiter — DOUBLE BULLISH (corrected from 'contradiction')",
   c:"Venus Greatest Elongation (peak sentiment) + Mercury CONJ Jupiter (most bullish Mercury aspect) on the same day. CORRECTION: previous version incorrectly listed a bearish Venus SQUARE Saturn on this date — that was a heliocentric error. Aug 15 is DOUBLE BULLISH.",
   why:"Venus Greatest Elongation (Pesavento: year's peak bullish correlator) + Mercury CONJ Jupiter (Jensen: peak bullish narrative expansion) on the same day. The year's most bullish planetary day. The bearish internal correction comes 7 days later: Venus OPP Saturn Aug 22. Use Aug 15 as a distribution opportunity — the double-bullish peak before Saturn's reality arrives."},
  {w:"Sep 01",t:"g",bias:"bull",src:"Jensen (1978) + JPL geocentric",
   e:"⭐⭐⭐ EXACT Jupiter-Saturn Trine (0.029°) + Mars SQUARE Saturn — MIXED at Crash Zone Threshold",
   c:"The most exact Jupiter-Saturn trine of 2026 occurs September 1 (0.029°), not September 24 as previously listed. Mixed: Jupiter-Saturn TRINE (0.029°, bullish) + Mars SQUARE Saturn (0.279°, bearish) simultaneously, 3 days before the Fall Crash Zone opens.",
   why:"CORRECTION: September 1 is the exact Jupiter-Saturn trine date (0.029° orb). September 24 has 6.19° orb — within Jensen's allowed range but not exact. The mixed signal on Sep 1: (1) Jupiter-Saturn trine (Jensen: 'bullish, serene, constructive, expansion urge'), (2) Mars-Saturn square (bearish: aggressive pressure meets structural restriction). Falls 3 days before the Fall Crash Zone opens (Sep 4). Jensen's 1974 case study: 'A trine during a bearish Node configuration produced the framework of a classic low + recovery of 15-18 months.' Sep 1 may mark the MAJOR LOW before the Fall Crash Zone officially begins."},
  {w:"Abr ~15",t:"g",bias:"turn",src:"Gann Course L2 — Planetary Declination 0° crossings",
   e:"📐 Saturno E Marte cruzam 0° Declinação simultaneamente — 'Cosmic Transfer of Momentum'",
   c:"Saturno: cruza 0° declinação (Sul → Norte) em ~15 Abr. Marte: cruza 0° declinação (Sul → Norte) em ~15 Abr. Ambos em simultâneo dentro de dias. Gann Course L2: estes cruzamentos são 'cosmic transfers of momentum and energy.'",
   why:"Gann Course (L2): 'When a planet is at 0° Cancer it's at maximum North declination. When it enters 0° Capricorn it's at maximum South declination. These are cosmic transfers of momentum and energy relative to Earth. There is a repeatable disruption of energy as direction is changed.' Saturno E Marte cruzam 0° de declinação em ~15 de Abril de 2026 — a semana antes do triple conjunction (Apr 20). Dois planetas com cruzamento de declinação simultâneo = amplificação da mudança energética. O triple conjunction (Mercury+Mars+Saturn a 7-8°Áries, Apr 20) é PRECEDIDO pelo cruzamento de declinação de Saturno e Marte — o Gann Course L2 explica que o cruzamento de 0° é frequentemente o catalisador que 'activa' o aspecto seguinte. O efeito combinado: mudança de declinação (energia de polaridade) + triple conjunction (máximo bearish aspectual) = o cluster bearish de Abril está geometricamente ancorado tanto em longitude (aspecto) como em declinação (energia). A análise de declination de Jensen (p.38): 'Aspects seem to be strongest when approaching than when exact.' O pico de impacto do triple conjunction pode ter ocorrido no cruzamento de declinação ~15 Abr, não na data exacta do aspecto (20 Abr)."},
  {w:"Apr 20",t:"m",bias:"warn",src:"JPL geocentric triple conjunction",
   e:"⭐⭐⭐ TRIPLE CONJUNCTION: Mercury + Mars + Saturn within 0.72° — MAXIMUM BEARISH CLUSTER",
   c:"The most concentrated bearish planetary cluster of 2026. Three planets in stellium: Mars CONJ Saturn (0.035°, near-exact), Mercury CONJ Saturn (0.681°), Mercury CONJ Mars (0.716°). Book of Han: 'defeat of an army.'",
   why:"Mercury, Mars, and Saturn all within 0.72° of each other on April 20. Mars at essentially the same degree as Saturn (0.035°). Book of Han (111 CE): 'Mercury conjunct Saturn results in stagnation and depression. It signifies the defeat of an army.' With Mars added: martial aggression + narrative contraction + structural defeat. The year's most concentrated bearish planetary event."},
  {w:"Oct 06",t:"g",bias:"warn",src:"Gann Master Time Factor",
   e:"⭐⭐⭐⭐ Gann 360° × Fall Crash Zone × Jensen Node Square × Venus Retrograde",
   c:"Four bearish frameworks on the annual cycle close. The single most bearish date of 2026.",
   why:"Gann's most critical time factor (annual 360° close) within Pesavento's most dangerous seasonal window, compounded by Jensen's bearish Node backdrop and Venus already retrograde. If Sep 24 produced a bounce, Oct 6 is the most probable date for the resumption of decline."},
  {w:"Oct 11",t:"v",bias:"bear",src:"Pesavento (2015) + JPL geocentric — CORRECTED",
   e:"⭐⭐ Venus SQUARE Mars (0.085°) — CORRECTED: was Venus CONJ Saturn (heliocentric error)",
   c:"Near-exact Venus-Mars square (0.085°) within Fall Crash Zone. Original calendar had Venus CONJ Saturn here — that was a heliocentric coordinate error. The correct geocentric event is Venus SQUARE Mars.",
   why:"The correction: heliocentric Venus-Saturn conjunction ≠ geocentric Venus-Saturn conjunction. The correct geocentric event on Oct 11 is Venus SQUARE Mars (0.085°, near-exact). Venus (money) square Mars (aggression) = forced selling, aggressive institutional distribution. Within Fall Crash Zone + Venus retrograde = triple bearish loading."},
  {w:"Oct 24",t:"r",bias:"bear",src:"Bayer (1942) + NASA/JPL",
   e:"⭐⭐⭐ Mercury Retrograde × Venus IC (Bayer) — Double Retrograde",
   c:"Bayer's Venus synodic midpoint + Mercury Station Retrograde simultaneously. Maximum confusion.",
   why:"Bayer's Venus IC (291 days after SC Jan 6) = precise midpoint of 584-day Venus synodic cycle — primary turning point signal. Mercury Station Retrograde the same day = both inner planets enter their confused states simultaneously. Within Fall Crash Zone = maximum confusion on maximum seasonal risk."},
  {w:"Dec 21",t:"g",bias:"turn",src:"Gann + Jensen + NASA/JPL",
   e:"⭐⭐⭐⭐ Gann 7×9w × Jensen 5×88d × Winter Solstice — Zero Offset",
   c:"Three independent systems, zero offset on the Winter Solstice. Most precisely confirmed timing confluence of the year.",
   why:"Complete independence: Gann's geometric 9-week count (441d, 4+4+1=9), Jensen's Mercury orbital count (440d, within 1 day), fixed astronomical Winter Solstice — three methodologies converging on the same date."},
  {w:"Dec 31",t:"m",bias:"bear",src:"Jensen + JPL geocentric + Book of Han (111 CE)",
   e:"⭐⭐⭐ Mercury SQUARE Saturn (0.012°) — YEAR'S MOST EXACT SATURN ASPECT, Final Day",
   c:"The most precise Mercury-Saturn aspect of 2026 (0.012°) falls on December 31. Book of Han (111 CE): 'results in stagnation and depression.' The year closes under maximum Saturnian constraint.",
   why:"0.012° = year's most exact Mercury-Saturn aspect. The Book of Han (111 CE) quote about Mercury CONJ Saturn ('signifies the defeat of an army') applies with equal force to the square form. The year's hardest Saturn aspect on Dec 31 — a sobering final day even within the January Effect bullish window."},
  {w:"Full Year",t:"g",bias:"warn",src:"Jensen (1978)",
   e:"⭐⭐⭐⭐ ANNUAL BACKDROP: Node 270° Square to 9° Gemini — Peak July (0.6° orb)",
   c:"Jensen's most important long-term timing tool. Squares historically = major market crashes/lows: 1961, 1970, 1979. Peak orb July.",
   why:"Jensen's Node analysis: the 18.5-year North Node cycle creates recurring pressure when squaring the 9° Gemini critical point. In 2026 the square configuration maintains throughout the year (Node in Pisces), with July the closest approach (0.6° orb). Reinforces Fall Crash Zone and Gann 360° for a maximally bearish Q3-Q4 backdrop."},
]},
};

const MONTHS = ["MAPA","WEEK","S144","TREND","VISAO","JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC","CONF"];
const ML = {MAPA:"📊 Mapa",WEEK:"📅 Esta Semana",S144:"📐 S144 Live",TREND:"📈 Local Trends",VISAO:"🗺 Overview",JAN:"Jan",FEB:"Feb",MAR:"Mar",APR:"Apr",MAY:"May",JUN:"Jun",JUL:"Jul",AUG:"Aug",SEP:"Sep",OCT:"Oct",NOV:"Nov",DEC:"Dec",CONF:"⭐ Confluences"};

function useBtcPrice() {
  const [price, setPrice] = useState(null);
  useEffect(() => {
    const go = () => fetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT")
      .then(r=>r.json()).then(d=>setPrice(parseFloat(d.price))).catch(()=>{});
    go();
    const iv = setInterval(go, 20000);
    return ()=>clearInterval(iv);
  }, []);
  return price;
}

function MapaView() {
  const livePrice = useBtcPrice();
  const ATH = 126272;
  const CURRENT = livePrice || 71560;

  const s9 = [
    {p:126272,label:"ATH",c:"#ff6060",note:"6 Out 2025"},
    {p:99444,label:"$99,444 — S9 10×",c:"#ff8040",note:"resistência forte"},
    {p:80286,label:"$80,286 — S9 18×",c:"#ff9930",note:"resistência"},
    {p:73630,label:"$73,630 — S9 21×",c:"#ffc040",note:"resistência"},
    {p:72000,label:"$72,000 — 0°Áries ×200",c:"#ffe060",note:"0°Áries EXACT"},
    {p:69352,label:"$69,352 — S9 23×",c:"#90e890",note:"suporte actual"},
    {p:67261,label:"$67,261 — S9 24×",c:"#60d060",note:"próximo suporte"},
    {p:64800,label:"$64,800 — 0°Áries ×180",c:"#40c060",note:"0°Áries EXACT"},
    {p:63136,label:"$63,136 — ATH × 50%",c:"#30b0b0",note:"Gann 50% crítico"},
    {p:61200,label:"$61,200 — 0°Áries ×170",c:"#30a0c0",note:"0°Áries EXACT"},
    {p:55389,label:"$55,389 — S9 30×",c:"#5080e0",note:"low de ciclo"},
    {p:54000,label:"$54,000 — 0°Áries ×150",c:"#6060ff",note:"MÍNIMO CICLO"},
  ];

  const angles = [
    {a:90,pct:25,p:94704,label:"90° (−25%)",c:"#ff7040"},
    {a:135,pct:37.5,p:78920,label:"135° (−37.5%)",c:"#ff9030"},
    {a:162,pct:45,p:69450,label:"162° ACTUAL = Jensen Bull Angle",c:"#90f080"},
    {a:180,pct:50,p:63136,label:"180° (−50%) = Gann 50%",c:"#60c0ff"},
    {a:225,pct:62.5,p:47352,label:"225° (−62.5%)",c:"#8060ff"},
  ];

  const maxP = ATH * 1.02;
  const minP = 45000;
  const range = maxP - minP;
  const pct = p => 100 - ((p - minP) / range * 100);

  const keyDates = [
    {d:"Mar 3",stars:"⭐⭐⭐",label:"Lunar Eclipse + Saturn squares ATH",bias:"turn"},
    {d:"Apr 6",stars:"⭐⭐⭐",label:"Gann 180° + TIME=PRICE squaring",bias:"turn"},
    {d:"Apr 20",stars:"⚠️",label:"Triple conjunction bearish",bias:"bear"},
    {d:"Jun 15",stars:"⭐⭐⭐⭐⭐⭐",label:"Bottom signal máximo — 6 frameworks",bias:"bull"},
    {d:"Sep 1",stars:"⭐⭐⭐",label:"J-S trine exacto + Fall Crash abre",bias:"turn"},
    {d:"Sep 22",stars:"⚠️",label:"Sun entra Libra = crash signal US chart",bias:"bear"},
    {d:"Oct 6",stars:"⭐⭐⭐⭐",label:"Gann 360° + Fall Crash + Venus Retro",bias:"bear"},
    {d:"Nov 9",stars:"⭐⭐⭐",label:"NM Escorpião — Triple Bottom",bias:"bull"},
    {d:"Dec 21",stars:"⭐⭐⭐⭐",label:"Gann 7×9w = Jensen 5×88d = Solstício",bias:"turn"},
  ];

  const bC = {bull:"#50e870",bear:"#ff5050",turn:"#ffe080",warn:"#ff5030"};

  return (
    <div style={{position:"relative",zIndex:1,maxWidth:720,width:"100%",margin:"0 auto",padding:"0 12px 60px",display:"flex",flexDirection:"column",gap:16}}>

      {/* Squaring Summary */}
      <div style={{background:"rgba(255,200,50,.05)",border:"1px solid rgba(255,200,50,.2)",borderRadius:8,padding:"14px 16px"}}>
        <div style={{fontSize:13,color:"#ffc832",letterSpacing:2,marginBottom:10,textTransform:"uppercase"}}>📐 Squaring de Preço — Contexto Actual</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {[
            ["ATH","$126,272 = 272° = 2°Capricórnio"],
            ["Posição zodiacal actual","$69,000 = 240° = 0°Sagitário"],
            ["Declínio angular","163° ≈ 162° = Jensen BULL angle"],
            ["Square of Nine","−184 steps × 45° = 23 rotações abaixo ATH"],
            ["Gann temporal","HOJE = 180° midpoint do ATH"],
            ["Squaring simultâneo","TEMPO 180° + PREÇO 162° + S9 23×"],
          ].map(([k,v],i)=>(
            <div key={i} style={{background:"rgba(255,255,255,.03)",borderRadius:4,padding:"7px 10px"}}>
              <div style={{fontSize:11,color:"#a89050",marginBottom:2}}>{k}</div>
              <div style={{fontSize:12,color:"#ffe080",lineHeight:1.4}}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{marginTop:10,padding:"8px 12px",background:"rgba(144,240,128,.06)",border:"1px solid rgba(144,240,128,.2)",borderRadius:4,fontSize:13,color:"#90f080"}}>
          Saturno a 2°Áries em 3 Mar 2026 (orb 0.03°) = Saturno a fazer square EXACTO do grau zodiacal do ATH + Total Lunar Eclipse Blood Moon
        </div>
      </div>

      {/* Price Ladder */}
      <div style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.07)",borderRadius:8,padding:"14px 16px"}}>
        <div style={{fontSize:13,color:"#90c0e0",letterSpacing:2,marginBottom:14,textTransform:"uppercase"}}>📊 Escada de Preços Square of Nine + 0°Áries</div>
        <div style={{position:"relative"}}>
          {/* Price bar */}
          <div style={{position:"absolute",left:140,right:0,top:0,bottom:0}}>
            <div style={{position:"relative",height:"100%",background:"rgba(255,255,255,.02)",borderRadius:4}}>
              {s9.map((lv,i)=>{
                const top = pct(lv.p);
                const isCurrent = Math.abs(lv.p - 69352) < 1000 || Math.abs(lv.p - 67261) < 1000;
                const isATH = lv.p === ATH;
                return (
                  <div key={i} style={{position:"absolute",left:0,right:0,top:`${top}%`,transform:"translateY(-50%)",display:"flex",alignItems:"center",gap:6}}>
                    <div style={{flex:1,height:isCurrent?2:1,background:lv.c,opacity:isCurrent?1:0.5,boxShadow:isCurrent?`0 0 8px ${lv.c}`:""}}/>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Labels */}
          <div style={{display:"flex",flexDirection:"column",gap:0}}>
            {s9.map((lv,i)=>{
              const isCurrent = Math.abs(lv.p - 69000) < 3000;
              return (
                <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"4px 0",borderBottom:"1px solid rgba(255,255,255,.04)",background:isCurrent?"rgba(144,240,128,.05)":"transparent"}}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:lv.c,flexShrink:0,boxShadow:isCurrent?`0 0 8px ${lv.c}`:"none"}}/>
                  <div style={{fontSize:13,color:lv.c,minWidth:120,fontFamily:"monospace"}}>{lv.label.split(" — ")[0]}</div>
                  <div style={{fontSize:13,color:"#666",flex:1}}>{lv.label.split(" — ")[1]}</div>
                  <div style={{fontSize:12,color:"#444"}}>{lv.note}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Gann Angular Declines */}
      <div style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.07)",borderRadius:8,padding:"14px 16px"}}>
        <div style={{fontSize:13,color:"#c8b478",letterSpacing:2,marginBottom:12,textTransform:"uppercase"}}>🌕 Ângulos de Preço Gann (desde ATH $126,272)</div>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {angles.map((a,i)=>{
            const isCurrent = Math.abs(a.p - 69000) < 3000;
            return (
              <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"6px 10px",background:isCurrent?"rgba(144,240,128,.06)":"rgba(255,255,255,.02)",borderRadius:4,border:isCurrent?"1px solid rgba(144,240,128,.3)":"1px solid rgba(255,255,255,.04)"}}>
                <div style={{fontSize:14,color:a.c,fontFamily:"monospace",minWidth:55}}>{a.a}°</div>
                <div style={{fontSize:14,color:a.c,fontFamily:"monospace",minWidth:100}}>${a.p.toLocaleString()}</div>
                <div style={{fontSize:14,color:isCurrent?"#90f080":"#888",flex:1}}>{a.label}</div>
                {isCurrent && <div style={{fontSize:11,color:"#90f080",fontWeight:"bold"}}>◄ ACTUAL</div>}
              </div>
            );
          })}
        </div>
        <div style={{marginTop:10,fontSize:13,color:"#555",lineHeight:1.6}}>
          Fórmula: ATH × (1 − ângulo/360) | $54K/$72K/$108K = 0°Áries exactos (múltiplos de 360)
        </div>
      </div>

      {/* Key Dates Timeline */}
      <div style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.07)",borderRadius:8,padding:"14px 16px"}}>
        <div style={{fontSize:13,color:"#ffb0d0",letterSpacing:2,marginBottom:12,textTransform:"uppercase"}}>📅 Datas Chave 2026 — Confluências Máximas</div>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {keyDates.map((kd,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 10px",background:"rgba(255,255,255,.02)",borderRadius:4,border:"1px solid rgba(255,255,255,.04)"}}>
              <div style={{fontSize:14,color:"#a89050",fontFamily:"monospace",minWidth:56,flexShrink:0}}>{kd.d}</div>
              <div style={{fontSize:13,color:"#ffe080",minWidth:68,flexShrink:0}}>{kd.stars}</div>
              <div style={{fontSize:14,color:bC[kd.bias]||"#ddd",flex:1,lineHeight:1.35}}>{kd.label}</div>
              <div style={{fontSize:9,color:bC[kd.bias]||"#888",opacity:.7,textTransform:"uppercase"}}>{kd.bias}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bayer Phase */}
      <div style={{background:"rgba(80,200,160,.04)",border:"1px solid rgba(80,200,160,.15)",borderRadius:8,padding:"14px 16px"}}>
        <div style={{fontSize:13,color:"#50c8a0",letterSpacing:2,marginBottom:8,textTransform:"uppercase"}}>🍽️ Bayer Dinner Table + Wyckoff Phase</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {[
            ["Bayer 2025–2026","Fase DISPOSAL — após champagne/nut do ATH Oct 2025"],
            ["Wyckoff 2026","Fase IV: MARKING DOWN — desde ATH"],
            ["Venus Synodic","SC: 6 Jan 2026 → IC: 24 Out 2026 (291 dias = meio ciclo)"],
            ["Duração bear típica","365–376 dias → mínimo: Out 2026 – Abr 2027"],
            ["Natal BTC","Plutão: 1°Cap (natal) | ATH: 2°Cap | Sun natal: 13°Cap"],
            ["Saturn square natal","Saturno a fazer square ao Plutão natal BTC = transformação estrutural máxima"],
          ].map(([k,v],i)=>(
            <div key={i} style={{background:"rgba(255,255,255,.03)",borderRadius:4,padding:"7px 10px"}}>
              <div style={{fontSize:11,color:"#50c8a0",marginBottom:2}}>{k}</div>
              <div style={{fontSize:13,color:"#c0e0d0",lineHeight:1.4}}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Jensen Key Days compact */}
      <div style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.07)",borderRadius:8,padding:"14px 16px"}}>
        <div style={{fontSize:13,color:"#ffe080",letterSpacing:2,marginBottom:8,textTransform:"uppercase"}}>📐 Jensen Key Days Críticos + Graus Críticos 2026</div>
        <div style={{fontSize:13,color:"#888",marginBottom:10,lineHeight:1.6}}>
          Key Days = Lua square Mercúrio/Marte/Vénus. Se mercado faz H/L num key day → mantém nova tendência até ao próximo key day.
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
          {[
            ["Mar 10–13","TRIPLA Key Day (Lua sq Marte+Mercúrio+Vénus) = extremely critical"],
            ["Feb 26","Saturno 1°Áries = Cardinal Critical (5 dias antes do eclipse)"],
            ["Jun 11","TRIPLA Critical Degrees: Sat 13°Ari + Jup 26°Can + Mer 13°Can"],
            ["Nov 15–16","DUPLA Key Day (sq Vénus+Mercúrio) = confirma Nov 9 bottom"],
            ["Aug 13","Marte 1°Cancer = Cardinal Critical (cluster Aug 15 bullish)"],
            ["Oct 15","Júpiter 21°Leo + Marte 9°Leo = dupla Fixed Critical"],
            ["Dec 8 (orb 0.1°)","Lua sq Marte near-exact = Jensen 5×88d cluster"],
            ["Dec 8","FIM do Santa Claus (não Dez 20). Gap Dec 8–20 = neutro"],
          ].map(([k,v],i)=>(
            <div key={i} style={{background:"rgba(255,255,255,.03)",borderRadius:4,padding:"7px 10px"}}>
              <div style={{fontSize:11,color:"#ffc832",marginBottom:2}}>{k}</div>
              <div style={{fontSize:13,color:"#ddd8c8",lineHeight:1.4}}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Seasonal windows */}
      <div style={{background:"rgba(80,200,80,.03)",border:"1px solid rgba(80,200,80,.15)",borderRadius:8,padding:"14px 16px"}}>
        <div style={{fontSize:13,color:"#50c850",letterSpacing:2,marginBottom:10,textTransform:"uppercase"}}>📅 Seasonals Pesavento (108+ anos de dados)</div>
        {[
          ["Feb 2 – Mar 28","BEARISH","Ides of March"],
          ["Mar 28 – Apr 16","BULLISH","April Earnings Rally"],
          ["Apr 16 – Jun 26","BEARISH","Sell in May and Go Away"],
          ["Jun 26 – Sep 4","BULLISH","Summer Rally"],
          ["Sep 4 – Oct 27","⚠️ CRASH","Fall Crash Cycle"],
          ["Oct 27 – Dec 8","BULLISH","Santa Claus Rally"],
          ["Dec 8 – Dec 20","NEUTRO","Gap (sem seasonal definido)"],
          ["Dec 20 – Jan 7","BULLISH","January Effect"],
        ].map(([dates,bias,label],i)=>{
          const c = bias==="BULLISH"?"#50e870":bias.includes("CRASH")?"#ff5030":bias==="NEUTRO"?"#888":"#ff5050";
          return (
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"5px 0",borderBottom:"1px solid rgba(255,255,255,.04)"}}>
              <div style={{fontSize:13,color:"#a89050",fontFamily:"monospace",minWidth:130,flexShrink:0}}>{dates}</div>
              <div style={{fontSize:13,color:c,minWidth:90,flexShrink:0}}>{bias}</div>
              <div style={{fontSize:11,color:"#888"}}>{label}</div>
            </div>
          );
        })}
      </div>

    </div>
  );
}


const LOCAL_TRENDS = [
  {d:"Apr 08",b:"key",l:"📐 Key Day: Lua sq Marte",dir:"🟢 WATCH LONG",prob:"BAIXA",note:"Key Day Marte + Apr Rally bullish → favorecer long se já em alta",seas:"Apr Rally"},
  {d:"Apr 12",b:"key",l:"📐 Key Day: Lua sq Vénus",dir:"🟢 WATCH LONG",prob:"BAIXA",note:"Key Day Vénus + Apr Rally bullish → favorecer long se já em alta",seas:"Apr Rally"},
  {d:"Apr 16",b:"lnova",l:"🌑 Lua Nova",dir:"🟢 LONG",prob:"MÉDIA",note:"Lua Nova + Apr Rally bullish → bottom clássico",seas:"Apr Rally"},
  {d:"Apr 22",b:"key",l:"📐 Key Day: Lua sq Merc+Marte",dir:"🔴 WATCH SHORT",prob:"BAIXA",note:"Key Day duplo + Sell in May bearish → pico volatilidade, favorecer short",seas:"Sell in May"},
  {d:"Apr 26",b:"peak",l:"🟢 Moon Virgem = Peak QE",dir:"🔴 SHORT",prob:"MÉDIA",note:"Peak QE + Sell in May bearish → TOPO LOCAL → short oportunidade",seas:"Sell in May"},
  {d:"Apr 26",b:"key",l:"📐 Key Day: Lua sq Vénus",dir:"🔴 WATCH SHORT",prob:"BAIXA",note:"Key Day Vénus + Sell in May → confirma pressão baixista",seas:"Sell in May"},
  {d:"Apr 30",b:"lcheia",l:"🌕 Lua Cheia",dir:"🟢 BOUNCE",prob:"MÉDIA",note:"Lua Cheia + Sell in May + inversão bear → FUNDO LOCAL → bounce técnico",seas:"Sell in May"},
  {d:"May 01",b:"low",l:"🔴 Moon Escorpião = Low QE",dir:"🟡 BOUNCE",prob:"MÉDIA",note:"Low QE absoluto + Sell in May → bounce possível mas trend negativo",seas:"Sell in May"},
  {d:"May 07",b:"key",l:"📐 Key Day: Lua sq Marte",dir:"🔴 WATCH SHORT",prob:"BAIXA",note:"Key Day + Sell in May → confirma pressão baixista",seas:"Sell in May"},
  {d:"May 09",b:"key",l:"📐 Key Day: Lua sq Mercúrio",dir:"🔴 WATCH SHORT",prob:"BAIXA",note:"Key Day + Sell in May bearish",seas:"Sell in May"},
  {d:"May 12",b:"key",l:"📐 Key Day: Lua sq Vénus",dir:"🔴 WATCH SHORT",prob:"BAIXA",note:"Key Day + Sell in May bearish",seas:"Sell in May"},
  {d:"May 15",b:"lnova",l:"🌑 Lua Nova",dir:"🔴 SHORT",prob:"MÉDIA",note:"Lua Nova + Sell in May + bear inversion → TOP LOCAL → short",seas:"Sell in May"},
  {d:"May 21",b:"key",l:"📐 Key Day: Lua sq Marte",dir:"🔴 WATCH SHORT",prob:"BAIXA",note:"Key Day + Sell in May bearish",seas:"Sell in May"},
  {d:"May 23",b:"peak",l:"🟢 Moon Virgem = Peak QE",dir:"🔴 SHORT",prob:"MÉDIA",note:"Peak QE + Sell in May bearish → TOPO LOCAL → short",seas:"Sell in May"},
  {d:"May 24",b:"key",l:"📐 Key Day: Lua sq Mercúrio",dir:"🔴 WATCH SHORT",prob:"BAIXA",note:"Key Day + Sell in May bearish",seas:"Sell in May"},
  {d:"May 26",b:"key",l:"📐 Key Day: Lua sq Vénus",dir:"🔴 WATCH SHORT",prob:"BAIXA",note:"Key Day + Sell in May bearish",seas:"Sell in May"},
  {d:"May 28",b:"low",l:"🔴 Moon Escorpião = Low QE",dir:"🟡 BOUNCE",prob:"MÉDIA",note:"Low QE + Sell in May → bounce técnico possível, trend negativo",seas:"Sell in May"},
  {d:"May 30",b:"lcheia",l:"🌕 Lua Cheia",dir:"🟢 BOUNCE",prob:"MÉDIA",note:"Lua Cheia + Sell in May + bear inversion → FUNDO LOCAL → bounce",seas:"Sell in May"},
  {d:"Jun 05",b:"key",l:"📐 Key Day: Lua sq Marte",dir:"🔴 WATCH SHORT",prob:"BAIXA",note:"Key Day + Sell in May bearish",seas:"Sell in May"},
  {d:"Jun 10",b:"key",l:"📐 Key Day: Lua sq Mercúrio",dir:"🔴 WATCH SHORT",prob:"BAIXA",note:"Key Day + Sell in May bearish",seas:"Sell in May"},
  {d:"Jun 11",b:"key",l:"📐 Key Day: Lua sq Vénus",dir:"🔴 WATCH SHORT",prob:"BAIXA",note:"Key Day + Sell in May bearish → perto do fim do seasonal",seas:"Sell in May"},
  {d:"Jun 14",b:"lnova",l:"🌑 Lua Nova",dir:"🔴 SHORT",prob:"MÉDIA",note:"Lua Nova + Sell in May (último) + bear inversion → TOP LOCAL → short",seas:"Sell in May"},
  {d:"Jun 20",b:"peak",l:"🟢 Moon Virgem = Peak QE",dir:"🔴 SHORT",prob:"MÉDIA",note:"Peak QE no final do Sell in May → TOPO LOCAL → short antes do Summer Rally",seas:"Sell in May"},
  {d:"Jun 23",b:"key",l:"📐 Key Day: Lua sq Mercúrio",dir:"🔴 WATCH SHORT",prob:"BAIXA",note:"Key Day final do Sell in May",seas:"Sell in May"},
  {d:"Jun 24",b:"low",l:"🔴 Moon Escorpião = Low QE",dir:"🟡 BOUNCE",prob:"MÉDIA",note:"Low QE + Sell in May ending → bounce técnico, possível início Summer Rally",seas:"Sell in May"},
  {d:"Jun 25",b:"key",l:"📐 Key Day: Lua sq Vénus",dir:"🔴 WATCH SHORT",prob:"BAIXA",note:"Key Day final Sell in May",seas:"Sell in May"},
  {d:"Jun 28",b:"lcheia",l:"🌕 Lua Cheia",dir:"🔴 PEAK",prob:"MÉDIA",note:"Lua Cheia em Summer Rally bullish → peak do rally, tomar lucros em longs",seas:"Summer Rally"},
  {d:"Jul 04",b:"key",l:"📐 Key Day: Lua sq Marte",dir:"🟢 WATCH LONG",prob:"BAIXA",note:"Key Day + Summer Rally bullish → favorecer long",seas:"Summer Rally"},
  {d:"Jul 08",b:"key",l:"📐 Key Day: Lua sq Mercúrio",dir:"🟢 WATCH LONG",prob:"BAIXA",note:"Key Day + Summer Rally bullish → favorecer long",seas:"Summer Rally"},
  {d:"Jul 13",b:"lnova",l:"🌑 Lua Nova",dir:"🟢 LONG",prob:"MÉDIA",note:"Lua Nova + Summer Rally bullish → BOTTOM LOCAL → long",seas:"Summer Rally"},
  {d:"Jul 17",b:"peak",l:"🟢 Moon Virgem = Peak QE",dir:"🟡 WATCH",prob:"BAIXA",note:"Peak QE mas Summer Rally bullish → topo local ligeiro, pullback suave",seas:"Summer Rally"},
  {d:"Jul 20",b:"key",l:"📐 Key Day: Lua sq Mercúrio",dir:"🟢 WATCH LONG",prob:"BAIXA",note:"Key Day + Summer Rally bullish",seas:"Summer Rally"},
  {d:"Jul 22",b:"low",l:"🔴 Moon Escorpião = Low QE",dir:"🟢 LONG",prob:"ALTA",note:"Low QE + Summer Rally bullish → BOTTOM SÓLIDO → long de alta confiança",seas:"Summer Rally"},
  {d:"Jul 25",b:"key",l:"📐 Key Day: Lua sq Vénus",dir:"🟢 WATCH LONG",prob:"BAIXA",note:"Key Day + Summer Rally bullish",seas:"Summer Rally"},
  {d:"Jul 28",b:"lcheia",l:"🌕 Lua Cheia",dir:"🔴 PEAK",prob:"MÉDIA",note:"Lua Cheia + Summer Rally → peak do rally, tomar lucros em longs",seas:"Summer Rally"},
  {d:"Aug 02",b:"key",l:"📐 Key Day: Lua sq Marte",dir:"🟢 WATCH LONG",prob:"BAIXA",note:"Key Day + Summer Rally bullish",seas:"Summer Rally"},
  {d:"Aug 04",b:"key",l:"📐 Key Day: Lua sq Mercúrio",dir:"🟢 WATCH LONG",prob:"BAIXA",note:"Key Day + Summer Rally bullish",seas:"Summer Rally"},
  {d:"Aug 09",b:"key",l:"📐 Key Day: Lua sq Vénus",dir:"🟢 WATCH LONG",prob:"BAIXA",note:"Key Day + Summer Rally bullish",seas:"Summer Rally"},
  {d:"Aug 11",b:"lnova",l:"🌑 Lua Nova",dir:"🟢 LONG",prob:"MÉDIA",note:"Lua Nova + Summer Rally → BOTTOM LOCAL → long",seas:"Summer Rally"},
  {d:"Aug 13",b:"peak",l:"🟢 Moon Virgem = Peak QE",dir:"🟡 WATCH",prob:"BAIXA",note:"Peak QE + Summer Rally → topo local suave, pullback breve",seas:"Summer Rally"},
  {d:"Aug 15",b:"key",l:"📐 Key Day: Lua sq Marte",dir:"🟢 WATCH LONG",prob:"BAIXA",note:"Key Day + Summer Rally bullish",seas:"Summer Rally"},
  {d:"Aug 18",b:"low",l:"🔴 Moon Escorpião = Low QE",dir:"🟢 LONG",prob:"ALTA",note:"Low QE + Summer Rally bullish → BOTTOM SÓLIDO → long de alta confiança",seas:"Summer Rally"},
  {d:"Aug 19",b:"key",l:"📐 Key Day: Lua sq Mercúrio",dir:"🟢 WATCH LONG",prob:"BAIXA",note:"Key Day + Summer Rally bullish",seas:"Summer Rally"},
  {d:"Aug 24",b:"key",l:"📐 Key Day: Lua sq Vénus",dir:"🟢 WATCH LONG",prob:"BAIXA",note:"Key Day + Summer Rally → perto do fim, considerar reduzir longs",seas:"Summer Rally"},
  {d:"Aug 26",b:"lcheia",l:"🌕 Lua Cheia",dir:"🔴 PEAK",prob:"MÉDIA",note:"Lua Cheia + fim Summer Rally → PEAK ALTO → tomar lucros, preparar short",seas:"Summer Rally"},
  {d:"Sep 04",b:"key",l:"📐 Key Day: Lua sq Mercúrio",dir:"🟢 WATCH LONG",prob:"BAIXA",note:"Key Day + últimos dias Summer Rally → cautela crescente",seas:"Summer Rally"},
  {d:"Sep 07",b:"key",l:"📐 Key Day: Lua sq Vénus",dir:"🔴 WATCH SHORT",prob:"BAIXA",note:"Key Day + Fall Crash abre → primeiros sinais bearish",seas:"Fall Crash"},
  {d:"Sep 10",b:"peak",l:"🟢 Moon Virgem = Peak QE",dir:"🔴 SHORT",prob:"ALTA",note:"Peak QE + Fall Crash + LN mesmo dia → TOPO MÁXIMO → short de alta confiança",seas:"Fall Crash"},
  {d:"Sep 10",b:"lnova",l:"🌑 Lua Nova",dir:"🔴 SHORT",prob:"ALTA",note:"Lua Nova + Fall Crash + Peak QE → DUPLA CONFLUÊNCIA TOP → short",seas:"Fall Crash"},
  {d:"Sep 13",b:"key",l:"📐 Key Day: Lua sq Marte",dir:"🔴 WATCH SHORT",prob:"BAIXA",note:"Key Day + Fall Crash → confirma pressão baixista",seas:"Fall Crash"},
  {d:"Sep 14",b:"low",l:"🔴 Moon Escorpião = Low QE",dir:"🟡 BOUNCE",prob:"MÉDIA",note:"Low QE + Fall Crash → bounce técnico possível mas trend é DOWN",seas:"Fall Crash"},
  {d:"Sep 20",b:"key",l:"📐 Key Day: Lua sq Mercúrio",dir:"🔴 WATCH SHORT",prob:"BAIXA",note:"Key Day + Fall Crash bearish",seas:"Fall Crash"},
  {d:"Sep 22",b:"key",l:"📐 Key Day: Lua sq Vénus",dir:"🔴 WATCH SHORT",prob:"BAIXA",note:"Key Day + Fall Crash bearish",seas:"Fall Crash"},
  {d:"Sep 25",b:"lcheia",l:"🌕 Lua Cheia",dir:"🟢 BOUNCE",prob:"MÉDIA",note:"Lua Cheia + Fall Crash + bear inversion → FUNDO LOCAL → bounce técnico",seas:"Fall Crash"},
  {d:"Sep 28",b:"key",l:"📐 Key Day: Lua sq Marte",dir:"🔴 WATCH SHORT",prob:"BAIXA",note:"Key Day + Fall Crash bearish",seas:"Fall Crash"},
  {d:"Oct 05",b:"key",l:"📐 Key Day: Lua sq Merc+Vénus",dir:"🔴 WATCH SHORT",prob:"BAIXA",note:"Key Day duplo + Fall Crash bearish → pico volatilidade baixista",seas:"Fall Crash"},
  {d:"Oct 07",b:"peak",l:"🟢 Moon Virgem = Peak QE",dir:"🔴 SHORT",prob:"ALTA",note:"Peak QE + Fall Crash → TOPO LOCAL CRASH ZONE → short máxima confiança",seas:"Fall Crash"},
  {d:"Oct 09",b:"lnova",l:"🌑 Lua Nova",dir:"🔴 SHORT",prob:"ALTA",note:"Lua Nova + Fall Crash + bear inversion → TOP LOCAL CRASH → short",seas:"Fall Crash"},
  {d:"Oct 12",b:"low",l:"🔴 Moon Escorpião = Low QE",dir:"🟡 BOUNCE",prob:"MÉDIA",note:"Low QE + Fall Crash → bounce técnico, mas Gann 360° próximo = cautela",seas:"Fall Crash"},
  {d:"Oct 12",b:"key",l:"📐 Key Day: Lua sq Marte",dir:"🔴 WATCH SHORT",prob:"BAIXA",note:"Key Day + Fall Crash bearish → confirma pressão",seas:"Fall Crash"},
  {d:"Oct 19",b:"key",l:"📐 Key Day: Lua sq Vénus",dir:"🔴 WATCH SHORT",prob:"BAIXA",note:"Key Day + Fall Crash (final) bearish",seas:"Fall Crash"},
  {d:"Oct 20",b:"key",l:"📐 Key Day: Lua sq Mercúrio",dir:"🔴 WATCH SHORT",prob:"BAIXA",note:"Key Day + Fall Crash bearish → últimos dias crash zone",seas:"Fall Crash"},
  {d:"Oct 25",b:"lcheia",l:"🌕 Lua Cheia",dir:"🟢 BOUNCE",prob:"MÉDIA",note:"Lua Cheia + fim Fall Crash + bear inversion → FUNDO IMPORTANTE → bounce/long",seas:"Fall Crash"},
  {d:"Nov 02",b:"key",l:"📐 Key Day: Lua sq Mercúrio",dir:"🟢 WATCH LONG",prob:"BAIXA",note:"Key Day + Santa Claus bullish → favorecer long",seas:"Santa Claus"},
  {d:"Nov 03",b:"peak",l:"🟢 Moon Virgem = Peak QE",dir:"🟡 WATCH",prob:"BAIXA",note:"Peak QE + Santa Claus bullish → topo local suave, pullback breve",seas:"Santa Claus"},
  {d:"Nov 08",b:"low",l:"🔴 Moon Escorpião = Low QE",dir:"🟢 LONG",prob:"ALTA",note:"Low QE + Santa Claus + NM mesmo dia → BOTTOM MÁXIMO CONFIRMADO → long",seas:"Santa Claus"},
  {d:"Nov 08",b:"lnova",l:"🌑 Lua Nova",dir:"🟢 LONG",prob:"ALTA",note:"Lua Nova + Santa Claus + Low QE Escorpião → TRIPLA CONFLUÊNCIA BOTTOM → long",seas:"Santa Claus"},
  {d:"Nov 09",b:"key",l:"📐 Key Day: Lua sq Marte",dir:"🟢 WATCH LONG",prob:"BAIXA",note:"Key Day + Santa Claus → pico volatilidade bullish",seas:"Santa Claus"},
  {d:"Nov 14",b:"key",l:"📐 Key Day: Lua sq Vénus",dir:"🟢 WATCH LONG",prob:"BAIXA",note:"Key Day + Santa Claus bullish",seas:"Santa Claus"},
  {d:"Nov 15",b:"key",l:"📐 Key Day: Lua sq Mercúrio",dir:"🟢 WATCH LONG",prob:"BAIXA",note:"Key Day + Santa Claus bullish",seas:"Santa Claus"},
  {d:"Nov 23",b:"lcheia",l:"🌕 Lua Cheia",dir:"🔴 PEAK",prob:"MÉDIA",note:"Lua Cheia + Santa Claus → peak do rally, considerar tomar lucros parciais",seas:"Santa Claus"},
  {d:"Nov 24",b:"key",l:"📐 Key Day: Lua sq Marte",dir:"🟢 WATCH LONG",prob:"BAIXA",note:"Key Day + Santa Claus bullish",seas:"Santa Claus"},
  {d:"Nov 28",b:"key",l:"📐 Key Day: Lua sq Vénus",dir:"🟢 WATCH LONG",prob:"BAIXA",note:"Key Day + Santa Claus bullish",seas:"Santa Claus"},
  {d:"Dec 01",b:"peak",l:"🟢 Moon Virgem = Peak QE",dir:"🟡 WATCH",prob:"BAIXA",note:"Peak QE + Santa Claus → topo local suave",seas:"Santa Claus"},
  {d:"Dec 05",b:"low",l:"🔴 Moon Escorpião = Low QE",dir:"🟢 LONG",prob:"ALTA",note:"Low QE + Santa Claus bullish → BOTTOM SÓLIDO → long",seas:"Santa Claus"},
  {d:"Dec 07",b:"lnova",l:"🌑 Lua Nova",dir:"🟢 LONG",prob:"MÉDIA",note:"Lua Nova + Santa Claus bullish → bottom local → long",seas:"Santa Claus"},
  {d:"Dec 13",b:"key",l:"📐 Key Day: Lua sq Vénus",dir:"🟡 VOLATIL.",prob:"BAIXA",note:"Key Day + Dec Gap neutro → spike volatilidade, aguardar direcção",seas:"Dec Gap"},
  {d:"Dec 16",b:"key",l:"📐 Key Day: Lua sq Mercúrio",dir:"🟡 VOLATIL.",prob:"BAIXA",note:"Key Day + Dec Gap neutro → aguardar direcção",seas:"Dec Gap"},
  {d:"Dec 22",b:"key",l:"📐 Key Day: Lua sq Marte",dir:"🟢 WATCH LONG",prob:"BAIXA",note:"Key Day + Jan Effect bullish + Solstício → favorecer long",seas:"Jan Effect"},
  {d:"Dec 23",b:"lcheia",l:"🌕 Lua Cheia",dir:"🔴 PEAK",prob:"MÉDIA",note:"Lua Cheia + Jan Effect → peak local, considerar tomar lucros",seas:"Jan Effect"},
  {d:"Dec 27",b:"key",l:"📐 Key Day: Lua sq Vénus",dir:"🟢 WATCH LONG",prob:"BAIXA",note:"Key Day + Jan Effect bullish",seas:"Jan Effect"},
  {d:"Dec 28",b:"peak",l:"🟢 Moon Virgem = Peak QE",dir:"🟡 WATCH",prob:"BAIXA",note:"Peak QE + Jan Effect → topo local suave",seas:"Jan Effect"},
  {d:"Dec 30",b:"key",l:"📐 Key Day: Lua sq Mercúrio",dir:"🟢 WATCH LONG",prob:"BAIXA",note:"Key Day + Jan Effect bullish → fim do ano",seas:"Jan Effect"},
  // ── MAJOR CALENDAR EVENTS (from CONF + VISAO) ──
  {d:"Apr 06",b:"conf",l:"Gann 180° + Time=Price Squaring",dir:"🔴 SHORT",prob:"MÉDIA",note:"182 dias do ATH = Gann 180° (metade do ciclo anual). Price=Time squaring potencial. Sell in May contextualiza como topo local.",seas:"Sell in May"},
  {d:"Apr 20",b:"conf",l:"⭐ TRIPLA CONJUNÇÃO — Saturn+Neptune+Sol",dir:"🔴 SHORT",prob:"ALTA",note:"Máximo bearish do ano. Saturn+Neptune+Sol conjuntos em Áries. Raridade de ~36 anos. Sell in May + conjunção triple = TOPO MAJOR → short máxima confiança. Pesavento: Saturn=contracção, Neptune=confusão, Sol=trigger.",seas:"Sell in May"},
  {d:"Jun 10",b:"conf",l:"Venus-Jupiter Conjunção (99 ciclos bullish) + Saturn cap",dir:"🟢 BOUNCE",prob:"MÉDIA",note:"Venus-Jupiter = sinal bullish verificado em 99 ciclos (Pesavento). Mercury-Saturn simultâneo = cap ao optimismo. Bounce técnico dentro Sell in May → alívio, não bottom major.",seas:"Sell in May"},
  {d:"Jun 15",b:"conf",l:"⭐⭐⭐⭐⭐⭐ BOTTOM SIGNAL — 6 Frameworks",dir:"🟢 LONG",prob:"ALTA",note:"Sinal mais importante do ano. 6 sistemas convergem: (1) NM em Gemini 730 ciclos Pesavento, (2) Jupiter Quintile Uranus 0.04° Jensen action trigger, (3) Summer Rally aproxima-se, (4) Moon Gemini = absolute low long-term, (5) Hurst 40-day trough, (6) Gann squaring. BOTTOM INTERMÉDIO → long de alta confiança.",seas:"Sell in May→Summer"},
  {d:"Sep 01",b:"conf",l:"⭐ J-S Trine Exacto 0.029° + Fall Crash Abre",dir:"🔴 SHORT",prob:"ALTA",note:"Jupiter-Saturn trine exacto (Jensen bullish estrutural). Mas Fall Crash abre hoje. Jensen (1978): trine durante Node bearish = bottom 15-18 meses à frente. Gann 360° a 35 dias. PICO do rally de verão antes da queda de outono → short.",seas:"Fall Crash"},
  {d:"Sep 24",b:"conf",l:"Jupiter-Saturn Trine 120° confirmado (Jensen)",dir:"🟡 WATCH",prob:"MÉDIA",note:"J-S trine exacto JPL confirmado. Jensen: bullish estrutural. Mas Fall Crash Zone sobrepõe-se. Conflito → turning point bottom intermédio, confirmar com price action antes de entrar long.",seas:"Fall Crash"},
  {d:"Oct 06",b:"conf",l:"⭐ GANN 360° — Ciclo Anual + Crash Zone",dir:"🔴 SHORT",prob:"ALTA",note:"364-366 dias exactos do ATH (Oct 6, 2025). Gann: ciclo anual completo = turning point mais poderoso. Fall Crash Zone + Zeus conjunct Vulcanus (guerra/disrupção). Data mais crítica do ano para shorts.",seas:"Fall Crash"},
  {d:"Oct 24",b:"conf",l:"☿ Mercury Retrograde + ♀ Venus IC (Bayer)",dir:"🔴 SHORT",prob:"ALTA",note:"Venus Inferior Conjunction = 291 dias do Venus SC de Jan 6 = turning point exacto de Bayer. Simultâneo com Mercury Retrograde. Ambos planetas interiores em confusão. Fall Crash Zone → short.",seas:"Fall Crash"},
  {d:"Nov 08",b:"conf",l:"⭐⭐⭐ TRIPLO BOTTOM — NM + Escorpião Low QE + Santa Claus",dir:"🟢 LONG",prob:"ALTA",note:"Tripla confluência máxima: (1) Lua Nova = turning point, (2) Moon Escorpião = Low QE absoluto, (3) Santa Claus rally activo desde Oct 27. Pesavento 4 Steps todos apontam LONG. J-S trine bullish backdrop. BOTTOM DO CICLO → long máxima confiança.",seas:"Santa Claus"},
  {d:"Dec 21",b:"conf",l:"⭐ Gann 7×9w = Jensen 5×88d = Solstício Inverno",dir:"🟢 LONG",prob:"ALTA",note:"Tripla convergência temporal: Gann 7×9 semanas = 63 semanas do ATH; Jensen 5×88 dias Mercúrio = 440 dias do ATH; Solstício Inverno (Sun entra Cap = oposição natal EUA = January Effect). Bottom intermédio → long.",seas:"Jan Effect"},
];

function LocalTrendsView() {
  const [tf, setTf] = useState("all");
  const today = new Date();
  const todayStr = today.toLocaleDateString("en-US",{month:"short",day:"2-digit"}).replace(",","");

  const filtered = (tf==="all"?LOCAL_TRENDS:LOCAL_TRENDS.filter(e=>
    tf==="short"?e.dir.includes("SHORT"):
    tf==="long"?e.dir.includes("LONG"):
    tf==="alta"?e.prob==="ALTA":
    tf==="conf"?e.b==="conf":
    e.b===tf
  )).sort((a,b)=>{
    const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const [am,ad]=a.d.split(" "); const [bm,bd]=b.d.split(" ");
    const av=months.indexOf(am)*100+parseInt(ad);
    const bv=months.indexOf(bm)*100+parseInt(bd);
    return av-bv;
  });

  const dirCfg = (dir, typ) => {
    if(typ==="conf"&&dir.includes("LONG")) return {bg:"rgba(255,224,80,.08)",bc:"rgba(255,224,80,.4)",color:"#ffe080"};
    if(typ==="conf"&&dir.includes("SHORT")) return {bg:"rgba(255,60,60,.1)",bc:"rgba(255,60,60,.5)",color:"#ff4040"};
    if(typ==="conf") return {bg:"rgba(255,224,80,.05)",bc:"rgba(255,224,80,.3)",color:"#ffcc60"};
    if(dir.includes("SHORT")&&!dir.includes("WATCH")) return {bg:"rgba(255,60,60,.08)",bc:"rgba(255,60,60,.35)",color:"#ff5060"};
    if(dir.includes("LONG")&&!dir.includes("WATCH")) return {bg:"rgba(80,232,120,.08)",bc:"rgba(80,232,120,.35)",color:"#50e878"};
    if(dir.includes("BOUNCE")) return {bg:"rgba(80,200,100,.06)",bc:"rgba(80,200,100,.25)",color:"#60d080"};
    if(dir.includes("PEAK")) return {bg:"rgba(255,80,60,.06)",bc:"rgba(255,80,60,.25)",color:"#ff7060"};
    if(dir.includes("WATCH SHORT")) return {bg:"rgba(255,100,60,.05)",bc:"rgba(255,100,60,.2)",color:"#ff8060"};
    if(dir.includes("WATCH LONG")) return {bg:"rgba(80,200,120,.05)",bc:"rgba(80,200,120,.2)",color:"#70d090"};
    return {bg:"rgba(160,180,200,.05)",bc:"rgba(160,180,200,.2)",color:"#a0b8d0"};
  };

  const probColor = p => p==="ALTA"?"#ffe080":p==="MÉDIA"?"#c8b060":"#555";

  const months = {};
  filtered.forEach(e=>{
    const mo = e.d.split(" ")[0];
    if(!months[mo]) months[mo]=[];
    months[mo].push(e);
  });

  const tBtns = [
    {k:"all",l:"Todos"},
    {k:"alta",l:"⭐ Alta conf."},
    {k:"short",l:"🔴 Short"},
    {k:"long",l:"🟢 Long"},
    {k:"conf",l:"🌟 Confluências"},
    {k:"peak",l:"Virgem Peak"},
    {k:"low",l:"Escorpião Low"},
  ];

  return (
    <div style={{position:"relative",zIndex:1,maxWidth:720,width:"100%",margin:"0 auto",padding:"0 12px 60px"}}>
      <div style={{textAlign:"center",marginBottom:16}}>
        <div style={{fontSize:22,letterSpacing:3,color:"#c8b060",fontWeight:"normal",marginBottom:4}}>Local Trends 2026</div>
        <div style={{fontSize:11,color:"#666",letterSpacing:1}}>Moon Sign QE + Lua Nova/Cheia + Jensen Key Days · contexto direcional</div>
        <div style={{fontSize:10,color:"#444",marginTop:3}}>Bear market activo · Inversão LN/LC aplicada · Seasonal integrado</div>
      </div>

      <div style={{display:"flex",gap:5,justifyContent:"center",marginBottom:14,flexWrap:"wrap"}}>
        {tBtns.map(b=>(
          <button key={b.k} onClick={()=>setTf(b.k)}
            style={{padding:"4px 12px",background:tf===b.k?"rgba(200,176,96,.15)":"rgba(255,255,255,.03)",
              border:`1px solid ${tf===b.k?"#c8b060":"rgba(255,255,255,.07)"}`,borderRadius:4,
              color:tf===b.k?"#c8b060":"#555",fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>
            {b.l}
          </button>
        ))}
      </div>

      {Object.entries(months).map(([mo,evs])=>(
        <div key={mo} style={{marginBottom:18}}>
          <div style={{fontSize:10,letterSpacing:3,color:"#a89050",textTransform:"uppercase",
            borderBottom:"1px solid rgba(200,176,96,.12)",paddingBottom:4,marginBottom:8}}>
            ── {mo} ({evs.length} sinais) ──────────────
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {evs.map((ev,i)=>{
              const dc = dirCfg(ev.dir, ev.b);
              const isToday = ev.d===todayStr;
              const isHigh = ev.prob==="ALTA";
              const isConf = ev.b==="conf";
              return (
                <div key={i} style={{
                  display:"flex",gap:10,alignItems:"flex-start",
                  padding:"10px 12px",borderRadius:6,
                  background:isConf?"rgba(255,200,50,.06)":isHigh?"rgba(255,224,80,.03)":dc.bg,
                  border:`1px solid ${isToday?"#c8b060":isConf?"#ffb43266":isHigh?"rgba(255,224,80,.2)":dc.bc}`,
                  borderLeft:`3px solid ${isConf?"#ffb432":isHigh?"#ffe080":dc.color}`,
                }}>
                  <div style={{minWidth:44,flexShrink:0}}>
                    <div style={{fontSize:12,color:"#888",fontFamily:"sans-serif"}}>{ev.d.split(" ")[1]} {ev.d.split(" ")[0].substring(0,3)}</div>
                    {isToday&&<div style={{fontSize:9,color:"#ffe080"}}>HOJE</div>}
                    {isConf&&<div style={{fontSize:9,color:"#ffb432",fontWeight:"bold"}}>⭐ CONF</div>}
                    {isHigh&&!isConf&&<div style={{fontSize:9,color:"#ffe080"}}>⭐ ALTA</div>}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:4,marginBottom:4}}>
                      <span style={{fontSize:12,color:"#ccc"}}>{ev.l}</span>
                      <div style={{display:"flex",gap:6,alignItems:"center",flexShrink:0}}>
                        <span style={{fontSize:11,color:probColor(ev.prob),background:"rgba(0,0,0,.3)",borderRadius:3,padding:"1px 6px"}}>{ev.prob}</span>
                        <span style={{fontSize:11,color:dc.color,fontWeight:"bold"}}>{ev.dir}</span>
                      </div>
                    </div>
                    <div style={{fontSize:11,color:"#5a5850",lineHeight:1.5}}>{ev.note}</div>
                    <div style={{fontSize:10,color:"#3a3830",marginTop:3}}>Seasonal: {ev.seas}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div style={{fontSize:10,color:"#2a2820",textAlign:"center",marginTop:8,lineHeight:1.7,padding:"10px 0"}}>
        Fontes: Pesavento Cap.11 (Moon vs Sign QE) · Jensen (1978) Key Days · Bear Market Inversion (Pesavento p.20)<br/>
        ⭐ Alta conf. = múltiplos frameworks alinham na mesma direcção
      </div>
    </div>
  );
}



const ATH_PRICE = 126272;
const LOW_PRICE = 60001;
const S144_UNIT = (ATH_PRICE - LOW_PRICE) / 144; // $460.22/unit

const S144_LEVELS = [];
for(let n=0;n<=144;n+=6){
  S144_LEVELS.push({
    n,
    price: Math.round(ATH_PRICE - n * S144_UNIT),
    major: n%18===0,
    frac: n===0?"ATH":n===144?"LOW":n===72?"½":n===36?"¼":n===108?"¾":
          n===18?"⅛":n===126?"⅞":n===54?"⅜":n===90?"⅝":`${n}/144`,
  });
}

function ChartS144View() {
  const btc = useBtcPrice();
  const [change24h, setChange24h] = useState(null);
  const [lastUpd, setLastUpd] = useState(null);

  useEffect(()=>{
    const go = ()=>fetch("https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT")
      .then(r=>r.json())
      .then(d=>{setChange24h(parseFloat(d.priceChangePercent));setLastUpd(new Date().toLocaleTimeString("pt-PT"));})
      .catch(()=>{});
    go();
    const iv = setInterval(go,20000);
    return ()=>clearInterval(iv);
  },[]);

  const price = btc || 71560;
  const unitsFromLow = (price-LOW_PRICE)/S144_UNIT;
  const pctATH = ((ATH_PRICE-price)/ATH_PRICE*100).toFixed(1);
  const pctLow = ((price-LOW_PRICE)/LOW_PRICE*100).toFixed(1);
  const timeLag = (40-unitsFromLow).toFixed(1);
  const below = S144_LEVELS.filter(l=>l.price<=price).sort((a,b)=>b.price-a.price)[0]||S144_LEVELS[S144_LEVELS.length-1];
  const above = S144_LEVELS.filter(l=>l.price>price).sort((a,b)=>a.price-b.price)[0]||S144_LEVELS[0];
  const up = (change24h||0)>=0;

  const SH=380,SW=290,PT=24,PB=24,PL=48,PR=48;
  const toY=p=>PT+(ATH_PRICE-p)/(ATH_PRICE-LOW_PRICE)*(SH-PT-PB);
  const cy=toY(price);

  return(
    <div style={{position:"relative",zIndex:1,maxWidth:720,width:"100%",margin:"0 auto",padding:"0 12px 60px"}}>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:11,letterSpacing:3,color:"#a89050",textTransform:"uppercase",marginBottom:8}}>Square of 144 · BTC Live</div>
        <div style={{display:"flex",alignItems:"baseline",justifyContent:"center",gap:12,marginBottom:4}}>
          <span style={{fontSize:42,color:"#ffe080",letterSpacing:-1,fontWeight:"normal"}}>${price.toLocaleString("en",{maximumFractionDigits:0})}</span>
          <span style={{fontSize:18,color:up?"#50e878":"#ff5060",fontFamily:"sans-serif"}}>{up?"+":""}{change24h?.toFixed(2)||"..."}%</span>
        </div>
        <div style={{fontSize:11,color:"#444",letterSpacing:1}}>BTC/USDT · Binance · {lastUpd?`${lastUpd}`:"a carregar..."} · cada 20s</div>
      </div>

      <div style={{display:"flex",gap:16,alignItems:"flex-start",justifyContent:"center",flexWrap:"wrap"}}>
        <svg width={SW} height={SH} style={{flexShrink:0}}>
          <rect width={SW} height={SH} rx={8} fill="rgba(6,7,16,0.85)" stroke="rgba(200,176,96,.15)" strokeWidth={1}/>
          <text x={SW/2} y={14} fill="#a89050" fontSize={9} textAnchor="middle" letterSpacing={2}>SQUARE OF 144</text>
          {S144_LEVELS.map(l=>{
            const y=toY(l.price);
            const isA=l.n===0,isL=l.n===144,isM=l.n===72;
            const col=isA?"#ffe080":isL?"#ff4060":isM?"#90e0f0":l.major?"#c8b06066":"#33333355";
            const th=isA||isL||isM?1.5:l.major?0.8:0.3;
            const da=isA||isL?"":isM?"6,3":l.major?"4,4":"2,6";
            return(
              <g key={l.n}>
                <line x1={PL} y1={y} x2={SW-PR} y2={y} stroke={col} strokeWidth={th} strokeDasharray={da}/>
                {l.major&&<>
                  <text x={PL-4} y={y+3.5} fill={col} fontSize={8} textAnchor="end">${Math.round(l.price/1000)}K</text>
                  <text x={SW-PR+4} y={y+3.5} fill={col} fontSize={8}>{l.frac}</text>
                </>}
              </g>
            );
          })}
          <rect x={PL} y={toY(above.price)} width={SW-PL-PR} height={toY(below.price)-toY(above.price)} fill="rgba(255,224,128,0.05)"/>
          <line x1={PL} y1={cy} x2={SW-PR} y2={cy} stroke="#ffe080" strokeWidth={2}/>
          <circle cx={PL} cy={cy} r={4} fill="#ffe080"/>
          <circle cx={SW-PR} cy={cy} r={4} fill="#ffe080"/>
          <rect x={PL+(SW-PL-PR)/2-28} y={cy-13} width={56} height={14} rx={3} fill="#ffe08022" stroke="#ffe08055"/>
          <text x={PL+(SW-PL-PR)/2} y={cy-3} fill="#ffe080" fontSize={9} textAnchor="middle" fontWeight="bold">${Math.round(price/1000)}K</text>
          <text x={PL+4} y={PT+5} fill="#ffe08088" fontSize={8}>ATH $126K — Oct 6 2025</text>
          <text x={PL+4} y={SH-PB+3} fill="#ff406088" fontSize={8}>LOW $60K — Feb 27 2026 (dia 144)</text>
        </svg>

        <div style={{flex:1,minWidth:190,display:"flex",flexDirection:"column",gap:10}}>
          <div style={{background:"rgba(255,224,128,.06)",border:"1px solid rgba(255,224,128,.2)",borderRadius:6,padding:"12px 14px"}}>
            <div style={{fontSize:10,color:"#a89050",letterSpacing:2,marginBottom:8,textTransform:"uppercase"}}>Posição S144</div>
            <div style={{fontSize:13,color:"#ffe080",marginBottom:4}}>Nível <strong>{unitsFromLow.toFixed(1)}/144</strong> do LOW</div>
            <div style={{fontSize:12,color:"#c8b060",marginBottom:6}}>Zona: {below.frac} → {above.frac}</div>
            <div style={{background:"rgba(0,0,0,.4)",borderRadius:4,height:8,overflow:"hidden"}}>
              <div style={{width:`${Math.min(100,unitsFromLow/144*100).toFixed(1)}%`,height:"100%",background:"linear-gradient(90deg,#ff4060,#ffe080)",borderRadius:4}}/>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:"#555",marginTop:3}}>
              <span>LOW $60K</span><span>ATH $126K</span>
            </div>
          </div>

          <div style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.06)",borderRadius:6,padding:"12px 14px",display:"flex",flexDirection:"column",gap:6}}>
            <div style={{fontSize:10,color:"#a89050",letterSpacing:2,marginBottom:2,textTransform:"uppercase"}}>Níveis Chave</div>
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <span style={{fontSize:12,color:"#90e0f0"}}>▲ Resist.</span>
              <span style={{fontSize:13,color:"#90e0f0",fontFamily:"sans-serif"}}>${above.price.toLocaleString()} <span style={{fontSize:10,color:"#555"}}>({above.frac})</span></span>
            </div>
            <div style={{height:1,background:"rgba(255,255,255,.05)"}}/>
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <span style={{fontSize:12,color:"#ffe080"}}>● BTC</span>
              <span style={{fontSize:13,color:"#ffe080",fontFamily:"sans-serif"}}>${price.toLocaleString()}</span>
            </div>
            <div style={{height:1,background:"rgba(255,255,255,.05)"}}/>
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <span style={{fontSize:12,color:"#ff5060"}}>▼ Suporte</span>
              <span style={{fontSize:13,color:"#ff5060",fontFamily:"sans-serif"}}>${below.price.toLocaleString()} <span style={{fontSize:10,color:"#555"}}>({below.frac})</span></span>
            </div>
          </div>

          <div style={{background:"rgba(255,80,60,.04)",border:"1px solid rgba(255,80,60,.15)",borderRadius:6,padding:"12px 14px"}}>
            <div style={{fontSize:10,color:"#a89050",letterSpacing:2,marginBottom:6,textTransform:"uppercase"}}>Price = Time (Gann)</div>
            <div style={{fontSize:12,color:"#c0c8d0",lineHeight:1.7}}>
              <div>📅 Dias desde LOW: <strong style={{color:"#90e0f0"}}>40</strong></div>
              <div>📐 Unidades preço: <strong style={{color:"#90e0f0"}}>{unitsFromLow.toFixed(1)}</strong></div>
              <div>⚠️ Time lag: <strong style={{color:"#ff7050"}}>{timeLag} dias</strong></div>
            </div>
            <div style={{fontSize:11,color:"#ff7050",marginTop:6,lineHeight:1.5}}>Tempo move mais rápido que preço → BEARISH em Gann</div>
          </div>

          <div style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.06)",borderRadius:6,padding:"12px 14px",display:"flex",flexDirection:"column",gap:4}}>
            <div style={{fontSize:10,color:"#a89050",letterSpacing:2,marginBottom:4,textTransform:"uppercase"}}>Distâncias</div>
            <div style={{fontSize:12,color:"#888"}}>Do ATH: <span style={{color:"#ff5060"}}>−${(ATH_PRICE-price).toLocaleString()} (−{pctATH}%)</span></div>
            <div style={{fontSize:12,color:"#888"}}>Do LOW: <span style={{color:"#50e878"}}>+${(price-LOW_PRICE).toLocaleString()} (+{pctLow}%)</span></div>
            <div style={{fontSize:12,color:"#888"}}>Unidade S144: <span style={{color:"#c8b060"}}>$460</span></div>
            <div style={{fontSize:12,color:"#888"}}>↑ até {above.frac}: <span style={{color:"#90e0f0"}}>+${(above.price-price).toLocaleString()}</span></div>
            <div style={{fontSize:12,color:"#888"}}>↓ até {below.frac}: <span style={{color:"#ff5060"}}>−${(price-below.price).toLocaleString()}</span></div>
          </div>
        </div>
      </div>

      <div style={{marginTop:20,borderRadius:8,overflow:"hidden",border:"1px solid rgba(200,176,96,.15)"}}>
        <div style={{fontSize:10,color:"#a89050",letterSpacing:2,textAlign:"center",padding:"8px 0 4px",textTransform:"uppercase",background:"rgba(6,7,16,.9)"}}>TradingView — BTCUSDT Daily</div>
        <iframe src="https://s.tradingview.com/widgetembed/?symbol=BINANCE%3ABTCUSDT&interval=D&theme=dark&style=1&locale=pt&timezone=Europe%2FLisbon" style={{width:"100%",height:420,border:"none",display:"block"}}/>
      </div>

      <div style={{marginTop:14,padding:"12px 14px",background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.04)",borderRadius:6}}>
        <div style={{fontSize:10,color:"#a89050",letterSpacing:2,marginBottom:6,textTransform:"uppercase"}}>Metodologia S144</div>
        <div style={{fontSize:11,color:"#5a5850",lineHeight:1.8}}>
          144 = 12² · Fibonacci · Ancora: ATH $126,272 (Oct 6 2025) → LOW $60,001 (Feb 27 2026) · 144 dias exactos = 144 unidades $460 · <strong style={{color:"#c8b060"}}>Price=Time confirmado</strong> · Unidade: $460.22
        </div>
      </div>
    </div>
  );
}

// ── WEEK VIEW DATA ──────────────────────────────────────────
const WEEK_DATA = {
  weekLabel: "Apr 13-19, 2026",
  seasonal: "April Rally → Sell in May (termina Apr 16)",
  btcRef: 71500,
  s144: {
    resist1: {n:114, price:73807, label:"114/144 — topo rejeitado"},
    resist2: {n:108, price:76569, label:"108/144 = ¾"},
    support1: {n:120, price:71046, label:"120/144 — suporte imediato"},
    support2: {n:126, price:68285, label:"126/144 — suporte major"},
  },
  aspects: [
    {d:"Apr 13",wd:"Seg",aspect:"Vénus ⚹ Júpiter",icon:"🟢",
     bias:"neut",tag:"Fade",
     note:"Aspecto mais bullish (99 ciclos Pesavento) — EXACTO hoje às 6h UTC. Mas o rally de $68K→$73.8K já foi esse movimento. Energia consumida. Gann: dia 45 do LOW (45° = ponto de turning). Lua Peixes → sem sinal QE.",
     s144:"Resistência $73,807 já testada e rejeitada. Suporte $71,046."},
    {d:"Apr 14",wd:"Ter",aspect:"Mercúrio ⚹ Úrano",icon:"🟢",
     bias:"bull",tag:"Melhor bounce",
     note:"Mercúrio+Úrano = notícia inesperada positiva. Lua Trine Júpiter (1.9°) simultâneo. Net Force +2 — o único dia com vantagem bullish líquida clara. Bounce real mas limitado: lower high vs topo de 11 Abr.",
     s144:"Alvo do bounce: $72,000-73,000. Não $73,807."},
    {d:"Apr 15",wd:"Qua",aspect:"Mercúrio ingress Áries",icon:"🟡",
     bias:"pivot",tag:"Pivot Day",
     note:"Mercúrio muda Peixes→Áries às ~16h UTC. Pesavento: mudança de signo de Mercúrio = factor de mercado poderoso. Manhã ainda com momentum. A partir das 15-16h UTC Lua também entra Áries → energia muda de direcção.",
     s144:"Se bounce chegou $72-73K, short entry aqui com SL acima $73,807."},
    {d:"Apr 16",wd:"Qui",aspect:"Marte ⚹ Plutão",icon:"🟡",
     bias:"spike",tag:"Último spike?",
     note:"Marte+Plutão = acção de força transformadora. Único aspecto com poder bullish Qui-Dom. Último dia do April Rally seasonal. Possível spike de intraday mas Marte já sob atracção de Saturno (2.3° de orb). Lower high.",
     s144:"Spike pode testar $72,500-73,000. Manter SL acima $73,807."},
    {d:"Apr 17",wd:"Sex",aspect:"Mercúrio ☌ Neptuno + 🌑 LN 8h30 UTC",icon:"🔴",
     bias:"bear",tag:"TOPO — Reversão",
     note:"LUA NOVA exacta 8h30 UTC em Áries 27°. Bear market inversion (Pesavento, 1970-80, 2008-09): LN em bear = TOPO DO CICLO LUNAR. Mercúrio+Neptuno exacto: narrativa confusa, notícias contraditórias. Topo e reversão.",
     s144:"Short confirmado após LN. Alvo $68,285 (126/144)."},
    {d:"Apr 18",wd:"Sáb",aspect:"Mercúrio ⚹ Plutão",icon:"🔴",
     bias:"bear",tag:"Queda",
     note:"Sextil Mercúrio/Plutão tecnicamente positivo mas neutralizado por Neptuno (orb 2.1°). Marte/Saturno orb 0.9° — quase exacto. Backdrop bearish domina totalmente. Queda contínua desde sexta.",
     s144:"Possível teste $71,046→$68,285. Manter shorts."},
    {d:"Apr 19",wd:"Dom",aspect:"Marte ☌ Saturno EXACTO",icon:"🔴🔴",
     bias:"bear",tag:"MÁXIMO BEARISH",
     note:"MARTE CONJUNÇÃO SATURNO exacto (0.3°). Acção completamente bloqueada por Saturno. Lua entra Gémeos 17h UTC = LOW ABSOLUTO (Pesavento 730 ciclos). Sol+Saturno+Neptuno tripla conj amanhã. Pior dia da semana.",
     s144:"Alvo $68,285 ou abaixo. Tripla conj 20 Abr em seguida."},
  ]
};

const biasConfig = {
  bull:   {bg:"rgba(80,232,120,.08)",bc:"rgba(80,232,120,.4)",  color:"#50e878", label:"BULLISH"},
  bear:   {bg:"rgba(255,60,60,.08)", bc:"rgba(255,60,60,.4)",   color:"#ff4060", label:"BEARISH"},
  neut:   {bg:"rgba(160,184,208,.06)",bc:"rgba(160,184,208,.3)",color:"#a0b8d0", label:"NEUTRAL"},
  pivot:  {bg:"rgba(255,200,50,.07)",bc:"rgba(255,200,50,.35)", color:"#ffc832", label:"PIVOT"},
  spike:  {bg:"rgba(255,160,40,.07)",bc:"rgba(255,160,40,.3)",  color:"#ffa028", label:"SPIKE"},
};

function WeekView() {
  const [sel, setSel] = useState(null);
  const today = new Date();
  const todayStr = today.toLocaleDateString("en-US",{month:"short",day:"2-digit"}).replace(",","");
  const w = WEEK_DATA;

  return (
    <div style={{position:"relative",zIndex:1,maxWidth:720,width:"100%",margin:"0 auto",padding:"0 12px 60px"}}>

      {/* Header */}
      <div style={{textAlign:"center",marginBottom:18}}>
        <div style={{fontSize:11,letterSpacing:3,color:"#a89050",textTransform:"uppercase",marginBottom:6}}>Semana Corrente</div>
        <div style={{fontSize:24,color:"#c8b060",letterSpacing:2,fontWeight:"normal",marginBottom:4}}>{w.weekLabel}</div>
        <div style={{fontSize:11,color:"#555",marginBottom:3}}>Seasonal: {w.seasonal}</div>
        <div style={{fontSize:10,color:"#444"}}>Bear market activo · Inversão LN/LC · Hurst underlying −2</div>
      </div>

      {/* S144 Quick Reference */}
      <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:18,flexWrap:"wrap"}}>
        {[
          {label:"↑ $73,807",sub:"114/144 resistência",color:"#ff6060"},
          {label:"● $71,500",sub:"BTC actual",color:"#ffe080"},
          {label:"↓ $71,046",sub:"120/144 suporte",color:"#50e878"},
          {label:"↓↓ $68,285",sub:"126/144 major",color:"#ff4060"},
        ].map((l,i)=>(
          <div key={i} style={{background:"rgba(255,255,255,.03)",border:`1px solid ${l.color}33`,borderRadius:5,padding:"5px 10px",textAlign:"center"}}>
            <div style={{fontSize:12,color:l.color,fontFamily:"sans-serif",fontWeight:"bold"}}>{l.label}</div>
            <div style={{fontSize:9,color:"#555"}}>{l.sub}</div>
          </div>
        ))}
      </div>

      {/* Daily Aspects */}
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {w.aspects.map((ev,i)=>{
          const bc = biasConfig[ev.bias]||biasConfig.neut;
          const isToday = ev.d===todayStr;
          const isOpen = sel===i;
          return (
            <div key={i} onClick={()=>setSel(isOpen?null:i)}
              style={{
                background:isToday?"rgba(200,176,96,.08)":bc.bg,
                border:`1px solid ${isToday?"#c8b060":isOpen?bc.bc:bc.bc+"88"}`,
                borderLeft:`4px solid ${bc.color}`,
                borderRadius:7,padding:"12px 14px",cursor:"pointer",
                transition:"border-color .15s",userSelect:"none",
              }}>
              {/* Row 1: date + aspect + tag */}
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6,flexWrap:"wrap"}}>
                <div style={{minWidth:70,flexShrink:0}}>
                  <span style={{fontSize:13,color:"#888",fontFamily:"sans-serif"}}>{ev.wd} </span>
                  <span style={{fontSize:13,color:"#c8b060",fontFamily:"sans-serif"}}>{ev.d.split(" ")[1]}</span>
                  {isToday&&<div style={{fontSize:9,color:"#ffe080"}}>HOJE</div>}
                </div>
                <div style={{flex:1}}>
                  <span style={{fontSize:14,color:bc.color,fontWeight:"bold"}}>{ev.icon} {ev.aspect}</span>
                </div>
                <div style={{
                  fontSize:11,color:bc.color,background:bc.bg,
                  border:`1px solid ${bc.bc}`,borderRadius:3,padding:"1px 8px",flexShrink:0
                }}>{ev.tag}</div>
              </div>

              {/* Row 2: note */}
              <div style={{fontSize:12,color:"#7a7870",lineHeight:1.55,paddingLeft:80}}>
                {ev.note}
              </div>

              {/* Expanded: S144 */}
              {isOpen&&(
                <div style={{marginTop:10,paddingTop:10,borderTop:"1px solid rgba(255,255,255,.06)",paddingLeft:80}}>
                  <div style={{fontSize:10,color:"#a89050",letterSpacing:2,marginBottom:4,textTransform:"uppercase"}}>S144 · Acção</div>
                  <div style={{fontSize:12,color:"#c0c8d0",lineHeight:1.6}}>{ev.s144}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Net Force visual */}
      <div style={{marginTop:20,background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.05)",borderRadius:6,padding:"14px"}}>
        <div style={{fontSize:10,color:"#a89050",letterSpacing:2,marginBottom:10,textTransform:"uppercase"}}>Net Force — Semana</div>
        <div style={{display:"flex",gap:4,alignItems:"flex-end",justifyContent:"space-around"}}>
          {[
            {d:"Seg",net:1,bias:"neut"},
            {d:"Ter",net:2,bias:"bull"},
            {d:"Qua",net:0,bias:"pivot"},
            {d:"Qui",net:-2,bias:"spike"},
            {d:"Sex",net:-2,bias:"bear"},
            {d:"Sáb",net:-3,bias:"bear"},
            {d:"Dom",net:-4,bias:"bear"},
          ].map((day,i)=>{
            const bc=biasConfig[day.bias]||biasConfig.neut;
            const h=Math.abs(day.net)*18+8;
            const isPos=day.net>0;
            return(
              <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <div style={{fontSize:10,color:bc.color,fontFamily:"sans-serif"}}>{day.net>0?"+":""}{day.net}</div>
                <div style={{
                  width:32,height:h,
                  background:bc.color+"44",border:`1px solid ${bc.color}`,
                  borderRadius:3,
                }}/>
                <div style={{fontSize:10,color:"#666"}}>{day.d}</div>
              </div>
            );
          })}
        </div>
        <div style={{fontSize:10,color:"#333",marginTop:8,textAlign:"center"}}>
          Net Force positivo = bullish backdrop · negativo = bearish backbone
        </div>
      </div>

      {/* Footer note */}
      <div style={{fontSize:10,color:"#2a2820",textAlign:"center",marginTop:14,lineHeight:1.7}}>
        Fontes: Pesavento (4 Steps, bear inversion) · Hurst (underlying trend −2) · Gann S144 · Jensen Key Days<br/>
        Topo confirmado: $73,807 (114/144) — 11 Abr · Próximo evento major: Marte☌Saturno 19 Abr
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("MAPA");
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);
  const month = D[active] || {l:"Local Trends",e:[]};
  const isSpecial = active==="MAPA"||active==="WEEK"||active==="S144"||active==="TREND"||active==="VISAO"||active==="CONF";
  const events = filter==="all"?month.e:month.e.filter(e=>e.t===filter);
  const isConfl = e => e.e.startsWith("⭐");
  const toggle = i => setExpanded(expanded===i?null:i);

  return (
    <div style={{minHeight:"100vh",background:"#060710",fontFamily:"Georgia,serif",color:"#e0d8cc",display:"flex",flexDirection:"column"}}>
      <div style={{position:"fixed",inset:0,zIndex:0,background:"radial-gradient(ellipse at 15% 20%,rgba(40,18,80,.65),transparent 50%),radial-gradient(ellipse at 85% 80%,rgba(8,28,58,.65),transparent 50%)",pointerEvents:"none"}}/>
      <header style={{position:"relative",zIndex:1,textAlign:"center",padding:"24px 16px 10px"}}>
        <p style={{fontSize:12,letterSpacing:2,color:"#a89050",margin:"0 0 5px",textTransform:"uppercase"}}>Gann · Jensen · Pesavento · Bayer · Fibonacci · NASA/JPL · ATH Oct 6, 2025</p>
        <h1 style={{fontSize:"clamp(22px,5vw,40px)",fontWeight:"normal",letterSpacing:2,margin:0,background:"linear-gradient(120deg,#ffe080,#c8b060,#ffcce0,#90e0f0)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>BTC Astro-Timing 2026</h1>
        <div style={{width:40,height:1,background:"linear-gradient(90deg,transparent,#c8b060,transparent)",margin:"6px auto"}}/>
        <p style={{fontSize:12,color:"#ffe08066",margin:0}}>Click any event · source · reasoning · historical bias</p>
      </header>
      <nav style={{position:"relative",zIndex:1,display:"flex",flexWrap:"wrap",justifyContent:"center",gap:4,padding:"8px 10px 3px"}}>
        {MONTHS.map(m=>{
          const isA=active===m,isV=m==="VISAO",isC=m==="CONF";
          const hC=!isV&&!isC&&D[m]&&D[m].e&&D[m].e.some&&D[m].e.some(e=>isConfl(e));
          const bg=isA?(isV?"rgba(100,200,220,.18)":isC?"rgba(255,180,50,.18)":"rgba(255,200,50,.14)"):"rgba(255,255,255,.03)";
          const bd=isA?(isV?"#64c8dc":isC?"#ffb432":"#ffc832"):hC?"rgba(255,200,50,.3)":"rgba(255,255,255,.06)";
          const cl=isA?(isV?"#90e0f0":isC?"#ffb432":"#ffe080"):isV?"#64c8dc88":isC?"#ffb43255":"#555";
          return <button key={m} onClick={()=>{setActive(m);setFilter("all");setExpanded(null);}}
            style={{padding:"5px 12px",background:bg,border:`1px solid ${bd}`,borderRadius:4,color:cl,fontSize:13,letterSpacing:.5,cursor:"pointer",fontFamily:"inherit"}}>
            {ML[m]}{hC&&<span style={{color:"#ffe080",fontSize:9,marginLeft:2}}>★</span>}
          </button>;
        })}
      </nav>
      {!isSpecial&&(
        <div style={{position:"relative",zIndex:1,display:"flex",flexWrap:"wrap",justifyContent:"center",gap:4,padding:"4px 10px 8px"}}>
          <button onClick={()=>setFilter("all")} style={ps(filter==="all","#c8b060")}>All</button>
          {Object.entries(TC).map(([k,v])=><button key={k} onClick={()=>setFilter(k)} style={ps(filter===k,v.d)}>{v.l}</button>)}
        </div>
      )}
      {active!=="MAPA"&&active!=="WEEK"&&active!=="S144"&&active!=="TREND"&&<div style={{position:"relative",zIndex:1,textAlign:"center",marginBottom:10}}>
        <span style={{fontSize:active==="VISAO"?22:28,letterSpacing:3,color:active==="CONF"?"#ffb432":active==="VISAO"?"#90e0f0":"#c8b060",fontWeight:"normal"}}>{month.l}</span>
        {!isSpecial&&<span style={{fontSize:12,color:"#444",marginLeft:10}}>{events.length} events</span>}
      </div>}
      {active==="MAPA" && <MapaView/>}
      {active==="WEEK" && <WeekView/>}
      {active==="S144" && <ChartS144View/>}
      {active==="TREND" && <LocalTrendsView/>}
      {active!=="MAPA"&&active!=="WEEK"&&active!=="S144"&&active!=="TREND" && <div style={{position:"relative",zIndex:1,maxWidth:720,width:"100%",margin:"0 auto",padding:"0 12px 60px",display:"flex",flexDirection:"column",gap:7}}>
        {events.length===0&&<p style={{textAlign:"center",color:"#333",padding:32}}>No events of this type.</p>}
        {events.map((ev,i)=>{
          const cfg=TC[ev.t]||TC.n;
          const confl=isConfl(ev);
          const bias=BIAS[ev.bias]||BIAS.neut;
          const isOpen=expanded===i;
          const bc=confl?"#ffe080":ev.bias==="warn"?"#ff5030":cfg.b;
          const dc=confl?"#ffe080":ev.bias==="warn"?"#ff7050":cfg.d;
          return(
            <div key={i} onClick={()=>toggle(i)}
              style={{background:confl?"rgba(255,220,80,.06)":ev.bias==="warn"?"rgba(255,60,20,.04)":cfg.bg,
                border:`1px solid ${isOpen?bc+"88":bc+"22"}`,borderLeft:`3px solid ${bc}`,
                borderRadius:6,padding:"11px 14px",cursor:"pointer",transition:"border-color .2s",userSelect:"none"}}>
              <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                <div style={{minWidth:8,height:8,borderRadius:"50%",background:dc,marginTop:6,boxShadow:`0 0 6px ${dc}`,flexShrink:0}}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:4,marginBottom:4}}>
                    <span style={{fontSize:14,color:dc,letterSpacing:1,textTransform:"uppercase",fontWeight:"bold"}}>{ev.w}</span>
                    <div style={{display:"flex",gap:5,alignItems:"center"}}>
                      <span style={{fontSize:13,color:bias.color,background:bias.bg,border:`1px solid ${bias.color}44`,borderRadius:3,padding:"1px 7px",fontFamily:"sans-serif"}}>
                        {bias.icon} {bias.label}
                      </span>
                      <span style={{fontSize:11,color:cfg.b,opacity:.5}}>{cfg.l}</span>
                      <span style={{fontSize:12,color:"#555"}}>{isOpen?"▲":"▼"}</span>
                    </div>
                  </div>
                  <p style={{fontSize:16,color:confl?"#ffe0b0":ev.t==="g"?"#ffe080cc":"#ddd8c8",margin:"0 0 4px",lineHeight:1.45}}>{ev.e}</p>
                  <p style={{fontSize:13,color:"#5a5850",margin:0,lineHeight:1.55}}>{ev.c}</p>
                </div>
              </div>
              {isOpen&&(
                <div style={{marginTop:14,marginLeft:18,borderTop:"1px solid rgba(255,255,255,.07)",paddingTop:14,display:"flex",flexDirection:"column",gap:12}}>
                  <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                    <span style={{fontSize:12,color:"#90e0f0",minWidth:76,flexShrink:0,paddingTop:1}}>📚 SOURCE</span>
                    <span style={{fontSize:13,color:"#a0b8c8",lineHeight:1.6}}>{ev.src}</span>
                  </div>
                  <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                    <span style={{fontSize:12,color:"#90e0f0",minWidth:76,flexShrink:0,paddingTop:4}}>📊 HISTORY</span>
                    <span style={{fontSize:13,color:bias.color,background:bias.bg,border:`1px solid ${bias.color}33`,borderRadius:4,padding:"4px 12px",fontFamily:"sans-serif",lineHeight:1.5}}>
                      {bias.icon} {bias.label} — {ev.bias==="bull"?"Market historically rises around this event.":ev.bias==="bear"?"Market historically falls around this event.":ev.bias==="warn"?"Historically associated with crashes or major dislocations.":ev.bias==="turn"?"Historical turning point — direction depends on context and trend.":"Neutral signal — amplifies the existing trend."}
                    </span>
                  </div>
                  <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                    <span style={{fontSize:12,color:"#90e0f0",minWidth:76,flexShrink:0,paddingTop:3}}>💡 REASONING</span>
                    <p style={{fontSize:15,color:"#c0c8d0",margin:0,lineHeight:1.7}}>{ev.why}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>}
      <footer style={{position:"relative",zIndex:1,borderTop:"1px solid rgba(255,255,255,.04)",padding:"12px",display:"flex",flexWrap:"wrap",justifyContent:"center",gap:10}}>
        {Object.entries(TC).map(([k,v])=><div key={k} style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:7,height:7,borderRadius:"50%",background:v.d,boxShadow:`0 0 4px ${v.d}`}}/><span style={{fontSize:12,color:"#4a4840"}}>{v.l}</span></div>)}
        <div style={{width:"100%",display:"flex",justifyContent:"center",gap:14,marginTop:6,flexWrap:"wrap"}}>
          {Object.entries(BIAS).map(([k,v])=><span key={k} style={{fontSize:11,color:v.color}}>{v.icon} {v.label}</span>)}
        </div>
      </footer>
    </div>
  );
}
function ps(a,c){return{padding:"4px 13px",background:a?`${c}18`:"transparent",border:a?`1px solid ${c}44`:"1px solid rgba(255,255,255,.04)",borderRadius:20,color:a?c:"#4a4840",fontSize:13,cursor:"pointer",fontFamily:"inherit"};}
