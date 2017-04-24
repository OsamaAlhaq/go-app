import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Image,
  Button,
  ScrollView,
  ActivityIndicator
  } from 'react-native';
import { fetchProducts } from './constants/api';
import { url } from './constants/api'; 

//When the buy button is pressed create the shopify draft order
const onButtonPress = (title, price) => {

	fetch(url + '/draft_order', {
	  method: 'POST',
	  headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	  },
	  body: JSON.stringify({
		title: title, //name of product
		price: price, //cost of product
		quantity: 1
	  })
	})
}		
export default class App extends React.Component {

  static defaultProps = {
	fetchProducts
  }
  
  //initialize the state
  state = {
	products: []
  }
  
  //Here im making the asynchronous call which updates the state
  async componentDidMount() {
	const data = await this.props.fetchProducts();
	this.setState({products: data.products});
  }
  
  //display the products by iterating through the array
  render() {
    return (
		<View style={styles.container}>
		{this.state.products.map((item, i) => 
			<View style={styles.container} key={i}>
				<Text>{ item.title }</Text>
				<Image
				  style={{width: 140, height: 80}}
				  source={{uri: item.images[0].src }}
				/>
				<Text> $ { item.variants[0].price * 0.75 }</Text>
				<Button 
				  onPress={ ()=> 
					onButtonPress(item.title, item.variants[0].price * 0.75)
				  }
				  title="Purchase"
				  color="#841584"
				  accessibilityLabel="Learn more about this product" />
			</View>
		)}
		</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
