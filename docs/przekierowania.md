# Przekierowania ze starej strony

Nowa strona wchodzi pod ten sam adres, `gospodarstwo-saran.pl`, więc stare adresy
WordPressa przestaną istnieć w dniu wdrożenia. Każdy z nich musi dostać **301**, bo to one
mają dziś pozycje w wyszukiwarce - stara strona rankuje na nazwy roślin.

Konfiguracja serwera nie jest częścią tego repozytorium; poniżej jest sama mapa.

## Decyzja podjęta

Wcześniejsza wersja tego dokumentu opisywała decyzję do podjęcia: jedna strona z kotwicami
czy realne podstrony. **Wybrano podstrony** - rekomendowany wariant. Konsekwencje:

- `/kwiaty-balkonowe/` i `/chryzantemy/` **zostają bez zmian**, więc nie potrzebują żadnego
  przekierowania.
- `/rabatowe/` **przestało istnieć we wrześniu 2026** i jest to jedyny rankujący adres, który
  nie przeżył przebudowy w całości - patrz „Scalenie oferty” niżej.
- `/o-nas/` też zostaje 1:1 - historia gospodarstwa jest teraz stroną pod tym adresem,
  a nie kotwicą na stronie głównej. Przekierowanie zbędne.
- Doszły cztery nowe adresy bez historii w wyszukiwarce: `/inspiracje/` (galeria),
  `/kontakt/`, `/bratki/` i `/faq/`.
- Przekierowania treściowe są dwa: `/kontakt-2/` → `/kontakt/` (stary slug był efektem kolizji
  nazw w WordPressie i nie ma sensu go przenosić) oraz `/rabatowe/` → `/kwiaty-balkonowe/`.

## Scalenie oferty (wrzesień 2026)

Właściciele poprosili o połączenie kwiatów balkonowych i rabatowych w jedną zakładkę. Grupa
`Rabatowe` zniknęła z danych, jej dwanaście roślin siedzi teraz w `Balkonowe`, a strona
`/rabatowe/` **została usunięta z repozytorium**. Wszystkie 34 rośliny są pod
`/kwiaty-balkonowe/`, ułożone alfabetycznie.

Wybrano `/kwiaty-balkonowe/` jako adres, który zostaje, bo to on ma mocniejszą frazę i większą
część treści. Konsekwencje dla wdrożenia:

- **`/rabatowe/` musi dostać 301 na `/kwiaty-balkonowe/` w konfiguracji serwera.** To jest
  jedyny adres w tej mapie, który **zwróci 404, jeśli reguła nie powstanie** - reszta tabeli
  to albo adresy istniejące dalej, albo endpointy WordPressa, których nikt nie linkuje.
  Konfiguracja serwera nie jest częścią tego repozytorium, więc nic w kodzie tego nie dopilnuje.
- Kotwice na poszczególne rośliny zostają bez zmian (`#hortensja`, `#koleus`,
  `#niecierpek-nowogwinejski`, `#pelargonia-rabatowa` i pozostałe), bo identyfikator wpisu to
  nazwa pliku, a pliki się nie ruszyły. Odnośniki z `/inspiracje/` wskazują już nowy adres.
  Przy przekierowaniu 301 kotwica z żądania przeżywa przeskok, więc stary link z kotwicą
  trafi we właściwą roślinę na nowej stronie.
- Fraza „kwiaty rabatowe” zniknęła z tytułu i z menu (właściciele wybrali nazwę „Kwiaty
  balkonowe” dla całości), ale **została w `description` strony** - to jest miejsce, w którym
  pracuje na wyszukiwanie. Patrz `inwentaryzacja.md`.

Menu (`src/data/navigation.ts`) wskazuje te adresy, a `Nav.astro` oznacza bieżącą pozycję
przez `aria-current="page"`.

**Uwaga do rankujących adresów.** Od wersji 0.10.0 `/kwiaty-balkonowe/` i `/chryzantemy/` nie
stoją już wprost w pasku menu - są w rozwijanym panelu „Oferta”. Adresy
się nie zmieniły i nadal nie potrzebują przekierowań, a odnośniki są w HTML-u każdej strony
(`<details>` nie ukrywa ich przed indeksowaniem). Ale są o jedno kliknięcie dalej, więc płaska
lista wszystkich stron w stopce i nawigacja „Pozostałe grupy” pod każdą kategorią przestały
być wygodą, a stały się częścią tej mapy. Nie usuwać ich.

## Mapa

