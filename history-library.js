// history-library.js
// Historiska händelser för TimeDrop historia-quiz

const historyLibrary = [
  // SVERIGE - Viktiga händelser i svensk historia
  {
    id: 'hist1',
    title: 'Gustav Vasa blir kung',
    category: 'Sverige',
    year: 1523,
    description: 'Gustav Vasa väljs till kung efter att ha lett ett uppror mot den danska övermakten och Kalmarunionen. Genom att samla rikets makt till en stark kungaroll lägger han grunden för en mer sammanhållen svensk stat med gemensamt skattesystem, central styrning från Stockholm och en tydligare nationell identitet.',
    imageUrl: 'https://timedrop.se/TimeDrop/history/sverige/hist1-gustav-vasa-blir-kung.png'
  },
  {
    id: 'hist2',
    title: 'Stockholms blodbad',
    category: 'Sverige',
    year: 1520,
    description: 'Under en kunglig kröningsfest i Stockholm grips en stor grupp svenska adelsmän, präster och borgare anklagade för högförräderi. På Stortorget i Gamla stan avrättas ett stort antal personer offentligt, vilket sprider skräck i riket men också väcker stark vrede. Händelsen blir en katalysator för det motstånd som till slut störtar den danska kungen och banar väg för Gustav Vasas maktövertagande.',
    imageUrl: 'https://timedrop.se/TimeDrop/history/sverige/hist2-stockholms-blodbad.png'
  },
  {
    id: 'hist3',
    title: 'Reformationen i Sverige',
    category: 'Sverige',
    year: 1527,
    description: 'Vid en stor rikssamling i Västerås bryter Sverige stegvis med den katolska kyrkan och den påvliga makten. Kyrkans rikedomar dras in till kronan och kungen får ökat inflytande över religionen. Förändringen leder till att den lutherska läran införs, med gudstjänster och bibeltexter på svenska. Reformationen påverkar både människor tro, utbildningsväsendet och människors relation till kyrkan under lång tid framåt.',
    imageUrl: 'https://timedrop.se/TimeDrop/history/sverige/hist3-reformationen-i-sverige.png'
  },
  {
    id: 'hist4',
    title: 'Slaget vid Poltava',
    category: 'Sverige',
    year: 1709,
    description: 'Den svenska armén under Karl XII möter en avgörande motståndare vid staden Poltava. Efter flera års långa fälttåg och svåra försörjningsproblem bryts den svenska offensiven. Nederlaget markerar början på slutet för Sveriges tid som stormakt och leder till att riket successivt förlorar områden och inflytande i Europa.',
    imageUrl: 'https://timedrop.se/TimeDrop/history/sverige/hist4-slaget-vid-poltava.png'
  },
  {
    id: 'hist5',
    title: 'Karl XII dör',
    category: 'Sverige',
    year: 1718,
    description: 'Under en belägring vid en norsk fästning dör kungen plötsligt efter att ha träffats av ett skott. Hans död är omgärdad av rykten och teorier, men oavsett orsaken markerar den slutet på en epok av aggressiva krig och militära äventyr. Efter hans bortgång förändras Sveriges politik och fokus flyttas successivt från expansion till inre utveckling.',
    imageUrl: 'https://timedrop.se/TimeDrop/history/sverige/hist5-karl-xii-dor.jpg'
  },
  {
    id: 'hist6',
    title: 'Gustav III:s statsvälvning',
    category: 'Sverige',
    year: 1772,
    description: 'Gustav III genomför en oblodig kupp där han återtar makt från riksdagen och stärker kungens ställning. Genom nya lagar och reformer försöker han modernisera riket, stärka kulturlivet och skapa större ordning i statsförvaltningen. Händelsen leder till en period av starkt kungligt inflytande men också till ökade motsättningar med delar av adeln som ogillar hans maktpolitik.',
    imageUrl: 'https://timedrop.se/TimeDrop/history/sverige/hist6-gustav-iii-statsvalvning.jpg'
  },
  {
    id: 'hist7',
    title: 'Gustav III mördas',
    category: 'Sverige',
    year: 1792,
    description: 'Under en maskeradbal på Operan i Stockholm skjuts kungen av en sammansvuren grupp adelsmän som är missnöjda med hans styre. Han avlider efter en tid av svåra skador, och mordet väcker både bestörtning och osäkerhet i riket. Händelsen markerar slutet på hans reformperiod och bidrar till ett förändrat politiskt klimat med ökad försiktighet kring maktutövning och intriger vid hovet.',
    imageUrl: 'https://timedrop.se/TimeDrop/history/sverige/hist7-gustav-iii-mordas.png'
  },
  {
    id: 'hist8',
    title: 'Förlusten av Finland',
    category: 'Sverige',
    year: 1809,
    description: 'Efter ett hårt krig mot en mäktig granne tvingas Sverige avstå Finland, som länge varit en integrerad del av riket. Separationen blir ett djupt trauma och förändrar kartan i Norden. Förlusten leder också till en intern kris där kungamakten ifrågasätts, en ny grundlag införs och en ny dynasti så småningom tar plats på tronen.',
    imageUrl: 'https://timedrop.se/TimeDrop/history/sverige/hist8-forlusten-av-finland.jpg'
  },
  {
    id: 'hist9',
    title: 'Sverige får ny regeringsform',
    category: 'Sverige',
    year: 1809,
    description: 'Efter militärt nederlag och politisk kris beslutas om en ny grundlag som begränsar kungens makt och stärker riksdagens roll. Den nya ordningen skapar en bättre balans mellan de styrande makterna och lägger grunden för den moderna svenska konstitutionen. Dokumentet kommer att påverka hur landet styrs under lång tid framåt.',
    imageUrl: 'https://timedrop.se/TimeDrop/history/sverige/hist9-sverige-far-ny-regeringsform.png'
  },
  {
    id: 'hist10',
    title: 'Bernadotte blir svensk kronprins',
    category: 'Sverige',
    year: 1810,
    description: 'En fransk general väljs oväntat till svensk tronföljare efter att den tidigare kronprinsen avlidit. Valet speglar Sveriges behov av nya allianser och en stabil efterträdare. Den nye kronprinsen tar senare namnet Karl Johan och grundar den dynasti som fortfarande sitter på Sveriges tron.',
    imageUrl: 'https://timedrop.se/TimeDrop/history/sverige/hist10-bernadotte-blir-svensk-kronprins.png'
  },
  {
    id: 'hist11',
    title: 'Unionen med Norge bildas',
    category: 'Sverige',
    year: 1814,
    description: 'Efter krig och förhandlingar bildas en union där Sverige och Norge har gemensam kung men egna lagar och institutioner. Unionen blir en kompromisslösning i ett skede av stora politiska förändringar i Europa. Förhållandet mellan länderna blir tidvis spänt, men unionen präglar utvecklingen i båda rikena under många år.',
    imageUrl: 'https://timedrop.se/TimeDrop/history/sverige/hist11-unionen-med-norge-bildas.png'
  },
  {
    id: 'hist12',
    title: 'Unionen med Norge upplöses',
    category: 'Sverige',
    year: 1905,
    description: 'Genom förhandlingar, folkomröstning och diplomati beslutar Sverige och Norge att upplösa unionen fredligt. Trots att konflikten ett tag riskerar att bli militär lyckas parterna nå en lösning utan krig. Händelsen blir ett exempel på hur stora politiska förändringar kan genomföras genom fredliga medel.',
    imageUrl: 'https://timedrop.se/TimeDrop/history/sverige/hist12-unionen-med-norge-upploses.jpg'
  },
  {
    id: 'hist13',
    title: 'Allmän och lika rösträtt införs',
    category: 'Sverige',
    year: 1921,
    description: 'Efter lång kamp från folkrörelser, kvinnorättskämpar och demokratiaktivister införs allmän och lika rösträtt. Både män och kvinnor får nu samma formella möjlighet att påverka vilka som ska styra landet. Reformen markerar ett avgörande steg mot ett mer demokratiskt samhälle där fler röster blir hörda.',
    imageUrl: 'https://timedrop.se/TimeDrop/history/sverige/hist13-allman-och-lika-rostratt-infors.png'
  },
  {
    id: 'hist14',
    title: 'Sverige står utanför andra världskriget',
    category: 'Sverige',
    year: 1939,
    description: 'När ett stort krig bryter ut i Europa väljer Sverige en linje av neutralitet. Genom diplomati, eftergifter och hårda avvägningar försöker landet undvika att dras in i de direkta striderna. Perioden präglas av ransonering, beredskap och moraliska dilemman kring handel och relationer till krigförande länder.',
    imageUrl: 'https://timedrop.se/TimeDrop/history/sverige/hist14-sverige-star-utanfor-andra-varldskriget.png'
  },
  {
    id: 'hist15',
    title: 'Folkhemmet växer fram',
    category: 'Sverige',
    year: 1930,
    description: 'Idén om folkhemmet blir vägledande för den svenska politiken. Staten bygger ut socialförsäkringar, bostadsprogram, sjukvård och utbildning för att skapa ett mer jämlikt samhälle. Visionen är att alla medborgare ska känna trygghet och delaktighet, oavsett bakgrund och ekonomi.',
    imageUrl: 'https://timedrop.se/TimeDrop/history/sverige/hist15-folkhemmet-vaxer-fram.jpg'
  },
  {
    id: 'hist16',
    title: 'Miljonprogrammet',
    category: 'Sverige',
    year: 1965,
    description: 'För att lösa en akut bostadsbrist beslutar staten att på kort tid bygga uppemot en miljon nya lägenheter. Stora bostadsområden växer fram runt om i landet, ofta med moderna lägenheter, grönområden och ny infrastruktur. Programmet förändrar både stadsbild och livsvillkor för många människor, men kommer senare också att diskuteras kritiskt utifrån segregation och stadsplanering.',
    imageUrl: 'https://timedrop.se/TimeDrop/history/sverige/hist16-miljonprogrammet.jpg'
  },
  {
    id: 'hist17',
    title: 'Estoniakatastrofen',
    category: 'Sverige',
    year: 1994,
    description: 'Passagerarfartyget Estonia förliser under en nattlig resa över Östersjön. Olyckan sker snabbt och under dramatiska förhållanden, och en stor majoritet av de ombordvarande omkommer. Katastrofen blir en nationell tragedi och leder till omfattande utredningar, minnesceremonier och en långvarig diskussion om sjösäkerhet och ansvar.',
    imageUrl: 'https://timedrop.se/TimeDrop/history/sverige/hist17-estoniakatastrofen.jpg'
  },
  {
    id: 'hist18',
    title: 'Folkskolan blir obligatorisk',
    category: 'Sverige',
    year: 1842,
    description: 'Genom en ny skolordning beslutas att alla barn i landet ska få grundläggande undervisning. Varje socken får ansvar för att ordna skola, lokaler och lärare, vilket steg för steg bygger upp ett nationellt skolsystem. Reformen ökar läskunnigheten, ger fler möjlighet att ta del av samhällsinformation och minskar skillnaderna mellan olika delar av landet.',
    imageUrl: 'https://timedrop.se/TimeDrop/history/sverige/hist18-folkskolan-blir-obligatorisk.png'
  },
  {
    id: 'hist19',
    title: 'Öppnandet av Stockholms tunnelbana',
    category: 'Sverige',
    year: 1950,
    description: 'När huvudstaden växte i både befolkning och trafikbehov växte också drömmen om ett snabbt, pålitligt och modernt transportsystem som kunde knyta samman stadens olika delar. Den idé som tidigare bara funnits som skisser och visioner blev till slut verklighet när de första tågen började rulla under marken. För resenärerna innebar det ett helt nytt sätt att ta sig fram — oberoende av vädret, gatornas trängsel och avståndet mellan ytterområden och centrum. Tunnelbanans öppning markerade början på ett nytt kapitel i svensk stadsutveckling och blev snabbt en självklar del av både vardagslivet och stadens identitet.',
    imageUrl: 'https://timedrop.se/TimeDrop/history/sverige/hist19-oppnandet-av-stockholms-tunnelbana.jpg'
  },
  {
    id: 'hist20',
    title: 'Reformen då Sverige bytte från vänster- till högertrafik',
    category: 'Sverige',
    year: 1967,
    description: 'Under lång tid färdades svenskar på vägens vänstra sida, trots att nästan alla grannländer hade valt den motsatta ordningen. Detta skapade både praktiska problem och ökade risker när trafiken mellan länderna växte. Efter år av debatt, planering och noggrant förberedelsearbete fattades till slut beslutet att genomföra ett av de mest omfattande trafikskiftena i landets historia. När själva dagen kom stod poliser, militärer och frivilliga redo över hela landet för att lotsa trafiken rätt. Bilar, bussar och cyklar stannade upp, växlade sida och anpassade sig till de nya reglerna. Reformen blev ett tekniskt och logistiskt kraftprov som fortfarande betraktas som ett av de mest välkoordinerade samhällsprojekten i modern tid.',
    imageUrl: 'https://timedrop.se/TimeDrop/history/sverige/hist20-reformen-da-sverige-bytte-fran-vanster-till-hogertrafik.jpg'
  },

  
   // VÄRLDEN - Viktiga globala händelser
  {
    id: 'hist19',
    title: 'Kolumbus upptäcker Amerika',
    category: 'Världen',
    year: 1492,
    description: 'Genom att segla västerut från Europa når Christopher Kolumbus en övärld som då är okänd för honom och hans sponsorer. Denna resa öppnar upp en helt ny transatlantisk länk mellan kontinenter och utlöser omfattande handelsflöden, kulturmöten och koloniseringar som förändrar världsbilden för miljoner människor.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Christopher_Columbus3.jpg/300px-Christopher_Columbus3.jpg'
  },
  {
    id: 'hist20',
    title: 'Franska revolutionen',
    category: 'Världen',
    year: 1789,
    description: 'En folklig uppror mot envälde och privilegier i Frankrike växer till en omfattande samhällsomvandling. Revolutionen avskaffar den gamla orden, sprider ideal om frihet, jämlikhet och broderskap och inspirerar liknande rörelser i andra länder. Effekterna blir politiska, sociala och kulturmässiga och formar nya sätt att tänka på stat och medborgarskap.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Prise_de_la_Bastille.jpg/400px-Prise_de_la_Bastille.jpg'
  },
  {
    id: 'hist21',
    title: 'Napoleons kröning',
    category: 'Världen',
    year: 1804,
    description: 'Napoleon Bonaparte genomför ett dramatiskt markeringstillfälle där han tar emot kejsartiteln i Frankrike, vilket symboliserar en återgång till stark centralmakt under innovativa militära och administrativa former. Händelsen skapar ett nytt skede i europeisk maktbalans och visar på hur maktpersoner kan utnyttja revolutionära förhållanden för att konsolidera kontroll.',
  },
  {
    id: 'hist22',
    title: 'Slaget vid Waterloo',
    category: 'Världen',
    year: 1815,
    description: 'En stor koalition av europeiska stater lyckas besegra Napoleons armé i ett avgörande fältslag, vilket markerar slutet på hans ambitiösa försök att dominera kontinenten. Slaget blir symbol för att stormakters expansion kan slås tillbaka och banar väg för en ny ordning med mer förutsägbara väst­ europeiska relationer.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Battle_of_Waterloo_1815.PNG/400px-Battle_of_Waterloo_1815.PNG'
  },
  {
    id: 'hist23',
    title: 'Amerikanska inbördeskriget börjar',
    category: 'Världen',
    year: 1861,
    description: 'I USA bryter staten nord mot syd ur ett djupt splittrat samhälle där slaveri, nationalstatens roll och ekonomisk utveckling står på spel. Konflikten blir en blodig kamp om union eller separation och om vad en demokrati ska stå för, med konsekvenser som ifrågasätter människors värde och roll i samhället.',
  },
  {
    id: 'hist24',
    title: 'Abraham Lincoln mördas',
    category: 'Världen',
    year: 1865,
    description: 'USA:s president befinner sig på teater när en motståndare av de krafter som värnar om separation och slaveri skjuter honom. Mordet blir ett chock-ögonblick för nationen, en påminnelse om att politisk förändring kan vara farlig och att våldet kan slå tillbaka mot dem som står för reformer och nationell enhet.',
  },
  {
    id: 'hist25',
    title: 'Berlinmuren byggs',
    category: 'Världen',
    year: 1961,
    description: 'I staden Berlin reser sig en fysisk mur och gränser innan osynliga maktsfärer blir synliga – familjer skiljs åt, människor försöker fly och världen blir tydligt delad i två ideologiska läger. Muren blir symbol för kalla krigets maktkamp och hur ideologier kan byggas in i landskapet.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Berlinermauer.jpg/400px-Berlinermauer.jpg'
  },
  {
    id: 'hist26',
    title: 'Berlinmuren faller',
    category: 'Världen',
    year: 1989,
    description: 'Efter år av spänd väntan och förändringar öppnas muren mellan öst och väst i Berlin och människor möts igen. Händelsen blir en stark symbol för slutet på den ideologiska uppdelningen och visar hur förändring, folk­rörelser och diplomati kan riva barriärer – både konkreta och mentala.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Thefalloftheberlinwall1989.JPG/400px-Thefalloftheberlinwall1989.JPG'
  },
  {
    id: 'hist27',
    title: 'Sovjetunionen upplöses',
    category: 'Världen',
    year: 1991,
    description: 'En federation av republiker går i grunden igenom ett upplösningsskede efter interna politiska och ekonomiska spänningar, och de djupt ideologiska strukturer som byggts upp under generationer löses upp. Händelsen visar hur även supermakter kan förändras och hur gränser, identitet och makt kan omformas på relativt kort tid.',
  },
  {
    id: 'hist28',
    title: 'Nelson Mandela frisläpps',
    category: 'Världen',
    year: 1990,
    description: 'Efter lång fångenskap går Nelson Mandela fri och blir en symbol för kamp mot apartheid och för försoning. Hans frigivning signalerar en ny era för sitt land och inspirerar människor världen över att tro på förändring trots årtionden av förtryck.',
  },
  {
    id: 'hist29',
    title: 'Apartheid avskaffas i Sydafrika',
    category: 'Världen',
    year: 1994,
    description: 'En nation där rassegregation, diskriminering och begränsad rösträtt varit norm bryter med sin tidigare ordning när fria val hålls och en majoritetsbefolkning tar makten. Händelsen markerar ett historiskt brott med koloniala och rasbaserade strukturer och blir globalt erkänt som ett steg mot mänskliga rättigheter.',
  },
  {
    id: 'hist30',
    title: 'Kina blir republik',
    category: 'Världen',
    year: 1912,
    description: 'Kina övergår från dynastisk kejsarmakt till att bli en republikär stat – ett strukturellt skifte som speglar världens bredare modernisering. Övergången öppnar för nya politiska idéer, internationellt inflytande och en omvandling av det inhemska samhället när gamla maktordningar bryts ned.',
  },
  {
    id: 'hist31',
    title: 'Folkrepubliken Kina utropas',
    category: 'Världen',
    year: 1949,
    description: 'Efter inre konflikt och global omstrukturering samlas en kommunistisk ledning under Mao Zedong som utropar en ny statlig form – folkrepubliken. Händelsen blir en viktig del i kalla krigets kontext och påverkar både Asiens och världens politiska karta under lång tid.',
  },
  {
    id: 'hist32',
    title: 'Indiens självständighet',
    category: 'Världen',
    year: 1947,
    description: 'Efter århundraden av kolonialt styre från Storbritannien blir Indien självständigt och tar kontroll över sin framtid. Friheten möjliggör social och ekonomisk förändring och ger en stor befolkning möjlighet att delta i global politik på nya villkor.',
  },
  {
    id: 'hist33',
    title: 'Brexit-folkomröstningen',
    category: 'Världen',
    year: 2016,
    description: 'Invånarna i Storbritannien tar ställning i en omröstning om fortsatt medlemskap i Europeiska unionen. Resultatet skapar politiska kedje­reaktioner, frågor om suveränitet och ekonomiskt samarbete, och illustrerar hur folket – inte bara regeringar – kan ändra internationella relationer.',
  },
  {
    id: 'hist34',
    title: 'Storbritannien lämnar EU',
    category: 'Världen',
    year: 2020,
    description: 'Efter den politiska processen från folkomröstningen genomförs formellt utträdet ur Europeiska unionen. Händelsen påverkar både nationella lagar, handel, migration och EU:s framtid, och blir ett exempel på hur globala institutioner och medlemsländer påverkar varandra.',
  },

  // KRIG - Stora krig och konflikter
  {
    id: 'hist35',
    title: 'Första världskriget börjar',
    category: 'Krig',
    year: 1914,
    description: 'Ärkehertig Franz Ferdinand mördas - kriget bryter ut',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/British_Mark_I_male_tank_Somme_25_September_1916.jpg/400px-British_Mark_I_male_tank_Somme_25_September_1916.jpg'
  },
  {
    id: 'hist36',
    title: 'Första världskriget slutar',
    category: 'Krig',
    year: 1918,
    description: 'Vapenstillestånd undertecknas 11 november'
  },
  {
    id: 'hist37',
    title: 'Andra världskriget börjar',
    category: 'Krig',
    year: 1939,
    description: 'Tyskland invaderar Polen - kriget startar',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Bundesarchiv_Bild_183-08778-0001%2C_Dresden%2C_zerst%C3%B6rtes_Stadtzentrum.jpg/400px-Bundesarchiv_Bild_183-08778-0001%2C_Dresden%2C_zerst%C3%B6rtes_Stadtzentrum.jpg'
  },
  {
    id: 'hist38',
    title: 'Pearl Harbor anfallet',
    category: 'Krig',
    year: 1941,
    description: 'Japan angriper USA:s flotta - USA går in i kriget'
  },
  {
    id: 'hist39',
    title: 'D-dagen - Invasionen av Normandie',
    category: 'Krig',
    year: 1944,
    description: 'Allierade trupper landar i Frankrike',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Into_the_Jaws_of_Death_23-0455M_edit.jpg/400px-Into_the_Jaws_of_Death_23-0455M_edit.jpg'
  },
  {
    id: 'hist40',
    title: 'Andra världskriget slutar',
    category: 'Krig',
    year: 1945,
    description: 'Tyskland kapitulerar 8 maj, Japan i augusti'
  },
  {
    id: 'hist41',
    title: 'Vietnamkriget börjar',
    category: 'Krig',
    year: 1955,
    description: 'Konflikten mellan Nord- och Sydvietnam eskalerar'
  },
  {
    id: 'hist42',
    title: 'Vietnamkriget slutar',
    category: 'Krig',
    year: 1975,
    description: 'Saigon faller - Nordvietnam vinner'
  },
  {
    id: 'hist43',
    title: 'Koreakriget börjar',
    category: 'Krig',
    year: 1950,
    description: 'Nordkorea invaderar Sydkorea'
  },
  {
    id: 'hist44',
    title: 'Kubakrisen',
    category: 'Krig',
    year: 1962,
    description: 'Världen nära kärnvapenkrig mellan USA och Sovjet'
  },
  {
    id: 'hist45',
    title: 'Irakkriget börjar',
    category: 'Krig',
    year: 2003,
    description: 'USA och allierade invaderar Irak'
  },

  // SPORT - Viktiga idrottshändelser
  {
    id: 'hist46',
    title: 'Första moderna OS',
    category: 'Sport',
    year: 1896,
    description: 'Olympiska spelen återupplivade i Aten',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Panathinaiko_Stadium.jpg/400px-Panathinaiko_Stadium.jpg'
  },
  {
    id: 'hist47',
    title: 'Första fotbolls-VM',
    category: 'Sport',
    year: 1930,
    description: 'Uruguay arrangerar och vinner första VM'
  },
  {
    id: 'hist48',
    title: 'Roger Bannister springer under 4 minuter',
    category: 'Sport',
    year: 1954,
    description: 'Första människan att springa en mile under 4 minuter'
  },
  {
    id: 'hist49',
    title: 'Björn Borg vinner Wimbledon första gången',
    category: 'Sport',
    year: 1976,
    description: 'Svensk tennisstjärna vinner första av fem titlar'
  },
  {
    id: 'hist50',
    title: 'Sverige vinner fotbolls-VM',
    category: 'Sport',
    year: 1958,
    description: 'Sverige blir tvåa på hemmaplan'
  },
  {
    id: 'hist51',
    title: 'Ingemar Stenmark blir världsmästare',
    category: 'Sport',
    year: 1978,
    description: 'Svensk skidåkare dominerar slalom och storslalom'
  },
  {
    id: 'hist52',
    title: 'Sverige vinner OS-guld i ishockey',
    category: 'Sport',
    year: 1994,
    description: 'Tre Kronor vinner guld i Lillehammer'
  },
  {
    id: 'hist53',
    title: 'Sverige vinner VM i ishockey',
    category: 'Sport',
    year: 1998,
    description: 'Sverige besegrade Finland i finalen'
  },
  {
    id: 'hist54',
    title: 'Usain Bolt springer 100m på 9.58',
    category: 'Sport',
    year: 2009,
    description: 'Världsrekord som fortfarande står'
  },
  {
    id: 'hist55',
    title: 'Leicester vinner Premier League',
    category: 'Sport',
    year: 2016,
    description: 'Historisk underdog-vinst i fotboll'
  },

  // VETENSKAP - Vetenskapliga genombrott
  {
    id: 'hist56',
    title: 'Newtons Principia publiceras',
    category: 'Vetenskap',
    year: 1687,
    description: 'Isaac Newton publicerar sitt huvudverk om gravitation'
  },
  {
    id: 'hist57',
    title: 'Darwin publicerar Om arternas uppkomst',
    category: 'Vetenskap',
    year: 1859,
    description: 'Evolutionsteorin presenteras för världen'
  },
  {
    id: 'hist58',
    title: 'Einstein publicerar relativitetsteorin',
    category: 'Vetenskap',
    year: 1905,
    description: 'Speciella relativitetsteorin revolutionerar fysiken'
  },
  {
    id: 'hist59',
    title: 'DNA-strukturen upptäcks',
    category: 'Vetenskap',
    year: 1953,
    description: 'Watson och Crick identifierar dubbel-helix',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/DNA_Structure%2BKey%2BLabelled.pn_NoBB.png/300px-DNA_Structure%2BKey%2BLabelled.pn_NoBB.png'
  },
  {
    id: 'hist60',
    title: 'Första kloning av däggdjur (Dolly)',
    category: 'Vetenskap',
    year: 1996,
    description: 'Får klonas framgångsrikt i Skottland'
  },
  {
    id: 'hist61',
    title: 'Människans genom kartläggs',
    category: 'Vetenskap',
    year: 2003,
    description: 'Human Genome Project slutförs'
  },
  {
    id: 'hist62',
    title: 'Higgs-partikeln upptäcks',
    category: 'Vetenskap',
    year: 2012,
    description: 'CERN bekräftar existensen av Higgs-boson'
  },
  {
    id: 'hist63',
    title: 'Första fotot av svart hål',
    category: 'Vetenskap',
    year: 2019,
    description: 'Event Horizon Telescope tar första bilden',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Black_hole_-_Messier_87_crop_max_res.jpg/400px-Black_hole_-_Messier_87_crop_max_res.jpg'
  },

  // MEDICIN - Medicinska genombrott
  {
    id: 'hist64',
    title: 'Penicillin upptäcks',
    category: 'Medicin',
    year: 1928,
    description: 'Alexander Fleming upptäcker antibiotika'
  },
  {
    id: 'hist65',
    title: 'Första hjärttransplantation',
    category: 'Medicin',
    year: 1967,
    description: 'Christiaan Barnard utför första operationen'
  },
  {
    id: 'hist66',
    title: 'HIV-viruset identifieras',
    category: 'Medicin',
    year: 1983,
    description: 'Luc Montagnier och teamet isolerar viruset'
  },
  {
    id: 'hist67',
    title: 'Första IVF-bebis föds',
    category: 'Medicin',
    year: 1978,
    description: 'Louise Brown föds genom provrörsbefruktning'
  },
  {
    id: 'hist68',
    title: 'Röntgen upptäcks',
    category: 'Medicin',
    year: 1895,
    description: 'Wilhelm Röntgen upptäcker X-strålning'
  },
  {
    id: 'hist69',
    title: 'Insulin isoleras',
    category: 'Medicin',
    year: 1921,
    description: 'Banting och Best upptäcker insulin för diabetes'
  },
  {
    id: 'hist70',
    title: 'Polio-vaccin utvecklas',
    category: 'Medicin',
    year: 1955,
    description: 'Jonas Salk utvecklar framgångsrikt vaccin'
  },
  {
    id: 'hist71',
    title: 'COVID-19 pandemin börjar',
    category: 'Medicin',
    year: 2020,
    description: 'Coronavirus sprids globalt'
  },

  // TEKNIK - Tekniska genombrott
  {
    id: 'hist72',
    title: 'Gutenberg uppfinner boktryckarkonsten',
    category: 'Teknik',
    year: 1450,
    description: 'Johannes Gutenberg utvecklar tryckpressen'
  },
  {
    id: 'hist73',
    title: 'Ångmaskinen patenteras',
    category: 'Teknik',
    year: 1769,
    description: 'James Watt förbättrar ångmaskinen'
  },
  {
    id: 'hist74',
    title: 'Telefonen uppfinns',
    category: 'Teknik',
    year: 1876,
    description: 'Alexander Graham Bell patenterar telefonen'
  },
  {
    id: 'hist75',
    title: 'Första flygningen',
    category: 'Teknik',
    year: 1903,
    description: 'Bröderna Wright flyger vid Kitty Hawk',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Wrightflyer.jpg/400px-Wrightflyer.jpg'
  },
  {
    id: 'hist76',
    title: 'Television uppfinns',
    category: 'Teknik',
    year: 1926,
    description: 'John Logie Baird demonstrerar TV för första gången'
  },
  {
    id: 'hist77',
    title: 'Första datorn ENIAC',
    category: 'Teknik',
    year: 1946,
    description: 'Världens första elektroniska dator tas i bruk'
  },
  {
    id: 'hist78',
    title: 'Transistorn uppfinns',
    category: 'Teknik',
    year: 1947,
    description: 'Bell Labs uppfinner transistorn'
  },
  {
    id: 'hist79',
    title: 'Internet börjar användas',
    category: 'Teknik',
    year: 1969,
    description: 'ARPANET skickar första meddelandet'
  },
  {
    id: 'hist80',
    title: 'World Wide Web lanseras',
    category: 'Teknik',
    year: 1991,
    description: 'Tim Berners-Lee gör webben tillgänglig för allmänheten'
  },
  {
    id: 'hist81',
    title: 'iPhone lanseras',
    category: 'Teknik',
    year: 2007,
    description: 'Apple revolutionerar mobiltelefoner',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/IPhone_1st_Gen.svg/300px-IPhone_1st_Gen.svg.png'
  },
  {
    id: 'hist82',
    title: 'Första persondator IBM PC',
    category: 'Teknik',
    year: 1981,
    description: 'IBM lanserar sin första persondator'
  },
  {
    id: 'hist83',
    title: 'Google grundas',
    category: 'Teknik',
    year: 1998,
    description: 'Larry Page och Sergey Brin startar Google'
  },
  {
    id: 'hist84',
    title: 'Facebook lanseras',
    category: 'Teknik',
    year: 2004,
    description: 'Mark Zuckerberg startar sociala nätverket'
  },
  {
    id: 'hist85',
    title: 'Bitcoin skapas',
    category: 'Teknik',
    year: 2009,
    description: 'Första kryptovalutan lanseras'
  },

  // RYMDEN - Rymdkapplöpning och utforskning
  {
    id: 'hist86',
    title: 'Sputnik 1 skjuts upp',
    category: 'Rymden',
    year: 1957,
    description: 'Sovjetunionen skickar upp första satelliten',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Sputnik_asm.jpg/300px-Sputnik_asm.jpg'
  },
  {
    id: 'hist87',
    title: 'Jurij Gagarin i rymden',
    category: 'Rymden',
    year: 1961,
    description: 'Första människan i rymden'
  },
  {
    id: 'hist88',
    title: 'Månlandningen',
    category: 'Rymden',
    year: 1969,
    description: 'Neil Armstrong och Buzz Aldrin landar på månen',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Aldrin_Apollo_11_original.jpg/300px-Aldrin_Apollo_11_original.jpg'
  },
  {
    id: 'hist89',
    title: 'Rymdstationen ISS byggs',
    category: 'Rymden',
    year: 1998,
    description: 'Första modulen av ISS skjuts upp'
  },
  {
    id: 'hist90',
    title: 'SpaceX första privata rymdfärja',
    category: 'Rymden',
    year: 2012,
    description: 'Dragon når rymdstationen ISS'
  },
  {
    id: 'hist91',
    title: 'Mars Rover landar',
    category: 'Rymden',
    year: 2012,
    description: 'Curiosity landar på Mars'
  },
  {
    id: 'hist92',
    title: 'James Webb-teleskopet lanseras',
    category: 'Rymden',
    year: 2021,
    description: 'Nästa generations rymdteleskop skjuts upp'
  },

  // KULTUR - Viktiga kulturella händelser
  {
    id: 'hist93',
    title: 'Eiffeltornet invigs',
    category: 'Kultur',
    year: 1889,
    description: 'Ikoniskt torn i Paris färdigställs',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg/300px-Tour_Eiffel_Wikimedia_Commons.jpg'
  },
  {
    id: 'hist94',
    title: 'Titanic sjunker',
    category: 'Kultur',
    year: 1912,
    description: 'Lyxfartyget kolliderar med isberg'
  },
  {
    id: 'hist95',
    title: 'Nobelpriset instiftas',
    category: 'Kultur',
    year: 1901,
    description: 'Första Nobelpriset delas ut'
  },
  {
    id: 'hist96',
    title: 'FN grundas',
    category: 'Kultur',
    year: 1945,
    description: 'Förenta Nationerna bildas efter andra världskriget'
  },
  {
    id: 'hist97',
    title: 'EU grundas',
    category: 'Kultur',
    year: 1993,
    description: 'Europeiska unionen bildas genom Maastrichtfördraget'
  },
  {
    id: 'hist98',
    title: 'Disney World öppnar',
    category: 'Kultur',
    year: 1971,
    description: 'Världens största nöjespark invigs i Florida'
  },
  {
    id: 'hist99',
    title: 'MTV lanseras',
    category: 'Kultur',
    year: 1981,
    description: 'Musikkanalen startar sändningar'
  },
  {
    id: 'hist100',
    title: 'Woodstock-festivalen',
    category: 'Kultur',
    year: 1969,
    description: 'Legendarisk musikfestival i USA'
  },

  // KONST - Konsthistoriska händelser
  {
    id: 'hist101',
    title: 'Mona Lisa målad',
    category: 'Konst',
    year: 1503,
    description: 'Leonardo da Vinci målar sitt mästerverk'
  },
  {
    id: 'hist102',
    title: 'Impressionisternas första utställning',
    category: 'Konst',
    year: 1874,
    description: 'Monet, Renoir och andra visar sina verk'
  },
  {
    id: 'hist103',
    title: 'Picasso målar Guernica',
    category: 'Konst',
    year: 1937,
    description: 'Ikonisk anti-krigsmålning skapas'
  },
  {
    id: 'hist104',
    title: 'Andy Warhol och popkonsten',
    category: 'Konst',
    year: 1962,
    description: 'Campbell\'s Soup Cans utställs'
  },
  {
    id: 'hist105',
    title: 'Munchs "Skriet" stjäls',
    category: 'Konst',
    year: 1994,
    description: 'Berömd tavla stulen från Nasjonalgalleriet'
  },

  // LITTERATUR - Viktiga böcker och författare
  {
    id: 'hist106',
    title: 'Första tryckta bibel',
    category: 'Litteratur',
    year: 1455,
    description: 'Gutenbergbibeln trycks'
  },
  {
    id: 'hist107',
    title: 'Shakespeare skriver Hamlet',
    category: 'Litteratur',
    year: 1600,
    description: 'Ett av världslitteraturens mästerverk'
  },
  {
    id: 'hist108',
    title: 'Alice i Underlandet publiceras',
    category: 'Litteratur',
    year: 1865,
    description: 'Lewis Carroll\'s klassiker ges ut'
  },
  {
    id: 'hist109',
    title: 'Harry Potter första bok',
    category: 'Litteratur',
    year: 1997,
    description: 'J.K. Rowling lanserar fenomenet'
  },
  {
    id: 'hist110',
    title: 'Lord of the Rings publiceras',
    category: 'Litteratur',
    year: 1954,
    description: 'Tolkiens episka fantasy-trilogi'
  },

  // KATASTROFER - Naturkatastrofer och olyckor
  {
    id: 'hist111',
    title: 'San Francisco jordbävning',
    category: 'Katastrofer',
    year: 1906,
    description: 'Förödande jordbävning och brand'
  },
  {
    id: 'hist112',
    title: 'Hindenburg exploderar',
    category: 'Katastrofer',
    year: 1937,
    description: 'Luftskepp fattar eld vid landning',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Hindenburg_burning.jpg/400px-Hindenburg_burning.jpg'
  },
  {
    id: 'hist113',
    title: 'Tjernobyl-olyckan',
    category: 'Katastrofer',
    year: 1986,
    description: 'Kärnkraftsolycka i Ukraina'
  },
  {
    id: 'hist114',
    title: 'Tsunamin i Indiska oceanen',
    category: 'Katastrofer',
    year: 2004,
    description: 'Enorm tsunami dödar hundratusentals'
  },
  {
    id: 'hist115',
    title: 'Fukushima kärnkraftsolycka',
    category: 'Katastrofer',
    year: 2011,
    description: 'Jordbävning och tsunami orsaker härdsmälta'
  },
  {
    id: 'hist116',
    title: '11 september-attackerna',
    category: 'Katastrofer',
    year: 2001,
    description: 'Terrorattacker mot World Trade Center och Pentagon'
  },
  {
    id: 'hist117',
    title: 'Spanska sjukan',
    category: 'Katastrofer',
    year: 1918,
    description: 'Dödlig influensapandemi efter första världskriget'
  },
];

// Export som ES6 modules för att matcha index.js
export { historyLibrary };
export function getHistoryCategories() {
  const categories = [...new Set(historyLibrary.map(event => event.category))];
  return categories.sort();
}
export function getHistoryByCategories(categories) {
  if (!categories || categories.length === 0) {
    return historyLibrary;
  }
  return historyLibrary.filter(event => categories.includes(event.category));
}
export function getRandomHistory(categories, count) {
  let pool = getHistoryByCategories(categories);
  
  // Blanda arrayen
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  
  // Ta ut rätt antal
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
