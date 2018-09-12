let baseUrl = "http://localhost:8082//p1-jan-balangue//all-requests";



function sendAjaxGet(url, func) {
	let xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft.HTTPRequest");
	xhr.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			func(this);
		}
	}
	xhr.open("GET", url);
	xhr.send();
}

function populateRequests(xhr) {
	let response = JSON.parse(xhr.responseText);
	let requestTable = document.createElement("table");
	requestTable.classList.add("table");
	requestTable.classList.add("table-primary");
	let header = document.createElement("thead");
	let heading = ["Request ID", "Amount", "Reason", "Manager ID", "Approved"];
	for (let i = 0; i < heading.length; i++) {
		let title = document.createElement("th");
		title.innerHTML = heading[i];
		header.appendChild(title);
	}
	let tableBody = document.createElement("tbody");
	for (let i = 0; i < response.length; i++) {
		let row = document.createElement("tr");
		let requestId = document.createElement("td");
		requestId.innerHTML = response[i].requestId;
		let amount = document.createElement("td");
		amount.innerHTML = parseFloat(response[i].amount).toFixed(2);
		let reason = document.createElement("td");
		reason.innerHTML = response[i].reason;
		let managerId = document.createElement("td");
		managerId.innerHTML = response[i].managerId;
		let approved = document.createElement("td");
		approved.innerHTML = response[i].approved;
		row.appendChild(requestId);
		row.appendChild(amount);
		row.appendChild(reason);
		row.appendChild(managerId);
		row.appendChild(approved);
		tableBody.appendChild(row);
	}
	requestTable.appendChild(header);
	requestTable.appendChild(tableBody);
	console.log(requestTable);
	document.getElementById("employeeResult").append(requestTable);
}

window.onload = function() {
	document.getElementById("viewRequestLink").addEventListener('click', sendAjaxGet(baseUrl, populateRequests));
}