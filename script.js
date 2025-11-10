const emailGate = document.getElementById('emailGate');
const dashboard = document.getElementById('dashboard');
const errorMsg = document.getElementById('errorMsg');

function verifyEmail(){
  const email = document.getElementById('emailInput').value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(regex.test(email)){

    alert("Verification email sent to " + email + ". Please confirm to continue.");
    emailGate.classList.add('hidden');
    dashboard.classList.remove('hidden');
  } else {
    errorMsg.textContent = "Please enter a valid email address.";
  }
}


const form = document.getElementById('storageForm');
const input = document.getElementById('itemInput');
const list = document.getElementById('itemList');

document.addEventListener('DOMContentLoaded', loadItems);

form.addEventListener('submit', e => {
  e.preventDefault();
  const item = input.value.trim();
  if(item){
    addItem(item);
    saveItem(item);
    input.value = '';
  }
});

function addItem(item){
  const li = document.createElement('li');
  li.textContent = item;

  const delBtn = document.createElement('button');
  delBtn.textContent = 'X';
  delBtn.className = 'delete';
  delBtn.onclick = () => {
    li.remove();
    removeItem(item);
  };

  li.appendChild(delBtn);
  list.appendChild(li);
}

function saveItem(item){
  let items = JSON.parse(localStorage.getItem('storageItems')) || [];
  items.push(item);
  localStorage.setItem('storageItems', JSON.stringify(items));
}

function loadItems(){
  let items = JSON.parse(localStorage.getItem('storageItems')) || [];
  items.forEach(addItem);
}

function removeItem(item){
  let items = JSON.parse(localStorage.getItem('storageItems')) || [];
  items = items.filter(i => i !== item);
  localStorage.setItem('storageItems', JSON.stringify(items));
}