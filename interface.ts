export interface ISeries {
  id: number;
  title: string;
  description: string;
  totalepisodes: number;
  type: string;
  view: number;
  images: IImages[];
  status: string;
  alt_title?: string;
}

export interface IImages {
  id: number;
  name: string;
  type: string;
  id_series: string[];
}

export interface IEpisodes {
  id: number;
  title: string;
  ep_num: number;
  source: string;
  seriesId: number;
}

export interface IAccount {
  id: number;
  email: string;
  username: string;
  password: string;
}
