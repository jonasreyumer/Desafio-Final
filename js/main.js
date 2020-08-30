// RENUNCIA
  // ---Devuelve---
  // Aguinaldo proporcional
  // Vaciaciones no gozadas
  // Aguinaldo / Vacaciones
  // ---Params---
  // Dias trabajados
  // Meses trabajados TOTAL
  // function agregartxt1(){                
  //   let text = document.createTextNode(". Esto es un nuevo parrafo agregado con appendChild()");                                    
  //   document.getElementById("stepLabel1").appendChild(text); 
  //   } 

  let formToSend = document.getElementById('form1');
        formToSend.addEventListener('submit', function(event) {
            event.preventDefault();
            let title = event.target.elements.firstD.value
            console.log(title)
            function agregartxt1(){
              document.getElementById("sLabel1").appendChild(title);
            }  
        })



  function fnAguinaldoProporcional (salary, semesterWorkingDays) {
    return salary / 360 * semesterWorkingDays;
  }
  
  function fnVacacionesNoGozadas (salary, vacationDays, yearWorkingDays) {
    return (salary / 25 * vacationDays) / 360 * yearWorkingDays;
  }

  function fnIntegracionMesDespido (salary, monthWorkingDays) {
      return (salary / 30 * (30 - monthWorkingDays));
  }


  function resignationLiquidation (yearWorkingDays, semesterWorkingDays, vacationDays, salari) {
    const aguinaldoProporcional = fnAguinaldoProporcional(salari, semesterWorkingDays);
    const vacacionesNoGozadas = fnVacacionesNoGozadas(salari, vacationDays, yearWorkingDays);
    const aguinaldoOverVacaciones = vacacionesNoGozadas / 12;
  
    return {
      resultAsObj: {
        aguinaldoProporcional: aguinaldoProporcional,
        vacacionesNoGozadas: vacacionesNoGozadas,
        aguinaldoOverVacaciones: aguinaldoOverVacaciones
      },
      resultAsArr: [
        aguinaldoProporcional,
        vacacionesNoGozadas,
        aguinaldoOverVacaciones
      ]
    }
  }

  function fireLiquidation (yearWorkingDays, semesterWorkingDays, vacationDays, salari, monthWorkingDays) {
      const aguinaldoProporcional = fnAguinaldoProporcional(salari, semesterWorkingDays);
      const vacacionesNoGozadas = fnVacacionesNoGozadas(salari, vacationDays, yearWorkingDays);
      const aguinaldoOverVacaciones = vacacionesNoGozadas / 12;
      const integracionMesDespido = fnIntegracionMesDespido(salari, monthWorkingDays);
      const mesPreaviso = fnMesPreaviso(salari, monthWorkingDays)



  }