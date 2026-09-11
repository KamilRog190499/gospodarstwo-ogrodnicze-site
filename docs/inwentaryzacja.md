# Inwentaryzacja starej strony

Co było na `http://gospodarstwo-saran.pl/` (WordPress, motyw ColorMag) i gdzie trafiło
w nowym serwisie. Spisane 6 września 2026 z żywej strony.

## Podstrony

| Stary adres          | Zawartość                                         | Gdzie jest teraz                                                  |
| -------------------- | ------------------------------------------------- | ----------------------------------------------------------------- |
| `/`                  | Powitanie, zajawka oferty                         | Sekcja Intro na stronie głównej                                   |
| `/kwiaty-balkonowe/` | 11 wpisów roślin z opisami uprawy                 | `src/content/plants/`, strona `/kwiaty-balkonowe/`                |
| `/rabatowe/`         | 2 krótkie wpisy (pelargonia rabatowa, niecierpek) | `src/content/plants/`, strona `/rabatowe/`                        |
| `/chryzantemy/`      | Akapit o typach, kolorach, cenach i dowozie       | Wpis `chryzantema-wielkokwiatowa.md` + akapity na `/chryzantemy/` |
| `/o-nas/`            | Historia gospodarstwa                             | `src/content/pages/historia.md`, strona `/o-nas/`                 |
| `/kontakt-2/`        | Cztery telefony i adres                           | `src/data/contact.ts`, strona `/kontakt/`                         |

Cztery z pięciu starych adresów zostały 1:1 - oferta jest trzema realnymi podstronami,
a nie kotwicami na stronie głównej. Mapa przekierowań: [`przekierowania.md`](przekierowania.md).

## Rośliny

Handoff projektowy ostrzegał przed „kilkudziesięcioma” wpisami i zalecał zaprojektowanie
filtrowania i paginacji. Faktycznie jest ich **19** i dzielą się na cztery strony po 11, 2, 2
i 4 wpisy, więc nic takiego nie jest potrzebne.

Balkonowe (11): alstromeria, fuksja, pelargonie bluszczolistne, tunbergie, werbena, goździk,
heliotrop, sundaville, dahlie, calibrachoa, begonia.
Rabatowe (2): pelargonie rabatowe, niecierpek nowogwinejski.
Bratki (2): bratek ogrodowy i prymulka - nowa grupa i nowy adres `/bratki/`, wrzesień 2026;
patrz niżej. **Opis prymulki, tak jak opis drobnokwiatowej, powstał u nas, nie u właścicieli**

