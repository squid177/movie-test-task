
export class InvalidMongoConnectionUrlException extends Error {
  constructor() {
    super('Mongo connection url is invalid');
  }
}

