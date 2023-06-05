interface JobMeta {
  name: string;
}

interface Job {
  meta: JobMeta;
  completed: boolean;
}

interface Room {
  name: string;
  jobMeta: JobMeta[];
  color: Color;
  schedule: DaySchedule[];
}
interface DaySchedule {
  isShowing: boolean;
  jobs: Job[];
}

interface ScheduleJobList {}

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;
