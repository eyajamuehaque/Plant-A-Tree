let cart = [];
let quantity = 1;

function showCart(id){
    const url = `https://openapi.programming-hero.com/api/plant/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const newPlant = data.plants;
            const exists = cart.find(item => item.id === newPlant.id);

            if (exists) {
                 exists.quantity++;
            } else {
                cart.push({ ...newPlant, quantity: 1 });
            }
            
            alert(`${newPlant.name} added to cart`);
           
            cartPlants();
        })
}

const cartPlants = () => {
    const cartContainer = document.getElementById('cart-container');
    const totalPriceElement = document.getElementById('total-price');
    cartContainer.innerHTML = ''; 
    
    let total = 0;
    cart.forEach(plant => {
        
        const plantDiv = document.createElement('div');
        plantDiv.className = "flex justify-between p-3 mb-2 bg-gray-100 rounded-lg";

        const itemSubtotal = plant.price * (plant.quantity || 1);
        total += itemSubtotal;
        const quantityNum = plant.quantity || 1;
        plantDiv.innerHTML = `
            <div>
                <p class="font-semibold">${plant.name}</p>
                <p class="text-gray-500">${plant.price} × ${quantityNum}</p>

            </div>
            <i onclick="removeItem(${plant.id})" class="fa-solid fa-xmark text-red-500 cursor-pointer"></i>`;
        cartContainer.prepend(plantDiv);
    });

    if (totalPriceElement) {
        document.getElementById('total-price').innerText = total;
    }
}

const removeItem = (id) => {
    cart = cart.filter(plant => plant.id !== id);
    cartPlants();
};









const category = () => {
    const url = "https://openapi.programming-hero.com/api/categories"
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategory(data.categories))
}

//  "status": true,
//   "message": "successfully fetched categories data",
//   "categories": [
//     {
//       "id": 1,
//       "category_name": "Fruit Tree",
//       "small_description": "Trees that bear edible fruits like mango, guava, and jackfruit."
//     },

const displayCategory = (categories) => {
    const categoryContainer = document.getElementById('category-container');
    categoryContainer.innerHTML = '';


    const title = document.createElement('h2');
    title.textContent = 'Categories';
    title.classList.add('text-2xl', 'font-bold', 'mb-4'); 
    categoryContainer.appendChild(title);

    categories.forEach(categoriesAll => {
        const categoryDiv = document.createElement('div');
        
        categoryDiv.innerHTML = `
            <a id="category-${categoriesAll.id}" onClick="categoryPlant(${categoriesAll.id})" class="btn bg-[#DCFCE7] w-full cat-btn">${categoriesAll.category_name}</a>
        `;
        categoryContainer.appendChild(categoryDiv);
    })
}

const removeActive = () => {
    const categoryButtons = document.querySelectorAll(".cat-btn");
    categoryButtons.forEach(btn => {
        btn.classList.remove('active');
    });
}

const allPlants = () => {
    const url = "https://openapi.programming-hero.com/api/plants"
    fetch(url)
        .then(res => res.json())
        .then(data => displayPlants(data.plants))
}


// "status": true,
//   "message": "successfully fetched plants data",
//   "plants": [
//     {
//       "id": 1,
//       "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
//       "name": "Mango Tree",
//       "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
//       "category": "Fruit Tree",
//       "price": 500
//     },




const categoryPlant = (id) => {
    spinner(true);
    const url = `https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive();
            const ClickBtn = document.getElementById(`category-${id}`);
            ClickBtn.classList.add('active');
            displayPlants(data.plants)
        })
}

const loadPlantDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            showInfo(data.plants);
        })
}

const showInfo = (plants) => {
   const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
    
     <div>
            <h3 class="font-bold text-2xl" id="plant-name">${plants.name}</h3>
            <img src="${plants.image}" alt="" id="plant-image" class="w-full h-60 object-cover rounded-lg my-4">
            <p class="py-4 font-semibold" id="plant-description">Category: <span class="text-gray-500">${plants.category}</span></p>
            <p class="font-semibold">Price: <span class="text-gray-500">$${plants.price}</span></p>
            <p class="font-semibold">Description: <span class="text-gray-500">${plants.description}</span></p>

        </div>`

    document.getElementById('my_modal_5').showModal();

}



const displayPlants = (plants) => {
    const allPlantsContainer = document.getElementById('all-plants-container');
    allPlantsContainer.innerHTML = '';

    plants.forEach(plant => {
        const plantDiv = document.createElement('div');
        plantDiv.innerHTML = `
            <div class="bg-white p-4 rounded-xl space-y-2">
                <img src="${plant.image}" alt="" class="w-full h-40 object-cover rounded-lg">
                <div onclick="loadPlantDetails(${plant.id})" >
                    <h3  class="text-xl font-semibold">${plant.name}</h3>
                </div>
                <p class="text-sm text-gray-500">${plant.description}</p>
                <div class="flex justify-between items-center">
                    <span class="text-gray-500 bg-green-200 rounded-xl p-1">${plant.category}</span>
                    <span class="font-bold">$${plant.price}</span>
                </div>
                <button onClick="showCart(${plant.id})" class="btn !bg-[#15803D] !text-white w-full">Add to Cart</button>
            </div>
        `;
        allPlantsContainer.appendChild(plantDiv);
    });
    spinner(false);
}


// const showPlantDetails = (id) => {
//     const url = `https://openapi.programming-hero.com/api/plant/${id}`
//     fetch(url)
//         .then(res => res.json())
//         .then(data => {
//            showInfo(data.plants);
//         })
// }

// const showInfo = (plants) => {
//     const
// }

const spinner = (status) => {
    if(status === true){
        document.getElementById('loading').classList.remove('hidden');
        document.getElementById('all-plants-container').classList.add('hidden');
    }else{
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('all-plants-container').classList.remove('hidden');
    }
}

allPlants();

category();