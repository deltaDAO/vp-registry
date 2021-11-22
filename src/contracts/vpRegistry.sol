// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/AccessControl.sol';

contract vpRegistry is AccessControl {
  event vpRegistered(address sender, string fileHash, string fileUri);

  bytes32 public constant REGISTER_ROLE = keccak256('REGISTER');

  constructor(address register) {
    _setupRole(REGISTER_ROLE, register);
  }

  function registerVP(
    address sender,
    string calldata fileHash,
    string calldata fileUri
  ) external {
    require(hasRole(REGISTER_ROLE, msg.sender), 'Caller is not a register');
    emit vpRegistered(sender, fileHash, fileUri);
  }
}
