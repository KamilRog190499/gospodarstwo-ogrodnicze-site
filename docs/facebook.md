# Posty z Facebooka na stronie głównej

Na stronie głównej, między obsadzeniami a mapą, jest blok **„Co u nas słychać”** z trzema
ostatnimi wpisami z profilu gospodarstwa na Facebooku. Nikt nie przepisuje ich ręcznie —
raz dziennie robi to za nas skrypt.

Ten dokument opisuje, jak to działa, co trzeba zrobić raz na starcie i co zrobić, kiedy
przestanie działać.

## Co dokładnie trafia na stronę

Codziennie o 5:23 rano skrypt pyta Facebooka o ostatnie wpisy z profilu i zapisuje w projekcie
**trzy najnowsze**: tekst, datę, link do wpisu i zdjęcie. Potem strona się przebudowuje.

- **Tekst wpisu nie jest przerabiany.** Jest tylko skracany do ok. 200 znaków, a pod nim jest
  link „Czytaj całość na Facebooku”. Emoji zostają.
- **Zdjęcia są pobierane na nasz serwer**, a nie wyświetlane z Facebooka. To ważne z dwóch
  powodów: linki do zdjęć na Facebooku wygasają po kilku dniach (zdjęcia zmieniłyby się w
  krzyżyki), a poza tym przeglądarka odwiedzającego w ogóle nie łączy się z Facebookiem —
  dzięki temu blok nie wymaga pytania o zgodę, tak jak wymaga go mapa Google.
- **Pomijane są wpisy, które nie mają ani tekstu, ani zdjęcia.** Poza tym filtru nie ma.

> **Rzecz do świadomej zgody właścicieli.** Publikacja jest w pełni automatyczna — nikt nie
> przegląda wpisów przed ich pojawieniem się na stronie. Każdy wpis na profilu, także
> przypadkowy albo prywatny w tonie, trafi na stronę firmy w ciągu doby. Jeśli coś ma tam nie
> trafić, trzeba to usunąć albo ukryć na Facebooku — zniknie ze strony przy najbliższym
> odświeżeniu.

Usunięcie wpisu na Facebooku usuwa go też ze strony (razem ze zdjęciem) przy następnym
przebiegu.

## Co trzeba przygotować raz, na starcie

Bez tego blok nie pokaże niczego — strona po prostu go nie wyświetli, bez żadnego błędu.

Potrzebne są dwie wartości, wpisywane w ustawieniach repozytorium na GitHubie
(**Settings → Secrets and variables → Actions**):

| Nazwa             | Co to jest                                 |
| ----------------- | ------------------------------------------ |
| `FB_PAGE_ID`      | Numer identyfikacyjny strony na Facebooku  |
| `FB_ACCESS_TOKEN` | Długoterminowy token dostępu do tej strony |

Żeby je zdobyć:

1. Osoba, która jest **administratorem strony gospodarstwa na Facebooku**, zakłada aplikację na
   <https://developers.facebook.com/> (typ „Business”). Aplikacja może zostać w trybie
   deweloperskim — **nie trzeba przechodzić App Review**, dopóki ta sama osoba jest
   administratorem i aplikacji, i strony. To oszczędza tygodnie oczekiwania.
2. W **Graph API Explorer** wybiera tę aplikację i tę stronę, zaznacza uprawnienia
   `pages_show_list` oraz `pages_read_engagement` i generuje token użytkownika.
3. W **Access Token Debugger** klika „Extend Access Token” — powstaje token długoterminowy
   (60 dni).
4. Tym długim tokenem pobiera token strony (`/me/accounts`). **Token strony wygenerowany z
   długiego tokenu użytkownika nie ma daty ważności** — i to jego wpisujemy jako
   `FB_ACCESS_TOKEN`.
5. `FB_PAGE_ID` jest w tej samej odpowiedzi, w polu `id`.

## Kiedy przestanie działać

Token strony nie wygasa sam z siebie, ale przestaje działać, gdy:

- właściciel tokenu zmieni hasło do Facebooka,
- straci rolę administratora strony,
- Facebook wymusi ponowne logowanie ze względów bezpieczeństwa,
- aplikacja zostanie usunięta lub zawieszona.

**Po czym to poznać:** codzienne zadanie na GitHubie kończy się błędem i GitHub wysyła o tym
maila właścicielowi repozytorium. W logu jest wtedy zdanie:

```
fetch-facebook: the Page Access Token is no longer valid (OAuthException 190: ...)
```

To jedyny alarm, jaki tu jest — jeśli nikt nie czyta tych maili, feed potrafi stać w miejscu
tygodniami i nic tego nie zgłosi.

**Co zrobić:** powtórzyć kroki 2–4 powyżej i podmienić `FB_ACCESS_TOKEN` w ustawieniach
repozytorium. Nic więcej. Strona przez cały ten czas pokazuje ostatnie pobrane wpisy — nie
znika i nie pustoszeje, jest tylko nieaktualna.

## Uruchomienie ręczne

Na GitHubie: **Actions → „Odświeżenie postów z Facebooka” → Run workflow**.

Lokalnie, do sprawdzenia:

```bash
FB_PAGE_ID=... FB_ACCESS_TOKEN=... npm run fetch:facebook
```

Skrypt albo kończy się powodzeniem i podmienia `src/data/facebook-posts.json` oraz zawartość
`src/assets/facebook/`, albo kończy się błędem i **nie rusza niczego** — nie ma stanu pośredniego.

## Pliki

| Plik                                  | Rola                                             |
| ------------------------------------- | ------------------------------------------------ |
| `scripts/fetch-facebook.mjs`          | Pobiera wpisy i zdjęcia.                         |
| `src/data/facebook-posts.json`        | Zapisane wpisy. **Generowany — nie edytować.**   |
| `src/assets/facebook/`                | Zapisane zdjęcia. **Generowane — nie edytować.** |
| `src/data/facebook.ts`                | Wczytuje jedno i drugie, nadaje typy.            |
| `src/components/FacebookNews.astro`   | Blok na stronie głównej.                         |
| `.github/workflows/facebook-feed.yml` | Codzienne odświeżanie.                           |
