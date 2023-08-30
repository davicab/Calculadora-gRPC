const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "./add-server/add.proto";
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
  
server.addService(calculatorProto.Add.service, {
    Add: (call, callback) => {
      const { operand1, operand2 } = call.request;
      const result = operand1 + operand2;
      callback(null, { value: result });
    },
});

server.bindAsync(
    "0.0.0.0:60051",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      console.log("servidor de soma rodando em : http://0.0.0.0:60051");
      server.start();
    }
);