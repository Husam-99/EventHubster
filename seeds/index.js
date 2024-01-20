const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Event = require('../models/event');

mongoose.connect('mongodb://localhost:27017/EventHubster');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Event.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const eve = new Event({
            author: '65a176e0db61e5c49b2a3ab0',
            location: `${cities[random1000].name}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit vitae nisi eius suscipit omnis sequi reiciendis fuga, fugiat rem quia, porro libero earum dignissimos similique corrupti hic amet optio sapiente.',
            price,
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].coords.lon, cities[random1000].coords.lat]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dpi44rj66/image/upload/v1705156222/EventHubster/js5yctxxrdkoc04alerq.png',
                    filename: 'EventHubster/js5yctxxrdkoc04alerq',
                },
                {
                    url: 'https://res.cloudinary.com/dpi44rj66/image/upload/v1705159262/EventHubster/yn4mikfkg8nxl8gsuhwv.jpg',
                    filename: 'EventHubster/yn4mikfkg8nxl8gsuhwv',
                }
            ]
        });
        await eve.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})