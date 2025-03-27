import Subscribe from '../model/subscriberModel.js';

export const subscribe = async (req, res) => {
    const { email } = req.body;

    try {
        const userExist = await Subscribe.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                reponse: 400,
                msg: 'You are Subscribed already with this e-mail!',
                success: false
            });
        }
        const newSubscriber = new Subscribe({
            email
        });
        await newSubscriber.save();
        return res.status(200).json({
            reponse: 200,
            msg: 'User Subscribed successfully',
            data: newSubscriber,
            success: false
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

export const getAllSubscriber = async (req, res) => {
    try {
        const subscriber = await Subscribe.find();

        if (subscriber.length === 0) {
            return res.status(200).json({
                response: 200,
                msg: 'No Subscriber found',
                success: false,
                data: [],
            });
        }

        return res.status(200).json({
            response: 200,
            msg: 'subscribers fetched successfully',
            success: true,
            data: subscriber,
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