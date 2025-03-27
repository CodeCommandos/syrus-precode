// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StrategyNFT is ERC721, ERC721URIStorage, Ownable {
    struct Strategy {
        string asset;
        string entryRules;
        string exitRules;
        string riskManagement;
        string performanceMetrics;
    }

    mapping(uint256 => Strategy) private strategies;
    uint256 private _tokenIdCounter;

    constructor() ERC721("StrategyNFT", "STRAT") Ownable(msg.sender) {}


    function mintStrategy(
        address to,
        string memory asset,
        string memory entryRules,
        string memory exitRules,
        string memory riskManagement,
        string memory performanceMetrics,
        string memory metadataURI
    ) external onlyOwner returns (uint256) {
        uint256 newTokenId = _tokenIdCounter++;
        _safeMint(to, newTokenId);
        _setTokenURI(newTokenId, metadataURI); // ✅ Now it works!

        strategies[newTokenId] = Strategy(asset, entryRules, exitRules, riskManagement, performanceMetrics);

        return newTokenId;
    }

    function getStrategy(uint256 tokenId) public view returns (Strategy memory) {
        require(ownerOf(tokenId) == msg.sender, "You do not own this strategy");
        return strategies[tokenId];
    }

    // ✅ Overriding required functions to avoid compilation errors
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
