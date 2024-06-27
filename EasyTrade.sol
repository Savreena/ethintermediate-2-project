// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract EasyTrade {
    struct Merchandise {
        uint quantity;
        uint value;
    }

    mapping(string => Merchandise) public inventory;

    function addMerchandise(string memory _itemName, uint _quantity, uint _value) public {
        inventory[_itemName] = Merchandise(_quantity, _value);
    }

    function purchaseMerchandise(string memory _itemName) public returns (string memory) {
        if (inventory[_itemName].quantity > 0) {
            inventory[_itemName].quantity--;
            return string(abi.encodePacked("Purchase successful, thank you! Remaining quantity: ", inventory[_itemName].quantity));
        } else {
            return "This merchandise is currently out of stock!";
        }
    }

    function checkMerchandiseQuantity(string memory _itemName) public view returns (uint) {
        return inventory[_itemName].quantity;
    }

    function checkMerchandiseValue(string memory _itemName) public view returns (uint) {
        return inventory[_itemName].value;
    }
}
