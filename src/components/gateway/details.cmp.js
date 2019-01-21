/**
 * Created by Migue on 19/1/2019.
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
export default class DetailsGateway extends Component {
    constructor(props) {
        super(props);
        this.state = {gateway: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/gateway/findBy/' + this.props.match.params.id)
            .then(response => {
                console.log(response)
                this.setState({
                    serial: response.data.serial,
                    name: response.data.name,
                    ipaddress: response.data.ipaddress,
                    peripheral: response.data.peripheral
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    tabRow() {
        if (this.state.peripheral) {
            return this.state.peripheral.map(function (obj, i) {
                return <tr key={i}>
                    <td>{obj.label}</td>
                </tr>
            })

        }
    }

    render() {
        return (
            <div>
                <h3 align="center">Details</h3>
                <p><b>Serial Number:</b> {this.state.serial}</p>
                <p><b>Name:</b> {this.state.name}</p>
                <p><b>IP Address:</b> {this.state.ipaddress}</p>
                <table className="table table-hover" style={{marginTop: 20}}>
                    <thead align="center">
                    <tr>
                        <th>Peripheral Device</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.tabRow()}
                    </tbody>
                </table>
                <Link to={"/gateway/listing"} className="btn btn-dark">Close</Link>
            </div>
        )
    }
}