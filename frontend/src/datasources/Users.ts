import { DatabaseTable } from "futureforms";
import { FormsModule } from "../FormsModule";

export class Users extends DatabaseTable
{
   constructor()
   {
      super(FormsModule.PUBCONN,"data.users");
   }
}