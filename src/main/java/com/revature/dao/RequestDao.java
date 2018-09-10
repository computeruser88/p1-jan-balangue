package com.revature.dao;

import java.util.List;

import com.revature.model.Request;

public interface RequestDao {
	public List<Request> getRequests();
	public List<Request> getPendingRequests();
	public List<Request> getResolvedRequests();
	public List<Request> getPendingRequestsByEmployeeId(int employeeId);
	public List<Request> getResolvedRequestsByEmployeeId(int employeeId);
	public int createRequest(Request request);
	public int approveRequest(Request request, int employeeId);
	public int denyRequest(Request request, int employeeId);
}
