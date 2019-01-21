import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class TableRow extends Component {

    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }

    delete() {
        if (window.confirm('Are you sure you want to delete?')) {
            axios.get('http://localhost:4000/gateway/delete/' + this.props.obj._id)
                .then(res => {
                    console.log('Deleted')
                })
                .catch(err => console.log(err))
        }

    }

    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.serial}
                </td>
                <td>
                    {this.props.obj.name}
                </td>
                <td>
                    {this.props.obj.ipaddress}
                </td>
                <td>
                    <Link to={"/gateway/details/" + this.props.obj._id} className="btn btn-info fa fa-info"></Link>
                </td>
                <td>
                    <Link to={"/gateway/edit/" + this.props.obj._id} className="btn btn-primary fa fa-edit"></Link>
                </td>
                <td>
                    <button onClick={this.delete} className="btn btn-danger fa fa-minus"></button>
                </td>
            </tr>
        );
    }
}

export default TableRow;