const title = document.querySelector('#title')
const price = document.querySelector('#price')
const taxes = document.querySelector('#taxes')
const ads = document.querySelector('#ads')
const discount = document.querySelector('#discount')
const total = document.querySelector('.total span')
const count = document.querySelector('#count')
const category = document.querySelector('#category')
const create = document.querySelector('.create')
const search = document.querySelector('#search')
const searchTitle = document.querySelector('#searchTitle')
const searchCategory = document.querySelector('#searchCategory')
const deleteAll = document.querySelector('.delete-All')
const elTbody = document.querySelector('.productsTabel .prodects')

const allProductInput = [title, price, taxes, ads, discount, total, category]

// start Retrieve data from localstorage if it exists
window.onload = () => {
    if (localStorage.length >= 1) {
        // start Get elements from localstorage and put them on the page
        let localProdect = []
        for (let i = 0; i < localStorage.length; i++) {
            localProdect.push(localStorage.key(i))
        }
        localProdect.sort((a, b) => {
            const numA = parseInt(a.slice(8))
            const numb = parseInt(b.slice(8))
            return numA - numb
        })
        const fragment = document.createDocumentFragment();
        localProdect.forEach((e) => {
            const row = document.createElement('tr');
            row.innerHTML = localStorage.getItem(e);
            fragment.appendChild(row);
        });
        elTbody.appendChild(fragment);
        // end Get elements from localstorage and put them on the page

        // start Bring all the update and delete buttons and put them in their own matrix
        deleteAll.textContent = `Delete All (${elTbody.querySelectorAll('tr').length})`
        deleteAll.style.display = 'block'
        elTbody.querySelectorAll('.update').forEach((e) => {
            allBtnUpdate.push(e)
        })
        elTbody.querySelectorAll('.delete').forEach((e) => {
            allBtnDelete.push(e)
        })
        // end Bring all the update and delete buttons and put them in their own matrix
    }
}
// end Retrieve data from localstorage if it exists

// start get prodect title
let titleValue = ''
title.addEventListener('input', () => {
    titleValue = title.value
})
// end get prodect title

// start get prices

':::::::'// test
// const prices = document.querySelectorAll('#price, #taxes, #ads, #discount');
// const total = document.querySelector('#total');

// prices.forEach(price => {
//     price.addEventListener('input', () => {
//         const [priceValue, taxesValue, adsValue, discountValue] = prices.map(price => price.value);
//         if (priceValue !== '' && taxesValue !== '' && adsValue !== '') {
//             total.textContent = calculateAmount(priceValue, taxesValue, adsValue, discountValue);
//             total.parentElement.classList.add('active');
//         } else {
//             total.textContent = calculateAmount(priceValue, taxesValue, adsValue, discountValue);
//             total.parentElement.classList.remove('active');
//         }
//     });
// });

// function calculateAmount(priceValue, taxesValue, adsValue, discountValue) {
//     let result = 0;
//     if (priceValue !== '' && taxesValue !== '' && adsValue !== '') {
//         result = ((parseInt(taxesValue) + parseInt(adsValue)) / 100) * parseInt(priceValue);
//         result = parseInt(priceValue) - result;
//         if (discountValue !== '') {
//             result = result - ((parseInt(discountValue) / 100) * result);
//         }
//         return Math.round(result);
//     } else {
//         return 'no price';
//     }
// }
':::::::'// test
let prices = [price, taxes, ads, discount]
let priceValue = ''
let taxesValue = ''
let adsValue = ''
let discountValue = ''
prices.forEach((e) => {
    e.addEventListener('input', () => {
        e.id === 'price' ? priceValue = e.value :
            e.id === 'taxes' ? taxesValue = e.value :
                e.id === 'ads' ? adsValue = e.value :
                    discountValue = e.value

        if (price.value !== '' && taxes.value !== '' && ads.value !== '') {
            total.textContent = calculAteamount()
            total.parentElement.classList.add('active')
        } else {
            total.textContent = calculAteamount()
            total.parentElement.classList.remove('active')
        }
    })
})
function calculAteamount() {
    let result = 0
    if (priceValue !== '' && taxesValue !== '' && adsValue !== '') {
        result = ((parseInt(taxesValue) + parseInt(adsValue)) / 100) * parseInt(priceValue)
        result = parseInt(priceValue) - result
        if (discountValue !== '') {
            result = result - ((parseInt(discountValue) / 100) * result)
            return Math.round(result)
        } else {
            return Math.round(result)
        }
    } else {
        return 'no price'
    }
}
// end get prices

// start get count
let countValue = ''
count.addEventListener('input', () => {
    countValue = count.value
})
// end get count

// start get category
let categoryValue = ''
category.addEventListener('input', () => {
    categoryValue = category.value
})
// end get category

