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

Cztery z pięciu starych adresów zostały 1:1 — oferta jest trzema realnymi podstronami,
a nie kotwicami na stronie głównej. Mapa przekierowań: [`przekierowania.md`](przekierowania.md).

## Rośliny

Handoff projektowy ostrzegał przed „kilkudziesięcioma” wpisami i zalecał zaprojektowanie
filtrowania i paginacji. Faktycznie jest ich **17** i dzielą się na cztery strony po 11, 2, 1
i 3 wpisy, więc nic takiego nie jest potrzebne.

Balkonowe (11): alstromeria, fuksja, pelargonie bluszczolistne, tunbergie, werbena, goździk,
heliotrop, sundaville, dahlie, calibrachoa, begonia.
Rabatowe (2): pelargonie rabatowe, niecierpek nowogwinejski.
Bratki (1): bratek ogrodowy — nowa grupa i nowy adres `/bratki/`, wrzesień 2026; patrz niżej.
Chryzantemy (3): chryzantema wielkokwiatowa, średniokwiatowa, igiełkowa — dopisane we
wrześniu 2026 z tekstu właścicieli, patrz niżej.

## Co zostało zmienione w treści

**Ta sekcja opisuje stan sprzed września 2026.** Opisy 14 roślin spoza grupy chryzantem
nie pochodzą już ze starej strony — właściciele nadesłali własne, napisane od nowa; patrz
[Wymiana opisów](#wymiana-opisów--wrzesień-2026). Poniższe nadal obowiązuje dla historii
gospodarstwa i dla chryzantem.

Opisy uprawy zostały przeniesione **dosłownie** — to była najmocniejsza rzecz na starej
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
po nich szła lista — kolory renderują się teraz jako osobny blok „Dostępne kolory”, zgodnie
z projektem. Tam, gdzie stara strona pisze tylko „w różnych kolorach”, zdanie **zostaje
w opisie** i wpis nie ma chipów — żadne kolory nie są zmyślane.

## Wymiana opisów — wrzesień 2026

Właściciele nadesłali własne opisy uprawy **wszystkich 14 roślin spoza grupy chryzantem**.
Zastąpiły one w całości tekst przeniesiony ze starej strony (11 wpisów) i zamknęły trzy
luki: `pelargonia-rabatowa.md` i `bratek-ogrodowy.md` miały dotąd po jednym zdaniu
„Oferujemy sprzedaż…”, a `niecierpek-nowogwinejski.md` dwa zdania.

Decyzja: **tekst właścicieli wchodzi w całości i bez dopisków.** Nic nie jest do niego
dorzucane ze starej strony ani z wiedzy ogrodniczej. Zdania, które przy tej wymianie
wypadły, są spisane niżej — nie po to, żeby je po cichu przywrócić, tylko żeby właściciele
mogli zdecydować.

### Fakty — limit podniesiony do czterech

Właściciele wypunktowali pod opisami po 4–6 linii. Schemat dopuszczał trzy, bo handoff
(`docs/design/README.md`, sekcja o wpisie rośliny) specyfikuje `<dl>` z **trzema** faktami.
`facts` w `src/content.config.ts` przyjmuje teraz **cztery** — to świadome odstępstwo od
handoffu. Siatka faktów jest `auto-fit minmax(min(100%, 150px), 1fr)`, więc czwarty fakt
zawija się do drugiego rzędu i nic się nie łamie.

Etykiety zostały ustandaryzowane do jednego słownika, renderowanego zawsze w tej kolejności
— ona jest też regułą wyboru, gdy kandydatów jest więcej niż cztery:

`Wysokość` / `Długość pędów` / `Średnica kwiatu` → `Kwitnienie` → `Stanowisko` →
`Podlewanie` → `Uprawa` → `Zimowanie` → `Odmiany` → `Charakter` → `Sprzedaż`.

Zwinięte synonimy: `Zastosowanie` → `Uprawa` (goździk), `Walor` → `Charakter` (heliotrop),
`Dostępność` → `Sprzedaż` tam, gdzie oznaczało okno sprzedaży (fuksja: „wiosna”),
a → `Odmiany` tam, gdzie oznaczało asortyment („różne gatunki, odmiany i kolory”). `Odmiany`
stoi wyłącznie przy wpisach bez chipów kolorów. `Pochodzenie` (heliotrop, jedyne użycie)
nie weszło do słownika — zostaje w treści opisu.

Kandydatami są **wyłącznie linie, które właściciele sami wypunktowali**. Dwa wyjątki:
`pelargonia-rabatowa.md` i `niecierpek-nowogwinejski.md` nie mają wypunktowania, więc ich
fakty pochodzą ze zdań mówiących to wprost („posadzona bezpośrednio na rabacie, jak
i w donicach, skrzynkach”; „na stanowiskach słonecznych”). Chryzantemy nietknięte — ich
`Forma` / `Stanowisko` / `Sprzedaż` pochodzą z osobnej paczki tekstu.

### Kolory — ujednolicenia z nadesłanego tekstu

- `pelargonia-rabatowa.md`: `bordo` → `bordowy`, `ciemno-różowy` → `ciemnoróżowy`.
- `pelargonia-bluszczolistna.md`: `bordo` → `bordowy`, `lila jasny` → `jasny lila`.
- `niecierpek-nowogwinejski.md`: zostało **`biskupi`**. W nadesłanym tekście jest
  „biszkupi” — potraktowane jako literówka. **Do potwierdzenia.**
- `bratek-ogrodowy.md`: lista w nadesłanym tekście jest identyczna z tą w pliku, czyli
  **potwierdza** chipy odczytane wcześniej ze zdjęć. Ten punkt schodzi z listy braków.

### Co wypadło ze starych opisów — do decyzji właścicieli

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
| calibrachoa               | „prawie całkowicie odporne na deszcz i wiatr” — nowy tekst osłabia to do „stosunkowo odporna”                    |
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
   Stara strona: biały, żółty, fiolet, złoty. Użyto listy ze strony — i **wszystkich trzech
   typów naraz**, bo zdanie klienta brzmi „wielkokwiatowe, średniokwiatowe i igiełkowe
   w kolorach: …”. Wcześniej czwórka wisiała jako lista samej wielkokwiatowej, co było
   błędem migracji. **Nadal do zrobienia:** właściciele wybrali osobne listy dla każdego typu
   i ich nie podali, a na ich własnych zdjęciach widać pomarańczowy i różowy, których w tej
   czwórce nie ma. Do czasu podania trzy wpisy pokazują identyczne chipy.
3. **Opis chryzantemy wielkokwiatowej — zamknięte we wrześniu 2026.** Pochodził z handoffu,
   bo stara strona nie miała opisu uprawy chryzantem, tylko akapit o typach i cenach.
   Właściciele podali własne opisy wszystkich trzech typów i tekst projektanta został
   usunięty. „Fakty” (Forma „Doniczkowa”, Stanowisko „Słońce, osłonięte”, Sprzedaż
   „1.10 – 1.11”) też były z handoffu — właściciele je potwierdzili i rozciągnęli na
   wszystkie trzy typy, więc stoją przy każdym wpisie.
   Usunięty akapit, gdyby miał wrócić: „Uprawiana w doniczkach, z jednym dużym kwiatem na
   pędzie. Wymaga stanowiska słonecznego i osłoniętego od wiatru oraz regularnego podlewania
   — w chłodne noce warto ją okryć. Na cmentarz i pod dom kupowana najczęściej w ostatnim
   tygodniu października; wtedy wybór kolorów jest największy, ale i ruch największy.”
   **Uwaga:** opisy właścicieli mówią wyłącznie o budowie kwiatu. Strona nie ma dziś żadnej
   treści o samej uprawie chryzantem ani o tym, kto je kupuje — to strata dla wyszukiwarki.
4. **Zdanie wprowadzające na `/chryzantemy/`** — „Duży wybór kolorów. Sprzedaż zaczyna się
   od początku października i trwa do 1 listopada.” — **usunięte na życzenie właścicieli**
   (wrzesień 2026). Termin sprzedaży mówią teraz „fakty” przy każdym z trzech wpisów,
   a kolory — chipy. Prop `lead` w `OfferSection` jest od tego czasu opcjonalny; dwie
   pozostałe strony oferty swoje zdanie zachowują. Opis strony (meta description) nadal
   podaje termin, więc dla wyszukiwarki nic nie przepadło.
5. **Logo.** Handoff mówi, że logotypu nie ma. Stara strona ma go w
   `wp-content/uploads/2019/09/cropped-logo2-*.jpg`. Do decyzji, czy wraca.

## Podpisy pod zdjęciami — usunięte

**Wrzesień 2026: właściciele kazali je zlikwidować.** Podpisów nie ma pod żadnym wpisem
rośliny, a pole `caption` zniknęło ze schematu (`src/content.config.ts`), z `PlantEntry.astro`
i z 14 plików treści. **To odstępstwo od handoffu**, który przewidywał jednozdaniowy podpis
przy każdej roślinie (`<figcaption>` `0.8rem`, `#5B6153`) — świadome i na życzenie klienta.

Nie dotyczy to **pokazu slajdów**: tam każdy slajd nadal ma swój `<figcaption>`, bo to on
opisuje zdjęcie czytnikom ekranu (obrazek ma `alt=""` i jest opisany własnym podpisem).
To samo w lightboxie. Usunięcie tamtych byłoby regresją dostępności.

Dla historii: podpisy były napisane na podstawie własnego tekstu klienta (np. dla fuksji
„Nie znosi pełnego słońca — najlepiej rośnie w półcieniu, osłonięta od wiatru”); dwa wpisy
rabatowe nigdy podpisu nie miały, bo ich opisy są dwuzdaniowe.

## „Fakty” przy roślinach

Trzykolumnowy wiersz Wysokość / Stanowisko / Zimowanie to pomysł projektanta — na starej
stronie takich danych nie ma. Wypełniono je **wyłącznie tym, co mówi opis klienta**; gdzie
opis milczy, pole nie istnieje (goździk ma dwa fakty, niecierpek jeden, pelargonia rabatowa
żadnego). Nic nie zostało dopisane z wiedzy ogólnej o roślinach.

## Zdjęcia

**Wrzesień 2026: doszły 23 własne zdjęcia** z prezentacji kwiatów — obsadzone kosze,
skrzynki i donice, część w tunelu. Leżą w `src/assets/gallery/`, opisane w
`src/data/gallery.ts`, i zasilają stronę „Inspiracje” (`/inspiracje/`),
kartę wiosenną i sekcję Historia.

Uwagi do tej paczki:

- 22 z 23 plików miały w EXIF `orientation=6`, czyli były pionowymi kadrami zapisanymi
  jako poziome. Obrót jest **wypalony** w plikach w repo — `<Picture>` nie respektuje tej
  flagi i bez tego zdjęcia stałyby bokiem. Każde nowe zdjęcie wymaga tego samego, patrz
  `README.md`.
- Źródła przeskalowano z 4000 px do 2000 px dłuższego boku: 105 MB → 15,7 MB. Oryginały
  zostają poza repo.
- **Opisy `alt` napisałem z tego, co widać na zdjęciu** — kolor, forma, otoczenie. Nazwę
  gatunku wpisałem tylko tam, gdzie kwiat jest jednoznaczny (begonie, pelargonie,
  petunie). To są rośliny właścicieli i **oni powinni te opisy przejrzeć**; kilka kadrów to
  obsadzenia mieszane, których nie da się rozpisać bez ich wiedzy.
- Zdjęcia **nie zostały przypisane do wpisów roślin**. To ujęcia zbiorowe, nie portrety
  pojedynczych gatunków, a zgadywanie gatunku na stronie ogrodnika byłoby gorsze niż
  placeholder. Właściciele mogą wskazać, co do czego pasuje.
- Sekcja Historia dostała zdjęcie współczesne (`gallery-17`, wiszące kosze w tunelu).
  Projekt prosił tam o **zdjęcie archiwalne** — jeśli takie się znajdzie, warto podmienić.
- Karta jesienna doczekała się zdjęcia z osobnej paczki, patrz niżej.

**Wrzesień 2026, druga paczka: 8 własnych zdjęć chryzantem.** Do repo weszły dwa — kadry
wybrali właściciele:

- `src/assets/chrysanthemums/cultivation-rows.jpg` — rzędy żółtych chryzantem w doniczkach,
  kadr 16:9 na kartę jesienną (`chrysanthemumPhoto` w `src/data/gallery.ts`). Celowo **poza
  tablicą `gallery`**: slideshow to zdjęcia z wiosennej prezentacji, a jedno jesienne ujęcie
  w jego środku czytałoby się jak pomyłka.
- `src/assets/plants/chryzantema-wielkokwiatowa.jpg` (źródło `367`) — kadr 4:3 do wpisu
  rośliny, wpięty przez `image` i `imageAlt` we frontmatterze. To pierwsze zdjęcie rośliny
  w ogóle, więc przy okazji `PlantEntry` nauczył się je czytać — schemat miał te pola od
  początku, ale komponent renderował placeholder bezwarunkowo i zdjęcie nie miałoby jak się
  pokazać.
- `src/assets/plants/chryzantema-sredniokwiatowa.jpg` (źródło `558`) i
  `src/assets/plants/chryzantema-igielkowa.jpg` (źródło `565`) — dobrane na prośbę
  właścicieli, gdy doszly dwa nowe wpisy. **Przypisanie typu jest odczytane ze zdjęcia,
  nie potwierdzone przez właścicieli.** Igiełkowa (`565`) jest pewna — płatki długie,
  rurkowate, z podwiniętymi końcami. Średniokwiatowa (`558`) to odczyt z wielkości kwiatu
  względem liści i jest **najsłabszym ogniwem — do potwierdzenia**.
  `366` odrzucone jako igiełkowa mimo pozorów: płatki są wąskie, ale płaskie i gęsto
  ułożone w pełny kwiat, nie rurkowate.
- Źródło karty miało `orientation=6`, więc i tu obrót jest wypalony. Trzy pozostałe zdjęcia
  (`364`, `366`, `374`) nie weszły do repo.
- **Wszystkie cztery nowe opisy `alt` czekają na przejrzenie przez właścicieli**, tak samo
  jak opisy galerii.

**Wrzesień 2026, trzecia paczka: 4 ogólne zdjęcia chryzantem** (`src/assets/chrysanthemums/offer-01—04.jpg`,
eksport `chrysanthemumStrip`). Leżą w pasie pod listą roślin na `/chryzantemy/`, nad blokiem
zamówień, jako komponent `PhotoStrip.astro`.

- To ujęcia **mieszane** — rzędy kul w tunelu, doniczki przy drodze, wielobarwna ekspozycja —
  więc świadomie **nie są przypisane do żadnego typu** i opisy `alt` wymieniają kolory,
  a nie formę kwiatu. Trzy zdjęcia przy wpisach pokazują kwiat, ten pas pokazuje ofertę.
- **Pliki mają 736×1000 px**, bo przyszły już przeskalowane przez Facebooka — poniżej
  progu 2000 px, którego trzyma się reszta repo. Skopiowane bajt w bajt: przeskalowanie
  byłoby pustym przebiegiem, a ponowna kompresja tylko zabrałaby jakość. Dlatego
  `PhotoStrip` zamawia najwyżej wariant 720 px. **Oryginały z telefonu byłyby lepsze.**
- **Te zdjęcia obalają listę kolorów.** Widać na nich czerwony, bordowy, pomarańczowy,
  różowy, amarantowy, liliowy i kremowy — a chipy nad nimi mówią „biały, żółty, fiolet,
  złoty”. Sprzeczność jest teraz widoczna gołym okiem na jednym ekranie.

**Wrzesień 2026: `heroPhoto` podmienione na obraz wygenerowany przez AI**, na wyraźne
polecenie, nie zdjęcie gospodarstwa. Plik: `src/assets/hero/hero-glasshouse.jpg` (1448×1086,
4:3 — ten sam kadr poziomy, jakiego wymaga pas na górze strony głównej). Wcześniej `heroPhoto`
było aliasem `gallery[18]` (`gallery-19`); teraz to osobny wpis poza tablicą `gallery`, żeby
`/inspiracje/` i skład `pelargonie-w-pelnym-kwitnieniu` nadal pokazywały prawdziwe zdjęcie.

- **To jest wyjątek od reguły całej tej sekcji i całego projektu**: każda inna fotografia na
  stronie jest zdjęciem własnej uprawy gospodarstwa, nie generowanym obrazem — dokładnie po
  to, żeby uniknąć stocku, jakim była stara strona (patrz niżej). Ten kadr przedstawia scenę,
  której na gospodarstwie nie ma (palmy/banany, promienie światła jak w renderze). Flagowane
  przy poleceniu, potwierdzone mimo to.
- Kontrast etykiety i nagłówka na scrimie **nie został zmierzony w przeglądarce** dla tego
  zdjęcia — tylko przybliżeniem offline (patrz komentarz w `Intro.astro`), bo w tej sesji
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
`alt`. Licencja nieznana, jakość poniżej reszty projektu — **żaden nie został przeniesiony.**
Pozostałe 2 (alstromeria, pelargonia rabatowa) to własne zdjęcia gospodarstwa i posłużyły
za źródło, patrz piąta paczka niżej.

Do zrobienia zdjęć: każdy pozostały placeholder na stronie ma wypisany wymagany kadr.
Obie ramki 16:9 (tunel z kwiatami balkonowymi, chryzantemy przed 1 listopada) są już
obsadzone, tak samo cała grupa chryzantem i bratek. Z 17 wpisów zdjęcie ma teraz
czternaście, więc zostały po jednym kadrze 4:3 na dahlię, pelargonię bluszczolistną
i sundaville, oraz 3:2 archiwalnego zdjęcia gospodarstwa.

**Wrzesień 2026, czwarta paczka: 6 własnych zdjęć bratków.** Do repo weszło pięć, w nowym
katalogu `src/assets/pansies/` (pas) oraz `src/assets/plants/bratek-ogrodowy.jpg` (wpis).
Razem z nimi doszła **cała nowa grupa oferty**: `Bratki` w enumie schematu, wpis
`bratek-ogrodowy.md`, strona `/bratki/` i pozycja w menu między „Rabatowe" a „Chryzantemy" —
czyli chronologicznie, bo bratki otwierają rok.

- Kadr do wpisu to skrzynka mieszana (źródło `649134133`); pas pod listą to `offer-01—04`:
  dziewięć skrzynek z góry, żółte bez plamki, białe z plamką, fioletowe z białym obrzeżem.
  Szóste zdjęcie (`650130921`, żółte z ciemną plamką) nie weszło do pasa — w rzędzie czterech
  kadrów dublowało kolorystycznie `offer-02` — ale **weszło samo, na kartę
  wczesnowiosenną** na stronie głównej jako `pansyPhoto` (`crate-yellow.jpg`). Samo na karcie
  robi to, czego w pasie nie robiło: czyta się jako marzec z jednego spojrzenia.
- Pliki przyszły **bez EXIF-u i już poprawnie zorientowane**, więc w odróżnieniu od paczki
  galerii nie trzeba było wypalać obrotu. Dwa źródła miały 2048 px i zeszły do 2000 px;
  trzy pliki 1080×1920 są **skopiowane bajt w bajt**, bo są poniżej progu — ten sam
  precedens co `chrysanthemumStrip`.
- Kadry są pionowe, a ramki nie: `PhotoStrip` renderuje 3:4, `PlantEntry` 4:3, więc
  `object-fit: cover` przycina je w pionie. Zmierzone: trzy kadry 9:16 w pasie zachowują 75%
  wysokości, `offer-01` aż 97%, a zdjęcie przy wpisie 61%. Sprawdzone na wyrenderowanych
  przycięciach — wszystkie czytelne. Uwaga na `alt` przy wpisie: kadr 4:3 odcina górny rząd
  różowych i dolny liliowych, więc opis wymienia tylko to, co w przycięciu widać.

**Trzy rzeczy przy bratkach czekają na właścicieli:**

1. **Chipy kolorów są odczytane ze zdjęć**, nie podane przez właścicieli — żółty, kremowy,
   biały, bordowy, różowy, amarantowy, fioletowy, liliowy, błękitny, dwubarwny. To ten sam
   tryb, co przy przypisaniu typu chryzantemy średniokwiatowej: **do potwierdzenia.**
2. **Wpis nie ma opisu uprawy** — świadomie. Właściciele nie podali żadnego tekstu
   o bratkach, a regułą projektu jest, że nic nie dopisujemy z wiedzy ogólnej. Wpis ma
   jedno zdanie w formie `pelargonia-rabatowa.md`. **To strata dla wyszukiwarki** i pierwsza
   rzecz do uzupełnienia, gdy właściciele coś powiedzą.
3. **Opisy `alt`** — jak przy galerii i chryzantemach, napisane z tego, co widać.

Termin sprzedaży „Marzec – kwiecień" **pochodzi od właścicieli** i jest jedynym „faktem"
przy wpisie. Ten sam termin dostał **własną kartę sezonową** — patrz niżej.

**Czego przy tej okazji nie ruszono:** `h1` na stronie głównej („Kwiaty balkonowe, rabatowe
i chryzantemy z własnej uprawy") i blurb w stopce nadal nie wymieniają bratków. Oba są
blisko taglinu, którego nie wolno przerabiać bez zgody właścicieli — **do decyzji.**

**Wrzesień 2026, piąta paczka: 10 własnych zdjęć z biblioteki mediów starej strony.** Żywe
strony WordPressa pokazywały tylko 2 własne zdjęcia poza chryzantemami (alstromeria,
pelargonia rabatowa); reszta placeholderów wyglądała na nieodwracalną — dopóki zapytanie do
`wp-json/wp/v2/media` nie ujawniło **58 nieużywanych, niepodpiętych do żadnej strony zdjęć**
z 2019–2020 (nazwy w stylu Facebooka i zdjęcia z telefonu), które architektura WordPressa
trzymała w bibliotece mediów, ale nikt nigdy nie wstawił na stronę. Stamtąd wybrano 10
zdjęć — po jednym na roślinę, plus zapasowe warianty koloru tam, gdzie się nadarzyły:

| Roślina                  | Źródło (WP media ID)       | Uwaga                                                                                         |
| ------------------------ | --------------------------- | ---------------------------------------------------------------------------------------------- |
| Alstromeria              | `337` (kolaż, prawy panel)  | Reszta kolażu (4 ujęcia) zostaje niewykorzystana.                                             |
| Fuksja                   | `344` (kolaż, lewy panel)   | Alternatywa: `341`.                                                                            |
| Goździk                  | `224`                       | —                                                                                              |
| Begonia                  | `225`                       | Alternatywa: `351` (lewy panel).                                                               |
| Tunbergia                | `226`                       | To dosłownie „black-eyed susan” ze stockowego opisu na starej stronie.                        |
| Werbena                  | `227`                       | Warianty koloru: `229` (biała), `350` (czerwona, lewy panel), `352` (fioletowa, prawy panel).  |
| Heliotrop                | `169`                       | —                                                                                              |
| Pelargonia rabatowa      | `160`                       | Alternatywa: `351` (prawy panel).                                                              |
| Calibrachoa              | `231`                       | **Do potwierdzenia**, patrz niżej.                                                             |
| Niecierpek nowogwinejski | `228`                       | **Przeklasyfikowane ze starej strony**, patrz niżej.                                           |

Dwie rzeczy tu **wymagają uwagi właścicieli**, zanim wejdą jako pewnik:

- **Niecierpek nowogwinejski nie miał własnego zdjęcia na starej stronie w ogóle** — był
  wciśnięty w ten sam akapit co „Pelargonie” na `/rabatowe/`. Jedno z dwóch zdjęć w tym
  akapicie (`163`, doniczka przy hotelu) pokazuje jednak wyraźnie niecierpka, nie
  pelargonię — kształt i budowa kwiatu to potwierdzają. Ostatecznie wybrany kadr (`228`,
  pojedynczy biały kwiat) jest z tej samej rodziny zdjęć w bibliotece mediów, nie z żywej
  strony. Gatunek jest pewny; **czy to odmiana, którą gospodarstwo faktycznie sprzedaje
  w 2026, nie zostało potwierdzone.**
- **Calibrachoa i pnąca petunia (Surfinia) są na oko trudne do odróżnienia** — obie mają
  drobne, lejkowate kwiaty w zwisającym pokroju. Wybrane zdjęcie (`231`, żółte kwiaty
  w gęstej macie) pasuje do opisu „Million Bells” z tekstu właścicieli lepiej niż inne
  kandydatki (większe, luźniejsze kwiaty bliższe typowej petunii), ale **nie ma
  potwierdzenia gatunku od właścicieli** — ten sam tryb co przypisanie typu chryzantemy
  średniokwiatowej.

Przetwarzanie: dwa źródłowe pliki (fuksja, alstromeria) były dyptykami/kolażami kilku
zdjęć sklejonych na jednym płótnie — wycięty tylko panel z pojedynczym kwiatem, reszta
zostaje niewykorzystana. Obrót EXIF wypalony we wszystkich, długi bok ograniczony do
2000 px (żaden nie musiał być skalowany w dół — źródła miały 528–2560 px). Opisy `alt`
napisane z tego, co widać, jak przy poprzednich paczkach — **też czekają na przejrzenie
przez właścicieli.**

Nieznalezione mimo przeszukania całej biblioteki mediów: **dahlia, pelargonia
bluszczolistna, sundaville.** Ani żywe strony, ani biblioteka mediów WordPressa ich nie
mają. Facebook gospodarstwa jest kolejnym miejscem do sprawdzenia, ale wymaga zalogowanej
przeglądarki — nieosiągalny przez samo pobieranie stron.

## Trzecia karta sezonowa — wrzesień 2026

Handoff rysuje **dwie** karty sezonowe (`docs/design/README.md`, sekcja 3); na stronie stoją
**trzy**. Powód jest po stronie treści, nie projektu: bratki sprzedają się w marcu i kwietniu,
czyli w miesiącach, które karta wiosenna połykała. Pierwsze podejście było takie, że karta
wiosenna dostała zdanie o bratkach i podpis „Marzec – czerwiec · szczyt w maju i czerwcu" —
i to było pół rozwiązania: kto wszedł na stronę w marcu, widział zdjęcie tunelu z kwiatami
balkonowymi i jeden odnośnik, prowadzący do jedynej rzeczy, której wtedy nie ma w sprzedaży.

Teraz każde okno sprzedaży ma swoją kartę:

| Karta | Okno         | Zdjęcie                  | Odnośnik             |
| ----- | ------------ | ------------------------ | -------------------- |
| 1     | 1.03 – 30.04 | skrzynka żółtych bratków | `/bratki/`           |
| 2     | 1.05 – 31.08 | tunel z kwiatami         | `/kwiaty-balkonowe/` |
| 3     | 1.09 – 30.11 | chryzantemy w doniczkach | `/chryzantemy/`      |

Karty 2 i 3 mają **dosłownie treść z handoffu**, łącznie z podpisem „Maj – czerwiec · szczyt
sezonu", który wrócił po tamtej tymczasowej przeróbce. Nowa jest tylko karta 1. Siatka to
nadal `auto-fit, minmax(min(100%, 320px), 1fr)` bez żadnego media query: trzy kolumny tam,
gdzie się mieszczą, potem dwie plus jedna, potem stos. Zima (grudzień–luty) bez zmian —
wszystkie trzy karty wygaszone, żadnego zmyślonego komunikatu.

**Do przejrzenia z właścicielami:** czy okno maj–sierpień na karcie 2 jest właściwe (handoff
mówi 1.03–31.08, ale marzec i kwiecień należą teraz do karty 1) i czy tytuł „Bratki na
otwarcie sezonu" im odpowiada.

## Strona główna jako witryna — wrzesień 2026

Do wersji 0.6 strona główna była **wejściem**: intro, karty sezonowe i cztery kafelki oferty.
Zdjęć było na niej cztery, przy 47 własnych fotografiach w repozytorium, a kafelki oferty nie
miały ani jednego — na stronie gospodarstwa, którego całym produktem jest to, jak roślina
wygląda. Od 0.7 strona główna jest **podglądem każdej części witryny**, a podstrony zostają
miejscem pełnych opisów uprawy, list kolorów i telefonów.

| Sekcja                | Co pokazuje                                      | Skąd bierze zdjęcia                       |
| --------------------- | ------------------------------------------------ | ----------------------------------------- |
| Intro                 | bez zmian                                        | `heroPhoto`                               |
| Sezon                 | bez zmian, trzy karty                            | bratki / tunel / chryzantemy              |
| Oferta                | **nowość:** mozaika 1–3 kadrów na grupę          | kolekcja `plants`, pierwsze wpisy z `image` |
| Inspiracje            | **nowość:** wszystkie 23 obsadzenia, uproszczone  | `compositions`                            |
| Jak do nas trafić     | **nowość:** mapa, adres, „Wyznacz trasę”         | —                                         |

### Mozaika w kafelku — dlaczego grupy są nierówne

Kadry wybiera **kolekcja, nie ręczna lista**: pierwsze wpisy grupy wg `order`, które mają
`image`. Dzięki temu dodanie zdjęcia dahlii, pelargonii bluszczolistnej albo sundaville samo
wchodzi do kafelka, bez edycji komponentu. Cena jest taka, że dziś grupy mają po tyle kadrów,
ile wpisów ze zdjęciem:

| Grupa       | Kadrów | Które                                                        |
| ----------- | ------ | ------------------------------------------------------------ |
| Balkonowe   | 3      | alstromeria, fuksja, tunbergia                                |
| Rabatowe    | 2      | pelargonia rabatowa, niecierpek nowogwinejski                 |
| Bratki      | 1      | bratek ogrodowy                                               |
| Chryzantemy | 3      | wielkokwiatowa, średniokwiatowa, igiełkowa                    |

Rząd miniatur bierze **tyle kolumn, ile ma zdjęć** (`grid-auto-flow: column`), więc jedno
zdjęcie wypełnia szerokość kafelka, a dwa dzielą ją na pół. Sztywne `repeat(3, 1fr)`
zostawiłoby w kafelku bratków dwie puste komórki, co czyta się jak usterka, a nie decyzja.

### Nowe teksty — do przejrzenia przez właścicieli

Napisane przez nas, nie nadesłane. Tak jak opisy `alt`, czekają na potwierdzenie:

| Miejsce               | Tekst                                                                                                 |
| --------------------- | ----------------------------------------------------------------------------------------------------- |
| Nagłówek bloku dojazdu | „Jak do nas trafić”                                                                                    |
| Lead bloku dojazdu     | „Jesteśmy w Cholewiance pod Kazimierzem Dolnym. Kwiaty oglądasz i kupujesz na miejscu, w tunelach — zapraszamy.” |
| Odnośnik w bloku dojazdu | „Telefony i kontakt”                                                                                 |
| Odnośnik pod pokazem   | „Zobacz wszystkie obsadzenia”                                                                          |

### Czego blok dojazdu celowo nie robi

**Nie drukuje ani jednego numeru telefonu.** W 0.5 stał w tym miejscu `ContactStrip` i został
usunięty w 0.6, bo powtarzał adres, numer i „Wyznacz trasę” tuż nad stopką niosącą to samo —
`602 518 401` pojawiał się trzy razy na jednej stronie. Nowy blok odpowiada na jedno pytanie,
na które stopka odpowiedzieć nie może (*gdzie to jest, na mapie*), a po telefony odsyła do
`/kontakt/`. Adres jest powtórzony świadomie: adres obok mapy jest tym, co czyni mapę czytelną.

**Uwaga na licznik telefonów — pierwsza wersja 0.7 się na tym wyłożyła.** Blok dojazdu
rzeczywiście nie niesie numeru, ale pokaz obsadzeń niósł go w **każdym z 23 paneli**
(„Zapytaj: 602 518 401”). Razem z intro i stopką dawało to **25 wystąpień na stronie
głównej** — dokładnie ta choroba, na którą lekarstwem było usunięcie `ContactStrip`, tylko
osiem razy silniejsza — podczas gdy komentarz w `index.astro` twierdził, że numer występuje
raz. Panelowe CTA jest od tej pory zależne od `level`: zostaje na `/inspiracje/`, znika na
stronie głównej, gdzie drogą do telefonu jest sąsiedni odnośnik „Kontakt i dojazd”. Cokolwiek
powtarza się w panelu, powtarza się tu 23 razy — liczba do sprawdzenia na zbudowanej stronie
(`grep -o 'tel:+48602518401' dist/index.html | wc -l` ma dawać 2), nie do przyjęcia na słowo.

Skutek uboczny, oczekiwany: strona główna osadza teraz mapę, więc **pasek zgody pokazuje się
także na niej** (`consent.ts` pyta tylko tam, gdzie pytanie ma konsekwencję). Zgoda jest
wspólna dla całej witryny — kto zgodzi się na stronie głównej, ma mapę wczytaną na `/kontakt/`.

### Pokaz obsadzeń na dwóch adresach

`Compositions.astro` renderuje ten sam zestaw 23 obsadzeń w dwóch wariantach. Na stronie
głównej wyłączone są cztery rzeczy i żadna z nich nie jest kwestią gustu:

- **`structuredData`** — `ItemList` wskazuje `/inspiracje/#…` jako `@id` każdego obsadzenia;
  wyemitowany pod drugim adresem opisywałby tę samą listę dwa razy.
- **`ids`** — kotwice `/#kosz-…` konkurowałyby z prawdziwymi pod `/inspiracje/#kosz-…`.
- **`showRail`, `showFilters`** — filtrowanie i przeglądanie miniaturami to zadanie
  `/inspiracje/`; nagłówek każdego panelu na stronie głównej jest odnośnikiem właśnie tam.

`src/scripts/compositions.ts` obsługuje od 0.7 wiele instancji (`init(root)` po każdym
`[data-comp]`) zamiast jednej na dokument.

### Znany defekt — zastany, ale 0.7 go odsłania szerzej

Panel pokazu, którego zdjęcie nie zostało jeszcze wczytane (`loading="lazy"`), zwija obrazek
do 2×2 px, bo `.panel__link img` ma `width: auto`, a `global.css` daje `height: auto`
(wczytany kadr mierzy 419×558, niewczytany 2×2). W efekcie na krawędziach paska widać skrawki
tekstu sąsiedniego panelu zamiast skrawka zdjęcia.

Przyczyna jest starsza niż ta zmiana i dotyczy tak samo `/inspiracje/` — ale **0.7 zdejmuje
to, co ją tam maskowało**. Na `/inspiracje/` pierwszy kadr ma `loading="eager"`, więc panel
wiodący jest zawsze narysowany; na stronie głównej żaden kadr nie jest `eager` (LCP należy do
zdjęcia w intro i nie ma z czym konkurować), więc **panel wiodący też jest podatny**: przy
wolnym łączu rysuje się jako skrawek tekstu i dopiero potem podskakuje do pełnego kadru.

Naprawa to zarezerwowanie pudełka dla niewczytanego obrazka. Nie jest to jednolinijkowiec —
źródła mają różne proporcje i `object-fit: contain` jest tam właśnie dlatego, więc sztywne
`aspect-ratio` popsułoby kadry poziome, a `min-height` dokłada pustkę pod kadrem poziomym na
telefonie. Zostaje jako osobna zmiana, z weryfikacją obu adresów i obu orientacji.

## Posty z Facebooka — wrzesień 2026

Strona główna dostała blok „Co u nas słychać”: trzy ostatnie wpisy z profilu gospodarstwa,
pobierane raz dziennie i zapisywane w repozytorium. Jak to działa i co zrobić, gdy przestanie —
w [`docs/facebook.md`](facebook.md). Tu tylko to, co jest **decyzją do przejrzenia przez
właścicieli**, a nie mechaniką.

### Publikacja jest automatyczna, bez przeglądu

Nikt nie zatwierdza wpisu, zanim pojawi się na stronie. Każdy post z profilu — także
przypadkowy, prywatny w tonie albo udostępniony z cudzego profilu — trafia na wizytówkę firmy
w ciągu doby. Jedyne sito to „post musi mieć tekst albo zdjęcie”.

Tak zostało ustalone świadomie i tak działa, ale **właściciele muszą o tym wiedzieć**, bo to
zmienia sposób, w jaki korzysta się z profilu: od teraz Facebook gospodarstwa jest częścią
strony. Wycofanie wpisu ze strony = usunięcie lub ukrycie go na Facebooku; zniknie przy
najbliższym odświeżeniu, razem ze zdjęciem.

Gdyby to się okazało zbyt ryzykowne, jest gotowa alternatywa mniejszym kosztem: zadanie może
otwierać pull request zamiast commitować od razu, a scalenie to jedno kliknięcie.

### Opisy `alt` zdjęć — do przejrzenia

Facebook nie dostarcza tekstu alternatywnego, a zgadywanie gatunku ze zdjęcia jest na tej
stronie wykluczone (patrz [Zdjęcia](#zdjęcia)). Zdjęcia z wpisów dostają więc opis, który mówi,
**czym jest kadr**, a nie co na nim rośnie:

> `Zdjęcie z wpisu gospodarstwa z 6 września 2026`

To rozwiązanie uczciwe, ale ubogie — nic nie mówi osobie korzystającej z czytnika ekranu o
treści zdjęcia. Lepszego nie ma bez pracy człowieka przy każdym wpisie, czego cały ten
mechanizm miał uniknąć. Do decyzji: zostawić tak, czy przyjąć, że opis pisze się ręcznie przy
wpisach, na których zależy.

### Emoji zostają

Reguła projektu mówi „bez emoji”, ale dotyczy ona elementów samej strony. W cytowanym wpisie
emoji są częścią wypowiedzi właścicieli i są traktowane tak samo jak reszta ich tekstu: nie
przepisujemy, nie czyścimy, tylko skracamy do ok. 200 znaków z linkiem do całości.

### Czego ten blok celowo nie robi

- **Nie prosi o zgodę na cookies i nie musi.** Zdjęcia są pobrane na nasz serwer, a nie
  wyświetlane z serwerów Meta — przeglądarka odwiedzającego nie łączy się z Facebookiem.
  To jedyny powód, dla którego blok nie potrzebuje bramki takiej jak mapa Google, i pierwsza
  rzecz, którą traci każde „uproszczenie” do wtyczki Facebooka albo linkowanego zdjęcia.
- **Nie drukuje numeru telefonu.** Strona główna pokazuje `602 518 401` dokładnie dwa razy i
  tak ma zostać (patrz komentarz w `src/pages/index.astro`).
- **Nie ma nagłówka na wpis ani żadnego brandingu Facebooka** — bez logo, bez niebieskiego,
  bez ikon i liczników reakcji. Że wpisy są z Facebooka, mówi jedno zdanie pod nagłówkiem.
- **Nie dodaje podstrony ani pozycji w menu.** Menu ma nadal osiem pozycji.

## Czego nadal brakuje

1. Zdjęcia — po jednym na dahlię, pelargonię bluszczolistną i sundaville (4:3, żadne
   z trzech nie znalazło się ani na starej stronie, ani w jej bibliotece mediów — Facebook
   gospodarstwa zostaje do sprawdzenia) oraz archiwalne zdjęcie gospodarstwa (3:2). Galeria,
   wszystkie trzy karty sezonowe, wszystkie trzy chryzantemy, bratek i pozostałe 10 roślin
   balkonowych/rabatowych są obsadzone. Opisy `alt` — galerii, czterech zdjęć chryzantem,
   sześciu bratków i dziesięciu z piątej paczki — czekają na przejrzenie przez właścicieli;
   przy średniokwiatowej trzeba dodatkowo potwierdzić typ, a przy calibrachoi i niecierpku
   z piątej paczki — gatunek (patrz [Zdjęcia](#zdjęcia)).
2. Trzecia karta sezonowa — okno maj–sierpień na karcie 2 i tytuł „Bratki na otwarcie
   sezonu". (Opis uprawy bratka i jego kolory są już podane i potwierdzone przez
   właścicieli — patrz [Wymiana opisów](#wymiana-opisów--wrzesień-2026).)
3. Treść chryzantem — **pilne: osobne listy kolorów dla trzech typów.** Cztery ogólne
   zdjęcia w pasie pokazują czerwień, pomarańcz, róż i liliowy tuż pod chipami
   „biały / żółty / fiolet / złoty” (dziś wszystkie trzy wpisy mają tę samą czwórkę
   ze starej strony) i cokolwiek o **samej uprawie**: stanowisko,
   podlewanie, okrywanie przy przymrozkach, kto i po co kupuje. Opisy od właścicieli
   mówią wyłącznie o budowie kwiatu.
4. Godziny sprzedaży w sezonie — klient nie podał; bez nich JSON-LD nie ma
   `openingHoursSpecification`.
5. Adres e-mail — jak wyżej.
6. Polityka prywatności — nie istnieje, a strona osadza mapę Google i linkuje Facebooka.
   Do czasu napisania stopka nie linkuje do niej wcale.
7. Współrzędne gospodarstwa — „Wyznacz trasę” szuka po adresie, bo nikt nie potwierdził
   pinezki.
8. Okno sprzedaży tunbergii i werbeny — stara strona pisała „wiosna”, nadesłane opisy tego
   nie powtarzają. Wraz z resztą zdań z tabeli w [Wymianie opisów](#co-wypadło-ze-starych-opisów--do-decyzji-właścicieli).
9. Cztery nowe teksty na stronie głównej — nagłówek i lead bloku dojazdu oraz dwa odnośniki.
   Napisane przez nas, nie nadesłane; tabela w
   [Strona główna jako witryna](#nowe-teksty--do-przejrzenia-przez-właścicieli).
10. **Dostęp do Facebook Graph API** — `FB_PAGE_ID` i `FB_ACCESS_TOKEN` nie są jeszcze ustawione
    w sekretach repozytorium, więc blok „Co u nas słychać” nie pokazuje niczego (i tak ma być
    do pierwszego udanego pobrania — nie wyświetla pustej sekcji). Token wystawia administrator
    strony na Facebooku; procedura w [`docs/facebook.md`](facebook.md). Do przejrzenia razem
    z tym: [decyzje o automatycznej publikacji i o opisach `alt`](#posty-z-facebooka--wrzesień-2026).
11. Nagłówek i lead bloku „Co u nas słychać” — napisane przez nas, jak teksty z punktu 9.
