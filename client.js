const http = require('http');
const fs = require('fs');
const path = require('path');
const grpc = require("@grpc/grpc-js");
const loader = require('@grpc/proto-loader');

const packageDefinitionAdd = loader.loadSync('./add-config/add.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const packageDefinitionSubtract = loader.loadSync('./subtract-config/subtract.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const packageDefinitionMultiply = loader.loadSync('./multiply-config/multiply.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const packageDefinitionDivide = loader.loadSync('./divide-config/divide.proto', {
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

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    const filePath = path.join(__dirname, 'frontend', 'index.html');
    const contentType = 'text/html';
    
    fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading the file');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  }
});
let addBut = document.getElementById('add');
addBut.addEventListener(('click'), ()=>{
  addClient.Add(operands, (error, response) => {
    if (!error) {
      console.log('Soma:', response.value);
    } else {
      console.error('Error:', error);
    }
  });
})
// Capturar eventos dos botões e enviar solicitações gRPC...

server.listen(8080, () => {
  console.log('Server running at http://localhost:8080/');
});