/* UN Campus LMS - Front-end only demo
   Data is stored in localStorage. Replace sample Google Drive URLs and
   passcodes in MODULE_DATA before deployment.
*/

const MODULE_DATA = {
  IT: {
    name: "Information Technology",
    short: "IT",
    icon: "💻",
    description: "Technology, computing and software-focused programmes.",
    batches: {
      "DIIT B12": { year: "2026", modules: [
        ["Fundamentals of Computer","M01"],["Operating System","M02"],["Computer Hardware & Network","M03"],
        ["MS OFFICE","M04"],["Computational Mathematics & Logic","M05"],["Programming with Python","M06"],
        ["Database & SQL","M07"],["Graphics with Photoshop","M08"],["Internet, Emails, and AI","M09"],
        ["Static Web Pages (HTML/CSS)","M10"],["Programming Techniques & System","M11"],["Desktop Development with C#.Net","M12"]
      ]},
      "DIIT B13": { year: "2026", modules: [
        ["Fundamentals of Computer","M01"],["Operating System","M02"],["Computer Hardware & Network","M03"],
        ["MS OFFICE","M04"],["Computational Mathematics & Logic","M05"],["Programming with Python","M06"],
        ["Database & SQL","M07"],["Graphics with Photoshop","M08"],["Internet, Emails, and AI","M09"],
        ["Static Web Pages (HTML/CSS)","M10"],["Programming Techniques & System","M11"],["Desktop Development with C#.Net","M12"]
      ]},
      "DIIT B14": { year: "2026", modules: [
        ["Fundamentals of Computer","M01"],["Operating System","M02"],["Computer Hardware & Network","M03"],
        ["MS OFFICE","M04"],["Computational Mathematics & Logic","M05"],["Programming with Python","M06"],
        ["Database & SQL","M07"],["Graphics with Photoshop","M08"],["Internet, Emails, and AI","M09"],
        ["Static Web Pages (HTML/CSS)","M10"],["Programming Techniques & System","M11"],["Desktop Development with C#.Net","M12"]
      ]},
      "DIIT B15": { year: "2026", modules: [
        ["Fundamentals of Computer","M01"],["Operating System","M02"],["Computer Hardware & Network","M03"],
        ["MS OFFICE","M04"],["Computational Mathematics & Logic","M05"],["Programming with Python","M06"],
        ["Database & SQL","M07"],["Graphics with Photoshop","M08"],["Internet, Emails, and AI","M09"],
        ["Static Web Pages (HTML/CSS)","M10"],["Programming Techniques & System","M11"],["Desktop Development with C#.Net","M12"]
      ]}
    }
  },
  English: {
    name: "English",
    short: "English",
    icon: "🗣️",
    description: "English language, communication and professional skills.",
    batches: {
      "DIE B01": { year: "2026", modules: [
        ["Grammar & Usage","M01"],["Reading Skills","M02"],["Writing Skills","M03"],["Listening Skills","M04"],
        ["Speaking Skills","M05"],["Vocabulary Development","M06"],["Communication Skills","M07"],
        ["Presentation Skills","M08"],["Business English","M09"],["Academic English","M10"],
        ["Professional Communication","M11"],["Final Project","M12"]
      ]},
      "DIE B02": { year: "2026", modules: [
        ["Grammar & Usage","M01"],["Reading Skills","M02"],["Writing Skills","M03"],["Listening Skills","M04"],
        ["Speaking Skills","M05"],["Vocabulary Development","M06"],["Communication Skills","M07"],
        ["Presentation Skills","M08"],["Business English","M09"],["Academic English","M10"],
        ["Professional Communication","M11"],["Final Project","M12"]
      ]},
      "DIE B03": { year: "2026", modules: [
        ["Grammar & Usage","M01"],["Reading Skills","M02"],["Writing Skills","M03"],["Listening Skills","M04"],
        ["Speaking Skills","M05"],["Vocabulary Development","M06"],["Communication Skills","M07"],
        ["Presentation Skills","M08"],["Business English","M09"],["Academic English","M10"],
        ["Professional Communication","M11"],["Final Project","M12"]
      ]}
    }
  }
};

