# gospodarstwo-ogrodnicze-site

Statyczna strona **Gospodarstwa Ogrodniczego „Saran”** w Cholewiance pod Kazimierzem Dolnym.
Zastępuje serwis `gospodarstwo-saran.pl` zbudowany na WordPressie.

## Czym to jest

Astro generujące czysty statyczny HTML. Zero frameworka na kliencie, zero hydratacji.
Do przeglądarki trafiają trzy własne moduły TypeScriptu:

- `src/scripts/consent.ts` - pasek zgody i wczytywanie mapy Google,
- `src/scripts/compositions.ts` - pokaz obsadzeń („Inspiracje” i strona główna),
- `src/scripts/lightbox.ts` - powiększenie zdjęcia na wierzchu strony,
- `src/scripts/nav.ts` - zamykanie rozwijanego „Oferta” w menu.

Menu ma sześć pozycji - strona główna, Oferta, Inspiracje, O nas, FAQ i kontakt - i nie
zwija się w hamburgera: łamie się na kolejne wiersze samo. „Oferta” rozwija cztery grupy
i stoi na zwykłym `<details>` z HTML-a, więc **otwiera się i zamyka bez JavaScriptu**;
`nav.ts` dokłada tylko Escape i zamykanie po kliknięciu obok, i potrafi wyłącznie zamykać.
Kiedy skryptu zabraknie, menu nadal działa. Bez skryptu strona działa w całości -
pokaz slajdów jest wtedy przewijalną w poziomie taśmą ze wszystkimi 23 zdjęciami i ich
podpisami, a pasek zgody i miejsce na mapę znikają, bo bez skryptu nic się do Google nie
łączy i nie ma o co pytać. Zostaje link „Wyznacz trasę”.

## Wymagania

Node **≥ 22.12** i npm **≥ 9.6.5** (wymóg Astro 7).

## Komendy

```bash
npm install
npm run dev       # serwer deweloperski na http://localhost:4321
npm run build     # build produkcyjny do dist/
npm run preview   # podgląd tego, co wyszło z build
npm run lint      # astro check && eslint .
npm run format    # prettier --write .
```

Weryfikacja po buildzie:

```bash
npx linkinator http://localhost:4321 --recurse   # martwe linki i brakujące zasoby
npx lighthouse http://localhost:4321 --view      # osobno dla desktopu i mobile
```

Testów nie ma i nie planujemy - weryfikacja to `astro check`, `eslint`, `linkinator`,
Lighthouse i sprawdzenie szerokości od 320 px w górę.

## Jak to jest poukładane

```
src/
├── assets/       zdjęcia źródłowe: gallery/ (23 kadry), plants/, chrysanthemums/,
│              pansies/, hero/, facebook/ - wszystko maks. 2000 px
├── components/   komponenty .astro
├── content/      treść redakcyjna: plants/ (17 roślin), pages/ (historia)
├── data/         dane nieredakcyjne w TypeScripcie: offer, season, navigation,
│              contact, gallery, plant-links, facebook, version
├── layouts/      BaseLayout.astro
├── pages/        index.astro, kwiaty-balkonowe.astro, rabatowe.astro,
│              bratki.astro, chryzantemy.astro, inspiracje.astro,
│              o-nas.astro, kontakt.astro, 404.astro
├── scripts/      consent.ts, compositions.ts, lightbox.ts - jedyny JavaScript
└── styles/       tokens.css, global.css, fonts.css
src/content.config.ts   schematy zod kolekcji treści
scripts/fetch-facebook.mjs   pobieranie postów z Facebooka (tylko przy buildzie)
docs/
├── design/                 projekt: specyfikacja i prototypy .dc.html
├── inwentaryzacja.md       co było na starej stronie, gdzie trafiło i co zostało otwarte
├── przekierowania.md       mapa 301
└── facebook.md             jak wystawić token do Facebooka
```

## Edytowanie treści

**Rośliny** są w `src/content/plants/`, po jednym pliku Markdown na roślinę. Nazwa pliku
staje się kotwicą na stronie swojej grupy - `alstromeria.md` to
`/kwiaty-balkonowe/#alstromeria` - więc zmiana nazwy pliku psuje linki, które ktoś mógł
zapisać. Pole `group` we frontmatterze decyduje, na której z **czterech** stron wpis się
pojawi.

