import React from 'react';
import './index.css';
import {TextField, Button, Checkbox} from '@material-ui/core';
import {addNewReminder} from '../api'
import ReminderList from '../reminderlist'
import Nav from '../nav'
import Modal from '../modal'
import SnackBar from '../snackbar';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


class AppContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      titleFieldValue: "",
      descriptionFieldValue: "",
      checkboxChecked: false,
      selectValue: "",
      snackbarVariant: "error",
      snackbarMessage: "",
      showSnackBar: false,
      reminderCount: 0,

      selectedReminder: {
        title: "",
        description: "",
        on: false,
        time: ""
      },
      showModal: false,
      showModalType: ""
    };
  }

  updateModal = (obj, val) => {
    console.log(val);
    this.setState({showModal: !this.state.showModal, showModalType: "edit", selectedReminder: obj, selectedKey: val});
  }

  logout = () =>{
    this.props.logout();
  }

  updateReminderCount = (val) => {
    this.setState({reminderCount: val});
  }

  updateShow = (val) =>{
    this.setState({showSnackBar: val});
  }

  addReminder = () => {
    var field1 = (!this.state.titleFieldValue || this.state.titleFieldValue.length === 0 || /^\s*$/.test(this.state.titleFieldValue));
    var field2 = (!this.state.descriptionFieldValue || this.state.descriptionFieldValue.length === 0 || /^\s*$/.test(this.state.descriptionFieldValue));
    if (field1 && field2){
      this.setState({showSnackBar: true, snackbarVariant: "error", snackbarMessage: "The title and the description of the reminder cannot be empty and cannot contain only spaces."});
    }
    else if (field1){
      this.setState({showSnackBar: true, snackbarVariant: "error", snackbarMessage: "The title of the reminder cannot be empty and cannot contain only spaces."});
    }
    else if (field2){
      this.setState({showSnackBar: true, snackbarVariant: "error", snackbarMessage: "The description of the reminder cannot be empty and cannot contain only spaces."});
    }

    if (!field1 && !field2){
      addNewReminder(this.state.titleFieldValue, this.state.descriptionFieldValue, this.state.checkboxChecked, this.state.selectValue);
      this.setState({titleFieldValue: "",  descriptionFieldValue: "", checkboxChecked: false, selectValue: ""});
      this.setState({showSnackBar: true, snackbarVariant: "success", snackbarMessage: "Your new reminder was successfully added!"});
    }
  }

  displaySnack = (val, mes) =>{
    this.setState({showSnackBar: true, snackbarVariant: val, snackbarMessage: mes});
  }

  showModal = () =>{
    if (this.state.showModal && this.state.showModalType === "new"){
      return (
        <Modal addReminder={this.addReminder} showModalType={this.state.showModalType} displaySnack={this.displaySnack} selectedKey={this.state.selectedKey} description={this.state.selectedReminder.description} title={this.state.selectedReminder.title} on={this.state.selectedReminder.on} time={this.state.selectedReminder.time} updateModal={this.updateModal} show={this.state.showModal}/>
      );
    }
    else if (this.state.showModal && this.state.showModalType === "edit"){
      return (
        <Modal showModalType={this.state.showModalType} addReminder={this.addReminder} displaySnack={this.displaySnack} selectedKey={this.state.selectedKey} description={this.state.selectedReminder.description} title={this.state.selectedReminder.title} on={this.state.selectedReminder.on} time={this.state.selectedReminder.time} updateModal={this.updateModal} show={this.state.showModal}/>
      );
    }
  }


  render(){
    return (
      <div className="appContainer">
        <Nav reminderCount={this.state.reminderCount} logout={this.logout}/>
        <Fab color="secondary" aria-label="Add" className="topBtn" onClick={() => this.setState({showModal: !this.state.showModal, showModalType: "new"})}>
          <AddIcon />
        </Fab>
        <div className="column">
          <div className="column">
            <ReminderList displaySnack={this.displaySnack} updateModal={this.updateModal} updateReminderCount={this.updateReminderCount}/>
          </div>
        </div>

        <SnackBar anchor={{vertical: 'bottom',horizontal: 'left'}} updateShow={this.updateShow} show={this.state.showSnackBar} variant={this.state.snackbarVariant} message={this.state.snackbarMessage} timeLength={2000}/>
        {this.showModal()}
      </div>
    );
  }
}

export default AppContainer;
