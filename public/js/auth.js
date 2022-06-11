

const url = ( window.location.hostname.includes('localhost')) 
? 'http://localhost:8181/api/auth/'
: 'https://votaciones2022.herokuapp.com/api/auth/';

const signInForm = document.querySelector('form');
const signInButton = document.getElementById('loginSubmitButton')
const divErrors = document.getElementById('erros');

signInForm.addEventListener('submit', ev => {

    ev.preventDefault();
    
    
    const formData = {};
    
    for(let el of signInForm.elements) {
        
        if ( el.name.length > 0) {
            formData[el.name] = el.value;
        }
    }
    

    if ( formData.username && formData.password) {
        
        signInButton.innerHTML = 'Ingresar <div class="spinner-grow spinner-grow-sm justify-content-md-right" role="status"><span class="visually-hidden"></span></div>';
        
        setTimeout(() => {

            fetch(url + 'login', {
                method: 'POST',
                body: JSON.stringify ( formData ),
                headers: { 'Content-Type': 'application/json' }
            })
            .then( res => res.json())
            .then( ({msg,token}) => {
        
                if( msg ){
                    divErrors.innerHTML = `<div class="alert alert-danger"><i class="bi bi-exclamation-circle"></i> ${msg} </div>`;
                    signInButton.innerHTML = 'Ingresar';
                    signInForm.classList.remove('was-validated');
                    document.getElementById('username').classList.add('is-invalid');
                    document.getElementById('password').classList.add('is-invalid');
                    return console.error( msg )
                }
        
                localStorage.setItem('token', token);
                window.location = '/views/form.html';
        
            })
            .catch( err => {
                console.log(err);
            });
    
        },1000);

    }

});




