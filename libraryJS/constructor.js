let myLib = [{"author": "Bob",
"title": "Bob is great!",
"pages": "133",
"read": "yes",
"id": 1
}];
let bookList = document.getElementById("bookList");
let bookForm = document.getElementById("bookForm");
let revealBtn = document.getElementById("addBookBtn");
let bookSubmissionBtn = document.getElementById("submitBk");
let deletedId;
let newSubmission = {
  "author": "",
  "title": "",
  "pages": "",
  "read": "",
  "id": null
};

let writtenInputs = document.getElementsByClassName("write");
let rdioBtns = document.getElementsByClassName("choose");

function addBookToLib(book){
  myLib.push(book);
}

function render(){
  let newRow = createEl("tr");
  let rmvBtn = createEditBtn("Remove");
  newRow.appendChild(rmvBtn);
  for(var i = 0; i < myLib.length; i++){
    let bk = myLib[i];

    for (var key in bk){
        if (bk.hasOwnProperty(key)){
      let newTd = createEl("td");

      if (bk[key]){
        newTd.innerText = bk[key];
      }
      newRow.appendChild(newTd);
    }
    }
    bookList.appendChild(newRow);
  }
}

function addId(){
  let ltsEntryId = myLib[myLib.length - 1]["id"];
  ltsEntryId+=1;
  return ltsEntryId;
}

function renderLatest(){
  var newEntry = myLib[myLib.length - 1];
  let newRow = createEl("tr");
  let rmvBtn = createEditBtn("Remove");
  newRow.appendChild(rmvBtn);
  let newTd;
  for (var key in newEntry){
    if (newEntry.hasOwnProperty(key)){
      newTd = createEl("td");
      newTd.innerText = newEntry[key];
    }
    newRow.appendChild(newTd);
  }
  bookList.appendChild(newRow);
}

function createEditBtn(type){
  let editTd = createEl("td");
  editTd.innerText = `${type}`;
  return editTd;
}

function createEl(type){
  return document.createElement(`${type}`);
}

function Book(title, author, pages, read){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function(){
    return `${this.title} is by ${this.author} and is ${this.pages} pages long.`;
  };
}

function revealForm(){
  bookForm.setAttribute("style", "display: block;");
}

function handleInput(e){
  newSubmission[e.target.name] = e.target.value;
}

for(var i = 0; i < writtenInputs.length; i++){
  writtenInputs[i].addEventListener("keyup", handleInput);
}

for(var i = 0; i < rdioBtns.length; i++){
  rdioBtns[i].addEventListener("click", readOrNot);
}

function readOrNot(e){
  newSubmission[e.target.name] = e.target.value;
}


function getSubmission(e){
 e.preventDefault();
 newSubmission["id"] = addId();
 myLib.push(newSubmission);
 renderLatest();
 clearFields();
}

function clearFields(){
  var allEntries = writtenInputs;
  for(var j = 0; j < allEntries.length; j++){
    allEntries[j].value= "";
  }
  resetBtns();
}

function resetBtns(){
  for(var d = 0; d < rdioBtns.length; d++){
    rdioBtns[d].checked = false;
  }
}

function deleteBook(){
 debugger
}

revealBtn.addEventListener("click", revealForm);
bookSubmissionBtn.addEventListener("click", getSubmission);
document.addEventListener("DOMContentLoaded", render());
