const { Post } = require('./postModel');
const { Like } = require('./likeModel');
const { User } = require('./userModel');
const { Comment } = require('./commentModel');
const { Interest } = require('./interestModel');
const { Session } = require('./sessionModel');
const { Friend } = require('./friendModel');

User.hasMany(Post, { foreignKey: 'userId' }); // Un utilisateur peut avoir plusieurs posts
Post.belongsTo(User, { foreignKey: 'userId' }); // Un post appartient à un utilisateur

Session.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Comment, { foreignKey: 'userId' }); // Un utilisateur peut avoir plusieurs commentaires
Comment.belongsTo(User, { foreignKey: 'userId' }); // Un commentaire appartient à un utilisateur

Post.hasMany(Comment, { foreignKey: 'postId' }); // Un post peut avoir plusieurs commentaires
Comment.belongsTo(Post, { foreignKey: 'postId' }); // Un commentaire appartient à un post

Like.belongsTo(User, { foreignKey: 'userId' }); // Un like appartient à un utilisateur
Like.belongsTo(Post, { foreignKey: 'postId' }); // Un like est lié à un post

Post.hasMany(Like, { foreignKey: 'postId' });

Post.belongsTo(Interest, { foreignKey: 'interestId' });


Friend.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Friend.belongsTo(User, { foreignKey: 'friend_id', as: 'friend' });