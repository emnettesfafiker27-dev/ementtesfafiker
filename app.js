(() => {
'use strict';

const CONFIG = window.SFL_CONFIG || { firebase: { projectId: '', apiKey: '' }, defaultPin: '1234' };

/* ---------- constants ---------- */
const SUBJECTS = [
  {am:'መሠረተ ሃይማኖት', en:'Fundamentals of Faith'},
  {am:'ልሳነ ግዕዝ', en:'Ge\u2019ez Language'},
  {am:'ክርስቲያናዊ ስነምግባር', en:'Christian Ethics'},
  {am:'የመፅሐፍ ቅዱስ ጥናት', en:'Bible Study'},
  {am:'የቤተክርስቲያን ታሪክ', en:'Church History'},
  {am:'ሥርዓተ ቤተክርስቲያን', en:'Church Order & Liturgy'}
];
const MONTHS = ['መስከረም','ጥቅምት','ኅዳር','ታኅሣሥ','ጥር','የካቲት','መጋቢት','ሚያዝያ','ግንቦት','ሰኔ','ሐምሌ','ነሐሴ'];
const MAX = [20,10,10,10,10,40];
const DEFAULTS = {
  year:'2019', years:[], promo:{}, classes:['1','2','3','4','5','7','9 ለ'], gallery:[], pinHash:'',
  contact:{location:'',phone:'',email:'',hours:''},
  social:{tiktok:'',instagram:'',telegram:'',youtube:''}
};
/* Student names from the school's attendance workbook (by class) */
const SEED = {"1":["ሂራ አለማየሁ መለሰ","ሀና አብርሃም በቀለወርቅ","መክሊት ሳሙኤል ነገሰ","መክሊት ስማቸው ሙሉ","ማራማዊት አምሳለ ምስጋን","ማራማዊት አረጋ እለፋቸው","ማኪባ አሸናፊ አክሊሉ","ረድኤት ሙሉጌታ ፈንታ","ራሔል ብርሃኑ ፈይሳ","ሮቤል አዲሱ ግርማ","ሶሊያና መኮንን አበራ","ሶሊያና ይልቃል ሞሱ","ቃለአብ ሽመልስ እንዳልካቸው","ቃልኪዳን ብርሃኑ አድማሴ","ቅዱስ አበራ አበበ","በረከት ሲሳይ ንዋይ","በጸሎት ሀብታሙ ዳዲ","ቤተልሔም መብሬ አሰፋ","ቤዛዊት አበባ","ተመስገን መስፍን አለሙ","ናትናኤል መብራቱ","አሜን መሬው","አሜን ሽታው በጋሻው","አሜን አብርሃም ጌትነት","አሜን ወንደሰን አፈወርቅ","አሜን ደረጄ እምዪ","አፎሚያ ሀብታሙ","ኤደን ከፍያለው ምናሉ","ኤዶም ዘሪሁን ጌቱ","እስቅያስ ኤፍሬም ስዩም","እድላዊት ሙሉጌታ ፈንታ","የኔወርቅ አንበሉ ይታይሽ","የአምላክ ፍቅሩ ዘለቀ","ያሬድ አሰግደው ሀ/ጊዮርጊስ","ያሬድ ጉደታ ደማና","ዮሐና ዘላለም በጋሻው","ዮሐናን ተስፋሁን ውበቴ","ዮናታን ሳ/ማርያም ወርቁ","ዳግማዊት ሞላ ተስፋዬ","ዳግም እንዳልካቸው አቦሀይ","ገሊላ አዳም አባተ","ፅጌማርያም ንጋቱ ደሬ","ፍራኦል ታምራት ከበደ"],"2":["ሄኒ አመነ","ሄኖን ልዑል","ሄኖን ልዑል ደለለኝ","ህይወት ገዛህኝ ደገፋ","ለአለም ሲሳይ በላይ","መልኬ ካሳሁን አርጋው","መስከረም ታገል ዘለቀ","መክሊት ብሩክ ረታ","መክሊት ያሬድ","ሙሉ ሰለሞን ትዛዙ","ሚኪያስ ቶማስ አያልቅበት","ማርኮን ሙሴ አብዬ","ማክሪያና አሸናፊ ተሾመ","ሜናታ አለማየሁ መለሰ","ምንተስኖት ጸጋዬ ሽብሩ","ራኬብ ጌታቸው","ሮቤል አዳርጌ ብርሃኑ","ሰላም መሬው ባሳዝን","ሲሳይ እንዳለ","ሳሙኤል ካሳው ፋንታው","ቃልኪዳን መስፍን አያሌው","ቃልኪዳን አዳም አባተ","ቅዱስ በረከት ማሞ","ቅዱስ ኃይሉ ያደቴ","ቅድስት አብርሃም በቀለወርቅ","ቢታንያ ቢያልፍልኝ ጤናው","በረከት ሽፈራው ቦጋለ","በሱፍቃድ ቅዱስ ዮሐንስ","ተመስገን መስፍን አለም","ባህራን ምንተስኖት መኮንን","ቴም አመነ ወልዴ","ኑኤል ልዑል ደለለኝ","ናሆም ደምሬ ታደሰ","ናታኒም ፍቃዱ ቅጣው","ናታን ይልቃል ሞርሱ","ናታን ይድነቃቸው","አላዛር ሰለሞን ለታ","አማኑኤል መስፍን አለሙ","አማኑኤል ሽመልስ ክፍሌ","አማናዊት ደረጄ አሰፋ","አርሴማ ድሪባ ጫልቱ","አትናስያ እንየው","ኢዛና ሀብታሙ","ኤልሻዳይ ድሪባ ጭላልቱ","ኤልዳና ሃይማኖት","ኤርሚያስ ሲሳይ","ኤሴቅ በለጠ ጓጓው","ኤደን አማረ","እንቁጣጣሽ አበባ ያዜ","እዮአብ ኤልያስ ጌታቸው","እድላዊት ኤልያስ አበራ","ኪሩቤል ፍቃዱ ባዴፍራው","የአብስራ ዳንኤል ሰለሞን","የገብርኤል ዮናስ በድሉ","ያብስራ ዳንኤል ሰለሞን","ዮሐናን መርከቡ አሰፋ","ዮሐንስ ፍቅሬ ረጋሳ","ፍሬህይወት ብሩክ ረታ","ዮርዳኖስ ደረጄ ተክለአብ","ዮናታን ዳንኤል ታደሰ"],"3":["ሀና ሽፈራው አየለ","ሀና ደጀኔ ደገፋው","ሀዊ ወንደሰን አንስማ","ለአምላክ ዘሪሁን ቸሬ","መቅደስ ጌታቸው","መባ ጥላሁን ነጋሽ","መክሊት ሸዋንግዛው ከበደ","ማርያማዊት ሙሴ አብዱ","ማስተዋል ሰውቢሆን መንገሻ","ሜሎስ ኢዮብ","ምህረት በላይ ዘለቀ","ረድኤት ታከለ ማኔ","ሰማንታ ዳንኤል ዘውዴ","ሰብለ ምህረቱ አዳነ","ሳሙኤል ሀብታሙ ይበልጣል","ቃልኪዳን ማሙሽ","ቃልኪዳን ተስፋዬ","ቃልኪዳን ጥላሁን","ቅዱስ አዲሱ ተጋፈ","ቅዱስ ዘላለም","በሱፍቃድ ይበልጣል አበበ","በትግስት አምበሉ","በአምላክ ወንደሰን አፈወርቅ","ቤተልሔም ካሳው ፋንታ","ቤተልሔም ደግፌ","ነሕሚያ ዘላለም","ኑሃሚን መኮንን","ናሆም መርከቡ ከበደ","ናሆም ካሳሁን አባተ","ናታን መልሰው ይታየው","አላዛር ልዑል","አማኑኤል ቴዎድሮስ","አሜን ብርሀኑ","አሜን እንዳልካቸው አብሀይ","አቅሌሲያ ፍቃዱ","አቤሜሌክ አሸብር አቦ","አብሳላት ሰለሞን","አዶናኤል አብይ","ኢዩኤል አብይ እሸቱ","ኤልሳቤት ተፈሪ","ኤልዳና ሞላ ተስፋዬ","ኤልዳና ሰለሞን","ኤልዳና ዳንኤል ሰለሞን","ኤርሚያስ ሲሳይ ዘውዴ","ኤዶም ፍ/ሰላም ወርቅ አለማየሁ","ኤፍራታ አለማየሁ","እሴተ ወንደሰን","እንዳልክ አሸናፊ አክሊሉ","ወርቅ አለማየሁ ወንድሙ","የማርያም አክሊል","ዮርዳኖስ ደምስ","ዮቶር ታደሰ ላቀው","ዳዊት አሸናፊ","ገሊላ ደረጄ አስፋ","ጸጋ ታደሰ ኦቦ","ፍሬህይወት ሰለሞን","ፍሬህይወት ብሩክ ረታ","ፍቅርተ ደሳለኝ"],"4":["ሀቢት ዘሪሁን","ሀሴት ዘሪሁን","ሀና ዘሪሁን","ሚኪያስ ደረጄ","ሚካኤል ዳንኤል","ሜሮብ ጫላ","ሰላም ሰለሞን","ሱራፌል መላኩ","ሶፎንያስ ፍፁም","ረድኤት በላይ","ቅዱስ ካሳሁን","ቅዱስ ውብአንተ","በሱፍቃድ አበበ","በሱፍቃድ ጥላሁን","በረከት እንየው","በትንሳኤ ፍቅሩ","ቢታንያ አባይነህ","ቤተልሔም ሀብታሙ","ቤዛዊት ልንገረው","ቤዛዊት እንሰርሙ","ብሌን በረከት","ብሩክ ስንታየሁ","ብርሀኔ ሰለሞን","ናታኒም ዮሐንስ","ናታን መኮንን","ናትናኤል ቢንያም","ናትናኤል ብሩክ","ናትናኤል ደምስ","አሐቲ ታደሰ","አላዛር ብርሌው","አሜን ታደስ","አናን ጫላ","ኢዮስያስ እንዳሻው","ኢዮብ ለገሰ","ኤልያስ ልንገረው","ኤልዳና ሀብታሙ","ኤልዳና ሙሉጌታ","ኤርሚያስ ከተማ","እሌኒ በላይ","ኢዩኤል ፍቃዱ","እድላዊት ሀቢብ","እድላዊት መላኩ","ኬርኔም አለማየሁ","የአብስራ ተክሉ","የአብፀጋ ደሳለኝ","ያሬድ ብርሀኑ","ዮሐንስ ሽታው","ዮሐንስ ታከለ","ዮሐንስ ጌታነህ","ዮርዳኖስ ይርጋለም","ዳናዊት መስፍን","ዳግማዊ ፍቅሩ","ፅዮን በእውቀት","ፍቅርተ ሲሳይ","አቤሜሌክ አሸብር አቦ"],"5":["ህሊና ፍቃዱ ጋዲሳ","ሀብታሙ ሽመልስ","ሃይማኖት ዘላለም","ህይወት ሀይሉ ባለው","ህይወት ድንበሩ አበራ","ህይወት ጌታሁን አስፋው","ሊዲያ ምሳው አዝምቴ","ልዑል ሽፈራው ቦጋለ","ልደት አንማው አለሙ","መልካምስራ አይረሳም እጅግ","መታሰቢያ ካለአምላክ ተካልኝ","መክሊት ጥላሁን አረጋው","ሚኪያስ አበበ","ማራማዊት በላይሁን","ሰላም ቸኮል ጌታመሳይ","ሱሲኒዮስ አካሉ ገብሬ","ሲልቫና ፍቅረማርያም ፈንታ","ሲናን ደረጄ አበራ","ሳምራዊት ለማ አየናቸው","ሶሊያና ታደሰ ግርማ","ሶሊያና ደበበ አለሙ","ረድኤት አሸናፊ አክሊሉ","ሩት ኤርሚያስ ከበደ","ቅዱስ በላይ","በሱፍቃድ አበበ ዶሻ","በአምላክ ፍቅሬ","በፀሎት ሞላ አንዳርጌ","ቤተልሔም አበበ","ናሆም በአምላኩ","አላዛር ተሾመ ባጫ","አሜን ጌቱ ደሜ","አኪያ ፃዲቁ ድንቁ","አፎሚያ መልሰው ይታየው","ኤልዳና ንጉስ ጋሻው","እየሩስ እያሱ የኛሰው","እዮብ አያሌው ያለው","እድላዊት ኤርሚያስ","ኦሪት ሙሴ ምትኩ","ኮኬት ሠለሞን ገመቹ","የአብስራ ተስፋሁን አረጋህኝ","የአብስራ ይግረማቸው በልሁ","ዳግማዊ አያሌው ያለው","ዳግም ፃዲቁ ድንቁ","ፅጌረዳ ብርሃኑ ይርጋ","ፍሬዘር አማረ ዘነበ","ጥበብ ያሬድ","ሰማንታ ዳንኤል"],"7":["ሀሴት አንዱአለም አጥናፍ","ሀብታሙ ከበደ","ሄርሜላ ሞገሴ","ሄኖክ ፍቃዱ ጋዲሳ","መሠረት ማስረሻ","መቅደላዊት ደረጄ ታደሰ","ማህሌት አስራት","ማትያስ ተሾመ ግርማ","ሶፎንያስ ጋሻው አየለ","ቃለአብ የሺንጉስ ጸጉ","ቃልኪዳን ተሾመ","ቅዱስ በላይ ዘለቀ","ቆንጂት ወንደሰን","ትግስት አለኸኝ","ትግስት ጎበዜ ተዘራ","ናትናኤል ወንሰደን ከበደ","አቤል ኮሩ በርታ","አትናሲያ ፍቃዱ ይርጋ","አእላፍ ሶሎሞን ጌታሰው","እስጢፋኖስ ካሳው ፋንታ","እዮብ ካሳው ፈንታ","ኪያ ታሪኩ","ዘሚካኤል","ያሬድ ስንታየሁ ሀ/ማርያም","ዳናት ብርሀኑ ደምሴ","ገሊላ ጎሳዬ ከበደ","ፍራኦል ተመስገን ጻዲቄ"],"9 ለ":["ሃና ታደሰ","ህሊና በላይሁን","ሊዲያ ደጀኔ","መቅደላዊት ደሳለኝ","ሙሴ ፋንታሁን","ሚካኤል ሽመልስ","ሚካኤል ተስፋዬ","ማህደር አምሳሉ","ማራማዊት ብርሀኑ","ሜሮን አየለ","ሶሊያና በሪሁን","ሮቤል ተክሌ","ሮቤል አባይነህ","ቅዱስ ወንደሰን","ቅዱስ ደመሰው","ቢታኒያ ምትኩ","ቤዛዊት አሸብር","ብሌን ካሳሁን","ቶማስ አባተ","ኑሃሚን አሌክስ","ናታን አበቀ","አስናቀች መሳፍንት","አቢጊያ ሙሉጌታ","አንቲኮ ይስሀቅ","አዶኒያስ አምሳሉ","ዘላለም ተመስገን","ይስሃቅ ማትያስ","ይዲዲያ ታየ","ጽድቅነሽ ፀጋዬ"]};
const TABS = [
  ['dashboard','Dashboard','ዳሽቦርድ'],['students','Students','ተማሪዎች'],['classes','Class lists','የክፍል ዝርዝር'],['register','Register','ምዝገባ'],
  ['attendance','Attendance','ተገኝነት'],['marks','Marks','ውጤት'],['results','Results & rank','ደረጃ'],['promote','Promotion','ማሸጋገር'],
  ['uniform','Uniform','ልብሰ ስብሐት'],['gallery','Gallery','ፎቶ'],['books','Teaching books','የመምህራን መጻሕፍት'],['users','Users','ተጠቃሚዎች'],['settings','Settings','ቅንብር'],['account','My account','መለያዬ']
];
/* Who can open which tab. tabs:null = everything (super admin). */
const ROLES = {
  super:{en:'Super admin', am:'ዋና አስተዳዳሪ', tabs:null},
  teacher:{en:'Class teacher', am:'የክፍል መምህር', tabs:['dashboard','students','marks','results','books','account']},
  registrar:{en:'Registrar', am:'መዝጋቢ', tabs:['dashboard','students','classes','register','uniform','account']},
  attendance:{en:'Attendance keeper', am:'የተገኝነት ተቆጣጣሪ', tabs:['dashboard','attendance','account']},
  uniform:{en:'Uniform keeper', am:'የልብሰ ስብሐት ተቆጣጣሪ', tabs:['dashboard','uniform','account']}
};
const roleName = r => ROLES[r] ? `${ROLES[r].en} · ${ROLES[r].am}` : r;

/* ---------- helpers ---------- */
const $ = (s, r=document) => r.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let _n = 0;
const uid = () => Date.now().toString(36) + (++_n).toString(36) + Math.random().toString(36).slice(2,5);
const norm = x => String(x == null ? '' : x).replace(/\s+/g,' ').trim();
const ck = c => encodeURIComponent(c).replace(/%/g,'_').replace(/\./g,'_');
const clone = o => JSON.parse(JSON.stringify(o));
const fmt = n => n == null ? '' : String(Math.round(n*10)/10);
function toast(m){ const t=$('#toast'); t.textContent=m; t.classList.add('show'); clearTimeout(toast.t); toast.t=setTimeout(()=>t.classList.remove('show'),2200); }

/* ---------- security: Firebase sign-in, encrypted student portal ---------- */
const SECURE = !!(CONFIG.firebase.projectId && CONFIG.firebase.apiKey);
const enc8 = s => new TextEncoder().encode(s);
const b64 = u => { let s = ''; for (let i = 0; i < u.length; i += 8192) s += String.fromCharCode.apply(null, u.subarray(i, i + 8192)); return btoa(s); };
const unb64 = t => Uint8Array.from(atob(t), c => c.charCodeAt(0));
const rnd = n => crypto.getRandomValues(new Uint8Array(n));
const sha256hex = async t => [...new Uint8Array(await crypto.subtle.digest('SHA-256', enc8(t)))].map(x => x.toString(16).padStart(2, '0')).join('');
const sleep = ms => new Promise(r => setTimeout(r, ms));

const Auth = (() => {
  const fb = CONFIG.firebase, S = { id: null, rt: null, uid: null, exp: 0 };
  const IT = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  const post = async (url, body, form) => {
    const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': form ? 'application/x-www-form-urlencoded' : 'application/json' }, body: form ? body : JSON.stringify(body) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) { const m = (j.error && j.error.message) || 'ERROR'; const e = new Error(m); e.code = String(m).split(/[ :]/)[0]; throw e; }
    return j;
  };
  const take = j => {
    S.id = j.idToken || j.id_token; S.rt = j.refreshToken || j.refresh_token || S.rt; S.uid = j.localId || j.user_id || S.uid;
    S.exp = Date.now() + (Number(j.expiresIn || j.expires_in) || 3600) * 1000;
    try { sessionStorage.setItem('sfl-rt', S.rt); } catch (e) {}
  };
  const clear = () => { S.id = S.rt = S.uid = null; S.exp = 0; try { sessionStorage.removeItem('sfl-rt'); } catch (e) {} };
  let refreshing = null;
  async function token() {
    if (!S.rt) { try { S.rt = sessionStorage.getItem('sfl-rt') || null; } catch (e) {} }
    if (!S.rt) return null;
    if (S.id && Date.now() < S.exp - 60000) return S.id;
    if (!refreshing) refreshing = post('https://securetoken.googleapis.com/v1/token?key=' + fb.apiKey, 'grant_type=refresh_token&refresh_token=' + encodeURIComponent(S.rt), true)
      .then(take).catch(clear).finally(() => { refreshing = null; });
    await refreshing; return S.id;
  }
  return {
    emailOf: (u, v) => u + (v > 1 ? '.r' + v : '') + '@staff.sunday-school.app',
    async signIn(email, pw) { take(await post(IT + 'signInWithPassword?key=' + fb.apiKey, { email, password: pw, returnSecureToken: true })); return S.uid; },
    async signUp(email, pw) { take(await post(IT + 'signUp?key=' + fb.apiKey, { email, password: pw, returnSecureToken: true })); return S.uid; },
    async createOther(email, pw) { const j = await post(IT + 'signUp?key=' + fb.apiKey, { email, password: pw, returnSecureToken: true }); return j.localId; },
    async changePw(pw) { const t = await token(); take(await post(IT + 'update?key=' + fb.apiKey, { idToken: t, password: pw, returnSecureToken: true })); },
    token, out: clear, uid: () => S.uid
  };
})();
const authMsg = e => {
  const c = (e && e.code) || '';
  if (/INVALID_PASSWORD|EMAIL_NOT_FOUND|INVALID_LOGIN_CREDENTIALS/.test(c)) return 'Wrong username or password.';
  if (c === 'USER_DISABLED') return 'This account has been turned off.';
  if (c === 'TOO_MANY_ATTEMPTS_TRY_LATER') return 'Too many attempts. Wait a few minutes and try again.';
  if (c === 'WEAK_PASSWORD') return 'The password must be at least 6 characters.';
  if (c === 'EMAIL_EXISTS') return 'That username is already in use.';
  if (/OPERATION_NOT_ALLOWED|CONFIGURATION_NOT_FOUND/.test(c)) return 'Email/Password sign-in is not turned on in Firebase (Authentication → Sign-in method).';
  if (e instanceof TypeError) return 'Cannot reach the server (' + (e.message || 'network') + '). If the internet is fine, check the Firebase keys in index.html and the API key restrictions.';
  return 'Something went wrong (' + (c || (e && e.message) || 'error') + ').';
};

/* Firestore documents outside the kv collection: staff/{uid}, meta/setup, pub/{id} */
const FS = (() => {
  const fb = CONFIG.firebase;
  const base = `https://firestore.googleapis.com/v1/projects/${fb.projectId}/databases/(default)/documents/`;
  const toF = o => { const f = {}; Object.entries(o).forEach(([k, v]) => { f[k] = typeof v === 'boolean' ? { booleanValue: v } : { stringValue: String(v) }; }); return { fields: f }; };
  const fromF = d => { const o = {}; Object.entries(d.fields || {}).forEach(([k, v]) => { o[k] = 'booleanValue' in v ? v.booleanValue : v.stringValue; }); return o; };
  const hd = async json => { const h = json ? { 'Content-Type': 'application/json' } : {}; const t = await Auth.token(); if (t) h.Authorization = 'Bearer ' + t; return h; };
  const u = p => base + p + '?key=' + fb.apiKey;
  return {
    async get(p) { const r = await fetch(u(p), { headers: await hd() }); if (r.status === 404) return null; if (!r.ok) throw new Error(r.status); return fromF(await r.json()); },
    async set(p, o) { const r = await fetch(u(p), { method: 'PATCH', headers: await hd(true), body: JSON.stringify(toF(o)) }); if (!r.ok) throw new Error(r.status); },
    async del(p) { const r = await fetch(u(p), { method: 'DELETE', headers: await hd() }); if (!r.ok && r.status !== 404) throw new Error(r.status); }
  };
})();

/* ---------- student portal encryption (AES-GCM, key wrapped by the student's password) ---------- */
const PUB_ITER = 150000;
async function pbkey(pw, salt) {
  const km = await crypto.subtle.importKey('raw', enc8(pw), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: PUB_ITER, hash: 'SHA-256' }, km, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
}
async function aesEnc(key, bytes) { const iv = rnd(12); const ct = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, bytes)); return { iv: b64(iv), ct: b64(ct) }; }
async function aesDec(key, iv, ct) { return new Uint8Array(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: unb64(iv) }, key, unb64(ct))); }
const pubId = no => sha256hex('sfl-pub|' + norm(no).toLowerCase());
async function setPortalPassword(s, pw) {
  if (!s.portalKey) s.portalKey = b64(rnd(32));
  const salt = rnd(16), W = await pbkey(pw, salt), w = await aesEnc(W, unb64(s.portalKey));
  s.portalWrap = { salt: b64(salt), iv: w.iv, ct: w.ct };
}
async function studentSnapshot(student, memo) {
  memo = memo || new Map();
  const mget = k => { if (!memo.has(k)) memo.set(k, Store.get(k, {})); return memo.get(k); };
  const out = [];
  for (const y of [...App.settings.years].sort((a, b) => b - a)) {
    const c = clsIn(student, y); if (!c) continue;
    const mm = { m1: await mget(marksKey(1, c, y)), m2: {} }, rr = buildResults([student], mm, 'y')[0];
    const att = [];
    for (let m = 0; m < 12; m++) { const d = await mget(attKey(m, c, y)), x = d[student.id] || {}; const held = ACOLS.filter(k => x[k] !== undefined).length, present = ACOLS.filter(k => x[k] === 1).length; if (held) att.push({ m, held, present }); }
    out.push({ y, c, avg: rr.avg, subj: rr.subj, att });
  }
  return { name: student.name, studentNo: student.studentNo, cls: student.cls, christian: student.christian || '', age: student.age || '', guardian: student.guardian || '', regDate: student.regDate || '', years: out };
}
async function publishStudent(s, memo) {
  if (!s.portalKey || !s.portalWrap) return false;
  const snap = await studentSnapshot(s, memo);
  const K = await crypto.subtle.importKey('raw', unb64(s.portalKey), 'AES-GCM', false, ['encrypt']);
  const e = await aesEnc(K, enc8(JSON.stringify(snap))), id = await pubId(s.studentNo);
  await FS.set('pub/' + id, { ws: s.portalWrap.salt, wi: s.portalWrap.iv, wk: s.portalWrap.ct, iv: e.iv, ct: e.ct });
  if (s.portalDoc && s.portalDoc !== id) { try { await FS.del('pub/' + s.portalDoc); } catch (x) {} }
  s.portalDoc = id; return true;
}
async function secureStudentLogin(no, pw) {
  const err = $('#studentLoginErr'); err.textContent = '';
  if (Throttle.wait('student')) { err.textContent = 'Too many wrong attempts. Wait ' + Throttle.wait('student') + ' seconds and try again.'; return; }
  const bad = 'Incorrect ID number or password. Ask your teacher if you have not received login details.';
  try {
    const d = await FS.get('pub/' + await pubId(no));
    if (!d) { Throttle.fail('student'); err.textContent = bad; return; }
    const W = await pbkey(pw.trim(), unb64(d.ws)), kb = await aesDec(W, d.wi, d.wk);
    const K = await crypto.subtle.importKey('raw', kb, 'AES-GCM', false, ['decrypt']);
    renderStudentDash(JSON.parse(new TextDecoder().decode(await aesDec(K, d.iv, d.ct)))); Throttle.ok('student');
  } catch (e) {
    if (e && e.name === 'OperationError') Throttle.fail('student');
    err.textContent = e && e.name === 'OperationError' ? bad : e instanceof TypeError ? 'Cannot reach the server. Check the internet and try again.' : 'The student portal could not be opened (' + (e && e.message) + '). Ask your teacher.';
  }
}

