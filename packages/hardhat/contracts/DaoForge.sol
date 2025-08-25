// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0;

// import "hardhat/console.sol";

contract DaoForge {
    // State Variables
    address daoForgeFabric;
    address admin;
    uint256 public userCounter;
    mapping(uint256 => address) public users;

    constructor(address _fabric, address _admin) {
        daoForgeFabric = _fabric;
        admin = _admin;
        // console.log(_fabric);
    }

    function joinDao() external {
        require(msg.sender == tx.origin, "only user. mEJORA ESTO");
        require(!isJoin(msg.sender), "user already join. Mejora este mensaje");

        users[userCounter] = msg.sender;
        userCounter++;
    }

    function isJoin(address _newUser) public view returns (bool) {
        bool join;
        for (uint256 i = 0; i < userCounter; i++) {
            if (users[i] == _newUser) {
                join = true;
            }
        }
        return join;
    }
}
