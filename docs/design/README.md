# Handoff: Strona internetowa Gospodarstwa Ogrodniczego „Saran”

## Overview

Nowa strona dla Gospodarstwa Ogrodniczego „Saran” (Cholewianka 36, 24-120 Kazimierz Dolny, woj. lubelskie) - rodzinnego gospodarstwa sprzedającego kwiaty balkonowe, rabatowe, wieloletnie oraz chryzantemy wielkokwiatowe z własnej uprawy.

Zastępuje obecną stronę http://gospodarstwo-saran.pl/ (WordPress). Cel: zachować strukturę i charakter obecnej strony (menu, wzorzec „zdjęcie + długi opis uprawy + lista dostępnych kolorów”, dwa bloki sezonowe), ale z uporządkowaną typografią, odstępami i dostępnością.

**Bez e-commerce.** Gospodarstwo nie prowadzi sklepu internetowego - zamówienia wyłącznie telefonicznie lub na miejscu. Strona jest wizytówką + katalogiem informacyjnym.

## About the Design Files

Pliki `.dc.html` w tej paczce to **referencje projektowe wykonane w HTML** - prototypy pokazujące zamierzony wygląd i zachowanie, a nie kod produkcyjny do skopiowania. Zadaniem jest **odtworzenie tych projektów w docelowym środowisku** (Next.js/Astro/WordPress theme - cokolwiek pasuje) z użyciem jego wzorców. Jeśli środowiska jeszcze nie ma: dla tej strony rekomendowany jest **statyczny generator (Astro lub Next.js SSG)** - treść zmienia się kilka razy w roku, więc CMS nie jest konieczny; ewentualnie WordPress, jeśli klient chce sam edytować opisy roślin.

Pliki otwiera się bezpośrednio w przeglądarce (wymagają `support.js` w tym samym katalogu). Logika komponentu leży w `<script type="text/x-dc">` na dole pliku, szablon między `<x-dc>` i `</x-dc>`. Style są inline - to celowe w środowisku prototypu; **w implementacji produkcyjnej przenieś je do CSS/Tailwind zgodnie z konwencją kodu.**

## Fidelity

**High-fidelity.** Kolory, typografia, skala i odstępy są finalne i podane niżej dokładnie. Odtwarzaj wiernie.

Dwa wyjątki, gdzie fidelity jest niepełna:

- **Zdjęcia** - wszystkie obrazy to placeholdery (kremowe prostokąty w paski z monospace’owym opisem kadru). Klient nie dostarczył jeszcze fotografii. Każdy placeholder podaje wymagany kadr i treść; zachowaj `aspect-ratio` po podstawieniu prawdziwych zdjęć.
- **Logo** - brak logotypu; nazwa jest wyłącznie typograficzna (Instrument Serif). Jeśli klient dostarczy znak, zajmie miejsce nad/przed nazwą w nagłówku.

## Pliki w paczce

| Plik                             | Rola                                                                                                                                                                                                                                                                                          |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `saran-strona-glowna-v3.dc.html` | **GŁÓWNY - implementuj ten.** Struktura wg obecnej strony klienta, odświeżona typografia.                                                                                                                                                                                                     |
| `saran-zielnik-v2.dc.html`       | Wariant alternatywny („zielnik”): numerowane tablice roślin I–IV, sekcja „Rytm roku” z czterema pasmami miesięcy, sekcja „Jak kupować”. Odrzucony jako główny kierunek, ale sekcja „Rytm roku” i wzorzec tablic mogą wrócić jako elementy podstron. Nie implementuj bez ustalenia z klientem. |
| `support.js`                     | Runtime prototypu. **Nie przenoś do produkcji** - potrzebny tylko do otwarcia plików `.dc.html` lokalnie.                                                                                                                                                                                     |

## ⚠️ Motyw „Poranek w tunelu” (2a) - co z poniższego już nie obowiązuje

**Wrzesień 2026.** Zatwierdzony motyw 2a zastępuje **paletę kolorów i kroje pisma** z tego
dokumentu. Żródłem prawdy dla obu jest `src/styles/tokens.css`. Tabela kolorów i sekcja
o typografii poniżej opisują wersję sprzed 2a i są tu zachowane jako zapis pierwotnego
handoffu - **nie kopiuj z nich wartości do kodu.**

Co się zmieniło:

