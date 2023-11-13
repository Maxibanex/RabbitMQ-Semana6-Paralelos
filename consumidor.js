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
    const micasa = "Gurabo, Calle 20, no. 3"
   
    try{

        const conn = await amqp.connect(rabbitSettings);
        console.log("conexion exitosa");

        const channel = await conn.createChannel();
        console.log("Canal Creado");

        const res = await channel.assertQueue(queue);
        console.log("queue exitosa");

        console.log('Esperando mensaje de: ${micasa}');
        channel.consume(queue, MessageChannel =>{
            let randomQuote = JSON.parse(MessageChannel.content.toString());
            console.log('Mensaje recibido ${randomQuote.name}');
            console.log(randomQuote);


            if(randomQuote.micasa == micasa){
                channel.ack(MessageChannel);
                console.log('Mensaje borrado de cola \n');
            } else{
                console.log('El mensaje no es para este consumidor');
            }
        })

    }catch(err){
        console.error('Error -> ${err}');
    }
}
