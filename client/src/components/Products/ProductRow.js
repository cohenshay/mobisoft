import React from 'react';


class ProductRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id:"",
      name:"",
      price:"",
      quantity:"",
      category:"",
    };
  

  }
  onDelEvent() {
    this.props.onDelEvent(this.props.product);

  }
  render() {
   
    const id = this.props.product.id;
    const name = this.props.product.name;
    const price = this.props.product.price;
    const quantity = this.props.product.quantity;
    const category = this.props.product.category;
    return (
      <tr className="eachRow">
        <td>
          <input type='text' name="name" value={name} onChange={(e)=>this.props.updateCell(e,id)}/>
        </td>
        <td>
          <input type='text' name="price" value={price} onChange={(e)=>this.props.updateCell(e,id)}/>
        </td>
        <td>
          <input type='text' name="quantity"  value={quantity} onChange={(e)=>this.props.updateCell(e,id)}/>
        </td>
        <td>
          <input type='text' name="category"  value={category} onChange={(e)=>this.props.updateCell(e,id)}/>
        </td>

        <td className="del-cell">
          <input type="button" onClick={this.onDelEvent.bind(this)} value="X" className="del-btn" />
        </td>
        <td className="update">
          <input type="button" onClick={() => this.props.onProductTableUpdate({ id, name, price, quantity, category })} value="Update" className="del-btn" />
        </td>
      </tr>
    );

  }

}

export default ProductRow;