console.log('Hola');

const api = ( window.location.hostname.includes('localhost')) 
            ? 'http://localhost:8181/api/'
            : 'https://votaciones2022.herokuapp.com/api/';

let tk = localStorage.getItem('token') || '';

if(tk.length <= 10 || tk == '') {
    window.location = '/views/logout.html';
    throw new Error("El token no es válido")
}

const validateJWT = async() => {
    
    try {

        const path =  location.href.split('/');
        const res = await fetch( api + 'auth', {
            headers: {'Authorization': tk}
        });
    
        const { user: userDB, token: tokenDB} = await res.json();
        localStorage.setItem('token', tokenDB)
        
        userInfo = userDB;
        tk = tokenDB;
        
        if(path[ path.length - 1] == 'edit.html' && userInfo.rol === 'user') {
            window.location = '/';
        }

        if (userInfo.rol === 'administrator') {

            const menu  =  document.querySelector("#menu");
            const li = document.createElement("li")
            const a = document.createElement('a')
            const i = document.createElement('i');
            const span = document.createElement('span');

            if(path[ path.length - 1] == 'edit.html') {
                li.className = 'sidebar-item active';
            } else {
                li.className = 'sidebar-item';
            }

            a.href = '/views/edit.html';
            a.className = 'sidebar-link';
            li.appendChild(a);
            i.className = 'bi bi-pen-fill';
            a.appendChild(i);
            span.innerHTML = 'Editar Registros';
            a.appendChild(span);
            menu.appendChild(li);
            
        }
        
    } catch(err) {

        console.log(err);
        window.location = '/';
        
    }
    
}


const main = async () => {
    await validateJWT();
}


main();