# Spark (SPIRLIT)

**SPIRLIT: connect in real life.** A friendship app where two people find what they genuinely share in minutes, then put the phone down and keep talking. It is built for friendship, not dating or networking.

This repo holds the **UI/UX design phase**: Figma exports, a coded click-through prototype and design docs. The mobile app is built in React Native from these designs.

| | |
|---|---|
| Figma file | `XLiQ9kb7aPBRImqt3OxQtE` ("Spark"), page **Final Design** (`71:4873`) |
| Final UI | section **Design** (`374:171`), the locked look for every new screen |
| Prototype | `figma-final-assets/prototype` (vanilla JS, runs on port 5174) |
| Design docs | [`docs/`](docs/) |

---

## 1. How Spark works

1. **Build a profile.** Answer a short Quick Spark (10 questions), the full profile (24) or both. Every question is skippable.
2. **Spark.** Meet someone nearby, scan their Spark QR code or send a private invite link. Nothing is shared until **both** people accept (mutual consent gate).
3. **See what you share.** Both people get a small, ranked set of common ground: specific overlaps like the same coffee shop beat broad labels. Each one opens 3–5 story-style prompts. There are **no match percentages**.
4. **Re-Spark.** About 24 hours later each person privately chooses to keep the connection. A mutual yes keeps it; any no closes it quietly without saying who declined.
5. **Core Connections.** People you keep sparking with join your core circle, which unlocks the deeper profile (favourite things, important dates, a personal note).

---

## 2. Design system

### Look

| Mode | Used for | Style |
|---|---|---|
| **Dark** | Onboarding, profile questions, scanner | Royal / deep blue base with the animated **Deep Sea** nebula glow, white text, glass chips, Light Blue selected states |
| **Light** | Home, Nearby, Chats, Events, Profile, Settings | Light-sky gradient `#DDEBF7 → #F7F9FC`, white cards or flat white sections, Ink text |

"Night and day": dark for self-reflection, light for browsing and connecting.

### Colors

The full palette is in the Figma **Colors** section (`612:2626`).

| Role | Token | Hex |
|---|---|---|
| Primary | Dark Blue *(variable)* | `#053B65` |
| Primary | Light Blue *(variable)* | `#7AD5FE` |
| Selected state | Light Blue 16% fill + Light Blue outline | `#7AD5FE` @ 16% |
| Links | Link Blue | `#0E6BA8` |
| Text | Ink / Slate / Mist | `#0B1F33` / `#5B6B7C` / `#8A97A5` |
| Dark base | Royal | `#0C2558` |
| Lines | Divider / Card border | `#E6ECF1` / `#E3ECF5` |
| Status | Online / Alert / Danger | `#22C55E` / `#E24B4A` / `#C93C3C` |
| Neutrals | Neutral 50–950 *(variables)* | `#FAFAFA` → `#0A0A0A` |

Only two brand blues. On light screens, blue **text** uses Dark Blue (Light Blue text is too faint); selected = Light Blue fill with Dark Blue content.

### Type and components

- **Inter Display** for headings and body. The wordmark is Outfit SemiBold, letter-spaced.
- **Bottom nav:** floating Dark Blue pill with 5 tabs (Home, Nearby, Calendar, Chats, Profile); the active tab is a Light Blue pill with a label. Figma components `Nav` (`566:2661`) and `Nav Atom` (`566:2610`).
- Real or stock photography only, no AI-generated images.

---

## 3. Screens (Figma)

All on page **Final Design**. IDs are Figma node IDs; frames get moved and duplicated, so look them up by name if an ID has gone.

### Sign up and log in
Splash, Get Started, Create account, Verify email, Birthday (18+), Gender (incl. non-binary and prefer not to say), Add photos, Location, Notifications, Log in, Forgot password. Header `377:160`.