/* ---------- staff accounts: one Firebase account per staff member ---------- */
const hashName = un => sha256hex('sfl-user|' + un);
async function authVariant(un) { const m = await Store.get('authmap', {}); return Number((m || {})[await hashName(un)]) || 1; }
/* Creates a brand-new Firebase account for this username (a reset always takes the next free one) */
async function provisionAuth(un, pw) {
  const m = (await Store.get('authmap', {})) || {}, h = await hashName(un);
  let v = Number(m[h]) || 1;
  for (let i = 0; i < 12; i++, v++) {
    try {
      const authUid = await Auth.createOther(Auth.emailOf(un, v), pw);
      if (v > 1) m[h] = v; else delete m[h];
      Store.set('authmap', m); return authUid;
    } catch (e) { if (e.code !== 'EMAIL_EXISTS') throw e; }
  }
  const e = new Error('EMAIL_EXISTS'); e.code = 'EMAIL_EXISTS'; throw e;
}
const Throttle = (() => { const st = {}; return {
  wait: k => Math.max(0, Math.ceil(((st[k] && st[k].until) || 0) - Date.now()) / 1000 | 0),
  fail: k => { const x = st[k] || (st[k] = { n: 0, until: 0 }); if (++x.n >= 5) { x.until = Date.now() + 60000; x.n = 0; } },
  ok: k => { delete st[k]; } }; })();
async function secureLogin() {
  const un = norm($('#uname').value).toLowerCase(), pw = $('#pw').value, err = $('#loginErr'); err.textContent = '';
  if (!un || !pw) return;
  if (Throttle.wait('staff')) { err.textContent = 'Too many wrong attempts. Wait ' + Throttle.wait('staff') + ' seconds and try again.'; return; }
  let authUid = null;
  try {
    const email = Auth.emailOf(un, await authVariant(un));
    try { authUid = await Auth.signIn(email, pw); }
    catch (e) { if (pw !== pw.trim() && /INVALID|NOT_FOUND/.test(e.code || '')) authUid = await Auth.signIn(email, pw.trim()); else throw e; }
  } catch (e) { if (/INVALID|NOT_FOUND/.test((e && e.code) || '')) Throttle.fail('staff'); err.textContent = authMsg(e); return; }
  Throttle.ok('staff');
  let sd = null;
  try { sd = await FS.get('staff/' + authUid); } catch (e) { Auth.out(); err.textContent = 'Could not check your access. Check the internet and try again.'; return; }
  if (!sd || sd.active !== true) { Auth.out(); err.textContent = 'This account is turned off or has no access. Ask the super admin.'; return; }
  const list = await Store.get('users', []); App.users = Array.isArray(list) ? list : [];
  let u = App.users.find(x => x.uid === authUid) || App.users.find(x => !x.uid && x.username === un);
  if (!u || u.active === false) { Auth.out(); err.textContent = 'Your account was not found in the staff list. Ask the super admin.'; return; }
  if (u.mustChange && (await Store.get('pwset_' + authUid, false))) u = Object.assign({}, u, { mustChange: false });
  App.user = u; App.editUser = null; try { sessionStorage.setItem('sfl-uid', u.id); } catch (e) {}
  App.tab = u.mustChange ? 'account' : 'dashboard';
  openPortal();
}
async function secureSetup() {
  const f = $('#setupForm'), v = Object.fromEntries(new FormData(f).entries()), err = $('#setupErr'); err.textContent = '';
  const name = norm(v.name), pw = (v.p1 || '').trim();
  if (!name) { err.textContent = 'Enter your name.'; return; }
  if (pw.length < 6) { err.textContent = 'The password must be at least 6 characters.'; return; }
  if (pw !== (v.p2 || '').trim()) { err.textContent = 'The two passwords do not match.'; return; }
  let authUid;
  try { authUid = await Auth.signUp(Auth.emailOf('admin', 1), pw); }
  catch (e) { err.textContent = e.code === 'EMAIL_EXISTS' ? 'An "admin" account already exists in Firebase. In the Firebase console open Authentication → Users, delete it, then try again.' : authMsg(e); return; }
  try {
    await FS.set('meta/setup', { by: authUid });
    await FS.set('staff/' + authUid, { role: 'super', active: true, username: 'admin' });
  } catch (e) { Auth.out(); err.textContent = 'Setup could not be saved (' + e.message + '). Make sure the Firestore rules from the README are published, and that setup was not already done.'; return; }
  App.users = [{ id: uid(), uid: authUid, name, username: 'admin', role: 'super', classes: [], active: true, mustChange: false }];
  Store.set('users', App.users);
  App.user = App.users[0]; try { sessionStorage.setItem('sfl-uid', App.user.id); } catch (e) {}
  App.tab = 'dashboard'; openPortal();
}
async function checkSetup() {
  let m; try { m = await FS.get('meta/setup'); } catch (e) {
    const l = $('#loginErr'); if (l && !l.textContent) l.textContent = 'Connection check failed: ' + (e && e.message ? e.message : e) + '. Check the Firebase projectId/apiKey, that the Firestore database exists, and that the rules are published.'; return; }
  if (m || !$('#loginForm')) return;
  $('#pmain').innerHTML = `<div class="card login up"><img src="logo.png" alt=""><h2>First-time setup</h2><p class="am">የመጀመሪያ ጊዜ ዝግጅት</p>
    <p style="font-size:.9rem">Create the super admin account (username <b>admin</b>). This screen appears only once.</p>
    <form id="setupForm"><label>Your name · ስምዎ<input type="text" name="name" required autocomplete="name"></label>
    <label>Password · የይለፍ ቃል (min 6)<input type="password" name="p1" required minlength="6" autocomplete="new-password" autocapitalize="none"></label>
    <label>Repeat password<input type="password" name="p2" required minlength="6" autocomplete="new-password" autocapitalize="none"></label>
    <div class="err" id="setupErr"></div><button class="btn" style="width:100%">Create admin account</button></form></div>`;
}

/* ---------- storage: this device, plus optional shared Firestore ---------- */
const Store = (() => {
  const fb = CONFIG.firebase, remote = SECURE;
  const P = 'sfl:', mem = {}, timers = {}, dirty = {}, ver = {};
  let ls = null; try { ls = window.localStorage; ls.setItem('_t','1'); ls.removeItem('_t'); } catch(e){ ls = null; }
  let status = remote ? 'shared' : 'local', pending = 0;
  const paint = () => { const el = $('#pst'); if (!el) return;
    el.textContent = pending ? 'Saving…' : status==='shared' ? 'Shared database' : status==='offline' ? 'Offline · saved on this device' : 'This device only'; };
  const url = k => `https://firestore.googleapis.com/v1/projects/${fb.projectId}/databases/(default)/documents/kv/${encodeURIComponent(k)}?key=${fb.apiKey}`;
  const hd = async json => { const h = json ? {'Content-Type':'application/json'} : {}; const t = await Auth.token(); if (t) h.Authorization = 'Bearer ' + t; return h; };
  const rl = k => { try { const v = ls ? ls.getItem(P+k) : mem[k]; return v == null ? undefined : JSON.parse(v); } catch(e){ return undefined; } };
  const wl = (k,v) => { const s = JSON.stringify(v); if (ls) { try { ls.setItem(P+k, s); return; } catch(e){ toast('Device storage is full'); } } mem[k] = s; };
  async function get(k, def){
    if (remote) {
      if (dirty[k]) { const l = rl(k); if (l !== undefined) return l; }   /* a save of ours is still on its way: our copy is the newest */
      try {
        const r = await fetch(url(k), {headers: await hd()});
        if (r.status === 404 || r.status === 401 || r.status === 403) { status='shared'; paint(); return def; }
        if (!r.ok) throw new Error(r.status);
        const j = await r.json(); status='shared'; paint();
        const v = JSON.parse(j.fields.v.stringValue); wl(k, v); return v;
      } catch(e){ status='offline'; paint(); const l = rl(k); return l === undefined ? def : l; }
    }
    const l = rl(k); return l === undefined ? def : l;
  }
  function set(k, v){
    wl(k, v);
    if (!remote) return;
    if (timers[k]) clearTimeout(timers[k]); else pending++; paint(); dirty[k] = true; const mine = ver[k] = (ver[k] || 0) + 1;
    timers[k] = setTimeout(async () => {
      try {
        const body = JSON.stringify({fields:{v:{stringValue: JSON.stringify(v)}}});
        if (body.length > 950000) toast('This record is too large for the shared database');
        const r = await fetch(url(k), {method:'PATCH', headers: await hd(true), body});
        if (r.status === 401 || r.status === 403) { toast('You do not have permission to save this.'); status = 'shared'; }
        else if (!r.ok) throw new Error(r.status);
        else { status = 'shared'; if (ver[k] === mine) delete dirty[k]; }
      } catch(e){ status = 'offline'; toast('Could not reach the shared database. Saved on this device.'); }
      timers[k] = null; pending--; paint();
    }, 500);
  }
  /* forget everything cached on this device (used when someone logs out) */
  function wipe(){ try { if (ls) Object.keys(ls).filter(x => x.startsWith(P)).forEach(x => ls.removeItem(x)); } catch(e){} Object.keys(mem).forEach(x => delete mem[x]); }
  async function flush(){ for (let i = 0; i < 40 && pending; i++) await sleep(100); }
  return { get, set, paint, wipe, flush, remote, offline: () => status === 'offline' };
})();

/* ---------- state ---------- */
const App = { settings:null, students:[], tab:'dashboard', cls:'', month:0, sem:'1', subj:0, period:'all', sort:'rank',
  q:'', fcls:'', editId:null, photo:null, tok:0, yr:null, pass:50, promoOv:{}, promoData:{}, pcls:null, ctx:null, zoom:{att:1,marks:1,res:1}, user:null, users:null, editUser:null, uev:'f1', ucl:'', ufl:'' };

