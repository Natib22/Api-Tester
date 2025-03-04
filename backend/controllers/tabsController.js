const Tab = require("../models/tabs");


module.exports.getTabs = async (req, res) => {
    try {
        const { email } = req.body; // Get email from request parameters
        const tabs = await Tab.find({ email }); // Find tabs where email matches
        res.status(200).json({ tabs });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
module.exports.createTab = async (req, res) => {
    const { email, currTabId, nextTabId, value } = req.body; 
    try {
        const tab = await Tab.create({ email, currTabId, nextTabId, value });
        res.status(201).json({ tab });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

