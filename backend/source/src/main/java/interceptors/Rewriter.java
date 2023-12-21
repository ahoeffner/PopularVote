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

package interceptors;

import org.json.JSONObject;

import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.logging.Logger;

import database.rest.custom.BindValue;
import database.rest.custom.SQLRewriter;
import database.rest.custom.SQLRewriterAPI;


public class Rewriter implements SQLRewriter
{
   private final static Logger logger = Logger.getLogger("rest");

   @Override
   public void rewrite(SQLRewriterAPI api, String user, JSONObject payload) throws Exception
   {
      String sql = api.getSQL(payload);
      ArrayList<BindValue> bindvalues = api.getBindValues(payload);
      PreparedStatement stmt = api.parseSQL(sql,bindvalues);
      String type = api.getType(payload);
      ArrayList<String> tables = api.getTables(stmt);
      logger.info("type "+type);
      for(String table : tables) logger.info("table "+table);
   }
}
