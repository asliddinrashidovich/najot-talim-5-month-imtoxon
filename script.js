const formSignup = document.getElementById('form_signup');
const messageFirstName = document.getElementById('message_firstname');
const messageLastName = document.getElementById('message_lastname');
const messageLogin = document.getElementById('message_login');
const messagePassword = document.getElementById('message_password');
const errorSignin = document.getElementById('error_signin');

let userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : [];


// =========== Sign Up page codes =================
formSignup.addEventListener('submit', (e) => {
    e.preventDefault();

    let firstNameEl = formSignup.first_name
    let lastNameEl = formSignup.last_name
    let loginEl = formSignup.login
    let passwordEl = formSignup.password

    if(!firstNameEl.value.trim().length) {
        messageFirstName.classList.remove('hidden');
        firstNameEl.classList.add('border-[red]')
        setTimeout(() => {
            messageFirstName.classList.add('hidden');
            firstNameEl.classList.remove('border-[red]')
        }, 3000)
    } 
    if(!lastNameEl.value.trim().length) {
        messageLastName.classList.remove('hidden');
        lastNameEl.classList.add('border-[red]')
        setTimeout(() => {
            messageLastName.classList.add('hidden');
            lastNameEl.classList.remove('border-[red]')
        }, 3000)
    } 
    if(!loginEl.value.trim().length) {
        messageLogin.classList.remove('hidden');
        loginEl.classList.add('border-[red]')
        setTimeout(() => {
            messageLogin.classList.add('hidden');
            loginEl.classList.remove('border-[red]')
        }, 3000)
    } 
    if(!passwordEl.value.length) {
        messagePassword.classList.remove('hidden');
        passwordEl.classList.add('border-[red]')
        setTimeout(() => {
            messagePassword.classList.add('hidden');
            passwordEl.classList.remove('border-[red]')
        }, 3000)
    } 
    
    if(lastNameEl.value.trim().length && firstNameEl.value.trim().length && loginEl.value.trim().length && passwordEl.value.length) {
        let userFind = userData.find((item, i) => {
            if(item.login === loginEl.value && item.password === passwordEl.value) {
                return true
            }
        });
        if(userFind) {
            errorSignin.classList.remove('hidden');
            passwordEl.classList.add('border-[red]')
            loginEl.classList.add('border-[red]')
            setTimeout(() => {
                errorSignin.classList.add('hidden');
                passwordEl.classList.remove('border-[red]')
                loginEl.classList.remove('border-[red]')
            }, 3000)
        } else {
            console.log('got to next page')
            const user = {
                id: Math.random(),
                profileImg: "https://cdn-icons-png.flaticon.com/512/219/219986.png",
                firstName: firstNameEl.value,
                lastName: lastNameEl.value,
                login: loginEl.value,
                password: passwordEl.value,
            }
            userData.push(user)
            localStorage.setItem('selectUser', JSON.stringify(user))
            localStorage.setItem('userData', JSON.stringify(userData));
            window.open('/dashboard/dashboard.html')
            window.close();
            formSignup.reset()
        }

    }
})