Frontmatter jest walidowany schematem zod z `src/content.config.ts`: literówka w nazwie
pola albo zdjęcie bez opisu **przerywa build**, zamiast po cichu wypuścić pustą sekcję.

```yaml
name: Fuksja # nazwa w nagłówku
group: Balkonowe # Balkonowe | Rabatowe | Bratki | Chryzantemy - steruje chipem
order: 2 # kolejność na stronie
slot: zdjęcie - fuksja, 4:3 # opis kadru, widoczny w placeholderze
facts: # maks. 4, opcjonalne
  - label: Stanowisko
    value: Półcień, osłonięte
colors: [czerwony, biały] # opcjonalne - chipy „Dostępne kolory”
```

Lista grup jest w `src/data/offer.ts` i **stamtąd** bierze ją schemat - nowa grupa zaczyna
się w tym pliku, nie w `content.config.ts`.

Opis uprawy to treść pliku pod frontmatterem. **Nie skracamy go** - długie, konkretne opisy
to powód, dla którego ludzie trafiają na tę stronę z wyszukiwarki.

**Historia gospodarstwa** (strona „O nas”) jest w `src/content/pages/historia.md`.

**Pytania i odpowiedzi z `/faq/`** są w `src/content/faq/` - jeden plik na pytanie, pole
`order` ustala kolejność. Dwie odpowiedzi składają się same z danych: numery telefonów
biorą się z `contact.ts`, a kalendarz sprzedaży z `season.ts`, więc nie trzeba ich tam
przepisywać i nie mogą się rozjechać z resztą strony. **Na tej stronie nie zgadujemy** -
jeśli czegoś nie wiemy na pewno (godziny, płatność kartą, warunki dowozu), pytanie po
prostu nie powstaje; lista rzeczy do ustalenia jest w `docs/inwentaryzacja.md`.

**Telefony, adres, pozycje menu** siedzą w `src/data/*.ts`, nie w Markdownie. Numer telefonu
zmienia się w jednym miejscu (`contact.ts`) i aktualizuje się wszędzie: w przycisku na
górze strony, w sekcji kontaktu, w stopce i w danych strukturalnych JSON-LD.

**Zdjęcia w pokazie slajdów** („Inspiracje”) są w `src/data/gallery.ts` - kolejność wpisów
to kolejność slajdów, a każdy wpis to import zdjęcia plus polski `alt`. Typ wymaga obu, więc
zdjęcie bez opisu nie przejdzie kompilacji. Ten sam plik trzyma zdjęcia przypisane
pojedynczo: `heroPhoto` (pas na górze strony głównej), `tunnelPhoto` (karta wiosenna),
`historyPhoto` (sekcja Historia), `pansyPhoto` i `chrysanthemumPhoto` (karty sezonowe) oraz
dwa pasy zdjęć pod listami roślin: `chrysanthemumStrip` (cztery ujęcia na `/chryzantemy/`)
i `pansyStrip` (cztery skrzynki z bratkami na `/bratki/`). Wszystkie te eksporty leżą
**poza** tablicą pokazu - slajdy są z wiosennej prezentacji gotowych obsadzeń i ujęcie
sprzedażowe w ich środku czytałoby się jak pomyłka.

Żeby dodać zdjęcie: przeskaluj je do **maks. 2000 px** dłuższego boku i **wypal obrót
z EXIF** - aparaty zapisują pionowe kadry jako poziome z flagą obrotu, a `<Picture>` tej
flagi nie respektuje, więc bez tego zdjęcie stanie bokiem. Sprawdzony sposób:

```bash
node -e "import('sharp').then(({default:s})=>s('IMG.jpg').rotate().resize({width:2000,height:2000,fit:'inside'}).jpeg({quality:82,mozjpeg:true}).toFile('src/assets/gallery/gallery-24.jpg'))"
```

Oryginałów nie commitujemy - do repo trafia dopiero wersja przeskalowana.

**Zdjęcia roślin**: ma je **czternaście z siedemnastu** roślin; brakuje dalii, pelargonii
bluszczolistnej i sundaville, a ich placeholdery wypisują kadr, którego brakuje. Dodanie
kolejnego to dwa kroki: przeskaluj plik jak wyżej do `src/assets/plants/` - nazwa taka sama
jak nazwa pliku rośliny w `src/content/plants/` - i dopisz we frontmatterze:

