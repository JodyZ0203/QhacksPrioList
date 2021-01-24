const addBtn = document.querySelector('.navbttn');
const clearBtn = document.querySelector('.navbttnclear');
const orgBtn = document.querySelector('.navbttnro');


const puppeteer = require('puppeteer');


async function scrape(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    
    // Scrapes the current price 
    const[el] = await page.$x('//*[@id="priceblock_ourprice"]');
    const src = await el.getProperty('textContent')
    const price = await src.jsonValue();
    
    // Scrapes the title of the item
    const[ele] = await page.$x('//*[@id="productTitle"]');   // Copy x path of the element
    const txt2 = await ele.getProperty('textContent')
    const Txt2 = await txt2.jsonValue();    
    var title = Txt2.replace(/[\n\r\t]/g,"");  //Reomoves unneccessary new lines in json string
    
    // Scrapes the img of the item
    const[el2] = await page.$x('//*[@id="landingImage"]');
    const imag = await el2.getProperty('src')
    const img = await imag.jsonValue(); 

    // Scrapes the tags of the item so sorting can be done
    const[el3] = await page.$x('//*[@id="wayfinding-breadcrumbs_feature_div"]/ul/li[1]/span/a');
    const cat = await el3.getProperty('textContent')
    const Cat = await cat.jsonValue(); 
    var category = Cat.replace(/[\n\r\t]/g,"").trim(); 

    console.log({price, title, img, category});

    browser.close();

    addList(list.length+1, titlem price, img, category);

    
}

let importance = {"Health & Personal Care":1,"Amazon Device Accessories":3, "Amazon Kindle":3, "Automotive & Powersports":3,"Baby Products (excluding apparel)":1, "Beauty":3, "Books":3, "Camera & Photo":3,"Cell Phones & Accessories":3,"Collectible Coins":4,"Consumer Electronics":3,"Entertainment Collectibles":3,"Fine Art":4,"Grocery & Gourmet Food":1,"Health & Personal Care":1,"Home & Garden,Independent Design":3,"Industrial & Scientific":3,"Kindle Accessories and Amazon Fire TV Accessories":4,"Major Appliances":2,"Music":3,"Musical Instruments":3,"Office Products":2,"Outdoors":3,"Personal Computers":2,"Pet Supplies":2,"Software":2,"Sports":2,"Sports Collectibles":4,"Tools & Home Improvement":2,"Toys & Games":2,"Video":3, "DVD & Blu-ray":3,"Video Games":3,"Watches":4};

let list = [];

chrome.storage.sync.get(['data'], function(result) {
		loadList(result.data);
		console.log("Result Has been changed "+ result.data);
	});


addBtn.onclick = ()=>{

	chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    scrape(url);
});
}


orgBtn.onclick = ()=>{
	organize(list);
	chrome.storage.sync.set({data:list}, function(){
		console.log("Org Button "+ list);
	});

	let wshlist = document.getElementById("wishlist");
	wshlist.innerHTML = ' ';
	list = [];
	chrome.storage.sync.get(['data'], function(result) {
		loadList(result.data);
		console.log("Result Has been changed "+ result.data);
	});
}


clearBtn.onclick = ()=>{

	chrome.storage.sync.set({data:[]}, function(){
		console.log("Data is set to "+ []);
	});

	list=[];

	let wshlist = document.getElementById("wishlist");
	wshlist.innerHTML = ' ';
}


function organize(orglist){
	let newlist = [];
	orglist.forEach(function(item){
		if (item['category'] in importance){
			console.log("In importance");
			item['importance'] = importance[item['category']];
		} else{
			item['importance'] = 5;
		}
	});
	for (var i = 1; i<=5; i++){
		orglist.forEach(function(item){
			if (item['importance'] === i){
				newlist.push(item);
			}
		});
	}
	list = newlist;
	newlist = [];
	console.log(newlist.length);
}


function addList(ID, itemName, itemPrice, itemPicUrl, itemCat){


	console.log("Button Pressed");
	const newDiv = document.createElement("div");
	newDiv.addEventListener("click", function(event){
		const element = event.target;
		let ID = element.parentNode.parentNode.id;
		element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);
		delete list[ID];
		organize(list);
		chrome.storage.sync.set({data:list}, function(){
		console.log("Inside Event Listener "+ list);
		});
	});
	newDiv.classList.add("item");
	newDiv.id = ID;


	const itmImg = document.createElement("SPAN");
	itmImg.innerHTML = `<img class="productImg" src="${itemPicUrl}"alt="Product Image">`;
	newDiv.appendChild(itmImg);


	const newItem = document.createElement("SPAN");
	newItem.innerHTML = itemName;
	newItem.href = "www.batuhanaktan.com";
	newItem.target = "_blank";
	newItem.classList.add("itemName");
	newDiv.appendChild(newItem);


	const itmPrice = document.createElement("SPAN");
	itmPrice.innerHTML = itemPrice;
	itmPrice.classList.add("price");
	newDiv.appendChild(itmPrice);

	const remBut = document.createElement("button");
	remBut.innerHTML= '<img src="./visuals/minus.png">';
	remBut.classList.add("removebttn");
	newDiv.appendChild(remBut);


	wishlist.appendChild(newDiv);


	list.push({
			ID: 'id',
			name: itemName,
			price: itemPrice,
			imgUrl: itemPicUrl,
			category: itemCat,
			importance: 0
	});

	chrome.storage.sync.set({data:list}, function(){
		console.log("End of Add "+ list);
	});
}


function loadList(list){
	list.forEach(function(item){
		addList(item.id, item.name, item.price, item.imgUrl);
	});
}
