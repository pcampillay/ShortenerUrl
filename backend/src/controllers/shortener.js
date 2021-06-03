const shortenerModel = require("../models/shortener");

//Valid id shortener
exports.ValidIdShortener = async function (req, res) {
    try {
        const shortenerId = req.params.id;
        const query = { code: shortenerId };
        const shortener = await shortenerModel.findOne(query);
        let response;

        if (shortener) {
            response = { status: "200", message: "Valid shortener url", url: shortener.url };
            res.status(200).send(response);
        }

        else {
            response = { status: "404", message: "Error shortener url" };
            res.status(404).send(response);
        }

    } catch (error) {
        console.log("error => ", error);
        const response = { status: "500", message: "Error Valid shortener" };
        res.status(500).send(response);
    }
}

//Generated id shortener
exports.CreateShortener = async function (req, res) {
    try {
        let response;
        const url = req.body.url;

        if(typeof url !== 'string'){
            response = { status: "400", message: "Error url not Valid" };
            res.status(400).send(response);
            return;
        }

        const urlValid = new URL(url);
        const query = { url: url };
        const shortener = await shortenerModel.findOne(query);

        if (!shortener) {
            const code = await codeRandom();
            const splitUrl = urlValid.hostname.split('.');
            const domain = `${splitUrl[1]}.${splitUrl[2]}`;

            const newShortener = new shortenerModel({
                "url": urlValid.href,
                "domain": domain,
                "code": code
            })

            await newShortener.save();
            response = { status: "201", ID: code };
            res.status(201).send(response);
        }
        else {
            response = { status: "208", ID: shortener.code };
            res.status(208).send(response);
        }

    } catch (error) {
        console.log("error => ", error);
        const response = { status: "500", message: "Error Invalid url shortener" };
        res.status(500).send(response);
    }
}

async function codeRandom() {
    const codRandom = Math.random().toString(36).substr(2);
    const queryCode = { code: codRandom };
    const findCode = await shortenerModel.findOne(queryCode);
    if (!findCode) {
        return codRandom;
    }
    else {
        codeRandom();
    }
}