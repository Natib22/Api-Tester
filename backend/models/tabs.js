const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tabSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        index: true
    },
    currTabId: { type: String, required: true },
    nextTabId: { type: String, required: true },
    value: {
        type: Map,
        of: new Schema({
            tabId: { type: String, required: true },
            title: { type: String, default: "untitled" },
            url: { type: String, required: true },

            body: { type: String, default: "{}" },
            bodyError: { type: String, default: "" },
            isLoading: { type: Boolean, default: false },

            headers: { type: [[String]], default: [] }, // Array of key-value pairs
            params: { type: [[String]], default: [] }, // Array of key-value pairs

            requestMetaData: {
                bodyUsed: { type: Boolean, default: false },
                cache: { type: String, default: "default" },
                credentials: { type: String, default: "same-origin" },
                destination: { type: String, default: "" },
                headers: { type: Map, of: String }, // Headers stored as key-value pairs
                integrity: { type: String, default: "" },
                method: { type: String, required: true },
                mode: { type: String, default: "cors" },
                redirect: { type: String, default: "follow" },
                referrer: { type: String, default: "about:client" },
                referrerPolicy: { type: String, default: "" },
                signal: { type: Schema.Types.Mixed, default: undefined },
                url: { type: String, required: true }
            },

            responseMetaData: {
                body: { type: Schema.Types.Mixed, default: null },
                bodyUsed: { type: Boolean, default: false },
                headers: { type: Map, of: String }, // Store response headers as key-value pairs
                ok: { type: Boolean, default: true },
                redirected: { type: Boolean, default: false },
                status: { type: Number, required: true },
                statusText: { type: String, default: "" },
                type: { type: String, default: "cors" },
                url: { type: String, required: true }
            },

            response: {
                type: [new Schema({
                    id: Number,
                    userId: Number,
                    title: String,
                    completed: Boolean
                })],
                default: []
            },

            responseHeaders: { type: Map, of: String },
            sentStatus: { type: Boolean, default: true }
        })
    }
});

tabSchema.post('save', function (doc, next) {
    console.log("new tab was created and saved", doc);
    next();
}
)

const Tab = mongoose.model('Tab', tabSchema);
module.exports = Tab;