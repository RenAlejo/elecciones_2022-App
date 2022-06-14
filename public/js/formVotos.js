const url = ( window.location.hostname.includes('localhost')) 
            ? 'http://localhost:8181/api/'
            : 'https://votaciones2022.herokuapp.com/api/';

let token = localStorage.getItem('token') || '';

let formJurado = {
    "e11": 0,
    "votosUrna": 0,
    "votosIncinerados": 0
}

let formReg = {
    "rh": 0,
    "gp": 0,
    "votoblanco": 0,
    "votonulo": 0,
    "votonomarcado": 0,
    "totalVotos": 0,
}

let formMesa = {
    "totalVotosMesa": 0
}

let userInfo = null;


const getDepartamentos = async () => {
    
    const departamentos =  await fetch( url + 'departamentos', {
        headers: {'Authorization': token}
    })
    
    const { ...res } = await departamentos.json();
    const selectDepartamentos = document.querySelector('#departamentosSelect');

    for ( let i in res.departamentos ) {
        
        let option = document.createElement('option');
        option.value = res.departamentos[i].cod_dep;
        option.text = res.departamentos[i].departamento;

        selectDepartamentos.add(option);
    }

    if ( res.user.departamento != '' && res.user.municipio != '') {

        selectDepartamentos.value = res.user.departamento;
        getMunicipios(res.user.departamento, res.user.municipio);
        
    }


}


const clearSelect = (select) => {
    for (let i = select.options.length; i >= 0; i--) {
        select.remove(i);
    }
};


const getMunicipios = async(codep, ...rest) => {

    const municipios = await fetch( url + `municipios/${codep}`, {
        headers: { Authorization: token}
    })
    
    const { ...municipiosList } = await municipios.json();

    const selectMunicipios = document.querySelector('#municipiosSelect');
    selectMunicipios.disabled = false;
    clearSelect(selectMunicipios);

    if( parseInt(codep) === 0 ){
        selectMunicipios.disabled = true;
    }
    
    for ( let i in municipiosList.municipios ) {
        
        let option =  document.createElement('option');
        option.value = municipiosList.municipios[i].codigo_mun;
        option.text = municipiosList.municipios[i].municipio;
        
        selectMunicipios.add(option);
        
    }

    if(rest.length > 0) {
        selectMunicipios.value = rest[0];
    }

}


const getTipologias = async () => {

    const tipologias = await fetch(url + 'tipologia', {
        headers: {Authorization: token}
    })

    const { ...tipologiasList } = await tipologias.json();

    const selectTipologias = document.querySelector('#tipologiasSelect');

    for ( let i in tipologiasList.tipologias) {

        let option = document.createElement('option');
        option.value = tipologiasList.tipologias[i].codigo_tipologia;
        option.text = tipologiasList.tipologias[i].desc_tipologia;

        selectTipologias.add(option);

    }

}


const sumJurado = value => {

    
    e11 = (value.desc == "e11") ? formJurado.e11 = value.value : 0;
    votosUrna = (value.desc == "votosurna") ? formJurado.votosUrna = value.value : 0;
    votosIncinerados = (value.desc == "votosincinerados") ? formJurado.votosIncinerados = value.value : 0;

    let totalValue = 0;

    if(formJurado.e11 != 0 && parseInt(formJurado.votosUrna) - parseInt(formJurado.votosIncinerados) != 0) {

        let divWarning = document.getElementById("juradodiferencia");
        totalValue = (parseInt(formJurado.votosUrna) - parseInt(formJurado.votosIncinerados)) - parseInt(formJurado.e11);

        if(totalValue < 0) {
            totalValue = totalValue * -1;
            divWarning.classList.remove("btn-success");
            divWarning.classList.add("btn-danger");
            document.getElementById("total").innerHTML = totalValue;
        } else if( totalValue != 0) {
            divWarning.classList.remove("btn-success");
            divWarning.classList.add("btn-danger");
            document.getElementById("total").innerHTML = totalValue;
        }else {
            divWarning.classList.remove("btn-danger");
            divWarning.classList.add("btn-success");
            document.getElementById("total").innerHTML = 0;
        }

    }
}

const sumReg = value => {


    rh = (value.desc == "rh") ? formReg.rh = value.value : 0;
    gp = (value.desc == "gp") ? formReg.gp = value.value : 0;
    votoblanco = (value.desc == "votoblanco") ? formReg.votoblanco = value.value : 0;
    votonulo = (value.desc == "votonulo") ? formReg.votonulo = value.value : 0;
    votonomarcado = (value.desc == "votonomarcado") ? formReg.votonomarcado = value.value : 0;

    var totalValue = 0;

    totalValue = document.getElementById("totalVotosReg").innerHTML;
    
    totalValue = (totalValue == null || totalValue == undefined || totalValue == "" ) ? 0 : totalValue;
    totalValue = (parseInt(formReg.rh) + parseInt(formReg.gp) + parseInt(formReg.votoblanco) + parseInt(formReg.votonulo) + parseInt(formReg.votonomarcado));
    formReg.totalVotos = totalValue;
   
    document.getElementById("totalVotosReg").innerHTML = totalValue;

    if(parseInt(formMesa.totalVotosMesa) != 0) {
        sumMesa(parseInt(formMesa.totalVotosMesa));
    }
}

const sumMesa = value => {

    let mesaTotalValue = 0;
    formMesa.totalVotosMesa = value;
    mesaTotalValue = (parseInt(formReg.totalVotos) - parseInt(value));

    let divWarning = document.getElementById("mesadiferencia");
    let divDifference = document.getElementById("diferenciaVotosMesa");

    if(mesaTotalValue < 0) {
        mesaTotalValue = mesaTotalValue * -1;
        divWarning.classList.remove("btn-success");
        divWarning.classList.add("btn-danger");
        divDifference.innerHTML = mesaTotalValue;
    } else if( mesaTotalValue != 0) {
        divWarning.classList.remove("btn-success");
        divWarning.classList.add("btn-danger");
        divDifference.innerHTML = mesaTotalValue;
    }else {
        divWarning.classList.remove("btn-danger");
        divWarning.classList.add("btn-success");
        divDifference.innerHTML = 0;
    }

}

getDepartamentos();
getTipologias();
