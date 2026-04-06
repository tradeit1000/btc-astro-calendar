import { useState } from "react";

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
VISAO:{l:"Annual Overview",e:[
  {w:"ANNUAL BACKDROP",t:"g",bias:"warn",src:"Jensen — Astro-Cycles and Speculative Markets (1978)",
   e:"⚠️ North Node in 270° Square to 9° Gemini (Jensen) — Entire Year",
   c:"Jensen's 'unique national hinge point'. Node squares historically coincide with major market lows or crashes.",
   why:"Jensen (pp.79,92): 7°–9° Gemini is a unique critical point for American markets. When the North Node squares this degree, it historically coincides with major lows or crashes: 1961, 1970, 1979. The Node transits Pisces all year in 2026, maintaining this 270° square with peak orb in July (0.6°). This creates a persistent bearish backdrop for the entire year, most intense Q3–Q4."},
  {w:"Jan → Mar 28",t:"p",bias:"bear",src:"Pesavento & Smoleny — A Trader's Guide to Financial Astrology (2015)",
   e:"PHASE 1 — Ides of March: BEARISH Seasonal Window",
   c:"108+ years of data confirm a consistent bearish window Feb 2–Mar 28. Sun in Aquarius/Pisces.",
   why:"Pesavento's 108-year solar cycle analysis: the Sun's transit through Aquarius and Pisces creates a waxing square to the US natal Sun in Cancer, generating structural pressure. The period typically ends with a low AFTER the Aries point (Mar 20). Key events within: Mercury Retrograde Feb 26–Mar 20, Solar Eclipse Feb 17, Lunar Eclipse Mar 3, Mars Helio 90° ATH on Mar 10."},
  {w:"Mar 28 → Apr 16",t:"p",bias:"bull",src:"Pesavento (2015) + Jensen (1978) + Gann Master Time Factor",
   e:"PHASE 2 — April Earnings Rally: BULLISH Seasonal",
   c:"Bullish seasonal Mar 28–Apr 16, overlapping the most concentrated multi-framework bullish cluster of 2026.",
   why:"Pesavento: Aries/Taurus transit, Q1 earnings season — historically bullish. The MAIN CLUSTER: Jupiter SEXTILE Uranus (Mar 28–Apr 6) — Jensen documented 28/28 favorable Jupiter-Uranus aspects producing gains since 1896 (100% win rate). Simultaneously: Jensen 2×88d (Mar 31), Full Moon (Apr 1), Gann 180° (Apr 6), Mars Helio 90° (Mar 26). Five independent systems in 9 days."},
  {w:"Apr 16 → Jun 26",t:"p",bias:"bear",src:"Pesavento & Smoleny (2015)",
   e:"PHASE 3 — Sell in May: BEARISH Seasonal",
   c:"Classic 2+ month bearish window. Confirmed across 108+ years of data.",
   why:"Pesavento: Sun through Taurus/Gemini/Cancer = extended bearish window. Counterforce: Venus conjunct Jupiter May 7 (99 bullish cycles) creates a countertrend bounce — use as sell-the-rally opportunity. Mars Helio 135° May 21 adds pressure. Mercury Retrograde begins Jun 29 closing the phase with maximum narrative noise."},
  {w:"Jun 15",t:"g",bias:"turn",src:"Pesavento (730 cycles) + Jensen + Gann + NASA/JPL",
   e:"⭐⭐⭐⭐⭐ STRONGEST BOTTOM SIGNAL OF THE YEAR — New Moon in Gemini",
   c:"Moon in Gemini = ABSOLUTE LOW per Pesavento (730 S&P cycles, 1950–present). Four additional frameworks confirm.",
   why:"Pesavento's Moon vs Sign study (730 S&P 500 cycles, 1950–present): Gemini Moon = strongest absolute market lows. Five frameworks align: (1) Moon in Gemini = absolute low, (2) New Moon = bottom signal, (3) Mercury Greatest Elongation 24.5°E = clarity, (4) Gann 4×9 weeks (2+5+2=9), (5) Moon Perigee Jun 14 (357km) for amplification. Average bottom timing: New Moon −1 day."},
  {w:"Jun 26 → Sep 4",t:"p",bias:"bull",src:"Pesavento & Smoleny (2015) + Jensen (1978)",
   e:"PHASE 4 — Summer Rally: BULLISH Seasonal",
   c:"Reliable 2-month bullish window. Sun conjunct US natal Sun (Cancer). Jensen 3×88d aligns at the opening.",
   why:"Pesavento: Cancer/Leo/Virgo transit conjuncts US natal Sun. Jensen 3×88d cycle falls Jun 27, 1 day after opening. Mercury Direct Jul 23 clears narrative fog mid-rally. WARNING: Venus Greatest Elongation Aug 15 (45.9°E) = peak sentiment = potential distribution zone. Mars Helio 180° Aug 6 = punctual pressure within uptrend — watch for temporary retest."},
  {w:"Sep 4 → Oct 27",t:"p",bias:"warn",src:"Pesavento & Smoleny (2015) — 108 years of crash data",
   e:"🔴 PHASE 5 — FALL CRASH ZONE: EXTREME RISK",
   c:"The single most dangerous window of the annual calendar. Nearly every major market crash in history occurred Sep 4–Oct 27. In 2026 this window is maximally loaded.",
   why:"Pesavento 108-year analysis: crashes of 1907, 1929, 1937, 1957, 1987, 2001, 2002, 2008 all occurred here. In 2026 additionally loaded: Venus Retrograde Oct 3, Venus/Saturn bearish Oct 11 (101 cycles), Mercury Retrograde Oct 24, Venus Inferior Conjunction Oct 24, Gann 360° Oct 6, Mars Helio 225° Nov 2. SINGLE COUNTERFORCE: Jupiter-Saturn Trine 120° Sep 24 (Jensen bullish) — likely a strong bounce WITHIN the larger decline."},
  {w:"Oct 27 → Dec 8",t:"p",bias:"bull",src:"Pesavento & Smoleny (2015)",
   e:"PHASE 6 — Santa Claus Rally: BULLISH Seasonal",
   c:"Reliable but modest gains. Scorpio/Sagittarius. Post-crash recovery.",
   why:"Pesavento: Scorpio/Sagittarius transit = consistent post-crash gains. In 2026 amplified by: Mercury Direct Nov 13 + Venus Direct Nov 14 = both inner planets resuming direct in the same week — historically amplifies momentum. Jupiter synodic 399d + New Moon Nov 9 = first clean bullish signal post-crash."},
  {w:"Dec 20 → Jan 7",t:"p",bias:"bull",src:"Pesavento (2015) + Jensen (1978) + Gann",
   e:"PHASE 7 — January Effect: BULLISH Seasonal",
   c:"Sharp, strong year-end rally. Capricorn. Four frameworks simultaneously confirm.",
   why:"Pesavento: Capricorn transit opposing US natal Sun = one of the sharpest short-term rallies of the year. Supported by: Venus conjunct Jupiter Dec 29 (99 bullish cycles), Jensen 5×88d Dec 20, Gann 7×9 weeks = Winter Solstice Dec 21 (exact), Mercury OOB South Dec 30 (−24.85°, year's extreme). Four frameworks close the year."},
  {w:"BAYER CYCLE",t:"b",bias:"bear",src:"George Bayer — The Egg of Columbus (1942)",
   e:"🍽️ Bayer Dinner Table: Current Position in the Multi-Year Cycle",
   c:"ATH Oct 2025 likely marked the end of the bird's neck (champagne phase). 2026 = bear disposal phase.",
   why:"Bayer's Dinner Table: bull cycle runs Tongue→Soup→Fish→White Wine→Roast/Bird→Red Wine→Neck→Cheese→Nut→new Tongue. Oct 2025 ATH = end of neck phase. In 2026: disposal bear phase with repeated secondary movements. BUY signal: when the downward tongue formation is complete (small choppy moves without direction = olives/onions/radishes). Never buy at the top of the bird — wait for tongue formation."},
  {w:"MARS HELIO 2026",t:"b",bias:"bear",src:"Gann methodology + JPL ephem calculated",
   e:"♂ Mars Heliocentric — 4 Critical Angles from ATH (all bearish)",
   c:"ATH Mars position: 236.0° helio. Four geometric milestones in 2026, all in the bearish square family.",
   why:"Gann: 'Two of my three price systems are IMPOSSIBLE without the planets.' Mars helio angles from ATH: 90° (Mar 10), 135° (May 21), 180° (Aug 6), 225° (Nov 2). All fall in the square/sesquiquadrate family = bearish hard aspects. Calculated via JPL ephem. Sign changes: Cap Jan, Aqr Jan 29, Pis Mar 19, Ari May 7, Tau Jun 25, Gem Aug 13, Can Oct 15, Leo Dec 17."},
  {w:"OPERATIONAL RULES",t:"g",bias:"neut",src:"Gann + Pesavento + Jensen + 20 Years Studying Gann",
   e:"📐 Integrated Playbook — 7 Frameworks",
   c:"Core trading rules distilled from all seven frameworks in this calendar.",
   why:"1. NEVER add to a losing position (Pesavento rule #1). 2. TIME > PRICE > VOLUME (Gann Master Time Factor). 3. Always use a stop. 4. Maximum 10% of account per trade (Gann). 5. Every ⭐⭐⭐+ cluster = zoom in for exact lunar cycle timing. 6. Bear markets INVERT New Moon/Full Moon signals — verify macro context first. 7. Inversion is always possible (10-15%): confluence identifies WHEN, price action identifies DIRECTION. 8. Find your personal instrument — 1 in 30 will be consistently profitable for you (20 Years Studying Gann)."},
]},

