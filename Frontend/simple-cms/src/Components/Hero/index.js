import React, { Component } from 'react';

import './style.css'
import HeroImg from '../../images/Hero.jpg'

class Hero extends Component {
    render() {
        const { pageName, pages } = this.props

        return (
            <div className="hero-container" style={{ background: `url(${HeroImg})` }}>
                <div className="hero-item-container">
                    <h1>{pageName === undefined ? "Home" : pageName}</h1>
                    {
                        pages.filter(function (page) { return (pageName === undefined ? page.page_name === "Home" : page.page_name === pageName)}).map((page, key) =>
                            <p key={key}>{page.hero_text}</p>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default Hero;