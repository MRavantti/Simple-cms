import React, { Component, Fragment } from 'react';

import './style.css';


class Footer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            companyInformation: [],
        }
    }
    componentDidMount() {
        this.getCompanyInformation();
    }

    getCompanyInformation = () => {
        const api = `http://localhost:5000/api/companyinformation`

        fetch(api)
            .then(res => res.json())
            .then(item => { this.setState({ companyInformation: item }); })
    }

    render() {
        const { companyInformation } = this.state
        return (
            <div className="footer">
                {
                    companyInformation.map((info, key) =>
                        <div key={key} className="footer-item-container">
                            <div className="footer-left">
                                <p className="company-name">{info.name}</p>
                                <div className="footer-line" />
                                <p>{info.phone}</p>
                                <p>{info.email}</p>
                            </div>
                            <div className="footer-right">
                                <p>{info.adress}</p>
                                <p>{info.zipcode} {info.city}</p>
                                <p>{info.province}</p>
                                <p>{info.country}</p>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Footer;