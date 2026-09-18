# Posty z Facebooka na stronie głównej

Na stronie głównej, **zaraz pod nagłówkiem i zdjęciem wejściowym**, jest blok
**„Co u nas słychać”** z dwoma ostatnimi wpisami z profilu gospodarstwa na Facebooku. Nikt nie
przepisuje ich ręcznie - raz dziennie robi to za nas skrypt.

Ten dokument opisuje, jak to działa, co trzeba zrobić raz na starcie i co zrobić, kiedy
przestanie działać.

## Co dokładnie trafia na stronę

Codziennie o 5:23 rano skrypt pyta Facebooka o ostatnie wpisy z profilu i zapisuje w projekcie
**dwa najnowsze**. Potem strona się przebudowuje.

> **Dlaczego dwa, a nie trzy.** Przy dwóch kartach każda jest o połowę szersza, więc mieści się
> w niej znacznie więcej Państwa tekstu, zanim pojawi się przycisk „Pokaż więcej”, a zdjęcia są
> wyraźnie większe. To, że gospodarstwo żyje, mówi data przy wpisie („3 dni temu”), a nie liczba
> kafelków. Jeśli okaże się, że to za mało, wrócenie do trzech to jedna linijka w kodzie.

Każdy wpis wygląda na stronie tak, jak wygląda na Facebooku:

- **nazwa profilu i zdjęcie profilowe** u góry karty, a obok data - „3 dni temu”, „2 tygodnie
  temu”. Dokładny dzień pokazuje się po najechaniu myszką;
- **tekst wpisu**, w całości. Jeśli jest długi, karta pokazuje cztery linijki i przycisk
  **„Pokaż więcej”**, który rozwija resztę **na stronie** - nie trzeba nigdzie przechodzić;
- **oznaczone osoby i strony, hashtagi i linki** są klikalne, tak samo jak na Facebooku;
- **zdjęcia.** Jeśli wpis ma ich kilka, karta pokazuje je jako przewijany pasek ze
  wskaźnikiem - można przesuwać palcem, strzałkami albo poczekać, aż same się przewiną.
  Kliknięcie w zdjęcie otwiera je na pełnym ekranie;
- **filmy** odtwarzają się na stronie. Film ładuje się dopiero, gdy ktoś naciśnie „play”;
- **liczba reakcji, komentarzy i udostępnień**;
- link **„Zobacz na Facebooku”** do oryginalnego wpisu.

Zasady, które są tu ważne:

- **Tekst wpisu nie jest przerabiany ani skracany.** Emoji zostają. To Państwa słowa, w
  Państwa brzmieniu.
- **Zdjęcia i filmy są pobierane na nasz serwer**, a nie wyświetlane z Facebooka. To ważne z
  dwóch powodów: linki do zdjęć na Facebooku wygasają po kilku dniach (zdjęcia zmieniłyby się
  w krzyżyki), a poza tym przeglądarka odwiedzającego w ogóle nie łączy się z Facebookiem -
  dzięki temu blok nie wymaga pytania o zgodę, tak jak wymaga go mapa Google. To samo zdanie
  stoi w polityce prywatności.
- **Bardzo duży film (powyżej 12 MB) nie jest pobierany.** Wpis i tak się pojawia - z klatką z
  filmu i linkiem do Facebooka, tylko bez odtwarzania na miejscu. Powód jest prozaiczny: każdy
  pobrany film zostaje w archiwum projektu na stałe.
- **Pomijane są wpisy, które nie mają ani tekstu, ani zdjęcia.** Poza tym filtru nie ma.
- **Jeśli najnowszy wpis ma więcej niż 60 dni**, blok przestaje pokazywać wpisy i wraca do
  krótkiej informacji, że piszemy na Facebooku. To zabezpieczenie: lepiej nie pokazywać nic,
  niż pokazywać jako „aktualności” coś sprzed kwartału.

> **Rzecz do świadomej zgody właścicieli.** Publikacja jest w pełni automatyczna - nikt nie
> przegląda wpisów przed ich pojawieniem się na stronie. Każdy wpis na profilu, także
> przypadkowy albo prywatny w tonie, trafi na stronę firmy w ciągu doby, razem ze zdjęciami,
> filmem i licznikami reakcji. Jeśli coś ma tam nie trafić, trzeba to usunąć albo ukryć na
> Facebooku - zniknie ze strony przy najbliższym odświeżeniu.

Usunięcie wpisu na Facebooku usuwa go też ze strony (razem ze zdjęciami i filmem) przy
następnym przebiegu.

## Co trzeba przygotować raz, na starcie

Bez tego blok pokazuje tylko jedno zdanie o tym, że piszemy na Facebooku, i przycisk do
profilu - żadnego błędu, żadnej pustej ramki.

Potrzebne są dwie wartości, wpisywane w ustawieniach repozytorium na GitHubie
(**Settings → Secrets and variables → Actions**):

| Nazwa                  | Co to jest                                        |
| ---------------------- | ------------------------------------------------- |
| `FB_PAGE_ID`           | Numer identyfikacyjny strony na Facebooku         |
| `FB_SYSTEM_USER_TOKEN` | Długoterminowy token tzw. użytkownika systemowego |

