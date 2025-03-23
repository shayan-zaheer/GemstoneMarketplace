const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GovernmentContract", function () {
    let GovernmentContract, government, owner, seller1, seller2;

    beforeEach(async function () {
        [owner, seller1, seller2] = await ethers.getSigners();
        GovernmentContract = await ethers.getContractFactory("GovernmentContract");
        government = await GovernmentContract.deploy();
        await government.waitForDeployment();
    });

    it("should register a new seller", async function () {
        const tx = await government.connect(seller1).registerSeller(seller1.address, "Diamond");
        await tx.wait();

        const categories = await government.getSellerByWallet(seller1.address);
        expect(categories).to.include("Diamond");
    });

    it("should not allow duplicate categories for a seller", async function () {
        await government.connect(seller1).registerSeller(seller1.address, "Diamond");
        const tx = await government.connect(seller1).registerSeller(seller1.address, "Diamond");

        expect(await tx).to.be.revertedWith("revert");
    });

    it("should verify a registered seller", async function () {
        await government.connect(seller1).registerSeller(seller1.address, "Ruby");

        const isVerified = await government.verifySeller(seller1.address, "Ruby");
        expect(isVerified).to.be.true;
    });

    it("should not verify an unregistered category", async function () {
        await government.connect(seller1).registerSeller(seller1.address, "Sapphire");

        const isVerified = await government.verifySeller(seller1.address, "Diamond");
        expect(isVerified).to.be.false;
    });
});
