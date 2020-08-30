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

function fnAguinaldoProporcional(salary, semesterWorkingDays) {
  return salary / 360 * semesterWorkingDays;
}

function fnVacacionesNoGozadas(salary, vacationDays, yearWorkingDays) {
  return (salary / 25 * vacationDays) / 360 * yearWorkingDays;
}

function fnIntegracionMesDespido(salary, monthWorkingDays) {
  return (salary / 30 * (30 - monthWorkingDays));
}


function resignationLiquidation(yearWorkingDays, semesterWorkingDays, vacationDays, salari) {
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

function fireLiquidation(yearWorkingDays, semesterWorkingDays, vacationDays, salari, monthWorkingDays) {
  const aguinaldoProporcional = fnAguinaldoProporcional(salari, semesterWorkingDays);
  const vacacionesNoGozadas = fnVacacionesNoGozadas(salari, vacationDays, yearWorkingDays);
  const aguinaldoOverVacaciones = vacacionesNoGozadas / 12;
  const integracionMesDespido = fnIntegracionMesDespido(salari, monthWorkingDays);
  const mesPreaviso = fnMesPreaviso(salari, monthWorkingDays)
}

// ------

function onSubmit (event) {
  event.preventDefault()
  if (currentStep > totalSteps) return
  // buscar valor
  const value = document.getElementById('step-' + currentStep + '-input').value

  userInput[currentStep - 1] = value


  const element = document.getElementById('step-' + currentStep + '-info')
  console.log(element)
  element.innerText = userInput[currentStep - 1]


  currentStep += 1
  updateInputVisibiliy()

  if (currentStep > totalSteps) onFinalSubmit()
}


function updateInputVisibiliy () {
  for (let i = 1; i <= totalSteps; i++) {
    let functionName

    if (i === currentStep) functionName = 'remove'
    else functionName = 'add'

    document.getElementById('step-' + i).classList[functionName]('d-none')
  }
}

function onFinalSubmit () {
  console.log(userInput)
}


// ------------------------------------------

let currentStep = 1
const totalSteps = 5

const userInput = [
  null, // inDate
  null, // outDate
  null, // salary
  null, // salary
  null, // pendingVacations
]
const formToSend = document.getElementById('form-1');

formToSend.addEventListener('submit', onSubmit)
updateInputVisibiliy()