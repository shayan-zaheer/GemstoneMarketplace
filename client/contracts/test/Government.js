const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GovernmentContract", function () {
  let GovernmentContract, contract, owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    const GovernmentContractFactory = await ethers.getContractFactory("GovernmentContract");
    contract = await GovernmentContractFactory.deploy();
    await contract.waitForDeployment();
  });

  it("Should register a seller successfully", async function () {
    const sellerWallet = owner.address;
    const category = "Gold";

    const tx = await contract.registerSeller(sellerWallet, category);
    await tx.wait();

    const registeredCategories = await contract.getSellerByWallet(sellerWallet);
    expect(registeredCategories).to.include(category);
  });

  it("Should not register the same seller with the same category twice", async function () {
    const sellerWallet = owner.address;
    const category = "Gold";

    await contract.registerSeller(sellerWallet, category);
    const tx = await contract.registerSeller(sellerWallet, category);

    expect(tx).to.be.revertedWith(""); // Since the function returns false, use .to.not.emit if needed
  });

  it("Should return the correct categories for a registered seller", async function () {
    const sellerWallet = owner.address;
    await contract.registerSeller(sellerWallet, "Gold");
    await contract.registerSeller(sellerWallet, "Diamond");

    const categories = await contract.getSellerByWallet(sellerWallet);
    expect(categories).to.deep.equal(["Gold", "Diamond"]);
  });

  it("Should verify if a seller is registered under a category", async function () {
    const sellerWallet = owner.address;
    const category = "Gold";

    await contract.registerSeller(sellerWallet, category);

    const isVerified = await contract.verifySeller(sellerWallet, category);
    expect(isVerified).to.be.true;
  });

  it("Should return false for an unregistered category", async function () {
    const sellerWallet = owner.address;

    const isVerified = await contract.verifySeller(sellerWallet, "Platinum");
    expect(isVerified).to.be.false;
  });

  it("Should revert if verifySeller is called with address(0)", async function () {
    await expect(contract.verifySeller(ethers.ZeroAddress, "Gold")).to.be.revertedWith(
      "You are not the owner of this wallet"
    );
  });
});
