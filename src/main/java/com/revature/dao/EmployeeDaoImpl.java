package com.revature.dao;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import com.revature.model.Employee;
import com.revature.util.ConnectionUtil;

public class EmployeeDaoImpl implements EmployeeDao {
	
	private static Logger log = Logger.getRootLogger();

	@Override
	public List<Employee> getEmployees() {
		List<Employee> allEmployees = new ArrayList<>();
		String sql = "SELECT * FROM EMPLOYEE";
		
		ResultSet rs = null;
		
		try (Connection con = ConnectionUtil.getConnection();
				Statement s = con.createStatement();){

			rs = s.executeQuery(sql);
			
			while (rs.next()) {
				int employeeId = rs.getInt("EMP_ID");
				String firstName = rs.getString("FIRST_NAME");
				String lastName = rs.getString("LAST_NAME");
				String isManager = rs.getString("IS_MANAGER");
				String password = rs.getString("PASSWORD");
				String email = rs.getString("EMAIL");
				String username = rs.getString("USERNAME");
				Employee employee = new Employee(employeeId, firstName, lastName, isManager, password, email, username);
				allEmployees.add(employee);
			}
		} catch (IOException|SQLException e) {
			log.error(e);
		} finally {
			if (rs!=null) {
				try {
					rs.close();
				} catch (SQLException e) {
					log.error(e);
				}
			}
		}
		System.out.println(allEmployees);
		return allEmployees;
	}
	
	@Override
	public int validateEmployee(String username, String password) {
		List<Employee> allEmployees = getEmployees();
		for (Employee employee: allEmployees) {
			System.out.println(employee);
			if (employee.getUsername().equals(username) &&
					employee.getPassword().equals(password)) {
				return employee.getEmployeeId();
			}
		}
		return -1;
	}

	@Override
	public int updateEmployeeLastName(Employee employee) {
		String sql = "UPDATE EMPLOYEE SET LAST_NAME=? WHERE EMP_ID=?";
		
		Connection con = null;
		
		PreparedStatement ps = null;
		
		int employeesUpdated = 0;
		
		try {
			con = ConnectionUtil.getConnection();
			ps = con.prepareStatement(sql);
			ps.setString(1, employee.getLastName());
			ps.setInt(2, employee.getEmployeeId());
			employeesUpdated = ps.executeUpdate();
		} catch (IOException | SQLException e) {
			log.error(e);
		} finally {
			try {if (ps != null) ps.close();} catch(SQLException e) {}
		}
		return employeesUpdated;
	}


	@Override
	public int updateEmployeePassword(Employee employee) {
		
		String sql = "UPDATE EMPLOYEE SET PASSWORD=? WHERE EMP_ID=?";
		
		Connection con = null;
		
		PreparedStatement ps = null;
		
		int employeesUpdated = 0;
		
		try {
			con = ConnectionUtil.getConnection();
			ps = con.prepareStatement(sql);
			ps.setString(1, employee.getPassword());
			ps.setInt(2, employee.getEmployeeId());
			employeesUpdated = ps.executeUpdate();
		} catch (IOException | SQLException e) {
			log.error(e);
		} finally {
			try {if (ps != null) ps.close();} catch(SQLException e) {}
		}
		return employeesUpdated;
	}


	@Override
	public int updateEmployeeEmail(Employee employee) {
		
String sql = "UPDATE EMPLOYEE SET EMAIL=? WHERE EMP_ID=?";
		
		Connection con = null;
		
		PreparedStatement ps = null;
		
		int employeesUpdated = 0;
		
		try {
			con = ConnectionUtil.getConnection();
			ps = con.prepareStatement(sql);
			ps.setString(1, employee.getEmail());
			ps.setInt(2, employee.getEmployeeId());
			employeesUpdated = ps.executeUpdate();
		} catch (IOException | SQLException e) {
			log.error(e);
		} finally {
			try {if (ps != null) ps.close();} catch(SQLException e) {}
		}
		return employeesUpdated;
	}

	@Override
	public Employee getEmployeeById(int employeeId) {
		Employee e = new Employee();
		String sql = "SELECT * FROM EMPLOYEE WHERE EMP_ID = ?";
		
		Connection con;
		PreparedStatement ps = null;
		ResultSet rs = null;
		
		try { 
			con = ConnectionUtil.getConnection();
			ps = con.prepareStatement(sql);
			ps.setInt(1, employeeId);
			 
			rs = ps.executeQuery();
			
			if (rs.next()) {
				e.setEmployeeId(rs.getInt("EMP_ID"));
				e.setFirstName(rs.getString("FIRST_NAME"));
				e.setLastName(rs.getString("LAST_NAME"));
				e.setIsManager(rs.getString("IS_MANAGER"));
				e.setPassword(rs.getString("PASSWORD"));
				e.setEmail(rs.getString("EMAIL"));
			}
		} catch (IOException | SQLException ex) {
			log.error(ex);
		} finally {
			try {if (rs!=null) rs.close();} catch(SQLException ex) {}
			try {if (ps!=null) ps.close();} catch(SQLException ex) {}
		}
//		System.out.println(e);
		return e;
	}

}
