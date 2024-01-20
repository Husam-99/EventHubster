const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } }


const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_100');
});

const EventSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts);


EventSchema.virtual('properties.popUpMarkup').get(function () {
    return `
    <div style="color: #424242">
    <strong><a href="/events/${this._id}">${this.title}</a><strong>
    <p>${this.description.substring(0, 20)}...</p>
    </div>`;
});


EventSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Event', EventSchema);
