$(document).ready(() => {
    const importantInfo = [
			{
				name: 'kabob',
				inStock: 6,
				price: 11.5,
				details: ['rice', 'salad', 'bread', 'yogurt'],
				imgUrl:
					'https://www.allrecipes.com/thmb/Im5Zv5Gs4hrNzLc8Qb2RWWnGKRM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1027652-kabobs-Franklin-4x3-1-ffb8373b16fa4b2489781ee915d0cfbc.jpg',
			},
			{
				name: 'manto',
				inStock: 3,
				price: 7.25,
				details: [],
				imgUrl: 'https://i.ytimg.com/vi/tkZl5Ydu0Cs/maxresdefault.jpg',
			},
			{
				name: 'qabuli',
				inStock: 1,
				price: 16.8,
				details: ['salad', 'chilis', 'bread'],
				imgUrl:
					'https://static.wixstatic.com/media/4c1904_b6f4bfa9a8224d77b588fd5d6f2036bd~mv2.jpg/v1/fill/w_640,h_426,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/4c1904_b6f4bfa9a8224d77b588fd5d6f2036bd~mv2.jpg',
			},
			{
				name: 'bolani',
				inStock: 4,
				price: 4.5,
				details: ['chutney'],
				imgUrl:
					'https://www.sandyathome.com/wp-content/uploads/2016/07/IMG_5855.jpg',
			},
			{
				name: 'bamya',
				inStock: 0,
				price: 12.0,
				details: ['chutney'],
				imgUrl:
					'https://assets.tmecosys.cn/image/upload/t_web767x639/img/recipe/ras/Assets/f210b7df-a4a1-4476-a8e7-7781753e395b/Derivates/c4232d90-e880-44c9-b889-edc83ab64d22.jpg',
			},
			{
				name: 'karahi',
				inStock: 11,
				price: 15.5,
				details: ['rice', 'bread', 'yogurt'],
				imgUrl:
					'https://recipe52.com/wp-content/uploads/2018/04/Chicken-Karahi-Recipe-Pakistani-1-of-1.jpg',
			},
		]

    const foods = [
			{
				name: 'kabob',
				counter: 0,
			},
			{
				name: 'manto',
				counter: 0,
			},
			{
				name: 'qabuli',
				counter: 0,
			},
			{
				name: 'bolani',
				counter: 0,
			},
			{
				name: 'bamya',
				counter: 0,
			},
			{
				name: 'karahi',
				counter: 0,
			},
		];

    function addFood(name, inStock, price, details, imgUrl) {
        importantInfo.push({
            name,
            inStock,
            price: `${price}`,
            details: details,
            imgUrl
        });
        foods.push({
            name,
            counter: 0
        })
    }

    addFood(
			'Piawe-Chaka',
			5,
			3,
			['yogurt', 'Afghani-bread'],
			'https://fa2.ifilmtv.ir/UploadedFiles/Images/22-02-2020/13_08_481.jpg'
		);

    const starting = $("#starting");
    
    
    let totalPrice = 0;
    const totalElement = $('<div id="total"></div>').text(`Total price: $${totalPrice}`);
    starting.after(totalElement);
    
    const orderSummary = $("<div id='order'>Your order:</div>");


    starting.after(orderSummary);
    
    foods.forEach(food => {
        const foodCounter = $(`<div></div>`).attr('id', `${food.name}`).text(`${food.name}: ${food.counter}`);

        orderSummary.append(foodCounter)
    })
    
    const menu = $("#menu");
    
    importantInfo.forEach((foodSet, foodSetIndex) => {
        const foodBox = $("<div class='foodBox'></div>").text(`${foodSet.name}`).css('border', 'solid');
        foodBox.append($("<div class='price'></div>").text(`Price $${foodSet.price}`));
        foodBox.append($("<div class='include'></div>").text(`Includes: ${foodSet.details}`));

        const foodImage = $(`<img class="foodImage" src=${foodSet.imgUrl}>`);
        foodBox.append(foodImage);
        
        const addButton = getAddButton(foodSet, foodSetIndex);
        foodBox.append(addButton);
        const removeButton = getRemoveButton(foodSet, foodSetIndex);
            foodBox.append(removeButton);
            
            
            menu.append(foodBox);
        });

        function getAddButton(foodSet, foodSetIndex) {
            return $("<button>Add Item</button>")
                .on('click', () => {
                    if (foodSet.inStock > 0) {
                        importantInfo[foodSetIndex].inStock = foodSet.inStock - 1; 
                        totalPrice += foodSet.price;
                        totalElement.text(`Total price: $${totalPrice}`);
                        let counter = foods[foodSetIndex].counter += 1;
                        $(`#${foodSet.name}`).text(`${foodSet.name}: ${counter}`);
                    } else {
                        alert(`We are all sold out of ${foodSet.name}`);
                    }
                })
            }
            
            function getRemoveButton(foodSet, foodSetIndex) {
                return $("<button>Remove Item</button>")
                .on('click', () => {
                    if (totalPrice > 0) {
                        totalPrice -= foodSet.price;
                        foodSet.inStock += 1;
                        totalElement.text(`Total price: $${totalPrice}`);
                        let counter = foods[foodSetIndex].counter -= 1;
                        $(`#${foodSet.name}`).text(`${foodSet.name}: ${counter}`);
                    } else {
                        alert(`You don\'t have any ${foodSet.name} to remove`);
                    }
            })
        }
    
    
    
    
})