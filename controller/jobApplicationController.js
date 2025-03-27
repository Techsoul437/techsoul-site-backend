import JobApplication from '../model/jobApplicationModel.js';
import path from 'path';
import multer from 'multer';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RESUME_DIR = path.join(__dirname, '../resume');

// Ensure resume directory exists
fs.mkdirSync(RESUME_DIR, { recursive: true });

const ALLOWED_TYPES = ['.pdf', '.doc', '.docx'];

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (ALLOWED_TYPES.includes(ext)) {
            cb(null, RESUME_DIR); // Store directly in /resume
        } else {
            cb(new Error('Invalid file type. Only .pdf, .doc, .docx are allowed.'));
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (ALLOWED_TYPES.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only .pdf, .doc, .docx are allowed.'));
        }
    },
}).single('resume');

// ✅ Create Job Application
export const createJobApplication = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: err.message
            });
        }

        const { firstName, lastName, email, mobileNumber, position } = req.body;

        if (!firstName || !lastName || !email || !mobileNumber || !position) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'All fields are required'
            });
        }

        try {
            const resumePath = req.file ? `resume/${req.file.filename}` : '';

            const newJobApplication = new JobApplication({
                firstName,
                lastName,
                email,
                mobileNumber,
                position,
                resumeFile: resumePath,
            });

            await newJobApplication.save();

            return res.status(200).json({
                status: 200,
                success: true,
                message: 'Job application submitted successfully',
                data: newJobApplication,
            });
        } catch (err) {
            console.error('Error saving job application:', err.message);
            return res.status(500).json({
                status: 500,
                success: false,
                message: 'Internal Server Error'
            });
        }
    });
};

// ✅ Download Resume
export const downloadResume = async (req, res) => {
    const { id } = req.params;

    try {
        const jobApplication = await JobApplication.findById(id);

        if (!jobApplication) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Job application not found',
            });
        }

        if (!jobApplication.resumeFile) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Resume file not found',
            });
        }

        // Path to resume
        const resumePath = path.join(__dirname, '../', jobApplication.resumeFile);

        if (!fs.existsSync(resumePath)) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Resume file does not exist on the server',
            });
        }

        const fileName = path.basename(resumePath);

        // Send the resume file for download
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.setHeader('Content-Type', 'application/octet-stream');

        const fileStream = fs.createReadStream(resumePath);
        fileStream.pipe(res);

        fileStream.on('error', (error) => {
            console.error('File streaming error:', error);
            return res.status(500).json({
                status: 500,
                success: false,
                message: 'Error while streaming the file',
            });
        });
    } catch (err) {
        console.error('Error in downloadResume:', err.message);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error',
        });
    }
};

// ✅ Get All Job Applications
export const getAllJobApplication = async (req, res) => {
    try {
        const jobApplications = await JobApplication.find();
        return res.status(200).json({
            status: 200,
            success: true,
            message: 'Job applications fetched successfully',
            data: jobApplications,
        });
    } catch (err) {
        console.error('Error fetching job applications:', err.message);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
    }
};

// ✅ Delete Job Application
export const deleteJobApplication = async (req, res) => {
    const { id } = req.params;

    try {
        const jobApplication = await JobApplication.findByIdAndDelete(id);

        if (!jobApplication) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Job application not found',
            });
        }

        // Delete associated resume file
        if (jobApplication.resumeFile) {
            const resumePath = path.join(__dirname, '../', jobApplication.resumeFile);
            if (fs.existsSync(resumePath)) {
                fs.unlinkSync(resumePath);
            }
        }

        return res.status(200).json({
            status: 200,
            success: true,
            message: 'Job application deleted successfully',
        });
    } catch (err) {
        console.error('Error deleting job application:', err.message);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
    }
};