### Profile questions
| Flow | Where | Status |
|---|---|---|
| **Complete Profile v2**: Quick Spark (10) → Go deeper (14) → Lightning Round (33, optional) | section `696:3201` | **Current**, see [`docs/complete-profile-v2.md`](docs/complete-profile-v2.md) |
| Quick Spark v2 + Lightning Round | section `619:2492` | Current (source for the above) |
| Merged flow diagram | frame `693:3127` | Reference |
| Old 25 questions in 4 chapters, old 8-question Quick Spark | in `374:171` (headers `399:354`, `479:1169`) | Superseded |

### Main app
| Area | Screens |
|---|---|
| Home | Home variants with Core Connection row, Spark Requests, Events |
| Nearby | Nearby grid (photo cards, distance in ft/mi), Filter |
| Chats | Chats · core connections, Chat, Chat · Photo sent, Chat · Empty |
| Spark moments | Once Both Spark, First Time Re-Spark, Second Time Re-Spark (adds to Core), Added to Core |
| Events | Event · Public, Event · Private (invite only), Event Scroll |
| QR | My Spark QR Code, My Spark QR Share (native share sheet), Scan QR code |
| Profile | Profile, Settings, Who to spark with, Age group, Core Connections |
| Mood board | section `302:2932` |

---

## 4. Product rules decided so far

**Onboarding and profile**
- Gender preference and age range are **not** onboarding steps. Default is open to everyone; filters live in Settings.
- The profile builds itself from answers. Answers are editable any time from the profile, and each can be hidden.
- Hobby-style questions use **Want to / I do**: one tap = want to try, two taps = do it.
- Quick Spark and the complete profile share one question bank; the Lightning Round is shared too.
- Private questions (close friendships, loneliness) are only used for matching.

**Discovery and privacy**
- Nearby shows distance only, never exact location. Users can hide from Nearby or pause any time.
- Nearby / discovery profiles are lightweight; full answers unlock after a Spark.
- Block and Report live on other people's profiles; Settings keeps the Blocked people list.

**Connections**
- Re-Spark prompt about 24 h after a session; declines close quietly.
- Core circle has a cap (placeholder: Free 10, Pro 30).

**Plans** *(all numbers and prices are placeholders, set in admin)*
- **Free:** 10 core connections, limited daily Sparks, 1 question pack, basic Self Insight.
- **Pro:** 30 core connections, unlimited Sparks, see who wants to Spark, change location, more packs, full Self Insight.
- **Premium (optional):** all packs, monthly Self Insight, unlimited private events.

---

## 5. Scope (MVP)

Accounts and onboarding · 24-question profile + Quick Spark + Lightning Round · in-person Spark via branded QR · Nearby grid · online invitation Spark · Event Mode · mutual consent gate · shared Spark ranking and prompts · delayed matching queue · session close and Re-Spark · Core Connections · AI self-insight report and shareable summary card · safety (block, report, hide, delete account) · referrals and leaderboard · badges · subscriptions and question packs · admin panel · iOS and Android (React Native).

---

## 6. Prototype

A clickable, coded version of the onboarding and profile flow.

```powershell
node figma-final-assets/prototype/server.js
```

Then open http://localhost:5174. It uses the Deep Sea background and Lucide icons.

> The prototype still runs the **old** 25-question / 4-chapter flow. It has not been updated to Complete Profile v2 yet.

---

## 7. Repo layout

```
docs/                     Design docs (Complete Profile v2, ...)
figma-final-assets/
  prototype/              Coded prototype: index.html, app.js, styles.css, server.js, assets/
  auth/ profile/ hobbies/ Exported screen assets
  motion/                 Exported motion (Deep Sea nebula MP4)
  preview-*.html          Early HTML explorations
figma-final-canvas/       Design canvas project files
.claude/launch.json       Preview config for the prototype
```

---

## 8. Open questions

- Should Social energy return to Quick Spark? It is used for matching.
- How many sparks make someone "core", and the final core cap.
- When contact details are exchanged between connections.
- Event Mode: the scope describes organiser-run Spark spaces (entry code, time window, participant cap); the current event screens are social events. Confirm both or pick one.
- Moderation split (AI vs human) and bot protection on mobile.
- Movie / music list size and data source.
- Some old profile question endings still need the client's confirmation.
