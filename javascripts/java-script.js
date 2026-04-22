document.addEventListener("DOMContentLoaded", function() {
let count = 2;
let form_button = document.querySelector(".avocado_button");
form_button.addEventListener("click", function(){
    let name_of = document.querySelector("input[name='name_of']").value;
    let date = document.querySelector("input[name='date']").value;
    let disk = document.querySelector("select[name='disk']").value;
    let type = document.querySelector("select[name='type']").value;

    let new_row = document.createElement("tr");
    new_row.innerHTML = `
                        <td>${count++}</td>
                        <td>${name_of}</td>
                        <td>${date}</td>
                        <td><span class="sp_red">${disk}</span></td>
                        <td><span class="sp_green">${type}</span></td>
                        <td></td>
                        `;

    let tbody = document.querySelector("table tbody");
    tbody.appendChild(new_row);
    document.querySelector("input[name='name_of']").value = "";
}); 
});
