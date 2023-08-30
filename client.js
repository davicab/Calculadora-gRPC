const grpc = require("@grpc/grpc-js");
const loader = require('@grpc/proto-loader');

const packageDefinitionAdd = loader.loadSync('./add-server/add.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const packageDefinitionSubtract = loader.loadSync('./subtract-server/subtract.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const packageDefinitionMultiply = loader.loadSync('./multiply-server/multiply.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const packageDefinitionDivide = loader.loadSync('./divide-server/divide.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
// Carregar mais packageDefinition para multiplicação e divisão

const addProto = grpc.loadPackageDefinition(packageDefinitionAdd);
const subtractProto = grpc.loadPackageDefinition(packageDefinitionSubtract);
const multiplyProto = grpc.loadPackageDefinition(packageDefinitionMultiply);
const dividetProto = grpc.loadPackageDefinition(packageDefinitionDivide);

// Carregar mais protos para multiplicação e divisão

const addClient = new addProto.Add('localhost:60051', grpc.credentials.createInsecure());
const subtractClient = new subtractProto.Subtract('localhost:60052', grpc.credentials.createInsecure());
const multiplyClient = new multiplyProto.Multiply('localhost:60053', grpc.credentials.createInsecure());
const divideClient = new dividetProto.Divide('localhost:60054', grpc.credentials.createInsecure());

// Criar mais clientes para multiplicação e divisão

const operands = { operand1: 10, operand2: 5 };

addClient.Add(operands, (error, response) => {
  if (!error) {
    console.log('Soma:', response.value);
  } else {
    console.error('Error:', error);
  }
});

subtractClient.Subtract(operands, (error, response) => {
  if (!error) {
    console.log('Subtração:', response.value);
  } else {
    console.error('Error:', error);
  }
});

multiplyClient.Multiply(operands, (error, response) => {
  if (!error) {
    console.log('Multiplicação:', response.value);
  } else {
    console.error('Error:', error);
  }
});

divideClient.Divide(operands, (error, response) => {
  if (!error) {
    console.log('Divisão:', response.value);
  } else {
    console.error('Error:', error);
  }
});

