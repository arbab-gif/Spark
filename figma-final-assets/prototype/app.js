/* Spirlit · coded click-through prototype (vanilla JS, no build step) */
const A = n => 'assets/' + n;
const I = (name, s = 20, extra = '') => `<i data-lucide="${name}" style="width:${s}px;height:${s}px" ${extra}></i>`;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const BOLT = (fill = '#fff', w = 22, h = 31) => `<svg width="${w}" height="${h}" viewBox="88 64 124 172.5" aria-hidden="true"><path d="M200 64 88 166h53.5z" fill="${fill}"/><path d="M158 144.5h54L100 236.5z" fill="${fill}"/></svg>`;

/* ---------------- content ---------------- */
const CH = [
  { t: 'What you love', d: 'The things that light you up. 6 questions, about 4 minutes.', qs: [1, 2, 3, 4, 5, 6], ill: 'orbit' },
  { t: 'Your world', d: 'Your people, your roots and your everyday. 6 questions, about 4 minutes.', qs: [7, 8, 9, 10, 11, 12], ill: 'map' },
  { t: 'Who you are', d: 'The little things that make you, you. 6 questions, about 5 minutes.', qs: [13, 14, 15, 16, 17, 18], ill: 'aura' },
  { t: 'Your story', d: 'Where you’ve been and where you’re headed. 7 questions, about 6 minutes.', qs: [19, 20, 21, 22, 23, 24, 25], ill: 'path' },
];
const HOBBIES = [['Pottery', 'amphora'], ['Travelling', 'plane'], ['Reading', 'book-open'], ['Gaming', 'gamepad-2'], ['Cooking', 'chef-hat'], ['Hiking', 'mountain'], ['Photography', 'camera'], ['Movies & Series', 'clapperboard'], ['Music', 'music'], ['Yoga', 'flower-2'], ['Coffee & Tea', 'coffee'], ['Art & Design', 'palette'], ['Fitness', 'dumbbell'], ['Languages', 'languages'], ['Pets', 'paw-print'], ['Tech', 'cpu'], ['Writing', 'pen-line'], ['Volunteering', 'hand-heart']];
const Q = {
  1: { q: 'What hobbies, interests, or activities do you enjoy the most?', h: 'Pick as many as you like.', type: 'chips', icons: true, opts: HOBBIES.map(x => x[0]), def: ['Pottery', 'Travelling', 'Hiking', 'Photography'], search: 'Search or add your own…' },
  2: { q: 'What TV shows or miniseries do you love?', h: 'Ones you’ve rewatched, or would recommend in a heartbeat.', type: 'chips', search: 'Search shows…', opts: ['Hacks', 'Friends', 'The Golden Girls', 'Schitt’s Creek', 'Abbott Elementary', 'Ted Lasso', 'Only Murders in the Building', 'The Office', 'Parks and Recreation', 'Modern Family', 'New Girl', 'Brooklyn Nine-Nine', 'The Good Place', 'Superstore', '30 Rock', 'Veep'], def: ['Hacks', 'Friends', 'The Golden Girls', 'Schitt’s Creek'] },
  3: { q: 'What kind of hangout usually feels most like “you”?', h: 'Choose one.', type: 'choice', opts: [['Cozy night in', 'Board games, a movie, good snacks'], ['Coffee and a long talk', 'One-on-one, no rush'], ['Outdoor adventure', 'Hikes, beaches, getting out there'], ['Live music or events', 'Gigs, markets, something happening'], ['Dinner with a small group', 'Good food and a few close friends'], ['Big night out', 'The more the merrier']], def: 1 },
  4: { q: 'What places or activities make you feel most peaceful, grounded, and like yourself?', h: 'Pick a few and say what those moments are like.', type: 'notes', opts: ['The beach', 'Hiking trails', 'The mountains', 'A quiet cabin', 'A favorite coffee shop'], def: { 'The beach': 'I love hearing the sound of the waves at the beach', 'Hiking trails': 'Especially when there’s a payoff view at the top', 'The mountains': '' }, add: '+ Add your own place' },
  5: { q: 'What are your favorite film genres?', h: 'Pick genres, then add movies you love.', type: 'chips', movies: true, opts: ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentaries', 'Drama', 'Family', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi', 'Superhero', 'Thriller', 'Musicals', 'Indie'], def: ['Adventure', 'Comedy', 'Sci-Fi'] },
  6: { q: 'Do you collect anything, or have any favorite items, keepsakes, or prized possessions?', h: 'Big or small, tell us the story behind it.', type: 'text', max: 300, ph: 'I keep a jar of sea glass from every beach I’ve visited…', prompts: ['Something you’d save in a fire', 'A gift that means a lot', 'Something you’ve had forever'] },
  7: { q: 'How many close friendships do you feel you currently have?', h: 'No right answer. This helps us understand what you’re looking for.', type: 'choice', priv: 'Only used for matching, never shown on your profile', opts: [['None right now', 'I’m ready to build my circle'], ['1–2', 'A small, tight circle'], ['3–5', 'A solid group I can count on'], ['6 or more', 'My people are everywhere']], def: 1 },
  8: { q: 'What are your favorite music genres?', h: 'Pick as many as you like.', type: 'chips', search: 'Search or add a genre…', opts: ['Pop', 'Indie', 'Hip-hop', 'R&B', 'Rock', 'Jazz', 'Country', 'Classical', 'Electronic', 'Lo-fi', 'Latin', 'K-pop', 'Soul', 'Folk', 'Metal', 'Afrobeats', 'Reggae', 'Blues'], def: ['Indie', 'R&B', 'Jazz', 'Lo-fi'] },
  9: { q: 'Where did you grow up, what was it like, and what did you love most about it?', h: 'A few lines is perfect.', type: 'text', max: 400, ph: 'A small coastal town… summers were all rock pools and fish and chips.', prompts: ['Your favorite spot there', 'A smell that takes you back', 'What you miss most'] },
  10: { q: 'Which best describes your social energy?', h: 'Choose one.', type: 'choice', opts: [['I recharge alone', 'Quiet time fills my cup'], ['A bit of both', 'Depends on the people and the day'], ['People energize me', 'The more time with friends the better'], ['It changes a lot', 'Some weeks social, some weeks hermit']], def: 1 },
  11: { q: 'In a bookstore, what areas do you spend the most time in?', h: 'Pick as many as you like.', type: 'chips', opts: ['Fiction', 'Mystery & Thriller', 'Sci-fi & Fantasy', 'Romance', 'Biographies', 'History', 'Self-help', 'Travel', 'Cookbooks', 'Poetry', 'Comics & Manga', 'Science', 'Business', 'Art & Design', 'Philosophy', 'Kids’ books', 'I don’t read much'], def: ['Sci-fi & Fantasy', 'Travel', 'Cookbooks'] },
  12: { q: 'What’s a memorable meal or food experience you’ve had, and what made it special?', h: 'Where were you, who were you with?', type: 'text', max: 300, ph: 'Street-food ramen at 1am in Osaka after missing the last train…', prompts: ['A dish you’d travel for', 'Your comfort food', 'A meal with someone special'] },
  13: { q: 'How often do you feel lonely or disconnected from others?', h: 'Be honest. It helps us suggest the right kind of plans.', type: 'choice', priv: 'Private. Never shown on your profile.', opts: [['Rarely', 'I feel well connected'], ['Sometimes', 'Now and then, usually after big changes'], ['Often', 'I’d love more people around me'], ['Most days', 'I’m really looking for my people']], def: 1 },
  14: { q: 'What places do you dream of visiting most, and what would make each one special?', h: 'Add a place and a line about why.', type: 'notes', search: 'Search a city or country…', opts: ['Japan', 'Iceland', 'Peru'], def: { Japan: 'Cherry blossom season and a ramen crawl through Tokyo', Iceland: 'Seeing the northern lights from a hot spring', Peru: '' }, add: '+ Add another place' },
  15: { q: 'Do you have any habits that are meaningful to you?', h: 'Rituals, routines, little things you never skip.', type: 'text', max: 300, ph: 'Sunday morning walks with no phone, then pancakes…', prompts: ['A morning ritual', 'Something you do every week', 'A habit you’re proud of'] },
  16: { q: 'What do you geek out about?', h: 'The topics you could talk about for hours.', type: 'chips', search: 'Search or add your own…', opts: ['Space', 'Board games', 'Coffee brewing', 'Formula 1', 'Houseplants', 'Anime', 'History', 'Sneakers', 'Astrology', 'True crime', 'Photography', 'Mechanical keyboards', 'Fantasy football', 'Baking', 'Dinosaurs', 'Film scores'], def: ['Space', 'Coffee brewing', 'Board games', 'Film scores'] },
  17: { q: 'What’s something about you that surprises people once they get to know you?', h: 'A hidden talent, an odd fact, a secret passion.', type: 'text', max: 300, ph: 'I was a competitive Irish dancer for ten years…', prompts: ['A hidden talent', 'An unexpected hobby', 'A fun fact'] },
  18: { q: 'How would your closest friends describe you? Be specific and don’t be afraid to brag.', h: 'Pick a few words, then add a line.', type: 'chipsText', opts: ['Loyal', 'Funny', 'Calm', 'Adventurous', 'Thoughtful', 'Curious', 'Organised', 'Spontaneous', 'Creative', 'Honest'], def: ['Loyal', 'Funny', 'Curious'], max: 200, ph: 'The friend who remembers your coffee order…' },
  19: { q: 'What accomplishments or moments are you most proud of in your life so far?', h: 'Big wins or quiet ones, they all count.', type: 'text', max: 400, ph: 'Running my first half marathon after knee surgery…', prompts: ['Something you built', 'A time you showed up for someone', 'A personal milestone'] },
  20: { q: 'What are you most excited about or working toward right now?', h: 'A goal, a project, a new chapter.', type: 'text', max: 300, ph: 'Opening a small ceramics studio with a friend…', prompts: ['A goal for this year', 'A project you love', 'Something you’re learning'] },
  21: { q: 'What’s on your “Victory List” aka “Bucket List” – the things you most want to do, see, or experience?', h: 'Add as many as you like. Friends can join you on these.', type: 'list', def: ['See the northern lights', 'Learn to surf', 'Run a full marathon', 'Road trip Route 66'] },
  22: { q: 'Who has impacted your life the most, and what did they teach you?', h: 'A parent, a teacher, a friend, anyone.', type: 'text', max: 400, ph: 'My nan. She taught me to talk to everyone like an old friend…', prompts: ['A mentor', 'A family member', 'Someone unexpected'] },
  23: { q: 'What challenges have you overcome that made you stronger or wiser? Only share what you’re comfortable with.', h: 'You decide who sees this.', type: 'textSeg', max: 400, ph: 'Moving to a new city alone at 22…' },
  24: { q: 'What’s a question you wish people asked you more often, and what would your answer be?', h: 'Write the question, then your answer.', type: 'qText', max: 300, ph: 'Your answer…', qph: 'Your question, e.g. “What’s the best gig you’ve been to?”' },
  25: { q: 'What else do you want us to know about you?', h: 'Anything we haven’t asked. Last one!', type: 'text', max: 400, ph: 'I’m new to the city and would love a crew for weekend hikes…', prompts: ['What you’re looking for in friends', 'Your perfect weekend', 'A dealbreaker'] },
};
const PROMPT_TEXT = {
  'Something you’d save in a fire': 'If my place was on fire I’d grab ', 'A gift that means a lot': 'The gift that means the most to me is ', 'Something you’ve had forever': 'I’ve had my ',
};
const QUICK = [1, 3, 10, 16, 8, 5, 4, 20];
const MOVIES = {
  Adventure: [['Indiana Jones movies', '1981 – 2023 · 5 films'], ['Jurassic Park movies', '1993 – 2025 · 7 films'], ['Pirates of the Caribbean', '2003 – 2017 · 5 films'], ['The Lord of the Rings', '2001 – 2003 · 3 films'], ['Jumanji', '1995 – 2019 · 3 films'], ['The Mummy', '1999'], ['Life of Pi', '2012']],
  Comedy: [['Superbad', '2007'], ['Bridesmaids', '2011'], ['The Grand Budapest Hotel', '2014'], ['Paddington 2', '2017'], ['Booksmart', '2019'], ['Game Night', '2018']],
  'Sci-Fi': [['Interstellar', '2014'], ['Arrival', '2016'], ['Dune movies', '2021 – 2024 · 2 films'], ['The Matrix', '1999'], ['Everything Everywhere All at Once', '2022'], ['Blade Runner 2049', '2017']],
};
const GENERIC_MOVIES = [['A classic you rewatch', 'Add your own'], ['Something recent', 'Add your own']];

