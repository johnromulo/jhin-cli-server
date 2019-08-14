import schedule from 'node-schedule';

class TaskSchedule {
  create({ name, date, task }) {
    schedule.scheduleJob(name, date, () => {
      task();
    });
  }

  cancel(name) {
    schedule.cancelJob(name);
  }
}

export default new TaskSchedule();
