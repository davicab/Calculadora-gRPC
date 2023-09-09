const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './calc-config/calculator.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const calculatorProto = grpc.loadPackageDefinition(packageDefinition).Calculator;

const client = new calculatorProto('localhost:60055', grpc.credentials.createInsecure());

const operands = { operand1: 158, operand2: 2 };

client.Add(operands, (error, response) => {
  if (!error) {
    console.log('Resultado da Adição:', response.value);
  } else {
    console.error('Erro na Adição:', error);
  }
});

client.Subtract(operands, (error, response) => {
  if (!error) {
    console.log('Resultado da Subtração:', response.value);
  } else {
    console.error('Erro na Subtração:', error);
  }
});

client.Multiply(operands, (error, response) => {
  if (!error) {
    console.log('Resultado da Multiplicação:', response.value);
  } else {
    console.error('Erro na Multiplicação:', error);
  }
});

client.Divide(operands, (error, response) => {
  if (!error) {
    console.log('Resultado da Divisão:', response.value);
  } else {
    console.error('Erro na Divisão:', error);
  }
});