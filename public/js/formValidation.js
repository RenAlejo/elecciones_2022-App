const votosForm = document.querySelector('#formVotos');
const sendFormButton =  document.querySelector('#sendformbutton');
const divErrors = document.getElementById('errors');
const divTotal =  document.querySelector("#total");
const divTotalVotosReg = document.querySelector("#totalVotosReg");
const btnMesaDiferencia = document.querySelector('#mesadiferencia');
const btnJuradoDiferencia = document.querySelector('#juradodiferencia');
const divDiferenciaVotosMesa = document.querySelector("#diferenciaVotosMesa");

votosForm.addEventListener('submit', ev => {

    ev.preventDefault();

    const formData = {};
    
    for(let el of votosForm.elements) {
        
        if ( el.name.length > 0) {
            formData[el.name] = el.value;
        }
    }

    sendFormButton.innerHTML = 'Enviando Formulario <div class="spinner-grow spinner-grow-sm justify-content-md-right" role="status"><span class="visually-hidden"></span></div>';
    
    setTimeout(() => {

        sendFormButton.innerHTML = 'Validando Información <div class="spinner-grow spinner-grow-sm justify-content-md-right" role="status"><span class="visually-hidden"></span></div>';
  
        fetch(url + 'form', {
            method: 'POST',
            body: JSON.stringify ( formData ),
            headers: { Authorization: token, 'Content-Type': 'application/json' }
        })
        .then( res => res.json())
        .then( msg => {
            
            
            if( msg.errors ){

                for ( let i in msg.errors) {
                    
                    divErrors.innerHTML = `<div class="alert alert-danger"><i class="bi bi-exclamation-circle"></i> • ${msg.errors[i].msg} </div><br>`;
                    
                    let divId = msg.errors[i].param;
                    
                    if(divId == 'codigo_mun') {
                        divId = 'municipiosSelect';
                    }

                    if(divId == 'codigo_dep') {
                        divId = 'departamentosSelect';
                    }

                    document.getElementById(divId).classList.add('is-invalid');
                }
                
                sendFormButton.innerHTML = 'Enviar Formulario';
                return console.error( msg )
            }

            divErrors.innerHTML = `<div class="alert alert-success"><i class="bi bi-check-circle"></i> Formulario registrado con éxito. </div>`;
            sendFormButton.innerHTML = 'Enviar Formulario';


            total.innerHTML = 0;
            divTotalVotosReg.innerHTML = 0;
            divDiferenciaVotosMesa.innerHTML = 0;
           
            mesadiferencia.classList.remove('btn-danger');
            mesadiferencia.classList.add('btn-success');
            btnJuradoDiferencia.classList.remove('btn-danger');
            btnJuradoDiferencia.classList.add('btn-success');

            for(let el of votosForm.elements) {
                if ( el.name.length > 0) {
                    el.value = '';
                    el.classList.remove('is-invalid');
                }
            }

            setTimeout(()=>{
                divErrors.innerHTML = '';
            },2000);

        })
        .catch( err => {
            console.log(err);
        });

    },1000);

});