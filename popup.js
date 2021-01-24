const container = document.querySelector('.container');
const addBtn = document.querySelector('.navbttn');
const remBtn = document.querySelector('.removebttn');
chrome.tabs.query({active:true, lastFocusedWindow: true}, tabs=>{

	let url = tabs[0].url;
	console.log(url);

});


let list = [
	{
		id:0,
		name: "ItemName",
		price: "$10",
		url: "aslkdjel.com"
	}
];
addBtn.onclick = ()=>{

	addList(1,"Awesome!", "asjhd", "name");

	remBtn.onclick = ()=>{
		console.log("Remove Button Pressed");
		remBtn.parentNode.parentNode.removeChild(remBtn.parentNode);
	}
}

function addList(ID, itemName, itemPrice, itemPicUrl){

	console.log("Button Pressed");
	const newDiv = document.createElement("div");
	newDiv.classList.add("item");

	const newItem = document.createElement("SPAN");
	newItem.innerHTML = ID+itemName+itemPrice+ itemPicUrl;
	newItem.classList.add("itemName");
	newDiv.appendChild(newItem);



	const remBut = document.createElement("button");
	remBut.innerHTML= '<img src="./visuals/minus.png">';
	remBut.classList.add("removebttn");
	newDiv.appendChild(remBut);

	container.appendChild(newDiv);


	list.push({
		id: ID,
		name: itemName,
		price: itemPrice,
		url: itemPicUrl
	});

}

function loadList(list){;
	console.log(list);
	list.forEach(function(item){
		addList(item.id, item.name, item.price, item.url);
	});
}

loadList(list);


/*
	console.log("Button Pressed");
	const newDiv = document.createElement("div");
	newDiv.classList.add("item");

	const newItem = document.createElement("SPAN");
	newItem.innerHTML = 'Awesome!';
	newItem.classList.add("itemName");
	newDiv.appendChild(newItem);


	const remBut = document.createElement("button");
	remBut.innerHTML= '<img src="./visuals/minus.png">';
	remBut.classList.add("removebttn");
	newDiv.appendChild(remBut);

	container.appendChild(newDiv);
*/