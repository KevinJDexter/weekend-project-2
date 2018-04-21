class Calculator {
  constructor() {
    this.x = '';
    this.y = '';
    this.type = '';
    this.result = '';
    this.history = [];
    this.currentEquation = '';
    this.sequence = {
      numSequence: [],
      operandSequence: []
    }
  }

  addToCurrentEquation (toAdd) {
    this.currentEquation = `${this.currentEquation}${toAdd.x} ${this.getOperand(toAdd.type)} `;
    this.sequence.numSequence.push(toAdd.x);
    this.sequence.operandSequence.push(toAdd.type);
  }

  // addToCurrentEquation () {
  //   // if (this.x == '') {
  //   //   this.x = '0';
  //   // }
  //   // if (this.y == '') {
  //   //   this.y = '0';
  //   // }
  //   // this.currentEquation = `${this.x} ${this.getOperand()} ${this.y} = ${this.result}`
  //   if (this.y == '') {
  //     this.currentEquation = `${this.currentEquation}${this.x} ${this.type} `;
  //     this.sequence.numSequence.push(this.x);
  //     this.sequence.operandSequence.push(this.type);
  //   } else {
  //     if (this.currentEquation != '') {
  //       this.currentEquation = `${this.currentEquation}${this.y} = ${this.result}`;
  //       this.sequence.numSequence.push(this.y);
  //     } else {
  //       this.currentEquation = `${this.x} ${this.type} ${this.y} = ${this.result}`;
  //       this.sequence.numSequence.push(this.x);
  //       this.sequence.numSequence.push(this.y);
  //       this.sequence.operandSequence.push()
  //     }
  //   }
  // }

  submitEquation (finalVariable) {
    this.sequence.numSequence.push(finalVariable);

    this.compute();

    this.currentEquation = `${this.currentEquation}${finalVariable} = ${this.result}`;

    let toSend = this.currentEquation;
    this.history.push(this.currentEquation);
    this.currentEquation = '';
    return toSend;
  }

  compute() {
    let x;
    let y;
    let type;
    while (this.sequence.numSequence.length > 1) {
      let multiplyIndex = this.sequence.operandSequence.indexOf('Multiply');
      let divideIndex = this.sequence.operandSequence.indexOf('Divide');
      if (multiplyIndex >= 0 || divideIndex >= 0) {
        let nextIndex = Math.min(multiplyIndex, divideIndex);
        if (nextIndex == -1) {
          nextIndex = Math.max(multiplyIndex, divideIndex);
        }
        x = this.sequence.numSequence[nextIndex];
        y = this.sequence.numSequence.splice(nextIndex + 1, 1)[0];
        type = this.sequence.operandSequence.splice(nextIndex, 1)[0];
        this.sequence.numSequence[nextIndex] = this.computeSection({x: x, y: y, type: type});
      } else {
        x = this.sequence.numSequence.shift();
        y = this.sequence.numSequence.shift();
        type = this.sequence.operandSequence.shift();
        this.sequence.numSequence.unshift(this.computeSection({x: x, y: y, type: type}));

      }


    }
    this.result = this.sequence.numSequence.shift();
  }

  computeSection(section) {
    let x = Number(section.x);
    let y = Number(section.y);
    switch (section.type) {
      case 'Add':
        return x + y;
        break;

      case 'Subtract':
        return x - y;
        break;

      case 'Multiply':
        return x * y;
        break;

      case 'Divide':
        return x / y;
        break;

      default:
        break;
    }

  }

  getOperand(type) {
    switch (type) {
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