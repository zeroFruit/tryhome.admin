import React, { Component } from 'react';

import Menu from './menu';

import HeroStyles from '../../assets/styles/modules/_large-hero.css';
import WrapperStyles from '../../assets/styles/modules/_wrapper.css';
import headerImg from '../../assets/images/header.jpg';

class Header extends Component {
  render() {
    return (
      <div>
        <div className={HeroStyles['large-hero']}>
          <div className={WrapperStyles['wrapper']}>
            <picture>

            </picture>
          </div>
        </div>

        <Menu />
      </div>
    )
  }
}

export default Header;

//<img srcSet={`${headerImg} 1920w`} className={HeroStyles['large-hero__image']} />