| Element                   | Handoff (nieaktualne)                           | Motyw 2a (obowiązuje)                                                                                                                                                                                                                |
| ------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Papier                    | `#FCFBF5`                                       | `#FAF7F0`                                                                                                                                                                                                                            |
| Papier zabrudzony         | `#F1EFE3`                                       | `#F2EFE4`                                                                                                                                                                                                                            |
| Atrament                  | `#23281F`                                       | `#1F2A21`                                                                                                                                                                                                                            |
| Zielen akcent             | `#4E5C40`                                       | rozdzielona: `--green` `#5A6D46` (tekst, focus), `--sage` `#6B7F55` (tylko typ ≥24px)                                                                                                                                                |
| Krój szeryfowy            | Instrument Serif                                | Newsreader                                                                                                                                                                                                                           |
| Krój bezszeryfowy         | Karla                                           | Public Sans                                                                                                                                                                                                                          |
| Stopień telefonu i adresu | `clamp(1.35rem, 1.15rem + 0.6vw, 1.7rem)`       | `clamp(1.2rem, 1.05rem + 0.45vw, 1.45rem)` - zmniejszony we wrześniu 2026 na zgłoszenie właścicieli, bo Newsreader w miejscu Instrument Serif czytał się w tym stopniu za ciężko                                                     |
| Stopień linku w menu      | `0.78rem` (12,5 px), stała wartość              | `--text-nav`: `clamp(0.86rem, 0.8rem + 0.28vw, 0.98rem)` (13,8–15,7 px), tracking `0.08em` zamiast `0.1em`; pozycje w panelu „Oferta” osobno, `--text-nav-panel`, **małymi literami**                                                |
| Stopień `h1` na zdjęciu   | `clamp(2.1rem, 1.4rem + 3vw, 3.6rem)`, waga 400 | `--text-h1`: `clamp(1.95rem, 1.3rem + 2.6vw, 3.05rem)`, waga **350** i tracking `-0.015em` - zmniejszony we wrześniu 2026 na zgłoszenie właścicieli („za duża i za ciężka”). Token ma w projekcie jednego użytkownika, `Intro.astro` |
| Stopień pytania w FAQ     | brak — handoff nie przewidywał tej strony       | `--text-question`: `clamp(1.15rem, 1.05rem + 0.45vw, 1.45rem)`, waga **375**, tracking `-0.005em`. Osobny krok zamiast `--text-h3`, bo wiersz w liście sześciu pytań ma inne zadanie niż nazwa rośliny — `--text-h3` bez zmian       |

Co **nadal obowiązuje** bez zmian: skala typograficzna - z wyjątkami wypisanymi w tabeli
wyżej (telefon i adres, link w menu, `h1` na zdjęciu) - formuły odstępów, struktura sekcji,
cała polska treść, reguły interakcji i dostępności, oraz zasada surowości (bez zaokrągleń,
cieni, ikon). Jeden wyjątek od „bez gradientów”: `--hero-scrim`, przyciemnienie pod
nagłówkiem leżącym na zdjęciu na stronie głównej. Nie używać go nigdzie indziej.

Tagline w nagłówku (sekcja 1 niżej) obowiązuje i stoi w nagłówku. Wersja 0.5 przeniosła go
do stopki; 0.6 cofa tę zmianę, bo nie była z nikim ustalona.

## Design Tokens

### Kolory

| Token                   | Hex       | Użycie                                                                                     |
| ----------------------- | --------- | ------------------------------------------------------------------------------------------ |
| Papier (tło)            | `#FCFBF5` | tło strony, tło aktywnych kart, tekst na ciemnym                                           |
| Papier zabrudzony       | `#F1EFE3` | pasek menu, tło placeholderów zdjęć, chipy kolorów, tło sekcji                             |
| Kreska                  | `#E0DDCE` | wszystkie linie 1px, obramowania kart i placeholderów                                      |
| Kreska ciemniejsza      | `#DCD7C4` | obramowanie chipów kolorów, linie na tle `#F1EFE3`                                         |
| Kreska pod linkiem      | `#CFCBB8` | podkreślenie linków telefonicznych w spoczynku                                             |
| Atrament                | `#23281F` | tekst główny, nagłówki, tło stopki, hover linków                                           |
| Atrament miękki         | `#4C5344` | akapity drugorzędne, opisy                                                                 |
| Atrament szary          | `#5B6153` | etykiety uppercase, podpisy zdjęć, tekst placeholderów                                     |
| Zieleń akcent           | `#4E5C40` | akcenty, kursywa w nagłówkach, focus ring, hover linków (kontrast 5.3:1 na `#FCFBF5` - AA) |
| Zieleń ciemna           | `#3D4A33` | przyciski, sekcja „Historia”, aktywna karta sezonu, skip-link                              |
| Zieleń tunelu           | `#33402B` | tło placeholderów zdjęć na ciemnym tle                                                     |
| Zieleń jasna            | `#C6D3B6` | etykiety uppercase na ciemnym tle                                                          |
| Zieleń tekst na ciemnym | `#DDE2D2` | akapity na `#3D4A33`                                                                       |
| Kość na ciemnym         | `#EEF0E6` | nagłówki na `#3D4A33` i `#23281F`                                                          |
| Stopka tekst            | `#C3CBB8` | akapity w stopce                                                                           |
| Stopka etykiety         | `#96A188` | etykiety uppercase i copyright w stopce                                                    |
| Stopka linki            | `#E4E7DC` | linki w stopce                                                                             |

Zasada: **maks. dwa tła** (kremowe `#FCFBF5` i piaskowe `#F1EFE3`) plus dwie ciemne plamy (`#3D4A33` historia, `#23281F` stopka). Bez gradientów, bez cieni, bez zaokrągleń - cała hierarchia opiera się na liniach 1px, wielkości typu i odstępach.

