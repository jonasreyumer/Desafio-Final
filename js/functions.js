const currentYear = (new Date()).getFullYear();

const halfYear = new Date('jun 30')
halfYear.setYear(currentYear)
const year0 = new Date('jan 1')
year0.setYear(currentYear)

function getDateDifference (date1, date2) {
  const ms = date1 - date2
  const s = ms/1000
  const mins = s/60
  const hours = mins/60
  const days = hours/24
  const months = days/30
  
  return {
    ms,
    s,
    mins,
    hours,
    days,
    months,
  }
}

function fnLeftDays (outdate) {

  const date = new Date(outdate)
  const dateAux = new Date(outdate)
  dateAux.setMonth(dateAux.getMonth() + 1)
  dateAux.setDate(0)
  const maxDays = dateAux.getDate()

  return maxDays - parseInt(date.getUTCDate());
  // dias faltantes del mes
}

function fnWorkingMonths(indate, outdate) {
  const diff = getDateDifference(outdate, indate)
  return Math.round(diff.months);
  // diferencia en meses
};

function fnNumberY(indate, outdate) {
  const months = fnWorkingMonths(indate, outdate) - 3
  if (months < 0) return 0
  return Math.floor(months / 12) + 1
};

function fnsemesterWorking(indate, outdate) {

  if ((outdate <= halfYear && indate >= year0) || (outdate > halfYear && indate >= halfYear)) {
    return Math.round(getDateDifference(outdate, indate).days);
  }
  else if (outdate > halfYear && indate < halfYear) {
    return Math.round(getDateDifference(outdate, halfYear).days);
  }
  else if (outdate > year0 && indate < year0) {
    return Math.round(getDateDifference(outdate, year0).days);
  }
  // diferencia en dias
}

function fnyearWorkingDays(indate, outdate) {
  if (indate >= year0) {
    return Math.round(getDateDifference(outdate, indate).days);
  }
  else if (indate < year0) {
    return Math.round(getDateDifference(outdate, year0).days);
  }
  // diferencia en dias
}

function fnVacationDays(indate, outdate, pendVac) {
  const diff = getDateDifference(outdate, indate)
  const months = diff.months
  if (months < 60) return (14 + pendVac)
  if (months >= 60 && months < 120) return (21 + pendVac)
  if (months >= 120 && months < 240) return (28 + pendVac)
  if (months >= 240) return (35 + pendVac)
}

function fnVacacionesNoGozadas(salary, vacationDays, yearWorkingDays) {
  console.log(vacationDays)
  console.log(yearWorkingDays)
  return Math.round((salary / 25 * vacationDays) / 360 * yearWorkingDays);
}

function fnAguinaldoProporcional(salary, semesterWorkingDays) {
  console.log(salary, semesterWorkingDays)
  return Math.round(salary / 360 * semesterWorkingDays);
}

function fnPreAviso(months) {
  if (months < 3) return (1 / 2)
  if (months >= 3 && months < 60) return 1
  return 2
}

function resignationLiquidation(yearWorkingDays, semesterWorkingDays, vacationDays, salary) {
  const aguinaldoProporcional = fnAguinaldoProporcional(salary, semesterWorkingDays);
  const vacacionesNoGozadas = fnVacacionesNoGozadas(salary, vacationDays, yearWorkingDays);
  const aguinaldoOverVacaciones = Math.round(vacacionesNoGozadas / 12);

  const resultAsArr = [
    aguinaldoProporcional,
    vacacionesNoGozadas,
    aguinaldoOverVacaciones
  ]
  const total = resultAsArr.reduce((a, b) => a + b)
  resultAsArr.push(total)
 
  return {
    resultAsObj: {
      'Aguinaldo Proporcional': aguinaldoProporcional,
      'Vacaciones no Gozadas': vacacionesNoGozadas,
      'Aguinaldo sobre Vacaciones': aguinaldoOverVacaciones,
      'Total': total
    },
    resultAsArr
  }
}

function resignationLiquidationFromRaw(input) {
  // const userInput = [
  //   null, // inDate
  //   null, // outDate
  //   null, // salary
  //   null, // pendingVacation
  //   null, // type
  // ]

  const yearWorkingDays = fnyearWorkingDays(input[0], input[1])
  const semesterWorkingDays = fnsemesterWorking(input[0], input[1])
  const vacationDays = fnVacationDays(input[0], input[1], parseInt(input[3]))
  return resignationLiquidation(yearWorkingDays, semesterWorkingDays, vacationDays, parseInt(input[2]))

}

function fireLiquidation(salary, NumberY, NumberA, leftDays) {
  const art245 = Math.round(salary * NumberY);
  const preAviso = Math.round(salary * NumberA);
  const integracion = Math.round(salary / 30 * leftDays);
  // const liqresignation = resignation;

  const resultAsArr = [
    art245,
    preAviso,
    integracion,
  ]
  const total = resultAsArr.reduce((a, b) => a + b)
  resultAsArr.push(total)
  return {
    resultAsObj: {
      'Indemnización por antigüedad': art245,
      'Indemnización de Pre-aviso': preAviso,
      'Integracion mes de despido': integracion,
      'Total': total
    },
    resultAsArr
  }
}
function fireLiquidationFromRaw(input) {
  // const userInput = [
  //   null, // inDate
  //   null, // outDate
  //   null, // salary
  //   null, // pendingVacation
  //   null, // type
  
  const yearWorkingDays = fnyearWorkingDays(input[0], input[1])
  const semesterWorkingDays = fnsemesterWorking(input[0], input[1])
  const vacationDays = fnVacationDays(input[0], input[1], parseInt(input[3]))
  const NumberY = fnNumberY(input[0], input[1])
  const NumberA = fnPreAviso(input[0], input[1])
  const leftDays = fnLeftDays(input[1])

  return fireLiquidation(parseInt(input[2]), NumberY, NumberA, leftDays)

}


function calculateLiquidation(input) {
  const resignationResult = resignationLiquidationFromRaw(userInput).resultAsObj
  const fireResult = fireLiquidationFromRaw(userInput).resultAsObj

  // if(input[4]) return resignationResult
  // else return [ ...resignationResult, ...fireResult ]
  return (input[4] ? resignationResult : { ...resignationResult, ...fireResult, Total: resignationResult.Total + fireResult.Total })
}