**Dlaczego użytkownik systemowy, a nie zwykły token strony.** Facebook przeniósł strony na
tzw. _New Pages Experience_ i w tym trybie zwykły token użytkownika nie przeczyta już listy
wpisów - odpowiada błędem, który brzmi jak brak uprawnień, a nim nie jest. Token użytkownika
systemowego jest przypisany do firmy, a nie do czyjegoś prywatnego konta, więc nie przestaje
działać, kiedy ktoś zmieni sobie hasło na Facebooku. Skrypt sam wymienia go przy każdym
uruchomieniu na token strony - tego drugiego nigdzie nie zapisujemy.

Żeby je zdobyć:

1. Osoba, która jest **administratorem strony gospodarstwa** i ma dostęp do
   **Meta Business Suite**, wchodzi w **Ustawienia firmy → Użytkownicy → Użytkownicy
   systemowi** i dodaje użytkownika systemowego (rola: _Employee_ wystarczy).
2. Klika **Przypisz zasoby** i przypisuje mu **stronę gospodarstwa**, z uprawnieniem
   pozwalającym czytać jej treści.
3. Klika **Wygeneruj nowy token**, wybiera aplikację (jeśli jej nie ma, zakłada ją na
   <https://developers.facebook.com/>, typ „Business”; **App Review nie jest potrzebne**,
   dopóki ta sama firma jest właścicielem aplikacji i strony) i zaznacza uprawnienia
   `pages_show_list` oraz `pages_read_engagement`.
4. Przy generowaniu warto ustawić **brak daty wygaśnięcia** („Never”), jeśli Facebook to
   proponuje. Wygenerowany ciąg znaków to `FB_SYSTEM_USER_TOKEN`. **Widać go tylko raz** -
   trzeba go od razu skopiować do GitHuba.
5. `FB_PAGE_ID` to numer strony; widać go w **Meta Business Suite → Ustawienia strony →
   Informacje o stronie**, na dole.

## Kiedy przestanie działać

Token użytkownika systemowego jest trwalszy od zwykłego, ale przestaje działać, gdy:

- zostanie ręcznie unieważniony w ustawieniach firmy,
- użytkownikowi systemowemu odbierze się dostęp do strony,
- aplikacja zostanie usunięta albo zawieszona,
- (jeśli przy generowaniu ustawiono datę ważności) po prostu minie ten termin.

**Po czym to poznać:** codzienne zadanie na GitHubie kończy się błędem i GitHub wysyła o tym
maila właścicielowi repozytorium. W logu jest wtedy zdanie zaczynające się od
`fetch-facebook:` - albo o tym, że token jest nieważny, albo o tym, że użytkownik systemowy nie
ma dostępu do tej strony (wtedy rzecz jest do naprawienia w **Ustawieniach firmy**, nie w
tokenie).

To jedyny alarm, jaki tu jest - jeśli nikt nie czyta tych maili, feed potrafi stać w miejscu
tygodniami. Po dwóch miesiącach blok sam przestaje pokazywać stare wpisy (patrz wyżej), ale to
zabezpieczenie, a nie powiadomienie.

**Co zrobić:** powtórzyć kroki 3–4 powyżej i podmienić `FB_SYSTEM_USER_TOKEN` w ustawieniach
repozytorium. Nic więcej. Strona przez cały ten czas pokazuje ostatnie pobrane wpisy - nie
znika i nie pustoszeje, jest tylko nieaktualna.

## Uruchomienie ręczne

Na GitHubie: **Actions → „Refresh the Facebook feed” → Run workflow**.

Lokalnie, do sprawdzenia:

```bash
FB_PAGE_ID=... FB_SYSTEM_USER_TOKEN=... npm run fetch:facebook
```

Skrypt albo kończy się powodzeniem i podmienia `src/data/facebook-posts.json` oraz zawartość
`src/assets/facebook/`, albo kończy się błędem i **nie rusza niczego** - nie ma stanu
pośredniego. Wszystko pobiera najpierw do katalogu roboczego i podmienia dopiero wtedy, gdy ma
komplet.

## Pliki

| Plik                                  | Rola                                                     |
| ------------------------------------- | -------------------------------------------------------- |
| `scripts/fetch-facebook.mjs`          | Pobiera wpisy, zdjęcia i filmy.                          |
| `src/data/facebook-posts.json`        | Zapisane wpisy. **Generowany - nie edytować.**           |
| `src/assets/facebook/`                | Zapisane zdjęcia i filmy. **Generowane - nie edytować.** |
| `src/data/facebook.ts`                | Wczytuje jedno i drugie, nadaje typy.                    |
| `src/components/FacebookNews.astro`   | Pasek z trzema kartami na stronie głównej.               |
| `src/components/FacebookPost.astro`   | Jedna karta - wygląd i układ wpisu.                      |
| `src/scripts/facebook-news.ts`        | Data względna, przewijanie zdjęć, „Pokaż więcej”.        |
| `.github/workflows/facebook-feed.yml` | Codzienne odświeżanie.                                   |
