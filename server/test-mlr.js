import MLR from "ml-regression-multivariate-linear";

// Test avec format 2D simple - matrice Y avec une colonne
const x = [
  [1, 2],
  [2, 4],
  [3, 6],
  [4, 8],
];
// Y doit être une matrice 2D aussi: [[valeur1], [valeur2], ...]
const y = [[3], [6], [9], [12]];

try {
  const mlr = new MLR(x, y);
  console.log("Créé MLR avec succès");
  console.log("weights:", mlr.weights);
  console.log("intercept:", mlr.intercept);
  console.log("predict:", typeof mlr.predict);
  const pred = mlr.predict([2, 4]);
  console.log("predict([2, 4]):", pred);
} catch (e) {
  console.error("Erreur:", e.message);
}

console.log("\n--- Test avec y en tant que vecteur 1D ---");
const y2 = [3, 6, 9, 12];
try {
  const mlr2 = new MLR(x, y2);
  console.log("MLR avec y 1D réussi");
  console.log("weights:", mlr2.weights);
} catch (e) {
  console.error("Erreur avec y 1D:", e.message);
}
