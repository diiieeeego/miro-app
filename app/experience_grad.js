import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import HamburgerMenu from "../components/HamburgerMenu";
import BottomTabBar from "../components/BottomTabBar";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const GALLERY_W = SCREEN_WIDTH * 0.9 - 40;

const KATEGORIJE = [
  {
    id: "plaze",
    naziv: "Skrivene plaže",
    ikona: "water-outline",
    boja: "#1a6b8c",
    mjesta: [
      {
        id: "p1",
        naziv: "Plaža ispod Fortice",
        kratki_opis: "Stjenovita uvala skrivena ispod bastiona, do koje znaju samo lokalni.",
        slike: [
          { uri: "https://picsum.photos/seed/fortice1/700/450" },
          { uri: "https://picsum.photos/seed/fortice2/700/450" },
          { uri: "https://picsum.photos/seed/fortice3/700/450" },
        ],
        opis:
          "Skrivena ispod zidina Fortice, ova stjenovita uvala jedna je od omiljenih lokalnih tajni. Pristupa se uskom stazom uz samu tvrđavu, a nagrada je kristalno čisto more i gotovo potpuna privatnost čak i u srcu sezone.",
        kako_doci:
          "Pješice iz Starog града — prati zidine prema sjeveroistoku do Fortice, pa stazom dolje prema moru. Oko 10 minuta hoda od Kalelarge.",
        radno_vrijeme: "Dostupno cijele godine | Najbolje: jutro (7–10h) ili kasno popodne",
        savjet:
          "Ponesi vlastiti ručnik i grickalice — nema barova ni kafića u blizini. Sunce je najjače od 11 do 16h, pa planiraj posjet ujutro ili navečer za miran kupač.",
      },
      {
        id: "p2",
        naziv: "Plaža Puntamika",
        kratki_opis: "Dugi šljunčani sprud na rubu grada, popularan samo među lokalnim obiteljima.",
        slike: [
          { uri: "https://picsum.photos/seed/puntamika1/700/450" },
          { uri: "https://picsum.photos/seed/puntamika2/700/450" },
          { uri: "https://picsum.photos/seed/puntamika3/700/450" },
        ],
        opis:
          "Puntamika je dugačka šljunčano-stjenovita plaža na sjevernom dijelu zadarske rivijere, daleko od turističkih gužvi. Okružena je borovom šumom koja pruža prirodnu hladovinu, a more je plitko i idealno za djecu.",
        kako_doci:
          "Autobus linija 5 (Zadar centar → Diklo) — izlaz Puntamika. Vožnja ~12 min. Alternativno, biciklom uz Obalu kneza Branimira oko 20 minuta.",
        radno_vrijeme: "Otvoreno cijele godine | Kupanje: travanj – listopad",
        savjet:
          "Dolazi u utorak ili četvrtak ujutro za minimalnu gužvu. U blizini je ribički klub — lokalni ribari često tu sortiraju ulove i rado podijele priče uz kavu.",
      },
      {
        id: "p3",
        naziv: "Uvala Jadra",
        kratki_opis: "Mala zatvorena uvala iza aerodroma, gotovo nepoznata turistima.",
        slike: [
          { uri: "https://picsum.photos/seed/jadra1/700/450" },
          { uri: "https://picsum.photos/seed/jadra2/700/450" },
          { uri: "https://picsum.photos/seed/jadra3/700/450" },
        ],
        opis:
          "Uvala Jadra smještena je na poluotoku zapadno od grada, zaštićena borikovom šumom s jedne strane i otvorenim morem s druge. Idealna za snorkeling zbog bistre vode i bogatog podmorja. Na plažu ne dolaze turistički autobusi — samo oni koji znaju.",
        kako_doci:
          "Automobilom prema Diklu, pa skretanje prema moru kod odmarališta. Pješice iz centra ~40 minuta uz obalu. Moguće i brodicom-taxi iz gradske rive.",
        radno_vrijeme: "Dostupno cijele godine | Preporuča se: svibanj – rujan",
        savjet:
          "Ponesi opremu za ronjenje — uvala je bogata ribom, hobotnicama i morskim ježincima. Voda je bistrija u jutarnjim satima.",
      },
      {
        id: "p4",
        naziv: "Plaža Borik – sjeverni kraj",
        kratki_opis: "Lokalni favorit na kraju Borika, dalje od hotelskog dijela.",
        slike: [
          { uri: "https://picsum.photos/seed/borik1/700/450" },
          { uri: "https://picsum.photos/seed/borik2/700/450" },
          { uri: "https://picsum.photos/seed/borik3/700/450" },
        ],
        opis:
          "Dok turistički dio Borika vrvi gostima hotela, sjeverni kraj plaže ostaje mirna zona koju koriste lokalni stanovnici četvrti. Šljunčana podloga, dublje more i borova šuma direktno uz plažu čine ga savršenim za opušten dan.",
        kako_doci:
          "Autobus linija 5 → stanica Borik. Hodaj prema sjeveru duž obale ~10 minuta dalje od hotelskog kompleksa.",
        radno_vrijeme: "Otvoreno cijele godine | Tuševi i kabine: lipanj – rujan",
        savjet:
          "Lokalni kafić 'Borak' na rubu šume radi od 7h i poslužuje domaće fritule i kavu — idealno jutarnje odredište prije kupanja.",
      },
    ],
  },
  {
    id: "sunset",
    naziv: "Sunset spotovi",
    ikona: "partly-sunny-outline",
    boja: "#c97020",
    mjesta: [
      {
        id: "s1",
        naziv: "Morske orgulje",
        kratki_opis: "Alfred Hitchcock rekao je da je zadar ima najljepši zalaz sunca na svijetu.",
        slike: [
          { uri: "https://picsum.photos/seed/orgulje1/700/450" },
          { uri: "https://picsum.photos/seed/orgulje2/700/450" },
          { uri: "https://picsum.photos/seed/orgulje3/700/450" },
        ],
        opis:
          "Morske orgulje arhitekta Nikole Bašića instalacija su duž Rive u Starom gradu koja pretvara energiju valova u glazbu. Večer uz zalazak sunca popraćen prirodnom glazbom mora jedno je od najemotivnijih iskustava u gradu. Alfred Hitchcock 1964. proglasio je zadar najboljim zalaznim suncem na svijetu — i dan danas, Riva je prepuna posjetitelja koji to potvrđuju.",
        kako_doci:
          "Pješice — Morske orgulje su na sjeverozapadnom rubu Stare gradske jezgre, uz Rivu. Od Narodnog trga ~5 minuta hoda.",
        radno_vrijeme: "Pristupačno 24h | Zalazak sunca: lipanj ~20:45h, kolovoz ~20:00h, rujan ~19:15h",
        savjet:
          "Dođi 30 minuta prije zalaska i zauzmi mjesto na kamenim stepenicama direktno uz more. Za najtišu atmosferu izbjegavaj vikende u srpnju i kolovozu — u tjedne dane ima puno manje gužve.",
      },
      {
        id: "s2",
        naziv: "Pozdrav suncu",
        kratki_opis: "Solarni instalacijski spektakl koji se pali u boji zalaska.",
        slike: [
          { uri: "https://picsum.photos/seed/pozdrav1/700/450" },
          { uri: "https://picsum.photos/seed/pozdrav2/700/450" },
          { uri: "https://picsum.photos/seed/pozdrav3/700/450" },
        ],
        opis:
          "Tik uz Morske orgulje nalazi se 'Pozdrav Suncu' — kružna instalacija od 300 solarnih panela koja danju prikuplja energiju, a noću stvara dinamičnu svjetlosnu predstavu u bojama spektra. Kombinacija s glazbom orgulja i bojama neba za zalaska čini ovo jednim od najfotogeničnijih trenutaka u gradu.",
        kako_doci:
          "Ista lokacija kao Morske orgulje — Riva, Stari grad. Od autobusnog kolodvora ~15 minuta pješice.",
        radno_vrijeme: "Svetlosna instalacija: od sumraka do ponoći | Najjači efekt: sat vremena nakon zalaska",
        savjet:
          "Fotografiraj s razine tla u trenutku kad instalacija odgovara bojama neba — dobiva se efekt ogledala između neba i panela. Ponesite lagani šal — s mora uvečer puše maestral.",
      },
      {
        id: "s3",
        naziv: "Tvrđava sv. Mihovila",
        kratki_opis: "Panoramski pogled s tvrđave na cijeli zadarski kanal i otoke.",
        slike: [
          { uri: "https://picsum.photos/seed/mihovil1/700/450" },
          { uri: "https://picsum.photos/seed/mihovil2/700/450" },
          { uri: "https://picsum.photos/seed/mihovil3/700/450" },
        ],
        opis:
          "Tvrđava sv. Mihovila na otoku Šibeniku (u blizini Zadra) nudi impresivni 360° pogled na okolne otoke i Zadarski kanal. Za zalazak sunca vidljivost doseže do Dugog Otoka na zapadu. Unutar tvrđave ljeti se odvijaju open-air koncerti i kulturni programi.",
        kako_doci:
          "Brodom do Šibenika, pa pješice do Tvrđave ~15 min. Alternativno — Forticu u Zadru penjanje s Rive, ~10 min hoda.",
        radno_vrijeme: "Sezonski: lipanj – rujan, 9:00 – 23:00 | Ulaz: ~3 EUR",
        savjet:
          "Ljetni koncerti na tvrđavi imaju besplatne termine — provjeri program na stranicama Turističke zajednice Zadra. S vrha tvrđave vide se Ugljan, Pašman i pri dobrom vremenu čak Kornati.",
      },
      {
        id: "s4",
        naziv: "Fosa – kafić uz stare zidine",
        kratki_opis: "Zalazak uz vino s pogledom na stare gradske zidine i more.",
        slike: [
          { uri: "https://picsum.photos/seed/fosa1/700/450" },
          { uri: "https://picsum.photos/seed/fosa2/700/450" },
          { uri: "https://picsum.photos/seed/fosa3/700/450" },
        ],
        opis:
          "Fosa je stara gradska luka smještena uz zidine Starog grada, okružena restoranima i kafićima. Popodnevni aperitiv uz pogled na brodove u staroj luci i svjetlost koja se lomi o kamene zidine jedno je od autentičnih zadarskih iskustava. Manje poznato od Rive, a jednako lijepo.",
        kako_doci:
          "Kopnena vrata Sv. Krševana — Ulica Jurja Dalmatinca prema staroj luci. Od Kalelarge ~3 minute hoda.",
        radno_vrijeme: "Kafići u Fosi: 7:00 – 24:00 | Zalazak: idealan između 18:30 i 20:30h",
        savjet:
          "Naruči lokalno prošek ili maraschino — zadarsku trešnjevu likeru poznatu od 18. stoljeća. Pravi lokalni doživljaj.",
      },
    ],
  },
  {
    id: "barovi",
    naziv: "Hidden barovi",
    ikona: "wine-outline",
    boja: "#7c1f6b",
    mjesta: [
      {
        id: "b1",
        naziv: "Bar Arsenal",
        kratki_opis: "Kulturno-ugostiteljski prostor u venecijanskom arsenalu iz 17. stoljeća.",
        slike: [
          { uri: "https://picsum.photos/seed/arsenal1/700/450" },
          { uri: "https://picsum.photos/seed/arsenal2/700/450" },
          { uri: "https://picsum.photos/seed/arsenal3/700/450" },
        ],
        opis:
          "Arsenal je bivši venecijanski brodogradilišni kompleks iz 17. stoljeća, danas pretvoren u multifunkcionalnu kulturnu i ugostiteljsku destinaciju. Unutar kamenih zidova nalazi se bar, izložbeni prostor i open-air terasa. Atmosfera je jedinstvena — pijete kavu ili koktele okruženi poviješću.",
        kako_doci:
          "Trg Tri Bunara, Stari grad. Od Morskih orgulja ~3 minute hoda prema jugu.",
        radno_vrijeme: "Pon – Pet: 8:00 – 24:00 | Sub – Ned: 9:00 – 01:00",
        savjet:
          "Četvrtkom navečer Arsenal često organizira live glazbene nastupe — provjeri njihov Instagram za tjedni program. Ulaz na glazbene događaje je obično besplatan.",
      },
      {
        id: "b2",
        naziv: "Garden Lounge",
        kratki_opis: "Rooftop bar s pogledom na stari grad, skriven na vrhu zgrade.",
        slike: [
          { uri: "https://picsum.photos/seed/garden1/700/450" },
          { uri: "https://picsum.photos/seed/garden2/700/450" },
          { uri: "https://picsum.photos/seed/garden3/700/450" },
        ],
        opis:
          "Garden Lounge pozicioniran je na vrhu zgrade uz zidine Starog grada, s panoramskim pogledom na Zadarski kanal i okolne otoke. Interijer kombinira mediteransku rustikalnost s modernim dizajnom, a kokteli su rađeni od lokalnih dalmatinskih likera i sezonskog voća.",
        kako_doci:
          "Ulica Bedemi zadarskih pobuna, Stari grad. Ulaz kroz mali prolaz u zidinama — traži natpis 'Garden'. Od Kalelarge ~5 minuta.",
        radno_vrijeme: "Sezonski: travanj – listopad | 17:00 – 02:00",
        savjet:
          "Rezervacija nije obavezna, ali preporuča se za vikende u srpnju i kolovozu. Happy hour 17:00 – 19:00 s 30% popustom na koktel kartu.",
      },
      {
        id: "b3",
        naziv: "Kult Bar",
        kratki_opis: "Kultni lokalni bar u starom gradu, omiljeni spot zadarskih studenata.",
        slike: [
          { uri: "https://picsum.photos/seed/kult1/700/450" },
          { uri: "https://picsum.photos/seed/kult2/700/450" },
          { uri: "https://picsum.photos/seed/kult3/700/450" },
        ],
        opis:
          "Kult Bar smješten je u srcu Starog grada i godinama je omiljeno okupljalište lokalnih studenata, umjetnika i kreativaca. Bez turističke pretenzije, s dobrim pivom, live glazbom i vjernom publikom. Zidovi ukrašeni lokalnim ilustracijama i fotografijama daju poseban karakter.",
        kako_doci:
          "Ulica Stomorica, Stari grad — između Kalelarge i Rive. Traži mali natpis iznad vrata, lako se previdi.",
        radno_vrijeme: "Svaki dan: 9:00 – 02:00 | Live glazba: petkom i subotom od 21:00",
        savjet:
          "Pitaj barmena za 'craft of the week' — mijenjaju lokalne craft pive iz zadarskih i dalmatinskih pivovara svaki tjedan. Najžustrija atmosfera je između 22 i 24h.",
      },
      {
        id: "b4",
        naziv: "Ledana – Kavana u ledenici",
        kratki_opis: "Bar smješten u autentičnoj austrijskoj ledenici iz 19. st.",
        slike: [
          { uri: "https://picsum.photos/seed/ledana1/700/450" },
          { uri: "https://picsum.photos/seed/ledana2/700/450" },
          { uri: "https://picsum.photos/seed/ledana3/700/450" },
        ],
        opis:
          "Ledana je kavana smještena u autentičnoj austrijskoj ledenici iz 19. stoljeća, gdje se nekad čuvao led za potrebe grada. Kameni svod i debeli zidovi prirodno rashladuju prostor, zbog čega je posebno ugodna za vrućih ljetnih dana. Jedna od najneobičnijih lokacija za kavu u cijeloj Dalmaciji.",
        kako_doci:
          "Ulica Stomorica, Stari grad — tik uz Park Vladimira Nazora. Ulaz je s dvorišne strane, preporuča se upitati lokalce.",
        radno_vrijeme: "8:00 – 23:00 | Zimi kraće radno vrijeme",
        savjet:
          "Za najtijhu atmosferu dođi u poslijepodnevnim satima radnim danom. Domaća sladoledna karta radi se od lokalnog voća — smokva i bajam su must-try.",
      },
    ],
  },
  {
    id: "lokalna",
    naziv: "Lokalna mjesta",
    ikona: "storefront-outline",
    boja: "#2e6b2e",
    mjesta: [
      {
        id: "l1",
        naziv: "Gradska tržnica",
        kratki_opis: "Živahna gradska pijaca s lokalnim proizvođačima, voćem i sirevima.",
        slike: [
          { uri: "https://picsum.photos/seed/trznica1/700/450" },
          { uri: "https://picsum.photos/seed/trznica2/700/450" },
          { uri: "https://picsum.photos/seed/trznica3/700/450" },
        ],
        opis:
          "Zadarska gradska tržnica jedna je od najstarijih na Jadranu i pravo srce lokalnog svakodnevnog života. Voće, povrće, maslinovo ulje, sir, pršut, med, svježe ribe i suveniri — sve od lokalnih proizvođača s okolnih otoka i zaleđa. Posjet tržnici pravi je uranjaj u autentični zadarski život.",
        kako_doci:
          "Tržnica je smještena uz stare gradske zidine, ulaz s Ulice Jurja Barakovića. Pješice od Kalelarge ~5 min.",
        radno_vrijeme: "Pon – Sub: 6:00 – 14:00 | Nedjelja: 6:00 – 12:00",
        savjet:
          "Dođi između 7 i 9 ujutro za svježu robu i lokalne proizvođače koji prodaju direktno s brodova. Nakon 11h ponuda se prorijeđuje. Stani uz štand s domaćim sirevima s Pašmana — neusporedivi su.",
      },
      {
        id: "l2",
        naziv: "Ribarnica",
        kratki_opis: "Svježa riba direktno s broda, kupuje se kao pravi Zadranin.",
        slike: [
          { uri: "https://picsum.photos/seed/ribarnica1/700/450" },
          { uri: "https://picsum.photos/seed/ribarnica2/700/450" },
          { uri: "https://picsum.photos/seed/ribarnica3/700/450" },
        ],
        opis:
          "Zadarska ribarnica smještena je uz samu obalu, gdje ribari prodaju ulov direktno s brodova. Brancin, orada, lignje, škampi i jadransko blago kojeg nema u supermarketu. Atmosfera je bučna, mirisna i savršeno autentična — mješavina dalmatinskog dijalekta, cjenkanja i svježe ribe.",
        kako_doci:
          "Riva Pape Aleksandra III, uz samu obalu mora u Starom gradu. Odmah uz pristajalište manjih brodova.",
        radno_vrijeme: "Svaki dan: 6:00 – 13:00 | Najbogatija ponuda: 6:30 – 9:00",
        savjet:
          "Pitaj ribare što su danas ulovili i od toga narući u obližnjem restoranu koji prihvaća vlastitu ribu — neke konobe to dopuštaju. Lignje su gotovo uvijek dostupne i najsvježije su ujutro.",
      },
      {
        id: "l3",
        naziv: "Kalelarga – Jutarnja kava",
        kratki_opis: "Ritual jutarnje kave na glavnoj pješačkoj ulici kao pravi Zadranin.",
        slike: [
          { uri: "https://picsum.photos/seed/kalelarga1/700/450" },
          { uri: "https://picsum.photos/seed/kalelarga2/700/450" },
          { uri: "https://picsum.photos/seed/kalelarga3/700/450" },
        ],
        opis:
          "Kalelarga (Ulica Široka) je glavna pješačka arteria Starog grada, duga oko 200 metara, popločena bijelim kamenom. Jutarnja kava na jednoj od terasa uz Kalelrargu nije samo kafić — to je društveni ritual koji prati Zadrane generacijama. Razgovor s komšijama, čitanje novina, gledanje prolaznika.",
        kako_doci:
          "Kalelarga — centralna os Starog grada, od Narodnog trga prema Sv. Donatu. Nemoguće promašiti.",
        radno_vrijeme: "Kafići na Kalerlargi: 7:00 – 24:00 | Jutarnja gužva: 8:00 – 10:00",
        savjet:
          "Naruči 'bijelu kavu' (domaći izraz za kavu s mlijekom) i sjedni bez žurbe. Lokalni ritual nalaže da se kava ne pije u trku — to je društveni čin, ne kofeinski napitak.",
      },
      {
        id: "l4",
        naziv: "Crkva sv. Donata & Forum",
        kratki_opis: "Predromanička crkva iz 9. st. na rimskom forumu — srce povijesti Zadra.",
        slike: [
          { uri: "https://picsum.photos/seed/donat1/700/450" },
          { uri: "https://picsum.photos/seed/donat2/700/450" },
          { uri: "https://picsum.photos/seed/donat3/700/450" },
        ],
        opis:
          "Crkva sv. Donata, izgrađena u 9. stoljeću, najprepoznatljiviji je simbol Zadra i jedan od najvažnijih primjera predromaničke arhitekture u Europi. Sagrađena je doslovno na ostacima rimskog Foruma, čiji stupovi i pločnici virire oko crkve. Unutrašnjost je prazna ali savršene akustike — ljetnih večeri ovdje se odvijaju koncerti.",
        kako_doci:
          "Trg Rimskog foruma, Stari grad. Od Kalelarge ~2 minute hoda prema sjeveru.",
        radno_vrijeme: "Travanj – listopad: 9:00 – 21:00 | Ostalo: 10:00 – 17:00 | Ulaz: ~3 EUR",
        savjet:
          "Muzičke večeri unutar crkve (Festival orgulja, Glazbene večeri sv. Donata) imaju iznimnu akustiku — jedno od rijetkih mjesta gdje kameni prostor pojačava zvuk na prirodan način. Provjeri ljetni program.",
      },
    ],
  },
  {
    id: "iskustva",
    naziv: "Autentična iskustva",
    ikona: "sparkles-outline",
    boja: "#8c5a1a",
    mjesta: [
      {
        id: "i1",
        naziv: "Degustacija maraschinog",
        kratki_opis: "Kušanje legendarne zadarke likere od trešanja u originalnoj destileriji.",
        slike: [
          { uri: "https://picsum.photos/seed/maraska1/700/450" },
          { uri: "https://picsum.photos/seed/maraska2/700/450" },
          { uri: "https://picsum.photos/seed/maraska3/700/450" },
        ],
        opis:
          "Maraschino je zadarsk trešnjeva liker s tradicijom dugom više od 500 godina, jedinstven u cijelom svijetu. Originalna destilerija Maraska u Zadru nudi ture i degustacije kroz povijest ovog izuzetnog pića. Nekad su ga naručivali europski vladari, a danas se izvozi u 50-ak zemalja.",
        kako_doci:
          "Maraska d.d., Ulica Ante Trumbića 4, Zadar. Autobusom linija 2 iz centra. Pješice iz Starog grada ~15 min.",
        radno_vrijeme: "Pon – Pet: 8:00 – 16:00 | Ture s degustacijom: uz prethodnu rezervaciju",
        savjet:
          "Rezerviraj turu unaprijed na marasca.hr ili telefonom. Uz turu dobivaš mini degustaciju 3-4 varijante, uključujući i Luxardo original recepturu. Odlična ideja za poklon — posebne edicije u dekorativnim bocama.",
      },
      {
        id: "i2",
        naziv: "Večernji ribolov s ribarem",
        kratki_opis: "Izlazak na more noću s lokalnim ribarom — pravo dalmatinsko iskustvo.",
        slike: [
          { uri: "https://picsum.photos/seed/ribolov1/700/450" },
          { uri: "https://picsum.photos/seed/ribolov2/700/450" },
          { uri: "https://picsum.photos/seed/ribolov3/700/450" },
        ],
        opis:
          "Iskustvo večernjeg ribolova s lokalnim ribarom nudi pogled na zadarski akvatorij kakav turisti rijetko vide. Izlazak u sumrak, postavljanje mreža ili parangala, nočno more uz svjetlost zvijezda i Zadra u daljini — a ujutro se ulovi donose na tržnicu. Organiziraju lokalni ribari iz Rive.",
        kako_doci:
          "Dogovor direktno s ribarima na Rivi (pristajalište malih brodova, Stari grad). Pitaj za 'večernji izlaz' — rijetko tko odbija zainteresiranog posjetitelja.",
        radno_vrijeme: "Organizira se individualno | Preporuča se: lipanj – rujan | Polazak: ~19:00h",
        savjet:
          "Ponesi toplu jaknu — more noću zna biti svježe čak i u srpnju. Gotovinom plati direktno ribaru (~30–50 EUR po osobi, cijenu uvijek dogovori unaprijed). Ulazak na brod je vaša odgovornost.",
      },
      {
        id: "i3",
        naziv: "Radionica zadarskog veza",
        kratki_opis: "Nauči tradicijsku tehniku vezenja koja se u Zadru prenosi generacijama.",
        slike: [
          { uri: "https://picsum.photos/seed/vez1/700/450" },
          { uri: "https://picsum.photos/seed/vez2/700/450" },
          { uri: "https://picsum.photos/seed/vez3/700/450" },
        ],
        opis:
          "Zadarski vez i čipka dio su nematerijalne kulturne baštine koja se prenosi s koljena na koljeno. Lokalne majstorice organiziraju radionice za posjetitelje u Staroj gradskoj jezgri, gdje možeš naučiti osnove i odnijeti vlastiti mali rad kući. Tradicija stara nekoliko stoljeća sada živi i u rukama novih generacija.",
        kako_doci:
          "Radionica se odvija u Staroj gradskoj jezgri — provjeri aktualnu lokaciju na stranici TZ Zadar ili pitaj u Turističkom uredu (Ulica Jurja Bijankinija 4).",
        radno_vrijeme: "Sezonski: lipanj – rujan, utorak i četvrtak 10:00 – 12:00 | Prijava obavezna",
        savjet:
          "Radionica traje 2 sata i uključuje sve materijale. Idealno za parove, obitelji ili solokatalogiste koji traže nešto drugačije od razgledavanja. Djeca starija od 8 godina mogu sudjelovati.",
      },
      {
        id: "i4",
        naziv: "Tura maslinom – degustacija ulja",
        kratki_opis: "Posjet lokalnom masliniku u zaleđu Zadra s degustacijom svježeg ulja.",
        slike: [
          { uri: "https://picsum.photos/seed/maslinik1/700/450" },
          { uri: "https://picsum.photos/seed/maslinik2/700/450" },
          { uri: "https://picsum.photos/seed/maslinik3/700/450" },
        ],
        opis:
          "Zadarsko zaleđe i okolni otoci dom su jednih od najstarijih maslinika na Mediteranu. Lokalni proizvođači organiziraju posjete maslinicima uz degustaciju svježe cijeđenog ulja, priča o tradiciji berbe i objed na otvorenom. Iskustvo koje otkriva koliko je maslinovo ulje više od začina — u Dalmaciji je to način života.",
        kako_doci:
          "Organizirani prijevoz iz centra Zadra ili automobilom prema Biogradu (~20 km) pa skretanje prema unutrašnjosti. Provjeri ponudu na Visit Zadar platformi.",
        radno_vrijeme: "Ture: travanj – studeni | Sezona berbe (najatraktivnija): listopad – studeni",
        savjet:
          "Tura u listopadu za berbe masline pravo je iskustvo — možeš sudjelovati u berbi, vidjeti prešanje i kušati ulje bere je isti dan. Nosi laganu udobnu odjeću i cipele s gumenim potplatom.",
      },
    ],
  },
];

