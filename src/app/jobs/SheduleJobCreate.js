import taskSchedule from '../../lib/TaskSchedule';

class ScheduleJob {
  get key() {
    return 'SheduleJobCreate';
  }

  async handle({ data }) {
    const { name, date } = data;

    taskSchedule.create({
      name,
      date,
      task: () => {},
    });
  }
}

export default new ScheduleJob();