/* ---------- roles & permissions ---------- */
const isSuper = () => !!App.user && App.user.role === 'super';
const tabOK = t => {
  const r = App.user && ROLES[App.user.role];
  if (!r) return false;
  if (t === 'results' && App.user.role === 'teacher') return App.user.resultsAllowed === true;
  return r.tabs === null || r.tabs.includes(t);
};
const myTabs = () => TABS.filter(t => tabOK(t[0]));
const myClasses = () => { const u = App.user, all = App.settings.classes; if (!u) return []; return u.role === 'teacher' ? all.filter(c => (u.classes || []).includes(c)) : all; };
const canClass = c => myClasses().includes(c);
const teacherSubjects = (u, cls) => {
  if (!u || u.role !== 'teacher') return SUBJECTS.map((_,i)=>i);
  const saved = u.subjectsByClass && u.subjectsByClass[cls];
  return Array.isArray(saved) ? saved.map(Number).filter(i=>Number.isInteger(i)&&i>=0&&i<SUBJECTS.length) : [];
};
const canSubject = (cls, subj) => !App.user || App.user.role !== 'teacher' || teacherSubjects(App.user, cls).includes(Number(subj));
const canResults = () => isSuper() || (App.user && App.user.role === 'teacher' && App.user.resultsAllowed === true);
const PERMS = { 'students.edit':['registrar'], 'marks.edit':['teacher'], 'marks.view':['teacher'], 'attendance.edit':['attendance'], 'books.manage':['teacher'], 'file.view':['teacher','registrar'], 'uniform.edit':['registrar','uniform'] };
const can = p => { const r = App.user && App.user.role; if (!r) return false; return r === 'super' || (PERMS[p] || []).includes(r); };
const deny = () => { toast('You do not have permission to do this'); return false; };
const noAccess = () => '<div class="card"><p class="empty">You do not have access to this page.</p></div>';

const Y = () => App.settings.year;                       // current school year
const VY = () => (App.yr && App.settings.years.includes(App.yr)) ? App.yr : Y();   // year being viewed
const clsIn = (s, y) => { if (s.since && +y < +s.since) return null; return (s.hist && s.hist[y]) || s.cls; };
const byName = (a,b) => a.name.localeCompare(b.name,'am');
const studentsNow = c => App.students.filter(s => s.cls === c).sort(byName);
const studentsOf = (c, y) => !canClass(c) ? [] : App.students.filter(s => clsIn(s, y || VY()) === c).sort(byName);
const yearSel = () => `<label>School year · ዓ.ም<select id="yrsel">${[...new Set([...App.settings.years, Y()])].sort((a,b)=>b-a).map(y=>`<option value="${y}"${String(y)===String(VY())?' selected':''}>${y}</option>`).join('')}</select></label>`;
const pastNote = () => VY() !== Y() ? `<div class="note noprint">You are viewing school year ${esc(VY())}. The current year is ${esc(Y())}.</div>` : '';
const clsOpts = sel => myClasses().map(c => `<option value="${esc(c)}"${c===sel?' selected':''}>ክፍል ${esc(c)}</option>`).join('');

async function loadSettings(){
  const s = await Store.get('settings', {});
  const d = clone(DEFAULTS);
  App.settings = Object.assign(d, s); App.settings.contact = Object.assign({}, DEFAULTS.contact, s.contact || {});
  App.settings.social = Object.assign({}, DEFAULTS.social, s.social || {});
  App.settings.year = String(App.settings.year);
  if (!Array.isArray(App.settings.years)) App.settings.years = [];
  if (!App.settings.promo || typeof App.settings.promo !== 'object') App.settings.promo = {};
  if (!App.settings.years.includes(App.settings.year)) App.settings.years.push(App.settings.year);
  App.settings.years.sort((a,b) => a - b);
  if (!Array.isArray(App.settings.classes) || !App.settings.classes.length) App.settings.classes = clone(DEFAULTS.classes);
  if (!App.cls || !App.settings.classes.includes(App.cls)) App.cls = App.settings.classes[0];
}
const saveSettings = () => Store.set('settings', App.settings);
const saveStudents = () => Store.set('students', App.students);
async function hashStudentPassword(p){
  try { const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('sfl-student|'+p)); return [...new Uint8Array(d)].map(x=>x.toString(16).padStart(2,'0')).join(''); }
  catch(e){ return 'x'+p; }
}
async function hashUserPw(salt, p){
  try { const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('sfl-user|'+salt+'|'+p)); return [...new Uint8Array(d)].map(x=>x.toString(16).padStart(2,'0')).join(''); }
  catch(e){ let h = 5381; for (const c of 'sfl-user|'+salt+'|'+p) h = ((h<<5)+h+c.charCodeAt(0))|0; return 'x'+h; }
}
/* Re-read the staff list and confirm the signed-in person still exists and is active */
async function syncUser(){
  const list = await Store.get('users', null);
  if (Array.isArray(list)) App.users = list;
  let id = App.user ? App.user.id : null;
  if (!id) { try { id = sessionStorage.getItem('sfl-uid'); } catch(e){} }
  let u = id && App.users ? App.users.find(x => x.id === id && x.active !== false) : null;
  if (u && Store.remote && u.mustChange && u.uid && (await Store.get('pwset_' + u.uid, false))) u = Object.assign({}, u, { mustChange: false });
  App.user = u || null;
  if (!u) { try { sessionStorage.removeItem('sfl-uid'); } catch(e){} }
  return !!u;
}
/* Safely change the staff list: reads the latest copy, lets fn edit it, then saves */
async function mutUsers(fn){
  const cur = await Store.get('users', null);
  const list = Array.isArray(cur) ? cur : (App.users || []);
  if ((await fn(list)) === false) return false;
  App.users = list; Store.set('users', list); return true;
}
async function hashPin(p){
  try { const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('sfl|'+p)); return [...new Uint8Array(d)].map(x=>x.toString(16).padStart(2,'0')).join(''); }
  catch(e){ let h = 5381; for (const c of 'sfl|'+p) h = ((h<<5)+h+c.charCodeAt(0))|0; return 'x'+h; }
}

/* ---------- mark maths ---------- */
const hasAny = a => !!a && a.some(v => v != null);
const sum60 = a => (a[0]||0)+(a[1]||0)+(a[2]||0)+(a[3]||0)+(a[4]||0);
const total100 = a => hasAny(a) ? sum60(a) + (a[5]||0) : null;
const marksKey = (sem, c, y) => `y${y || VY()}_marks_${sem}_${ck(c)}`;
const attKey = (m, c, y) => `y${y || VY()}_att_${m}_${ck(c)}`;
async function loadMarks(c, y){ const m1 = await Store.get(marksKey(1,c,y),{}); return {m1,m2:{}}; }
function buildResults(list, mm, period){
  const rows = list.map(st => {
    const subj = SUBJECTS.map((_,i) => {
      const t1 = total100((mm.m1[st.id]||{})[i]);
      return t1;
    });
    const got = subj.filter(x => x != null);
    const total = got.length ? got.reduce((a,b)=>a+b,0) : null;
    return { st, subj, total, avg: total == null ? null : total / SUBJECTS.length, rank: null };
  });
  const ranked = rows.filter(r => r.total != null).sort((a,b) => b.total - a.total);
  ranked.forEach((r,i) => { r.rank = i && r.total === ranked[i-1].total ? ranked[i-1].rank : i+1; });
  return rows;
}

/* ============================================================
   PUBLIC SITE
   ============================================================ */
