import mongoose from 'mongoose';

export class Db {
  connection: any;

  constructor(private DB_URL: string) { }

  async connect(): Promise<void> {
    this.connection = await mongoose.connect(this.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
  }
}