
export class InvalidGoogleApiTokenException extends Error {
  constructor() {
    super('Google api token is invalid');
  }
}

