// Importing the necessary artifact for the migration
const MigrationsContract = artifacts.require("Migrations");

// This module exports a function that deploys the Migrations contract
module.exports = function(deployContract) {
  // Deploying the Migrations contract
  deployContract.deploy(MigrationsContract);
};