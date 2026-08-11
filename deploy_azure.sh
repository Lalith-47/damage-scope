#!/bin/bash
set -e

# Configuration
RESOURCE_GROUP=${RESOURCE_GROUP:-"damagescope-rg"}
LOCATION=${LOCATION:-"eastus"}
ACR_NAME=${ACR_NAME:-"damagescopeacr$RANDOM"}
APP_SERVICE_PLAN=${APP_SERVICE_PLAN:-"damagescope-plan"}
APP_NAME=${APP_NAME:-"damagescope-app-$RANDOM"}

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

# 3. Build Container Images in Azure Cloud via ACR Tasks
echo "[3/6] Building Backend Container Image in ACR..."
az acr build --registry "$ACR_NAME" --image damagescope-backend:latest ./backend --output table

echo "[3/6] Building Frontend Container Image in ACR..."
az acr build --registry "$ACR_NAME" --image damagescope-frontend:latest ./frontend --output table

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

# Configure Container Registry Credentials
echo "[6/6] Configuring ACR credentials on Web App..."
az webapp config container set \
  --name "$APP_NAME" \
  --resource-group "$RESOURCE_GROUP" \
  --docker-custom-image-name "$ACR_NAME.azurecr.io/damagescope-frontend:latest" \
  --docker-registry-server-url "https://$ACR_NAME.azurecr.io" \
  --docker-registry-server-user "$ACR_NAME" \
  --docker-registry-server-password "$ACR_PASSWORD" \
  --output table

# Clean up rendered compose file
rm -f docker-compose.azure.rendered.yml

APP_URL="https://$APP_NAME.azurewebsites.net"
echo "========================================================"
echo " DEPLOYMENT SUCCESSFUL!"
echo " App URL: $APP_URL"
echo "========================================================"