### Typografia

Dwa kroje, wczytywane z Google Fonts:

```html
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Karla:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
```

- **Instrument Serif** (400, 400 italic) - nagłówki, nazwy roślin, numery telefonów, duże liczby. Fallback: `Georgia, serif`.
- **Karla** (400, 500, 600) - tekst bieżący, etykiety, przyciski, nawigacja. Fallback: `system-ui, sans-serif`.
- **ui-monospace / Menlo** - wyłącznie teksty w placeholderach zdjęć (znikną po podstawieniu fotografii).

Skala (wszystkie fluid `clamp()`):

| Element                                  | Rozmiar                                                    | Waga | Line-height | Letter-spacing    |
| ---------------------------------------- | ---------------------------------------------------------- | ---- | ----------- | ----------------- |
| Body                                     | `clamp(1rem, 0.96rem + 0.22vw, 1.09rem)`                   | 400  | 1.68        | -                 |
| H1 (nazwa w nagłówku)                    | `clamp(2.1rem, 1.4rem + 3vw, 3.6rem)` Instrument Serif     | 400  | 1.05        | −0.01em           |
| H2 sekcji                                | `clamp(1.8rem, 1.35rem + 1.9vw, 2.7rem)` Instrument Serif  | 400  | domyślny    | -                 |
| H2 „Historia” / „Kontakt”                | `clamp(1.9rem, 1.4rem + 2.2vw, 2.9rem)` Instrument Serif   | 400  | 1.06        | -                 |
| H2 kart sezonowych                       | `clamp(1.7rem, 1.3rem + 1.7vw, 2.5rem)` Instrument Serif   | 400  | 1.1         | -                 |
| H3 nazwa rośliny                         | `clamp(1.5rem, 1.25rem + 1vw, 2rem)` Instrument Serif      | 400  | 1.1         | -                 |
| Lead („Zachęcamy…”)                      | `clamp(1.5rem, 1.1rem + 1.8vw, 2.35rem)` Instrument Serif  | 400  | 1.25        | -                 |
| Numer telefonu / adres                   | `clamp(1.35rem, 1.15rem + 0.6vw, 1.7rem)` Instrument Serif | 400  | 1.3         | -                 |
| Podtytuł nagłówka                        | `0.72rem` Karla                                            | 600  | -           | 0.2em, uppercase  |
| Link w menu                              | `0.78rem` Karla                                            | 600  | -           | 0.1em, uppercase  |
| Przycisk                                 | `0.78rem` Karla                                            | 600  | -           | 0.14em, uppercase |
| Etykieta `dt` (fakty, „Dostępne kolory”) | `0.62–0.66rem` Karla                                       | 600  | -           | 0.16em, uppercase |
| Wartość `dd` (fakty)                     | `0.95rem` Karla                                            | 400  | -           | -                 |
| Chip koloru                              | `0.85rem` Karla                                            | 400  | -           | -                 |
| Podpis zdjęcia                           | `0.8rem` Karla                                             | 400  | -           | -                 |
| Stopka body                              | `0.92–0.95rem` Karla                                       | 400  | -           | -                 |
| Stopka etykieta                          | `0.64rem` Karla                                            | 600  | -           | 0.18em, uppercase |
| Copyright                                | `0.78rem` Karla                                            | 400  | -           | -                 |

**Wiersz „Numer telefonu / adres” w tabeli wyżej jest nieaktualny.** Obowiązuje
`clamp(1.2rem, 1.05rem + 0.45vw, 1.45rem)` - patrz blok o motywie 2a i `src/styles/tokens.css`.

`text-wrap: balance` na leadzie. `font-variant-numeric: tabular-nums` na wersji makiety w stopce.

### Siatka i odstępy

Wszystkie sekcje używają jednego wzorca poziomego marginesu, który daje maksymalną szerokość treści 1200 px z płynnym paddingiem:

```css
padding-inline: max(clamp(1.25rem, 5vw, 5rem), (100% - 1200px) / 2);
```

Pasek menu ma węższy wariant: `max(clamp(1rem, 4vw, 5rem), (100% - 1200px) / 2)`.

Padding pionowy sekcji: `clamp(2.5rem, 6vw, 4.5rem)` (typowo), `clamp(2.75rem, 7vw, 5rem)` (Historia, Kontakt), `clamp(2.25rem, 5vw, 3.5rem)` (stopka).

Gapy: `clamp(1.75rem, 5vw, 3.5rem)` między kolumnami sekcji, `clamp(2rem, 5vw, 3.5rem)` między kartami sezonowymi, `clamp(1.25rem, 4vw, 2.75rem)` w wpisie rośliny, `0.85rem` między elementami w kolumnie tekstowej.

**Layout wyłącznie flex/grid z `gap`.** Zero marginesów na rodzeństwie. Wszystkie kolumny responsywne przez `grid-template-columns: repeat(auto-fit, minmax(min(100%, Npx), 1fr))` - bez media queries. Wartości `N`: 320px (karty sezonowe), 300px (Historia, Kontakt), 260px (wpis rośliny), 220px (stopka), 150px (fakty rośliny).

