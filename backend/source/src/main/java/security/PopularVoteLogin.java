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

import org.json.JSONArray;
import org.json.JSONObject;
import database.rest.custom.Authenticator;
import database.rest.custom.AuthenticatorAPI;


public class PopularVoteLogin implements Authenticator
{
   @Override
   public AuthResponse authenticate(AuthenticatorAPI api, JSONObject payload) throws Exception
   {
      String email = null;
      String password = null;

      if (payload.has("username")) email = payload.getString("username");
      if (payload.has("auth.secret")) password = payload.getString("auth.secret");

      if (email != null)
      {
         String sesid = api.connect();
         JSONObject test = api.parse("{}");

         JSONArray bindvalues = new JSONArray();

         JSONObject bind1 = new JSONObject();
         JSONObject bind2 = new JSONObject();

         bind1.put("name","email");
         bind1.put("type","string");
         bind1.put("value",email);

         bind2.put("name","password");
         bind2.put("type","string");
         bind2.put("value",password);

         bindvalues.put(bind1);
         bindvalues.put(bind2);

         test.put("session",sesid);
         test.put("sql","select id from data.users where email = :email and password = :password");
         test.put("bindvalues",bindvalues);

         String response = api.execute(test);
         api.logger().info(response);

         api.disconnect(sesid);
      }

      return(new AuthResponse(true,null,null));
   }
}