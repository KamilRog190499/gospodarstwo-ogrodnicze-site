/** Stand-in posts for when there is no snapshot.
 *
 *  Used on a fresh clone and on any machine without a Facebook token - which today is every
 *  machine, because the secrets have never been issued (docs/facebook.md). Without this the
 *  section would be nothing but its empty state in `npm run dev`, and the card, the carousel
 *  and the styles could only be looked at by whoever holds the credentials.
 *
 *  **It never reaches production, and not by luck:** `facebook.ts` reads it only under
 *  `import.meta.env.DEV`. These posts carry the holding's page name on screen, so shipping
 *  them would mean publishing invented sentences under the owners' byline - the same rule
 *  that keeps a guessed answer off `/faq/` and a guessed fact out of a plant entry, and the
 *  one place on this site where breaking it would put words in their mouths. A production
 *  build with no snapshot renders the empty state instead.
 *
 *  The posts are deliberately the shapes the card has to survive, because the section shows
 *  every post without filtering: text with one photograph, text alone, a photograph alone,
 *  and a post with a whole roll of them.
 *
 *  **Only the first three ever reach the screen** - `FacebookNews.astro` slices the list at
 *  three - so the shapes worth looking at have to be in those three, and the rest is a bench.
 *  To look at one of the later ones, move it up; nothing else has to change. The first three
 *  are the ones that decide how the row composes: a post far past the clamp, a post carrying
 *  an address no browser can break, and a post with no text at all, side by side - the
 *  arrangement most likely to pull the four subgrid rows out of line.
 *
 *  The photographs are the holding's own, borrowed from `src/assets/` because the repository
 *  has no Facebook files until the first refresh. They are stand-ins for the frame, not
 *  claims about what the page posted.
 *
 *  The text is invented for this file. It is not written by the owners and must never be
 *  presented as theirs.
 */

import type { FacebookPost } from "./facebook";

import photo01 from "../assets/chrysanthemums/cultivation-rows.jpg";
import photo02 from "../assets/gallery/gallery-03.jpg";
import photo03 from "../assets/gallery/gallery-08.jpg";
import photo04 from "../assets/gallery/gallery-12.jpg";
import photo05 from "../assets/gallery/gallery-05.jpg";
import photo06 from "../assets/balcony/baskets-03.jpg";
import photo07 from "../assets/balcony/rows-02.jpg";
import photo08 from "../assets/gallery/gallery-17.jpg";
import photo09 from "../assets/balcony/baskets-09.jpg";
import photo10 from "../assets/gallery/gallery-21.jpg";
import photo11 from "../assets/chrysanthemums/offer-02.jpg";
import photo12 from "../assets/gallery/gallery-14.jpg";
import photo13 from "../assets/balcony/pots-01.jpg";
import photo14 from "../assets/gallery/gallery-02.jpg";
import avatar from "../assets/farm/konskowola-stand.jpg";

/** Stands in for the page's own profile picture, which in production is downloaded from
 *  Facebook alongside the photographs. Without it the header rendered a card with no avatar
 *  at all in `astro dev` - which is not what anyone sees on the live site, and hides whatever
 *  the header does when there is one. */
export const fixtureAvatar = avatar;

/** Stands in for the page's name, which in production comes from the snapshot. */
export const fixturePageName = "Gospodarstwo Ogrodnicze Saran";

/** Dates relative to the build rather than fixed ones.
 *
 *  The card prints a relative date - "3 dni temu" - so a fixed date would have the fixture
 *  ageing on screen and eventually reading as a dead page, which is the one thing a fixture
 *  must not rehearse. Counting back from today keeps it saying what it is there to say.
 *  (It also used to matter for a reason that has since gone: a `MAX_AGE_DAYS` fuse in
 *  `facebook.ts` would have stopped the fixture rendering after two months. The owners had
 *  that fuse removed in September 2026.)
 */
function daysAgo(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}

