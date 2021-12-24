// temp solution until extension types are up

declare let plugins: {
  [key: string]: {
    info: {
      name: string;
      version: string;
      [key: string]: any;
    };
    [key: string]: any;
  };
};
