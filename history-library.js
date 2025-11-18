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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Gustav_Vasa_by_Jakob_Bin%C3%A4ck_-_Nationalmuseum_-_16210.jpg/300px-Gustav_Vasa_by_Jakob_Bin%C3%A4ck_-_Nationalmuseum_-_16210.jpg'
  },
  {
    id: 'hist2',
    title: 'Stockholms blodbad',
    category: 'Sverige',
    year: 1520,
    description: 'Under en kunglig kröningsfest i Stockholm grips en stor grupp svenska adelsmän, präster och borgare anklagade för förräderi. På Stortorget i Gamla stan avrättas ett stort antal personer offentligt, vilket skapar skräck i riket men också väcker starkt motstånd. Händelsen blir en vändpunkt som eldar på upproren mot den danska kungen och banar väg för Gustav Vasas maktövertagande.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Stockholm_Bloodbath.jpg/400px-Stockholm_Bloodbath.jpg'
  },
  {
    id: 'hist3',
    title: 'Reformationen i Sverige',
    category: 'Sverige',
    year: 1527,
    description: 'Vid en stor rikssamling i Västerås bryter Sverige med den katolska kyrkan och ansluter sig till den lutherska läran. Kungamakten tar över mycket av kyrkans rikedomar och inflytande, vilket ger staten större kontroll över både ekonomi och religion. Beslutet förändrar det religiösa livet, gudstjänstspråket och människors relation till kyrkan under lång tid framåt.'
  },
  {
    id: 'hist4',
    title: 'Slaget vid Poltava',
    category: 'Sverige',
    year: 1709,
    description: 'Den svenska armén under Karl XII möter en avgörande motgång när den besegras av den ryska hären vid Poltava. Efter en lång marsch, hårda fälttåg och svåra försörjningsproblem bryts den svenska offensiven. Förlusten markerar slutet på Sveriges ställning som stormakt och inleder en period där andra europeiska makter tar över ledartröjan i regionen.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Battle_of_Poltava_1709.jpg/400px-Battle_of_Poltava_1709.jpg'
  },
  {
    id: 'hist5',
    title: 'Frihetstidens början',
    category: 'Sverige',
    year: 1719,
    description: 'Efter Karl XII:s död avskaffas den starka kungamakten och en ny författning ger riksdagen ett betydligt större inflytande. Denna period kallas frihetstiden och kännetecknas av livlig politisk debatt, framväxten av partierna hattar och mössor samt en mer parlamentarisk styrning. Samtidigt utvecklas kultur, vetenskap och handel när landet försöker återhämta sig efter långa krig.'
  },
  {
    id: 'hist6',
    title: 'Gustav III:s statsvälvning',
    category: 'Sverige',
    year: 1772,
    description: 'Gustav III genomför en oblodig kupp där han återtar stor del av den makt som tidigare flyttats till riksdagen. Genom ett nytt statsskick stärks kungens ställning och beslutsvägarna kortas. Hans regeringstid präglas av kulturell blomstring med teater, opera och konst, men också av ökade motsättningar med delar av adeln som ogillar hans maktpolitik.'
  },
  {
    id: 'hist7',
    title: 'Gustav III mördas',
    category: 'Sverige',
    year: 1792,
    description: 'Under en maskeradbal på Operan i Stockholm skjuts Gustav III av en sammansvärjning av missnöjda adelsmän. Kungen skadas svårt och avlider senare av sina skador, vilket skakar om både hovet och rikspolitiken. Mordet blir en symbol för de starka konflikter som fanns kring kungens maktutövning och de samhällsförändringar som pågick i Europa vid samma tid.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Gustav_III_of_Sweden_assassination.jpg/400px-Gustav_III_of_Sweden_assassination.jpg'
  },
  {
    id: 'hist8',
    title: 'Unionen med Norge upplöses',
    category: 'Sverige',
    year: 1905,
    description: 'Efter en längre period av politiska konflikter mellan Sverige och Norge beslutar norrmännen att gå sin egen väg. Förhandlingar, mobilisering och starka känslor präglar tiden, men slutet blir fredligt. Unionen upplöses utan krig och Norge blir en självständig stat, samtidigt som relationerna mellan länderna så småningom utvecklas till ett nära samarbete.'
  },
  {
    id: 'hist9',
    title: 'Allmän rösträtt för män',
    category: 'Sverige',
    year: 1909,
    description: 'Efter lång politisk kamp och påtryckningar från folkrörelser och partier införs allmän och lika rösträtt för män i riksdagsval. Tidigare hade inkomst, förmögenhet och samhällsställning avgjort vem som fick rösta. Reformen ses som ett stort steg mot en mer demokratisk representation, även om kvinnor fortfarande står utanför de nationella valen.'
  },
  {
    id: 'hist10',
    title: 'Allmän rösträtt för kvinnor',
    category: 'Sverige',
    year: 1921,
    description: 'Kvinnor får för första gången delta i val till riksdagen på samma villkor som män. Beslutet föregås av många års arbete från kvinnorörelsen, fackföreningar och politiska partier. Därmed blir Sverige en fullt ut parlamentarisk demokrati där både mäns och kvinnors röster räknas lika i de nationella valen.'
  },
  {
    id: 'hist11',
    title: 'Saltsjöbadsavtalet',
    category: 'Sverige',
    year: 1938,
    description: 'Arbetsgivarorganisationen och fackföreningsrörelsen sluter ett omfattande avtal i Saltsjöbaden som reglerar hur konflikter på arbetsmarknaden ska hanteras. Avtalet lägger grunden för den svenska modellen, där parterna själva tar stort ansvar för löner, villkor och konflikthantering. Resultatet blir färre strejker och lockouter och en mer förutsägbar arbetsmarknad.'
  },
  {
    id: 'hist12',
    title: 'Högertrafikomläggningen',
    category: 'Sverige',
    year: 1967,
    description: 'Under en noggrant planerad natt byter Sverige från vänster- till högertrafik på vägarna. Vägmärken, bussar, korsningar och körfält anpassas i ett enormt logistiskt projekt där myndigheter, frivilliga och media samverkar. Trots oro för kaos går omläggningen förhållandevis lugnt till och blir ett historiskt exempel på ett välorganiserat nationellt ingrepp i vardagen.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Kungsgatan_1967.jpg/400px-Kungsgatan_1967.jpg'
  },
  {
    id: 'hist13',
    title: 'Oscarsteatern invigs',
    category: 'Sverige',
    year: 1906,
    description: 'I centrala Stockholm öppnar en ny praktfull teater med inriktning på operett, musikal och annan scenkonst. Oscarsteatern blir snabbt en betydelsefull kulturarena där både svenska och internationella verk spelas. Byggnaden, inredningen och repertoaren bidrar till att göra den till en av huvudstadens mest välkända scener.'
  },
  {
    id: 'hist14',
    title: 'Sveriges Television startar',
    category: 'Sverige',
    year: 1956,
    description: 'De första reguljära tv-sändningarna inleds i Sverige och tv-apparater börjar spridas i hemmen. Nyheter, underhållning, sport och barnprogram når nu människor direkt i vardagsrummet. Med tiden blir tv ett av de viktigaste medierna för att forma samhällsdebatt, kultur och gemensamma upplevelser i landet.'
  },
  {
    id: 'hist15',
    title: 'Olof Palme mördas',
    category: 'Sverige',
    year: 1986,
    description: 'Statsminister Olof Palme skjuts till döds på öppen gata i centrala Stockholm efter ett biobesök med sin hustru. Händelsen chockar landet och leder till en omfattande polis- och utredningsinsats som pågår under mycket lång tid. Mordet blir en mörk vändpunkt i svensk samtidshistoria och väcker frågor om säkerhet, politik och samhällsklimat.'
  },
  {
    id: 'hist16',
    title: 'Sverige blir medlem i EU',
    category: 'Sverige',
    year: 1995,
    description: 'Efter en folkomröstning ansluter sig Sverige till Europeiska unionen och blir del av ett fördjupat europeiskt samarbete. Medlemskapet påverkar lagstiftning, handel, jordbruk, miljöpolitik och människors möjligheter att studera och arbeta i andra medlemsländer. Debatten om för- och nackdelar med integrationen fortsätter långt efter inträdet.'
  },
  {
    id: 'hist17',
    title: 'Estoniakatastrofen',
    category: 'Sverige',
    year: 1994,
    description: 'Passagerarfartyget Estonia förliser under en nattlig resa över Östersjön mellan Estland och Sverige. Fartyget tar snabbt in vatten och sjunker, och endast en mindre del av de ombordvarande överlever. Katastrofen blir en nationell tragedi och leder till omfattande utredningar, minnesceremonier och en långvarig diskussion om sjösäkerhet och ansvar.'
  },
  {
    id: 'hist18',
    title: 'Folkskolan blir obligatorisk',
    category: 'Sverige',
    year: 1842,
    description: 'Genom en ny skolordning beslutas att alla barn i landet ska få grundläggande undervisning. Varje socken får ansvar för att ordna skola, lokaler och lärare, vilket steg för steg bygger upp ett nationellt skolsystem. Reformen ökar läskunnigheten, ger fler möjlighet att ta del av samhällsinformation och minskar skillnaderna mellan olika delar av landet.'
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