JAN:{l:"January",e:[
  {w:"Jan 08",t:"v",bias:"bear",src:"Pesavento (2015) + JPL ephem",
   e:"Venus CONJUNCT Mars (0.12°) — BEARISH",
   c:"Venus meets Mars with near-exact 0.12° orb. Financial aggression over money. Forced selling impulse.",
   why:"Venus (money/possessions) in hard conjunction with Mars (aggression/conflict) = financial aggression. Pesavento: hard Venus-Mars aspects = forced selling, aggressive institutional distribution. 0.12° orb = essentially exact. First bearish planetary signal of 2026."},
  {w:"Jan 09",t:"v",bias:"warn",src:"Jensen (1978) + JPL ephem",
   e:"Venus OPPOSITION Jupiter (0.05°) — Overextension Warning",
   c:"Venus opposes Jupiter at near-perfect 0.05° orb. Opposition = stress between money (Venus) and expansion (Jupiter). Overextension of bullish sentiment.",
   why:"Jensen: Jupiter at conjunction = bullish. At opposition = overextension and stress. 0.05° orb = essentially exact. The bullish Jupiter energy pulls against Venus via opposition — inflated expectations that cannot be sustained. A sentiment peak followed by rapid reversal."},
  {w:"Jan 12",t:"m",bias:"bear",src:"Jensen (1978) + JPL ephem",
   e:"☿ Mercury SQUARE Saturn (0.72°) — Bearish Narrative Pressure",
   c:"Mercury squares Saturn. Market communication meets structural restriction. Bearish signal for sentiment.",
   why:"Jensen: Saturn aspects to Mercury = structural restraint on narrative. Mercury-Saturn square = the market story runs into a wall of reality. Often coincides with sobering news, guidance cuts, or regulatory announcements. Falls in January\'s second week."},
  {w:"Jan 18",t:"m",bias:"warn",src:"Jensen (1978) + JPL ephem",
   e:"☿ Mercury OPPOSITION Jupiter (0.39°) — Narrative Overextension",
   c:"Mercury opposes Jupiter. Communication becomes overoptimistic — sets up for disappointment. Same day as New Moon.",
   why:"Mercury (communication) OPP Jupiter (expansion/optimism) = narratives become exaggerated. Analysts overpromise, guidance is too bullish. The opposition creates stress requiring correction. Coincides with Jan 18 New Moon — the emotional low of the cycle meets overoptimistic narrative. Mixed signal."},
  {w:"Jan 20",t:"m",bias:"bear",src:"Jensen (1978) + JPL ephem",
   e:"☿ Mercury CONJUNCT Mars (0.85°) — Aggressive Bearish Narrative",
   c:"Mercury conjuncts Mars. Aggressive, impulsive market communication. Conflict-driven news or narrative shocks.",
   why:"Mercury (communication) + Mars (aggression) = aggressive narrative events. Sharp, impulsive directional moves driven by news shocks. Falls within the same week as Mercury OPP Jupiter (Jan 18) — narrative overcorrects from overextension into aggression."},
  {w:"Jan 30",t:"m",bias:"turn",src:"JPL ephem",
   e:"☿ Mercury SQUARE Uranus (0.62°) — Sudden Narrative Break",
   c:"Mercury squares Uranus. Unexpected narrative disruption — sudden news or communication shock at month end.",
   why:"Mercury-Uranus hard aspects produce sudden unexpected communication events. Squares create disruptive tension. In markets: surprise announcements, unexpected news that breaks the prevailing narrative. End of January — close to Gann 90° angular milestone (Jan 5)."},
  {w:"All Year",t:"g",bias:"warn",src:"Jensen (1978) p.79",
   e:"⚠️ BACKDROP: North Node 270° Square to 9° Gemini (Jensen) — Entire Year",
   c:"Jensen's 'unique national hinge point'. Squares of Node historically = major market lows. Closest orb: July (0.6°).",
   why:"See Annual Overview for full analysis. The Node transits Pisces 19°→1° throughout 2026, maintaining the 270° square. Most intense pressure in July. Historical crashes associated: 1961, 1970, 1979."},
  {w:"Jan 2",t:"g",bias:"turn",src:"Jensen (1978)",
   e:"Jensen 1×88d Mercury Orbital Cycle from ATH",
   c:"First 88-day Mercury orbital cycle from the ATH. Jensen's primary market timing tool.",
   why:"Jensen's core methodology: Mercury's 88-day orbital period marks potential market turning points. Each multiple from a major high/low is a potential reversal zone. Falls 1 day before the Full Moon Supermoon, adding lunar amplification."},
  {w:"Jan 3",t:"g",bias:"turn",src:"Fibonacci time analysis + NASA/JPL",
   e:"⭐⭐ Fibonacci 89 Days = Full Moon Supermoon (Wolf Moon) — Zero Days Offset",
   c:"Fibonacci 89-day interval from ATH coincides exactly with the Wolf Moon Supermoon. Two independent systems, zero offset.",
   why:"Fibonacci time ratios applied to major market turns produce statistically significant inflection zones. 89 is a Fibonacci number. The simultaneous Full Moon Supermoon (Pesavento: emotional peak, 1,346 lunar cycles study) creates a dual-system confluence. Full Moon = market PEAK signal. Fib timing confirms the WHEN."},
  {w:"Jan 5",t:"g",bias:"turn",src:"Gann Master Time Factor",
   e:"📐 Gann 90° Angle (91.3 days from ATH) — 1st Cardinal Milestone",
   c:"First major angular milestone from the ATH. Gann's square of 90° = primary resistance or reversal point. Digit sum 9+0=9.",
   why:"Gann's geometric method: 90° represents a quarter-circle — the first major resistance from any significant high or low. Digit sum 9+0=9 confirms Gann's numerological framework where all critical angles sum to 9. Market either reverses here or accelerates through the angle."},
  {w:"Jan 6",t:"v",bias:"neut",src:"NASA/JPL verified",
   e:"♀ Venus Superior Conjunction + ☿ Mercury Aphelion",
   c:"Venus begins evening apparition (584-day cycle starts). Mercury at maximum distance from Sun = slowest speed.",
   why:"Venus SC marks the start of Bayer's 584-day Venus synodic cycle (SC→IC→SC). Bayer made monthly predictions based on these Venus cycle positions. The IC (Inferior Conjunction) 291 days later (Oct 24) marks the exact midpoint turning point. Mercury Aphelion = slowest orbital velocity = slow-moving narrative events."},
  {w:"Jan 7",t:"m",bias:"warn",src:"JPL DE405 ephem — calculated",
   e:"☿ Mercury Declination South Peak −24.38° ⚡ OUT OF BOUNDS",
   c:"Mercury exceeds Sun's maximum declination of ±23°26'. Out of Bounds = unpredictable market narrative and sentiment.",
   why:"OOB (Out of Bounds): any planet exceeding ±23°26' operates outside normal boundaries. For Mercury: communication, news and sentiment become extreme and erratic. Three Mercury OOB events in 2026: Jan 7 (−24.38°), Jun 2 (+25.60° — year's most extreme North), Dec 30 (−24.85° — year's most extreme South). All three create windows of unpredictable market narrative."},
  {w:"Jan 10",t:"g",bias:"bull",src:"Jensen (1978) p.36",
   e:"♃ Jupiter Opposition — Jensen PRIMARY BULL SIGNAL",
   c:"Jupiter at opposition. Jensen documented 28/28 favorable Jupiter-Uranus aspects producing gains since 1896 — 100% win rate.",
   why:"Jensen's landmark finding: every single favorable Jupiter-Uranus aspect from 1896 onward produced market gains — zero exceptions. Jupiter Opposition places Jupiter at maximum brightness and potency. Jupiter-Saturn at ~108° is moving toward the bullish trine (120°, exact Sep 24), supporting a growing bullish backdrop through the year."},
  {w:"Jan 18",t:"n",bias:"turn",src:"Pesavento (2015) — 1,583 lunar cycles",
   e:"New Moon + Mercury-Mars Conjunction",
   c:"New Moon = market bottom signal per Pesavento's 1,583-cycle study. Mercury-Mars = aggressive directional impulse.",
   why:"Pesavento: across 1,583 lunar cycles (1885–2013), New Moon consistently marks market bottoms in bull markets. Average bottom: 1 day BEFORE New Moon. Mercury-Mars conjunction adds aggressive narrative energy — sharp directional move typically follows."},
  {w:"Jan 29",t:"n",bias:"turn",src:"NASA/JPL verified",
   e:"Moon Perigee (365,878 km) — Volatility Amplifier",
   c:"Moon at closest approach of the month. Amplifies volatility and emotional market reactions in both directions.",
   why:"Perigee Moon creates stronger gravitational pull and heightened human psychological response. Pesavento: perigee New/Full Moons produce the most significant turns. This falls 11 days after the Jan 18 New Moon, in the waxing phase — amplifies bullish momentum if the cycle is directionally confirmed."},
]},

FEB:{l:"February",e:[
  {w:"Feb 22",t:"m",bias:"bear",src:"Jensen (1978) + JPL ephem",
   e:"☿ Mercury SQUARE Saturn (0.12°) — Near-Exact Structural Block",
   c:"Mercury squares Saturn at 0.12° orb — the hardest Mercury-Saturn aspect of the year. Narrative hits maximum structural resistance.",
   why:"0.12° = near-exact. Mercury-Saturn square = the market narrative runs directly into structural reality. Falls 4 days before Mercury Station Retrograde (Feb 26) and the Venus/Saturn conjunction (Feb 24). Three bearish Mercury/Venus-Saturn events in 5 days: Feb 22 (Mercury-Saturn 0.12°), Feb 24 (Venus-Saturn 0.8°), Feb 26 (Mercury Retro). Cluster of maximum narrative and value restriction."},
  {w:"Feb 23",t:"v",bias:"neut",src:"JPL ephem",
   e:"♀ Venus CONJUNCT Neptune (0.36°) — Value Illusion",
   c:"Venus meets Neptune at 0.36° orb. Financial values become unclear or based on fantasy. Unrealistic valuations.",
   why:"Venus (money) + Neptune (illusion/dissolution) = financial values become unclear. Assets appear more valuable than they are, or sentiment is driven by narrative rather than fundamentals. Neptune dissolves the concrete nature of Venus — neutral-to-bearish as the illusion eventually corrects. Falls 1 day before Venus/Saturn bearish conjunction (Feb 24)."},
  {w:"Feb 1",t:"n",bias:"turn",src:"Pesavento (2015) — 1,346 cycle study",
   e:"Full Moon (Snow Moon) — Emotional Peak Signal",
   c:"Full Moon = market PEAK signal. Average: 1–3 days AFTER Full Moon in bull markets. Polarity inverts in bear markets.",
   why:"Pesavento's Full Moon analysis (1,346 cycles): consistently marks the emotional high of the lunar cycle. In bull markets = sell zone. In bear markets = buy zone (polarity inverts). Context determines direction — always check the dominant trend before acting on the signal."},
  {w:"Feb 3",t:"g",bias:"turn",src:"Gann Master Time Factor",
   e:"📐 Gann Annual Solar Date — 15° Aquarius (1st of 8)",
   c:"First of Gann's 8 annual solar timing dates. Sun at 15° Aquarius = midpoint between Winter Solstice and Spring Equinox.",
   why:"Gann identified 8 key solar dates each year based on the Sun's passage through critical zodiacal degrees (15° of fixed signs, 0° of cardinal signs). These mark potential trend changes. 15° Aquarius historically associated with shifts in market psychology from defensive winter positioning to early speculative activity."},
  {w:"Feb 17",t:"e",bias:"turn",src:"NASA — confirmed Annular Solar Eclipse",
   e:"☀ Annular Solar Eclipse + New Moon — Regime Change Catalyst",
   c:"Solar eclipses are powerful regime-change catalysts. Annular eclipse near the Node creates significant turning point lasting weeks.",
   why:"Jensen (pp.43–45): 'Eclipses are most intense in their effects where they are visible.' The eclipse magnitude formula (5 ÷ distance from Node) determines duration of effects in months. This annular eclipse marks one of the most significant turning points of Q1. Per Pesavento: eclipse New Moons produce the most violent impulse moves of any lunar cycle."},
  {w:"Feb 19",t:"g",bias:"turn",src:"Gann + NASA/JPL",
   e:"⭐⭐⭐ Gann 135° × Mercury Perihelion × Mercury Greatest Elongation (18.1°E)",
   c:"Three independent systems on the same date. Gann angular milestone (1+3+5=9) + Mercury maximum orbital speed + Mercury peak evening visibility.",
   why:"Gann 135° = sesquiquadrate — a hard aspect requiring adjustment. Digit sum 1+3+5=9 confirms Gann's numerological framework. Mercury Perihelion = closest to Sun = maximum speed = maximum narrative velocity. Greatest Elongation = Mercury at maximum angular distance from Sun = best visibility as Evening Star. Three independent Mercury measurements align on one date."},
  {w:"Feb 24",t:"v",bias:"bear",src:"Pesavento (2015) — 101 verified cycles + JPL",
   e:"♀ Venus CONJUNCT Saturn — BEARISH [101 verified cycles]",
   c:"Venus-Saturn conjunction = market FALLS into the conjunction. Verified across 101 historical cycles by Pesavento. Angular difference 0.8° (JPL).",
   why:"Pesavento's conjunctions study (tested via AIR Software across decades of Dow data): Venus (money/possessions) + Saturn (contraction/restriction) = suppression of financial expansion. 101 cycles confirm market falls leading into conjunction. Falls within Ides of March bearish seasonal window — compounding the directional signal."},
  {w:"Feb 26",t:"r",bias:"bear",src:"NASA/JPL verified",
   e:"☿ Mercury Station Retrograde (22°33' Pisces) — 24 Days of Noise",
   c:"Mercury retrograde begins. Period of narrative confusion, retests, and false breakouts. Mercury in Pisces = detriment (weakest placement).",
   why:"Mercury retrograde: planet appears to move backward as Earth overtakes it. Gann Course L2: retrograde periods create 'a squiggle or disturbance in an otherwise clean sine wave.' Pisces is Mercury's detriment — amplifies confusion. Practical effect: earnings guidance confuses, narratives reverse, breakouts fail. Duration: Feb 26 – Mar 20."},
  {w:"Feb 27",t:"g",bias:"turn",src:"Gann (1935) + Fibonacci + Jensen (1978) p.135",
   e:"⭐⭐⭐ Gann 144d = Fibonacci 144d = Jensen Biquintile 144° — Triple Exact",
   c:"Three independent timing systems on the same date. Jensen calls the biquintile 'THE triggering aspect' — his single strongest reversal signal.",
   why:"(1) Gann 144 days from ATH — 1+4+4=9, primary Gann time cycle. (2) Fibonacci 144 is a Fibonacci number used as a time ratio from major turns. (3) Jensen (p.135): calls the biquintile (144°, 2×72°) 'THE triggering aspect' — his most powerful reversal signal. All three independent frameworks target this date, falling 1 day after Mercury Station Retrograde. Highest-confidence turning point of Q1."},
]},


