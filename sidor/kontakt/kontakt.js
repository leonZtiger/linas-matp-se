const submitButton = document.getElementById('submitButton')
const nameInput = document.getElementById('name')
const phoneInput = document.getElementById('phone')
const emailInput = document.getElementById('email')
const messageInput = document.getElementById('messageTextArea')
const nameError = document.getElementById('nameError')
const phoneError = document.getElementById('phoneError')
const emailError = document.getElementById('emailError')
const messageError = document.getElementById('messageError')

const hasValidText = false;

const nameRegex = /^[A-Za-zÅÄÖåäö\s]{3,}$/
const phoneRegex = /^(?:\d-?){10}$/
const emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/
const messageMinLength = 7


const validateName = () => {
    if (!nameRegex.test(nameInput.value.trim())) {
        nameError.textContent = `Rutan får inte lämnas tom`
        nameInput.style.borderColor = "red"
    } else {
        nameError.textContent = ""
        nameInput.style.borderColor = ""
    }
}

const validatePhone = () => {
    if (!phoneRegex.test(phoneInput.value)) {
        phoneError.textContent = `Ogiltigt telefonnummer`
        phoneInput.style.borderColor = "red"
    } else {
        phoneError.textContent = ""
        phoneInput.style.borderColor = ""
    }
}

const validateEmail = () => {
    if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = `Ogiltig epost`
        emailInput.style.borderColor = "red"
    } else {
        emailError.textContent = ""
        emailInput.style.borderColor = ""
    }
}

const validateMessage = () => {
    if (messageInput.value.trim().length < messageMinLength) {
        messageError.textContent = `Rutan får inte lämnas tom`
        messageInput.style.borderColor = "red"
    } else {
        messageError.textContent = ""
        messageInput.style.borderColor = ""
    }
}

const validateForm = () => {
    if (nameRegex .test(nameInput.value) &&
        phoneRegex.test(phoneInput.value) &&
        emailRegex.test(emailInput.value) &&
        messageInput.value.trim().length >= messageMinLength) {
        submitButton.disabled = false
    }
    else {
        submitButton.disabled = true
    }
}

nameInput.addEventListener('input', () => {
    validateName()
    validateForm()
})
phoneInput.addEventListener('input', () => {
    validatePhone()
    validateForm()
})
emailInput.addEventListener('input', () => {
    validateEmail()
    validateForm()
})

messageInput.addEventListener('input', () => {
    validateMessage()
    validateForm()
})





