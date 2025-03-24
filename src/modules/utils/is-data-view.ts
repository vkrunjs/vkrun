export const isDataView = (value: any): value is DataView => {
  return value instanceof DataView;
};
