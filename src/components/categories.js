import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import { selectSite } from '../actions/index';

import CategoriesStyles from '../../assets/styles/modules/_categories.css';

class Categories extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.onSiteClick = this.onSiteClick.bind(this);
  }

  onSiteClick(siteIndex) {
    this.context.router.push(`/${this.props.path}/${siteIndex}`);
    this.props.selectSite(siteIndex);
  }

  render() {
    return (
      <span className={CategoriesStyles['categories']}>
        <span className={CategoriesStyles['categories__single']}
          key={this.props.siteIndex.A_SITE}
          onClick={() => this.onSiteClick(this.props.siteIndex.A_SITE)}>
          A Site
        </span>
        <span className={CategoriesStyles['categories__single']}
          key={this.props.siteIndex.B_SITE}
          onClick={() => this.onSiteClick(this.props.siteIndex.B_SITE)}>
          B Site
        </span>
      </span>
    );
  }
}

function mapStateToProps (state) {
  return {
    siteIndex: state.siteIndex
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ selectSite }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
