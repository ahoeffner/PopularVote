package interceptors;

import org.json.JSONObject;
import database.rest.custom.SQLRewriter;


public class Rewriter implements SQLRewriter
{
   @Override
   public JSONObject rewrite(JSONObject payload) throws Exception
   {
      return(payload);
   }
}
