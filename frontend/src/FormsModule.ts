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

import { Crypto } from './Crypto';
import { CreateUser } from './forms/CreateUser/CreateUser';
import { ConnectionScope, DatabaseConnection, FormsModule as FormsCoreModule, FormsPathMapping } from 'futureforms';

@FormsPathMapping
([
   {path: "create-user", class: CreateUser}
])

export class FormsModule extends FormsCoreModule
{
   public static PUBCONN:DatabaseConnection = new DatabaseConnection();
   public static USRCONN:DatabaseConnection = new DatabaseConnection();

   constructor()
   {
      super();

      FormsModule.alert("Hello","test");

      /*
      this.setup();
      this.connect();
      this.parse(document.body);
      this.connect("alex@hoeffner.net","Manager1");
      */
   }

   public async show(form:string)
   {
      let tag:HTMLElement = document.querySelector("FutureForms[form='"+form+"']");
      tag.hidden = false;
   }

   public async hide(form:string)
   {
      let tag:HTMLElement = document.querySelector("FutureForms[form='"+form+"']");
      tag.hidden = true;
   }

   private connect(email?:string, password?:string)
   {
      if (email == null) FormsModule.PUBCONN.connect();
      else FormsModule.PUBCONN.connect(email,password);
   }

   private async setup()
   {
      FormsModule.PUBCONN.authmethod = "PopularVoteLogin";

      FormsModule.USRCONN.scope = ConnectionScope.stateless;
      FormsModule.PUBCONN.scope = ConnectionScope.stateless;
   }
}