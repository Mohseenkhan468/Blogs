export const getProfile = (req, res) => {
  try {
    const userObj = req.user.toJSON();
    delete userObj.password;
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    userObj.profile_url = `${baseUrl}${userObj.profile_path}`;
    return res.status(200).json({
      success: true,
      data: userObj,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
