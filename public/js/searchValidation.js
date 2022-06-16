
const formSearchVotos = document.querySelector('#formSearchVotos') || '';
const votosTable = document.querySelector('#votostable');



formSearchVotos.addEventListener('submit', ev => {

    ev.preventDefault();

    const removeScript = document.querySelector("#simpleDatatables");
    
    if (removeScript != null) {

        removeScript.remove();
        
    }
    

    votosTable.innerHTML = '<tr><td class="dataTables-empty" colspan="17"><img src="assets/images/svg-loaders/ball-triangle.svg" class="me-4" style="width: 5rem; height: 5rem;" alt="audio"></td></tr>';
    // votosTable.innerHTML = '<tr><td class="dataTables-empty" colspan="17"><img src="assets/images/progress.gif" class="me-4" style="width: 12rem; height: 12rem" alt="audio"></td></tr>';
    
    let formData = {};

    
    for(let el of formSearchVotos.elements) {
        if ( el.name.length > 0) {
            if(el.value == 0) {
                el.value = '';
            }
            formData[el.name] = el.value;
        }
    }

    setTimeout(() => {


        fetch(url + 'votos', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { Authorization: token, 'Content-Type': 'application/json' }
        })
        .then( res => res.json())
        .then( msg => {

            if(msg.votos.length === 0 ) {
                votosTable.innerHTML = '<td class="dataTables-empty" colspan="17">No se encontrarón resultados</td>';
                return;
            }


            if( msg.errors ){

                for ( let e in msg.errors) {
                    alert(`${msg.errors[e].msg}`)
                }
                
                return console.error( msg )
            }

            
            let tableHTML = '';


            for ( let v in msg.votos) {

                tableHTML += `
                    <tr>
                        <td id="id" style="visibility:collapse; display:none;">${msg.votos[v].id}</td>
                        <td id="codigo_dep">${msg.votos[v].codigo_dep}</td>
                        <td id="codigo_mun">${msg.votos[v].codigo_mun}</td>
                        <td id="zona">${msg.votos[v].zona}</td>
                        <td id="puesto">${msg.votos[v].puesto}</td>
                        <td id="mesa">${msg.votos[v].mesa}</td>
                        <td id="sufragantes_formatoe11">${msg.votos[v].sufragantes_formatoe11}</td>
                        <td id="votos_urna">${msg.votos[v].votos_urna}</td>
                        <td id="votos_incinerados">${msg.votos[v].votos_incinerados}</td>
                        <td id="liga_rodolfoh">${msg.votos[v].liga_rodolfoh}</td>
                        <td id="liga_gustavop">${msg.votos[v].liga_gustavop}</td>
                        <td id="voto_blanco">${msg.votos[v].voto_blanco}</td>
                        <td id="voto_nulo">${msg.votos[v].voto_nulo}</td>
                        <td id="voto_nomarcado">${msg.votos[v].voto_nomarcado}</td>
                        <td id="total_votosmesa">${msg.votos[v].total_votosmesa}</td>
                        <td id="novedad_presentada">${msg.votos[v].novedad_presentada}</td>
                        <td id="accion">
                            <button id="editar" onClick="editEntry(this)" class="bi bi-pencil" style="padding: 2px; background: none; border: 0; color:green; cursor: pointer;" alt="editar"></button>
                            <button id="borrar" onClick="deleteEntry(this)" class="bi bi-trash" style="padding: 2px; margin-left: 10px; background: none; border: 0; color:brown; cursor: pointer;" alt="editar"></button>
                        </td>
                    </tr>`;
            }

            
            let script = document.createElement('script');
            script.id = 'simpleDatatables';
            script.src = 'assets/js/extensions/simple-datatables.js';
            document.body.appendChild(script);

            votosTable.innerHTML = tableHTML;

        })
        .catch( err => {
            console.log(err);
        });

    },2500)

});


const clearTable = () => {
    votosTable.innerHTML = '<td class="dataTables-empty" colspan="17">No se encontrarón resultados</td>';
}


