#!/bin/bash

# Script de test des API - Health Data Collector
# Utilisation: bash test-api.sh

BASE_URL="http://localhost:3000"

echo "🧪 Test des Endpoints API - Health Data Collector"
echo "=================================================="
echo ""

# 1. Test de santé du serveur
echo "1️⃣  Vérifier la santé du serveur..."
curl -s "$BASE_URL/health" | jq .
echo -e "\n"

# 2. Récupérer les données existantes
echo "2️⃣  Récupérer toutes les données..."
curl -s "$BASE_URL/data" | jq .
echo -e "\n"

# 3. Ajouter une nouvelle donnée
echo "3️⃣  Ajouter une nouvelle donnée..."
curl -s -X POST "$BASE_URL/data" \
  -H "Content-Type: application/json" \
  -d '{"age": 30, "tension": 120}' | jq .
echo -e "\n"

# 4. Ajouter une deuxième donnée
echo "4️⃣  Ajouter une deuxième donnée..."
curl -s -X POST "$BASE_URL/data" \
  -H "Content-Type: application/json" \
  -d '{"age": 35, "tension": 125}' | jq .
echo -e "\n"

# 5. Récupérer les données à nouveau
echo "5️⃣  Récupérer toutes les données (après ajout)..."
curl -s "$BASE_URL/data" | jq .
echo -e "\n"

# 6. Calculer la régression
echo "6️⃣  Calculer la régression linéaire..."
curl -s "$BASE_URL/regression" | jq .
echo -e "\n"

# 7. Test de validation - âge négatif
echo "7️⃣  Test de validation - âge négatif (devrait échouer)..."
curl -s -X POST "$BASE_URL/data" \
  -H "Content-Type: application/json" \
  -d '{"age": -5, "tension": 120}' | jq .
echo -e "\n"

echo "✅ Tests terminés!"
