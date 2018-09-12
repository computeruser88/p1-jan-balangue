let baseUrl = "http://localhost:8082//p1-jan-balangue//all-employees";
let pendingUrl = "http://localhost:8082//p1-jan-balangue//pending-requests";
let resolvedUrl = "http://localhost:8082//p1-jan-balangue//resolved-requests";
let xhrQueue = [];

function sendAjaxGet(url, func) {
    let xhr = new XMLHttpRequest();
    xhrQueue.push(xhr);
    let currentXhr = xhrQueue.shift();
    currentXhr.onreadystatechange = function () {
        if (currentXhr.readyState === 4 && currentXhr.status === 200) {
        	func(currentXhr);
        }
    }
    currentXhr.open("GET", url);
    currentXhr.send();
}

function populateEmployees(xhr) {
    console.log("populateEmployees firing");
    let response = JSON.parse(xhr.responseText);
    let newDiv = document.createElement("div");
    let employeeTable = document.createElement("table");
    employeeTable.classList.add("table");
    employeeTable.classList.add("table-primary");
    let header = document.createElement("thead");
    let heading = ["Employee ID", "First Name", "Last Name", "Is Manager", "Password", "Email", "Username"];
    for (let i = 0; i < heading.length; i++) {
        let title = document.createElement("th");
        title.innerHTML = heading[i];
        header.appendChild(title);
    }
    let tableBody = document.createElement("tbody");
    for (let i = 0; i < response.length; i++) {
        let row = document.createElement("tr");
        let employeeId = document.createElement("td");
        employeeId.innerHTML = response[i].employeeId;
        let firstName = document.createElement("td");
        firstName.innerHTML = response[i].firstName;
        let lastName = document.createElement("td");
        lastName.innerHTML = response[i].lastName;
        let isManager = document.createElement("td");
        isManager.innerHTML = response[i].isManager;
        let password = document.createElement("td");
        password.innerHTML = response[i].password;
        let email = document.createElement("td");
        email.innerHTML = response[i].email;
        let username = document.createElement("td");
        username.innerHTML = response[i].username;
        row.appendChild(employeeId);
        row.appendChild(firstName);
        row.appendChild(lastName);
        row.appendChild(isManager);
        row.appendChild(password);
        row.appendChild(email);
        row.appendChild(username);
        tableBody.appendChild(row);
    }
    employeeTable.appendChild(header);
    employeeTable.appendChild(tableBody);
    newDiv.append(employeeTable);
    //	console.log(employeeTable);
    document.getElementById("managerResult").append(newDiv);
}

function populatePendingRequests(xhr) {
    console.log("pending requests firing");
    let response = JSON.parse(xhr.responseText);
    let newDiv2 = document.createElement("div");
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
    	console.log(response[i]);
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
        // let approve = document.createElement("button");
        // approve.classList.add("btn");
        // approve.classList.add("btn-success");
        // approve.innerHTML = "APPROVE";
        // approve.id = `approve ${i}`;
        // let deny = document.createElement("button");
        // deny.classList.add("btn");
        // deny.classList.add("btn-danger");
        // deny.innerHTML = "DENY";
        // deny.id = `deny ${i}`;
        // approved.append(approve);
        // approved.append(deny);
        row.appendChild(requestId);
        row.appendChild(amount);
        row.appendChild(reason);
        row.appendChild(managerId);
        row.appendChild(approved);
        tableBody.appendChild(row);
    }
    requestTable.appendChild(header);
    requestTable.appendChild(tableBody);
    newDiv2.append(requestTable);
    document.getElementById("managerResult").append(newDiv2);
}

function populateResolvedRequests(xhr) {
    console.log("resolved firing");
    let response = JSON.parse(xhr.responseText);
    let newDiv2 = document.createElement("div");
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
        approved.innerHTML = resonse[i].approved;
        row.appendChild(requestId);
        row.appendChild(amount);
        row.appendChild(reason);
        row.appendChild(managerId);
        row.appendChild(approved);
        tableBody.appendChild(row);
    }
    requestTable.appendChild(header);
    requestTable.appendChild(tableBody);
    newDiv2.append(requestTable);
    document.getElementById("managerResult").append(newDiv2);

}

function displayForm() {
	let requestForm = document.createElement("form");
	requestForm.setAttribute("action", "POST");
	let formDiv = document.createElement("div");
	formDiv.classList.add("form-group");
	let amountLabel = document.createElement("label");
	amountLabel.innerHTML = "Enter request ID:";
	let amountInput = document.createElement("input");
	amountInput.type = "number";
	amountInput.classList.add("form-control");
	amountInput.setAttribute("name", "requestId");
	formDiv.appendChild(amountLabel);
	formDiv.appendChild(amountInput);
	let reasonLabel = document.createElement("label");
	reasonLabel.innerHTML = "Enter approval (yes or no):"
	let reasonInput = document.createElement("input");
	reasonInput.type = "text";
	reasonInput.classList.add("form-control");
	reasonInput.setAttribute("name", "approval");
	formDiv.appendChild(reasonLabel);
	formDiv.appendChild(reasonInput);
	let submitButton = document.createElement("input");
	submitButton.type = "submit";
	submitButton.value = "Submit request!";
	formDiv.appendChild(submitButton);
	requestForm.appendChild(formDiv);
	document.getElementById("managerResult").append(requestForm);

}
function viewAllEmployees() {
//	event.target.removeEventListener(event.type, arguments.callee);
	sendAjaxGet(baseUrl, populateEmployees);
}

function processPendingRequests() {
//	event.target.removeEventListener(event.type, arguments.callee);
	sendAjaxGet(pendingUrl, populatePendingRequests);
}

function processResolvedRequests() {
//	event.target.removeEventListener(event.type, arguments.callee);
	sendAjaxGet(resolvedUrl, populateResolvedRequests);
}

function processRequestResolution() {
//	event.target.removeEventListener(event.type, arguments.callee);
	displayForm();
}

//document.getElementById("viewEmployeesLink").onclick = function () {
//	return viewAllEmployees();
//};
//
//document.getElementById("pendingRequestsLink").onclick = function () {
//	return processPendingRequests();
//};
//document.getElementById("resolvedRequestsLink").onclick = function () {
//	return processResolvedRequests();
//};
document.getElementById("requestResolutionLink").addEventListener('click', sendAjaxGet(baseUrl, populateEmployees));
document.getElementById("pendingRequestsLink").addEventListener('click', sendAjaxGet(pendingUrl, populatePendingRequests));
document.getElementById("resolvedRequestsLink").addEventListener('click', sendAjaxGet(resolvedUrl, populateResolvedRequests));
document.getElementById("requestResolutionLink").addEventListener('click', displayForm());



//window.onload = function () {
////    document.getElementById("viewEmployeesLink").removeEventListener('click', sendAjaxGet(baseUrl, populateEmployees, false));
////    document.getElementById("pendingRequestsLink").removeEventListener('click', sendAjaxGet(pendingUrl, populatePendingRequests, false));
////    document.getElementById("resolvedRequestsLink").removeEventListener('click', sendAjaxGet(resolvedUrl, populateResolvedRequests, false));
////    document.getElementById("resolvedRequestsLink").removeEventListener('click', sendAjaxGet(resolvedUrl, populateResolvedRequests, false));
// 
//
//}