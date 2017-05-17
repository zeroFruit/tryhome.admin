import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect }            from 'react-redux';
import { Link }               from 'react-router';
import classNames from 'classnames';

import { deleteItem, selectItem } from '../actions/index';

import SectionTitleStyles     from '../../assets/styles/modules/_section-title.css';
import RowStyles              from '../../assets/styles/modules/_row.css'
import ItemDetailStyles       from '../../assets/styles/modules/_item-detail.css'

const ITEM_DETAIL_OPTIONS = ['상품명', '카테고리', '가격', '사이즈', '색상'];

class ItemSelected extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {};
  }

  selectItem(selectedItem) {
    this.props.selectItem(selectedItem);
  }

  onClickEditItem(item) {
    //TODO: handling click event
  }

  onClickDeleteItem(item) {
    this.props.deleteItem(item);
    this.selectItem(null);
  }
  renderItemDetail(options) {
    return options.map(option => {
      return (
        <div key={option.key} className={ItemDetailStyles['item-detail__wrapper']}>
          <div className={RowStyles['row']}>
            <div className={classNames(
              RowStyles['row__medium-4'],
              ItemDetailStyles['item-detail__text'])}>
              {option.key}:
            </div>

            <div className={classNames(
              RowStyles['row__medium-8'],
              ItemDetailStyles['item-detail__label'])}>
              {option.value}
            </div>
          </div>
        </div>
      );
    })
  }
  render() {
    let item  = this.props.Item;
    let options = [
      { key: '상품명', value: item.label },
      { key: '카테고리', value: item.category },
      { key: '가격', value: item.price },
      { key: '사이즈', value: item.size },
      { key: '색상', value: item.color }
    ];
    return (
      <div className={ItemDetailStyles['item-detail']}>
        <h2 className={classNames(
          SectionTitleStyles['section-title'],
          SectionTitleStyles['section-title--small'],
          SectionTitleStyles['section-title--b-padding'])}>
          상품정보

          <span
            className={classNames(
              ItemDetailStyles['item-detail__link'],
              ItemDetailStyles['item-detail--l-margin']
            )}
            onClick={this.onClickEditItem.bind(this)}>
            edit
          </span>
          <span
            className={classNames(
              ItemDetailStyles['item-detail__link'],
              ItemDetailStyles['item-detail--l-margin']
            )}
            onClick={() => this.onClickDeleteItem(item)}>
            delete
          </span>
        </h2>

        <div className={RowStyles['row']}>
          <div className={RowStyles['row__medium-6']}>
            { this.renderItemDetail(options) }
          </div>

          <div className={RowStyles['row__medium-6']}>
            <img src={item.imgLink} className={ItemDetailStyles['item-detail__image']}/>
          </div>
        </div>

      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteItem, selectItem }, dispatch);
}

export default connect(null, mapDispatchToProps)(ItemSelected);
