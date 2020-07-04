const User = require('../models/User');

module.exports = {
    async show(request, response) {
      const { user_id } = request.params;

      if (!user_id.match(/^[0-9a-fA-F]{24}$/)) { // if it's not a valid ID
        return response.status(404).send({ error: "ID inválido" });
      } 
      
      const user = await User.find({ _id: user_id });

      if (!user)
        return response.status(404).send({ error: "Usuário não encontrado" });

      return response.json(user);
    },

    async index(request, response) {
      const users = await User.find();

      return response.json(users);
    },

    async store(request, response) {
      const { name, phone, date_of_birth } = request.body;
      const email = request.body.email.toLowerCase();

      var user = await User.findOne({ email });

      if (user)
        return response.json({ error: "E-mail indisponível" });

      user = await User.create({
        name,
        phone,
        email,
        date_of_birth
      });

      return response.json(user);
    },

    async update(request, response) {
      const { user_id } = request.params;
      const { name, phone, date_of_birth } = request.body;

      var user = await User.findById(user_id);

      if (!user)
        return response.status(404).send({ error: "Usuário não encontrado" });

      user = await User.findOneAndUpdate({ _id: user_id }, {
        name,
        phone,
        date_of_birth: date_of_birth
      });

      return response.json(user);
    },

    async delete(request, response) {
      const { user_id } = request.params;

      await User.deleteOne({ _id: user_id });

      console.log('aaa');

      return response.status(200).send();
    }
};