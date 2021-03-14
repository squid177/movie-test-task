import { google } from 'googleapis';
import parse from 'csv-parser';
import { FailedFileLoadException } from '../exceptions';
import { IReceiver } from './../interfaces/receiver';

export class GoogleDriveCsvLoader {
  drive: any;

  constructor(apiKey: string) {
    this.drive = google.drive({
      version: 'v3',
      auth: apiKey
    });
  }

  async load(fileId: string, writableStream: IReceiver): Promise<void> {
    try {
      const response = await this.drive.files.get(
        { fileId, alt: "media" },
        { responseType: "stream" });

      const parser = response.data.pipe(parse());

      for await (const record of parser) {
        await writableStream.onRow(record);
      }
    }
    catch (err) {
      throw new FailedFileLoadException(err.code);
    }
  }
}
