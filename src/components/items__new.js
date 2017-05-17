import _map                      from 'lodash/map';
import _keys                     from 'lodash/keys';
import _forOwn                   from 'lodash/forOwn';
import React, { Component, PropTypes }   from 'react';
import { reduxForm }          from 'redux-form';
import Dropzone               from 'react-dropzone';
import { Link }               from 'react-router';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import { createItem, urlRedirected } from '../actions/index';

import SectionTitleStyles     from '../../assets/styles/modules/_section-title.css';
import RowStyles              from '../../assets/styles/modules/_row.css'
import SectionStyles          from '../../assets/styles/modules/_page-section.css';
import WrapperStyles          from '../../assets/styles/modules/_wrapper.css';
import ItemFormStyles         from '../../assets/styles/modules/_item-form.css';
import BtnStyles              from '../../assets/styles/modules/_btn.css';
import DropzoneStyles         from '../../assets/styles/modules/_dropzone.css';

const FILE_CONFIG = {
  type: 'file',
  accept: '.png,.jpeg'
};

const SELECT_CONFIG = {
  type: 'Select',
  options: []
};

const FieldFactory = (tag, label, type) => {
  return { tag, label, type };
}
const FIELDS = {
  label:    FieldFactory('input', '상품명', 'text'),
  price:    FieldFactory('input', '가격', 'text'),
  size:     FieldFactory('input', '사이즈', 'text'),
  color:    FieldFactory('input', '색상', 'text'),
  desc:     FieldFactory('input', '제품상세 이미지', FILE_CONFIG.type),
  category: FieldFactory('Select', '카테고리', 'Select')
};

class ItemsNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = { files: [], rejectedFiles: [], category: '' , categories: []};

    this.onSelectChange = this.onSelectChange.bind(this);
  }

  componentWillMount() {
    let categories = this.props.site.categories.map(category => {
      return { key: category, value: category, label: category };
    })
    this.setState({ categories, category: categories[0].value });
  }

  componentDidUpdate() {
    if (this.props.redirect === true) {
      this.context.router.push(`/items/${this.props.params.site}`);
    }
  }

  componentWillUnmount() {
    this.props.urlRedirected({ redirect: false });
  }

  onSubmit(formProps) {
    let formData = new FormData();

    _forOwn(formProps, (value, key) => {
      formData.append(key, value);
    });
    formData.append('siteIndex', this.props.params.site);
    formData.append('desc', this.state.files[0]);
    formData.append('category', this.state.category);
    this.props.createItem(formData);
  }

  onDrop (acceptedFiles, rejectedFiles) {
    this.setState({
      rejectedFiles,
      files: acceptedFiles
    });
  }

  onOpenClick () {
    this.dropzone.open();
  }

  onSelectChange(event) {
    this.setState({category: event.target.value});
  }

  renderOptions() {
    return this.state.categories.map(option => {
      return (
        <option key={option.key} value={option.value}>
          { option.label }
        </option>
      )
    })
  }

  renderField(fieldConfig, field) {
    const fieldHelper = this.props.fields[field];

    if (fieldConfig.type === FILE_CONFIG.type) {
      return (
        <div key={field} className={RowStyles['row']}>
          <div className={classNames(
            RowStyles['row__medium-4'],
            ItemFormStyles['item-form'],
            ItemFormStyles['item-form--more-l-padding'])}>
            {fieldConfig.label}
          </div>
          <div className={classNames(
            RowStyles['row__medium-8'],
            ItemFormStyles['item-form'])}>
            <Dropzone
              key={field}
              accept="image/jpeg,image/png,immage/svg"
              ref={(node) => {this.dropzone = node }}
              onDrop={this.onDrop.bind(this)}
              className={DropzoneStyles['dropzone']}>
              <div className={DropzoneStyles['dropzone__placeholder']}>
                <p>이미지를 드래그하거나 클릭해서 업로드해주세요.</p>
                <p>*.jpeg, *.png, *.svg 이미지만 업로드 가능합니다.</p>
                {
                  this.state.rejectedFiles.length !== 0 ?
                  <p className={DropzoneStyles['dropzone__caution']}>업로드가 불가능한 파일을 올려놓았습니다.</p>
                  : null
                }
                {
                  this.state.files.length !== 0 ?
                  <p className={DropzoneStyles['dropzone__uploaded']}>{this.state.files[0].name}</p> : null
                }
              </div>
            </Dropzone>
          </div>
        </div>
      );
    } else if (fieldConfig.type === SELECT_CONFIG.type) {
      return (
        <div key={field} className={RowStyles['row']}>
          <div className={classNames(
            RowStyles['row__medium-4'],
            ItemFormStyles['item-form'],
            ItemFormStyles['item-form--more-l-padding'])}>
            카테고리
          </div>
          <div className={classNames(
            RowStyles['row__medium-8'],
            ItemFormStyles['item-form'])}>
            <select
              key={field}
              value={this.state.category}
              onChange={this.onSelectChange}
              className={ItemFormStyles['item-form__select']}>
              { this.renderOptions() }
            </select>
          </div>
        </div>

      );
    } else {
      return (
        <div key={field} className={RowStyles['row']}>
          <div className={classNames(
            RowStyles['row__medium-4'],
            ItemFormStyles['item-form'],
            ItemFormStyles['item-form--more-l-padding']
          )}>
            {fieldConfig.label}
          </div>
          <div className={classNames(
            RowStyles['row__medium-8'],
            ItemFormStyles['item-form'])}>
            <fieldConfig.tag type={fieldConfig.type} autoComplete="off" className={ItemFormStyles['item-form__input']} {...fieldHelper} />
            <div className={ItemFormStyles['item-form__caution']}>
              {
                field === 'size' ?
                '사이즈 간의 구분은 ,(반점)으로 해주세요. (ex: s, m, l)': null
              }
              {
                field === 'color' ?
                '색상 간의 구분은 ,(반점)으로 해주세요. (ex: 빨강, 파랑, 노랑)': null
              }
            </div>
            <div className={ItemFormStyles['item-form__error']}>
              <p>{ fieldHelper.invalid }</p>
              <p>{ fieldHelper.touched && fieldHelper.invalid ? fieldHelper.error : '' }</p>
            </div>
          </div>
        </div>
      );
    }

  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className={SectionStyles['page-section']}>
        <div className={WrapperStyles['wrapper']}>
          <h2 className={classNames(
            SectionTitleStyles['section-title'],
            SectionTitleStyles['section-title--b-padding'])}>
            상품추가
          </h2>

          <form onSubmit={handleSubmit(props => this.onSubmit(props))} >
            { _map(FIELDS, this.renderField.bind(this)) }

            <input
              type="submit"
              value="등록"
              className={classNames(
                BtnStyles['btn__submit'],
                BtnStyles['btn--t-margin'])} />
          </form>
        </div>
      </div>

    )
  }
}

function validate (values) {
  const errors = {};

  if (!values.label) {
    errors.label = '상품명을 입력해주세요.';
  }
  if(!Number.isInteger(parseInt(values.price))) {
    errors.price = '가격은 숫자이어야 합니다.';
  }
  if(!values.price) {
    errors.price = '가격을 입력해주세요.';
  }
  if(!values.color) {
    errors.color = '색상을 입력해주세요.';
  }
  if(!values.size) {
    errors.size = '사이즈를 입력해주세요.'
  }

  return errors;
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createItem, urlRedirected }, dispatch);
}

function mapStateToProps(state) {
  let { current: { redirect }, site: { site } } = state;

  return { redirect, site };
}

export default reduxForm({
  form: 'ItemsNew',
  fields: _keys(FIELDS),
  validate
}, mapStateToProps, mapDispatchToProps)(ItemsNew);