MAR:{l:"March",e:[
{w:"Mar 02",t:"m",bias:"bear",src:"Jensen (1978) + JPL ephem",
   e:"☿ Mercury OPPOSITION Mars (0.58°) — Aggressive Narrative Peak",
   c:"Mercury opposes Mars. Peak of aggressive market communication and price conflict. Within the double-eclipse window.",
   why:"Mercury (narrative) OPP Mars (aggression) = peak narrative conflict — maximum argument between bulls and bears, sharp intraday moves. Falls within the double-eclipse window (Solar Feb 17, Lunar Mar 3), amplifying the volatility. The eclipse period\'s most aggressive narrative moment."},
  {w:"Mar 04",t:"m",bias:"turn",src:"JPL ephem",
   e:"☿ Mercury SQUARE Uranus (0.10°) — Near-Exact Shock",
   c:"Mercury squares Uranus at near-exact 0.10° orb. Maximum unexpected narrative shock. One day after Lunar Eclipse Blood Moon.",
   why:"0.10° = essentially exact. Mercury-Uranus squares produce sudden unexpected communication events. At this precision, the shock is maximum. Falls 1 day after Lunar Eclipse Blood Moon (Mar 3). Three intense events in 3 days: Mercury OPP Mars (Mar 2), Lunar Eclipse (Mar 3), Mercury SQUARE Uranus (Mar 4). Maximum Q1 narrative volatility."},
  {w:"Mar 10",t:"v",bias:"turn",src:"Jensen (1978) + JPL ephem",
   e:"♀ Venus SQUARE Jupiter (0.30°) — Overextension of Value",
   c:"Venus squares Jupiter at 0.30° orb on Mars Helio 90° day. Tension between value and expansion. Overextension of bullish sentiment.",
   why:"Venus (value) square Jupiter (expansion) = financial overextension. Venus-Jupiter squares mark the peak of speculative excess before correction. Falls on the SAME DAY as Mars Helio 90° from ATH (bearish) — the overextension of value meets Mars geometric pressure. Double signal on Mar 10."},
  {w:"Mar 12",t:"m",bias:"bear",src:"Jensen (1978) + JPL ephem",
   e:"☿ Mercury OPPOSITION Saturn (1.32°) — Reality Check",
   c:"Mercury opposes Saturn. The narrative confronts hard structural reality. Sobering, deflationary communication within Mercury Retrograde.",
   why:"Mercury (narrative) OPP Saturn (structural reality) = the market story meets an uncomfortable truth. Within Mercury Retrograde (Feb 26–Mar 20) — the retrograde amplifies the confusion. Disappointing economic data, central bank guidance cuts, or structural concerns that the narrative had been ignoring."},
  {w:"Mar 29",t:"m",bias:"turn",src:"JPL ephem",
   e:"☿ Mercury OPPOSITION Uranus (0.98°) — Post-Direct Surprise",
   c:"Mercury opposes Uranus 9 days after turning Direct. Unexpected reversal or surprise event as clarity returns after retrograde.",
   why:"Mercury turned Direct Mar 20 — by Mar 29 it has regained speed and opposes Uranus. Post-retrograde: the \'reveal\' of what was hidden during the retrograde. Mercury-Uranus opposition = the revelation is unexpected and disruptive. Falls within the Jupiter-Uranus sextile cluster (Mar 28–Apr 6) — first internal tension event within the year\'s strongest bullish cluster."},
  {w:"Mar 3",t:"e",bias:"turn",src:"NASA — Total Lunar Eclipse confirmed",
   e:"🌑 Total Lunar Eclipse (Blood Moon) — Full Moon",
   c:"Total Lunar Eclipse amplifies the Full Moon peak signal. 14 days after Solar Eclipse = double eclipse window.",
   why:"Double eclipse windows (Solar + Lunar within 14–15 days) mark the most significant turning points in Jensen's framework. Jensen: 'Eclipses are most intense where visible.' A Total Lunar Eclipse = maximum magnitude = maximum emotional intensity. Double eclipse windows historically define major trend direction for the subsequent weeks to months."},
  {w:"Mar 7",t:"m",bias:"bull",src:"Traditional astrology (Cazimi) + Jensen framework",
   e:"☿ Mercury Cazimi (16°52' Pisces) — Eye of the Storm",
   c:"Mercury at exact Sun conjunction (within 17'). Maximum clarity WITHIN the retrograde — brief but powerful window.",
   why:"Cazimi (Arabic: 'in the heart of the Sun'): within 17 arcminutes of the Sun's center, a planet is at maximum power. During Mercury retrograde, the Cazimi is a brief window of extreme clarity, decisive insight, and directional commitment. Markets often see clean moves or important information releases. This is the retrograde's internal turning point."},
  {w:"Mar 10",t:"b",bias:"bear",src:"Gann methodology + JPL ephem calculated",
   e:"♂ Mars Heliocentric 90° from ATH — Square BEARISH",
   c:"Mars helio position forms a 90° square to its ATH position (236.0°). Gann: squaring price with planets. First Mars geometric milestone of 2026.",
   why:"Gann's methodology (from 20 Years Studying Gann): 'Two of Gann's three price systems are IMPOSSIBLE to operate without the planets.' Mars helio 90° from ATH = first major geometric resistance of the Mars cycle. Coincides with Mercury Retrograde (still active) + Ides of March bearish seasonal. Triple bearish pressure. Calculated via JPL ephem."},
  {w:"Mar 20",t:"g",bias:"bull",src:"Gann Master Time Factor + NASA/JPL",
   e:"📐 Gann Annual — 0° Aries (Spring Equinox) + ☿ Mercury Station Direct",
   c:"Gann's primary annual solar point (Aries = start of all cycles). Mercury resumes direct motion the same day.",
   why:"0° Aries is the most powerful solar date in Gann's annual cycle — the Aries point, the absolute start of the astrological year. This is when all new annual cycles begin. Combined with Mercury turning Direct (removing retrograde fog), this marks the beginning of the April Earnings Rally bullish phase and the clearest trend signal since Mercury went retrograde Feb 26."},
  {w:"Mar 28",t:"p",bias:"bull",src:"Pesavento (2015)",
   e:"📅 END Ides of March + START April Earnings Rally — BULLISH Seasonal",
   c:"Bullish seasonal window opens. Immediately overlaps with the most concentrated bullish cluster of the year.",
   why:"Pesavento: Aries/Taurus solar transit + Q1 earnings season = historically bullish. The seasonal shift aligns perfectly with the Jupiter-Uranus sextile cluster beginning the same day. The confluence of seasonal tailwind + 5 independent timing frameworks in 9 days creates the highest-confidence bullish entry zone of 2026."},
  {w:"Mar 28–Apr 6",t:"g",bias:"bull",src:"Jensen (1978) p.36 + Gann + Fibonacci + Pesavento + NASA/JPL",
   e:"⭐⭐⭐⭐⭐ Jupiter SEXTILE Uranus — Jensen: 28/28 BULLISH (100% since 1896)",
   c:"Jensen's most powerful bullish signal. 28/28 favorable Jupiter-Uranus aspects produced gains. Simultaneously: Jensen 2×88d + Full Moon + Gann 180° + Mars Helio 90°. Five systems / 9 days.",
   why:"Jensen p.36: documented every Jupiter-Uranus favorable aspect from 1896 — zero exceptions, 100% produced gains. Sextile (60°) = favorable. Simultaneously: Jensen 2×88d (Mar 31) + Full Moon Pink Moon (Apr 1, Pesavento peak) + Gann 180° midpoint (Apr 6, 1+8+0=9) + Pesavento April Earnings Rally seasonal. Five independent analytical traditions targeting the same 9-day window. The most concentrated bullish confluence of 2026."},
]},


APR:{l:"April",e:[
{w:"Apr 01",t:"v",bias:"turn",src:"JPL ephem",
   e:"♀ Venus CONJUNCT Uranus (0.47°) — Sudden Value Disruption",
   c:"Venus meets Uranus at 0.47° orb on Full Moon Pink Moon day. Sudden unexpected shift in financial values or sentiment.",
   why:"Venus (money/value) + Uranus (sudden change) = unexpected financial development. Venus-Uranus conjunctions coincide with sudden currency moves or unexpected asset revaluations. Falls SAME DAY as Full Moon Pink Moon (Apr 1) — the emotional peak meets a sudden value disruption. Within the Jupiter-Uranus sextile bullish cluster — a volatile expression of the bullish energy."},
  {w:"Apr 02",t:"m",bias:"bear",src:"Jensen (1978) + JPL ephem",
   e:"☿ Mercury SQUARE Mars (0.28°) — Aggressive Narrative",
   c:"Mercury squares Mars at 0.28° orb. Sharp aggressive narrative conflict. Price action likely volatile and directional.",
   why:"Mercury (narrative) square Mars (aggression) = aggressive market communication. Hard news, sharp analyst calls, or conflictual price action. 0.28° = tight. Falls within April Earnings Rally bullish seasonal — an aggressive internal tension within the uptrend. Likely a sharp single-day move."},
  {w:"Apr 11",t:"v",bias:"bear",src:"Pesavento (2015) + JPL ephem",
   e:"♀ Venus SQUARE Mars (0.11°) — BEARISH, Near-Exact",
   c:"Venus squares Mars at near-exact 0.11° orb. Financial values under direct aggressive attack. One of the tightest Venus-Mars aspects of 2026.",
   why:"0.11° = essentially exact. Venus (money) square Mars (aggression) = forced selling, aggressive institutional distribution. Pesavento: hard Venus-Mars aspects are consistently bearish. Falls at the transition from April Earnings Rally to Sell in May (Apr 16) — may be the catalyst tipping sentiment from bullish to bearish just before the seasonal change."},
  {w:"Apr 11",t:"m",bias:"bear",src:"Jensen (1978) + JPL ephem",
   e:"☿ Mercury SQUARE Saturn (0.62°) — Double Bearish with Venus-Mars",
   c:"Mercury squares Saturn same day as Venus SQUARE Mars (Apr 11). Double bearish signal simultaneously: narrative restriction + value attack.",
   why:"Mercury-Saturn square (narrative hits structural wall) on the SAME DAY as Venus-Mars square (financial values under aggressive attack) = rare double bearish conjunction. Two independent hard aspects on one date amplifies the probability of a significant down day or turning point."},
  {w:"Apr 23",t:"v",bias:"bear",src:"Pesavento (2015) + JPL ephem",
   e:"♀ Venus SQUARE Saturn (0.24°) — BEARISH, Within Sell in May",
   c:"Venus squares Saturn at 0.24° orb within Sell in May. Third Venus-Saturn bearish signal of 2026 (CONJ Feb 24 • SQUARE Apr 23 • CONJ Oct 11).",
   why:"Pesavento: all hard Venus-Saturn aspects carry bearish weight. 0.24° = very tight. Falls within Sell in May bearish seasonal. Third Venus-Saturn bearish event of 2026: Feb 24 CONJ (0.8°), Apr 23 SQUARE (0.24°), Oct 11 CONJ (0.2°). The SQUARE is the tensioned form — more acute pressure than a conjunction."},
  {w:"Apr 1",t:"n",bias:"turn",src:"Pesavento (2015)",
   e:"Full Moon (Pink Moon) — Emotional Peak Within Bullish Cluster",
   c:"Full Moon = market peak signal. Falls within the strongest bullish cluster of the year — likely a short-term top within a larger move.",
   why:"Pesavento: Full Moon marks the emotional peak of the lunar cycle. Within the Jupiter-Uranus sextile bullish cluster, this Full Moon likely marks a short-term profit-taking zone. Not the end of the bullish move — expect continuation after consolidation."},
  {w:"Apr 6",t:"g",bias:"turn",src:"Gann Master Time Factor",
   e:"📐 Gann 180° — ANNUAL MIDPOINT ⚡ — 1+8+0=9",
   c:"Exactly 182.6 days from ATH. Gann's most critical angular milestone — the halfway point of the annual cycle.",
   why:"Gann: the 180° angle represents maximum pressure — market must either reverse or accelerate. 1+8+0=9 confirms numerological framework. This is the current date in the calendar context (Apr 6, 2026). The angular midpoint demands resolution. Given the bullish cluster surrounding this date, resolution is likely UPWARD — acceleration through the angle."},
  {w:"Apr 16",t:"p",bias:"bear",src:"Pesavento (2015)",
   e:"📅 END April Rally + START 'Sell in May' — BEARISH Seasonal",
   c:"The reliable 2-month bearish window begins. Taurus/Gemini/Cancer. 108+ years of data.",
   why:"Pesavento: April Earnings Rally ends as Q1 results peak. 'Sell in May and Go Away' is one of the most documented seasonal anomalies. 108+ years confirm the Sun's transit through Taurus, Gemini, Cancer underperforms. Venus conjunct Jupiter May 7 creates a countertrend bounce — use as sell-the-rally opportunity."},
  {w:"Apr 17",t:"n",bias:"bear",src:"Pesavento (2015)",
   e:"New Moon — Polarity INVERTED in Bear Context: Marks TOP, Not Bottom",
   c:"In 'Sell in May' bearish context, New Moon polarity inverts per Pesavento. Instead of a bottom signal, it marks a temporary rally peak — a sell-the-bounce opportunity.",
   why:"Pesavento critical rule: New Moon signals INVERT in bear markets. In a bull market: New Moon = bottom (buy signal). In a bear market or strong downtrend: New Moon = TOP (sell signal). 'Sell in May' is a confirmed bearish seasonal (108+ years). Therefore this New Moon most likely produces a short-term bounce that should be sold into — not a trend reversal. The bounce itself may appear bullish for 1–3 days, which is precisely the trap."},
  {w:"Apr 20",t:"m",bias:"bull",src:"JPL ephem calculated",
   e:"☿ Mercury Equator Crossing South → North — Narrative Regime Change",
   c:"Mercury's declination crosses zero moving North — shift from contracting/defensive narrative to expansive/bullish narrative.",
   why:"Gann Course L2: declination crossings represent 'a change of polarity and energy flow.' Mercury crossing from South to North marks a shift from defensive narrative (South = restrictive, contracting) toward expansive narrative (North = bullish, expansive). This crossing within the 'Sell in May' context creates mixed signals — the narrative wants to expand but the seasonal says decline."},
]},


