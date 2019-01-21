import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class TableRow extends Component {

    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }

    delete(e) {
        if (window.confirm('Are you sure you want to delete?')) {
            axios.get('http://localhost:4000/peripheral/delete/' + this.props.obj._id)
                .then(res=>{
                    console.log('Deleted')
                })
                .catch(err => console.log(err));
        }


    }

    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.uid}
                </td>
                <td>
                    {this.props.obj.vendor}
                </td>
                <td>
                    {this.props.obj.date}
                </td>
                <td>
                    {this.props.obj.status === true ? "Online" : "Offline"}
                </td>
                <td>
                    <Link to={"/peripheral/edit/" + this.props.obj._id} className="btn btn-primary fa fa-edit"></Link>
                </td>
                <td>
                    <button onClick={this.delete} className="btn btn-danger fa fa-minus"></button>
                </td>
            </tr>
        );
    }
}

export default TableRow;