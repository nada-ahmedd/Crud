var productName = document.getElementById('productNameInp');
var productPrice = document.getElementById('productPriceInp');
var productCategory = document.getElementById('productCategoryInp');
var productDesc = document.getElementById('productDeskInp'); 
var productContainer;
if (localStorage.getItem('products') != null) {
    productContainer = JSON.parse(localStorage.getItem('products'));
    displayData(productContainer);
} else {
    productContainer = [];
}

function addProduct() {
    if (validateAllFields()) {
        var product = {
            Name: productName.value,
            Price: productPrice.value,
            Category: productCategory.value,
            Desc: productDesc.value
        };
        productContainer.push(product);
        localStorage.setItem('products', JSON.stringify(productContainer));
        displayData(productContainer);
        clearForm();
    } else {
        alert('Please enter valid data for all fields.');
    }
}

function clearForm() {
    productName.value = '';
    productPrice.value = '';
    productCategory.value = '';
    productDesc.value = '';
}

function displayData(list) {
    var temp = '';
    for (let i = 0; i < list.length; i++) {
        temp += `
         <tr>
        <td>${i + 1}</td>
        <td>${list[i].Name}</td>
        <td>${list[i].Price}</td>
        <td>${list[i].Category}</td>
        <td>${list[i].Desc}</td>
        <td><button onclick="updateProduct(${i})" class="btn btn-warning btn-sm">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger btn-sm">Delete</button></td>
    </tr>`;
    }
    document.getElementById('myTable').innerHTML = temp;
}

function deleteProduct(index) {
    productContainer.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(productContainer));
    displayData(productContainer);
}

function updateProduct(index) {
    productName.value = productContainer[index].Name;
    productPrice.value = productContainer[index].Price;
    productCategory.value = productContainer[index].Category;
    productDesc.value = productContainer[index].Desc;

    document.getElementById('update').classList.remove('d-none');
    document.getElementById('add').classList.add('d-none');

    document.getElementById('update').onclick = function() {
        if (validateAllFields()) {
            productContainer[index] = {
                Name: productName.value,
                Price: productPrice.value,
                Category: productCategory.value,
                Desc: productDesc.value
            };

            localStorage.setItem('products', JSON.stringify(productContainer));
            displayData(productContainer);
            clearForm();

            document.getElementById('update').classList.add('d-none');
            document.getElementById('add').classList.remove('d-none');
        } else {
            alert('Please enter valid data for all fields.'); 
        }
    };
}


function search(term) {
    var searchContainer = [];
    for (var i = 0; i < productContainer.length; i++) {
        if (productContainer[i].Name.toLowerCase().includes(term.toLowerCase()) ||
            productContainer[i].Category.toLowerCase().includes(term.toLowerCase()) ||
            productContainer[i].Price.includes(term) ||
            productContainer[i].Desc.toLowerCase().includes(term.toLowerCase())) {
            searchContainer.push(productContainer[i]);
        }
    }
    displayData(searchContainer);
}

function validateProductName() {
    var regx = /^[A-Z][a-z]{1,9}$/;
    
    if (productName.value === '') {
        productName.classList.remove('is-valid', 'is-invalid'); 
        return false;
    }

    if (regx.test(productName.value)) {
        productName.classList.add('is-valid');
        productName.classList.remove('is-invalid');
        return true;
    } else {
        productName.classList.add('is-invalid');
        productName.classList.remove('is-valid');
        return false;
    }
}

function validateProductPrice() {
    var regx = /^[0-9]+$/; 

    if (productPrice.value === '') {
        productPrice.classList.remove('is-valid', 'is-invalid'); 
        return false;
    }

    if (regx.test(productPrice.value) && parseInt(productPrice.value) >= 500 && parseInt(productPrice.value) <= 99999) {
        productPrice.classList.add('is-valid');
        productPrice.classList.remove('is-invalid');
        return true;
    } else {
        productPrice.classList.add('is-invalid');
        productPrice.classList.remove('is-valid');
        return false;
    }
}


function validateProductCategory() {
    if (productCategory.value === '') {
        productCategory.classList.remove('is-valid', 'is-invalid'); 
        return false;
    }

    var regx = /^[A-Za-z]{2,20}$/;
    if (regx.test(productCategory.value)) {
        productCategory.classList.add('is-valid');
        productCategory.classList.remove('is-invalid');
        return true;
    } else {
        productCategory.classList.add('is-invalid');
        productCategory.classList.remove('is-valid');
        return false;
    }
}

function validateProductDesc() {
    if (productDesc.value === '') {
        productDesc.classList.remove('is-valid', 'is-invalid'); 
        return false;
    }

    if (productDesc.value.length > 2) {
        productDesc.classList.add('is-valid');
        productDesc.classList.remove('is-invalid');
        return true;
    } else {
        productDesc.classList.add('is-invalid');
        productDesc.classList.remove('is-valid');
        return false;
    }
}


function validateAllFields() {
    return validateProductName() && validateProductPrice() && validateProductCategory() && validateProductDesc();
}
