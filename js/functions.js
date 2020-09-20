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
  const days = (new Date()).getDay(outdate);
  const diffen = 30 - days;
  return Math.round(diffen.months);
  // dias faltantes del mes
}

function fnWorkingMonths(indate, outdate) {
  const diff = getDateDifference(outdate, indate)
  return Math.round(diff.months);
  // diferencia en meses
};

function fnNumberY(indate, outdate) {
  if ((fnWorkingMonths(indate, outdate)) >= 90) {
    return 1
  }
  // aca necesitaria un for porque deberia ir aumentando
};

function fnsemesterWorking(indate, outdate) {

  if ((outdate <= halfYear && indate >= year0) || (outdate > halfYear && indate >= halfYear)) {
    return getDateDifference(outdate, indate).days;
  }
  else if (outdate > halfYear && indate < halfYear) {
    return getDateDifference(outdate, halfYear).days;
  }
  else if (outdate > year0 && indate < year0) {
    return getDateDifference(outdate, year0).days
  }
  // diferencia en dias
}

function fnyearWorkingDays(indate, outdate) {
  if (indate >= year0) {
    return getDateDifference(outdate, indate).days;
  }
  else if (indate < year0) {
    return getDateDifference(outdate, year0).days;
  }
  // diferencia en dias
}

function fnVacationDays(indate, outdate) {
  const diff = getDateDifference(outdate, indate)
  const months = diff.months
  if (months < 60) return 14
  if (months >= 60 && months < 120) return 21
  if (months >= 120 && months < 240) return 28
  return 35
}


function fnVacacionesNoGozadas(salary, vacationDays, yearWorkingDays) {
  return (salary / 25 * vacationDays) / 360 * yearWorkingDays;
}

function fnAguinaldoProporcional(salary, semesterWorkingDays) {
  console.log(salary, semesterWorkingDays)
  return salary / 360 * semesterWorkingDays;
}

function fnPreAviso() {
  if (months < 3) return (1 / 2)
  if (months >= 3 && months < 60) return 1
  return 2
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
  const vacationDays = fnVacationDays(input[0], input[1])
  return resignationLiquidation(yearWorkingDays, semesterWorkingDays, vacationDays, parseInt(input[2]))

}

function fireLiquidation(salary, NumberY, NumberA, leftDays, resignation) {
  const art245 = salary * NumberY;
  const preAviso = salary * NumberA;
  const integracion = salary / 30 * leftDays;
  const liqresignation = resignation;

  return {
    resultAsObj: {
      art245 = art245,
      preAviso = preAviso,
      integracion = integracion,
      liqresignation = liqresignation,
    },
    resultAsArr: [
      art245,
      preAviso,
      integracion,
      liqresignation,
    ]
  }
}
function fireLiquidationFromRaw() {
  // const userInput = [
  //   null, // inDate
  //   null, // outDate
  //   null, // salary
  //   null, // pendingVacation
  //   null, // type
  
  const yearWorkingDays = fnyearWorkingDays(input[0], input[1])
  const semesterWorkingDays = fnsemesterWorking(input[0], input[1])
  const vacationDays = fnVacationDays(input[0], input[1])
  const NumberY = fnNumberY(input[0], input[1])
  const NumberA = fnPreAviso(input[0], input[1])
  const leftDays = fnLeftDays(input[1])
  const resignation = resignationLiquidation(yearWorkingDays, semesterWorkingDays, vacationDays, parseInt(input[2]))

  return fireLiquidation(parseInt(input[2]), NumberY, NumberA, leftDays, resignation)

}


