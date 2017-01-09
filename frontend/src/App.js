import React, { Component } from 'react';
import './App.css';


class App extends Component {

  state = {
    running_time_log: { id: 10, name: 'Test', started_at: '2016-01-09', project: { id: 1, name: 'Test Project' } },
    timer: Date.parse('2016-01-09') - new Date(),
    time_logs: [
      { id: 1, name: 'Test1', started_at: '2016-01-01', stopped_at: '2016-01-01T10:00:00', project: { id: 1, name: 'Test Project' } },
      { id: 2, name: 'Test2', started_at: '2016-01-02', stopped_at: '2016-01-01T09:00:00', project: { id: 1, name: 'Test Project' } },
      { id: 3, name: 'Test3', started_at: '2016-01-03', stopped_at: '2016-01-01T08:00:00', project: { id: 1, name: 'Test Project' } },
      { id: 4, name: 'Test4', started_at: '2016-01-04', stopped_at: '2016-01-01T07:00:00', project: { id: 2, name: 'Test Project 2' } },
      { id: 5, name: 'Test5', started_at: '2016-01-05', stopped_at: '2016-01-01T06:00:00', project: { id: 2, name: 'Test Project 2' } },
      { id: 6, name: 'Test6', started_at: '2016-01-06', stopped_at: '2016-01-01T05:00:00', project: { id: 2, name: 'Test Project 2' } },
    ]
  }


  startTimer = () => {
    clearInterval(this.timerId);
    this.timerId = setInterval(() => {
      this.setState({
        timer: Date.parse(this.state.running_time_log) - new Date()
      });
    }, 1000);
  }


  stopTimer = () => {
    clearInterval(this.timerId);
  }


  timeString(seconds) {
    return (new Date(seconds * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
  }


  renderRunningTimeLog() {
    const { running_time_log } = this.state;
    return (
      <div>
        <label>
          Project<br/>
          <input value={running_time_log && running_time_log.project.name} />
        </label>
        <label className='ml-10'>
          Task<br/>
          <input value={running_time_log && running_time_log.name} />
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
    const { running_time_log } = this.state;
    const btnType = running_time_log ? 'warning'      : 'success';
    const onClick = running_time_log ? this.stopTimer : this.startTimer;
    return (
      <button type='button' className={`btn btn-${btnType} ml-10`} onClick={onClick}>
        Stop
      </button>
    );
  }


  renderTimeLogList() {
    const { time_logs } = this.state;
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
          {time_logs.map((tl) => this.renderTimeLogListRow(tl))}
        </tbody>
      </table>
    );
  }


  renderTimeLogListRow(time_log) {
    return (
      <tr key={time_log.id}>
        <td>{time_log.project.name}</td>
        <td>{time_log.name}</td>
        <td>{this.timeString(new Date(time_log.stopped_at) - new Date(time_log.started_at))}</td>
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


export default App;
