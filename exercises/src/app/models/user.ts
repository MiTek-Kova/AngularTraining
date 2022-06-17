export enum Months {
  Jan,
  Feb,
  Mar,
  Apr,
  May,
  Jun,
  Jul,
  Aug,
  Sep,
  Oct,
  Nov,
  Dec
}

export interface User {
  id: number;
  username: string;
  status: string;
  lastname: string;
  address: Address;
  birthMonth: Months | null;
}

export interface Address {
  firstLine: string;
  secondLine: string;
  postOrZipCode: string;
}