MAY:{l:"May",e:[
{w:"May 05",t:"m",bias:"bear",src:"Jensen (1978) + JPL ephem",
   e:"☿ Mercury CONJUNCT Mars (0.40°) — Aggressive Narrative Impulse",
   c:"Mercury meets Mars at 0.40° orb within Sell in May. Aggressive selling narrative. Followed immediately by Mercury-Saturn (May 6).",
   why:"Mercury-Mars conjunction = aggressive, impulsive market narrative. In Sell in May bearish context: aggressive selling communication. Within 1 day of Mercury CONJ Saturn (May 6) — aggressive narrative (Mars) immediately capped by structural restriction (Saturn). Sequence: sharp aggressive move followed by structural ceiling."},
  {w:"May 06",t:"m",bias:"bear",src:"Jensen (1978) + JPL ephem",
   e:"☿ Mercury CONJUNCT Saturn (0.12°) — Near-Exact, Narrative Hits Maximum Restriction",
   c:"Mercury conjuncts Saturn at near-exact 0.12° orb within Sell in May. The narrative is directly absorbed by Saturnian contraction.",
   why:"0.12° = near-exact. Mercury (narrative) CONJ Saturn (restriction/reality) = the market narrative directly absorbs maximum contraction. Falls 1 day after Mercury CONJ Mars (May 5) — aggressive move then immediately capped. Falls within Sell in May — confirms the bearish seasonal. Combined with Venus CONJ Jupiter (May 7 bullish, 99 cycles) the very next day: a sharp bearish narrative immediately followed by a Venus-Jupiter bullish pulse. Three intense planet aspects in 3 days."},
  {w:"May 7",t:"v",bias:"bull",src:"Pesavento (2015) — 99 verified cycles + JPL",
   e:"♀ Venus CONJUNCT Jupiter — BULLISH [99 verified cycles] ⚠️ Within 'Sell in May'",
   c:"Venus-Jupiter = market RISES. 99 cycles verified. Countertrend bullish pulse within the bearish seasonal. Angular difference: 1.0° (JPL).",
   why:"Pesavento: Venus (tangible money) + Jupiter (large-scale expansion) = doubly positive. 99 cycles confirm market rises into this conjunction. CAUTION: falls within 'Sell in May' bearish seasonal. This creates a countertrend rally — a rise within a falling market. Use as a sell-the-rally opportunity rather than confirming a trend reversal."},
  {w:"May 16",t:"n",bias:"turn",src:"NASA/JPL verified",
   e:"New Moon + Super New Moon (Perigee 358,074 km) — Maximum Bottom Signal",
   c:"New Moon at closest approach of the year. Maximum amplification of the bottom signal.",
   why:"The combination of New Moon (Pesavento bottom signal) with the month's closest Perigee creates the strongest lunar bottom signal. At 358,074 km this is May's closest Moon approach. Pesavento: perigee New Moons produce the most significant turning points. The amplification of both signals together = highest-confidence bottom of the month."},
  {w:"May 21",t:"b",bias:"bear",src:"Gann methodology + JPL ephem",
   e:"♂ Mars Heliocentric 135° from ATH — Sesquiquadrate BEARISH",
   c:"Mars helio forms a 135° sesquiquadrate from the ATH. Second Mars geometric milestone of 2026. 1+3+5=9.",
   why:"135° = sesquiquadrate = 90° + 45° = a hard aspect in Gann's square family. Digit sum 1+3+5=9 confirms. Falls within 'Sell in May' bearish seasonal = compounding directional alignment. Gann: geometric hard aspects from a major high mark resistance points and potential acceleration zones in the existing trend direction (downward here)."},
  {w:"May 22",t:"g",bias:"turn",src:"Gann Master Time Factor",
   e:"📐 Gann 225° (228.3 days from ATH) — 2+2+5=9",
   c:"Fifth 45° angular milestone from the ATH. Gann's fifth geometrical pressure point of the annual cycle.",
   why:"Gann's angular method continues: 225° = fifth quarter-step around the annual cycle wheel. Digit sum 2+2+5=9. Each 45° adds geometric pressure requiring market response — reversal or acceleration."},
  {w:"May 27",t:"g",bias:"turn",src:"Fibonacci time analysis",
   e:"🌀 Fibonacci 233 Days from ATH",
   c:"Fibonacci 233-day interval from ATH. Potential inflection zone in the 'Sell in May' decline.",
   why:"Fibonacci time ratios: the sequence 89, 144, 233, 377... marks statistically significant inflection zones from major market turns. 233 is a Fibonacci number. Falls 1 day after the Mercury synodic 2× cycle from ATH, creating a two-framework cluster. Fibonacci time zones identify WHEN to look for turns — price action confirms DIRECTION."},
]},


JUN:{l:"June",e:[
{w:"Jun 14",t:"m",bias:"bear",src:"Jensen (1978) + JPL ephem",
   e:"☿ Mercury OPPOSITION Mars (0.95°) — Final Shakeout Before Bottom",
   c:"Mercury opposes Mars 1 day before the ABSOLUTE LOW signal (New Moon in Gemini, Jun 15). Aggressive narrative at the bottom.",
   why:"Mercury OPP Mars = peak narrative aggression — bears make their most aggressive case 1 day before the year\'s strongest bottom signal (Jun 15: Moon in Gemini + New Moon + 5 frameworks). This aggressive narrative conflict is the FINAL shakeout before the reversal. Classic capitulation pattern: maximum bearish narrative immediately before the structural bottom."},
  {w:"Jun 18",t:"v",bias:"bear",src:"Pesavento (2015) + JPL ephem",
   e:"♀ Venus OPPOSITION Saturn (0.79°) — Bearish Internal Correction in Summer Rally",
   c:"Venus opposes Saturn within the first 3 weeks of the Summer Rally. Financial values meet structural restriction as the uptrend begins.",
   why:"Venus (money) OPP Saturn (contraction) = bearish for financial values. Falls in the opening weeks of the Summer Rally (Jun 26–Sep 4). Does NOT negate the seasonal — creates a temporary internal correction within the uptrend. Watch for a brief pullback around Jun 18 before the rally continues. Pesavento: hard Venus-Saturn aspects are bearish regardless of context."},
  {w:"Jun 2",t:"m",bias:"warn",src:"JPL DE405 ephem — calculated",
   e:"☿ Mercury Declination North Peak +25.60° ⚡ OUT OF BOUNDS — Year's Most Extreme North",
   c:"Mercury's most extreme North declination of 2026. Maximum unpredictability in market narrative. OOB = outside Sun's max ±23°26'.",
   why:"Mercury OOB North at +25.60° (Sun maximum is ±23°26'). The most extreme North OOB of 2026. Gann Course L2: OOB planets 'step outside the boundaries of normal behavior.' For Mercury OOB: communication and sentiment become extreme, erratic, and unexpected. Three OOB events in 2026: Jan 7 (−24.38°), Jun 2 (+25.60°), Dec 30 (−24.85°)."},
  {w:"Jun 15",t:"g",bias:"turn",src:"Pesavento (730 cycles) + Jensen + Gann + NASA/JPL",
   e:"⭐⭐⭐⭐⭐ New Moon + Mercury Elongation + Gann 4×9w 🌑 Moon in GEMINI = ABSOLUTE LOW",
   c:"Five independent frameworks on one date. Moon in Gemini = ABSOLUTE LOW per Pesavento (730 S&P cycles, 1950–present). Strongest bottom signal of the year.",
   why:"(1) Pesavento 730-cycle Moon vs Sign study: Gemini Moon = strongest absolute lows. (2) New Moon = bottom signal (avg NM −1 day). (3) Mercury Greatest Elongation 24.5°E = maximum clarity. (4) Gann 4×9 weeks (2+5+2=9). (5) Moon Perigee Jun 14 (357km) for amplification. Five frameworks from five independent analytical traditions targeting the same date. The highest-confidence bottom signal of 2026."},
  {w:"Jun 26",t:"p",bias:"bull",src:"Pesavento (2015) + Jensen (1978)",
   e:"📅 END 'Sell in May' + START Summer Rally — BULLISH Seasonal",
   c:"Summer Rally opens Jun 26. Cancer/Leo/Virgo. Reliable ~2 months. Jensen 3×88d aligns within 1 day of opening.",
   why:"Pesavento: Cancer solar transit conjuncts US natal Sun = consistent summer gains. Jensen 3×88d Mercury cycle (Jun 27) aligns within 1 day of the seasonal opening. KEY WARNING: Venus Greatest Elongation Aug 15 (45.9°E) = peak sentiment = potential distribution zone. Mars Helio 180° Aug 6 = punctual bearish pressure within the uptrend."},
  {w:"Jun 27",t:"g",bias:"turn",src:"Jensen (1978)",
   e:"Jensen 3×88d Mercury Orbital Cycle (264 days from ATH)",
   c:"Third 88-day Mercury orbital cycle from ATH. Falls 2 days before Full Moon + Mercury Station Retrograde cluster.",
   why:"Jensen's 88-day Mercury cycle: each multiple from a major turn marks a potential reversal. This third cycle (264 days) aligns with the opening of the Summer Rally + Full Moon + Mercury Retrograde beginning (Jun 29). The cluster of turning point signals at the rally's inception suggests the initial days may see volatility before the seasonal trend takes over."},
  {w:"Jun 29",t:"r",bias:"turn",src:"NASA/JPL verified",
   e:"Full Moon Strawberry + ☿ Mercury Station Retrograde (26°27' Cancer)",
   c:"Emotional peak (Full Moon) meets the start of Mercury Retrograde. Peak sentiment + narrative confusion beginning simultaneously.",
   why:"The coincidence of Full Moon peak signal with Mercury Station Retrograde creates a complex inflection: the emotional high of the lunar cycle collides with the retrograde distortion effect. In the Summer Rally context, this likely marks a temporary consolidation or pullback — not a trend reversal. The seasonal tailwind continues despite retrograde noise."},
]},


JUL:{l:"July",e:[
{w:"Jul 05",t:"v",bias:"turn",src:"Jensen (1978) + JPL ephem",
   e:"♀ Venus SQUARE Jupiter (0.24°) — Overextension Signal in July",
   c:"Venus squares Jupiter at 0.24° orb in July — the month of maximum Jensen Node pressure. Overextension of bullish sentiment.",
   why:"Venus-Jupiter square = financial overextension. July is the month of closest Jensen Node approach (0.6° orb, maximum major-low pressure). The overextension of Jupiter\'s bullish energy (squared) meets the Node\'s bearish backdrop. A short-term high within the Summer Rally — profit-taking zone."},
  {w:"Jul 09",t:"v",bias:"bear",src:"Pesavento (2015) + JPL ephem",
   e:"♀ Venus OPPOSITION Mars (0.08°) — MOST EXACT VENUS-MARS OF 2026 ⚠️",
   c:"Venus opposes Mars at near-perfect 0.08° orb — essentially exact. The most precise Venus-Mars aspect of the entire year. In July\'s maximum Jensen Node pressure month.",
   why:"0.08° = the most precise Venus-Mars aspect of the entire year. Venus (money) in direct opposition to Mars (aggression) at essentially zero separation. In July — month of maximum Jensen Node pressure (0.6° orb, major lows). This extremely tight bearish opposition within the year\'s most bearish backdrop creates maximum downward pressure. Within Summer Rally: the most likely internal low of the seasonal uptrend."},
  {w:"Jul 09",t:"m",bias:"bear",src:"Jensen (1978) + JPL ephem",
   e:"☿ Mercury SQUARE Saturn (0.53°) — Double Bearish with Venus OPP Mars",
   c:"Mercury squares Saturn same day as Venus OPP Mars (Jul 9). Double bearish: narrative restriction + value attack simultaneously on Jensen Node peak month.",
   why:"Mercury-Saturn square (narrative restricted) + Venus-Mars opposition (value under attack) on the SAME DAY in July — the month of maximum Jensen Node pressure. Three converging bearish forces: Venus OPP Mars (0.08°, exact), Mercury SQUARE Saturn (0.53°), Jensen Node peak (0.6° orb). High-probability significant down day."},
  {w:"Jul 18",t:"m",bias:"warn",src:"Jensen (1978) + JPL ephem",
   e:"☿ Mercury OPPOSITION Jupiter (0.69°) — Narrative Overextension",
   c:"Mercury opposes Jupiter — narrative becomes overoptimistic, setting up disappointment. 5 days before Mercury Direct (Jul 23).",
   why:"Mercury OPP Jupiter = peak narrative overoptimism. Within Summer Rally: analysts upgrades, bullish media, excessive earnings optimism. The opposition is stressed — the narrative is stretched too far and must correct. Mercury Direct (Jul 23) follows 5 days later — clarity returns after the overoptimism peak."},
  {w:"Jul 21",t:"m",bias:"bear",src:"Jensen (1978) + JPL ephem",
   e:"☿ Mercury SQUARE Mars (1.18°) — Aggressive Tension on Gann 2×144 Day",
   c:"Mercury squares Mars at 1.18° orb on the same day as Gann 2×144 (Jul 21). Aggressive narrative coincides with geometric pressure point.",
   why:"Mercury-Mars square = aggressive, confrontational narrative. Falls on the SAME DAY as Gann 2×144 days from ATH — the Gann angular milestone meets an aggressive narrative aspect. The combination of geometric pressure (Gann) and narrative aggression (Mercury-Mars) increases the probability of a significant single-session move."},
  {w:"July",t:"g",bias:"warn",src:"Jensen (1978) p.79 — exact calculation",
   e:"⭐ North Node EXACT SQUARE to 9° Gemini — Peak of Year, 0.6° Orb",
   c:"Jensen's critical hinge point square reaches minimum orb in July (0.6°). Maximum pressure for major market lows this month.",
   why:"The North Node at ~9.6° Pisces forms a 270° square to Jensen's 9° Gemini critical point with only 0.6° orb — the closest of the year. Jensen: 'The squares approximate major market lows.' Combined with Mercury Retrograde (ending Jul 23) and the overall bearish backdrop, July is the month of maximum downward structural pressure in 2026."},
  {w:"Jul 6",t:"g",bias:"turn",src:"Gann Master Time Factor",
   e:"📐 Gann 270° Angle (273.9 days from ATH) — 2+7+0=9",
   c:"Three-quarter turn of the annual cycle. Gann's sixth 45° angular milestone. Final phase of the cycle begins.",
   why:"Gann's 270° angle marks three-quarters of the annual circle — the beginning of the final phase before the 360° close. 2+7+0=9. At this point the market is in the final quarter of the cycle. Given the bearish backdrop (Jensen Node, approaching Fall Crash Zone), this angle likely acts as resistance in an uptrend or accelerates a downtrend."},
  {w:"Jul 12",t:"m",bias:"bull",src:"NASA/JPL verified + JPL ephem calculated",
   e:"☿ Mercury Cazimi in Cancer + Declination Plateau +17.05° (delta 0.05° — not a peak)",
   c:"Second Cazimi of the year — brief clarity window within retrograde. Declination is a plateau, not a sharp peak (correction from original source).",
   why:"Mercury Cazimi: within 17 arcminutes of Sun's center = maximum power (see Mar 7 for full explanation). The +17.05° declination with only 0.05° delta means Mercury is essentially stationary in declination — a plateau, not a peak. Original source incorrectly labeled this. The Cazimi effect is the dominant signal: temporary but decisive market clarity within the retrograde fog."},
  {w:"Jul 21",t:"g",bias:"turn",src:"Gann Master Time Factor",
   e:"📐 Gann 2×144 Days (288 days from ATH) — 2+8+8=18→9",
   c:"Double 144-day cycle from ATH. One of Gann's primary composite time targets. 2+8+8=18→9.",
   why:"288 days = 2×144, combining two of Gann's most significant individual cycles. Digit sum 2+8+8=18→1+8=9 confirms. The doubling of the 144-day cycle creates a compound pressure point. Within Mercury Retrograde (Jun 29–Jul 23), this falls 2 days before Mercury turns Direct — adding the station energy to the Gann timing."},
  {w:"Jul 23",t:"m",bias:"bull",src:"NASA/JPL verified",
   e:"☿ Mercury Station Direct (16°19' Cancer) — Narrative Clarity Returns",
   c:"Mercury resumes direct motion. 24 days of retrograde fog lifts. Trend direction becomes decisive.",
   why:"Mercury Direct ends the retrograde distortion (Jun 29–Jul 23). The station moment — when the planet appears to stop — concentrates energy. The directional move following Mercury Direct is often the clearest signal of the month. Within the Summer Rally context and the July Jensen Node pressure, this creates a critical inflection for trend assessment."},
  {w:"Jul 29",t:"n",bias:"turn",src:"Pesavento (2015)",
   e:"Full Moon (Buck Moon) — Monthly Emotional Peak",
   c:"Full Moon peak signal within the Summer Rally. Likely a short-term distribution zone within the seasonal uptrend.",
   why:"Pesavento: Full Moon = emotional climax of the lunar cycle. Within the Summer Rally seasonal tailwind, this marks a short-term high. Expect consolidation or pullback followed by continuation of the seasonal trend. In July's context of maximum Jensen Node pressure, this Full Moon deserves extra attention as a potential more significant top."},
]},

