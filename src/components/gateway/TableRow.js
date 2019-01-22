import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class TableRow extends Component {

    constructor(props) {
        super(props);
        this.remove = this.remove.bind(this);
    }

    remove() {
        if (window.confirm('Are you sure you want to remove?')) {
            axios.get('http://localhost:4000/gateway/remove/' + this.props.obj._id)
                .then(res => {
                    console.log('Deleted');
                    console.log(res);
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
                    <Link to={"/gateway/details/" + this.props.obj._id} rel="tooltip" title="Details"
                          className="btn btn-sm btn-info fa fa-info"/>
                </td>
                <td>
                    <Link to={"/gateway/edit/" + this.props.obj._id} rel="tooltip" title="Edit"
                          className="btn btn-sm btn-primary fa fa-edit"/>
                </td>
                <td>
                    <button onClick={this.remove} rel="tooltip" title="Remove"
                            className="btn btn-sm btn-danger fa fa-minus"/>
                </td>
            </tr>
        );
    }
}

export default TableRow;