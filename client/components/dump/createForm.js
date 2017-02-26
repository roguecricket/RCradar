import React, {Component, PropTypes} from 'react';
import PopOver from './popup';
import {
  TextInput
} from 'belle';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


class createForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      title: '',
      contact_no: '',
      starts_on: '',
      closes_on: '',
      address: '',
      duration: 1
    }
  }

  render(){
    return (<PopOver isShowingModal={this.props.isShowingModal}
                     handleClose={this.props.handleClose}
                     title="New Tournaments"
                     successButton="Submit"
                     cancelButton="Cancel"
                     onOk={this.handleOk.bind(this)}
                     onCancel={this.props.onNewCancel}>

                    <TextInput  placeholder="Tournament name" value={this.state.title} onUpdate={(v) => {this.setState({title: v.value})}}/>
                    <TextInput  placeholder="Contact number"  value={this.state.contact_no} onUpdate={(v) => {this.setState({contact_no: v.value})}}/>
                    <DatePicker placeholderText="Event date" selected={this.state.starts_on}
                                                             customInput={<TextInput />}
                                                             onChange={(d) => {this.setState({starts_on: d})} }/>
                    <DatePicker placeholderText="Last Register" selected={this.state.closes_on}
                                                                customInput={<TextInput />}
                                                                onChange={(d) => {this.setState({closes_on: d})} }/>
                    <TextInput  placeholder="Address"
                                value={this.state.address} onUpdate={(v) => {this.setState({address: v.value})}}
                                allowNewLine/>
            </PopOver>);
  }

  handleOk(){
    let state = this.state;
    state = {...state, starts_on: state.starts_on.toDate().getTime(),
                       closes_on: state.closes_on.toDate().getTime()}
    console.log(state);
    this.props.onNew(state).then((err) => {
      this.reset();
    });
  }

  reset(){
    this.setState({
      title: '',
      contact_no: '',
      starts_on: '',
      closes_on: '',
      address: '',
      duration: 1
    })
  }

}

export default createForm;
