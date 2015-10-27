
import java.io.IOException;

import javax.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.JOptionPane;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.WriteResult;
import com.mongodb.gridfs.CLI;
import com.mongodb.util.JSON;

@WebServlet("/InsertStock")
public class InsertStock extends HttpServlet {

    public InsertStock() {
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
    	try
    	{
	    	String company = request.getParameter("company");
	    	String shares=request.getParameter("shares");
	    	String cost=request.getParameter("cost");
	    	
	    	BasicDBObject dbObject = new BasicDBObject();
	    	dbObject.put("name", company);
	    	dbObject.put("quantity", shares);
	    	dbObject.put("price", cost);
	    	
			System.out.println(dbObject);
			MongoClientURI uri=new MongoClientURI("mongodb://root:password@ds037814.mongolab.com:37814/stockmonitor");	
			MongoClient client=new MongoClient(uri);
			DB db=client.getDB(uri.getDatabase());
			DBCollection stocks=db.getCollection("stocks");
			
			WriteResult result=stocks.insert(dbObject);
			
			//JOptionPane.showMessageDialog(null, "The given details are entered into MongoLab");
			
			response.sendRedirect("displaystocks.html");
		}
	    	catch(Exception e)
	    	{
	    		System.out.println(e);
	    	}
    	
    }

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
