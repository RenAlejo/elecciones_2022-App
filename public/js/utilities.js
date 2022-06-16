const api = ( window.location.hostname.includes('localhost')) 
            ? 'http://localhost:8181/api/'
            : 'https://votaciones2022.herokuapp.com/api/';

let tk = localStorage.getItem('token') || '';

if(tk.length <= 10 || tk == '') {
    window.location = '/views/logout.html';
    throw new Error("El token no es válido")
}

let form = {}

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

const editEntry = value => {

    const childNodes = value.parentNode.parentNode.childNodes;

    for (let element of childNodes ) {

        let id = element.id;
    
        if(id != 'accion') {

           form[`${id}`] = element.innerHTML
           let formValue = form[`${id}`]
           element.innerHTML = `<input style="width: 90px" value="${formValue}" type="number" required pattern="^[0-9]" min="0" max="20000" maxlength="5" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" id="${id}" class="form-control" name="${id}">`;

        }
        
        if(id == 'accion') {
            element.innerHTML = `<button id="editar" onClick="saveEntry(this)" class="bi bi-check2-square" style="padding: 2px; background: none; border: 0; color:green; cursor: pointer; with: 150px" alt="guardar" value="enviar"></button>
            <button id="editar" onClick="restoreEntry(this,true)" class="bi bi-x-lg" style="padding: 2px; background: none; border: 0; color:red; cursor: pointer; with: 150px; margin-left:10px" alt="guardar" value="enviar"></button>`;
        }

    }
    
}


const saveEntry = async value => {

    const childNodes = value.parentNode.parentNode.childNodes;
    let newForm  = {};
    
    for (let element of childNodes ) {

        let id = element.id;

        if(element.childNodes[0] != undefined && id != 'accion' ) {
            newForm[`${id}`] = element.childNodes[0].value
        }
    }
    
    fetch(url + `votos/${newForm.id}`, {
        method: 'PUT',
        body: JSON.stringify(newForm),
        headers: { Authorization: token, 'Content-Type': 'application/json' }
    })
    .then( res => res.json())
    .then( msg => {

        if( msg.errors ){
            
            for ( let e in msg.errors) {
                alert(`${msg.errors[e].msg}`)
            }
            
            return console.error( msg )
        }
        
        alert("Se actualizó el registro");

    })
    .catch( err => {
        console.log(err);
    });

    restoreEntry(value);

}


const deleteEntry = async value => {

    const childNodes = value.parentNode.parentNode.childNodes;
    const entry =  value.parentNode.parentNode;
    let result = confirm("El registro se eliminará, presione Ok para continuar");
    let newForm  = {};
    
    if(result) {

        for (let element of childNodes ) {
            if(element.id == 'id') {
                newForm.id =  element.childNodes[0].data
            }
        }
        
        fetch(url + `votos/${newForm.id}`, {
            method: 'DELETE',
            headers: { Authorization: token }
        })
        .then( res => res.json())
        .then( msg => {
    
            if( msg.errors ){
                for ( let e in msg.errors) {
                    alert(`${msg.errors[e].msg}`)
                }
                return console.error( msg )
            }
            
            entry.remove();
            alert("Registro eliminado correctamente");
        })
        .catch( err => {
            console.log(err);
        });

    }

}



const restoreEntry = ( value, ...rest ) => {

    const childNodes = value.parentNode.parentNode.childNodes;
    let newForm  = {};

    for (let element of childNodes ) {

        let id = element.id;
    
        if ( rest[0] === true ) {

            element.innerHTML = form[`${id}`];

        } else if(element.childNodes[0] != undefined && id != 'accion'){
            
            newForm[`${id}`] = element.childNodes[0].value
            element.innerHTML = newForm[`${id}`];
        }
        
        if(id == 'accion') {
            element.innerHTML = `<button id="editar" onClick="editEntry(this)" class="bi bi-pencil" style="padding: 2px; background: none; border: 0; color:green; cursor: pointer;" alt="editar" value="enviar"></button>
            <button id="borrar" onClick="deleteEntry(this)" class="bi bi-trash" style="padding: 2px; margin-left: 10px; background: none; border: 0; color:brown; cursor: pointer;" alt="editar"></button>`;
        }
    }
}

main();