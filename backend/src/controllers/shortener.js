const shortenerModel = require("../models/shortener");

//Valid id shortener
exports.ValidIdShortener = async function (req, res) {
    try {
        const shortenerId = JSON.stringify(req.params.id);
        const query = { code: shortenerId };
        const shortener = await shortenerModel.findOne(query);
        if (shortener) {
            let response = { status: "200", message: "Valid shortener url", result: shortener.url };
            res.status(200).send(response);
        }

        else {
            let response = { status: "404", message: "Error shortener url" };
            res.status(502).send(response);
        }

    } catch (error) {
        console.log("error => ", error);
        let response = { status: "502", message: "Error Valid Catpcha" };
        res.status(502).send(response);
    }
}