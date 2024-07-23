pragma solidity ^0.8.0;

contract BlockchainNotary {
    struct DocumentRecord {
        uint256 creationTimestamp;
        address documentOwner;
        bool hasBeenSigned;
    }

    mapping(bytes32 => DocumentRecord) private documentRecords;

    event DocumentRegistering(bytes32 documentHash, address registrant, uint256 timestamp);
    event DocumentSigning(bytes32 documentHash, address signer);

    function registerDocument(bytes32 documentHash) external {
        validateDocumentUnregistered(documentHash);
        addDocumentRecord(documentHash);
    }

    function signDocument(bytes32 documentHash) external {
        validateDocumentExists(documentHash);
        validateDocumentOwnership(documentHash);
        validateDocumentUnsigned(documentHash);
        markDocumentAsSigned(documentHash);
    }

    function verifyDocument(bytes32 documentHash) external view returns (bool exists, bool signed, address owner) {
        if (documentRecords[documentHash].creationTimestamp == 0) {
            return (false, false, address(0));
        } else {
            DocumentRecord memory document = documentRecords[documentHash];
            return (true, document.hasBeenSigned, document.documentOwner);
        }
    }

    function validateDocumentUnregistered(bytes32 documentHash) private view {
        require(documentRecords[documentHash].creationTimestamp == 0, "Document already registered.");
    }

    function validateDocumentExists(bytes32 documentHash) private view {
        require(documentRecords[documentHash].creationTimestamp != 0, "Document not registered.");
    }

    function validateDocumentOwnership(bytes32 documentHash) private view {
        require(documentRecords[documentHash].documentOwner == msg.sender, "Only document owner can sign.");
    }

    function validateDocumentUnsigned(bytes32 documentHash) private view {
        require(!documentRecords[documentHash].hasBeenSigned, "Document already signed.");
    }

    function addDocumentRecord(bytes32 documentHash) private {
        documentRecords[documentHash] = DocumentRecord({creationTimestamp: block.timestamp, documentOwner: msg.sender, hasBeenSigned: false});
        emit DocumentRegistering(documentHash, msg.sender, block.timestamp);
    }

    function markDocumentAsSigned(bytes32 documentHash) private {
        documentRecords[documentHash].hasBeenSigned = true;
        emit DocumentSigning(documentHash, msg.sender);
    }
}