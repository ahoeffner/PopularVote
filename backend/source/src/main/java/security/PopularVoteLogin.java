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

package security;

import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONObject;
import database.rest.custom.Authenticator;
import database.rest.custom.AuthenticatorAPI;
import database.rest.custom.BindValue;


public class PopularVoteLogin implements Authenticator
{
   private static String user = "pvuser";

   private static String sql =
   """
      select * from data.users
      where email = :email
      and password = :password
   """;


   @Override
   public AuthResponse authenticate(AuthenticatorAPI api, JSONObject payload) throws Exception
   {
      String user = null;
      String email = null;
      String password = null;

      JSONObject auth = null;
      JSONObject response = null;

      ArrayList<BindValue> bindvalues = new ArrayList<BindValue>();

      if (payload.has("username"))
         email = payload.getString("username");

      if (payload.has("auth.secret"))
         password = payload.getString("auth.secret");

      if (email != null)
      {
         String session = api.connect();

         bindvalues.add(new BindValue("email",email));
         bindvalues.add(new BindValue("password",password));

         auth = api.createPayload(session,sql,bindvalues);
         response = api.execute(auth);

         api.disconnect(session);

         if (response.has("rows"))
         {
            JSONArray rows = response.getJSONArray("rows");

            if (rows.length() > 0)
            {
               user = PopularVoteLogin.user;
               JSONObject row = rows.getJSONObject(0);

               long id = row.getLong("id");
               String name = row.getString("name");

               api.logger().info("Logged in as "+name+"(id:"+id+")");

               String encr = api.createSharedSecret(name+" "+id);
               api.logger().info("encr: "+encr);

               String decr = api.decryptSharedSecret(encr);
               api.logger().info("decr: "+decr);
            }
         }
      }

      return(new AuthResponse(true,user,null));
   }
}