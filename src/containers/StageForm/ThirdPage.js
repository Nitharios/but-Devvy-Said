import React from 'react';
import { Field, reduxForm } from 'redux-form';
import formField from '../../components/formfield.component';
import validate from '../../components/validate.component';

const ThirdPage = props => {
  const { handleSubmit, pristine, previousPage, submitting } = props;

  return (
    <form onSubmit={ handleSubmit }>
      <div> 
        <div>Note</div>
        <Field 
          component="textarea" 
          label="Note"
          name="note" 
          placeholder="Add your notes here"
          type="text" />
        <div>Example</div>
        <Field
          component="textarea" 
          label="Example"
          name="example" 
          placeholder="Add your example here" 
          type="text" />
        <Field 
          component={ formField } 
          label="Link"
          name="link" 
          placeholder="Add your link here"
          type="text" />
      </div>
      <div>
        <input 
          disabled={ pristine || submitting }
          type="submit" 
          value="Submit" />
        <input 
          type="button" 
          onClick={ previousPage } 
          value="Back" />
      </div>
    </form>
  );
};

export default reduxForm({
  form : 'stageform',               
  destroyOnUnmount : false,       
  forceUnregisterOnUnmount : true, 
  validate,
})(ThirdPage);