// start create Prodects
create.addEventListener('click', () => {
    if (create.textContent == 'Create') {
        createProdests()
        if (elTbody.querySelectorAll('tr').length >= 1) {
            deleteAll.textContent = `Delete All (${elTbody.querySelectorAll('tr').length})`
            deleteAll.style.display = 'block'
            elTbody.querySelectorAll('.update').forEach((e) => {
                allBtnUpdate.push(e)
            })
            elTbody.querySelectorAll('.delete').forEach((e) => {
                allBtnDelete.push(e)
            })
        }
    } else {
        for (let i = 0; i < elTbody.querySelector('.current-item').querySelectorAll('td:nth-child(n+2):nth-child(-n+8)').length; i++) {
            if (allProductInput[i] !== total) {
                elTbody.querySelector('.current-item').querySelectorAll('td:nth-child(n+2):nth-child(-n+8)')[i].textContent = allProductInput[i].value
            } else {
                elTbody.querySelector('.current-item').querySelectorAll('td:nth-child(n+2):nth-child(-n+8)')[i].textContent = allProductInput[i].textContent
            }
        }
        localStorage.removeItem(localStorage.getItem(`prodects${elTbody.querySelector('.current-item td:first-child').textContent}`))
        let prodectID = elTbody.querySelector('.current-item td:first-child').textContent - 1
        elTbody.querySelector('.current-item').classList.remove('current-item')
        localStorage.setItem(`prodects${prodectID + 1}`, elTbody.querySelectorAll('tr')[prodectID].outerHTML)
        count.style.visibility = 'visible'
        create.textContent = 'Create'
        deleteAll.style.display = 'block'
    }
    total.textContent = ''
    total.parentElement.classList.remove('active')
    allProductInput.forEach((e) => {
        e.value = ''
        count.value = ''
    })
})


function createProdests() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < parseInt(countValue); i++) {
        const row = document.createElement('tr');
        row.innerHTML +=
            `
                <tr>
                    <td>${i + 1}</td>
                    <td>${titleValue}</td>
                    <td>${priceValue}</td>
                    <td>${taxesValue}</td>
                    <td>${adsValue}</td>
                    <td>${discountValue}</td>
                    <td>${calculAteamount()}</td>
                    <td>${categoryValue}</td>
                    <td class="update"><button>update</button></td>
                    <td class="delete"><button>delete</button></td>
                </tr>
            `;
        fragment.appendChild(row);
    }
    elTbody.appendChild(fragment);
    let prodectId = elTbody.querySelectorAll('tr td:first-child')
    for (let i = 0; i < prodectId.length; i++) {
        prodectId[i].textContent = i + 1
        localStorage.setItem(`prodects${prodectId[i].textContent}`, elTbody.querySelectorAll('tr')[i].outerHTML)
    }
}
// end create Prodects

// end access button delete all
deleteAll.addEventListener('click', () => {
    let counter = 0
    elTbody.querySelectorAll('tr').forEach((e) => {
        e.remove()
        counter++
    })
    localStorage.clear()
    deleteAll.style.display = 'none'
})
// end access button delete all






// start Search prodects

function searchProducts(criteria) {
    elTbody.querySelectorAll(`tr td:nth-child(${criteria})`).forEach((e) => {
        for (let i = 0; i < e.textContent.length && i < search.value.length; i++) {
            if (e.textContent[i].toUpperCase() !== search.value[i].toUpperCase()) {
                e.parentElement.style.backgroundColor = ''
            } else {
                e.parentElement.style.backgroundColor = '#232323'
            }
        }
        if (search.value === '') {
            e.parentElement.style.backgroundColor = ''
        }
    })
}
searchTitle.addEventListener('click', () => {
    search.setAttribute('placeholder', 'Search By Title')
})
searchCategory.addEventListener('click', () => {
    search.setAttribute('placeholder', 'Search By Category')
})
search.addEventListener('input', () => {
    if (search.getAttribute('placeholder') === 'Search By Title') {
        searchProducts(2)
    } else if (search.getAttribute('placeholder') === 'Search By Category') {
        searchProducts(8)
    }
})
// end Search prodects






// start update prodect
let allBtnUpdate = []

setInterval(() => {
    let allProductValues = []
    allBtnUpdate.forEach((e) => {
        e.addEventListener('click', () => {
            window.scrollTo(0, 0)
            e.parentElement.classList.add('current-item')
            count.style.visibility = 'hidden'
            e.parentElement.querySelectorAll('td:nth-child(n+2):nth-child(-n+8)').forEach((e) => {
                allProductValues.push(e)
            })
            for (let i = 0; i < allProductInput.length; i++) {
                if (allProductInput[i] !== total) {
                    allProductInput[i].value = allProductValues[i].textContent
                } else {
                    allProductInput[i].textContent = allProductValues[i].textContent
                    total.parentElement.classList.add('active')
                }
            }
            create.textContent = 'Update'
            deleteAll.style.display = 'none'
        })
    })
}, 500);
// start update prodect


// start delete prodect
let allBtnDelete = []

setInterval(() => {
    allBtnDelete.forEach((e) => {
        e.addEventListener('click', () => {
            e.parentElement.remove()
            localStorage.removeItem(`prodects${e.parentElement.querySelector('td:first-child').textContent}`)
            deleteAll.textContent = `Delete All (${elTbody.querySelectorAll('tr').length})`

            // start Arrange products in order on the page and in localstorage
            let localProdect = []
            for (let i = 0; i < localStorage.length; i++) {
                localProdect.push(localStorage.key(i))
            }
            localProdect.sort((a, b) => {
                const numA = parseInt(a.slice(8))
                const numb = parseInt(b.slice(8))
                return numA - numb
            })

            let counter = 0
            elTbody.querySelectorAll('tr td:first-child').forEach((e) => {
                e.textContent = counter + 1
                counter++
            })
            localStorage.clear()
            for (let i = 0; i < elTbody.querySelectorAll('tr').length; i++) {
                localStorage.setItem(`prodects${i + 1}`, elTbody.querySelectorAll('tr')[i].outerHTML)
            }
            // end Arrange products in order on the page and in localstorage
            if (elTbody.querySelectorAll('tr').length >= 1) {
                deleteAll.style.display = 'block'
            } else {
                deleteAll.style.display = 'none'
            }
        })
    })
}, 1000);
// end delete prodect