### Border radius / shadows

**Brak.** Wszystko na prostych krawędziach, bez cieni. Jedyne obramowania to `1px solid` w kolorach kreski oraz `1px dashed` w blokach „Do potwierdzenia”. Aktywny link menu: `border-bottom: 2px solid #4E5C40`.

## Screens / Views

Projekt to **jedna strona główna** z kotwicami. Podstrony (Balkonowe, Rabatowe, Chryzantemy, Historia, Kontakt) są w planie, ale jeszcze nie zaprojektowane - na razie wszystkie linki menu prowadzą do sekcji na tej samej stronie.

### 0. Skip link

`<a href="#tresc">Przejdź do treści</a>` - `position: absolute`, `top: -100%`, na `:focus-visible` zjeżdża na `top: 0.5rem`. Tło `#3D4A33`, tekst `#FCFBF5`, `0.72rem/600/0.14em uppercase`, padding `0.75rem 1rem`, `min-height: 44px`.

### 1. Nagłówek (sticky: nie)

Dwie części, rozdzielone linią.

**Górna** - wyśrodkowana, tło `#FCFBF5`, padding `clamp(1.5rem,4vw,2.75rem)` górą i `clamp(1rem,2vw,1.5rem)` dołem:

- H1: „Gospodarstwo Ogrodnicze **„Saran”**” - słowo „Saran” w cudzysłowach drukarskich, kursywą, w kolorze `#4E5C40`.
- Podtytuł: „Sprzedaż kwiatów balkonowych, rabatowych i chryzantem” - `0.72rem/600/0.2em uppercase`, `#5B6153`. **To dokładny tagline z obecnej strony - nie zmieniać.**

**Dolna** - pasek menu, tło `#F1EFE3`, `border-top: 1px solid #E0DDCE`:

- `<nav aria-label="Główne">` → `<ul>` `display: flex; flex-wrap: wrap; justify-content: center; gap: 0 clamp(1rem,3vw,2.5rem)`. **Od 1.0 pasek ma też `padding-block: clamp(0.4rem, 1vw, 0.7rem)`** - bez tego podkreślenie bieżącej pozycji lądowało 1 px nad kreską nagłówka i było niewidoczne, co zgłosili właściciele.
- Pozycje w tej kolejności (odzwierciedla obecną stronę): **Kwiaty balkonowe** → `#oferta`, **Rabatowe** → `#oferta`, **Chryzantemy** → `#oferta`, **Historia gospodarstwa** → `#historia`, **Kontakt** → `#kontakt`.

> **⚠️ Nieaktualne od wersji 1.0.** Menu nie jest już płaskie i nie prowadzi do kotwic. Po
> audycie UX/SEO z września 2026 ma sześć pozycji: **Strona główna · Oferta ▾ · Inspiracje ·
> O nas · FAQ · Kontakt**, gdzie „Oferta” to natywny `<details>` z czterema kategoriami
> (Kwiaty balkonowe, Kwiaty rabatowe, Bratki i prymulki, Chryzantemy), a każda pozycja
> prowadzi do prawdziwej strony. „Historia gospodarstwa” nazywa się w menu „O nas”. Źródłem
> prawdy jest `src/data/navigation.ts`; uzasadnienie każdej z tych decyzji -
> `docs/inwentaryzacja.md`, sekcja „Przebudowa menu”.

- Link: `0.78rem/600/0.1em uppercase`, `#3D4A33`, `min-height: 48px`, `display: inline-flex; align-items: center`, `border-bottom: 2px solid transparent`.
- Hover: `color: #23281F`, `border-bottom-color: #4E5C40`.
- **W implementacji podstron**: aktywna pozycja dostaje `border-bottom-color: #4E5C40` na stałe + `aria-current="page"`.

### 2. Intro (bez id, pierwsza sekcja `<main id="tresc">`)

Wyśrodkowana kolumna, `border-bottom: 1px solid #E0DDCE`.

- Lead: „Zachęcamy do zapoznania się z naszą ofertą.” - Instrument Serif, `max-width: 30ch`, `text-wrap: balance`.
- Akapit: „Zamówienia można składać telefonicznie lub na terenie naszego gospodarstwa w Cholewiance pod Kazimierzem Dolnym. Wszystko, co sprzedajemy, pochodzi z naszej własnej uprawy.” - `max-width: 56ch`, `#4C5344`.
- Dwa CTA w rzędzie (`flex; wrap; gap: 0.6rem 1.25rem; justify-content: center`):
  - **Primary**: „Zadzwoń: 602 518 401” → `tel:+48602518401`. Tło `#3D4A33`, tekst `#FCFBF5`, padding `0 1.5rem`, `min-height: 50px`. Hover: tło `#23281F`.
  - **Secondary**: „Zobacz ofertę” → `#oferta`. Tekst `#23281F`, `border-bottom: 1px solid #23281F`, `padding-bottom: 3px`, `min-height: 44px`. Hover: `#4E5C40` (tekst i kreska).

