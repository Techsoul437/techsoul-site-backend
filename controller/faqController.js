import Faq from '../model/faqModel.js';

export const createFaq = async (req, res) => {
    const { question, answer, department } = req.body;

    try {
        if (!question || !answer || !department) {
            return res.status(400).json({
                response: 400,
                msg: 'All fields are required.',
                success: false,
            });
        }

        const newFaq = new Faq({
            question,
            answer,
            department,
        });

        await newFaq.save();

        return res.status(200).json({
            response: 200,
            msg: 'FAQ created successfully',
            success: true,
            data: newFaq,
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

export const getAllFaqs = async (req, res) => {
    try {
        const { department, search } = req.body;
        let filter = {};
        if (search) {
            filter.$or = [
                { question: { $regex: search, $options: 'i' } },
                { answer: { $regex: search, $options: 'i' } }
            ];
        }

        if (department) filter.department = department;
        if (search && Faq.length === 0) {
            return res.status(200).json({
                response: 200,
                msg: "No results found",
                success: false,
                data: [],
            });
        }

        const faqs = await Faq.find(filter);

        if (search && faqs.length === 0) {
            return res.status(200).json({
                response: 200,
                msg: "No results found",
                success: false,
                data: [],
            });
        }

        if (faqs.length === 0) {
            return res.status(200).json({
                response: 200,
                msg: 'No FAQs found',
                success: false,
                data: [],
            });
        }

        return res.status(200).json({
            response: 200,
            msg: 'FAQs fetched successfully',
            success: true,
            data: faqs,
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

export const getFaqById = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(404).json({
                response: 404,
                msg: 'id not found',
                success: false,
            });
        }
        const faq = await Faq.findById(req.params.id);

        if (!faq) {
            return res.status(404).json({
                response: 404,
                msg: 'FAQ not found',
                success: false,
            });
        }

        return res.status(200).json({
            response: 200,
            msg: 'FAQ fetched successfully',
            success: true,
            data: faq,
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

export const updateFaq = async (req, res) => {
    const { question, answer, department } = req.body;

    try {
        if (!req.params.id) {
            return res.status(404).json({
                response: 404,
                msg: 'id not found',
                success: false,
            });
        }
        if (!question || !answer || !department) {
            return res.status(400).json({
                response: 400,
                msg: 'All fields are required (question, answer, department)',
                success: false,
            });
        }

        const faqToUpdate = await Faq.findById(req.params.id);

        if (!faqToUpdate) {
            return res.status(404).json({
                response: 404,
                msg: 'FAQ not found',
                success: false,
            });
        }

        const updatedFaq = await Faq.findByIdAndUpdate(req.params.id, req.body, { new: true });

        return res.status(200).json({
            response: 200,
            msg: 'FAQ updated successfully',
            success: true,
            data: updatedFaq,
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

export const deleteFaq = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(404).json({
                response: 404,
                msg: 'id not found',
                success: false,
            });
        }
        const faq = await Faq.findByIdAndDelete(req.params.id);

        if (!faq) {
            return res.status(404).json({
                response: 404,
                msg: 'FAQ not found',
                success: false,
            });
        }

        return res.status(200).json({
            response: 200,
            msg: 'FAQ deleted successfully',
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
