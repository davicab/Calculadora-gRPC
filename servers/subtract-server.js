const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "./subtract-config/subtract.proto";
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
  
server.addService(calculatorProto.Subtract.service, {
    Subtract: (call, callback) => {
      const { operand1, operand2 } = call.request;
      const result = operand1 - operand2;
      callback(null, { value: result });
    },
});
  
server.bindAsync(
    "0.0.0.0:60052",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      console.log("servidor de subtracao rodando em : http://0.0.0.0:60052");
      server.start();
    }
);