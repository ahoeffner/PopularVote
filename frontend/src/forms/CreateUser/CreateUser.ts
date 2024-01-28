/*
  MIT License

  Copyright © 2023 Alex Høffner

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software
  and associated documentation files (the “Software”), to deal in the Software without
  restriction, including without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
  Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or
  substantial portions of the Software.

  THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
  BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import content from './CreateUser.html';

import { Users } from "../../datasources/Users";
import { FormsModule } from "../../FormsModule";
import { Alert, EventType, Form, formevent } from "futureforms";


export class CreateUser extends Form
{
   constructor()
   {
      super(content);
   }


   @formevent({type: EventType.WhenValidateField, field: "email"})
   public async validateEmail() : Promise<boolean>
   {
      let email:string = this.getValue("users","email");
      if (!email) return(true);

      let exists:boolean = await Users.checkEmail(email);

      if (!exists) Alert.warning("Email '"+email+"' is already in use","Email");
      return(exists);
   }


   public async create() : Promise<boolean>
   {
      if (!(await this.validate())) return(false);
      let name:string = this.getValue("users","name");
      let email:string = this.getValue("users","email");
      let password:string = this.getValue("users","password");
      let success:boolean = await Users.create(name,email,password);

      if (success) this.getBlock("users").clear(true);
      (FormsModule.get() as FormsModule).hide("create-user");

      return(success);
   }
}