const SOCIAL = [
  ['tiktok','TikTok','<path d="M16.500 3c.300 2.400 1.800 3.900 4.200 4.100v3.100a7.300 7.300 0 0 1-4.200-1.400v6.100a5.600 5.600 0 1 1-5.600-5.600c.3 0 .6 0 .9.100v3.200a2.500 2.500 0 1 0 1.700 2.400V3z"/>'],
  ['instagram','Instagram','<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.500" cy="6.500" r="1.300"/>'],
  ['telegram','Telegram','<path d="M21.500 4.200 18.300 19.200c-.2 1-.9 1.300-1.700.800l-4.800-3.600-2.300 2.300c-.3.300-.5.500-1 .5l.3-4.900 8.900-8c.4-.3-.1-.5-.6-.2L6.100 13 1.400 11.500c-1-.3-1-1 .2-1.500L20 2.900c.9-.3 1.700.200 1.500 1.300z"/>'],
  ['youtube','YouTube','<path d="M22 8.200a3 3 0 0 0-2.100-2.100C18 5.600 12 5.600 12 5.600s-6 0-7.900.5A3 3 0 0 0 2 8.200C1.500 10 1.500 12 1.500 12s0 2 .5 3.800a3 3 0 0 0 2.100 2.100c1.900.5 7.900.5 7.900.5s6 0 7.900-.5a3 3 0 0 0 2.100-2.100c.5-1.800.5-3.800.5-3.800s0-2-.5-3.800zM10 15.200V8.800l5.300 3.200z"/>']
];
function socialUrl(key, v){
  v = norm(v); if (!v) return '';
  if (/^https?:\/\//i.test(v)) return v;
  if (/^(javascript|data|vbscript):/i.test(v)) return '';
  const u = v.replace(/^@/, '').replace(/^(www\.)?(tiktok\.com|instagram\.com|t\.me|youtube\.com)\/?/i, '');
  if (!u) return '';
  if (key === 'tiktok') return 'https://www.tiktok.com/@' + u.replace(/^@/, '');
  if (key === 'instagram') return 'https://www.instagram.com/' + u;
  if (key === 'telegram') return 'https://t.me/' + u;
  return 'https://www.youtube.com/' + (u.startsWith('@') || /^(channel|c|user)\//.test(u) ? u : '@' + u);
}
const revealIO = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(en => {
  if (!en.isIntersecting) return; const el = en.target; revealIO.unobserve(el); el.classList.add('in');
  setTimeout(() => el.classList.remove('rv','in'), 1900);
}), { threshold: .12, rootMargin: '0px 0px -6% 0px' }) : null;
function initReveal(){
  if (!revealIO) return;
  document.querySelectorAll('.sh,.mission,.val,.prog,.day,.crow,.soc-h,.soc a,.gal img').forEach(el => {
    if (el.dataset.rv) return; el.dataset.rv = 1; el.classList.add('rv');
    el.style.setProperty('--d', Math.min([...el.parentElement.children].indexOf(el), 6) * 90 + 'ms'); revealIO.observe(el);
  });
}
function renderPublic(){
  $('#yr').textContent = new Date().getFullYear();
  $('#progs').innerHTML = SUBJECTS.map(s => `<div class="prog"><b>${esc(s.am)}</b><span>${esc(s.en)}</span></div>`).join('')
    + `<div class="prog"><b>መዝሙር ጥናት</b><span>Hymn study</span></div>`;
  const c = App.settings.contact;
  const rows = [
    ['M12 21s-7-6.200-7-11a7 7 0 0 1 14 0c0 4.800-7 11-7 11zM12 12a2.500 2.500 0 1 0 0-5 2.500 2.500 0 0 0 0 5z','Location · አድራሻ',c.location],
    ['M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z','Phone · ስልክ',c.phone],
    ['M3 6h18v12H3zM3 7l9 6 9-6','Email · ኢሜይል',c.email],
    ['M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z','Office hours · የሥራ ሰዓት',c.hours]
  ];
  $('#pubContact').innerHTML = rows.map(r => `<div class="crow"><div class="ico"><svg viewBox="0 0 24 24"><path d="${r[0]}"/></svg></div><div><small>${r[1]}</small><strong>${esc(r[2] || 'Coming soon')}</strong></div></div>`).join('');
  const soc = SOCIAL.map(([k,n,svg]) => [n, svg, socialUrl(k, App.settings.social[k])]).filter(x => x[2]);
  $('#pubSocial').innerHTML = soc.length ? `<div class="soc-h">Follow us · ተከተሉን</div><div class="soc">${soc.map(([n,svg,u]) => `<a href="${esc(u)}" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true">${svg}</svg>${n}</a>`).join('')}</div>` : '';
  const ids = App.settings.gallery || [];
  const g = $('#pubGal');
  g.innerHTML = '<img src="church.jpg" alt="Our church" loading="lazy">'; initReveal();
  ids.slice(0,30).forEach(async id => { const src = await Store.get('gal_'+id, ''); if (src) { const i = new Image(); i.src = src; i.alt = 'School photo'; i.loading = 'lazy'; g.appendChild(i); initReveal(); } });
  initReveal();
}

/* ============================================================
   PORTAL SHELL
   ============================================================ */
function seedMissing(existing){
  const have = new Set(existing.map(s => s.cls + '|' + norm(s.name))); const add = [];
  Object.entries(SEED).forEach(([c, list]) => list.forEach(n => {
    if (have.has(c + '|' + n)) return; have.add(c + '|' + n);
    add.push({ id: uid(), name: n, christian:'', gender:'', age:'', cls: c, guardian:'', phone:'', address:'', confessor:'', regDate:'', notes:'' });
  }));
  return add;
}
async function openPortal(){
  const sb=$('#studentPortalBox'); if(sb) sb.remove();
  $('#site').hidden = true; $('#portal').hidden = false; window.scrollTo(0,0);
  Store.paint();
  if (!(await syncUser())) return showLogin();
  let st = await Store.get('students', null);
  if (st === null) {
    if (Store.offline()) st = [];
    else if (isSuper()) { st = seedMissing([]); Store.set('students', st); toast(st.length + ' students added from your school list'); }
    else st = [];
  }
  App.students = st;
  if (location.hash === '#/portal/register') { App.tab = 'register'; App.editId = null; history.replaceState(null, '', '#/portal'); }
  shell();
}
function showLogin(){
  $('#tabs').hidden = true; $('#logoutBtn').hidden = true; const w = $('#who'); if (w) w.hidden = true;
  $('#pmain').innerHTML = `<div class="card login up"><img src="logo.png" alt=""><h2>Staff portal</h2><p class="am">ለመምህራን፣ ለመዝጋቢና ለተገኝነት ተቆጣጣሪ</p>
    <form id="loginForm"><label>Username · መግቢያ ስም<input type="text" id="uname" autocomplete="username" autocapitalize="none" required autofocus></label>
    <label>Password · የይለፍ ቃል<input type="password" id="pw" autocomplete="current-password" autocapitalize="none" autocorrect="off" spellcheck="false" required></label>
    <label style="display:flex;align-items:center;gap:.5rem;font-weight:400"><input type="checkbox" id="showPw" style="width:auto"> Show password · የይለፍ ቃል አሳይ</label>
    <div class="err" id="loginErr"></div><button class="btn" style="width:100%">Log in</button></form></div>`;
  if (SECURE) checkSetup();
}
function shell(){
  if (!App.user) return showLogin();
  if (!tabOK(App.tab)) App.tab = 'dashboard';
  $('#logoutBtn').hidden = false;
  const w = $('#who'); if (w) { w.hidden = false; w.textContent = App.user.name + ' · ' + ROLES[App.user.role].en; }
  const tb = $('#tabs'); tb.hidden = false;
  tb.innerHTML = myTabs().map(t => `<button data-action="tab" data-t="${t[0]}" class="${t[0]===App.tab?'on':''}">${t[1]}<small>${t[2]}</small></button>`).join('');
  render();
}
const VIEWS = {};
async function render(){
  if (!App.user) return showLogin();
  if (!tabOK(App.tab)) App.tab = 'dashboard';
  const mc = myClasses(); if (mc.length && !mc.includes(App.cls)) App.cls = mc[0];
  const tok = ++App.tok;
  document.querySelectorAll('#tabs button').forEach(b => b.classList.toggle('on', b.dataset.t === App.tab));
  $('#pmain').innerHTML = '<p class="empty">Loading…</p>';
  const html = await VIEWS[App.tab]();
  if (tok !== App.tok) return;
  if (html != null) $('#pmain').innerHTML = html;
  if (VIEWS[App.tab + '_after']) VIEWS[App.tab + '_after']();
}
const zoomCtl = k => `<div class="zoom noprint"><button class="btn alt sm" data-action="zoom" data-k="${k}" data-d="-1" aria-label="Zoom out">A−</button><span id="zv-${k}">${Math.round(App.zoom[k]*100)}%</span><button class="btn alt sm" data-action="zoom" data-k="${k}" data-d="1" aria-label="Zoom in">A+</button></div>`;
const applyZoom = k => { const el = $('#zz-'+k); if (el) el.style.zoom = App.zoom[k]; const v = $('#zv-'+k); if (v) v.textContent = Math.round(App.zoom[k]*100)+'%'; };

/* ---------- Dashboard ---------- */
VIEWS.dashboard_after = () => {
  if (window.matchMedia && matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  document.querySelectorAll('.tile b').forEach(b => { const n = +b.textContent; if (!n) return; const t0 = performance.now();
    const step = t => { const k = Math.min(1, (t - t0) / 700); b.textContent = Math.round(n * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step); });
};
VIEWS.dashboard = async () => {
  const cl = myClasses(), dy = VY(), u = App.user;
  const rows = cl.map(c => { const l = studentsOf(c, dy); return {c, n:l.length, m:l.filter(s=>s.gender==='M').length, f:l.filter(s=>s.gender==='F').length}; });
  const yearStudents = App.students.filter(s => cl.includes(clsIn(s, dy)));
  const tot = yearStudents.length;
  const acts = [['register','Register a student','btn'],['attendance','Take attendance','btn alt'],['marks','Enter marks','btn alt'],['uniform','Uniform · ልብሰ ስብሐት','btn alt'],['users','Manage users','btn alt']].filter(a => tabOK(a[0]));
  return `${u.mustChange ? '<div class="note">Please choose your own password now: <button class="btn alt sm" data-action="tab" data-t="account">My account</button></div>' : ''}
  <div class="card"><div class="bar2"><div><h2 style="margin:0 0 4px">Welcome, ${esc(u.name)}</h2><span class="rolepill">${esc(roleName(u.role))}</span>${u.role==='teacher' ? ` <span style="font-size:.9rem">· ${cl.length ? 'Class ' + cl.map(esc).join(', ') : 'no class assigned yet — ask the super admin'}</span>` : ''}</div><span class="sp"></span>${yearSel()}</div>${pastNote()}</div>
  <div class="tiles"><div class="tile"><b>${tot}</b><span>Students · ተማሪዎች</span></div>
    <div class="tile"><b>${yearStudents.filter(s=>s.gender==='M').length}</b><span>Boys · ወንድ</span></div>
    <div class="tile"><b>${yearStudents.filter(s=>s.gender==='F').length}</b><span>Girls · ሴት</span></div>
    <div class="tile"><b>${cl.length}</b><span>Classes · ክፍሎች</span></div></div>
  ${isSuper() ? `<div class="card"><h2>Academic year <small>የትምህርት ዘመን</small></h2>
    <p style="margin-top:0;font-size:.92rem">Current school year: <b>${esc(Y())} ዓ.ም</b>. Change this when a new school year begins. Previous years' marks and attendance remain saved.</p>
    <form id="dashboardYearForm" class="bar2 noprint" style="margin:0;align-items:end">
      <label>Set current Ethiopian school year <input type="number" name="year" min="2000" max="2200" step="1" value="${esc(Y())}" required></label>
      <button class="btn gold" type="submit">Save school year</button>
    </form></div>` : ''}
  <div class="card"><h2>Students by class <small>በክፍል</small></h2><div class="tw"><table class="g"><thead><tr><th class="name">Class</th><th>Boys</th><th>Girls</th><th>Total</th></tr></thead><tbody>
  ${rows.map(r => `<tr><td class="name">ክፍል ${esc(r.c)}</td><td>${r.m}</td><td>${r.f}</td><td><b>${r.n}</b></td></tr>`).join('') || '<tr><td colspan="4" class="empty">No classes.</td></tr>'}</tbody></table></div></div>
  <div class="card"><h2>Quick actions</h2><div class="bar2" style="margin:0">
    ${acts.map(a => `<button class="${a[2]}" data-action="tab" data-t="${a[0]}">${a[1]}</button>`).join('')}
    <button class="btn alt" data-action="refresh">Refresh data</button></div></div>`;
};

/* ---------- Students ---------- */
VIEWS.students = async () => `
  <div class="card"><h2>Students <small>ተማሪዎች</small></h2>
  <div class="bar2 noprint">
    <label>Class<select id="fcls"><option value="">All classes</option>${clsOpts(App.fcls)}</select></label>${yearSel()}
    <label>Search<input type="search" id="stq" value="${esc(App.q)}" placeholder="Name or phone"></label>
    <span class="sp"></span><span id="stCount" style="align-self:center;font-size:.9rem"></span>
    <button class="btn alt" data-action="exportStudents">Excel</button>${Store.remote && (isSuper() || can('students.edit')) ? '<button class="btn alt" data-action="publishPortal">Publish results to students</button>' : ''}
    ${can('students.edit') ? '<button class="btn" data-action="tab" data-t="register">+ Register student</button>' : ''}</div>
  <div class="tw"><table class="g"><thead><tr><th>#</th><th class="name">Name · ስም</th><th>Christian name</th><th>Class</th><th>Sex</th><th>Age</th><th>Guardian</th><th>Phone</th><th class="noprint"></th></tr></thead><tbody id="stBody"></tbody></table></div></div>`;
VIEWS.students_after = () => paintStudents();
function paintStudents(){
  const q = App.q.trim().toLowerCase();
  const list = App.students.filter(s => canClass(clsIn(s, VY())) && (!App.fcls || clsIn(s, VY()) === App.fcls) && (!q || (s.name+' '+(s.christian||'')+' '+(s.phone||'')).toLowerCase().includes(q)))
    .sort((a,b) => (a.cls||'').localeCompare(b.cls||'','am',{numeric:true}) || a.name.localeCompare(b.name,'am'));
  $('#stCount').textContent = list.length + ' shown';
  $('#stBody').innerHTML = list.length ? list.map((s,i) => `<tr><td>${i+1}</td><td class="name">${esc(s.name)}</td><td class="am">${esc(s.christian)}</td><td>${esc(clsIn(s, VY()) || s.cls)}</td><td>${s.gender==='M'?'ወ':s.gender==='F'?'ሴ':''}</td><td>${esc(s.age)}</td><td class="am">${esc(s.guardian)}</td><td>${esc(s.phone)}</td>
    <td class="noprint">${can('file.view') ? `<button class="btn alt sm" data-action="file" data-id="${s.id}">File</button> ` : ''}${can('students.edit') ? `<button class="btn alt sm" data-action="edit" data-id="${s.id}">Edit</button> <button class="btn red sm" data-action="del" data-id="${s.id}">Delete</button>` : ''}</td></tr>`).join('')
    : `<tr><td colspan="9" class="empty">${myClasses().length ? 'No students yet.' : 'No class has been assigned to you yet. Please ask the super admin.'}</td></tr>`;
}

/* ---------- Class lists: edit names, add, remove ---------- */
VIEWS.classes = async () => {
  if (!can('students.edit')) return noAccess();
  const list = studentsOf(App.cls, VY());
  return `<div class="card"><h2>Class list <small>የክፍል ዝርዝር</small></h2>
  <div class="bar2 noprint"><label>Class<select id="ccls">${clsOpts(App.cls)}</select></label>${yearSel()}<span class="sp"></span><span style="align-self:center;font-size:.9rem">${list.length} students · ${esc(VY())} ዓ.ም</span></div>${pastNote()}
  <form id="addForm" class="bar2 noprint"><label style="flex:1;min-width:230px">Add a new student to this class · አዲስ ተማሪ<input type="text" id="newName" placeholder="ሙሉ ስም" required autocomplete="off"></label><button class="btn" type="submit">+ Add</button></form>
  <p class="noprint" style="margin:0 0 10px;font-size:.85rem;color:#44527d">Tap a name to correct it — it saves when you leave the box. Remove deletes the student from the class.</p>
  <div class="tw"><table class="g"><thead><tr><th>#</th><th class="name">Name · ስም</th><th>Remove</th></tr></thead><tbody>
  ${list.map((s,i) => `<tr><td>${i+1}</td><td class="name"><input type="text" class="nm" data-id="${s.id}" value="${esc(s.name)}" aria-label="Name"></td><td><button class="btn red sm" data-action="del" data-id="${s.id}">Remove</button></td></tr>`).join('') || '<tr><td colspan="3" class="empty">No students in this class yet. Add the first one above.</td></tr>'}
  </tbody></table></div></div>`;
};

/* ---------- Register ---------- */
VIEWS.register = async () => {
  if (!can('students.edit')) return noAccess();
  const s = App.students.find(x => x.id === App.editId) || {};
  App.photo = null;
  let ph = '';
  if (s.hasPhoto) ph = await Store.get('photo_'+s.id, '');
  const today = new Date().toISOString().slice(0,10);
  return `<div class="card"><h2>${s.id ? 'Edit student' : 'Register a student'} <small>${s.id ? 'መረጃ ማስተካከያ' : 'የተማሪ ምዝገባ'}</small></h2>
  <form id="regForm" class="form">
    <label class="full">Full name <small>ሙሉ ስም</small><input type="text" name="name" required value="${esc(s.name)}"></label>
    <label>Student ID number <small>የተማሪ መለያ</small><input type="text" name="studentNo" value="${esc(s.studentNo || (s.id ? 'SFL-'+String(s.id).slice(-6).toUpperCase() : ''))}" placeholder="Auto-generated if left blank"></label>
    <label>Student portal password <small>Set/reset password</small><input type="password" name="studentPassword" minlength="4" autocomplete="new-password" placeholder="Leave blank to keep current"></label>
    <p class="full" style="margin:0;font-size:.85rem;color:#44527d">Give the student their ID number and password privately. Leave password blank when editing to keep the existing password.</p>
    <label>Christian name <small>የክርስትና ስም</small><input type="text" name="christian" value="${esc(s.christian)}"></label>
    <label>Sex <small>ፆታ</small><select name="gender"><option value="">—</option><option value="M"${s.gender==='M'?' selected':''}>Male · ወንድ</option><option value="F"${s.gender==='F'?' selected':''}>Female · ሴት</option></select></label>
    <label>Age <small>እድሜ</small><input type="number" name="age" min="1" max="99" inputmode="numeric" value="${esc(s.age)}"></label>
    <label>Class <small>ክፍል</small><select name="cls" required>${clsOpts(s.cls || App.cls)}</select></label>
    <label>Parent / guardian <small>የወላጅ ወይም የአሳዳጊ ስም</small><input type="text" name="guardian" value="${esc(s.guardian)}"></label>
    <label>Phone <small>ስልክ</small><input type="tel" name="phone" value="${esc(s.phone)}"></label>
    <label>Address <small>አድራሻ</small><input type="text" name="address" value="${esc(s.address)}"></label>
    <label>Confessor father <small>የንስሐ አባት</small><input type="text" name="confessor" value="${esc(s.confessor)}"></label>
    <label>Registered on <small>የተመዘገበበት ቀን</small><input type="date" name="regDate" value="${esc(s.regDate || today)}"></label>
    <div class="full photo"><div class="pv" id="photoPrev">${ph ? `<img src="${ph}" alt="">` : 'No photo'}</div>
      <label>Photo <small>ፎቶ</small><input type="file" id="photoIn" accept="image/*"></label></div>
    <label class="full">Notes <small>ማስታወሻ</small><textarea name="notes">${esc(s.notes)}</textarea></label>
    <div class="full bar2" style="margin:0"><button class="btn" type="submit">${s.id ? 'Save changes' : 'Register student'}</button>
      ${s.id ? '<button class="btn alt" type="button" data-action="cancelEdit">Cancel</button>' : ''}</div>
  </form></div>`;
};
function resizeImage(file, max, q){
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => { const im = new Image(); im.onload = () => {
        const k = Math.min(1, max / Math.max(im.width, im.height)); const c = document.createElement('canvas');
        c.width = Math.round(im.width*k); c.height = Math.round(im.height*k); c.getContext('2d').drawImage(im,0,0,c.width,c.height);
        res(c.toDataURL('image/jpeg', q)); };
      im.onerror = rej; im.src = fr.result; };
    fr.onerror = rej; fr.readAsDataURL(file);
  });
}
async function submitReg(form){
  if (!can('students.edit')) return deny();
  const f = new FormData(form); const v = Object.fromEntries(f.entries());
  if (!v.name.trim()) return toast('Enter the full name');
  let s = App.students.find(x => x.id === App.editId);
  const isNew = !s; if (isNew) { s = { id: uid(), since: Y() }; App.students.push(s); }
  Object.assign(s, { name:v.name.trim(), studentNo:norm(v.studentNo) || ('SFL-'+String(s.id).slice(-6).toUpperCase()), christian:v.christian.trim(), gender:v.gender, age:v.age, cls:v.cls, guardian:v.guardian.trim(),
    phone:v.phone.trim(), address:v.address.trim(), confessor:v.confessor.trim(), regDate:v.regDate, notes:v.notes.trim() });
  if (v.studentPassword && v.studentPassword.trim()) {
    if (Store.remote) { if (v.studentPassword.trim().length < 6) { toast('Student password: at least 6 characters'); return; } await setPortalPassword(s, v.studentPassword.trim()); }
    else s.studentPasswordHash = await hashStudentPassword(v.studentPassword.trim());
  }
  if (!s.studentNo) s.studentNo = 'SFL-'+String(s.id).slice(-6).toUpperCase();
  if (App.photo) { Store.set('photo_'+s.id, App.photo); s.hasPhoto = true; }
  if (Store.remote && s.portalKey) { try { await publishStudent(s); } catch (e) { toast('Saved, but the student portal could not be updated. Use "Publish results".'); } }
  saveStudents();
  toast(isNew ? 'Student registered' : 'Changes saved');
  App.cls = s.cls;
  if (isNew) { App.editId = null; render(); } else { App.editId = null; App.tab = 'students'; shell(); }
}

/* ---------- Attendance ---------- */
const ACOLS = []; for (let w=1; w<=5; w++) ACOLS.push(w+'s', w+'u');
VIEWS.attendance = async () => {
  if (!can('attendance.edit')) return noAccess();
  const list = studentsOf(App.cls);
  const key = attKey(App.month, App.cls);
  const data = await Store.get(key, {});
  App.ctx = { key, data, list };
  return `<div class="card"><h2>Attendance <small>ተገኝነት · ${esc(VY())} ዓ.ም</small></h2>
  ${pastNote()}<div class="bar2 noprint"><label>Class<select id="acls">${clsOpts(App.cls)}</select></label>${yearSel()}
    <label>Month · ወር<select id="amon">${MONTHS.map((m,i)=>`<option value="${i}"${i===App.month?' selected':''}>${m}</option>`).join('')}</select></label>
    <span class="sp"></span><button class="btn alt" data-action="exportAttendance">Excel</button>${zoomCtl('att')}</div>
  <p class="noprint" style="margin:0 0 10px;font-size:.85rem;color:#44527d">Tap a box to cycle: ✓ present → ✗ absent → empty. ቅ = ቅዳሜ (Saturday), እ = እሁድ (Sunday). Tap ቅ / እ in the header to mark everyone present.</p>
  <div class="printonly"><h2>ክፍል ${esc(App.cls)} · ${MONTHS[App.month]} · ${esc(VY())} ዓ.ም</h2></div>
  <div class="tw"><div class="zz" id="zz-att"><table class="g" id="attT"></table></div></div></div>`;
};
VIEWS.attendance_after = () => { paintAtt(); applyZoom('att'); };
function paintAtt(){
  const { list, data } = App.ctx;
  const held = ACOLS.map(c => list.some(s => data[s.id] && data[s.id][c] !== undefined));
  const nHeld = held.filter(Boolean).length;
  let h = `<thead><tr><th rowspan="2">#</th><th class="name" rowspan="2">Name · ስም</th>${[1,2,3,4,5].map(w=>`<th colspan="2">Week ${w}</th>`).join('')}<th rowspan="2">Present</th><th rowspan="2">%</th></tr><tr>`;
  h += ACOLS.map(c => `<th><button class="mini" data-action="attall" data-col="${c}" title="Mark everyone present">${c.endsWith('s')?'ቅ':'እ'}</button></th>`).join('') + '</tr></thead><tbody>';
  if (!list.length) h += '<tr><td colspan="14" class="empty">No students in this class yet.</td></tr>';
  list.forEach((s,i) => {
    const d = data[s.id] || {}; const pres = ACOLS.filter(c => d[c] === 1).length;
    h += `<tr><td>${i+1}</td><td class="name">${esc(s.name)}</td>` + ACOLS.map(c => {
      const v = d[c]; return `<td><button class="cell ${v===1?'yes':v===0?'no':''}" data-action="att" data-sid="${s.id}" data-col="${c}" aria-label="${esc(s.name)} ${c}">${v===1?'✓':v===0?'✗':''}</button></td>`;
    }).join('') + `<td class="calc">${pres}</td><td class="calc">${nHeld ? Math.round(pres/nHeld*100)+'%' : ''}</td></tr>`;
  });
  $('#attT').innerHTML = h + '</tbody>';
}

/* ---------- Marks ---------- */
VIEWS.marks = async () => {
  if (!can('marks.edit')) return noAccess();
  if (!canClass(App.cls)) return '<div class="card"><p class="empty">No class has been assigned to you yet. Please ask the super admin.</p></div>';
  const list = studentsOf(App.cls);
  const key = marksKey(1, App.cls);
  const data = await Store.get(key, {});
  App.ctx = { key, data, list };
  const allowedSubjects = teacherSubjects(App.user, App.cls);
  if (!allowedSubjects.includes(Number(App.subj))) App.subj = allowedSubjects[0] ?? 0;
  const sj = App.subj;
  const rows = list.map((s,i) => {
    const a = (data[s.id] || {})[sj] || [];
    return `<tr><td>${i+1}</td><td class="name">${esc(s.name)}</td>` + MAX.slice(0,5).map((m,j) => `<td><input class="mk" type="number" min="0" max="${m}" step="0.5" inputmode="decimal" data-sid="${s.id}" data-i="${j}" value="${a[j]==null?'':a[j]}" aria-label="${esc(s.name)} ${j}"></td>`).join('')
      + `<td class="calc" id="sum-${s.id}">${hasAny(a) ? fmt(sum60(a)) : ''}</td>`
      + `<td><input class="mk" type="number" min="0" max="40" step="0.5" inputmode="decimal" data-sid="${s.id}" data-i="5" value="${a[5]==null?'':a[5]}" aria-label="${esc(s.name)} final"></td>`
      + `<td class="calc" id="tot-${s.id}">${fmt(total100(a))}</td></tr>`;
  }).join('') || '<tr><td colspan="10" class="empty">No students in this class yet.</td></tr>';
  return `<div class="card"><h2>Marks <small>ውጤት · ${esc(VY())} ዓ.ም</small></h2>
  ${pastNote()}<div class="bar2 noprint"><label>Class<select id="mcls">${clsOpts(App.cls)}</select></label>${yearSel()}
    <label>Subject · የትምህርት ዓይነት<select id="msub">${SUBJECTS.map((s,i)=>({s,i})).filter(x=>allowedSubjects.includes(x.i)).map(({s,i})=>`<option value="${i}"${i===App.subj?' selected':''}>${s.am} · ${s.en}</option>`).join('')}</select></label>
    <span class="sp"></span><button class="btn alt" data-action="exportMarks">Mark list · Excel</button>${zoomCtl('marks')}</div>
  <p class="noprint" style="margin:0 0 10px;font-size:.85rem;color:#44527d">Whole school-year marks: mid exam /20, four tests /10 each → sum /60, then final /40 → total /100. One annual mark out of 100; marks save automatically.</p>
  <div class="printonly"><h2>ክፍል ${esc(App.cls)} · ${esc(SUBJECTS[sj].am)} · ዓመታዊ ውጤት</h2></div>
  <div class="tw"><div class="zz" id="zz-marks"><table class="g"><thead><tr><th>#</th><th class="name">Name · ስም</th><th>Mid /20</th><th>Test 1 /10</th><th>Test 2 /10</th><th>Test 3 /10</th><th>Test 4 /10</th><th>Sum /60</th><th>Final /40</th><th>Total /100</th></tr></thead><tbody>${rows}</tbody></table></div></div></div>`;
};
VIEWS.marks_after = () => applyZoom('marks');
function onMark(t){
  if (!can('marks.edit') || !canClass(App.cls) || !canSubject(App.cls, App.subj)) return deny();
  const { key, data } = App.ctx; const sid = t.dataset.sid, i = +t.dataset.i, max = MAX[i];
  let v = t.value === '' ? null : parseFloat(t.value);
  if (v != null && (isNaN(v) || v < 0)) v = null;
  if (v != null && v > max) { v = max; t.value = max; t.classList.add('bad'); setTimeout(()=>t.classList.remove('bad'), 900); toast('Maximum is ' + max); }
  const subj = (data[sid] = data[sid] || {});
  const a = (subj[App.subj] = subj[App.subj] || [null,null,null,null,null,null]);
  a[i] = v;
  if (!hasAny(a)) { delete subj[App.subj]; if (!Object.keys(subj).length) delete data[sid]; }
  $('#sum-'+sid).textContent = hasAny(a) ? fmt(sum60(a)) : '';
  $('#tot-'+sid).textContent = fmt(total100(a));
  Store.set(key, data);
}

/* ---------- Results & rank ---------- */
VIEWS.results = async () => {
  if (!can('marks.view') || !canResults()) return noAccess();
  if (!canClass(App.cls)) return '<div class="card"><p class="empty">No class has been assigned to you yet. Please ask the super admin.</p></div>';
  const list = studentsOf(App.cls); const mm = await loadMarks(App.cls);
  const ctl = `${pastNote()}<div class="bar2 noprint"><label>Class<select id="rcls">${clsOpts(App.cls)}</select></label>${yearSel()}
    <label>Period<select id="rper"><option value="y"${App.period==='y'?' selected':''}>Annual result</option></select></label>
    <label>Order<select id="rsort"><option value="rank"${App.sort==='rank'?' selected':''}>By yearly rank</option><option value="name"${App.sort==='name'?' selected':''}>By name</option></select></label>
    <span class="sp"></span>${zoomCtl('res')}<button class="btn" data-action="print">Print</button></div>`;
  if (false) {
    const R1 = buildResults(list, mm, '1'), R2 = buildResults(list, mm, '2'), RY = buildResults(list, mm, 'y');
    let rows = list.map((st,i) => ({ st, a:R1[i], b:R2[i], c:RY[i] }));
    if (App.sort === 'rank') rows.sort((x,y) => (x.c.rank==null) - (y.c.rank==null) || x.c.rank - y.c.rank || x.st.name.localeCompare(y.st.name,'am'));
    const three = (a,b,c) => `<td>${a}</td><td>${b}</td><td class="calc">${c}</td>`;
    const sub = '<th>Sem 1</th><th>Sem 2</th><th>Year</th>';
    return `<div class="card"><h2>Mark list & class rank <small>የውጤት ዝርዝርና ደረጃ · ${esc(VY())} ዓ.ም</small></h2>${ctl}
    <div class="printonly"><h2>ክፍል ${esc(App.cls)} · ${esc(VY())} ዓ.ም</h2></div>
    <div class="tw"><div class="zz" id="zz-res"><table class="g"><thead><tr><th rowspan="2">#</th><th class="name" rowspan="2">Name · ስም</th>${SUBJECTS.map(s=>`<th colspan="3">${s.am}</th>`).join('')}<th colspan="3">Total /${SUBJECTS.length*100}</th><th colspan="3">Average</th><th colspan="3">Rank · ደረጃ</th></tr>
    <tr>${sub.repeat(SUBJECTS.length + 3)}</tr></thead><tbody>
    ${rows.map((r,i) => `<tr${r.c.rank===1?' class="rk1"':''}><td>${i+1}</td><td class="name">${esc(r.st.name)}</td>${SUBJECTS.map((_,j)=>three(fmt(r.a.subj[j]),fmt(r.b.subj[j]),fmt(r.c.subj[j]))).join('')}${three(fmt(r.a.total),fmt(r.b.total),fmt(r.c.total))}${three(fmt(r.a.avg),fmt(r.b.avg),fmt(r.c.avg))}${three(r.a.rank||'',r.b.rank||'',r.c.rank||'')}</tr>`).join('') || `<tr><td colspan="${SUBJECTS.length*3+11}" class="empty">No students in this class yet.</td></tr>`}
    </tbody></table></div></div></div>`;
  }
  let rows = buildResults(list, mm, App.period);
  if (App.sort === 'rank') rows.sort((a,b) => (a.rank==null) - (b.rank==null) || a.rank - b.rank || a.st.name.localeCompare(b.st.name,'am'));
  const pl = 'Annual result out of 100';
  return `<div class="card"><h2>Mark list & class rank <small>የውጤት ዝርዝርና ደረጃ · ${esc(VY())} ዓ.ም</small></h2>${ctl}
  <div class="printonly"><h2>ክፍል ${esc(App.cls)} · ${pl} · ${esc(VY())} ዓ.ም</h2></div>
  <div class="tw"><div class="zz" id="zz-res"><table class="g"><thead><tr><th>Rank</th><th class="name">Name · ስም</th>${SUBJECTS.map(s=>`<th>${s.am}</th>`).join('')}<th>Total /${SUBJECTS.length*100}</th><th>Average</th></tr></thead><tbody>
  ${rows.map(r => `<tr${r.rank===1?' class="rk1"':''}><td class="calc">${r.rank==null?'':r.rank}</td><td class="name">${esc(r.st.name)}</td>${r.subj.map(x=>`<td>${fmt(x)}</td>`).join('')}<td class="calc">${fmt(r.total)}</td><td class="calc">${fmt(r.avg)}</td></tr>`).join('') || `<tr><td colspan="${SUBJECTS.length+4}" class="empty">No students in this class yet.</td></tr>`}
  </tbody></table></div></div></div>`;
};
VIEWS.results_after = () => applyZoom('res');

/* ---------- Promotion ---------- */
const nextOf = c => { const cl = App.settings.classes, i = cl.indexOf(c); return i >= 0 && i < cl.length - 1 ? cl[i+1] : null; };
const decision = r => App.promoOv[r.st.id] || (r.avg != null && r.avg >= App.pass ? 'P' : 'S');
VIEWS.promote = async () => {
  if (!isSuper()) return noAccess();
  const y = Y(), cl = App.settings.classes;
  const res = await Promise.all(cl.map(async c => buildResults(studentsOf(c, y), await loadMarks(c, y), 'y')));
  App.promoData = {}; cl.forEach((c,i) => { App.promoData[c] = res[i]; });
  if (!cl.includes(App.pcls)) App.pcls = cl[0];
  const yrs = App.settings.years, prev = yrs[yrs.indexOf(y) - 1];
  const canUndo = prev && App.settings.promo[prev];
  return `<div class="card"><h2>Promotion to the next class <small>ወደ ቀጣይ ክፍል ማሸጋገር</small></h2>
   <p style="margin-top:0;font-size:.92rem">Uses each student's <b>annual average</b> for ${esc(y)} ዓ.ም (each subject is marked once out of 100, then averaged across ${SUBJECTS.length} subjects). Students with an average of 50% or above are promoted; students below 50% stay in the same class. Students at or above the pass mark move to the next class in your class list (Settings → Classes). Students without marks stay. All marks, attendance and classes for ${esc(y)} stay saved, and a new school year starts.</p>
   <div class="bar2"><label>Pass mark (average)<input type="number" id="passMark" min="0" max="100" step="0.5" value="${App.pass}" style="width:110px"></label><span class="sp"></span>
   <button class="btn alt" data-action="backup">Download backup first</button><button class="btn gold" data-action="promoteApply">Promote &amp; start ${+y + 1}</button>${canUndo ? '<button class="btn red" data-action="promoteUndo">Undo last promotion</button>' : ''}</div>
   <div id="pSummary"></div></div>
   <div class="card"><h2>Check or change one student's result</h2><div class="bar2"><label>Class<select id="pcls">${clsOpts(App.pcls)}</select></label></div><div id="pDetail"></div></div>`;
};
VIEWS.promote_after = () => paintPromo();
function paintPromoSummary(){
  const cl = App.settings.classes;
  $('#pSummary').innerHTML = `<div class="tw"><table class="g"><thead><tr><th class="name">Class</th><th>Moves to</th><th>Students</th><th>Promote</th><th>Stay</th><th>No marks yet</th></tr></thead><tbody>` + cl.map(c => {
    const rs = App.promoData[c] || [], nx = nextOf(c), P = nx ? rs.filter(r => decision(r) === 'P').length : 0;
    return `<tr><td class="name">ክፍል ${esc(c)}</td><td>${nx ? 'ክፍል ' + esc(nx) : '— last class'}</td><td>${rs.length}</td><td class="calc">${P}</td><td>${rs.length - P}</td><td>${rs.filter(r => r.avg == null).length}</td></tr>`;
  }).join('') + '</tbody></table></div>';
}
function paintPromo(){
  paintPromoSummary();
  const rs = (App.promoData[App.pcls] || []).slice().sort((a,b) => byName(a.st, b.st)), last = !nextOf(App.pcls);
  $('#pDetail').innerHTML = `<div class="tw"><table class="g"><thead><tr><th>#</th><th class="name">Name · ስም</th><th>Total /${SUBJECTS.length*100}</th><th>Average</th><th>Rank</th><th>Result</th></tr></thead><tbody>` +
    (rs.map((r,i) => `<tr><td>${i+1}</td><td class="name">${esc(r.st.name)}</td><td>${fmt(r.total)}</td><td class="calc">${fmt(r.avg)}</td><td>${r.rank || ''}</td><td>${last ? 'Stays (last class)' : `<select class="pov" data-id="${r.st.id}"><option value="P"${decision(r)==='P'?' selected':''}>Promote</option><option value="S"${decision(r)==='S'?' selected':''}>Stay</option></select>`}</td></tr>`).join('') || '<tr><td colspan="6" class="empty">No students in this class.</td></tr>') + '</tbody></table></div>';
}
function promoteApply(){
  if (!isSuper()) return deny();
  const y = Y(); if (isNaN(+y)) return toast('Set the school year as a number in Settings first');
  const ny = String(+y + 1); let up = 0;
  App.students.forEach(s => { const r = (App.promoData[s.cls] || []).find(x => x.st.id === s.id); if (r && nextOf(s.cls) && decision(r) === 'P') up++; });
  if (!confirm(`Move ${up} students up to the next class and start school year ${ny}?\n\nEveryone else stays in their class. All marks and attendance for ${y} stay saved. Download a backup first if you haven't.`)) return;
  App.students.forEach(s => {
    const r = (App.promoData[s.cls] || []).find(x => x.st.id === s.id);
    s.hist = s.hist || {}; if (s.hist[y] === undefined) s.hist[y] = s.cls;
    if (r && nextOf(s.cls) && decision(r) === 'P') s.cls = nextOf(s.cls);
  });
  const S = App.settings; S.promo[y] = { pass: App.pass, moved: up, date: new Date().toISOString().slice(0,10) };
  S.year = ny; if (!S.years.includes(ny)) S.years.push(ny); S.years.sort((a,b) => a - b);
  App.yr = null; App.promoOv = {}; App.cls = S.classes[0];
  saveStudents(); saveSettings(); toast(`${up} students promoted. School year ${ny} started.`); render();
}
function promoteUndo(){
  if (!isSuper()) return deny();
  const S = App.settings, cur = Y(), prev = S.years[S.years.indexOf(cur) - 1];
  if (!prev || !S.promo[prev]) return toast('Nothing to undo');
  if (!confirm(`Undo the promotion and go back to school year ${prev}?\n\nAnything entered in ${cur} will no longer be shown.`)) return;
  App.students.forEach(s => { if (s.hist && s.hist[prev] !== undefined) { s.cls = s.hist[prev]; delete s.hist[prev]; } });
  delete S.promo[prev]; S.years = S.years.filter(x => x !== cur); S.year = prev; App.yr = null; App.promoOv = {};
  saveStudents(); saveSettings(); toast('Promotion undone'); render();
}

/* ---------- Uniform (ልብሰ ስብሐት) lending ---------- */
const FEASTS = [['f1','ጥቅምት 5'],['f2','ጥቅምት 27'],['f3','ታህሳስ 19'],['f4','የጥምቀት በዓል'],['f5','ጥር 22'],['f6','መጋቢት 5'],['f7','መጋቢት 27'],['f8','ሚያዝያ 27'],['f9','ግንቦት 1'],['f10','ግንቦት 27'],['f11','ሐምሌ 5'],['f12','ሐምሌ 19'],['f13','ሐምሌ 22']];
const todayStr = () => { const d = new Date(), p = n => String(n).padStart(2,'0'); return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate()); };
async function loadUni(){ const u = await Store.get('uniforms', {}) || {}; return { events: Array.isArray(u.events) ? u.events : [], records: Array.isArray(u.records) ? u.records : [] }; }
const saveUni = U => Store.set('uniforms', U);
const uniEvents = U => FEASTS.map(f => [f[0], f[1], false]).concat(U.events.map(e => [e.id, e.name, true]));
const uniEvName = (U, id) => { const e = uniEvents(U).find(x => x[0] === id); return e ? e[1] : '(deleted festival)'; };
/* Uniforms are given from class 3 onward (by position in the class list) */
const uniClasses = () => { const all = App.settings.classes, i = all.indexOf('3'); return (i < 0 ? all : all.slice(i)).filter(canClass); };
const uniRecOf = (U, sid, ev, yr) => U.records.find(r => r.sid === sid && r.ev === ev && r.yr === yr);
const uniOpenOf = (U, sid) => U.records.filter(r => r.sid === sid && !r.ret);
function uniRows(U){
  const y = VY(), cls = uniClasses(), ev = App.uev;
  return App.students.filter(s => cls.includes(clsIn(s, y)) && (!App.ucl || clsIn(s, y) === App.ucl))
    .sort((a,b) => (clsIn(a,y)||'').localeCompare(clsIn(b,y)||'','am',{numeric:true}) || a.name.localeCompare(b.name,'am'))
    .map(s => ({ s, cls: clsIn(s, y), rec: uniRecOf(U, s.id, ev, y), open: uniOpenOf(U, s.id).filter(r => !(r.ev === ev && r.yr === y)) }))
    .filter(r => !App.ufl || (App.ufl === 'out' && (r.open.length || (r.rec && !r.rec.ret))));
}
VIEWS.uniform = async () => {
  if (!can('uniform.edit')) return noAccess();
  const U = await loadUni(), evs = uniEvents(U), cls = uniClasses();
  if (!evs.some(e => e[0] === App.uev)) App.uev = evs[0][0];
  if (App.ucl && !cls.includes(App.ucl)) App.ucl = '';
  const cur = evs.find(e => e[0] === App.uev), y = VY(), rows = uniRows(U);
  const outAll = U.records.filter(r => !r.ret).length, given = U.records.filter(r => r.ev === App.uev && r.yr === y).length;
  const canDelEv = cur[2] && !U.records.some(r => r.ev === cur[0]);
  const body = rows.map((r, i) => { const { s, rec } = r;
    const status = !rec ? '<span style="color:#777">— አልተሰጠም · Not given</span>' : rec.ret ? `<span style="color:#166534">✔ ተመልሷል · Returned ${esc(rec.ret)}</span>` : `<span style="color:#b45309">⏳ ወስዷል · Taken ${esc(rec.given)}</span>`;
    const warn = r.open.length ? `<div style="color:#b91c1c;font-weight:700">⚠ ያልመለሰው · Not returned: ${r.open.map(o => esc(uniEvName(U, o.ev)) + ' (' + esc(o.yr) + ')').join(', ')}</div>` : '';
    const phone = `<input class="uph" type="tel" value="${esc(rec ? rec.phone : s.phone || '')}" placeholder="09…" style="width:9.5rem"${rec ? ` data-rid="${rec.id}"` : ''}>`;
    const act = !rec ? `<button class="btn sm" data-action="uGive" data-sid="${s.id}">ሰጠ · Give</button>`
      : (rec.ret ? '' : `<button class="btn sm" data-action="uReturn" data-rid="${rec.id}">መለሰ · Returned</button> `) + `<button class="btn red sm" data-action="uUndo" data-rid="${rec.id}">ሰርዝ · Undo</button>`;
    return `<tr><td>${i+1}</td><td class="name">${esc(s.name)}${warn}</td><td>${esc(r.cls)}</td><td>${phone}</td><td>${status}</td><td class="noprint">${act}</td></tr>`; }).join('');
  return `<div class="card"><h2>Uniform <small>ልብሰ ስብሐት</small></h2>
  <p style="margin-top:0;font-size:.92rem">ከ3ኛ ክፍል ጀምሮ ላሉ ተማሪዎች። ልብሱን የሰጡትን እና የመለሱትን ይመዝግቡ። ያልመለሰ ተማሪ በሚቀጥለው ሲወስድ ማስጠንቀቂያ ይታያል።</p>
  <div class="bar2 noprint">
    <label>Festival · በዓል<select id="uev">${evs.map(e => `<option value="${esc(e[0])}"${e[0]===App.uev?' selected':''}>${esc(e[1])}${e[2]?' ★':''}</option>`).join('')}</select></label>
    <label>Class<select id="ucl"><option value="">All (3+)</option>${cls.map(c => `<option value="${esc(c)}"${c===App.ucl?' selected':''}>ክፍል ${esc(c)}</option>`).join('')}</select></label>${yearSel()}
    <label>Show<select id="ufl"><option value="">All students</option><option value="out"${App.ufl==='out'?' selected':''}>Not returned only</option></select></label>
  </div>
  <div class="bar2 noprint">
    <label>Add another festival · ሌላ በዓል ጨምር<input id="uevName" placeholder="e.g. የደብሩ ንግሥ"></label>
    <button class="btn alt" data-action="uAddEv">+ Add</button>
    ${canDelEv ? '<button class="btn red" data-action="uDelEv">Remove this festival</button>' : ''}
    <span class="sp"></span>
    <button class="btn alt" data-action="uExport">Excel · this list</button>
    <button class="btn alt" data-action="uExportOut">Excel · not returned</button>
    <button class="btn alt" data-action="uExportAll">Excel · all records</button>
  </div>
  <div class="note noprint">${esc(cur[1])} · ${esc(y)} — ${given} given · ${rows.length} shown · <b>${outAll}</b> uniform(s) not returned in total</div>
  <div class="tw"><table class="g"><thead><tr><th>#</th><th class="name">Name · ስም</th><th>Class</th><th>Phone · ስልክ</th><th>Status</th><th class="noprint"></th></tr></thead>
  <tbody>${body || '<tr><td colspan="6" class="empty">No students to show.</td></tr>'}</tbody></table></div></div>`;
};
const uniSheet = (U, recs) => recs.map((r, i) => [i+1, r.name, r.cls, r.phone, uniEvName(U, r.ev), r.yr, r.given, r.ret || '', r.ret ? 'ተመልሷል · Returned' : 'አልተመለሰም · Not returned']);
const UNI_HEAD = ['#','Student name','Class','Phone','Festival','Year','Date taken','Date returned','Status'];
const uniSort = (a,b) => String(a.cls).localeCompare(String(b.cls),'am',{numeric:true}) || a.name.localeCompare(b.name,'am');
async function mutUni(fn){ const U = await loadUni(); if (fn(U) === false) return false; saveUni(U); return true; }

