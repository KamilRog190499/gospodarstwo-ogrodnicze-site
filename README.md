# gospodarstwo-ogrodnicze-site

Statyczna strona **Gospodarstwa Ogrodniczego „Saran”** w Cholewiance pod Kazimierzem Dolnym.
Zastępuje serwis `gospodarstwo-saran.pl` zbudowany na WordPressie.

## Czym to jest

Astro generujące czysty statyczny HTML. Zero frameworka na kliencie, zero hydratacji.
Do przeglądarki trafiają trzy własne moduły TypeScriptu:

- `src/scripts/consent.ts` — pasek zgody i wczytywanie mapy Google,
- `src/scripts/compositions.ts` — pokaz obsadzeń na stronie „Inspiracje”,
- `src/scripts/lightbox.ts` — powiększenie zdjęcia na wierzchu strony.

Menu się nie zwija: osiem pozycji łamie się na kolejne wiersze samo, więc żadnego
JavaScriptu do nawigacji nie ma. Każda z nich prowadzi pod osobny adres — strona główna,
cztery grupy oferty, inspiracje, historia i kontakt. Bez skryptu strona działa w całości — pokaz slajdów jest
wtedy przewijalną w poziomie taśmą ze wszystkimi 23 zdjęciami i ich podpisami, a pasek
zgody i miejsce na mapę znikają, bo bez skryptu nic się do Google nie łączy i nie ma o co
pytać. Zostaje link „Wyznacz trasę”.

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

Testów nie ma i nie planujemy — weryfikacja to `astro check`, `eslint`, `linkinator`,
Lighthouse i sprawdzenie szerokości od 320 px w górę.

## Jak to jest poukładane

```
src/
├── assets/       zdjęcia źródłowe: gallery/ (23 kadry), plants/, chrysanthemums/,
│              pansies/ — wszystko maks. 2000 px
├── components/   komponenty .astro
├── content/      treść redakcyjna: plants/ (17 roślin), pages/ (historia)
├── data/         dane nieredakcyjne w TypeScripcie (contact, navigation, season,
│              gallery, version)
├── layouts/      BaseLayout.astro
├── pages/        index.astro, kwiaty-balkonowe.astro, rabatowe.astro,
│              bratki.astro, chryzantemy.astro, inspiracje.astro,
│              o-nas.astro, kontakt.astro, 404.astro
├── scripts/      consent.ts, compositions.ts, lightbox.ts — jedyny JavaScript
└── styles/       tokens.css, global.css, fonts.css
src/content.config.ts   schematy zod kolekcji treści
docs/
├── design/                 projekt: specyfikacja i prototypy .dc.html
├── inwentaryzacja.md       co było na starej stronie i gdzie trafiło
└── przekierowania.md       mapa 301
```

## Edytowanie treści

**Rośliny** są w `src/content/plants/`, po jednym pliku Markdown na roślinę. Nazwa pliku
staje się kotwicą na stronie swojej grupy — `alstromeria.md` to
`/kwiaty-balkonowe/#alstromeria` — więc zmiana nazwy pliku psuje linki, które ktoś mógł
zapisać. Pole `group` we frontmatterze decyduje, na której z trzech stron wpis się pojawi.

Frontmatter jest walidowany schematem zod z `src/content.config.ts`: literówka w nazwie
pola albo zdjęcie bez opisu **przerywa build**, zamiast po cichu wypuścić pustą sekcję.

```yaml
name: Fuksja # nazwa w nagłówku
group: Balkonowe # Balkonowe | Rabatowe | Chryzantemy — steruje chipem
order: 2 # kolejność na stronie
slot: zdjęcie — fuksja, 4:3 # opis kadru, widoczny w placeholderze
facts: # maks. 3, opcjonalne
  - label: Stanowisko
    value: Półcień, osłonięte
colors: [czerwony, biały] # opcjonalne — chipy „Dostępne kolory”
```

Opis uprawy to treść pliku pod frontmatterem. **Nie skracamy go** — długie, konkretne opisy
to powód, dla którego ludzie trafiają na tę stronę z wyszukiwarki.

**Historia gospodarstwa** jest w `src/content/pages/historia.md`.