AUG:{l:"August",e:[
  {w:"Aug 12",t:"m",bias:"turn",src:"NASA Eclipse + JPL ephem",
   e:"☿ Mercury CONJUNCT Uranus (0.24°) — Shock Event on Total Solar Eclipse Day",
   c:"Mercury conjuncts Uranus at 0.24° orb ON THE SAME DAY as the Total Solar Eclipse. Maximum shock: eclipse energy + Mercury-Uranus disruption simultaneously.",
   why:"Mercury-Uranus conjunction = sudden, unexpected narrative shock. ON THE SAME DAY as Total Solar Eclipse (Aug 12, the most powerful eclipse of 2026). Expected: an extremely unexpected news event that surprises all participants and initiates the transition from Summer Rally to Fall Crash Zone. Maximum shock potential of the year — two independent signals of sudden disruption coincide."},
  {w:"Aug 15",t:"v",bias:"bear",src:"Pesavento (2015) + JPL ephem",
   e:"♀ Venus SQUARE Saturn (0.12°) — CRITICAL CONTRADICTION ⚠️ Same Day as Venus Greatest Elongation",
   c:"Venus squares Saturn at near-exact 0.12° orb ON THE SAME DAY as Venus Greatest Elongation (peak bullish sentiment, 45.9°E). Peak visibility under maximum Saturnian compression simultaneously.",
   why:"CRITICAL CONTRADICTION: Aug 15 has two opposing signals. (1) Venus Greatest Elongation (45.9°E) = Pesavento peak bullish correlator, maximum market optimism. (2) Venus SQUARE Saturn (0.12°) = Pesavento bearish framework, financial contraction. Resolution: the peak of bullish sentiment occurs simultaneously with Saturnian structural compression — the classic sentiment peak trap. Euphoria at maximum visibility, but structure (Saturn) is already squaring the money planet. ACTION: SELL into the Venus Greatest Elongation euphoria — Saturn is already capping it. Distribution zone, NOT accumulation."},
  {w:"Aug 18",t:"m",bias:"bear",src:"Jensen (1978) + JPL ephem",
   e:"☿ Mercury SQUARE Saturn (0.73°) — Structure Caps Post-Eclipse Recovery",
   c:"Mercury squares Saturn 6 days after Total Solar Eclipse. Structure caps any post-eclipse recovery attempt.",
   why:"Mercury-Saturn square = narrative hits structural wall. Falls 6 days after Total Solar Eclipse + Mercury-Uranus shock conjunction (Aug 12). Classic post-shock sequence: initial shock (Aug 12) → market tries to recover → structure caps the recovery attempt (Aug 18). Structural resistance prevents sustained recovery from the eclipse disruption."},
  {w:"Aug 6",t:"b",bias:"bear",src:"Gann methodology + JPL ephem calculated",
   e:"♂ Mars Heliocentric 180° from ATH — Opposition BEARISH ⚠️ Within Summer Rally",
   c:"Mars helio at 180° from ATH position. Third Mars geometric milestone. Maximum geometric pressure within the Summer Rally.",
   why:"180° = maximum geometric distance from the starting point — the halfway point of the Mars helio cycle from ATH. Gann's squaring framework: this creates peak resistance. Falls within the Summer Rally, making it an internal pressure point. Coincides with Gann Annual Aug 7 (1 day difference), amplifying the signal. Likely marks a temporary top or retest within the ongoing summer uptrend."},
  {w:"Aug 7",t:"g",bias:"turn",src:"Gann Master Time Factor + JPL ephem",
   e:"📐 Gann Annual Solar Date — 15° Leo + ☿ Mercury Declination North Peak +20.32°",
   c:"4th of Gann's 8 annual solar timing dates. Mercury declination reaches a local North peak the same day.",
   why:"Gann's 15° Leo = midpoint of Leo, ruling speculation. The fourth annual solar date marks the midpoint of summer — critical timing for trend assessment. The simultaneous Mercury North peak (+20.32°) marks a shift in narrative direction from expansive (North) toward more defensive (beginning descent back toward South). The Mars Helio 180° the day before creates a 2-day cluster of maximum pressure."},
  {w:"Aug 12",t:"e",bias:"turn",src:"NASA — Total Solar Eclipse confirmed",
   e:"☀ Total Solar Eclipse + New Moon (Visible Europe/N.Africa) — Most Powerful Eclipse of 2026",
   c:"Total Solar Eclipse — maximum magnitude. More potent than February's annular eclipse. Primary regime-change catalyst of the second half.",
   why:"Jensen dedicates a full chapter to eclipses. Total Solar Eclipses = maximum magnitude per the eclipse formula. Visible across Europe and North Africa = major financial markets directly in the path of maximum effect. This eclipse near the end of the Summer Rally (which ends Sep 4) likely marks the beginning of the transition toward the Fall Crash Zone. Eclipse effects can persist for weeks to months."},
  {w:"Aug 15",t:"v",bias:"bull",src:"NASA/JPL verified + Pesavento (2015)",
   e:"⭐ ♀ Venus Greatest Elongation (45.9°E) ← PEAK MARKET SENTIMENT OF THE YEAR",
   c:"Venus at maximum visibility (45.9° from Sun). Peak bullish sentiment. Falls 3 days after Total Solar Eclipse — D3–5 initial impulse window.",
   why:"Venus Greatest Elongation = maximum brightness as Evening Star = peak market optimism and risk appetite. Pesavento: Venus is the 'most reliable positive correlator' in financial astrology. At 45.9°E this is the year's maximum Venus visibility. The timing (D3–5 after Total Solar Eclipse) creates the strongest sentiment confluence of the year. Use as a potential distribution zone — sentiment peaks BEFORE price peaks."},
  {w:"Aug 28",t:"e",bias:"turn",src:"NASA — Partial Lunar Eclipse (96%) confirmed",
   e:"🌑 Partial Lunar Eclipse (96%) — Full Moon — Double Eclipse Window Closes",
   c:"Near-total Lunar Eclipse. 16 days after Total Solar Eclipse. The eclipse double-window that began Aug 12 closes here.",
   why:"The double eclipse window (Total Solar Aug 12 + 96% Lunar Aug 28) brackets a 16-day period of maximum market sensitivity. The Lunar Eclipse amplifies the Full Moon peak signal — 96% magnitude = near-total emotional intensity. This eclipse closes the regime-change window initiated by the Total Solar Eclipse, marking the endpoint of the most volatile fortnight of the summer."},
]},