- patrz [Prymulki](#prymulki--zamknięte-we-wrześniu-2026).
  Chryzantemy (4): chryzantema wielkokwiatowa, średniokwiatowa, drobnokwiatowa, igiełkowa -
  wielkokwiatowa, średniokwiatowa i igiełkowa dopisane we wrześniu 2026 z tekstu
  właścicieli, patrz niżej.
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

`Wysokość` / `Długość pędów` / `Średnica kwiatu` → `Kwitnienie` → `Stanowisko` →
`Podlewanie` → `Uprawa` → `Zimowanie` → `Odmiany` → `Charakter` → `Sprzedaż`.

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
stronie takich danych nie ma. Wypełniono je **wyłącznie tym, co mówi opis klienta**; gdzie
opis milczy, pole nie istnieje (goździk ma dwa fakty, niecierpek jeden, pelargonia rabatowa
żadnego). Nic nie zostało dopisane z wiedzy ogólnej o roślinach.

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
(`grep -o 'tel:+48602518401' dist/index.html | wc -l` ma dawać 2), nie do przyjęcia na słowo.

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

| Wersja  | Co przyniosła                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0.1–0.4 | Rusztowanie Astro, tokeny, komponenty, migracja treści ze starej strony WordPressa: 14 opisów roślin i historia gospodarstwa. Menu miało wtedy pięć pozycji celujących w kotwice na jednej stronie, a trzy z nich w **tę samą** kotwicę `#oferta`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 0.5     | Przegląd kodu (13 znalezisk). Tagline przeniesiony z masztu do stopki - **cofnięte w 0.6**, patrz niżej.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 2a      | Motyw „Poranek w tunelu”: Instrument Serif → Newsreader, Karla → Public Sans, zieleń rozdzielona na `--green` (tekst) i `--sage` (dekoracja ≥24px), papier i atrament przestrojone. Zastępuje tabelę kolorów i typografię z handoffu; źródłem prawdy jest `src/styles/tokens.css`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 0.11    | Obsadzenia dostają opisy i porady od właścicieli i przenoszą się z `src/data/gallery.ts` do kolekcji `src/content/compositions/`. Gatunki potwierdzone we wszystkich 23 kadrach, więc podpisy „obsadzenie mieszane” i „do potwierdzenia” znikają; kadr 13 poprawiony z pelargonii na niecierpki. Chip ma trzy stany zamiast dwóch (`companion`). Nowy prop `prose` trzyma prozę poza stroną główną. Dwa lidy przepisane - odejście od handoffu.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 0.6     | Strona główna przestała być samą wizytówką. Tagline wrócił do masztu: w stopce lądował jedno zdanie nad blurbem, który jest jego nadzbiorem, a zmiana specyfikacji nie jest decyzją do podjęcia w komentarzu w kodzie. Usunięty powtarzający się `ContactStrip`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 0.7     | Oferta rozbita na cztery realne podstrony zamiast kotwic (patrz [`przekierowania.md`](przekierowania.md)). Strona główna stała się zapowiedzią całej witryny: kafle oferty otwierają się mozaiką własnych zdjęć grupy, a pokaz obsadzeń dostał drugi adres. Do 0.6 strona główna pokazywała cztery zdjęcia przy kilkudziesięciu w repozytorium. Szczegóły: [Strona główna jako witryna](#strona-główna-jako-witryna--wrzesień-2026) i [Pokaz obsadzeń na dwóch adresach](#pokaz-obsadzeń-na-dwóch-adresach).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 0.8     | Blok „Co u nas słychać” - jedyna rzecz na stronie, która zmienia się sama. Szczegóły i decyzje do przejrzenia: [Posty z Facebooka](#posty-z-facebooka--wrzesień-2026).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 0.9     | Przebudowa kalendarza sprzedaży pod okna podane przez właścicieli. Znacznik stanu trafił na jedną iterację na kafle oferty i **został z nich zdjęty** - kafle to cztery równe drzwi do czterech stron. Karty sezonowe straciły natomiast odnośnik. Szczegóły: [Kalendarz sprzedaży](#kalendarz-sprzedaży--wrzesień-2026).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 0.9.1   | Zmniejszony stopień telefonu i adresu oraz brakująca spacja w adresie: [Stopień telefonu i adresu](#stopień-telefonu-i-adresu--wrzesień-2026).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 0.10.0  | Przebudowa menu po audycie UX/SEO: cztery kategorie zeszły do panelu „Oferta” na natywnym `<details>`, menu urosło z 12,5 do 13,8–15,7 px, „Historia gospodarstwa” nazywa się w menu „O nas”. Doszła dziewiąta strona, `/faq/`, z sześcioma pytaniami, których odpowiedzi w całości pochodzą z danych już w repozytorium. Do tego cztery poprawki po pierwszym pokazaniu wersji właścicielom: odstęp pod paskiem menu (podkreślenia bieżącej pozycji nie było widać), lżejszy i mniejszy `h1` na zdjęciu, zwijane pytania w FAQ oraz lżejsze pytania w tym akordeonie. Szczegóły: [Przebudowa menu](#przebudowa-menu--wrzesień-2026), [FAQ](#faq--wrzesień-2026) i [Zgłoszenia właścicieli](#zgłoszenia-właścicieli-po-przebudowie-menu--wrzesień-2026).                                                                                                                                                                                                                                                               |
| 0.12.0  | Rozdzielenie sekcji strony głównej i zmiana kroju szeryfowego, po zgłoszeniu właściciela „wszystko się zlewa”. Newsreader → **Fraunces**; trzeci jasny grunt `--paper-sage`, ciemny pas pod „Inspiracjami”, odstęp sekcji w górę o jedną trzecią; **ochra** jako pierwszy kolor spoza rodziny zieleni, tylko w nadtytułach i licznikach. Hero przebudowane na dwie kolumny z kadrem 4:5, przez co znika `--hero-scrim` (jedyny gradient tonalny) i **jedyna media query w projekcie**. Chip sezonowy **wraca** na kafle oferty, a stopień w pasku menu **wraca** do wartości z handoffu - dwa cofnięcia decyzji z 0.9 i 0.10. Szczegóły: [Rozdzielenie sekcji i zmiana kroju](#rozdzielenie-sekcji-i-zmiana-kroju--wrzesień-2026).                                                                                                                                                                                                                                                                                     |
| 0.12.1  | Drugie podejście do rytmu tła, po obejrzeniu kandydatów bok w bok. Cztery ciepłe jasne grunty zamiast dwóch (`--paper-linen`, `--paper-clay`, `--paper-blush` przy `--paper`), trzy ciemne płyty zamiast jednej, wszystkie na `--green-band` `#38442F`. `--paper-sage` usunięty, bo nic już na nim nie stało. Karta sezonu, której sezon trwa, **odwrócona**: na ciemnej płycie to ona jest jasna. `FacebookNews` renderuje się teraz zawsze, bo jest jasnym pasmem między dwiema ciemnymi płytami, a te nie dają się od siebie odróżnić. Szczegóły w [Rozdzielenie sekcji i zmiana kroju](#rozdzielenie-sekcji-i-zmiana-kroju--wrzesień-2026).                                                                                                                                                                                                                                                                                                                                                                        |
| 0.12.2  | Dopracowanie kafli oferty: kadry z 4:3 na **4:5**, bo sześć z ośmiu zdjęć, z których kafle korzystają, jest pionowych i ramka 4:3 wyrzucała z nich 47%; pasek rośnie ze 225×82 do 225×136 px. Lista nazw przycięta do czterech plus ogon „i 7 innych” - jedenaście nazw szło na pięć linii i robiło dziurę w trzech kaflach na cztery. Tytuły dostają `text-wrap: balance`. Szczegóły: [Mozaika w kaflu](#mozaika-w-kaflu---dwa-kadry-zawsze).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 0.13.1  | Obramowanie kafli oferty z `--rule` na `--rule-dim`. Kreska była tam od początku i względem wypełnienia daje 1,27:1, tyle co każda inna na stronie - ale od zewnątrz ma teraz glinę zamiast papieru, gdzie `--rule` spada do 1,18:1, a samo wypełnienie unosi się nad gruntem o 1,079:1. Miękka z obu stron naraz. `--rule-dim` daje 1,35:1 i 1,25:1: nadal włoskowata, ale z krawędzią. Cały kafel reaguje też teraz na najechanie, nie tylko kadry w środku. **Tabela nie ma wierszy dla 0.13.0 ani dla commita przed nim** - obie zmiany powstały w innych sesjach i nie dopisały się tutaj.                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 0.13.3  | Zdjęcie w bloku historii dostaje podpis „Na wystawie kwiatów w Końskowoli” - pierwszy `<figcaption>` poza pokazem slajdów i poza decyzją o usunięciu podpisów przy roślinach - i zaczyna się równo z `h1` zamiast z nadtytułem (przesunięcie liczone z wysokości wiersza nadtytułu, nie dobrane). Przy okazji **poprawka rzeczowa**: zdjęcie nie przedstawia stoiska na terenie gospodarstwa, tylko stoisko na wystawie kwiatów w Końskowoli; plik, `alt` i opisy w dokumentacji zmienione. Układ dwóch kolumn zostaje - dwa inne warianty pokazano i odrzucono. Szczegóły: [Blok historii](#blok-historii-dostaje-własne-zdjęcie-i-jedyny-podpis-na-stronie).                                                                                                                                                                                                                                                                                                                                                         |
| 0.13.2  | `/o-nas/` przechodzi na jasny grunt - była to jedyna ciemna podstrona, a naprzemienne tła są urządzeniem strony głównej. Znika przy tym styk ciemnej płyty ze stopką `--ink` (1,44:1), którego na stronie długiej na jeden blok nie dało się niczym przedzielić. `--green-deep` przestaje być gruntem jakiejkolwiek sekcji i zostaje wypełnieniem. Blok historii dostaje własne zdjęcie (`historyPhoto`, stoisko gospodarstwa z tablicą) zamiast obsadzenia pożyczanego z `/inspiracje/`. Szczegóły: [Strona „O nas” na jasnym gruncie](#strona-o-nas-na-jasnym-gruncie--wrzesień-2026).                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 0.14.0  | _Weszło do repozytorium jednym commitem razem z 0.15.0._ Czwarty typ chryzantemy - **drobnokwiatowa**. Grupa rośnie z trzech wpisów do czterech, a repozytorium z 17 roślin do 18 i z 49 zdjęć do 50. Wpis wchodzi na `order: 16`, przed igiełkową, żeby strona czytała się malejącą wielkością kwiatu; igiełkowa i bratek przesuwają się o jeden. **Jedyny opis rośliny na stronie, którego nie napisali właściciele** - i jedyne zdjęcie wzięte z profilu Facebook gospodarstwa. Chipy kolorów celowo te same co u trzech pozostałych; siódemka zaproponowana przy wpisie leży w [Rozbieżnościach](#rozbieżności-między-handoffem-a-treścią-klienta) i czeka na potwierdzenie. Szczegóły: [Chryzantema drobnokwiatowa](#chryzantema-drobnokwiatowa--wrzesień-2026).                                                                                                                                                                                                                                                  |
| 0.15.0  | Ósma paczka zdjęć - 18 kadrów chryzantem z Facebooka gospodarstwa, z czego **trzy były powtórzeniami** wykrytymi porównaniem percepcyjnym, nie hashem pliku. Repozytorium rośnie z 50 zdjęć do 65, a pas pod listą na `/chryzantemy/` z 4 do **19** kadrów: cztery mieszane, jedenaście rzędów ułożonych jako paleta kolorów i cztery gotowe doniczki. Doniczki stały przez jedną iterację w **drugim pasie** („Gotowe doniczki”) i właściciel kazał go usunąć, więc `OfferSection` wrócił do jednej tablicy zdjęć z etykietą zaszytą w komponencie. Kadry w pasie **powiększają się po kliknięciu**, na tym samym globalnym `lightbox.ts`, którego używa pokaz obsadzeń; komentarz w `PhotoStrip` mówił dotąd „no lightbox” i to jest świadome odwrócenie. Sam podgląd traci przy okazji **podpis pod zdjęciem** - powtarzał `alt` obrazka, który podgląd i tak nosi, więc czytnik ekranu czytał ten sam tekst dwa razy. Szczegóły: [Zdjęcia](#zdjęcia) i [Lupa w pasach zdjęć](#lupa-w-pasach-zdjęć--wrzesień-2026). |
| 0.16.0  | **Prymulka dostaje wpis** - dziewiętnasta roślina i druga w grupie `Bratki`, która była jednoroślinna od powstania. Zamyka to otwarty punkt stojący od jej dołożenia: prymulki były na stronie samym słowem, bo nie było opisu ani zdjęcia. Żadnej nowej grupy i żadnego nowego adresu - właściciele sprzedają je dokładnie wtedy co bratki, więc `season.ts` jest nietknięty, a `h1` strony to teraz „Bratki i prymulki”, jak w menu i na kaflu (`<title>` zostaje „Bratki”). Pas na `/bratki/` rośnie z 4 do 7 kadrów. **Opis jest nasz, nie właścicieli** - drugi taki wpis po chryzantemie drobnokwiatowej. Przy okazji zapisany rozjazd terminu sprzedaży: `season.ts` mówi marzec, a fakty przy obu wpisach „Marzec – kwiecień”. Szczegóły: [Prymulki](#prymulki--zamknięte-we-wrześniu-2026).                                                                                                                                                                                                                   |
| 0.16.1  | Wyrównanie lidów na zgłoszenie właściciela. Zdanie otwierające strony kategorii schodzi z czterech plików stron do `OfferSection` jako `OFFER_LEAD` i domyślna wartość propa - dwie strony je miały, dwie nie. `/chryzantemy/` odzyskuje lid; to **nie** jest cofnięcie decyzji z września 2026, bo usunięte tam było inne zdanie, powtarzające termin i kolory. Sekcja „Kwiaty w naszej ofercie” na stronie głównej dostaje własny tekst od właściciela i **zamyka świadomie przyjętą nieścisłość** ciągnącą się od handoffu: pokazuje cztery kafle kategorii, a mówiła o „każdej roślinie”. Szczegóły: [Wyrównanie lidów](#wyrównanie-lidów---wrzesień-2026).                                                                                                                                                                                                                                                                                                                                                        |

### Paczki materiału od właścicieli

Dziewięć dostaw, wszystkie we wrześniu 2026. Pełne rozliczenie każdej jest w [Zdjęcia](#zdjęcia)
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

## Czego nadal brakuje

1. Zdjęcia - po jednym na dahlię, pelargonię bluszczolistną i sundaville (4:3, żadne
   z trzech nie znalazło się ani na starej stronie, ani w jej bibliotece mediów - Facebook
   gospodarstwa zostaje do sprawdzenia) oraz archiwalne zdjęcie gospodarstwa (3:2; ramka jest
   obsadzona zdjęciem z wystawy w Końskowoli, więc to prośba, a nie pusty kadr). Galeria,
   wszystkie trzy karty sezonowe, wszystkie cztery chryzantemy, bratek i pozostałe 10 roślin
   balkonowych/rabatowych są obsadzone. Opisy `alt` - czterech zdjęć chryzantem, sześciu
   bratków, dziesięciu z piątej paczki, zdjęcia z Końskowoli w bloku historii
   (`historyPhoto`) i zdjęcia chryzantemy drobnokwiatowej - czekają na przejrzenie przez
   właścicieli, a razem z nimi **brzmienie
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
14. **Opisy uprawy siedmiu roślin sprzedawanych bez wpisu.** Właściciele potwierdzili we
    wrześniu 2026, że sprzedają osobno petunie i surfinie, hortensje, brachyscome,
    plektrantus, wilczomlecz, koleus i bidens. Żadna z nich nie ma pliku
    w `src/content/plants/`, więc na `/inspiracje/` są nazwane, ale nie prowadzą nigdzie -
    chip bez odnośnika. Do wpisu potrzeba od nich opisu uprawy (jak przy pozostałych 17),
    kolorów i zdjęcia 4:3, plus decyzji, do której z czterech grup każda trafia; hortensja
    jest krzewem i może potrzebować własnej. Nic z tego nie jest zmyślane po naszej stronie -
    patrz [Obsadzenia](#obsadzenia--opisy-od-właścicieli-wrzesień-2026).
15. **Cztery nienazwane składniki obsadzeń.** Kadr 3 i 4 - „drobne białe kwiaty ozdobne”;
    kadr 21 - „roślina o srebrzystych liściach”; kadr 13 - srebrzyste rośliny liściaste
    i trawy ozdobne w tle. Opisane w prozie, bez chipa. Jeśli właściciele je nazwą, chip
    dopisuje się jednym wierszem w `plant-links.ts` i jedną nazwą w pliku obsadzenia.
16. **Tekst kadru 8** („Biało-czerwona ekspozycja begonii”) - opis i porada napisane przez
    nas, bo nadesłana lista przeskakuje z 7 na 9. Jedyny tekst na `/inspiracje/`, którego
    autorem nie jest gospodarstwo; do przejrzenia albo do zastąpienia ich własnym.
17. **Kadr pionowy do hero strony głównej (4:5).** Najbardziej widoczna dziura na stronie:
    `heroPhoto` to obraz generowany 4:3, kadrowany do 4:5, o rozdzielczości ok. 1,6x zamiast
    2x. W repozytorium nie ma wolnego kadru pionowego - wszystkie 23 z `src/assets/gallery/`
    to obsadzenia pokazywane na tej samej stronie, pas chryzantem ma 736 px, pas bratków to
    produkt marcowy. Podmiana: jedna linia w `src/data/gallery.ts` plus wymiary
    w `Intro.astro`. Patrz
    [Rozdzielenie sekcji i zmiana kroju](#rozdzielenie-sekcji-i-zmiana-kroju--wrzesień-2026).