**Telefony, adres, pozycje menu** siedzą w `src/data/*.ts`, nie w Markdownie. Numer telefonu
zmienia się w jednym miejscu (`contact.ts`) i aktualizuje się wszędzie: w przycisku na
górze strony, w sekcji kontaktu, w stopce i w danych strukturalnych JSON-LD.

**Zdjęcia w pokazie slajdów** („Inspiracje”) są w `src/data/gallery.ts` — kolejność wpisów
to kolejność slajdów, a każdy wpis to import zdjęcia plus polski `alt`. Typ wymaga obu, więc
zdjęcie bez opisu nie przejdzie kompilacji. Ten sam plik trzyma zdjęcia przypisane
pojedynczo: `tunnelPhoto` (karta wiosenna), `historyPhoto` (sekcja Historia) i
`chrysanthemumPhoto` (karta jesienna) oraz dwa pasy zdjęć pod listami roślin:
`chrysanthemumStrip` (cztery ujęcia na `/chryzantemy/`) i `pansyStrip` (cztery skrzynki
z bratkami na `/bratki/`). Wszystkie te eksporty leżą **poza** tablicą pokazu — slajdy są
z wiosennej prezentacji gotowych obsadzeń i ujęcie sprzedażowe w ich środku czytałoby
się jak pomyłka.

Żeby dodać zdjęcie: przeskaluj je do **maks. 2000 px** dłuższego boku i **wypal obrót
z EXIF** — aparaty zapisują pionowe kadry jako poziome z flagą obrotu, a `<Picture>` tej
flagi nie respektuje, więc bez tego zdjęcie stanie bokiem. Sprawdzony sposób:

```bash
node -e "import('sharp').then(({default:s})=>s('IMG.jpg').rotate().resize({width:2000,height:2000,fit:'inside'}).jpeg({quality:82,mozjpeg:true}).toFile('src/assets/gallery/gallery-24.jpg'))"
```

Oryginałów nie commitujemy — do repo trafia dopiero wersja przeskalowana.

**Zdjęcia roślin**: mają je na razie cztery z siedemnastu roślin — trzy chryzantemy i bratek;
pozostałe placeholdery wypisują kadr, którego brakuje. Dodanie kolejnego
to dwa kroki: przeskaluj plik jak wyżej do `src/assets/plants/` — nazwa taka sama jak
nazwa pliku rośliny w `src/content/plants/` — i dopisz we frontmatterze:

```yaml
image: ../../assets/plants/nazwa-rosliny.jpg
imageAlt: Polski opis tego, co widać na zdjęciu
```

Schemat wymaga obu pól naraz, a `PlantEntry` sam podmienia placeholder na zdjęcie.

## Sezon

Która z **trzech** kart sezonowych jest podświetlona, wynika z **daty builda**
(`src/data/season.ts`), nie z ustawienia w treści. Okna: marzec–kwiecień to bratki,
maj–sierpień kwiaty balkonowe i rabatowe, wrzesień–listopad chryzantemy. Konsekwencja: strona zbudowana w sierpniu
będzie „wiosenna” aż do następnego pusha. Workflow wdrożeniowy musi mieć comiesięczny
`schedule:` obok `push:`, inaczej 1 października strona nadal sprzedaje wiosnę.

Stan zimowy (grudzień–luty) nie jest zaprojektowany: wszystkie karty są wtedy wygaszone,
a etykiety pokazują nazwę pory roku zamiast „Trwa teraz”. Żaden komunikat nie jest
zmyślany — do ustalenia z właścicielami.

## Wersja

`version` w `package.json` jest źródłem prawdy i **podbijamy go ręcznie przy każdym pushu
na `main`** — patch przy poprawkach treści i stylów, minor przy nowej sekcji lub podstronie.
Stopka pokazuje sam numer, a `commit … · build … UTC` chowa w atrybucie `title`.

## Czego brakuje przed wdrożeniem

Pełna lista jest w [`docs/inwentaryzacja.md`](docs/inwentaryzacja.md). Najważniejsze:
zdjęcia, godziny sprzedaży, e-mail, polityka prywatności i certyfikat HTTPS na serwerze.
Mapa przekierowań ze starych adresów: [`docs/przekierowania.md`](docs/przekierowania.md).
