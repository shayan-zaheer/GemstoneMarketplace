// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface GovernmentContract {
    function verifySeller(address sellerWallet, string memory category) external view returns (bool);
}
