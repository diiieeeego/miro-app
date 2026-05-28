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

const OTOCI = [
  {
    id: 1,
    naziv: "Ugljan",
    podnaslov: "Zeleni otok",
    kratki_opis: "Bujni maslinici i mirne uvale, samo 25 minuta od Zadra.",
    boja: "#1e6b4a",
    ikona: "leaf-outline",
    slike: [
      { uri: "https://picsum.photos/seed/ugljan1/700/450" },
      { uri: "https://picsum.photos/seed/ugljan2/700/450" },
      { uri: "https://picsum.photos/seed/ugljan3/700/450" },
    ],
    opis:
      "Ugljan je jedan od najnaseljenijih zadarskih otoka, poznat po bujnim maslinicima koji mu daju prepoznatljiv zeleni izgled. Smješten svega nekoliko minuta trajektom od Zadra, nudi mirne uvale, kristalno čisto more i autentičnu mediteransku atmosferu. Glavna mjesta su Preko, Kali, Kukljica i Ugljan.",
    brodski: [
      "Jadrolinija: Zadar (Liburnska) → Preko — 20-ak veza dnevno, vožnja ~25 min",
      "Jadrolinija: Zadar → Kukljica — više veza dnevno",
    ],
    autobusni: [
      "Liburnija d.o.o. — redovne linije između Preka, Kalija, Kukljice i mjesta Ugljan",
      "Vozni red: liburnija.hr",
    ],
    taxi: ["Taxi Ugljan: +385 98 123 456", "Taxi Kali: +385 91 234 567"],
    napomena:
      "Preporuča se posjet lokalnom mlinu maslinovog ulja i pješačka staza Sv. Mihovil s panoramskim pogledom na Zadar.",
  },
  {
    id: 2,
    naziv: "Pašman",
    podnaslov: "Otok maslinika",
    kratki_opis: "Autentična dalmatinska sela i bogata gastronomska tradicija.",
    boja: "#1a5f6b",
    ikona: "fish-outline",
    slike: [
      { uri: "https://picsum.photos/seed/pasman1/700/450" },
      { uri: "https://picsum.photos/seed/pasman2/700/450" },
      { uri: "https://picsum.photos/seed/pasman3/700/450" },
    ],
    opis:
      "Pašman je otok odvojen od Ugljana Pašmanskim kanalom, poznat po mirnim uvalama, maslinicima i ribnjacima. Glavni brodski prijelaz je iz Biograda do Tkona. Na otoku se nalaze mjesta Tkon, Pašman, Neviđane i Dobropoljana, svako s autentičnim dalmatinskim karakterom.",
    brodski: [
      "Jadrolinija: Biograd na Moru → Tkon — svaki sat, vožnja ~15 min",
      "Jadrolinija: Zadar → Brbinj (Dugi Otok) s postajom kod Pašmana — jednom dnevno",
    ],
    autobusni: [
      "Liburnija d.o.o. — lokalne linije na otoku (Tkon – Pašman – Neviđane – Dobropoljana)",
      "Vozni red: liburnija.hr",
    ],
    taxi: ["Taxi Pašman: +385 98 456 789", "Taxi Tkon: +385 91 567 890"],
    napomena:
      "Ribnjak školjki u Tkonu jedan je od najvećih u Hrvatskoj — svježih dagnji i kamenica ne nedostaje.",
  },
  {
    id: 3,
    naziv: "Dugi Otok",
    podnaslov: "Najduži jadarski otok",
    kratki_opis: "Dramatični klifovi, Telašćica i park prirode Kornati.",
    boja: "#1a3f8c",
    ikona: "water-outline",
    slike: [
      { uri: "https://picsum.photos/seed/dugiOtok1/700/450" },
      { uri: "https://picsum.photos/seed/dugiOtok2/700/450" },
      { uri: "https://picsum.photos/seed/dugiOtok3/700/450" },
    ],
    opis:
      "Dugi Otok, dug oko 45 km, najduži je zadarski otok i jedan od najatraktivnijih u Jadranu. Dom je parka prirode Telašćica s dramatičnim klifovima i slanim jezerom Mir, a u neposrednoj blizini nalazi se NP Kornati. Najvažnija mjesta su Sali, Brbinj, Luka, Veli Rat i Božava.",
    brodski: [
      "Jadrolinija: Zadar → Brbinj — 1–2 puta dnevno, vožnja ~1h 45min",
      "Jadrolinija: Zadar → Sali (via Iž) — jednom dnevno, vožnja ~2h",
      "Miatours: Zadar → Božava (turistički brod) — sezonski",
    ],
    autobusni: [
      "Lokalni autobus: Sali – Brbinj – Luka – Veli Rat (ograničen vozni red)",
      "Informacije: TZ Dugi Otok, Sali",
    ],
    taxi: [
      "Taxi Sali: +385 98 789 012",
      "Rent-a-car Brbinj (sezonski): +385 91 890 123",
    ],
    napomena:
      "Zalaz sunca s rta Veli Rat uz svjetionik i laguna Sakarun jedna su od najljepših točaka cijelog Jadrana — ne propustiti!",
  },
  {
    id: 4,
    naziv: "Iž",
    podnaslov: "Otok lončarstva",
    kratki_opis: "Jedinstvena tradicija grnčarstva i netaknute uvale.",
    boja: "#7a3f1a",
    ikona: "color-palette-outline",
    slike: [
      { uri: "https://picsum.photos/seed/iz1/700/450" },
      { uri: "https://picsum.photos/seed/iz2/700/450" },
      { uri: "https://picsum.photos/seed/iz3/700/450" },
    ],
    opis:
      "Iž je poznat po jedinstvenoj tradiciji lončarstva — žene s otoka Ižane bile su poznate širom Dalmacije kao izrađivačice glinenih posuda. Otok se sastoji od dva mjesta: Mali Iž i Veli Iž. Okolne uvale nude izuzetnu tišinu i netaknutu prirodu.",
    brodski: [
      "Jadrolinija: Zadar → Mali Iž → Veli Iž — jednom dnevno, vožnja ~1h 15min",
      "Linija nastavlja prema Salima (Dugi Otok)",
    ],
    autobusni: [
      "Nema organiziranog autobusnog prijevoza na otoku",
      "Kretanje pješice ili biciklom preporuča se",
    ],
    taxi: ["Lokalni prijevoz: +385 98 234 567 (narudžba unaprijed)"],
    napomena:
      "Na otoku djeluje muzej lončarstva u Velom Ižu. Idealno za ljubitelje mira, autentičnog života i fotografije.",
  },
  {
    id: 5,
    naziv: "Molat",
    podnaslov: "Mirni zaljev",
    kratki_opis: "Ribarsko mjesto s jednom od najljepših luka na Jadranu.",
    boja: "#5a1a8c",
    ikona: "boat-outline",
    slike: [
      { uri: "https://picsum.photos/seed/molat1/700/450" },
      { uri: "https://picsum.photos/seed/molat2/700/450" },
      { uri: "https://picsum.photos/seed/molat3/700/450" },
    ],
    opis:
      "Molat je mali mirni otok s jednom od najzaštićenijih luka na Jadranu. Poznat je po ribolovu, tihom životu i prekrasnoj prirodi. Na otoku se nalaze tri mala mjesta: Molat, Brgulje i Zapuntel. Idealno odredište za jedriličare i sve koji traže autentičnu tišinu.",
    brodski: [
      "Jadrolinija: Zadar → Ist → Molat — jednom dnevno (linija za daleke otoke), vožnja ~2h 30min",
    ],
    autobusni: [
      "Nema organiziranog autobusnog prijevoza",
      "Kretanje pješice ili biciklom",
    ],
    taxi: ["Lokalni prijevoz: +385 91 345 678 (unaprijed naručiti)"],
    napomena:
      "Molat je savršen za jedriličare i nautičare. Marina Molat nudi vez za plovila uz sve potrebne usluge.",
  },
  {
    id: 6,
    naziv: "Ist",
    podnaslov: "Tihi otočni raj",
    kratki_opis: "Malen, miran i netaknut — pravo utočište od gradske vreve.",
    boja: "#8c1a1a",
    ikona: "sunny-outline",
    slike: [
      { uri: "https://picsum.photos/seed/ist1/700/450" },
      { uri: "https://picsum.photos/seed/ist2/700/450" },
      { uri: "https://picsum.photos/seed/ist3/700/450" },
    ],
    opis:
      "Ist je maleni zadarski otok s jednim istoimenim mjestom, poznat po mirnoj luci i tihom životu. Idealan za one koji žele doista pobjeći od svakodnevice. Okolne uvale nude kristalno čisto more i potpunu privatnost.",
    brodski: [
      "Jadrolinija: Zadar → Ist — jednom dnevno (linija za daleke otoke), vožnja ~2h",
      "Linija nastavlja prema Molatu, Zapuntelu i Olibu",
    ],
    autobusni: [
      "Nema autobusnog prijevoza — otok je malen i lako prohodan pješice",
    ],
    taxi: ["Kontakt TZ Ist: +385 23 377 020"],
    napomena:
      "Otok je idealan za višednevni odmor s vlastitim plovilom. Mogućnosti kupovine namirnica ograničene — preporuča se doći opskrbljen.",
  },
  {
    id: 7,
    naziv: "Olib",
    podnaslov: "Nepokvarena priroda",
    kratki_opis: "Bujna mediteranska vegetacija i bogate tradicije dalmatinskog sela.",
    boja: "#4a6b1a",
    ikona: "flower-outline",
    slike: [
      { uri: "https://picsum.photos/seed/olib1/700/450" },
      { uri: "https://picsum.photos/seed/olib2/700/450" },
      { uri: "https://picsum.photos/seed/olib3/700/450" },
    ],
    opis:
      "Olib je relativno velik otok s bujnom mediteranskom vegetacijom, poznat po ručno izrađenom čipkom i tradicionalnoj arhitekturi. Jedino mjesto na otoku je Olib. Posjetitelje privlači autentičnost života, tihe plaže i bogata flora.",
    brodski: [
      "Jadrolinija: Zadar → Silba → Olib — jednom dnevno, vožnja ~2h 30min do Oliba",
      "Sezonski ubrzani brodovi dostupni ljeti",
    ],
    autobusni: [
      "Nema organiziranog autobusnog prijevoza",
    ],
    taxi: ["Lokalni prijevoz: kontakt TZ Olib +385 23 277 064"],
    napomena:
      "Tradicija ručno rađene čipke na Olibu dio je nematerijalne kulturne baštine. Lokalne žene demonstriraju zanat u ljetnim mjesecima.",
  },
  {
    id: 8,
    naziv: "Silba",
    podnaslov: "Otok bez automobila",
    kratki_opis: "Jedinstven otok bez motornog prometa — raj za bicikliste i pješake.",
    boja: "#1a6b8c",
    ikona: "bicycle-outline",
    slike: [
      { uri: "https://picsum.photos/seed/silba1/700/450" },
      { uri: "https://picsum.photos/seed/silba2/700/450" },
      { uri: "https://picsum.photos/seed/silba3/700/450" },
    ],
    opis:
      "Silba je jedinstveni zadarski otok bez motornog prometa — automobili su zabranjeni, a kretanje je isključivo pješice ili biciklom. Jedino naselje na otoku nosi isto ime. Poznat je po prekrasnoj pješčanoj uvali Sotorišće, bujnoj vegetaciji i iznimno mirnoj atmosferi.",
    brodski: [
      "Jadrolinija: Zadar → Silba — jednom dnevno, vožnja ~2h",
      "Miatours: sezonska linija Zadar → Silba (brzi brod), vožnja ~1h",
    ],
    autobusni: [
      "Nema autobusnog prijevoza — automobili nisu dozvoljeni",
      "Iznajmljivanje bicikla preporuča se — raspoloživo kod lokalnih iznajmljivača",
    ],
    taxi: [
      "Električni golf kartici za transport prtljage — organizira smještaj",
      "Nema klasičnih taxi usluga",
    ],
    napomena:
      "Silba je jedini zadarski otok bez motornog prometa, što ga čini savršenim za odmor uz potpunu tišinu. Pješčana uvala Sotorišće jedna je od rijetkih na Jadranu.",
  },
  {
    id: 9,
    naziv: "Premuda",
    podnaslov: "Skriveni biser",
    kratki_opis: "Najmirni zadarski otok, daleko od turistički pretrpanih destinacija.",
    boja: "#8c1a5b",
    ikona: "star-outline",
    slike: [
      { uri: "https://picsum.photos/seed/premuda1/700/450" },
      { uri: "https://picsum.photos/seed/premuda2/700/450" },
      { uri: "https://picsum.photos/seed/premuda3/700/450" },
    ],
    opis:
      "Premuda je jedan od najudaljenijih i najmanje posjećenih zadarskih otoka, što ga čini pravim rajem za one koji žele doista pobjeći od turizma. Jedino mjesto je Premuda. Otok je poznat po čistom moru, divljoj prirodi i potpunoj tišini.",
    brodski: [
      "Jadrolinija: Zadar → Silba → Olib → Premuda — jednom dnevno, vožnja ~3h do Premude",
    ],
    autobusni: [
      "Nema autobusnog prijevoza na otoku",
    ],
    taxi: ["Kontakt: TZ Premuda +385 23 348 800"],
    napomena:
      "Zbog ograničene brodske linije, preporuča se planiranje unaprijed. Otok je idealan za duži boravak s vlastitim plovilom.",
  },
  {
    id: 10,
    naziv: "Rava",
    podnaslov: "Dragulj Jadrana",
    kratki_opis: "Mali obiteljski otok s kristalnim morem i ribarskom tradicijom.",
    boja: "#6b3d1a",
    ikona: "heart-outline",
    slike: [
      { uri: "https://picsum.photos/seed/rava1/700/450" },
      { uri: "https://picsum.photos/seed/rava2/700/450" },
      { uri: "https://picsum.photos/seed/rava3/700/450" },
    ],
    opis:
      "Rava je mali otok između Ugljana i Dugog Otoka, sa jednim istoimenim mjestom. Ima svega tridesetak stalnih stanovnika, ali ljeti privlači goste koji traže mir, čisto more i autentičnu ribarsku atmosferu. Idealno odredište za obitelji s djecom.",
    brodski: [
      "Jadrolinija: Zadar → Rava — jednom dnevno, vožnja ~1h 15min",
    ],
    autobusni: [
      "Nema autobusnog prijevoza — otok je lako prohodan pješice",
    ],
    taxi: ["Lokalni prijevoz: kontakt ugostitelji na otoku"],
    napomena:
      "Rava je idealna za obitelji s djecom — mirno more, mala luka i topli lokalni ugostitelji. Kapaciteti su ograničeni, rezervacija smještaja preporuča se unaprijed.",
  },
];

