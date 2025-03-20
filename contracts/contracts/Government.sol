// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GovernmentContract {
    struct SellerInfo {
        address sellerWallet;
        string category;
        bool verified;
    }

    mapping(bytes32 => SellerInfo) public certificateHashes;

    function generateCertificateHash(
        address sellerWallet,
        string memory category,
        uint256 certificateNumber
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(sellerWallet, category, certificateNumber));
    }

    function registerSeller(
        address sellerWallet,
        string memory category,
        uint256 certificateNumber
    ) public {
        bytes32 certificateHash = generateCertificateHash(sellerWallet, category, certificateNumber);

        require(certificateHashes[certificateHash].sellerWallet == address(0), "Certificate already registered");

        certificateHashes[certificateHash] = SellerInfo(sellerWallet, category, true);
    }

    function verifySeller(
        address sellerWallet,
        string memory category,
        uint256 certificateNumber
    ) public view returns (bool) {
        bytes32 certificateHash = generateCertificateHash(sellerWallet, category, certificateNumber);
        SellerInfo memory seller = certificateHashes[certificateHash];

        return (seller.verified &&
            seller.sellerWallet == sellerWallet &&
            keccak256(abi.encodePacked(seller.category)) == keccak256(abi.encodePacked(category)));
    }
}
