import User from "../Models/userModel.js";


export const authenticateUser = async (req, res) => {
  try {
    const { walletAddress } = req.body;

    let user = await User.findOne({ walletAddress });

    if (!user) {
      user = new User({ walletAddress });
      await user.save();
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error authenticating user", error });
  }
};


export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findOne({ walletAddress: req.params.walletAddress }).populate("ticketsOwned");

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching user details", error });
  }
};
