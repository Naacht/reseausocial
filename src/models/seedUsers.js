const bcrypt = require('bcrypt');
const { User } = require('./userModel');

async function seedUsers() {
  try {
    await User.sync({ force: true });

    const usersData = [
      { username: 'user1', email: 'user1@gmail.com', password: 'motdepasse' },
      { username: 'user2', email: 'user2@gmail.com', password: 'motdepasse' },
      { username: 'user3', email: 'user3@gmail.com', password: 'motdepasse' },
    ];

    const hashedUsersData = await Promise.all(usersData.map(async user => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return {
        username: user.username,
        email: user.email,
        hash_password: hashedPassword,
        validation: 1
      };
    }));

    await User.bulkCreate(hashedUsersData);

    console.log('Users seeded successfully');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}

seedUsers();
