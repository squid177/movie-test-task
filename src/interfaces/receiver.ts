
export interface Receiver {
  onRow: (data: any) => Promise<void>
}