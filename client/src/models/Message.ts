import { Room } from './Room';
import { User } from './User';

export class Message {
  public id!: number;
  public content!: string;
  public created_at?: Date;
  public updated_at?: Date;
  public user?: User;
  public room?: Room;
}