### 3. Bloki sezonowe (bez id)

Dwie karty side-by-side (`auto-fit, minmax(min(100%, 320px), 1fr)`), każda z padding `clamp(1.5rem,4vw,2.5rem)` i `1px solid` obramowaniem.

**Stan aktywny vs nieaktywny** - sterowany propsem `season`. Aktywna karta: tło `#3D4A33`, obramowanie `#3D4A33`, nagłówek `#FCFBF5`, eyebrow `#C6D3B6`, body `#DDE2D2`, meta `#C6D3B6`, placeholder tło `#33402B` z paskami `rgb(238 240 230 / 14%)`. Nieaktywna: tło `#FCFBF5`, obramowanie `#E0DDCE`, nagłówek `#23281F`, eyebrow `#4E5C40`, body `#4C5344`, meta `#5B6153`, placeholder tło `#F1EFE3` z paskami `rgb(224 221 206 / 80%)`.

Zawartość karty w kolejności: eyebrow (uppercase) → H2 → akapit (`max-width: 46ch`) → placeholder zdjęcia 16:9 → meta.

|             | Karta 1                                                                                                                           | Karta 2                                                                                                                                                                       |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Eyebrow     | „Trwa teraz” / „Wiosna”                                                                                                           | „Jesień” / „Trwa teraz”                                                                                                                                                       |
| H2          | Sprzedaż w okresie wiosennym                                                                                                      | Chryzantemy wielkokwiatowe                                                                                                                                                    |
| Body        | „Kwiaty balkonowe i rabatowe, rozsady oraz gotowe obsadzone skrzynki i doniczki. Kolory i odmiany oglądasz na miejscu, w tunelu.” | „Duży wybór kolorów. Sprzedaż zaczyna się od początku października i trwa do 1 listopada. Przed Wszystkimi Świętymi zamówienia najlepiej złożyć z tygodniowym wyprzedzeniem.” |
| Meta        | „Maj – czerwiec · szczyt sezonu”                                                                                                  | „Październik – 1 listopada”                                                                                                                                                   |
| Placeholder | „galeria - tunel z kwiatami balkonowymi, 16:9”                                                                                    | „galeria - chryzantemy przed 1 listopada, 16:9”                                                                                                                               |

Aktywna jest karta 1 dla `season ∈ {Wiosna, Lato}`, karta 2 dla `season === "Jesień"`.

**W produkcji:** wyznaczaj sezon z daty serwera, nie z propsa. Sugerowana reguła: 1.03–31.08 → wiosna/lato (aktywna karta 1), 1.09–30.11 → jesień (karta 2), 1.12–28.02 → obie nieaktywne + krótki komunikat „Sprzedaż wznawiamy w marcu”. Ten trzeci stan **nie jest zaprojektowany** - dopytaj klienta.

### 4. Oferta - wpisy roślin (`id="oferta"`)

**To rdzeń strony i najważniejszy wzorzec przeniesiony z obecnej witryny.**

Nagłówek sekcji: rząd `flex; wrap; align-items: baseline; gap: 0.5rem 1.5rem`, `border-bottom: 1px solid #E0DDCE`, `padding-bottom: 0.9rem`:

- H2 „Kwiaty w naszej ofercie”
- Akapit „Przy każdej roślinie piszemy, jak ją uprawiać i w jakich kolorach jest u nas dostępna.” - `0.95rem`, `#4C5344`, `max-width: 42ch`.

Następnie lista `<article>`, każdy z `border-bottom: 1px solid #E0DDCE`, `padding-block: clamp(1.75rem,4vw,3rem)`, dwie kolumny (`auto-fit, minmax(min(100%, 260px), 1fr)`, `align-items: start`).

**Lewa kolumna - `<figure>`:**

- Placeholder 4:3 z opisem kadru (biały box `#FCFBF5` z obramowaniem, w środku monospace `0.62rem`).
- `<figcaption>` `0.8rem`, `#5B6153`.

**Prawa kolumna:**

- Rząd baseline: H3 (nazwa rośniny) + chip grupy (`0.6rem/600/0.12em uppercase`, `1px solid #DCD7C4`, tło `#F1EFE3`, tekst `#4E5C40`, padding `0.2rem 0.5rem`, `white-space: nowrap`).
- Akapit z opisem uprawy, `#4C5344`. **To treść merytoryczna klienta - nie przepisywać ani nie skracać.**
- `<dl>` z trzema faktami: `grid; auto-fit minmax(min(100%,150px),1fr); gap: 0.75rem 1.5rem`, `border-top: 1px solid #E0DDCE`, `padding-top: 0.85rem`. `dt` uppercase `0.62rem`, `dd` `0.95rem`.
- Blok „Dostępne kolory”: etykieta uppercase `0.66rem` + `<ul>` `flex; wrap; gap: 0.4rem` z chipami (`0.85rem`, `1px solid #DCD7C4`, tło `#F1EFE3`, padding `0.25rem 0.65rem`).

