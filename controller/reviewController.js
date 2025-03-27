import Review from '../model/reviewModel.js';

export const createReview = async (req, res) => {
    const { clientPhoto, name, review, project, position, location } = req.body;

    try {
        if (!clientPhoto || !name || !review || !project || !position || !location) {
            return res.status(400).json({
                response: 400,
                msg: 'All fields are required',
                success: false,
            });
        }

        const newReview = new Review({
            clientPhoto,
            name,
            review,
            project,
            position,
            location,
        });

        await newReview.save();

        return res.status(200).json({
            response: 200,
            msg: 'Review created successfully',
            success: true,
            data: newReview,
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

export const getAllReviews = async (req, res) => {
    try {
        const { search, project, location } = req.body;

        let filter = {};

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { project: { $regex: search, $options: 'i' } },
                { position: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } },
            ];
        }

        if (project) filter.project = project;
        if (location) filter.location = location;
        if (search && Review.length === 0) {
            return res.status(200).json({
                response: 200,
                msg: "No results found",
                success: false,
                data: [],
            });
        }

        const reviews = await Review.find(filter);

        if (search && reviews.length === 0) {
            return res.status(200).json({
                response: 200,
                msg: 'No results found',
                success: false,
                data: [],
            });
        }

        return res.status(200).json({
            response: 200,
            msg: 'Reviews fetched successfully',
            success: true,
            data: reviews,
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

export const getReviewById = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(404).json({
                response: 404,
                msg: 'ID not provided',
                success: false,
            });
        }

        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                response: 404,
                msg: 'Review not found',
                success: false,
            });
        }

        return res.status(200).json({
            response: 200,
            msg: 'Review fetched successfully',
            success: true,
            data: review,
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

export const updateReview = async (req, res) => {
    const { clientPhoto, name, review, project, position, location } = req.body;

    try {
        const reviewToUpdate = await Review.findById(req.params.id);

        if (!reviewToUpdate) {
            return res.status(404).json({
                response: 404,
                msg: 'Review not found',
                success: false,
            });
        }

        if (!clientPhoto || !name || !review || !project || !position || !location) {
            return res.status(400).json({
                response: 400,
                msg: 'All fields are required',
                success: false,
            });
        }

        const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });

        return res.status(200).json({
            response: 200,
            msg: 'Review updated successfully',
            success: true,
            data: updatedReview,
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

export const deleteReview = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(404).json({
                response: 404,
                msg: 'ID not provided',
                success: false,
            });
        }

        const review = await Review.findByIdAndDelete(req.params.id);

        if (!review) {
            return res.status(404).json({
                response: 404,
                msg: 'Review not found',
                success: false,
            });
        }

        return res.status(200).json({
            response: 200,
            msg: 'Review deleted successfully',
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