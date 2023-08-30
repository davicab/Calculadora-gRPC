const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "./divide-server/divide.proto";
var protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
  
const calculatorProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
  
server.addService(calculatorProto.Divide.service, {
    Divide: (call, callback) => {
        const { operand1, operand2 } = call.request;
        if (operand2 === 0) {
          callback({ code: grpc.status.INVALID_ARGUMENT, details: 'nao se pode dividir por zero' });
          return;
        }
        const result = operand1 / operand2;
        callback(null, { value: result });
      },
});
  
server.bindAsync(
    "0.0.0.0:60054",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      console.log("servidor de divisao rodando em : http://0.0.0.0:60054");
      server.start();
    }
);