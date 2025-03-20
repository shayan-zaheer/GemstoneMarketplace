// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GovernmentContract {
    struct SellerInfo {
        address sellerWallet;
        string category;
        bool verified;
    }

    mapping(bytes32 => SellerInfo) public certificateHashes;
    bytes32[] public sellerKeys;

    function generateCertificateHash(
        address sellerWallet,
        string memory category
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(sellerWallet, category));
    }

    function registerSeller(
        address sellerWallet,
        string memory category
    ) public {
        bytes32 certificateHash = generateCertificateHash(
            sellerWallet,
            category
        );

        require(
            certificateHashes[certificateHash].sellerWallet == address(0),
            "Certificate already registered"
        );

        certificateHashes[certificateHash] = SellerInfo(
            sellerWallet,
            category,
            true
        );
        sellerKeys.push(certificateHash);
    }

    function getAllSellers() public view returns (SellerInfo[] memory) {
        SellerInfo[] memory sellers = new SellerInfo[](sellerKeys.length);
        for (uint i = 0; i < sellerKeys.length; i++) {
            sellers[i] = certificateHashes[sellerKeys[i]];
        }
        return sellers;
    }

    function verifySeller(
        address sellerWallet,
        string memory category
    ) public view returns (bool) {
        bytes32 certificateHash = generateCertificateHash(
            sellerWallet,
            category
        );
        SellerInfo memory seller = certificateHashes[certificateHash];

        return (seller.verified &&
            seller.sellerWallet == sellerWallet &&
            keccak256(abi.encodePacked(seller.category)) ==
            keccak256(abi.encodePacked(category)));
    }
}
