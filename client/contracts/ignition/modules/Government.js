const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("GovernmentContractModule", (m) => {
  // Deploy the GovernmentContract without parameters
  const governmentContract = m.contract("GovernmentContract");

  return { governmentContract };
});
