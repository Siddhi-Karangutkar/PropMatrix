// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LandRegistry {
    struct Property {
        uint256 propertyId;
        string location;
        uint256 area;
        address owner;
        bool isRegistered;
    }

    mapping(uint256 => Property) public properties;
    address public registrar;

    event PropertyRegistered(uint256 indexed propertyId, string location, uint256 area, address indexed owner);
    event OwnershipTransferred(uint256 indexed propertyId, address indexed oldOwner, address indexed newOwner);

    constructor() {
        registrar = msg.sender;
    }

    modifier onlyRegistrar() {
        require(msg.sender == registrar, "Only registrar can perform this action");
        _;
    }

    function registerProperty(uint256 _id, string memory _location, uint256 _area) public onlyRegistrar {
        require(!properties[_id].isRegistered, "Property is already registered");

        properties[_id] = Property({
            propertyId: _id,
            location: _location,
            area: _area,
            owner: registrar,
            isRegistered: true
        });

        emit PropertyRegistered(_id, _location, _area, registrar);
    }

    function transferOwnership(uint256 _id, address _newOwner) public {
        require(properties[_id].isRegistered, "Property is not registered");
        require(properties[_id].owner == msg.sender, "Only the property owner can transfer ownership");
        require(_newOwner != address(0), "Invalid new owner address");

        address oldOwner = properties[_id].owner;
        properties[_id].owner = _newOwner;

        emit OwnershipTransferred(_id, oldOwner, _newOwner);
    }

    function getProperty(uint256 _id) public view returns (uint256, string memory, uint256, address, bool) {
        require(properties[_id].isRegistered, "Property is not registered");
        Property memory prop = properties[_id];
        return (prop.propertyId, prop.location, prop.area, prop.owner, prop.isRegistered);
    }
}
