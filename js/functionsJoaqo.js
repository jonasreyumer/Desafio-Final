function fntotalWorkinM(inDate, outDate){
    // diferencia de meses entre userInput[0] y [1]
    // no pude hacer anda moment.
}
function fnyearWorkingDays (inDate,outDate)



function fnAguinaldoProporcional(salary, semesterWorkingDays) {
    return salary / 360 * semesterWorkingDays;
  }
  
  function fnVacacionesNoGozadas(salary, vacationDays, yearWorkingDays) {
    return (salary / 25 * vacationDays) / 360 * yearWorkingDays;
  }
  
  function fnIntegracionMesDespido(salary, monthWorkingDays) {
    return (salary / 30 * (30 - monthWorkingDays));
  }
  
  
  function resignationLiquidation(yearWorkingDays, semesterWorkingDays, vacationDays, salary) {
    const aguinaldoProporcional = fnAguinaldoProporcional(salary, semesterWorkingDays);
    const vacacionesNoGozadas = fnVacacionesNoGozadas(salary, vacationDays, yearWorkingDays);
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
  
  function fireLiquidation(yearWorkingDays, semesterWorkingDays, vacationDays, salari, monthWorkingDays) {
    const aguinaldoProporcional = fnAguinaldoProporcional(salari, semesterWorkingDays);
    const vacacionesNoGozadas = fnVacacionesNoGozadas(salari, vacationDays, yearWorkingDays);
    const aguinaldoOverVacaciones = vacacionesNoGozadas / 12;
    const integracionMesDespido = fnIntegracionMesDespido(salari, monthWorkingDays);
    const mesPreaviso = fnMesPreaviso(salari, monthWorkingDays);
  }