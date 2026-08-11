#!/bin/bash
set -e

# Configuration
RESOURCE_GROUP=${RESOURCE_GROUP:-"damagescope-rg"}
LOCATION=${LOCATION:-"eastus"}
ACR_NAME=${ACR_NAME:-"damagescopeacr10994"}
APP_SERVICE_PLAN=${APP_SERVICE_PLAN:-"damagescope-plan"}
APP_NAME=${APP_NAME:-"damagescope-app-10994"}

echo "========================================================"
echo " Starting Azure Deployment for DamageScope"
echo "========================================================"
echo "Resource Group    : $RESOURCE_GROUP"
echo "Location          : $LOCATION"
echo "ACR Name          : $ACR_NAME"
echo "App Service Plan  : $APP_SERVICE_PLAN"
echo "App Name          : $APP_NAME"
echo "========================================================"

# 1. Create Resource Group
echo "[1/6] Creating Resource Group '$RESOURCE_GROUP'..."
az group create --name "$RESOURCE_GROUP" --location "$LOCATION" --output table

# 2. Create Azure Container Registry (ACR)
echo "[2/6] Creating Azure Container Registry '$ACR_NAME'..."
az acr create --resource-group "$RESOURCE_GROUP" --name "$ACR_NAME" --sku Basic --admin-enabled true --output table

# 3. Login to ACR & Build/Push Container Images locally
echo "[3/6] Logging into Azure Container Registry '$ACR_NAME'..."
az acr login --name "$ACR_NAME"

echo "[3/6] Building Backend Container Image locally..."
docker build -t "$ACR_NAME.azurecr.io/damagescope-backend:latest" ./backend

echo "[3/6] Pushing Backend Container Image to ACR..."
docker push "$ACR_NAME.azurecr.io/damagescope-backend:latest"

echo "[3/6] Building Frontend Container Image locally..."
docker build -t "$ACR_NAME.azurecr.io/damagescope-frontend:latest" ./frontend

echo "[3/6] Pushing Frontend Container Image to ACR..."
docker push "$ACR_NAME.azurecr.io/damagescope-frontend:latest"

# 4. Create App Service Plan
echo "[4/6] Creating Linux App Service Plan '$APP_SERVICE_PLAN'..."
az appservice plan create --name "$APP_SERVICE_PLAN" --resource-group "$RESOURCE_GROUP" --sku B1 --is-linux --output table

# 5. Generate runtime multi-container Docker Compose file
ACR_PASSWORD=$(az acr credential show --name "$ACR_NAME" --query "passwords[0].value" -o tsv)
sed "s/\${ACR_NAME}/$ACR_NAME/g" docker-compose.azure.yml > docker-compose.azure.rendered.yml

# 6. Create Web App for Containers
echo "[5/6] Deploying Multi-container Web App '$APP_NAME'..."
az webapp create \
  --resource-group "$RESOURCE_GROUP" \
  --plan "$APP_SERVICE_PLAN" \
  --name "$APP_NAME" \
  --multicontainer-config-type compose \
  --multicontainer-config-file docker-compose.azure.rendered.yml \
  --output table

# Configure Container Registry Credentials & Timeout
echo "[6/6] Configuring ACR credentials on Web App..."
az webapp config appsettings set \
  --name "$APP_NAME" \
  --resource-group "$RESOURCE_GROUP" \
  --settings \
    DOCKER_REGISTRY_SERVER_URL="https://$ACR_NAME.azurecr.io" \
    DOCKER_REGISTRY_SERVER_USERNAME="$ACR_NAME" \
    DOCKER_REGISTRY_SERVER_PASSWORD="$ACR_PASSWORD" \
    WEBSITES_CONTAINER_START_TIME_LIMIT=1800 \
  --output table

# Clean up rendered compose file
rm -f docker-compose.azure.rendered.yml

APP_URL="https://$APP_NAME.azurewebsites.net"
echo "========================================================"
echo " DEPLOYMENT SUCCESSFUL!"
echo " App URL: $APP_URL"
echo "========================================================"
