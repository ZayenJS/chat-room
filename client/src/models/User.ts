import { Message } from './Message';
import { Room } from './Room';

export class User {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public password_reset_token?: string;
  public created_at?: Date;
  public updated_at?: Date;
  public messages?: Message[];
  public created_rooms?: Room[];
  public current_room?: Room;
}
