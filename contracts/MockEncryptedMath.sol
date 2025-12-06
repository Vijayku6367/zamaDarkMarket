// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MockEncryptedMath {
    
    // -------------------------------------------------------
    // MOCK ENCRYPTED ADDITION
    // -------------------------------------------------------
    function addEncrypted(
        string memory ciphertext1,
        string memory ciphertext2
    ) public pure returns (string memory) {
        return string(
            abi.encodePacked("encrypted_add(", ciphertext1, "+", ciphertext2, ")")
        );
    }

    // -------------------------------------------------------
    // MOCK ENCRYPTED COMPARISON
    // Returns:
    // 1 → ciphertext1 > ciphertext2
    // 2 → ciphertext1 < ciphertext2
    // 0 → equal
    // -------------------------------------------------------
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

    // -------------------------------------------------------
    // MOCK ENCRYPTED MAX
    // -------------------------------------------------------
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
