import React, { Component, PropTypes }   from 'react';
import { bindActionCreators } from 'redux'
import { connect }            from 'react-redux';
import { Link }               from 'react-router';
import classNames from 'classnames';
import _ from 'lodash';

import ItemSelected from './items__selected';
import Page from './page';
import { ITEMS_PER_PAGE, numberWithCommas } from '../helpers/helper';

import { selectItem, checkSiteExist, fetchSite, fetchItems }   from '../actions/index';

import WrapperStyles          from '../../assets/styles/modules/_wrapper.css'
import ContentStyles          from '../../assets/styles/modules/_content.css'
import SectionStyles          from '../../assets/styles/modules/_page-section.css';
import SectionTitleStyles     from '../../assets/styles/modules/_section-title.css';
import RowStyles              from '../../assets/styles/modules/_row.css'
import PaginationStyles       from '../../assets/styles/modules/_pagination.css'

class ItemsIndex extends Component {
  static contextTypes = {
    router: PropTypes.object
  }
  constructor(props) {
    super(props);

    this.state = { site: '' };
  }

  componentDidMount() {
    this.fetchSiteItems(this.props.params.site);
  }

  componentWillReceiveProps({ params, items }) {
    if (this.state.site !== params.site) {
      this.setState({ site: params.site })
      this.fetchSiteItems(params.site);
      this.selectItem(null);
    }
  }

  fetchSiteItems(siteIndex) {
    this.props.checkSiteExist().then((res) => {
      if (!res) {
        alert('사이트가 존재하지 않습니다.');
        return this.context.router.push('/');
      } else {
        this.props.fetchSite({ siteIndex });
        this.props.fetchItems({ siteIndex });
      }
    })
  }


  selectItem(selectedItem) {
    this.props.selectItem(selectedItem);
  }

  renderSelectedItem() {
    return (
      <ItemSelected Item={this.props.Item} />
    );
  }

  onPageClick(page) {
    this.props.fetchItems({ siteIndex: this.state.site }, page);
  }

  renderItems() {
    let itemListHeader = [(
      <div
        key={'head'}
        className={classNames(
          RowStyles['row'],
          ContentStyles['content__item']
        )}
        onClick={() => this.selectItem(item)}>

        <div className={RowStyles['row__medium-3']}>
          <div className={ContentStyles['content__item--head']}>상품명</div>
        </div>

        <div className={RowStyles['row__medium-3']}>
          <div className={ContentStyles['content__item--head']}>카테고리</div>
        </div>

        <div className={RowStyles['row__medium-3']}>
          <div className={ContentStyles['content__item--head']}>옵션</div>
        </div>

        <div className={RowStyles['row__medium-3']}>
          <div className={ContentStyles['content__item--head']}>가격</div>
        </div>

      </div>
    )];
    let itemListBody = this.props.items.all.map((item) => {
      return (
        <div
          key={item._id}
          className={classNames(
            RowStyles['row'],
            ContentStyles['content__item'],
            ContentStyles['content__item--link']
          )}
          onClick={() => this.selectItem(item)}>

          <div className={RowStyles['row__medium-3']}>
            <div>{item.label}</div>
          </div>

          <div className={RowStyles['row__medium-3']}>
            <div>{item.category}</div>
          </div>

          <div className={RowStyles['row__medium-3']}>
            <div>사이즈: {item.size}</div>
            <div>색상: {item.color}</div>
          </div>

          <div className={RowStyles['row__medium-3']}>
            <div>{numberWithCommas(item.price)}</div>
          </div>

        </div>
      );
    });

    return _.concat(itemListHeader, itemListBody);
  }

  render() {
    return (
      <div>
        {
          this.props.wait ?
          <div className={WrapperStyles['wrapper']}>Data Loading...</div> :
          <div>
            <div className={SectionStyles['page-section']}>
              <div className={WrapperStyles['wrapper']}>
                <h2 className={classNames(
                  SectionTitleStyles['section-title'],
                  SectionTitleStyles['section-title--b-padding'])}>
                  상품관리
                </h2>
                <div className={ContentStyles['content']}>
                  <h2 className={ContentStyles['content__label']}>
                    쇼핑몰:

                    <span className={classNames(
                      ContentStyles['content__text'],
                      ContentStyles['content--l-margin']
                    )}>
                      {this.props.site.siteName}
                    </span>
                  </h2>
                </div>

                <div className={ContentStyles['content']}>
                  <h2 className={classNames(
                    ContentStyles['content__label'],
                    ContentStyles['content__label--b-padding']
                    )}>
                    상품

                    <span className={ContentStyles['content--l-margin']}>
                      <Link
                        to={`/items/new/${this.props.params.site}`}
                        className={ContentStyles['content__link']}>
                        새 상품 등록
                      </Link>
                    </span>
                  </h2>

                  { this.renderItems() }
                </div>

                <div className={ContentStyles['content']}>
                  <Page
                    page={this.props.items.page}
                    size={this.props.items.size}
                    SIZE={ITEMS_PER_PAGE}
                    onPageClick={this.onPageClick.bind(this)}/>
                </div>

              </div>
            </div>

            <div className={SectionStyles['page-section']}>
              <div className={WrapperStyles['wrapper']}>
                {
                  this.props.Item ?
                  this.renderSelectedItem() :
                  null
                }
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps (state) {
  let { current: { Site, Item, siteExist }, items, site: { site } } = state;

  if (!site && items.all.length === 0 && parseInt(items.size) === 0) {
    return { wait: true, items: null, site: null, Item, siteExist }
  } else {
    return { wait: false, items, site, Item, siteExist }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectItem, checkSiteExist, fetchSite, fetchItems }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsIndex);
