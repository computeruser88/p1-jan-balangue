package com.revature.model;

import java.math.BigDecimal;

public class Request {
	
	private int requestId;
	private BigDecimal amount;
	private String reason;
	private int employeeId;
	private int managerId;
	private String approved;
	
	public Request() {
		super();
	}

	public Request(int requestId, BigDecimal amount, String reason, int employeeId, int managerId, String approved) {
		super();
		this.requestId = requestId;
		this.amount = amount;
		this.reason = reason;
		this.employeeId = employeeId;
		this.managerId = managerId;
		this.approved = approved;
	}

	public Request(BigDecimal amount, String reason, int employeeId, int managerId, String approved) {
		super();
		this.amount = amount;
		this.reason = reason;
		this.employeeId = employeeId;
		this.managerId = managerId;
		this.approved = approved;
	}

	public Request(BigDecimal amount, String reason, int employeeId) {
		super();
		this.amount = amount;
		this.reason = reason;
		this.employeeId = employeeId;
	}
	
	public Request(int requestId2, BigDecimal amount2, String reason2, int employeeId2) {
		this.requestId = requestId2;
		this.amount = amount2;
		this.reason = reason2;
		this.employeeId = employeeId2;
	}

	public int getRequestId() {
		return this.requestId;
	}

	public BigDecimal getAmount() {
		return this.amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public String getReason() {
		return this.reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public int getEmployeeId() {
		return this.employeeId;
	}

	public void setEmployeeId(int employeeId) {
		this.employeeId = employeeId;
	}

	public int getManagerId() {
		return this.managerId;
	}

	public void setManagerId(int managerId) {
		this.managerId = managerId;
	}

	public String getApproved() {
		return this.approved;
	}

	public void setApproved(String approved) {
		this.approved = approved;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((amount == null) ? 0 : amount.hashCode());
		result = prime * result + ((approved == null) ? 0 : approved.hashCode());
		result = prime * result + employeeId;
		result = prime * result + managerId;
		result = prime * result + ((reason == null) ? 0 : reason.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null) {
			return false;
		}
		if (getClass() != obj.getClass()) {
			return false;
		}
		Request other = (Request) obj;
		if (amount == null) {
			if (other.amount != null) {
				return false;
			}
		} else if (!amount.equals(other.amount)) {
			return false;
		}
		if (approved == null) {
			if (other.approved != null) {
				return false;
			}
		} else if (!approved.equals(other.approved)) {
			return false;
		}
		if (employeeId != other.employeeId) {
			return false;
		}
		if (managerId != other.managerId) {
			return false;
		}
		if (reason == null) {
			if (other.reason != null) {
				return false;
			}
		} else if (!reason.equals(other.reason)) {
			return false;
		}
		return true;
	}

	@Override
	public String toString() {
		return "Request [amount=" + amount + ", reason=" + reason + ", employeeId=" + employeeId + ", managerId="
				+ managerId + ", approved=" + approved + "]";
	}
	
	
}
