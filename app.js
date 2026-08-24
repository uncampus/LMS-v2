/* UN Campus LMS v4 - Front-end prototype
   Customize STUDENT_ACCOUNTS, BATCH_DATA and MODULE_RESOURCES below.
   Data is stored in browser localStorage/sessionStorage.
*/

const STUDENT_ACCOUNTS = [
  { username:"student01", password:"123456", name:"Student One", email:"student01@uncampus.local" },
  { username:"student02", password:"123456", name:"Student Two", email:"student02@uncampus.local" },
  { username:"student03", password:"123456", name:"Student Three", email:"student03@uncampus.local" },
  { username:"student04", password:"123456", name:"Student Four", email:"student04@uncampus.local" }
];

/* Add/edit departments, categories and batches here. */
const COMMON_IT_CERT = [
  ["Computer Fundamentals","M01"],["Windows & File Management","M02"],["MS Word","M03"],
  ["MS Excel","M04"],["Internet & Email","M05"],["Introduction to AI","M06"]
];
const COMMON_IT_DIP = [
  ["Fundamentals of Computer","M01"],["Operating System","M02"],["Computer Hardware & Network","M03"],
  ["MS OFFICE","M04"],["Computational Mathematics & Logic","M05"],["Programming with Python","M06"],
  ["Database & SQL","M07"],["Graphics with Photoshop","M08"],["Internet, Emails, and AI","M09"],
  ["Static Web Pages (HTML/CSS)","M10"],["Programming Techniques & System","M11"],["Desktop Development with C#.Net","M12"]
];
const COMMON_HND = [
  ["Personal Computer Applications","M01"],["Computer Hardware","M02"],["Structured Programming","M03"],
  ["Data Representation & Organization","M04"],["Database Management Systems","M05"],["Web Development","M06"],
  ["Mathematics for Computing","M07"],["Communication Skills","M08"]
];
const COMMON_EN_CERT = [
  ["Basic Grammar","M01"],["Everyday Vocabulary","M02"],["Reading Basics","M03"],
  ["Basic Writing","M04"],["Listening Basics","M05"],["Spoken English","M06"]
];
const COMMON_EN_DIP = [
  ["Grammar & Usage","M01"],["Reading Skills","M02"],["Writing Skills","M03"],["Listening Skills","M04"],
  ["Speaking Skills","M05"],["Vocabulary Development","M06"],["Communication Skills","M07"],
  ["Presentation Skills","M08"],["Business English","M09"],["Academic English","M10"]
];
const COMMON_EN_HND = [
  ["Advanced Grammar","M01"],["Academic Writing","M02"],["Professional Communication","M03"],
  ["Presentation Skills","M04"],["Business English","M05"],["Research Communication","M06"]
];

/* Each module can have unlimited lecture notes and assignments.
   Add objects to lectureNotes / assignments arrays as needed. */
const MODULE_DATA = {
  IT: {
    name:"Information Technology", short:"IT", icon:"💻",
    description:"Technology, computing and software-focused programmes.",
    categories:{
      "Certificate Level":{
        "CIIT B01":{year:"2026",modules:COMMON_IT_CERT},
        "CIIT B02":{year:"2026",modules:COMMON_IT_CERT},
        "CIIT B03":{year:"2026",modules:COMMON_IT_CERT}
      },
      "Diploma Level":{
        "DIIT B12":{year:"2026",modules:COMMON_IT_DIP},
        "DIIT B13":{year:"2026",modules:COMMON_IT_DIP},
        "DIIT B14":{year:"2026",modules:COMMON_IT_DIP},
        "DIIT B15":{year:"2026",modules:COMMON_IT_DIP}
      },
      "HND Level":{
        "HND B01":{year:"2026",modules:COMMON_HND},
        "HND B02":{year:"2026",modules:COMMON_HND},
        "HND B03":{year:"2026",modules:COMMON_HND}
      }
    }
  },
  English: {
    name:"English", short:"English", icon:"🗣️",
    description:"English language, communication and professional skills.",
    categories:{
      "Certificate Level":{
        "CIET B01":{year:"2026",modules:COMMON_EN_CERT},
        "CIET B02":{year:"2026",modules:COMMON_EN_CERT}
      },
      "Diploma Level":{
        "DIET B01":{year:"2026",modules:COMMON_EN_DIP},
        "DIET B02":{year:"2026",modules:COMMON_EN_DIP}
      },
      "HND Level":{
        "HND EN B01":{year:"2026",modules:COMMON_EN_HND},
        "HND EN B02":{year:"2026",modules:COMMON_EN_HND}
      }
    }
  }
};

