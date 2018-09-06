package com.revature.dao;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.revature.model.Request;
import com.revature.util.ConnectionUtil;

public class RequestDaoImpl implements RequestDao {

	@Override
	public List<Request> getRequests() {
		List<Request> allRequests = new ArrayList<>();
		String sql = "SELECT * FROM REQUEST";
		
		ResultSet rs = null;
		
		try (Connection con = ConnectionUtil.getConnection();
				Statement s = con.createStatement();){

			rs = s.executeQuery(sql);
			
			while (rs.next()) {
				BigDecimal amount = (BigDecimal) rs.getBigDecimal("AMOUNT");
				String reason = rs.getString("REASON");
				int employeeId = rs.getInt("EMP_ID");
				Request request = new Request(amount, reason, employeeId);
				allRequests.add(request);
			}
		} catch (IOException|SQLException e) {
			e.printStackTrace();
		} finally {
			if (rs!=null) {
				try {
					rs.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		return allRequests;
	}

	@Override
	public List<Request> getPendingRequests() {
		List<Request> pendingRequests = new ArrayList<>();
		String sql = "SELECT * FROM REQUEST WHERE APPROVED IS NULL";
		
		ResultSet rs = null;
		
		try (Connection con = ConnectionUtil.getConnection();
				Statement s = con.createStatement();){
			rs = s.executeQuery(sql);
			
			while (rs.next()) {
				BigDecimal amount = rs.getBigDecimal("AMOUNT");
				String reason = rs.getString("REASON");
				int employeeId = rs.getInt("EMP_ID");
				Request request = new Request(amount, reason, employeeId);
				pendingRequests.add(request);
			}
		} catch (IOException|SQLException e) {
			e.printStackTrace();
		} finally {
			if (rs!=null) {
				try {
					rs.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		
		return pendingRequests;
		
	}

	@Override
	public List<Request> getResolvedRequests() {
		List<Request> resolvedRequests = new ArrayList<>();
		String sql = "SELECT * FROM REQUEST WHERE APPROVED IS NOT NULL";
		
		ResultSet rs = null;
		
		try (Connection con = ConnectionUtil.getConnection();
				Statement ps = con.createStatement();){
			
			rs = ps.executeQuery(sql);
			
			while (rs.next()) {
				BigDecimal amount = (BigDecimal) rs.getBigDecimal("AMOUNT");
				String reason = rs.getString("REASON");
				int employeeId = rs.getInt("EMP_ID");
				int managerId = rs.getInt("MGR_ID");
				String approved = rs.getString("APPROVED");
				Request request = new Request(amount, reason, employeeId, managerId, approved);
				resolvedRequests.add(request);
			}
		} catch (IOException|SQLException e) {
			e.printStackTrace();
		} finally {
			if (rs!=null) {
				try {
					rs.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		
		return resolvedRequests;
	}

	@Override
	public List<Request> getPendingRequestsByEmployeeId(int employeeId) {
		List<Request> pendingRequests = new ArrayList<>();
		String sql = "SELECT * FROM REQUEST WHERE EMP_ID = ? AND APPROVED IS NOT NULL";
		
		ResultSet rs = null;
		
		try (Connection con = ConnectionUtil.getConnection();
				PreparedStatement ps = con.prepareStatement(sql);){
			
			ps.setInt(1, employeeId);
			rs = ps.executeQuery();
			
			while (rs.next()) {
				BigDecimal amount = (BigDecimal) rs.getBigDecimal("AMOUNT");
				String reason = rs.getString("REASON");
				Request request = new Request(amount, reason, employeeId);
				pendingRequests.add(request);
			}
		} catch (IOException|SQLException e) {
			e.printStackTrace();
		} finally {
			if (rs!=null) {
				try {
					rs.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		
		return pendingRequests;
	}

	@Override
	public List<Request> getResolvedRequestsByEmployeeId(int employeeId) {
		List<Request> resolvedRequests = new ArrayList<>();
		String sql = "SELECT * FROM REQUEST WHERE EMP_ID = ? AND APPROVED IS NULL";
		
		ResultSet rs = null;
		
		try (Connection con = ConnectionUtil.getConnection();
				PreparedStatement ps = con.prepareStatement(sql);){
			
			ps.setInt(1, employeeId);
			rs = ps.executeQuery();
			
			while (rs.next()) {
				BigDecimal amount = (BigDecimal) rs.getBigDecimal("AMOUNT");
				String reason = rs.getString("REASON");
				int managerId = rs.getInt("MGR_ID");
				String approved = rs.getString("APPROVED");
				Request request = new Request(amount, reason, employeeId, managerId, approved);
				resolvedRequests.add(request);
			}
		} catch (IOException|SQLException e) {
			e.printStackTrace();
		} finally {
			if (rs!=null) {
				try {
					rs.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		
		return resolvedRequests;
	}

	@Override
	public int createRequest(Request request) {
	
		return 0;
	}

	@Override
	public int updateRequest(Request request) {

		return 0;
	}

	@Override
	public int approveRequest(Request request) {

		return 0;
	}

	@Override
	public int denyRequest(Request request) {

		return 0;
	}

}
