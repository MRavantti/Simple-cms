import React, { Component, Fragment } from 'react';

import Button from '../Button';

class EditCompanyInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            companyInformation: [],
            name: "",
            phone: "",
            email: "",
            adress: "",
            zipcode: "",
            city: "",
            province: "",
            country: "",
            editName: false,
            editPhone: false,
            editEmail: false,
            editAdress: false,
            editZipcode: false,
            editCity: false,
            editProvince: false,
            editCountry: false,
        }
    }

    componentDidMount() {
        this.props.companyInformation.map((info) => 
        this.setState({id: info.id})
        )
    }

    editCompanyInformation = () => {
        const api = `http://localhost:5000/api/companyinformation/${this.state.id}`

        const options = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.name,
                phone: this.state.phone,
                email: this.state.email,
                adress: this.state.adress,
                zipcode: this.state.zipcode,
                city: this.state.city,
                country: this.state.country,
            })
        }

        fetch(api, options)
            .then(() => {
                this.setState(() => (window.location.reload()))
            })
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.editCompanyInformation();
    }

    editNameChecker = () => { this.setState(prevState => ({ editName: !prevState.editName, })) }

    editPhoneChecker = () => { this.setState(prevState => ({ editPhone: !prevState.editPhone, })) }

    editEmailChecker = () => { this.setState(prevState => ({ editEmail: !prevState.editEmail, })) }

    editAdressChecker = () => { this.setState(prevState => ({ editAdress: !prevState.editAdress, })) }

    editZipcodeChecker = () => { this.setState(prevState => ({ editZipcode: !prevState.editZipcode, })) }

    editCityChecker = () => { this.setState(prevState => ({ editCity: !prevState.editCity, })) }

    editProvinceChecker = () => { this.setState(prevState => ({ editProvince: !prevState.editProvince, })) }

    editCountryChecker = () => { this.setState(prevState => ({ editCountry: !prevState.editCountry, })) }

    render() {
        const { editName, editCountry, editEmail, editPhone, editCity, editZipcode, editAdress, editProvince } = this.state;
        const { companyInformation } = this.props;
        
        return (
            <div className="forms-container">
                {
                    companyInformation.map((companyInfo, key) =>
                        <div className="company-info-container" key={key} >
                            {
                                editName === true
                                    ? <Fragment>
                                        <form className="forms" onSubmit={this.handleSubmit}>
                                            <label>
                                                <p className="label">Enter company name:</p>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="enter company name..."
                                                    defaultValue={companyInfo.name}
                                                    onChange={this.changeHandler}
                                                />
                                            </label>
                                            <input className="submit" type="submit" value="Submit" />
                                        </form>

                                        <Button onClick={() => this.editNameChecker()} text="Cancel" backgroundColor="#262832" />
                                    </Fragment>
                                    : <Fragment>
                                        <h3>{companyInfo.name}</h3>
                                        <Button onClick={() => this.editNameChecker()} text="Edit name" backgroundColor="#262832" />
                                    </Fragment>
                            }
                            <div className="line" />
                            {
                                editPhone === true
                                    ? <Fragment>
                                        <form className="forms" onSubmit={this.handleSubmit}>
                                            <label>
                                                <p className="label">Enter company name:</p>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    placeholder="enter company phone nr..."
                                                    defaultValue={companyInfo.phone}
                                                    onChange={this.changeHandler}
                                                />
                                            </label>
                                            <input className="submit" type="submit" value="Submit" />
                                        </form>

                                        <Button onClick={() => this.editPhoneChecker()} text="Cancel" backgroundColor="#262832" />
                                    </Fragment>
                                    : <Fragment>
                                        <p>{companyInfo.phone}</p>
                                        <Button onClick={() => this.editPhoneChecker()} text="Edit phone" backgroundColor="#262832" />
                                    </Fragment>
                            }
                            <div className="line" />
                            {
                                editEmail === true
                                    ? <Fragment>
                                        <form className="forms" onSubmit={this.handleSubmit}>
                                            <label>
                                                <p className="label">Enter company name:</p>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="enter company email"
                                                    defaultValue={companyInfo.email}
                                                    onChange={this.changeHandler}
                                                />
                                            </label>
                                            <input className="submit" type="submit" value="Submit" />
                                        </form>

                                        <Button onClick={() => this.editEmailChecker()} text="Cancel" backgroundColor="#262832" />
                                    </Fragment>
                                    : <Fragment>
                                        <p>{companyInfo.email}</p>
                                        <Button onClick={() => this.editEmailChecker()} text="Edit email" backgroundColor="#262832" />
                                    </Fragment>
                            }
                            <div className="line" />
                            {
                                editAdress === true
                                    ? <Fragment>
                                        <form className="forms" onSubmit={this.handleSubmit}>
                                            <label>
                                                <p className="label">Enter company name:</p>
                                                <input
                                                    type="text"
                                                    name="adress"
                                                    placeholder="enter company adress..."
                                                    defaultValue={companyInfo.adress}
                                                    onChange={this.changeHandler}
                                                />
                                            </label>
                                            <input className="submit" type="submit" value="Submit" />
                                        </form>

                                        <Button onClick={() => this.editAdressChecker()} text="Cancel" backgroundColor="#262832" />
                                    </Fragment>
                                    : <Fragment>
                                        <p>{companyInfo.adress}</p>
                                        <Button onClick={() => this.editAdressChecker()} text="Edit adress" backgroundColor="#262832" />
                                    </Fragment>
                            }
                            <div className="line" />
                            {
                                editZipcode === true
                                    ? <Fragment>
                                        <form className="forms" onSubmit={this.handleSubmit}>
                                            <label>
                                                <p className="label">Enter company name:</p>
                                                <input
                                                    type="text"
                                                    name="zipcode"
                                                    placeholder="enter company zipcode..."
                                                    defaultValue={companyInfo.zipcode}
                                                    onChange={this.changeHandler}
                                                />
                                            </label>
                                            <input className="submit" type="submit" value="Submit" />
                                        </form>

                                        <Button onClick={() => this.editZipcodeChecker()} text="Cancel" backgroundColor="#262832" />
                                    </Fragment>
                                    : <Fragment>
                                        <p>{companyInfo.zipcode}</p>
                                        <Button onClick={() => this.editZipcodeChecker()} text="Edit zipcode" backgroundColor="#262832" />
                                    </Fragment>
                            }
                            <div className="line" />
                            {
                                editCity === true
                                    ? <Fragment>
                                        <form className="forms" onSubmit={this.handleSubmit}>
                                            <label>
                                                <p className="label">Enter company name:</p>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    placeholder="enter city..."
                                                    defaultValue={companyInfo.city}
                                                    onChange={this.changeHandler}
                                                />
                                            </label>
                                            <input className="submit" type="submit" value="Submit" />
                                        </form>

                                        <Button onClick={() => this.editCityChecker()} text="Cancel" backgroundColor="#262832" />
                                    </Fragment>
                                    : <Fragment>
                                        <p>{companyInfo.city}</p>
                                        <Button onClick={() => this.editCityChecker()} text="Edit city" backgroundColor="#262832" />
                                    </Fragment>
                            }
                            <div className="line" />
                            {
                                editProvince === true
                                    ? <Fragment>
                                        <form className="forms" onSubmit={this.handleSubmit}>
                                            <label>
                                                <p className="label">Enter company name:</p>
                                                <input
                                                    type="text"
                                                    name="province"
                                                    placeholder="enter province..."
                                                    defaultValue={companyInfo.province}
                                                    onChange={this.changeHandler}
                                                />
                                            </label>
                                            <input className="submit" type="submit" value="Submit" />
                                        </form>

                                        <Button onClick={() => this.editProvinceChecker()} text="Cancel" backgroundColor="#262832" />
                                    </Fragment>
                                    : <Fragment>
                                        <p>{companyInfo.province}</p>
                                        <Button onClick={() => this.editProvinceChecker()} text="Edit province" backgroundColor="#262832" />
                                    </Fragment>
                            }
                            <div className="line" />
                            {
                                editCountry === true
                                    ? <Fragment>
                                        <form className="forms" onSubmit={this.handleSubmit}>
                                            <label>
                                                <p className="label">Enter company name:</p>
                                                <input
                                                    type="text"
                                                    name="country"
                                                    placeholder="enter province..."
                                                    defaultValue={companyInfo.country}
                                                    onChange={this.changeHandler}
                                                />
                                            </label>
                                            <input className="submit" type="submit" value="Submit" />
                                        </form>

                                        <Button onClick={() => this.editCountryChecker()} text="Cancel" backgroundColor="#262832" />
                                    </Fragment>
                                    : <Fragment>
                                        <p>{companyInfo.country}</p>
                                        <Button onClick={() => this.editCountryChecker()} text="Edit province" backgroundColor="#262832" />
                                    </Fragment>
                            }
                        </div>
                    )
                }

            </div>
        )
    }
}

export default EditCompanyInfo;