/* ---------- Gallery ---------- */
VIEWS.gallery = async () => {
  if (!isSuper()) return noAccess();
  const ids = App.settings.gallery || [];
  const imgs = await Promise.all(ids.map(async id => [id, await Store.get('gal_'+id, '')]));
  return `<div class="card"><h2>Gallery <small>ፎቶዎች</small></h2>
  <div class="bar2"><label>Add photos<input type="file" id="galIn" accept="image/*" multiple></label></div>
  <div class="thumbs">${imgs.filter(x=>x[1]).map(([id,src]) => `<figure><img src="${src}" alt=""><button class="btn red sm" data-action="galdel" data-id="${id}">Remove</button></figure>`).join('') || '<p class="empty" style="grid-column:1/-1">No photos yet.</p>'}</div></div>`;
};

/* ---------- Settings ---------- */
/* ---------- Teaching books library (PDFs stored in this browser) ---------- */
const BookDB = (() => {
  const dbName = 'sfl-teaching-books-v1';
  function open(){ return new Promise((resolve,reject)=>{
    if (!('indexedDB' in window)) return reject(new Error('This browser does not support local book storage'));
    const req = indexedDB.open(dbName,1);
    req.onupgradeneeded = () => { const db=req.result; if(!db.objectStoreNames.contains('books')) { const st=db.createObjectStore('books',{keyPath:'id'}); st.createIndex('class','cls',{unique:false}); } };
    req.onsuccess=()=>resolve(req.result); req.onerror=()=>reject(req.error||new Error('Could not open book storage'));
  }); }
  async function all(){ const db=await open(); return new Promise((resolve,reject)=>{ const tx=db.transaction('books','readonly'); const req=tx.objectStore('books').getAll(); req.onsuccess=()=>resolve(req.result||[]); req.onerror=()=>reject(req.error); tx.oncomplete=()=>db.close(); }); }
  async function put(book){ const db=await open(); return new Promise((resolve,reject)=>{ const tx=db.transaction('books','readwrite'); tx.objectStore('books').put(book); tx.oncomplete=()=>{db.close();resolve();}; tx.onerror=()=>{db.close();reject(tx.error||new Error('Could not save PDF'));}; }); }
  async function remove(id){ const db=await open(); return new Promise((resolve,reject)=>{ const tx=db.transaction('books','readwrite'); tx.objectStore('books').delete(id); tx.oncomplete=()=>{db.close();resolve();}; tx.onerror=()=>{db.close();reject(tx.error);}; }); }
  return {all,put,remove};
})();
VIEWS.books = async () => {
  if (!can('books.manage')) return noAccess();
  const classes = myClasses();
  if (!classes.length) return '<div class="card"><h2>Teaching books · የመምህራን መጻሕፍት</h2><p class="empty">No class has been assigned to you yet. Please ask the super admin.</p></div>';
  const selected = App.bookClass && classes.includes(App.bookClass) ? App.bookClass : (App.cls || classes[0] || '1');
  App.bookClass = selected;
  let books=[];
  try { books=(await BookDB.all()).filter(b=>b.cls===selected).sort((a,b)=>b.added-a.added); }
  catch(e) { return `<div class="card"><h2>Teaching books · የመምህራን መጻሕፍት</h2><p class="empty">Book storage is not available in this browser. Please open the site in Chrome and try again.</p></div>`; }
  return `<div class="card"><h2>Teaching books · የመምህራን መጻሕፍት</h2>
    <p style="margin-top:0">Upload PDF teaching books and organize them by class.</p>
    <div class="formgrid" style="align-items:end">
      <label>Class · ክፍል<select id="bookClass">${classes.map(c=>`<option value="${esc(c)}"${c===selected?' selected':''}>Class ${esc(c)}</option>`).join('')}</select></label>
      <label>Book title · የመጽሐፉ ርዕስ<input id="bookTitle" type="text" maxlength="120" placeholder="e.g. Grade 1 Bible Study"></label>
      <label>Choose PDF · PDF ፋይል<input id="bookFile" class="noprint" type="file" accept="application/pdf,.pdf"></label>
    </div>
    <p class="note">PDF only. Files are saved in this browser on this device. They are not yet shared automatically with other teachers or devices.</p>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px"><button class="btn" data-action="bookupload">Upload book</button><button class="btn alt" data-action="bookrefresh">Refresh list</button></div>
    <h3 style="margin-top:24px">Books for Class ${esc(selected)} <small>(${books.length})</small></h3>
    ${books.length ? `<div class="tw"><table class="g"><thead><tr><th class="name">Book title</th><th>PDF file</th><th>Date added</th><th>Actions</th></tr></thead><tbody>${books.map(b=>`<tr><td class="name">${esc(b.title)}</td><td>${esc(b.fileName)}</td><td>${new Date(b.added).toLocaleDateString()}</td><td><button class="btn sm" data-action="bookopen" data-id="${esc(b.id)}">Open</button> <button class="btn alt sm" data-action="bookdownload" data-id="${esc(b.id)}">Download</button> <button class="btn danger sm" data-action="bookdel" data-id="${esc(b.id)}">Delete</button></td></tr>`).join('')}</tbody></table></div>` : '<p class="empty">No teaching books saved for this class yet. Choose a PDF above to add the first one.</p>'}
  </div>`;
};
async function uploadTeachingBook(){
  const cls=$('#bookClass')?.value || App.bookClass;
  if(!can('books.manage') || !canClass(cls)) return deny();
  const file=$('#bookFile')?.files?.[0];
  const title=norm($('#bookTitle')?.value) || (file ? file.name.replace(/\.pdf$/i,'') : '');
  if(!file) return toast('Please choose a PDF file first');
  if(!(file.type==='application/pdf' || file.name.toLowerCase().endsWith('.pdf'))) return toast('Only PDF files are allowed');
  if(file.size > 30*1024*1024) return toast('PDF is too large. Please use a file smaller than 30 MB.');
  try { await BookDB.put({id:uid(),cls,title,fileName:file.name,size:file.size,added:Date.now(),blob:file}); App.bookClass=cls; toast('Teaching book saved'); await render(); }
  catch(e){ toast('Could not save PDF. Check available phone storage and try again.'); }
}
async function withBook(id, mode){
  try { const b=(await BookDB.all()).find(x=>x.id===id); if(!b) return toast('Book not found');
    if(!can('books.manage') || !canClass(b.cls)) return deny();
    const url=URL.createObjectURL(b.blob);
    if(mode==='open'){ const w=window.open(url,'_blank'); if(!w) { const a=document.createElement('a'); a.href=url; a.target='_blank'; a.rel='noopener'; a.click(); } }
    else { const a=document.createElement('a'); a.href=url; a.download=b.fileName || (b.title+'.pdf'); document.body.appendChild(a); a.click(); a.remove(); }
    setTimeout(()=>URL.revokeObjectURL(url),60000);
  } catch(e){ toast('Could not open this PDF'); }
}
async function deleteTeachingBook(id){ try{ const b=(await BookDB.all()).find(x=>x.id===id); if(!b || !can('books.manage') || !canClass(b.cls)) return deny(); }catch(e){ return toast('Could not open book storage'); } if(!confirm('Delete this teaching book from this device?')) return; try{ await BookDB.remove(id); toast('Book deleted'); await render(); }catch(e){toast('Could not delete this book');} }

