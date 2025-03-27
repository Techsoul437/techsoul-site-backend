import Job from '../model/jobsModel.js';

export const createJob = async (req, res) => {
    const { title, time, experience, opening } = req.body;

    try {
        if (!title || !time || !experience || !opening) {
            return res.status(400).json({
                response: 400,
                msg: 'All fields are required',
                success: false,
            });
        }

        const newJob = new Job({
            title,
            time,
            experience,
            opening,
        });

        await newJob.save(); 

        return res.status(200).json({
            response: 200,
            msg: 'Job posted successfully',
            success: true,
            data: newJob,
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

export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();

        if (jobs.length === 0) {
            return res.status(200).json({
                response: 200,
                msg: 'No jobs found',
                success: false,
                data: [],
            });
        }

        return res.status(200).json({
            response: 200,
            msg: 'Jobs fetched successfully',
            success: true,
            data: jobs,
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

export const getJobById = async (req, res) => {
    const { id } = req.params;

    try {
        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({
                response: 404,
                msg: 'Job not found',
                success: false,
            });
        }

        return res.status(200).json({
            response: 200,
            msg: 'Job fetched successfully',
            success: true,
            data: job,
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

export const updateJob = async (req, res) => {
    const { id } = req.params;
    const { title, time, experience, opening } = req.body;

    try {
        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({
                response: 404,
                msg: 'Job not found',
                success: false,
            });
        }

        const updatedJob = await Job.findByIdAndUpdate(id, { title, time, experience, opening }, { new: true });

        return res.status(200).json({
            response: 200,
            msg: 'Job updated successfully',
            success: true,
            data: updatedJob,
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

export const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;

        const job = await Job.findByIdAndDelete(id);

        if (!job) {
            return res.status(404).json({
                response: 404,
                msg: 'Job not found',
                success: false,
            });
        }

        return res.status(200).json({
            response: 200,
            msg: 'Job deleted successfully',
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
