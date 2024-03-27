const submit = document.querySelector(".submit-btn");
const form = document.querySelector(".login");
const email = document.querySelector("#email")
const password = document.querySelector("#password")


const showError = (container,input, message) => {
    const errMsg = document.querySelector(container);
    errMsg.textContent = `${message}`
    input.classList.add("red-border")
}

const removeError = (container,input) => {
    input.classList.remove("red-border");
    const errMsg = document.querySelector(container);
    errMsg.textContent =""
};

const validateInput = () => {
    const emailInput = email.value
    const passwordInput = password.value

    const emailCheck = /[a-zA-Z0-9\_\.]+[@]{1}[a-z]+[.]{1}[a-z]{2,3}/gm;
    const passwordCheck = password.length

    if (emailInput === "" || !emailCheck.test(emailInput)) {
        
        showError(".error.emailErr",email,"Email not valid!")
    } else {
        removeError(".error.emailErr", email);
    }
     if (passwordInput === "" ||  passwordCheck < 8) {
       showError(".error.passErr",password, "password not valid!");
     } else {
       removeError(".error.passErr", password);
     }
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    validateInput()
})