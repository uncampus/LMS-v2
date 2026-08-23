# UN Campus LMS v4 — HTML/CSS/JS

Updated front-end LMS prototype with:

- 4 separate student username/password accounts
- Login-only student authentication (registration removed)
- Certificate / Diploma / HND level categories after department selection
- CIIT, DIIT, HND and English sample batches
- Multiple lecture notes per module
- Multiple assignments per module
- Lecturer passcode protected module enrollment
- Dark/light mode
- Responsive dashboard, mobile navigation and resource modal

## Student accounts

Edit `STUDENT_ACCOUNTS` in `app.js` to add or change users.

Sample accounts:
- student01 / 123456
- student02 / 123456
- student03 / 123456
- student04 / 123456

## Add batches and levels

Edit `MODULE_DATA` in `app.js`. Each department contains:

```js
categories: {
  "Certificate Level": { "CIIT B01": {...} },
  "Diploma Level": { "DIIT B01": {...} },
  "HND Level": { "HND B01": {...} }
}
```

## Add multiple lecture notes and assignments

Edit `MODULE_RESOURCES`:

```js
"M01": {
  lectureNotes: [
    {title:"Lecture Note 01", url:"YOUR_URL"},
    {title:"Lecture Note 02", url:"YOUR_URL"}
  ],
  assignments: [
    {title:"Assignment 01", url:"YOUR_URL"},
    {title:"Assignment 02", url:"YOUR_URL"}
  ]
}
```

You can add any number of objects to either array.

## Important

This is still a client-side prototype. Passwords, user accounts, passcodes and enrollment data are stored in the browser and are not suitable for secure production authentication. For production use, connect the interface to Firebase/Supabase or a PHP/MySQL/Laravel backend.