// Demo passcodes for lecturers to change before using the system.
const PASSCODES = {
  "M01":"UN101","M02":"UN102","M03":"UN103","M04":"UN104","M05":"UN105","M06":"UN106",
  "M07":"UN107","M08":"UN108","M09":"UN109","M10":"UN110","M11":"UN111","M12":"UN112"
};

// Replace these sample links with actual Google Drive "Anyone with the link" URLs.
const DRIVE_LINKS = {
  lecture: "https://drive.google.com/",
  assignment: "https://drive.google.com/file/d/1zz882WZowVOjCen008gHNMxuRS1sOOmg/view?usp=sharing"
};

const DEFAULT_USER = {
  username:"student", password:"123456", name:"Demo Student", email:"student02@uncampus.local",
  username:"student", password:"student123", name:"Siyath MSM", email:"student01@uncampus.local"
};

const state = {
  user: null,
  page: "dashboard",
  department: null,
  batch: null,
  search: ""
};

function getUsers(){ return JSON.parse(localStorage.getItem("unCampusUsers") || "[]"); }
function saveUsers(users){ localStorage.setItem("unCampusUsers", JSON.stringify(users)); }
function getEnrollments(){
  return JSON.parse(localStorage.getItem("unCampusEnrollments") || "{}");
}
function saveEnrollments(data){ localStorage.setItem("unCampusEnrollments", JSON.stringify(data)); }

function seed(){
  const users = getUsers();
  if(!users.some(u => u.username === DEFAULT_USER.username)){
    users.push(DEFAULT_USER); saveUsers(users);
  }
}
seed();

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function toast(message, type=""){
  const el=$("#toast"); el.textContent=message; el.className=`toast show ${type}`;
  setTimeout(()=>el.classList.remove("show"),2800);
}

function setAuthTab(tab){
  $$(".auth-tab").forEach(b=>b.classList.toggle("active", b.dataset.auth===tab));
  $("#loginPanel").classList.toggle("active",tab==="login");
  $("#registerPanel").classList.toggle("active",tab==="register");
}
$$(".auth-tab").forEach(b=>b.addEventListener("click",()=>setAuthTab(b.dataset.auth)));

$("#loginForm").addEventListener("submit", e=>{
  e.preventDefault();
  const identifier=$("#loginIdentifier").value.trim().toLowerCase();
  const password=$("#loginPassword").value;
  const user=getUsers().find(u=>(u.username.toLowerCase()===identifier || (u.email||"").toLowerCase()===identifier) && u.password===password);
  if(!user){toast("Invalid username/email or password.","error");return;}
  login(user);
});

$("#registerForm").addEventListener("submit", e=>{
  e.preventDefault();
  const name=$("#regName").value.trim(), username=$("#regUsername").value.trim(), password=$("#regPassword").value, confirm=$("#regConfirm").value;
  if(password!==confirm){toast("Passwords do not match.","error");return;}
  if(password.length<6){toast("Password must be at least 6 characters.","error");return;}
  const users=getUsers();
  if(users.some(u=>u.username.toLowerCase()===username.toLowerCase())){toast("Username already exists.","error");return;}
  const user={name,username,password,email:`${username}@uncampus.local`};
  users.push(user); saveUsers(users); login(user); toast("Account created successfully.","success");
});

function login(user){
  state.user=user;
  sessionStorage.setItem("unCampusSession",JSON.stringify(user));
  $("#authScreen").classList.add("hidden"); $("#appScreen").classList.remove("hidden");
  $("#headerName").textContent=user.name; $("#userAvatar").textContent=user.name.charAt(0).toUpperCase();
  render();
}

function logout(){
  sessionStorage.removeItem("unCampusSession");
  state.user=null; state.page="dashboard"; state.department=null; state.batch=null;
  $("#appScreen").classList.add("hidden"); $("#authScreen").classList.remove("hidden");
}
$("#logoutBtn").addEventListener("click",logout);

function currentModules(){
  if(!state.department || !state.batch) return [];
  return MODULE_DATA[state.department].batches[state.batch].modules;
}
function moduleKey(moduleId){ return `${state.department}|${state.batch}|${moduleId}|${state.user.username}`; }
function isEnrolled(id){ return !!getEnrollments()[moduleKey(id)]; }

function render(){
  $$(".nav-item").forEach(n=>n.classList.toggle("active",n.dataset.page===state.page));
  if(state.page==="dashboard") renderDashboard();
  if(state.page==="departments") renderDepartments();
  if(state.page==="myLearning") renderLearning();
  if(state.page==="resources") renderResources();
  if(state.page==="announcements") renderAnnouncements();
}