/* ---------------- state ---------------- */
let S;
function freshState() {
  const ans = {};
  for (const [n, q] of Object.entries(Q)) {
    if (q.type === 'chips' || q.type === 'chipsText') ans[n] = { sel: [...(q.def || [])], extra: [], text: '' };
    else if (q.type === 'choice') ans[n] = { sel: q.def };
    else if (q.type === 'notes') ans[n] = { picks: { ...q.def }, extra: [] };
    else if (q.type === 'list') ans[n] = { items: [...q.def] };
    else if (q.type === 'textSeg') ans[n] = { text: '', vis: 1 };
    else if (q.type === 'qText') ans[n] = { pairs: [{ q: '', text: '' }] };
    else ans[n] = { text: '' };
  }
  ans[5].movies = { Adventure: ['Indiana Jones movies', 'Jurassic Park movies', 'Pirates of the Caribbean'], 'Sci-Fi': ['Interstellar'] };
  return { ans, skipped: {}, mode: 'full', path: 'complete', photos: ['77daf.png', '77daf.png'], otp: ['4', '8', '2', '', '', ''], code2: ['', '', '', '', '', ''], dob: ['', '', ''], terms: true, gender: 'Man', showGender: true, who: 'Everyone', age: [22, 34], pw1: 'Spirlit2026', pw2: '', sparks: { 1: 1, 2: 1, 7: 1 }, reqs: [1, 1], chat: null, promptIx: 0, tab: 'Adventure', mq: '' };
}
S = freshState();
function answered(n) {
  const a = S.ans[n], q = Q[n];
  if (q.type === 'chips') return a.sel.length > 0;
  if (q.type === 'chipsText') return a.sel.length > 0 || a.text.trim();
  if (q.type === 'choice') return a.sel != null;
  if (q.type === 'notes') return Object.keys(a.picks).length > 0;
  if (q.type === 'list') return a.items.length > 0;
  if (q.type === 'qText') return a.pairs.some(p => p.q.trim() && p.text.trim());
  return !!a.text.trim();
}
const answeredCount = () => Object.keys(Q).filter(answered).length;

/* ---------------- shared pieces ---------------- */
const status = (tone = 'dark') => `<div class="sb"><span class="t">9:41</span><img src="${A(tone === 'white' ? '6f48c.svg' : tone === 'navy' ? '6e5e6.svg' : 'eb4a8.svg')}" alt=""></div>`;
const homeInd = () => `<div class="hi"><i></i></div>`;
const backBtn = () => `<button class="back" data-a="back" aria-label="Back">${I('chevron-left', 26)}</button>`;
const arrow = () => `<span class="arr">${I('arrow-right', 24)}</span>`;
const btn = (label, act, cls = '', dis = false) => `<button class="btn ${cls}" data-a="${act}" ${dis ? 'disabled' : ''}>${label}</button>`;
function lightScreen({ title, sub, icon, body = '', foot = '', back = true, extraTop = '' }) {
  return `${status('dark')}<div class="hdr">${back ? backBtn() : ''}</div>
  <div class="content">${extraTop}${icon ? `<div class="badge-icon"><span>${I(icon, 38)}</span></div>` : ''}
  <div class="title"><h1 class="h1">${title}</h1>${sub ? `<p class="sub">${sub}</p>` : ''}</div>${body}</div>
  <div class="foot">${foot}</div>${homeInd()}`;
}
const field = (label, icon, value, type = 'text', extra = '', key = '') => `<div class="field"><label>${label}</label><div class="input">${icon ? `<span class="ic">${I(icon, 18)}</span>` : ''}<input type="${type}" value="${esc(value)}" aria-label="${label}" ${key ? `data-k="${key}"` : ''} ${extra}>${type === 'password' ? `<button class="eye" data-a="eye" aria-label="Show password">${I('eye', 20)}</button>` : ''}</div></div>`;

