import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Countdown from 'react-countdown-now';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Reminder(props) {
  const classes = useStyles();

  function countdownClock(){
      var time = new Date().getTime();
      var arr = [815, 830, 845, 900, 915, 930, 945, 1000, 1030, 1045, 1100, 1115, 1130, 1145, 1200, 1215, 1230, 1245, 100, 115, 130, 145, 200, 215, 230, 245, 300, 315, 330, 345, 400, 415, 430, 445, 500, 515, 530, 545, 600];
      time = time.getHours() + time.getMinutes()
      var intTime = parseInt(time);

  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <div className="row" style={{justifyContent:'space-between'}}>
          <div className="row">
            <div className="column">
              <Typography variant="h5" component="h2">
                {props.reminder.title}
              </Typography>
              <Typography variant="body2" component="p" style={{fontSize: '1rem'}}>
                {props.reminder.description}
              </Typography>
              <Typography variant="body2" component="p" style={{fontSize: '0.875rem'}}>
                {`On: ${props.reminder.on}   |  Every ${props.reminder.time} minutes`}
              </Typography>
            </div>
          </div>
          <div className="row" style={{alignItems:'center'}}>
            <div className="column">
              <Countdown date={Date.now() + (props.reminder.time * 60000)} />
            </div>
          </div>

          <div style={{alignSelf:'center', width: 175}}>
            <Button variant="outlined" color="primary" style={{marginRight: 15}} onClick={props.updateModal}>
              Edit
            </Button>
            <Button variant="outlined" color="secondary" onClick={props.deleteReminder}>
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
