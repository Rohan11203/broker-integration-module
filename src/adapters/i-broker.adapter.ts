export interface IBrokerAdapter {
  getTrades(accessToken: string): Promise<any[]>;
}
