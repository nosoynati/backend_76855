export const getUser = async (req, res) => {
  const id = req.user?.sub._id ?? req.user?._id ?? req.user?.id;
  return id;
};
