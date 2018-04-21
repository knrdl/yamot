export class Credentials {

  constructor(public username: string, public password: string) { }

  public get valid(): boolean {
    return typeof this.username === 'string' && this.username.length > 0 && typeof this.password === 'string' && this.password.length > 0
  }

}
