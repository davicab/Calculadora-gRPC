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

const server = new grpc.Server();

server.addService(calculatorProto.service, {
  Add: (call, callback) => {
    const { operand1, operand2 } = call.request;
    const result = operand1 + operand2;
    callback(null, { value: result });
  },

  Subtract: (call, callback) => {
    const { operand1, operand2 } = call.request;
    const result = operand1 - operand2;
    callback(null, { value: result });
  },

  Multiply: (call, callback) => {
    const { operand1, operand2 } = call.request;
    const result = operand1 * operand2;
    callback(null, { value: result });
  },

  Divide: (call, callback) => {
    const { operand1, operand2 } = call.request;
    if (operand2 === 0) {
      callback({
        code: grpc.status.INVALID_ARGUMENT,
        details: 'Divisão por zero não é permitida.',
      });
    } else {
      const result = operand1 / operand2;
      callback(null, { value: result });
    }
  },
});


server.bindAsync(
    "0.0.0.0:60055",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      console.log("servidor de calculadora em : http://0.0.0.0:60055");
      server.start();
    }
);