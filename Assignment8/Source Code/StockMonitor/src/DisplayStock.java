

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;

/**
 * Servlet implementation class DisplayStock
 */
@WebServlet("/DisplayStock")
public class DisplayStock extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public DisplayStock() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		//response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		MongoClientURI uri=new MongoClientURI("mongodb://root:password@ds037814.mongolab.com:37814/stockmonitor");	
		MongoClient client=new MongoClient(uri);
		DB db=client.getDB(uri.getDatabase());
		DBCollection stocks=db.getCollection("stocks");
		
		BasicDBObject orderBy = new BasicDBObject("price", 1);
		DBCursor cursor =stocks.find().sort(orderBy);
		
		
		PrintWriter out = response.getWriter();
		try {
			while (cursor.hasNext())
			{
				out.println("<p>"+cursor.next()+"</p>");
			}
		}
		
		catch (Exception e)
		{
			System.out.println(e);
		}
		finally 
		{
			client.close();
		}
		doGet(request, response);
	}

}
