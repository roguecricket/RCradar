import React, {Component, PropTypes} from 'react';
import PopOver from './popup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {LocalForm, Control, Errors} from 'react-redux-form';
import {isMobilePhone} from 'validator';

const isMobile = (str) => (str && isMobilePhone(str, 'en-IN'))
const isNotEmpty = (str) => (str && str != "")
const isNotLessThanToday = (str) => (str && (new Date(str) - new Date()) > 0)

class createForm extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (<LocalForm
          onSubmit={this.handleSubmit.bind(this)}>
              <PopOver isShowingModal={this.props.isShowingModal}
                     handleClose={this.props.handleClose}
                     title="New Tournaments"
                     successButton="Submit"
                     cancelButton="Cancel"
                     onCancel={this.props.onNewCancel}>
                    <label>Name of tournament *</label>
                    <Control.text model=".title"
                          validators={{isNotEmpty}}
                          controlProps={{errors: "Empty"}}/>
                    <Errors style={{color: 'red', textAlign: 'center'}}
                        model=".title"
                        messages={{
                          isNotEmpty: "Empty field"
                        }}
                      />
                    <label>Contact no *</label>
                    <Control.text model=".contact_no"
                                  validators={{isMobile}}
                                  controlProps={{errors: "Invalid Mobile"}}/>
                    <Errors style={{color: 'red', textAlign: 'center'}}
                        model=".contact_no"
                        messages={{
                          isMobile: "Not a valid number"
                        }}
                      />
                    <label>Event on *</label>
                    <Control.input type="date" 
                                   model=".starts_on"
                                   validators={{isNotLessThanToday}}/>
                     <Errors style={{color: 'red', textAlign: 'center'}}
                        model=".starts_on"
                        messages={{
                          isNotLessThanToday: "Date Invalid, Should be a day ahead from today."
                        }}
                      />

                    <label>Registration closes on *</label>
                    <Control.input type="date" model=".closes_on" validators={{isNotLessThanToday}}/>
                     <Errors style={{color: 'red', textAlign: 'center'}}
                        model=".closes_on"
                        messages={{
                          isNotLessThanToday: "Date Invalid, Should be a day ahead from today."
                        }}
                      />
                    <label>Address *</label>
                    <Control.textarea model=".address" validators={{isNotEmpty}}/>
                     <Errors style={{color: 'red', textAlign: 'center'}}
                        model=".address"
                        messages={{
                          isNotEmpty: "Please type a valid address."
                        }}
                      />
            </PopOver>
          </LocalForm>);
  }

  handleSubmit(e, data){
    console.log(e, data);
  }
}

export default createForm;
