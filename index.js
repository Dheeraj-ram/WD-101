 let userform = document.getElementById("user-form");
 
 const Retrieved_entries = ()=> {
    let entries = localStorage.getItem("user-entries");
    if(entries){
       entries=JSON.parse(entries);
    }
    else{
       entries=[]
    }
    return entries;
}
 
let userentries=Retrieved_entries();
 
const display_Entries = ()=>
 {
    const entries=Retrieved_entries();
    const tableEntries =entries.map((entry)=>{
       const nameInput= `<td class='border px-4 py-2'>${entry.name}</td>`;
         const emailInput= `<td class='border px-4 py-2'>${entry.email}</td>`;
         const passwordInput= `<td class='border px-4 py-2'>${entry.password}</td>`;
         const dobInput= `<td class='border px-4 py-2'>${entry.dob}</td>`;
         const acceptTermsInput= `<td class='border px-4 py-2'>${entry.acceptedTermsAndConditions}</td>`;
         const row= `<tr>${nameInput} ${emailInput} ${passwordInput} ${dobInput} ${acceptTermsInput}</tr>`;
         return row;
    }).join("\n");
 
    const table= `<table class="table-auto w-full"><tr>
     <th class="px-4 py-2">Name</th>
     <th class="px-4 py-2">Email</th>
     <th class="px-4 py-2">Password</th>
     <th class="px-4 py-2">Dob</th>
     <th class="px-4 py-2">Acceptedterms?</th>
     </tr>${tableEntries} </table>`;
     let details=document.getElementById("user-entries");
     details.innerHTML = table;
 
    
}
 const saveUserform = (event) =>{
     event.preventDefault();
     const name = document.getElementById('name').value;
     const email = document.getElementById('email').value;
     const password = document.getElementById('password').value;
     const dob = document.getElementById('dob').value;
     const acceptedTermsAndConditions = document.getElementById('acceptTermsAndConditions').checked;
 
     const entry={
        name,
        email,
        password,
        dob,
        acceptedTermsAndConditions
     };
     userentries.push(entry);
 
     localStorage.setItem("user-entries",JSON.stringify(userentries));
     display_Entries();
 }

 function isAgeValid() {
    const dobElement = document.getElementById("dob");
    const dobValue = dobElement.value;
    const dobDate = new Date(dobValue);
    const current = new Date();
    const month = dobDate.getMonth();
    const day = dobDate.getDate();
    let age = current.getFullYear() - dobDate.getFullYear();
    let checkmonth = current.getMonth() < month
    let checkday = current.getMonth() === month && current.getDate() < day;
    if (checkmonth || checkday) {
      age--;
    }
    const validAge = age > 18 && age < 55;
    if (!validAge) {
      dobElement.setCustomValidity("Age must be between 18 and 55 years to register");
      dobElement.reportValidity();
    } else {
      dobElement.setCustomValidity("");
    }
  }
 
 userform.addEventListener("submit",saveUserform);
 display_Entries();
 