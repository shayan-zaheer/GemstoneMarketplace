const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GovernmentContract", function () {
  let GovernmentContract, contract, owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners(); 

    const GovernmentContractFactory = await ethers.getContractFactory("GovernmentContract");
    contract = await GovernmentContractFactory.deploy();
    await contract.waitForDeployment();
  });

  it("Should generate the correct certificate hash", async function () {
    const sellerWallet = owner.address;
    const category = "Gold";
    const certificateNumber = 12345;

    const expectedHash = ethers.keccak256(
      ethers.solidityPacked(["address", "string", "uint256"], [sellerWallet, category, certificateNumber])
    );

    const generatedHash = await contract.generateCertificateHash(sellerWallet, category, certificateNumber);
    
    expect(generatedHash).to.equal(expectedHash);
  });
});
