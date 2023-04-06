import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/Ticket-created-publisher";

console.clear()



// stan aka client
const stan = nats.connect("ticketing", "abc", {
    url: "http://localhost:4222",
});

stan.on("connect", async () => {
    console.log("Publisher connected to NATS");

    const publisher = new TicketCreatedPublisher(stan)
    try {
        await publisher.publish({
            id: "123",
            title: "Concert",
            price: 20,
        })
    } catch (error) {
        console.log("🚀 ~ file: publisher.ts:20 ~ stan.on ~ error:", error)
    }

    // const data = JSON.stringify({
    //     id: "123",
    //     title: "Test event",
    //     price: 20,
    // });

    // stan.publish("ticket:created", data, () => {
    //     console.log("event published")
    // });
});
