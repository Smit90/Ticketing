import nats, { Message, Stan } from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreatedLister } from "./events/ticker-create-listener";

console.clear();

// stan aka client
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
    url: "http://localhost:4222",
});

stan.on("connect", () => {
    console.log("Listenere connected to NATS");

    stan.on("close", () => {
        console.log("NATS connection closed!");
        process.exit();
    });


    new TicketCreatedLister(stan).listen()

    // const options = stan
    //     .subscriptionOptions()
    //     .setManualAckMode(true)
    //     .setDeliverAllAvailable()
    //     .setDurableName('accounting-service')

    // const subscription = stan.subscribe(
    //     "ticket:created",
    //     "orders-service-queue-group",
    //     options
    // );

    // subscription.on("message", (msg: Message) => {
    //     const data = msg.getData();

    //     if (typeof data === "string") {
    //         console.log(`received event #${msg.getSequence()}, with data: ${data}`);
    //     }
    //     msg.ack();
    // });
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