/* ---------------- screens ---------------- */
const SCREENS = {
  splash: {
    t: 'Splash', g: 'Welcome', cls: 'splash on-dark', auto: ['getstarted', 2400],
    html: () => `<div class="bg"></div>${status('white')}<div class="mid"><img class="mark" src="${A('c6275.svg')}" alt=""><div class="word">SPIRLIT</div><div class="tag">Connect in real life</div></div><div style="flex:1"></div>${homeInd()}`,
    click: () => go('getstarted', 'fade'),
  },
  getstarted: {
    t: 'Get started', g: 'Welcome', cls: 'gs on-dark',
    html: () => `<img class="hero" src="${A('39990.png')}" alt="Two friends laughing on a beach"><div class="fade1"></div><div class="fade2"></div>${status('white')}
      <div class="logo"><img src="${A('5933d.svg')}" width="22" height="31" alt=""><span>SPIRLIT</span></div>
      <div class="bottom">
        <div class="dots">${[0, 1, 2].map(i => `<button data-a="slide:${i}" class="${i === 0 ? 'on' : ''}" aria-label="Slide ${i + 1}"></button>`).join('')}</div>
        <div class="copy"><h2>Find your people</h2><p>Meet people nearby who love what you love.<br>Free to join, always real life.</p></div>
        <div class="ft">
          <button class="btn black" data-a="go:signup"><img src="${A('ac67a.svg')}" width="20" height="20" alt="">Continue with Apple</button>
          <button class="btn white" data-a="go:signup"><img src="${A('ffacb.svg')}" width="20" height="20" alt="">Continue with Google</button>
          <button class="btn sm" data-a="go:signup"><img src="${A('140db.svg')}" width="24" height="24" alt="">Sign up with Email</button>
        </div>
        <div class="links"><span>Already have an account? <u data-a="go:login" style="cursor:pointer">Log in</u></span><small>By continuing you agree to our <u>Terms</u> &amp; <u>Privacy Policy</u>.</small></div>
      </div>${'<div style="position:absolute;bottom:0;left:0;right:0">' + homeInd() + '</div>'}`,
    after: el => {
      const slides = [['Find your people', 'Meet people nearby who love what you love.<br>Free to join, always real life.'], ['Spark a conversation', 'Shared interests make the first hello easy.<br>No awkward openers.'], ['Meet in real life', 'Plans, events and friends just around<br>the corner. Every day.']];
      let i = 0;
      const set = n => { i = n; const c = el.querySelector('.copy'); c.classList.remove('swap'); void c.offsetWidth; c.classList.add('swap'); c.innerHTML = `<h2>${slides[i][0]}</h2><p>${slides[i][1]}</p>`; el.querySelectorAll('.dots button').forEach((d, k) => d.classList.toggle('on', k === i)); };
      el._slide = set; el._timer = setInterval(() => set((i + 1) % 3), 3800);
    },
  },
  signup: {
    t: 'Create account', g: 'Sign up', cls: 'light on-light',
    html: () => lightScreen({
      title: 'Create your account', sub: 'Meet people nearby who share your interests.', back: true,
      body: `${field('First name', 'user', 'Kaden')}${field('Email', 'mail', 'kaden@email.com', 'email')}${field('Password', 'lock', 'Spirlit2026', 'password')}
        <button class="row-check" data-a="terms"><span class="cbox ${S.terms ? 'on' : ''}">${I('check', 15)}</span><span>I agree to the <b class="link">Terms</b> and <b class="link">Privacy Policy</b></span></button>`,
      foot: `<p class="linkline">Already have an account? <b class="link" data-a="go:login" style="cursor:pointer">Log in</b></p>${btn('Continue', 'go:verify', '', !S.terms)}`,
    }),
  },
  verify: {
    t: 'Verify email', g: 'Sign up', cls: 'light on-light',
    html: () => lightScreen({
      title: 'Check your email', sub: 'Enter the 6-digit code we sent to kaden@email.com', icon: 'mail-check',
      body: `<div class="otp" data-otp="otp">${S.otp.map((d, i) => `<input inputmode="numeric" maxlength="1" value="${d}" aria-label="Digit ${i + 1}">`).join('')}</div><p class="resend" data-resend>Didn’t get it? Resend in <b>0:42</b></p>`,
      foot: btn('Verify', 'verify'),
    }),
    after: el => { otpWire(el, 'otp'); resendTimer(el, 42); },
  },
  birthday: {
    t: 'Birthday', g: 'Sign up', cls: 'light on-light',
    html: () => lightScreen({
      title: 'When’s your birthday?', sub: 'Only your age is shown on your profile.',
      body: `<div class="date"><input data-d="0" inputmode="numeric" maxlength="2" placeholder="DD" value="${S.dob[0]}" aria-label="Day"><b>/</b><input data-d="1" inputmode="numeric" maxlength="2" placeholder="MM" value="${S.dob[1]}" aria-label="Month"><b>/</b><input data-d="2" class="y" inputmode="numeric" maxlength="4" placeholder="YYYY" value="${S.dob[2]}" aria-label="Year"></div>
        <div data-age></div>
        <div class="note">${I('shield', 18)}<span>You need to be 18 or older to use Spirlit. You can’t change your birthday later.</span></div>`,
      foot: btn('Continue', 'go:gender'),
    }),
    after: el => {
      const ins = [...el.querySelectorAll('.date input')];
      const upd = () => {
        const [d, m, y] = S.dob.map(Number), box = el.querySelector('[data-age]');
        if (S.dob[2].length === 4 && d && m) {
          const now = new Date(2026, 10, 11); let age = now.getFullYear() - y; if (now.getMonth() + 1 < m || (now.getMonth() + 1 === m && now.getDate() < d)) age--;
          box.innerHTML = age >= 18 && age < 110 ? `<div class="age" style="display:flex">${I('cake', 16)} You’re ${age}</div>` : `<p class="err">${age < 18 ? 'You need to be 18 or older to join.' : 'Check the year.'}</p>`;
          lucide.createIcons();
        } else box.innerHTML = '';
      };
      ins.forEach((inp, i) => inp.addEventListener('input', () => { inp.value = inp.value.replace(/\D/g, ''); S.dob[i] = inp.value; if (inp.value.length === inp.maxLength && ins[i + 1]) ins[i + 1].focus(); upd(); }));
      ins.forEach((inp, i) => inp.addEventListener('keydown', e => { if (e.key === 'Backspace' && !inp.value && ins[i - 1]) ins[i - 1].focus(); }));
      upd(); setTimeout(() => ins[0].focus({ preventScroll: true }), 450);
    },
  },
  gender: {
    t: 'Gender', g: 'Sign up', cls: 'light on-light',
    html: () => lightScreen({
      title: 'Which gender best<br>describes you?', sub: 'Kaden, we love that you’re here. Pick the one that fits you best.',
      body: (() => { const c = ([o, ic]) => `<button class="gcircle ${S.gender === o ? 'on' : ''}" data-a="gender:${o}" role="radio" aria-checked="${S.gender === o}">${GICON[ic].replace('width="22" height="22"', 'width="36" height="36"').replace('stroke-width="2"', 'stroke-width="1.8"')}<b>${o}</b></button>`;
        return `<div class="gcircles" role="radiogroup" aria-label="Gender"><div>${c(['Man', 'mars'])}${c(['Woman', 'venus'])}</div><div>${c(['Nonbinary', 'trans'])}</div></div>`; })(),
      foot: btn('Continue', 'go:sparkwith', '', !S.gender),
    }),
  },
  sparkwith: {
    t: 'Who to spark with', g: 'Sign up', cls: 'light on-light',
    html: () => lightScreen({
      title: 'Who do you want<br>to spark with?', sub: 'Spirlit is for friendships. Choose who you’d like to meet.',
      body: `<div class="lgroup">${[['Women', 'venus'], ['Men', 'mars'], ['Everyone', 'users']].map(([o, ic]) => `<button class="lopt ${S.who === o ? 'on' : ''}" data-a="who:${o}" role="radio" aria-checked="${S.who === o}"><span class="ltile">${GICON[ic]}</span><span class="tx"><b>${o}</b></span><span class="lradio"></span></button>`).join('')}</div>
        <div class="note">${I('shield', 18)}<span>You can change this anytime in Settings.</span></div>`,
      foot: btn('Continue', 'go:photos', '', !S.who),
    }),
  },
  photos: {
    t: 'Add photos', g: 'Sign up', cls: 'light on-light',
    html: () => lightScreen({
      title: 'Add your photos', sub: 'Add at least 2. Friendly, clear photos help people say hi.',
      body: `<div class="pgrid">${Array.from({ length: 6 }, (_, i) => S.photos[i] ? `<div class="pslot"><img src="${A(S.photos[i])}" alt="Your photo ${i + 1}">${i === 0 ? '<span class="main">Main</span>' : ''}<button class="rm" data-a="prm:${i}" aria-label="Remove photo">${I('x', 13)}</button></div>` : `<button class="pslot empty" data-a="padd" aria-label="Add photo"><span>${I('plus', 18)}</span></button>`).join('')}</div>
        ${S.photos.length < 2 ? '<p class="err">Add at least 2 photos to continue.</p>' : ''}`,
      foot: btn('Continue', 'go:location', '', S.photos.length < 2),
    }),
  },
  location: {
    t: 'Location', g: 'Sign up', cls: 'light on-light',
    html: () => lightScreen({
      title: 'Find people nearby', sub: 'Spirlit uses your location to show people within 1 mi. Your exact spot is never shared, only the distance.',
      extraTop: `<div class="radar"><span class="ring r1"></span><span class="ring r2"></span><span class="ring r3"></span><span class="ring pulse"></span><span class="ring pulse b"></span><span class="ring core"><svg width="30" height="40" viewBox="0 0 30 40"><path d="M15 0C6.7 0 0 6.6 0 14.8 0 25.9 15 40 15 40s15-14.1 15-25.2C30 6.6 23.3 0 15 0z" fill="#1A2B4C"/><circle cx="15" cy="14.5" r="5.5" fill="#A9DDF7"/></svg></span>
        ${[['a0370.png', '850 ft', 14, 46, 0], ['15ec7.png', '0.3 mi', 240, 12, 1.2], ['14261.png', '0.4 mi', 22, 206, 2.1], ['e725a.png', '0.6 mi', 252, 196, .6]].map(([img, d, x, y, dl]) => `<div class="p" style="left:${x}px;top:${y}px;animation-delay:-${dl}s"><img src="${A(img)}" alt=""><em>${I('map-pin', 13)}${d}</em></div>`).join('')}
        <svg class="dash" style="left:326px;top:4px;transform:rotate(-20deg)" width="26" height="22" stroke="#7AD5FE" stroke-width="3.2" stroke-linecap="round"><path d="M3 9 9 15M11 4 13 13M19 3 16 12"/></svg>
        <svg class="dash" style="left:4px;top:196px;transform:rotate(35deg)" width="26" height="22" stroke="#FF8A5B" stroke-width="3.2" stroke-linecap="round"><path d="M3 9 9 15M11 4 13 13M19 3 16 12"/></svg></div>`,
      foot: `${btn('Allow location', 'alert:loc')}${btn('Not now', 'go:notifications', 'outline')}`,
    }),
  },
  notifications: {
    t: 'Notifications', g: 'Sign up', cls: 'light on-light',
    html: () => lightScreen({
      title: 'Never miss a spark', sub: 'Turn on notifications to know when someone who shares your interests is nearby or says hi.',
      extraTop: `<div class="notif-ill"><span class="glow"></span><div class="appicon" style="width:88px;height:88px">${BOLT('#fff', 46, 64)}</div>
        <div style="margin-top:-22px;display:flex;flex-direction:column;align-items:center;position:relative">
        <div class="ncard slide-in" style="animation-delay:.25s"><div class="appicon ai">${BOLT('#fff', 20, 28)}</div><div style="flex:1"><div class="meta">SPIRLIT <i>now</i></div><b>Sarah is nearby</b><p>You both love hiking. She’s 300 ft away.</p></div></div>
        <div class="ncard back slide-in" style="animation-delay:.45s"><div class="appicon ai">${BOLT('#fff', 20, 28)}</div><div style="flex:1"><div class="meta">SPIRLIT <i>2m</i></div><b>Ali sent you a message</b><p>Coffee after the climb?</p></div></div></div></div>`,
      foot: `${btn('Allow notifications', 'alert:notif')}${btn('Not now', 'go:pstart', 'outline')}`,
    }),
  },
  login: {
    t: 'Log in', g: 'Log in', cls: 'light on-light',
    html: () => lightScreen({
      title: 'Welcome back', sub: 'Log in to see who’s nearby.', extraTop: `<div style="align-self:center;margin-top:-8px">${BOLT('#1A2B4C', 40, 56)}</div>`,
      body: `${field('Email', 'mail', 'kaden@email.com', 'email')}${field('Password', 'lock', 'Spirlit2026', 'password')}
        <div style="display:flex;justify-content:flex-end;margin-top:-12px"><b class="link" data-a="go:forgot" style="cursor:pointer;font-size:14px">Forgot password?</b></div>
        ${btn('Log in', 'go:home')}
        <div style="display:flex;align-items:center;gap:12px;color:var(--n500);font-size:13px"><i style="flex:1;height:1px;background:var(--field)"></i>or<i style="flex:1;height:1px;background:var(--field)"></i></div>
        <button class="btn black" data-a="go:home"><img src="${A('ac67a.svg')}" width="20" height="20" alt="">Continue with Apple</button>
        <button class="btn white" data-a="go:home"><img src="${A('ffacb.svg')}" width="20" height="20" alt="">Continue with Google</button>`,
      foot: `<p class="linkline" style="margin:0">New to Spirlit? <b class="link" data-a="go:signup" style="cursor:pointer">Create account</b></p>`,
    }),
  },
  forgot: {
    t: 'Forgot password', g: 'Log in', cls: 'light on-light',
    html: () => lightScreen({
      title: 'Forgot your password?', sub: 'Enter your email and we’ll send you a 6-digit code to reset it.', icon: 'lock-keyhole',
      body: field('Email', 'mail', 'kaden@email.com', 'email'),
      foot: `<p class="linkline">Remembered it? <b class="link" data-a="back" style="cursor:pointer">Log in</b></p>${btn('Send code ' + arrow(), 'go:code')}`,
    }),
  },
  code: {
    t: 'Enter code', g: 'Log in', cls: 'light on-light',
    html: () => lightScreen({
      title: 'Enter the code', sub: 'We sent a 6-digit code to kaden@email.com. It expires in 10 minutes.', icon: 'mail',
      body: `<div class="otp" data-otp="code2">${S.code2.map((d, i) => `<input inputmode="numeric" maxlength="1" value="${d}" aria-label="Digit ${i + 1}">`).join('')}</div><p class="resend" data-resend>Didn’t get it? Resend in <b>0:42</b></p>`,
      foot: btn('Verify code ' + arrow(), 'verify2'),
    }),
    after: el => { otpWire(el, 'code2'); resendTimer(el, 42); },
  },
  newpass: {
    t: 'Set new password', g: 'Log in', cls: 'light on-light',
    html: () => lightScreen({
      title: 'Set a new password', sub: 'Choose something you haven’t used before.', icon: 'lock',
      body: `${field('New password', '', S.pw1, 'password', '', 'pw1')}${field('Confirm password', '', S.pw2, 'password', 'placeholder="Type it again"', 'pw2')}
        <div data-rules style="display:flex;flex-direction:column;gap:8px;padding-left:4px"></div>`,
      foot: btn('Reset password ' + arrow(), 'reset'),
    }),
    after: el => {
      const upd = () => {
        const r = [['At least 8 characters', S.pw1.length >= 8], ['One number or symbol', /[\d\W_]/.test(S.pw1)], ['Passwords match', S.pw2.length > 0 && S.pw1 === S.pw2]];
        el.querySelector('[data-rules]').innerHTML = r.map(([t, ok]) => `<div style="display:flex;align-items:center;gap:8px;font-size:14px;color:${ok ? 'var(--n700)' : 'var(--n500)'};font-weight:${ok ? 500 : 400}"><span style="width:16px;height:16px;border-radius:50%;display:grid;place-items:center;${ok ? 'background:#7AD5FE;color:#fff' : 'border:1.5px solid #A5A5A5'}">${ok ? I('check', 11) : ''}</span>${t}</div>`).join('');
        el.querySelector('[data-a="reset"]').disabled = !r.every(x => x[1]);
        lucide.createIcons();
      };
      el.querySelectorAll('[data-k]').forEach(inp => inp.addEventListener('input', () => { S[inp.dataset.k] = inp.value; upd(); }));
      upd();
    },
  },
  /* -------- profile (dark) -------- */
  pstart: {
    t: 'Profile · Start', g: 'Profile', cls: 'dark on-dark',
    html: () => darkFrame({
      ch: -1, pill: 'Your profile', q: 'How should people get to know you?', h: 'Pick how deep you want to go. You can always add more later.',
      body: `<button class="pcard ${S.path === 'complete' ? 'on' : ''}" data-a="path:complete"><span class="tag">Best matches</span><div class="top"><span class="ico">${I('layers', 22)}</span><div class="nm"><b>Complete profile</b><span>25 questions · 4 chapters · about 15 min</span></div><span class="radio" style="${S.path === 'complete' ? 'border:0;background:var(--sky)' : ''}"></span></div><p>Tell your full story: what you love, your world, who you are and where you’re headed. You can pause after any chapter.</p><div class="minichips">${CH.map((c, i) => `<span>${i + 1}. ${c.t}</span>`).join('')}</div></button>
        <button class="pcard ${S.path === 'quick' ? 'on' : ''}" data-a="path:quick"><div class="top"><span class="ico">${BOLT('currentColor', 16, 22)}</span><div class="nm"><b>Quick Spark</b><span>8 questions · about 3 min</span></div><span class="radio" style="${S.path === 'quick' ? 'border:0;background:var(--sky)' : ''}"></span></div><p>Answer the essentials and start connecting today. Finish the rest whenever you like.</p></button>`,
      next: S.path === 'quick' ? 'Start Quick Spark' : 'Start my profile', act: 'startpath', counter: '',
    }),
  },
  quick: {
    t: 'Quick Spark intro', g: 'Profile', cls: 'dark on-dark',
    html: () => darkFrame({
      ch: -1, pill: 'Quick Spark', q: '8 quick questions, then you’re in', h: 'Just the essentials so we can start finding your people. About 3 minutes.',
      body: `<div class="qlist">${QUICK.map((n, i) => `<div class="r"><span class="num">${i + 1}</span><span>${Q[n].q}</span></div>`).join('')}</div><p class="helper" style="font-size:13.5px">You can unlock better matches by finishing the full profile later.</p>`,
      next: 'Let’s go', act: 'quickgo', counter: '',
    }),
  },
  done: {
    t: 'Profile complete', g: 'Finish', cls: 'dark on-dark',
    html: () => {
      const n = answeredCount(), pct = Math.round(n / 25 * 100), left = 25 - n;
      const skipped = Object.keys(S.skipped).filter(k => !answered(+k)).length;
      const C = 2 * Math.PI * 95;
      return darkFrame({
        ch: 3, pill: 'Your profile', q: left ? 'You’re almost there, Kaden!' : 'You’re all set, Kaden!',
        h: 'Your profile is ready. Go see who nearby shares your interests.', counter: '',
        top: `<div class="pring" style="--c:${C};--p:${pct}"><span class="glow"></span><svg width="220" height="220" viewBox="0 0 220 220"><circle cx="110" cy="110" r="95" class="trk"/><circle cx="110" cy="110" r="95" class="arc" transform="rotate(-90 110 110)"/></svg>
          <img src="${A('77daf.png')}" alt="Your photo"><button class="pedit" data-a="go:photos" aria-label="Edit photo">${I('pencil', 18)}</button><b class="ppct" data-pct>0%</b></div>`,
        body: `<div class="stats"><div><b>${n}</b><span>Answers</span></div><div><b>${skipped}</b><span>Skipped</span></div><div><b>${CH.filter(c => c.qs.every(answered)).length}</b><span>Chapters</span></div></div>
          <button class="addlink" data-a="go:all" style="align-self:center">${left ? 'Answer the rest' : 'Review my answers'}</button>`,
        next: 'Find my people', act: 'go:home',
      });
    },
    after: el => {
      const pct = Math.round(answeredCount() / 25 * 100), out = el.querySelector('[data-pct]'), arc = el.querySelector('.pring .arc');
      requestAnimationFrame(() => arc.classList.add('go'));
      const t0 = performance.now(); const tick = t => { const k = Math.min(1, (t - t0) / 1200); out.textContent = Math.round(pct * (1 - Math.pow(1 - k, 3))) + '%'; if (k < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick);
      setTimeout(() => out.textContent = pct + '%', 1300);
      confetti(el, pct === 100 ? 110 : 60);
    },
  },
  all: {
    t: 'All questions', g: 'Finish', cls: 'dark on-dark',
    html: () => darkFrame({
      ch: 3, pill: 'Your profile', q: 'All questions', h: `${answeredCount()} of 25 answered · tap any question to jump to it.`, counter: '',
      body: CH.map((c, ci) => `<div class="chg"><div class="hh">${ci + 1}. ${c.t}<em>${c.qs.filter(answered).length}/${c.qs.length}</em></div>
        ${c.qs.map(n => { const cur = n === firstUnanswered(), sk = S.skipped[n] && !answered(n); return `<button class="qrow ${cur ? 'cur' : ''}" data-a="goq:${n}"><span class="n">${n}</span><span>${short(n)}</span><i class="st ${cur ? 'cur' : answered(n) ? 'done' : sk ? 'skip' : ''}">${cur ? 'Next up' : answered(n) ? 'Done' : sk ? 'Skipped' : 'To do'}</i></button>`; }).join('')}</div>`).join(''),
      next: firstUnanswered() ? `Continue · Question ${firstUnanswered()}` : 'Back to home', act: firstUnanswered() ? `goq:${firstUnanswered()}` : 'go:home',
    }),
  },
  /* -------- app (light) -------- */
  home: {
    t: 'Home', g: 'App', cls: 'app on-light',
    html: () => {
      const n = answeredCount(), pct = Math.round(n / 25 * 100);
      const conns = [['facfa.png', 'Sarah', 1, 1], ['567ec.png', 'Emma', 1, 0], ['a5eef.png', 'Maya', 0, 1], ['1b371.png', 'Kaden', 0, 0], ['330a6.png', 'Zara', 0, 1], ['b08a4.png', 'Lina', 0, 0]];
      const reqs = [['9c3bb.png', 'Sarah', ['Books', 'Photos']], ['13aff.png', 'Kaden', ['Games', 'Hikes']]];
      const ev = (t, m) => `<button class="event" data-a="toast:You’re going to ${t}"><div class="day"><small>OCT</small><b>10</b></div><div class="tx"><b>${t}</b><span>${m}</span><div class="going">${['261fe', 'ed309', 'e725a', 'aea71'].map(x => `<img src="${A(x + '.png')}" alt="">`).join('')}<span style="margin-left:8px">48 Going</span></div></div><img src="${A('161c8.svg')}" width="18" height="18" alt=""></button>`;
      return `<img class="clouds" src="${A('2a403.svg')}" alt="">${status('navy')}<div class="scroll">
        <div class="home-hd"><button class="me" data-a="go:qr" aria-label="My Spark code"><img src="${A('6b240.png')}" alt=""><span class="qrb"><img src="${A('3826b.svg')}" width="16" height="16" style="transform:rotate(180deg)" alt=""></span></button><div class="gr"><small>Good Evening</small><b>Kaden James</b></div><button class="bell" data-a="toast:No new notifications" aria-label="Notifications"><img src="${A('1693e.svg')}" width="42" height="42" alt=""></button></div>
        <div class="home-body">
          ${n < 25 ? `<div class="cyp"><div><b>Complete your profile</b><p>Answer ${25 - n} more questions to get better Sparks</p><div class="bar"><i><b style="width:${pct}%"></b></i>${pct}%</div></div><button data-a="go:all">Complete Profile</button></div>` : ''}
          <div style="display:flex;flex-direction:column;gap:16px"><div class="sec-h"><b>Connection</b><a data-a="go:nearby">View all</a></div>
            <div class="conns">${conns.map(([img, nm, nw, on]) => `<button class="conn" data-a="go:chat"><span class="ring ${nw ? 'new' : ''}"><img src="${A(img)}" alt="">${on ? `<img class="on" src="${A('7b2db.svg')}" alt="">` : ''}</span><span>${nm}</span></button>`).join('')}</div></div>
          <button class="hero-near" data-a="go:nearby"><img src="${A('06b97.png')}" alt=""><div><b>Great Connection with Common Ground</b><span>Explore Nearby <img src="${A('473da.svg')}" width="16" height="16" alt=""></span></div></button>
          <div style="display:flex;flex-direction:column;gap:16px"><div class="sec-h big"><b>Spark Requests</b><a>View all</a></div>
            <div style="display:flex;flex-direction:column;gap:10px">${reqs.map(([img, nm, tags], i) => S.reqs[i] ? `<div class="req" data-req="${i}"><img src="${A(img)}" alt=""><div class="tx"><b>${nm} wants to Spark</b><div class="tags">${tags.map(t => `<span>${t}</span>`).join('')}</div></div><div class="acts"><button data-a="req:${i}:0" aria-label="Decline"><img src="${A('dee1a.svg')}" width="15" height="15" alt=""></button><button class="ok" data-a="req:${i}:1" aria-label="Accept"><img src="${A('e934e.svg')}" width="16" height="16" alt=""></button></div></div>` : '').join('') || '<div class="done-msg">You’re all caught up ✨</div>'}</div></div>
          <div style="display:flex;flex-direction:column;gap:16px;margin-top:18px"><div class="sec-h big"><b>Events</b><button class="round" data-a="go:qr" aria-label="Scan"><img src="${A('a3eea.svg')}" width="24" height="24" alt=""></button></div>
            <div style="display:flex;flex-direction:column;gap:10px">${ev('Harbour Night Market', '7 PM · Old Harbour')}${ev('Stargazing on the Beach', '9 PM · North Shore')}</div></div>
        </div></div>${nav('home')}<div style="position:absolute;bottom:0;left:0;right:0">${homeInd()}</div>`;
    },
  },
  nearby: {
    t: 'Nearby', g: 'App', cls: 'app on-light',
    html: () => {
      const cards = [['aea71', 'Tell me your fave café', '0.8 mi'], ['a0370', 'Sarah', '850 ft', 'match'], ['ed309', 'Jane', '0.2 mi'], ['14261', 'Emma', '320 ft'], ['15ec7', 'New in town, say hi!', '0.3 mi'], ['aea71', 'Maya', '0.4 mi'], ['bf408', 'Looking for a gym buddy', '0.5 mi'], ['e725a', 'Zara', '600 ft'], ['261fe', 'Film photo walk Sunday?', '0.6 mi'], ['14261', 'Board games tonight', '0.7 mi'], ['ed309', 'Jordan', '0.7 mi'], ['aea71', 'Tell me your fave café', '0.8 mi'], ['e725a', 'Dana', '0.9 mi'], ['15ec7', 'Live jazz this Friday', '0.9 mi'], ['261fe', 'Noor', '1 mi']];
      return `${status('dark')}<div class="scroll"><div class="nb-h"><h1>Nearby</h1><button data-a="toast:Filters coming soon" aria-label="Filters"><img src="${A('61bf2.svg')}" width="18" height="18" alt=""></button></div>
        <div class="nb-c"><img src="${A('f8c24.svg')}" width="14" height="14" alt="">14 people within 1 mi</div>
        <div class="grid3">${cards.map(([img, t, d, m], i) => `<button class="card" data-a="${m ? 'go:match' : 'card:' + i}"><img src="${A(img + '.png')}" alt=""><span class="bolt ${S.sparks[i] ? 'sent' : ''}" data-a="bolt:${i}" role="button" aria-label="Send spark"><img src="${A('76f5b.png')}" alt=""></span><span class="tx"><b>${t}</b><span>${d}</span></span></button>`).join('')}</div></div>
        ${nav('nearby')}<div style="position:absolute;bottom:0;left:0;right:0">${homeInd().replace('<i>', '<i style="background:#fff">')}</div>`;
    },
  },
  match: {
    t: 'You sparked!', g: 'App', cls: 'match on-light',
    html: () => `${status('navy')}<button class="x" data-a="back" aria-label="Close"><img src="${A('1fa35.svg')}" width="18" height="18" alt=""></button>
      <img src="${A('5e354.svg')}" style="position:absolute;left:45px;top:150px;width:300px;height:300px" alt="">
      ${[[52, 120, 16, '75768'], [322, 132, 12, 'c1108'], [348, 300, 18, 'f8d24'], [26, 330, 12, '3237e'], [300, 438, 10, '56a6d'], [74, 420, 14, 'b6771'], [210, 118, 9, '33c5e']].map(([x, y, s, f], i) => `<img class="spk" src="${A(f + '.svg')}" style="left:${x - s / 2}px;top:${y - s / 2}px;width:${s * 2}px;height:${s * 2}px;--d:${2.6 + i * .5}s" alt="">`).join('')}
      <div class="ph a"><img src="${A('77daf.png')}" alt="You"></div><div class="ph b"><img src="${A('a0370.png')}" alt="Sarah"></div>
      <span class="halo"></span><span class="bdg"><span><img src="${A('76f5b.png')}" alt=""></span></span>
      <h1>You Sparked!</h1><p>A new connection starts here. Explore your shared interests and get the conversation going.</p>
      <button class="hi-btn" data-a="go:chat"><img src="${A('f3889.svg')}" width="20" height="20" alt="">Say Hi</button>
      <div style="position:absolute;bottom:0;left:0;right:0">${homeInd()}</div>`,
  },
  chats: {
    t: 'Chats', g: 'App', cls: 'chats on-light',
    html: () => {
      const core = [['a0370', 'Sarah', 1], ['14261', 'Emma', 0], ['e725a', 'Zara', 1], ['aea71', 'Maya', 1], ['ed309', 'Jane', 0]];
      const row = (img, name, msg, time, o = {}) => `<button class="crow ${o.faded ? 'faded' : ''}" data-a="${o.faded ? 'toast:This chat expired. Send a new spark to reconnect' : 'go:chat'}"><span class="cav ${o.timer ? 'timer' : ''}"><img src="${A(img + '.png')}" alt="">${o.dot ? '<i></i>' : ''}</span>
        <span class="ctx"><span class="ctop"><b>${name}</b>${o.timer ? `<em>${I('clock', 12)}${o.timer}</em>` : ''}</span><span class="cmsg ${o.badge || o.timer ? 'unread' : ''}">${msg}</span></span>
        <span class="cmeta"><small class="${o.badge ? 'hot' : ''}">${time}</small>${o.badge ? `<i class="cbadge">${o.badge}</i>` : ''}</span></button>`;
      return `${status('dark')}<div class="ch-h"><h1>Chats</h1><button data-a="toast:Search your chats" aria-label="Search">${I('search', 20)}</button></div>
        <div class="core"><p>${BOLT('#7AD5FE', 12, 16)} Your core connections</p><div class="core-row">${core.map(([img, n, d]) => `<button class="core-av" data-a="go:chat"><span><img src="${A(img + '.png')}" alt="">${d ? '<i></i>' : ''}</span><b>${n}</b></button>`).join('')}</div></div>
        <div class="csheet"><p class="csec">Active</p>
          ${row('a0370', 'Sarah', 'You: Film! We should do a photo walk ☕', '09:14 AM', { dot: 1 })}
          ${row('aea71', 'Maya', 'New Spark! You both love pottery', 'Now', { timer: '35h left', dot: 1 })}
          ${row('14261', 'Emma', 'Thanks, I appreciate it. See you at the market?', 'Yesterday', { badge: 1 })}
          ${row('e725a', 'Zara', 'Same here! I’ve been working on my sourdough…', 'Yesterday', { badge: 3, dot: 1 })}
          <p class="csec" style="margin-top:8px">Expired</p>
          ${row('261fe', 'Noor', 'Not too bad, just trying to catch up on sleep', 'Oct 20', { faded: 1 })}
          ${row('15ec7', 'Lina', 'You: Have you tried the new café on 5th?', 'Oct 16', { faded: 1 })}
        </div>${nav('chats')}<div style="position:absolute;bottom:0;left:0;right:0">${homeInd()}</div>`;
    },
  },
  chat: {
    t: 'Chat', g: 'App', cls: 'chat on-light',
    html: () => {
      if (!S.chat) S.chat = [['in', 'Hey! Saw we’re both around the harbour this weekend 👋'], ['out', 'Yes! I’m heading there Saturday morning to shoot the sunrise.'], ['in', 'No way, film or digital? I just picked up an old Pentax.'], ['out', 'Film! We should do a photo walk ☕']];
      return `<img class="stars" src="${A('24429.svg')}" alt="">${status('dark')}
        <div class="chat-h"><button class="bk" data-a="back" aria-label="Back"><img src="${A('a323a.svg')}" width="22" height="22" alt=""></button><div class="av"><img src="${A('28da5.png')}" alt="Sarah"><img class="i" src="${A('328f2.svg')}" style="position:absolute;right:-2px;bottom:3px;width:11px;height:11px" alt=""></div><div><b>Sarah</b><span>Online · 850 ft away</span></div></div>
        <div class="topics">${['Film cameras', 'Sunrise spots', 'Coffee'].map(t => `<button data-a="topic:${t}">${t}</button>`).join('')}</div>
        <div class="msgs" data-msgs><span class="day">Today</span>${S.chat.map(([w, t]) => `<div class="bub ${w}">${esc(t)}</div>`).join('')}</div>
        <button class="sprompt" data-a="useprompt"><span class="bt"><img src="${A('fc141.png')}" alt=""></span><span data-ptxt>${PROMPTS[S.promptIx]}</span><span class="rl" data-a="reload" role="button" aria-label="New prompt"><img src="${A('6c11d.svg')}" width="24" height="24" alt=""></span></button>
        <div class="composer"><button class="pl" data-a="toast:Photo sharing coming soon" aria-label="Add photo"><img src="${A('280df.svg')}" width="20" height="20" alt=""></button><input data-msg placeholder="Message Sarah…" aria-label="Message"><button class="sd" data-a="send" aria-label="Send"><img src="${A('4907e.svg')}" width="24" height="24" alt=""></button></div>
        ${homeInd()}`;
    },
    after: el => { const m = el.querySelector('[data-msgs]'); m.scrollTop = m.scrollHeight; el.querySelector('[data-msg]').addEventListener('keydown', e => { if (e.key === 'Enter') act('send'); }); },
  },
  qr: {
    t: 'QR code', g: 'App', cls: 'qrscr on-light',
    html: () => `${status('navy')}<div class="top"><button data-a="back" aria-label="Back">${I('chevron-left', 20)}</button><h1>My Spark code</h1><span style="width:40px"></span></div>
      <p class="lead">Friends scan your logo to connect instantly. The code wraps around the Spark mark.</p>
      <div class="qrlogo">${qrSvg()}<span class="sheen"></span></div>
      <div class="who"><b>Kaden</b><span>spirlit.app/kaden</span></div>
      <div class="acts"><button class="pri" data-a="toast:Link copied">${I('share', 18)}Share</button><button class="sec" data-a="toast:Camera opens to scan a friend’s code">${I('scan-line', 18)}Scan code</button></div>
      <div style="flex:1"></div>${homeInd()}`,
  },
};
const GI = p => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const GICON = {
  mars: GI('<circle cx="10" cy="14" r="6"/><path d="M14.5 9.5 21 3"/><path d="M15 3h6v6"/>'),
  venus: GI('<circle cx="12" cy="9" r="6"/><path d="M12 15v7"/><path d="M9 19h6"/>'),
  nb: GI('<circle cx="12" cy="15" r="6"/><path d="M12 9V2"/><path d="m9 3.5 6 3"/><path d="m15 3.5-6 3"/>'),
  trans: GI('<circle cx="12" cy="13" r="4"/><path d="M12 17v5"/><path d="M14.5 20h-5"/><path d="M18 2h4v4"/><path d="M22 2l-6.2 6.2"/><path d="M6 2H2v4"/><path d="M2 2l6.2 6.2"/><path d="M5 7l3-3"/>'),
  users: GI('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'),
};
const PROMPTS = ['What’s a photo you took that you’ll never delete?', 'Sunrise or sunset, and where’s the best spot?', 'What was the first camera you ever used?', 'If we did a photo walk, where would we go?'];
function short(n) { return ({ 1: 'Hobbies, interests and activities', 2: 'TV shows you love', 3: 'Your kind of hangout', 4: 'Peaceful places', 5: 'Favorite film genres', 6: 'Collections and keepsakes', 7: 'Close friendships', 8: 'Music genres', 9: 'Where you grew up', 10: 'Social energy', 11: 'Bookstore corner', 12: 'A memorable meal', 13: 'How connected you feel', 14: 'Dream places', 15: 'Meaningful habits', 16: 'What you geek out about', 17: 'What surprises people', 18: 'How friends describe you', 19: 'Proudest moments', 20: 'What you’re working toward', 21: 'Your Victory List', 22: 'Who shaped you', 23: 'Challenges overcome', 24: 'The question you wish people asked', 25: 'Anything else' })[n]; }
// next question to suggest: first one neither answered nor skipped, then the skipped ones
const firstUnanswered = () => { const ns = Object.keys(Q).map(Number); return ns.find(n => !answered(n) && !S.skipped[n]) ?? ns.find(n => !answered(n)); };

/* chapter intros + questions are generated */
CH.forEach((c, ci) => {
  SCREENS['ch' + (ci + 1)] = {
    t: `Chapter ${ci + 1} intro`, g: `Chapter ${ci + 1} · ${c.t}`, cls: 'dark on-dark',
    html: () => darkFrame({
      ch: ci, frac: 0, pill: `Chapter ${ci + 1} of 4`, q: c.t, h: c.d, counter: S.mode === 'quick' ? '' : `${c.qs[0] - 1}/25`,
      top: (ci > 0 && CH[ci - 1].qs.every(answered) ? `<div class="pill" style="background:rgba(110,231,183,.18);color:#6EE7B7;letter-spacing:.06em;text-transform:none;font-weight:600">✓ Chapter ${ci} complete</div>` : '') + illustration(c.ill),
      body: `<div class="qlist">${c.qs.map(n => `<div class="r"><span class="num">${n}</span><span>${short(n)}</span>${answered(n) ? `<span style="color:#6EE7B7">${I('check', 16)}</span>` : ''}</div>`).join('')}</div>`,
      next: 'Start chapter', act: 'next',
    }),
    after: el => ci > 0 && CH[ci - 1].qs.every(answered) && confetti(el, 40),
  };
  c.qs.forEach(n => {
    SCREENS['q' + n] = { t: `Q${n} ${short(n)}`, g: `Chapter ${ci + 1} · ${c.t}`, cls: 'dark on-dark', html: () => questionScreen(n, ci), after: el => wireQuestion(el, n) };
  });
});
SCREENS.q5movies = { t: 'Q5 · Pick movies', g: 'Chapter 1 · What you love', hidden: true };

function seq() { return S.mode === 'quick' ? ['quick', ...QUICK.map(n => 'q' + n), 'done'] : ['ch1', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'ch2', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12', 'ch3', 'q13', 'q14', 'q15', 'q16', 'q17', 'q18', 'ch4', 'q19', 'q20', 'q21', 'q22', 'q23', 'q24', 'q25', 'done']; }
function nextOf(id) { const s = seq(), i = s.indexOf(id); return i >= 0 ? s[i + 1] : (S.mode === 'quick' ? 'done' : null); }

function darkFrame({ ch, frac, pill, q, h, body, next, act = 'next', counter, top = '', skip = null }) {
  const cur = SCREENS[current]; // progress: chapters complete + position inside
  const segs = [0, 1, 2, 3].map(i => { let f = 0; if (ch >= 0) { if (i < ch) f = 1; else if (i === ch) f = frac ?? .5; } return `<i><b style="transform:scaleX(${f})"></b></i>`; }).join('');
  const size = q.length > 95 ? 's' : q.length > 60 ? 'm' : 'l';
  return `<span class="shine" style="left:139px;top:-93px;width:340px;height:257px;background:#DDF82E"></span><span class="shine" style="left:-91px;top:487px;width:498px;height:331px;background:#7AD5FE;opacity:.12"></span>
   ${status('white')}<div class="hdr">${backBtn()}<div class="prog" style="${ch < 0 ? 'opacity:0' : ''}">${segs}</div><button class="cnt" data-a="go:all" aria-label="All questions">${counter ?? ''}</button></div>
   <div class="content">${top}<div class="title" style="gap:12px"><div class="pill">${pill}</div><h1 class="q ${size}">${q}</h1>${h ? `<p class="helper">${h}</p>` : ''}</div><div class="ans">${body}</div></div>
   <div class="dfoot"><div class="actions">${skip ? `<button class="btn skipbtn" data-a="skip:${skip}">Skip</button>` : ''}<button class="btn" data-a="${act}">${next} ${arrow()}</button></div>${homeInd()}</div>`;
}
function questionScreen(n, ci) {
  const q = Q[n], a = S.ans[n], s = seq(), pos = s.indexOf('q' + n);
  const inCh = CH[ci].qs.indexOf(n);
  const isLastInCh = S.mode === 'full' && inCh === CH[ci].qs.length - 1;
  const counter = S.mode === 'quick' ? `${QUICK.indexOf(n) + 1}/8` : `${n}/25`;
  const nextLbl = S.mode === 'quick' ? (QUICK.indexOf(n) === 7 ? 'Finish' : 'Next') : n === 25 ? 'Finish profile' : isLastInCh ? 'Finish chapter' : 'Next';
  const frac = S.mode === 'quick' ? (QUICK.indexOf(n) + 1) / 8 : (inCh + 1) / CH[ci].qs.length;
  let body = '';
  const chipsHtml = (opts, cls = '') => `<div class="chips ${cls}">${opts.map(o => { const ic = q.icons ? (HOBBIES.find(h => h[0] === o) || [, 'sparkles'])[1] : null; return `<button class="chip ${a.sel.includes(o) ? 'on' : ''}" data-a="chip:${n}:${esc(o)}" aria-pressed="${a.sel.includes(o)}">${ic ? I(ic, 16) : ''}${esc(o)}</button>`; }).join('')}</div>`;
  if (q.type === 'chips' || q.type === 'chipsText') {
    const all = [...q.opts, ...a.extra];
    if (q.search) body += `<div class="search">${I('search', 18)}<input data-search="${n}" placeholder="${q.search}" aria-label="${q.search}"><button class="add" data-a="addchip:${n}">${I('plus', 16)}Add</button></div>`;
    body += `<div data-chiparea>${chipsHtml(all, q.icons ? 'grid2' : '')}</div>`;
    if (q.movies) { const tot = Object.values(a.movies || {}).reduce((x, y) => x + y.length, 0); body += `<button class="movrow" data-a="movies">${I('clapperboard', 18)}<span>${tot ? `${tot} movies picked · ${Object.entries(a.movies).filter(([, v]) => v.length).map(([g, v]) => `${g} ${v.length}`).join(', ')}` : 'Add movies you love for each genre'}</span><em>${tot ? 'Edit' : 'Add'}</em></button>`; }
    if (q.type === 'chipsText') body += textArea(n, a.text, q.max, q.ph, [], 150);
  } else if (q.type === 'choice') {
    body = `<div class="opts">${q.opts.map(([t, d], i) => `<button class="opt ${a.sel === i ? 'on' : ''}" data-a="opt:${n}:${i}" role="radio" aria-checked="${a.sel === i}"><span class="tx"><b>${t}</b><span>${d}</span></span><span class="radio"></span></button>`).join('')}</div>`;
    if (q.priv) body += `<div class="priv">${I('lock', 13)}${q.priv}</div>`;
  } else if (q.type === 'notes') {
    if (q.search) body += `<div class="search">${I('search', 18)}<input data-addplace="${n}" placeholder="${q.search}" aria-label="${q.search}"><button class="add" data-a="addplace:${n}">${I('plus', 16)}Add</button></div>`;
    body += `<div class="picks">${[...q.opts, ...a.extra].map(o => { const on = o in a.picks; return `<div class="pick"><button class="hd ${on ? '' : 'off'}" data-a="pick:${n}:${esc(o)}" aria-pressed="${on}"><span class="dbox ${on ? 'on' : ''}">${I('check', 14)}</span>${esc(o)}</button>${on ? `<div class="nt"><input data-note="${n}" data-key="${esc(o)}" value="${esc(a.picks[o])}" maxlength="280" placeholder="Add a line about it…" aria-label="Note for ${esc(o)}"><small>${(a.picks[o] || '').length}/280</small></div>` : ''}</div>`; }).join('')}</div>`;
    if (!q.search) body += `<div class="search" style="height:46px">${I('plus', 18)}<input data-addplace="${n}" placeholder="${q.add.replace('+ ', '')}" aria-label="Add your own"><button class="add" data-a="addplace:${n}">Add</button></div>`;
  } else if (q.type === 'text') {
    body = textArea(n, a.text, q.max, q.ph, q.prompts);
  } else if (q.type === 'list') {
    body = `<div class="vlist">${a.items.map((it, i) => `<div class="vitem">${BOLT('#7AD5FE', 12, 17)}<span>${esc(it)}</span><button data-a="vdel:${i}" aria-label="Remove ${esc(it)}">${I('x', 18)}</button></div>`).join('')}<div class="vadd">${I('plus', 18)}<input data-vadd placeholder="Add something to your list" aria-label="Add to Victory List"><button class="add" data-a="vadd" style="height:36px;padding:0 14px;border-radius:12px;background:var(--sky);color:var(--n800);font-weight:600;font-size:14px">Add</button></div></div>`;
  } else if (q.type === 'textSeg') {
    body = textArea(n, a.text, q.max, q.ph, [], 180) + `<div class="seg" role="radiogroup">${['Show on my profile', 'Only for matching'].map((t, i) => `<button class="${a.vis === i ? 'on' : ''}" data-a="seg:${i}" role="radio" aria-checked="${a.vis === i}">${i ? I('lock', 14) : I('eye', 14)}${t}</button>`).join('')}</div>`;
  } else if (q.type === 'qText') {
    const phs = ['“What’s the best gig you’ve ever been to?”', '“What would your perfect Sunday look like?”', '“What’s a skill you’d love to learn?”'];
    body = a.pairs.map((p, i) => `<div class="qacard"><div class="qahd"><span>Question ${i + 1}</span>${a.pairs.length > 1 ? `<button data-a="qadel:${i}" aria-label="Remove question ${i + 1}">${I('x', 16)}</button>` : ''}</div>
      <div class="qbox"><input data-qq="${i}" value="${esc(p.q)}" placeholder="${phs[i]}" aria-label="Question ${i + 1}"></div>
      <div class="ta" style="min-height:${a.pairs.length > 1 ? 110 : 140}px"><textarea data-qa="${i}" maxlength="${q.max}" placeholder="Your answer…" aria-label="Answer ${i + 1}">${esc(p.text)}</textarea><div class="tools"><span></span><span class="count" data-qc="${i}">${p.text.length} / ${q.max}</span></div></div></div>`).join('')
      + (a.pairs.length < 3 ? `<button class="qaadd" data-a="qaadd">${I('plus', 18)}Add another question &amp; answer</button>` : '')
      + `<p class="helper" style="font-size:12.5px;line-height:17px;color:rgba(255,255,255,.6)">Add up to 3. They show on your profile as conversation starters.</p>`;
  }
  return darkFrame({ ch: S.mode === 'quick' ? 0 : ci, frac, pill: S.mode === 'quick' ? 'Quick Spark' : CH[ci].t, q: q.q, h: q.h, body, next: nextLbl, counter, skip: n });
}
function textArea(n, val, max, ph, prompts, h = 200) {
  return `<div class="ta" style="min-height:${h}px"><textarea data-ta="${n}" maxlength="${max}" placeholder="${esc(ph)}" aria-label="Your answer">${esc(val)}</textarea><div class="tools"><button class="voice" data-a="voice">${I('mic', 15)}<span>Voice note</span></button><span class="count" data-count>${val.length} / ${max}</span></div></div>
   ${prompts && prompts.length ? `<div class="nudge">Need a nudge?</div><div class="prompts">${prompts.map(p => `<button class="prompt" data-a="nudge:${n}:${esc(p)}">${p}</button>`).join('')}</div>` : ''}`;
}
function wireQuestion(el, n) {
  el.querySelectorAll('[data-ta]').forEach(t => t.addEventListener('input', () => { S.ans[n].text = t.value; el.querySelector('[data-count]').textContent = `${t.value.length} / ${t.maxLength}`; }));
  el.querySelectorAll('[data-note]').forEach(t => t.addEventListener('input', () => { S.ans[n].picks[t.dataset.key] = t.value; t.nextElementSibling.textContent = `${t.value.length}/280`; }));
  el.querySelectorAll('[data-qq]').forEach(i => i.addEventListener('input', () => S.ans[24].pairs[+i.dataset.qq].q = i.value));
  el.querySelectorAll('[data-qa]').forEach(t => t.addEventListener('input', () => { S.ans[24].pairs[+t.dataset.qa].text = t.value; el.querySelector(`[data-qc="${t.dataset.qa}"]`).textContent = `${t.value.length} / ${t.maxLength}`; }));
  const s = el.querySelector('[data-search]');
  if (s) s.addEventListener('input', () => { const v = s.value.toLowerCase(); el.querySelectorAll('[data-chiparea] .chip').forEach(c => c.style.display = c.textContent.toLowerCase().includes(v) ? '' : 'none'); });
  if (s) s.addEventListener('keydown', e => { if (e.key === 'Enter') act('addchip:' + n); });
  el.querySelectorAll('[data-addplace]').forEach(i => i.addEventListener('keydown', e => { if (e.key === 'Enter') act('addplace:' + n); }));
  const v = el.querySelector('[data-vadd]'); if (v) v.addEventListener('keydown', e => { if (e.key === 'Enter') act('vadd'); });
}

/* ---------------- chapter illustrations ---------------- */
function illustration(kind) {
  if (kind === 'orbit') {
    const items = [['camera', 0], ['music', 60], ['mountain', 120], ['coffee', 180], ['book-open', 240], ['gamepad-2', 300]];
    return `<div class="ill orbit"><span class="orb-ring"></span><span class="orb-ring b"></span><div class="orb-core">${BOLT('#053B65', 26, 36)}</div><div class="orb-spin">${items.map(([ic, d]) => `<span class="orb-item" style="--a:${d}deg"><span>${I(ic, 20)}</span></span>`).join('')}</div></div>`;
  }
  if (kind === 'map') {
    return `<div class="ill map"><svg viewBox="0 0 320 170" width="320" height="170"><defs><linearGradient id="mg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#0E5A92"/><stop offset="1" stop-color="#0A4878"/></linearGradient></defs>
      <rect x="0" y="0" width="320" height="170" rx="26" fill="url(#mg)"/>
      <g fill="rgba(255,255,255,.07)">${[[18, 18, 70, 46], [100, 18, 90, 30], [202, 18, 100, 52], [18, 76, 52, 76], [82, 60, 72, 50], [166, 82, 56, 70], [234, 82, 68, 34], [82, 122, 72, 30], [234, 128, 68, 24]].map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`).join('')}</g>
      <path class="route" d="M52 128 C 90 120, 110 64, 160 72 S 230 128, 270 52" fill="none" stroke="#7AD5FE" stroke-width="3" stroke-linecap="round" stroke-dasharray="6 8"/></svg>
      ${[['a0370', 34, 104, 0], ['77daf', 142, 48, .4], ['e725a', 252, 26, .8]].map(([im, x, y, d]) => `<span class="mpin" style="left:${x}px;top:${y}px;animation-delay:${d}s"><img src="${A(im + '.png')}" alt=""></span>`).join('')}
      <span class="mtag" style="left:176px;top:112px">${I('coffee', 13)} Café meetup</span></div>`;
  }
  if (kind === 'aura') {
    return `<div class="ill aura"><span class="au a1"></span><span class="au a2"></span><span class="au a3"></span><img class="au-me" src="${A('77daf.png')}" alt="">
      ${[['Curious', 20, 30, 0], ['Loyal', 236, 22, .7], ['Funny', 250, 118, 1.4], ['Calm', 26, 124, 2.1]].map(([t, x, y, d]) => `<span class="trait" style="left:${x}px;top:${y}px;animation-delay:${d}s">${t}</span>`).join('')}</div>`;
  }
  return `<div class="ill path"><svg viewBox="0 0 320 170" width="320" height="170"><path class="road" d="M20 150 C 80 150, 70 96, 130 96 S 190 40, 250 44 S 300 26, 304 16" fill="none" stroke="rgba(122,213,254,.9)" stroke-width="4" stroke-linecap="round" stroke-dasharray="2 10"/></svg>
    ${[['flag', 18, 126, 0], ['star', 112, 72, .5], ['mountain', 230, 20, 1], ['heart', 280, 2, 1.5]].map(([ic, x, y, d]) => `<span class="mile" style="left:${x}px;top:${y}px;animation-delay:${d}s">${I(ic, 18)}</span>`).join('')}
    <span class="mtag" style="left:150px;top:128px;animation-delay:2s">${I('sparkles', 13)} Your next chapter</span></div>`;
}

/* ---------------- helpers ---------------- */
function otpWire(el, key) {
  const ins = [...el.querySelectorAll('.otp input')];
  ins.forEach((inp, i) => {
    inp.addEventListener('input', () => { inp.value = inp.value.replace(/\D/g, '').slice(-1); S[key][i] = inp.value; if (inp.value && ins[i + 1]) ins[i + 1].focus(); });
    inp.addEventListener('keydown', e => { if (e.key === 'Backspace' && !inp.value && ins[i - 1]) { ins[i - 1].focus(); } });
    inp.addEventListener('paste', e => { const t = (e.clipboardData.getData('text') || '').replace(/\D/g, ''); if (t) { e.preventDefault(); t.slice(0, 6).split('').forEach((d, k) => { if (ins[k]) { ins[k].value = d; S[key][k] = d; } }); } });
  });
  const firstEmpty = ins.find(i => !i.value) || ins[5]; setTimeout(() => firstEmpty.focus({ preventScroll: true }), 450);
}
function resendTimer(el, sec) {
  const p = el.querySelector('[data-resend]');
  el._timer = setInterval(() => { sec--; if (sec <= 0) { clearInterval(el._timer); p.innerHTML = 'Didn’t get it? <b class="link" style="cursor:pointer" data-a="toast:New code sent">Resend code</b>'; } else p.innerHTML = `Didn’t get it? Resend in <b>0:${String(sec).padStart(2, '0')}</b>`; }, 1000);
}
function qrSvg() {
  const N = 25, C = 9.6, O = 30, shards = [[[200, 64], [88, 166], [141.5, 166]], [[158, 144.5], [212, 144.5], [100, 236.5]]];
  const inPoly = (p, x, y) => { let h = false; for (let i = 0, j = p.length - 1; i < p.length; j = i++) { const [xi, yi] = p[i], [xj, yj] = p[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) h = !h; } return h; };
  const near = (x, y) => [[0, 0], [12, 0], [-12, 0], [0, 12], [0, -12], [9, 9], [-9, -9], [9, -9], [-9, 9]].some(([dx, dy]) => shards.some(p => inPoly(p, x + dx, y + dy)));
  const finder = (r, c) => (r < 8 && c < 8) || (r < 8 && c >= N - 8) || (r >= N - 8 && c < 8);
  let seed = 42; const rnd = () => (seed = seed * 16807 % 2147483647) / 2147483647; let d = '';
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) { const on = rnd() < .5; if (!on || finder(r, c)) continue; const x = O + c * C, y = O + r * C; if (near(x + C / 2, y + C / 2)) continue; const cx = x + C / 2 - 150, cy = y + C / 2 - 150; if (Math.abs(cx) > 110 && Math.abs(cy) > 110) continue; d += `M${x + .8} ${y + .8}h${C - 1.6}v${C - 1.6}h-${C - 1.6}z`; }
  const eye = (r, c) => { const x = O + c * C + 6, y = O + r * C + 6; return `<rect x="${x}" y="${y}" width="56" height="56" rx="16" fill="none" stroke="#fff" stroke-width="8"/><rect x="${x + 16}" y="${y + 16}" width="24" height="24" rx="7" fill="#fff"/>`; };
  return `<svg width="300" height="300" viewBox="0 0 300 300" role="img" aria-label="Spark QR code"><path d="${d}" fill="#fff" fill-opacity=".92"/>${eye(0, 0)}${eye(0, N - 8)}${eye(N - 8, 0)}<g fill="#F2FDFF" style="filter:drop-shadow(0 6px 12px rgba(10,40,140,.35))"><path d="M200 64 88 166h53.5z"/><path d="M158 144.5h54L100 236.5z"/></g></svg>`;
}
function nav(on) {
  const it = [['home', 'Home', 'b9f91.svg', '1a0c1.svg'], ['nearby', 'Nearby', 'a7c68.svg', 'fe323.svg'], ['chats', 'Chats', 'a2be4.svg', 'a2be4.svg'], ['all', 'Profile', 'f508f.svg', 'f508f.svg']];
  return `<nav class="pillnav" aria-label="Tabs">${it.map(([id, l, ic, ica]) => id === on ? `<button class="on" aria-current="page"><img src="${A(ica)}" alt="">${l}</button>` : `<button data-a="tab:${id}" aria-label="${l}"><img src="${A(ic)}" alt=""></button>`).join('')}</nav>`;
}
function confetti(el, count = 70) {
  const box = document.createElement('div'); box.className = 'confetti';
  const cols = ['#7AD5FE', '#7AD5FE', '#DDF82E', '#FF8A5B', '#fff', '#6EE7B7'];
  for (let i = 0; i < count; i++) { const c = document.createElement('i'); c.style.left = Math.random() * 390 + 'px'; c.style.background = cols[i % cols.length]; c.style.animationDuration = 1.8 + Math.random() * 1.6 + 's'; c.style.animationDelay = Math.random() * .5 + 's'; c.style.transform = `rotate(${Math.random() * 360}deg)`; box.appendChild(c); }
  el.appendChild(box); setTimeout(() => box.remove(), 4200);
}
function toast(msg) { const t = document.querySelector('.toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('on'), 1900); }
function iosAlert(title, text, onAllow) {
  const w = document.createElement('div'); w.className = 'alert-wrap';
  w.innerHTML = `<div class="alert" role="alertdialog" aria-label="${esc(title)}"><h4>${title}</h4><p>${text}</p><button data-x="1" class="b">Allow While Using App</button><button data-x="1">Allow Once</button><button data-x="0">Don’t Allow</button></div>`;
  w.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; w.remove(); onAllow(); });
  document.querySelector('.vp').appendChild(w);
}
function openSheet() {
  const el = currentEl(), a = S.ans[5]; a.movies = a.movies || {};
  const genres = a.sel.length ? a.sel : ['Adventure']; if (!genres.includes(S.tab)) S.tab = genres[0];
  const list = (MOVIES[S.tab] || GENERIC_MOVIES).filter(m => m[0].toLowerCase().includes(S.mq.toLowerCase()));
  const picked = a.movies[S.tab] || [];
  const tot = Object.values(a.movies).reduce((x, y) => x + y.length, 0);
  let sh = el.querySelector('.sheet');
  const html = `<div class="grab"></div><div class="in"><div class="sh"><div><b>Pick your movies</b><span>Add favorites for each genre you chose</span></div><button class="x" data-a="closesheet" aria-label="Close">${I('x', 16)}</button></div>
    <div class="tabs">${genres.map(g => `<button class="tab ${g === S.tab ? 'on' : ''}" data-a="mtab:${esc(g)}">${esc(g)}<i>${(a.movies[g] || []).length}</i></button>`).join('')}</div>
    <div class="search">${I('search', 18)}<input data-mq value="${esc(S.mq)}" placeholder="Search ${esc(S.tab)} movies…" aria-label="Search movies"><button class="add" data-a="toast:Custom movie added">${I('plus', 16)}Add</button></div>
    <div class="movies">${list.map(([m, meta]) => { const on = picked.includes(m); return `<button class="movie ${on ? 'on' : ''}" data-a="movie:${esc(m)}" aria-pressed="${on}"><span class="pst">${I('film', 18)}</span><span class="tx"><b>${esc(m)}</b><span>${meta}</span></span><span class="dbox ${on ? 'on' : ''}">${I('check', 14)}</span></button>`; }).join('') || '<p class="helper">No matches. Tap Add to add your own.</p>'}</div></div>
    <div class="sfoot"><button class="btn" data-a="closesheet">Done · ${tot} movie${tot === 1 ? '' : 's'} ${arrow()}</button>${homeInd()}</div>`;
  if (!sh) { const sc = document.createElement('div'); sc.className = 'scrim'; sc.dataset.a = 'closesheet'; sh = document.createElement('div'); sh.className = 'sheet'; sh.setAttribute('role', 'dialog'); sh.setAttribute('aria-label', 'Pick your movies'); el.append(sc, sh); }
  const keepFocus = document.activeElement && document.activeElement.matches('[data-mq]'); const caret = keepFocus ? document.activeElement.selectionStart : 0;
  sh.innerHTML = html; lucide.createIcons();
  const q = sh.querySelector('[data-mq]'); q.addEventListener('input', () => { S.mq = q.value; openSheet(); });
  if (keepFocus) { q.focus(); q.setSelectionRange(caret, caret); }
}
function closeSheet() { const el = currentEl(), sh = el.querySelector('.sheet'); if (!sh) return; sh.classList.add('out'); el.querySelector('.scrim').remove(); setTimeout(() => { sh.remove(); refresh(); }, 280); }

/* ---------------- actions ---------------- */
function act(a, target) {
  const [k, ...r] = a.split(':'), v = r.join(':');
  const n = +r[0];
  switch (k) {
    case 'go': return go(v);
    case 'back': return back();
    case 'next': { if (/^q\d+$/.test(current)) delete S.skipped[+current.slice(1)]; const nx = nextOf(current); if (nx) go(nx); return; }
    case 'skip': { S.skipped[n] = true; toast('Skipped · answer it anytime from your profile'); const nx = nextOf(current); if (nx) go(nx); return; }
    case 'tab': return go(v, 'fade');
    case 'toast': return toast(v);
    case 'slide': return currentEl()._slide && currentEl()._slide(+v);
    case 'terms': S.terms = !S.terms; return refresh();
    case 'gender': S.gender = v; return refresh();
    case 'showgender': S.showGender = !S.showGender; return refresh();
    case 'who': S.who = v; return refresh();
    case 'eye': { const inp = target.closest('.input').querySelector('input'); inp.type = inp.type === 'password' ? 'text' : 'password'; target.closest('.eye').innerHTML = I(inp.type === 'password' ? 'eye' : 'eye-off', 20); lucide.createIcons(); return; }
    case 'verify': case 'verify2': { const key = k === 'verify' ? 'otp' : 'code2'; if (S[key].join('').length < 6) { const o = currentEl().querySelector('.otp'); o.classList.remove('shake'); void o.offsetWidth; o.classList.add('shake'); toast('Enter all 6 digits'); return; } return go(k === 'verify' ? 'birthday' : 'newpass'); }
    case 'reset': toast('Password updated'); S.code2 = ['', '', '', '', '', '']; hist = hist.filter(h => !['forgot', 'code', 'newpass', 'login'].includes(h)); return go('login', 'fade');
    case 'padd': { const pool = ['77daf.png', 'a0370.png', '14261.png', 'e725a.png', 'bf408.png', '15ec7.png']; S.photos.push(pool[S.photos.length % pool.length]); return refresh(); }
    case 'prm': S.photos.splice(+v, 1); return refresh();
    case 'alert': return k && v === 'loc' ? iosAlert('Allow “Spirlit” to use your location?', 'We show people within 1 mi. Your exact spot is never shared.', () => go('notifications')) : iosAlert('“Spirlit” Would Like to Send You Notifications', 'Notifications may include alerts, sounds and icon badges.', () => go('pstart'));
    case 'path': S.path = v; return refresh();
    case 'startpath': S.mode = S.path === 'quick' ? 'quick' : 'full'; return go(S.mode === 'quick' ? 'quick' : 'ch1');
    case 'quickgo': S.mode = 'quick'; return go('q1');
    case 'goq': { if (S.mode === 'quick' && !QUICK.includes(n)) S.mode = 'full'; return go('q' + n); }
    case 'chip': { const a2 = S.ans[n], o = r.slice(1).join(':'); const i = a2.sel.indexOf(o); i >= 0 ? a2.sel.splice(i, 1) : a2.sel.push(o); target.closest('.chip').classList.toggle('on', i < 0); target.closest('.chip').setAttribute('aria-pressed', i < 0); if (Q[n].movies) refreshKeep(); return; }
    case 'addchip': { const inp = currentEl().querySelector('[data-search]'); const val = (inp && inp.value.trim()) || ''; if (!val) { inp && inp.focus(); return toast('Type something to add'); } const a2 = S.ans[n]; if (![...Q[n].opts, ...a2.extra].some(o => o.toLowerCase() === val.toLowerCase())) a2.extra.push(val); if (!a2.sel.includes(val)) a2.sel.push(val); return refreshKeep(); }
    case 'opt': { S.ans[n].sel = +r[1]; currentEl().querySelectorAll('.opt').forEach((o, i) => { o.classList.toggle('on', i === +r[1]); o.setAttribute('aria-checked', i === +r[1]); }); return; }
    case 'pick': { const p = S.ans[n].picks, o = r.slice(1).join(':'); o in p ? delete p[o] : (p[o] = ''); return refreshKeep(); }
    case 'addplace': { const inp = currentEl().querySelector(`[data-addplace]`); const val = inp.value.trim(); if (!val) { inp.focus(); return; } const a2 = S.ans[n]; if (![...Q[n].opts, ...a2.extra].includes(val)) a2.extra.push(val); a2.picks[val] = a2.picks[val] || ''; return refreshKeep(); }
    case 'nudge': { const ta = currentEl().querySelector('[data-ta]'); const p = r.slice(1).join(':'); const start = PROMPT_TEXT[p] || (p + ': '); ta.value = (ta.value ? ta.value.trim() + ' ' : '') + start; ta.dispatchEvent(new Event('input')); ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length); return; }
    case 'voice': { const b = target.closest('.voice'); if (b.classList.toggle('rec')) { b.innerHTML = '<span class="dot"></span><span>Recording… tap to stop</span>'; } else { b.innerHTML = `${I('mic', 15)}<span>Voice note</span>`; lucide.createIcons(); const ta = currentEl().querySelector('[data-ta]'); if (!ta.value) { ta.value = ta.placeholder.replace('…', '.'); ta.dispatchEvent(new Event('input')); } toast('Voice note transcribed'); } return; }
    case 'vdel': S.ans[21].items.splice(+v, 1); return refreshKeep();
    case 'vadd': { const inp = currentEl().querySelector('[data-vadd]'); const val = inp.value.trim(); if (!val) return inp.focus(); S.ans[21].items.push(val); refreshKeep(); currentEl().querySelector('[data-vadd]').focus(); return; }
    case 'seg': S.ans[23].vis = +v; return refreshKeep();
    case 'qaadd': { const P = S.ans[24].pairs; if (P.length >= 3) return; P.push({ q: '', text: '' }); refreshKeep(); const el = currentEl(), c = el.querySelector('.content'); c.scrollTo({ top: c.scrollHeight, behavior: 'smooth' }); el.querySelector(`[data-qq="${P.length - 1}"]`).focus({ preventScroll: true }); return; }
    case 'qadel': S.ans[24].pairs.splice(+v, 1); return refreshKeep();
    case 'movies': S.mq = ''; return openSheet();
    case 'mtab': S.tab = v; S.mq = ''; return openSheet();
    case 'movie': { const a2 = S.ans[5]; a2.movies[S.tab] = a2.movies[S.tab] || []; const L = a2.movies[S.tab], i = L.indexOf(v); i >= 0 ? L.splice(i, 1) : L.push(v); return openSheet(); }
    case 'closesheet': return closeSheet();
    case 'bolt': { S.sparks[n] = !S.sparks[n]; target.closest('.bolt').classList.toggle('sent', !!S.sparks[n]); if (S.sparks[n]) toast('Spark sent ⚡'); return; }
    case 'card': return go('match');
    case 'req': { const row = currentEl().querySelector(`[data-req="${n}"]`); row.classList.add('gone'); S.reqs[n] = 0; toast(+r[1] ? 'Connected! Say hi in Chats' : 'Request declined'); setTimeout(refreshKeep, 320); return; }
    case 'send': return sendMsg();
    case 'topic': { const i = currentEl().querySelector('[data-msg]'); i.value = `Tell me about ${v.toLowerCase()}!`; i.focus(); return; }
    case 'reload': { S.promptIx = (S.promptIx + 1) % PROMPTS.length; const el = currentEl(); el.querySelector('[data-ptxt]').textContent = PROMPTS[S.promptIx]; const rl = el.querySelector('.rl'); rl.style.transform = `rotate(${(rl._r = (rl._r || 0) + 360)}deg)`; return; }
    case 'useprompt': { const i = currentEl().querySelector('[data-msg]'); i.value = PROMPTS[S.promptIx]; i.focus(); return; }
  }
}
function sendMsg() {
  const el = currentEl(), inp = el.querySelector('[data-msg]'), t = inp.value.trim(); if (!t) return inp.focus();
  S.chat.push(['out', t]); inp.value = '';
  const m = el.querySelector('[data-msgs]'); m.insertAdjacentHTML('beforeend', `<div class="bub out">${esc(t)}</div><div class="typing"><i></i><i></i><i></i></div>`); m.scrollTop = m.scrollHeight;
  const replies = ['Love that! Saturday 6am at the pier? 📸', 'Haha same. I’ll bring coffee ☕', 'Deal! I know a great spot for the light.', 'Yes!! Can’t wait.'];
  setTimeout(() => { if (current !== 'chat') return; const r = replies[S.chat.length % replies.length]; S.chat.push(['in', r]); const ty = m.querySelector('.typing'); ty && ty.remove(); m.insertAdjacentHTML('beforeend', `<div class="bub in">${esc(r)}</div>`); m.scrollTop = m.scrollHeight; }, 1400);
}

/* ---------------- router ---------------- */
let current = null, hist = [];
const vp = () => document.querySelector('.vp');
const currentEl = () => vp().querySelector('.scr:not(.leaving)');
function build(id) {
  const d = SCREENS[id], el = document.createElement('div');
  el.className = 'scr ' + (d.cls || ''); el.dataset.id = id;
  el.innerHTML = d.html();
  el.addEventListener('click', e => {
    const t = e.target.closest('[data-a]');
    if (t && el.contains(t) && !t.disabled) { e.stopPropagation(); act(t.dataset.a, t); }
    else if (d.click && !e.target.closest('input,textarea')) d.click();
  });
  return el;
}
function show(id, dir, anim) {
  const d = SCREENS[id]; if (!d || !d.html) return;
  vp().querySelectorAll('.scr.leaving').forEach(s => s.remove());
  const old = currentEl(); if (old) clearInterval(old._timer), clearTimeout(old._auto);
  current = id;
  const el = build(id);
  const enter = anim === 'fade' ? 'fade' : dir < 0 ? 'from-left' : 'from-right';
  el.classList.add(enter); vp().insertBefore(el, vp().querySelector('.toast'));
  if (old) { old.classList.add('leaving'); if (dir < 0) old.style.zIndex = 2; setTimeout(() => old.remove(), 440); }
  lucide.createIcons();
  void el.offsetWidth; el.classList.add('anim'); el.classList.remove(enter);
  if (old) { old.classList.add('anim', dir < 0 ? 'to-right' : 'to-left'); }
  d.after && d.after(el);
  if (d.auto) el._auto = setTimeout(() => current === id && go(d.auto[0], 'fade'), d.auto[1]);
  document.title = 'Spirlit · ' + d.t;
  document.querySelectorAll('.side .it').forEach(b => b.classList.toggle('on', b.dataset.id === id));
  try { history.replaceState(null, '', '#' + id); } catch (e) { }
}
function refresh() { // re-render current screen in place
  const el = currentEl(); if (!el) return; const sc = el.querySelector('.content,.scroll'); const top = sc ? sc.scrollTop : 0;
  clearInterval(el._timer);
  el.innerHTML = SCREENS[current].html(); lucide.createIcons(); SCREENS[current].after && SCREENS[current].after(el);
  const sc2 = el.querySelector('.content,.scroll'); if (sc2) sc2.scrollTop = top;
}
const refreshKeep = refresh;
function go(id, anim) { if (!id || !SCREENS[id] || !SCREENS[id].html) return; if (current) hist.push(current); show(id, 1, anim); }
function back() { if (currentEl() && currentEl().querySelector('.sheet')) return closeSheet(); if (!hist.length) return; show(hist.pop(), -1); }

/* ---------------- shell ---------------- */
function shell() {
  const nav = document.getElementById('nav'); let g = '';
  const ORDER = ['splash', 'getstarted', 'signup', 'verify', 'birthday', 'gender', 'sparkwith', 'photos', 'location', 'notifications', 'login', 'forgot', 'code', 'newpass', 'pstart', 'quick',
    'ch1', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'ch2', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12', 'ch3', 'q13', 'q14', 'q15', 'q16', 'q17', 'q18', 'ch4', 'q19', 'q20', 'q21', 'q22', 'q23', 'q24', 'q25', 'done', 'all', 'home', 'nearby', 'match', 'chats', 'chat', 'qr'];
  ORDER.map(id => [id, SCREENS[id]]).forEach(([id, d]) => {
    if (!d || d.hidden) return;
    if (d.g !== g) { g = d.g; nav.insertAdjacentHTML('beforeend', `<div class="grp">${g}</div>`); }
    nav.insertAdjacentHTML('beforeend', `<button class="it" data-id="${id}">${d.t}</button>`);
  });
  nav.addEventListener('click', e => { const b = e.target.closest('.it'); if (b) { if (b.dataset.id === 'quick') S.mode = 'quick'; else if (/^(ch\d|q\d+)$/.test(b.dataset.id)) S.mode = 'full'; go(b.dataset.id, 'fade'); } });
  document.getElementById('bBack').onclick = back;
  document.getElementById('bReset').onclick = () => { S = freshState(); hist = []; show('splash', 1, 'fade'); };
  addEventListener('keydown', e => { if (e.target.matches('input,textarea')) return; if (e.key === 'ArrowLeft') back(); });
  const phone = document.querySelector('.phone'), stage = document.querySelector('.stage');
  const fit = () => { const s = Math.min(1, (stage.clientHeight - 32) / 864, (stage.clientWidth - 24) / 410); phone.style.transform = `scale(${s})`; phone.style.margin = `${-(864 * (1 - s)) / 2}px ${-(410 * (1 - s)) / 2}px`; };
  addEventListener('resize', fit); fit();
  const start = location.hash.slice(1); show(SCREENS[start] && SCREENS[start].html ? start : 'splash', 1, 'fade');
}
shell();
