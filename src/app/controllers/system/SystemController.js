class SystemController {
  async index(req, res) {
    return res.json("I'm back!");
  }
}

export default new SystemController();
