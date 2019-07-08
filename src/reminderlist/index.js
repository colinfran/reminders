import React from 'react';
import './index.css';
import * as firebase from 'firebase/app';
import Reminder from '../reminder'
import CircularProgress from '@material-ui/core/CircularProgress';


class ReminderList extends React.Component {
  constructor(props){
    super(props);
    this.state={
      dataObj: {},
      loading: true
    }
  }

  componentWillMount(){
    var that = this;
    var ref = firebase.database().ref('/users/' + localStorage.getItem('userId') + '/reminders/');
    ref.on('value', function(snapshot) {
      if (snapshot.val() === null){
        that.setState({loading: false})
        that.props.updateReminderCount(0)
      }
      else{
        console.log(snapshot.val())
        that.setState({dataObj: snapshot.val(), loading: false})
        that.props.updateReminderCount(Object.keys(snapshot.val()).length)
      }
    });
  }

  updateModal = (val) =>{
    this.props.updateModal(this.state.dataObj[val], val);
  }

  deleteReminder = (val) => {
    var that = this;
    if (Object.keys(that.state.dataObj).length === 1){
      that.setState({dataObj: {}});
    }
    let reminderRef = firebase.database().ref('/users/' + localStorage.getItem('userId') + '/reminders/' + val);
    reminderRef.remove()
    .then(function() {
      that.props.displaySnack('success','Reminder was successfully removed.');
    })
  }

  renderList = () => {
    if (!this.state.loading){
      if ((this.state.dataObj !== undefined && this.state.dataObj !== null) && Object.keys(this.state.dataObj).length > 0){
        return(
          Object.keys(this.state.dataObj).slice(0).reverse().map((val, i) => (
            <div key={i} >
              <Reminder deleteReminder={()=> this.deleteReminder(val) } updateModal={()=> this.updateModal(val)} reminder={this.state.dataObj[val]}/>
            </div>
          ))
        );
      }
      else{
        return <div>No Reminders</div>;
      }
    }
    else{
      return <CircularProgress />
    }
  }

  render(){
    return (
      <div style={{marginTop: 30}}>
        <div style={{width: '60%', margin: 'auto', height: 375, overflowY: (this.state.dataObj !== null && this.state.dataObj !== undefined && Object.keys(this.state.dataObj).length > 2 ? 'scroll' : 'auto')}}>
          {this.renderList()}
        </div>
      </div>
    );
  }
}

export default ReminderList;
