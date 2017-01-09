import './App.css';

import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import {
  fetchRunningTimeLog,
  fetchTimeLogs,
  createTimeLog,
  updateTimeLog
} from './queries';


class App extends Component {

  state = {
    timer: null,
    project: '',
    task: ''
  }


  componentWillReceiveProps(nextProps) {
    const { time_log } = nextProps.timer;
    if (this.state.timer == null && time_log) {
      this.setTimer();
      this.setState({ project: time_log.project.name, task: time_log.name });
    }
  }


  setTimer = () => {
    clearInterval(this.timerId);
    this.timerId = setInterval(() => {
      this.setState({
        timer: (new Date().getTime() / 1000) -
               (Date.parse(this.props.timer.time_log.started_at) / 1000)
      });
    }, 1000);
  }


  startTimer = () => {
    const { project, task } = this.state;
    this.props.create_time_log({
      variables: {
        params: {
          project_name: project,
          name: task,
          started_at: new Date()
        }
      }
    }).then(this.props.timer.refetch);
    this.setTimer();
  }


  stopTimer = () => {
    const { time_log } = this.props.timer;
    clearInterval(this.timerId);
    this.setState({ timer: null, project: '', task: '' });
    this.props.update_time_log({
      variables: {
        params: {
          id: time_log.id,
          stopped_at: new Date()
        }
      }
    }).then(this.props.list.refetch);
  }


  handleChange = (e) => {
    const newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }


  timeString(seconds) {
    return (new Date(seconds * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
  }


  renderRunningTimeLog() {
    const { project, task } = this.state;
    return (
      <div>
        <label>
          Project<br/>
          <input value={project} name='project' onChange={this.handleChange} />
        </label>
        <label className='ml-10'>
          Task<br/>
          <input value={task} name='task' onChange={this.handleChange} />
        </label>
        {this.renderTimer()}
        {this.renderStartStop()}
      </div>
    );
  }


  renderTimer() {
    const { timer } = this.state;
    return (
      <label className='ml-10'>
        Time<br/>
        <input value={this.timeString(timer)} readOnly={true} />
      </label>
    );
  }


  renderStartStop() {
    const { time_log } = this.props.timer;
    const btnType      = time_log ? 'warning'      : 'success';
    const clickHandler = time_log ? this.stopTimer : this.startTimer;
    return (
      <button type='button' className={`btn btn-${btnType} ml-10`} onClick={clickHandler}>
        {time_log ? 'Stop' : 'Start'}
      </button>
    );
  }


  renderTimeLogList() {
    const { time_logs } = this.props.list;
    return (
      <table className='mt-100 table table-striped'>
        <thead>
          <tr>
            <th>Project</th>
            <th>Task</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {(time_logs || []).map((tl) => this.renderTimeLogListRow(tl))}
        </tbody>
      </table>
    );
  }


  renderTimeLogListRow(time_log) {
    const timeDiff = (new Date(time_log.stopped_at).getTime() / 1000) -
                     (new Date(time_log.started_at).getTime() / 1000);
    return (
      <tr key={time_log.id}>
        <td>{time_log.project.name}</td>
        <td>{time_log.name}</td>
        <td>{this.timeString(timeDiff)}</td>
      </tr>
    );
  }


  render() {
    return(
      <div className='ml-100'>
        <h1>Project time togs</h1>

        <div className='mt-100 w-80pct timer-box'>
          <div className='pull-left'>
            {this.renderRunningTimeLog()}
            {this.renderTimeLogList()}
          </div>
        </div>
      </div>
    );
  }

}


export default compose(
  graphql(fetchTimeLogs, { name: 'list' }),
  graphql(fetchRunningTimeLog, { name: 'timer' }),
  graphql(createTimeLog, { name: 'create_time_log' }),
  graphql(updateTimeLog, { name: 'update_time_log' })
)(App);