export const fixturePosts: FacebookPost[] = [
  {
    /* Visible. Text well past the four-line clamp, in four paragraphs, so the cut falls
       mid-sentence and the hard breaks `white-space: pre-line` keeps fall inside the clamped
       region rather than after it. The paragraph the reader never sees is the point: this is
       the card when the owners write at length, which they do. */
    id: "fixture-1",
    message:
      "Chryzantemy w tunelach już się zawiązują 🌼 W tym roku posadziliśmy ich więcej niż zwykle, więc na Wszystkich Świętych powinno starczyć dla wszystkich.\n\nZdjęcia z tegorocznej wystawy w Końskowoli zrobiła Anna Wiśniewska, dziękujemy!\n\nSprzedaż zaczynamy 1 października i trwa do 1 listopada. Doniczki w trzech rozmiarach, kolory jak co roku - od białych przez żółte i bordowe po te fioletowe, za którymi wszyscy pytają.\n\nZamówienia przyjmujemy telefonicznie albo na miejscu w Cholewiance. Kto chce większą ilość, niech dzwoni wcześniej - w ostatnim tygodniu października nie nadążamy odbierać.",
    /* The one tagged name in the fixture, and it is placed after an emoji on purpose.
       Facebook counts `offset` in code points; JavaScript indexes a string in UTF-16 units,
       and the flower in the first line is a surrogate pair - so here the two disagree by
       exactly one. Anything slicing the raw string renders " Anna Wiśniewsk" and looks almost
       right, which is the worst way for a bug to look. No other post in this file would let
       that through. */
    tags: [
      {
        id: "100000000000001",
        name: "Anna Wiśniewska",
        // A person, so this mention points at the post rather than at the id - the id
        // Facebook gives for a person is app-scoped and opens nothing.
        type: "user",
        offset: 203,
        length: 15,
      },
    ],
    publishedAt: daysAgo(3),
    permalink: "https://www.facebook.com/",
    media: [{ kind: "photo", image: photo01 }],
    reactions: 87,
    comments: 14,
    shares: 3,
  },
  {
    /* Visible. A stress test rather than copy: the address and the hashtag chain are single
       tokens with nowhere to break, which is the case that pushes a grid column wider than
       its share and takes the whole row sideways with it. If the card survives this it
       survives anything the owners paste in. An album of five with a film among them, so the
       carousel and the preview overlay are exercised on the same card.

       The address sits on the second line deliberately. Below the four-line clamp it would be
       cut off unseen and the test would pass without ever running. */
    id: "fixture-2",
    message:
      "Kiermasz wiosenny w Kazimierzu - stoimy tam całą sobotę, szczegóły pod tym adresem:\nhttps://www.facebook.com/events/1234567890123456/?acontext=%7B%22event_action_history%22%3A%5B%7B%22surface%22%3A%22page%22%7D%5D%7D\n#kwiatyBalkonowe #gospodarstwoOgrodniczeSaran\n\nZabieramy pelargonie, surfinie i pierwsze bratki. Kto nie dojedzie, tego zapraszamy do Cholewianki - wszystko to samo, tylko prosto z tunelu.",
    tags: [],
    publishedAt: daysAgo(8),
    permalink: "https://www.facebook.com/",
    /* `src: null` on the film, as in fixture-3: the repository carries no video file, so
       locally this behaves like a film too large to have been copied - a poster with its
       badge, which the overlay will enlarge because there is no play button for a link to
       swallow. With a real snapshot the film plays in the card and drops out of the overlay
       instead. */
    media: [
      { kind: "photo", image: photo02 },
      { kind: "photo", image: photo03 },
      { kind: "video", image: photo04, src: null, seconds: 72 },
      { kind: "photo", image: photo05 },
      { kind: "photo", image: photo06 },
    ],
    reactions: 52,
    comments: 6,
    shares: 2,
  },
  {
    /* Visible. A post that is only a photograph - normal on Facebook, and the reason the card
       keeps the text block's height even when there is nothing to put in it. Beside the two
       above it is the card that shows whether the subgrid rows really hold: its photograph
       has to start level with theirs across four lines of nothing. */
    id: "fixture-3",
    message: "",
    tags: [],
    publishedAt: daysAgo(15),
    permalink: "https://www.facebook.com/",
    /* This post is a film. `src: null` - the repository carries no video file, so locally the
       card shows the poster and the badge with nothing to play. With a real snapshot `src` is
       filled in and the film plays. */
    media: [{ kind: "video", image: photo07, src: null, seconds: 45 }],
    reactions: 41,
    comments: 9,
    shares: 1,
  },

  /* ---------- the bench ----------
     Below the slice of three. Move one up to look at it. */

  {
    /* Text alone, no photograph at all - the card with its media row empty. Long enough to
       reach the clamp, so a clamped text block with nothing under it can be judged. */
    id: "fixture-4",
    message:
      "Od poniedziałku mamy w sprzedaży pierwsze bratki i prymulki. Skrzynki i doniczki jak zwykle na miejscu.\n\nPrzy większych zamówieniach prosimy dzwonić dzień wcześniej - marzec to u nas tydzień, w którym wszystko schodzi naraz i szkoda, żeby ktoś przyjechał na pusto.\n\nW deszczu też jesteśmy, tylko pod folią. Kalosze własne.",
    tags: [],
    publishedAt: daysAgo(22),
    permalink: "https://www.facebook.com/",
    media: [],
    reactions: 23,
    comments: 4,
    // Facebook omits the field at zero, so the fixture carries null rather than 0 - otherwise
    // the card variant with no shares would never be exercised in dev.
    shares: null,
  },
  {
    /* The boundary: text that runs to about four lines in a desktop column. No cut and no
       leftover space - the length at which the clamp is invisible, and the one that says
       whether the reserved row is the right height. */
    id: "fixture-5",
    message:
      "Pierwsze surfinie wyszły z tunelu na zewnątrz. Jeszcze tydzień i będą gotowe do sprzedaży, a wtedy damy znać tutaj.",
    tags: [],
    publishedAt: daysAgo(29),
    permalink: "https://www.facebook.com/",
    media: [{ kind: "photo", image: photo08 }],
    reactions: 64,
    comments: 11,
    shares: 5,
  },
  {
    /* The long roll: nine photographs, which is the carousel with more dots than the chip was
       drawn for. Worth looking at on a phone, where the chip has the least room. One short
       line of text above it, so the dots are the only thing under test. */
    id: "fixture-6",
    message: "Cała sobota w jednym wpisie.",
    tags: [],
    publishedAt: daysAgo(34),
    permalink: "https://www.facebook.com/",
    media: [
      { kind: "photo", image: photo09 },
      { kind: "photo", image: photo10 },
      { kind: "photo", image: photo11 },
      { kind: "photo", image: photo12 },
      { kind: "photo", image: photo13 },
      { kind: "photo", image: photo14 },
      { kind: "photo", image: photo01 },
      { kind: "photo", image: photo05 },
      { kind: "photo", image: photo07 },
    ],
    reactions: 118,
    comments: 27,
    shares: 9,
  },
  {
    /* Many short hard breaks rather than paragraphs - a list, which is how the owners write
       what is in sale this week. `white-space: pre-line` keeps every one of them, so the
       clamp bites after four short lines instead of four full ones and the card ends up
       mostly empty. That is the case where the four-line reservation looks worst. */
    id: "fixture-7",
    message:
      "W tym tygodniu na miejscu:\npelargonie rabatowe\npelargonie bluszczolistne\nsurfinie\nbakopa\nlobelia\nniecierpek nowogwinejski\naksamitki",
    tags: [],
    publishedAt: daysAgo(41),
    permalink: "https://www.facebook.com/",
    media: [{ kind: "photo", image: photo11 }],
    reactions: 31,
    comments: 2,
    shares: null,
  },
  {
    /* The counters at their widest: five figures on the reactions, and shares present rather
       than null. Facebook returns these as plain numbers, so the footer has to hold all three
       without wrapping the row. */
    id: "fixture-8",
    message:
      "Nie spodziewaliśmy się, że to nagranie kogokolwiek obejdzie. Dziękujemy - i tak, te chryzantemy naprawdę są tej wielkości.",
    tags: [],
    publishedAt: daysAgo(47),
    permalink: "https://www.facebook.com/",
    media: [{ kind: "video", image: photo13, src: null, seconds: 18 }],
    reactions: 24817,
    comments: 1943,
    shares: 5602,
  },
];
