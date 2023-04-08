import React from 'react';
import {connect} from 'react-redux';
import './add-new-surveys-forms.styles.scss';
import FormInput from '../../custum-component/form-input/form-input.component';
import {selectUserCredits, selectUserFormData} from '../../../store/authReducers/auth.selector';
import StripeCheckout from '../../stripe-checkout/Stripe-checkout.component';
import ErrorCompoennt from '../../custum-component/error/error.component' ;
import {addSurveyFormDataToReducer} from '../../../store/authReducers/auth.action'


const AddNewSurveysForm = ({userCredit, userFormData, saveData}) => {
  const defaultFormValue = {
    title           :   '',
    subject         :   '',
    body            :   '',
    recipientList   : []
  }
  const [formValue , setFormValue] = React.useState( userFormData? userFormData:defaultFormValue);
  // const []
  const onFormValueChange = (event) =>{
    const {name, value} = event.target;
    setFormValue({...formValue, [`${name}`]: value })
  }
  const formatRecipientList =(recipientList) =>{
    return  String(recipientList).split(',').map(eachRecipeint => eachRecipeint.trim());
  }
  const onFormSubmmit =(event) => {
    event.preventDefault();
    let data = formValue;
    data.recipientList = formatRecipientList(formValue.recipientList)
    saveData(data);
       
  }
  const {title, subject, body, recipientList} = formValue;
  if(userCredit === 0){
    return  <div className ='new-form-error-container'>
      <ErrorCompoennt message = ' You dont have enough credit to generate new survey '/>
      <StripeCheckout> 
        <div className ='add-credit-form'>  
                        Add Credit
        </div> 
      </StripeCheckout>
      <div className='test-card-details-container'>  
        <div style={{borderBottom: '5px solid black', marginBottom: '20px'}}>TEST CARD DETAILS</div>  
        <div className='each-test-key'> <span>Test card number</span>  <span style={{width: '50%'}}>4242 4242 4242 4242</span>  </div>
        <div className='each-test-key'> <span>Month/year</span>        <span style={{width: '50%'}}>10/22</span>                 </div>
        <div className='each-test-key'> <span>CVV </span>              <span style={{width: '50%'}}>123</span></div>
      </div>               
    </div>
  }
  return (
    <div className='add-new-survey-form-container'>
      <div className='form-container'>
        <div className='form-header'>Please fill out following surveys details </div>
        <form onSubmit={onFormSubmmit}> 
          <FormInput 
            type  ='text'
            name  ='title'
            label ='Title'
            value = {title}
            required
            handleChange ={onFormValueChange}
          />
          <FormInput 
            type  ='text'
            name  ='subject'
            label ='Subject of the mail'
            value = {subject}
            required
            handleChange ={onFormValueChange}
          />
          <FormInput 
            type  ='text'
            name  ='body'
            label ='Body of the mail'
            value = {body}
            required
            handleChange ={onFormValueChange}
          />
          <FormInput 
            type  ='text'
            name  ='recipientList'
            label ='Comma seprated recipient  eamil address list'
            value = {recipientList}
            required
            handleChange ={onFormValueChange}
          />
          <div className = 'submit-button-container'>
            {/* <button className ='button'><Link to ='/surveys'>  Cancel </Link></button> */}
            <button className ='button' type='submit'> submit </button>
          </div>
        </form>
      </div>
    </div>

  )
    
}
const mapStateToProps = state => ({
  userCredit      : selectUserCredits(state),
  userFormData    : selectUserFormData(state) 
});
const mapDispatchToProps = dispatch => ({
  saveData: (formData)=> dispatch(addSurveyFormDataToReducer(formData))
})
export default connect(mapStateToProps, mapDispatchToProps)(AddNewSurveysForm);