function pageTitle(title,sub,action=""){
  return `<div class="page-title"><div><h1>${title}</h1><p>${sub}</p></div>${action}</div>`;
}

function renderDashboard(){
  const enrolled=Object.keys(getEnrollments()).filter(k=>k.endsWith(`|${state.user.username}`));
  const active=enrolled.length;
  $("#pageContent").innerHTML=`
    ${pageTitle(`Good afternoon, ${escapeHTML(state.user.name.split(" ")[0])} 👋`,"Welcome to your UN Campus learning dashboard.")}
    <section class="hero">
      <div><h1>Build your skills with UN Campus</h1><p>Access lecture notes, assignments and learning resources in one place.</p></div>
      <div class="mini-stat"><strong>${active}</strong><small>Enrolled modules</small></div>
    </section>
    <section class="stat-grid">
      <div class="stat-card"><div class="stat-icon">▦</div><strong>2</strong><small>Departments</small></div>
      <div class="stat-card"><div class="stat-icon">⌂</div><strong>6</strong><small>Available batches</small></div>
      <div class="stat-card"><div class="stat-icon">✓</div><strong>${active}</strong><small>My modules</small></div>
      <div class="stat-card"><div class="stat-icon">◈</div><strong>${active ? Math.min(active*2,24) : 0}</strong><small>Learning resources</small></div>
    </section>
    <div class="quick-grid">
      <section>
        <h2 class="section-title">Quick access</h2>
        <div class="card">
          <div class="module-list">
            <div class="module-row"><div class="module-number">IT</div><div><strong>Information Technology</strong><small>DIIT B01 · B02 · B03</small></div><button class="outline-btn" onclick="openDepartment('IT')">Explore</button></div>
            <div class="module-row"><div class="module-number">EN</div><div><strong>English</strong><small>DIE B01 · B02 · B03</small></div><button class="outline-btn" onclick="openDepartment('English')">Explore</button></div>
          </div>
        </div>
      </section>
      <section>
        <h2 class="section-title">Getting started</h2>
        <div class="card">
          <div class="module-list">
            <div class="module-row"><div class="module-number">1</div><div><strong>Select Department</strong><small>Choose IT or English.</small></div></div>
            <div class="module-row"><div class="module-number">2</div><div><strong>Select Batch</strong><small>Open your batch modules.</small></div></div>
            <div class="module-row"><div class="module-number">3</div><div><strong>Enroll</strong><small>Use lecturer passcode.</small></div></div>
          </div>
        </div>
      </section>
    </div>`;
}

function renderDepartments(){
  $("#pageContent").innerHTML=`
    ${pageTitle("Departments","Choose your department to view available batches.")}
    <div class="department-grid">
      ${Object.entries(MODULE_DATA).map(([key,d])=>`
        <article class="dept-card" onclick="openDepartment('${key}')">
          <div class="dept-icon">${d.icon}</div><h3>${d.name}</h3><p>${d.description}</p>
          <span class="batch-tag">${Object.keys(d.batches).length} batches available</span>
        </article>`).join("")}
    </div>`;
}

function openDepartment(dept){
  state.department=dept; state.batch=null; state.page="departments"; renderBatches();
}

function renderBatches(){
  const d=MODULE_DATA[state.department];
  $("#pageContent").innerHTML=`
    <div class="breadcrumb"><span onclick="state.page='departments';renderDepartments()">Departments</span> / ${d.name}</div>
    ${pageTitle(`${d.name} Batches`,"Select your batch to view its modules.")}
    <div class="batch-grid">
      ${Object.entries(d.batches).map(([batch,b])=>`
        <article class="batch-card" onclick="openBatch('${escapeAttr(batch)}')">
          <h3>${batch}</h3><p>${b.modules.length} modules · Academic year ${b.year}</p><span class="batch-tag">View Modules →</span>
        </article>`).join("")}
    </div>`;
}

function openBatch(batch){
  state.batch=batch; state.page="departments"; renderModules();
}

