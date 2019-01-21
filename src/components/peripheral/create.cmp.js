/**
 * Created by Migue on 18/1/2019.
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import axios from 'axios';

export default class CreatePeripheral extends Component {
    constructor(props) {
        super(props);
        this.onChangeUID = this.onChangeUID.bind(this);
        this.onChangeVendor = this.onChangeVendor.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            uid: '',
            vendor: '',
            date: new Date(),
            status: ''
        };
        this.status = [
            { label: "Online", value: 1 },
            { label: "Offline", value: 0 },

        ];
    }

    onChangeUID(e) {
        this.setState({
            uid: e.target.value
        });
    }

    onChangeVendor(e) {
        this.setState({
            vendor: e.target.value
        })
    }

    onChangeDate(e) {
        this.setState({
            date: e
        })
    }

    onChangeStatus(e) {
        this.setState({
            status: e.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            uid: this.state.uid,
            vendor: this.state.vendor,
            date: this.state.date,
            status: this.state.status
        };
        axios.post('http://localhost:4000/peripheral/create', obj)
            .then(res => console.log(res.data));
        alert('Successfull');
        this.setState({
            uid: '',
            vendor: '',
            date: new Date(),
            status: ''
        })
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3 align="center">New Peripheral</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>UID: </label>
                        <input
                            type="Number"
                            className="form-control"
                            required={true}
                            value={this.state.uid}
                            onChange={this.onChangeUID}
                        />
                    </div>
                    <div className="form-group">
                        <label>Vendor: </label>
                        <input
                            type="text"
                            className="form-control"
                            required={true}
                            value={this.state.vendor}
                            onChange={this.onChangeVendor}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <DatePicker
                            selected={ this.state.date }
                            onChange={ this.onChangeDate }
                            name="startDate"
                            dateFormat="MM/DD/YYYY"/>
                    </div>
                    <div className="form-group">
                        <div className="form-group">
                            <label>Status: </label>
                            <Select options={ this.status } onChange={this.onChangeStatus} />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="form-group">
                            <div layout="row">
                                <input type="submit" value="Register" className="btn btn-primary"/>
                                <Link style={{marginLeft: 5}} to={"/peripheral/listing"} className="btn btn-dark">Cancel</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}