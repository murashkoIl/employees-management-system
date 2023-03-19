export type UserCVEntry = {
  name: string;
  id: string;
};

export type UserCvsData = {
  user: {
    cvs: UserCVEntry[];
  };
};
