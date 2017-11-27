import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from '../../components/formValidation';

const types = ['Note', 'Example', 'link' , 'All 3'];

const renderTypeSelector = ({ input, meta: { touched, error } }) => (
  <div>
    <select {...input}>
      <option value="">Select a type of Note</option>
      {types.map(val => <option value={val} key={val}>{val}</option>)}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
);

const ThirdPage = props => {
  console.log('ThirdPage render');
  console.log(props, '<-----3rd Page Props!!!!!!');
  const { handleSubmit, pristine, previousPage, submitting } = props;
console.log(handleSubmit,"HANDLESUBMIT 3rd PAGE")
console.log(pristine,"PRITINE 3rd PAGE")
console.log(submitting,"SUBMITTING 3rd PAGE prop")

  return (
    <form onSubmit={this.handleSubmit}>
      <div>
        <label>types</label>
        <Field name="note-type" component={renderTypeSelector} />
      </div>
      <div>
        <label htmlFor="devleague-student">Devleague Student?</label>
        <div>
          <Field 
            value="Yes"
            name="student-yes"
            id="student"
            component="input"
            type="checkbox"
          /> Yes
          <Field
            value='No'
            name="student-no"
            id="student"
            component="input"
            type="checkbox"
          /> No
        </div>
      </div>
      <div>
        <label>Notes</label>
        <div>
          <Field name="notes" component="textarea" placeholder="Notes" />
        </div>
        <label>Examples</label>
        <div>
          <Field name="Examples" component="textarea" placeholder="Examples" />
        </div>
        <label>Link</label> - one link only
        <div>
          <Field name="Links" component="textarea" placeholder="Links" />
        </div>
      </div>
      <div>
        <button type="button" className="previous" onClick={previousPage} >
          Previous
        </button>
        <button type="submit" disabled={ pristine || submitting }>
          Submit
        </button>
      </div>
    </form>
  );
};
export default reduxForm({
  form: 'stageform',               
  destroyOnUnmount: false,       
  forceUnregisterOnUnmount: true, 
  validate,
})(ThirdPage);