SEP:{l:"September",e:[
{w:"Sep 03",t:"v",bias:"warn",src:"Jensen (1978) + JPL ephem",
   e:"♀ Venus OPPOSITION Jupiter (0.23°) — Final Summer Rally Overextension",
   c:"Venus opposes Jupiter at 0.23° orb the day before the Fall Crash Zone opens. Final overextension of bullish summer sentiment.",
   why:"Venus OPP Jupiter = financial overextension. 0.23° = very tight. Falls 1 day before the Fall Crash Zone opens (Sep 4). The final gasp of Summer Rally bullish sentiment meets Jupiter opposition stress — classic distribution: one final bullish push, then the crash zone takes over. Sep 3 Venus OPP Jupiter → Sep 4 Fall Crash Zone opens."},
  {w:"Sep 05",t:"m",bias:"bear",src:"Jensen (1978) + JPL ephem",
   e:"☿ Mercury OPPOSITION Saturn (0.67°) — Reality Confronts Narrative at Crash Zone Open",
   c:"Mercury opposes Saturn in the opening days of the Fall Crash Zone. Sobering structural reality follows summer optimism.",
   why:"Mercury (narrative) OPP Saturn (structural reality) = summer optimism confronted by hard structural facts. Falls in the opening week of the Fall Crash Zone. Combination: Fall Crash Zone opens (Sep 4) + Mercury OPP Saturn (Sep 5) = the bearish seasonal backdrop immediately confirmed by a sobering narrative event. Classic crash zone entry pattern."},
  {w:"Sep 22",t:"m",bias:"turn",src:"JPL ephem",
   e:"☿ Mercury OPPOSITION Uranus (0.03°) — MOST EXACT MERCURY ASPECT OF 2026, Day Before Key Cluster",
   c:"Mercury opposes Uranus at near-perfect 0.03° orb — the most exact Mercury aspect of the entire year. Falls 1 day before Jensen 4×88d = Gann Equinox (Sep 23).",
   why:"0.03° = the most exact Mercury aspect of 2026. Mercury-Uranus opposition = sudden, unexpected narrative reversal. Falls 1 day before the major cluster Sep 23-24 (Jensen 4×88d = Gann Equinox EXACT, Jupiter-Saturn Trine). The most precise Mercury aspect of the year acts as a TRIGGER for the larger turning point. A sudden unexpected news event on Sep 22 triggers the directional decision of the Sep 23-24 inflection."},
  {w:"Sep 30",t:"m",bias:"bear",src:"Jensen (1978) + JPL ephem",
   e:"☿ Mercury OPPOSITION Mars (0.26°) — Aggressive Narrative Before Gann 360°",
   c:"Mercury opposes Mars at 0.26° orb. Aggressive narrative conflict at month end, 6 days before Gann 360° (Oct 6).",
   why:"Mercury OPP Mars = peak narrative aggression. 0.26° = tight. Falls at month-end September, 6 days before Gann 360° (Oct 6) — the most critical Gann date of the year. The narrative becomes maximally aggressive just before the annual cycle closes. Within Fall Crash Zone — this aggressive narrative event confirms and likely accelerates the seasonal bearish pressure into Gann 360°."},
  {w:"Sep 4",t:"p",bias:"warn",src:"Pesavento (2015) — 108-year crash study",
   e:"📅 END Summer Rally + START ⚠️ FALL CRASH ZONE — EXTREME RISK",
   c:"The most dangerous seasonal window of the year opens. Sep 4–Oct 27. All major market crashes occurred here.",
   why:"Pesavento's definitive finding: crashes of 1907, 1929, 1937, 1957, 1987, 2001, 2002, 2008 all occurred Sep 4–Oct 27. Sun's transit through Virgo into Libra = waxing square to US natal Sun (Cancer). Maximum astrological tension. In 2026 additionally loaded: Venus Retrograde, double bearish Venus conjunctions, Mercury Retrograde, Venus IC, Gann 360°."},
  {w:"Sep 11",t:"n",bias:"bear",src:"Pesavento (2015) — polarity inversion rule",
   e:"New Moon 🌑 — Polarity INVERTED: Marks TOP in Fall Crash Zone",
   c:"In the Fall Crash Zone bearish context, New Moon polarity inverts per Pesavento. This New Moon marks a temporary peak in a countertrend bounce — a sell opportunity, not a buy.",
   why:"Pesavento's inversion rule: New Moon = bottom in bull markets, TOP in bear markets. The Fall Crash Zone is the most bearish seasonal window of the year. Any bounce into this New Moon is a short-selling opportunity, not a reversal signal. The 2008 crash confirmed this — New Moons within the Crash Zone marked peaks of brief relief rallies before continuation of the decline."},
  {w:"Sep 12",t:"m",bias:"bear",src:"JPL ephem calculated",
   e:"☿ Mercury Equator Crossing North → South — Defensive Narrative Regime",
   c:"Mercury declination crosses zero moving South — shift from expansive to contracting/defensive narrative direction.",
   why:"Mercury crossing from North to South declination = shift from expansive, bullish narrative (North) toward defensive, contracting narrative (South). This occurs as the Fall Crash Zone is already underway. The narrative regime reinforces the seasonal bearish bias — a double confirmation of the directional shift."},
  {w:"Sep 23",t:"g",bias:"turn",src:"Jensen (1978) + Gann + NASA/JPL — Zero days offset",
   e:"⭐ EXACT: Jensen 4×88d = Gann Annual Equinox — Zero Days Difference",
   c:"Jensen's 4th Mercury orbital cycle (4×88=352 days) coincides exactly with the Autumn Equinox. Two independent systems, zero offset.",
   why:"Mathematical coincidence of Jensen's 88-day cycle (352 days from ATH) landing exactly on the Autumn Equinox (Gann's 0° Libra cardinal point). Completely independent methodologies targeting the same date. This marks a high-confidence turning point zone. The DIRECTION is complicated by the simultaneous Jupiter-Saturn Trine bullish signal (Sep 24) within the Fall Crash Zone."},
  {w:"Sep 24",t:"g",bias:"bull",src:"Jensen (1978) p.69 + JPL ephem calculated",
   e:"⭐ Jupiter-Saturn TRINE 120° EXACT — Jensen BULLISH ⚠️ Within Fall Crash Zone",
   c:"Jensen's most favorable outer planet configuration. Falls within Pesavento's crash zone. Most likely: strong technical bounce within a larger decline.",
   why:"Jensen (p.69): 'Trine group: bullish, favorable, serene, constructive and the expansion urge.' Jupiter-Saturn 120° = most favorable configuration of the two most economically significant planets. Exact per JPL calculations. CONTEXT CONFLICT: Jensen bullish WITHIN Pesavento crash zone. Jensen's own 1974 case study: trine during bearish Node configuration produced 'the framework of a classic low' + recovery of 15-18 months. Interpretation: Sep-Oct may produce the MAJOR LOW of 2026 here."},
]},


OCT:{l:"October",e:[
{w:"Oct 03",t:"v",bias:"bear",src:"Pesavento (2015) + JPL ephem",
   e:"♀ Venus SQUARE Mars (0.35°) — BEARISH, Same Day as Venus Station Retrograde",
   c:"Venus squares Mars at 0.35° orb ON THE SAME DAY as Venus Station Retrograde. Double bearish: value squared by aggression + retrograde begins simultaneously.",
   why:"Venus SQUARE Mars (financial values under aggressive attack) coincides exactly with Venus Station Retrograde (value confusion begins). The day Venus stops and turns backward, it simultaneously squares Mars. Triple bearish loading Oct 3: (1) Venus-Mars square (aggressive financial attack), (2) Venus retrograde begins (value confusion), (3) Fall Crash Zone active. Three bearish forces converge on the same day."},
  {w:"Oct 06",t:"m",bias:"bear",src:"Gann + Jensen (1978) + JPL ephem",
   e:"☿ Mercury SQUARE Saturn (0.46°) — Narrative Restriction on Gann 360° Day",
   c:"Mercury squares Saturn at 0.46° orb ON THE SAME DAY as Gann 360° (Oct 6). Narrative restriction confirms the annual cycle close bearish signal.",
   why:"Gann 360° is already 2026\'s most bearish single date. The simultaneous Mercury-Saturn square adds narrative restriction to the angular milestone. When the Gann annual cycle closes (Oct 6), communication about markets (Mercury) hits structural restriction (Saturn) simultaneously. Two independent frameworks (Gann geometry + Jensen planetary aspect) confirm the same day as maximum downward pressure."},
  {w:"Oct 16",t:"m",bias:"warn",src:"Jensen (1978) + JPL ephem",
   e:"☿ Mercury OPPOSITION Jupiter (0.29°) — False Hope Narrative in Crash Zone",
   c:"Mercury opposes Jupiter at 0.29° orb within Fall Crash Zone. Brief overoptimistic narrative — the false hope before continued decline.",
   why:"Mercury OPP Jupiter = overoptimistic, overextended narrative. Within Fall Crash Zone: a brief relief rally narrative — the market story becomes briefly bullish. 0.29° = tight. Falls between Gann 360° (Oct 6) and the double retrograde (Oct 24) — the false hope narrative between two major bearish events. Treat as a sell-the-rally signal."},
  {w:"Oct 30",t:"m",bias:"bear",src:"Jensen (1978) + JPL ephem",
   e:"☿ Mercury CONJUNCT Saturn (0.83°) — Maximum Narrative Contraction",
   c:"Mercury conjuncts Saturn at 0.83° orb. Communication directly absorbs Saturnian contraction. Mercury is retrograde — retrograde Mercury conjunct Saturn = double restriction.",
   why:"Mercury CONJ Saturn = narrative fully absorbed by contraction. Mercury is retrograde (Oct 24–Nov 13) when it conjuncts Saturn — retrograde Mercury + Saturn conjunction = double restriction on communication and narrative. Maximum deflationary narrative pressure. Falls 6 days after the double retrograde peak (Oct 24). Santa Claus Rally begins Oct 27 — this contraction is the headwind the rally must overcome."},
  {w:"Oct 3",t:"r",bias:"bear",src:"NASA/JPL verified ➕ Was missing from original source",
   e:"♀ Venus Station Retrograde (8°29' Scorpio) — 41-Day Retrograde Begins",
   c:"Venus retrograde begins. Financial sentiment and value perception enter 41 days of reassessment and confusion.",
   why:"Venus retrograde (every ~18 months, 41 days): during retrograde, markets reassess what appeared valuable. Pesavento: Venus rules 'money, possessions, earned income, security.' Venus retrograde = value confusion. In the Fall Crash Zone this amplifies bearish pressure by removing the Venus bullish correlator. Pre-shadow began Aug 31. Post-shadow clears Dec 15."},
  {w:"Oct 6",t:"g",bias:"warn",src:"Gann Master Time Factor (Wall Street Stock Selector, 1930)",
   e:"📐 Gann 360° — COMPLETE ANNUAL CYCLE ⚡ MOST CRITICAL DATE OF THE YEAR — 3+6+0=9",
   c:"Exactly 365.25 days from ATH (Oct 6, 2025). 3+6+0=9. Annual cycle closes. Gann: action = reaction in opposite direction when time cycle expires.",
   why:"Gann (Wall Street Stock Selector, 1930): 'When the time cycle is up, neither Democrat, Republican nor our good President can stem the tide. It is a natural law. ACTION EQUALS REACTION IN THE OPPOSITE DIRECTION.' The 360° annual close is Gann's single most critical time factor. The annual cycle anniversary of a major high demands market response. Bearish context (Fall Crash Zone + Venus Retrograde + Jensen Node) = the reaction is downward. If Sep 24 trine produced a bounce, Oct 6 is the most likely date for its reversal."},
  {w:"Oct 10",t:"n",bias:"bear",src:"Pesavento (2015) — 730 cycle study",
   e:"New Moon 🌑 Moon in LIBRA — ABSOLUTE TOP SIGNAL (Pesavento 730 cycles)",
   c:"Moon in Libra = ABSOLUTE PEAK per Pesavento (730 cycles, 1950-present). QE-era update: peak shifted one sign to Virgo. Either way, a relative top within Fall Crash Zone.",
   why:"Pesavento's Moon vs Sign study (730 cycles): Libra consistently produces the strongest absolute market peaks. Post-2009 QE adjustment: peak shifted to Virgo (one sign earlier). In 2026: New Moon in Libra within Fall Crash Zone + post-Gann 360° context = a false-hope rally peak leading into the sharpest decline of the crash window. Venus/Saturn bearish follows Oct 11."},
  {w:"Oct 11",t:"v",bias:"bear",src:"Pesavento (2015) — 101 cycles + JPL",
   e:"♀ Venus CONJUNCT Saturn — BEARISH [101 verified cycles] ⚠️ Triple Loading",
   c:"Second Venus-Saturn bearish conjunction of 2026. 101 cycles confirmed. Triple bearish: Venus/Saturn + Venus Retrograde + Fall Crash Zone. Angular difference 1.8° (JPL).",
   why:"Pesavento: Venus/Saturn = market falls in 101 verified historical cases. Second occurrence in 2026 (Feb 24 was the first). TRIPLE BEARISH: (1) Venus/Saturn bearish signal (101 cycles), (2) Venus already retrograde — value confusion amplifies contraction, (3) Fall Crash Zone seasonal. This is one of the three most bearish individual dates of 2026, alongside Gann 360° (Oct 6) and Venus/Mercury double retrograde (Oct 24)."},
  {w:"Oct 24",t:"r",bias:"bear",src:"Bayer (1942) + NASA/JPL",
   e:"⭐ ☿ Mercury Retrograde + ♀ Venus Inferior Conjunction (Bayer) — DOUBLE RETROGRADE",
   c:"Both inner planets simultaneously retrograde/inferior. Bayer: Venus IC = 291 days after Venus SC (Jan 6) = exact half of 584-day cycle. Primary Bayer turning point.",
   why:"Bayer's Venus IC framework: 584-day Venus synodic cycle (SC→IC→SC). The IC falls exactly 291 days after SC (Jan 6) = the precise mathematical midpoint. Bayer made monthly predictions based on these cycle positions. Simultaneously: Mercury Station Retrograde begins + Mercury declination South peak −20.96°. Both planets governing communication (Mercury) and money (Venus) entering their confused states simultaneously, within the Fall Crash Zone, 18 days after the annual cycle closed (Gann 360° Oct 6)."},
  {w:"Oct 27",t:"p",bias:"bull",src:"Pesavento (2015)",
   e:"📅 END Fall Crash Zone + START Santa Claus Rally — BULLISH Seasonal",
   c:"The most dangerous seasonal window closes. Recovery phase begins. In 2026 amplified by the double direct (Mercury Nov 13 + Venus Nov 14).",
   why:"Pesavento: Fall Crash Zone end = beginning of consistent Scorpio/Sagittarius recovery gains. In 2026: Mercury Direct Nov 13 + Venus Direct Nov 14 = both inner planets resume direct motion in 24 hours. This double clearing of communication and value confusion historically accelerates post-crash recovery. Jupiter synodic 399d + New Moon Nov 9 = first clean bullish entry signal."},
]},


