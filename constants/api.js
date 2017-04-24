/*	Helper to fetch the products from the shopify store
	Here the URL is declared one and used throughout the app im using the gointegrations url vs http://localhost:3000/
	as I was having connection errors (Feel free to change, it should work regardless)
*/
export const url = 'https://gointegrations-devtest.myshopify.com';

//export the promise
export const fetchProducts = () => 
	fetch(url + '/products.json')
		.then(res => res.json())
		.then((responseJson) => {
		 return responseJson; 
		 }) 
		 .catch((error) => {
		 console.error(error); 
	});

