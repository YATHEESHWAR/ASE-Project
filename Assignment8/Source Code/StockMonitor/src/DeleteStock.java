

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.JOptionPane;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;

/**
 * Servlet implementation class DeleteStock
 */
@WebServlet("/DeleteStock")
public class DeleteStock extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DeleteStock() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(request,response);
		//response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		MongoClientURI uri=new MongoClientURI("mongodb://root:password@ds037814.mongolab.com:37814/stockmonitor");	
		MongoClient client=new MongoClient(uri);
		
		try {
			
		DB db=client.getDB(uri.getDatabase());
		DBCollection stocks=db.getCollection("stocks");
		
		BasicDBObject deleteQuery = new BasicDBObject("name", request.getParameter("company"));
        stocks.remove(deleteQuery);
		response.sendRedirect("displaystocks.html");

        //JOptionPane.showInternalInputDialog(null, "The Document was deleted from StockDB");
		doGet(request, response);
		}
		catch(Exception e)
		{
			System.out.println(e);
		}
		finally {
			client.close();
		}
		
		doGet(request, response);
	}

}