NOV:{l:"November",e:[
{w:"Nov 15",t:"m",bias:"bear",src:"Jensen (1978) + JPL ephem",
   e:"☿ Mercury CONJUNCT Mars (0.66°) — Aggressive Volatility in Santa Claus Rally",
   c:"Mercury conjuncts Mars at 0.66° orb within the Santa Claus Rally. Aggressive communication creates internal volatility spike.",
   why:"Mercury-Mars conjunction = aggressive market narrative. Falls 2 days after Mercury Station Direct (Nov 13) and Venus Station Direct (Nov 14). The double direct clarity is immediately followed by Mars aggression — a sharp volatile session or short-term pullback within the seasonal uptrend. A temporary spike, not a reversal."},
  {w:"Nov 20",t:"m",bias:"bull",src:"Jensen (1978) + JPL ephem",
   e:"☿ Mercury CONJUNCT Jupiter (0.17°) — BULLISH, Most Bullish Mercury Aspect of 2026",
   c:"Mercury conjuncts Jupiter at near-exact 0.17° orb. The most bullish Mercury aspect of 2026. Expansive optimistic narrative.",
   why:"0.17° = near-exact. Mercury (communication) CONJ Jupiter (expansion/optimism) = most bullish narrative event of the year. Analyst upgrades, positive macro narrative, bullish guidance. Falls within Santa Claus Rally (Oct 27–Dec 8) — the seasonal tailwind is reinforced by the year\'s most bullish narrative signal. Combined with Mercury Direct (Nov 13) + Venus Direct (Nov 14) double clearing, this creates the strongest narrative momentum of Q4."},
  {w:"Nov 2",t:"b",bias:"bear",src:"Gann methodology + JPL ephem",
   e:"♂ Mars Heliocentric 225° from ATH — Waning Sesquiquadrate BEARISH",
   c:"Fourth and final Mars geometric milestone of 2026. 225° = waning sesquiquadrate. Entering the bearish descending arc of the Mars cycle.",
   why:"225° = 180° + 45° = waning sesquiquadrate, entering the declining phase of the Mars helio cycle. Gann: waning hard aspects (>180°) represent the descending phase of energy — the trend works against the direction of the original impulse. Falls just after the Fall Crash Zone closes, potentially creating headwinds for the expected Santa Claus Rally bounce in early November."},
  {w:"Nov 9",t:"g",bias:"bull",src:"Jensen (1978) + Pesavento (2015)",
   e:"⭐ New Moon + ♃ Jupiter Synodic Cycle 399 Days Complete",
   c:"Jupiter completes one full synodic cycle from ATH (399 days). Coincides with New Moon. Jensen: Jupiter = primary financial planet.",
   why:"Jensen: Jupiter is the primary bullish financial planet. Its synodic period (399 days = one Earth-Jupiter conjunction-to-conjunction cycle) marks major structural shifts. This 399-day cycle close from the ATH, combined with the New Moon bottom signal (Pesavento), creates a potentially significant low — the first major bullish signal after the Fall Crash Zone. Jupiter synodic closes historically mark either important lows or the beginning of extended uptrends."},
  {w:"Nov 13",t:"m",bias:"bull",src:"NASA/JPL verified",
   e:"☿ Mercury Station Direct (5°02' Scorpio) + Moon Apogee",
   c:"Mercury resumes direct motion. Narrative clarity returns after Oct 24 retrograde. Venus follows Direct next day (Nov 14).",
   why:"Mercury Direct ends the retrograde distortion (Oct 24–Nov 13). The combination of Mercury Direct today and Venus Direct tomorrow (Nov 14) creates an unprecedented double clearing — both inner planets resuming direct within 24 hours. In the Santa Claus Rally context, this double clearing provides the clearest and most decisive bullish momentum signal of Q4."},
  {w:"Nov 14",t:"v",bias:"bull",src:"NASA/JPL verified ➕ Was missing from original source",
   e:"♀ Venus Station Direct (22°51' Libra) — Value & Sentiment Normalize",
   c:"Venus retrograde ends (41 days since Oct 3). Financial sentiment around value normalizes. One day after Mercury Direct = double clearing.",
   why:"Venus Direct: 'money and possessions' resume their bullish correlator role after 41 days of retrograde confusion. The 24-hour sequence Mercury Direct (Nov 13) → Venus Direct (Nov 14) is exceptionally rare. Pesavento: Venus Direct = Venus bullish correlator reactivated. Combined with seasonal Santa Claus Rally tailwind, this creates the most decisive bullish momentum setup of Q4."},
  {w:"Nov 24",t:"e",bias:"turn",src:"NASA/JPL verified",
   e:"Full Moon Beaver + Perigee (Supermoon) — Maximum Emotional Amplification",
   c:"Perigee Full Moon (Supermoon). Maximum emotional charge + maximum tidal effect = amplified peak signal.",
   why:"Supermoon Full Moon: maximum gravitational + maximum emotional charge. Pesavento: perigee Full Moons produce above-average volatility at the peak. In the Santa Claus Rally context, this likely marks a temporary high within the uptrend, followed by consolidation before the year-end January Effect rally opens Dec 20."},
]},


DEC:{l:"December",e:[
{w:"Dec 03",t:"m",bias:"bear",src:"Jensen (1978) + JPL ephem",
   e:"☿ Mercury OPPOSITION Saturn (0.08°) — MOST EXACT MERCURY-SATURN OF 2026",
   c:"Mercury opposes Saturn at 0.08° orb — the most exact Mercury-Saturn aspect of the entire year. Maximum structural narrative restriction at year\'s end.",
   why:"0.08° = the most precise Mercury-Saturn aspect of 2026. Mercury (narrative) OPP Saturn (structural reality) = maximum confrontation between the market story and hard structural facts. Falls within the quiet period between Santa Claus Rally end (Dec 8) and January Effect start (Dec 20). A significant sobering news event before the year-end rally."},
  {w:"Dec 07",t:"m",bias:"bear",src:"Jensen (1978) + JPL ephem",
   e:"☿ Mercury SQUARE Mars (0.38°) — Aggressive End to Santa Claus Rally",
   c:"Mercury squares Mars at 0.38° orb near the last day of the Santa Claus Rally. Sharp aggressive narrative event at the seasonal transition.",
   why:"Mercury-Mars square = aggressive confrontational narrative. Falls 1 day before the Santa Claus Rally ends (Dec 8). This aggressive aspect may be the catalyst that ends the rally — a sharp negative communication event that tips sentiment. Within 2 weeks of January Effect start (Dec 20) — the temporary aggressive pullback sets up the year-end rally entry."},
  {w:"Dec 08",t:"v",bias:"bear",src:"Pesavento (2015) + JPL ephem",
   e:"♀ Venus SQUARE Saturn (0.61°) — Bearish on Last Day of Santa Claus Rally",
   c:"Venus squares Saturn at 0.61° orb on the exact last day of the Santa Claus Rally (Dec 8). Value meets restriction at the seasonal transition.",
   why:"Venus-Saturn square = financial contraction. Falls on Dec 8 — the exact last day of the Santa Claus Rally per Pesavento. The Venus-Saturn bearish aspect arriving on the final day of the seasonal bullish window is a natural closing signal. Combined with Mercury SQUARE Mars (Dec 7), the Dec 7-8 window has two bearish aspects ending the Santa Claus Rally and beginning the pause before January Effect (Dec 20)."},
  {w:"Dec 21",t:"v",bias:"bear",src:"Pesavento (2015) + JPL ephem",
   e:"♀ Venus CONJUNCT Mars (0.05°) — BEARISH CONTRADICTION ⚠️ Same Day as Gann/Solstice/Jensen Cluster",
   c:"Venus conjuncts Mars at near-perfect 0.05° orb ON THE SAME DAY as Gann 7×9w = Winter Solstice = Jensen 5×88d (Dec 21). Financial values under aggressive attack within the year\'s strongest year-end cluster.",
   why:"CRITICAL CONTRADICTION: Dec 21 has both the year\'s most confirmed bullish timing cluster (Gann 7×9w = Solstice = Jensen 5×88d = January Effect) AND Venus CONJ Mars at 0.05° (essentially exact, bearish Pesavento signal). Resolution: the timing cluster identifies WHEN — the Venus-Mars conjunction determines HOW. Possible interpretation: the January Effect rally begins with an initial aggressive shakeout (Venus-Mars 0.05°) before the seasonal trend asserts itself upward. The bearish planet aspect may produce a volatile, aggressive opening to the rally. Watch price action — if Gann/Seasonal holds, Venus-Mars aggression is absorbed into a bullish impulse."},
  {w:"Dec 9",t:"n",bias:"turn",src:"NASA/JPL verified ✏️ Was listed as Dec 8",
   e:"New Moon — Transition Between Santa Claus Rally and January Effect",
   c:"New Moon bottom signal. Marks the transition from the end of the Santa Claus Rally (Dec 8) to the January Effect (Dec 20).",
   why:"Pesavento: New Moon marks bottoms in bull market contexts. This New Moon bridges the two year-end bullish windows — the bottom signal here sets up the strength of the January Effect rally that opens Dec 20. The 11-day gap between this bottom and the January Effect opening is the compression before the year-end acceleration."},
  {w:"Dec 20",t:"g",bias:"turn",src:"Jensen (1978)",
   e:"Jensen 5×88d Mercury Orbital Cycle — Final Cycle of 2026 (440 days from ATH)",
   c:"Fifth and final 88-day Mercury orbital cycle from ATH. 1 day before Gann 7×9w = Winter Solstice.",
   why:"Jensen's 5th Mercury cycle from ATH marks the final major cycle timing event of 2026. The fact that it falls 1 day before the exact Gann 7×9 weeks = Solstice confluence demonstrates the remarkable alignment between Jensen's astronomical orbital counting and Gann's independent geometric time cycles. Both derived from completely different methodologies arriving at essentially the same date."},
  {w:"Dec 20",t:"p",bias:"bull",src:"Pesavento (2015)",
   e:"📅 START January Effect — BULLISH Seasonal (Dec 20–Jan 7)",
   c:"Final bullish seasonal window opens. Sharp, strong rally. Capricorn. Four frameworks confirm.",
   why:"Pesavento: January Effect (Dec 20–Jan 7) = one of the most reliable short-term bullish windows. Sun in Capricorn opposes US natal Sun, historically generating sharp year-end gains. Supported by: Venus conjunct Jupiter Dec 29 (99 bullish cycles), Jensen 5×88d Dec 20, Gann 7×9w = Solstice Dec 21 (exact), Mercury OOB South Dec 30 (−24.85°, year's extreme — powerful but volatile)."},
  {w:"Dec 21",t:"g",bias:"turn",src:"Gann Master Time Factor + NASA/JPL",
   e:"⭐ EXACT: Gann 7×9 Weeks (441 days) = Winter Solstice — Zero Offset",
   c:"441 days from ATH = exactly the Winter Solstice. 4+4+1=9. Two independent systems coincide with zero offset.",
   why:"Gann's 9-week cycle (7th multiple = 441 days) and the astronomical Winter Solstice are completely independent calculations landing on the same date. Digit sum 4+4+1=9 confirms numerological framework. Winter Solstice (0° Capricorn) = Gann's 4th annual cardinal solar point. The year's most precisely confirmed timing confluence — two completely independent systems, zero offset."},
  {w:"Dec 29",t:"v",bias:"bull",src:"Pesavento (2015) — 99 verified cycles + JPL",
   e:"♀ Venus CONJUNCT Jupiter — BULLISH [99 verified cycles] — Year-End Cluster",
   c:"Second Venus-Jupiter bullish conjunction of 2026 (first: May 7). 99 cycles confirmed. Angular difference 1.6° (JPL). Within January Effect bullish window.",
   why:"Pesavento: Venus (tangible money) + Jupiter (large-scale expansion) = doubly positive. 99 cycles confirm market rises into conjunction. Falls within: January Effect seasonal + Jensen 5×88d + Gann 7×9w = Solstice cluster. The year closes with its most concentrated bullish signal since the April Earnings Rally. First Venus-Jupiter conjunction of 2027 cycle."},
  {w:"Dec 30",t:"m",bias:"warn",src:"JPL DE405 ephem — calculated",
   e:"☿ Mercury Declination South Peak −24.85° ⚡ OUT OF BOUNDS — Year's Most Extreme",
   c:"The most extreme Mercury declination of 2026. −24.85° OOB South surpasses even January's −24.38°. Year's strongest OOB event.",
   why:"Three Mercury OOB events in 2026: Jan 7 (−24.38°), Jun 2 (+25.60°), Dec 30 (−24.85°). December 30 is the year's absolute extreme. OOB Mercury = maximum unpredictability in market narrative and communication. Within the January Effect bullish seasonal — creates a powerful but volatile and potentially erratic end-of-year directional move. The strong bullish context (Venus/Jupiter Dec 29, seasonal, Gann/Jensen cluster) gives direction, but the OOB warns of extreme execution volatility."},
]},

