# IMPORTANT — Teacher login repair package

This package keeps the existing website, images, school features, and current Firebase project ID (`etf27-ef703`). It does **not** delete or migrate any Firestore records.

**One setup item is still required before teacher login can work:** `config.js` needs the Web API key for the existing Firebase web app. The uploaded package did not contain this key, so it cannot safely be guessed.

1. In Firebase Console, open project `etf27-ef703` → Project settings → General → Your apps → your web app.
2. Copy the **Web API key** and paste it into `apiKey: ''` in `config.js`. This is the public web-app API key, not a service-account private key.
3. In Firebase Authentication, confirm Email/Password is enabled.
4. In Authentication → Settings → Authorized domains, add your exact Cloudflare Pages hostname if it is not already listed.
5. Deploy the complete folder contents to Cloudflare Pages (not the ZIP file itself).

**Do not replace your Firestore data or publish open rules.** This package preserves the existing security rules file; review/publish rules only after confirming they match the existing database structure. Keep your database backup.

---

# Faith Hope Love Sunday School – website + staff portal

Files: index.html, logo.png, icon-192.png, icon-512.png, manifest.webmanifest, sw.js (keep them together in one folder).

## Put it online (GitHub Pages, free)
1. Create a GitHub repository, upload every file in this folder.
2. Settings → Pages → Branch: main, folder: / (root) → Save.
3. Open the link GitHub gives you. Teachers' portal = add `#/portal` to the link (or tap "Teachers" in the header).
   Netlify also works: drag the folder onto app.netlify.com/drop.

## Share one database between teachers (Firebase, free)
1. console.firebase.google.com → Add project → Build → Firestore Database → Create (production mode).
2. Rules tab → paste, then Publish:
   rules_version = '2';
   service cloud.firestore { match /databases/{db}/documents { match /kv/{doc} { allow read, write: if true; } } }
3. Project settings → General → "Your apps" → Web app (</>) → copy `projectId` and `apiKey`.
4. Open config.js and paste your NEW project's values into `projectId` and `apiKey`, then re-upload config.js.
5. The portal's top-right badge shows "Shared database" when it works.

Note: these rules let anyone who has the link read and write the data. The staff login only hides the portal screens (see "Security" below).
For stronger protection, add Firebase Authentication later.

## Daily use
- First login: username `admin`, password `1234` (or your old PIN if you had changed it). You are taken to **My account** to choose your own password. Then add everyone else in **Users**.
- Students: names from the school workbook load automatically on first login. Class lists = fix a name, add or remove a student per class. Register = full details. Students → File = printable student file.
- Attendance: pick class + month, tap boxes (✓ / ✗ / empty).
- Marks: pick class, semester, subject. Results & rank gives semester and yearly lists.
- Settings → Backup: download a backup regularly.
- "Install app" appears in the portal bar on phones/Chrome.

- End of year: Promotion tab → students with a yearly average of 50 or more move to the next class (pass mark can be changed, single students can be overridden). Old marks and attendance stay saved under their year; use the Year box in Attendance / Marks / Results to look at past years, or open a student's File to see every year.


## Staff roles (new)
Everyone signs in at `#/portal` with their own username and password. The super admin creates accounts in **Users**.

| Role | Can open |
|---|---|
| Super admin (ዋና አስተዳዳሪ) | Everything, including Users, Settings, Promotion, Gallery, Backup |
| Class teacher (የክፍል መምህር) | Only the classes assigned to them: student list (view), Marks, Results, Teaching books |
| Registrar (መዝጋቢ) | Register / edit / remove students and Class lists for all classes. No marks, no attendance |
| Attendance keeper (የተገኝነት ተቆጣጣሪ) | Attendance for all classes only |

Every account can change its own password in **My account**. New or reset accounts are asked to choose a new password at first login. The system always keeps at least one active super admin.

## Security (please read)
Roles are enforced inside the web page. That keeps honest users in their lane, but because the database rules above are open (`allow read, write: if true`), a technical person could still read the data directly. Before using real student data online, add Firebase Authentication and Firestore rules that check each person's role on the server.

## Recent updates (October 2026)
- Added a Student Results portal link at `#/student`. Students sign in using the ID number and password set by a teacher in the student registration/edit form. The portal displays the student's profile, annual subject marks, annual average and attendance by month.
- Removed the semester selector from mark entry. Each subject is entered once for the whole school year, out of 100. The annual average is used for promotion; 50% or above promotes, below 50% stays.