function InfoRow({ ikona, tekst }) {
  return (
    <View style={styles.infoRow}>
      <Ionicons name={ikona} size={15} color="#007AFF" style={styles.infoIcon} />
      <Text style={styles.infoRowText}>{tekst}</Text>
    </View>
  );
}

function MjestoModal({ mjesto, katBoja, onClose }) {
  const [activeSlide, setActiveSlide] = useState(0);

  if (!mjesto) return null;

  const handleScroll = (e) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / GALLERY_W);
    setActiveSlide(index);
  };

  return (
    <Modal visible animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            {/* Galerija */}
            <View style={styles.galleryContainer}>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                style={{ width: GALLERY_W }}
              >
                {mjesto.slike.map((slika, i) => (
                  <Image
                    key={i}
                    source={slika}
                    style={[styles.galleryImage, { width: GALLERY_W }]}
                    resizeMode="cover"
                  />
                ))}
              </ScrollView>
              <View style={styles.dotRow}>
                {mjesto.slike.map((_, i) => (
                  <View key={i} style={[styles.dot, i === activeSlide && styles.dotActive]} />
                ))}
              </View>
              <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                <Ionicons name="close" size={18} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Sadržaj */}
            <View style={styles.modalContent}>
              <View style={[styles.colorBar, { backgroundColor: katBoja }]} />
              <Text style={styles.modalTitle}>{mjesto.naziv}</Text>

              <Text style={styles.modalOpis}>{mjesto.opis}</Text>

              {/* Kako doći */}
              <View style={styles.sectionBox}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="navigate" size={17} color="#007AFF" />
                  <Text style={styles.sectionTitle}>Kako doći</Text>
                </View>
                <InfoRow ikona="chevron-forward" tekst={mjesto.kako_doci} />
              </View>

              {/* Radno vrijeme */}
              <View style={styles.sectionBox}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="time" size={17} color="#34C759" />
                  <Text style={styles.sectionTitle}>Radno vrijeme & Preporučeno doba</Text>
                </View>
                <InfoRow ikona="chevron-forward" tekst={mjesto.radno_vrijeme} />
              </View>

              {/* Lokalni savjet */}
              <View style={styles.savjetBox}>
                <Ionicons name="bulb" size={17} color="#FF9500" />
                <Text style={styles.savjetText}>{mjesto.savjet}</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

