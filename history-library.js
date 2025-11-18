// history-library.js
// Historiska händelser för TimeDrop historia-quiz

const historyLibrary = [
  // SVERIGE - Viktiga händelser i svensk historia
  {
    id: 'hist1',
    title: 'Gustav Vasa blir kung',
    category: 'Sverige',
    year: 1523,
    description: 'Gustav Vasa kröns till kung och grundar den svenska nationalstaten',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Gustav_Vasa_by_Jakob_Bin%C3%A4ck_-_Nationalmuseum_-_16210.jpg/300px-Gustav_Vasa_by_Jakob_Bin%C3%A4ck_-_Nationalmuseum_-_16210.jpg'
  },
  {
    id: 'hist2',
    title: 'Stockholms blodbad',
    category: 'Sverige',
    year: 1520,
    description: 'Christian II avrättar svensk adel på Stortorget i Stockholm',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Stockholm_Bloodbath.jpg/400px-Stockholm_Bloodbath.jpg'
  },
  {
    id: 'hist3',
    title: 'Reformationen i Sverige',
    category: 'Sverige',
    year: 1527,
    description: 'Västerås riksdag - Sverige blir lutherskt'
  },
  {
    id: 'hist4',
    title: 'Slaget vid Poltava',
    category: 'Sverige',
    year: 1709,
    description: 'Karl XII:s förlust mot Ryssland - slutet på stormaktstiden',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Battle_of_Poltava_1709.jpg/400px-Battle_of_Poltava_1709.jpg'
  },
  {
    id: 'hist5',
    title: 'Frihetstidens början',
    category: 'Sverige',
    year: 1719,
    description: 'Efter Karl XII:s död börjar en ny statsskick med mer makt åt riksdagen'
  },
  {
    id: 'hist6',
    title: 'Gustav III:s statsvälvning',
    category: 'Sverige',
    year: 1772,
    description: 'Gustav III tar makten genom en kupp och återställer kungamakten'
  },
  {
    id: 'hist7',
    title: 'Gustav III mördas',
    category: 'Sverige',
    year: 1792,
    description: 'Kungen skjuts på maskeradbal på Operan i Stockholm',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Gustav_III_of_Sweden_assassination.jpg/400px-Gustav_III_of_Sweden_assassination.jpg'
  },
  {
    id: 'hist8',
    title: 'Unionen med Norge upplöses',
    category: 'Sverige',
    year: 1905,
    description: 'Norge blir självständigt efter union med Sverige'
  },
  {
    id: 'hist9',
    title: 'Allmän rösträtt för män',
    category: 'Sverige',
    year: 1909,
    description: 'Alla män över 24 år får rösta i Sverige'
  },
  {
    id: 'hist10',
    title: 'Allmän rösträtt för kvinnor',
    category: 'Sverige',
    year: 1921,
    description: 'Kvinnor får rösträtt i Sverige'
  },
  {
    id: 'hist11',
    title: 'Saltsjöbadsavtalet',
    category: 'Sverige',
    year: 1938,
    description: 'LO och SAF enas om fred på arbetsmarknaden'
  },
  {
    id: 'hist12',
    title: 'Högertrafikomläggningen',
    category: 'Sverige',
    year: 1967,
    description: 'Sverige byter från vänster- till högertrafik - Dagen H',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Kungsgatan_1967.jpg/400px-Kungsgatan_1967.jpg'
  },
  {
    id: 'hist13',
    title: 'Oscarsteatern invigs',
    category: 'Sverige',
    year: 1906,
    description: 'Stockholms stora teater och biograf öppnar'
  },
  {
    id: 'hist14',
    title: 'Sveriges Television startar',
    category: 'Sverige',
    year: 1956,
    description: 'SVT börjar sända reguljära TV-program'
  },
  {
    id: 'hist15',
    title: 'Olof Palme mördas',
    category: 'Sverige',
    year: 1986,
    description: 'Sveriges statsminister skjuts på Sveavägen i Stockholm'
  },
  {
    id: 'hist16',
    title: 'Sverige blir medlem i EU',
    category: 'Sverige',
    year: 1995,
    description: 'Sverige går med i Europeiska unionen'
  },
  {
    id: 'hist17',
    title: 'Estoniakatastrofen',
    category: 'Sverige',
    year: 1994,
    description: 'Färjan Estonia sjunker i Östersjön - 852 dör'
  },
  {
    id: 'hist18',
    title: 'Folkskolan blir obligatorisk',
    category: 'Sverige',
    year: 1842,
    description: 'Alla barn i Sverige måste gå i skolan'
  },

  // VÄRLDEN - Viktiga globala händelser
  {
    id: 'hist19',
    title: 'Kolumbus upptäcker Amerika',
    category: 'Världen',
    year: 1492,
    description: 'Christoffer Kolumbus når Västindien',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Christopher_Columbus3.jpg/300px-Christopher_Columbus3.jpg'
  },
  {
    id: 'hist20',
    title: 'Franska revolutionen',
    category: 'Världen',
    year: 1789,
    description: 'Revolutionen bryter ut i Frankrike - monarkin störtas',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Prise_de_la_Bastille.jpg/400px-Prise_de_la_Bastille.jpg'
  },
  {
    id: 'hist21',
    title: 'Napoleons kröning',
    category: 'Världen',
    year: 1804,
    description: 'Napoleon Bonaparte kröns till kejsare av Frankrike'
  },
  {
    id: 'hist22',
    title: 'Slaget vid Waterloo',
    category: 'Världen',
    year: 1815,
    description: 'Napoleon besegras slutgiltigt',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Battle_of_Waterloo_1815.PNG/400px-Battle_of_Waterloo_1815.PNG'
  },
  {
    id: 'hist23',
    title: 'Amerikanska inbördeskriget börjar',
    category: 'Världen',
    year: 1861,
    description: 'Sydstaterna bryter sig ur unionen'
  },
  {
    id: 'hist24',
    title: 'Abraham Lincoln mördas',
    category: 'Världen',
    year: 1865,
    description: 'USA:s president skjuts på teater i Washington'
  },
  {
    id: 'hist25',
    title: 'Berlinmuren byggs',
    category: 'Världen',
    year: 1961,
    description: 'Östtyskland bygger mur genom Berlin',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Berlinermauer.jpg/400px-Berlinermauer.jpg'
  },
  {
    id: 'hist26',
    title: 'Berlinmuren faller',
    category: 'Världen',
    year: 1989,
    description: 'Murens fall symboliserar slutet på kalla kriget',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Thefalloftheberlinwall1989.JPG/400px-Thefalloftheberlinwall1989.JPG'
  },
  {
    id: 'hist27',
    title: 'Sovjetunionen upplöses',
    category: 'Världen',
    year: 1991,
    description: 'USSR upphör att existera'
  },
  {
    id: 'hist28',
    title: 'Nelson Mandela frisläpps',
    category: 'Världen',
    year: 1990,
    description: 'Efter 27 år i fängelse frisläpps Mandela'
  },
  {
    id: 'hist29',
    title: 'Apartheid avskaffas i Sydafrika',
    category: 'Världen',
    year: 1994,
    description: 'Första demokratiska val - Mandela blir president'
  },
  {
    id: 'hist30',
    title: 'Kina blir republik',
    category: 'Världen',
    year: 1912,
    description: 'Qing-dynastin störtas - Republiken Kina bildas'
  },
  {
    id: 'hist31',
    title: 'Folkrepubliken Kina utropas',
    category: 'Världen',
    year: 1949,
    description: 'Mao Zedong proklamerar Folkrepubliken Kina'
  },
  {
    id: 'hist32',
    title: 'Indiens självständighet',
    category: 'Världen',
    year: 1947,
    description: 'Indien blir oberoende från Storbritannien'
  },
  {
    id: 'hist33',
    title: 'Brexit-folkomröstningen',
    category: 'Världen',
    year: 2016,
    description: 'Storbritannien röstar för att lämna EU'
  },
  {
    id: 'hist34',
    title: 'Storbritannien lämnar EU',
    category: 'Världen',
    year: 2020,
    description: 'Brexit genomförs officiellt'
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

// Funktion för att hämta alla tillgängliga kategorier
function getHistoryCategories() {
  const categories = [...new Set(historyLibrary.map(event => event.category))];
  return categories.sort();
}

// Funktion för att hämta händelser baserat på kategorier
function getHistoryByCategories(categories) {
  if (!categories || categories.length === 0) {
    return historyLibrary;
  }
  return historyLibrary.filter(event => categories.includes(event.category));
}

// Funktion för att få slumpmässiga händelser
function getRandomHistory(categories, count) {
  let pool = getHistoryByCategories(categories);
  
  // Blanda arrayen
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  
  // Ta ut rätt antal
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

module.exports = {
  historyLibrary,
  getHistoryCategories,
  getHistoryByCategories,
  getRandomHistory
};