const MODULE_RESOURCES = {
  "M01": {
    lectureNotes:[
      {title:"Lecture Note 01",url:"https://drive.google.com/"},
      {title:"Lecture Note 02",url:"https://drive.google.com/"}
    ],
    assignments:[
      {title:"Assignment 01",url:"https://drive.google.com/"},
      {title:"Assignment 02",url:"https://drive.google.com/"}
    ]
  },
  "M02": {
    lectureNotes:[{title:"Lecture Note 01",url:"https://drive.google.com/"}],
    assignments:[{title:"Assignment 01",url:"https://drive.google.com/"}]
  },
  "M03": {lectureNotes:[],assignments:[]},
  "M04": {lectureNotes:[],assignments:[]},
  "M05": {lectureNotes:[],assignments:[]},
  "M06": {lectureNotes:[],assignments:[]},
  "M07": {lectureNotes:[],
          assignments:[{title:"Practical Exam",url:"https://drive.google.com/file/d/1zz882WZowVOjCen008gHNMxuRS1sOOmg/view?usp=sharing"}]},
  "M08": {lectureNotes:[],
          assignments:[{title:"Practical Exam",url:"https://drive.google.com/file/d/1JG4413reGJ8uLMWb0eQlcvg4zMEDXQnJ/view?usp=sharing"}]},
  "M09": {lectureNotes:[],assignments:[]},
  "M10": {lectureNotes:[],assignments:[]},
  "M11": {lectureNotes:[],assignments:[]},
  "M12": {lectureNotes:[],assignments:[]}
};

const PASSCODES = {
  M01:"UN101",M02:"UN102",M03:"UN103",M04:"UN104",M05:"UN105",M06:"UN106",
  M07:"UN107",M08:"UN108",M09:"UN109",M10:"UN110",M11:"UN111",M12:"UN112"
};

const state={user:null,page:"dashboard",department:null,category:null,batch:null,search:""};

function getUsers(){return JSON.parse(localStorage.getItem("unCampusUsers")||"[]");}
function saveUsers(v){localStorage.setItem("unCampusUsers",JSON.stringify(v));}
function getEnrollments(){return JSON.parse(localStorage.getItem("unCampusEnrollments")||"{}");}
function saveEnrollments(v){localStorage.setItem("unCampusEnrollments",JSON.stringify(v));}
function seed(){
  const existing=getUsers(), merged=[...existing];
  STUDENT_ACCOUNTS.forEach(a=>{if(!merged.some(u=>u.username.toLowerCase()===a.username.toLowerCase())) merged.push(a);});
  saveUsers(merged);
}
seed();

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
function toast(message,type=""){const el=$("#toast");el.textContent=message;el.className=`toast show ${type}`;setTimeout(()=>el.classList.remove("show"),2800);}
function setAuthTab(tab){
  $$(".auth-tab").forEach(b=>b.classList.toggle("active",b.dataset.auth===tab));
  $("#loginPanel").classList.toggle("active",tab==="login");
  $("#registerPanel").classList.toggle("active",tab==="register");
}
$$(".auth-tab").forEach(b=>b.addEventListener("click",()=>setAuthTab(b.dataset.auth)));

$("#loginForm").addEventListener("submit",e=>{
  e.preventDefault();
  const identifier=$("#loginIdentifier").value.trim().toLowerCase(), password=$("#loginPassword").value;
  const user=getUsers().find(u=>u.username.toLowerCase()===identifier && u.password===password);
  if(!user){toast("Invalid username or password.","error");return;}
  login(user);
});

