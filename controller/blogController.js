import Blog from '../model/blogModel.js';

export const createBlog = async (req, res) => {
    const { blogPhoto, title, description, authorName, authorPosition, authorPhoto, date } = req.body;

    try {
        const isExist = await Blog.findOne({ title });
        if (isExist) {
            return res.status(400).json({
                response: 400,
                msg: 'Blog already exists',
                success: false,
            });
        }

        const newBlog = new Blog({
            blogPhoto,
            title,
            description,
            authorName,
            authorPosition,
            authorPhoto,
            date
        });

        await newBlog.save();

        return res.status(200).json({
            response: 200,
            msg: 'Blog created successfully',
            success: true,
            data: newBlog,
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

export const getAllBlogs = async (req, res) => {
    try {
        const { search, startDate, endDate, authorPosition } = req.body;

        let filter = {};

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { authorName: { $regex: search, $options: "i" } },
                { authorPosition: { $regex: search, $options: "i" } },
            ];
        }

        if (startDate && endDate) {
            filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }
        
        if (authorPosition) {
            filter.authorPosition = authorPosition;
        }

        const blogs = await Blog.find(filter);
        if (search && blogs.length === 0) {
            return res.status(200).json({
                response: 200,
                msg: "No results found",
                success: false,
                data: [],
            });
        }

        return res.status(200).json({
            response: 200,
            msg: "Blogs fetched successfully",
            success: true,
            data: blogs,
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

export const getBlogById = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(404).json({
                response: 404,
                msg: 'id not found',
                success: false,
            });
        }
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({
                response: 404,
                msg: 'Blog not found',
                success: false,
            });
        }
        return res.status(200).json({
            response: 200,
            msg: 'Blog fetched successfully',
            success: true,
            data: blog,
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

export const updateBlog = async (req, res) => {
    const { blogPhoto, title, description, authorName, authorPosition, authorPhoto, date } = req.body;

    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({
                response: 404,
                msg: "Blog not found",
                success: false,
            });
        }

        if (title && title !== blog.title) {
            const isExist = await Blog.findOne({ title, _id: { $ne: req.params.id } });
            if (isExist) {
                return res.status(400).json({
                    response: 400,
                    msg: "Blog with this title already exists",
                    success: false,
                });
            }
        }

        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });

        return res.status(200).json({
            response: 200,
            msg: "Blog updated successfully",
            success: true,
            data: updatedBlog,
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
export const deleteBlog = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(404).json({
                response: 404,
                msg: 'id not found',
                success: false,
            });
        }
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).json({
                response: 404,
                msg: 'Blog not found',
                success: false,
            });
        }
        return res.status(200).json({
            response: 200,
            msg: 'Blog deleted successfully',
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