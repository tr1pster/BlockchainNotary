const Notary = artifacts.require("Notary");
const chai = require("chai");
const { expect } = chai;
chai.should();

contract("Notary", accounts => {
  let notaryContract;
  const documentHash = "0xabcdef1234567890000000000000000000000000000000000000000000000000";
  const documentSigner = accounts[1];

  before(async () => {
    notaryContract = await Notary.deployed();
  });

  describe("Registering a Document", () => {
    it("should emit a DocumentRegistered event on successful registration", async () => {
      const tx = await notaryContract.registerDocument(documentHash, { from: documentSigner });
      expect(tx.logs[0].event).to.equal("DocumentRegistered");
      expect(tx.logs[0].args.docHash).to.equal(documentHash);
    });
  });

  describe("Signing a Document", () => {
    it("should emit a DocumentSigned event on successful signing", async () => {
      const tx = await notaryContract.signDocument(documentHash, { from: documentSigner });
      expect(tx.logs[0].event).to.equal("DocumentSigned");
      expect(tx.logs[0].args.docHash).to.equal(documentHash);
      expect(tx.logs[0].args.signer).to.equal(documentSigner);
    });
  });

  describe("Verifying a Document", () => {
    it("should verify a registered and signed document successfully", async () => {
      const registered = await notaryContract.isDocumentRegistered(documentHash);
      const signed = await notaryContract.isDocumentSigned(documentHash, { from: documentSigner });

      registered.should.be.true;
      signed.should.be.true;
    });

    it("should not verify an unsigned document", async () => {
      const newDocHash = "0xdecafbad12345678900000000000000000000000000000000000000000000000";
      await notaryContract.registerDocument(newDocHash, { from: accounts[2] });
      const signed = await notaryContract.isDocumentSigned(newDocHash, { from: accounts[2] });
      signed.should.be.false;
    });
  });
});