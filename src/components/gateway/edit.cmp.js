/**
 * Created by Migue on 18/1/2019.
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';

export default class EditPeripheral extends Component {
    constructor(props) {
        super(props);
        this.onChangeSerialNumber = this.onChangeSerialNumber.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeIpAddres = this.onChangeIpAddres.bind(this);
        this.onChangePeripheral = this.onChangePeripheral.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            serial: '',
            name: '',
            ipaddress: '',
            peripheral: ''
        }
        this.techCompanies = [
            { label: "Apple", value: 1 },
            { label: "Facebook", value: 2 },
            { label: "Netflix", value: 3 },
            { label: "Tesla", value: 4 },
            { label: "Amazon", value: 5 },
            { label: "Alphabet", value: 6 },
        ];
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

    onChangeSerialNumber(e) {
        this.setState({
            serial: e.target.value
        });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangeIpAddres(e) {
        this.setState({
            ipaddress: e.target.value
        })
    }

    onChangePeripheral(e) {
        this.setState({
            peripheral: e
        })

    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            serial: this.state.serial,
            name: this.state.name,
            ipaddress: this.state.ipaddress,
            peripheral: this.state.peripheral
        };
        axios.post('http://localhost:4000/gateway/update/' + this.props.match.params.id, obj)
            .then(res => {
                console.log(res.data)
                this.props.history.push('/gateway/listing');
            });


    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3 align="center">Edit Gateway</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Serial Number: </label>
                        <input
                            type="text"
                            required={true}
                            className="form-control"
                            value={this.state.serial}
                            onChange={this.onChangeSerialNumber}
                        />
                    </div>
                    <div className="form-group">
                        <label>Gateway Name: </label>
                        <input type="text"
                               className="form-control"
                               required={true}
                               value={this.state.name}
                               onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <label>IP Address: </label>
                        <input type="text"
                               className="form-control"
                               required={true}
                               maxLength="15"
                               value={this.state.ipaddress}
                               onChange={this.onChangeIpAddres}
                        />
                    </div>
                    <div className="form-group">
                        <label>Peripheral: </label>
                        <Select options={ this.techCompanies } value={this.state.peripheral}
                                onChange={this.onChangePeripheral} isMulti />

                    </div>
                    <div className="form-group">
                        <div layout="row">
                            <input type="submit" value="Update" className="btn btn-primary"/>
                            <Link style={{marginLeft: 5}} to={"/gateway/listing"} className="btn btn-dark">Cancel</Link>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}