**Important before publishing for real student use:** this package currently has blank Firebase configuration and the existing storage design stores the records as one shared key-value record. It therefore does not yet provide secure, server-enforced per-student data isolation or shared online data. Do not publish real student records/passwords with this setup. To use this safely for students on different devices, configure Firebase and migrate student records/results to Firestore documents protected by Firebase Authentication and security rules so each student can read only their own record. Student passwords are hashed in the current front end, but front-end checks alone are not a security boundary.


## Combined version (all features in one)
This package merges the four earlier builds:
- Staff roles: super admin, class teacher, registrar, attendance keeper.
- Teacher accounts limited to assigned classes AND assigned subjects per class (new teachers start with none selected).
- Results & Rank hidden from teachers unless the super admin ticks "Allow Results & Rank" on that teacher.
- Student results portal at `#/student`.
- Excel export for Students, Attendance and Marks lists.
- PWA files (manifest.webmanifest, sw.js) so "Install app" works.
- Firebase config reset to blank so you can enter your new project's values.
- **Uniform tracking (ልብሰ ስብሐት):** new "Uniform" tab for the super admin and registrar. 13 festivals are built in; extra festivals can be added (marked ★). Classes 3 and above only. Records who took a uniform, their phone number, and when it was returned. If a student who has not returned an earlier uniform is given another, a warning shows. Excel export: this list, not-returned list, all records. Included in Backup.
- **Uniform keeper account:** in Users, choose the role "Uniform keeper · የልብሰ ስብሐት ተቆጣጣሪ" to give someone their own username and password. They can open only Dashboard, Uniform and My account.
- **Zoom:** A− / 100% / A+ buttons in the portal top bar zoom the whole portal (60%–200%). The choice is remembered on that device.
- **Login fixes:** passwords are now trimmed of stray spaces when created or changed, login also accepts a password typed with extra spaces, a "Show password" box was added to the login form, and the password box in Users is visible so typos are easy to spot.


## SECURE SETUP (Firebase sign-in + closed rules) — read this first
When `projectId` and `apiKey` are filled in, the site now uses real Firebase sign-in and the data is closed to the public.

1. Firebase console → **Build → Authentication → Get started → Sign-in method → Email/Password → Enable → Save**. (Do NOT enable "Anonymous".)
2. Firebase console → **Build → Firestore Database → Rules**. Delete everything, paste the whole content of **firestore.rules** from this folder, press **Publish**.
3. Put `projectId` and `apiKey` into **config.js** (the only file you edit), upload everything to GitHub, wait for Cloudflare to deploy.
4. **Right away** open `https://YOUR-SITE/#/portal`. The first screen is **First-time setup**: enter your name and a password. This creates the super admin (username `admin`). It appears only once, so do it before you share the link.
5. Log in, then use **Users** to add staff. Usernames: English letters, numbers, dot, dash, underscore.

How it works
- Every staff member has a real Firebase account. The Firestore rules only allow people who are in the staff list and active. Turning a user off in Users locks them out immediately.
- Only the super admin can change the staff list, settings and gallery (enforced by the rules). Other roles (teacher, registrar...) are limited by the app screens only; a technical staff member could still read other data.
- **Reset a password:** Users → Edit → type a new password. The user must choose their own password at the next login.
- Usernames cannot be changed after creating a user. Delete and re-create instead.
- If you forget the super admin password: Firebase console → Firestore → delete the document `meta/setup` and the document `staff/<admin uid>`, delete the admin in Authentication → Users, then open the portal again for First-time setup. (Your school data stays.)
- **Student portal:** results are published as encrypted records that only the student's ID + password can open. After you set or change a student's password it publishes automatically. After marks or attendance change, press **Publish results to students** (Students tab). Student passwords need at least 6 characters.
- Backups no longer include the staff list.
- Firebase "Authentication → Settings → User actions": leave sign-up enabled (the app uses it to create staff). Nobody gets data access from just creating an account.
- Without Firebase values the site still works on one device only, with the old local login.


## Performance and security upgrade (latest version)
- The code is now split: `index.html` (page), `app.js` (program), `config.js` (your Firebase keys — the only file you edit).
- `_headers` is read automatically by Cloudflare. It adds a strict Content-Security-Policy (only this site's own scripts may run), HTTPS-only, no framing, no sniffing, and correct caching (images cached for a week; pages always fresh).
- Images are compressed (about 60% smaller overall).
- Staff are logged out automatically after 30 minutes without activity. Five wrong passwords lock the login for one minute (staff and student portal).
- Fixed: after saving a user, the Users list could show the old list, and two quick saves could overwrite each other.
- Tested in a real browser (Chromium) against a simulated Firebase that follows `firestore.rules`: first-time setup, login, password change and reset, roles, student portal, uniform tracker, outsiders blocked, turned-off users blocked. It was NOT tested against the real Firebase service.
