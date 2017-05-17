import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

import Categories from './categories';

import WrapperStyles          from '../../assets/styles/modules/_wrapper.css'
import FeatureStyles          from '../../assets/styles/modules/_feature-item.css'
import SectionStyles          from '../../assets/styles/modules/_page-section.css';

export default class Menu extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  onItemManagerBtnClick() {
    this.context.router.push('/')
  }

  renderMenu(titleText, path) {
    return (
      <div className={classNames(
          FeatureStyles['feature-item__title']
          )}>
          { titleText }

          <Categories path={path}/>
      </div>
    )
  }

  renderOrderMenu(titleText) {
    return (
      <div
        className={classNames(
          FeatureStyles['feature-item__title'],
          FeatureStyles['feature-item__title--pointer']
        )}
        onClick={() => this.context.router.push('/salelist')}>
          { titleText }
      </div>
    )
  }
  render() {
    return (
      <div>
        <div className={classNames(
          SectionStyles['page-section'],
          SectionStyles['page-section--less-padding']
          )}>
          <div className={WrapperStyles['wrapper']}>
            { this.renderOrderMenu('주문내역관리') }

            { this.renderMenu('상품관리', 'items') }

            { this.renderMenu('사이트관리', 'sites') }
          </div>
        </div>
      </div>
    );
  }
}
