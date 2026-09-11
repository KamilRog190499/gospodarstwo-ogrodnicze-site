# Przekierowania ze starej strony

Nowa strona wchodzi pod ten sam adres, `gospodarstwo-saran.pl`, więc stare adresy
WordPressa przestaną istnieć w dniu wdrożenia. Każdy z nich musi dostać **301**, bo to one
mają dziś pozycje w wyszukiwarce - stara strona rankuje na nazwy roślin.

Konfiguracja serwera nie jest częścią tego repozytorium; poniżej jest sama mapa.

## Decyzja podjęta

Wcześniejsza wersja tego dokumentu opisywała decyzję do podjęcia: jedna strona z kotwicami
czy realne podstrony. **Wybrano podstrony** - rekomendowany wariant. Konsekwencje:

- `/kwiaty-balkonowe/`, `/rabatowe/` i `/chryzantemy/` **zostają bez zmian**, więc nie
  potrzebują żadnego przekierowania. Trzy adresy z pozycjami zostają trzema adresami.
- `/o-nas/` też zostaje 1:1 - historia gospodarstwa jest teraz stroną pod tym adresem,
  a nie kotwicą na stronie głównej. Przekierowanie zbędne.
- Doszły cztery nowe adresy bez historii w wyszukiwarce: `/inspiracje/` (galeria),
  `/kontakt/`, `/bratki/` i `/faq/`.
- Jedyne przekierowanie treściowe to `/kontakt-2/` → `/kontakt/`: stary slug był efektem
  kolizji nazw w WordPressie i nie ma sensu go przenosić.

Menu (`src/data/navigation.ts`) wskazuje te adresy, a `Nav.astro` oznacza bieżącą pozycję
przez `aria-current="page"`.

**Uwaga do trzech rankujących adresów.** Od wersji 0.10.0 `/kwiaty-balkonowe/`, `/rabatowe/`
i `/chryzantemy/` nie stoją już wprost w pasku menu - są w rozwijanym panelu „Oferta”. Adresy
się nie zmieniły i nadal nie potrzebują przekierowań, a odnośniki są w HTML-u każdej strony
(`<details>` nie ukrywa ich przed indeksowaniem). Ale są o jedno kliknięcie dalej, więc płaska
lista wszystkich stron w stopce i nawigacja „Pozostałe grupy” pod każdą kategorią przestały
być wygodą, a stały się częścią tej mapy. Nie usuwać ich.

## Mapa

| Stary adres                                                 | Nowy adres           | Uwagi                                               |
| ----------------------------------------------------------- | -------------------- | --------------------------------------------------- |
| `/`                                                         | `/`                  | bez zmian                                           |
| `/kwiaty-balkonowe/`                                        | `/kwiaty-balkonowe/` | bez zmian - realna podstrona, 301 niepotrzebne      |
| `/rabatowe/`                                                | `/rabatowe/`         | jw.                                                 |
| `/chryzantemy/`                                             | `/chryzantemy/`      | jw.                                                 |
| `/o-nas/`                                                   | `/o-nas/`            | jw. - historia jest teraz osobną stroną             |
| `/kontakt-2/`                                               | `/kontakt/`          | 301                                                 |
| `/feed/`, `/comments/feed/`                                 | -                    | 410 albo 301 na `/`; kanałów RSS nowa strona nie ma |
| `/xmlrpc.php`, `/wp-json/`, `/wp-includes/*`, `/wp-admin/*` | -                    | 410; to endpointy WordPressa, których już nie ma    |

Nowe adresy bez odpowiednika po starej stronie: `/inspiracje/`, `/kontakt/`, `/bratki/`,
`/faq/` i `/polityka-prywatnosci/`. Żaden z nich nie potrzebuje przekierowania - nie
istniały. `/bratki/` doszło we wrześniu 2026 wraz z całą grupą; stara strona nie sprzedawała
bratków w żadnym miejscu. `/faq/` doszło przy przebudowie menu - stara strona nie miała żadnej
strony z pytaniami. `/polityka-prywatnosci/` doszło jako ostatnie i stara strona nie miała
polityki prywatności w ogóle, pod żadnym adresem.

`/polityka-prywatnosci/` jest przy okazji jedynym adresem serwisu, którego **nie ma w menu** -
prowadzi do niego stopka, pasek zgody i zastępnik mapy. Dla przekierowań to bez znaczenia,
ale dla indeksowania już nie: odnośnik ze stopki stoi w HTML-u każdej strony.

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
