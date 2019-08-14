import taskSchedule from '../../lib/TaskSchedule';

class ScheduleJob {
  get key() {
    return 'SheduleJobCreate';
  }

  async handle({ data }) {
    const { name } = data;

    taskSchedule.cancel(name);
  }
}

export default new ScheduleJob();
