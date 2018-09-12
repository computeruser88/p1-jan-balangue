let baseUrl = "http://localhost:8082//p1-jan-balangue//all-employees";
let pendingUrl = "http://localhost:8082//p1-jan-balangue//pending-requests";
let resolvedUrl = "http://localhost:8082//p1-jan-balangue//resolved-requests";


function sendAjaxGet(url, func, event) {
    let xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft.HTTPRequest");
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            func(this, event);
        }
    }
    xhr.open("GET", url);
    xhr.send();
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
    document.getElementById("managerResult").innerHTML = '';
    document.getElementById("managerResult").append(newDiv);
    event.stopImmediatePropagation();
}

function populatePendingRequests(xhr,event) {
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
        approved = response[i].approved;
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
    document.getElementById("managerResult").innerHTML = '';
    document.getElementById("managerResult").append(newDiv2);
    event.stopImmediatePropagation();
}

function populateResolvedRequests(xhr, event) {
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
    document.getElementById("managerResult").innerHTML = '';
    document.getElementById("managerResult").append(newDiv2);
    event.stopImmediatePropagation();
}


window.onload = function () {
    document.getElementById("viewEmployeesLink").addEventListener('click', sendAjaxGet(baseUrl, populateEmployees, event));
    document.getElementById("pendingRequestsLink").addEventListener('click', sendAjaxGet(pendingUrl, populatePendingRequests, event));
    document.getElementById("resolvedRequestsLink").addEventListener('click', sendAjaxGet(resolvedUrl, populateResolvedRequests, event));
    // document.getElementsByClassName("btn btn-success").addEventListener('click', sendAjaxPost(pendingUrl, approve));
    // document.getElementsByClassName("btn btn-danger").addEventListener('click', sendAjaxPost(pendingUrl, deny));
}