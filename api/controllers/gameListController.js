const gameList = async (req, res) => {
  const gameList = await Game.findAll();
  return res.status(200).json({
    message: "Game list",
    data: gameList,
  });
};
