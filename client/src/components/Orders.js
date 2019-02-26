import React from 'react';
import { connect } from 'react-redux';


class Orders extends React.Component {
    constructor() {
        super();
        this.state = {
            orders: [{ "itemName": "shoes", "amount": 3 }, { "itemName": "klafim", "amount": 2 }]
        }
    }

    render() {
        return (
            <div className="orders">Orders
                {this.state.orders.length > 0 &&
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                        </tr>
                        {
                            this.state.orders.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.itemName}</td>
                                    <td>{item.amount}</td>
                                </tr>
                            ))
                        }
                    </table>
                }
            </div>
        )
    }
}



const mapDispatchToProps = (dispatch) => ({

});

export default connect(undefined, mapDispatchToProps)(Orders);
