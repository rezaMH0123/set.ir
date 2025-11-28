export type User = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  grade: {
    name: string;
  };
  major: {
    name: string;
  };
};