function renderModules(){
  const d=MODULE_DATA[state.department], b=d.batches[state.batch];
  const filtered=b.modules.filter(m=>m[0].toLowerCase().includes(state.search.toLowerCase()));
  $("#pageContent").innerHTML=`
    <div class="breadcrumb"><span onclick="state.page='departments';renderDepartments()">Departments</span> / <span onclick="renderBatches()">${d.short}</span> / ${state.batch}</div>
    ${pageTitle(state.batch,`${d.name} · ${b.modules.length} modules`)}
    <div class="module-grid">
      ${filtered.map((m,i)=>moduleCard(m,i)).join("")}
    </div>
    ${!filtered.length?`<div class="card" style="text-align:center;color:var(--muted)">No modules match your search.</div>`:""}`;
}

function moduleCard(m,i){
  const [name,id]=m, enrolled=isEnrolled(id);
  return `<article class="module-card ${enrolled?"":"locked"}">
    <div class="top"><span class="batch-tag">${id}</span>${enrolled?`<span class="status-pill">ENROLLED</span>`:`<span class="lock-note">🔒 Locked</span>`}</div>
    <h3 style="margin-top:12px">${escapeHTML(name)}</h3>
    <p>${enrolled?"Your resources are unlocked.":"Enrollment requires the lecturer's passcode."}</p>
    <div class="module-actions">
      ${enrolled?`
        <a class="resource-btn" href="${DRIVE_LINKS.lecture}" target="_blank" rel="noopener">📘 Lecture Notes</a>
        <a class="resource-btn" href="${DRIVE_LINKS.assignment}" target="_blank" rel="noopener">📝 Assignment</a>
      `:`<button class="enroll-btn" onclick="openEnroll('${id}','${escapeAttr(name)}')">🔑 Enroll</button>`}
    </div>
  </article>`;
}

function openEnroll(id,name){
  $("#modalContent").innerHTML=`
    <h2>Enroll in module</h2><p><strong>${escapeHTML(id)} · ${escapeHTML(name)}</strong><br>Enter the passcode provided by your lecturer to unlock the learning resources.</p>
    <form onsubmit="confirmEnroll(event,'${id}')">
      <label>Lecturer Passcode<input class="passcode-field" id="passcodeInput" type="password" placeholder="••••••" required></label>
      <button class="primary-btn full" type="submit">Verify & Enroll</button>
    </form>`;
  openModal();
}

function confirmEnroll(e,id){
  e.preventDefault();
  if($("#passcodeInput").value.trim()!==PASSCODES[id]){toast("Incorrect lecturer passcode.","error");return;}
  const data=getEnrollments(); data[moduleKey(id)]=new Date().toISOString(); saveEnrollments(data);
  closeModal(); toast("Module enrolled successfully.","success"); renderModules();
}

function renderLearning(){
  const enrolled=Object.entries(getEnrollments()).filter(([k])=>k.endsWith(`|${state.user.username}`));
  $("#pageContent").innerHTML=`
    ${pageTitle("My Learning","Your enrolled modules and learning progress.")}
    ${enrolled.length?`<div class="learning-list">${enrolled.map(([key,date])=>{
      const [dept,batch,id]=key.split("|"); const m=MODULE_DATA[dept]?.batches[batch]?.modules.find(x=>x[1]===id); if(!m)return "";
      return `<div class="learning-item"><div class="module-number">${id}</div><div class="learning-info"><strong>${escapeHTML(m[0])}</strong><small>${dept} · ${batch}</small><div class="progress"><span style="width:0%"></span></div></div><button class="outline-btn" onclick="openModule('${dept}','${escapeAttr(batch)}','${id}')">Open</button></div>`;
    }).join("")}</div>`:`<div class="card" style="text-align:center;padding:45px"><h3>No enrolled modules yet</h3><p style="color:var(--muted);font-size:12px;margin:8px 0 18px">Choose a department and enroll in your first module.</p><button class="primary-btn" onclick="state.page='departments';renderDepartments()">Browse Departments</button></div>`}`;
}

function openModule(dept,batch,id){
  const m=MODULE_DATA[dept].batches[batch].modules.find(x=>x[1]===id);
  state.department=dept; state.batch=batch;
  $("#modalContent").innerHTML=`<div class="modal-success"><div class="success-icon">✓</div><h2>${escapeHTML(m[0])}</h2><p>${dept} · ${batch}<br>Your module is unlocked.</p>
    <div class="module-actions" style="justify-content:center"><a class="resource-btn" href="${DRIVE_LINKS.lecture}" target="_blank" rel="noopener">📘 Lecture Notes</a><a class="resource-btn" href="${DRIVE_LINKS.assignment}" target="_blank" rel="noopener">📝 Assignment</a></div></div>`;
  openModal();
}

