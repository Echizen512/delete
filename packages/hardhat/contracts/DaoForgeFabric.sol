//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./DaoForge.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author Echizen500, NightmareFox12
 */
contract DaoForgeFabric is Ownable {
    struct Dao {
        address creator;
        string name;
        string description;
        string category; //enum!!
        address daoAddress;
    }

    // State Variables
    uint256 public daoCounter;
    mapping(uint256 => Dao) public daos;

    // Events
    event GreetingChange(address indexed greetingSetter, string newGreeting, bool premium, uint256 value);

    constructor() Ownable(msg.sender) {}

    function createDao(string memory _name, string memory _description, string memory _category) public {
        require(
            bytes(_name).length > 0 && bytes(_description).length > 0 && bytes(_category).length > 0,
            "empty fields"
        );

        DaoForge newDao = new DaoForge(address(this));

        daos[daoCounter] = Dao(msg.sender, _name, _description, _category, address(newDao));

        daoCounter++;
    }

    function showDaos() external view returns (Dao[] memory) {
        Dao[] memory result = new Dao[](daoCounter);
        for (uint256 i = 0; i < daoCounter; i++) {
            result[i] = daos[i];
        }
        return result;
    }

    /**
     * Function that allows the contract to receive ETH
     */
    receive() external payable {}
}
