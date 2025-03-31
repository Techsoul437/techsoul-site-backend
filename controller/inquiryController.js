import Inquiry from '../model/inquiryModel.js';

export const createInquiry = async (req, res) => {
    const { firstName, lastName, mobileNumber, email, message } = req.body;

    try {
        if (!firstName || !lastName || !mobileNumber || !email || !message) {
            return res.status(400).json({
                response: 400,
                msg: 'All fields are required',
                success: false,
            });
        }

        const newInquiry = new Inquiry({
            firstName,
            lastName,
            mobileNumber,
            email,
            message,
        });

        await newInquiry.save();

        return res.status(200).json({
            response: 200,
            msg: 'Inquiry created successfully',
            success: true,
            data: newInquiry,
        });

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            response: 500,
            msg: 'Server Error',
            success: false,
        });
    }
};

export const getAllInquiries = async (req, res) => {
    try {
        const { search } = req.body;  

        let searchCriteria = {};

        if (search) {
            searchCriteria = {
                $or: [
                    { firstName: { $regex: search, $options: 'i' } },
                    { lastName: { $regex: search, $options: 'i' } },
                    { mobileNumber: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                    { message: { $regex: search, $options: 'i' } },
                ],
            };
        }

        const inquiries = await Inquiry.find(searchCriteria);

        if (inquiries.length === 0) {
            return res.status(200).json({
                response: 200,
                msg: 'No inquiries found',
                success: false,
                data: [],
            });
        }

        return res.status(200).json({
            response: 200,
            msg: 'Inquiries fetched successfully',
            success: true,
            data: inquiries,
        });

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            response: 500,
            msg: 'Server Error',
            success: false,
        });
    }
};

export const deleteInquiry = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(404).json({
                response: 404,
                msg: 'ID not provided',
                success: false,
            });
        }

        const inquiry = await Inquiry.findByIdAndDelete(req.params.id);

        if (!inquiry) {
            return res.status(404).json({
                response: 404,
                msg: 'Inquiry not found',
                success: false,
            });
        }
        return res.status(200).json({
            response: 200,
            msg: 'Inquiry deleted successfully',
            success: true,
        });

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            response: 500,
            msg: 'Server Error',
            success: false,
        });
    }
};

export const updateInquiry = async (req, res) => {
    const { isRead } = req.body;

    try {
        if (!req.params.id) {
            return res.status(404).json({
                response: 404,
                msg: 'id not found',
                success: false,
            });
        }

        const inquiryToUpdate = await Inquiry.findById(req.params.id);

        if (!inquiryToUpdate) {
            return res.status(404).json({
                response: 404,
                msg: 'Inquiry not found',
                success: false,
            });
        }

        const updatedInquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });

        return res.status(200).json({
            response: 200,
            msg: 'Inquiry updated successfully',
            success: true,
            data: updatedInquiry,
        });

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            response: 500,
            msg: 'Server Error',
            success: false,
        });
    }
};