// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IGovernment.sol";

contract GemstoneMarketplace {
    struct Gem {
        uint256 gemId;
        address currentOwner;
        address[] ownershipHistory;
    }

    mapping(uint256 => Gem) public gems;
    IGovernmentContract public governmentContract;

    event GemUploaded(uint256 indexed gemId, address indexed owner);
    event GemSold(uint256 indexed gemId, address indexed oldOwner, address indexed newOwner);

    modifier onlyOwner(uint256 _gemId) {
        require(gems[_gemId].currentOwner == msg.sender, "Not the gem owner");
        _;
    }

    constructor(address _governmentContractAddress) {
        require(_governmentContractAddress != address(0), "Invalid contract address");
        governmentContract = IGovernmentContract(_governmentContractAddress);
    }

    function uploadGem(uint256 _gemId, string calldata category) external {
        require(gems[_gemId].currentOwner == address(0), "Gem already exists");

        require(
            governmentContract.verifySeller(msg.sender, category),
            "Seller not verified"
        );

        gems[_gemId] = Gem({
            gemId: _gemId,
            currentOwner: msg.sender,
            ownershipHistory: new address[](0)
        });

        emit GemUploaded(_gemId, msg.sender);
    }

    function sellGem(uint256 _gemId, address _newOwner) external {
        require(_newOwner != address(0), "Invalid new owner");

        gems[_gemId].ownershipHistory.push(gems[_gemId].currentOwner);

        gems[_gemId].currentOwner = _newOwner;

        emit GemSold(_gemId, msg.sender, _newOwner);
    }

    function getOwnershipHistory(uint256 _gemId) external view returns (address[] memory) {
        return gems[_gemId].ownershipHistory;
    }
}