**Dane trzech wpisów (dokładna treść):**

**1. Alstromeria** - grupa „Balkonowe”

- Podpis zdjęcia: „Zwana też lilią Inków - pochodzi z górskich regionów Ameryki Południowej.”
- Opis: „Bylina o kilku pędach wyrastających z jednego kłącza, rośnie na 50–100 cm. Kwiaty są zwykle wielobarwne, z ciemniejszymi wzorami z plamek. Podłoże powinno być przepuszczalne, próchnicze, żyzne i lekko kwaśne, stanowisko półcieniste, ale ciepłe i jasne. Podlewać systematycznie, nie doprowadzając do zastoin wody. U nas uprawiana jako roślina jednoroczna - nie jest odporna na polskie mrozy.”
- Fakty: Wysokość „50–100 cm” · Stanowisko „Półcień, ciepłe” · Zimowanie „Nie zimuje”
- Kolory: czerwony, czerwono-biały, biało-żółty, biało-różowy, lila, pomarańczowy
- Placeholder: „zdjęcie - alstromeria, 4:3”

**2. Pelargonia bluszczolistna** - grupa „Balkonowe”

- Podpis: „Klasyka balkonu - pędy zwisają, więc dobrze wygląda na balustradzie.”
- Opis: „Pędy osiągają do 100 cm długości, dlatego sadzi się ją w wiszących pojemnikach, kwietnikach i skrzynkach zawieszanych na balustradzie balkonu. Najlepiej rośnie w pełnym słońcu, jest łatwa w uprawie i odstrasza owady. Kwitnie nieprzerwanie od maja do pierwszych przymrozków, jeśli regularnie usuwa się przekwitłe kwiaty.”
- Fakty: Długość pędów „do 100 cm” · Stanowisko „Pełne słońce” · Kwitnienie „Maj – przymrozki”
- Kolory: czerwony, różowy, łososiowy, biały, lila, dwubarwny
- Placeholder: „zdjęcie - pelargonia bluszczolistna w skrzynce, 4:3”

**3. Chryzantema wielkokwiatowa** - grupa „Jesień”

- Podpis: „Uprawa jesienna, sprzedaż od początku października.”
- Opis: „Uprawiana w doniczkach, z jednym dużym kwiatem na pędzie. Wymaga stanowiska słonecznego i osłoniętego od wiatru oraz regularnego podlewania - w chłodne noce warto ją okryć. Na cmentarz i pod dom kupowana najczęściej w ostatnim tygodniu października; wtedy wybór kolorów jest największy, ale i ruch największy.”
- Fakty: Forma „Doniczkowa” · Stanowisko „Słońce, osłonięte” · Sprzedaż „1.10 – 1.11”
- Kolory: biały, żółty, bordowy, różowy, pomarańczowy, fioletowy
- Placeholder: „zdjęcie - chryzantema wielkokwiatowa, 4:3”

**⚠️ Skalowanie:** obecna strona klienta ma **kilkadziesiąt** takich wpisów (pelargonie kilku typów, surfinie, begonie, fuksje, aksamitki, szałwie, byliny…). Trzy powyższe to reprezentatywna próbka wzorca. W implementacji **potraktuj wpis rośliny jako komponent zasilany strukturą danych** (`{ name, group, image, caption, body, facts[3], colors[] }`) i zasil go pełną listą - do pobrania z obecnej strony lub od klienta. Przy kilkudziesięciu wpisach potrzebne będzie dodatkowo: filtrowanie po grupie (Balkonowe / Rabatowe / Wieloletnie / Chryzantemy) oraz podział na podstrony zgodnie z menu. **Filtr i paginacja nie są zaprojektowane** - wróć z tym do projektu przed implementacją.

### 5. Historia gospodarstwa (`id="historia"`)

Tło `#3D4A33`, tekst `#EEF0E6`. Dwie kolumny (`auto-fit, minmax(min(100%,300px),1fr)`, `align-items: start`).

Lewa: eyebrow „Historia gospodarstwa” (`0.7rem/600/0.2em uppercase`, `#C6D3B6`) → H2 „Rodzinna uprawa w Cholewiance” (`max-width: 24ch`) → akapit (`max-width: 54ch`, `#DDE2D2`): „Kwiaty prowadzimy rodzinnie - wiosną rozsady, obsadzone skrzynki i doniczki, jesienią chryzantemy wielkokwiatowe. Sprzedajemy tylko to, co sami wyhodowaliśmy, dlatego o każdej partii wiemy, kiedy była siana i czego będzie potrzebowała u kupującego.”

Prawa: placeholder 3:2 „zdjęcie archiwalne - gospodarstwo, 3:2”.

Pod akapitem: blok „Do napisania” (patrz sekcja _Bloki robocze_ niżej) - **usuń przy wdrożeniu.**

### 6. Kontakt (`id="kontakt"`)

Dwie kolumny (`auto-fit, minmax(min(100%,300px),1fr)`, `align-items: start`).

**Lewa:**