VIEWS.settings = async () => {
  if (!isSuper()) return noAccess();
  const s = App.settings, c = s.contact;
  return `<div class="card"><h2>School <small>ትምህርት ቤት</small></h2>
  <form id="setForm" class="form">
    <label>School year (Ethiopian) <small>ዓ.ም</small><input type="text" name="year" value="${esc(s.year)}"></label>
    <label class="full">Classes (separate with commas) <small>ክፍሎች</small><input type="text" name="classes" value="${esc(s.classes.join(', '))}"></label>
    <label>Location <small>አድራሻ</small><input type="text" name="location" value="${esc(c.location)}"></label>
    <label>Phone <small>ስልክ</small><input type="text" name="phone" value="${esc(c.phone)}"></label>
    <label>Email <small>ኢሜይል</small><input type="text" name="email" value="${esc(c.email)}"></label>
    <label>Office hours <small>የሥራ ሰዓት</small><input type="text" name="hours" value="${esc(c.hours)}"></label>
    <p class="full" style="margin:6px 0 0;font-size:.9rem;font-weight:600;color:var(--navy)">Social media · ማህበራዊ ሚዲያ <span style="font-weight:400;color:#5a678f">(paste the link or the @username; leave empty to hide)</span></p>
    ${SOCIAL.map(([k,n]) => `<label>${n}<input type="text" name="${k}" value="${esc(s.social[k])}" placeholder="https://… or @username"></label>`).join('')}
    <div class="full"><button class="btn" type="submit">Save settings</button></div>
  </form></div>
  <div class="card"><h2>Staff logins <small>የሠራተኞች መግቢያ</small></h2>
  <p style="margin-top:0;font-size:.92rem">Teachers, the registrar, the attendance keeper and the uniform keeper each have their own username and password. Add or change them in <b>Users</b>.</p>
  <button class="btn" data-action="tab" data-t="users">Open Users</button></div>
  <div class="card"><h2>School student list <small>የተማሪዎች ዝርዝር</small></h2>
  <p style="margin-top:0;font-size:.92rem">The names from your attendance workbook (classes 1–5, 7 and 9 ለ) load automatically the first time. If you removed some by mistake, this adds back any that are missing. It never changes or deletes existing students.</p>
  <button class="btn alt" data-action="seed">Add missing students from the school list</button></div>
  <div class="card"><h2>Backup <small>ምትኬ</small></h2>
  <p style="margin-top:0;font-size:.92rem">Downloads this school year's students, photos, attendance and marks. ${Store.remote ? 'Restoring also uploads them to the shared database.' : 'Use this to move data to another device.'}</p>
  <div class="bar2" style="margin:0"><button class="btn" data-action="backup">Download backup</button>
  <label>Restore from backup<input type="file" id="restoreIn" accept=".json,application/json"></label></div></div>`;
};

/* ---------- Users (super admin only) ---------- */
VIEWS.users = async () => {
  if (!isSuper()) return noAccess();
  const users = App.users || [];
  const eu = users.find(u => u.id === App.editUser) || {};
  const role = eu.role || 'teacher';
  const roleOpts = Object.keys(ROLES).map(k => `<option value="${k}"${role===k?' selected':''}>${esc(roleName(k))}</option>`).join('');
  const boxes = App.settings.classes.map(c => `<label class="chk"><input type="checkbox" name="ucls" value="${esc(c)}"${(eu.classes||[]).includes(c)?' checked':''}> ክፍል ${esc(c)}</label>`).join('');
  return `<div class="card"><h2>${eu.id ? 'Edit user' : 'Add a user'} <small>${eu.id ? 'ተጠቃሚ ማስተካከያ' : 'አዲስ ተጠቃሚ'}</small></h2>
  <form id="userForm" class="form" autocomplete="off">
    <label>Full name <small>ሙሉ ስም</small><input type="text" name="name" required value="${esc(eu.name)}"></label>
    <label>Username <small>መግቢያ ስም</small><input type="text" name="username" required autocapitalize="none" value="${esc(eu.username)}"></label>
    <label>Role <small>ሚና</small><select name="role" id="urole">${roleOpts}</select></label>
    <label>${eu.id ? 'New password (leave blank to keep)' : 'Password'} <small>የይለፍ ቃል</small><input type="text" name="password" minlength="6" ${eu.id ? '' : 'required'} autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false"></label>
    <div class="full" id="ucg"${role==='teacher' ? '' : ' hidden'}><p style="margin:0 0 6px;font-size:.85rem;font-weight:600;color:#44527d">Classes this teacher can open · የሚያስተምሩት ክፍል</p><div class="chks">${boxes}</div>
    <p style="margin:12px 0 6px;font-size:.85rem;font-weight:600;color:#44527d">Subjects assigned in each class · በየክፍሉ የሚያስተምሩት ትምህርት</p>
    <p style="margin:0 0 8px;font-size:.82rem;color:#5a678f">New teachers start with no classes or subjects selected. When editing an existing teacher, their saved selections are kept.</p>
    <div class="tw"><table class="g"><thead><tr><th>Class · ክፍል</th><th>Assigned subjects · ትምህርቶች</th></tr></thead><tbody>
    ${App.settings.classes.map(c=>`<tr><td>ክፍል ${esc(c)}</td><td><div class="chks">${SUBJECTS.map((sj,i)=>`<label class="chk"><input type="checkbox" name="usub" value="${esc(c)}|${i}"${(eu.id && Array.isArray(eu.subjectsByClass&&eu.subjectsByClass[c]) && eu.subjectsByClass[c].map(Number).includes(i))?' checked':''}> ${esc(sj.am)}</label>`).join('')}</div></td></tr>`).join('')}
    </tbody></table></div></div>
    ${eu.id ? `<label class="chk full" style="width:fit-content"><input type="checkbox" name="active"${eu.active !== false ? ' checked' : ''}> Account is active</label>` : ''}
    ${role==='teacher' ? `<label class="chk full" style="width:fit-content"><input type="checkbox" name="resultsAllowed"${eu.resultsAllowed === true ? ' checked' : ''}> Allow Results &amp; Rank · ውጤትና ደረጃ እንዲያይ ፈቃድ ስጥ</label>` : ''}
    <div class="full bar2" style="margin:0"><button class="btn" type="submit">${eu.id ? 'Save changes' : 'Create user'}</button>${eu.id ? '<button class="btn alt" type="button" data-action="cancelUser">Cancel</button>' : ''}</div>
  </form>
  <p style="font-size:.85rem;color:#44527d;margin:12px 0 0">Class teacher: only the chosen classes and subjects. Results &amp; Rank is shown only when the super admin allows it. Registrar: registers and edits students in all classes, no marks. Attendance keeper: attendance for all classes only. Super admin: everything, including this page.</p></div>
  <div class="card"><h2>Users <small>ተጠቃሚዎች</small></h2><div class="tw"><table class="g"><thead><tr><th class="name">Name · ስም</th><th>Username</th><th>Role</th><th>Classes</th><th>Status</th><th></th></tr></thead><tbody>
  ${users.map(u => `<tr><td class="name">${esc(u.name)}</td><td>${esc(u.username)}</td><td>${esc(ROLES[u.role] ? ROLES[u.role].en : u.role)}</td><td>${u.role==='teacher' ? ((u.classes||[]).map(esc).join(', ') || '—') : 'All'}</td><td><span class="rolepill${u.active===false?' off':''}">${u.active===false?'Disabled':'Active'}</span></td>
    <td><button class="btn alt sm" data-action="editUser" data-id="${u.id}">Edit</button>${u.id !== App.user.id ? ` <button class="btn red sm" data-action="delUser" data-id="${u.id}">Delete</button>` : ''}</td></tr>`).join('') || '<tr><td colspan="6" class="empty">No users yet.</td></tr>'}
  </tbody></table></div></div>`;
};
async function submitUser(f){
  if (!isSuper()) return deny();
  const v = Object.fromEntries(new FormData(f).entries());
  const name = norm(v.name), username = norm(v.username).toLowerCase(), role = v.role, pw = (v.password || '').trim();
  const classes = [...f.querySelectorAll('input[name=ucls]:checked')].map(x => x.value);
  const resultsAllowed = role === 'teacher' && !!f.querySelector('input[name=resultsAllowed]:checked');
  const subjectsByClass = {};
  [...f.querySelectorAll('input[name=usub]:checked')].forEach(x => { const [c, i] = x.value.split('|'); (subjectsByClass[c] ||= []).push(Number(i)); });
  const editing = App.editUser, active = editing ? !!v.active : true;
  if (!name || !username) return toast('Enter the name and username');
  if (/\s/.test(username) || username.length < 3) return toast('Username: at least 3 characters, no spaces');
  if (!ROLES[role]) return;
  if (role === 'teacher' && !classes.length) return toast('Choose at least one class for the teacher');
  if (role === 'teacher' && classes.some(c => !(subjectsByClass[c]||[]).length)) return toast('Choose at least one subject for every assigned class');
  if (!editing && pw.length < 6) return toast('Password must be at least 6 characters');
  let msg = '';
  const ok = await mutUsers(async list => {
    if (list.some(u => u.username.toLowerCase() === username && u.id !== editing)) { msg = 'That username is already used'; return false; }
    let u = editing ? list.find(x => x.id === editing) : null;
    if (editing && !u) { msg = 'User not found'; return false; }
    const others = list.filter(x => x.role === 'super' && x.active !== false && x.id !== editing).length;
    if (u && u.role === 'super' && (role !== 'super' || !active) && !others) { msg = 'There must be at least one active super admin'; return false; }
    let authUid = u ? u.uid : null, oldUid = null;
    if (Store.remote) {
      if (u && u.username !== username) { msg = 'The username cannot be changed. Create a new user instead.'; return false; }
      if (u && u.id === App.user.id && pw) { msg = 'To change your own password, use My account.'; return false; }
      if (pw && pw.length < 6) { msg = 'Password must be at least 6 characters'; return false; }
      if (!/^[a-z0-9._-]+$/.test(username)) { msg = 'Username: only English letters, numbers, dot, dash or underscore'; return false; }
      try {
        if (!u || pw) { oldUid = u ? u.uid : null; authUid = await provisionAuth(username, pw); }
        if (!authUid) { msg = 'This user has no login yet. Enter a password.'; return false; }
        if (oldUid && oldUid !== authUid) await FS.del('staff/' + oldUid);
        await FS.set('staff/' + authUid, { role, active, username });
      } catch (e) { msg = authMsg(e); return false; }
    }
    if (!u) { u = { id: uid() }; list.push(u); }
    Object.assign(u, {
      name, username, role,
      classes: role === 'teacher' ? classes : [],
      subjectsByClass: role === 'teacher' ? subjectsByClass : {},
      resultsAllowed: role === 'teacher' ? resultsAllowed : false,
      active
    });
    if (Store.remote) { u.uid = authUid; if (pw) u.mustChange = true; delete u.salt; delete u.passHash; }
    else if (pw) { u.salt = uid(); u.passHash = await hashUserPw(u.salt, pw); u.mustChange = u.id !== App.user.id; }
    return true;
  });
  if (!ok) return toast(msg || 'Could not save');
  App.editUser = null; toast(editing ? 'User saved' : 'User created');
  if (!(await syncUser())) return showLogin();
  shell();
}

