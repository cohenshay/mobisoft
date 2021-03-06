import React from 'react';
import ProductRow from '../Products/ProductRow';

class ProductTable extends React.Component {

  render() {
    var onProductTableUpdate = this.props.onProductTableUpdate;
    var updateCell = this.props.updateCell;
    var rowDel = this.props.onRowDel;
    var filterText = this.props.filterText;
    var product = this.props.products.map(function (product) {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      return (<ProductRow 
                onProductTableUpdate={onProductTableUpdate}
                product={product} 
                updateCell={updateCell}
                onDelEvent={rowDel.bind(this)} 
                key={product.id} />)
    });
    return (
      <div>


        <button type="button" onClick={this.props.onRowAdd} className="btn btn-success pull-right">Add</button>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>price</th>
              <th>quantity</th>
              <th>category</th>
            </tr>
          </thead>

          <tbody>
            {product}

          </tbody>

        </table>
      </div>
    );

  }

}

export default ProductTable;