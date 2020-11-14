const addElement = (type) => {
    return document.createElement(type)
}
const specialForm = document.getElementById('specialForm');
function clearForm() {
   specialForm.innerHTML = ''
}

const createButton = addElement('button');
createButton.type = 'submit';
createButton.innerHTML = 'Add Post';
createButton.className ='addButton'

function addBookForm () {
   const bookOptionsContainer = addElement('div');
   const weightInput = addElement('input');
   weightInput.type = 'number';
   weightInput.name = 'weight';
   weightInput.min = 0;
   weightInput.className ='field'
   weightInput.placeholder = 'weight'

   bookOptionsContainer.append(weightInput);
   specialForm.append(bookOptionsContainer);
   specialForm.append(createButton);
}
function addDVDForm () {
    const bookOptionsContainer = addElement('div');
    const sizeInput = addElement('input');
    sizeInput.type = 'number';
    sizeInput.name = 'size';
    sizeInput.min = 0;
    sizeInput.className ='field';
    sizeInput.placeholder = 'size'

    bookOptionsContainer.append(sizeInput);
    specialForm.append(bookOptionsContainer);
    specialForm.append(createButton);
}
 function addFurnitureForm () {
    const bookOptionsContainer = addElement('div');

    const widthInput = addElement('input');
    widthInput.type = 'number';
    widthInput.name = 'width';
    widthInput.min = 0;
    widthInput.className ='field';
    widthInput.placeholder = 'width';

    const heightInput = addElement('input');
    heightInput.type = 'number';
    heightInput.name = 'height';
    heightInput.min = 0;
    heightInput.className ='field';
    heightInput.placeholder= 'height'

    const lenghtInput = addElement('input');
    lenghtInput.type = 'number';
    lenghtInput.name = 'lenght';
    lenghtInput.min = 0;
    lenghtInput.className = 'field';
    lenghtInput.placeholder = 'length'
 
    bookOptionsContainer.append(widthInput);
    bookOptionsContainer.append(heightInput);
    bookOptionsContainer.append(lenghtInput);
    specialForm.append(bookOptionsContainer);
    specialForm.append(createButton);
 }
document.getElementById('typeSelector').addEventListener('change', (e)=>{
    clearForm()
    switch (e.target.value) {
        case 'book' : 
          addBookForm();
          break;
        case 'DVD':
          addDVDForm();
          break;
        case 'furniture':
          addFurnitureForm();
          break;
        case '':
          clearForm();
    }
});