| Stary adres                                                 | Nowy adres           | Uwagi                                               |
| ----------------------------------------------------------- | -------------------- | --------------------------------------------------- |
| `/`                                                         | `/`                  | bez zmian                                           |
| `/kwiaty-balkonowe/`                                        | `/kwiaty-balkonowe/` | bez zmian - realna podstrona, 301 niepotrzebne      |
| `/rabatowe/`                                                | `/kwiaty-balkonowe/` | **301** - grupa scalona, strona usunięta            |
| `/chryzantemy/`                                             | `/chryzantemy/`      | jw.                                                 |
| `/o-nas/`                                                   | `/o-nas/`            | jw. - historia jest teraz osobną stroną             |
| `/kontakt-2/`                                               | `/kontakt/`          | 301                                                 |
| `/feed/`, `/comments/feed/`                                 | -                    | 410 albo 301 na `/`; kanałów RSS nowa strona nie ma |
| `/xmlrpc.php`, `/wp-json/`, `/wp-includes/*`, `/wp-admin/*` | -                    | 410; to endpointy WordPressa, których już nie ma    |
| `/author/*`                                                 | -                    | 410; strona autora WordPressa - patrz niżej         |
| strony załączników, np. `/122507252_1249308392116342_.../`  | -                    | 410; do 81 adresów, część zaindeksowana - niżej     |

Nowe adresy bez odpowiednika po starej stronie: `/inspiracje/`, `/kontakt/`, `/bratki/`,
`/faq/` i `/polityka-prywatnosci/`. Żaden z nich nie potrzebuje przekierowania - nie
istniały. `/bratki/` doszło we wrześniu 2026 wraz z całą grupą; stara strona nie sprzedawała
bratków w żadnym miejscu. `/faq/` doszło przy przebudowie menu - stara strona nie miała żadnej
strony z pytaniami. `/polityka-prywatnosci/` doszło jako ostatnie i stara strona nie miała
polityki prywatności w ogóle, pod żadnym adresem.

`/polityka-prywatnosci/` jest przy okazji jedynym adresem serwisu, którego **nie ma w menu** -
prowadzi do niego stopka, pasek zgody i zastępnik mapy. Dla przekierowań to bez znaczenia,
ale dla indeksowania już nie: odnośnik ze stopki stoi w HTML-u każdej strony.

## Strony załączników i strona autora

WordPress zakłada osobną stronę dla każdego wgranego pliku. Nie ma ich w `wp-sitemap.xml`,
więc łatwo je przeoczyć, ale **są w indeksie Google** - wyszukiwarka zwraca między innymi
`/122507252_1249308392116342_6811589700478216809_n/`, `/122257893_1249307958783052_.../`
i `/122545311_1249308028783045_.../`, a każdy z nich odpowiada dziś kodem 200. Ile ich może
być, mówi nagłówek `X-WP-Total` na `wp-json/wp/v2/media`: **81**.

Każda taka strona to nazwa pliku jako `<title>`, jedno zdjęcie i nic więcej - treść cienka
i zduplikowana. Po cutoverze zamienią się w 404 i przez kilka miesięcy będą wypełniać raport
„Nie znaleziono" w Search Console, zagłuszając 404, które naprawdę coś znaczą.

**410, nie 301.** Przekierowanie osiemdziesięciu jeden stron plikowych na stronę kategorii
jest obietnicą, której ta strona nie spełnia - crawler dostaje treść niezwiązaną z adresem,
o który pytał. 410 mówi wprost „tego już nie ma” i wypada z indeksu szybciej niż 404.

To samo dotyczy `/author/kamilrog/`, która w dodatku **jest** w sitemapie starego serwisu
(`wp-sitemap-users-1.xml`). Nowa strona nie ma autorów ani archiwów autora.

Reguła po stronie serwera musi trafiać w sam wzorzec załącznika, a nie w cokolwiek innego -
nazwy plików z Facebooka mają postać `/<cyfry>_<cyfry>_<cyfry>_n/`, więc bezpiecznie jest
dopasować adres złożony wyłącznie z cyfr, podkreśleń i końcówki `_n`.

`/wp-content/uploads/*` - stare pliki graficzne. Żaden nie jest używany na nowej stronie
(patrz `inwentaryzacja.md`), ale część może być podlinkowana z zewnątrz. Najbezpieczniej
zostawić katalog serwowany przez jakiś czas i wygasić go później.

## HTTPS

Serwer odpowiada dziś **tylko po HTTP** - próba połączenia po HTTPS kończy się
`TLSV1_ALERT_UNRECOGNIZED_NAME`. `astro.config.mjs` ustawia `site` na `https://`, więc
adresy kanoniczne i sitemapa wskazują na HTTPS. Przed wdrożeniem potrzebny jest certyfikat
i przekierowanie HTTP → HTTPS, inaczej każdy `<link rel="canonical">` prowadzi pod adres,
który nie odpowiada.

## Ukośniki

Nowa strona generuje adresy z ukośnikiem na końcu (`trailingSlash: "always"`,
`build.format: "directory"`), tak jak WordPress. Dzięki temu powyższe adresy zgadzają się
co do znaku i nie potrzeba dodatkowej warstwy przekierowań na sam ukośnik.
