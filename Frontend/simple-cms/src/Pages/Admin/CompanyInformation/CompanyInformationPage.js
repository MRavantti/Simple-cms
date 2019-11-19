import React, { Component, Fragment } from 'react';

import AdminNavbar from '../../../Components/AdminNavbar';
import EditCompanyInfo from '../../../Components/EditCompanyInfo';

class CompanyInformtationPage extends Component {
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
        this.getCompanyInformation();
    }

    getCompanyInformation = () => {
        const api = `http://localhost:5000/api/companyinformation`

        fetch(api)
            .then(res => res.json())
            .then(item => {this.setState({ companyInformation: item });})
    }

    addCompanyInformation = () => {
        const api = `http://localhost:5000/api/companyinformation`

        const options = {
            method: 'Post',
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
                province: this.state.province,
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
        this.addCompanyInformation();
    }

    render() {
        const { companyInformation, name, phone, email, adress, zipcode, city, country, province } = this.state;

        return (
            <Fragment>
                <AdminNavbar />
                <div>
                    <h1>Company information</h1>
                    {
                        companyInformation.length < 1
                            ? <Fragment>
                                <div className="forms-container">
                                    <p>Your company information is missing. to display your company information in the footer, enter the information down below</p>
                                    <form className="forms" onSubmit={this.handleSubmit}>
                                        <label>
                                            <p className="label">Enter company name:</p>
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="enter company name..."
                                                value={name}
                                                onChange={this.changeHandler}
                                            />
                                        </label>
                                        <label>
                                            <p className="label">Enter phone nr: </p>
                                            <input
                                                type="text"
                                                name="phone"
                                                placeholder="enter phone nr..."
                                                value={phone}
                                                onChange={this.changeHandler}
                                            />
                                        </label>
                                        <label>
                                            <p className="label">Enter email: </p>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="company@example.com..."
                                                value={email}
                                                onChange={this.changeHandler}
                                            />
                                        </label>
                                        <label>
                                            <p className="label">Enter adress: </p>
                                            <input
                                                type="text"
                                                name="adress"
                                                placeholder="enter adress..."
                                                value={adress}
                                                onChange={this.changeHandler}
                                            />
                                        </label>
                                        <label>
                                            <p className="label">Enter zipcode: </p>
                                            <input
                                                type="text"
                                                name="zipcode"
                                                placeholder="enter zipcode..."
                                                value={zipcode}
                                                onChange={this.changeHandler}
                                            />
                                        </label>
                                        <label>
                                            <p className="label">Enter city: </p>
                                            <input
                                                type="text"
                                                name="city"
                                                placeholder="enter city..."
                                                value={city}
                                                onChange={this.changeHandler}
                                            />
                                        </label>
                                        <label>
                                            <p className="label">Enter province: </p>
                                            <input
                                                type="text"
                                                name="province"
                                                placeholder="enter province..."
                                                value={province}
                                                onChange={this.changeHandler}
                                            />
                                        </label>
                                        <label>
                                            <p className="label">Enter country: </p>
                                            <input
                                                type="text"
                                                name="country"
                                                placeholder="enter contry..."
                                                value={country}
                                                onChange={this.changeHandler}
                                            />
                                        </label>
                                        <input className="submit" type="submit" value="Submit" />
                                    </form>
                                </div>
                            </Fragment>
                            : <Fragment>
                                <EditCompanyInfo companyInformation={companyInformation} id={companyInformation.id} />
                            </Fragment>
                    }

                </div>

            </Fragment>
        )
    }
}

export default CompanyInformtationPage;