function renderResources(){
  $("#pageContent").innerHTML=`
    ${pageTitle("Learning Resources","Central place for your Google Drive-based academic resources.")}
    <div class="resource-grid">
      <div class="resource-card"><div class="r-icon">📘</div><div><strong>Lecture Notes</strong><p>Connect each module to its Google Drive folder or document.</p><a class="outline-btn" href="${DRIVE_LINKS.lecture}" target="_blank" rel="noopener">Open Drive</a></div></div>
      <div class="resource-card"><div class="r-icon">📝</div><div><strong>Assignments</strong><p>Connect module assignments to your Google Drive location.</p><a class="outline-btn" href="${DRIVE_LINKS.assignment}" target="_blank" rel="noopener">Open Drive</a></div></div>
      <div class="resource-card"><div class="r-icon">🎥</div><div><strong>Video Lectures</strong><p>Add YouTube or Drive links here when your lecturers provide them.</p></div></div>
      <div class="resource-card"><div class="r-icon">📅</div><div><strong>Academic Calendar</strong><p>Keep exam dates, assignment deadlines and important events visible.</p></div></div>
    </div>`;
}

function renderAnnouncements(){
  $("#pageContent").innerHTML=`
    ${pageTitle("Announcements","Important updates from UN Campus.")}
    <div class="announcement"><h3>Welcome to the new UN Campus LMS</h3><p>Students can select their department and batch, then use the lecturer-provided module passcode to access learning resources.</p><time>Today</time></div>
    <div class="announcement"><h3>Google Drive resources</h3><p>Lecture notes and assignments are linked through Google Drive. Replace the sample URLs in app.js with your actual Drive links.</p><time>Academic Office</time></div>
    <div class="announcement"><h3>Module enrollment</h3><p>Keep your module passcodes private. Lecturers can provide the correct code to students who are eligible to enroll.</p><time>Academic Office</time></div>`;
}

function openModal(){ $("#modal").classList.remove("hidden"); }
function closeModal(){ $("#modal").classList.add("hidden"); }
$$("[data-close-modal]").forEach(el=>el.addEventListener("click",closeModal));

$$(".nav-item").forEach(btn=>btn.addEventListener("click",()=>{
  state.page=btn.dataset.page; state.department=null; state.batch=null; state.search=""; $("#globalSearch").value="";
  render(); closeSidebar();
}));

$("#globalSearch").addEventListener("input",e=>{
  state.search=e.target.value;
  if(state.department && state.batch) renderModules();
  else if(state.search) {
    state.page="departments"; renderDepartments();
  }
});

$("#menuBtn").addEventListener("click",()=>{ $("#sidebar").classList.add("open"); $("#mobileOverlay").classList.add("show"); });
$("#mobileOverlay").addEventListener("click",closeSidebar);
function closeSidebar(){ $("#sidebar").classList.remove("open"); $("#mobileOverlay").classList.remove("show"); }

$("#notificationBtn").addEventListener("click",()=>toast("You have 3 LMS announcements.","success"));

function escapeHTML(str){return String(str).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));}
function escapeAttr(str){return String(str).replace(/'/g,"&#039;");}

const session=sessionStorage.getItem("unCampusSession");
if(session){try{login(JSON.parse(session));}catch(e){sessionStorage.removeItem("unCampusSession");}}


/* Theme preference */
const savedTheme = localStorage.getItem("unCampusTheme") || "light";
applyTheme(savedTheme);

function applyTheme(theme){
  document.body.classList.toggle("dark-theme", theme === "dark");
  const toggle = document.getElementById("themeToggle");
  if(toggle){
    toggle.classList.toggle("dark", theme === "dark");
    toggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    toggle.title = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  }
}
document.getElementById("themeToggle")?.addEventListener("click",()=>{
  const next = document.body.classList.contains("dark-theme") ? "light" : "dark";
  localStorage.setItem("unCampusTheme", next);
  applyTheme(next);
  toast(next === "dark" ? "Dark mode enabled." : "Light mode enabled.","success");
});
