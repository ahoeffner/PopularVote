package security;

import org.json.JSONObject;

import database.rest.config.Paths;
import database.rest.custom.Authenticator;


public class PopularVoteLogin implements Authenticator
{
   @Override
   public AuthResponse authenticate(JSONObject payload) throws Exception
   {
      System.out.println(Paths.confdir);

      return(new AuthResponse(true,"hr",null));
   }
}