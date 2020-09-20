// Poner un validate para que la outDate sea mayor que inDate siempre !!!!
// debugger

// $('document').ready(() => {

//   $('#step2').hide();
//   $('#step1Label').addClass('label-bold');

//   $("form[name='step1']").validate({
//     rules: {
//       email: {
//         required: true,
//         email: true,
//       },
//       password: {
//         required: true,
//         minlenght: 5,
//       }
//     },
//     messages: {
//       email: {
//         required: 'El campo es obligatorio',
//         email: 'Ingrese un email valido'
//       },
//       password: {
//         required: 'lalala',
//         minlenght: 'jejeje',
//       }
//     },
//     submitHandler: (form) => {
//       $('#step1').slideUp("slow", () => {
//         $('#step2').slideDown("slow", () => {
//           $('#step1Label').removeClass('label-bold');
//           $('#step2Label').addClass('label-bold');
//         })
//       });
//     }
//   })
// })

// ------

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
  const result = resignationLiquidationFromRaw(userInput).resultAsArr
  const result2 = fireLiquidationFromRaw(userInput).resultAsArr

  if($('#step-5-input').value = true) {
    document.getElementById('step-final').classList.remove('d-none')
    document.getElementById('final-result').innerText = '$' + result.reduce((a, b) => a+b).toFixed(2)
    document.getElementById('submit-btn').classList.add('d-none')

  }
  else {
    document.getElementById('step-final').classList.remove('d-none')
    document.getElementById('final-result').innerText = '$' + result2.reduce((a, b) => a+b).toFixed(2)
    document.getElementById('submit-btn').classList.add('d-none')
  }

  debugger
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
updateInputVisibiliy()

console.log(userInput[1]);