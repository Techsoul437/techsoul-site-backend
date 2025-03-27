import FaqDepartment from '../model/faqDepartmentModel.js';

export const createFaqDepartment = async (req, res) => {
    const { name } = req.body;

    try {
        if (!name) {
            return res.status(400).json({
                response: 400,
                msg: 'Department name is required',
                success: false,
            });
        }
        const existingDepartment = await FaqDepartment.findOne({ name });

        if (existingDepartment) {
            return res.status(400).json({
                response: 400,
                msg: 'Department already exists',
                success: false,
            });
        }

        const newDepartment = new FaqDepartment({ name });
        await newDepartment.save();

        return res.status(200).json({
            response: 200,
            msg: 'Department created successfully',
            success: true,
            data: newDepartment,
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

export const getAllFaqDepartments = async (req, res) => {
    try {
        const departments = await FaqDepartment.find();

        if (departments.length === 0) {
            return res.status(200).json({
                response: 200,
                msg: 'No departments found',
                success: false,
                data: [],
            });
        }

        return res.status(200).json({
            response: 200,
            msg: 'Departments fetched successfully',
            success: true,
            data: departments,
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

export const getFaqDepartmentById = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(404).json({
                response: 404,
                msg: 'id not found',
                success: false,
            });
        }
        const department = await FaqDepartment.findById(req.params.id);

        if (!department) {
            return res.status(404).json({
                response: 404,
                msg: 'Department not found',
                success: false,
            });
        }

        return res.status(200).json({
            response: 200,
            msg: 'Department fetched successfully',
            success: true,
            data: department,
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

export const updateFaqDepartment = async (req, res) => {
    const { name } = req.body;

    try {
        if (!req.params.id) {
            return res.status(404).json({
                response: 404,
                msg: 'id not found',
                success: false,
            });
        }
        if (!name) {
            return res.status(400).json({
                response: 400,
                msg: 'Department name is required',
                success: false,
            });
        }

        const departmentToUpdate = await FaqDepartment.findById(req.params.id);

        if (!departmentToUpdate) {
            return res.status(404).json({
                response: 404,
                msg: 'Department not found',
                success: false,
            });
        }

        departmentToUpdate.name = name;
        await departmentToUpdate.save();

        return res.status(200).json({
            response: 200,
            msg: 'Department updated successfully',
            success: true,
            data: departmentToUpdate,
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

export const deleteFaqDepartment = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(404).json({
                response: 404,
                msg: 'id not found',
                success: false,
            });
        }
        const department = await FaqDepartment.findByIdAndDelete(req.params.id);

        if (!department) {
            return res.status(404).json({
                response: 404,
                msg: 'Department not found',
                success: false,
            });
        }

        return res.status(200).json({
            response: 200,
            msg: 'Department deleted successfully',
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
