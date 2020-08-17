// RENUNCIA
  // ---Devuelve---
  // Aguinaldo proporcional
  // Vaciaciones no gozadas
  // Aguinaldo / Vacaciones
  // ---Params---
  // Dias trabajados
  // Meses trabajados TOTAL


function fnAguinaldoProporcional (salary, semesterWorkingDays) {
  return salary / 360 * semesterWorkingDays
}

function fnVacacionesNoGozadas (salary, vacationDays, yearWorkingDays) {
  return (salary / 25 * vacationDays) / 360 * yearWorkingDays
}

function resignationLiquidation (yearWorkingDays, semesterWorkingDays, vacationDays, salari) {
  const aguinaldoProporcional = fnAguinaldoProporcional(salari, semesterWorkingDays)
  const vacacionesNoGozadas = fnVacacionesNoGozadas(salari, vacationDays, yearWorkingDays)
  const aguinaldoOverVacaciones = vacacionesNoGozadas / 12

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


// ------------------------------------------


function onButtonClick () {
  const inputYearWorkingDays = parseInt(document.getElementById("input-year-working-days").value)
  const inputSemesterWorkingDays = parseInt(document.getElementById("input-semester-working-days").value)
  const inputVacationDays = parseInt(document.getElementById("input-vacation-days").value)
  const inputSalari = parseInt(document.getElementById("input-salari").value)

  const result = resignationLiquidation(inputYearWorkingDays, inputSemesterWorkingDays, inputVacationDays, inputSalari)

  const resultElementIds = [
    'result-aguinaldo-proporcional',
    'result-vacaciones-no-gozadas',
    'result-aguinaldo-over-vacaciones'
  ]

  resultElementIds.forEach((id, i) => {
    const element = document.getElementById(id)
    element.innerText = result.resultAsArr[i]
  })
}