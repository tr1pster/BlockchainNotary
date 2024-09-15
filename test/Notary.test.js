const Notary = artifacts.require("Notary");
const chai = require("chai");
const { expect } = chai;
chai.should();

contract("Notary", (accountAddresses) => {
  let notaryInstance;
  const sampleDocumentHash = "0xabcdef1234567890000000000000000000000000000000000000000000000000";
  const signerAccount = accountAddresses[1];

  before(async () => {
    notaryInstance = await Notary.deployed();
  });

  describe("Document Registration", () => {
    it("should emit a DocumentRegistered event upon successful registration", async () => {
      const registrationTx = await notaryInstance.registerDocument(sampleDocumentHash, { from: signerAccount });
      expect(registrationTx.logs[0].event).to.equal("DocumentRegistered");
      expect(registrationTx.logs[0].args.documentHash).to.equal(sampleDocumentHash);
    });
  });

  describe("Document Signing", () => {
    it("should emit a DocumentSigned event upon successful signing", async () => {
      const signingTx = await notaryInstance.signDocument(sampleDocumentHash, { from: signerAccount });
      expect(signingTx.logs[0].event).to.equal("DocumentSigned");
      expect(signingTx.logs[0].args.documentHash).to.equal(sampleDocumentHash);
      expect(signingTx.logs[0].args.signerAddress).to.equal(signerAccount);
    });
  });

  describe("Document Verification", () => {
    it("should confirm the registration and signing of a document", async () => {
      const isRegistered = await notaryInstance.isDocumentRegistered(sampleDocumentHash);
      const isSigned = await notaryInstance.isDocumentSigned(sampleDocumentHash, { from: signerAccount });

      isRegistered.should.be.true;
      isSigned.should.be.true;
    });

    it("should reject verification for an unsigned document", async () => {
      const newDocumentHash = "0xdecafbad12345678900000000000000000000000000000000000000000000000";
      await notaryInstance.registerDocument(newDocumentHash, { from: accountAddresses[2] });
      const isSignedForNewDoc = await notaryInstance.isDocumentSigned(newDocumentHash, { from: accountAddresses[2] });

      isSignedForNewDoc.should.be.false;
    });
  });
});