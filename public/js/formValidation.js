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
    sendFormButton.disabled = true

    const formData = {};
    
    for(let el of votosForm.elements) {
        
        if ( el.name.length > 0) {
            formData[el.name] = el.value;
        }
    }

    sendFormButton.innerHTML = 'Enviando Formulario <div class="spinner-grow spinner-grow-sm justify-content-md-right" role="status"><span class="visually-hidden"></span></div>';
    
    setTimeout(() => {
        
        sendFormButton.innerHTML = 'Validando Información <div class="spinner-grow spinner-grow-sm justify-content-md-right" role="status"><span class="visually-hidden"></span></div>';

        setTimeout(() => {
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
                

                for(let element of votosForm.elements) {
                    
                    if ( element.name.length > 0 && element.name != 'codigo_dep' && element.name != 'codigo_mun') {
                        element.value = '';
                        element.classList.remove('is-invalid');
                    }

                    if ( element.name == 'codigo_dep' && msg.userinfo.departamento != '') {
                        element.value =  msg.userinfo.departamento;
                        element.classList.remove('is-invalid');
                    }

                    if ( element.name == 'codigo_mun' && msg.userinfo.municipio != '') {
                        element.value =  msg.userinfo.municipio;
                        element.classList.remove('is-invalid');
                    }

                }



                formJurado = {
                    "e11": 0,
                    "votosUrna": 0,
                    "votosIncinerados": 0
                }
                formReg = {
                    "rh": 0,
                    "gp": 0,
                    "votoblanco": 0,
                    "votonulo": 0,
                    "votonomarcado": 0,
                    "totalVotos": 0,
                }
                formMesa = {
                    "totalVotosMesa": 0
                }

                sendFormButton.disabled = false
                
                setTimeout(()=>{
                    divErrors.innerHTML = '';
                },2500);
                
            })
            .catch( err => {
                console.log(err);
            });
            
        }, 1000)
        
    },1000);
    

});