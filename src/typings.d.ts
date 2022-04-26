export type ShortURLResult = {
  id: string;
  full_url: string;
  short_url: string;
  created_at: Date;
  expire: Date;
};

export type CreatedURLRequestBody = {
  url: string;
  expireDate: string;
};