$("#registerForm").addEventListener("submit",e=>{
  e.preventDefault();
  const name=$("#registerName").value.trim();
  const email=$("#registerEmail").value.trim();
  const username=$("#registerUsername").value.trim().toLowerCase();
  const password=$("#registerPassword").value;
  const confirm=$("#registerConfirm").value;
  if(password!==confirm){toast("Passwords do not match.","error");return;}
  const users=getUsers();
  if(users.some(u=>u.username.toLowerCase()===username)){toast("Username already exists.","error");return;}
  if(users.some(u=>u.email && u.email.toLowerCase()===email.toLowerCase())){toast("Email is already registered.","error");return;}
  const user={username,password,name,email};
  users.push(user);saveUsers(users);
  $("#registerForm").reset();
  $("#loginIdentifier").value=username;
  toast("Account created successfully. You can now log in.","success");
  setAuthTab("login");
});

function login(user){
  state.user=user;sessionStorage.setItem("unCampusSession",JSON.stringify(user));
  $("#authScreen").classList.add("hidden");$("#appScreen").classList.remove("hidden");
  $("#headerName").textContent=user.name;$("#userAvatar").textContent=user.name.charAt(0).toUpperCase();render();
}
function logout(){sessionStorage.removeItem("unCampusSession");state.user=null;state.page="dashboard";state.department=null;state.category=null;state.batch=null;$("#appScreen").classList.add("hidden");$("#authScreen").classList.remove("hidden");}
$("#logoutBtn").addEventListener("click",logout);

