/// <reference types="react-scripts" />

// fallback from typed-css-modules-loader
declare module '*.less' {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

type Talent = {
  _id: string;
  name: string;
  tag: string;
};

type Challenge = {
  _id: string;
  name: string;
  description: string;
  talentsIds: string[];
};

type Task = {
  _id: string;
  name: string;
  description: string;
  challengeId: string;
};

type Step = {
  _id: string;
  name: string;
  description: string;
  taskId: string;
};
