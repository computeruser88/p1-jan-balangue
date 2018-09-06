package com.revature.dao;

import java.util.List;

import com.revature.model.Employee;

public interface EmployeeDao {
	public List<Employee> getEmployees();
	public int updateEmployee(Employee employee);
	public int validateEmployee(Employee employee);
}
