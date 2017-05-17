import React, { Component } from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchOrderList } from '../actions/index';
import moment from 'moment';
import {
  ORDERS_PER_PAGE,
  pagination
} from '../helpers/helper';

import Page from './page';

import WrapperStyles          from '../../assets/styles/modules/_wrapper.css'
import ContentStyles          from '../../assets/styles/modules/_content.css'
import SectionStyles          from '../../assets/styles/modules/_page-section.css';
import SectionTitleStyles     from '../../assets/styles/modules/_section-title.css';
import RowStyles              from '../../assets/styles/modules/_row.css'
import OrderListStyles        from '../../assets/styles/modules/_order-list.css'
import PaginationStyles       from '../../assets/styles/modules/_pagination.css'

class SaleListIndex extends Component {
  constructor(props) {
    super(props);

    this.state = { page: 0, all: [], size: 0 };
  }
  componentDidMount() {
    this.props.fetchOrderList();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      page: nextProps.orders.page,
      all: nextProps.orders.all,
      size: nextProps.orders.size
    });
  }

  onPageClick(page) {
    this.props.fetchOrderList(page);
  }

  renderOrderItems(orders) {
    let orderListHeader = [(
      <div
        key="header"
        className={classNames(
            RowStyles['row'],
            ContentStyles['content__item'])}>
        <div className={RowStyles['row__medium-3']}>
          <div className={ContentStyles['content__item--head']}>사이트 인덱스 / 상품명</div>
        </div>

        <div className={RowStyles['row__medium-3']}>
          <div className={ContentStyles['content__item--head']}>수량</div>
        </div>

        <div className={RowStyles['row__medium-3']}>
          <div className={ContentStyles['content__item--head']}>옵션</div>
        </div>

        <div className={RowStyles['row__medium-3']}>
          <div className={ContentStyles['content__item--head']}>가격</div>
        </div>
      </div>
    )];
    let orderListBody = orders.map(order => {
      let { label, color, size, price, category, count, siteIndex } = order;
      return (
        <div
          key={order._id}
          className={classNames(
              RowStyles['row'],
              ContentStyles['content__item'])}>
          <div className={RowStyles['row__medium-3']}>
            <div>{ siteIndex }</div>
            <div>{ label }</div>
          </div>

          <div className={RowStyles['row__medium-3']}>
            <div>{ count }</div>
          </div>

          <div className={RowStyles['row__medium-3']}>
            <div>사이즈: { size }</div>
            <div>색상: { color }</div>
            <div>카테고리: { category }</div>
          </div>

          <div className={RowStyles['row__medium-3']}>
            <div>{ price }</div>
          </div>
        </div>
      );
    });

    return _.concat(orderListHeader, orderListBody);
  }

  renderOrderList() {
    return this.state.all.map(order => {
      let { orderId, customer, orders } = order;

      return (
        <div
          key={orderId}
          className={OrderListStyles['order-list']}>
          <div className={OrderListStyles['order-list__order-id']}>
            주문번호: { orderId }
            <span className={OrderListStyles['order-list__order-date']}> {moment(order.date).format('YYYY-MM-DD HH:mm:ss')}</span>
          </div>
          <div className={OrderListStyles['order-list__order-id']}>
            고객정보: 
            <span className={OrderListStyles['order-list__customer-info']}>
              { customer[0].name }, { customer[0].phonenumber }, { customer[0].email }, { customer[0].address }
            </span>
          </div>
          <div>
            { this.renderOrderItems(orders) }
          </div>
        </div>

      );
    })
  }

  render() {
    return (
      <div>
        <div className={SectionStyles['page-section']}>
          <div className={WrapperStyles['wrapper']}>
            <h2 className={classNames(
              SectionTitleStyles['section-title'],
              SectionTitleStyles['section-title--b-padding'])}>
              주문정보
            </h2>

            <div className={classNames(
              ContentStyles['content'],
              ContentStyles['content--b-more-padding'])}>
              {
                this.state.all.length !== 0 ?
                this.renderOrderList() :
                '주문 정보가 없습니다.'
              }
            </div>

            <div className={ContentStyles['content']}>
              <Page page={this.state.page} size={this.state.size} SIZE={ORDERS_PER_PAGE} onPageClick={this.onPageClick.bind(this)}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchOrderList }, dispatch);
}

function mapStateToProps(state) {
  let { orders } = state;
  return { orders };
}

export default connect(mapStateToProps, mapDispatchToProps)(SaleListIndex);
