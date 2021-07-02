import { Message } from './Message';
import { User } from './User';

export class Room {
  public id!: string;
  public name!: string;
  public type!: string;
  public created_at?: Date;
  public updated_at?: Date;
  public messages?: Message[];
  public creator?: User;
  public guests?: User[];
}
