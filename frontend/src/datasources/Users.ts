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

import { SQLStatement } from "futureforms";
import { FormsModule } from "../FormsModule";

export class Users
{
   public static async checkEmail(email:string) : Promise<boolean>
   {
      let stmt:SQLStatement = new SQLStatement(FormsModule.PUBCONN);
      stmt.sql = "select count(*) from data.users where email = :email";

      stmt.bind("email",email);
      let success:boolean = await stmt.execute();

      if (!success) return(false);

      let rows:any[] = await stmt.fetch();
      let count:number = +rows[0];

      return(count == 0);
   }


   public static async create(name:string, email:string, password:string) : Promise<boolean>
   {
      let stmt:SQLStatement = new SQLStatement(FormsModule.PUBCONN);
      stmt.sql = "insert into data.users(email,name,password) values (:email,:name,:password)";

      stmt.bind("name",name);
      stmt.bind("email",email);
      stmt.bind("password",password);

      let success:boolean = await stmt.execute();
      return(success);
   }
}

function generateKey(alg, scope) {
   return new Promise(function(resolve) {
     var genkey = crypto.subtle.generateKey(alg, true, scope)
     genkey.then(function (pair) {
       resolve(pair)
     })
   })
 }