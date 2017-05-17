import _                      from 'lodash';
import React, { Component }   from 'react';
import { reduxForm }          from 'redux-form';

class ItemsEdit extends Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <h3>Items Edit Page {this.props.params.site}</h3>
        <form onSubmit={handleSubmit(props => this.onSubmit(props))} >
          { _.map(FIELDS, this.renderField.bind(this)) }
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

// function mapStateToProps (state) {
//   let { current: { Item }} = state;
//
//   return {
//     Item
//   }
// }

export default ItemsEdit;
