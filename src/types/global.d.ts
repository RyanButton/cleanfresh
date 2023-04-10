interface JobMeta {
  name: string;
  schedule: {
    mon: boolean;
    tue: boolean;
    wed: boolean;
    thu: boolean;
    fri: boolean;
    sat: boolean;
    sun: boolean;
  };
}

interface Job {
  name: string;
  completed: boolean;
}

interface Room {
  name: string;
  jobMeta: JobMeta[];
  jobs: Job[];
  color: Color;
}

interface Schedule {
  mon: Job[];
  tue: Job[];
  wed: Job[];
  thur: Job[];
  fri: Job[];
  sat: Job[];
  sun: Job[];
}

interface ScheduleJobList {}

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;
