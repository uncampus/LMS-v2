# UN Campus LMS — HTML/CSS/JS Version

A responsive front-end LMS prototype using only:
- HTML
- CSS
- Vanilla JavaScript
- Browser localStorage/sessionStorage
- Google Drive links

## Demo login
Username: `student01`
Password: `123456`

## Main features
1. Home/login/register screen
2. Local student account registration
3. Student dashboard
4. IT and English departments
5. DIIT B01–B03 and DIE B01–B03 sample batches
6. 12 modules per sample batch
7. Module enrollment with lecturer passcode
8. Lecture Notes and Assignment buttons connected to Google Drive
9. My Learning page
10. Resources page
11. Announcements
12. Responsive mobile sidebar
13. Search field
14. Toast notifications
15. Local session persistence

## How to customize
Open `app.js`.

### 1. Change Google Drive links
Edit:
```js
const DRIVE_LINKS = {
  lecture: "YOUR_LECTURE_DRIVE_LINK",
  assignment: "YOUR_ASSIGNMENT_DRIVE_LINK"
};
```

For better organization, you can later add separate URLs per module.

### 2. Change lecturer passcodes
Edit:
```js
const PASSCODES = {
  "M01":"UN101",
  ...
};
```

### 3. Add batches
Add another batch inside `MODULE_DATA`.

### 4. Add modules
Each module follows:
```js
["Module Name", "M13"]
```

## Important limitation
This version is a client-side prototype. Passwords, passcodes and enrollment records are stored in the browser, so this is NOT secure for a real production LMS.

For a real system, the next stage should use:
- Firebase Authentication + Firestore, or
- Supabase Auth + PostgreSQL, or
- PHP/MySQL / Laravel + MySQL.

The current version is useful for UI testing, demonstrations and initial deployment on static hosting.


## New UI upgrades
- Light/dark mode toggle with saved preference
- Floating/hover animations throughout the interface
- Local SVG illustrations and learning banner
- Responsive decorative visuals
- Need Help card linked to `siyathmsm2000@gmail.com`
