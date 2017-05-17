import React, { Component } from 'react';
import { pagination } from '../helpers/helper';

import PaginationStyles       from '../../assets/styles/modules/_pagination.css'

class Page extends Component {
  render() {
    let _page = this.props.page;
    let addone = this.props.size % this.props.SIZE === 0 ? 0 : 1;
    let max = parseInt(this.props.size / this.props.SIZE) + addone;
    let pages = pagination(_page, max);

    return (
      <ul className={PaginationStyles['pagination']}>
        {
          pages.map(page => {
            return (
              <li
                key={page}
                onClick={() => this.props.onPageClick(page)}
                className={
                  parseInt(_page) === parseInt(page) ?
                  PaginationStyles['pagination__active'] :
                  ''}>
                {parseInt(page)+1}
              </li>
            );
          })
        }
      </ul>
    )
  }
}

export default Page;

// renderPage() {
//   let _page = this.state.page;
//   let max = parseInt(this.state.size / ORDERS_PER_PAGE);
//   let pages = pagination(_page, max);
//
//   return pages.map(page => {
//     return (
//       <li
//         key={page}
//         onClick={() => this.onPageClick(page)}
//         className={
//           parseInt(_page) === parseInt(page) ?
//           PaginationStyles['pagination__active'] :
//           ''}>
//         {parseInt(page)+1}
//       </li>
//     );
//   });
// }
