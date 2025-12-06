// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract EncryptedMath {
    // Mock encrypted addition
    function addEncrypted(
        string memory ciphertext1,
        string memory ciphertext2
    ) public pure returns (string memory) {
        return string(abi.encodePacked("encrypted_add(", ciphertext1, ",", ciphertext2, ")"));
    }

    // Mock encrypted comparison
    function compareEncrypted(
        string memory ciphertext1,
        string memory ciphertext2
    ) public pure returns (uint8) {
        bytes memory b1 = bytes(ciphertext1);
        bytes memory b2 = bytes(ciphertext2);

        if (b1.length > b2.length) {
            return 1;
        } else if (b1.length < b2.length) {
            return 2;
        } else {
            return 0;
        }
    }

    // Mock encrypted max
    function encryptedMax(
        string memory ciphertext1,
        string memory ciphertext2
    ) public pure returns (string memory) {
        bytes memory b1 = bytes(ciphertext1);
        bytes memory b2 = bytes(ciphertext2);

        if (b1.length >= b2.length) {
            return ciphertext1;
        } else {
            return ciphertext2;
        }
    }
}
