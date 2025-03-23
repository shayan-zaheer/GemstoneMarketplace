// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GemstoneMarketplace {
    struct Gem {
        uint256 gemId;
        address currentOwner;
        address[] ownershipHistory; // Array to track previous owners
    }

    mapping(uint256 => Gem) public gems;
    event GemUploaded(uint256 indexed gemId, address indexed owner);
    event GemSold(uint256 indexed gemId, address indexed oldOwner, address indexed newOwner);

    modifier onlyOwner(uint256 _gemId) {
        require(gems[_gemId].currentOwner == msg.sender, "Not the gem owner");
        _;
    }

    function uploadGem(uint256 _gemId) external {
        require(gems[_gemId].currentOwner == address(0), "Gem already exists");
        gems[_gemId] = Gem(_gemId, msg.sender, new address[](0));
        emit GemUploaded(_gemId, msg.sender);
    }

    function sellGem(uint256 _gemId, address _newOwner) external onlyOwner(_gemId) {
        require(_newOwner != address(0), "Invalid new owner");
        
        // Store previous owner
        gems[_gemId].ownershipHistory.push(gems[_gemId].currentOwner);
        
        // Update new owner
        gems[_gemId].currentOwner = _newOwner;
        
        emit GemSold(_gemId, msg.sender, _newOwner);
    }

    function getOwnershipHistory(uint256 _gemId) external view returns (address[] memory) {
        return gems[_gemId].ownershipHistory;
    }
}