/* ---------- My account ---------- */
VIEWS.account = async () => {
  const u = App.user;
  return `${u.mustChange ? '<div class="note">Please choose your own password below before you continue.</div>' : ''}
  <div class="card"><h2>My account <small>መለያዬ</small></h2>
  <p style="margin-top:0">Signed in as <b>${esc(u.name)}</b> · username <b>${esc(u.username)}</b><br><span class="rolepill">${esc(roleName(u.role))}</span>${u.role==='teacher' ? ` · Class ${myClasses().map(esc).join(', ') || '—'}` : ''}</p>
  <form id="accForm" class="form"><label>Current password<input type="password" name="cur" required autocomplete="current-password"></label>
    <label>New password<input type="password" name="p1" minlength="6" required autocomplete="new-password"></label>
    <label>Repeat new password<input type="password" name="p2" minlength="6" required autocomplete="new-password"></label>
    <div class="full"><button class="btn" type="submit">Change password</button></div></form></div>`;
};
async function submitAcc(f){
  const v = Object.fromEntries(new FormData(f).entries());
  v.p1 = (v.p1 || '').trim(); v.p2 = (v.p2 || '').trim(); v.cur = (v.cur || '').trim();
  if (v.p1 !== v.p2) return toast('The two passwords do not match');
  if (v.p1.length < 6) return toast('Password must be at least 6 characters');
  if (Store.remote) {
    try {
      const un = App.user.username, email = Auth.emailOf(un, await authVariant(un));
      const authUid = await Auth.signIn(email, v.cur);     /* proves the current password */
      await Auth.changePw(v.p1);
      Store.set('pwset_' + authUid, true);
    } catch (e) { return toast(/INVALID|NOT_FOUND/.test((e && e.code) || '') ? 'Current password is wrong' : authMsg(e)); }
    App.user.mustChange = false; f.reset(); toast('Password changed'); return shell();
  }
  let msg = '';
  const ok = await mutUsers(async list => {
    const u = list.find(x => x.id === App.user.id); if (!u) { msg = 'Account not found'; return false; }
    if ((await hashUserPw(u.salt, v.cur)) !== u.passHash) { msg = 'Current password is wrong'; return false; }
    u.salt = uid(); u.passHash = await hashUserPw(u.salt, v.p1); u.mustChange = false; return true;
  });
  if (!ok) return toast(msg || 'Could not save');
  await syncUser(); f.reset(); toast('Password changed'); shell();
}

/* ---------- Student file ---------- */
async function openFile(id){
  const s = App.students.find(x => x.id === id); if (!s) return;
  if (!can('file.view') || !canClass(s.cls)) return deny();
  const acad = can('marks.view');
  const m = $('#modal'); m.hidden = false; m.innerHTML = '<div class="sheet"><p class="empty">Loading…</p></div>';
  const photo = s.hasPhoto ? await Store.get('photo_'+id, '') : '';
  let blocks = '';
  for (const y of [...App.settings.years].sort((a,b) => b - a)) {
    const c = clsIn(s, y); if (!c || !acad || !canClass(c)) continue;
    const list = studentsOf(c, y);
    const [mm, atts] = await Promise.all([loadMarks(c, y), Promise.all(MONTHS.map((_,i) => Store.get(attKey(i, c, y), {})))]);
    const R = {}; ['1','2','y'].forEach(p => { R[p] = buildResults(list, mm, p).find(x => x.st.id === id); });
    const attRows = atts.map((d,i) => {
      const held = ACOLS.filter(k => list.some(x => d[x.id] && d[x.id][k] !== undefined)).length;
      if (!held) return ''; const mine = d[id] || {}; const pres = ACOLS.filter(k => mine[k] === 1).length;
      return `<tr><td class="name">${MONTHS[i]}</td><td>${pres}</td><td>${held}</td><td>${Math.round(pres/held*100)}%</td></tr>`;
    }).join('');
    const hasData = R['1'].total != null || R['2'].total != null || attRows;
    if (y !== Y() && !hasData) continue;
    blocks += `<h3>${esc(y)} ዓ.ም · ክፍል ${esc(c)}${y === Y() ? '' : ' <small style="font-weight:400;color:#5a678f">(past year)</small>'}</h3><div class="tw"><table class="g"><thead><tr><th class="name">Subject</th><th>1st sem.</th><th>2nd sem.</th><th>Yearly</th></tr></thead><tbody>
    ${SUBJECTS.map((sb,i) => `<tr><td class="name">${sb.am}</td><td>${fmt(R['1'].subj[i])}</td><td>${fmt(R['2'].subj[i])}</td><td>${fmt(R.y.subj[i])}</td></tr>`).join('')}
    <tr><td class="name"><b>Total</b></td><td class="calc">${fmt(R['1'].total)}</td><td class="calc">${fmt(R['2'].total)}</td><td class="calc">${fmt(R.y.total)}</td></tr>
    <tr><td class="name"><b>Average</b></td><td class="calc">${fmt(R['1'].avg)}</td><td class="calc">${fmt(R['2'].avg)}</td><td class="calc">${fmt(R.y.avg)}</td></tr>
    <tr><td class="name"><b>Rank in class</b></td><td class="calc">${R['1'].rank||''}</td><td class="calc">${R['2'].rank||''}</td><td class="calc">${R.y.rank||''}</td></tr></tbody></table></div>
    ${attRows ? `<div class="tw" style="margin-top:10px"><table class="g"><thead><tr><th class="name">Attendance</th><th>Present</th><th>Sessions</th><th>%</th></tr></thead><tbody>${attRows}</tbody></table></div>` : '<p class="empty">No attendance recorded.</p>'}`;
  }
  m.innerHTML = `<div class="sheet"><button class="btn alt sm x noprint" data-action="close">Close</button>
    <h2 style="margin:0 0 12px;color:var(--navy)">የተማሪ ፋይል · Student file</h2>
    <div class="hd"><div class="ph">${photo ? `<img src="${photo}" alt="">` : 'No photo'}</div>
    <dl><dt>Name</dt><dd><b>${esc(s.name)}</b></dd><dt>Christian name</dt><dd>${esc(s.christian)||'—'}</dd><dt>Class now</dt><dd>ክፍል ${esc(s.cls)}</dd>
    <dt>Sex · Age</dt><dd>${s.gender==='M'?'ወንድ':s.gender==='F'?'ሴት':'—'} · ${esc(s.age)||'—'}</dd><dt>Guardian</dt><dd>${esc(s.guardian)||'—'}</dd><dt>Phone</dt><dd>${esc(s.phone)||'—'}</dd>
    <dt>Address</dt><dd>${esc(s.address)||'—'}</dd><dt>Confessor father</dt><dd>${esc(s.confessor)||'—'}</dd><dt>Registered</dt><dd>${esc(s.regDate)||'—'}</dd>${s.notes?`<dt>Notes</dt><dd>${esc(s.notes)}</dd>`:''}</dl></div>
    ${acad ? (blocks || '<p class="empty">No marks or attendance recorded yet.</p>') : '<p class="empty">Marks and attendance are not shown for your role.</p>'}
    <div class="bar2 noprint" style="margin-top:16px"><button class="btn" data-action="printfile">Print file</button></div></div>`;
}

/* ---------- Excel exports ---------- */
function xesc(v){ return String(v == null ? '' : v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;'); }
function excelFile(filename, headers, rows){
  const body = rows.map(r => '<Row>'+r.map(v => '<Cell><Data ss:Type="String">'+xesc(v)+'</Data></Cell>').join('')+'</Row>').join('');
  const xml = '<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Worksheet ss:Name="Sheet1"><Table><Row>'+headers.map(h=>'<Cell><Data ss:Type="String">'+xesc(h)+'</Data></Cell>').join('')+'</Row>'+body+'</Table></Worksheet></Workbook>';
  const blob = new Blob([xml], {type:'application/vnd.ms-excel'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=filename; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href),3000);
}
function exportStudents(){
  const q=App.q.trim().toLowerCase(), y=VY();
  const list=App.students.filter(s=>canClass(clsIn(s,y)) && (!App.fcls || clsIn(s,y)===App.fcls) && (!q || (s.name+' '+(s.christian||'')+' '+(s.phone||'')).toLowerCase().includes(q))).sort((a,b)=>(clsIn(a,y)||'').localeCompare(clsIn(b,y),'am',{numeric:true})||a.name.localeCompare(b.name,'am'));
  excelFile('students-'+(App.fcls||'all-classes')+'-'+y+'.xls',['#','Student name','Christian name','Class','Sex','Age','Guardian','Phone','Address','Confessor father','Registered'],list.map((s,i)=>[i+1,s.name,s.christian,clsIn(s,y),s.gender==='M'?'ወንድ':s.gender==='F'?'ሴት':'',s.age,s.guardian,s.phone,s.address,s.confessor,s.regDate]));
}
async function exportAttendance(){
  if(!can('attendance.edit') || !canClass(App.cls)) return deny();
  const list=studentsOf(App.cls), y=VY(), key=attKey(App.month,App.cls), data=await Store.get(key,{});
  const headers=['#','Student name','Student ID','Christian name','Class','Sex','Age','Guardian','Phone',...ACOLS.map(c=>c.endsWith('s')?'ቅ':'እ'),'Present','%'];
  const held=ACOLS.filter(c=>list.some(st=>data[st.id]&&data[st.id][c]!==undefined)).length;
  const rows=list.map((st,i)=>{const d=data[st.id]||{}, p=ACOLS.filter(c=>d[c]===1).length; return [i+1,st.name,st.studentNo||'',st.christian||'',clsIn(st,y)||st.cls||'',st.gender==='M'?'ወንድ':st.gender==='F'?'ሴት':'',st.age||'',st.guardian||'',st.phone||'',...ACOLS.map(c=>d[c]===1?'✓':d[c]===0?'✗':''),p,held?Math.round(p/held*100)+'%':''];});
  excelFile('attendance-'+App.cls+'-'+MONTHS[App.month]+'-'+y+'.xls',headers,rows);
}
async function exportMarks(){
  if(!can('marks.edit') || !canClass(App.cls) || !canSubject(App.cls,App.subj)) return deny();
  const list=studentsOf(App.cls), y=VY(), key=marksKey(1,App.cls), data=await Store.get(key,{}), sj=App.subj;
  const rows=list.map((st,i)=>{const a=(data[st.id]||{})[sj]||[]; return [i+1,st.name,st.studentNo||'', 'Mid /20',a[0]??'', 'Test 1 /10',a[1]??'', 'Test 2 /10',a[2]??'', 'Test 3 /10',a[3]??'', 'Test 4 /10',a[4]??'', 'Sum /60',hasAny(a)?fmt(sum60(a)):'','Final /40',a[5]??'','Total /100',fmt(total100(a))];});
  excelFile('mark-list-'+App.cls+'-'+SUBJECTS[sj].en+'-'+y+'.xls',['#','Student name','Student ID','Mid','Mark','Test 1','Mark','Test 2','Mark','Test 3','Mark','Test 4','Mark','Sum /60','Final','Final mark','Total /100','Total'],rows);
}

/* ---------- Backup / restore ---------- */
async function backup(){
  if (!isSuper()) return deny();
  toast('Preparing backup…');
  const keys = ['settings','students', ...(SECURE ? [] : ['users']), 'uniforms']; const cl = App.settings.classes;
  App.students.forEach(s => s.hasPhoto && keys.push('photo_'+s.id));
  (App.settings.gallery||[]).forEach(id => keys.push('gal_'+id));
  App.settings.years.forEach(y => cl.forEach(c => { for (let m=0;m<12;m++) keys.push(attKey(m,c,y)); keys.push(marksKey(1,c,y)); }));
  const out = {};
  for (let i=0;i<keys.length;i+=8) await Promise.all(keys.slice(i,i+8).map(async k => { const v = await Store.get(k, undefined); if (v !== undefined) out[k] = v; }));
  const blob = new Blob([JSON.stringify({app:'sfl',year:Y(),data:out})], {type:'application/json'});
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `sunday-school-backup-${Y()}.json`; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href),4000);
}
async function restore(file){
  if (!isSuper()) return deny();
  try { const j = JSON.parse(await file.text()); if (j.app !== 'sfl' || !j.data) throw 0;
    if (!confirm('Replace the current data with this backup?')) return;
    Object.entries(j.data).forEach(([k,v]) => { if (SECURE && (k === 'users' || k === 'authmap' || k.startsWith('pwset_'))) return; Store.set(k,v); });
    await loadSettings(); App.students = await Store.get('students', []); if (!(await syncUser())) return showLogin(); toast('Backup restored'); shell();
  } catch(e){ toast('That file is not a valid backup'); }
}

/* ============================================================
   EVENTS
   ============================================================ */
/* ---------- Portal zoom (A− / A+) ---------- */
let ZOOM = 100;
try { const z = Number(window.localStorage.getItem('sfl_zoom')); if (z >= 60 && z <= 200) ZOOM = z; } catch(e){}
function applyPortalZoom(){
  const p = $('#portal'); if (p) p.style.zoom = ZOOM === 100 ? '' : String(ZOOM / 100);
  const l = $('#zoomLbl'); if (l) l.textContent = ZOOM + '%';
  try { window.localStorage.setItem('sfl_zoom', String(ZOOM)); } catch(e){}
}
const setZoom = z => { ZOOM = Math.max(60, Math.min(200, z)); applyPortalZoom(); };
applyPortalZoom();
const ACT = {
  zoomIn: () => setZoom(ZOOM + 10),
  zoomOut: () => setZoom(ZOOM - 10),
  zoomReset: () => setZoom(100),
  tab: el => { App.tab = el.dataset.t; App.editId = null; render(); },
  site: () => { location.hash = '#home'; },
  logout: async () => { if (SECURE) await Store.flush(); App.user = null; App.users = null; App.editUser = null; try { sessionStorage.removeItem('sfl-uid'); } catch(e){}
    if (SECURE) { Auth.out(); Store.wipe(); App.students = []; } showLogin(); },
  refresh: async () => { await loadSettings(); App.students = await Store.get('students', []); if (!(await syncUser())) return showLogin(); shell(); toast('Data refreshed'); },
  editUser: el => { if (!isSuper()) return deny(); App.editUser = el.dataset.id; render(); window.scrollTo(0,0); },
  cancelUser: () => { App.editUser = null; render(); },
  delUser: async el => {
    if (!isSuper()) return deny();
    const id = el.dataset.id; if (id === App.user.id) return toast('You cannot delete your own account');
    const t = (App.users || []).find(x => x.id === id); if (!t || !confirm(`Delete the account of ${t.name}?`)) return;
    let msg = '';
    const ok = await mutUsers(async list => { const i = list.findIndex(x => x.id === id); if (i < 0) return false;
      if (list[i].role === 'super' && !list.some(x => x.role === 'super' && x.active !== false && x.id !== id)) { msg = 'There must be at least one active super admin'; return false; }
      if (Store.remote && list[i].uid) { try { await FS.del('staff/' + list[i].uid); } catch (e) { msg = 'Could not remove this account\'s access. Try again.'; return false; } }
      list.splice(i, 1); return true; });
    if (ok) { toast('User deleted'); render(); } else if (msg) toast(msg);
  },
  edit: el => { if (!can('students.edit')) return deny(); App.editId = el.dataset.id; App.tab = 'register'; shell(); },
  cancelEdit: () => { App.editId = null; App.tab = 'students'; shell(); },
  del: el => { if (!can('students.edit')) return deny(); const s = App.students.find(x => x.id === el.dataset.id); if (!s || !confirm(`Delete ${s.name}? Their marks and attendance entries stay in the records but will no longer be shown.`)) return;
    if (Store.remote && s.portalDoc) FS.del('pub/' + s.portalDoc).catch(() => {});
    App.students = App.students.filter(x => x !== s); if (s.hasPhoto) Store.set('photo_'+s.id, ''); saveStudents(); App.tab === 'classes' ? render() : paintStudents(); toast('Student removed'); },
  file: el => openFile(el.dataset.id),
  uGive: async el => {
    if (!can('uniform.edit')) return deny();
    const s = App.students.find(x => x.id === el.dataset.sid); if (!s) return;
    const phone = norm(el.closest('tr').querySelector('.uph').value);
    if (!phone) return toast('ስልክ ቁጥር ያስገቡ · Enter a phone number first');
    const y = VY(), ev = App.uev; let stop = '';
    const ok = await mutUni(U => {
      if (uniRecOf(U, s.id, ev, y)) { stop = 'Already recorded'; return false; }
      const open = uniOpenOf(U, s.id);
      if (open.length && !confirm(`${s.name} ባለፈው የወሰደውን ልብሰ ስብሐት አልመለሰም:\n${open.map(o => '• ' + uniEvName(U, o.ev) + ' (' + o.yr + ') — ' + o.given).join('\n')}\n\nአሁንም መስጠት ይፈልጋሉ? · Give another one anyway?`)) return false;
      U.records.push({ id: uid(), ev, yr: y, sid: s.id, name: s.name, cls: clsIn(s, y) || s.cls, phone, given: todayStr(), ret: '' }); return true; });
    if (ok) { toast('Recorded'); render(); } else if (stop) toast(stop);
  },
  uReturn: async el => { if (!can('uniform.edit')) return deny();
    const ok = await mutUni(U => { const r = U.records.find(x => x.id === el.dataset.rid); if (!r) return false; r.ret = todayStr(); return true; });
    if (ok) { toast('Marked as returned'); render(); } },
  uUndo: async el => { if (!can('uniform.edit')) return deny();
    if (!confirm('Remove this record?')) return;
    const ok = await mutUni(U => { const i = U.records.findIndex(x => x.id === el.dataset.rid); if (i < 0) return false; U.records.splice(i, 1); return true; });
    if (ok) { toast('Record removed'); render(); } },
  uAddEv: async () => { if (!can('uniform.edit')) return deny();
    const inp = $('#uevName'), name = norm(inp && inp.value); if (!name) return toast('Type the festival name first');
    let id = ''; const ok = await mutUni(U => { if (uniEvents(U).some(e => norm(e[1]) === name)) return false; id = 'c' + uid(); U.events.push({ id, name }); return true; });
    if (ok) { App.uev = id; toast('Festival added'); render(); } else toast('That festival is already in the list'); },
  uDelEv: async () => { if (!can('uniform.edit')) return deny(); if (!confirm('Remove this festival from the list?')) return;
    const ok = await mutUni(U => { if (U.records.some(r => r.ev === App.uev)) return false; U.events = U.events.filter(e => e.id !== App.uev); return true; });
    if (ok) { App.uev = 'f1'; render(); } },
  uExport: async () => { if (!can('uniform.edit')) return deny();
    const U = await loadUni(), y = VY(), rows = uniRows(U).map(r => r.rec ? Object.assign({}, r.rec) : { name: r.s.name, cls: r.cls, phone: r.s.phone || '', ev: App.uev, yr: y, given: '', ret: '', none: true });
    excelFile('uniform-' + uniEvName(U, App.uev) + '-' + (App.ucl || 'all-classes') + '-' + y + '.xls', UNI_HEAD,
      uniSheet(U, rows).map((r, i) => rows[i].none ? r.slice(0, 8).concat(['አልተሰጠም · Not given']) : r)); },
  uExportOut: async () => { if (!can('uniform.edit')) return deny();
    const U = await loadUni(); const rows = U.records.filter(r => !r.ret && uniClasses().includes(r.cls)).sort(uniSort);
    if (!rows.length) return toast('Nothing is outstanding');
    excelFile('uniform-not-returned-' + todayStr() + '.xls', UNI_HEAD, uniSheet(U, rows)); },
  uExportAll: async () => { if (!can('uniform.edit')) return deny();
    const U = await loadUni(); const rows = U.records.filter(r => uniClasses().includes(r.cls)).sort((a,b) => String(b.yr).localeCompare(String(a.yr)) || uniSort(a,b));
    if (!rows.length) return toast('No records yet');
    excelFile('uniform-all-records-' + todayStr() + '.xls', UNI_HEAD, uniSheet(U, rows)); },
  publishPortal: async () => {
    if (!Store.remote) return toast('Not needed here: without Firebase the student portal uses this device\'s data.');
    if (!(isSuper() || can('students.edit'))) return deny();
    const list = App.students.filter(x => x.portalKey && x.portalWrap);
    if (!list.length) return toast('No student has a portal password yet');
    const memo = new Map(); let n = 0, bad = 0;
    for (const st of list) { try { await publishStudent(st, memo); n++; } catch (e) { bad++; } if ((n + bad) % 5 === 0) toast('Publishing… ' + (n + bad) + '/' + list.length); }
    saveStudents(); toast('Published ' + n + ' student(s)' + (bad ? ', ' + bad + ' failed' : ''));
  },
  exportStudents: () => exportStudents(),
  exportAttendance: () => exportAttendance(),
  exportMarks: () => exportMarks(),
  bookupload: () => uploadTeachingBook(),
  bookrefresh: () => render(),
  bookopen: el => withBook(el.dataset.id, 'open'),
  bookdownload: el => withBook(el.dataset.id, 'download'),
  bookdel: el => deleteTeachingBook(el.dataset.id),
  close: () => { $('#modal').hidden = true; },
  printfile: () => { document.body.classList.add('pm'); window.print(); },
  print: () => window.print(),
  zoom: el => { const k = el.dataset.k; App.zoom[k] = Math.min(1.8, Math.max(.5, Math.round((App.zoom[k] + .1*el.dataset.d)*10)/10)); applyZoom(k); },
  att: el => { if (!can('attendance.edit') || !canClass(App.cls)) return deny(); const { data, key } = App.ctx; const sid = el.dataset.sid, c = el.dataset.col; const d = (data[sid] = data[sid] || {});
    if (d[c] === undefined) d[c] = 1; else if (d[c] === 1) d[c] = 0; else delete d[c];
    if (!Object.keys(d).length) delete data[sid]; Store.set(key, data); paintAtt(); },
  attall: el => { if (!can('attendance.edit') || !canClass(App.cls)) return deny(); const { data, key, list } = App.ctx; const c = el.dataset.col; const all = list.length && list.every(s => data[s.id] && data[s.id][c] === 1);
    list.forEach(s => { const d = (data[s.id] = data[s.id] || {}); if (all) delete d[c]; else d[c] = 1; if (!Object.keys(d).length) delete data[s.id]; });
    Store.set(key, data); paintAtt(); },
  galdel: el => { if (!isSuper()) return deny(); if (!confirm('Remove this photo?')) return; const id = el.dataset.id; App.settings.gallery = App.settings.gallery.filter(x => x !== id); Store.set('gal_'+id, ''); saveSettings(); render(); },
  menu: el => { const n = $('#nav'); const o = n.classList.toggle('open'); el.setAttribute('aria-expanded', o); },
  seed: () => { if (!isSuper()) return deny(); const add = seedMissing(App.students); if (!add.length) return toast('All students from the school list are already here'); App.students = App.students.concat(add); saveStudents(); toast(add.length + ' students added'); },
  promoteApply: () => promoteApply(),
  promoteUndo: () => promoteUndo(),
  backup: () => backup(),
  install: async () => { if (!deferred) return; deferred.prompt(); await deferred.userChoice; deferred = null; $('#installBtn').hidden = true; }
};
document.addEventListener('click', e => { if (e.target.closest('#nav a')) $('#nav').classList.remove('open'); const el = e.target.closest('[data-action]'); if (el && ACT[el.dataset.action]) ACT[el.dataset.action](el, e); });
$('#modal').addEventListener('click', e => { if (e.target.id === 'modal') ACT.close(); });
window.addEventListener('afterprint', () => document.body.classList.remove('pm'));

