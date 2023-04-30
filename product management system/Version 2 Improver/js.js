const title = document.querySelector('#title')
const price = document.querySelector('#price')
const taxes = document.querySelector('#taxes')
const ads = document.querySelector('#ads')
const discount = document.querySelector('#discount')
const total = document.querySelector('#total')
const count = document.querySelector('#count')
const category = document.querySelector('#category')
const submit = document.querySelector('#submit')

let mood = 'create';
let tmp;
':::'// start get total
function getTotal() {
    if (price.value !== '' && taxes.value !== '' && ads.value !== '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.textContent = result
        total.style.background = '#040'
    } else {
        total.textContent = ''
        total.style.background = '#a00d02'
    }
}
':::'// end get total



':::'// start create product
let dataProduct;
if (localStorage.getItem('product') !== null) {
    dataProduct = JSON.parse(localStorage.getItem('product'))
} else {
    dataProduct = []
}
submit.onclick = () => {
    let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.textContent,
        count: count.value,
        category: category.value.toLowerCase()
    }

    ':::'//start count and create/update
    if (title.value !== '' && price.value != '' && category.value !== '') {
        if (mood === 'create') {
            if (newProduct.count > 1) {
                for (let i = 0; i < newProduct.count; i++) {
                    if (i >= 500) {
                        window.alert('The minimum number of products to be created is 500')
                        break
                    }
                    dataProduct.push(newProduct)
                }
            } else {
                dataProduct.push(newProduct)
            }
        } else {
            dataProduct[tmp] = newProduct
            mood = 'create'
            count.style.visibility = 'visible'
            submit.textContent = 'Create'
        }
        clearData()
    }
    ':::'//end count and create/update

    ':::'// start save data in localestorage
    localStorage.setItem('product', JSON.stringify(dataProduct))
    ':::'// end save data in localestorage

    showData()
}
':::'// end create product







':::'// start clear all inputs
function clearData() {
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    total.textContent = ''
    count.value = ''
    category.value = ''
}
':::'// end clear all inputs
// localStorage.clear()

':::'//start read
function showData() {
    getTotal()
    let table = ''
    for (let i = 0; i < dataProduct.length; i++) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button id="update" onclick="updateData(${i})">update</button></td>
                <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
            </tr>
        `
    }
    document.querySelector('#tbody').innerHTML = table
    let btnDelete = document.querySelector('#deleteAll')
    if (dataProduct.length > 0) {
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">delete All(${dataProduct.length})</button>
        `
    } else {
        btnDelete.innerHTML = ''
    }
}
showData()
':::'//end read

':::'//start delete
function deleteData(i) {
    dataProduct.splice(i, 1)
    localStorage.product = JSON.stringify(dataProduct)
    showData()
}

function deleteAll() {
    localStorage.clear()
    dataProduct.splice(0)
    showData()
}
':::'//end delete



':::'//start update
function updateData(i) {
    title.value = dataProduct[i].title
    price.value = dataProduct[i].price
    taxes.value = dataProduct[i].taxes
    ads.value = dataProduct[i].ads
    discount.value = dataProduct[i].discount
    getTotal()
    count.style.visibility = 'hidden'
    category.value = dataProduct[i].category
    submit.textContent = 'Update'
    mood = 'update'
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}
':::'//end update

':::'//start search
let searchMood = 'title'
function getSearchMood(id) {
    let search = document.querySelector('#search')
    if (id === 'searchTitle') {
        searchMood = 'title'
    } else {
        searchMood = 'category'
    }
    search.placeholder = `Search By ${searchMood}`
    search.focus()
    search.value = ''
    showData()
}

function searchData(value) {
    let table = ''
    let valueSearch = ''
    for (let i = 0; i < dataProduct.length; i++) {
        if (searchMood == 'title') {
            valueSearch = 'title'
        } else {
            valueSearch = 'category'
        }
        if (dataProduct[i][valueSearch].includes(value.toLowerCase())) {
            table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button id="update" onclick="updateData(${i})">update</button></td>
                        <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
                    </tr>
                `
        }
    }
    document.querySelector('#tbody').innerHTML = table
}
':::'//end search


':::'//start clean data
':::'//end clean data