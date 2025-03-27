import mongoose from 'mongoose';

const faqDepartmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, 
        trim: true,
    },
}, {
    timestamps: true, 
});

const FaqDepartment = mongoose.model('FaqDepartment', faqDepartmentSchema);

export default FaqDepartment;
