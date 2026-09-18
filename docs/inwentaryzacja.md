# Inwentaryzacja starej strony

Co było na `http://gospodarstwo-saran.pl/` (WordPress, motyw ColorMag) i gdzie trafiło
w nowym serwisie. Spisane 6 września 2026 z żywej strony.

## Podstrony

| Stary adres          | Zawartość                                         | Gdzie jest teraz                                                  |
| -------------------- | ------------------------------------------------- | ----------------------------------------------------------------- |
| `/`                  | Powitanie, zajawka oferty                         | Sekcja Intro na stronie głównej                                   |
| `/kwiaty-balkonowe/` | 11 wpisów roślin z opisami uprawy                 | `src/content/plants/`, strona `/kwiaty-balkonowe/`                |
| `/rabatowe/`         | 2 krótkie wpisy (pelargonia rabatowa, niecierpek) | `src/content/plants/`, **301 na `/kwiaty-balkonowe/`**            |
| `/chryzantemy/`      | Akapit o typach, kolorach, cenach i dowozie       | Wpis `chryzantema-wielkokwiatowa.md` + akapity na `/chryzantemy/` |
| `/o-nas/`            | Historia gospodarstwa                             | `src/content/pages/historia.md`, strona `/o-nas/`                 |
| `/kontakt-2/`        | Cztery telefony i adres                           | `src/data/contact.ts`, strona `/kontakt/`                         |

Trzy z pięciu starych adresów zostały 1:1 - oferta jest realnymi podstronami, a nie kotwicami
na stronie głównej. Czwarty, `/rabatowe/`, przestał istnieć we wrześniu 2026 i dostaje 301 -
patrz [Scalenie oferty](#scalenie-oferty---wrzesień-2026). Mapa przekierowań:
[`przekierowania.md`](przekierowania.md).

## Rośliny

Handoff projektowy ostrzegał przed „kilkudziesięcioma” wpisami i zalecał zaprojektowanie
filtrowania i paginacji. Przez rok było ich 19 i ostrzeżenie było bezprzedmiotowe.
**Po wrześniu 2026 jest ich 40** - patrz [Dwadzieścia jeden nowych
opisów](#dwadzieścia-jeden-nowych-opisów--wrzesień-2026) - i po scaleniu oferty dzielą się na
trzy strony po 34, 2 i 4 wpisy. Handoff okazał się mieć rację co do skali, ale nadal nie co do
rozwiązania: filtrowania nie dodano, bo na `/kwiaty-balkonowe/` filtrować nie ma po czym -
wszystkie 34 wpisy to jedna grupa, a wpisy są długie, więc paginacja rozbiłaby stronę, na
którą ludzie przychodzą z wyszukiwarki po nazwie pojedynczej rośliny.

**Odpowiedź na skalę już w repozytorium jest i nie trzeba jej projektować:** `OfferSection`
renderuje nad wpisami nawigację „Na tej stronie” - spis wszystkich roślin grupy jako kotwice
(`aria-label="Spis roślin na tej stronie"`, warunek `entries.length > 1`). Przy 2 wpisach
była ozdobą, przy 34 jest głównym sposobem poruszania się po stronie i to ona przejmuje
robotę, którą handoff chciał dać filtrowi. **Punkt „do obserwacji” został zamknięty właśnie
tak, jak tu zapowiedziano** - przy scaleniu oferty spis dostał nowy układ (grupowanie po
literze), a nie filtr i nie paginację. Patrz [Scalenie oferty](#scalenie-oferty---wrzesień-2026).

Balkonowe (34): alstromeria, fuksja, pelargonie bluszczolistne, tunbergie, werbena, goździk,
heliotrop, sundaville, dahlie, calibrachoa, begonia, bidens, wilczomlecz, petunie i surfinie,
plektrantus, dichondra, helichrysum, hypoestes, ipomoea, lobelia, sanvitalia, bakopa oraz -
po scaleniu z dawną grupą `Rabatowe` we wrześniu 2026 - pelargonie rabatowe, niecierpek
nowogwinejski, hortensja, koleus, orlik, wrzos, funkia, gazania, trytoma, łubin, szałwia,
aksamitka. Na stronie stoją alfabetycznie, nie w tej kolejności; patrz
[Scalenie oferty](#scalenie-oferty---wrzesień-2026).
Bratki (2): bratek ogrodowy i prymulka - nowa grupa i nowy adres `/bratki/`, wrzesień 2026;
patrz niżej. **Opis prymulki, tak jak opis drobnokwiatowej, powstał u nas, nie u właścicieli**

- patrz [Prymulki](#prymulki--zamknięte-we-wrześniu-2026).
  Chryzantemy (3): chryzantema wielkokwiatowa, średniokwiatowa, drobnokwiatowa -
  wielkokwiatowa i średniokwiatowa dopisane we wrześniu 2026 z tekstu właścicieli, patrz niżej.
  **Igiełkowa była czwarta i została zwinięta do średniokwiatowej** jeszcze w tym samym
  miesiącu; jej opis stoi w całości w [Chryzantema igiełkowa
  zwinięta](#chryzantema-igiełkowa-zwinięta-do-średniokwiatowej---wrzesień-2026).
  **Drobnokwiatowa jest wyjątkiem i jedynym na całej stronie:** jej opis powstał u nas, nie
  u właścicieli - patrz [Chryzantema drobnokwiatowa](#chryzantema-drobnokwiatowa--wrzesień-2026).
  Kolejność wpisów idzie malejącą wielkością kwiatu (wielko → średnio → drobno), a igiełkowa
  stoi na końcu, bo to już nie rozmiar, tylko kształt płatka; `order` jest globalny, więc
  dołożenie drobnokwiatowej przesunęło igiełkową na 17, a bratka na 18.

## Co zostało zmienione w treści

**Ta sekcja opisuje stan sprzed września 2026.** Opisy 14 roślin spoza grupy chryzantem
nie pochodzą już ze starej strony - właściciele nadesłali własne, napisane od nowa; patrz
[Wymiana opisów](#wymiana-opisów--wrzesień-2026). Poniższe nadal obowiązuje dla historii
gospodarstwa i dla chryzantem.

Opisy uprawy zostały przeniesione **dosłownie** - to była najmocniejsza rzecz na starej
stronie i powód, dla którego trafiają na nią ludzie z wyszukiwarki. Poprawione zostały
wyłącznie literówki i interpunkcja:

- `pół-cieniste` → `półcieniste`, `pół cienistych` → `półcienistych`, `pół-cień` → `półcień`;
- `Podlewać ją powinno się bardzo systematyczne` → `systematycznie`;
- `kompletnie nie odporna` → `nieodporna`; `tworzyć grupowe kompozycję` → `kompozycje`;
- `Bylina` w środku zdania → `bylina`; nazwy gatunkowe w środku zdania z małej litery
  (`Heliotrop peruwiański` → `heliotrop peruwiański`, `Niecierpka Nowogwinejskiego` →
  `niecierpka nowogwinejskiego`);
- w historii: `MINISTRA ROLNICTWA…` i `KRZYSZTOFA JURGIELA` z wersalików na zapis zwykły,
  `22 Lipiec 2016` → `22 lipca 2016`.

Zdania typu „Dostępna w naszym gospodarstwie w kolorach:” zostały wyjęte z opisu tam, gdzie
po nich szła lista - kolory renderują się teraz jako osobny blok „Dostępne kolory”, zgodnie
z projektem. Tam, gdzie stara strona pisze tylko „w różnych kolorach”, zdanie **zostaje
w opisie** i wpis nie ma chipów - żadne kolory nie są zmyślane.

## Wymiana opisów - wrzesień 2026

Właściciele nadesłali własne opisy uprawy **wszystkich 14 roślin spoza grupy chryzantem**.
Zastąpiły one w całości tekst przeniesiony ze starej strony (11 wpisów) i zamknęły trzy
luki: `pelargonia-rabatowa.md` i `bratek-ogrodowy.md` miały dotąd po jednym zdaniu
„Oferujemy sprzedaż…”, a `niecierpek-nowogwinejski.md` dwa zdania.

Decyzja: **tekst właścicieli wchodzi w całości i bez dopisków.** Nic nie jest do niego
dorzucane ze starej strony ani z wiedzy ogrodniczej. Zdania, które przy tej wymianie
wypadły, są spisane niżej - nie po to, żeby je po cichu przywrócić, tylko żeby właściciele
mogli zdecydować.

### Fakty - limit podniesiony do czterech

Właściciele wypunktowali pod opisami po 4–6 linii. Schemat dopuszczał trzy, bo handoff
(`docs/design/README.md`, sekcja o wpisie rośliny) specyfikuje `<dl>` z **trzema** faktami.
`facts` w `src/content.config.ts` przyjmuje teraz **cztery** - to świadome odstępstwo od
handoffu. Siatka faktów jest `auto-fit minmax(min(100%, 150px), 1fr)`, więc czwarty fakt
zawija się do drugiego rzędu i nic się nie łamie.

Etykiety zostały ustandaryzowane do jednego słownika, renderowanego zawsze w tej kolejności

- ona jest też regułą wyboru, gdy kandydatów jest więcej niż cztery:

`Wysokość` / `Długość pędów` / `Średnica kwiatu` / `Pokrój` → `Kwitnienie` → `Stanowisko` →
`Podlewanie` → `Podłoże` → `Uprawa` → `Zimowanie` → `Odmiany` → `Charakter` → `Sprzedaż`.

**`Pokrój` i `Podłoże` doszły we wrześniu 2026** z 21 nadesłanymi opisami, w których
wystąpiły odpowiednio 14 i 6 razy - za często, by je zwijać do czegoś innego. `Pokrój`
stanął w pierwszym gnieździe, obok miar wielkości, bo jest jak one własnością formy rośliny
i żaden wpis nie ma obu naraz. `Podłoże` stanęło zaraz za `Podlewaniem`, bo oba mówią
o pielęgnacji. Zwinięte przy tej samej okazji: `Walor dekoracyjny` → `Charakter`,
`Główna ozdoba` → `Charakter`, `Kolor kwiatów` / `Kwiaty` / `Dostępne kolory` → chipy
`colors`, a nie fakt.

Zwinięte synonimy: `Zastosowanie` → `Uprawa` (goździk), `Walor` → `Charakter` (heliotrop),
`Dostępność` → `Sprzedaż` tam, gdzie oznaczało okno sprzedaży (fuksja: „wiosna”),
a → `Odmiany` tam, gdzie oznaczało asortyment („różne gatunki, odmiany i kolory”). `Odmiany`
stoi wyłącznie przy wpisach bez chipów kolorów. `Pochodzenie` (heliotrop, jedyne użycie)
nie weszło do słownika - zostaje w treści opisu.

Kandydatami są **wyłącznie linie, które właściciele sami wypunktowali**. Dwa wyjątki:
`pelargonia-rabatowa.md` i `niecierpek-nowogwinejski.md` nie mają wypunktowania, więc ich
fakty pochodzą ze zdań mówiących to wprost („posadzona bezpośrednio na rabacie, jak
i w donicach, skrzynkach”; „na stanowiskach słonecznych”). Chryzantemy nietknięte - ich
`Forma` / `Stanowisko` / `Sprzedaż` pochodzą z osobnej paczki tekstu.

### Kolory - ujednolicenia z nadesłanego tekstu

- `pelargonia-rabatowa.md`: `bordo` → `bordowy`, `ciemno-różowy` → `ciemnoróżowy`.
- `pelargonia-bluszczolistna.md`: `bordo` → `bordowy`, `lila jasny` → `jasny lila`.
- `niecierpek-nowogwinejski.md`: zostało **`biskupi`**. W nadesłanym tekście jest
  „biszkupi” - potraktowane jako literówka. **Do potwierdzenia.**
- `bratek-ogrodowy.md`: lista w nadesłanym tekście jest identyczna z tą w pliku, czyli
  **potwierdza** chipy odczytane wcześniej ze zdjęć. Ten punkt schodzi z listy braków.

### Co wypadło ze starych opisów - do decyzji właścicieli

| Wpis                      | Czego nowy tekst nie powtarza                                                                                    |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| alstromeria               | „jest to bylina”; „z jednego kłącza wyrasta po kilka pędów”                                                      |
| fuksja                    | „starsze pędy drewnieją u podstawy, młode są zielone i wiotkie”                                                  |
| pelargonia bluszczolistna | „odstrasza niepożądane owady (np. komary)”; „najbardziej światłolubny gatunek pelargonii”; „do dekoracji wnętrz” |
| tunbergia                 | „pędy słabo rozgałęzione”; „kwiat wieloletni”; **„dostępna w okresie wiosennym”**                                |
| werbena                   | **„dostępna w okresie wiosennym w różnych kolorach i wielkościach”**                                             |
| heliotrop                 | „dostępny w różnych rozmiarach”                                                                                  |
| sundaville                | „bardzo modna, hit sprzedaży wielu sezonów”; „kształtne, owalne i wydłużone listki”                              |
| dahlia                    | „stanowisko odchwaszczone”                                                                                       |
| calibrachoa               | „prawie całkowicie odporne na deszcz i wiatr” - nowy tekst osłabia to do „stosunkowo odporna”                    |
| begonia                   | „rośliny dla osób początkujących”; „popularne rośliny pokojowe”                                                  |

**Najważniejsze z tej listy:** tunbergia i werbena tracą jedyną informację o oknie
sprzedaży. Fuksja swoje zachowała, bo właściciele wpisali je w wypunktowanie
(`Sprzedaż: Wiosna`). Jeśli tunbergia i werbena też są wiosenne, wystarczy dopisać im ten
sam fakt.

Drobiazg do potwierdzenia przy okazji: nagłówek wpisu brzmi **Alstromeria**, a nadesłany
tekst pisze **Alstroemeria**. Obie pisownie pochodzą od właścicieli (starsza ze starej
strony), więc żadna nie została poprawiona samowolnie. Adres kotwicy to `#alstromeria`
i zostaje bez zmian niezależnie od decyzji.

## Skrócenie opisów - wrzesień 2026

Właściciele poprosili, żeby opisy pozycji były **bardziej kompaktowe i ustandaryzowane** -
„nie takie, że na jednej pozycji jest krótki, a na drugiej długi" - i **żeby nic nie było
dopisywane od nas.**

Stan przed zmianą, zmierzony na wszystkich 39 wpisach:

| Kształt   | Ile wpisów | Słowa   |
| --------- | ---------- | ------- |
| 3 akapity | 28         | 95–113  |
| 4 akapity | 4          | 108–137 |
| 2 akapity | 3          | 63–80   |
| 1 akapit  | 4          | 44–58   |

Uzgodniony cel: **2 akapity, 65–80 słów.** Po zmianie 32 skrócone wpisy mieszczą się
w 66–78 słowach, wszystkie po dwa akapity.

### Jak cięto

Wpisy miały jednakową budowę: akapit 1 = czym roślina jest i jak wygląda; akapit 2 = pokrój
i zastosowanie; akapit 3 = stanowisko, podłoże, podlewanie, nawożenie; akapit 4 (gdy był) =
zimowanie albo zdanie handlowe. Nowy kształt to akapit 1 bez zmiany roli, a akapit 2 złożony
ze zdania o zastosowaniu i zdania o stanowisku.

**Usuwano całe zdania; zdania, które zostały, zostały dosłownie.** Tam, gdzie zdanie trzeba
było przyciąć, cięcie szło po granicy członu (przecinek, myślnik), a reszta została słowo
w słowo. Jedyne zmiany mechaniczne to wielka litera na początku zdania, które teraz otwiera
akapit, i kropka w miejscu uciętego przecinka. Nie dopisano ani jednego słowa i jest to
sprawdzalne mechanicznie: każde słowo nowej wersji występuje w wersji sprzed zmiany.

Kolejność usuwania: najpierw zdania o nawożeniu i o unikaniu zastojów wody, potem zdania
powtarzające wprost linię z `facts`, potem zdania czysto handlowe i anegdotyczne, na końcu
drugie i trzecie zdanie o zastosowaniu, gdy powtarzało pierwsze.

**Czego nie ruszano:** zdań nazywających konkretny kolor (proza jest jedynym miejscem, gdzie
kolory zostały po zdjęciu chipów - patrz „Kolory - ujednolicenia z nadesłanego tekstu"),
ogólnego „dostępna w różnych kolorach" tam, gdzie było jedyną wzmianką o kolorze, a także
`facts`, zdjęć i całego frontmatteru.

### Czego nie zrobiono

**Siedem wpisów zostało bez zmian**, bo były już krótsze od celu, a rozbudowanie ich
oznaczałoby dopisanie naszego tekstu: `bratek-ogrodowy` (80 słów), `pelargonia-rabatowa`
(70), `niecierpek-nowogwinejski` (63), `chryzantema-drobnokwiatowa` (58), `prymulka` (52),
`chryzantema-sredniokwiatowa` (46), `chryzantema-wielkokwiatowa` (44). Pełna jednolitość jest
więc nieosiągalna z tej strony - **domknąć ją mogą tylko właściciele**, dopisując do tych
siedmiu. Dwa z nich (`chryzantema-drobnokwiatowa`, `prymulka`) są zresztą nasze, nie ich.

### Co wypadło z opisów - do decyzji właścicieli

Poniżej wszystko, co zniknęło. „(skrócone)" oznacza zdanie, które zostało, ale bez końcówki.

| Wpis                      | Czego nowy tekst nie powtarza                                                                                                                                                                                                            |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| aksamitka                 | połączenia z innymi roślinami sezonowymi; odporność na okresowe przesuszenie; usuwanie przekwitłych kwiatostanów                                                                                                                         |
| alstromeria               | trwałość i bogata kolorystyka kwiatów; podlewanie i zastoje wody; „nie jest odporna na polskie mrozy" (zostaje w fakcie `Zimowanie: Nie zimuje w gruncie`)                                                                               |
| bakopa                    | zestawienia z pelargoniami, petuniami, surfiniami, werbenami; wilgotność ziemi w upały                                                                                                                                                   |
| begonia                   | „dla osób rozpoczynających przygodę z roślinami" (skrócone); wilgotne podłoże i przelewanie; dostosowanie podlewania do temperatury; różnorodność gatunków i odmian                                                                      |
| bidens                    | łączenie z innymi roślinami balkonowymi; nawożenie w okresie wzrostu                                                                                                                                                                     |
| calibrachoa               | **anegdota o nazwie Million Bells**; odporność na deszcz i wiatr; podlewanie, gdy podłoże przesycha; nawozy o zakwaszającym działaniu; „choć dobrze radzi sobie w miejscach osłoniętych" (skrócone)                                      |
| dahlia                    | **średnica kwiatu nawet 30 cm** (skrócone - zostaje pierwsza połowa zdania); podlewanie w upały i w pojemnikach; słabsze kwitnienie przy niedoborze wody                                                                                 |
| dichondra                 | kontrast srebrzystych liści z pelargoniami, petuniami, surfiniami, bidensami; przepuszczalne podłoże i problemy z korzeniami                                                                                                             |
| fuksja                    | zrzucanie liści i kwiatów przy przesuszeniu (skrócone); zdanie zamykające o ożywieniu przestrzeni                                                                                                                                        |
| funkia                    | „w żyznym, próchnicznym i umiarkowanie wilgotnym podłożu" (skrócone); **„dobrze zimują w naszym klimacie"**; dopasowanie odmian do wielkości ogrodu                                                                                      |
| gazania                   | długie i obfite kwitnienie jako największa zaleta (jest w fakcie `Kwitnienie`); lekkie podłoże i rzadkie podlewanie (jest w faktach `Podłoże` i `Podlewanie`)                                                                            |
| goździk                   | uniwersalność w aranżacjach; komponowanie z innymi roślinami kwitnącymi; „co pozwala dopasować rośliny do charakteru każdego ogrodu" (skrócone)                                                                                          |
| helichrysum               | zestawienia z pelargoniami, petuniami, surfiniami, bidensami, werbeną; unikanie nadmiernego podlewania                                                                                                                                   |
| heliotrop                 | drobne kwiaty zebrane w kwiatostany; uprawa w ogrodzie i w donicach                                                                                                                                                                      |
| hortensja                 | **zwarte krzewy o różnej wielkości zależnie od gatunku i odmiany**; żyzne, próchniczne podłoże; podlewanie w upały i podczas kwitnienia                                                                                                  |
| hypoestes                 | przypalanie liści przez bezpośrednie słońce i utrata wybarwienia przy niedoborze światła; wilgotne podłoże i regularne podlewanie                                                                                                        |
| ipomoea                   | szybkie tworzenie bujnej dekoracji; podlewanie w okresie wzrostu i w upały                                                                                                                                                               |
| koleus                    | sadzenie samodzielne lub jako kolorowe tło; żyzne i umiarkowanie wilgotne podłoże; zaleganie wody                                                                                                                                        |
| lobelia                   | „z pelargoniami, petuniami, surfiniami czy bidensami" (skrócone); żyzne podłoże i regularne podlewanie; wilgotność ziemi w upały                                                                                                         |
| łubin                     | rabaty bylinowe, ogrody wiejskie i naturalistyczne, nasadzenia grupowe; komponowanie z bylinami i trawami ozdobnymi; „jednak nie toleruje długotrwałego zalegania wody" (skrócone)                                                       |
| orlik                     | „dzięki czemu sprawdza się w ogrodach naturalistycznych i klasycznych aranżacjach" (skrócone); małe wymagania uprawowe; **„orliki są mrozoodporne, mogą przez wiele lat zdobić ogród"** (jest w fakcie `Charakter: Bylina mrozoodporna`) |
| pelargonia bluszczolistna | podlewanie w upalne dni; **„na słonecznych balkonach 1–2 razy dziennie"**                                                                                                                                                                |
| petunie i surfinie        | podlewanie w upały i w pojemnikach; nawożenie roślin kwitnących; zdanie o szybkim rozrastaniu się i efekcie pełnej kompozycji                                                                                                            |
| plektrantus               | „dlatego idealnie nadaje się do wiszących pojemników, skrzynek balkonowych oraz kompozycji z roślinami kwitnącymi" (skrócone); podlewanie i nadmiar wody                                                                                 |
| sanvitalia                | zestawienia z pelargoniami, petuniami, surfiniami, werbenami; podlewanie w upały i przelewanie                                                                                                                                           |
| sundaville                | „choć może również poradzić sobie w półcieniu - w takich warunkach kwitnienie może być mniej intensywne" (skrócone do pierwszej połowy); umiarkowane podlewanie; wrażliwość na przesuszenie i nadmiar wody                               |
| szałwia                   | „w ogrodzie oraz na balkonach i tarasach" (skrócone); „tworząc efektowne zestawienia kolorystyczne" (skrócone); nawożenie roślin kwitnących                                                                                              |
| trytoma                   | kępy wąskich liści ze sztywnymi pędami; żyzne, przepuszczalne podłoże (jest w fakcie `Podłoże`); zastoje wody; **„w chłodniejszych rejonach Polski warto zabezpieczyć roślinę na zimę"**                                                 |
| tunbergia                 | podlewanie nawet dwa razy dziennie w upalne dni                                                                                                                                                                                          |
| werbena                   | ząbkowane liście jako tło dla kwiatostanów; „kwitnie długo — od lipca aż do końca października" (jest w fakcie `Kwitnienie: Lipiec – październik`)                                                                                       |
| wilczomlecz               | uprawa w donicach, skrzynkach i pojemnikach; „dlatego sprawdzi się w kompozycjach wymagających mniejszej ilości wody" (skrócone)                                                                                                         |
| wrzos                     | sadzenie pojedyncze lub w wielobarwnych kompozycjach; podlewanie po posadzeniu i w okresach bezdeszczowych; **„przy odpowiednich warunkach może przez wiele lat zdobić ogród"**                                                          |

**Najważniejsze z tej listy** - pogrubione wyżej zdania niosą informację, której nie ma
nigdzie indziej na stronie: zimowanie funkii, zabezpieczanie trytomy na zimę, częstotliwość
podlewania pelargonii bluszczolistnej, średnica kwiatu dalii, wielkość krzewów hortensji,
długowieczność wrzosu i anegdota o nazwie Million Bells przy calibrachoi. Mrozoodporność orlika
wyglądała podobnie i stała w jego `facts`, więc nie znikała ze strony - **od września 2026 już
tam nie stoi**: `Charakter: Bylina mrozoodporna` wypadło przy przejściu na cztery gniazda
([Cztery gniazda faktów](#cztery-gniazda-faktów---wrzesień-2026)), więc ta informacja jest teraz
w tej samej sytuacji, co pozostałe pozycje z tej listy. Jeśli któreś z nich
ma wrócić, wraca kosztem innego zdania w tym samym wpisie - inaczej wpis przestaje pasować do
reszty, a o to właśnie chodziło w tej zmianie.

## Rozbieżności między handoffem a treścią klienta

Wszędzie wygrała treść klienta. Do przejrzenia z właścicielami:

1. **Kolory pelargonii bluszczolistnej.** Handoff: czerwony, różowy, łososiowy, biały, lila,
   dwubarwny. Stara strona: bordo, czerwony, pomarańczowy, różowy, lila jasny, biały.
   Użyto listy ze strony.
2. **Kolory chryzantem.** Handoff: biały, żółty, bordowy, różowy, pomarańczowy, fioletowy.
   Stara strona: biały, żółty, fiolet, złoty. Użyto listy ze strony - i **wszystkich trzech
   typów naraz**, bo zdanie klienta brzmi „wielkokwiatowe, średniokwiatowe i igiełkowe
   w kolorach: …”. Wcześniej czwórka wisiała jako lista samej wielkokwiatowej, co było
   błędem migracji. **Nadal do zrobienia:** właściciele wybrali osobne listy dla każdego typu
   i ich nie podali, a na ich własnych zdjęciach widać pomarańczowy i różowy, których w tej
   czwórce nie ma. Do czasu podania **cztery** wpisy pokazują identyczne chipy - od września
   2026 razem z drobnokwiatową.
   **Propozycja czekająca na potwierdzenie (wrzesień 2026):** przy drobnokwiatowej podano
   siedem kolorów - biały, żółty, różowy, czerwony, fioletowy, brązowy, złoty. Nie weszły:
   nie pochodzą od właścicieli, a lista kolorów na stronie hodowcy jest obietnicą składaną
   klientowi przy telefonie. Wpis dostał tę samą czwórkę co trzy pozostałe, żeby jeden typ nie
   wyglądał na udokumentowany lepiej niż reszta. Gdyby właściciele tę siódemkę potwierdzili,
   dwie rzeczy do zrobienia: ujednolicić „fioletowy” do „fiolet” (tak brzmi chip w pozostałych
   wpisach) i przy okazji zamknąć cały ten punkt dla wszystkich czterech typów naraz.
3. **Opis chryzantemy wielkokwiatowej - zamknięte we wrześniu 2026.** Pochodził z handoffu,
   bo stara strona nie miała opisu uprawy chryzantem, tylko akapit o typach i cenach.
   Właściciele podali własne opisy trzech typów (wielko-, średnio- i igiełkowej), a tekst
   projektanta został usunięty. „Fakty” (Forma „Doniczkowa”, Stanowisko „Słońce, osłonięte”, Sprzedaż
   „1.10 – 1.11”) też były z handoffu - właściciele je potwierdzili i rozciągnęli na
   wszystkie trzy typy, więc stoją przy każdym wpisie; drobnokwiatowa dostała tę samą trójkę,
   bo Forma i Stanowisko są dla całej grupy takie same, a Sprzedaż mówi okno z `season.ts`.
   Usunięty akapit, gdyby miał wrócić: „Uprawiana w doniczkach, z jednym dużym kwiatem na
   pędzie. Wymaga stanowiska słonecznego i osłoniętego od wiatru oraz regularnego podlewania
   - w chłodne noce warto ją okryć. Na cmentarz i pod dom kupowana najczęściej w ostatnim
     tygodniu października; wtedy wybór kolorów jest największy, ale i ruch największy.”
     **Uwaga:** opisy właścicieli mówią wyłącznie o budowie kwiatu. Strona nie ma dziś żadnej
     treści o samej uprawie chryzantem ani o tym, kto je kupuje - to strata dla wyszukiwarki.
4. **Zdanie wprowadzające na `/chryzantemy/`** - „Duży wybór kolorów. Sprzedaż zaczyna się
   od początku października i trwa do 1 listopada.” - **usunięte na życzenie właścicieli**
   (wrzesień 2026). Termin sprzedaży mówią teraz „fakty” przy każdym z czterech wpisów,
   a kolory - chipy. Opis strony (meta description) nadal podaje termin, więc dla
   wyszukiwarki nic nie przepadło.
   **Uwaga, żeby tego nie przeczytać za szeroko:** usunięte zostało **konkretne zdanie**,
   bo powtarzało daty i kolory, a nie sama idea zdania wprowadzającego. Od
   [wyrównania lidów](#wyrównanie-lidów---wrzesień-2026) `/chryzantemy/` znowu ma lid - ten
   wspólny, który nie podaje ani terminu, ani kolorów.
5. **Logo.** Handoff mówi, że logotypu nie ma. Stara strona ma go w
   `wp-content/uploads/2019/09/cropped-logo2-*.jpg`. Do decyzji, czy wraca.

## Chryzantema drobnokwiatowa - wrzesień 2026

Czwarty typ w grupie. **Jedyny wpis rośliny na całej stronie, którego opisu nie napisali
właściciele** - szkic powstał u nas i został tylko lekko wygładzony pod konwencję trzech
sąsiadów. To odstępstwo od reguły „nie przepisuj opisów roślin” z `CLAUDE.md` i jest tu
zapisane, żeby nikt go później nie wziął za tekst właścicieli.

**Co dokładnie zmieniono w szkicu.** Dwie rzeczy, obie stylistyczne, żadna rzeczowa:
„dużą liczbą” / „w dużej liczbie” w sąsiednich zdaniach (powtórzenie) oraz zakończenie
„Jest to typ szczególnie ceniony za…”, które jest dosłownie tą samą formułą, na której
kończy się wpis igiełkowej. Sensu ani jednego zdania nie ruszono.

**Czego świadomie nie dopisano.** Opis mówi wyłącznie o budowie kwiatu, tak jak trzy
pozostałe. Kusiło, żeby przy okazji zamknąć lukę z punktu 3 w „Rozbieżnościach” - strona nie
ma ani zdania o samej uprawie chryzantem, co jest stratą dla wyszukiwarki - ale treść
o stanowisku, podlewaniu i okrywaniu przy przymrozkach byłaby wiedzą ogólną, a nie słowem
gospodarstwa. Ta luka zostaje otwarta i domyka się dla **czterech typów naraz**, z tekstem od
właścicieli, nie wpisem po wpisie.

**Kolejność i `order`.** Wpis dostał `order: 16`, przed igiełkową, więc strona czyta się jako
malejąca wielkość kwiatu: wielko → średnio → drobno, a igiełkowa na końcu, bo to kształt
płatka, nie rozmiar. Sam opis średniokwiatowej to zakłada („w porównaniu z chryzantemą
wielkokwiatową ma drobniejsze kwiaty”). `order` jest globalny i ciągły, więc kosztowało to dwie
linijki: igiełkowa 16 → 17, bratek ogrodowy 17 → 18. Wielkokwiatowa zostaje pierwsza w grupie,
więc znacznik `priority` (zdjęcie ładowane eagerly jako prawdopodobny LCP) się nie przeniósł.

**Zdjęcie.** `src/assets/plants/chryzantema-drobnokwiatowa.jpg`, 1500×2000 - ta sama geometria
co igiełkowa i średniokwiatowa. Źródło **z profilu Facebook gospodarstwa**, 1536×2048, bez
flagi EXIF orientacji; jedyne, co z nim zrobiono, to zejście pod próg 2000 px (przekodowania
nie dało się uniknąć, bo 2048 > 2000). Nie przycięto go: `PlantEntry` ma podłogę proporcji
na 3:4, więc kadr 3:4 wchodzi w ramkę bez obcięcia. To pierwszy kadr w repo wzięty
z Facebooka gospodarstwa, a nie nadesłany ani wydobyty z biblioteki mediów starej strony.

**Opis `alt` nie nazywa typu** - mówi o kolorach i budowie. Wpis wielkokwiatowej robi inaczej,
ale dwa pozostałe nie, a nagłówek nad zdjęciem i tak brzmi „Chryzantema drobnokwiatowa”, więc
czytnik ekranu usłyszałby nazwę dwa razy pod rząd. Reguła jest ta sama co przy
`chrysanthemumStrip` i `historyPhoto`: kolory tak, gatunek ze zdjęcia nie.

**Do potwierdzenia przez właścicieli:** cały opis, `alt`, oraz lista kolorów - patrz punkt
2 w [Rozbieżnościach](#rozbieżności-między-handoffem-a-treścią-klienta), gdzie leży
propozycja siedmiu kolorów, która nie weszła.

## Podpisy pod zdjęciami - usunięte

**Wrzesień 2026: właściciele kazali je zlikwidować.** Podpisów nie ma pod żadnym wpisem
rośliny, a pole `caption` zniknęło ze schematu (`src/content.config.ts`), z `PlantEntry.astro`
i z 14 plików treści. **To odstępstwo od handoffu**, który przewidywał jednozdaniowy podpis
przy każdej roślinie (`<figcaption>` `0.8rem`, `#5B6153`) - świadome i na życzenie klienta.

Nie dotyczy to **pokazu slajdów**: tam każdy slajd nadal ma swój `<figcaption>` i jest to
treść redakcyjna, a nie powtórzenie `alt` - rodzaj obsadzenia, nazwa, opis i lista roślin.
Usunięcie tamtych byłoby stratą treści.

**Podgląd na wierzchu strony podpisu już nie ma - wrzesień 2026, na polecenie właściciela.**
Zdanie, które tu stało („to samo w lightboxie"), było niepoprawne: `lightbox.ts` ustawiał
`image.alt` **i** `caption.textContent` na ten sam tekst zdjęcia-miniatury, więc czytnik
ekranu czytał go dwa razy, a widzący dostawali pod fotografią zdanie, które opisuje to, na co
właśnie patrzą. Usunięcie samego `<figcaption>` nie jest więc regresją dostępności - opis
został tam, gdzie jest potrzebny, czyli w `alt` obrazka w podglądzie. `<figure>` bez podpisu
przestał mieć rolę i jest teraz zwykłym `<div>`; `.lightbox__caption` zniknęło z
`global.css`.

**Jeden podpis wrócił - wrzesień 2026, na polecenie właścicieli.** Zdjęcie w bloku historii
na `/o-nas/` ma `<figcaption>` „Na wystawie kwiatów w Końskowoli”. To nie jest cofnięcie
decyzji powyżej: tamta dotyczyła czternastu jednozdaniowych podpisów pod wpisami roślin,
pisanych na podstawie tekstu klienta, a ten nazywa **miejsce**, którego zdjęcie nie jest
w stanie podać samo i którego `alt` podawać nie powinien. `alt` celowo go nie powtarza -
dublowanie podpisu w `alt` to defekt, który `Compositions.astro` już raz musiał naprawić.
Podpisy pod wpisami roślin zostają usunięte i to się nie zmienia.

Dla historii: podpisy były napisane na podstawie własnego tekstu klienta (np. dla fuksji
„Nie znosi pełnego słońca - najlepiej rośnie w półcieniu, osłonięta od wiatru”); dwa wpisy
rabatowe nigdy podpisu nie miały, bo ich opisy są dwuzdaniowe.

## „Fakty” przy roślinach

Trzykolumnowy wiersz Wysokość / Stanowisko / Zimowanie to pomysł projektanta - na starej
stronie takich danych nie ma.

**Do września 2026 obowiązywała tu zasada „tylko to, co mówi opis klienta”**: gdzie opis
milczał, pole nie istniało, i nic nie było dopisywane z wiedzy ogólnej o roślinach. Dlatego
goździk miał dwa fakty, niecierpek dwa, a pelargonia rabatowa jeden. Ta zasada **została
odwrócona** - patrz niżej. Powód, dla którego stała, jest nadal dobry i nadal obowiązuje
wszędzie indziej: to ten sam powód, dla którego `/faq/` ma tylko sześć pytań.

### Cztery gniazda faktów - wrzesień 2026

Bloki faktów były nierówne: 31 wpisów miało cztery, osiem miało od jednego do trzech,
a etykiety dobierała lista priorytetów, więc sąsiadujące wpisy pokazywały różne rzeczy
w różnej liczbie wierszy. Właściciele poprosili o ujednolicenie.

**Każdy z 39 wpisów ma teraz dokładnie cztery fakty, a trzy pierwsze etykiety są wszędzie te
same.** `src/content.config.ts` egzekwuje to przez `.length(4)` - wpis z trzema wywala build.

| #   | Etykieta                                                    | Reguła                                                                                                                            |
| --- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `Wysokość` / `Długość pędów` / `Średnica kwiatu` / `Pokrój` | Jedno gniazdo, tak jak słownik traktował je od początku. Miara przy sześciu wpisach, które ją mają; `Pokrój` przy pozostałych 33. |
| 2   | `Stanowisko`                                                | Zawsze.                                                                                                                           |
| 3   | `Podlewanie`                                                | Zawsze.                                                                                                                           |
| 4   | `Uprawa`                                                    | Domyślnie. Ustępuje miejsca faktowi, który przy tej roślinie mówi więcej.                                                         |

**Wyjątki w gnieździe 4** - dziewięć wpisów. Kryterium jest wąskie: fakt musi już istnieć
i nieść informację, której nigdzie indziej na stronie nie ma.

- `Sprzedaż` - `bratek-ogrodowy`, `prymulka`, trzy chryzantemy, `fuksja`.
- `Zimowanie` - `alstromeria` („Nie zimuje w gruncie”) i `gozdzik` („Zimuje w gruncie”).
  Przy roślinie sezonowej to jedyna informacja, która mówi, czy kupujesz ją na jeden rok.
- `Podłoże` - **tylko `wrzos`** („Kwaśne, przepuszczalne”). Odczyn gleby decyduje
  o powodzeniu uprawy wrzosu; „żyzne, przepuszczalne” przy orliku, funkii i trytomie było
  poradą prawdziwą dla większości roślin, więc nie różnicowało niczego i wypadło.

Sześć wpisów miało docelowy kształt już wcześniej i nie zostało ruszonych: `dichondra`,
`hypoestes`, `ipomoea`, `plektrantus`, `pelargonia-bluszczolistna`, `tunbergia`.

### Co wypadło z faktów - 36 pozycji

Żadne z tych zdań nie znika ze strony po cichu: `Kwitnienie`, `Charakter` i `Odmiany`
w większości powtarzały zdanie, które stoi w opisie wpisu kilka centymetrów wyżej
(„największą dekoracją są duże, efektowne liście” → `Charakter: Duże, ozdobne liście`).
Najmniejsza strata to `Kwitnienie` z dwunastu wpisów - wartości brzmiały „Obfite,
długotrwałe” / „Długie i obfite” / „Bardzo obfite” i przy dwunastu wpisach obok siebie
przestały cokolwiek różnicować.

**Trzy pozycje z tej listy to realna strata** i są do rozważenia przy następnej rozmowie
z właścicielami: `gozdzik` stracił naraz `Uprawa`, `Odmiany` i `Charakter: Kwiaty pachnące`
(najwięcej ze wszystkich wpisów - trzy fakty z opisu ustąpiły trzem dopisanym plus
`Zimowaniu`), `heliotrop` stracił `Charakter: Słodki, waniliowy zapach`, czyli to, po co się
tę roślinę kupuje, a `orlik` stracił `Charakter: Bylina mrozoodporna`. We wszystkich trzech
przypadkach informacja **zostaje w treści opisu** - znika z wiersza faktów, nie ze strony.

| Wpis                          | Etykieta   | Wartość                      |
| ----------------------------- | ---------- | ---------------------------- |
| `aksamitka`                   | Kwitnienie | Obfite, długotrwałe          |
| `bakopa`                      | Kwitnienie | Bardzo obfite                |
| `begonia`                     | Odmiany    | Różne gatunki i kolory       |
| `bidens`                      | Kwitnienie | Długie i obfite              |
| `bratek-ogrodowy`             | Uprawa     | Donice, skrzynki, rabaty     |
| `calibrachoa`                 | Kwitnienie | Od wiosny do jesieni         |
| `chryzantema-drobnokwiatowa`  | Forma      | Doniczkowa                   |
| `chryzantema-sredniokwiatowa` | Forma      | Doniczkowa                   |
| `chryzantema-wielkokwiatowa`  | Forma      | Doniczkowa                   |
| `dahlia`                      | Odmiany    | Różne kolory i odmiany       |
| `fuksja`                      | Uprawa     | Doniczka lub rabata          |
| `funkia`                      | Podłoże    | Żyzne, próchniczne           |
| `funkia`                      | Charakter  | Duże, ozdobne liście         |
| `gazania`                     | Kwitnienie | Długie i obfite              |
| `gazania`                     | Podłoże    | Lekkie, przepuszczalne       |
| `gozdzik`                     | Uprawa     | Rabaty, skalniaki, pojemniki |
| `gozdzik`                     | Odmiany    | Różne gatunki i kolory       |
| `gozdzik`                     | Charakter  | Kwiaty pachnące              |
| `helichrysum`                 | Podłoże    | Lekkie, przepuszczalne       |
| `heliotrop`                   | Kwitnienie | Lipiec – wrzesień            |
| `heliotrop`                   | Charakter  | Słodki, waniliowy zapach     |
| `hortensja`                   | Charakter  | Duże kwiatostany             |
| `koleus`                      | Charakter  | Wielobarwne liście           |
| `lobelia`                     | Kwitnienie | Obfite, długotrwałe          |
| `lubin`                       | Kwitnienie | Wysokie kwiatostany          |
| `orlik`                       | Podłoże    | Żyzne, przepuszczalne        |
| `orlik`                       | Charakter  | Bylina mrozoodporna          |
| `petunia-surfinia`            | Kwitnienie | Długie i obfite              |
| `prymulka`                    | Forma      | Doniczkowa                   |
| `sanvitalia`                  | Kwitnienie | Obfite, długotrwałe          |
| `sundaville`                  | Charakter  | Pnąca, długo kwitnąca        |
| `szalwia`                     | Kwitnienie | Długie i obfite              |
| `trytoma`                     | Podłoże    | Żyzne, przepuszczalne        |
| `werbena`                     | Kwitnienie | Lipiec – październik         |
| `wilczomlecz`                 | Charakter  | Delikatna, ażurowa           |
| `wrzos`                       | Uprawa     | Rabaty, skalniaki, donice    |

### Co doszło z własnego opisu wpisu - 22 pozycje

Te wartości są wyprowadzone ze zdania, które stoi w opisie tej samej rośliny, czyli powstały
na starych zasadach i **nie wymagają potwierdzenia**. Przykłady: „Jej zwisający pokrój”
→ `Pokrój: Zwisający` (calibrachoa); „tworzy zwarte, dekoracyjne kępy”
→ `Pokrój: Zwarty` (pelargonia rabatowa); „W czasie upałów warto szczególnie zadbać
o odpowiednią wilgotność podłoża” → `Podlewanie: Regularne, latem obfite` (bidens).

| Wpis                         | Etykieta   | Wartość                  |
| ---------------------------- | ---------- | ------------------------ |
| `aksamitka`                  | Uprawa     | Rabaty, skrzynki, donice |
| `bakopa`                     | Uprawa     | Skrzynki, kosze wiszące  |
| `bidens`                     | Podlewanie | Regularne, latem obfite  |
| `bratek-ogrodowy`            | Pokrój     | Zwarty                   |
| `calibrachoa`                | Pokrój     | Zwisający                |
| `chryzantema-drobnokwiatowa` | Pokrój     | Zwarty                   |
| `funkia`                     | Pokrój     | Kępiasty                 |
| `gazania`                    | Pokrój     | Zwarty                   |
| `gazania`                    | Uprawa     | Rabaty, kompozycje       |
| `helichrysum`                | Uprawa     | Donice, kosze wiszące    |
| `koleus`                     | Pokrój     | Kępiasty                 |
| `lobelia`                    | Uprawa     | Skrzynki, kosze wiszące  |
| `lubin`                      | Uprawa     | Rabaty, kompozycje       |
| `niecierpek-nowogwinejski`   | Pokrój     | Kępiasty                 |
| `orlik`                      | Pokrój     | Kępiasty                 |
| `pelargonia-rabatowa`        | Pokrój     | Zwarty                   |
| `petunia-surfinia`           | Uprawa     | Skrzynki, kosze wiszące  |
| `prymulka`                   | Pokrój     | Kępiasty                 |
| `sanvitalia`                 | Uprawa     | Skrzynki, kosze wiszące  |
| `sundaville`                 | Pokrój     | Pnący                    |
| `szalwia`                    | Uprawa     | Rabaty, donice, skrzynki |
| `wrzos`                      | Pokrój     | Kępiasty                 |

### Co doszło z wiedzy ogrodniczej - 26 pozycji, **DO POTWIERDZENIA**

**To jest odwrócenie zasady, która obowiązywała w tym pliku od początku.** Poniższych wartości
nie ma w żadnym tekście właścicieli - pochodzą z ogólnej wiedzy o tych roślinach i zostały
dopisane wyłącznie po to, żeby każdy wpis miał komplet czterech gniazd. Właściciele zgodzili
się na to pod warunkiem, że będą spisane co do jednej. Ta lista jest tym warunkiem.

Dopóki właściciele ich nie potwierdzą, są to **nasze słowa w ich imieniu** - dokładnie ta
klasa ryzyka, dla której `/faq/` nie odpowiada na pytanie o godziny otwarcia. Żadna z nich nie
jest ryzykowna ogrodniczo (to podlewanie, stanowisko i pokrój, nie dawkowanie nawozu), ale
wszystkie są wypowiedziane głosem gospodarstwa.

| Wpis                          | Etykieta   | Wartość              |
| ----------------------------- | ---------- | -------------------- |
| `alstromeria`                 | Podlewanie | Regularne            |
| `begonia`                     | Pokrój     | Zwarty lub zwisający |
| `bratek-ogrodowy`             | Stanowisko | Słońce, półcień      |
| `bratek-ogrodowy`             | Podlewanie | Regularne            |
| `chryzantema-drobnokwiatowa`  | Podlewanie | Regularne, obfite    |
| `chryzantema-sredniokwiatowa` | Pokrój     | Zwarty               |
| `chryzantema-sredniokwiatowa` | Podlewanie | Regularne, obfite    |
| `chryzantema-wielkokwiatowa`  | Pokrój     | Wzniesiony           |
| `chryzantema-wielkokwiatowa`  | Podlewanie | Regularne, obfite    |
| `dahlia`                      | Podlewanie | Regularne, obfite    |
| `fuksja`                      | Pokrój     | Zwarty lub zwisający |
| `funkia`                      | Podlewanie | Regularne            |
| `gozdzik`                     | Pokrój     | Kępiasty             |
| `gozdzik`                     | Stanowisko | Słoneczne            |
| `gozdzik`                     | Podlewanie | Umiarkowane          |
| `heliotrop`                   | Podlewanie | Regularne            |
| `heliotrop`                   | Uprawa     | Rabaty, donice       |
| `hortensja`                   | Pokrój     | Krzewiasty           |
| `niecierpek-nowogwinejski`    | Podlewanie | Regularne            |
| `orlik`                       | Podlewanie | Regularne            |
| `pelargonia-rabatowa`         | Stanowisko | Słoneczne            |
| `pelargonia-rabatowa`         | Podlewanie | Regularne            |
| `prymulka`                    | Podlewanie | Regularne            |
| `trytoma`                     | Pokrój     | Kępiasty             |
| `werbena`                     | Podlewanie | Regularne            |
| `wilczomlecz`                 | Pokrój     | Rozłożysty           |

## Zdjęcia

**Wrzesień 2026: doszły 23 własne zdjęcia** z prezentacji kwiatów - obsadzone kosze,
skrzynki i donice, część w tunelu. Leżą w `src/assets/gallery/`, opisane w
`src/data/gallery.ts`, i zasilają stronę „Inspiracje” (`/inspiracje/`),
kartę wiosenną i sekcję Historia.

Uwagi do tej paczki:

- 22 z 23 plików miały w EXIF `orientation=6`, czyli były pionowymi kadrami zapisanymi
  jako poziome. Obrót jest **wypalony** w plikach w repo - `<Picture>` nie respektuje tej
  flagi i bez tego zdjęcia stałyby bokiem. Każde nowe zdjęcie wymaga tego samego, patrz
  `README.md`.
- Źródła przeskalowano z 4000 px do 2000 px dłuższego boku: 105 MB → 15,7 MB. Oryginały
  zostają poza repo.
- **Opisy `alt` napisałem z tego, co widać na zdjęciu** - kolor, forma, otoczenie. Nazwę
  gatunku wpisywałem najpierw tylko tam, gdzie kwiat jest jednoznaczny (begonie, pelargonie,
  petunie). **Od września 2026 to już nieaktualne dla galerii:** właściciele nazwali gatunki
  we wszystkich 23 obsadzeniach, więc opisy `alt` zostały o nie uzupełnione, a kadr 13 -
  opisany jako pelargonie - okazał się niecierpkami i został poprawiony. Patrz
  [Obsadzenia](#obsadzenia--opisy-od-właścicieli-wrzesień-2026). Opisy `alt` pozostałych
  paczek (chryzantemy, bratki, piąta paczka) dalej czekają na przejrzenie.
- Zdjęcia **nie zostały przypisane do wpisów roślin**. To ujęcia zbiorowe, nie portrety
  pojedynczych gatunków, a zgadywanie gatunku na stronie ogrodnika byłoby gorsze niż
  placeholder. Właściciele mogą wskazać, co do czego pasuje.
- Sekcja Historia dostała najpierw zdjęcie współczesne (`gallery-17`, wiszące kosze
  w tunelu), a we wrześniu 2026 **własne zdjęcie stoiska na wystawie w Końskowoli**
  (`src/assets/farm/konskowola-stand.jpg`, `historyPhoto`) - patrz „Blok historii dostaje własne zdjęcie” niżej. Projekt prosił tam
  o **zdjęcie archiwalne**; nowy kadr też jest współczesny, więc prośba zostaje otwarta, ale
  przestaje być pilna.
- Karta jesienna doczekała się zdjęcia z osobnej paczki, patrz niżej.

**Wrzesień 2026, druga paczka: 8 własnych zdjęć chryzantem.** Do repo weszły dwa - kadry
wybrali właściciele:

- `src/assets/chrysanthemums/cultivation-rows.jpg` - rzędy żółtych chryzantem w doniczkach,
  kadr 16:9 na kartę jesienną (`chrysanthemumPhoto` w `src/data/gallery.ts`). Celowo **poza
  tablicą `gallery`**: slideshow to zdjęcia z wiosennej prezentacji, a jedno jesienne ujęcie
  w jego środku czytałoby się jak pomyłka.
- `src/assets/plants/chryzantema-wielkokwiatowa.jpg` (źródło `367`) - kadr 4:3 do wpisu
  rośliny, wpięty przez `image` i `imageAlt` we frontmatterze. To pierwsze zdjęcie rośliny
  w ogóle, więc przy okazji `PlantEntry` nauczył się je czytać - schemat miał te pola od
  początku, ale komponent renderował placeholder bezwarunkowo i zdjęcie nie miałoby jak się
  pokazać.
- `src/assets/plants/chryzantema-sredniokwiatowa.jpg` (źródło `558`) i
  `src/assets/plants/chryzantema-igielkowa.jpg` (źródło `565`) - dobrane na prośbę
  właścicieli, gdy doszly dwa nowe wpisy. **Przypisanie typu jest odczytane ze zdjęcia,
  nie potwierdzone przez właścicieli.** Igiełkowa (`565`) jest pewna - płatki długie,
  rurkowate, z podwiniętymi końcami. Średniokwiatowa (`558`) to odczyt z wielkości kwiatu
  względem liści i jest **najsłabszym ogniwem - do potwierdzenia**. **Od września 2026 to
  ogniwo jest jeszcze słabsze**, bo doszedł czwarty typ: dopóki grupa miała trzy wpisy,
  „nie wielkokwiatowa i nie igiełkowa” zostawiało jedną możliwość, a teraz zostawia dwie -
  `558` może równie dobrze przedstawiać drobnokwiatową. Zdjęcia **nie podmieniono**: wybór
  między dwoma typami na oko to dokładnie to zgadywanie, którego to repo nie robi na stronie
  hodowcy. Punkt idzie do właścicieli razem z resztą opisów `alt`.
  `366` odrzucone jako igiełkowa mimo pozorów: płatki są wąskie, ale płaskie i gęsto
  ułożone w pełny kwiat, nie rurkowate.
- Źródło karty miało `orientation=6`, więc i tu obrót jest wypalony. Trzy pozostałe zdjęcia
  (`364`, `366`, `374`) nie weszły do repo.
- **Wszystkie cztery nowe opisy `alt` czekają na przejrzenie przez właścicieli**, tak samo
  jak opisy galerii.

**Wrzesień 2026, trzecia paczka: 4 ogólne zdjęcia chryzantem** (`src/assets/chrysanthemums/offer-01-04.jpg`,
eksport `chrysanthemumStrip`). Leżą w pasie pod listą roślin na `/chryzantemy/`, nad blokiem
zamówień, jako komponent `PhotoStrip.astro`.

- To ujęcia **mieszane** - rzędy kul w tunelu, doniczki przy drodze, wielobarwna ekspozycja -
  więc świadomie **nie są przypisane do żadnego typu** i opisy `alt` wymieniają kolory,
  a nie formę kwiatu. Zdjęcia przy wpisach pokazują kwiat, ten pas pokazuje ofertę. Liczby
  typów ten pas też nie podaje - komentarz przy `chrysanthemumStrip` mówił „all three types”,
  dopóki grupa miała trzy wpisy, i po dojściu czwartego został przeformułowany, żeby nie
  zamienić nieaktualnej liczby w twierdzenie o czterech kadrach, których nikt nie przejrzał
  na nowo.
- **Pliki mają 736×1000 px**, bo przyszły już przeskalowane przez Facebooka - poniżej
  progu 2000 px, którego trzyma się reszta repo. Skopiowane bajt w bajt: przeskalowanie
  byłoby pustym przebiegiem, a ponowna kompresja tylko zabrałaby jakość. Dlatego
  `PhotoStrip` zamawia najwyżej wariant 720 px. **Oryginały z telefonu byłyby lepsze.**
- **Te zdjęcia obalają listę kolorów.** Widać na nich czerwony, bordowy, pomarańczowy,
  różowy, amarantowy, liliowy i kremowy - a chipy nad nimi mówią „biały, żółty, fiolet,
  złoty”. Sprzeczność jest teraz widoczna gołym okiem na jednym ekranie.

**Wrzesień 2026, ósma paczka: 18 zdjęć chryzantem z Facebooka gospodarstwa** - największa
dostawa od czasu obsadzeń i pierwsza, w której trzeba było **sprawdzać powtórzenia**.

- **Trzy z osiemnastu już były w repozytorium**, w innym rozmiarze, więc nie wyłapałby ich
  żaden hash pliku. Porównanie po `dHash` 8×8 na przeskalowanej skali szarości (odporne na
  zmianę rozmiaru i ponowną kompresję) wskazało trzy pary, a każda została jeszcze obejrzana
  bok w bok: `480710280` = `chryzantema-sredniokwiatowa.jpg` (odległość 2),
  `481457192` = `chryzantema-igielkowa.jpg` (7) i `482005092 (1)` = kopia pliku użytego
  chwilę wcześniej do drobnokwiatowej (3). Weszło **15**.
- **Pas rośnie z 4 do 19 kadrów.** Najpierw `offer-01..04` (mieszane, wiele kolorów naraz),
  potem `rows-01..11` - jednolite kolorystycznie rzędy w tunelu, ułożone jako paleta: biel →
  krem → miedź → żółć → róż - a na końcu `pots-01..04`, cztery gotowe doniczki sfotografowane
  od frontu. Wszystkie cztery doniczki to drobnokwiatowe z tej samej sesji co zdjęcie wpisu,
  ale **opisy `alt` nie nazywają typu**: mówią, co widać.
- **Doniczki miały przez jedną iterację własny pas** - eksport `chrysanthemumPotStrip`,
  etykieta „Gotowe doniczki”, a `OfferSection` przyjmował wtedy listę par „etykieta +
  zdjęcia” zamiast jednej tablicy. Argument za podziałem: rzędy to uprawa, doniczka to
  produkt, który klient zabiera, więc odpowiadają na różne pytania, a zlane w jedno czytają
  się jak jedna długa ściana chryzantem. **Właściciel obejrzał i kazał drugi pas usunąć**;
  kadry przeszły na koniec pierwszego, a prop wrócił do jednej tablicy z etykietą zaszytą
  w komponencie - uogólnienie odeszło razem z pasem, dla którego powstało. Argument zostaje
  tutaj, nie jest skasowany: to po niego sięgnąć, gdyby dziewiętnaście kadrów zaczęło się
  jednak czytać jak ściana, a odpowiedzią jest wtedy drugi pas, a nie krótszy pierwszy.
- **Źródła 1536–1946 × 2048**, przeskalowane do progu 2000 px; bez flagi EXIF orientacji,
  więc nie było czego wypalać. Są wyraźnie ostrzejsze od `offer-01..04` (736×1000) i ta
  różnica jest widoczna w tym samym pasie - świadomie, bo usuwanie tamtych byłoby usuwaniem
  treści od właścicieli.
- **Cztery kadry nie są 3:4** (`rows-01`, `rows-02`, `rows-05`, `rows-08`), a ramka
  `PhotoStrip` jest sztywno 3:4 z `object-fit: cover`. Najwięcej traci `rows-08` (1900×2000,
  prawie kwadrat). To jest bezpośredni powód, dla którego pas dostał lupę - patrz niżej.
- **Znowu obalają listę kolorów, tym razem pojedynczo.** Cztery mieszane kadry pokazywały
  sprzeczność jako tłum; jedenaście bloków po jednym kolorze pokazuje ją jako spis: róż,
  miedź dwubarwna, nasycony pomarańcz. Chipy nadal mówią „biały, żółty, fiolet, złoty”.
- **Piętnaście nowych opisów `alt` to nasze słowa** i idą na listę do przejrzenia przez
  właścicieli, razem z opisami z paczek 2–7. Etykieta pasa się nie zmieniła: nadal brzmi
  „Zdjęcia z gospodarstwa”.

### Lupa w pasach zdjęć - wrzesień 2026

Kadry w `PhotoStrip` powiększają się po kliknięciu. Komentarz w tym komponencie mówił wprost
„no lightbox” i został odwrócony na prośbę właściciela; **powód, dla którego to nie jest
kaprys, jest w punkcie wyżej**: ramka jest sztywno 3:4, więc kadru, który 3:4 nie jest, nie
dało się na stronie zobaczyć w całości w żaden sposób.

- **Nic nowego nie powstało.** `src/scripts/lightbox.ts` jest wpięty globalnie w
  `BaseLayout` i łapie każdy `a[data-lightbox]` - do tej pory używał go wyłącznie pokaz
  obsadzeń. Pas dokłada taki sam odnośnik wokół miniatury. Overlay buduje się raz i dopiero
  gdy na stronie jest choć jeden taki odnośnik.
- **Bez JavaScriptu odnośnik nadal działa** i otwiera pełne zdjęcie - tak samo jak w pokazie.
  To jest cała różnica między „lupa” a „karuzela”: pas nadal nie jest karuzelą i `/inspiracje/`
  zostaje jedynym sankcjonowanym wyjątkiem od „nie dodawaj karuzel”.
- **Cel odnośnika to źródło w swoim rozmiarze, przycięte do 2000 px.** `offer-01..04` mają
  736 px, więc żądanie 2000 podałoby klientowi powiększenie małego pliku. Stąd
  `Math.min(2000, photo.src.width)` w komponencie.
- **Wpisy roślin lupy nie dostały**, i to jest decyzja, nie przeoczenie: `PlantEntry` od
  września 2026 dopasowuje ramkę do zdjęcia (patrz [Kadr zdjęć we wpisach](#kadr-zdjęć-we-wpisach--wrzesień-2026)),
  więc tam nie ma czego odzyskiwać. Koszt jest realny i warto go pilnować: na
  `/chryzantemy/` zdjęcia w pasach klikają się, a zdjęcia przy wpisach nie, i nic tego nie
  zapowiada. Gdyby to zaczęło mylić, tańszą poprawką jest dodać lupę wpisom niż odebrać ją
  pasom.

#### Przechodzenie między zdjęciami - wrzesień 2026, zgłoszenie właściciela

Podgląd był **ślepym zaułkiem**: otwierał jedno zdjęcie i jedyną drogą do następnego było
zamknięcie go i trafienie w kolejną miniaturę. Przy czterech kadrach dawało się z tym żyć;
przy dwudziestu czterech na `/kwiaty-balkonowe/` to 23 rundy tam i z powrotem, żeby obejrzeć
pas. Zgłoszone przez właściciela, naprawione.

- **Zbiór to wszystkie `a[data-lightbox]` na stronie, w kolejności dokumentu, i zawija się.**
  Jest to bezpieczne, bo **żadna strona nie miesza dwóch grup**: strona kategorii ma swój pas
  i nic więcej, `/inspiracje/` i strona główna mają pokaz i nic więcej (sprawdzone w zbudowanym
  `dist/`: 0, 7, 20, 23 i 24 odnośniki na stronę). Gdyby kiedyś na jednej stronie stanęły oba,
  trzeba to zmienić na „otwieracze z tego samego kontenera” - inaczej „następne” wyszłoby
  z pasa w pokaz bez uprzedzenia. Zapisane też w nagłówku `lightbox.ts`.
- **Zawijanie zamiast zatrzymania na końcach** - przyciski wygaszone na krańcach
  dwudziestoczteroelementowego zbioru częściej czyta się jako zepsute niż jako informację,
  a licznik pozycji i tak mówi, gdzie się jest.
- **Sterowanie jest nad zdjęciem i pod zdjęciem, nigdy na nim.** Strzałka pływająca po
  fotografii byłaby pierwszym miejscem, gdzie ten serwis kładzie tekst na zdjęciu. Stąd trzeci
  wiersz siatki: pasek (licznik + „Zamknij”), zdjęcie, sterowanie („Poprzednie” / „Następne”).
- **Strzałki to ten sam chevron co w menu i w FAQ** - dwie krawędzie 1px obrócone o 45°, nie
  ikona i nie glif, bo design zabrania pierwszego. Dziedziczą `currentColor`, więc na hoverze
  odwracają się razem z przyciskiem.
- **Klawiatura:** `←` / `→` przechodzą, `Esc` zamyka jak dotąd. Pułapka na `Tab` była
  jednolinijkowcem („jest jeden przycisk, więc wracaj na niego”) i jest teraz prawdziwym
  cyklem po trzech.
- **Zamknięcie oddaje focus na kadr, przy którym się skończyło**, a nie na ten, który się
  kliknęło - inaczej po przejściu przez pół pasa strona przewijałaby się z powrotem do
  zdjęcia, które odwiedzający już opuścił.
- **Licznik pozycji („3 z 24”)** jest `aria-live="polite"`, więc zmiana pozycji jest
  ogłaszana. Przy zbiorze jednoelementowym licznik i całe sterowanie znikają - nie ma dokąd
  iść i nie ma czego liczyć. **To jest liczba na stronie, a lista rzeczy zakazanych w designie
  wymienia „no counters”** - czytane jako zakaz liczników marketingowych, nie informacji
  o pozycji; serwis drukuje zresztą liczniki typu „22 rośliny”. Do odrzucenia jedną linijką,
  gdyby właściciele przeczytali tę regułę inaczej.
- **Czego nie ma: gestu przesunięcia na dotyku.** Przyciski mają 44 px i działają palcem,
  ale swipe jest tam oczekiwany i to jest świadoma dziura, nie przeoczenie.

**Wrzesień 2026: `heroPhoto` podmienione na obraz wygenerowany przez AI**, na wyraźne
polecenie, nie zdjęcie gospodarstwa. Plik: `src/assets/hero/hero-glasshouse.jpg` (1448×1086,
4:3 - ten sam kadr poziomy, jakiego wymaga pas na górze strony głównej). Wcześniej `heroPhoto`
było aliasem `gallery[18]` (`gallery-19`); teraz to osobny wpis poza tablicą `gallery`, żeby
`/inspiracje/` i skład `pelargonie-w-pelnym-kwitnieniu` nadal pokazywały prawdziwe zdjęcie.

- **To jest wyjątek od reguły całej tej sekcji i całego projektu**: każda inna fotografia na
  stronie jest zdjęciem własnej uprawy gospodarstwa, nie generowanym obrazem - dokładnie po
  to, żeby uniknąć stocku, jakim była stara strona (patrz niżej). Ten kadr przedstawia scenę,
  której na gospodarstwie nie ma (palmy/banany, promienie światła jak w renderze). Flagowane
  przy poleceniu, potwierdzone mimo to.
- Kontrast etykiety i nagłówka na scrimie **nie został zmierzony w przeglądarce** dla tego
  zdjęcia - tylko przybliżeniem offline (patrz komentarz w `Intro.astro`), bo w tej sesji
  narzędzie do zrzutów ekranu nie działało. Wyszło w tej samej okolicy co stare liczby
  (~5,1:1 / ~8,4:1), ale **wart prawdziwej weryfikacji** przed uznaniem za zamknięte.
- Jeśli ten obraz ma zostać na stałe, wart też przejrzenia pod kątem SEO/UX: to pierwszy kadr
  strony (LCP), więc jego `alt` i wiarygodność wobec odwiedzającego liczą się bardziej niż
  gdziekolwiek indziej na stronie.

### Zdjęcia na starej stronie

W sekcji balkonowej i rabatowej jest 13 obrazów na żywych stronach, z czego 9 to stocki
z Pixabay (`fuchsia-3563505_1920`, `geraniums-3579260_1920`, `black-eyed-susan-407767`,
`verbena-2332490`, `cloves-3453184`, `mandevilla-59754`, `dahlia-1642464`,
`calibrachoa-2715634`, `begonias-2703511`) w rozdzielczości 1024 px, wszystkie z pustym
`alt`. Licencja nieznana, jakość poniżej reszty projektu - **żaden nie został przeniesiony.**
Pozostałe 2 (alstromeria, pelargonia rabatowa) to własne zdjęcia gospodarstwa i posłużyły
za źródło, patrz piąta paczka niżej.

Do zrobienia zdjęć: każdy pozostały placeholder na stronie ma wypisany wymagany kadr.
Obie ramki 16:9 (tunel z kwiatami balkonowymi, chryzantemy przed 1 listopada) są już
obsadzone, tak samo cała grupa chryzantem oraz bratek i prymulka. Z 19 wpisów zdjęcie ma teraz
szesnaście, więc zostały po jednym kadrze 4:3 na dahlię, pelargonię bluszczolistną
i sundaville, oraz 3:2 archiwalnego zdjęcia gospodarstwa - ta ostatnia ramka jest już czymś
wypełniona (`historyPhoto`, stoisko na wystawie w Końskowoli), więc to prośba, a nie luka.

**Wrzesień 2026, czwarta paczka: 6 własnych zdjęć bratków.** Do repo weszło pięć, w nowym
katalogu `src/assets/pansies/` (pas) oraz `src/assets/plants/bratek-ogrodowy.jpg` (wpis).
Razem z nimi doszła **cała nowa grupa oferty**: `Bratki` w enumie schematu, wpis
`bratek-ogrodowy.md`, strona `/bratki/` i pozycja w menu między „Rabatowe" a „Chryzantemy" -
czyli chronologicznie, bo bratki otwierają rok.

- Kadr do wpisu to skrzynka mieszana (źródło `649134133`); pas pod listą to `offer-01-04`:
  dziewięć skrzynek z góry, żółte bez plamki, białe z plamką, fioletowe z białym obrzeżem.
  Szóste zdjęcie (`650130921`, żółte z ciemną plamką) nie weszło do pasa - w rzędzie czterech
  kadrów dublowało kolorystycznie `offer-02` - ale **weszło samo, na kartę
  wczesnowiosenną** na stronie głównej jako `pansyPhoto` (`crate-yellow.jpg`). Samo na karcie
  robi to, czego w pasie nie robiło: czyta się jako marzec z jednego spojrzenia.
- Pliki przyszły **bez EXIF-u i już poprawnie zorientowane**, więc w odróżnieniu od paczki
  galerii nie trzeba było wypalać obrotu. Dwa źródła miały 2048 px i zeszły do 2000 px;
  trzy pliki 1080×1920 są **skopiowane bajt w bajt**, bo są poniżej progu - ten sam
  precedens co `chrysanthemumStrip`.
- Kadry są pionowe, a ramki nie: `PhotoStrip` renderuje 3:4, `PlantEntry` 4:3, więc
  `object-fit: cover` przycina je w pionie. Zmierzone: trzy kadry 9:16 w pasie zachowują 75%
  wysokości, `offer-01` aż 97%, a zdjęcie przy wpisie 61%. Sprawdzone na wyrenderowanych
  przycięciach - wszystkie czytelne. Uwaga na `alt` przy wpisie: kadr 4:3 odcina górny rząd
  różowych i dolny liliowych, więc opis wymienia tylko to, co w przycięciu widać.

**Trzy rzeczy przy bratkach czekają na właścicieli:**

1. **Chipy kolorów są odczytane ze zdjęć**, nie podane przez właścicieli - żółty, kremowy,
   biały, bordowy, różowy, amarantowy, fioletowy, liliowy, błękitny, dwubarwny. To ten sam
   tryb, co przy przypisaniu typu chryzantemy średniokwiatowej: **do potwierdzenia.**
2. **Wpis nie ma opisu uprawy** - świadomie. Właściciele nie podali żadnego tekstu
   o bratkach, a regułą projektu jest, że nic nie dopisujemy z wiedzy ogólnej. Wpis ma
   jedno zdanie w formie `pelargonia-rabatowa.md`. **To strata dla wyszukiwarki** i pierwsza
   rzecz do uzupełnienia, gdy właściciele coś powiedzą.
3. **Opisy `alt`** - jak przy galerii i chryzantemach, napisane z tego, co widać.

Termin sprzedaży „Marzec – kwiecień" **pochodzi od właścicieli** i jest jedynym „faktem"
przy wpisie. Ten sam termin dostał **własną kartę sezonową** - patrz niżej.

**Czego przy tej okazji nie ruszono:** `h1` na stronie głównej („Kwiaty balkonowe, rabatowe
i chryzantemy z własnej uprawy") i blurb w stopce nadal nie wymieniają bratków. Oba są
blisko taglinu, którego nie wolno przerabiać bez zgody właścicieli - **do decyzji.**

**Wrzesień 2026, piąta paczka: 10 własnych zdjęć z biblioteki mediów starej strony.** Żywe
strony WordPressa pokazywały tylko 2 własne zdjęcia poza chryzantemami (alstromeria,
pelargonia rabatowa); reszta placeholderów wyglądała na nieodwracalną - dopóki zapytanie do
`wp-json/wp/v2/media` nie ujawniło **58 nieużywanych, niepodpiętych do żadnej strony zdjęć**
z 2019–2020 (nazwy w stylu Facebooka i zdjęcia z telefonu), które architektura WordPressa
trzymała w bibliotece mediów, ale nikt nigdy nie wstawił na stronę. Stamtąd wybrano 10
zdjęć - po jednym na roślinę, plus zapasowe warianty koloru tam, gdzie się nadarzyły:

| Roślina                  | Źródło (WP media ID)       | Uwaga                                                                                         |
| ------------------------ | -------------------------- | --------------------------------------------------------------------------------------------- |
| Alstromeria              | `337` (kolaż, prawy panel) | Reszta kolażu (4 ujęcia) zostaje niewykorzystana.                                             |
| Fuksja                   | `344` (kolaż, lewy panel)  | Alternatywa: `341`.                                                                           |
| Goździk                  | `224`                      | -                                                                                             |
| Begonia                  | `225`                      | Alternatywa: `351` (lewy panel).                                                              |
| Tunbergia                | `226`                      | To dosłownie „black-eyed susan” ze stockowego opisu na starej stronie.                        |
| Werbena                  | `227`                      | Warianty koloru: `229` (biała), `350` (czerwona, lewy panel), `352` (fioletowa, prawy panel). |
| Heliotrop                | `169`                      | -                                                                                             |
| Pelargonia rabatowa      | `160`                      | Alternatywa: `351` (prawy panel).                                                             |
| Calibrachoa              | `231`                      | **Do potwierdzenia**, patrz niżej.                                                            |
| Niecierpek nowogwinejski | `228`                      | **Przeklasyfikowane ze starej strony**, patrz niżej.                                          |

Dwie rzeczy tu **wymagają uwagi właścicieli**, zanim wejdą jako pewnik:

- **Niecierpek nowogwinejski nie miał własnego zdjęcia na starej stronie w ogóle** - był
  wciśnięty w ten sam akapit co „Pelargonie” na `/rabatowe/`. Jedno z dwóch zdjęć w tym
  akapicie (`163`, doniczka przy hotelu) pokazuje jednak wyraźnie niecierpka, nie
  pelargonię - kształt i budowa kwiatu to potwierdzają. Ostatecznie wybrany kadr (`228`,
  pojedynczy biały kwiat) jest z tej samej rodziny zdjęć w bibliotece mediów, nie z żywej
  strony. Gatunek jest pewny; **czy to odmiana, którą gospodarstwo faktycznie sprzedaje
  w 2026, nie zostało potwierdzone.**
- **Calibrachoa i pnąca petunia (Surfinia) są na oko trudne do odróżnienia** - obie mają
  drobne, lejkowate kwiaty w zwisającym pokroju. Wybrane zdjęcie (`231`, żółte kwiaty
  w gęstej macie) pasuje do opisu „Million Bells” z tekstu właścicieli lepiej niż inne
  kandydatki (większe, luźniejsze kwiaty bliższe typowej petunii), ale **nie ma
  potwierdzenia gatunku od właścicieli** - ten sam tryb co przypisanie typu chryzantemy
  średniokwiatowej.

Przetwarzanie: dwa źródłowe pliki (fuksja, alstromeria) były dyptykami/kolażami kilku
zdjęć sklejonych na jednym płótnie - wycięty tylko panel z pojedynczym kwiatem, reszta
zostaje niewykorzystana. Obrót EXIF wypalony we wszystkich, długi bok ograniczony do
2000 px (żaden nie musiał być skalowany w dół - źródła miały 528–2560 px). Opisy `alt`
napisane z tego, co widać, jak przy poprzednich paczkach - **też czekają na przejrzenie
przez właścicieli.**

Nieznalezione mimo przeszukania całej biblioteki mediów: **dahlia, pelargonia
bluszczolistna, sundaville.** Ani żywe strony, ani biblioteka mediów WordPressa ich nie
mają. Facebook gospodarstwa jest kolejnym miejscem do sprawdzenia, ale wymaga zalogowanej
przeglądarki - nieosiągalny przez samo pobieranie stron.

## Kadr zdjęć we wpisach - wrzesień 2026

Właściciel zgłosił, że zdjęcia na stronach ofertowych stoją „w niedokońca poprawnej,
nienaturalnej pozycji”, i wymienił alstromerię. Zgłoszenie było trafne, ale dotyczyło
**wszystkich czternastu** zdjęć, nie jednego.

### Co było źle

`PlantEntry.astro` wtłaczał każde zdjęcie w sztywne pudełko **4:3** z `object-fit: cover`
i **bez** `object-position`, więc przeglądarka zostawiała środkowy pas i wyrzucała resztę.
Tymczasem **jedenaście z czternastu plików to kadry pionowe**, a cztery z nich mają proporcję
telefonu 9:16. Ginęło od 39% do 59% zdjęcia, a to, co zostawało, było wycięte na ślepo:
alstromeria, fuksja i niecierpek miały płatki obcięte krawędzią ramki, bratek tracił dolny
rząd fioletowych kwiatów, begonia - żółty.

**Rotacja nie miała z tym nic wspólnego.** Żaden z czternastu plików nie niesie już flagi
EXIF `orientation`, więc obrót jest wypalony, tak jak wymaga tego punkt o zdjęciach wyżej.
Sprawdzone, zanim cokolwiek zmieniono - „nienaturalna pozycja” brzmi jak przekręcony kadr
i nim nie była.

### Dlaczego samo wycelowanie kadru nie wystarczyło

Pierwszym odruchem było powtórzenie wzorca z `Intro.astro`, gdzie ten sam problem rozwiązuje
celowany `object-position: center 42%`. **To nie działa tutaj** i warto wiedzieć dlaczego:
celowanie przesuwa pas, ale nie poszerza go. Przy alstromerii, fuksji i niecierpku kwiat jest
po prostu **wyższy niż okno 4:3** - przy każdej wartości `object-position` płatki są obcięte,
tylko z innej strony. Pomaga wyłącznie wyższa ramka.

### Ile zostaje ze zdjęcia przy każdym wariancie

| Plik                        | Źródło    | 4:3 (było) | 1:1 | 3:4  | własna, max 3:4 (jest) |
| --------------------------- | --------- | ---------- | --- | ---- | ---------------------- |
| alstromeria                 | 1278×1810 | 53%        | 71% | 94%  | **94%**                |
| begonia                     | 528×960   | 41%        | 55% | 73%  | **73%**                |
| bratek-ogrodowy             | 1622×2000 | 61%        | 81% | 92%  | **100%**               |
| calibrachoa                 | 720×960   | 56%        | 75% | 100% | **100%**               |
| chryzantema-igielkowa       | 1500×2000 | 56%        | 75% | 100% | **100%**               |
| chryzantema-sredniokwiatowa | 1500×2000 | 56%        | 75% | 100% | **100%**               |
| chryzantema-wielkokwiatowa  | 2000×1329 | 89%        | 66% | 50%  | **100%**               |
| fuksja                      | 1268×1810 | 53%        | 70% | 93%  | **93%**                |
| gozdzik                     | 528×960   | 41%        | 55% | 73%  | **73%**                |
| heliotrop                   | 528×960   | 41%        | 55% | 73%  | **73%**                |
| niecierpek-nowogwinejski    | 720×960   | 56%        | 75% | 100% | **100%**               |
| pelargonia-rabatowa         | 960×540   | 75%        | 56% | 42%  | **100%**               |
| tunbergia                   | 528×960   | 41%        | 55% | 73%  | **73%**                |
| werbena                     | 960×720   | 100%       | 75% | 56%  | **100%**               |

Żadna **jedna** proporcja nie obsługuje obu grup: 3:4 ratuje jedenaście kadrów pionowych
i psuje trzy poziome (pelargonia spada do 42%), 1:1 nie psuje niczego do końca, ale też
niczego nie pokazuje w całości, a 4:3 z handoffu jest dobre wyłącznie dla werbeny.

### Co wybrano

**Ramka bierze proporcję z samego pliku i jest ograniczona do 3:4** - nic nie jest kadrowane,
dopóki zdjęcie nie jest wyższe niż 3:4, a wtedy `object-fit: cover` bierze środek. Decyzja
właściciela, podjęta na oczy, na porównaniu czterech wariantów.

Skutki: dziesięć zdjęć widać w całości, alstromeria i fuksja po 93-94%, a cztery kadry
telefoniczne idą z 41% na 73%. Nic się nie pogorszyło - werbena, pelargonia i chryzantema
wielkokwiatowa, dotąd kadrowane do 4:3, też są teraz całe.

To jest **odejście od handoffu**, który prosi o „po jednym zdjęciu na każdą roślinę (4:3)”
(`docs/design/README.md`, linia 388) i wymienia alstromerię imiennie w linii 282. Handoff
zostaje bez adnotacji, tak jak przy kartach sezonowych - zapis idzie tutaj.

### Jak to działa w kodzie

`PlantEntry.astro` liczy `photoRatio` z `image.width / image.height`, podnosi do 3/4, jeśli
plik jest wyższy, i podaje wynik do CSS jako `--entry-ratio` na elemencie. `aspect-ratio`
czyta tę zmienną z zapasowym `4 / 3`. `width`/`height` opisują **pudełko, nie plik**, bo
inaczej przeglądarka rezerwuje złą wysokość i tekst podskakuje przy wczytaniu zdjęcia.

Dwie rzeczy, które to umożliwiły i o których łatwo zapomnieć:

- **Wpisy stoją jeden pod drugim jako osobne wiersze**, nie w siatce (`article.entry` ma
  własną dwukolumnową siatkę i `align-items: start`). Zdjęcia nie muszą więc mieć równej
  wysokości - gdyby wpisy były kaflami, ten wariant byłby wykluczony.
- **`PhotoSlot` dalej prosi o 4:3** i tak zostaje. Przy tej regule plik 4:3 ląduje w pudełku
  4:3 nietknięty, więc zaślepka nadal pokazuje dokładnie ten kadr, o który prosimy
  właścicieli dla dalii, pelargonii bluszczolistnej i sundaville.

### Odwrócone: wszystkie kadry na 4:3 - wrzesień 2026

Właściciel poprosił później, żeby **ujednolicić wszystkie zdjęcia przy opisach do 4:3**. To
odwraca decyzję opisaną wyżej, podjętą przez niego samego kilka dni wcześniej, i zostało
zgłoszone jako świadoma zmiana zdania („jednak"). Wygrała jednolitość nad wiernością
poszczególnym kadrom.

**Cena, zmierzona a nie zapamiętana.** Na szesnaście zdjęć w kolekcji:

| Wpis                                   | Plik      | Zostaje dziś | Zostaje przy 4:3 |
| -------------------------------------- | --------- | -----------: | ---------------: |
| werbena                                | 960×720   |         100% |             100% |
| chryzantema wielkokwiatowa             | 2000×1329 |         100% |              89% |
| pelargonia rabatowa                    | 960×540   |         100% |              75% |
| bratek ogrodowy                        | 1622×2000 |         100% |              61% |
| calibrachoa                            | 720×960   |         100% |              56% |
| niecierpek nowogwinejski               | 720×960   |         100% |              56% |
| chryzantemy (3 × 1500×2000)            | 1500×2000 |         100% |              56% |
| alstromeria                            | 1278×1810 |          94% |              53% |
| fuksja                                 | 1268×1810 |          93% |              53% |
| prymulka                               | 1381×2000 |          92% |              52% |
| begonia, goździk, heliotrop, tunbergia | 528×960   |          73% |              41% |

Nietknięte zostaje **jedno zdjęcie z szesnastu** (werbena, która jest już 4:3); przy poprzedniej
regule nietkniętych było dziewięć. Dwa kadry poziome są teraz przycinane **z boków**, czego
poprzednia reguła nie robiła w ogóle.

Przycięcie jest wyśrodkowane i **`object-position` go nie uratuje** - celowanie przesuwa pas,
a żadne położenie nie pomoże, kiedy kwiat jest po prostu wyższy niż okno. To był argument, który
w ogóle doprowadził do reguły adaptacyjnej, i on nie przestał być prawdziwy - został przegłosowany.
Jeśli któryś wpis okaże się przycięty w złym miejscu, **poprawką jest przekadrowanie pliku
źródłowego, nie wyjątek dla wpisu.**

**Co to daje**, i to jest powód prośby: `PhotoSlot` od zawsze rysuje ramkę oczekującą w 4:3, więc
strona trzymająca i zdjęcia, i zastępniki przeskakiwała w dół kolumny między dwoma kształtami.
Już nie przeskakuje. Przy 24 z 40 wpisów nadal czekających na zdjęcie ta kolumna jest bardziej
zastępnikiem niż fotografią, a teraz ma jedną prostą krawędź.

**Uboczny skutek do rozstrzygnięcia przez właścicieli.** Lupa (`lightbox`) jest dziś tylko na
pasach zdjęć, a uzasadnienie brzmiało: pas przycina kadr i pełnej ramki nie da się inaczej
zobaczyć, „podczas gdy `PlantEntry` dopasowuje ramkę do zdjęcia”. Po tej zmianie **wpisy
przycinają piętnaście kadrów na szesnaście**, więc to rozróżnienie zniknęło. Lupy przy wpisach
**nie dodano** - to zmiana widoczna dla klienta i wymaga ich decyzji. Do listy pytań.

## Trzecia karta sezonowa - wrzesień 2026

Handoff rysuje **dwie** karty sezonowe (`docs/design/README.md`, sekcja 3); na stronie stoją
**trzy**. Powód jest po stronie treści, nie projektu: bratki sprzedają się w marcu i kwietniu,
czyli w miesiącach, które karta wiosenna połykała. Pierwsze podejście było takie, że karta
wiosenna dostała zdanie o bratkach i podpis „Marzec – czerwiec · szczyt w maju i czerwcu" -
i to było pół rozwiązania: kto wszedł na stronę w marcu, widział zdjęcie tunelu z kwiatami
balkonowymi i jeden odnośnik, prowadzący do jedynej rzeczy, której wtedy nie ma w sprzedaży.

Teraz każde okno sprzedaży ma swoją kartę:

| Karta | Okno (0.7)   | Zdjęcie                  | Odnośnik             |
| ----- | ------------ | ------------------------ | -------------------- |
| 1     | 1.03 – 30.04 | skrzynka żółtych bratków | `/bratki/`           |
| 2     | 1.05 – 31.08 | tunel z kwiatami         | `/kwiaty-balkonowe/` |
| 3     | 1.09 – 30.11 | chryzantemy w doniczkach | `/chryzantemy/`      |

Karty 2 i 3 mają **dosłownie treść z handoffu**, łącznie z podpisem „Maj – czerwiec · szczyt
sezonu", który wrócił po tamtej tymczasowej przeróbce. Nowa jest tylko karta 1. Siatka to
nadal `auto-fit, minmax(min(100%, 320px), 1fr)` bez żadnego media query: trzy kolumny tam,
gdzie się mieszczą, potem dwie plus jedna, potem stos. Zima (grudzień–luty) bez zmian -
wszystkie trzy karty wygaszone, żadnego zmyślonego komunikatu.

> **Ta sekcja jest zapisem stanu z 0.7 i już nie obowiązuje.** Właściciele podali w tym samym
> miesiącu inne okna, karty straciły odnośniki i ciemne tło, a stan sezonu przeniósł się na
> kafle oferty - patrz „Kalendarz sprzedaży" niżej.

## Strona główna jako witryna - wrzesień 2026

Do wersji 0.6 strona główna była **wejściem**: intro, karty sezonowe i cztery kafelki oferty.
Zdjęć było na niej cztery, przy 47 własnych fotografiach w repozytorium, a kafelki oferty nie
miały ani jednego - na stronie gospodarstwa, którego całym produktem jest to, jak roślina
wygląda. Od 0.7 strona główna jest **podglądem każdej części witryny**, a podstrony zostają
miejscem pełnych opisów uprawy, list kolorów i telefonów.

| Sekcja            | Co pokazuje                                      | Skąd bierze zdjęcia                         |
| ----------------- | ------------------------------------------------ | ------------------------------------------- |
| Intro             | bez zmian                                        | `heroPhoto`                                 |
| Sezon             | bez zmian, trzy karty                            | bratki / tunel / chryzantemy                |
| Oferta            | **nowość:** mozaika 1–3 kadrów na grupę          | kolekcja `plants`, pierwsze wpisy z `image` |
| Inspiracje        | **nowość:** wszystkie 23 obsadzenia, uproszczone | `compositions`                              |
| Jak do nas trafić | **nowość:** mapa, adres, „Wyznacz trasę”         | -                                           |

### Mozaika w kafelku - wersja z 0.7

> **Nieaktualne.** Kadry były wtedy wybierane „ile się da, najwyżej trzy", więc grupy miały ich
> po jednej, dwie albo trzy, a kafel bratków - jedno zdjęcie na całą szerokość - był
> najcięższym elementem sekcji. Dziś każdy kafel ma dokładnie dwa kadry 4:3; dlaczego akurat
> dwa i co po drodze nie wyszło, opisuje „Mozaika w kaflu - dwa kadry, zawsze" niżej.

### Nowe teksty - do przejrzenia przez właścicieli

Napisane przez nas, nie nadesłane. Tak jak opisy `alt`, czekają na potwierdzenie:

| Miejsce                  | Tekst                                                                                                            |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| Nagłówek bloku dojazdu   | „Jak do nas trafić”                                                                                              |
| Lead bloku dojazdu       | „Jesteśmy w Cholewiance pod Kazimierzem Dolnym. Kwiaty oglądasz i kupujesz na miejscu, w tunelach - zapraszamy.” |
| Odnośnik w bloku dojazdu | „Telefony i kontakt”                                                                                             |
| Odnośnik pod pokazem     | „Zobacz wszystkie obsadzenia”                                                                                    |

### Czego blok dojazdu celowo nie robi

**Nie drukuje ani jednego numeru telefonu.** W 0.5 stał w tym miejscu `ContactStrip` i został
usunięty w 0.6, bo powtarzał adres, numer i „Wyznacz trasę” tuż nad stopką niosącą to samo -
`602 518 401` pojawiał się trzy razy na jednej stronie. Nowy blok odpowiada na jedno pytanie,
na które stopka odpowiedzieć nie może (_gdzie to jest, na mapie_), a po telefony odsyła do
`/kontakt/`. Adres jest powtórzony świadomie: adres obok mapy jest tym, co czyni mapę czytelną.

**Uwaga na licznik telefonów - pierwsza wersja 0.7 się na tym wyłożyła.** Blok dojazdu
rzeczywiście nie niesie numeru, ale pokaz obsadzeń niósł go w **każdym z 23 paneli**
(„Zapytaj: 602 518 401”). Razem z intro i stopką dawało to **25 wystąpień na stronie
głównej** - dokładnie ta choroba, na którą lekarstwem było usunięcie `ContactStrip`, tylko
osiem razy silniejsza - podczas gdy komentarz w `index.astro` twierdził, że numer występuje
raz. Panelowe CTA jest od tej pory zależne od `level`: zostaje na `/inspiracje/`, znika na
stronie głównej, gdzie drogą do telefonu jest sąsiedni odnośnik „Kontakt i dojazd”. Cokolwiek
powtarza się w panelu, powtarza się tu 23 razy - liczba do sprawdzenia na zbudowanej stronie
(`grep -o 'href="tel:' dist/index.html | wc -l` ma dawać **3**: jedno CTA w intro i dwa
numery w stopce), nie do przyjęcia na słowo. **Warunek był zapisany na numerze** `602 518 401`,
który zniknął z `contact.ts`, gdy właściciele wycofali dwa z czterech telefonów - sprawdzenie
przechodziło, bo nie trafiało w nic. Liczy się odnośniki, nie konkretny numer.

Skutek uboczny, oczekiwany: strona główna osadza teraz mapę, więc **pasek zgody pokazuje się
także na niej** (`consent.ts` pyta tylko tam, gdzie pytanie ma konsekwencję). Zgoda jest
wspólna dla całej witryny - kto zgodzi się na stronie głównej, ma mapę wczytaną na `/kontakt/`.

### Pokaz obsadzeń na dwóch adresach

`Compositions.astro` renderuje ten sam zestaw 23 obsadzeń w dwóch wariantach. Na stronie
głównej wyłączone jest pięć rzeczy i żadna z nich nie jest kwestią gustu:

- **`prose`** - opis i porada to razem około dwóch tysięcy słów. Na stronie głównej zamieniłyby
  zapowiedź w drugą, dłuższą kopię `/inspiracje/` i zostawiły tamtą stronę bez powodu, żeby
  istnieć. Pasek na górze mówi, czym jest obsadzenie i co w nim rośnie; słowa są tym, po co
  się klika.
- **`structuredData`** - `ItemList` wskazuje `/inspiracje/#…` jako `@id` każdego obsadzenia;
  wyemitowany pod drugim adresem opisywałby tę samą listę dwa razy.
- **`ids`** - kotwice `/#kosz-…` konkurowałyby z prawdziwymi pod `/inspiracje/#kosz-…`.
- **`showRail`, `showFilters`** - filtrowanie i przeglądanie miniaturami to zadanie
  `/inspiracje/`; nagłówek każdego panelu na stronie głównej jest odnośnikiem właśnie tam.

`src/scripts/compositions.ts` obsługuje od 0.7 wiele instancji (`init(root)` po każdym
`[data-comp]`) zamiast jednej na dokument.

### Znany defekt - zastany, ale 0.7 go odsłania szerzej

Panel pokazu, którego zdjęcie nie zostało jeszcze wczytane (`loading="lazy"`), zwija obrazek
do 2×2 px, bo `.panel__link img` ma `width: auto`, a `global.css` daje `height: auto`
(wczytany kadr mierzy 419×558, niewczytany 2×2). W efekcie na krawędziach paska widać skrawki
tekstu sąsiedniego panelu zamiast skrawka zdjęcia.

Przyczyna jest starsza niż ta zmiana i dotyczy tak samo `/inspiracje/` - ale **0.7 zdejmuje
to, co ją tam maskowało**. Na `/inspiracje/` pierwszy kadr ma `loading="eager"`, więc panel
wiodący jest zawsze narysowany; na stronie głównej żaden kadr nie jest `eager` (LCP należy do
zdjęcia w intro i nie ma z czym konkurować), więc **panel wiodący też jest podatny**: przy
wolnym łączu rysuje się jako skrawek tekstu i dopiero potem podskakuje do pełnego kadru.

Naprawa to zarezerwowanie pudełka dla niewczytanego obrazka. Nie jest to jednolinijkowiec -
źródła mają różne proporcje i `object-fit: contain` jest tam właśnie dlatego, więc sztywne
`aspect-ratio` popsułoby kadry poziome, a `min-height` dokłada pustkę pod kadrem poziomym na
telefonie. Zostaje jako osobna zmiana, z weryfikacją obu adresów i obu orientacji.

## Pokaz zdjęć na stronie głównej - wrzesień 2026

Strona główna dostała blok **„Zdjęcia z naszego gospodarstwa”**: pokaz slajdów niosący
**69 własnych kadrów**, rząd naraz, pogrupowanych i podpisanych nazwą grupy. Stoi między kaflami
oferty a pokazem obsadzeń.

Do tej pory żadne z tych zdjęć nie było na stronie głównej - 51 kadrów z pasów widniało wyłącznie
na trzech stronach kategorii, a 18 zdjęć wpisów tylko przy swoich roślinach.

### Co dokładnie wchodzi, a co nie

Zestaw powstał w dwóch turach: najpierw wszystkie 51 kadrów z pasów, potem - na prośbę
o „jeszcze te najciekawsze” - **18 pionowych zdjęć wpisów roślin**, czyli wszystko, co
gospodarstwo ma własnego i czego nie ma jeszcze na tej stronie. Razem 69: bratki 9, balkonowe 38,
chryzantemy 22.

Decydują dwie reguły, obie zapisane w `gallery.ts`:

1. **Nasze, nie pożyczone.** Siedemnaście wpisów stoi na zastępniku z Wikimedia Commons i odpada
   po obecności `imageCredit` - to pole istnieje wyłącznie na pożyczonym kadrze. To nie jest
   preferencja: lead nad blokiem mówi, że zdjęcia są nasze i robione u nas, więc cudza hortensja
   czyniłaby to zdanie fałszywym. Reguła wygasa sama - gdy właściciele dosyłają własny kadr,
   `imageCredit` znika z wpisu, a zdjęcie pojawia się tu bez niczyjej decyzji.
2. **Wyższe niż szersze.** Rząd jest oknem pionowym, a kadr poziomy traci w nim od 38% do 58%
   szerokości (`pelargonia-rabatowa` ma 1,78 i zostawiłaby 42%). Odpadają cztery zdjęcia wpisów:
   `chryzantema-wielkokwiatowa`, `pelargonia-rabatowa`, `petunia-surfinia`, `werbena` - wszystkie
   nadal są przy swoich wpisach, w ramce 4:3, która im służy.

**Świadomie nie wchodzą** 23 obsadzenia (najlepsze zdjęcia w repozytorium, ale są już na tej
stronie w pokazie sekcję niżej - pokazywanie ich dwa razy na jednym ekranie to dokładnie to
powtórzenie, które jedna z poprzednich wersji usuwała), `chrysanthemumPhoto` i `pansyPhoto`
(karty sezonowe ekran wyżej), `heroPhoto` (obraz generowany, nie fotografia gospodarstwa) oraz
`historyPhoto` (należy do `/o-nas/`).

### Dokąd prowadzi „Więcej zdjęć”

Rząd odnośników pod pokazem celuje w **kotwicę `#zdjecia`** na stronie kategorii, a nie w jej
górę: `/kwiaty-balkonowe/#zdjecia` otwiera się na pasie zdjęć, czyli tam, gdzie jest reszta
kadrów tej grupy. Identyfikator należy do `PhotoStrip`, więc mają go wszystkie trzy strony
kategorii naraz i żadna nie może go zgubić bez zgubienia całego pasa.

### Czego chcieli właściciele i co z tego wyszło

Prośba brzmiała: **pokaz slajdów jak na obecnej stronie**, tylko wpasowany w projekt. Obecna
witryna używa MetaSlidera na Nivo Sliderze: 49 slajdów, pas 800×408 (ok. 2:1), zmiana co
3 sekundy, efekt `random` (siekanie kadru na 15 pasków albo 35 kwadratów), kropki pod spodem,
strzałki na zdjęciu, pauza na najechanie.

Zanim to powstało, **odrzucono dwie tury propozycji** - obie w makietach z prawdziwymi zdjęciami,
tokenami i krojami, bo `tokens.css` zapisuje regułę, że o wyglądzie nie decyduje się z opisu:

| Tura | Propozycje                                                                    | Werdykt                                       |
| ---- | ----------------------------------------------------------------------------- | --------------------------------------------- |
| 1    | kolaż w naturalnych proporcjach, przewijany pas, istniejący `PhotoStrip`      | „żaden z tych” - ma być pokaz slajdów         |
| 2    | jedno zdjęcie w pasie 16:9, jedno obok tekstu sekcji, jedno duże wyśrodkowane | „dobry kierunek, ale nie dopasowany do zdjęć” |
| 3    | rząd pionowych kadrów, trzy animacje do wyboru                                | przyjęte                                      |

### Dlaczego slajd jest rzędem, a nie zdjęciem

**Bo pas 2:1 na obecnej stronie stoi na zdjęciach, których tu nie ma.** Slajdy MetaSlidera to
osobne kadry panoramiczne generowane przez WordPress pod ten slider - `2100×900`, `960×411`,
`720×308`. W tym repozytorium **53 z 55 zdjęć gospodarstwa są pionowe**, najszersze ma 0,95;
jedyne dwa poziome to zdjęcie z Końskowoli i wygenerowany kadr nagłówka.

Jedno pionowe zdjęcie w szerokim pasie jest albo przycięte do 42% wysokości, albo tonie w pustym
papierze. Zmierzone na makiecie: przycięcie do 16:9 **wypada lepiej, niż wynika z arytmetyki** -
większość kadrów to zbliżenia gęsto zakwitniętych rabat, gdzie nie ma pojedynczego obiektu do
ścięcia. Traci co innego: **kadry „ile tego jest”**. Rząd koszy ciągnący się w głąb tunelu po
przycięciu jest już tylko zbliżeniem petunii - znika głębia i skala, czyli to, co te zdjęcia miały
mówić o gospodarstwie.

Cztery kadry 3:4 obok siebie wypełniają ten sam pas i **nie ucinają nic**: większość źródeł ma
0,74-0,76, czyli 3:4 co do piksela. Płacą tylko `pansies/offer-04` (0,56) i `balcony/baskets-08`
(0,93), a pełny kadr jest w podglądzie.

### Grupy, nie tasowanie

Pierwsza wersja miała dwanaście kadrów przeplecionych między grupami, żeby blok czytał się jako
jedno gospodarstwo, a nie trzy mniejsze bloki. Na ekranie nie czytał się ani tak, ani tak - cztery
niezwiązane kadry w rzędzie wyglądają jak tasowanie i tak zostały nazwane.

Teraz **slajd to jedna grupa**, podpisana własną nazwą, a grupy idą **w kolejności roku**: bratki
i prymulki (marzec) → kwiaty balkonowe (kwiecień-czerwiec) → chryzantemy (październik). To celowo
nie jest kolejność z `offer.ts`, która jest kolejnością ważności i sama to o sobie mówi. Wewnątrz
grupy kolejność jest ta, co w pasie na jej stronie: najpierw uprawa, potem to, co w niej rośnie,
na końcu gotowy kosz albo doniczka.

**Rząd nigdy nie łączy dwóch grup** - rzędy są cięte wewnątrz grupy, a **grupa rozkłada się na
nie równomiernie**, a nie „pełny rząd, pełny rząd, reszta”. Żadna z trzech grup (9, 38, 22) nie
dzieli się przez cztery, więc krótszy rząd jest tu przypadkiem zwykłym, nie wyjątkiem - i to
decyduje, jak wygląda koniec grupy. Dziewięć kadrów bratków przy czterech w rzędzie to **trzy
rzędy po trzy**; zapełniane po kolei dawały cztery, cztery i **jeden**, czyli jedno zdjęcie obok
trzech pustych kolumn, co czyta się jak usterka, a nie jak koniec grupy. Liczba rzędów jest
w obu wariantach ta sama. Zmierzony rozkład przy czterech w rzędzie: bratki 3-3-3, balkonowe
osiem rzędów po cztery i dwa po trzy, chryzantemy cztery po cztery i dwa po trzy - **żaden rząd
nie ma mniej niż trzy kadry**.

**Krótszy rząd jest wyśrodkowany**, a nie dosunięty do lewej - zgłoszenie właściciela po
obejrzeniu na szerokim ekranie. Siatka ma **dwa razy więcej kolumn niż kadrów w rzędzie**,
a każdy kadr zajmuje dwie: pół kadru wolnego z każdej strony nie da się inaczej wyrazić, bo
trzy kadry w czterech kolumnach mogą zacząć się tylko w kolumnie 1 albo 2 i obie są poza
środkiem. W półkolumnach ten sam rząd idzie od kolumny 2 do 7 z ośmiu. **Kadr nie zmienia
przy tym szerokości** - `(W - 3G) / 4` w obu wariantach, bo kadr rozpięty na dwóch
półkolumnach połyka też odstęp między nimi. Zmierzone przy 1512 px: 156 px wolnego z każdej
strony, kadr 267 px w rzędzie pełnym i skróconym.

**Zmierzone przy zmianie szerokości okna**, bo o to było osobne pytanie: 1280 px → 4 kadry
i 19 slajdów, 900 px → 2 kadry i 35 slajdów, 390 px → 1 kadr i 69 slajdów. W obie strony
**na ekranie zostaje to samo zdjęcie**, na które się patrzyło (skrypt przelicza pozycję z kadru,
nie z numeru rzędu), nic nie wyjeżdża poza kontener i strona nie przewija się w bok. Przesunięć
układu przy wczytaniu nie ma - zmierzone `layout-shift` to 0,0000.

### Co jest w środku

| Rzecz            | Jak                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------- |
| Kadrów w rzędzie | 4 przy 1280 px, 2 w okolicach 900 px, 1 na telefonie - liczone ze skryptu, bez breakpointów |
| Rzędów           | 19 przy czterech w rzędzie, 35 przy dwóch, 69 na telefonie                                  |
| Zmiana           | co 6 sekund (obecna strona ma 3; pokaz obsadzeń niżej ma 6)                                 |
| Animacja         | kaskada krycia - kadry rzędu zapalają się kolejno co 90 ms                                  |
| Znaczniki        | jeden na grupę (trzy), nie jeden na rząd                                                    |
| Ground           | `--paper`                                                                                   |

Zbudowano i pokazano trzy animacje: przenikanie całym rzędem, kaskadę i przenikanie z uniesieniem
o 16 px. Została kaskada. **Efekty Nivo nie weszły w ogóle** - siekanie kadru na paski jest
dokładnie tym, czego ten projekt nie ma, a prośba o „jakieś animacje” nie znosi reszty reguł.

**Czas trwania przejścia ustawia skrypt, nie CSS.** Blok `prefers-reduced-motion` w komponencie
byłby drugim `@media` w projekcie, a pierwszy jest świadomym jedynakiem; skrypt i tak musi zapytać
o ruch, żeby zdecydować, czy w ogóle przewijać, więc zapisuje `--show-fade` na korzeniu.

**Strzałek na zdjęciu nie ma** - stara strona kładzie je na kadrze, a ta witryna nie kładzie na
zdjęciu żadnego tekstu ani sterowania.

### 51 zdjęć, trzy rzędy w układzie

Wszystkie kadry są w znaczniku - to jest to, co czyni wersję bez JavaScriptu kompletną: zostaje
lista wszystkich 51, każdy klikalny. Gdyby wszystkie były w układzie naraz, przeglądarka pobrałaby
wszystkie 51 w momencie, gdy sekcja wjedzie na ekran, bo `loading="lazy"` mierzy przecięcie
z oknem, a one dzielą jedną komórkę siatki.

Dlatego wszystko poza **rzędem poprzednim, bieżącym i następnym** ma `hidden`, a obrazek
w `display: none` nie jest pobierany nigdy. Sprawdzone na działającej stronie: po wjechaniu sekcji
na ekran wczytanych jest **11 z 69** na monitorze i **3 z 69** na telefonie. Rząd następny jest zamontowany, ale przezroczysty - to go
pobiera zawczasu i to daje przejściu poprzedni styl, z którego może przejść.

### Co przy okazji trzeba było naprawić

1. **Podgląd zdjęć zawężony do grupy.** `lightbox.ts` brał wszystkie `a[data-lightbox]` na stronie
   do jednego zawijającego się zbioru. Było to bezpieczne, póki żadna strona nie mieszała dwóch
   zestawów - strona główna ma teraz pokaz zdjęć **i** pokaz obsadzeń, więc „Następne”
   wychodziłoby z jednego w drugi. Zbiór to teraz „otwieracze z tego samego kontenera”
   (`[data-lightbox-group]`), liczony w chwili kliknięcia. Bez atrybutu zachowanie jest dokładnie
   poprzednie. Sprawdzone: pokaz 51, obsadzenia 23, `/kwiaty-balkonowe/` 24, `/chryzantemy/` 20,
   `/bratki/` 7.
2. **Powrót focusa po zamknięciu podglądu.** Podgląd oddawał focus kadrowi, na którym stanął -
   a ten w pokazie bywa ukryty albo w poddrzewie `inert`. Trzeba sprawdzać jedno i drugie:
   `offsetParent` łapie `display: none`, `closest("[inert]")` łapie rzędy czekające na swoją
   kolej, bo poddrzewo `inert` odmawia focusa po cichu. Kolejność ratunkowa: kadr oglądany → kadr
   kliknięty → pierwszy widoczny w grupie.
3. **Znaczniki liczone per grupa.** Przy 69 kadrach i zmiennej liczbie w rzędzie znacznik na rząd
   dawałby od 19 do 69 kwadratów.
4. **Kotwica `#zdjecia` na pasie zdjęć.** `PhotoStrip` nie miał żadnego identyfikatora, więc
   „Więcej zdjęć” mogło celować najwyżej w górę strony kategorii.

### Do przejrzenia przez właścicieli

| Miejsce       | Tekst                                                                            | Czyj               |
| ------------- | -------------------------------------------------------------------------------- | ------------------ |
| Nagłówek      | „Zdjęcia z naszego gospodarstwa”                                                 | nasz               |
| Lead          | „Nasze zdjęcia pokazują rytm roku w gospodarstwie i kolejne etapy naszej pracy…” | **od właścicieli** |
| Etykiety grup | nazwy z `offer.ts`, nie nowe                                                     | -                  |

Lead jest jedynym tekstem w tym bloku, którego nie napisaliśmy - przyszedł gotowy. Nagłówek
zostaje na liście do potwierdzenia.

Pełna lista tego, czego blok nie pokazuje, jest wyżej, przy regułach doboru.

## Kalendarz sprzedaży - wrzesień 2026

Właściciele podali we wrześniu 2026 **inne okna sprzedaży niż te z 0.7**, a przy okazji wyszło,
że daty są w kodzie w kilku miejscach naraz i jedno z nich nikt nie aktualizuje: `/bratki/`
obiecywało „sprzedaż w marcu i kwietniu" i „zanim ruszą kwiaty balkonowe i rabatowe" długo po
tym, jak jedno i drugie przestało być prawdą.

### Okna sprzedaży

| Okno | Od             | Do          | Grupy               |
| ---- | -------------- | ----------- | ------------------- |
| 1    | 1 marca        | 31 marca    | Bratki (i prymulki) |
| 2    | 1 kwietnia     | 30 czerwca  | Balkonowe, Rabatowe |
| 3    | 1 października | 1 listopada | Chryzantemy         |

Tabela mieszka w `src/data/season.ts` i jest **jedynym miejscem, gdzie zapisane są daty
sprzedaży**. Karty sezonowe i strony ofertowe czytają z niej; nic nie jest wpisywane ręcznie.

### Reguła: „W trakcie" i „Wkrótce"

Okno obejmujące dzisiejszą datę zapala swojej karcie **„W trakcie"** i ciemne tło. Kiedy żadne
okno nie obejmuje dzisiejszej daty, **„Wkrótce"** dostaje karta najbliższego okna, które ma się
otworzyć - **i to samo ciemne tło**. Stany rozróżnia wyłącznie nadkreślenie, co wystarcza,
bo nigdy nie występują razem: reguła zapala **co najwyżej jedną kartę**, więc na stronie stoi
albo jeden ciemny panel, albo żaden.

| Okres                        | Karta                         | Ciemna |
| ---------------------------- | ----------------------------- | ------ |
| marzec                       | Bratki i prymulki - W TRAKCIE | tak    |
| kwiecień – czerwiec          | Sprzedaż wiosenna - W TRAKCIE | tak    |
| 1 lipca – 30 września        | Chryzantemy - WKRÓTCE         | tak    |
| 1 października – 1 listopada | Chryzantemy - W TRAKCIE       | tak    |
| 2 listopada – koniec lutego  | Bratki i prymulki - WKRÓTCE   | tak    |

**Stan mieszka w sekcji „Kiedy co sprzedajemy" i nigdzie indziej.** Przez jedną iterację stał na
kaflach oferty i to był błąd: kafle są menu - czworgiem równych drzwi do czterech stron - a menu
jest złym miejscem na informację o tym, który jest miesiąc. Pytanie „co się teraz dzieje
w gospodarstwie" jest tematem tej sekcji i tylko ona ma na odpowiedź miejsce: ciemny panel,
zdjęcie i trzy zdania.

### Czego karty już nie robią

**Nie niosą odnośników.** Trzy z czterech stron ofertowych były przez to linkowane na stronie
głównej dwa razy - raz z karty, raz z kafla - w tym samym kształcie „zdjęcie, nagłówek, akapit,
odnośnik", w odstępie jednego ekranu; to ta sama choroba, na którą lekarstwem było usunięcie
`ContactStrip` w 0.6. Karta środkowa i tak nie mogła powiedzieć prawdy: od kwietnia do czerwca
sprzedają się kwiaty balkonowe **i** rabatowe, z dwóch osobnych stron, a karta niesie jeden
odnośnik. Drogą na stronę grupy są kafle, które mają po jednych drzwiach na stronę.

Nadkreślenie karty niesie stan albo nazwę pory roku, a miesiące wróciły do `card__meta` pod
zdjęciem - tam, gdzie stały wcześniej, tyle że biorą się teraz z tabeli okien.

### Wdrożenie: cron musi być codzienny, nie miesięczny

Stan jest wypalany w HTML przy budowaniu, więc zmienia się dopiero przy kolejnym wdrożeniu.
CLAUDE.md mówił dotąd o **miesięcznym** `schedule:` obok `push:` - i to nie wystarcza. Cztery
z pięciu przejść wypadają pierwszego dnia miesiąca, ale piąte to **2 listopada**: przy budowaniu
tylko 1. dnia miesiąca strona przez cały listopad twierdziłaby „CHRYZANTEMY · W TRAKCIE", już
po zakończeniu sprzedaży, dokładnie wtedy, gdy ludzie dzwonią po Wszystkich Świętych.

Codzienny workflow Facebooka tego **nie** załatwia: commituje tylko wtedy, gdy są nowe posty,
więc w spokojnym listopadzie nie wywoła żadnego budowania. `deploy.yml` (jeszcze nie napisany)
ma mieć `schedule:` **codziennie**.

Granica dnia liczy się w `Europe/Warsaw`, nie w UTC - budowanie o 23:30 UTC 31 marca jest tu
już 1 kwietnia, a klient patrzy na swój kalendarz.

## Mozaika w kaflu - dwa kadry, zawsze

Kafle oferty pokazują **po dwa zdjęcia, każde 4:5, w dwóch stałych kolumnach**. Liczba kadrów
jest stałą, nie zmienną - i to jest cała ta poprawka, bo każdy problem tego bloku brał się
z tego, że liczba się ruszała.

**Wersja pierwsza: proporcja na kadrze, kadrów od jednego do trzech.** Kafel bratków - jedna
roślina, jedno zdjęcie - miał pasek trzy razy wyższy niż kafel jedenastu roślin i był
najcięższym elementem sekcji. Mozaika odwracała hierarchię, którą miała pokazywać.

**Wersja druga: proporcja na pasku (4:1), kadrów nadal od jednego do trzech.** Wysokości się
wyrównały, ale kształt kadru zaczął zależeć od tego, ile ich jest: trzy wychodziły prawie
kwadratowe (~70×57 px), a dwa na kaflu „Rabatowe i wieloletnie" robiły się listwami 110×57.
Jedna nierówność zamieniona na drugą.

**Wersja trzecia: dwa kadry 4:3 w `repeat(2, 1fr)`.** Nie ma na czym się wyłożyć, bo nie ma już
zmiennej: każdy kafel ma tę samą wysokość paska i ten sam kształt kadru.

**Wersja czwarta, obecna: te same dwa kadry, ale 4:5.** Zmiana o źródłach, nie o guście.
**Sześć z ośmiu zdjęć, z których te kafle mogą korzystać, to kadry pionowe** - ramka 4:3
wyrzucała z nich 47%. Przy 4:5 zostaje 89%, a pasek rośnie ze 225×82 do 225×136 px przy
1200 px, czyli z dwóch znaczków pocztowych w coś, co czyta się jako produkt. Płacą za to dwa
kadry poziome - pelargonia rabatowa i chryzantema wielkokwiatowa - z których zostaje 45%
i 53%. Kadrowanie jest wyśrodkowane i nigdzie nie jest celowane.

**Proporcja jest zapisana w dwóch miejscach i muszą się zgadzać:** w CSS oraz jako
`width`/`height` na `<Picture>`. Ta para każe Astro wyprodukować plik 4:5; gdyby CSS prosił
o jedną proporcję, a Astro dostało inną, zdjęcie byłoby przycięte dwa razy, a drugiego
przycięcia nie da się wycelować.

**Lista nazw jest przycięta do czterech.** Nadal generuje się z kolekcji i nadal nie może
rozjechać się z ofertą, ale nie wypisuje już wszystkiego: jedenaście roślin balkonowych szło
na pięć linii, a kafel bratków na jedną, i skoro kafle mają wspólną wysokość, ta różnica
wychodziła dziurą w trzech kaflach na cztery. Cztery nazwy i ogon - `i 7 innych` - mówią to,
co ściana jedenastu mówiła źle. Pełna lista jest o jedno kliknięcie dalej, na stronie, do
której ten kafel jest drzwiami. Liczebnik ma trzy formy polskie i czwarty przypadek dla
jedynki, gdzie liczba czyta się gorzej niż słowo: "i jeszcze jedna", nie "i 1 inna".

Dwa to też jedyna liczba, którą treść potrafi zagwarantować: `Rabatowe` mają dokładnie dwa wpisy
ze zdjęciem i nie mają własnego `PhotoStrip`, więc trzeciego kadru nie będą miały nigdy - projekt
wymagający trzech byłby trwale zepsuty na jednym z czterech kafli.

Które dwa - wybiera **kolekcja, nie lista w komponencie**: wpisy grupy wg `order`, które mają
`image`, a jeśli to mniej niż dwa, to `PhotoStrip` grupy (dziś dotyczy tylko bratków: jeden wpis,
cztery zdjęcia w pasie). Grupa, która nie uzbiera dwóch, rozciąga swój jedyny kadr na obie kolumny
w proporcji 8:5, żeby pasek zachował wysokość - dziś żadna nie jest w tym stanie.

## Co jeszcze przy okazji

- **Kafle biorą się z `src/data/offer.ts`**, nowej tabeli oferty, z której `navigation.ts`
  wyprowadza menu, a `content.config.ts` - enum grup w schemacie. Te same cztery adresy stały
  wcześniej w dwóch plikach naraz.
- Kolejność kafli i menu **zostaje bez zmian** - jest kolejnością ważności, nie kalendarza.
  Komentarz w `navigation.ts` twierdził, że to „kolejność roku"; po zmianie okien rok otwierają
  bratki, które stoją trzecie, więc nieprawdziwe zdanie zniknęło.
- **Strony ofertowe drukują okno sprzedaży** pod nagłówkiem („Sprzedaż trwa: marzec",
  „Sprzedaż wkrótce: październik – 1 listopada"), bo wchodzi się na nie prosto z wyszukiwarki,
  nigdy nie widząc strony głównej ani jej kart.
- Odmiana licznika roślin liczy się teraz po polsku w trzech formach; poprzednia reguła
  (`< 5`) dawała „22 roślin" przy dwucyfrowych końcówkach 2–4.

## Prymulki - zamknięte we wrześniu 2026

**Do września 2026 prymulki były na stronie samym słowem.** Nie było opisu ani zdjęcia, więc
nie było wpisu w kolekcji: byłaby to zaślepka obiecująca stronę, która nie ma czego pokazać.
Wchodziły w tytule kafla („Bratki i prymulki"), w tytule karty sezonowej i w zdaniu pod listą
na `/bratki/`, a licznik mówił „1 roślina", bo tyle liczyła strona.

Przyszło zdjęcie i opis, więc `prymulka.md` istnieje, `/bratki/` ma dwa wpisy, licznik mówi
„2 rośliny", a spis „Na tej stronie" i odnośniki „Wróć do spisu roślin" pojawiły się same -
`OfferSection` rysuje je dopiero od dwóch wpisów.

- **Żadnej osobnej grupy i żadnego osobnego adresu.** Wpis siedzi w grupie `Bratki`.
  Właściciele mówią, że sprzedają prymulki dokładnie wtedy co bratki - „bardziej marzec
  i czasami początek kwietnia" - więc `src/data/season.ts` jest **nietknięty** i nadal ma
  jedno okno `03-01 → 03-31` dla całej grupy.
- **`h1` strony to teraz „Bratki i prymulki”**, czyli to, jak tę stronę od początku nazywa
  `navigation.ts` i kafel na stronie głównej. `<title>`, `canonical` i okruszek zostają
  „Bratki”: to jest słowo, na które strona ma się pozycjonować, a `h1` ma opisywać to, co
  na stronie faktycznie stoi.
- **Opis jest nasz, nie właścicieli** - drugi taki wpis na stronie, po chryzantemie
  drobnokwiatowej. Poprawki wobec szkicu były wyłącznie stylistyczne: „Występuje w wielu
  intensywnych kolorach” → „Kwitnie w wielu intensywnych barwach” (słowo „kolory” padało
  w sąsiednim zdaniu, a chipy pod spodem i tak je wyliczają) oraz „Jest ceniona za” → „Ceni
  się ją za”, bo pierwsza wersja kończyła się tą samą formułą co wpis drobnokwiatowej.
- **Trzy zdjęcia do pasa** - `offer-05..07` w `src/assets/pansies/`. Dwa pierwsze to bratki
  (karmin z ciemną plamką, ciemne bordo), trzecie to skrzynka prymulek; idą po czterech
  dotychczasowych, prymulki na końcu, tak jak wpisy nad nimi. Czwarte zdjęcie z tej dostawy
  poszło do wpisu (`plants/prymulka.jpg`) i **nie powtarza się w pasie**, choć było na liście
  dwa razy: plik `(1)` okazał się bajt w bajt tym samym plikiem (identyczny md5).

### Okno sprzedaży bratków i prymulek - do rozstrzygnięcia przez właścicieli

Strona podaje ten termin w **dwóch różnych brzmieniach** i nikt tego nie zamówił:

| Gdzie                                      | Co mówi           |
| ------------------------------------------ | ----------------- |
| `src/data/season.ts` (okno grupy `Bratki`) | `03-01 → 03-31`   |
| `bratek-ogrodowy.md`, fakt `Sprzedaż`      | Marzec – kwiecień |
| `prymulka.md`, fakt `Sprzedaż`             | Marzec – kwiecień |

Rozjazd **jest zastany** - fakt przy bratku stał tak od dołożenia grupy i nie zmienił się,
gdy właściciele skrócili okno do samego marca. Prymulka dostała tę samą wartość co bratek
świadomie: dwa wpisy w jednej grupie nie mogą podawać dwóch różnych terminów, a wybór między
„Marzec” a „Marzec – kwiecień” nie należy do nas. Szkic prymulki podawał jeszcze trzecią
wersję, `1.2–30.4`, i **nie wszedł** - właściciele doprecyzowali, że to „bardziej marzec
i czasami początek kwietnia”, czyli nie okno sprzedaży, tylko ogon.

Do zapytania: czy `season.ts` ma zostać przy marcu (wtedy fakty przy obu wpisach powinny
brzmieć „Marzec”), czy okno ma sięgać kwietnia (wtedy zmienia się też to, kiedy w całej
witrynie zapala się chip „W sprzedaży”). Dopóki to nie jest rozstrzygnięte, automat trzyma
się marca, bo obiecanie towaru, którego może już nie być, jest gorsze niż milczenie.

## Teksty kart sezonowych - wrzesień 2026

Wszystkie trzy karty dostały krótsze tytuły i przepisane opisy. **To szkic projektowy, nie
słowa właścicieli** - punkt „Kalendarz” niżej zostaje przez to otwarty, a tabela poniżej jest
po to, żeby właściciele mieli co z czym porównać.

| Karta                        | Było                                                                                                                                                                          | Jest                                                                                                                                                   |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1 · marzec, tytuł            | „Bratki i prymulki na otwarcie sezonu”                                                                                                                                        | „Bratki i prymulki”                                                                                                                                    |
| 1 · marzec, opis             | „Sezon otwierają bratki i prymulki - w skrzynkach i doniczkach, prosto z tunelu. Sprzedajemy je w marcu, jeszcze zanim ruszą kwiaty balkonowe i rabatowe.”                    | „Zaczynamy sezon od kolorowych bratków i prymulek w skrzynkach i doniczkach. Sprzedajemy je w marcu, jeszcze zanim ruszą kwiaty balkonowe i rabatowe.” |
| 2 · kwiecień–czerwiec, tytuł | „Sprzedaż w okresie wiosennym” (dosłownie z handoffu)                                                                                                                         | „Wiosenny sezon”                                                                                                                                       |
| 2 · kwiecień–czerwiec, opis  | „Kwiaty balkonowe i rabatowe, rozsady oraz gotowe obsadzone skrzynki i doniczki. Kolory i odmiany oglądasz na miejscu, w tunelu.”                                             | „Kwiaty balkonowe i rabatowe, rozsady oraz gotowe kompozycje. Duży wybór kolorów i odmian czeka na miejscu, w naszym gospodarstwie.”                   |
| 3 · jesień, tytuł            | „Chryzantemy wielkokwiatowe” (dosłownie z handoffu)                                                                                                                           | „Chryzantemy”                                                                                                                                          |
| 3 · jesień, opis             | „Duży wybór kolorów. Sprzedaż zaczyna się od początku października i trwa do 1 listopada. Przed Wszystkimi Świętymi zamówienia najlepiej złożyć z tygodniowym wyprzedzeniem.” | „Jesienią oferujemy chryzantemy wielkokwiatowe w wielu kolorach i odmianach. Zamówienia na Wszystkich Świętych warto złożyć około tygodnia wcześniej.” |

Nadkreślenia („Wczesna wiosna”, „Wiosna”, „Jesień”, a na zapalonej karcie „W trakcie”
i „Wkrótce”) oraz podpisy pod zdjęciami **nie zostały ruszone** - podpisy dalej biorą się
z `saleWindows[].months`, czyli z `src/data/season.ts`.

### Co ta podmiana kosztuje

- **Tytuły kart 1 i 3 są odtąd co do słowa nagłówkami kafli oferty** („Bratki i prymulki”,
  „Chryzantemy” - `src/data/offer.ts`). Kafle stoją ekran niżej na tej samej stronie, a karty
  celowo nie mają odnośnika, więc powstaje nagłówek, który wygląda jak te same drzwi, którymi
  nie jest. Przyjęte świadomie: ta sama rzecz nazywa się na stronie tak samo, a kształt bloku
  i tak się różni - nadkreślenie, inne zdjęcie, brak linku.
- **Słowo „tunel” znika z całej sekcji sezonowej.** Karta 1 straciła „prosto z tunelu”,
  karta 2 „w tunelu” na rzecz „w naszym gospodarstwie” - mimo że zdjęcie karty 2 to wnętrze
  tunelu, co mówi jego własny `alt` („…wewnątrz tunelu foliowego”). Tekst przestał opisywać
  obrazek, przy którym stoi. Słowo zostaje na `/faq/`, w historii gospodarstwa
  i w `Directions.astro`.
- **Karta 2 przez dziewięć miesięcy w roku czyta się „WIOSNA / Wiosenny sezon”.** Zapala się
  tylko od kwietnia do czerwca i dopiero wtedy nadkreślenie mówi „W TRAKCIE”. Jako jedyna nie
  może nazwać rzeczy, bo to okno sprzedaje balkonowe _i_ rabatowe, z dwóch stron naraz.
- **„Chryzantemy wielkokwiatowe” schodzą z nagłówka do akapitu.** Fraza, po której stara
  strona się pozycjonuje, zostaje w treści karty i nadal jest tytułem strony `/chryzantemy/`,
  więc nie ginie z serwisu - ale na stronie głównej nie stoi już w `h3`.

### Co zyskuje

- **Opis karty 3 przestaje wpisywać daty ręcznie w prozę.** Zdanie „Sprzedaż zaczyna się od
  początku października i trwa do 1 listopada” było drugim miejscem, w którym okno sprzedaży
  stało słownie - dokładnie tym wzorcem, przez który `/bratki/` reklamowało okno, którego już
  nie miało. Teraz daty stoją pod zdjęciem, z `season.ts`, i tylko tam.
- **„Gotowe kompozycje” wchodzi w słownictwo, którego strona już używa**: `/kwiaty-balkonowe/`
  mówi „kompozycje można oglądać w zakładce Inspiracje”, a sekcja inspiracji otwiera się
  słowem „Kompozycje”. Karta robi więc miękki wskaźnik na `/inspiracje/`.

### Czego nie zrobiono

Pierwsza wersja opisu karty marcowej kończyła się zdaniem „W marcu pojawiają się też pierwsze
kwiaty balkonowe i rabatowe”. To **nieprawda wobec okien sprzedaży** - balkonowe i rabatowe
otwierają się 1 kwietnia - i byłby to powrót do dokładnie tej obietnicy, którą `/bratki/`
składało przed wrześniową korektą. W marcu strona główna mówiłaby, że balkonowe już są,
a `/kwiaty-balkonowe/` drukowałoby pod nagłówkiem samo „Kwiecień – czerwiec”. Zdanie wróciło
więc do brzmienia „jeszcze zanim ruszą”.

Nie da się tego zresztą uratować rozciągnięciem okna na marzec: `seasonOn()` szuka przez
`saleWindows.find()`, czyli bierze **pierwsze** pasujące okno, więc marzec i tak trafiłby na
bratki, a balkonowe dostałyby `null`. Nakładające się okna łamią ten model, nie tylko datę.

## Zgłoszenia właścicieli - wrzesień 2026, druga tura

Pięć uwag po obejrzeniu strony na telefonie. Dwie okazały się usterkami z policzalną
przyczyną, trzy były decyzjami treściowymi.

### 1. Pokaz obsadzeń ścinał napisy z lewej po przełączeniu slajdu

`.panel` miał `flex: 0 0 min(92vw, 980px)`. Na telefonie 92% _okna_ to 354 px, a ścieżka,
w której panel się przewija, ma szerokość okna **minus `--edge` z obu stron**, czyli 345 px.
Panel był więc o 9 px szerszy od swojego pojemnika, a przy `scroll-snap-align: center`
przeglądarka wyśrodkowywała go i wystawał po 4,5 px z każdej strony - ścinając nadkreślenie
i tytuł przy lewej krawędzi. Pierwszy panel wyglądał dobrze wyłącznie dlatego, że nie da się
przewinąć przed początek ścieżki, więc przylegał do lewej i wystawał tylko w prawo.

Naprawa to `min(100%, 980px)`: procent liczy się od pudełka treści ścieżki, więc panel mieści
się w niej dokładnie przy każdej szerokości. Na desktopie `padding-inline` ścieżki i tak
ogranicza to pudełko do 980 px, więc szeroki układ się nie zmienił - zmierzone: panel 980 px
przed i po.

### 2. Pozycje roślin zlewały się na telefonie

`.entry` miał `border-bottom: 1px solid var(--rule)`, a `.facts` - `border-top: 1px solid
var(--rule)`. **Handoff rysuje obie identycznie** (`1px #E0DDCE`, linie 260 i 271), co działa
w dwóch kolumnach: kreska cech biegnie przez kolumnę tekstu, kreska wpisu przez całą stronę.
W jednej kolumnie obie mają tę samą szerokość - zmierzone 345 px i 345 px, ten sam kolor,
ta sama grubość - i przestają się różnić czymkolwiek. Czytelnik nie odróżnia "zaraz będą
cechy" od "tu zaczyna się inna roślina".

Nie ma breakpointu, w którym dałoby się to rozdzielić, więc jedna z dwóch kresek musiała
zniknąć - i zniknęła ta, która niesie mniej znaczenia. **`.facts` nie ma już `border-top`**;
separację przejmuje `padding-top: 1.4rem`. `.entry` zostaje przy `1px solid var(--rule)`.
Na stronie ofertowej linia mówi odtąd dokładnie jedno: tu zaczyna się inna roślina.

To odejście od handoffu, który dla bloku faktów specyfikuje `border-top: 1px solid #E0DDCE`
i `padding-top: 0.85rem` wprost (`docs/design/README.md`, linia 271). Blok nic na tym nie
traci: wersalikowe etykiety `dt` i tak zapowiadają, że zaczyna się inny rodzaj treści.

### Co odrzucono i dlaczego

Pierwszą próbą było **pogrubienie separatora wpisu** do `2px solid var(--rule-dim)`, z
uzasadnieniem, że handoff używa `2px` dla aktywnej pozycji menu. Właściciel odrzucił: grubsza
kreska jest znakiem, którego ten projekt nigdzie indziej na stronie nie stawia, i było to po
prostu widać.

Wybór padł z makiety czterech wariantów, obejrzanych obok siebie przy 400 px:

| Wariant                         | Na czym polegał                                                    | Dlaczego nie                                                                                         |
| ------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| **A - bez kreski nad cechami**  | kreska cech znika, zostaje odstęp                                  | **wybrany**                                                                                          |
| B - krótka kreska nad cechami   | kreska cech skrócona do czterech znaków przy lewej krawędzi        | dokłada do projektu nowy element - krótką kreskę, której nigdzie indziej nie ma                      |
| C - obie 1 px, więcej powietrza | rośnie tylko odstęp wokół końca wpisu, z 28 na 54 px               | jedyny wariant zgodny z handoffem, ale obie kreski nadal wyglądają tak samo - zarzut zostaje         |
| D - nazwa nad zdjęciem          | obie kreski bez zmian, po kresce pada nazwa rośliny, a nie zdjęcie | rozwiązuje problem u źródła, ale wymaga zmiany układu wpisu, a nie jednej reguły - kandydat na potem |

**Wariant D warto zapamiętać.** Dziś na telefonie po kresce idzie 460 px zdjęcia, a nazwa
rośliny pojawia się dopiero pod nim, więc kreska niczego nie zapowiada. Gdyby granicę ogłaszał
nagłówek, podobieństwo kresek przestałoby mieć znaczenie. Przeszkoda jest taka, że na desktopie
nazwa ma zostać w prawej kolumnie, a projekt nie ma breakpointów - więc to zmiana układu
`.entry`, nie jednej linijki CSS.

### 3. FAQ: lista okresów wypadła z "Kiedy co jest w sprzedaży?"

Z frontmattera zniknęło `data: season`. Odpowiedź zostaje, znika spod niej wyliczanka
terminów. Właściciele uznali okresy za źle zrobione, a te same daty stoją już na kartach
sezonowych i pod nagłówkiem każdej strony ofertowej - FAQ drukowało je w trzeciej, gorszej
formie.

**Mechanizm zostaje**: `data: "season"` nadal jest w schemacie, `Faq.astro` nadal umie ten
blok narysować, a kalendarz nadal pochodzi z `season.ts`. Nic go dziś nie używa. Zostały też
nieużywane reguły `.faq__row` i `.faq__months` w stylach komponentu.

**Do rozważenia przy okazji:** odpowiedź nadal zaczyna się od "Sprzedajemy sezonowo, w trzech
oknach w ciągu roku", a teraz już nie mówi, w których. Treść jest właścicieli i nie została
przepisana; zdanie warto im pokazać.

### 4. Zostają dwa telefony

Tadeusz 602 518 401 i Jolanta 662 760 375 są nieaktualne i wypadły z `contact.ts`. Zostają
Mateusz 722 238 987 i Łukasz 514 505 431. Ponieważ wszystko czyta z jednego miejsca, numery
zniknęły naraz z: przycisku w intro, listy na `/kontakt/`, stopki, bloku `phones` na `/faq/`,
przycisków na stronach ofertowych i w pokazie, strony 404 oraz pola `telephone` w JSON-LD.

`primaryPhone` to nadal po prostu pierwszy z listy - czyli od teraz Mateusz, bo stara strona
prowadziła numerem Tadeusza.

### 5. Inspiracje wypadły ze stopki

Właściciele uznali, że inspiracje nie są ofertą. Wypadły z kolumny "Oferta" **i ze stopki
w ogóle** - wybrano usunięcie, nie przeniesienie do kolumny "Informacje".

To **łamie regułę z CLAUDE.md**, wedle której stopka niesie płaską listę każdej strony i nie
wolno jej przycinać. Reguła nie była kaprysem: stopka płaci za schowanie czterech kategorii
za panelem "Oferta". Cztery kategorie zostają, więc ten rachunek nadal się zgadza; ubyła
jedna pozycja spoza oferty. `/inspiracje/` jest dostępne z menu górnego i ze strony głównej.
Zapisane w CLAUDE.md przy tamtej regule, żeby nikt nie "naprawił" tego z powrotem.

`footerOfferLinks` przestało istnieć - stopka bierze wprost `offerPages`, bo alias nie wnosił
już nic.

## Kalendarz - do przejrzenia z właścicielami

| Rzecz                      | Pytanie                                                                                                                                                                                                                                                             |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| „W trakcie"                | dotąd w kodzie i w handoffie stało „Trwa teraz"                                                                                                                                                                                                                     |
| Nagłówek sekcji sezonu     | „Kiedy co sprzedajemy" zamiast „Sezon w gospodarstwie"                                                                                                                                                                                                              |
| Podpisy kart               | „Marzec" (było „Marzec – kwiecień") i „Kwiecień – czerwiec · szczyt sezonu" (było „Maj – czerwiec · szczyt sezonu") - to **odejście od dosłownej treści handoffu** na karcie 2                                                                                      |
| Tytuły i opisy kart        | wszystkie trzy przepisane we wrześniu 2026 - „Bratki i prymulki”, „Wiosenny sezon”, „Chryzantemy”. Szkic projektowy, nie słowa właścicieli; pełne _było → jest_ w sekcji „Teksty kart sezonowych” wyżej                                                             |
| Karty bez odnośników       | do grupy prowadzi teraz wyłącznie kafel oferty                                                                                                                                                                                                                      |
| Długość „Wkrótce"          | chryzantemy zapalają się 1 lipca (trzy miesiące wcześniej), bratki 2 listopada (cztery). Skrócenie to dołożenie granicy w tabeli okien, nie zmiana logiki                                                                                                           |
| **Zima przestała milczeć** | od 2 listopada do końca lutego karta bratków jest ciemna i niesie „WKRÓTCE". CLAUDE.md mówi, że stan zimowy **nie jest zaprojektowany** i nic się w nim nie wymyśla; to jedno słowo, nie odrzucony baner „Sprzedaż wznawiamy w marcu", ale jest decyzją właścicieli |
| Prymulki                   | własny wpis i własna grupa, gdy będzie tekst i zdjęcie                                                                                                                                                                                                              |
| Twarz kafla                | kadry wybiera kolejność `order`, więc zdjęcie pelargonii bluszczolistnej wypchnie kiedyś fuksję z mozaiki bez niczyjej decyzji. Alternatywa: pole `featured` we frontmatterze                                                                                       |

## Posty z Facebooka - wrzesień 2026

Strona główna dostała blok „Co u nas słychać”: trzy ostatnie wpisy z profilu gospodarstwa,
pobierane raz dziennie i zapisywane w repozytorium. Jak to działa i co zrobić, gdy przestanie -
w [`docs/facebook.md`](facebook.md). Tu tylko to, co jest **decyzją do przejrzenia przez
właścicieli**, a nie mechaniką.

### Publikacja jest automatyczna, bez przeglądu

Nikt nie zatwierdza wpisu, zanim pojawi się na stronie. Każdy post z profilu - także
przypadkowy, prywatny w tonie albo udostępniony z cudzego profilu - trafia na wizytówkę firmy
w ciągu doby. Jedyne sito to „post musi mieć tekst albo zdjęcie”.

Tak zostało ustalone świadomie i tak działa, ale **właściciele muszą o tym wiedzieć**, bo to
zmienia sposób, w jaki korzysta się z profilu: od teraz Facebook gospodarstwa jest częścią
strony. Wycofanie wpisu ze strony = usunięcie lub ukrycie go na Facebooku; zniknie przy
najbliższym odświeżeniu, razem ze zdjęciem.

Gdyby to się okazało zbyt ryzykowne, jest gotowa alternatywa mniejszym kosztem: zadanie może
otwierać pull request zamiast commitować od razu, a scalenie to jedno kliknięcie.

### Opisy `alt` zdjęć - do przejrzenia

Facebook nie dostarcza tekstu alternatywnego, a zgadywanie gatunku ze zdjęcia jest na tej
stronie wykluczone (patrz [Zdjęcia](#zdjęcia)). Zdjęcia z wpisów dostają więc opis, który mówi,
**czym jest kadr**, a nie co na nim rośnie:

> `Zdjęcie z wpisu gospodarstwa z 6 września 2026`

To rozwiązanie uczciwe, ale ubogie - nic nie mówi osobie korzystającej z czytnika ekranu o
treści zdjęcia. Lepszego nie ma bez pracy człowieka przy każdym wpisie, czego cały ten
mechanizm miał uniknąć. Do decyzji: zostawić tak, czy przyjąć, że opis pisze się ręcznie przy
wpisach, na których zależy.

### Emoji zostają

Reguła projektu mówi „bez emoji”, ale dotyczy ona elementów samej strony. W cytowanym wpisie
emoji są częścią wypowiedzi właścicieli i są traktowane tak samo jak reszta ich tekstu: nie
przepisujemy, nie czyścimy, tylko skracamy do ok. 200 znaków z linkiem do całości.

### Czego ten blok celowo nie robi

- **Nie prosi o zgodę na cookies i nie musi.** Zdjęcia są pobrane na nasz serwer, a nie
  wyświetlane z serwerów Meta - przeglądarka odwiedzającego nie łączy się z Facebookiem.
  To jedyny powód, dla którego blok nie potrzebuje bramki takiej jak mapa Google, i pierwsza
  rzecz, którą traci każde „uproszczenie” do wtyczki Facebooka albo linkowanego zdjęcia.
- **Nie drukuje numeru telefonu.** Strona główna pokazuje `602 518 401` dokładnie dwa razy i
  tak ma zostać (patrz komentarz w `src/pages/index.astro`).
- **Nie ma nagłówka na wpis ani żadnego brandingu Facebooka** - bez logo, bez niebieskiego,
  bez ikon i liczników reakcji. Że wpisy są z Facebooka, mówi jedno zdanie pod nagłówkiem.
- **Nie dodaje podstrony ani pozycji w menu.** Menu ma nadal osiem pozycji.

## Stopień telefonu i adresu - wrzesień 2026

Właściciele zgłosili, że blok adresowy („Cholewianka 36 / 24-120 Kazimierz Dolny /
woj. lubelskie”) i cztery numery telefonów mają za ciężką czcionkę.

**Skąd się to wzięło.** Handoff rysował ten jeden stopień pisma w Instrument Serif - lekkim,
wysokokontrastowym szeryfie display'owym. Motyw „Poranek w tunelu” (2a) podmienił szeryf na
Newsreader, krój tekstowy o dużo mocniejszej kresce, ale rozmiaru ani wagi nie ruszył. Ten
sam stopień, znacznie więcej atramentu na literę - i akurat na jedynym bloku na stronie,
który składa się wyłącznie z takiego typu.

**Co zrobiono.** Zmniejszony został stopień, nie waga: `--text-tel` w `src/styles/tokens.css`
z `clamp(1.35rem, 1.15rem + 0.6vw, 1.7rem)` na `clamp(1.2rem, 1.05rem + 0.45vw, 1.45rem)`.
W pikselach: 27,2 → 23,2 na szerokim ekranie i 21,6 → 19,2 na telefonie, czyli około 15% w
dół. Adres i telefon nadal są wyraźnie większe od tekstu bieżącego (1,33× zamiast 1,56×),
więc dalej czytają się jako to, po co ten blok istnieje.

Token jest używany w dokładnie trzech miejscach - numery i adres na `/kontakt/` oraz adres
przy mapie na stronie głównej - więc zmiana nie ruszyła nagłówków, nazw roślin, masztu ani
leadów. Zostały nietknięte świadomie: zgłoszenie dotyczyło adresu i telefonów.

**Przy okazji: brakująca spacja w adresie.** Zgłoszenie właścicieli cytowało adres tak, jak
stał na stronie - „24-120Kazimierz Dolny”, bez spacji. To był prawdziwy defekt, nie literówka
w zgłoszeniu. W szablonie `{address.postalCode}` i `{address.city}` stały w dwóch osobnych
wierszach źródła, a kompilator Astro zjada odstęp między dwoma wyrażeniami; ta sama para
w `Footer.astro` stała w jednym wierszu i renderowała się poprawnie. Dotyczyło to adresu na
`/kontakt/` i przy mapie na stronie głównej. Spacja przeniesiona do `postalCity`
w `src/data/contact.ts`, żeby nie zależała od tego, jak prettier złamie wiersz.

**Co zostaje otwarte.** Ta sama przyczyna dotyczy każdego szeryfu na stronie - wszędzie stoi
Newsreader tam, gdzie handoff rysował Instrument Serif. Jeśli nagłówki albo nazwa
gospodarstwa w maszcie też okażą się za ciężkie, drugą dźwignią jest grubość
(`font-weight`), która na wczytywanym pliku Newsreadera działa - wbrew temu, co do września
2026 twierdził komentarz w `src/styles/fonts.css`. **Do decyzji właścicieli po zobaczeniu
strony.**

## Przebudowa menu - wrzesień 2026

Zewnętrzny audyt UX/SEO zgłosił trzy rzeczy naraz i warto je rozdzielić, bo tylko dwie okazały
się prawdziwe:

1. **Menu jest za małe.** Prawda. `0.78rem` (12,5 px) wersalikami z trackingiem `0.1em` to
   wartość wprost z handoffu, ale to drobne pismo jak na podstawową nawigację witryny, której
   odbiorcą są kupujący kwiaty, nie czytelnicy interfejsów.
2. **Menu jest za płaskie.** Prawda. Osiem pozycji o jednej wadze w jednym rzędzie, przy czym
   cztery z nich były kategoriami jednej rzeczy i nic tego nie mówiło.
3. **Brak wyraźnego „następnego kroku”.** Częściowo nieaktualne. Każda strona kategorii kończy
   się od 0.7 przyciskiem „Zadzwoń: 602 518 401” i odnośnikiem „Kontakt i dojazd”, a pod nimi
   nawigacją do trzech pozostałych grup. Audytor tego nie uwzględnił.

### Co przyjęto z audytu

| Uwaga                                  | Decyzja                                                                            |
| -------------------------------------- | ---------------------------------------------------------------------------------- |
| „Oferta” jako menu rozwijane           | **Tak** - natywny `<details>`, plus ~40 linii `src/scripts/nav.ts` jako ulepszenie |
| Usunąć „Strona główna”                 | **Nie** - patrz niżej                                                              |
| Dodać FAQ                              | **Tak**, ale tylko pytania z pewną odpowiedzią                                     |
| „Kwiaty rabatowe”, „Bratki i prymulki” | **Tak**                                                                            |
| „Historia gospodarstwa” → „O nas”      | **Tak** - zmiana widoczna dla klienta, patrz niżej                                 |
| Wyraźne CTA w nagłówku                 | **Nie** - hierarchia z typografii                                                  |
| Powiększyć menu                        | **Tak** - `--text-nav`, 13,8 → 15,7 px                                             |

Menu docelowe: **Strona główna · Oferta ▾ · Inspiracje · O nas · FAQ · Kontakt**, gdzie panel
zawiera Kwiaty balkonowe · Kwiaty rabatowe · Bratki i prymulki · Chryzantemy.

### Dlaczego `<details>`, a nie skrypt

Rozwijane menu zwykle stoi na JavaScripcie. Tutaj nie może: `Nav.astro` był jedynym
komponentem, o którym dało się powiedzieć „nie ma tu nic, co mogłoby się nie otworzyć”, i ta
własność jest warta więcej niż wygoda implementacji.

`<details>` otwiera się, zamyka, przyjmuje fokus i ogłasza swój stan sam z siebie. Czego nie
umie, to zamknąć się na Escape, na kliknięcie poza panelem i na wyjście fokusu - i tylko to
robi `src/scripts/nav.ts`. **Każdy handler w tym pliku wyłącznie zamyka.** Kiedy skryptu nie
ma, jest zablokowany albo rzuci wyjątkiem, menu nadal działa; najgorsze, co się stanie, to
panel zostanie otwarty dłużej, niż powinien. Otwieranie nie może trafić do skryptu.

### Dlaczego „Strona główna” została

Audyt chciał ją usunąć, bo maszt jest linkiem do `/`. Jest - ale nic o tym nie mówi, a ktoś,
kto trafia z Google prosto na `/rabatowe/`, nie ma wtedy widocznej drogi do wejścia. To ta
sama argumentacja, dla której pozycja w ogóle powstała (handoff jej nie przewidywał, bo tam
menu prowadziło do kotwic na jednej stronie).

### Koszt panelu i czym jest spłacony

Schowanie czterech kategorii za `<summary>` odsuwa o jedno kliknięcie **dokładnie te adresy,
które rankują na nazwy roślin**. Spłacają to trzy rzeczy, wszystkie już istniejące, i żadnej
z nich nie wolno okroić:

- stopka trzyma płaską listę wszystkich stron;
- każda strona kategorii kończy się nawigacją „Pozostałe grupy” do trzech pozostałych;
- kafle na stronie głównej są nietknięte.

Przy okazji panel zdjął ograniczenie szerokości, które uzasadniało skróty w `menuLabel`, więc
etykiety są teraz tymi, których ludzie szukają. `tileTitle` zostaje osobnym polem, bo kafel
`/rabatowe/` nadal mówi „Rabatowe i wieloletnie”.

### „Historia gospodarstwa” → „O nas” - do wiadomości właścicieli

Etykieta pochodziła z menu starej strony, a brief mówi „zachować menu i charakter obecnej
witryny”, więc **to zmiana widoczna dla klienta i trzeba ją z nimi potwierdzić.**

Zmieniona została wszędzie, gdzie nazwa jest **nazwą strony**: w menu, w `<title>`,
w okruszku i w stopce. Nie zmieniona została nadlinia nad nagłówkiem na samej stronie
(`label` w `src/content/pages/historia.md`) - `h1` tej strony brzmi „Rodzinna uprawa
w Cholewiance” i nigdy nie brzmiał „Historia gospodarstwa”. Nadlinia jest jedynym miejscem,
gdzie ta rankująca fraza zostaje na stronie, i jest w nim prawdziwa. **Jeśli właściciele
zechcą jej się pozbyć, to jedna linia w tym pliku.**

## FAQ - wrzesień 2026

Nowa strona `/faq/`, sześć pytań, treść w kolekcji `src/content/faq/` (jeden plik na pytanie,
pole `order`, tak samo jak przy roślinach). Pytania **zwijają się** - `<details>`/`<summary>`
bez linii JavaScriptu, pierwsze otwarte; szczegóły i odstępstwa od wzorca z projektu
alpak w [Zgłoszenia właścicieli](#zgłoszenia-właścicieli-po-przebudowie-menu--wrzesień-2026).

**Reguła tej strony: każda odpowiedź jest czymś, co repozytorium już wie.** FAQ to jedyne
miejsce, gdzie zgadnięta wartość zostaje zacytowana odwiedzającemu jako słowo gospodarstwa -
i wraca do niego w wynikach wyszukiwania. Dwie odpowiedzi nie są prozą i nie zostały nigdzie
przepisane: numery telefonów renderują się z `src/data/contact.ts`, a kalendarz sprzedaży
z `src/data/season.ts`, więc nie mogą się rozjechać z kartami sezonowymi ani ze stronami
kategorii.

Co jest na stronie i skąd:

| Pytanie                                      | Źródło odpowiedzi                                                                |
| -------------------------------------------- | -------------------------------------------------------------------------------- |
| Czy prowadzicie sklep internetowy i wysyłkę? | brak e-commerce (brief); zdanie stoi już na stronach kategorii                   |
| Jak złożyć zamówienie?                       | `contact.ts` - cztery numery, renderowane                                        |
| Kiedy co jest w sprzedaży?                   | `season.ts` - okna, renderowane, ze stanem „sprzedaż trwa” / „wkrótce”           |
| Czy rośliny pochodzą z własnej uprawy?       | `src/content/pages/historia.md` - 1991, od 1997 kwiaty, 2,5 tys. m² pod osłonami |
| Ile kosztują rośliny i czy dowozicie?        | zdanie o cenach i dowozie stojące już na stronach kategorii                      |
| Gdzie jesteście i jak dojechać?              | `contact.ts` - adres                                                             |

**Odpowiedź o kalendarzu wylicza się przy buildzie**, jak karty sezonowe. To kolejny powód,
dla którego `deploy.yml` musi mieć **codzienny** `schedule:` - bez niego FAQ zamarza razem
z kartami, tylko że jako całe zdanie, a nie jedno słowo na kaflu.

**Znacznik `FAQPage` w JSON-LD jest, ale nie po wyniki rozszerzone.** Google od sierpnia 2023
pokazuje je praktycznie wyłącznie stronom rządowym i medycznym - gospodarstwo ogrodnicze nie
zobaczy z tego nic w SERP-ie i nie należy tego obiecywać. Jest, bo nic nie kosztuje i bo
jednoznacznie opisuje treść modelom językowym.

### Pytania do właścicieli - bez nich FAQ się nie rozrośnie

To są rzeczy, o które ludzie pytają przez telefon, a strona nie umie odpowiedzieć. Żadna nie
została zgadnięta:

1. **Godziny sprzedaży w sezonie.** `openingHours` w `contact.ts` jest `null`, JSON-LD pomija
   `openingHoursSpecification`. Najczęstsze pytanie ze wszystkich.
2. **Czy można zapłacić kartą**, czy wyłącznie gotówką.
3. **Minimalne zamówienie** - czy jest, i przy jakich ilościach zaczyna się cena hurtowa.
4. **Warunki dowozu** - do jakiej odległości, od jakiej wartości zamówienia. Strona mówi tylko,
   że dowóz „jest możliwy”.
5. **Adres e-mail.** `email` w `contact.ts` jest `null`.
6. **Czy można zamówić z wyprzedzeniem na konkretny termin** (np. na 1 listopada).
7. **Czy przyjmują zwrot doniczek / skrzynek.**

## Zgłoszenia właścicieli po przebudowie menu - wrzesień 2026

Trzy uwagi po zobaczeniu wersji 0.10.0, wszystkie trafione.

### 1. Nie widać podkreślenia bieżącej pozycji

**Co się działo.** Aktywna pozycja menu ma zieloną kreskę 2 px na dole swojego pudełka. Pudełko
miało 48 px i stało wypełnione do samego dna paska, więc kreska kończyła się na y=168, kreska
dolna nagłówka szła przez 168–169, a na stronie głównej zdjęcie zaczynało się na 169.
**Jeden piksel odstępu** - zmierzone w przeglądarce, nie oszacowane.

To nie był problem koloru ani grubości: podkreślenie po prostu nie miało gdzie stanąć.

**Co zrobiono.** `padding-block: clamp(0.4rem, 1vw, 0.7rem)` na pasku menu. Odstęp od
podkreślenia do zdjęcia wzrósł z 1 px do 12 px na szerokim ekranie. To załatwia obie połowy
zgłoszenia naraz - także „oddal zdjęcie od menu” - bez dokładania pustego elementu i bez
rezygnacji z kadru na całą szerokość. Nagłówek urósł o 22 px.

Panel „Oferta” musiał pójść za tym: wisi teraz na `calc(100% + var(--nav-pad-block))`, czyli od
dolnej krawędzi **paska**, a nie od dołu swojego linku. Obie wartości czytają jedną własną
własność CSS, żeby nie mogły się rozjechać.

### 2. Nagłówek na zdjęciu za duży i za ciężki

Miał 62,4 px przy 1440 px, w Newsreaderze o wadze 400, biały na przyciemnieniu. Dwie różne
przyczyny, dwie różne dźwignie:

- **Rozmiar.** 62,4 px przy maszcie ograniczonym do 37,6 px to stosunek 1,66. Nagłówek ma być
  największym typem na ekranie, ale nie musi wygrywać aż tak. `--text-h1` zeszło na
  `clamp(1.95rem, 1.3rem + 2.6vw, 3.05rem)` - 48,8 px przy 1440 px, stosunek 1,30. Token ma
  w projekcie **jednego użytkownika** (`Intro.astro`); wszystkie pozostałe `h1` rysują się na
  `--text-h2-wide`, więc zmiana nie ruszyła żadnej innej strony.
- **Waga.** Biały typ na ciemnym tle czyta się cięższy niż ta sama kreska atramentem na
  papierze. `Intro.astro` ustawia na tym jednym elemencie `font-weight: 350` i
  `letter-spacing: -0.015em`. Oś `wght` wczytywanego pliku Newsreadera **działa** - sprawdzone
  pomiarem szerokości tekstu przy 400, 350 i 300, każda inna, więc 350 naprawdę ścieńcza
  kreskę, a nie zaokrągla się z powrotem do 400.

**Kontrast przemierzony, bo skrócenie nagłówka zmienia wysokość przyciemnienia**, a od jego
wysokości zależy, gdzie na gradiencie siedzi nadlinia. Mierzone w przeglądarce, na
najjaśniejszym pikselu faktycznie obecnym w kadrze, przez złożenie zdjęcia z gradientem
w canvasie:

| Szerokość | Kadr | Nadlinia (próg 4,5:1) | Nagłówek (próg 3:1) |
| --------- | ---- | --------------------- | ------------------- |
| 1440 px   | 3:1  | **5,00:1**            | **8,43:1**          |
| 400 px    | 3:2  | **4,90:1**            | **9,36:1**          |

Nadlinia zyskała odrobinę kontrastu, a nie straciła: krótsze przyciemnienie sadza ją niżej,
w gęstszej części zbocza. To jest zarazem **pierwszy prawdziwy pomiar tego kadru w
przeglądarce** - wrześniowa podmiana zdjęcia na generowane była tylko oszacowana offline
i plik `Intro.astro` prosił o potwierdzenie.

### 3. FAQ ma się zwijać

Zrobione na wzór skończonej strony tego samego właściciela
(`../alpaki-kazimierz/alpaki-kazimierz-site/src/components/Faq.astro`): `<details>`/`<summary>`,
**zero JavaScriptu**, pierwsza pozycja otwarta, żeby wzorzec był widoczny bez kliknięcia.
Akordeon nie jest wykluczający - można mieć otwarte dwie odpowiedzi naraz i porównać je.

Dwa odstępstwa od wzorca z projektu referencyjnego, oba świadome:

- **Znacznik.** Referencja używa `+` / `–`. Tu jest ten sam chevron z dwóch krawędzi 1 px, co
  przy „Oferta” w menu. Dwa różne znaki na „to się otwiera” na jednej witrynie to o jeden
  za dużo, a projekt i tak zabrania ikon i buduje hierarchię kreskami.
- **Nagłówki zostają.** `h2` siedzi **wewnątrz** `<summary>`, na co pozwala specyfikacja HTML
  (summary przyjmuje treść frazową „opcjonalnie przemieszaną z treścią nagłówkową”). Referencja
  rezygnuje z nagłówków; strona, której całym zadaniem jest odpowiadać na pytania, nie powinna
  oddawać własnego konspektu. Sprawdzone: `h1` plus sześć `h2`.

Odpowiedzi zostają w HTML-u także zamknięte, więc widzi je i robot, i blok `FAQPage` w JSON-LD.

### 4. Pytania w FAQ za ciężkie

Druga taka uwaga w jednym wydaniu, po nagłówku na zdjęciu — i tym razem przyczyną nie był
stopień pisma, tylko to, do czego został użyty.

Pytania rysowały się na `--text-h3`, czyli 32 px przy 1280 px. Ten krok skali niesie **nazwę
rośliny, tytuł kafla oferty i podpis slajdu** — za każdym razem jeden temat nad własną
treścią, raz albo dwa razy na ekranie. Zamknięty akordeon to sześć takich linii jedna pod
drugą, a sześć wierszy 32-punktowej szeryfowej antykwy to ściana atramentu, nie lista do
przejrzenia.

Dlatego powstał osobny krok, `--text-question`, a **`--text-h3` został nietknięty** — trzy
komponenty, które go używają, nigdy nie były problemem.

|                                 | Przed | Po                         |
| ------------------------------- | ----- | -------------------------- |
| Stopień przy 1280 px            | 32 px | **22,5 px**                |
| Stosunek do tekstu bieżącego    | 1,83× | **1,29×**                  |
| Stosunek `h1` strony do pytania | 1,45× | **2,06×**                  |
| Waga                            | 400   | **375**, tracking −0,005em |

Waga i tracking to ta sama korekta optyczna co przy `--text-h1` i z tego samego powodu:
Newsreader ma mocniejszą kreskę niż Instrument Serif, który był rysowany w handoffie, i widać
to najbardziej w dużych stopniach. Interlinia poszła z 1,15 na 1,25, bo na telefonie te
wiersze łamią się na dwie linie.

Sprawdzone przy 400 px: pytania schodzą do 18,5 px, każdy wiersz ma co najmniej 58 px wysokości
(próg dotykowy to 44 px), chevron nigdy nie wchodzi na tekst, brak przewijania w poziomie.

## Obsadzenia - opisy od właścicieli, wrzesień 2026

Właściciele przejrzeli wszystkie 23 obsadzenia i **podali gatunki oraz komplet tekstów**: do
każdego kadru akapit opisu i akapit porady. To zamyka najstarszą lukę tej strony -
piętnaście z 23 paneli drukowało dotąd „Obsadzenie mieszane - gatunki do wpisania przez
gospodarstwo”, a pozostałe osiem „Rozpoznane z opisu zdjęcia - do potwierdzenia przez
gospodarstwo”. **Oba te podpisy zniknęły**, bo oba przestały być prawdą.

### Jeden błąd rzeczowy, który przy okazji wyszedł

Kadr 13 był opisany jako `pelargonie-i-srebrne-liscie`, z chipem „Pelargonie rabatowe”
i opisem `alt` „Rabata z pelargoniami i roślinami o srebrzystych liściach”. Komentarz
w kodzie sam się przyznawał, że to odczyt, nie wiedza („to confirm with the owners - it could
as well be the ivy-leaved ones”). Odpowiedź właścicieli jest przecząca: to **niecierpki
nowogwinejskie**. Kotwica, tytuł, chip i `alt` zostały poprawione.

### Gdzie teraz mieszkają obsadzenia

W nowej kolekcji treści `src/content/compositions/` - jeden plik `.md` na obsadzenie, nazwa
pliku jest kotwicą, dokładnie jak w `plants` i `faq`. Wcześniej były polem `composition` na
rejestrze zdjęć w `src/data/gallery.ts`, co było w porządku, dopóki obsadzenie było nazwą
i listą roślin. Dwa tysiące słów polskiej prozy w pliku TypeScript nie jest już w porządku -
mówi o tym nagłówek `src/content.config.ts`.

`tip` stoi we frontmatterze mimo reguły „proza w body”. To świadomy wyjątek: body niesie
opis, a porada jest osobnym akapitem drukowanym pod własną etykietą, więc trzymanie obu
w jednym body wymagałoby dzielenia wyrenderowanego HTML-a po `<hr>`. Ten sam kompromis, co
`question` w `faq`.

**Efekt uboczny, dla którego warto było:** blok historii i wiosenna karta sezonu sięgały po
swoje zdjęcia **przez pozycję w tablicy** (`gallery[16]`, `gallery[17]`). Przestawienie
jednego kadru w rejestrze po cichu zmieniłoby oba bloki. Teraz proszą o zdjęcie po nazwie
(`compositionPhoto("rozowo-biala-wystawa-kalibrachoi")`), a nazwa, która przestaje się
rozwiązywać, wywala build zamiast pokazać nie ten obrazek. Zostało jedno takie wywołanie:
blok historii ma od września 2026 własne zdjęcie i nie pożycza już kadru z obsadzeń.

### Trzy stany chipa zamiast dwóch

`href: null` w `src/data/plant-links.ts` znaczyło dotąd jedno: „sprzedajemy, brak wpisu”.
Właściciele nazwali w kadrach także rośliny, których **nie sprzedają osobno**, więc plik
rozróżnia teraz trzy przypadki:

| Stan                    | Wygląd chipa        | Rośliny                                                                                 |
| ----------------------- | ------------------- | --------------------------------------------------------------------------------------- |
| wpis istnieje           | odnośnik            | begonie, calibrachoa, goździki, niecierpki nowogwinejskie, pelargonie rabatowe, werbena |
| sprzedajemy, brak wpisu | nazwa bez odnośnika | petunie i surfinie, hortensje, brachyscome, plektrantus, wilczomlecz, koleus, bidens    |
| `companion: true`       | nazwa + `· dodatek` | gaura, pennisetum, lizymacja                                                            |

`qualifier` dopisuje do nazwy to, czego sama nazwa nie mówi („trawa ozdobna”, „liście
ozdobne”, „Euphorbia ‘Shades in Pink’”). Jest własnością rośliny, nie kadru - kolory, które
akurat widać na danym zdjęciu, mówi opis tego obsadzenia.

### Co zrobiliśmy z nadesłanym tekstem

Opisy weszły **bez skracania**. Zmiany są trzy i wszystkie redakcyjne:

1. **Tryb rozkazujący → rejestr bezosobowy.** „Posadź je gęsto” → „warto sadzić je gęsto”,
   „jeśli zależy Ci na mocnym akcencie” → „dla mocnego akcentu kolorystycznego”, „Im więcej
   miejsca dasz roślinom” → „Im więcej miejsca mają rośliny”. Tym samym głosem mówi reszta
   strony: `calibrachoa.md` („Warto stosować nawozy”), `/faq/` („warto zadzwonić wcześniej”).
2. **Zdania z domysłem wypadły.** Nadesłany tekst przy kadrze 17 pisał „wygląda na
   plectrantusa”, a przy 20 „To bardzo prawdopodobnie odmiana Euphorbia ‘Shades in Pink’”.
   Gatunki są potwierdzone, więc niepewność nie ma po co stać na stronie; sama nazwa odmiany
   przeniosła się do `qualifier` chipa, a reszta akapitu o wilczomleczu została.
3. **Jedna etykieta porady.** Tekst nazywał ten sam blok trzema nazwami („Pomysł do
   wykorzystania”, „Do stworzenia podobnego efektu”, „Pomysł na własną kompozycję”). Na
   stronie jest jedna: **„Nasza podpowiedź”**.

Drobiazg: w poradach ujednolicono pisownię na `Calibrachoa`, bo tak nazywa się wpis
w ofercie; „kalibrachoa” i „milion dzwonków” zostają w tytule i w treści tam, gdzie
właściciele ich użyli.

### Czego strona nadal nie mówi

- **Kadry 3 i 4** mają „drobne białe kwiaty ozdobne”, **kadr 21** „roślinę o srebrzystych
  liściach”, a **kadr 13** srebrzyste rośliny liściaste i trawy ozdobne - właściciele nie
  nazwali ich z gatunku. Są opisane w prozie i **nie dostają chipa**: sekcja „Kwiaty w tym
  obsadzeniu” wymienia to, co da się kupić i nazwać, a nie wszystko, co widać.
- **Kadr 8 nie przyszedł z tekstem** - nadesłana lista przeskakuje z 7 na 9. Opis i porada do
  „Biało-czerwonej ekspozycji begonii” są **napisane przez nas**, w rytmie sąsiednich paneli
  begoniowych (6, 7, 9, 10). To jedyny tekst na `/inspiracje/`, którego autorem nie jest
  gospodarstwo, i wymaga ich przejrzenia.

### Dwa lidy - odejście od handoffu

| Miejsce                                                           | Handoff                                                                                  | Teraz                                                                                                                   |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| „Kwiaty w naszej ofercie” (strona główna + dwie strony kategorii) | „Przy każdej roślinie piszemy, jak ją uprawiać i w jakich kolorach jest u nas dostępna.” | „Kwiaty z naszej uprawy. Przy każdej roślinie są najważniejsze informacje o jej uprawie i o kolorach dostępnych u nas.” |
| „Inspiracje”                                                      | „Obsadzenia z naszej uprawy - kosze, skrzynki, donice i rabaty…”                         | „Kompozycje z kwiatów, które uprawiamy. Kosze, skrzynki, donice i rabaty pokazują różne sposoby łączenia roślin…”       |

Pierwsze zdanie było przepisane słowo w słowo z `docs/design/README.md`. Oba nowe są
w rejestrze bezosobowym - ta sama decyzja, co przy poradach.

**Świadomie przyjęta nieścisłość - zamknięta we wrześniu 2026.** Na stronie głównej sekcja
„Kwiaty w naszej ofercie” pokazuje cztery kafle kategorii, a nie listę roślin, więc zdanie
o „każdej roślinie” było tam nietrafione. Wada szła od handoffu i była utrzymywana świadomie,
żeby trzy miejsca mówiły jednym zdaniem zamiast rozjechać się na dwa warianty. Właściciel
podał osobny tekst dla strony głównej i ten kompromis się skończył - patrz
[Wyrównanie lidów](#wyrównanie-lidów---wrzesień-2026).

## Wyrównanie lidów - wrzesień 2026

Zgłoszenie właściciela: „wyrównaj nagłówki”. Cztery strony kategorii miały mówić jedno zdanie,
a mówiły dwa - `/kwiaty-balkonowe/` i `/rabatowe/` miały lid, `/bratki/` i `/chryzantemy/` nie.

- **Zdanie zeszło z czterech plików stron do `OfferSection.astro`**, jako stała `OFFER_LEAD`
  i domyślna wartość propa `lead`. Żadna strona już go nie przekazuje. To odstępstwo od reguły,
  że tekst strony mieszka w pliku strony (`title`, `note`, `description` mieszkają tam nadal)
  - uzasadnione tym, że **to jedyne zdanie, które ma być identyczne na wszystkich czterech**,
    a cztery kopie jednego zdania to dokładnie ten mechanizm, który doprowadził do zgłoszenia.
    Jedna kopia nie ma jak się rozjechać. Strona, która chciałaby powiedzieć co innego, nadal
    może podać własny `lead`, a `lead=""` wyłącza go zupełnie.
- **`/chryzantemy/` odzyskało lid i to nie jest cofnięcie decyzji właścicieli.** We wrześniu
  2026 kazali usunąć stamtąd **inne** zdanie - „Duży wybór kolorów. Sprzedaż zaczyna się od
  początku października i trwa do 1 listopada.” - bo powtarzało termin i kolory, które niosą
  już fakty i chipy przy wpisach. Wspólny lid nie podaje ani jednego, ani drugiego; mówi, gdzie
  czego szukać.
- **Strona główna dostała własny tekst**, podany przez właściciela: „Nasza oferta obejmuje
  różnorodne gatunki i odmiany kwiatów, dopasowane do różnych potrzeb i warunków uprawy.
  Różnorodność kolorów, form i terminów kwitnienia pozwala wybrać rośliny odpowiednie na każdy
  sezon.” Tym samym **domyka nieścisłość opisaną wyżej**: sekcja pokazuje cztery kafle
  kategorii, więc zdanie o „każdej roślinie” opisywało tam coś, czego na ekranie nie ma. Teraz
  kafle mówią o ofercie jako całości, a cztery strony o tym, co stoi przy każdej roślinie.
- **Zgłoszenie zawierało literówkę** - polecenie brzmiało „zamień X na X”, dwa razy to samo
  zdanie. Przyjęto odczytanie wynikające z reszty zgłoszenia: zdanie zostaje na stronach
  kategorii i ma być na wszystkich czterech, a nowy tekst dotyczy strony głównej. Do
  potwierdzenia, gdyby intencja była inna.

## Rozdzielenie sekcji i zmiana kroju - wrzesień 2026

Zgłoszenie właściciela było jednozdaniowe: „brakuje mi rozdzielenia kolorami sekcji na
stronie głównej, na razie się wszystko zlewa", ze wskazaniem na
<https://alpaki-kazimierzdolny.pl/> - drugą stronę tego samego właściciela - jako wzór.

Decyzje zapadły na makiecie porównawczej z przełącznikami (krój, układ, nagłówek, pasy tła,
akcent, paleta), nie z opisu. To jest warte zapamiętania jako sposób pracy: właściciel
powiedział wprost, że nie jest w stanie ocenić tych rzeczy z tekstu.

### Co zostało wybrane

| Decyzja         | Wybór                                                    |
| --------------- | -------------------------------------------------------- |
| Krój szeryfowy  | Fraunces zamiast Newsreadera; Public Sans bez zmian      |
| Nagłówek strony | bez zmian - trzy piętra, tagline zostaje na miejscu      |
| Hero            | dwie kolumny, kadr 4:5; panorama ze scrimem odpada       |
| Reszta układu   | bez zmian - karty sezonowe i cztery kafle oferty zostają |
| Pasy tła        | trzy jasne grunty + ciemny pas „Inspiracje" + stopka     |
| Akcent          | ochra, wyłącznie w nadtytułach i licznikach              |
| Chip sezonowy   | wraca na kafle oferty, w trzech stanach                  |
| Pasek menu      | stopień cofnięty do wartości z handoffu                  |
| Paleta 2a       | bez zmian                                                |

Z odrzuconej makiety „zielnik" weszło **wyłącznie hero**. „Rytm roku" i numerowane tablice
I–IV nadal nie są wdrożone.

### Cztery cofnięcia wcześniejszych decyzji

Każde z nich cofa coś, co miało w kodzie zapisane uzasadnienie. Uzasadnienia zostały
**przepisane, nie skasowane** - bo argument, który przegrał, zwykle nie był zły, tylko
przegrał z innym, i bez niego ktoś za pół roku cofnie cofnięcie.

1. **„Kafle oferty nic nie mówią o dacie."** Chip wrócił. Argument, który przegrał: cztery
   równe drzwi do czterech stron, a drzwi zmieniające kolor z miesiącem to gorsze drzwi.
   Argument, który wygrał: ktoś, kto trafia tu w lipcu i otwiera „Chryzantemy", dostaje pełny
   katalog bez śladu informacji, że nic z niego nie jest w sprzedaży przez najbliższe trzy
   miesiące, a pasmo sezonu ekran wyżej z nim nie podróżuje.
2. **„Maksymalnie dwa tła."** Doszedł trzeci jasny grunt, `--paper-sage` `#EBEEE1`, z zielonym
   podbiciem - żeby trzy grunty różniły się odcieniem, a nie tylko jasnością; `#FAF7F0`
   i `#F2EFE4` dzieli ćwierć kroku i trzecia wartość na tej samej linii czytałaby się jak
   wada druku, nie jak podział sekcji.
3. **Zieleń jako jedyna rodzina koloru.** Ochra `#875B0C` / `#E8B75C` to pierwszy kolor spoza
   niej. Granica jest częścią decyzji: nadtytuły i liczniki, nigdy tekst bieżący, przyciski,
   linki w prozie, podkreślenie w menu ani chipy sezonowe. Wartość jest dosłownie tym samym
   tokenem, którego używa strona alpak - obie strony mają czytać się jak jedna rodzina.
4. **Powiększony stopień w menu.** Wprowadzony w 0.10 na zgłoszenie zewnętrznego przeglądu
   UX („menu jest płaskie i drobne"), cofnięty przez właściciela po obejrzeniu. Grupowanie
   pod panelem „Oferta" - czyli odpowiedź na „płaskie" - zostaje; cofnięty jest sam rozmiar.
   Przegląd UX nie jest klientem.

### Co zniknęło razem z hero

**`--hero-scrim` - jedyny gradient tonalny w projekcie** i jedyne miejsce na stronie, gdzie
kontrast trzeba było mierzyć w przeglądarce, bo tłem tekstu było zdjęcie i przypadkiem
najgorszym był najjaśniejszy piksel kadru. Nic na tej stronie nie kładzie już tekstu na
fotografii. **Metoda pomiaru zostaje zapisana** w sekcji
[Zgłoszenia właścicieli po przebudowie menu](#zgłoszenia-właścicieli-po-przebudowie-menu--wrzesień-2026)

- złożenie zdjęcia z gradientem w canvasie i przemiecenie pasma tekstu w poszukiwaniu
  najgorszego piksela. Gdyby tekst kiedykolwiek wrócił na zdjęcie: nie wymyślać tego od nowa
  i nie szacować offline.

Przy okazji zniknęła **jedyna media query w projekcie** (hero przełączał kadr 3:2 → 3:1 przy
700 px). Projekt ma teraz zero punktów łamania; `grep -rn "@media" src/` zwraca wyłącznie
`prefers-reduced-motion`.

### Kroje: który plik Fraunces i ile to kosztuje

Fontsource rozbija Fraunces na sześć plików i nazwy nie mówią, który co niesie. Rozstrzygnięte
tą samą metodą, którą rozstrzygnięto kiedyś Newsreadera - ważeniem plików i porównaniem sum
kontrolnych. Wynik: `opsz` i `standard` są bajt w bajt tym samym plikiem, ale - inaczej niż
przy Newsreaderze - **żaden z nich nie jest pełnym krojem**; osie `SOFT` i `WONK` niesie
dopiero `full`.

Waga, latin + latin-ext, odmiana prosta i kursywa razem:

| Wariant                               | Waga       | Względem stanu sprzed zmiany   |
| ------------------------------------- | ---------- | ------------------------------ |
| Newsreader `opsz` - to, co zastąpiono | 448 kB     | —                              |
| **Fraunces `opsz` - wczytywany**      | **273 kB** | −175 kB                        |
| Fraunces `soft`                       | 258 kB     | −190 kB, ale bez osi optycznej |
| Fraunces `full` (cztery osie)         | 494 kB     | +46 kB                         |

Wybrano `opsz`, bo cała doktryna typograficzna tego projektu stoi na osi optycznej:
`font-optical-sizing: auto` w `tokens.css` wiąże ją z rozmiarem dla każdego elementu, a typ
display chodzi tu od 12,5 px w menu do 60 px w nagłówku. `SOFT` i `WONK` zmieniają zakończenia
kresek i garść wariantów glifów - charakter, nie czytelność - i kosztują 221 kB.
**Gdyby właściciele chcieli je jednak mieć, to jedno słowo w dwóch importach** (`opsz` →
`full`) i nic poza tym: żadnego tokenu, żadnego komponentu.

Cała skala display zeszła przy okazji o 4%: Fraunces ma wyraźnie większą wysokość x niż
Newsreader i przy tych samych wartościach czyta się o stopień za duży.

### Pasy tła na stronie głównej

Układ ustalony w drugim podejściu, po obejrzeniu kandydatów bok w bok. Nagłówek liczy się
jako dwie osobne płaszczyzny, bo nią jest.

| Sekcja           | Grunt                            | Styk z poprzednią |
| ---------------- | -------------------------------- | ----------------- |
| `Header` (nazwa) | `--paper` `#FAF7F0`              | —                 |
| `Nav` (pasek)    | `--paper-linen` `#F7F3EA`        | 1,04:1            |
| `Intro`          | `--paper-blush` `#F5EDE6`        | 1,05:1            |
| `SeasonCards`    | `--green-band` `#38442F` (płyta) | 8,91:1            |
| `OfferOverview`  | `--paper-clay` `#F4EEE4`         | 8,94:1            |
| `Compositions`   | `--green-band` (płyta)           | 8,94:1            |
| `FacebookNews`   | `--paper-clay`                   | 8,94:1            |
| `Directions`     | `--green-band` (płyta)           | 8,94:1            |
| `Footer`         | `--ink` `#1F2A21`                | 1,44:1            |

**Pasek menu rozdzielają kreski, nie kolor.** Trzy ciepłe grunty u góry dzieli 1,04 i 1,05
do jednego, czyli praktycznie nic - pasmo menu wyodrębnia `border-top` na `nav` i
`border-bottom` na `header`. Obie istniały od początku; usunięcie którejkolwiek zostawia menu
pływające w jednym ciepłym polu. Kolor tam tylko ociepla pasmo, nie dzieli.

**`FacebookNews` renderuje się teraz zawsze** - i to jest zmiana, którą wymusił ten układ,
a nie estetyka. Blok jest jasnym pasmem między dwiema ciemnymi płytami, a dwie ciemne płyty
nie dają się od siebie odróżnić (patrz niżej). Do września 2026 blok znikał w całości przy
pustym snapshocie - reguła słuszna i stosowana na stronie alpak - ale jego zniknięcie sklejało
Inspiracje z dojazdem w jeden blok wysoki na dwa ekrany. Stan pusty pokazuje nagłówek, inny
lead i odnośnik do profilu; nie zmyśla żadnych wiadomości. **Nagłówek i oba leady są naszymi
słowami, nie właścicieli** - do przejrzenia razem z resztą tekstów tego bloku.

**Wszystkie trzy ciemne płyty stoją na jednym tokenie `--green-band` `#38442F`.** Wartość
ustalała się w czterech podejściach i warto zapisać, czym każde padło, bo dwa środkowe
wskazywały w przeciwne strony:

1. `--green-deep` `#3D4A33` - to samo tło, co blok historii. Właściciel: **za ciemne**.
2. `#556848`, mniej więcej dwukrotność jego jasności. Właściciel: **nie ten kolor.** Przy tej
   wartości trzeba było już poświęcić hierarchię tekstu: `--green-lit` spadał do 3,87:1, więc
   etykiety musiały wziąć kolor akapitów, a ochra (3,28:1) była poza zasięgiem całkiem.
3. `#2E3A2B` - wybrane z porównania bok w bok, zaakceptowane słowami „ten kolor super".
   **„Za ciemne" okazało się znaczyć „nie ten odcień", nie „za mało światła"** - kierunek był
   odwrotny, niż sugerowało pierwsze zgłoszenie.
4. `#38442F` - wybrane przy dobieraniu tła pozostałych sekcji, gdy okazało się, że wszystkie
   trzy płyty mają być tym samym kolorem. Nieco jaśniejsze od poprzedniego i to ono jest
   wdrożone.

Trzecia wartość nie kosztuje nic po stronie tekstu i oddaje wszystko, co druga zabrała:
`--bone` 10,39:1 (nagłówki), `--green-body` 9,04:1 (akapity), `--green-lit` 7,63:1 (etykiety
i podpisy - własny, trzeci stopień zamiast pożyczonego), `--ochre-lit` 6,47:1 (nadtytuł, gdyby
kiedyś doszedł), `--paper` 11,18:1 (tekst na wypełnieniu).

**Ciemne płyty nie mogą ze sobą sąsiadować, i to jest twarde ograniczenie, nie preferencja.**
Powyżej luminancji 0,076 gaśnie na płycie ochra, powyżej 0,098 etykiety - więc cały używalny
zakres ciemnych zieleni ma 1,80:1 od końca do końca. Dwie sąsiadujące płyty nigdy nie
przeczytają się jako dwie, niezależnie od tego, jak starannie dobrane. Na stronie głównej
rozdziela je zawsze jakaś jasna sekcja, co czyni kolejność sekcji warunkiem poprawności.
Jedynego styku, którego nie da się naprawić, dostarcza stopka: `--green-band` przy `--ink`
to 1,44:1, a koloru stopki nie negocjujemy.

**Kosztuje za to dwa wypełnienia.** Na tak ciemnym gruncie kafelek na `--green-slot` ma 1,09:1,
a przycisk na `--green-deep` 1,27:1 - płytki, których nie widać, a i tak rysowane. Dlatego na
tym pasie kafelek jest samą obwódką (jak przyciski sterowania obok, więc pas raczej zyskuje
spójność, niż traci kształt), a stany wciśnięte odwracają się na jasne wypełnienie z ciemnym
tekstem, 6,02:1 w obie strony.

Sam pas robi `Compositions` przez **przemapowanie tokenów na kontenerze**, a nie przez
wypisanie kolorów reguła po regule, jak robią to `.history` i `.footer`. To świadoma różnica
i chodzi o rozmiar: tamte bloki mają po pięć elementów, ten ma nagłówek, lead, taśmę,
sterowanie, podpisy i chipy w ~250 liniach CSS. Dwie pułapki, obie opisane przy kodzie:

- **Token tła pasa nie może być przemapowany.** `background: var(--green-band)` na tym samym
  elemencie rozwiązałoby się przez własne przemapowanie i element pomalowałby się tym, na co
  token został wskazany. `--green-deep` jest wolny, bo przestał być tłem - ale na tak ciemnym
  pasie przestał też być _użyteczny_ jako wypełnienie (1,27:1), i po to jest odwrócenie
  opisane wyżej.
- **`color` trzeba ustawić wprost.** Jest dziedziczone i zostało już rozwiązane na `body`, więc
  wskazanie `--ink` gdzie indziej nie dosięga niczego, co samo nie podaje koloru. Nagłówek
  „Inspiracje" był przez chwilę ciemnozielony na ciemnozielonym.

Etykiety i podpisy mają tu własny stopień koloru (`--green-lit`, 7,63:1), a nie pożyczony
z akapitów - to była cena wersji `#556848` i odpadła razem z nią.

### Kontrasty

Kolor na kolorze liczy się arytmetycznie, więc poniższe to wyliczenia, nie szacunki - i po
usunięciu scrimu nie zostało na stronie nic, co wymagałoby pomiaru w przeglądarce.

| Para                            | Kontrast   | Próg            |
| ------------------------------- | ---------- | --------------- |
| `--ochre` na `--paper`          | 5,56:1     | 4,5:1 ✓         |
| `--ochre` na `--paper-sage`     | 5,05:1     | 4,5:1 ✓         |
| `--ochre-lit` na `--green-deep` | 5,10:1     | 4,5:1 ✓         |
| `--ochre-lit` na `--ink`        | 8,05:1     | 4,5:1 ✓         |
| `--green` na `--paper-sage`     | 4,81:1     | 4,5:1 ✓         |
| `--ink-grey` na `--paper-sage`  | **4,53:1** | 4,5:1 - na styk |

Ostatni wiersz to jedyne ryzyko tej zmiany. `--ink-grey` niesie każdą etykietę wersalikami
i każdy podpis zdjęcia, a nowy grunt zjada mu cały zapas. **Gdyby spadło poniżej 4,6:1,
rozjaśnić `--paper-sage`, a nie przyciemniać `--ink-grey`** - ten drugi był już raz
podnoszony (`#5B6153` → `#656E5B`) i ruszanie go zmienia charakter wszystkich etykiet naraz.

### Pasek menu - co dokładnie cofnięto

| Właściwość         | 0.10                                                      | Po cofnięciu        |
| ------------------ | --------------------------------------------------------- | ------------------- |
| `--text-nav`       | `clamp(0.86rem, 0.8rem + 0.28vw, 0.98rem)` (13,9–15,7 px) | `0.78rem` (12,5 px) |
| tracking           | `0.08em`                                                  | `0.1em`             |
| `--nav-pad-block`  | `clamp(0.4rem, 1vw, 0.7rem)` → pasek 70,4 px              | `3px` → pasek 54 px |
| `--text-nav-panel` | —                                                         | bez zmian           |

Waga **nie zmieniała się nigdy** i zostaje na 600; cięższy wygląd robił sam rozmiar
i wysokość. Tracking wraca razem ze stopniem, bo zszedł do `0.08em` właśnie po to, żeby
skompensować większą literę - to jedna decyzja, nie dwie.

**Wysokość nie wróciła do zera i nie powinna.** Te dodatkowe piksele weszły na zgłoszenie
właścicieli, że nie widać podkreślenia aktywnej strony: 2-pikselowa kreska lądowała 1 px nad
dolną kreską nagłówka, a na stronie głównej 1 px nad górną krawędzią zdjęcia. Druga połowa
tej przyczyny zniknęła sama razem z nowym hero - zdjęcie nie dotyka już paska. Zostaje kreska
nagłówka i 3 px jej wystarcza. Gdyby okazało się, że nie, podnosić po pikselu, nie wracać do
`clamp()`.

### Do decyzji właścicieli

1. **Kadr pionowy do hero.** To jest teraz najbardziej widoczna dziura na stronie. Hero jest
   w proporcji 4:5, a w repozytorium nie ma wolnego kadru pionowego: wszystkie 23 z
   `src/assets/gallery/` to obsadzenia, które pokazują się na tej samej stronie trzy sekcje
   niżej; pas chryzantem ma 736 px szerokości; pas bratków to produkt marcowy. `heroPhoto` jest
   więc obrazem generowanym 4:3, kadrowanym do 4:5, o rozdzielczości około 1,6x zamiast 2x.
   Podmiana to jedna linia w `src/data/gallery.ts` plus wymiary w `Intro.astro`.
2. **Czy „Poza sezonem" ma gasić trzy kafle na cztery przez większość roku?** Dziś tak -
   zgodnie z decyzją. Jeśli okaże się to zbyt tłumiące, tańsza poprawka niż usuwanie chipa to
   pokazywanie go tylko wtedy, gdy sezon trwa albo zaraz się zacznie: `currentSeason.groups`
   już rozróżnia `"now"` / `"soon"` / `null`, więc to jeden warunek w szablonie.
3. **Czy nadtytuły mają być ochrowe także na podstronach?** Dziś tak - `.eyebrow` jest jedną
   klasą i nie ma wariantu per strona. Do obejrzenia w kontekście długich opisów upraw.
4. **Trzy fakty w hero** („Uprawa: własna", „Sprzedaż: na miejscu", „Zamówienia: telefonicznie")
   są przeredagowaniem zdania, które stoi tuż obok. Nic tam nie jest nową informacją - to
   celowe, ale do potwierdzenia, czy powtórzenie jest warte miejsca.

## Strona „O nas” na jasnym gruncie - wrzesień 2026

Zgłoszenie właściciela: „dostosuj stronę o nas do innych (kolorystycznie)”, razem
z gotowym zdjęciem do podmiany. Dwie rzeczy, jedna decyzja.

### Co było nie tak

`/o-nas/` było **jedyną podstroną na ciemnym tle**. `History.astro` malował się
`--green-deep` od krawędzi do krawędzi, a pozostałe dziesięć stron - `/kontakt/`, `/faq/`,
`/inspiracje/`, cztery strony oferty, polityka prywatności i 404 - to jedna płaska, jasna
sekcja na `--paper`. Naprzemienne grunty, opisane wyżej w
[Rozdzielenie sekcji i zmiana kroju](#rozdzielenie-sekcji-i-zmiana-kroju--wrzesień-2026),
są urządzeniem **strony głównej** i nigdy nie były regułą całej witryny.

Przy okazji wychodził defekt, którego inaczej nie dało się usunąć. `tokens.css` zapisuje
przy `--green-band`, że ciemna płyta musi być oddzielona od stopki `--ink` jasną sekcją:
ten styk to 1,44:1, a koloru stopki się nie negocjuje. Na stronie głównej zawsze jest czym
przedzielić. Na stronie długiej na jeden blok nie było czym - `/o-nas/` po prostu
wypływało w stopkę i kończyło się niewidocznym szwem.

### Co rozważano

Drugi wariant brzmiał: zostawić ciemno, ale przemalować z `--green-deep` na `--green-band`
(kolor trzech płyt strony głównej) i dostawić jasne domknięcie przed stopką. Odrzucony
z dwóch powodów. Po pierwsze nie odpowiada na samo zgłoszenie - strona nadal odstawałaby
od pozostałych, zmieniłby się tylko odcień. Po drugie „jasne domknięcie” musiałoby czymś
być, a jedyną treścią tej strony jest tekst właścicieli; wymyślanie sekcji po to, żeby
oddzielić płytę od stopki, to ogon merdający psem.

Nie dodano też propu `ground` na wzór `Compositions.astro`. Tam prop istnieje, bo komponent
renderuje się pod dwoma adresami i musi w nich wyglądać inaczej; `History` renderuje się pod
jednym, więc prop miałby jednego wołającego i zero powodów.

### Co się zmieniło w kodzie

`History.astro` traci `background`, `color`, nadpisanie `--focus-ring` (domyślny `--green`
ma na papierze 4,95:1 i nie trzeba go podnosić) oraz kolory na akapicie i nadtytule. Zamiast
lokalnych deklaracji nadtytuł dostaje wspólną klasę `.eyebrow` i zostaje mu tylko stopień
`0.72rem` - dokładnie tak, jak robią `.faq__eyebrow` i `.policy__eyebrow`. Ramka zdjęcia
z blado-kościanej wraca na `--rule`, tę samą, którą ma `.entry__photo`. Układ - dwie kolumny
`auto-fit` i `--pad-section-wide` - zostaje bez zmian; to ten sam układ, co w `.contact`.

Skutek dla palety: **`--green-deep` przestaje być gruntem jakiejkolwiek sekcji.** Zostaje
wypełnieniem (przyciski, chipy, zapalona karta sezonu, skip link, placeholder mapy), a
ciemne grunty witryny to teraz dokładnie dwa: `--green-band` na stronie głównej i `--ink`
w stopce. Zapisane przy tokenie, w `CLAUDE.md` i w nagłówku komponentu.

### Blok historii dostaje własne zdjęcie i jedyny podpis na stronie

Do tej pory blok pożyczał obsadzenie z kolekcji `compositions`
(`zielono-biala-kaskada-plektrantusa`, czyli `gallery-17`) - zdjęcie, które pokazuje się
także na `/inspiracje/`. Strona o gospodarstwie pokazująca kadr należący do innej strony to
słabsza odpowiedź niż kadr własny. Nowe zdjęcie, `src/assets/farm/konskowola-stand.jpg`,
przypięte w `src/data/gallery.ts` jako `historyPhoto`, przedstawia **stoisko gospodarstwa
na wystawie kwiatów w Końskowoli, z własną tablicą „Gospodarstwo Ogrodnicze SARAN”** -
pierwszy kadr w repozytorium pokazujący gospodarstwo przy pracy, a nie roślinę czy
obsadzenie. Ilustruje przy tym zdanie, które stoi w tekście właścicieli o dwa akapity
wyżej na tej samej stronie: „Sprzedaż kwiatów odbywa się na terenie gospodarstwa oraz na
targowiskach”.

**Pierwsza wersja tego wpisu mówiła, że to stoisko na terenie gospodarstwa. To była
pomyłka** - moja, nie właścicieli - i wyszła dopiero wtedy, gdy podali podpis. Widać ją
zresztą na samym zdjęciu: na ścianie za regałami są odmalowane numery stanowisk (51, 52,
53, 59), czego tunel foliowy nie ma. Razem z poprawką zmieniła się nazwa pliku
(`sales-stand.jpg` → `konskowola-stand.jpg`), `alt` i komentarz w `gallery.ts`. Wniosek na
przyszłość, bo to drugi raz w tym projekcie: **opis zdjęcia czytany z samego zdjęcia jest
hipotezą, nie faktem** - dokładnie z tego powodu wszystkie `alt` czekają na przejrzenie
przez właścicieli.

Co sprawdzono przed wstawieniem, żeby nie sprawdzać tego drugi raz:

- **1920×1080, bez EXIF.** Poniżej pułapu 2000 px, więc plik idzie do repo bajt w bajt -
  skalowanie byłoby operacją pustą, a ponowne kodowanie kosztowałoby tylko jakość. Brak EXIF
  znaczy też, że nie ma rotacji do wypalenia (przypadłość paczki z obsadzeniami).
- **Na zdjęciu nie ma żadnej osoby** - dwa fotele w głębi są puste. Warunek z
  [Czego dokument świadomie nie mówi](#czego-dokument-świadomie-nie-mówi) nie zachodzi,
  więc paragraf o wizerunku nie wraca do polityki prywatności.
- **Tablica zgadza się z `contact.ts` co do znaku**: Cholewianka 36, Kazimierz Dolny,
  tel. 722 238 987 - numer Mateusza, ten aktualny. Żadnego z dwóch numerów wycofanych we
  wrześniu 2026 na zdjęciu nie ma. Widnieje też adres `gospodarstwo-saran.pl`, czyli domena,
  którą ta strona przejmuje. Tablica jest własnością gospodarstwa i jeździ z nim - to ona,
  a nie budynek, wiąże ten kadr z Cholewianką.
- **Kadr 3:2** obcina przez `object-fit: cover` po 150 px z każdego boku; tablica zostaje
  cała i mniej więcej pośrodku, dlatego `alt` ją wymienia.

Prośba z handoffu o **zdjęcie archiwalne** w tym miejscu zostaje otwarta - nowy kadr też
jest współczesny. Przestaje być jednak pilna: ramka trzyma coś prawdziwego o tej stronie.
`alt` jest odczytany ze zdjęcia i **czeka na potwierdzenie właścicieli**, jak pozostałe.

#### Podpis i wyrównanie kadru

Właściciele poprosili o podpis „Wystawie kwiatów w Końskowoli” i o „trochę ładniejszy
układ, lekko obniżyć, ale schludnie”. Oba życzenia zrealizowane bez ruszania układu dwóch
kolumn - wariant z szerokim pasem i wariant pełnoekranowy zostały pokazane i **odrzucone
na rzecz zostawienia dwóch kolumn**.

- **Podpis.** `<figure>` + `<figcaption>` wokół zdjęcia, `0.8rem` w `--ink-grey` (4,99:1 na
  papierze) - czyli figcaption dokładnie taki, jaki rysuje handoff, narysowany tu po raz
  pierwszy, bo podpisy przy roślinach zostały usunięte. Dlaczego to nie jest cofnięcie
  tamtej decyzji: patrz [Podpisy pod zdjęciami](#podpisy-pod-zdjęciami---usunięte).
- **Brzmienie.** Na stronie jest **„Na wystawie kwiatów w Końskowoli”**. Właściciele podali
  sam miejscownik, bez przyimka, który nim rządzi; pod zdjęciem czyta się to jak literówka,
  a nie jak podpis. Dołożony jest jeden wyraz i żaden nie jest zmieniony. **Do potwierdzenia
  przez właścicieli** - jeśli mieli na myśli mianownik („Wystawa kwiatów w Końskowoli”) albo
  swój zapis dosłownie, to jedno słowo do poprawienia.
- **Obniżenie.** Zdjęcie zaczynało się równo z nadtytułem, czyli optycznie wyżej niż
  nagłówek. Teraz zaczyna się **równo z `h1`**, a przesunięcie to nie jest dobrana na oko
  liczba, tylko wysokość wiersza nadtytułu: `calc(0.72rem * 1.68 + 1.1rem)` - jego stopień
  razy odziedziczona interlinia, plus odstęp kolumny tekstu. Zmierzone w przeglądarce:
  górna krawędź zdjęcia i górna krawędź `h1` różnią się o 0 px. Jeśli któraś z tych trzech
  wartości się zmieni, suma pojedzie za nią; okrągła liczba by nie pojechała.
- **Koszt, świadomy.** Przy zwężeniu do jednej kolumny ten margines dokłada się do odstępu
  wiersza siatki, więc na telefonie między prozą a zdjęciem jest około 37 px więcej powietrza
  niż było. Kierunek jest właściwy (luźniej, nie ciaśniej), a odkupienie tego kosztowałoby
  breakpoint, którego ten projekt nie ma.

## Historia wersji

Ta sekcja przyjęła narrację, która do września 2026 stała w `CLAUDE.md`. Tam była szkodliwa:
`CLAUDE.md` czyta asystent przy każdej sesji jako opis **stanu obecnego**, a opowieść „0.6
zrobiło X, 0.7 to cofnęło” czyta się jak stan i prowadziła do błędnych wniosków o kodzie.
Tutaj jest na swoim miejscu, bo ten plik jest kroniką projektu.

Szczegóły każdej zmiany są w sekcjach wyżej; poniżej sam przebieg, żeby dało się dojść, skąd
się co wzięło.

| Wersja  | Co przyniosła                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0.1–0.4 | Rusztowanie Astro, tokeny, komponenty, migracja treści ze starej strony WordPressa: 14 opisów roślin i historia gospodarstwa. Menu miało wtedy pięć pozycji celujących w kotwice na jednej stronie, a trzy z nich w **tę samą** kotwicę `#oferta`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 0.5     | Przegląd kodu (13 znalezisk). Tagline przeniesiony z masztu do stopki - **cofnięte w 0.6**, patrz niżej.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 2a      | Motyw „Poranek w tunelu”: Instrument Serif → Newsreader, Karla → Public Sans, zieleń rozdzielona na `--green` (tekst) i `--sage` (dekoracja ≥24px), papier i atrament przestrojone. Zastępuje tabelę kolorów i typografię z handoffu; źródłem prawdy jest `src/styles/tokens.css`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 0.11    | Obsadzenia dostają opisy i porady od właścicieli i przenoszą się z `src/data/gallery.ts` do kolekcji `src/content/compositions/`. Gatunki potwierdzone we wszystkich 23 kadrach, więc podpisy „obsadzenie mieszane” i „do potwierdzenia” znikają; kadr 13 poprawiony z pelargonii na niecierpki. Chip ma trzy stany zamiast dwóch (`companion`). Nowy prop `prose` trzyma prozę poza stroną główną. Dwa lidy przepisane - odejście od handoffu.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 0.6     | Strona główna przestała być samą wizytówką. Tagline wrócił do masztu: w stopce lądował jedno zdanie nad blurbem, który jest jego nadzbiorem, a zmiana specyfikacji nie jest decyzją do podjęcia w komentarzu w kodzie. Usunięty powtarzający się `ContactStrip`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 0.7     | Oferta rozbita na cztery realne podstrony zamiast kotwic (patrz [`przekierowania.md`](przekierowania.md)). Strona główna stała się zapowiedzią całej witryny: kafle oferty otwierają się mozaiką własnych zdjęć grupy, a pokaz obsadzeń dostał drugi adres. Do 0.6 strona główna pokazywała cztery zdjęcia przy kilkudziesięciu w repozytorium. Szczegóły: [Strona główna jako witryna](#strona-główna-jako-witryna--wrzesień-2026) i [Pokaz obsadzeń na dwóch adresach](#pokaz-obsadzeń-na-dwóch-adresach).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 0.8     | Blok „Co u nas słychać” - jedyna rzecz na stronie, która zmienia się sama. Szczegóły i decyzje do przejrzenia: [Posty z Facebooka](#posty-z-facebooka--wrzesień-2026).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 0.9     | Przebudowa kalendarza sprzedaży pod okna podane przez właścicieli. Znacznik stanu trafił na jedną iterację na kafle oferty i **został z nich zdjęty** - kafle to cztery równe drzwi do czterech stron. Karty sezonowe straciły natomiast odnośnik. Szczegóły: [Kalendarz sprzedaży](#kalendarz-sprzedaży--wrzesień-2026).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 0.9.1   | Zmniejszony stopień telefonu i adresu oraz brakująca spacja w adresie: [Stopień telefonu i adresu](#stopień-telefonu-i-adresu--wrzesień-2026).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 0.10.0  | Przebudowa menu po audycie UX/SEO: cztery kategorie zeszły do panelu „Oferta” na natywnym `<details>`, menu urosło z 12,5 do 13,8–15,7 px, „Historia gospodarstwa” nazywa się w menu „O nas”. Doszła dziewiąta strona, `/faq/`, z sześcioma pytaniami, których odpowiedzi w całości pochodzą z danych już w repozytorium. Do tego cztery poprawki po pierwszym pokazaniu wersji właścicielom: odstęp pod paskiem menu (podkreślenia bieżącej pozycji nie było widać), lżejszy i mniejszy `h1` na zdjęciu, zwijane pytania w FAQ oraz lżejsze pytania w tym akordeonie. Szczegóły: [Przebudowa menu](#przebudowa-menu--wrzesień-2026), [FAQ](#faq--wrzesień-2026) i [Zgłoszenia właścicieli](#zgłoszenia-właścicieli-po-przebudowie-menu--wrzesień-2026).                                                                                                                                                                                                                                                                                                                                                               |
| 0.12.0  | Rozdzielenie sekcji strony głównej i zmiana kroju szeryfowego, po zgłoszeniu właściciela „wszystko się zlewa”. Newsreader → **Fraunces**; trzeci jasny grunt `--paper-sage`, ciemny pas pod „Inspiracjami”, odstęp sekcji w górę o jedną trzecią; **ochra** jako pierwszy kolor spoza rodziny zieleni, tylko w nadtytułach i licznikach. Hero przebudowane na dwie kolumny z kadrem 4:5, przez co znika `--hero-scrim` (jedyny gradient tonalny) i **jedyna media query w projekcie**. Chip sezonowy **wraca** na kafle oferty, a stopień w pasku menu **wraca** do wartości z handoffu - dwa cofnięcia decyzji z 0.9 i 0.10. Szczegóły: [Rozdzielenie sekcji i zmiana kroju](#rozdzielenie-sekcji-i-zmiana-kroju--wrzesień-2026).                                                                                                                                                                                                                                                                                                                                                                                     |
| 0.12.1  | Drugie podejście do rytmu tła, po obejrzeniu kandydatów bok w bok. Cztery ciepłe jasne grunty zamiast dwóch (`--paper-linen`, `--paper-clay`, `--paper-blush` przy `--paper`), trzy ciemne płyty zamiast jednej, wszystkie na `--green-band` `#38442F`. `--paper-sage` usunięty, bo nic już na nim nie stało. Karta sezonu, której sezon trwa, **odwrócona**: na ciemnej płycie to ona jest jasna. `FacebookNews` renderuje się teraz zawsze, bo jest jasnym pasmem między dwiema ciemnymi płytami, a te nie dają się od siebie odróżnić. Szczegóły w [Rozdzielenie sekcji i zmiana kroju](#rozdzielenie-sekcji-i-zmiana-kroju--wrzesień-2026).                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 0.12.2  | Dopracowanie kafli oferty: kadry z 4:3 na **4:5**, bo sześć z ośmiu zdjęć, z których kafle korzystają, jest pionowych i ramka 4:3 wyrzucała z nich 47%; pasek rośnie ze 225×82 do 225×136 px. Lista nazw przycięta do czterech plus ogon „i 7 innych” - jedenaście nazw szło na pięć linii i robiło dziurę w trzech kaflach na cztery. Tytuły dostają `text-wrap: balance`. Szczegóły: [Mozaika w kaflu](#mozaika-w-kaflu---dwa-kadry-zawsze).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 0.13.1  | Obramowanie kafli oferty z `--rule` na `--rule-dim`. Kreska była tam od początku i względem wypełnienia daje 1,27:1, tyle co każda inna na stronie - ale od zewnątrz ma teraz glinę zamiast papieru, gdzie `--rule` spada do 1,18:1, a samo wypełnienie unosi się nad gruntem o 1,079:1. Miękka z obu stron naraz. `--rule-dim` daje 1,35:1 i 1,25:1: nadal włoskowata, ale z krawędzią. Cały kafel reaguje też teraz na najechanie, nie tylko kadry w środku. **Tabela nie ma wierszy dla 0.13.0 ani dla commita przed nim** - obie zmiany powstały w innych sesjach i nie dopisały się tutaj.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 0.13.3  | Zdjęcie w bloku historii dostaje podpis „Na wystawie kwiatów w Końskowoli” - pierwszy `<figcaption>` poza pokazem slajdów i poza decyzją o usunięciu podpisów przy roślinach - i zaczyna się równo z `h1` zamiast z nadtytułem (przesunięcie liczone z wysokości wiersza nadtytułu, nie dobrane). Przy okazji **poprawka rzeczowa**: zdjęcie nie przedstawia stoiska na terenie gospodarstwa, tylko stoisko na wystawie kwiatów w Końskowoli; plik, `alt` i opisy w dokumentacji zmienione. Układ dwóch kolumn zostaje - dwa inne warianty pokazano i odrzucono. Szczegóły: [Blok historii](#blok-historii-dostaje-własne-zdjęcie-i-jedyny-podpis-na-stronie).                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 0.13.2  | `/o-nas/` przechodzi na jasny grunt - była to jedyna ciemna podstrona, a naprzemienne tła są urządzeniem strony głównej. Znika przy tym styk ciemnej płyty ze stopką `--ink` (1,44:1), którego na stronie długiej na jeden blok nie dało się niczym przedzielić. `--green-deep` przestaje być gruntem jakiejkolwiek sekcji i zostaje wypełnieniem. Blok historii dostaje własne zdjęcie (`historyPhoto`, stoisko gospodarstwa z tablicą) zamiast obsadzenia pożyczanego z `/inspiracje/`. Szczegóły: [Strona „O nas” na jasnym gruncie](#strona-o-nas-na-jasnym-gruncie--wrzesień-2026).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 0.14.0  | _Weszło do repozytorium jednym commitem razem z 0.15.0._ Czwarty typ chryzantemy - **drobnokwiatowa**. Grupa rośnie z trzech wpisów do czterech, a repozytorium z 17 roślin do 18 i z 49 zdjęć do 50. Wpis wchodzi na `order: 16`, przed igiełkową, żeby strona czytała się malejącą wielkością kwiatu; igiełkowa i bratek przesuwają się o jeden. **Jedyny opis rośliny na stronie, którego nie napisali właściciele** - i jedyne zdjęcie wzięte z profilu Facebook gospodarstwa. Chipy kolorów celowo te same co u trzech pozostałych; siódemka zaproponowana przy wpisie leży w [Rozbieżnościach](#rozbieżności-między-handoffem-a-treścią-klienta) i czeka na potwierdzenie. Szczegóły: [Chryzantema drobnokwiatowa](#chryzantema-drobnokwiatowa--wrzesień-2026).                                                                                                                                                                                                                                                                                                                                                  |
| 0.15.0  | Ósma paczka zdjęć - 18 kadrów chryzantem z Facebooka gospodarstwa, z czego **trzy były powtórzeniami** wykrytymi porównaniem percepcyjnym, nie hashem pliku. Repozytorium rośnie z 50 zdjęć do 65, a pas pod listą na `/chryzantemy/` z 4 do **19** kadrów: cztery mieszane, jedenaście rzędów ułożonych jako paleta kolorów i cztery gotowe doniczki. Doniczki stały przez jedną iterację w **drugim pasie** („Gotowe doniczki”) i właściciel kazał go usunąć, więc `OfferSection` wrócił do jednej tablicy zdjęć z etykietą zaszytą w komponencie. Kadry w pasie **powiększają się po kliknięciu**, na tym samym globalnym `lightbox.ts`, którego używa pokaz obsadzeń; komentarz w `PhotoStrip` mówił dotąd „no lightbox” i to jest świadome odwrócenie. Sam podgląd traci przy okazji **podpis pod zdjęciem** - powtarzał `alt` obrazka, który podgląd i tak nosi, więc czytnik ekranu czytał ten sam tekst dwa razy. Szczegóły: [Zdjęcia](#zdjęcia) i [Lupa w pasach zdjęć](#lupa-w-pasach-zdjęć--wrzesień-2026).                                                                                                 |
| 0.16.0  | **Prymulka dostaje wpis** - dziewiętnasta roślina i druga w grupie `Bratki`, która była jednoroślinna od powstania. Zamyka to otwarty punkt stojący od jej dołożenia: prymulki były na stronie samym słowem, bo nie było opisu ani zdjęcia. Żadnej nowej grupy i żadnego nowego adresu - właściciele sprzedają je dokładnie wtedy co bratki, więc `season.ts` jest nietknięty, a `h1` strony to teraz „Bratki i prymulki”, jak w menu i na kaflu (`<title>` zostaje „Bratki”). Pas na `/bratki/` rośnie z 4 do 7 kadrów. **Opis jest nasz, nie właścicieli** - drugi taki wpis po chryzantemie drobnokwiatowej. Przy okazji zapisany rozjazd terminu sprzedaży: `season.ts` mówi marzec, a fakty przy obu wpisach „Marzec – kwiecień”. Szczegóły: [Prymulki](#prymulki--zamknięte-we-wrześniu-2026).                                                                                                                                                                                                                                                                                                                   |
| 0.16.1  | Wyrównanie lidów na zgłoszenie właściciela. Zdanie otwierające strony kategorii schodzi z czterech plików stron do `OfferSection` jako `OFFER_LEAD` i domyślna wartość propa - dwie strony je miały, dwie nie. `/chryzantemy/` odzyskuje lid; to **nie** jest cofnięcie decyzji z września 2026, bo usunięte tam było inne zdanie, powtarzające termin i kolory. Sekcja „Kwiaty w naszej ofercie” na stronie głównej dostaje własny tekst od właściciela i **zamyka świadomie przyjętą nieścisłość** ciągnącą się od handoffu: pokazuje cztery kafle kategorii, a mówiła o „każdej roślinie”. Szczegóły: [Wyrównanie lidów](#wyrównanie-lidów---wrzesień-2026).                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 0.17.0  | Dwadzieścia jeden nowych opisów z listy 38 nazw łacińskich od właścicieli - kolekcja rośnie z 19 do 40 roślin. Sześć bylin i krzew trafiają do `Rabatowe` zamiast do nowej grupy. Patrz [Dwadzieścia jeden nowych opisów](#dwadzieścia-jeden-nowych-opisów--wrzesień-2026).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 0.18.0  | **Scalenie oferty**: `Rabatowe` wchłonięte przez `Balkonowe` na prośbę właścicieli, `/rabatowe/` usunięte i przekierowane na `/kwiaty-balkonowe/`. Trzy grupy, trzy kafle, jedna strona z 34 roślinami w porządku alfabetycznym, ze spisem grupowanym po literze i literami między wpisami. `OfferSection` dostaje prop `sort`. Patrz [Scalenie oferty](#scalenie-oferty---wrzesień-2026).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 0.18.1  | Poprawki do scalenia po obejrzeniu przez właściciela: przekładka literowa traci własną kreskę (zlewała się z linią kończącą wpis) i niesie podział rozmiarem, kolorem `--sage` i niesymetrycznym odstępem; spis przechodzi z siatki na `columns`, co usuwa dziurę wybitą przez wysoki wiersz „P”.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 0.18.2  | Wszystkie zdjęcia przy opisach ujednolicone do 4:3 na prośbę właściciela - odwrócenie ramki adaptacyjnej z tego samego miesiąca. Jedno zdjęcie z szesnastu zostaje nietknięte zamiast dziewięciu; pomiary i uboczny skutek dla lupy w [Kadr zdjęć we wpisach](#kadr-zdjęć-we-wpisach---wrzesień-2026).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 0.19.0  | **Chryzantema igiełkowa zwinięta do średniokwiatowej** na polecenie właścicieli - typ opisywał kształt płatka, a pozostałe trzy wpisy dzielą chryzantemy wielkością kwiatu. Grupa schodzi z czterech wpisów do trzech, repozytorium z 40 roślin do 39. Zdjęcie przechodzi do pasa (`rows-12`), który rośnie do 20 kadrów; słowo „igiełkowe” znika z opisu meta i ze zdania właścicieli w `note`. Usunięty opis zachowany w całości: [Chryzantema igiełkowa zwinięta](#chryzantema-igiełkowa-zwinięta-do-średniokwiatowej---wrzesień-2026).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 0.19.1  | **Blok „Dostępne kolory" usunięty ze wszystkich wpisów** na polecenie właścicieli - 22 wpisy, 104 chipy. Pole `colors` wypada również ze schematu. 19 z 22 roślin nadal ma kolory w treści opisu; trzy (bakopa, chryzantema wielkokwiatowa, pelargonie bluszczolistne) tracą tę informację całkowicie. Wszystkie wartości zarchiwizowane: [Chipy kolorów usunięte](#chipy-kolorów-usunięte---wrzesień-2026).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 0.20.0  | **Dziewiąta paczka zdjęć** - sześć wpisów dostaje pierwsze zdjęcie (dahlia, lobelia, koleus, sanvitalia, bakopa, petunia-surfinia), trzy dostają lepsze (alstromeria, tunbergia, begonia). Wpisów ze zdjęciem 21 z 39, czekających 18. `Plectranthus.jpg` trafił do koleusa wbrew nazwie pliku - zdjęcie jawnie nie zgadza się z opisem plektrantusa. Dwie z trzech nadesłanych petunii niewykorzystane. Szczegóły: [Dziewiąta paczka zdjęć](#dziewiąta-paczka-zdjęć---wrzesień-2026).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 0.21.0  | **Zdjęcia zastępcze z Wikimedia Commons** - osiemnaście wpisów bez zdjęcia dostaje pożyczony kadr 4:3 na licencji CC/PD, więc na `/kwiaty-balkonowe/` nie ma już ani jednej zaślepki. Nowe pole `imageCredit` w schemacie plants (schemat wywala budowanie, jeśli atrybucja przeżyje zdjęcie) i linia atrybucji pod kadrem w `PlantEntry` - to nie jest powrót usuniętych podpisów, tylko warunek licencji. Zdjęcia są **tymczasowe**, `slot` na tych wpisach zostaje. Szczegóły: [Zdjęcia zastępcze](#zdjęcia-zastępcze-z-wikimedia-commons--wrzesień-2026).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 0.22.0  | **Fakty ujednolicone do czterech gniazd** na prośbę właścicieli. Bloki faktów były nierówne - 31 wpisów miało cztery, osiem od jednego do trzech - więc sąsiadujące wpisy pokazywały różne rzeczy w różnej liczbie wierszy. Teraz **każdy z 39 wpisów ma dokładnie cztery**, a trzy pierwsze etykiety są wszędzie te same: miara-albo-`Pokrój` → `Stanowisko` → `Podlewanie`, przy czwartym gnieździe `Uprawa` ustępującym `Sprzedaży`, `Zimowaniu` lub `Podłożu` tam, gdzie te mówią więcej (dziewięć wpisów). Schemat egzekwuje to przez `.length(4)`, więc wpis z trzema faktami wywala build; pole przestało być opcjonalne, a `PlantEntry` stracił martwą osłonę `facts &&`. Cena: **36 faktów wypadło** (głównie `Kwitnienie`, `Charakter` i `Odmiany`, w większości powtarzające zdanie z opisu obok), a **26 wartości dopisano z wiedzy ogrodniczej** - co **odwraca zasadę „tylko to, co mówi opis klienta”** obowiązującą tu od początku. Odwrócenie jest warunkowe: wszystkie 26 jest spisane co do jednej i czeka na potwierdzenie. Patrz [Cztery gniazda faktów](#cztery-gniazda-faktów---wrzesień-2026). |
| 0.22.1  | **Filtr obsadzeń schodzi z pięciu rodzajów do trzech**: `Kosz i skrzynka` / `Donica` / `Rabata` zamiast `Kosz wiszący` / `Skrzynka` / `Donica` / `Rabata` / `Ekspozycja`. Przy 23 kadrach pięć przycisków dawało niecałe pięć kadrów na przycisk; teraz rozkład to 10 / 7 / 6. **„Ekspozycja” wypadła jako błąd, nie jako nadmiar** - nazywała okoliczność zdjęcia (stoisko, tunel), a nie coś, co odwiedzający obsadza, więc jako jedyna odpowiadała na inne pytanie niż etykieta „Co obsadzasz” nad nią; jej cztery kadry rozeszły się tam, gdzie wskazują ich własne opisy `alt`. Trzynaście plików zmienia `kind:`, nic poza tym - schemat i rząd przycisków idą za `compositionKinds` same. Tytuły i proza właścicieli ze słowem „ekspozycja” zostają co do słowa. Patrz [Trzy rodzaje obsadzeń zamiast pięciu](#trzy-rodzaje-obsadzeń-zamiast-pięciu---wrzesień-2026).                                                                                                                                                                                                                                           |
| 0.23.0  | **Trzy strony kategorii wyrównane do jednego układu** na polecenie właścicieli, którzy obejrzeli oba warianty obok siebie. `/bratki/` i `/chryzantemy/` przechodzą z kolejności redakcyjnej na alfabetyczną i dostają spis literowy oraz przekładki, które dotąd miały tylko `/kwiaty-balkonowe/`. Prop `sort: "order"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | "name"`**znika** zamiast dostać trzecie wywołanie - przełącznik z jedną wartością jest martwy, a bez niego „bez wyjątków" jest własnością konstrukcji, nie zgodnością trzech plików. Cena jest na`/chryzantemy/`i przyjęto ją świadomie: alfabet odwraca tę stronę, więc wielkokwiatowe stoją ostatnie mimo`<title>`, otwiera ją jedyny opis, którego nie napisali właściciele, a wszystkie trzy nazwy mają tę samą literę, więc przekładka nic nie rozdziela. Kotwice bez zmian. Szczegóły: [Jeden układ na trzech stronach kategorii](#jeden-układ-na-trzech-stronach-kategorii--wrzesień-2026). |
| 0.24.0  | **Pasek „Zdjęcia z gospodarstwa" na `/kwiaty-balkonowe/`** - ostatnia różnica w układzie między trzema stronami kategorii, i jedyna, która czekała na materiał, a nie na kod. Z paczki 45 kadrów z Facebooka gospodarstwa weszły 24: uprawa, pojedyncze gotowe kosze, dwie hortensje i dwie donice u klienta. Dziewięć obsadzonych kompozycji świadomie **nie** weszło - to gatunek zdjęć z `/inspiracje/`. Przy okazji **pierwszy zastępnik z Wikimedia zdjęty**: hortensja dostała własny kadr, zostaje siedemnaście. Szczegóły: [Pasek zdjęć na `/kwiaty-balkonowe/`](#pasek-zdjęć-na-kwiaty-balkonowe--wrzesień-2026).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 0.26.0  | **Pokaz zdjęć na stronie głównej** - 69 własnych kadrów, rząd naraz, pogrupowane kategoriami i podpisane, w kolejności roku. Odpowiedź na prośbę o „pokaz slajdów jak na obecnej stronie”, po dwóch odrzuconych turach makiet. **Slajd jest rzędem, nie zdjęciem**, bo pas 2:1 obecnego slidera stoi na osobnych kadrach panoramicznych, a tutaj 53 z 55 zdjęć są pionowe. Rzędy cięte wewnątrz grupy, znaczniki per grupa, kaskada krycia co 90 ms, zmiana co 6 s, trzy rzędy zamontowane naraz (11 z 69 zdjęć pobranych po wjechaniu sekcji na ekran), a „Więcej zdjęć” celuje w kotwicę `#zdjecia` na stronie kategorii. Przy okazji **podgląd zawężony do grupy** - strona główna jako pierwsza ma dwa zestawy zdjęć naraz - i naprawiony powrót focusa z kadru ukrytego lub `inert`. Szczegóły: [Pokaz zdjęć na stronie głównej](#pokaz-zdjęć-na-stronie-głównej---wrzesień-2026).                                                                                                                                                                                                                                |
| 0.25.0  | **Podgląd zdjęć przechodzi między zdjęciami** - zgłoszenie właściciela: z powiększenia nie dało się przejść do następnego kadru, trzeba było zamknąć i trafić w kolejną miniaturę. Doszły „Poprzednie” / „Następne”, strzałki `←` / `→`, licznik pozycji i prawdziwy cykl focusa po `Tab` (dotąd pułapka zakładała jeden przycisk). Zbiór zawija się i obejmuje wszystkie `a[data-lightbox]` na stronie - bezpieczne, bo żadna strona nie miesza pasa z pokazem. Sterowanie stoi nad i pod zdjęciem, nigdy na nim. Szczegóły: [Przechodzenie między zdjęciami](#przechodzenie-między-zdjęciami--wrzesień-2026-zgłoszenie-właściciela).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 0.27.0  | **Blok „Co u nas słychać” przepisany z alpaków i przeniesiony na górę strony głównej** - na polecenie właścicieli. Karta pokazuje teraz wpis tak, jak rysuje go Facebook: awatar i nazwa profilu, data względna, cały tekst z „Pokaż więcej”, klikalne oznaczenia i hashtagi, karuzela wielu zdjęć, filmy odtwarzane z naszego serwera, liczniki reakcji. Przyszły z tym cztery wyjątki od reguł `CLAUDE.md` (ikony i cień, cztery breakpointy, czipy na zdjęciu, trzy nowe zależności), wszystkie nazwane i ograniczone do tego bloku. Pokaz zdjęć zszedł między „Inspiracje” a „Dojazd”, żeby dwie ciemne płyty się nie zetknęły. Model tokena zmieniony na użytkownika systemowego - `docs/facebook.md` przepisany.                                                                                                                                                                                                                                                                                                                                                                                                 |
| 0.27.1  | **Styk hero i aktualności.** Zgłoszenie właściciela: sekcja źle przechodzi kolorystycznie z hero. Dwie przyczyny - kreska 2px z dwóch stykających się obramowań (defekt przenosin) i grunty różniące się o 1.003:1, czyli o nic. Obejrzane trzy warianty, wszedł **A**: hero schodzi z `--paper-blush` na `--paper`, co daje 1.079:1 - sufit tej palety. `--paper-blush` wypadł z `tokens.css`, bo nic już na nim nie stało; jasnych gruntów są trzy. Czcionka w kartach mniejsza i lżejsza (0.92rem/1.6, waga 350) na polecenie właścicieli.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 0.27.2  | **Dwa wpisy zamiast trzech w „Co u nas słychać”.** Pytanie właściciela o to, czy trójka jest dobra; okazało się, że powtarzają się dwie sąsiadujące trójki o tej samej anatomii - aktualności i kalendarz. Rozstrzygnęła nie rytmika, tylko to, że świeżość niesie data przy wpisie, a nie liczba kafelków: trzeci wpis kupuje redundancję i kosztuje każdą kartę 200 px szerokości, czyli połowę tekstu widocznego przed zwinięciem. Przy okazji dwa defekty siatki - dziura po odrzuconym wpisie i karta na całą szerokość przy jednym wpisie - oraz poprawione `SIZES` i `WIDTHS`, bo `sizes` pisane pod węższą kolumnę nie da się nadrobić krokami `srcset`.                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 0.27.3  | **Lead sekcji aktualności skrócony** na polecenie właściciela do samego „Ostatnie wpisy z naszego profilu na Facebooku." - odpadło „- co właśnie kwitnie i co jest w sprzedaży", bo mówią to lepiej same wpisy pod spodem. Nagłówek, overline i lead pustego stanu bez zmian; nadal są to nasze słowa i nadal czekają na przegląd właścicieli. Przy okazji sekcja dostała kreskę pod nagłówkiem - `border-bottom` na `.news__head`, ta sama co w `OfferOverview`, `GalleryShow`, `Compositions` i `SeasonCards`. Była jedynym pasmem na stronie, w którym nagłówek wchodził prosto w treść.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |

### Paczki materiału od właścicieli

Dziesięć dostaw, wszystkie we wrześniu 2026. Pełne rozliczenie każdej jest w [Zdjęcia](#zdjęcia)
i w [Wymianie opisów](#wymiana-opisów--wrzesień-2026); tutaj sam spis, bo kolejność bywa
potrzebna przy ustalaniu, skąd wzięło się konkretne zdjęcie.

1. **23 zdjęcia gotowych obsadzeń** - pokaz „Inspiracje”; dwa z nich obsadziły kartę wiosenną
   i blok historii.
2. **8 zdjęć chryzantem** - trzy trafiły na wpisy (po jednym na typ, 4:3), jedno na kartę
   jesienną, cztery w pas pod listą na `/chryzantemy/`. To były pierwsze zdjęcia przy
   pojedynczych roślinach i powód, dla którego `PlantEntry` renderuje `image`/`imageAlt`.
3. **Teksty o trzech typach chryzantem** - grupa urosła z jednego wpisu do trzech
   (wielkokwiatowa, średniokwiatowa, igiełkowa).
4. **6 zdjęć bratków** - przyniosły ze sobą całą nową grupę: `Bratki` w enumie schematu, wpis
   `bratek-ogrodowy.md`, stronę `/bratki/`, pozycję w menu i **trzecią kartę sezonową**
   ([Trzecia karta sezonowa](#trzecia-karta-sezonowa--wrzesień-2026)).
5. **Opisy uprawy 14 roślin spoza chryzantem** - zastąpiły treść z WordPressa na jedenastu
   wpisach i zamknęły trzy luki. Przy okazji limit `facts` podniesiony do czterech, bo tyle
   linijek właściciele wypisali sami.
6. **10 zdjęć balkonowych i rabatowych** - jedyna paczka **nie** nadesłana przez
   właścicieli: zapytanie do `wp-json/wp/v2/media` starej strony wydobyło 58 fotografii
   z lat 2019–2020, wgranych do biblioteki mediów, ale nigdy nieumieszczonych na żadnej
   żywej podstronie.
7. **1 zdjęcie chryzantemy drobnokwiatowej** - z profilu Facebook gospodarstwa, pierwszy kadr
   z tego źródła. Przyszło razem z czwartym wpisem w grupie, ale **tekst do niego nie pochodzi
   od właścicieli**, w odróżnieniu od paczki 3. Patrz
   [Chryzantema drobnokwiatowa](#chryzantema-drobnokwiatowa--wrzesień-2026).
8. **18 zdjęć chryzantem z Facebooka gospodarstwa** - weszło 15, bo **trzy okazały się
   powtórzeniami** kadrów już w repozytorium (w innym rozmiarze, więc nie do wyłapania po
   hashu pliku). Największa dostawa od czasu obsadzeń: pas na `/chryzantemy/` rośnie z 4 do
   19 kadrów - rzędy uprawy i cztery gotowe doniczki - a kadry w pasie dostają lupę.
   Patrz [Zdjęcia](#zdjęcia).
9. **4 zdjęcia bratków i prymulek z Facebooka gospodarstwa** - jedno poszło do nowego wpisu
   `prymulka.md`, trzy do pasa na `/bratki/` (`offer-05..07`). Piąty plik na liście okazał się
   bajt w bajt kopią pierwszego. Ta paczka **zamyka otwarty punkt o prymulkach**, który stał
   od dołożenia grupy `Bratki`. Patrz [Prymulki](#prymulki--zamknięte-we-wrześniu-2026).
10. **45 zdjęć kwiatów balkonowych z Facebooka gospodarstwa** - największa dostawa w projekcie.
    Weszły 24 do pasa na `/kwiaty-balkonowe/` i jedno na wpis hortensji; odpadło 21, w tym
    **sześć powtórzeń** kadrów już będących zdjęciami wpisów (znów w innym rozmiarze, więc
    nie do wyłapania po hashu pliku - jak w paczce 8) i dziewięć obsadzonych kompozycji,
    pominiętych świadomie. Ta paczka **zamyka ostatnią różnicę w układzie stron kategorii**
    i zdejmuje pierwszy z osiemnastu zastępników z Wikimedia. Patrz
    [Pasek zdjęć na `/kwiaty-balkonowe/`](#pasek-zdjęć-na-kwiaty-balkonowe--wrzesień-2026).

## Polityka prywatności - wrzesień 2026

Strona dostała dziesiątą podstronę, `/polityka-prywatnosci/`. Powstała, bo musiała: serwis
osadza mapę Google i pokazuje wpisy z Facebooka, a pasek zgody pytał odwiedzającego
o przetwarzanie danych i nie prowadził do żadnego dokumentu. Trzy komentarze w kodzie
(`Footer.astro`, `MapEmbed.astro`) i `CLAUDE.md` nazywały to jedną, tą samą dziurą.

Wzorem jest polityka bliźniaczej strony **alpaki-kazimierzdolny.pl** - ten sam właściciel,
ten sam stos, ta sama bramka na mapę. Przeniesiona jest **struktura i ton**, nie treść: inna
działalność to inne cele przetwarzania i inny zestaw usług zewnętrznych.

### Co dokument mówi, czego u alpak nie ma

- **§ 5 o wpisach z Facebooka** - paragraf bez odpowiednika we wzorze. Opisuje to, co
  [blok „Co u nas słychać”](#posty-z-facebooka--wrzesień-2026) robi naprawdę: tekst i zdjęcia
  są pobierane raz dziennie na nasz serwer i z niego serwowane, więc przeglądarka
  odwiedzającego nie łączy się z Meta i blok nie potrzebuje zgody. **To zdanie przestaje być
  prawdziwe w dniu, w którym ktoś zamieni blok na wtyczkę Facebooka albo na linkowane
  zdjęcie** - wtedy zmienia się polityka, nie tylko komponent.
- **§ 2 zaczyna się od zdania, że sprzedaży internetowej nie ma** - żadnych formularzy,
  koszyka, płatności ani kont. To najkrótsza odpowiedź na połowę pytań, jakie taki dokument
  wywołuje.

### Czego dokument świadomie nie mówi

- **Nic o wizerunku.** Wzór ma paragraf o zdjęciach uczestników; tutaj wszystkie 69 zdjęć to
  rośliny, obsadzenia i - od września 2026 - puste stoisko gospodarstwa. Jeśli do bloku
  historii trafi archiwalne zdjęcie z ludźmi (punkt 1 poniżej), paragraf wraca - z art. 6
  ust. 1 lit. a RODO i art. 81 prawa autorskiego. **Sprawdzone przy podmianie zdjęcia w bloku
  historii: warunek nie zachodzi**, na `konskowola-stand.jpg` nie ma żadnej osoby (dwa fotele
  w głębi są puste).
- **Nie podaje adresu e-mail**, bo go nie ma (punkt 5). § 1 wskazuje dwa telefony i adres
  pocztowy, a § 6 nie ma klauzuli o dostawcy poczty. Jedno i drugie dochodzi razem z adresem.
- **Nie ma na stronie żadnej ramki „do uzupełnienia”**, choć nazwisk brakuje. § 1 podaje nazwę
  i adres gospodarstwa, co jest pełną identyfikacją administratora, a nie zapchajdziurą.
  Wpisanie nazwisk do `administrators` w `src/data/contact.ts` zamienia to zdanie na wersję
  o współadministratorach z art. 26 RODO i nie zmienia nic poza tym.

### Do przejrzenia i potwierdzenia przez właścicieli

| Rzecz                            | Stan                                                                                                                                                                                                                    |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Imiona i nazwiska administratora | `administrators` = `null`. Telefony podają dwa imiona, ale imię to nie identyfikacja, a osoby odbierające telefon to niekoniecznie osoby prowadzące gospodarstwo. Nie zgadujemy.                                        |
| NIP                              | `taxId` = `null`. Nie było go na starej stronie ani w handoffie. Jeśli gospodarstwo jest zarejestrowane, numer należy do § 1.                                                                                           |
| Adres e-mail do spraw RODO       | Jak punkt 5 poniżej.                                                                                                                                                                                                    |
| Całe brzmienie dokumentu         | Napisane przez nas na wzorze alpak. Właściciele mogą je zastąpić własnym albo cudzym.                                                                                                                                   |
| „3 miesiące” na logi serwera     | **Obietnica o maszynie, nie fakt o repozytorium.** `deploy.yml` nie istnieje (punkt 13), a rotacja logów należy do serwera. Kto pisze wdrożenie, musi ustawić `logrotate` zgodnie z tym zdaniem albo zmienić to zdanie. |

### Trzy odnośniki, jeden moment

Polityka jest linkowana ze **stopki** (kolumna „Informacje”), z **paska zgody** i spod
**zastępnika mapy**. Trzeciego dołożono wbrew wcześniejszej notatce, że wystarczą dwa: pasek
zgody widuje się raz, a zastępnik mapy stoi dokładnie tam, gdzie pytanie wraca.

**Polityka jest jedyną stroną serwisu spoza menu.** `navigation.ts` zasila też `allPages`,
czyli listę „Strony na tej witrynie” na 404, a dokument prawny nie jest miejscem, do którego
ktoś chciał trafić, myląc adres. Stopka jest więc jedyną drogą do niej z większości stron -
nie da się jej stamtąd usunąć jako „powtórzenia menu”, bo w menu jej nie ma.

Przycisku „Ustawienia prywatności” ze wzoru **nie dodano**: stopka ma już „Ustawienia mapy”,
które robi dokładnie to samo, a § 3 i § 4 cytują tę etykietę dosłownie. Zmiana napisu byłaby
widoczna dla klienta i wymaga osobnej decyzji - wtedy trzeba poprawić oba paragrafy.

## Dwadzieścia jeden nowych opisów - wrzesień 2026

Właściciele podali listę 38 nazw łacińskich i handlowych, a po sprawdzeniu, czego z niej
brakuje, nadesłali opisy do 21 roślin. Katalog urósł z 19 wpisów do **40** - największa
jednorazowa dosypka treści w historii projektu.

### Co weszło

Do `Balkonowe` (11): bidens, wilczomlecz, petunie i surfinie, plektrantus, dichondra,
helichrysum, hypoestes, ipomoea, lobelia, sanvitalia, bakopa.
Do `Rabatowe` (10): hortensja, koleus, orlik, wrzos, funkia, gazania, trytoma, łubin,
szałwia, aksamitka.

**Piątej grupy nie założono**, choć sześć z nowych roślin to byliny i krzewy. Powód jest
w `offer.ts`: kafel `/rabatowe/` nazywa się „Rabatowe i wieloletnie”, więc miejsce na
orlika, funkię, trytomę i łubin było w tej grupie od początku. Jedyny wpis, który do niej
nie pasuje kalendarzem, to wrzos - punkt 19 na liście braków.

### Nazwy wpisów - polskie tam, gdzie polskiej ktoś szuka

Lista przyszła po łacinie, a strona rankuje na nazwach roślin, więc `name` i nazwa pliku
są polskie wszędzie, gdzie polska nazwa jest w obiegu: `Aquilegia` → **orlik**, `Calluna` →
**wrzos**, `Kniphofia` → **trytoma**, `Lupinus` → **łubin**, `Salvia` → **szałwia**,
`Tagetes` → **aksamitka**, `Sutera` → **bakopa** (tak samo, jak nazywa ją `historia.md`).
Łacina zostaje tam, gdzie to ona jest nazwą handlową i polskiej nikt nie używa:
`Dichondra`, `Gazania`, `Helichrysum`, `Hypoestes`, `Ipomoea`, `Sanvitalia`, `Bidens`.
Każdy opis i tak otwiera się glosą („Tagetes, czyli aksamitka…”), więc obie nazwy są w treści.

Sześć nazw było już ustalonych w `plant-links.ts` i te wygrywają z listą: `Wilczomlecz` (nie
Euphorbia), `Hortensja`, `Koleus`, `Plektrantus`, `Bidens`, `Petunie i surfinie`.

### Powtórzenia w nadesłanej liście - rozstrzygnięte, nie zdublowane

- **Dipladenia = Mandevilla = Sundaville.** Lista wymienia tę roślinę dwa razy, a my mamy ją
  pod trzecią, handlową nazwą. Drugiego wpisu nie założono.
- **Supertunia ⊂ Petunia.** Marka odmian petunii, nie osobny gatunek - jeden wpis
  `petunia-surfinia.md`, którego treść mówi o obu.
- **Koleus i Plektrantus zostają osobno.** Botanicznie koleus to dziś
  _Plectranthus scutellarioides_, ale handlowo to dwie różne rośliny i tak nazwali je
  właściciele. Dwa wpisy, dwa chipy.
- **Helichrysum to nie heliotrop.** Kocanka ma srebrne liście, heliotrop fioletowe
  kwiatostany; po polsku oba bywają opisywane jako „srebrzyste” i łatwo je skleić w jedno.
  `heliotrop.md` istniał wcześniej i nie został ruszony.
- **Impatiens** - mamy tylko niecierpka nowogwinejskiego. Czy lista obejmuje też balsaminę
  (_I. walleriana_), nie wiadomo; jeśli tak, to osobna roślina i osobny brak.
- **Sanvitalia przyszła dwa razy**, w dwóch nieco różnych redakcjach. Wzięto drugą
  („małe słoneczka”, „unikać nadmiernego przelania”) jako późniejszą.

### Czego nadesłane opisy nie mówią

Żaden z 21 tekstów nie podaje **okna sprzedaży**, więc `season.ts` jest nietknięty i każda
z nowych roślin dziedziczy okno swojej grupy. Dla wrzosu to jest błąd - patrz punkt 19.

**Wszystkie 21 wpisów są bez zdjęcia** i mają wypełniony `slot`. Razem z trzema zastanymi
daje to 24 puste ramki na 40 wpisów - punkt 18.

### Fakty - pięć do siedmiu linii na cztery miejsca

Nadesłane opisy mają po 5-7 wypunktowanych linii, a `facts` przyjmuje cztery. Wybór idzie
kolejnością priorytetu ze [słownika](#fakty--limit-podniesiony-do-czterech), który przy tej
okazji dostał `Pokrój` i `Podłoże`. Linie kolorów nie zajmują miejsca na fakt - idą do
chipów `colors`.

**Wartość faktu to etykieta, nie zdanie** - najwyżej dwa człony po jednym, dwóch słowach.
Nadesłane linie były całymi frazami („Pokrój: zwisający, silnie rozrastający się”,
„Podlewanie: umiarkowane, dobrze znosi okresowe przesuszenie”) i w siatce faktów, gdzie
kafelek ma ok. 150 px, czytały się jak urwane zdania, a nie jak dane. Zostały ścięte do
„Zwisający” i „Umiarkowane”. Po tej zmianie 84 fakty nowych wpisów mają średnio 1,8 słowa
i żaden nie przekracza trzech; `Pokrój` jest jednowyrazowy wszędzie poza lobelią
(„Zwisający lub zwarty” - ich tekst mówi wprost, że zależy od odmiany). Trzy słowa zostają
tylko tam, gdzie człon jest wyliczeniem miejsc uprawy („Rabaty, skalniaki, donice”).
**Zastanych wpisów to nie dotyczy** - `tunbergia.md` ma „Obficie, w upały 2× dziennie” i tak
zostaje, bo to słowa właścicieli z pierwszej paczki.

**Proza opisów jest nietknięta** poza zamianą półpauzy na dywiz w jednym zdaniu o wrzosie,
zgodnie ze stylem reszty plików - wszystko, co wypadło z faktów, i tak stoi w opisie.

### Co się przy okazji zmieniło poza wpisami

- `plant-links.ts` - sześć chipów na `/inspiracje/` przestało być ślepych i prowadzi do
  wpisów. Bez odnośnika została **jedna** roślina sprzedawana, brachyscome, i trzy dodatki.
- `order` przenumerowany globalnie, żeby bloki grup zostały ciągłe: Balkonowe 1-22,
  Rabatowe 23-34, Chryzantemy 35-38, Bratki 39-40. Osiem istniejących plików dostało nowe
  numery, ich treść jest nietknięta.
- Meta `description` na `/rabatowe/` wymieniało dwie rośliny na stronie, która ma teraz
  dwanaście - przepisane. `/kwiaty-balkonowe/` kończyło się na „i inne”, więc nie było
  nieprawdziwe, ale dopisano do niego nowe nazwy, na których strona może rankować.

### Do przejrzenia przez właścicieli

Nadesłane teksty są **wyraźnie jednorodne** - prawie każdy otwiera się tym samym zwrotem
(„to niezwykle dekoracyjna roślina…”) i kończy tym samym akapitem o stanowisku i podlewaniu.
Czytają się inaczej niż 14 opisów z pierwszej paczki, które były nierówne i konkretne. To nie
jest powód, by ich nie publikować - są od właścicieli - ale warto ich zapytać, czy tak mają
zostać, bo na jednej stronie stoi teraz 22 wpisy o bardzo podobnym rytmie.

## Scalenie oferty - wrzesień 2026

Właściciele poprosili o **połączenie kwiatów balkonowych i rabatowych w jedną zakładkę**. Grupa
`Rabatowe` zniknęła z `plantGroups`, jej dwanaście roślin ma teraz `group: Balkonowe`, strona
`/rabatowe/` została usunięta, a `/kwiaty-balkonowe/` niesie wszystkie 34 wpisy. Oferta ma trzy
grupy, menu trzy pozycje w panelu „Oferta”, a strona główna trzy kafle zamiast czterech.

**Dane były już w połowie scalone, tylko nikt tego nie napisał.** Obie grupy dzieliły jedno okno
sprzedaży w `season.ts` (kwiecień – czerwiec) i jedną kartę sezonową, a komentarz w
`SeasonCards.astro` od dawna odnotowywał, że ta karta „nie może powiedzieć prawdy”, bo jedno
okno prowadzi na dwie strony. Teraz prowadzi na jedną i ten argument wygasł - co jest zapisane
przy karcie, razem z uwagą, że **odnośnika i tak nie dostaje**: kafle niżej są jedynymi drzwiami
do strony kategorii i drugie drzwi wróciłyby do duplikacji, dla której karty odnośnik straciły.

### Który adres został i co to kosztowało

Zostało `/kwiaty-balkonowe/` - mocniejsza fraza w wyszukiwarce i 22 z 34 wpisów już tam były.
`/rabatowe/` to **jedyny rankujący adres starej strony, którego ten projekt nie zachował**;
dostaje 301 w [`przekierowania.md`](przekierowania.md). Ryzyko jest realne i warto je nazwać:
konfiguracja serwera nie jest częścią repozytorium, więc **dopóki reguła 301 nie powstanie,
adres z pozycjami zwraca 404**. Nic w kodzie tego nie dopilnuje.

Kotwice przeżyły w całości - identyfikator wpisu to nazwa pliku, a pliki się nie ruszyły. Cztery
odnośniki w `plant-links.ts` (`hortensja`, `koleus`, `niecierpek-nowogwinejski`,
`pelargonia-rabatowa`) wskazują teraz `/kwiaty-balkonowe/#…`.

`order` nie wymagał przenumerowania: wartości w całej kolekcji były już globalnie unikalne
(Balkonowe 1–22, Rabatowe 23–34, reszta 35–40), więc scalenie grup niczego nie zderzyło.

### Nazwa - do potwierdzenia przez właścicieli

Właściciele wybrali **„Kwiaty balkonowe”** jako nazwę całości, po przedstawieniu wariantów
z frazą „rabatowe” w tytule. **Nazwa jest szersza niż to, co pod nią stoi**: aksamitka, funkia,
hortensja, orlik, trytoma, łubin i wrzos balkonowe nie są. Właściciele zostali o tym
poinformowani i wybrali tę nazwę świadomie - zapisane tutaj, żeby przy następnym przeglądzie
treści nie wyglądało to na przeoczenie.

Fraza „kwiaty rabatowe i wieloletnie” **została w `description`** strony, czyli tam, gdzie
pracuje na wyszukiwanie, i zniknęła tylko z tytułu, menu i kafla. Do decyzji właścicieli, czy
ma zniknąć również stamtąd - to jedna linia w `src/pages/kwiaty-balkonowe.astro`.

Zniknął przy okazji tytuł kafla „Rabatowe i wieloletnie”, a wraz z nim **jedyne miejsce
w serwisie, które mówiło o bylinach**. Sześć bylin i krzew nadal nie mają własnej grupy ani
słowa w nazwie - to jest ten sam otwarty punkt co w
[Dwudziestu jeden nowych opisach](#dwadzieścia-jeden-nowych-opisów--wrzesień-2026), tylko teraz
bez żadnego zawoalowanego sygnału na stronie. Wrzos, który już wcześniej siedział pod złym
oknem sprzedaży, siedzi teraz dodatkowo pod stroną nazwaną „Kwiaty balkonowe”.

### Układ listy: alfabet, indeks literowy, przekładki

34 wpisy to strona, po której trzeba dało się nawigować, a nie tylko ją przewijać. Wybrano
**jedną płaską listę alfabetyczną bez chipów grup** - właściciele nie chcieli, żeby podział na
balkonowe i rabatowe był na stronie widoczny w jakiejkolwiek formie. Doszły dwie rzeczy:

1. **Spis „Na tej stronie” grupowany po literze.** Siedemnaście liter na 34 rośliny
   (A B C D F G H I K L Ł N O P S T W), w trzech kolumnach na desktopie i jednej na telefonie -
   siedemnaście wierszy na pełną szerokość byłoby półtora ekranu spisu przed pierwszą rośliną.
2. **Duża litera między wpisami.** **Nie jest nagłówkiem** i ma `aria-hidden="true"`: konspekt
   strony to jeden `h1` i 34 `h2` z nazwami roślin, a samotne „A” wołane między wpisami byłoby
   dla czytnika ekranu szumem. Litery docierają tam spisem wyżej, który jest prawdziwym `<nav>`
   z prawdziwymi odnośnikami.

### Dwie poprawki po obejrzeniu pierwszej wersji

**Przekładka straciła linię.** Pierwsza wersja stawiała literę obok kreski `--rule` biegnącej
w prawo. Właściciel zgłosił, że to się zlewa - i miał rację: każdy wpis **już** kończy się
kreską `--rule` tej samej grubości i w tym samym kolorze, więc strona szła „linia, litera
z linią, linia”, a dwa znaki o identycznym ciężarze robiły dwie różne rzeczy. Teraz **na tej
stronie jest jeden rodzaj poziomej kreski i znaczy jedno: skończył się wpis.**

Podział niesie sama litera, dwoma środkami, które ten projekt i tak ma - **rozmiarem
i odstępem**. Jest wyraźnie większa niż nazwa rośliny (40–64px, `clamp`), a odstęp jest celowo
niesymetryczny: dużo miejsca nad literą, zero pod nią, więc bliskość przykleja ją do roślin,
które po niej idą, zamiast zostawiać ją w zawieszeniu między dwiema. Ta asymetria jest tym, co
sprawia, że czyta się to od razu.

Kolor to `--sage`, i licencjonuje go rozmiar: `tokens.css` dopuszcza tę zieleń **wyłącznie dla
typografii dekoracyjnej od 24px w górę** (3,9:1 - próg 3:1 dla dużego tekstu przechodzi, próg
4,5:1 dla tekstu ciągłego nie). Litera jest dekoracyjna z definicji, bo ma `aria-hidden`, i nigdy
nie schodzi poniżej 40px. **Tej zieleni nie wolno przenieść do `<dt>` w spisie** - tamte litery
mają 20px i zostają `--ink-grey`.

**Spis przeszedł z siatki na kolumny.** `grid` z `auto-fit` wyrównuje wiersze **między
kolumnami** - do tego służy - i tu było to błędem: wiersz „P” trzyma cztery nazwy i łamie się na
trzy linie, więc obie komórki obok niego zostały rozepchane w dziurę pod „Orlikiem”
i „Szałwią”. `columns: 3 300px` pakuje każdą kolumnę osobno i nie ma czego rozpychać. Przy
okazji alfabet stoi tam, gdzie go szuka czytelnik dowolnego drukowanego indeksu: w dół kolumny
i dalej do następnej (A–G, H–N, O–W), a nie w poprzek strony. Kolejność w DOM-ie jest
alfabetyczna tak czy tak, więc kolejność tabulacji i to, co czyta czytnik ekranu, nie zależy od
tego wyboru.

Kotwic literowych **nie ma i nie są potrzebne**: w spisie linkami są nazwy roślin, a każda ma
już `id`. To omija problem identyfikatora dla „Ł”, który po transliteracji zderzyłby się z „L”.

Sortowanie idzie przez `localeCompare(…, "pl-PL")` i kolacja **nie jest tu opcjonalna** -
domyślna wyrzuca „Łubin” za „Wrzos”, czyli na koniec listy, zamiast postawić go zaraz po
„Lobelii”.

Jedno i drugie było **wyłączone na `/bratki/` i `/chryzantemy/`**. `OfferSection` dostał prop
`sort: "order" | "name"`; przy dwóch i czterech wpisach pomoce w szukaniu wydawały się zbędne,
a `order` mówi, co właściciele uważają za najważniejsze, i na krótkiej stronie to miała być
lepsza odpowiedź niż alfabet. **Właściciele obejrzeli obie wersje i kazali wyrównać wszystkie
trzy strony**; prop zniknął razem z tym argumentem - patrz
[Jeden układ na trzech stronach kategorii](#jeden-układ-na-trzech-stronach-kategorii--wrzesień-2026).

### `order` przestał znaczyć to samo wszędzie

Na `/kwiaty-balkonowe/` `order` nie rządzi już kolejnością na stronie - steruje wyłącznie tym,
które cztery nazwy i które dwa zdjęcia pokazuje kafel na stronie głównej. (Po wyrównaniu
trzech stron nie rządzi nią **nigdzie**.) **Kafel jest więc
w kolejności redakcyjnej, a strona w alfabetycznej, i to jest celowe**: kafel z miejscem na
cztery nazwy ma pokazać cztery najlepsze, a nie cztery pierwsze z alfabetu, bo inaczej oferta
otwierałaby się słowami „Aksamitka · Alstromeria · Bakopa · Begonia”. Argument stoi
w `OfferOverview.astro`.

## Chryzantema igiełkowa zwinięta do średniokwiatowej - wrzesień 2026

Właściciele polecili usunąć chryzantemę igiełkową jako osobny typ i **zaliczać ją do
średniokwiatowych**. Jest to rozstrzygnięcie merytoryczne, nie redakcyjne: „igiełkowa” opisuje
kształt płatka, a pozostałe trzy wpisy dzielą chryzantemy według wielkości kwiatu, więc czwarty
wpis stał w tej grupie na innej osi niż reszta. Grupa `Chryzantemy` ma teraz trzy wpisy,
a repozytorium 39 roślin zamiast 40.

### Tekst, który zniknął ze strony

**To były słowa właścicieli**, wzięte z ich własnego opisu trzech typów we wrześniu 2026, więc
zgodnie z regułą z `CLAUDE.md` nie znika po cichu. Zapis w całości, bez skrótów:

> Chryzantema igiełkowa wyróżnia się charakterystyczną budową kwiatostanu. Tworzą ją długie,
> wąskie i rurkowate płatki, które nadają kwiatom lekki, przestrzenny i niepowtarzalny wygląd.
> Ich ułożenie może być bardziej rozchylone lub skierowane ku górze, dzięki czemu kwiatostany
> mają wyraźnie odmienną formę od chryzantem o szerokich płatkach. Jest to typ szczególnie
> ceniony za oryginalny kształt kwiatów i dekoracyjny charakter.

Fakty przy wpisie (Forma: doniczkowa, Stanowisko: słońce osłonięte, Sprzedaż: 1.10 – 1.11)
i chipy kolorów (biały, żółty, fiolet, złoty) były identyczne jak u pozostałych trzech typów,
więc nic osobnego z nimi nie przepadło.

**Do rozważenia przez właścicieli:** opis średniokwiatowej kończy się zdaniem „Poszczególne
odmiany różnią się kształtem i budową kwiatów oraz ich kolorystyką”, które jest naturalnym
miejscem na zdanie o płatkach igiełkowych, gdyby chcieli je zachować. **Nie dopisano go** -
opisy roślin są ich, nie nasze.

### Zdjęcie zostało

`chryzantema-igielkowa.jpg` (1500×2000, z profilu Facebook gospodarstwa) przeszło do
`src/assets/chrysanthemums/rows-12.jpg` i weszło do `chrysanthemumStrip`, który rośnie z 19 do
**20 kadrów** - nadal najdłuższy pas w serwisie. To ten sam ruch, co przy usunięciu drugiego
pasa na tej stronie, kiedy cztery kadry gotowych doniczek przeszły do pasa głównego: pas jest
właśnie od kadrów, które nie należą do żadnego wpisu. Zdjęcie stoi w grupie `rows-*`, bo pokazuje
rzędy w uprawie, a nie pojedynczą doniczkę.

Opis alternatywny został wzięty z wpisu bez zmian („Różowo-białe chryzantemy o długich, wąskich
i rurkowatych płatkach z podwiniętymi końcami”, z dopiskiem „rzędy w uprawie” dla zgodności
z sąsiadami w pasie). Opisuje płatki na zdjęciu i **nie twierdzi niczego o klasie wielkości**,
czyli dokładnie o to, co ta zmiana rozstrzygnęła gdzie indziej. Liczba zdjęć w repozytorium
zostaje 69 - plik się przeniósł, nie zniknął.

### Słowo „igiełkowe” zeszło ze strony

Zniknęło z dwóch miejsc na `/chryzantemy/`: z `description` i ze zdania w `note` („W uprawie
znajdują się chryzantemy wielkokwiatowe, średniokwiatowe, drobnokwiatowe i igiełkowe”).
Właściciele wybrali ten wariant spośród trzech przedstawionych. Uzasadnienie: skoro igiełkowe
**są** średniokwiatowymi, wymienianie ich obok jako osobnego typu przeczy tej klasyfikacji,
a zdanie obiecujące cztery typy nad stroną pokazującą trzy wpisy to dokładnie ta rozbieżność,
której ten projekt unika trzymając jedną kopię każdego faktu.

**Zdanie w `note` to słowa właścicieli i zostało zmienione**, więc trafia na tę listę tak samo
jak usunięty opis. Cena: fraza „chryzantemy igiełkowe” nie występuje już nigdzie w serwisie,
łącznie z opisem meta, więc strona przestaje na nią rankować. Przedstawiono wariant pośredni
(zostawić frazę w samym `description`, tak jak zrobiono z „rabatowymi” przy scalaniu oferty) -
nie został wybrany.

### Zmierzone skutki uboczne

- Wpisów ze zdjęciem: **15 z 39** (było 16 z 40). Wpisów czekających na zdjęcie: 24, bez zmian.
- Tabela kadrowania 4:3 w [Kadrze zdjęć we wpisach](#kadr-zdjęć-we-wpisach---wrzesień-2026)
  liczyła szesnaście plików; teraz jest ich piętnaście. Nietknięty przy 4:3 pozostaje jeden
  (werbena), a przy poprzedniej regule adaptacyjnej nietkniętych było osiem, nie dziewięć.
  Wiersz `chryzantema-igielkowa` w tamtej tabeli zostaje jako zapis pomiaru z chwili, gdy był
  robiony.
- `order: 38` zwolniło się i **nie zostało użyte ponownie** - numeracja nie musi być ciągła,
  a przenumerowanie czegokolwiek byłoby ruchem bez powodu.
- Pytanie otwarte „który typ chryzantemy pokazuje które zdjęcie” zmalało, ale nie zniknęło:
  kadr igiełkowy jest teraz kadrem w pasie i nie twierdzi nic o typie, ale przypisanie
  `sredniokwiatowa` nadal jest oceną wielkości kwiatu.

## Chipy kolorów usunięte - wrzesień 2026

Właściciele polecili usunąć blok „Dostępne kolory" ze **wszystkich** wpisów. Dotknęło to
22 wpisów i 104 chipów; pozostałych 17 nigdy chipów nie miało, bo stara strona opisywała te
rośliny tylko jako dostępne „w różnych kolorach" i to zdanie zostało w treści, zamiast zostać
zamienione na wymyślone chipy.

**To jest odejście od briefu i warto, żeby było tak nazwane.** Wzorzec przeniesiony ze starej
strony WordPressa brzmiał: zdjęcie + długi opis uprawy + **lista dostępnych kolorów**. Trzeci
człon właśnie odpadł. Ponowne dodanie go będzie tak samo widoczne dla klienta jak usunięcie,
więc nie robi się tego bez ich prośby - notatka stoi też w `src/content.config.ts`, w miejscu
po polu `colors`.

### Co dokładnie przepadło ze strony

Pole `colors` zniknęło z frontmattera 22 plików **i ze schematu**, nie tylko ze znaczników: pole,
którego żaden komponent nie czyta, to dokładnie ten martwy balast, któremu `content.config.ts`
ma zapobiegać. Wartości są tutaj w całości.

| Wpis                        | Chipy kolorów                                                                               | Kolory też w opisie? |
| --------------------------- | ------------------------------------------------------------------------------------------- | -------------------- |
| Aksamitka                   | żółty, pomarańczowy, złocisty, czerwono-brązowy                                             | tak                  |
| Alstromeria                 | czerwony, czerwono-biały, biało-żółty, biało-różowy, lila, pomarańczowy                     | tak                  |
| Bakopa                      | biały, różowy, fioletowy, niebieski                                                         | **nie**              |
| Bidens                      | żółty                                                                                       | tak                  |
| Bratek ogrodowy             | żółty, kremowy, biały, bordowy, różowy, amarantowy, fioletowy, liliowy, błękitny, dwubarwny | tak                  |
| Chryzantema drobnokwiatowa  | biały, żółty, fiolet, złoty                                                                 | tak                  |
| Chryzantema średniokwiatowa | biały, żółty, fiolet, złoty                                                                 | tak                  |
| Chryzantema wielkokwiatowa  | biały, żółty, fiolet, złoty                                                                 | **nie**              |
| Funkia                      | biały, lila, fioletowy                                                                      | tak                  |
| Gazania                     | żółty, pomarańczowy, czerwony, różowy, biały, wielobarwny                                   | tak                  |
| Hypoestes                   | różowy, czerwony, biały, fioletowy, wielobarwny                                             | tak                  |
| Lobelia                     | niebieski, granatowy, biały, różowy, fioletowy                                              | tak                  |
| Łubin                       | różowy, fioletowy, niebieski, biały, czerwony, wielobarwny                                  | tak                  |
| Niecierpek nowogwinejski    | biały, łososiowy, biskupi, różowy, pomarańczowy                                             | tak                  |
| Pelargonie bluszczolistne   | bordowy, czerwony, pomarańczowy, różowy, jasny lila, biały                                  | **nie**              |
| Pelargonie rabatowe         | bordowy, czerwony, ciemnoróżowy, fioletowy, pomarańczowy, biały                             | tak                  |
| Prymulka                    | biały, żółty, różowy, czerwony, fioletowy, pomarańczowy, dwubarwny                          | tak                  |
| Sanvitalia                  | żółty z ciemnym środkiem                                                                    | tak                  |
| Sundaville                  | czerwony, różowy, biały                                                                     | tak                  |
| Szałwia                     | czerwony, różowy, fioletowy, biały, niebieski                                               | tak                  |
| Trytoma                     | żółty, pomarańczowy, czerwony, dwubarwny                                                    | tak                  |
| Wrzos                       | biały, różowy, liliowy, fioletowy, purpurowy                                                | tak                  |

(Chryzantema igiełkowa miała te same cztery chipy co pozostałe chryzantemy; jej wpis usunięto
wcześniej - patrz [Chryzantema igiełkowa
zwinięta](#chryzantema-igiełkowa-zwinięta-do-średniokwiatowej---wrzesień-2026).)

### Trzy wpisy tracą informację o kolorach całkowicie

U **19 z 22** kolory są nadal w treści opisu, więc czytelnik ich nie traci - zmienia się tylko
forma podania. Wyjątki są trzy i to one są ceną tej zmiany:

- **Bakopa** - traci „biały, różowy, fioletowy, niebieski"
- **Chryzantema wielkokwiatowa** - traci „biały, żółty, fiolet, złoty"
- **Pelargonie bluszczolistne** - traci „bordowy, czerwony, pomarańczowy, różowy, jasny lila,
  biały"

Przy tych trzech roślinach serwis nie mówi już nic o dostępnych kolorach. **Nie dopisano tego do
opisów** - opisy roślin są własnością właścicieli i nie wolno ich uzupełniać za nich. Jeśli mają
o kolorach wspominać, to ich zdanie, nie nasze. Do listy pytań.

Chryzantema wielkokwiatowa jest z tej trójki przypadkiem najdotkliwszym: to sztandarowa roślina
gospodarstwa, sprzedawana na Wszystkich Świętych, a „duży wybór kolorów" był argumentem
sprzedażowym, który stara strona podawała wprost. Zdanie o tym usunięto z `/chryzantemy/`
wcześniej we wrześniu 2026 **właśnie dlatego, że powielało chipy** - a teraz nie ma ani zdania,
ani chipów. To realna dziura w treści i do rozstrzygnięcia przez właścicieli.

## Dziewiąta paczka zdjęć - wrzesień 2026

Właściciele przysłali jedenaście plików z nazwami roślin w nazwach. Weszło **dziewięć**: sześć
wpisów dostało pierwsze zdjęcie, trzy dostały lepsze. Wpisów ze zdjęciem jest teraz **21 z 39**
(było 15), czekających 18 (było 24). Zdjęć w repozytorium 75 (było 69).

| Plik źródłowy      | Wpis             | Co się stało | Źródło → po obróbce   |
| ------------------ | ---------------- | ------------ | --------------------- |
| `Alstroemeria.jpg` | alstromeria      | podmiana     | 1512×2016 → 1500×2000 |
| `tunbergia.jpg`    | tunbergia        | podmiana     | 1512×2016 → 1500×2000 |
| `begonia.jpg`      | begonia          | podmiana     | 752×1020 (bez zmian)  |
| `dalia.jpg`        | dahlia           | **nowe**     | 1580×2048 → 1543×2000 |
| `Lobelia.jpg`      | lobelia          | **nowe**     | 752×1020 (bez zmian)  |
| `Sanvitalia.jpg`   | sanvitalia       | **nowe**     | 752×1020 (bez zmian)  |
| `bakopa.jpg`       | bakopa           | **nowe**     | 752×1020 (bez zmian)  |
| `Plectranthus.jpg` | **koleus**       | **nowe**     | 1638×2048 → 1600×2000 |
| `petunia (2).jpg`  | petunia-surfinia | **nowe**     | 2048×1691 → 2000×1651 |

Wszystkie trzy podmiany są awansem: alstromeria z 1278×1810 na 1500×2000, tunbergia i begonia
z 528×960 (kadry telefoniczne) na większe pliki.

Obróbka według reguły z `CLAUDE.md`: wypalona rotacja EXIF i zejście do 2000 px na dłuższej
krawędzi. **Wszystkie jedenaście plików miało `orientation: 1`**, więc obrót był tym razem
operacją pustą - ale przeszły przez nią mimo to, bo poprzednie paczki nie były tak łaskawe.

### `Plectranthus.jpg` trafił do koleusa, nie do plektrantusa

To jedyne miejsce, w którym **odstąpiono od nazwy pliku**, i warto, żeby było zapisane. Zdjęcie
pokazuje gęste kępy wielobarwnych, ząbkowanych liści - zielono-różowych, karminowych,
pomarańczowych i ciemnobordowych. To koleus.

Nazwa pliku nie jest błędem: koleus nosi dziś nazwę _Plectranthus scutellarioides_, więc
botanicznie „Plectranthus" jest poprawne. Ale **na stronie to dwa osobne produkty**, oba
w grupie Balkonowe, i `plektrantus.md` opisuje coś innego: „długie, elastyczne pędy", które
„przewieszają się przez brzegi donic", i „jasne, zielono-białe ulistnienie". Nic z tego nie jest
na zdjęciu. `koleus.md` z kolei mówi o „barwnych, efektownie wybarwionych liściach"
i „gęstych, atrakcyjnych kępach" - i to jest dokładnie ten kadr.

Podpięcie go pod plektrantusa postawiłoby na stronie zdjęcie jawnie sprzeczne z tekstem obok.
**Plektrantus nadal czeka na własne zdjęcie.**

### Dwie petunie zostały niewykorzystane

Przyszły **trzy** zdjęcia petunii, a wpis „Petunie i surfinie" jest jeden. Do wpisu poszła
`petunia (2).jpg` - fioletowa surfinia kaskadowo zwisająca z wiszącej doniczki. Powód jest
mierzalny: przy proporcji 1,21 zostaje jej w kadrze 4:3 **91%**, podczas gdy dwóm pozostałym,
pionowym, zostałoby 70% i 62%. Pokazuje też przewieszający się pokrój, który jest tym, czym
surfinia się sprzedaje.

Niewykorzystane, obie dobre:

- `Petunia.jpg` (1702×2048) - różowa petunia pełnokwiatowa w wiszącej doniczce;
- `494257532_718985697129862_217150299954056229_n.jpg` (1896×2048) - różowo-biała petunia
  w paski, w wiszącej doniczce.

**Propozycja, której nie zrealizowano, bo wykraczała poza prośbę:** `Petunia.jpg` ma proporcję
0,83, czyli prawie dokładnie 4:5, a otwartym punktem na tej liście jest **pionowy kadr do sekcji
hero na stronie głównej** - dziś stoi tam obraz 4:3 przycięty do 4:5 w powiększeniu ~1,6×, co
`Intro.astro` opisuje jako rozwiązanie tymczasowe. Ten plik pasowałby tam tracąc około 4%.
Do decyzji właścicieli.

### Opisy alternatywne - do potwierdzenia

Dziewięć nowych `imageAlt` napisano tutaj, na podstawie tego, co widać w kadrze, i **nie są to
słowa właścicieli**. Trafiają na tę samą listę co wszystkie pozostałe opisy alternatywne
w serwisie. Jeden punkt wymaga ich potwierdzenia szczególnie: chipy kolorów sanwitalii (zanim
je usunięto) mówiły „żółty z ciemnym środkiem", a na nadesłanym zdjęciu środki koszyczków są
żółto-pomarańczowe, nie ciemne. Opis alternatywny nie przesądza tego - mówi tylko „drobne żółte
kwiaty" - ale pytanie, czy to na pewno ta odmiana, zostaje otwarte.

### Jakość źródeł

Cztery z dziewięciu nowych plików (lobelia, sanvitalia, bakopa, begonia) mają 752 px szerokości.
`PlantEntry` prosi o warianty 560 i 1120 px, a Astro nie powiększa ponad źródło, więc na
ekranach o podwójnej gęstości te cztery będą nieco miękkie. Razem z wcześniejszymi jest
**dziesięć takich plików na dwadzieścia jeden**. To nie jest defekt do naprawienia w kodzie -
jedyną poprawką są ostrzejsze pliki od właścicieli.

## Zdjęcia zastępcze z Wikimedia Commons - wrzesień 2026

**Osiemnaście wpisów nie miało żadnego zdjęcia** i rysowało pasiasty `PhotoSlot`. Po scaleniu
`Rabatowe` w `Balkonowe` wszystkie osiemnaście wylądowało na jednej stronie, więc
`/kwiaty-balkonowe/` była w ponad połowie kolumną zaślepek. Na polecenie właściciela ramki
obsadzono zdjęciami z Wikimedia Commons, **tymczasowo**, do czasu aż przyjdą własne kadry.

**To jest odejście od reszty serwisu i tak ma być widoczne.** Pozostałe 21 zdjęć to kadry
gospodarstwa; te osiemnaście nie. Dlatego:

- każdy z osiemnastu wpisów **zachowuje pole `slot`** - brief na zdjęcie, które właściciele
  nadal są winni, nie znika dlatego, że stoi za nie pożyczona ramka;
- frontmatter niesie `imageCredit`, którego **żadne własne zdjęcie nie ma**. Obecność tego
  pola jest maszynowo sprawdzalną odpowiedzią na pytanie „czy to zdjęcie jest nasze?”;
- `PlantEntry` drukuje pod kadrem linię `fot. <autor>, Wikimedia Commons · <licencja> · kadr`.

### Podpis to atrybucja, nie powrót podpisów pod wpisami

Właściciele kazali we wrześniu 2026 usunąć jednozdaniowe podpisy redakcyjne spod wszystkich
wpisów - patrz [Podpisy pod zdjęciami](#podpisy-pod-zdjęciami--usunięte). Ta linia ich nie
przywraca. Podpis redakcyjny mówi coś o roślinie; ta linia jest **warunkiem prawnym** korzystania
z pliku: CC BY i CC BY-SA wymagają wskazania autora i licencji. Nie da się jej usunąć, nie
usuwając zdjęcia - i odwrotnie, znika razem z nim, kiedy przyjdzie własny kadr. Schemat tego
pilnuje: `imageCredit` bez `image` wywala budowanie.

Słowo **„kadr”** na końcu linii też nie jest ozdobą. Każdy plik został przeskalowany
i przycięty do 4:3, czyli powstał utwór zależny, a CC BY-SA wymaga oznaczenia modyfikacji.

### Filtr licencji

Przyjęto: domena publiczna, CC0, CC BY 2.0–4.0, CC BY-SA 2.0–4.0. **Odrzucono GFDL** (kłopotliwa
przy użyciu komercyjnym) oraz wszystko z `NC` i `ND`. Kandydat bez jednoznacznej licencji
w metadanych Commons w ogóle nie wchodził do puli - nie było przypadków „sprawdzę ręcznie potem”.

### Skąd pochodzi każde zdjęcie

| Roślina                   | Plik na Commons                                                                                                                                                                                                          | Autor                | Licencja                                                        | Źródło → plik w repo  | Ile zostało po kadrze |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- | --------------------------------------------------------------- | --------------------- | --------------------- |
| Aksamitka                 | [Tagetes patula, Burdwan, West Bengal, India 10 01 2013 01.jpg](https://commons.wikimedia.org/wiki/File:Tagetes_patula,_Burdwan,_West_Bengal,_India_10_01_2013_01.jpg)                                                   | Joydeep              | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0)  | 3317x2471 → 2000x1500 | szer. 99%, wys. 100%  |
| Bidens                    | [Bidens ferulifolia BotGardBln07122011A.JPG](https://commons.wikimedia.org/wiki/File:Bidens_ferulifolia_BotGardBln07122011A.JPG)                                                                                         | BotBln               | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0)  | 1536x2048 → 1536x1152 | szer. 100%, wys. 56%  |
| Dichondra                 | [Dichondra 'Silver Falls' Closeup 3008px.jpg](https://commons.wikimedia.org/wiki/File:Dichondra_%27Silver_Falls%27_Closeup_3008px.jpg)                                                                                   | Derek Ramsey         | [CC BY-SA 3.0](http://creativecommons.org/licenses/by-sa/3.0/)  | 3008x2000 → 2000x1500 | szer. 89%, wys. 100%  |
| Funkia                    | [Flickr - brewbooks - Hosta 'War Paint' - David F garden (1).jpg](<https://commons.wikimedia.org/wiki/File:Flickr_-_brewbooks_-_Hosta_%27War_Paint%27_-_David_F_garden_(1).jpg>)                                         | brewbooks            | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0)  | 3072x2304 → 2000x1500 | bez straty            |
| Gazania                   | [Gazania rigens-1.jpg](https://commons.wikimedia.org/wiki/File:Gazania_rigens-1.jpg)                                                                                                                                     | Alvesgaspar          | [CC BY 2.5](https://creativecommons.org/licenses/by/2.5)        | 2406x1832 → 2000x1500 | szer. 100%, wys. 98%  |
| Helichrysum               | [Starr 070906-8466 Helichrysum petiolare.jpg](https://commons.wikimedia.org/wiki/File:Starr_070906-8466_Helichrysum_petiolare.jpg)                                                                                       | Forest & Kim Starr   | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0)        | 2816x2112 → 2000x1500 | bez straty            |
| Hortensja                 | [Hydrangea macrophylla - Hortensia hydrangea.jpg](https://commons.wikimedia.org/wiki/File:Hydrangea_macrophylla_-_Hortensia_hydrangea.jpg)                                                                               | Raul654              | [CC BY-SA 3.0](http://creativecommons.org/licenses/by-sa/3.0/)  | 2016x1512 → 2000x1500 | bez straty            |
| Hypoestes                 | [Starr 070906-8669 Hypoestes phyllostachya.jpg](https://commons.wikimedia.org/wiki/File:Starr_070906-8669_Hypoestes_phyllostachya.jpg)                                                                                   | Forest & Kim Starr   | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0)        | 2816x2112 → 2000x1500 | bez straty            |
| Ipomoea                   | [Ipomoea batatas Margarita 2zz.jpg](https://commons.wikimedia.org/wiki/File:Ipomoea_batatas_Margarita_2zz.jpg)                                                                                                           | David J. Stang       | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0)  | 3504x2336 → 2000x1500 | szer. 89%, wys. 100%  |
| Łubin                     | [Lupinus polyphyllus UA 2015 G5.jpg](https://commons.wikimedia.org/wiki/File:Lupinus_polyphyllus_UA_2015_G5.jpg)                                                                                                         | George Chernilevsky  | domena publiczna                                                | 4600x3350 → 2000x1500 | szer. 97%, wys. 100%  |
| Orlik                     | [Aquilegia vulgaris in Aveyron 02.jpg](https://commons.wikimedia.org/wiki/File:Aquilegia_vulgaris_in_Aveyron_02.jpg)                                                                                                     | Krzysztof Golik      | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0)  | 2523x1901 → 2000x1500 | bez straty            |
| Pelargonia bluszczolistna | [Geraniales - Pelargonium peltatum 1.jpg](https://commons.wikimedia.org/wiki/File:Geraniales_-_Pelargonium_peltatum_1.jpg)                                                                                               | DenesFeri            | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0)  | 1600x1200 → 1600x1200 | bez straty            |
| Plektrantus               | [Plectranthus coleoides a3.JPG](https://commons.wikimedia.org/wiki/File:Plectranthus_coleoides_a3.JPG)                                                                                                                   | Jerzy Opioła         | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0)  | 1280x960 → 1280x960   | bez straty            |
| Sundaville                | [Mandevilla sanderi Brazilian Jasmine მანდევილა.JPG](https://commons.wikimedia.org/wiki/File:Mandevilla_sanderi_Brazilian_Jasmine_%E1%83%9B%E1%83%90%E1%83%9C%E1%83%93%E1%83%94%E1%83%95%E1%83%98%E1%83%9A%E1%83%90.JPG) | Lazaregagnidze       | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0)  | 3034x2650 → 2000x1500 | szer. 100%, wys. 86%  |
| Szałwia                   | [Salvia splendens in Dalat city (2).JPG](<https://commons.wikimedia.org/wiki/File:Salvia_splendens_in_Dalat_city_(2).JPG>)                                                                                               | Hungda               | [CC0](http://creativecommons.org/publicdomain/zero/1.0/deed.en) | 4320x3240 → 2000x1500 | bez straty            |
| Trytoma                   | [Kniphofia uvaria close.JPG](https://commons.wikimedia.org/wiki/File:Kniphofia_uvaria_close.JPG)                                                                                                                         | Toby Hudson / 99of9  | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0)  | 2330x2330 → 2000x1500 | szer. 100%, wys. 75%  |
| Wilczomlecz               | [Chamaesyce 'Diamond Frost'.jpg](https://commons.wikimedia.org/wiki/File:Chamaesyce_%27Diamond_Frost%27.jpg)                                                                                                             | Meneerke bloem       | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0)  | 2048x1536 → 2000x1500 | bez straty            |
| Wrzos                     | [Calluna vulgaris RF.jpg](https://commons.wikimedia.org/wiki/File:Calluna_vulgaris_RF.jpg)                                                                                                                               | Robert Flogaus-Faust | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0)        | 4608x3456 → 2000x1500 | bez straty            |

**Wiersz „Hortensja" jest już nieaktualny.** We wrześniu 2026, razem z
[paskiem zdjęć na `/kwiaty-balkonowe/`](#pasek-zdjęć-na-kwiaty-balkonowe--wrzesień-2026),
zastępnik hortensji zdjęto i zastąpiono własnym kadrem gospodarstwa; `imageCredit` wyszedł
z frontmatteru. To pierwszy z osiemnastu - **zostaje siedemnaście**. Tabela zostaje w tej
postaci, bo jest zapisem tego, co się wtedy wydarzyło, a nie spisem stanu na dziś.

### Kadr kosztował mniej niż przy własnych zdjęciach

Jedenaście z osiemnastu źródeł było już w proporcji bliskiej 4:3 i nie straciło nic. Najgorszy
przypadek to bidens - pionowe 1536×2048, zostaje 56% wysokości. Dla porównania: z dwudziestu
jeden zdjęć właścicieli osiemnaście trzyma 52–61% wysokości. Pożyczone kadry są pod tym względem
**łatwiejsze, nie trudniejsze** - bo wybierano je już pod znaną proporcję.

Przetwarzanie: `sharp`, `.rotate()` (wypalenie obrotu EXIF), przycięcie `fit: "cover"` ze
strategią `attention`, dłuższy bok do 2000 px, **nigdy w górę** - trzy pliki są mniejsze, bo
takie były źródła (`plektrantus` 1280×960, `pelargonia-bluszczolistna` 1600×1200, `bidens`
1536×1152). Zapis: progresywny JPEG q82.

**Jeden wyjątek od `attention`, i jest o pliku, nie o wpisie.** Trytoma: strategia wybrała suchą
trawę i głazy, a ucięła pochodnie kwiatostanów przy górnej krawędzi. Poprawka to inny kadr tego
samego źródła (`position: "north"`), a nie wyjątek w komponencie - wpis dalej jest tym samym
płaskim 4:3 co każdy inny. Tak właśnie ma wyglądać naprawa źle przyciętego wpisu.

### Dobór gatunku - cztery przypadki niejednoznaczne

Zapytania szły po nazwie łacińskiej z pierwszego zdania opisu. Cztery rozstrzygnął dopiero
kontekst, i warto to zapisać, bo pomyłka byłaby niewidoczna:

| Wpis          | Wybrano                                   | Dlaczego                                                                |
| ------------- | ----------------------------------------- | ----------------------------------------------------------------------- |
| `dichondra`   | _Dichondra argentea_ 'Silver Falls'       | opis mówi o srebrzystych liściach i kaskadowym pokroju                  |
| `helichrysum` | _Helichrysum petiolare_                   | srebrzyste liście, pokrój przewieszający - nie kocanka na suche bukiety |
| `ipomoea`     | _Ipomoea batatas_, odmiana ozdobna        | opis mówi o **liściach**, nie o kwiatach, więc to nie wilec pnący       |
| `wilczomlecz` | _Euphorbia hypericifolia_ 'Diamond Frost' | „delikatne pędy”, „lekki charakter”, dodatek do kompozycji              |

Sundaville to znak towarowy, nie gatunek - pod kadrem stoi _Mandevilla sanderi_.

### Co idzie na listę właścicieli

1. **Podmiana wszystkich osiemnastu na własne kadry.** To jest właściwe rozwiązanie, a nie to.
   Strona sprzedaje rośliny „z własnej uprawy” i te osiemnaście zdjęć tej obietnicy nie
   ilustruje. Podmiana jednej pozycji = jeden plik w `src/assets/plants/` plus usunięcie
   `imageCredit` z frontmatteru. Nic poza tym. **Hortensja przeszła tę drogę we wrześniu 2026
   i jest dowodem, że procedura kosztuje dokładnie tyle - zostaje siedemnaście.**
2. **Opisy `alt`** - osiemnaście nowych, napisanych tutaj z tego, co widać w kadrze. Trafiają
   na tę samą listę co wszystkie pozostałe opisy alternatywne w serwisie.
3. **Brzmienie linii atrybucji** - „fot. … , Wikimedia Commons · … · kadr” jest nasze.
4. **Czy w ogóle zostawiać obce zdjęcia**, gdyby właściciele woleli wrócić do zaślepek. Pasiasty
   `PhotoSlot` nie został usunięty z kodu i nadal obsługuje wpis bez zdjęcia.

## Pasek zdjęć na `/kwiaty-balkonowe/` - wrzesień 2026

`/bratki/` i `/chryzantemy/` miały pod listą roślin pasek zdjęć, `/kwiaty-balkonowe/` nie.
[Czego ta zmiana nie zrobiła](#czego-ta-zmiana-nie-zrobiła) nazywało to „czwartą różnicą
w układzie (…), której nie da się zamknąć kodem: w repozytorium nie ma materiału na taki pas".
Materiał przyszedł - **45 kadrów z albumów gospodarstwa na Facebooku** - i pozycja jest
zamknięta. `OfferSection` przyjmował `photos` od początku, więc kodu nie trzeba było zmieniać:
doszedł jeden eksport w `src/data/gallery.ts` i jeden prop na stronie.

### Zasada doboru: oferta, nie kompozycje

Pas pokazuje **ofertę tak, jak stoi w tunelu** - uprawę i pojedyncze gotowe kosze
jednogatunkowe. To jest ta sama linia, którą rysuje `chrysanthemumPhoto`, tylko poprowadzona
w drugą stronę: skrzynka sprzedażowa pośrodku pokazu obsadzeń czyta się jak pomyłka, i tak samo
czyta się obsadzona kompozycja pośrodku oferty.

24 kadry, trzy koszyki i ogon. Kolejność niesie znaczenie, jak w `chrysanthemumStrip`:

| Koszyk            | Ile | Co pokazuje                                                         |
| ----------------- | --- | ------------------------------------------------------------------- |
| `rows-01..06`     | 6   | uprawa - tace i masy jednego koloru, pelargonie → begonie → petunie |
| `baskets-01..14`  | 14  | pojedynczy gotowy kosz - fuksje, petunie, begonie                   |
| `pots-01..02`     | 2   | hortensje w doniczkach, jedyny krzew w tej grupie                   |
| `planters-01..02` | 2   | donice gospodarstwa obsadzone u klienta, w Kazimierzu               |

### Co odpadło i dlaczego - 21 z 45

**Sześć było już w repozytorium** jako zdjęcia wpisów. Wyszło z porównania percepcyjnego
(dHash) całej paczki z `src/assets/`, nie z oglądania - żaden plik nie był identyczny bajtowo,
bo przeszły przez inną kompresję. To jest odpowiedź na pytanie, czemu pas nie powtarza listy
nad sobą, i warto ją mieć, zanim ktoś zechce „dorzucić te, które wypadły":

`plants/begonia.jpg`, `plants/dahlia.jpg`, `plants/lobelia.jpg`, `plants/bakopa.jpg`,
`plants/petunia-surfinia.jpg`, `plants/koleus.jpg`.

**Dziewięć to obsadzone kompozycje wielogatunkowe** - kosz niosący cztery gatunki naraz. Gatunek
zdjęć ze slajdera `/inspiracje/`, do którego notka tej strony sama odsyła; druga, krótsza kopia
pokazu pod listą roślin cofałaby tę granicę.

**Pięć powtarzało kolor i ujęcie sąsiada** - dwa pełne różowe kosze petunii, drugi czerwony,
drugi biały, druga fuksja w tej samej tonacji. Wybrano ostrzejszy plik z pary.

**Jeden poszedł do wpisu, nie do pasa** - patrz niżej.

### Hortensja: pierwszy zastępnik z Wikimedia zdjęty

W paczce były trzy własne hortensje gospodarstwa, a wpis hortensji stał na
[zastępniku z Commons](#zdjęcia-zastępcze-z-wikimedia-commons--wrzesień-2026). Bez podmiany ta
sama strona pokazywałaby cudzą hortensję ekran nad własnymi. Liliowy kadr trafił do
`src/assets/plants/hortensja.jpg`, `imageCredit` wyszedł z frontmatteru (schemat wywala
budowanie, jeśli atrybucja przeżyje zdjęcie), `imageAlt` napisany od nowa - stary mówił
„w odcieniach błękitu", a zdjęcie jest liliowo-różowe. Dwie pozostałe hortensje są w pasie jako
`pots-01..02`. **Zostaje siedemnaście zastępników.**

Wybór kadru nie był losowy: wyrenderowano kadr 4:3 wszystkich trzech kandydatów i obejrzano je,
zgodnie z precedensem trytomy. Żaden nie ścinał kwiatostanu; wybrano liliowy, bo kwiatostan
stoi w nim całą kulą pośrodku ramki, a przejście fiolet–biel–zieleń pokazuje rozpiętość barw
hortensji lepiej niż płaska czerwień. `slot` zostaje - to pole jest wymagane i jest briefem
ramki, nie znacznikiem zastępnika.

### Opisy `alt`: gatunek tylko tam, gdzie nie ma pomyłki

Nazywane: **pelargonia, fuksja, begonia bulwiasta, hortensja**. Nienazywane:

- **surfinia** - to nazwa handlowa zwisającej petunii, a nie coś, co rozstrzyga zdjęcie;
- **calibrachoa** - w tym repozytorium raz już wzięto ją za zwisającą petunię (patrz
  [Zdjęcia](#zdjęcia)), więc żaden kadr z drobnym lejkiem nie dostał nazwy;
- **niecierpek** - gatunek kadru z piątej paczki jest otwartą pozycją i tak zostaje.

Dlatego `rows-05` (białe kwiaty w turkusowych skrzynkach) i oba `planters-*` nie nazywają
rośliny w ogóle - opisują kolor i formę, dokładnie tak jak `historyPhoto`.

### Przetwarzanie

Reguła paska, nie wpisu: **skalowanie bez kadrowania**, bo `PhotoStrip` przycina do 3:4 w CSS,
a lupa oddaje pełną klatkę. `sharp`, `.rotate()`, dłuższy bok do 2000 px, `withoutEnlargement`,
progresywny JPEG q82. Siedem plików przyszło w 752×1020, poniżej progu, i są **kopiowane bajt
w bajt** - skalowanie byłoby pustą operacją, a ponowne kodowanie kosztowałoby tylko jakość.
Dwa kadry `planters-*` przyszły w 3024×4032 i zeszły do 1500×2000. **Żaden z 45 plików nie miał
flagi EXIF orientation**, więc - inaczej niż w paczce galerii - nie było obrotu do wypalenia.

### Co idzie na listę właścicieli

1. **Opisy `alt` - 24 nowe**, odczytane z kadrów. Ta sama lista co wszystkie pozostałe opisy
   alternatywne w serwisie.
2. **Szyld obcej firmy w `planters-02`.** Oba kadry `planters-*` to jedyne zdjęcia
   w repozytorium zrobione **poza gospodarstwem** - jego donice stojące u klienta w Kazimierzu.
   W `planters-02` czytelny jest szyld i przeszklone wejście cudzego lokalu. Poszło do pasa na
   wyraźną decyzję, ale zgoda na publikację wizerunku tego lokalu jest właścicieli, nie nasza.
   Gdyby woleli inaczej: przyciąć szyld z górnej krawędzi kadru albo wyjąć obie klatki.
3. **Czy kompozycje wielogatunkowe mają jednak wejść.** Dziewięć kadrów czeka; argument za
   pominięciem jest wyżej, ale to jest wybór redakcyjny, a nie fakt.
4. **Pozostałe 33 pliki paczki** nie są w repozytorium. Jeśli któryś ma wejść, wystarczy
   wskazać - reguła nazewnictwa i przetwarzania jest opisana wyżej.

## Trzy rodzaje obsadzeń zamiast pięciu - wrzesień 2026

Filtr nad pokazem na `/inspiracje/` pyta **„Co obsadzasz”** i miał pod tym pytaniem pięć
przycisków: `Kosz wiszący`, `Skrzynka`, `Donica`, `Rabata`, `Ekspozycja`. Przy 23 obsadzeniach
to niecałe pięć kadrów na przycisk - podział drobniejszy niż decyzja, w której miał pomóc.
Zostały **trzy**, w `src/data/compositions.ts`:

```ts
export const compositionKinds = ["Kosz i skrzynka", "Donica", "Rabata"] as const;
```

Oś jest jedna i porządek przycisków od lewej jest nią: **wisi → stoi → rośnie w gruncie.**
Kosz wiszący i skrzynka zawieszana na balustradzie biorą te same zwisające rośliny i są jedną
odpowiedzią, nie dwiema.

### „Ekspozycja” wypadła i to jest naprawienie błędu, nie skrócenie listy

Ta wartość nazywała **okoliczność zdjęcia** - stoisko, rząd pod tunelem - a nie coś, co
ktokolwiek obsadza. Był to jedyny przycisk odpowiadający na inne pytanie niż etykieta nad nim.
Co więcej, wszystkie cztery kadry same mówią w swoim `alt`, czym naprawdę są:

| Kadr                                | `alt` mówi                                     | Trafił do       |
| ----------------------------------- | ---------------------------------------------- | --------------- |
| `bialo-czerwona-ekspozycja-begonii` | „w dwóch rzędach **doniczek**”                 | Donica          |
| `czerwono-zolty-duet-begonii`       | begonie **w doniczkach** ustawione obok siebie | Donica          |
| `rozowa-chmura-begonii`             | gęsto obsadzone **doniczki** na ekspozycji     | Donica          |
| `rozowo-biala-wystawa-kalibrachoi`  | „Ekspozycja **koszy i obsadzonych skrzynek**…” | Kosz i skrzynka |

**Samo słowo zostaje na stronie.** Tytuły „Biało-czerwona ekspozycja begonii” i „Różowo-biała
wystawa kalibrachoi”, zdania o ekspozycji w opisach i w `alt` - wszystko to są słowa
właścicieli o konkretnym zdjęciu, a nie etykieta kategorii, i nic ich nie ruszało.

### Pełne mapowanie 5 → 3

| Było (liczba kadrów) | Jest              | Kadrów |
| -------------------- | ----------------- | ------ |
| `Kosz wiszący` (4)   | `Kosz i skrzynka` | 10     |
| `Skrzynka` (5)       | `Kosz i skrzynka` |        |
| `Ekspozycja` (1 z 4) | `Kosz i skrzynka` |        |
| `Donica` (4)         | `Donica`          | 7      |
| `Ekspozycja` (3 z 4) | `Donica`          |        |
| `Rabata` (6)         | `Rabata`          | 6      |

Trzynaście z 23 plików zmieniło linię `kind:`; szóstka rabat została nietknięta. Rozkład
10 / 7 / 6 zamiast 5 / 4 / 4 / 4 / 6.

### Co się nie zmieniło, choć mogło się wydawać, że musi

- **`src/content.config.ts` i `Compositions.astro`.** Schemat czyta `compositionKinds` przez
  `z.enum`, a komponent liczy przyciski przez `compositionKinds.filter(…)`, więc oba poszły za
  danymi same. To ten sam mechanizm, co `plantGroups` w `offer.ts`: usunięcie wartości ze
  słownika wywala build na każdym `.md`, który ją jeszcze nosi, z nazwą pliku.
- **Kotwice i adresy.** `kind` nie wchodzi ani do URL-a, ani do stanu w adresie - `applyFilter`
  w `src/scripts/compositions.ts` tylko chowa panele. Zero przekierowań.
- **Lid sekcji** („Kosze, skrzynki, donice i rabaty pokazują różne sposoby łączenia roślin…”)
  opisuje zawartość kadrów, a nie przyciski, i nadal jest prawdziwy. Patrz
  [Dwa lidy](#dwa-lidy---odejście-od-handoffu).
- **Etykieta filtra „Co obsadzasz”** - po usunięciu „Ekspozycji” jest wreszcie prawdziwa dla
  każdego przycisku pod nią.

### Dwa odrzucone warianty

1. **Podział wg miejsca: `Balkon` / `Taras` / `Ogród`.** Kupującemu czyta się to naturalniej,
   ale „Taras” byłoby twierdzeniem, którego zdjęcia nie stawiają - donica stoi na balkonie
   równie dobrze jak na tarasie. Nazwy pojemników są uczciwsze.
2. **Dwa przyciski: `W pojemniku` / `Rabata`.** Najkrótsze i prawdziwe, ale 17 z 23 kadrów
   ląduje pod jednym przyciskiem - filtr, który prawie nie filtruje.

## Jeden układ na trzech stronach kategorii - wrzesień 2026

Trzy strony oferty renderuje jeden komponent, ale od
[scalenia oferty](#scalenie-oferty--wrzesień-2026) chodziły w dwóch trybach:
`/kwiaty-balkonowe/` alfabetycznie, ze spisem literowym i przekładkami, a `/bratki/`
i `/chryzantemy/` po `order`, na płaskiej liście nazw w spisie. **Właściciele obejrzeli oba
układy obok siebie i kazali wyrównać trzy strony bez wyjątków.**

Po zmianie wszystkie trzy chodzą tak samo: kolejność alfabetyczna `pl-PL`, spis „Na tej
stronie" grupowany po literze i duża litera-przekładka między wpisami.

|            | Balkonowe (34) | Bratki (2)                         | Chryzantemy (3)                   |
| ---------- | -------------- | ---------------------------------- | --------------------------------- |
| kolejność  | bez zmian      | bez zmian (alfabet = `order`)      | **odwrócona**                     |
| spis       | bez zmian      | płaska lista → litery **B**, **P** | płaska lista → jeden wiersz **C** |
| przekładki | bez zmian      | dochodzą **B** i **P**             | dochodzi jedno **C**              |

### Co to kosztuje na `/chryzantemy/`

To jedyna strona, na której zmiana widać w treści, i cena została przyjęta świadomie:

1. **Kolejność się odwraca.** `order` szedł wielkokwiatowa (35) → średniokwiatowa (36) →
   drobnokwiatowa (37), czyli malejącą wielkością kwiatu. Alfabet daje drobnokwiatowa →
   średniokwiatowa → wielkokwiatowa. **Produkt flagowy stoi ostatni**, a `<title>` strony to
   nadal „Chryzantemy wielkokwiatowe" - i tak ma zostać, bo to jest fraza, na którą ta strona
   ma się wyszukiwać, niezależnie od tego, który wpis wypadnie pierwszy w dół strony.
2. **Pierwszy wpis jest tym jedynym, którego opisu nie napisali właściciele.**
   `chryzantema-drobnokwiatowa.md` powstał u nas (patrz
   [Chryzantema drobnokwiatowa](#chryzantema-drobnokwiatowa--wrzesień-2026)) i po tej zmianie
   otwiera stronę. To wzmacnia, a nie osłabia, punkt o wymianie tego opisu.
3. **Przekładka nic nie rozdziela.** Wszystkie trzy nazwy zaczynają się na „Chryzantema", więc
   spis ma jeden wiersz „C", a nad pierwszym wpisem stoi jedno „C" i nic za nim nie następuje.
   Strona rysuje je mimo to, bo „bez wyjątków" jest dokładnie tym, o co poproszono, a regułą,
   którą usunięto, był próg długości strony.

### Co się zmieniło w kodzie

Prop `sort: "order" | "name"` **zniknął** zamiast dostać trzecie wywołanie. Prop z jedną
możliwą wartością to martwy przełącznik, a to repozytorium ma na to precedens: `photos`
przestało być listą etykietowanych rzędów w chwili, gdy zostało mu jedno wywołanie (patrz
komentarz przy `chrysanthemumStrip` w `src/data/gallery.ts`). Usunięcie robi z „bez wyjątków"
własność konstrukcyjną, a nie zgodność trzech plików, które mogą się rozjechać. **Przegrany
argument nie został skasowany** - stoi w nagłówku `OfferSection.astro` i wyżej w tym pliku.

Razem z propem zniknęła płaska gałąź spisu (`<ul>` zamiast `<dl>`) i warunki `byLetter` przy
budowie grup literowych i przekładek. Zostało: `entries.length > 1` przy spisie, bo to
zabezpieczenie na grupę, która spadnie do jednego wpisu, a nie na tryb strony. CSS bez zmian -
`columns: 3 300px` przy jednym czy dwóch wierszach po prostu zostawia pozostałe kolumny puste,
tak jak krótki indeks w druku.

**Kotwice się nie zmieniły.** Biorą się z nazw plików, więc odwrócenie kolejności na
`/chryzantemy/` nie psuje żadnego odnośnika wewnętrznego ani `plant-links.ts` - zmienia się
tylko kolejność w DOM-ie.

Poprawione przy okazji komentarze, które po zmianie kłamały: `order` w `src/content.config.ts`
(„na `/bratki/` i `/chryzantemy/` nadal ustala kolejność strony" - już nigdzie nie ustala)
i akapit o celowej rozbieżności kafla z jego stroną w `OfferOverview.astro` (dotyczy teraz
wszystkich trzech kafli, nie jednego).

### Czego ta zmiana nie zrobiła

`/kwiaty-balkonowe/` **nadal nie ma paska zdjęć pod listą**, a `/bratki/` i `/chryzantemy/`
mają (`pansyStrip`, `chrysanthemumStrip`). To czwarta różnica w układzie między tymi stronami
i jedyna, której nie da się zamknąć kodem: w repozytorium nie ma materiału na taki pas.
23 kadry w `src/assets/gallery/` to obsadzenia pokazywane na `/inspiracje/`, a zdjęcia wpisów
balkonowych to w 18 przypadkach zastępniki z Wikimedia Commons. **Do zgłoszenia właścicielom
razem z tą zmianą** - potrzeba zdjęć oferty balkonowej, nie kodu.

> **Zamknięte w 0.24.0.** Zdjęcia przyszły - 45 kadrów z albumów gospodarstwa - i strona ma
> pasek (`balconyStrip`). Patrz
> [Pasek zdjęć na `/kwiaty-balkonowe/`](#pasek-zdjęć-na-kwiaty-balkonowe--wrzesień-2026).
> Diagnoza powyżej była trafna: brakowało materiału, nie kodu.

## Blok Facebooka przepisany z alpaków - wrzesień 2026

Właściciele obejrzeli blok „Co u nas słychać” obok tego, który stoi na bliźniaczej stronie
alpaki-kazimierzdolny.pl, i wydali dwa polecenia naraz: **przenieść go na samą górę strony
głównej** i **przepisać kartę dokładnie z tamtego projektu**. Oba weszły w całości.

Co było przedtem: trzy kafelki z datą, tekstem obciętym do 200 znaków, jednym zdjęciem
i linkiem „Czytaj całość na Facebooku”. Co jest teraz: wpis narysowany tak, jak rysuje go
Facebook.

### Co karta umie po zmianie

| Element                      | Przedtem          | Teraz                                                          |
| ---------------------------- | ----------------- | -------------------------------------------------------------- |
| tekst wpisu                  | ucięty na 200 zn. | cały, zwinięty do czterech linii + „Pokaż więcej”              |
| oznaczenia, hashtagi, adresy | zwykły tekst      | linki, niebieskie i podkreślone                                |
| zdjęcia                      | jedno             | do dziesięciu, karuzela ze wskaźnikiem i strzałkami            |
| filmy                        | brak              | odtwarzane z naszego serwera, `preload="none"`, badge z czasem |
| nagłówek wpisu               | sama data         | awatar, nazwa profilu, data względna („3 dni temu”)            |
| liczniki                     | brak              | reakcje, komentarze, udostępnienia                             |
| powiększenie                 | brak              | lightbox, chodzi po albumie tego wpisu                         |

Skąd co pochodzi: `FacebookPost.astro` z `NewsCard.astro`, `FacebookNews.astro` z `News.astro`,
`src/scripts/facebook-news.ts` z `src/scripts/news.ts`, trzy pliki w `src/utils/`
(`message.ts`, `plural.ts`, `typography.ts`) bez zmian, a pola, których karta potrzebuje -
z `scripts/fetch-news.ts`.

### Cztery reguły `CLAUDE.md`, które ta zmiana odwróciła

Wszystkie cztery były w tym pliku i w `tokens.css` napisane jako zasady bez wyjątków. Wyjątek
jest teraz jeden, nazwany i ograniczony do tego bloku - nie do „kart w ogóle”.

1. **„No border radius, no shadows, no counters, no icons.”** Karta ma zaokrąglony róg
   (`--radius: 6px`), cień (`--lift`), okrągły awatar, sześć piktogramów z Lucide, znak
   Facebooka z Simple Icons i trzy liczniki reakcji. Argument za: ten blok jest **podglądem
   cudzej strony** i jako jedyny element serwisu powinien wyglądać obco. Argument przeciw:
   dokładnie ta reguła. Właściciele usłyszeli oba i wybrali.
2. **„@astrojs/sitemap i sharp to jedyne zależności produkcyjne.”** Doszły trzy:
   `astro-icon`, `@iconify-json/lucide`, `@iconify-json/simple-icons`. Odwiedzającego to nie
   kosztuje nic - `astro-icon` wkleja SVG w czasie builda, do przeglądarki nie leci ani bajt
   JavaScriptu, ani żadne zapytanie na cudzy serwer.
3. **„Zero breakpointów; `grep -rn "@media" src/` ma zwracać jedną linijkę.”** Doszły cztery,
   wszystkie w dwóch plikach bloku. Tylko jeden jest naprawdę nieusuwalny - **`700px`** - i nie
   jest to szerokość układu, tylko warunek, od którego zależą cztery wspólne wiersze kart:
   `subgrid` znaczy coś wyłącznie tam, gdzie karty stoją obok siebie, a siatka `auto-fit` nie
   umie powiedzieć, w którym z dwóch stanów jest. Pozostałe trzy (`699px` - kadr na telefonie,
   `520px` - przycisk na całą szerokość, `hover: hover and pointer: fine` - strzałki karuzeli)
   przyszły z komponentem i zostały, bo poleceniem było „dokładnie”.
4. **„Nic na tej stronie nie kładzie tekstu na zdjęciu.”** Kładą trzy czipy: czas trwania
   filmu, badge „+2” i kropki karuzeli. Wszystkie trzy leżą na nieprzezroczystej płytce
   `rgb(31 42 33 / 82%)`, są etykietami kontrolki, a nie treścią redakcyjną, a alternatywa -
   pasek pod kadrem - rozjeżdżała wiersze wspólne dla trzech kart.

### Trzy rzeczy, których świadomie **nie** przepisano

To nie jest niedokończona robota, tylko miejsca, w których to repozytorium ma inne
zobowiązania niż tamto.

- **Snapshot zostaje w gicie.** W alpakach cache jest w `.gitignore` i leci prosto na serwer.
  Tutaj nie ma jeszcze `deploy.yml`, a na commicie opiera się właściwość, którą `CLAUDE.md`
  wymienia jako nośną: martwy token znaczy „feed się nie odświeżył”, nigdy „strona jest pusta”.
- **Blok nie znika, gdy nie ma wpisów.** W alpakach sekcja chowa się w całości. Tutaj zostaje
  pusty stan - decyzja właścicieli, podjęta świadomie przy tej zmianie. Zabezpieczenie wieku
  (`MAX_AGE_DAYS = 60`) działa tak samo, tylko kończy się pustym stanem, a nie zniknięciem.
- **`MAX_VIDEO_MB` to 12, nie 40.** Film, który tu pobierzemy, zostaje w historii repozytorium
  na zawsze - także po tym, jak skrypt skasuje go z katalogu roboczego. Przy filmie co kilka
  tygodni 12 MB jest do przyjęcia, 40 MB nie byłoby. Wpis z za dużym filmem i tak się pokazuje:
  z klatką i linkiem, czyli ścieżką, którą karta i tak rysuje. **Gdyby repozytorium zaczęło
  puchnąć, właściwą odpowiedzią jest rezygnacja z filmów, a nie podniesienie limitu.**

### Model tokena zmieniony przy okazji

Do tej pory `docs/facebook.md` kazał właścicielom wygenerować token strony i wpisać go jako
`FB_ACCESS_TOKEN`. Teraz sekretem jest `FB_SYSTEM_USER_TOKEN` - token użytkownika systemowego
z Meta Business Suite - a skrypt wymienia go przy każdym uruchomieniu na token strony przez
`/me/accounts`. Powód: w _New Pages Experience_ Facebook nie przeczyta feedu zwykłym tokenem
użytkownika i zwraca przy tym błąd, który brzmi jak brak uprawnień, choć nim nie jest
(`subcode 2069032`). Token użytkownika systemowego jest przypisany do firmy, a nie do czyjegoś
konta, więc nie przestaje działać, gdy ktoś zmieni sobie hasło.

**Moment był na to najlepszy z możliwych: żadnego tokenu jeszcze nie wydano**, więc zmiana nie
kosztowała właścicieli ani jednej czynności. `docs/facebook.md` jest przepisany pod nową
procedurę.

### Jedno odstępstwo od „dokładnie”, i to w skrypcie

Alpaki zapisują pobrany plik bajt w bajt. To repozytorium ma zasadę **wypalania rotacji EXIF**,
bo `<Picture>` nie honoruje tej flagi. Obie nie dają się spełnić naraz: przekodowanie przez
`sharp` zrobiłoby z pliku z Facebooka **trzecią generację JPEG-a**, a to dokładnie ten problem,
przez który `FacebookPost.astro` podnosi drabinkę jakości (avif 52 / webp 74 / jpeg 82 zamiast
40 / 68 / 78).

Rozwiązanie: `sharp` jest pytany o `orientation` i przekodowuje **tylko wtedy, gdy flaga nie
mówi „pionowo”**. Rendery Meta zwykle mówią, więc w typowym przebiegu bajty lądują na dysku
takie, jakie przyszły.

### Podgląd zdjęć: nasz lightbox, nie tamten

`Lightbox.astro` z alpaków nie przeszedł. Ta strona ma własny `src/scripts/lightbox.ts`
z lepszym kontraktem - `a[data-lightbox]` z pełnym plikiem w `href`, grupy przez
`[data-lightbox-group]`, chodzenie po zbiorze z zawijaniem - więc karta podpina się pod niego
tak samo jak `PhotoStrip`. **Grupą jest album jednego wpisu**, ten sam zbiór, po którym chodzi
karuzela; bez tego „Następne” wychodziłoby z wpisu w pokaz zdjęć.

Jedna linijka dopisana w `lightbox.ts`: nakładka czyta `data-alt` z odnośnika, gdy miniatura ma
puste `alt`. Puste `alt` przy wpisie z tekstem jest poprawne (tekst obok opisuje zdjęcie),
ale w nakładce tego tekstu już nie ma, a obraz na cały ekran bez nazwy jest gorszy niż zdanie
„Zdjęcie z wpisu na Facebooku”.

### Kolejność sekcji na stronie głównej

Przeniesienie bloku na górę zabrało jasny pas spomiędzy dwóch ciemnych płyt, więc **pokaz zdjęć
zszedł na jego miejsce**. Kolejność jest teraz warunkiem poprawności, nie gustem:

| #   | Sekcja          | Tło            |
| --- | --------------- | -------------- |
| 1   | `Intro`         | `--paper`      |
| 2   | `FacebookNews`  | `--paper-clay` |
| 3   | `SeasonCards`   | `--green-band` |
| 4   | `OfferOverview` | `--paper-clay` |
| 5   | `Compositions`  | `--green-band` |
| 6   | `GalleryShow`   | `--paper`      |
| 7   | `Directions`    | `--green-band` |

### Styk hero i aktualności - i dlaczego `--paper-blush` wypadł z palety

Pierwsza wersja przenosin zostawiła na tym styku dwie rzeczy nie do przyjęcia i właściciel
zgłosił obie jako jedną: „sekcja musi lepiej przechodzić kolorystycznie z hero".

**Defekt.** `Intro` zamyka się `border-bottom: 1px solid var(--rule)`, a `FacebookNews`
otwierał się `border-top` tej samej grubości i koloru. Do września stykały się z
`SeasonCards`, które `border-top` nie ma - po przenosinach spotkały się ze sobą i dały
**kreskę 2px** na stronie, której całym słownikiem rozdzielania jest kreska 1px. Kreska z
`FacebookNews` zeszła; hero rozdziela własną.

**Rzecz gorsza od defektu.** Hero stało na `--paper-blush` `#F5EDE6`, a aktualności stoją na
`--paper-clay` `#F4EEE4`. To **1.003:1**. Nie są to dwa zbliżone kolory, tylko jeden kolor, a
kreska między dwoma identycznymi papierami czyta się jak zgubiony znak, nie jak granica.

Ważne, żeby to zapisać dokładnie: **tego nie da się poprawić dostrajaniem**. `--ink-grey`
niesie każdą wersalikową etykietę i każdy podpis pod zdjęciem i wymaga gruntu nie ciemniejszego
niż L 0.8353, więc cała jasna paleta mieści się między 4.99:1 a 4.62:1 wobec tekstu - a wobec
siebie nawzajem między 1.003:1 a **1.079:1**. Sufit to 1.079:1 i nic więcej w tej palecie nie
ma.

#### Trzy warianty obejrzane bok w bok

Zrobione na żywej stronie, tym samym kadrem, wariantami wstrzykniętymi do CSS - nie rysunkiem.

| Wariant                      | Co robi                                 | Koszt                                                                   |
| ---------------------------- | --------------------------------------- | ----------------------------------------------------------------------- |
| **A** hero na `--paper`      | krok 1.079:1, czyli cały dostępny sufit | hero traci najcieplejszy papier                                         |
| **B** jeden ciąg, bez kreski | styk znika zamiast być słaby            | nie ma żadnej granicy                                                   |
| **C** aktualności na ciemnej | przejście widać naprawdę                | `SeasonCards` musi zejść na jasne, a z nim ginie mechanika `.card--lit` |

**Wszedł A**, wybrany przez właściciela po obejrzeniu makiet. Argument: 1.079:1 to sufit, a A
jako jedyny ten sufit wykorzystuje - B rezygnuje z granicy, C przebudowuje sąsiednią sekcję.
Kierunek jest przy tym właściwy, bo strona ciemnieje ku dołowi, a hero - pierwsza rzecz na
ekranie - jest najjaśniejsze.

**C nie jest odrzucone jako gorsze, tylko jako droższe**, i warto to pamiętać: jest jedynym
wariantem, w którym przejście widać na pierwszy rzut oka, a białe karty z cieniem wyglądają na
ciemnej zieleni lepiej niż gdziekolwiek indziej. Gdyby kiedyś kalendarz sprzedaży i tak szedł
do przerysowania, to jest moment, żeby wrócić do tej rozmowy.

#### `--paper-blush` wypadł z `tokens.css`

`Intro` był jego jedynym użytkownikiem, więc po zmianie nie stało na nim nic. Token wyleciał
dokładnie tak, jak wyleciał `--paper-sage` dwa tygodnie wcześniej i z tego samego powodu:
**grunt, na którym nic nie stoi, to martwy ciężar - ale liczba za nim nie.** Obie wartości są
zapisane przy gruntach w `tokens.css`.

Jasnych gruntów są więc **trzy, nie cztery**, i reguła w `CLAUDE.md` została przepisana. Przy
okazji dopisana jest tam rzecz, której wcześniej nie było napisane wprost, a która kosztowała
tę rundę poprawek: **tam, gdzie styk ma być _widoczny_, a nie tylko wyczuwalny, jedynym
narzędziem w tym projekcie jest ciemna płyta.**

Dwa jasne grunty obok siebie są dozwolone - różnią się odcieniem, a rozdziela je kreska.
Dwie ciemne płyty nie, i to jest zapisane przy `--green-band` w `tokens.css`. Przy okazji
przestał obowiązywać powód, dla którego blok Facebooka renderował się z pustym stanem: nie
stoi już między ciemnymi płytami. Pusty stan zostaje, ale już na decyzję właścicieli, nie na
rytm strony.

Argument za górą: katalog zmienia się raz na sezon, a to jedyna rzecz na stronie, która może
się różnić między dwoma wtorkami. Koszt: hero przestało być jedyną rzeczą nad zgięciem. `h1`,
tagline i przycisk z telefonem nadal otwierają dokument i nadal czyta się je pierwsze.

### Dwa wpisy zamiast trzech

Właściciel zapytał, czy trzy wpisy to dobra liczba - „na stronie głównej często jest czegoś
trójka". Pytanie było trafne, ale problem okazał się węższy, niż zostało sformułowane.

**To nie są trzy trójki, tylko dwie sąsiadujące trójki o tej samej anatomii.** Karta aktualności
i karta kalendarza sprzedaży mają ten sam układ: wersalikowa etykieta, nagłówek, akapit, pod nim
zdjęcie, pod zdjęciem drobny wiersz (liczniki albo daty). Trzy kolumny, ta sama rynna, jedna
bezpośrednio nad drugą. Kafelki oferty w rzędzie trzecim są już inne - dwa zdjęcia obok siebie,
bez akapitu - i dzieli je od aktualności cała ciemna płyta, więc nie były częścią problemu.

#### Co rozstrzygnęło, i nie był to rytm

Karta drukuje **datę względną** („3 dni temu"). To ona mówi, że gospodarstwo żyje - nie liczba
kafelków. Trzeci wpis kupuje więc **redundancję, nie świeżość**, a płaci za nią najszerszą
rzeczą, jaką ta sekcja ma:

| Kolumn | Szerokość karty | Ile tekstu mieści się w czterech linijkach          |
| ------ | --------------- | --------------------------------------------------- |
| 3      | ~341 px         | ~180 znaków - cięty jest prawie każdy wpis          |
| 2      | ~541 px         | ~280 znaków - większość wpisów mieści się w całości |

Na makiecie widać to od razu: pierwszy wpis schodzi z czterech uciętych linijek na **trzy
pełne**, a w drugim mieszczą się jeszcze hashtagi, których przy trzech kolumnach nie widać
wcale. Obawa, że pionowe zdjęcie utonie w szerszej ramce 4:3, się nie potwierdziła - proporcja
pustego pola jest identyczna (ramka zawsze 4:3, zdjęcie zawsze swoje), a samo zdjęcie jest
większe.

#### Argument, który przegrał, i dlaczego jest zapisany

**Trzy wpisy dają odporność na wtopę.** Wpis bez tekstu albo udostępnienie cudzego posta to na
Facebooku rzecz normalna; przy trzech kartach jedna taka to jedna trzecia sekcji, przy dwóch -
połowa. To jest powód, dla którego warto będzie wrócić do trzech, jeśli feed okaże się ich
pełen. **Rytm nim nie jest** - ta sprawa jest zamknięta.

#### Czego nie zrobiono i dlaczego

- **Jeden wyróżniony + dwa** - łamie rytm najmocniej i redakcyjnie jest słuszne, ale wyrzuca
  cztery wspólne wiersze `subgrid`, które istnieją właśnie po to, żeby równe karty się
  wyrównywały. Dużo dobrze uargumentowanego kodu za efekt, który daje też zwykłe „dwa".
- **Lista zamiast kafelków** - czyta się jak feed, ale sekcja robi się znacznie wyższa, a stoi
  na samej górze strony.
- **Przestawienie sekcji, żeby rozdzielić bliźniaki** - odpada z arytmetyki. Trzy ciemne płyty
  i dwie jasne między nimi wymuszają ogon `D L D L D`, więc jedyne przestawienie, które
  rozdziela aktualności od kalendarza, wrzuca „Inspiracje" przed ofertę.
- **Zmiana anatomii karty** (zdjęcie nad tekstem) - rozdzieliłaby bliźniaki bez ruszania liczby,
  ale karta udaje wpis z Facebooka, a tam tekst stoi nad zdjęciem. To jedyna rzecz, po którą ta
  karta w ogóle istnieje.

#### Przy okazji: dwa defekty siatki, jeden po drugim

Pierwszy był w kodzie od początku: `grid-template-columns` miało wpisane na sztywno
`repeat(3, …)`, a `KEEP` to liczba, o którą skrypt **prosi**, nie ta, którą dostaje - wpisy bez
tekstu i bez zdjęcia są odrzucane, więc feed może oddać mniej. Przy dwóch wpisach zostawała
**dziura**: dwie wąskie karty przy lewej krawędzi i pusta trzecia kolumna. Liczba kolumn idzie
teraz za `posts.length` przez `--cols` ustawiane inline.

Drugi pojawił się dopiero po naprawie pierwszego i został złapany na makiecie: przy **jednym**
wpisie karta rozciągała się na całą szerokość powłoki - 1139 px, tekst w linijkach po ponad sto
znaków, ramka 4:3 wysoka na ~790 px, czyli zdjęcie większe niż w hero. To jest gorsze niż
dziura. Stąd `news__grid--single` z `max-width: 36rem`, czyli mniej więcej tyle, ile karta ma
przy dwóch - **karta wygląda tak samo, czy feed oddał jeden wpis, czy dwa.**

#### Co jeszcze poszło z tą zmianą

`SIZES` i drabinka `WIDTHS` w `FacebookPost.astro`. `sizes` napisane pod kolumnę 341 px podaje
kolumnie 541 px obrazek przeznaczony na dwie trzecie jej szerokości, a tego nie naprawi żadna
liczba kroków w `srcset`. Nowe wartości: `(min-width: 1200px) 540px, (min-width: 700px) 46vw,
92vw`, a drabinka dostała krok 1160 px, bo 540 px na ekranie 2x tyle mniej więcej potrzebuje.
Filtr w `srcset` i tak go odrzuca dla źródeł węższych, więc małe zdjęcie nadal nie jest
skalowane w górę.

### Dane do pracy bez tokenu

`src/data/facebook-fixture.ts` - osiem zmyślonych wpisów, z których widać trzy; ćwiczą cztery
kształty karty (długi tekst, album z filmem, sam obraz bez tekstu, sam tekst bez obrazu) plus
przypadki brzegowe na ławce. Zdjęcia to stand-iny z `src/assets/`.

**Plik nie ma prawa wejść do builda** - `facebook.ts` wpuszcza go wyłącznie pod
`import.meta.env.DEV`. Powód jest ten sam, który każe `/faq/` trzymać się sześciu pytań: te
zdania są nasze, a na karcie stoi nazwa profilu właścicieli. Build, który by po nie sięgnął,
opublikowałby pod ich nazwiskiem tekst, którego nie napisali.

Jeden szczegół z fixture jest testem, nie treścią: w `fixture-1` oznaczone nazwisko stoi za
emoji. Facebook liczy `offset` w punktach kodowych, JavaScript indeksuje string w jednostkach
UTF-16 i te dwie liczby rozjeżdżają się o jeden przy pierwszym emoji. Naiwne cięcie stringa
daje „ Anna Wiśniewsk” - wygląda prawie dobrze, czyli najgorzej, jak błąd może wyglądać.
Żaden inny wpis w tym pliku by tego nie wyłapał.

### Co idzie na listę właścicieli

1. **Opisy `alt` zdjęć z Facebooka.** Facebook nie podaje tekstu alternatywnego, a zgadywanie
   gatunku z fotografii nie jest na tej stronie praktykowane. Karta mówi więc, czym zdjęcie
   **jest** („Zdjęcie z wpisu na Facebooku”), a nie co przedstawia - i tylko przy wpisie bez
   tekstu, bo przy wpisie z tekstem opisuje je tekst obok.
2. **Overline „Bądź na bieżąco”, nagłówek „Co u nas słychać” i oba leady** - nasze słowa, nie
   ich. Overline doszedł przy tej zmianie.
3. **Zgoda na publikowanie liczników reakcji.** Karta drukuje, ile kto zebrał reakcji,
   komentarzy i udostępnień. Wpis, który na Facebooku zebrał dwie reakcje, na stronie firmy
   mówi to wprost.
4. **Zgoda na publikowanie filmów.** Film z wpisu odtwarza się na stronie z naszego serwera -
   to nowa kategoria materiału, której wcześniej na stronie nie było.

## Czego nadal brakuje

1. Zdjęcia - **żaden wpis nie stoi już pusty, ale siedemnaście stoi na pożyczonym kadrze.**
   Od września 2026 te ramki obsadzają zdjęcia z Wikimedia Commons, opisane
   w [Zdjęciach zastępczych](#zdjęcia-zastępcze-z-wikimedia-commons--wrzesień-2026) razem
   z tabelą pochodzenia; było ich osiemnaście, hortensja zeszła z listy przy
   [pasku balkonowym](#pasek-zdjęć-na-kwiaty-balkonowe--wrzesień-2026). **Prośba o własne kadry
   nie jest przez to zamknięta - jest tylko
   mniej widoczna**, bo zamiast pasiastej zaślepki stoi tam cudze zdjęcie, a strona sprzedaje
   rośliny „z własnej uprawy”. Nadal brakuje też archiwalnego zdjęcia gospodarstwa (3:2; ramka
   jest obsadzona zdjęciem z wystawy w Końskowoli, więc to prośba, a nie pusty kadr). Galeria,
   wszystkie trzy karty sezonowe, chryzantemy, bratki i kwiaty balkonowe są obsadzone własnymi
   kadrami. Opisy `alt` - czterech zdjęć chryzantem, sześciu
   bratków, dziesięciu z piątej paczki, **dwudziestu czterech z paska balkonowego**, zdjęcia
   z Końskowoli w bloku historii
   (`historyPhoto`), zdjęcia chryzantemy drobnokwiatowej i **siedemnastu zastępczych** - czekają
   na przejrzenie przez właścicieli, a razem z nimi **brzmienie
   jedynego podpisu na stronie**: właściciele podali „Wystawie kwiatów w Końskowoli”, a idzie
   „Na wystawie kwiatów w Końskowoli” (dołożony przyimek, żeby miejscownik miał czym rządzić).
   Przy
   średniokwiatowej trzeba dodatkowo potwierdzić typ - **i to pytanie stało się trudniejsze**,
   odkąd w grupie są cztery typy, bo ten kadr może być drobnokwiatową - a przy calibrachoi
   i niecierpku z piątej paczki - gatunek (patrz [Zdjęcia](#zdjęcia)). **Opisy `alt` galerii są już
   potwierdzone** - patrz punkt 14.
2. Kalendarz sprzedaży - cała tabela „Do przejrzenia z właścicielami"
   w [Kalendarzu sprzedaży](#kalendarz--do-przejrzenia-z-właścicielami): brzmienie
   „W trakcie", nagłówek „Kiedy co sprzedajemy", nowe podpisy kart (karta 2 odchodzi od
   dosłownej treści handoffu), tytuł „Bratki i prymulki na otwarcie sezonu", długość okresu
   „Wkrótce" i to, że **zima przestała milczeć**. (Opis uprawy bratka i jego kolory są już
   podane i potwierdzone przez właścicieli - patrz
   [Wymiana opisów](#wymiana-opisów--wrzesień-2026).)
3. Treść chryzantem - **pilne: osobne listy kolorów dla czterech typów.** Od ósmej paczki
   (wrzesień 2026) pas ma piętnaście kadrów, a jedenaście z nich to bloki jednego koloru -
   róż, dwubarwna miedź, nasycony pomarańcz - więc sprzeczność da się teraz wyliczyć z jednej
   strony. Cztery ogólne zdjęcia w pasie pokazują czerwień, pomarańcz, róż i liliowy tuż pod chipami
   „biały / żółty / fiolet / złoty” (dziś wszystkie cztery wpisy mają tę samą czwórkę
   ze starej strony) i cokolwiek o **samej uprawie**: stanowisko,
   podlewanie, okrywanie przy przymrozkach, kto i po co kupuje. Opisy od właścicieli
   mówią wyłącznie o budowie kwiatu.
   Od września 2026 dochodzi do tego **opis samej drobnokwiatowej**: jest nasz, nie ich, i jest
   jedynym takim wpisem na stronie. Razem z nim do potwierdzenia idzie propozycja siedmiu
   kolorów dla tego typu, która nie weszła - patrz
   [Chryzantema drobnokwiatowa](#chryzantema-drobnokwiatowa--wrzesień-2026).
4. Godziny sprzedaży w sezonie - klient nie podał; bez nich JSON-LD nie ma
   `openingHoursSpecification`.
5. Adres e-mail - jak wyżej.
6. Polityka prywatności - **napisana i podlinkowana**, ale trzy rzeczy w niej są nasze,
   nie wasze: imiona i nazwiska administratora, NIP oraz całe brzmienie dokumentu.
   Szczegóły w [Polityce prywatności](#polityka-prywatności--wrzesień-2026).
7. Współrzędne gospodarstwa - „Wyznacz trasę” szuka po adresie, bo nikt nie potwierdził
   pinezki.
8. Okno sprzedaży tunbergii i werbeny - stara strona pisała „wiosna”, nadesłane opisy tego
   nie powtarzają. Wraz z resztą zdań z tabeli w [Wymianie opisów](#co-wypadło-ze-starych-opisów--do-decyzji-właścicieli).
9. Cztery nowe teksty na stronie głównej - nagłówek i lead bloku dojazdu oraz dwa odnośniki.
   Napisane przez nas, nie nadesłane; tabela w
   [Strona główna jako witryna](#nowe-teksty--do-przejrzenia-przez-właścicieli).
10. **Dostęp do Facebook Graph API** - `FB_PAGE_ID` i `FB_ACCESS_TOKEN` nie są jeszcze ustawione
    w sekretach repozytorium, więc blok „Co u nas słychać” nie pokazuje niczego (i tak ma być
    do pierwszego udanego pobrania - nie wyświetla pustej sekcji). Token wystawia administrator
    strony na Facebooku; procedura w [`docs/facebook.md`](facebook.md). Do przejrzenia razem
    z tym: [decyzje o automatycznej publikacji i o opisach `alt`](#posty-z-facebooka--wrzesień-2026).
11. Nagłówek i lead bloku „Co u nas słychać” - napisane przez nas, jak teksty z punktu 9.
12. Prymulki - opis uprawy i zdjęcie. Dziś są na stronie tylko jako słowo w tytule kafla,
    karty sezonowej i w zdaniu na `/bratki/`; bez treści nie zakładamy im wpisu ani grupy.
13. `deploy.yml` z **codziennym** `schedule:`. Miesięczny przegapiłby 2 listopada i zostawiłby
    „CHRYZANTEMY · W TRAKCIE" na stronie głównej przez cały listopad.
14. **Opis uprawy brachyscome** - ostatnia z siedmiu roślin sprzedawanych bez wpisu.
    Sześć pozostałych (petunie i surfinie, hortensje, plektrantus, wilczomlecz, koleus,
    bidens) dostało opisy pod koniec września 2026 i ma już wpisy oraz odnośniki - patrz
    [Dwadzieścia jeden nowych opisów](#dwadzieścia-jeden-nowych-opisów--wrzesień-2026).
    Brachyscome nadal jest na `/inspiracje/` nazwana bez odnośnika. Do wpisu potrzeba od
    właścicieli opisu uprawy, kolorów i zdjęcia 4:3.
15. **Cztery nienazwane składniki obsadzeń.** Kadr 3 i 4 - „drobne białe kwiaty ozdobne”;
    kadr 21 - „roślina o srebrzystych liściach”; kadr 13 - srebrzyste rośliny liściaste
    i trawy ozdobne w tle. Opisane w prozie, bez chipa. Jeśli właściciele je nazwą, chip
    dopisuje się jednym wierszem w `plant-links.ts` i jedną nazwą w pliku obsadzenia.
16. **Tekst kadru 8** („Biało-czerwona ekspozycja begonii”) - opis i porada napisane przez
    nas, bo nadesłana lista przeskakuje z 7 na 9. Jedyny tekst na `/inspiracje/`, którego
    autorem nie jest gospodarstwo; do przejrzenia albo do zastąpienia ich własnym.
17. **Kadr pionowy do hero strony głównej (4:5).** Najbardziej widoczna pojedyncza dziura
    na stronie głównej:
    `heroPhoto` to obraz generowany 4:3, kadrowany do 4:5, o rozdzielczości ok. 1,6x zamiast
    2x. W repozytorium nie ma wolnego kadru pionowego - wszystkie 23 z `src/assets/gallery/`
    to obsadzenia pokazywane na tej samej stronie, pas chryzantem ma 736 px, pas bratków to
    produkt marcowy. Podmiana: jedna linia w `src/data/gallery.ts` plus wymiary
    w `Intro.astro`. Patrz
    [Rozdzielenie sekcji i zmiana kroju](#rozdzielenie-sekcji-i-zmiana-kroju--wrzesień-2026).
18. **Zdjęcia do 21 nowych wpisów.** Po wrześniowej dosypce katalog ma 40 wpisów, z czego
    **24 bez zdjęcia** - trzy zastane (dahlia, pelargonia bluszczolistna, sundaville) i całe
    21 nowych. To jest teraz największa dziura w repozytorium, większa niż hero. Każdy wpis
    ma w `slot` gotowy opis kadru, wszystkie 4:3. Zasady jak zawsze: skalowanie do 2000 px
    i **wypalona rotacja EXIF**.
19. **Okno sprzedaży wrzosu.** `wrzos.md` siedzi w grupie `Rabatowe`, której okno to
    kwiecień - czerwiec, a wrzos jest produktem jesiennym. `/rabatowe/` drukuje więc pod
    nagłówkiem datę, która dla tego jednego wpisu jest nieprawdziwa - **świadomie, decyzją
    z września 2026**, bo alternatywą było zmyślenie jesiennego okna w `season.ts`. Do
    rozstrzygnięcia: od kiedy do kiedy właściciele sprzedają wrzosy. Jeśli podadzą daty,
    trzeba piątej grupy w `offer.ts` (okno wiąże się z grupą, nie z wpisem) albo zgody na to,
    że wrzos nie ma drukowanej daty wcale.
20. **Dwie rośliny z listy właścicieli nadal bez opisu** - `Scaevola` i `Lobularia`
    (smagliczka). Były na nadesłanej liście 38 nazw, ale opisy przyszły tylko do 21 z nich.
    Smagliczka jest przy okazji najlepszą kandydatką na „drobne białe kwiaty ozdobne"
    z punktu 15.
21. **Dwadzieścia sześć faktów dopisanych z wiedzy ogrodniczej** - przejście na cztery gniazda
    faktów (wrzesień 2026) domagało się kompletu czterech pozycji przy każdym z 39 wpisów,
    a przy ośmiu wpisach opis właścicieli nie miał tylu zdań. Brakujące wartości - podlewanie,
    stanowisko i pokrój - zostały dopisane **z ogólnej wiedzy o tych roślinach, nie z ich
    tekstu**, co odwraca zasadę obowiązującą w tym pliku od początku. Pełna lista co do jednej
    pozycji jest w [Cztery gniazda faktów](#cztery-gniazda-faktów---wrzesień-2026); najwięcej
    dopisano przy `gozdzik` (trzy), `bratek-ogrodowy` (dwa), `pelargonia-rabatowa` (dwa)
    i trzech chryzantemach (po dwa). **Do potwierdzenia przez właścicieli**, bo dopóki tego nie
    zrobią, są to nasze słowa wypowiedziane ich głosem. Przy tej samej zmianie **wypadło 36
    faktów** - trzy z nich to realna strata, wymieniona w tej samej sekcji (`gozdzik`:
    `Kwiaty pachnące`, `heliotrop`: `Słodki, waniliowy zapach`, `orlik`:
    `Bylina mrozoodporna`), i przy okazji potwierdzenia warto zapytać, czy mają wrócić kosztem
    czwartego gniazda.
22. **Blok „Co u nas słychać” - cztery rzeczy do potwierdzenia po przepisaniu karty.**
    Szczegóły w [Bloku Facebooka](#blok-facebooka-przepisany-z-alpaków--wrzesień-2026);
    w skrócie: **opisy `alt`** zdjęć z Facebooka (Facebook nie podaje tekstu alternatywnego,
    a zgadywanie gatunku z fotografii nie jest tu praktykowane, więc karta mówi, czym zdjęcie
    jest, a nie co przedstawia); **overline „Bądź na bieżąco”, nagłówek „Co u nas słychać”
    i oba leady**, które są nasze, nie ich; **zgoda na publikowanie liczników reakcji** - wpis,
    który zebrał dwie reakcje, mówi to teraz wprost na stronie firmy; i **zgoda na publikowanie
    filmów**, bo film z wpisu odtwarza się na stronie i jest nową kategorią materiału. Do tego
    jedno pytanie o samą publikację: karta pokazuje **cały** tekst wpisu zamiast 200 znaków,
    więc każdy wpis trafia na stronę firmy w całości, ze zdjęciami, filmem i liczbami.
