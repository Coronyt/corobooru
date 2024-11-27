

const upload_banner = async (req, res) => {
    console.log(req.file.id); // Looks like this works thank god ... I can reference the new file by mongoID
    // It might just make sense here to create a new field in the user model which references the banner by ID
        // Since that's all I need to retrieve it ... that should make the logic easy to manage in theory
        // TODO - I will need to attach a reference to the user to the request before sending it
            // Or else I will not be able to put the image ID into the corresponding user doc
    res.status(201).json({message: "Image successfully uploaded"});
}

module.exports = {
    upload_banner
}