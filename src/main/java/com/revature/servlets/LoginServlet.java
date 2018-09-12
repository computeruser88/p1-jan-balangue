package com.revature.servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import com.revature.dao.EmployeeDao;
import com.revature.dao.EmployeeDaoImpl;
import com.revature.model.Employee;

/**
 * Servlet implementation class LoginServlet
 */
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getRootLogger();
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoginServlet() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.getRequestDispatcher("Views/Login.html").forward(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String user = request.getParameter("username");
		String pass = request.getParameter("password");
		
		HttpSession session = request.getSession();
		session.getAttribute(user);
		// code to check if username and password are valid
		EmployeeDao edi = new EmployeeDaoImpl();
		int employeeId = edi.validateEmployee(user, pass);
		if (employeeId != -1) {
			System.out.println("Employee ID: " + employeeId);
			session.setAttribute("employeeID", employeeId);
			Employee e = edi.getEmployeeById(employeeId);
			System.out.println(e);
			System.out.println(e.getIsManager());
			if (e.getIsManager().equals("true")) {
				response.sendRedirect("manager");
			} else if (e.getIsManager().equals("false")){
				response.sendRedirect("employee");
			}
		}
	}
}
