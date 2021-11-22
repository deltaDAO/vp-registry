// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RecoverSigner {
  event LogSigner(address signer, bytes32 messageHash, bytes signature);

  function recoverSigner(bytes32 _messageHash, bytes memory _signature) public pure returns (address) {
    address signer = _recoverSigner(_messageHash, _signature);
    return signer;
  }

  function storeSigner(bytes32 _messageHash, bytes memory _signature) public {
    address signer = _recoverSigner(_messageHash, _signature);
    emit LogSigner(signer, _messageHash, _signature);
  }

  function _recoverSigner(bytes32 _messageHash, bytes memory _signature) private pure returns (address) {
    bytes32 _ethSignedMessageHash = keccak256(abi.encodePacked('\x19Ethereum Signed Message:\n32', _messageHash));
    (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);
    address signer = ecrecover(_ethSignedMessageHash, v, r, s);

    return signer;
  }

  function splitSignature(bytes memory sig)
    private
    pure
    returns (
      bytes32 r,
      bytes32 s,
      uint8 v
    )
  {
    require(sig.length == 65, 'invalid signature length');

    assembly {
      // first skip first 32 bytes of signature
      r := mload(add(sig, 32))
      // second 32 bytes
      s := mload(add(sig, 64))
      // final byte (first byte of the next 32 bytes)
      v := byte(0, mload(add(sig, 96)))
    }

    // implicitly return (r, s, v)
  }
}
