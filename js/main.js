function DateFormat(date) {
  let dt = new Date(date);
  return (`${dt.getUTCDate()}/${dt.getUTCMonth()+1}/${dt.getUTCFullYear()}`)
}

function onSubmit (event) {
  event.preventDefault()
  if (currentStep > totalSteps) return
  // buscar valor
  const inputElement = document.getElementById('step-' + currentStep + '-input')
  let value = inputElement.value
  if (currentStep <= 2) {
    value = new Date(value)
  } else if (currentStep === 5) {
    value = $(inputElement).is(':checked')
  }

  userInput[currentStep - 1] = value
  
  const element = document.getElementById('step-' + currentStep + '-info')
  if (currentStep <= 2) {
    element.innerText = DateFormat(userInput[currentStep - 1])
  } else if (currentStep === 3) {
    element.innerText = ('$' + userInput[currentStep - 1])
  } else if (currentStep === 4){
    element.innerText = userInput[currentStep - 1]
  } else if (currentStep === 5) {
    if ($(inputElement).is(':checked')) {
      element.innerText = 'Renuncia'
    } else {
      element.innerHTML = 'Despido Sin Causa'
    }
  }


  currentStep += 1
  updateInputVisibility()
  bolderInput()
  greyCircle()

  if (currentStep > totalSteps) onFinalSubmit()
}


function updateInputVisibility () {
  for (let i = 1; i <= totalSteps; i++) {
    let functionName

    if (i === currentStep) functionName = 'remove'
    else functionName = 'add'

    document.getElementById('step-' + i).classList[functionName]('d-none')
  }
}
function bolderInput () {
  for (let i = 1; i <= totalSteps; i++) {
    let functionName

    if (i === currentStep) functionName = 'add'
    else functionName = 'remove'

    document.getElementById('stepSmall' + i).classList[functionName]('font-weight-bold')
    document.getElementById('stepSmall' + i).classList[functionName]('h5')
  }
}
function greyCircle () {
  for (let i = 1; i <= totalSteps; i++) {
    let functionName

    if (i < currentStep) {
      document.getElementById('stepNumber' + i).classList.remove('btn-primary')
      document.getElementById('stepNumber' + i).classList.add('btn-secondary') 
    }
  }
}

function onFinalSubmit () {
  console.log(userInput)
  
  const result = calculateLiquidation(userInput)
  
  document.getElementById('step-6').classList.remove('d-none')
  document.getElementById('stepSmall6').classList.add('font-weight-bold')
  document.getElementById('stepSmall6').classList.add('h5')

  const $list = $('.results-list')
  for (const key in result) {
    if (key === 'Total') continue
    $list.append(`<li>${key}: $${result[key]}</li>`)
  }
  $('#final-result').text(`Total: $${result['Total']}`)

  document.getElementById('submit-btn').classList.add('d-none')

};


// ------------------------------------------

let currentStep = 1
const totalSteps = 5

const userInput = [
  null, // inDate
  null, // outDate
  null, // salary
  null, // pendingVacation
  null, // type
]

const formToSend = document.getElementById('form-1');

formToSend.addEventListener('submit', onSubmit)
updateInputVisibility()
bolderInput()

console.log(userInput[1]);