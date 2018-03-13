
var customer = {
  name : '',
  order : 0,
  bill : 0,
  checkedIn : false,
  checkOutMessage : ''
};

var foodStockPrices = {
  rice : 180,
  flour : 80,
  beans : 40
};

var readline = require('readline');

var read = readline.createInterface(process.stdin, process.stdout);

var errorCode = 0;

read.setPrompt(`What is your name ? > `);
read.prompt();

read.on('line', answer => {

  if(isNaN(Number(answer)) && customer.checkedIn == false) {

    customer.name = answer;
    process.stdout.write(`\n${customer.name}, How can we help you\n`);

    read.setPrompt(`\nWe offer : \n1. Rice. \n2. Flour. \n3. Beans\n`);
    read.prompt();

    customer.checkedIn = true;

  } else if(isNaN(Number(answer)) && customer.checkedIn == false) {
    errorCode = -1;
    read.close();
  } else if(customer.checkedIn) {

    switch(Number(answer.trim())) {
        case 1:
          customer.order = "Rice";
          customer.bill = foodStockPrices.rice;
          read.close();
          break;
        case 2:
          customer.order = "Flour";
          customer.bill = foodStockPrices.flour;
          read.close();
          break;
        case 3:
          customer.order = "Beans";
          customer.bill = foodStockPrices.beans;
          read.close();
          break;
        default:
          console.log(`\n${customer.name}, that was a wrong input. Please try again.\n`);
    }
  } else {
    console.log(`\nThat was a wrong input. Please try again.\n`);
  }


});

read.on('close', () => {
  if(errorCode === -1) {
    read.setPrompt(`\nWrong Input Now exiting\n`);
    read.prompt();
    process.exit();
  } else {
    customer.checkOutMessage = `\n${customer.name}, You have orderd ${customer.order} and your bill is $${customer.bill}\n`;
    read.setPrompt(customer.checkOutMessage);
    read.prompt();
    process.exit();
  }
});

process.on('exit', () => {
  if(errorCode != -1) {
    process.stdout.write(`\nThank you ${customer.name} for using my first Node.js App, Takecare\n`);
  }
});
