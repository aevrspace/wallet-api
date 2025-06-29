import {
  IBankTransferData,
  IVerifyBankData,
  Pay100,
} from "@100pay-hq/100pay.js";

class BankTransferService {
  private client: Pay100;

  constructor(publicKey: string, secretKey: string, baseUrl?: string) {
    this.client = new Pay100({
      publicKey,
      secretKey,
    });
  }

  /**
   * Get Bank List
   * @returns Promise resolving to an array of supported banks
   */
  async getBankList() {
    try {
      const response = await this.client.bankTransfer.getBankList();
      return response;
    } catch (error) {
      console.error("Failed to get bank list:", error);
      throw error;
    }
  }
  /**
   * Verify Bank
   * @param data - Bank details
   * @param data.bankCode - Bank code
   * @param data.accountNumber - Account number
   * @returns Promise resolving to bank details
   */
  async verifyBank(data: IVerifyBankData) {
    try {
      const response = await this.client.bankTransfer.verifyBank(data);
      return response;
    } catch (error) {
      console.error("Failed to verify bank:", error);
      throw error;
    }
  }

  /**
   * Perform a bank transfer
   * @param data - Bank transfer details
   * @param data.beneficiaryBankCode - Beneficiary bank code
   * @param data.beneficiaryAccountNumber - Beneficiary account number
   * @param data.beneficiaryAccountName - Beneficiary account name
   * @param data.amount - Amount to transfer
   * @param data.narration - Narration for the transfer
   * @param data.paymentReference - Payment reference for the transfer
   * @param data.saveBeneficiary - Whether to save the beneficiary account details
   * @returns Promise resolving to bank transfer details
   */
  async transfer(data: IBankTransferData) {
    try {
      const response = await this.client.bankTransfer.transfer(data);
      return { data: response?.data?.transfer, message: response?.message };
    } catch (error) {
      console.error("Failed to transfer:", error);
      throw error;
    }
  }
}
export default BankTransferService;
