import content from './Login.html';
import { Users } from '../../datasources/Users';
import { Form, datasource } from "futureforms";

@datasource("users",Users)

export class Login extends Form
{
   constructor()
   {
      super(content);
   }
}