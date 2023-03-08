let id = 1;
const toast = (msg,success = true) =>{
const toastContainer =document.querySelector('.toast-container')
let thisId = id++;
toastContainer.innerHTML += `
    <div id="toast-id-${thisId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header toast-heading-${thisId}">
        <strong class="me-auto">${success ? "Success" : "Error"}</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
        ${msg}
        </div>
    </div>
    `
const myAlert = document.getElementById(`toast-id-${thisId}`);
let bsAlert = new bootstrap.Toast(myAlert);
const toastHeader = document.querySelector(`.toast-heading-${thisId}`);
toastHeader.style.color = 'white';
if(success){
    toastHeader.style.backgroundColor = 'green';
}else{
    toastHeader.style.backgroundColor = 'red';
}

bsAlert.show()
setTimeout(() => {
    document.getElementById(`toast-id-${thisId}`).remove();
}, 3000);
}

export default toast;