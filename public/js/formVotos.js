

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

const sumJurado = (value) => {

    
    e11 = (value.desc == "e11") ? formJurado.e11 = value.value : 0;
    votosUrna = (value.desc == "votosurna") ? formJurado.votosUrna = value.value : 0;
    votosIncinerados = (value.desc == "votosincinerados") ? formJurado.votosIncinerados = value.value : 0;

    let totalValue = 0;

    if(formJurado.e11 != 0 && parseInt(formJurado.votosUrna) + parseInt(formJurado.votosIncinerados) != 0) {

        let divWarning = document.getElementById("juradodiferencia");
        totalValue = (parseInt(formJurado.votosUrna) + parseInt(formJurado.votosIncinerados)) - parseInt(formJurado.e11);

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

const sumReg = (value) => {


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

const sumMesa = (value) => {

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
