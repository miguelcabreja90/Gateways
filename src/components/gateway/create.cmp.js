/**
 * Created by Migue on 18/1/2019.
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';

export default class CreateGateway extends Component {
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
            peripheral: [],
            options: []
        };

    }

    componentDidMount() {

        axios.get('http://localhost:4000/peripheral')
            .then(response => {
                this.setState({options: response.data});

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
        axios.post('http://localhost:4000/gateway/create', obj)
            .then(res => {
                console.log(res.data)
            });

        this.setState({
            serial: '',
            name: '',
            ipaddress: '',
            peripheral: []
        })

    }

    render() {
        let options = this.state.options;
        let optionItems = [];
        for (var i = 0; i < options.length; i++) {
            optionItems.push({
                value: options[i]._id,
                label: options[i].vendor
            })
        }
        return (
            <div style={{marginTop: 10}}>
                <h3 align="center">New Gateway</h3>
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
                        <Select options={ optionItems } onChange={this.onChangePeripheral} isMulti/>
                    </div>
                    <div className="form-group">
                        <div layout="row">
                            <input type="submit" value="Register" className="btn btn-primary"/>
                            <Link style={{marginLeft: 5}} to={"/gateway/listing"} className="btn btn-dark">Cancel</Link>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}