- H2 „Kontakt”
- Akapit: „Zamówienia przyjmujemy telefonicznie oraz na terenie gospodarstwa. Sklepu internetowego nie prowadzimy.” (`max-width: 46ch`, `#4C5344`)
- `<ul>` z czterema telefonami, `gap: 0.9rem`. Każde `<li>`: `display: grid; grid-template-columns: minmax(8ch, auto) minmax(0, 1fr); column-gap: 1rem; align-items: baseline; border-top: 1px solid #E0DDCE; padding-top: 0.7rem`.
  - **Stały tor `minmax(8ch, auto)` jest istotny** - wcześniejsza wersja używała `flex` + `min-width: 7ch` i numery startowały na czterech różnych pozycjach (defekt zgłoszony w recenzji). Trzymaj się gridu.
  - Imię: `0.66rem/600/0.16em uppercase`, `#5B6153`.
  - Numer: Instrument Serif `clamp(1.35rem,1.15rem+0.6vw,1.7rem)`, `#23281F`, `text-decoration: none`, `border-bottom: 1px solid #CFCBB8`, `min-height: 44px`, `inline-flex; align-items: center`. Hover: `#4E5C40` (tekst i kreska).

| Imię    | Numer       | `href`             |
| ------- | ----------- | ------------------ |
| Tadeusz | 602 518 401 | `tel:+48602518401` |
| Mateusz | 722 238 987 | `tel:+48722238987` |
| Łukasz  | 514 505 431 | `tel:+48514505431` |
| Jolanta | 662 760 375 | `tel:+48662760375` |

**Prawa:**

- Etykieta „Adres” + adres w Instrument Serif: „Cholewianka 36 / 24-120 Kazimierz Dolny / woj. lubelskie” (`<br>`).
- Placeholder mapy 4:3 z tekstem „mapa Google - wczytywana dopiero po zgodzie”.
- Link „Wyznacz trasę” → `https://www.google.com/maps/search/?api=1&query=Cholewianka+36+Kazimierz+Dolny`, `target="_blank" rel="noopener"`, styl jak CTA secondary.
- Blok „Do potwierdzenia” - **usuń przy wdrożeniu.**

**Mapa - wymóg RODO/cookies:** iframe Google Maps ustawia cookies stron trzecich. Placeholder jest celowy: mapa może się wczytać **tylko po zgodzie użytkownika**. Zaimplementuj jako click-to-load (placeholder z przyciskiem „Pokaż mapę Google” → dopiero wtedy wstrzyknij iframe) albo pod banerem zgody. Link „Wyznacz trasę” działa bez zgody - zostaw go zawsze widocznym jako alternatywę.

### 7. Stopka

Tło `#23281F`, tekst `#C3CBB8`, padding `clamp(2.25rem,5vw,3.5rem)`. Cztery kolumny (`auto-fit, minmax(min(100%,220px),1fr)`, `gap: 1.5rem 2.5rem`), pod nimi pasek `border-top: 1px solid rgb(238 240 230 / 18%)`, `padding-top: 1rem`.

1. Nazwa „Gospodarstwo Ogrodnicze „Saran”” (Instrument Serif `1.5rem`, `#EEF0E6`) + „Sprzedaż kwiatów balkonowych, rabatowych, wieloletnich i chryzantem wielkokwiatowych.” (`max-width: 34ch`).
2. „Adres”: Cholewianka 36 / 24-120 Kazimierz Dolny.
3. „Telefony”: cztery imiona z numerami, po `<br>`.
4. „Informacje”: Facebook (`https://www.facebook.com/p/Gospodarstwo-Ogrodnicze-Saran-100070553132348/`, `target="_blank" rel="noopener"`), Historia gospodarstwa (`#historia`), Polityka prywatności (`#` - **do napisania**).

Pasek dolny: „© 2026 Gospodarstwo Ogrodnicze „Saran”” po lewej, „makieta v3 · struktura wg obecnej strony” po prawej (`margin-inline-start: auto`) - **prawą etykietę usuń przy wdrożeniu.**

## Interactions & Behavior

Strona jest **statyczna i informacyjna** - brak formularzy, koszyka, logowania i stanów ładowania.

- **Nawigacja**: linki kotwiczące, `html { scroll-behavior: smooth }`, `scrollbar-gutter: stable` (zapobiega przeskokowi układu). Po rozbiciu na podstrony zamień na normalne linki.
- **Hover** - trzy wzorce, konsekwentnie w całej stronie:
  - Link menu: kolor `#3D4A33` → `#23281F`, `border-bottom-color: transparent` → `#4E5C40`.
  - Przycisk primary: tło `#3D4A33` → `#23281F`.
  - Link podkreślony (secondary CTA, telefon, „Wyznacz trasę”): kolor → `#4E5C40`, `border-bottom-color` → `#4E5C40`.
  - Bez `transition` w prototypie. Jeśli dodajesz, to najwyżej `120ms ease` na `color` i `background-color`.
