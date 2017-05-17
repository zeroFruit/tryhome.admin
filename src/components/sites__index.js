import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames';

import Msg from '../message';

import WrapperStyles          from '../../assets/styles/modules/_wrapper.css'
import SectionStyles          from '../../assets/styles/modules/_page-section.css';
import SectionTitleStyles     from '../../assets/styles/modules/_section-title.css';
import RowStyles              from '../../assets/styles/modules/_row.css'
import ItemDetailStyles       from '../../assets/styles/modules/_item-detail.css';
import ContentStyles          from '../../assets/styles/modules/_content.css'

class SitesIndex extends Component {
  static contextTypes = {
    router: PropTypes.object
  }
  onEditBtnClick() {
    this.context.router.push(`/sites/edit/${this.props.params.site}`)
  }
  render() {
    return (
      <div className={SectionStyles['page-section']}>
        <div className={WrapperStyles['wrapper']}>
          <h2 className={classNames(
            SectionTitleStyles['section-title'],
            SectionTitleStyles['section-title--small'],
            SectionTitleStyles['section-title--b-padding'])}>
            사이트관리

            <span
              className={classNames(
                ItemDetailStyles['item-detail__link'],
                ItemDetailStyles['item-detail--cursor-pointer'],
                ItemDetailStyles['item-detail--l-margin']
              )}
              onClick={this.onEditBtnClick.bind(this)}>
              edit
            </span>
          </h2>

          { this.renderSite() }
        </div>
      </div>
    );
  }

  renderCategories(categories) {
    let str = '';
    categories.map(category => {
      str += `${category}, `;
    });

    return str.substring(0, str.length-2);
  }

  renderSite() {
    if (!this.props.site) {
      return <div>Site not exist</div>
    } else {
      return (
        <div>
          <div className={ContentStyles['content']}>
            <h2 className={ContentStyles['content__label']}>
              사이트명:

              <span className={classNames(
                ContentStyles['content__text'],
                ContentStyles['content--l-margin']
              )}>
                {this.props.site.siteName}
              </span>
            </h2>
          </div>

          <div className={ContentStyles['content']}>
            <h2 className={ContentStyles['content__label']}>
              카테고리:

              <span className={classNames(
                ContentStyles['content__text'],
                ContentStyles['content--l-margin']
              )}>
                { this.renderCategories(this.props.site.categories) }
              </span>
            </h2>
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps (state) {
  let { current: { siteExist }, site: { site } } = state;

  return {
    siteExist,
    site
  }
}

export default connect(mapStateToProps, null)(SitesIndex);
