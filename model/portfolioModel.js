import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
    banner: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true,
    },
    asset: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});


const portfolioSectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
}, {
    timestamps: true,
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);
const PortfolioSection = mongoose.model('Section', portfolioSectionSchema);

export { Portfolio, PortfolioSection };
