package com.revature.dao;

import java.util.List;

import com.revature.model.Employee;

public interface EmployeeDao {
	public List<Employee> getEmployees();
	public Employee getEmployeeById(int employeeId);
	public int updateEmployeeLastName(Employee employee);
	public int updateEmployeePassword(Employee employee);
	public int updateEmployeeEmail(Employee employee);
	public int validateEmployee(String username, String password);
}
