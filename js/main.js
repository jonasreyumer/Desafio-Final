let admissionDate = prompt('Fecha de Ingreso');
let terminationDate = prompt('Fecha de Egreso');
let usualSalary = parseInt(prompt('Sueldo Habitual'));
let pendingVacation = prompt('Vacaciones Pendientes');
let type = prompt('Tipo de Liquidacion')

let Info = function(aDate, tDate, uSalary, pVacation) {
    this.admissionDate = aDate;
    this.terminationDate = tDate;
    this.usualSalary = uSalary;
    this.pendingVacation = pVacation;
}
