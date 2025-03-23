const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("GemstoneContractModule", (m) => {
  // Deploy the GovernmentContract without parameters
  const gemContract = m.contract("GemstoneContract");

  return { gemContract };
});
