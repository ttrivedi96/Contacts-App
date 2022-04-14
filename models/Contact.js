import mongoose from 'mongoose'

/* PetSchema will correspond to a collection in your MongoDB database. */
const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for this pet.'],
        maxlength: [20, 'Name cannot be more than 60 characters'],
    },
    contact: {
        type: Number,
    },
    email: {
        type: String,
        required: [true, 'Please specify the species of your pet.'],
        maxlength: [30, 'Species specified cannot be more than 40 characters'],
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },

    // likes: {
    //     /* List of things your pet likes to do */

    //     type: Array,
    // },

})

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema)