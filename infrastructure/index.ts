import * as resources from "@pulumi/azure-native/resources";
import * as storage from "@pulumi/azure-native/storage";
import * as postgres from "@pulumi/azure-native/dbforpostgresql";
import * as app from "@pulumi/azure-native/app";
import * as keyvault from "@pulumi/azure-native/keyvault";

const resourceGroup = new resources.ResourceGroup("webco-rg");

const storageAccount = new storage.StorageAccount("cmsstorage", {
  resourceGroupName: resourceGroup.name,
  sku: {
    name: "Standard_LRS",
  },
  kind: "StorageV2",
});

const mediaContainer = new storage.BlobContainer("media-assets", {
  resourceGroupName: resourceGroup.name,
  accountName: storageAccount.name,
});

const postgresServer = new postgres.Server("cms-db", {
  resourceGroupName: resourceGroup.name,
  administratorLogin: "webcoadmin",
  administratorLoginPassword: process.env.DB_PASSWORD,
  version: "16",

  storage: {
    storageSizeGB: 32,
  },

  sku: {
    name: "Standard_B1ms",
    tier: "Burstable",
  },
});



const vault = new keyvault.Vault("cms-vault", {
  resourceGroupName: resourceGroup.name,
  properties: {
    tenantId: "tenant-id",
    sku: {
      family: "A",
      name: "standard",
    },
    accessPolicies: [],
  },
});
const managedEnv = new app.ManagedEnvironment("directus-env", {
  resourceGroupName: resourceGroup.name,
});


const containerApp = new app.ContainerApp("directus-app", {
  resourceGroupName: resourceGroup.name,
  managedEnvironmentId: managedEnv.id,  
  configuration: {
    ingress: {
      external: true,
      targetPort: 8055,
    },
  },
  template: {
    containers: [
      {
        name: "directus",
        image: "directus/directus:latest",
        resources: {
          cpu: 1,
          memory: "2Gi",
        },
      },
    ],
  },
});