function currentBatch(){return state.department&&state.category&&state.batch?MODULE_DATA[state.department].categories[state.category][state.batch]:null;}
function currentModules(){return currentBatch()?.modules||[];}
function moduleKey(id){return `${state.department}|${state.category}|${state.batch}|${id}|${state.user.username}`;}
function isEnrolled(id){return !!getEnrollments()[moduleKey(id)];}
function getResources(id){return MODULE_RESOURCES[id]||{lectureNotes:[],assignments:[]};}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));}
function attr(s){return String(s).replace(/'/g,"&#039;");}

function render(){
  $$(".nav-item").forEach(n=>n.classList.toggle("active",n.dataset.page===state.page));
  if(state.page==="dashboard")renderDashboard();
  if(state.page==="departments")renderDepartments();
  if(state.page==="myLearning")renderLearning();
  if(state.page==="resources")renderResources();
  if(state.page==="announcements")renderAnnouncements();
}
function pageTitle(t,s,a=""){return `<div class="page-title"><div><h1>${t}</h1><p>${s}</p></div>${a}</div>`;}

function renderDashboard(){
  const enrolled=Object.keys(getEnrollments()).filter(k=>k.endsWith(`|${state.user.username}`));
  $("#pageContent").innerHTML=`${pageTitle(`Good afternoon, ${esc(state.user.name.split(" ")[0])} 👋`,"Welcome to your UN Campus learning dashboard.")}
  <section class="hero"><div><h1>Learn smarter with UN Campus</h1><p>Access your lecture notes, assignments and academic resources in one place.</p></div><div class="mini-stat"><strong>${enrolled.length}</strong><small>Enrolled modules</small></div></section>
  <section class="stat-grid"><div class="stat-card"><div class="stat-icon">▦</div><strong>${Object.keys(MODULE_DATA).length}</strong><small>Departments</small></div>
  <div class="stat-card"><div class="stat-icon">⌂</div><strong>${countBatches()}</strong><small>Available batches</small></div>
  <div class="stat-card"><div class="stat-icon">✓</div><strong>${enrolled.length}</strong><small>My modules</small></div>
  <div class="stat-card"><div class="stat-icon">◈</div><strong>${countResources()}</strong><small>Resources</small></div></section>
  <div class="quick-grid"><section><h2 class="section-title">Quick access</h2><div class="card">${Object.entries(MODULE_DATA).map(([k,d])=>`<div class="module-row"><div class="module-number">${d.short.slice(0,2)}</div><div><strong>${d.name}</strong><small>${Object.keys(d.categories).join(" · ")}</small></div><button class="outline-btn" onclick="openDepartment('${k}')">Explore</button></div>`).join("")}</div></section>
  <section><h2 class="section-title">Getting started</h2><div class="card"><div class="module-list">
  <div class="module-row"><div class="module-number">1</div><div><strong>Select Department</strong><small>Choose your department.</small></div></div>
  <div class="module-row"><div class="module-number">2</div><div><strong>Select Level</strong><small>Certificate, Diploma or HND.</small></div></div>
  <div class="module-row"><div class="module-number">3</div><div><strong>Select Batch</strong><small>Open your batch modules.</small></div></div>
  </div></div></section></div>`;
}
function countBatches(){return Object.values(MODULE_DATA).reduce((n,d)=>n+Object.values(d.categories).reduce((x,c)=>x+Object.keys(c).length,0),0);}
function countResources(){return Object.values(MODULE_RESOURCES).reduce((n,r)=>n+r.lectureNotes.length+r.assignments.length,0);}

function renderDepartments(){
  $("#pageContent").innerHTML=`${pageTitle("Departments","Select a department. The next screen shows Certificate, Diploma and HND batch categories.")}
  <div class="department-grid">${Object.entries(MODULE_DATA).map(([k,d])=>`<article class="dept-card" onclick="openDepartment('${k}')"><div class="dept-icon">${d.icon}</div><h3>${d.name}</h3><p>${d.description}</p><span class="batch-tag">${countDeptBatches(d)} batches</span></article>`).join("")}</div>`;
}
function countDeptBatches(d){return Object.values(d.categories).reduce((n,c)=>n+Object.keys(c).length,0);}
function openDepartment(dept){state.department=dept;state.category=null;state.batch=null;state.page="departments";renderCategories();}
function renderCategories(){
  const d=MODULE_DATA[state.department];
  $("#pageContent").innerHTML=`<div class="breadcrumb"><span onclick="state.page='departments';renderDepartments()">Departments</span> / ${d.name}</div>
  ${pageTitle(`${d.name} · Programme Levels`,"Select a level to see its batches.")}
  <div class="level-grid">${Object.entries(d.categories).map(([cat,batches])=>`<article class="level-card" onclick="openCategory('${attr(cat)}')"><div class="level-icon">${cat.startsWith("Certificate")?"📜":cat.startsWith("Diploma")?"🎓":"🏛️"}</div><h3>${cat}</h3><p>${Object.keys(batches).length} batches available</p><div class="batch-chips">${Object.keys(batches).map(b=>`<span>${esc(b)}</span>`).join("")}</div></article>`).join("")}</div>`;
}
function openCategory(cat){state.category=cat;state.batch=null;renderBatches();}
function renderBatches(){
  const d=MODULE_DATA[state.department], batches=d.categories[state.category];
  $("#pageContent").innerHTML=`<div class="breadcrumb"><span onclick="state.page='departments';renderDepartments()">Departments</span> / <span onclick="renderCategories()">${d.name}</span> / ${state.category}</div>
  ${pageTitle(`${state.category}`,"Select your batch to view its modules.")}
  <div class="batch-grid">${Object.entries(batches).map(([batch,b])=>`<article class="batch-card" onclick="openBatch('${attr(batch)}')"><h3>${esc(batch)}</h3><p>${b.modules.length} modules · Academic year ${b.year}</p><span class="batch-tag">View Modules →</span></article>`).join("")}</div>`;
}
function openBatch(batch){state.batch=batch;state.page="departments";renderModules();}
function renderModules(){
  const d=MODULE_DATA[state.department],b=currentBatch(),filtered=b.modules.filter(m=>m[0].toLowerCase().includes(state.search.toLowerCase()));
  $("#pageContent").innerHTML=`<div class="breadcrumb"><span onclick="state.page='departments';renderDepartments()">Departments</span> / <span onclick="renderCategories()">${d.short}</span> / <span onclick="renderBatches()">${state.category}</span> / ${esc(state.batch)}</div>
  ${pageTitle(esc(state.batch),`${d.name} · ${state.category} · ${b.modules.length} modules`)}
  <div class="module-grid">${filtered.map((m,i)=>moduleCard(m,i)).join("")}</div>${!filtered.length?`<div class="card" style="text-align:center;color:var(--muted)">No modules match your search.</div>`:""}`;
}
function moduleCard(m){
  const [name,id]=m,enrolled=isEnrolled(id),r=getResources(id);
  return `<article class="module-card ${enrolled?"":"locked"}"><div class="top"><span class="batch-tag">${id}</span>${enrolled?`<span class="status-pill">ENROLLED</span>`:`<span class="lock-note">🔒 Locked</span>`}</div>
  <h3 style="margin-top:12px">${esc(name)}</h3><p>${enrolled?`${r.lectureNotes.length} lecture note(s) · ${r.assignments.length} assignment(s)`:"Enrollment requires the lecturer's passcode."}</p>
  <div class="module-actions">${enrolled?`<button class="resource-btn" onclick="openResources('${id}','lectureNotes','${attr(name)}')">📘 Lecture Notes (${r.lectureNotes.length})</button><button class="resource-btn" onclick="openResources('${id}','assignments','${attr(name)}')">📝 Assignments (${r.assignments.length})</button>`:`<button class="enroll-btn" onclick="openEnroll('${id}','${attr(name)}')">🔑 Enroll</button>`}</div></article>`;
}
function openResources(id,type,name){
  const items=getResources(id)[type]||[], label=type==="lectureNotes"?"Lecture Notes":"Assignments";
  $("#modalContent").innerHTML=`<h2>${label}</h2><p>${esc(name)} · ${id}<br>${items.length?`Select a resource below.`:"No resources have been added yet."}</p>
  <div class="resource-modal-list">${items.map((x,i)=>`<a class="resource-link" href="${x.url}" target="_blank" rel="noopener"><span>${type==="lectureNotes"?"📘":"📝"}</span><div><strong>${esc(x.title||`${label} ${i+1}`)}</strong><small>Open resource ↗</small></div></a>`).join("")}</div>`;
  openModal();
}
function openEnroll(id,name){
  $("#modalContent").innerHTML=`<h2>Enroll in module</h2><p><strong>${esc(id)} · ${esc(name)}</strong><br>Enter the lecturer passcode to unlock resources.</p><form onsubmit="confirmEnroll(event,'${id}')"><label>Lecturer Passcode<input class="passcode-field" id="passcodeInput" type="password" placeholder="• • • • • •" required></label><button class="primary-btn full">Verify & Enroll</button></form>`;openModal();
}
function confirmEnroll(e,id){e.preventDefault();if($("#passcodeInput").value.trim()!==PASSCODES[id]){toast("Incorrect lecturer passcode.","error");return;}const data=getEnrollments();data[moduleKey(id)]=new Date().toISOString();saveEnrollments(data);closeModal();toast("Module enrolled successfully.","success");renderModules();}
function renderLearning(){
  const enrolled=Object.entries(getEnrollments()).filter(([k])=>k.endsWith(`|${state.user.username}`));
  $("#pageContent").innerHTML=`${pageTitle("My Learning","Your enrolled modules and learning resources.")}${enrolled.length?`<div class="learning-list">${enrolled.map(([key])=>{const p=key.split("|"),dept=p[0],cat=p[1],batch=p[2],id=p[3],m=MODULE_DATA[dept]?.categories[cat]?.[batch]?.modules.find(x=>x[1]===id);if(!m)return "";return `<div class="learning-item"><div class="module-number">${id}</div><div class="learning-info"><strong>${esc(m[0])}</strong><small>${dept} · ${cat} · ${batch}</small></div><button class="outline-btn" onclick="openModule('${dept}','${attr(cat)}','${attr(batch)}','${id}')">Open</button></div>`}).join("")}</div>`:`<div class="card" style="text-align:center;padding:45px"><h3>No enrolled modules yet</h3><p style="color:var(--muted);font-size:12px;margin:8px 0 18px">Choose a department, level and batch.</p><button class="primary-btn" onclick="state.page='departments';renderDepartments()">Browse Departments</button></div>`}`;
}
function openModule(dept,cat,batch,id){const m=MODULE_DATA[dept].categories[cat][batch].modules.find(x=>x[1]===id);state.department=dept;state.category=cat;state.batch=batch;openResources(id,"lectureNotes",m[0]);}
function renderResources(){
  $("#pageContent").innerHTML=`${pageTitle("Learning Resources","All module resources are maintained per module.")}
  <div class="resource-grid"><div class="resource-card"><div class="r-icon">📘</div><div><strong>Multiple Lecture Notes</strong><p>Add any number of lecture notes to each module using MODULE_RESOURCES.</p></div></div>
  <div class="resource-card"><div class="r-icon">📝</div><div><strong>Multiple Assignments</strong><p>Add any number of assignments to each module using MODULE_RESOURCES.</p></div></div>
  <div class="resource-card"><div class="r-icon">🎥</div><div><strong>Video Lectures</strong><p>You can extend each resource list with YouTube or Drive links.</p></div></div>
  <div class="resource-card"><div class="r-icon">📅</div><div><strong>Academic Calendar</strong><p>Keep important academic dates visible here.</p></div></div></div>`;
}
function renderAnnouncements(){
  $("#pageContent").innerHTML=`${pageTitle("Announcements","Important updates from UN Campus.")}
  <div class="announcement"><h3>Welcome to the updated UN Campus LMS</h3><p>Each student now signs in with an individual username and password. Departments are organized into Certificate, Diploma and HND levels.</p><time>Academic Office</time></div>
  <div class="announcement"><h3>Module resources</h3><p>Each module can contain multiple lecture notes and multiple assignments.</p><time>Academic Office</time></div>`;
}
function openModal(){$("#modal").classList.remove("hidden");}
function closeModal(){$("#modal").classList.add("hidden");}
$$("[data-close-modal]").forEach(el=>el.addEventListener("click",closeModal));
$$(".nav-item").forEach(btn=>btn.addEventListener("click",()=>{state.page=btn.dataset.page;state.department=null;state.category=null;state.batch=null;state.search="";$("#globalSearch").value="";render();closeSidebar();}));
$("#globalSearch").addEventListener("input",e=>{state.search=e.target.value;if(state.department&&state.batch)renderModules();});
$("#menuBtn").addEventListener("click",()=>{$("#sidebar").classList.add("open");$("#mobileOverlay").classList.add("show");});
$("#mobileOverlay").addEventListener("click",closeSidebar);
function closeSidebar(){$("#sidebar").classList.remove("open");$("#mobileOverlay").classList.remove("show");}
$("#notificationBtn").addEventListener("click",()=>toast("You have 2 LMS announcements.","success"));

const savedTheme=localStorage.getItem("unCampusTheme")||"light";
function applyTheme(theme){document.body.classList.toggle("dark-theme",theme==="dark");const t=$("#themeToggle");if(t){t.classList.toggle("dark",theme==="dark");t.title=theme==="dark"?"Switch to light mode":"Switch to dark mode";}}
applyTheme(savedTheme);
$("#themeToggle")?.addEventListener("click",()=>{const next=document.body.classList.contains("dark-theme")?"light":"dark";localStorage.setItem("unCampusTheme",next);applyTheme(next);toast(next==="dark"?"Dark mode enabled.":"Light mode enabled.","success");});

const session=sessionStorage.getItem("unCampusSession");if(session){try{login(JSON.parse(session));}catch(e){sessionStorage.removeItem("unCampusSession");}}
