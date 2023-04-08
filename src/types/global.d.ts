interface Job {
  name: string;
  completed: boolean;
}

interface Room {
  name: string;
  jobs: Job[];
}