function MjestoKartica({ mjesto, boja, ikona, onPress }) {
  return (
    <TouchableOpacity
      style={styles.karticaWrap}
      onPress={() => onPress(mjesto)}
      activeOpacity={0.85}
    >
      <BlurView intensity={40} tint="dark" style={styles.kartica}>
        <View style={[styles.karticaAccent, { backgroundColor: boja }]} />
        <View style={[styles.karticaIconWrap, { backgroundColor: boja + "33" }]}>
          <Ionicons name={ikona} size={22} color="#fff" />
        </View>
        <Text style={styles.karticaNaziv}>{mjesto.naziv}</Text>
        <Text style={styles.karticaOpis} numberOfLines={3}>{mjesto.kratki_opis}</Text>
        <View style={styles.karticaFooter}>
          <Text style={styles.karticaCta}>Otvori</Text>
          <Ionicons name="arrow-forward" size={12} color="rgba(255,255,255,0.55)" />
        </View>
      </BlurView>
    </TouchableOpacity>
  );
}

export default function ExperienceGradScreen() {
  const [odabranoMjesto, setOdabranoMjesto] = useState(null);
  const [aktivnaKat, setAktivnaKat] = useState(null);

  const handleOpen = (mjesto, kategorija) => {
    setOdabranoMjesto(mjesto);
    setAktivnaKat(kategorija);
  };

  const handleClose = () => {
    setOdabranoMjesto(null);
    setAktivnaKat(null);
  };

  return (
    <ImageBackground
      source={require("../assets/images/grad-bg.jpg")}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
      <HamburgerMenu />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Grad</Text>
          <Text style={styles.headerDesc}>Autentični Zadar — mjesta koja vrijedi otkriti</Text>
        </View>

        {KATEGORIJE.map((kat) => (
          <View key={kat.id} style={styles.katSekcija}>
            {/* Naslov kategorije */}
            <View style={styles.katHeader}>
              <View style={[styles.katHeaderIcon, { backgroundColor: kat.boja + "25" }]}>
                <Ionicons name={kat.ikona} size={18} color={kat.boja} />
              </View>
              <Text style={styles.katNaziv}>{kat.naziv}</Text>
            </View>

            {/* 2-kolumni grid */}
            <View style={styles.gridRow}>
              <View style={styles.gridCol}>
                {kat.mjesta
                  .filter((_, i) => i % 2 === 0)
                  .map((m) => (
                    <MjestoKartica
                      key={m.id}
                      mjesto={m}
                      boja={kat.boja}
                      ikona={kat.ikona}
                      onPress={(mj) => handleOpen(mj, kat)}
                    />
                  ))}
              </View>
              <View style={styles.gridCol}>
                {kat.mjesta
                  .filter((_, i) => i % 2 !== 0)
                  .map((m) => (
                    <MjestoKartica
                      key={m.id}
                      mjesto={m}
                      boja={kat.boja}
                      ikona={kat.ikona}
                      onPress={(mj) => handleOpen(mj, kat)}
                    />
                  ))}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <MjestoModal
        mjesto={odabranoMjesto}
        katBoja={aktivnaKat?.boja}
        onClose={handleClose}
      />

      <BottomTabBar />
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingTop: 110,
    paddingBottom: 120,
  },
  header: {
    alignItems: "center",
    marginBottom: 28,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
  },
  headerDesc: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 13,
    marginTop: 6,
  },

  // Kategorija sekcija
  katSekcija: {
    marginBottom: 28,
  },
  katHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  katHeaderIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  katNaziv: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  // Grid
  gridRow: {
    flexDirection: "row",
    gap: 10,
  },
  gridCol: {
    flex: 1,
    gap: 10,
  },

  // Kartica
  karticaWrap: {
    borderRadius: 16,
    overflow: "hidden",
  },
  kartica: {
    borderRadius: 16,
    overflow: "hidden",
    padding: 13,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    gap: 4,
  },
  karticaAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  karticaIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
    marginTop: 4,
  },
  karticaNaziv: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 19,
  },
  karticaOpis: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 11,
    lineHeight: 16,
    marginTop: 2,
  },
  karticaFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 8,
  },
  karticaCta: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 11,
    fontWeight: "500",
  },

  // Modal overlay
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: "#f9f9f9",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: "hidden",
    maxHeight: "92%",
  },

  // Galerija
  galleryContainer: {
    alignItems: "center",
    backgroundColor: "#000",
  },
  galleryImage: {
    height: 230,
  },
  dotRow: {
    flexDirection: "row",
    gap: 6,
    paddingVertical: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.35)",
  },
  dotActive: {
    backgroundColor: "#fff",
    width: 18,
  },
  closeBtn: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
  },

  // Modal sadržaj
  modalContent: {
    padding: 22,
    paddingBottom: 40,
  },
  colorBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111",
    marginBottom: 12,
  },
  modalOpis: {
    fontSize: 15,
    color: "#333",
    lineHeight: 23,
    marginBottom: 18,
  },

  // Sekcije
  sectionBox: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 7,
  },
  infoIcon: {
    marginTop: 2,
  },
  infoRowText: {
    flex: 1,
    fontSize: 13,
    color: "#444",
    lineHeight: 19,
  },

  // Savjet
  savjetBox: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#fff8ee",
    borderRadius: 14,
    padding: 14,
    borderLeftWidth: 4,
    borderLeftColor: "#FF9500",
    alignItems: "flex-start",
  },
  savjetText: {
    flex: 1,
    fontSize: 13,
    color: "#333",
    lineHeight: 20,
  },
});
