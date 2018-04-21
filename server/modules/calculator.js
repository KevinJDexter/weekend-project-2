class Calculator {
  constructor() {
    this.x = '';
    this.y = '';
    this.type = '';
    this.result = '';
    this.history = [];
    this.currentEquation = '';
  }

  addToCurrentEquation () {
    if (this.x == '') {
      this.x = '0';
    }
    if (this.y == '') {
      this.y = '0';
    }
    this.currentEquation = `${this.x} ${this.getOperand()} ${this.y} = ${this.result}`
    // if (this.y == '') {
    //   this.currentEquation = `${this.currentEquation}${this.x} ${this.type} `;
    // } else {
    //   if (this.currentEquation != '') {
    //     this.currentEquation = `${this.currentEquation}${this.y} = ${this.result}`
    //   } else {
    //     this.currentEquation = `${this.x} ${this.type} ${this.y} = ${this.result}`
    //   }
    // }
  }

  submitEquation () {
    let toSend = this.currentEquation;
    this.history.push(this.currentEquation);
    this.currentEquation = '';
    return toSend;
  }

  compute() {
    let x = Number(this.x);
    let y = Number(this.y);
    switch (this.type) {
      case 'Add':
        this.result = x + y;
        break;

      case 'Subtract':
        this.result = x - y;
        break;

      case 'Multiply':
        this.result = x * y;
        break;

      case 'Divide':
        this.result = x / y;
        break;

      default:
        break;
    }

  }

  getOperand() {
    switch (this.type) {
      case 'Add':
        return '+';
        break;

      case 'Subtract':
        return '-';
        break;

      case 'Multiply':
        return '*';
        break;

      case 'Divide':
        return '/';
        break;

      default:
        break;
    }

  }
}

module.exports = Calculator;