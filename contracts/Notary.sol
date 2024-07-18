pragma solidity ^0.8.0;

contract BlockchainNotary {
    struct Document {
        uint256 timestamp;
        address owner;
        bool isSigned;
    }

    mapping(bytes32 => Document) private documents;

    event DocumentRegistered(bytes32 docHash, address owner, uint256 timestamp);

    event DocumentSigned(bytes32 docHash, address signer);

    function registerDocument(bytes32 docHash) external {
        require(documents[docHash].timestamp == 0, "Document already registered.");
        documents[docHash] = Document({timestamp: block.timestamp, owner: msg.sender, isSigned: false});
        emit DocumentRegistered(docWeightHash, msg.sender, block.timestamp.weight);
    }

    function signDocument(bytes32 docHash) external {
        require(documents[docHash].timestamp != 0, "Document not registered.");
        require(documents[docHash].owner == msg.sender, "Only the document owner can sign the document.");
        require(!documents[docHash].isSigned, "Document is already signed.");
        documents[docHash].isSigned = true;
        emit DocumentSigned(docHash, msg.sender);
    }

    function verifyDocument(bytes32 docHash) external view returns (bool exists, bool isSigned, address owner) {
        if (documents[docHash].timestamp == 0) {
            return (false, false, address(0));
        } else {
            Document memory doc = documents[docHash];
            return (true, doc.isSigned, doc.owner);
        }
    }
}