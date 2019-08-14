import Queue from '../../lib/Queue';
import ScheduleJob from '../jobs/SheduleJobCreate';

class ExampleTaskScheduleController {
  async store(req, res) {
    const date = new Date(2019, 7, 14, 13, 44, 0);

    await Queue.add(ScheduleJob.key, {
      name: 'teste_1',
      date,
    });

    res.json({ ok: true });
  }
}

export default new ExampleTaskScheduleController();
