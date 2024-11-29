const registerUser = async (req, res) => {
    const {email,fullname} = req.body;
    console.log(`Email: ${email}, Fullname: ${fullname}`);
    res.status(200).json({message: `Email: ${email}, Fullname: ${fullname}`});
}

export {registerUser};