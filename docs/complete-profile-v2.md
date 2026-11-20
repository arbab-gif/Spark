# Complete Profile v2

The complete profile and Quick Spark now share **one question bank**. Quick Spark is the first 10 questions of the complete profile, so nobody answers the same question twice. The Lightning Round is a shared, optional round at the end.

Figma file: `XLiQ9kb7aPBRImqt3OxQtE`, page **Final Design**

| What | Figma node |
|---|---|
| Screens: Complete Profile v2 · Quick Spark + Go deeper + Lightning Round | `696:3201` |
| Flow diagram: Merged profile flow | `693:3127` |
| Source: Quick Spark v2 · 10 questions + Lightning Round | `619:2492` |
| Old 25-question flow (kept for reference) | inside `374:171` (Design) |

## Structure

| Step | Name in the app | Questions | Time | Required |
|---|---|---|---|---|
| 1 | **Quick Spark** | 10 (Q1–Q10) | ~3 min | Yes |
| 2 | **Go deeper** | 14 (Q11–Q24) | ~10 min | No, can stop after Quick Spark |
| Bonus | **Lightning Round · just for fun** | 33 quick picks | ~2 min | No |

Every question is skippable. The progress bar has two segments (Quick Spark 10, Go deeper 14).

## Flow

```
Start ("Let's build your profile")
 ├─ Quick Spark ──────────┐
 └─ Complete profile ─────┤
                          ▼
              Quick Spark (Q1–Q10)
                          │
          ┌───────────────┴────────────────┐
   Quick Spark path                 Complete profile path
          │                                │
  "Your spark is lit" (42%)                │
   ├─ Go deeper ───────────────────────────┤
   └─ Find my people now (stop here)       ▼
                                 Go deeper (Q11–Q24)
                                           │
                              Profile complete (100%)
                                           │
                          Lightning Round already played?
                           ├─ Yes → All set
                           └─ No  → Lightning Round (optional, "Maybe later") → All set
```

A Quick Spark user who comes back later lands on Go deeper at **10 of 24**.

## Question map

### Quick Spark (Q1–Q10)

New Quick Spark wording replaces the matching question from the old 25-question profile.

| # | Question | Replaces old |
|---|---|---|
| 1 | Select at least three topics that genuinely excite you. | Q16 Geek out |
| 2 | What would you happily cross town just to eat? | Q12 Memorable meal |
| 3 | Been there. Would do that. (adventures) | Q21 Victory List |
| 4 | What movies or shows could you watch over and over again? (+ awards) | Q2 TV shows |
| 5 | What's the soundtrack to your life? | Q8 Music genres |
| 6 | You get an entire day to yourself. What's your perfect way to spend it? | Q3 Your kind of hangout |
| 7 | If money and time weren't an issue, what would you love to do or create? | Q20 Working toward |
| 8 | Where in the world would you happily go back to, or love to go for the first time? | Q14 Dream places |
| 9 | What's your little obsession? | Q6 Collections & keepsakes |
| 10 | What are you proud of doing, becoming or overcoming? | Q19 Proudest moments |

### Go deeper (Q11–Q24)

Questions that only appear in the complete profile.

| # | Question | Old # | Note |
|---|---|---|---|
| 11 | What hobbies and activities do you love, or want to try? | Q1 | Want to / I do picks |
| 12 | Where do you feel most like yourself, or wish you could? | Q4 | |
| 13 | How many close friendships do you feel you currently have? | Q7 | Private, matching only |
| 14 | Where did you grow up, what was it like, and what did you love most about it? | Q9 | |
| 15 | Which best describes your social energy? | Q10 | Battery options |
| 16 | In a bookstore, what areas do you spend the most time in? | Q11 | |
| 17 | How often do you feel lonely or disconnected from others? | Q13 | Private, matching only |
| 18 | Do you have any habits that are meaningful to you? | Q15 | |
| 19 | What's something about you that surprises people once they get to know you? | Q17 | |
| 20 | How would your closest friends describe you? | Q18 | |
| 21 | Who has impacted your life the most, and what did they teach you? | Q22 | |
| 22 | What challenges have you overcome that made you stronger or wiser? | Q23 | Visibility toggle |
| 23 | What's a question you wish people asked you more often, and what would your answer be? | Q24 | |
| 24 | What else do you want us to know about you? | Q25 | |

**Removed from the profile:** old Q5 *Film genres* moves into the Lightning Round.

## Lightning Round (33, shared)

One round for both paths. If it was played after Quick Spark, it is skipped at the end of the complete profile.

| Category | # | Topics |
|---|---|---|
| Food & Drinks | 1–6 | desserts, snacks, fruits, cuisines, drinks, restaurants |
| Lifestyle & Shopping | 7–11 | scents, flowers, brands, stores, things to shop for |
| Entertainment | 12–16 | **film genres** (replaces *types of music*), decades, humor, games, sports |
| Travel & Nature | 17–23 | seasons, weather, cities, vacation destinations, nature, animals, holidays |
| Memories | 24–26 | childhood memories or traditions, sounds, things you find nostalgic |
| Personality | 27–33 | ways to relax, things that cheer you up, things you'd love to learn, things you never tire of, things you're surprisingly good at, things you wish more people appreciated, little things that make you ridiculously happy |

*Types of music* was dropped because Quick Spark Q5 already covers music.

## Copy

| Place | Copy |
|---|---|
| Question label, Q1–Q10 | QUICK SPARK |
| Question label, Q11–Q24 | GO DEEPER |
| Quick Spark intro | 10 quick ones · **Start with a spark** · Let's go |
| Go deeper intro | 14 deeper ones · **Now, the real you** · Keep going |
| Checkpoint after Q10 | **Your spark is lit, Kaden!** Ready to go a little deeper? 14 more questions make your matches even better. · Go deeper · Find my people now |
| Profile complete | **Profile complete, Kaden!** All 24 answered. One just-for-fun round left: the Lightning Round, about 2 minutes. · Play Lightning Round · Maybe later |
| Lightning Round intro | LIGHTNING ROUND · JUST FOR FUN · Start · Maybe later |
| End | **All set, Kaden!** Profile and Lightning Round done. Go see who nearby shares your interests. · Find my people |

## Open questions for the client

- Social energy (old Q10) was in the old Quick Spark set but not in the new one. Should it come back into Quick Spark? It is used for matching.
- Confirm the profile is now 24 questions plus the Lightning Round (was 25).
- Old-question endings that were cut off in the client screenshots (Q6, Q12, Q14, Q17, Q18, Q21, Q23, Q24) still need confirming.

## Not done yet

- The coded prototype (`figma-final-assets/prototype`) still runs the old 25-question / 4-chapter flow.
- The 33 Lightning Round screens in `696:3201` are copies of the Quick Spark v2 ones, not shared components.