- **Focus**: globalnie `:focus-visible { outline: 2px solid #4E5C40; outline-offset: 3px }`. Nie usuwać.
- **Cele dotykowe**: każdy element interaktywny ma `min-height: 44px` (menu 48px, przycisk primary 50px) przez `display: inline-flex; align-items: center`.
- **`tel:` linki** - wszystkie numery są klikalne, format `+48` bez spacji w `href`, ze spacjami w treści.
- **Responsywność**: bez media queries. Wszystko na `auto-fit` + `minmax` + `clamp()`. Kolumny łamią się same, typografia skaluje się płynnie. Sprawdzone od ~320px do 1400px+.
- **Animacje**: brak. Celowo - statyczna strona informacyjna, nic nie musi się ruszać.

## State Management

W wersji produkcyjnej strona **nie potrzebuje stanu klienta** poza dwoma rzeczami:

1. **Aktywny sezon** - w prototypie prop `season` (`"Wiosna" | "Lato" | "Jesień"`, domyślnie `"Jesień"`). W produkcji: wylicz z daty na serwerze/w czasie builda. Nie potrzeba React state.
2. **Zgoda na mapę Google** - jeden boolean, trwały w `localStorage`/cookie zgody. Jedyny prawdziwy stan klienta na tej stronie.

Prototyp ma jeszcze dwa propsy czysto prezentacyjne, **nie do przenoszenia**: `showAllEntries` (boolean - pokazuje 1 lub 3 wpisy roślin, do testowania rytmu układu) i `showPending` (boolean - pokazuje bloki „do potwierdzenia”).

## Bloki robocze - USUŃ PRZY WDROŻENIU

W prototypie są dwa bloki oznaczone kreskowanym obramowaniem (`1px dashed`), widoczne gdy `showPending === true`. **To notatki dla klienta, nie element projektu.** Usuń je razem z propsem `showPending`.

1. W sekcji Historia - „Do napisania”: pełna historia z obecnej strony (rok założenia, pokolenia, jak rosło gospodarstwo).
2. W sekcji Kontakt - „Do potwierdzenia”: godziny sprzedaży w sezonie i adres e-mail.

## Braki do uzupełnienia przed wdrożeniem

Kolejność ważności:

1. **Zdjęcia** - wszystkie. Potrzebne kadry: tunel z kwiatami balkonowymi (16:9), chryzantemy przed 1 listopada (16:9), po jednym zdjęciu na każdą roślinę (4:3), zdjęcie archiwalne gospodarstwa (3:2).
2. **Pełna lista roślin** z opisami, faktami i kolorami - kilkadziesiąt wpisów z obecnej strony. To największa porcja pracy nad treścią.
3. **Godziny sprzedaży w sezonie** i **e-mail** - klient nie podał.
4. **Tekst historii gospodarstwa** - na obecnej stronie jest podstrona „Historia Gospodarstwa”; treść trzeba przenieść.
5. **Polityka prywatności** - nie istnieje, trzeba napisać. Wymagana, bo strona linkuje mapę Google i Facebooka.
6. **Logo** - jeśli klient ma. Obecnie nazwa jest wyłącznie typograficzna.
7. **Projekt podstron** i filtrowania oferty - nie zaprojektowane, wróć z tym do designu.

## Assets

**Brak plików graficznych.** Wszystkie obrazy to placeholdery CSS: `background-color` + `repeating-linear-gradient(100deg, <kreska> 0 Npx, rgb(252 251 245 / 0%) Npx 2Npx)` (skos 100°, pasek 10–12px zależnie od rozmiaru bloku), `1px solid` obramowanie, wyśrodkowany monospace’owy opis wymaganego kadru. Po podstawieniu zdjęć placeholdery znikają - zachowaj `aspect-ratio` i obramowanie.

Fonty: Instrument Serif + Karla z Google Fonts. **Uwaga RODO:** Google Fonts z CDN przekazuje IP użytkownika do Google. Dla polskiej strony komercyjnej **hostuj fonty lokalnie** (`@font-face` z plikami woff2 na własnym serwerze) - obie rodziny są na licencji OFL, więc wolno.

Ikony: brak. Emoji: brak - celowo.

## Uwagi na koniec

- **Nie dodawaj** karuzel, gradientów, cieni, zaokrągleń, liczników, „naszych statystyk” ani sekcji opinii. Projekt jest celowo surowy i papierowy - cała jego wartość to spokój i czytelność treści merytorycznej o roślinach.
- **Nie skracaj opisów roślin.** Długie, konkretne opisy uprawy to najmocniejsza rzecz na obecnej stronie i główny powód, dla którego ludzie na nią trafiają z wyszukiwarki.
- **SEO** - obecna strona rankuje na nazwy roślin. Przy migracji zachowaj adresy URL podstron albo ustaw przekierowania 301.
- W plikach `.dc.html` szablon jest w `<x-dc>`, a logika w `<script type="text/x-dc">` na dole. Składnia `{{ ... }}` i `<sc-for>` / `<sc-if>` to konstrukcje środowiska prototypowego - w implementacji zamień na pętle i warunki docelowego frameworka.