function InfoRow({ ikona, tekst }) {
  return (
    <View style={styles.infoRow}>
      <Ionicons name={ikona} size={16} color="#007AFF" style={styles.infoIcon} />
      <Text style={styles.infoRowText}>{tekst}</Text>
    </View>
  );
}

function OtokModal({ otok, onClose }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const galleryRef = useRef(null);

  if (!otok) return null;

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
                ref={galleryRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                style={{ width: GALLERY_W }}
              >
                {otok.slike.map((slika, i) => (
                  <Image key={i} source={slika} style={[styles.galleryImage, { width: GALLERY_W }]} resizeMode="cover" />
                ))}
              </ScrollView>
              <View style={styles.dotRow}>
                {otok.slike.map((_, i) => (
                  <View key={i} style={[styles.dot, i === activeSlide && styles.dotActive]} />
                ))}
              </View>
              <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                <Ionicons name="close" size={18} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Sadržaj */}
            <View style={styles.modalContent}>
              <View style={[styles.colorDot, { backgroundColor: otok.boja }]} />
              <Text style={styles.modalTitle}>{otok.naziv}</Text>
              <Text style={styles.modalPodnaslov}>{otok.podnaslov}</Text>

              <Text style={styles.modalOpis}>{otok.opis}</Text>

              {/* Brodski prijevoz */}
              <View style={styles.sectionBox}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="boat" size={18} color="#007AFF" />
                  <Text style={styles.sectionTitle}>Brodski prijevoz</Text>
                </View>
                {otok.brodski.map((t, i) => <InfoRow key={i} ikona="chevron-forward" tekst={t} />)}
              </View>

              {/* Autobusni prijevoz */}
              <View style={styles.sectionBox}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="bus" size={18} color="#34C759" />
                  <Text style={styles.sectionTitle}>Autobusni prijevoz</Text>
                </View>
                {otok.autobusni.map((t, i) => <InfoRow key={i} ikona="chevron-forward" tekst={t} />)}
              </View>

              {/* Taxi */}
              <View style={styles.sectionBox}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="car" size={18} color="#FF9500" />
                  <Text style={styles.sectionTitle}>Taxi usluge</Text>
                </View>
                {otok.taxi.map((t, i) => <InfoRow key={i} ikona="chevron-forward" tekst={t} />)}
              </View>

              {/* Napomena */}
              <View style={styles.napomenaBox}>
                <Ionicons name="information-circle" size={18} color="#5856D6" />
                <Text style={styles.napomenaText}>{otok.napomena}</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

function OtokKartica({ otok, onPress }) {
  return (
    <TouchableOpacity style={styles.karticaWrap} onPress={() => onPress(otok)} activeOpacity={0.85}>
      <BlurView intensity={40} tint="dark" style={styles.kartica}>
        <View style={[styles.karticaAccent, { backgroundColor: otok.boja }]} />
        <View style={styles.karticaIconWrap}>
          <Ionicons name={otok.ikona} size={26} color="#fff" />
        </View>
        <Text style={styles.karticaNaziv}>{otok.naziv}</Text>
        <Text style={styles.karticaPodnaslov}>{otok.podnaslov}</Text>
        <Text style={styles.karticaOpis} numberOfLines={2}>{otok.kratki_opis}</Text>
        <View style={styles.karticaFooter}>
          <Text style={styles.karticaCta}>Saznaj više</Text>
          <Ionicons name="arrow-forward" size={13} color="rgba(255,255,255,0.6)" />
        </View>
      </BlurView>
    </TouchableOpacity>
  );
}

export default function ExperienceOtociScreen() {
  const [odabraniOtok, setOdabraniOtok] = useState(null);

  const lijeviOtoci = OTOCI.filter((_, i) => i % 2 === 0);
  const desniOtoci = OTOCI.filter((_, i) => i % 2 !== 0);

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
          <Text style={styles.headerTitle}>Otoci</Text>
          <Text style={styles.headerDesc}>Zadarski arhipelag — 10 otoka za istraživanje</Text>
        </View>

        <View style={styles.gridRow}>
          <View style={styles.gridCol}>
            {lijeviOtoci.map((o) => (
              <OtokKartica key={o.id} otok={o} onPress={setOdabraniOtok} />
            ))}
          </View>
          <View style={styles.gridCol}>
            {desniOtoci.map((o) => (
              <OtokKartica key={o.id} otok={o} onPress={setOdabraniOtok} />
            ))}
          </View>
        </View>
      </ScrollView>

      <OtokModal otok={odabraniOtok} onClose={() => setOdabraniOtok(null)} />

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
    marginBottom: 24,
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
    borderRadius: 18,
    overflow: "hidden",
  },
  kartica: {
    borderRadius: 18,
    overflow: "hidden",
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    gap: 4,
  },
  karticaAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  karticaIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
    marginTop: 6,
  },
  karticaNaziv: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  karticaPodnaslov: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 11,
    marginBottom: 4,
  },
  karticaOpis: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    lineHeight: 17,
  },
  karticaFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 8,
  },
  karticaCta: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    fontWeight: "500",
  },

  // Modal
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
    position: "relative",
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
  colorDot: {
    width: 40,
    height: 4,
    borderRadius: 2,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111",
  },
  modalPodnaslov: {
    fontSize: 14,
    color: "#888",
    marginBottom: 14,
    marginTop: 2,
  },
  modalOpis: {
    fontSize: 15,
    color: "#333",
    lineHeight: 23,
    marginBottom: 20,
  },

  // Sekcije
  sectionBox: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
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
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 6,
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

  // Napomena
  napomenaBox: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#f0eeff",
    borderRadius: 14,
    padding: 14,
    borderLeftWidth: 4,
    borderLeftColor: "#5856D6",
    alignItems: "flex-start",
  },
  napomenaText: {
    flex: 1,
    fontSize: 13,
    color: "#333",
    lineHeight: 20,
  },
});