```yaml
image: ../../assets/plants/nazwa-rosliny.jpg
imageAlt: Polski opis tego, co widać na zdjęciu
```

Schemat wymaga obu pól naraz, a `PlantEntry` sam podmienia placeholder na zdjęcie.

## Sezon

Który z **trzech** okresów sprzedaży jest podświetlony, wynika z **daty builda**
(`src/data/season.ts`), nie z ustawienia w treści. Okna są takie, jakie podali właściciele:

| Okres                        | Co jest w sprzedaży         |
| ---------------------------- | --------------------------- |
| marzec                       | bratki i prymulki           |
| kwiecień – czerwiec          | kwiaty balkonowe i rabatowe |
| 1 października – 1 listopada | chryzantemy                 |

Reguła jest jedna: okno, które obejmuje dziś, daje swoim grupom **„W trakcie”**; kiedy żadne
okno nie trwa, najbliższe do otwarcia daje swoim grupom **„Wkrótce”**, a reszta nie mówi nic.
Dzięki temu na stronie stoi najwyżej jeden komunikat sezonowy naraz.

Widać go w dwóch miejscach: na kartach sezonowych na stronie głównej (ciemna karta plus
etykieta) i na stronie kategorii, jako linijka „Sprzedaż trwa: …” pod nagłówkiem. **Kafle
oferty na stronie głównej nie mówią nic o dacie** - to są cztery równe drzwi do czterech
stron.

Konsekwencja liczenia z daty builda: strona zbudowana w sierpniu będzie pokazywać sierpień
aż do następnego pusha. Workflow wdrożeniowy musi mieć **codzienny** `schedule:` obok
`push:` - miesięczny przegapiłby 2 listopada i zostawiłby „CHRYZANTEMY · W TRAKCIE” na
cały listopad.

Zimą (2 listopada – koniec lutego) karta bratków pokazuje „Wkrótce”. To jest do potwierdzenia
z właścicielami razem z resztą tabeli w [`docs/inwentaryzacja.md`](docs/inwentaryzacja.md);
komunikat „Sprzedaż wznawiamy w marcu” z projektu graficznego nie jest zaprojektowany i nie
jest wdrożony.

## Posty z Facebooka

Blok „Co u nas słychać” na stronie głównej to jedyna rzecz na stronie, która zmienia się
sama. Raz dziennie `scripts/fetch-facebook.mjs` pobiera trzy ostatnie posty z profilu
gospodarstwa i **commituje je do `main`** - tekst do `src/data/facebook-posts.json`, zdjęcia
jako pliki do `src/assets/facebook/`. Zwykły build roznosi je dalej.

Zdjęcia są **pobierane, nie podlinkowane**: adresy z Facebooka wygasają po kilku dniach,
a dzięki temu, że pliki są nasze, przeglądarka odwiedzającego w ogóle nie łączy się z Metą -
i tylko dlatego ten blok nie potrzebuje pytania o zgodę, którego wymaga mapa.

Dopóki token nie jest ustawiony, blok nie pokazuje niczego i tak ma być. Procedura wystawienia
tokenu: [`docs/facebook.md`](docs/facebook.md).

## Wersja

`version` w `package.json` jest źródłem prawdy i **podbijamy go ręcznie przy każdym pushu
na `main`** - patch przy poprawkach treści i stylów, minor przy nowej sekcji lub podstronie.
Stopka pokazuje sam numer, a `commit … · build … UTC` chowa w atrybucie `title`.

## Czego brakuje przed wdrożeniem

Pełna lista jest w [`docs/inwentaryzacja.md`](docs/inwentaryzacja.md). Najważniejsze:
trzy brakujące zdjęcia roślin, godziny sprzedaży, e-mail, token do Facebooka, plik
`deploy.yml` i certyfikat HTTPS na serwerze. Polityka prywatności jest już napisana, ale
czeka na potwierdzenie danych administratora - i na `logrotate` ustawiony zgodnie z podanym
w niej okresem przechowywania logów.
Mapa przekierowań ze starych adresów: [`docs/przekierowania.md`](docs/przekierowania.md).
