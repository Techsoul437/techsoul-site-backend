import { Portfolio, PortfolioSection } from '../model/portfolioModel.js';

export const createPortfolio = async (req, res) => {
    const { banner, logo, asset, section, title, duration, type, description } = req.body;

    try {
        const isExist = await Portfolio.findOne({ title });
        if (isExist) {
            return res.status(400).json({
                response: 400,
                msg: 'Portfolio already exists',
                success: false,
            });
        }

        const newPortfolio = new Portfolio({
            banner,
            logo,
            asset,
            section,
            title,
            duration,
            type,
            description
        });

        await newPortfolio.save();

        return res.status(200).json({
            response: 200,
            msg: 'Portfolio created successfully',
            success: true,
            data: newPortfolio,
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

export const getAllPortfolios = async (req, res) => {
    try {
        const { search, section, type } = req.body;
        const limit = req.body.limit;

        let filter = {};

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ];
        }

        if (section) {
            filter.section = section;
        }

        if (type) {
            filter.type = type;
        }

        const portfolios = await Portfolio.find(filter)
            .limit(limit)

        if (search && portfolios.length === 0) {
            return res.status(200).json({
                response: 200,
                msg: "No results found",
                success: false,
                data: [],
                total: await portfolios.countDocuments(),
            });
        }

        return res.status(200).json({
            response: 200,
            msg: "Portfolios fetched successfully",
            success: true,
            data: portfolios,
        });

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            response: 500,
            msg: "Server Error",
            success: false,
        });
    }
};

export const getPortfolioById = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(404).json({
                response: 404,
                msg: 'ID not found',
                success: false,
            });
        }

        const portfolio = await Portfolio.findById(req.params.id);
        if (!portfolio) {
            return res.status(404).json({
                response: 404,
                msg: 'Portfolio not found',
                success: false,
            });
        }

        return res.status(200).json({
            response: 200,
            msg: 'Portfolio fetched successfully',
            success: true,
            data: portfolio,
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

export const updatePortfolio = async (req, res) => {
    const { banner, logo, asset, section, title, duration, type, description } = req.body;

    try {
        const portfolio = await Portfolio.findById(req.params.id);
        if (!portfolio) {
            return res.status(404).json({
                response: 404,
                msg: "Portfolio not found",
                success: false,
            });
        }

        if (title && title !== portfolio.title) {
            const isExist = await Portfolio.findOne({ title, _id: { $ne: req.params.id } });
            if (isExist) {
                return res.status(400).json({
                    response: 400,
                    msg: "Portfolio with this title already exists",
                    success: false,
                });
            }
        }

        const updatedPortfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true });

        return res.status(200).json({
            response: 200,
            msg: "Portfolio updated successfully",
            success: true,
            data: updatedPortfolio,
        });

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            response: 500,
            msg: "Server Error",
            success: false,
        });
    }
};

export const deletePortfolio = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(404).json({
                response: 404,
                msg: 'ID not found',
                success: false,
            });
        }

        const portfolio = await Portfolio.findByIdAndDelete(req.params.id);
        if (!portfolio) {
            return res.status(404).json({
                response: 404,
                msg: 'Portfolio not found',
                success: false,
            });
        }

        return res.status(200).json({
            response: 200,
            msg: 'Portfolio deleted successfully',
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

export const createPortfolioSection = async (req, res) => {
    const { name } = req.body;

    try {
        if (!name) {
            return res.status(400).json({
                response: 400,
                msg: 'Section name is required',
                success: false,
            });
        }
        const existingSection = await PortfolioSection.findOne({ name });

        if (existingSection) {
            return res.status(400).json({
                response: 400,
                msg: 'Section already exists',
                success: false,
            });
        }

        const newSection = new PortfolioSection({ name });
        await newSection.save();

        return res.status(200).json({
            response: 200,
            msg: 'Section created successfully',
            success: true,
            data: newSection,
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

export const getAllPortfolioSection = async (req, res) => {
    try {
        const sections = await PortfolioSection.find();

        if (sections.length === 0) {
            return res.status(200).json({
                response: 200,
                msg: 'No Sections found',
                success: false,
                data: [],
            });
        }

        return res.status(200).json({
            response: 200,
            msg: 'Sections fetched successfully',
            success: true,
            data: sections,
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

export const getPortfolioSectionById = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(404).json({
                response: 404,
                msg: 'id not found',
                success: false,
            });
        }
        const sections = await PortfolioSection.findById(req.params.id);

        if (!sections) {
            return res.status(404).json({
                response: 404,
                msg: 'Sections not found',
                success: false,
            });
        }

        return res.status(200).json({
            response: 200,
            msg: 'Sections fetched successfully',
            success: true,
            data: sections,
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

export const updatePortfolioSection = async (req, res) => {
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
                msg: 'Sections name is required',
                success: false,
            });
        }

        const sectionsToUpdate = await PortfolioSection.findById(req.params.id);

        if (!sectionsToUpdate) {
            return res.status(404).json({
                response: 404,
                msg: 'Sections not found',
                success: false,
            });
        }

        sectionsToUpdate.name = name;
        await sectionsToUpdate.save();

        return res.status(200).json({
            response: 200,
            msg: 'Section updated successfully',
            success: true,
            data: sectionsToUpdate,
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

export const deletePortfolioSection = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(404).json({
                response: 404,
                msg: 'id not found',
                success: false,
            });
        }
        const sections = await PortfolioSection.findByIdAndDelete(req.params.id);

        if (!sections) {
            return res.status(404).json({
                response: 404,
                msg: 'Sections not found',
                success: false,
            });
        }

        return res.status(200).json({
            response: 200,
            msg: 'Section deleted successfully',
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
