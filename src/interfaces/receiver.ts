
export interface IReceiver {
  onRow: (data: any) => Promise<void>
}