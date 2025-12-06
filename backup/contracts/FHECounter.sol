// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DarkMarketFHE {
    mapping(address => bytes) private encryptedBalance;

    function setEncryptedBalance(bytes calldata encryptedValue) external {
        encryptedBalance[msg.sender] = encryptedValue;
    }

    function getEncryptedBalance(address user) external view returns (bytes memory) {
        return encryptedBalance[user];
    }
}
