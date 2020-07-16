const fs = require('fs');
class Operation {
  constructor(code) {
    this.code = code;
    this.index = 0;
    this.output = [];
  }
  perform() {
    while (this.code[this.index] != 99) {
      let [opcode, , mode1, mode2] = this.code[this.index]
        .toString()
        .split('')
        .reverse();
      mode1 = mode1 ? +mode1 : 0;
      mode2 = mode2 ? +mode2 : 0;
      opcode = +opcode;
      if (opcode === 4) this.assignOutput(mode1);
      if (opcode === 3) this.input();
      if (opcode === 2) this.mul(mode1, mode2);
      if (opcode === 1) this.add(mode1, mode2);
      if (opcode === 5) this.jumpIfTrue(mode1, mode2);
      if (opcode === 6) this.jumpIfFalse(mode1, mode2);
      if (opcode === 7) this.lessThan(mode1, mode2);
      if (opcode === 8) this.equal(mode1, mode2);
    }
    return [...this.output];
  }
  getParam(mode, i) {
    const pos = this.code[this.index + i];
    const param = mode === 0 ? this.code[pos] : pos;
    return param;
  }
  assignOutput(mode) {
    const param = this.getParam(mode, 1);
    this.output.push(param);
    this.index += 2;
  }
  input() {
    const pos = this.code[this.index + 1];
    this.code[pos] = 5;
    this.index += 2;
  }
  mul(mode1, mode2) {
    const param1 = this.getParam(mode1, 1);
    const param2 = this.getParam(mode2, 2);
    const outputPos = this.code[this.index + 3];
    this.code[outputPos] = param1 * param2;
    this.index += 4;
  }
  add(mode1, mode2) {
    const param1 = this.getParam(mode1, 1);
    const param2 = this.getParam(mode2, 2);
    const outputPos = this.code[this.index + 3];
    this.code[outputPos] = param1 + param2;
    this.index += 4;
  }
  jumpIfTrue(mode1, mode2) {
    const param1 = this.getParam(mode1, 1);
    const param2 = this.getParam(mode2, 2);
    if (param1 != 0) return (this.index = param2);
    this.index += 3;
  }
  jumpIfFalse(mode1, mode2) {
    const param1 = this.getParam(mode1, 1);
    const param2 = this.getParam(mode2, 2);
    if (!param1) return (this.index = param2);
    this.index += 3;
  }
  lessThan(mode1, mode2) {
    const param1 = this.getParam(mode1, 1);
    const param2 = this.getParam(mode2, 2);
    const outputPos = this.code[this.index + 3];
    this.code[outputPos] = param1 < param2 ? 1 : 0;
    this.index += 4;
  }
  equal(mode1, mode2) {
    const param1 = this.getParam(mode1, 1);
    const param2 = this.getParam(mode2, 2);
    const outputPos = this.code[this.index + 3];
    this.code[outputPos] = param1 === param2 ? 1 : 0;
    this.index += 4;
  }
}

const main = () => {
  const content = fs.readFileSync('./testCode.txt', 'utf8');
  const codes = content.split(',').map(e => +e);
  const operation = new Operation(codes);
  const result = operation.perform();
  console.log(result);
};

main();
