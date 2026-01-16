const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    const { role } = req.body;
    if (role !== requiredRole) {
      return res.status(403).json({ message: "Accès refusé : rôle insuffisant" });
    }
    next();
  };
};

module.exports = { roleMiddleware };
