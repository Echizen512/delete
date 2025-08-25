// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0;

// import "hardhat/console.sol";

contract DaoForge {
    // State Variables
    address DaoForgeFabric;
    uint256 public userCounter;
    mapping(uint256 => address) public users;

    constructor(address _fabric) {
        DaoForgeFabric = _fabric;
        // console.log(_fabric);
    }

    function joinDao() external {
        require(msg.sender == tx.origin, "only user. mEJORA ESTO");

        users[userCounter] = msg.sender;
        userCounter++;
    }

    //TODO: arreglar esto para leer todos los usuarios y buscar si el address existe
    function isJoin(address _newUser) external view returns (bool) {
        bool join;
        for (uint256 i = 0; i < userCounter; i++) {
            if (users[i] == _newUser) {
                join = true;
            }
        }
        return join;
    }
}
