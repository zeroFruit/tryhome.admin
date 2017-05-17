import _keys  from 'lodash/keys';
import _map   from 'lodash/map';
import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { cstr2arr } from '../helpers/helper';
import { editSite } from '../actions/index';

import SectionTitleStyles     from '../../assets/styles/modules/_section-title.css';
import RowStyles              from '../../assets/styles/modules/_row.css'
import SectionStyles          from '../../assets/styles/modules/_page-section.css';
import WrapperStyles          from '../../assets/styles/modules/_wrapper.css';
import BtnStyles              from '../../assets/styles/modules/_btn.css';
import SiteFormStyles         from '../../assets/styles/modules/_site-form.css';

const FieldFactory = (tag, label, type) => {
  return {tag, label, type};
}

const FIELDS = {
  siteName: FieldFactory('input', '사이트명', 'text'),
  categories: FieldFactory('input', '카테고리', 'text')
}

class SitesEdit extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = { siteName: '', categories: '' };
  }
  onSubmit(props) {
    this.props.editSite({siteIndex: this.props.params.site, ...props });
    alert('성공적으로 수정했습니다.');
    this.context.router.push(`/sites/${this.props.params.site}`);
  }

  onInputChange(term, field) {
    this.setState({[field]: term});
  }

  renderField(fieldConfig, field) {
    const fieldHelper = this.props.fields[field];

    return (
      <div key={field} className={RowStyles['row']}>
        <div className={classNames(
          RowStyles['row__medium-4'],
          SiteFormStyles['site-form'],
          SiteFormStyles['site-form--more-l-padding'])}>
          {fieldConfig.label}
        </div>
        <div className={classNames(
          RowStyles['row__medium-8'],
          SiteFormStyles['site-form'])}>
          <fieldConfig.tag type={fieldConfig.type} className={SiteFormStyles['site-form__input']} {...fieldHelper} />
          <div className={SiteFormStyles['site-form__caution']}>
            {
              field === 'categories' ?
              <div>
                <p>카테고리 간의 구분은 ,(반점)으로 해주세요. (ex: 상의, 하의, 아우터)</p>
                <p>카테고리는 6개가 입력되어야 합니다.</p>
              </div>
              : null
            }
          </div>
          <div className={SiteFormStyles['site-form__error']}>
            <p>{fieldHelper.touched && fieldHelper.invalid ? fieldHelper.error : ''}</p>
          </div>
        </div>

      </div>
    )
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className={SectionStyles['page-section']}>
        <div className={WrapperStyles['wrapper']}>
          <h2 className={classNames(
            SectionTitleStyles['section-title'],
            SectionTitleStyles['section-title--b-padding'])}>
            사이트 수정
          </h2>

          <form onSubmit={handleSubmit(props => this.onSubmit(props))}>
            { _map(FIELDS, this.renderField.bind(this)) }

            <input
              type="submit"
              value="변경"
              className={classNames(
                BtnStyles['btn__submit'],
                BtnStyles['btn--t-margin'])} />
          </form>

        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.siteName) {
    errors.siteName = '사이트 이름을 입력해주세요.';
  }
  if (!values.categories) {
    errors.categories = '카테고리를 입력해주세요.';
  } else if (cstr2arr(values.categories).length !== 6) {
    errors.categories = '카테고리 수는 6개가 되어야합니다.';
  }

  return errors;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ editSite }, dispatch);
}

export default reduxForm({
  form: 'SitesEdit',
  fields: _keys(FIELDS),
  validate
}, null, mapDispatchToProps)(SitesEdit);
