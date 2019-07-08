import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {TextField, Button, Checkbox} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './index.css';
import {editReminder, addNewReminder} from '../api'


const styles = theme => ({
  root: {
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

class Modal extends React.Component {

  constructor(props){
    super(props);
    console.log(this.props)

  }

  componentWillMount(){
    this.setState({
      title: this.props.title,
      description: this.props.description,
      on: this.props.on,
      time:this.props.time,
      selectedKey: this.props.selectedKey
    });
  }

  updateReminder = () => {
    if (this.props.showModalType === "new"){
      console.log("here in add")
      this.addReminder();
    }
    else{
      var selected = {
        title: this.props.title,
        description: this.props.description,
        on: this.props.on,
        time:this.props.time,
        selectedKey: this.props.selectedKey
      }
      var editted = {
        title: this.state.title,
        description: this.state.description,
        on: this.state.on,
        time:this.state.time,
        selectedKey: this.state.selectedKey
      }
      console.log(selected);
      console.log(editted);
      if (JSON.stringify(editted) !== JSON.stringify(selected)){
        editReminder(this.state.selectedKey, this.state.title, this.state.description, this.state.on, this.state.time)
        this.props.updateModal({ title: "", description: "", on: false, time: "" }, "");
      }
      else{
        this.props.displaySnack('error', 'Nothing has been editted.');
      }
    }

  }

  addReminder = () => {
    var field1 = (!this.state.title || this.state.title.length === 0 || /^\s*$/.test(this.state.title));
    var field2 = (!this.state.description || this.state.description.length === 0 || /^\s*$/.test(this.state.description));
    if (field1 && field2){
      this.props.displaySnack('error', "The title and the description of the reminder cannot be empty and cannot contain only spaces.");
    }
    else if (field1){
      this.props.displaySnack('error', 'The title of the reminder cannot be empty and cannot contain only spaces.');
    }
    else if (field2){
      this.props.displaySnack('error', 'The description of the reminder cannot be empty and cannot contain only spaces.');
    }

    if (!field1 && !field2){
      addNewReminder(this.state.title, this.state.description, this.state.on, this.state.time);
      this.setState({title: "",  description: "", on: false, time: ""});
      this.props.displaySnack('success', 'Your new reminder was successfully added!');
    }
  }



  render() {
    return (
      <div >
        <Dialog
          fullWidth
          onClose={()=>this.props.updateModal({ title: "", description: "", on: false, time: "" }, "")}
          aria-labelledby="customized-dialog-title"
          open={this.props.show}
        >
          <DialogTitle id="customized-dialog-title" onClose={()=>this.props.updateModal({ title: "", description: "", on: false, time: "" }, "")}>
            {this.props.showModalType==="edit" ? "Edit Reminder" : "Add Reminder"}
          </DialogTitle>
          <DialogContent dividers>
            <div className="column" style={{marginTop: 20}}>
              <div>
                <TextField
                  className="textBoxWidth2"
                  id="textFieldValue2"
                  label="Reminder Title"
                  value={this.state.title}
                  onChange={event => {
                    const { value } = event.target;
                    this.setState({ title: value });
                  }}
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <div>
                <TextField
                  className="textBoxWidth2"
                  id="descriptionFieldValue"
                  label="Reminder Description"
                  value={this.state.description}
                  onChange={event => {
                    const { value } = event.target;
                    this.setState({ description: value });
                  }}
                  margin="normal"
                  variant="outlined"
                  rows="3"
                  multiline
                />
              </div>

              <div className="row" style={{margin: 'auto', justifyContent: 'space-between', marginBottom: 15, width: '85%'}}>
                <div className="column" style={{alignSelf: 'flex-end'}}>
                  <FormControlLabel
                    control={
                      <div>
                        <Checkbox
                          checked={this.state.on}
                          onChange={()=>this.setState({on: !this.state.on})}
                          value={this.state.on}
                          color="primary"
                          inputProps={{
                            'aria-label': 'secondary checkbox',
                          }}
                        />
                      </div>

                    }
                    label="Off/On"
                  />
                  <FormHelperText style={{marginTop: 0}}>Should reminder be turned on?</FormHelperText>
                </div>
                <div className="column">
                  <FormControl>
                    <InputLabel htmlFor="time-native-helper">Frequency</InputLabel>
                    <NativeSelect
                      value={this.state.time}
                      onChange={(event)=>{this.setState({time: event.target.value})}}
                      input={<Input name="Time" id="time-native-helper" />}>
                        <option value="" />
                        <option value={15}>Every 15 minutes</option>
                        <option value={30}>Every 30 minutes</option>
                        <option value={45}>Every 45 minutes</option>
                        <option value={60}>Every 60 minutes</option>
                        <option value={120}>Every 120 minutes</option>
                    </NativeSelect>
                    <FormHelperText>How often you want the reminder.</FormHelperText>
                  </FormControl>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.updateReminder} color="primary">
            {this.props.showModalType==="edit" ? "Save changes" : "Add Reminder"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Modal;
