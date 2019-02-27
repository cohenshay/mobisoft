import React from 'react';
import { connect } from 'react-redux';
import SearchBar from '../Products/SearchBar';
import ProductTable from '../Products/ProductTable';
import { add_product, get_all_products, get_product, init, remove, update_product } from '../../actions/products';
class Products extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
    this.state.filterText = "";
    this.state.products = [];

  }

  init = () => {
    this.props.init((res) => {
      console.log(res);
      this.props.get_all_products(this.buildTable)
    });
  }
  buildTable = (response) => {
    let products = [];
    response.forEach(element => {
      products.push({
        "id": element.id, "category": element.data.category,
        "name": element.data.name, "price": element.data.price,
        "quantity": element.data.quantity
      })
    });
    this.setState({ products })
  }
  handleUserInput = (filterText) => {
    this.setState({ filterText: filterText });
  };
  updateCell = (e,id)=>{
    const name = e.target.name;
    const value = e.target.value;
 

    var products = this.state.products.slice();
      var newProducts = products.map(function (product) {

        for (var key in product) {
          if (key == name && product.id == id) {
            product[key] = value;

          }
        }
        return product;
      });
      this.setState({ products: newProducts });
  }
  handleRowDel = (product) => {
    this.props.remove(product.id, () => {
      var index = this.state.products.indexOf(product);
      this.state.products.splice(index, 1);
      this.setState(this.state.products);
    })
  };

  handleAddEvent = (evt) => {
    evt.persist()
    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var product = {
      id: id,
      name: "",
      price: "",
      category: "",
      quantity: 0
    }
    this.state.products.push(product);
    this.setState(this.state.products);

  }

  handleProductTable = (newProduct) => {
    this.props.update_product(newProduct, () => {
     
      var products = this.state.products.slice();
      var newProducts = products.map(function (product) {

        for (var key in product) {
          if (key == newProduct.name && product.id == newProduct.id) {
            product[key] = newProduct.value;

          }
        }
        return product;
      });
      this.setState({ products: newProducts });
    })
  };
  render() {

    return (
      <div>
      <button onClick={()=>this.init()}>Init</button>
      <button onClick={()=>this.props.get_all_products(this.buildTable)}>Refresh</button>
        {
          this.state.products.length > 0 &&
          <SearchBar
            filterText={this.state.filterText}
            onUserInput={this.handleUserInput} />
        }
        {
          this.state.products.length > 0 &&
          <ProductTable
            onProductTableUpdate={this.handleProductTable}
            updateCell={this.updateCell}
            onRowAdd={this.handleAddEvent}
            onRowDel={this.handleRowDel}
            products={this.state.products}
            filterText={this.state.filterText} />
        }

      </div>
    );

  }

}







const mapDispatchToProps = (dispatch) => ({
  add_product: (product, callback) => dispatch(add_product(product, callback)),
  get_all_products: (callback) => dispatch(get_all_products(callback)),
  get_product: (productId, callback) => dispatch(get_product(productId, callback)),
  init: (callback) => dispatch(init(callback)),
  remove: (productId, callback) => dispatch(remove(productId, callback)),
  update_product: (productId, callback) => dispatch(update_product(productId, callback))
});

export default connect(undefined, mapDispatchToProps)(Products);
