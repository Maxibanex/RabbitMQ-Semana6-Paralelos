const amqp = require("amqplib");

const rabbitSettings = {
    protocol: 'amqp',
    hostname: 'localhost',
    port: 5672,
    username: 'maxibanex',
    password: 'maxibanexRG20.',
    vhost: '/',
    authMechanism: ['PLAIN','AMQPLAIN','EXTERNAL']
}

connect();

async function connect(){
    const queue = "yolo";

    const mensajes = [
        {"nombre":"Maxibanex el mejor", "micasa":"Gurabo, Calle 20, no. 3"},
        {"nombre":"Mayii, hermana", "micasa":"Gurabo, Calle 20, no. 3"},
        {"nombre":"Felix, necio", "micasa":"Gurabo, Calle 20, no. 3"},
        {"nombre":"Mom and Dad", "micasa":"Gurabo, Calle 20, no. 3"},
    ]
   
    try{

        const conn = await amqp.connect(rabbitSettings);
        console.log("conexion exitosa");

        const channel = await conn.createChannel();
        console.log("Canal Creado");

        const res = await channel.assertQueue(queue);
        console.log("queue exitosa");

        for(let mensaje in mensajes){
            await channel.sendToQueue(queue, Buffer.from(JSON.stringify(mensajes[mensaje])));
            console.log('Mensaje enviado a cola ${queue}');
        }

    }catch(err){
        console.error('Error -> ${err}');
    }
}
