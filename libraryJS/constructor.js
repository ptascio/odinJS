//if last id is deleted, it must be stored so that next id picks up where
//left off. if lastId < veryLastId, don't change it (e.g., delete 5 then 4, it status
//at 5) so that means we delete the last one...
//


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
let latestDltdId;
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
  let newRow;
  let rmvBtn;
  for(var i = 0; i < myLib.length; i++){
  newRow = createEl("tr");
  rmvBtn = createEditBtn("Remove");
    newRow.appendChild(rmvBtn);
    let bk = myLib[i];
    newRow.setAttribute("id", bk["id"]);
    for (var key in bk){
        if (bk.hasOwnProperty(key)){
      let newTd = createEl("td");
      if (bk[key] !== "id"){
        newTd.innerText = bk[key];
      }
      newRow.appendChild(newTd);
    }
    }
    bookList.appendChild(newRow);
  }
}

function addId(){

  let ltsEntryId;
  if (latestDltdId !== undefined){
    ltsEntryId = parseInt(latestDltdId);
  }else{  ltsEntryId = myLib[myLib.length - 1]["id"];}
  let newId = ltsEntryId+1;
  latestDltdId = undefined;
  return newId;
}

function renderLatest(){
  var newEntry = myLib[myLib.length - 1];
  let newRow = createEl("tr");
  let rmvBtn = createEditBtn("Remove");
  newRow.appendChild(rmvBtn);
  let newTd;
  for (var key in newEntry){
    newRow.setAttribute("id", newEntry["id"]);
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
  editTd.setAttribute("style", "cursor: pointer;");
  let evntListnr;
  if (type === "Remove"){
    editTd.addEventListener("click", getIdOfBookToDelete);
  }
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
 resetSubmission();
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

function resetSubmission(){
  newSubmission = {
    "author": "",
    "title": "",
    "pages": "",
    "read": "",
    "id": null
  };
}

function resetBtns(){
  for(var d = 0; d < rdioBtns.length; d++){
    rdioBtns[d].checked = false;
  }
}

function getIdOfBookToDelete(){
 deletedId = this.parentNode.id;
 if (latestDltdId === undefined && deletedId >= myLib[myLib.length-1]["id"]){
   latestDltdId = deletedId;
 }
 deleteBookFromLib(deletedId);
}

function deleteBookFromLib(id){
  let bkIdx;
  for(var x = 0; x < myLib.length; x++){
    if(myLib[x]["id"] === parseInt(id)){
      removeBook(x);
    }
  }
}

function removeBook(idx){
  let firstHalf = myLib.slice(0, idx);
  let secondHalf = myLib.slice(idx + 1);
  myLib = firstHalf.concat(secondHalf);
  deleteBooksFromDOM();
  render();
}

function deleteBooksFromDOM(){
  while(bookList.firstChild){
    bookList.removeChild(bookList.firstChild);
  }
}



revealBtn.addEventListener("click", revealForm);
bookSubmissionBtn.addEventListener("click", getSubmission);
document.addEventListener("DOMContentLoaded", render());
