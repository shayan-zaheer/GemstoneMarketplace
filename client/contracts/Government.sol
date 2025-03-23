// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GovernmentContract {
    mapping(address => string[]) public certifiedSellers;

    function registerSeller(
        address sellerWallet,
        string memory category
    ) public returns (bool) {
        if (certifiedSellers[sellerWallet].length != 0) {
            for (uint8 i = 0; i < certifiedSellers[sellerWallet].length; i++) {
                if (
                    keccak256(
                        abi.encodePacked(certifiedSellers[sellerWallet][i])
                    ) == keccak256(abi.encodePacked(category))
                ) {
                    return false;
                }
            }
        }
        certifiedSellers[sellerWallet].push(category);
        return true;
    }

    function getSellerByWallet(
        address sellerWallet
    ) public view returns (string[] memory) {
        return certifiedSellers[sellerWallet];
    }

    function verifySeller(
        address sellerWallet,
        string memory category
    ) external view returns (bool) {
        require(
            sellerWallet != address(0),
            "You are not the owner of this wallet"
        );
        for (uint8 i = 0; i < certifiedSellers[sellerWallet].length; i++) {
            if (
                keccak256(
                    abi.encodePacked(certifiedSellers[sellerWallet][i])
                ) == keccak256(abi.encodePacked(category))
            ) {
                return true;
            }
        }
        return false;
    }
}