document.addEventListener('input', e => {
  const t = e.target;
  if (t.classList && t.classList.contains('mk')) onMark(t);
  else if (t.id === 'stq') { App.q = t.value; paintStudents(); }
  else if (t.id === 'passMark') { App.pass = parseFloat(t.value) || 0; paintPromo(); }
});
document.addEventListener('change', async e => {
  const t = e.target;
  if (t.id === 'urole') { const g = $('#ucg'); if (g) g.hidden = t.value !== 'teacher'; return; }
  if (t.id === 'bookClass') { App.bookClass = t.value; render(); return; }
  if (t.classList && t.classList.contains('nm')) {
    const s = App.students.find(x => x.id === t.dataset.id); const v = norm(t.value);
    if (!can('students.edit')) { if (s) t.value = s.name; return deny(); }
    if (!s) return; if (!v) { t.value = s.name; return toast('The name cannot be empty'); }
    if (v !== s.name) { s.name = v; saveStudents(); toast('Name saved'); }
    return;
  }
  if (t.classList && t.classList.contains('uph') && t.dataset.rid) {
    if (!can('uniform.edit')) return deny(); const v = norm(t.value);
    if (!v) { toast('Phone number cannot be empty'); return render(); }
    await mutUni(U => { const r = U.records.find(x => x.id === t.dataset.rid); if (!r) return false; r.phone = v; return true; }); toast('Phone saved'); return;
  }
  if (t.classList && t.classList.contains('pov')) { App.promoOv[t.dataset.id] = t.value; paintPromoSummary(); return; }
  if (t.id === 'yrsel') { App.yr = t.value; if (App.fcls && !App.settings.classes.includes(App.fcls)) App.fcls=''; render(); }
  else if (t.id === 'showPw') { const pw = $('#pw'); if (pw) pw.type = t.checked ? 'text' : 'password'; }
  else if (t.id === 'uev') { App.uev = t.value; render(); }
  else if (t.id === 'ucl') { App.ucl = t.value; render(); }
  else if (t.id === 'ufl') { App.ufl = t.value; render(); }
  else if (t.id === 'pcls') { App.pcls = t.value; paintPromo(); }
  else if (t.id === 'ccls') { App.cls = t.value; render(); }
  else if (t.id === 'fcls') { App.fcls = t.value; paintStudents(); }
  else if (t.id === 'acls' || t.id === 'mcls' || t.id === 'rcls') { App.cls = t.value; render(); }
  else if (t.id === 'amon') { App.month = +t.value; render(); }
  else if (t.id === 'msem') { App.sem = t.value; render(); }
  else if (t.id === 'msub') { App.subj = +t.value; render(); }
  else if (t.id === 'rper') { App.period = t.value; render(); }
  else if (t.id === 'rsort') { App.sort = t.value; render(); }
  else if (t.id === 'photoIn' && t.files[0]) {
    try { App.photo = await resizeImage(t.files[0], 260, .78); $('#photoPrev').innerHTML = `<img src="${App.photo}" alt="">`; } catch(err){ toast('Could not read that image'); }
  } else if (t.id === 'galIn' && t.files.length) {
    if (!isSuper()) return deny();
    toast('Adding photos…');
    for (const f of t.files) { try { const src = await resizeImage(f, 900, .72); const id = uid(); Store.set('gal_'+id, src); App.settings.gallery.push(id); } catch(err){} }
    saveSettings(); render();
  } else if (t.id === 'restoreIn' && t.files[0]) restore(t.files[0]);
});
document.addEventListener('submit', async e => {
  const f = e.target; e.preventDefault();
  if (f.id === 'dashboardYearForm') {
    if (!isSuper()) return deny();
    const v = new FormData(f).get('year');
    const nextYear = String(parseInt(v, 10));
    if (!/^\d{4}$/.test(nextYear) || +nextYear < 2000 || +nextYear > 2200) return toast('Enter a valid Ethiopian school year.');
    if (nextYear !== Y() && !confirm(`Change the current school year from ${Y()} to ${nextYear}? Previous years' marks and attendance will remain saved.`)) return;
    App.settings.year = nextYear;
    if (!App.settings.years.includes(nextYear)) App.settings.years.push(nextYear);
    App.settings.years.sort((a,b) => +a - +b);
    App.yr = null;
    await saveSettings();
    toast(`Current school year changed to ${nextYear} ዓ.ም`);
    await render();
  } else if (f.id === 'studentLoginForm') {
    const no=norm($('#studentNoLogin').value).toLowerCase(), pw=$('#studentPassLogin').value;
    if (SECURE) return secureStudentLogin(no, pw);
    const st=App.students.find(x=>norm(x.studentNo).toLowerCase()===no);
    if(!st || !st.studentPasswordHash || (await hashStudentPassword(pw))!==st.studentPasswordHash){ $('#studentLoginErr').textContent='Incorrect ID number or password. Ask your teacher if you have not received login details.'; return; }
    await showStudentDashboard(st);
  } else if (f.id === 'setupForm') {
    await secureSetup();
  } else if (f.id === 'loginForm') {
    if (SECURE) return secureLogin();
    const un = norm($('#uname').value).toLowerCase(), pw = $('#pw').value, err = $('#loginErr');
    err.textContent = '';
    let users = await Store.get('users', null);
    if (!Array.isArray(users) || !users.length) {
      /* first ever login: the first super admin is "admin" (old PIN or CONFIG.defaultPin becomes its password) */
      if (Store.offline()) { err.textContent = 'Cannot reach the shared database. Check the internet and try again.'; return; }
      const st = App.settings;
      const okFirst = un === 'admin' && (st.pinHash ? (await hashPin(pw)) === st.pinHash : pw === CONFIG.defaultPin);
      if (!okFirst) { err.textContent = 'Wrong username or password.'; return; }
      const salt = uid();
      users = [{ id: uid(), name: 'Super Admin', username: 'admin', role: 'super', classes: [], active: true, salt, passHash: await hashUserPw(salt, pw), mustChange: !st.pinHash }];
      Store.set('users', users);
    }
    const u = users.find(x => x.username.toLowerCase() === un);
    let pwOk = false;
    if (u && u.active !== false) {
      for (const cand of [...new Set([pw, pw.trim()])]) { if ((await hashUserPw(u.salt, cand)) === u.passHash) { pwOk = true; break; } }
    }
    if (!pwOk) { err.textContent = (u && u.active === false) ? 'This account is turned off. Ask the super admin.' : 'Wrong username or password. Check spaces and capital letters (tick "Show password").'; return; }
    App.users = users; App.user = u; App.editUser = null;
    try { sessionStorage.setItem('sfl-uid', u.id); } catch(err2){}
    App.tab = u.mustChange ? 'account' : 'dashboard';
    openPortal();
  } else if (f.id === 'addForm') {
    if (!can('students.edit')) return deny();
    const n = norm($('#newName').value); if (!n) return;
    if (App.students.some(x => x.cls === App.cls && norm(x.name) === n)) return toast('This name is already in the class');
    App.students.push({ id: uid(), since: Y(), name: n, christian:'', gender:'', age:'', cls: App.cls, guardian:'', phone:'', address:'', confessor:'', regDate: new Date().toISOString().slice(0,10), notes:'' });
    saveStudents(); toast('Student added'); await render(); const i = $('#newName'); if (i) i.focus();
  } else if (f.id === 'regForm') submitReg(f);
  else if (f.id === 'userForm') submitUser(f);
  else if (f.id === 'accForm') submitAcc(f);
  else if (f.id === 'setForm') {
    if (!isSuper()) return deny();
    const v = Object.fromEntries(new FormData(f).entries()); const s = App.settings;
    s.year = v.year.trim() || s.year;
    if (!s.years.includes(s.year)) { s.years.push(s.year); s.years.sort((a,b) => a - b); }
    App.yr = null;
    const cl = [...new Set(v.classes.split(/[,،]/).map(x => x.trim()).filter(Boolean))]; if (cl.length) s.classes = cl;
    s.contact = { location:v.location.trim(), phone:v.phone.trim(), email:v.email.trim(), hours:v.hours.trim() };
    s.social = {}; SOCIAL.forEach(([k]) => { s.social[k] = norm(v[k]); });
    if (!s.classes.includes(App.cls)) App.cls = s.classes[0];
    saveSettings(); renderPublic(); toast('Settings saved');
  }
});

/* ---------- header shadow on scroll ---------- */
window.addEventListener('scroll', () => { const t = $('.top'); if (t) t.classList.toggle('sc', window.scrollY > 10); }, { passive: true });

/* ---------- nav highlight ---------- */
if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('#nav a')];
  const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + en.target.id)); }), { rootMargin: '-35% 0px -55% 0px' });
  ['home','about','programs','schedule','gallery','contact'].forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
}


/* ---------- Student portal: read-only personal information and annual results ---------- */
let studentSession = null;
function showStudentLogin(){
  $('#site').hidden=false; $('#portal').hidden=true;
  $('#modal').hidden=true; window.scrollTo(0,0);
  const main=$('#site');
  let box=$('#studentPortalBox');
  if(!box){ box=document.createElement('section'); box.id='studentPortalBox'; box.className='blk'; main.appendChild(box); }
  box.innerHTML=`<div class="wrap"><div class="card login"><img src="logo.png" alt=""><h2>Student portal</h2><p class="am">የተማሪ ውጤትና መረጃ</p><form id="studentLoginForm"><label>Student ID number<input id="studentNoLogin" required autocomplete="username" placeholder="SFL-0001"></label><label>Password<input id="studentPassLogin" type="password" required autocomplete="current-password" placeholder="Your password"></label><div class="err" id="studentLoginErr"></div><button class="btn" style="width:100%">Sign in</button></form><p><a href="#home">Back to website</a></p></div></div>`;
  // The portal box is appended after the public site content. Scroll to it so
  // the portal is visible immediately when a visitor taps Student Results.
  box.scrollIntoView({behavior:'auto', block:'start'});
}
async function openStudentPortal(){
  try {
    await loadSettings();
    if (!SECURE) { const st=await Store.get('students',[]); App.students=Array.isArray(st)?st:[]; }
    showStudentLogin();
  } catch (err) {
    showStudentLogin();
    const e=$('#studentLoginErr');
    if(e) e.textContent='The student portal could not load records. Please refresh the page or contact your teacher.';
  }
}
async function showStudentDashboard(student){ renderStudentDash(await studentSnapshot(student)); }
function renderStudentDash(snap){
  studentSession=snap; const box=$('#studentPortalBox'); if(!box) return;
  let cards='';
  for(const yr of snap.years){
    const average=yr.avg==null?'Not available':fmt(yr.avg)+'%';
    cards+=`<div class="card"><h2>School year ${esc(yr.y)} · Class ${esc(yr.c)}</h2><p><b>Annual average:</b> ${average} ${yr.avg==null?'':yr.avg>=50?'<span class="badge">PASS</span>':'<span class="badge">NOT PROMOTED</span>'}</p><div class="tw"><table class="g"><thead><tr><th>Subject</th><th>Annual mark /100</th></tr></thead><tbody>${SUBJECTS.map((sub,i)=>`<tr><td>${esc(sub.en)} · ${esc(sub.am)}</td><td>${yr.subj[i]==null?'Not entered':fmt(yr.subj[i])}</td></tr>`).join('')}</tbody></table></div><h3>Attendance by month</h3>${yr.att.length?`<div class="tw"><table class="g"><thead><tr><th>Month</th><th>Present</th><th>Recorded sessions</th><th>Attendance</th></tr></thead><tbody>${yr.att.map(a=>`<tr><td>${MONTHS[a.m]}</td><td>${a.present}</td><td>${a.held}</td><td>${Math.round(a.present/a.held*100)}%</td></tr>`).join('')}</tbody></table></div>`:'<p>Attendance has not been recorded yet.</p>'}</div>`;
  }
  box.innerHTML=`<div class="wrap"><div class="card"><div class="bar2"><div><h2 style="margin:0">Welcome, ${esc(snap.name)}</h2><p>Student ID: <b>${esc(snap.studentNo)}</b> · Current class: <b>${esc(snap.cls)}</b></p></div><span class="sp"></span><button class="btn alt" id="studentLogout">Log out</button></div><p>You can view only your own student information, attendance and annual results.</p><div class="tw"><table class="g"><tbody><tr><th>Christian name</th><td>${esc(snap.christian||'—')}</td></tr><tr><th>Age</th><td>${esc(snap.age||'—')}</td></tr><tr><th>Guardian</th><td>${esc(snap.guardian||'—')}</td></tr><tr><th>Registration date</th><td>${esc(snap.regDate||'—')}</td></tr></tbody></table></div></div>${cards||'<div class="card">No annual records are available yet.</div>'}<p><a href="#home">Back to website</a></p></div>`;
  $('#studentLogout').addEventListener('click',()=>{studentSession=null;showStudentLogin();});
}

/* ---------- routing, install, offline ---------- */
let deferred = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferred = e; $('#installBtn').hidden = false; });
function route(){
  if (location.hash.startsWith('#/student')) { openStudentPortal(); }
  else if (location.hash.startsWith('#/portal')) openPortal();
  else { $('#portal').hidden = true; $('#site').hidden = false; $('#modal').hidden = true; const id = location.hash.slice(1); const el = id && document.getElementById(id); if (el) el.scrollIntoView(); }
}
window.addEventListener('hashchange', route);
(async function init(){
  await loadSettings(); renderPublic(); route();
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(()=>{});
})();

/* ---------- automatic logout after 30 minutes without activity (shared computers) ---------- */
(() => {
  const LIMIT = 30 * 60 * 1000; let last = Date.now();
  ['click', 'keydown', 'touchstart', 'scroll', 'mousemove'].forEach(ev => document.addEventListener(ev, () => { last = Date.now(); }, { passive: true }));
  setInterval(() => { if (App.user && Date.now() - last > LIMIT) { last = Date.now(); toast('You were logged out after 30 minutes without activity.'); ACT.logout(); } }, 30000);
})();
})();
