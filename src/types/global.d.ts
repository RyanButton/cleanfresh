interface Job {
  name: string;
  completed: boolean;
}

interface Room {
  name: string;
  jobs: Job[];
  color: Color;
}

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;
