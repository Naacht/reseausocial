const logout = async (req, res) => {
  try {
    // Vérifier si l'utilisateur est connecté
    if (!req.session || !req.session.user_id) {
      return res.status(401).json({ message: 'Utilisateur non connecté' });
    }

    // Détruire complètement la session
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }

      // Effacer le cookie de session côté client
      res.clearCookie('connect.sid');
      
      res.status(200).json({ message: 'Déconnexion réussie' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

module.exports = logout;
