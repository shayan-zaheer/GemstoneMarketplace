const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GemstoneMarketplace", function () {
    let GovernmentContract, GemstoneMarketplace, government, marketplace;
    let owner, seller1, buyer;

    beforeEach(async function () {
        [owner, seller1, buyer] = await ethers.getSigners();
    
        const GovernmentContract = await ethers.getContractFactory("GovernmentContract");
        government = await GovernmentContract.deploy();
        
        const GemstoneMarketplace = await ethers.getContractFactory("GemstoneMarketplace");
        marketplace = await GemstoneMarketplace.deploy(government.target);
    });
    

    it("should upload a gem if seller is verified", async function () {
        await government.connect(seller1).registerSeller(seller1.address, "Diamond");

        await expect(marketplace.connect(seller1).uploadGem(1, "Diamond"))
            .to.emit(marketplace, "GemUploaded")
            .withArgs(1, seller1.address);

        const gem = await marketplace.gems(1);
        expect(gem.currentOwner).to.equal(seller1.address);
    });

    it("should not upload a gem if seller is not verified", async function () {
        await expect(marketplace.connect(seller1).uploadGem(2, "Ruby"))
            .to.be.revertedWith("Seller not verified");
    });

    it("should transfer gem ownership", async function () {
        await government.connect(seller1).registerSeller(seller1.address, "Emerald");

        await marketplace.connect(seller1).uploadGem(3, "Emerald");

        await expect(marketplace.connect(seller1).sellGem(3, buyer.address))
            .to.emit(marketplace, "GemSold")
            .withArgs(3, seller1.address, buyer.address);

        const gem = await marketplace.gems(3);
        expect(gem.currentOwner).to.equal(buyer.address);
    });

    it("should store ownership history after transfer", async function () {
        await government.connect(seller1).registerSeller(seller1.address, "Sapphire");

        await marketplace.connect(seller1).uploadGem(4, "Sapphire");
        await marketplace.connect(seller1).sellGem(4, buyer.address);

        const history = await marketplace.getOwnershipHistory(4);
        expect(history).to.include(seller1.address);
    });

    it("should not allow non-owner to sell a gem", async function () {
        await government.connect(seller1).registerSeller(seller1.address, "Topaz");

        await marketplace.connect(seller1).uploadGem(5, "Topaz");

        await expect(marketplace.connect(buyer).sellGem(5, buyer.address))
            .to.be.revertedWith("Not the gem owner");
    });
});