CONF:{l:"Top Confluences ⭐",e:[
  {w:"CORE RULE",t:"g",bias:"neut",src:"20 Years Studying Gann + Gann Master Time Factor",
   e:"⚠️ INVERSION RULE: 10-15% of events invert the expected direction",
   c:"Confluences define WHEN. Price action defines DIRECTION. Every signal has a 10-15% inversion rate.",
   why:"From 20 Years Studying Gann: 'A true time cycle must maintain H-L-H-L sequence with ~10% inversions. If a cycle inverts 40% of the time, you have coincidence.' High-confluence events that FAIL to produce the expected move are often the strongest signals for the opposite direction. Always confirm with price action before entry."},
  {w:"Feb 27",t:"g",bias:"turn",src:"Gann + Fibonacci + Jensen (1978) p.135",
   e:"⭐⭐⭐ Gann 144d = Fib 144d = Jensen Biquintile 144° — Triple Exact",
   c:"Jensen's 'THE triggering aspect' aligned with Gann and Fibonacci on the same date. Highest-confidence Q1 turning point.",
   why:"Three independent systems: Gann 144d (1+4+4=9), Fibonacci 144 (time ratio), Jensen biquintile 144° (his single most powerful reversal signal per p.135). All three target this date independently. Falls 1 day after Mercury Station Retrograde. The biquintile specifically is Jensen's top-ranked signal for trend reversals — this is Q1's most analytically significant date."},
  {w:"Mar 28–Apr 6",t:"g",bias:"bull",src:"Jensen + Gann + Pesavento + Fibonacci + NASA/JPL",
   e:"⭐⭐⭐⭐⭐ Jupiter SEXTILE Uranus × Jensen 2×88d × Full Moon × Gann 180° — 5 Systems / 9 Days",
   c:"Most concentrated multi-framework bullish cluster of the year. Jensen: 100% win rate (28/28 cases). The highest-confidence bullish setup of 2026.",
   why:"Five frameworks from five different analytical traditions targeting the same 9-day window: Jensen 28/28 win rate (Jupiter-Uranus sextile), Jensen 2×88d orbital cycle, Pesavento Full Moon peak, Gann 180° midpoint, Pesavento April Earnings Rally seasonal. The statistical probability of this alignment is extremely low. If there is one date in 2026 to act on with maximum conviction, this is it."},
  {w:"Jun 15",t:"g",bias:"turn",src:"Pesavento (730 cycles) + Jensen + Gann + NASA/JPL",
   e:"⭐⭐⭐⭐⭐ New Moon × Mercury Elongation × Gann × Moon in GEMINI = ABSOLUTE LOW",
   c:"The single strongest bottom signal of 2026. Five frameworks confirm an absolute low. Pesavento: 730 cycles, Moon in Gemini = the lowest lows.",
   why:"Pesavento's largest study (730 S&P cycles, 1950–present) identifies Gemini Moon as the absolute low marker. Four additional independent confirmations: New Moon (bottom signal), Mercury Greatest Elongation (clarity), Gann 4×9 weeks (timing), Moon Perigee (amplification). This confluence has no equivalent in the calendar for bottom signals."},
  {w:"Sep 24",t:"g",bias:"bull",src:"Jensen (1978) p.69 + Gann + NASA/JPL",
   e:"⭐⭐⭐ Jupiter-Saturn Trine 120° × Gann Equinox × Jensen 4×88d — ZERO DAYS — Within Crash Zone",
   c:"Jensen's most favorable outer planet aspect, confirmed by two other systems with zero offset. Within Pesavento's crash zone — most likely the MAJOR LOW of 2026.",
   why:"Jensen's 1974 case study (his own framework): 'A trine during a bearish Node configuration produced the framework of a classic low and a recovery of at least 15-18 months.' This is the closest historical parallel to 2026. The conflict between Jensen bullish and Pesavento crash zone resolves as: September-October is likely the MAJOR LOW of 2026, with the trine marking the inflection."},
  {w:"Oct 6",t:"g",bias:"warn",src:"Gann Master Time Factor",
   e:"⭐⭐⭐⭐ Gann 360° × Fall Crash Zone × Jensen Node Square × Venus Retrograde",
   c:"Four bearish frameworks on the annual cycle close. Gann: action = reaction in opposite direction. The single most bearish date of 2026.",
   why:"Gann's most critical time factor (annual 360° close) within Pesavento's most dangerous seasonal window, compounded by Jensen's bearish Node backdrop and Venus already retrograde. If Sep 24 produced a bounce, Oct 6 is the most probable date for the resumption of decline. Maximum downward potential: all four frameworks align in the bearish direction."},
  {w:"Oct 24",t:"r",bias:"bear",src:"Bayer (1942) + NASA/JPL",
   e:"⭐⭐⭐ Mercury Retrograde × Venus Inferior Conjunction (Bayer) — Double Retrograde",
   c:"Bayer's Venus synodic midpoint + Mercury Station Retrograde simultaneously. Maximum value and narrative confusion.",
   why:"Bayer's Venus IC (291 days after SC Jan 6) = precise midpoint of the 584-day synodic cycle — his primary turning point signal. The simultaneous Mercury Station Retrograde makes both inner planets governing communication and money enter their confused retrograde states on the same day. Within the Fall Crash Zone, this represents maximum confusion overlaid on maximum seasonal risk."},
  {w:"Dec 21",t:"g",bias:"turn",src:"Gann + Jensen + NASA/JPL",
   e:"⭐⭐⭐⭐ Gann 7×9w × Jensen 5×88d × Winter Solstice — Zero Offset",
   c:"Three independent systems, zero offset on the Winter Solstice. The most precisely confirmed timing confluence of the year.",
   why:"Complete independence: Gann's geometric 9-week count (441 days, 4+4+1=9), Jensen's Mercury orbital count (440 days, within 1 day), and the fixed astronomical Winter Solstice all converge. Three different methodologies from three different researchers across different decades, all targeting the same date. Statistically remarkable."},
  {w:"Full Year",t:"g",bias:"warn",src:"Jensen (1978)",
   e:"⭐⭐⭐⭐ ANNUAL BACKDROP: Node 270° Square to 9° Gemini — Peak July (0.6° orb)",
   c:"Jensen's most important long-term timing tool. Squares historically = major market crashes/lows: 1961, 1970, 1979. Peak orb July.",
   why:"Jensen's Node analysis: the 18.5-year North Node cycle creates recurring pressure on financial markets when squaring the 9° Gemini critical point. The square configuration in 2026 maintains throughout the year (Node in Pisces), with July the closest approach (0.6° orb). Reinforces the Fall Crash Zone and Gann 360° for a maximally bearish Q3-Q4 backdrop."},
]},
};

const MONTHS = ["VISAO","JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC","CONF"];
const ML = {VISAO:"🗺 Overview",JAN:"Jan",FEB:"Feb",MAR:"Mar",APR:"Apr",MAY:"May",JUN:"Jun",JUL:"Jul",AUG:"Aug",SEP:"Sep",OCT:"Oct",NOV:"Nov",DEC:"Dec",CONF:"⭐ Confluences"};

export default function App() {
  const [active, setActive] = useState("VISAO");
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);

  const month = D[active];
  const isSpecial = active==="VISAO"||active==="CONF";
  const events = filter==="all"?month.e:month.e.filter(e=>e.t===filter);
  const isConfl = e => e.e.startsWith("⭐");
  const toggle = i => setExpanded(expanded===i?null:i);

  return (
    <div style={{minHeight:"100vh",background:"#060710",fontFamily:"Georgia,serif",color:"#e0d8cc",display:"flex",flexDirection:"column"}}>
      <div style={{position:"fixed",inset:0,zIndex:0,background:"radial-gradient(ellipse at 15% 20%,rgba(40,18,80,.65),transparent 50%),radial-gradient(ellipse at 85% 80%,rgba(8,28,58,.65),transparent 50%)",pointerEvents:"none"}}/>

      <header style={{position:"relative",zIndex:1,textAlign:"center",padding:"24px 16px 10px"}}>
        <p style={{fontSize:11,letterSpacing:2,color:"#a89050",margin:"0 0 5px",textTransform:"uppercase"}}>Gann · Jensen · Pesavento · Bayer · Fibonacci · NASA/JPL · ATH Oct 6, 2025</p>
        <h1 style={{fontSize:"clamp(22px,5vw,40px)",fontWeight:"normal",letterSpacing:2,margin:0,background:"linear-gradient(120deg,#ffe080,#c8b060,#ffcce0,#90e0f0)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>BTC Astro-Timing 2026</h1>
        <div style={{width:40,height:1,background:"linear-gradient(90deg,transparent,#c8b060,transparent)",margin:"6px auto"}}/>
        <p style={{fontSize:11,color:"#ffe08066",margin:0}}>Click any event to see source · reasoning · historical bias</p>
      </header>

      <nav style={{position:"relative",zIndex:1,display:"flex",flexWrap:"wrap",justifyContent:"center",gap:4,padding:"8px 10px 3px"}}>
        {MONTHS.map(m=>{
          const isA=active===m,isV=m==="VISAO",isC=m==="CONF";
          const hC=!isV&&!isC&&D[m].e.some(e=>isConfl(e));
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

      <div style={{position:"relative",zIndex:1,textAlign:"center",marginBottom:10}}>
        <span style={{fontSize:active==="VISAO"?20:26,letterSpacing:3,color:active==="CONF"?"#ffb432":active==="VISAO"?"#90e0f0":"#c8b060",fontWeight:"normal"}}>{month.l}</span>
        {!isSpecial&&<span style={{fontSize:12,color:"#444",marginLeft:10}}>{events.length} events</span>}
      </div>

      <div style={{position:"relative",zIndex:1,maxWidth:720,width:"100%",margin:"0 auto",padding:"0 12px 60px",display:"flex",flexDirection:"column",gap:7}}>
        {events.length===0&&<p style={{textAlign:"center",color:"#333",padding:32}}>No events of this type.</p>}
        {events.map((ev,i)=>{
          const cfg=TC[ev.t]||TC.n;
          const confl=isConfl(ev);
          const bias=BIAS[ev.bias]||BIAS.neut;
          const isOpen=expanded===i;
          const warn=ev.bias==="warn";
          const bc=confl?"#ffe080":warn?"#ff5030":cfg.b;
          const dc=confl?"#ffe080":warn?"#ff7050":cfg.d;
          return(
            <div key={i} onClick={()=>toggle(i)}
              style={{background:confl?"rgba(255,220,80,.06)":warn?"rgba(255,60,20,.04)":cfg.bg,
                border:`1px solid ${isOpen?bc+"88":bc+"22"}`,borderLeft:`3px solid ${bc}`,
                borderRadius:6,padding:"11px 14px",cursor:"pointer",transition:"border-color .2s",userSelect:"none"}}>
              <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                <div style={{minWidth:8,height:8,borderRadius:"50%",background:dc,marginTop:6,boxShadow:`0 0 6px ${dc}`,flexShrink:0}}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:4,marginBottom:4}}>
                    <span style={{fontSize:12,color:dc,letterSpacing:1,textTransform:"uppercase",fontWeight:"bold"}}>{ev.w}</span>
                    <div style={{display:"flex",gap:5,alignItems:"center"}}>
                      <span style={{fontSize:10,color:bias.color,background:bias.bg,border:`1px solid ${bias.color}44`,borderRadius:3,padding:"1px 7px",fontFamily:"sans-serif"}}>
                        {bias.icon} {bias.label}
                      </span>
                      <span style={{fontSize:10,color:cfg.b,opacity:.5}}>{cfg.l}</span>
                      <span style={{fontSize:12,color:"#555"}}>{isOpen?"▲":"▼"}</span>
                    </div>
                  </div>
                  <p style={{fontSize:14,color:confl?"#ffe0b0":ev.t==="g"?"#ffe080cc":"#ddd8c8",margin:"0 0 4px",lineHeight:1.45}}>{ev.e}</p>
                  <p style={{fontSize:12,color:"#5a5850",margin:0,lineHeight:1.55}}>{ev.c}</p>
                </div>
              </div>

              {isOpen&&(
                <div style={{marginTop:14,marginLeft:18,borderTop:"1px solid rgba(255,255,255,.07)",paddingTop:14,display:"flex",flexDirection:"column",gap:12}}>
                  <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                    <span style={{fontSize:11,color:"#90e0f0",minWidth:76,flexShrink:0,paddingTop:1}}>📚 SOURCE</span>
                    <span style={{fontSize:12,color:"#a0b8c8",lineHeight:1.6}}>{ev.src}</span>
                  </div>
                  <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                    <span style={{fontSize:11,color:"#90e0f0",minWidth:76,flexShrink:0,paddingTop:4}}>📊 HISTORY</span>
                    <span style={{fontSize:12,color:bias.color,background:bias.bg,border:`1px solid ${bias.color}33`,borderRadius:4,padding:"4px 12px",fontFamily:"sans-serif",lineHeight:1.5}}>
                      {bias.icon} {bias.label} — {
                        ev.bias==="bull"?"Market historically rises around this event.":
                        ev.bias==="bear"?"Market historically falls around this event.":
                        ev.bias==="warn"?"Historically associated with crashes or major dislocations.":
                        ev.bias==="turn"?"Historical turning point — direction depends on context and trend.":
                        "Neutral signal — amplifies the existing trend."
                      }
                    </span>
                  </div>
                  <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                    <span style={{fontSize:11,color:"#90e0f0",minWidth:76,flexShrink:0,paddingTop:3}}>💡 REASONING</span>
                    <p style={{fontSize:13,color:"#c0c8d0",margin:0,lineHeight:1.7}}>{ev.why}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <footer style={{position:"relative",zIndex:1,borderTop:"1px solid rgba(255,255,255,.04)",padding:"12px",display:"flex",flexWrap:"wrap",justifyContent:"center",gap:10}}>
        {Object.entries(TC).map(([k,v])=><div key={k} style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:7,height:7,borderRadius:"50%",background:v.d,boxShadow:`0 0 4px ${v.d}`}}/><span style={{fontSize:11,color:"#4a4840"}}>{v.l}</span></div>)}
        <div style={{width:"100%",display:"flex",justifyContent:"center",gap:14,marginTop:6,flexWrap:"wrap"}}>
          {Object.entries(BIAS).map(([k,v])=><span key={k} style={{fontSize:11,color:v.color}}>{v.icon} {v.label}</span>)}
        </div>
      </footer>
    </div>
  );
}
function ps(a,c){return{padding:"3px 10px",background:a?`${c}18`:"transparent",border:a?`1px solid ${c}44`:"1px solid rgba(255,255,255,.04)",borderRadius:20,color:a?c:"#4a4840",fontSize:11,cursor:"pointer",fontFamily:"inherit"};}
